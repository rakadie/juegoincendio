import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const BASE_URL = process.env.M4_BASE_URL ?? 'http://127.0.0.1:3001';
const CHROME_BIN = process.env.CHROME_BIN;
const CDP_PORT = Number(process.env.M4_CDP_PORT ?? 9222);
const STORAGE_KEY = 'vertical-beta.resume.v1';
const CDP_COMMAND_TIMEOUT_MS = 5_000;
const profileDirectory = `/tmp/m4-chrome-${process.pid}`;

if (!CHROME_BIN) {
  throw new Error('CHROME_BIN is required for the M4 browser smoke.');
}
if (typeof WebSocket !== 'function') {
  throw new Error('Node WebSocket support is required for the M4 browser smoke.');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForJson(url, timeoutMs = 10_000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (error) {
      lastError = error;
    }
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${url}: ${String(lastError ?? 'no response')}`);
}

const chrome = spawn(
  CHROME_BIN,
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${profileDirectory}`,
    '--window-size=390,844',
    'about:blank'
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] }
);

let chromeError = '';
chrome.stderr.on('data', (chunk) => {
  chromeError += String(chunk);
});

let socket;
const runtimeErrors = [];

try {
  const targets = await waitForJson(`http://127.0.0.1:${CDP_PORT}/json/list`);
  const target = targets.find((candidate) => candidate.type === 'page' && candidate.webSocketDebuggerUrl);
  assert(target, 'Chrome did not expose a page CDP target.');

  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Timed out opening CDP WebSocket.')), 5_000);
    socket.addEventListener('open', () => {
      clearTimeout(timeout);
      resolve();
    }, { once: true });
    socket.addEventListener('error', () => {
      clearTimeout(timeout);
      reject(new Error('CDP WebSocket failed to open.'));
    }, { once: true });
  });

  let nextId = 1;
  const pending = new Map();

  function rejectPending(message) {
    const error = new Error(message);
    for (const [id, request] of pending) {
      clearTimeout(request.timeout);
      pending.delete(id);
      request.reject(error);
    }
  }

  socket.addEventListener('close', () => {
    rejectPending('Chrome CDP connection closed.');
  });
  socket.addEventListener('error', () => {
    rejectPending('Chrome CDP connection failed.');
  });
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data));
    if (message.id && pending.has(message.id)) {
      const request = pending.get(message.id);
      pending.delete(message.id);
      clearTimeout(request.timeout);
      if (message.error) request.reject(new Error(message.error.message));
      else request.resolve(message.result ?? {});
      return;
    }
    if (message.method === 'Runtime.exceptionThrown') {
      runtimeErrors.push(message.params?.exceptionDetails?.exception?.description ?? message.params?.exceptionDetails?.text ?? 'Runtime exception');
    }
    if (message.method === 'Runtime.consoleAPICalled' && message.params?.type === 'error') {
      runtimeErrors.push(
        (message.params.args ?? [])
          .map((argument) => argument.value ?? argument.description ?? argument.type)
          .join(' ')
      );
    }
  });

  function send(method, params = {}) {
    const id = nextId++;
    return new Promise((resolve, reject) => {
      if (socket.readyState !== 1) {
        reject(new Error(`Chrome CDP is not open for ${method}.`));
        return;
      }
      const timeout = setTimeout(() => {
        pending.delete(id);
        reject(new Error(`Chrome CDP command timed out: ${method}.`));
      }, CDP_COMMAND_TIMEOUT_MS);
      pending.set(id, { resolve, reject, timeout });
      try {
        socket.send(JSON.stringify({ id, method, params }));
      } catch (error) {
        clearTimeout(timeout);
        pending.delete(id);
        reject(error);
      }
    });
  }

  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
    }
    return result.result?.value;
  }

  async function waitFor(expression, label, timeoutMs = 8_000) {
    const deadline = Date.now() + timeoutMs;
    let lastError;
    while (Date.now() < deadline) {
      try {
        if (await evaluate(`Boolean(${expression})`)) return;
      } catch (error) {
        lastError = error;
      }
      await sleep(80);
    }
    throw new Error(`Timed out waiting for ${label}: ${String(lastError ?? 'condition remained false')}`);
  }

  async function waitForSelector(selector, timeoutMs) {
    await waitFor(`document.querySelector(${JSON.stringify(selector)})`, selector, timeoutMs);
  }

  async function pressEnter(selector) {
    const focused = await evaluate(`(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) return false;
      element.focus();
      return document.activeElement === element;
    })()`);
    assert(focused, `Could not focus ${selector}`);
    const key = { key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 };
    await send('Input.dispatchKeyEvent', { type: 'keyDown', ...key });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', ...key });
  }

  async function choose(actionId) {
    const selector = `[data-action-id=${JSON.stringify(actionId)}]`;
    await waitForSelector(selector);
    await pressEnter(selector);
    await waitFor(
      `document.querySelector(${JSON.stringify(`[data-action-card-id="${actionId}"]`)})?.classList.contains('selected')`,
      `${actionId} selected`
    );
  }

  async function advanceAndWait(selector) {
    await waitForSelector('#advance-button');
    await pressEnter('#advance-button');
    await waitForSelector(selector);
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });

  await send('Page.navigate', { url: BASE_URL });
  await waitFor(`document.readyState === 'complete'`, 'initial page load');
  await waitForSelector('#start-session-button');

  assert(
    await evaluate(`document.getElementById('start-session-button').textContent.trim() === 'Comenzar partida'`),
    'Landing did not expose the explicit start action.'
  );
  assert(
    await evaluate(`window.localStorage.getItem(${JSON.stringify(STORAGE_KEY)}) === null`),
    'Landing unexpectedly created a continuity record.'
  );
  assert(
    await evaluate(`document.getElementById('restart-button').disabled === true`),
    'Restart must be disabled before a session exists.'
  );
  assert(
    await evaluate(`window.innerWidth <= 390`),
    'Mobile viewport override was not applied.'
  );

  await pressEnter('#start-session-button');
  await waitForSelector('.scene.briefing');
  const firstEnvelope = await evaluate(`JSON.parse(window.localStorage.getItem(${JSON.stringify(STORAGE_KEY)}))`);
  assert(firstEnvelope?.commands?.length === 0, 'Starting a game must create an empty resume journal.');
  const firstSessionId = firstEnvelope.sessionId;

  await send('Page.reload', { ignoreCache: true });
  await waitFor(`document.readyState === 'complete'`, 'page reload');
  await waitForSelector('#continue-session-button');
  await pressEnter('#continue-session-button');
  await waitForSelector('.scene.briefing');

  await advanceAndWait('[data-action-id="gestionar-restos-poda"]');
  await choose('gestionar-restos-poda');
  await choose('crear-discontinuidades-vegetales');
  await choose('limpiar-margenes-caminos');
  await advanceAndWait('[data-action-id="podar-ramas-y-retirar-seco"]');
  await choose('podar-ramas-y-retirar-seco');
  await choose('despejar-accesos');
  await waitForSelector('#advance-button');
  await pressEnter('#advance-button');
  await waitFor(`document.body.textContent.includes('Balance preventivo')`, 'prevention summary');
  await pressEnter('#advance-button');
  await waitForSelector('[data-action-id="movilizar-y-verificar"]');
  await choose('movilizar-y-verificar');
  await waitForSelector('#advance-button');
  await pressEnter('#advance-button');
  await waitForSelector('[data-action-id="autorizar-maniobra-condicionada"]');
  await choose('autorizar-maniobra-condicionada');
  await advanceAndWait('[data-action-id="asegurar-flancos-y-repliegue"]');
  await choose('asegurar-flancos-y-repliegue');
  await advanceAndWait('[data-action-id="defender-desde-posicion-segura"]');
  await choose('defender-desde-posicion-segura');
  await waitForSelector('#advance-button');
  await pressEnter('#advance-button');
  await waitForSelector('.result-contained');
  await waitForSelector('#compare-reference-button');
  await waitForSelector('#replay-button');

  await pressEnter('#compare-reference-button');
  await waitForSelector('#m4-reference-comparison');
  assert(
    await evaluate(`document.querySelectorAll('#m4-reference-comparison .m4-comparison-side').length === 2`),
    'Comparison did not render both reference sides.'
  );
  assert(
    await evaluate(`document.querySelectorAll('#m4-reference-comparison .m4-comparison-dimension').length === 10`),
    'Comparison did not render five dimensions per side.'
  );

  await pressEnter('#comparison-replay-button');
  await waitForSelector('.scene.briefing');
  const replayEnvelope = await evaluate(`JSON.parse(window.localStorage.getItem(${JSON.stringify(STORAGE_KEY)}))`);
  assert(replayEnvelope?.sessionId === firstSessionId, 'Replay changed the technical session id.');
  assert(replayEnvelope?.commands?.length === 0, 'Replay did not reset the resume journal.');

  assert(runtimeErrors.length === 0, `Browser console/runtime errors: ${runtimeErrors.join(' | ')}`);
  console.log('M4_BROWSER_SMOKE_OK');
} catch (error) {
  if (chrome.exitCode !== null && chromeError) {
    console.error(chromeError);
  }
  console.error(error);
  process.exitCode = 1;
} finally {
  try {
    socket?.close();
  } catch {
    // Ignore close errors during cleanup.
  }
  chrome.kill('SIGTERM');
  await sleep(100);
  await rm(profileDirectory, { recursive: true, force: true });
}
