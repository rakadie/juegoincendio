import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const BASE_URL = process.env.M4_BASE_URL ?? 'http://127.0.0.1:3001';
const CHROME_BIN = process.env.CHROME_BIN;
const BASE_CDP_PORT = Number(process.env.M4_CDP_PORT ?? 9222);
const STORAGE_KEY = 'vertical-beta.resume.v1';
const CDP_COMMAND_TIMEOUT_MS = 5_000;
const CHROME_START_TIMEOUT_MS = 10_000;
const CHROME_LAUNCH_ATTEMPTS = 3;
const VISUAL_CAPTURE_DIR = process.env.M5_CAPTURE_DIR?.trim() || null;
const VISUAL_MODE = VISUAL_CAPTURE_DIR !== null;

if (!CHROME_BIN) {
  throw new Error('CHROME_BIN is required for the browser smoke.');
}
if (typeof WebSocket !== 'function') {
  throw new Error('Node WebSocket support is required for the browser smoke.');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForChromeTargets(chrome, port, stderrState, timeoutMs = CHROME_START_TIMEOUT_MS) {
  const url = `http://127.0.0.1:${port}/json/list`;
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    if (chrome.exitCode !== null) {
      throw new Error(
        `Chrome exited before exposing CDP on ${port} (exit ${chrome.exitCode}). ${stderrState.value}`.trim()
      );
    }
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (error) {
      lastError = error;
    }
    await sleep(120);
  }
  throw new Error(`Timed out waiting for ${url}: ${String(lastError ?? 'no response')}`);
}

async function removeChromeProfile(profileDirectory) {
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      await rm(profileDirectory, { recursive: true, force: true });
      return;
    } catch (error) {
      const retryable =
        error && typeof error === 'object' &&
        ['ENOTEMPTY', 'EBUSY', 'EPERM'].includes(error.code);
      if (!retryable || attempt === 6) throw error;
      await sleep(attempt * 120);
    }
  }
}

async function waitForChromeExit(chrome, timeoutMs) {
  if (!chrome || chrome.exitCode !== null) return true;
  return Promise.race([
    new Promise((resolve) => chrome.once('exit', () => resolve(true))),
    sleep(timeoutMs).then(() => false)
  ]);
}

async function stopChrome(chrome, profileDirectory) {
  if (chrome && chrome.exitCode === null) {
    chrome.kill('SIGTERM');
    const exited = await waitForChromeExit(chrome, 1_500);
    if (!exited && chrome.exitCode === null) {
      chrome.kill('SIGKILL');
      await waitForChromeExit(chrome, 1_000);
    }
  }
  await removeChromeProfile(profileDirectory);
}

async function launchChrome() {
  const failures = [];
  for (let attempt = 1; attempt <= CHROME_LAUNCH_ATTEMPTS; attempt += 1) {
    const port = BASE_CDP_PORT + attempt - 1;
    const profileDirectory = `/tmp/m4-chrome-${process.pid}-${attempt}`;
    await removeChromeProfile(profileDirectory);
    const stderrState = { value: '' };
    const chrome = spawn(
      CHROME_BIN,
      [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-first-run',
        '--no-default-browser-check',
        '--remote-debugging-address=127.0.0.1',
        `--remote-debugging-port=${port}`,
        `--user-data-dir=${profileDirectory}`,
        '--window-size=390,844',
        'about:blank'
      ],
      { stdio: ['ignore', 'ignore', 'pipe'] }
    );

    chrome.stderr.on('data', (chunk) => {
      stderrState.value += String(chunk);
    });

    try {
      const targets = await waitForChromeTargets(chrome, port, stderrState);
      const target = targets.find(
        (candidate) => candidate.type === 'page' && candidate.webSocketDebuggerUrl
      );
      assert(target, `Chrome did not expose a page CDP target on attempt ${attempt}.`);
      return { chrome, port, profileDirectory, stderrState, target };
    } catch (error) {
      failures.push(
        `attempt ${attempt} port ${port}: ${error instanceof Error ? error.message : String(error)}`
      );
      await stopChrome(chrome, profileDirectory);
      if (attempt < CHROME_LAUNCH_ATTEMPTS) await sleep(250);
    }
  }
  throw new Error(`Chrome failed to start after ${CHROME_LAUNCH_ATTEMPTS} attempts:\n${failures.join('\n')}`);
}

const runtimeErrors = [];
const evidence = [];
let chrome;
let profileDirectory;
let stderrState;
let socket;

try {
  if (VISUAL_MODE) {
    await mkdir(VISUAL_CAPTURE_DIR, { recursive: true });
  }

  const launched = await launchChrome();
  chrome = launched.chrome;
  profileDirectory = launched.profileDirectory;
  stderrState = launched.stderrState;

  socket = new WebSocket(launched.target.webSocketDebuggerUrl);
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
      runtimeErrors.push(
        message.params?.exceptionDetails?.exception?.description ??
        message.params?.exceptionDetails?.text ??
        'Runtime exception'
      );
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
    throw new Error(
      `Timed out waiting for ${label}: ${String(lastError ?? 'condition remained false')}`
    );
  }

  async function waitForSelector(selector, timeoutMs) {
    await waitFor(`document.querySelector(${JSON.stringify(selector)})`, selector, timeoutMs);
  }

  async function setViewport(width, height, mobile) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile
    });
    await sleep(80);
  }

  async function pressEnter(selector) {
    await waitFor(
      `(() => { const element = document.querySelector(${JSON.stringify(selector)}); return element && !element.disabled; })()`,
      `${selector} enabled`
    );
    const focused = await evaluate(`(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) return false;
      element.focus();
      return document.activeElement === element;
    })()`);
    assert(focused, `Could not focus ${selector}`);
    const key = {
      key: 'Enter',
      code: 'Enter',
      windowsVirtualKeyCode: 13,
      nativeVirtualKeyCode: 13
    };
    await send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      ...key,
      text: '\r',
      unmodifiedText: '\r'
    });
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

  async function chooseAndWait(actionId, nextSelector) {
    const selector = `[data-action-id=${JSON.stringify(actionId)}]`;
    await waitForSelector(selector);
    await pressEnter(selector);
    await waitForSelector(nextSelector);
  }

  async function advanceAndWait(selector) {
    await waitForSelector('#advance-button');
    await pressEnter('#advance-button');
    await waitForSelector(selector);
  }

  async function captureEvidence(name, selector, expected = {}) {
    if (!VISUAL_MODE) return;
    await waitForSelector(selector);
    const geometry = await evaluate(`(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) return null;
      element.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'auto' });
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        width: rect.width,
        height: rect.height,
        display: style.display,
        visibility: style.visibility,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        scrollWidth: document.documentElement.scrollWidth
      };
    })()`);
    assert(geometry, `Evidence target ${selector} was not found.`);
    assert(geometry.width >= (expected.minWidth ?? 180), `${name} target is too narrow.`);
    assert(geometry.height >= (expected.minHeight ?? 100), `${name} target is too short.`);
    assert(geometry.display !== 'none' && geometry.visibility !== 'hidden', `${name} target is hidden.`);
    assert(
      geometry.scrollWidth <= geometry.viewportWidth + 3,
      `${name} has critical horizontal overflow (${geometry.scrollWidth} > ${geometry.viewportWidth}).`
    );
    await sleep(120);
    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false
    });
    assert(typeof screenshot.data === 'string' && screenshot.data.length > 100, `${name} screenshot is empty.`);
    await writeFile(join(VISUAL_CAPTURE_DIR, name), screenshot.data, 'base64');
    evidence.push({
      name,
      selector,
      width: geometry.viewportWidth,
      height: geometry.viewportHeight,
      mobile: geometry.viewportWidth < 700
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await setViewport(390, 844, true);

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
  const firstEnvelope = await evaluate(
    `JSON.parse(window.localStorage.getItem(${JSON.stringify(STORAGE_KEY)}))`
  );
  assert(firstEnvelope?.commands?.length === 0, 'Starting a game must create an empty resume journal.');
  const firstSessionId = firstEnvelope.sessionId;

  await send('Page.reload', { ignoreCache: true });
  await waitFor(`document.readyState === 'complete'`, 'page reload');
  await waitForSelector('#continue-session-button');
  await pressEnter('#continue-session-button');
  await waitForSelector('.scene.briefing');

  await advanceAndWait('[data-action-id="gestionar-restos-poda"]');
  await captureEvidence(
    'territory-initial-mobile.png',
    '.visual-scene[data-visual-template="territory"] .visual-canvas',
    { minWidth: 300, minHeight: 240 }
  );
  await choose('gestionar-restos-poda');
  await choose('crear-discontinuidades-vegetales');
  await choose('limpiar-margenes-caminos');

  if (VISUAL_MODE) {
    await setViewport(1280, 900, false);
    await captureEvidence(
      'territory-treated-desktop.png',
      '.visual-scene[data-visual-template="territory"] .visual-canvas',
      { minWidth: 700, minHeight: 300 }
    );
    await setViewport(390, 844, true);
  }

  await advanceAndWait('[data-action-id="podar-ramas-y-retirar-seco"]');
  await captureEvidence(
    'housing-initial-mobile.png',
    '.visual-scene[data-visual-template="housing"] .visual-canvas',
    { minWidth: 300, minHeight: 240 }
  );
  await choose('podar-ramas-y-retirar-seco');
  await choose('despejar-accesos');

  if (VISUAL_MODE) {
    await setViewport(1280, 900, false);
    await captureEvidence(
      'housing-treated-desktop.png',
      '.visual-scene[data-visual-template="housing"] .visual-canvas',
      { minWidth: 700, minHeight: 300 }
    );
  }

  await waitForSelector('#advance-button');
  await pressEnter('#advance-button');
  await waitFor(`document.body.textContent.includes('Balance preventivo')`, 'prevention summary');
  await pressEnter('#advance-button');
  await waitForSelector('[data-action-id="movilizar-y-verificar"]');
  await chooseAndWait('movilizar-y-verificar', '#advance-button');
  await pressEnter('#advance-button');
  await waitForSelector('[data-action-id="autorizar-maniobra-condicionada"]');

  await captureEvidence(
    'crisis-prepared-desktop.png',
    '.visual-scene[data-visual-template="crisis"] .visual-canvas',
    { minWidth: 700, minHeight: 300 }
  );

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

  await captureEvidence('result-desktop.png', '.result-contained .scene-content', {
    minWidth: 700,
    minHeight: 400
  });

  await pressEnter('#compare-reference-button');
  await waitForSelector('#m4-reference-comparison');
  assert(
    await evaluate(
      `document.querySelectorAll('#m4-reference-comparison .m4-comparison-side').length === 2`
    ),
    'Comparison did not render both reference sides.'
  );
  assert(
    await evaluate(
      `document.querySelectorAll('#m4-reference-comparison .m4-comparison-dimension').length === 10`
    ),
    'Comparison did not render five dimensions per side.'
  );
  await captureEvidence('comparison-desktop.png', '#m4-reference-comparison', {
    minWidth: 700,
    minHeight: 350
  });

  await pressEnter('#comparison-replay-button');
  await waitForSelector('.scene.briefing');
  const replayEnvelope = await evaluate(
    `JSON.parse(window.localStorage.getItem(${JSON.stringify(STORAGE_KEY)}))`
  );
  assert(replayEnvelope?.sessionId === firstSessionId, 'Replay changed the technical session id.');
  assert(replayEnvelope?.commands?.length === 0, 'Replay did not reset the resume journal.');

  await setViewport(1280, 900, false);
  await send('Page.reload', { ignoreCache: true });
  await waitFor(`document.readyState === 'complete'`, 'desktop page reload');
  await waitForSelector('#continue-session-button');
  assert(
    await evaluate(`window.innerWidth >= 1280`),
    'Desktop viewport override was not applied.'
  );
  assert(
    await evaluate(
      `getComputedStyle(document.querySelector('.entry')).gridTemplateColumns.split(' ').length === 2`
    ),
    'Desktop landing did not render the approved two-column entry layout.'
  );
  await pressEnter('#continue-session-button');
  await waitForSelector('.scene.briefing');

  if (VISUAL_MODE) {
    await advanceAndWait('[data-action-id="gestionar-restos-poda"]');
    await choose('gestionar-restos-poda');
    await choose('activar-pastoreo-preventivo');
    await choose('evaluar-quema-tecnica');
    await advanceAndWait('[data-action-id="podar-ramas-y-retirar-seco"]');
    await choose('podar-ramas-y-retirar-seco');
    await choose('separar-copas');
    await waitForSelector('#advance-button');
    await pressEnter('#advance-button');
    await waitFor(`document.body.textContent.includes('Balance preventivo')`, 'vulnerable prevention summary');
    await pressEnter('#advance-button');
    await waitForSelector('[data-action-id="movilizar-y-verificar"]');
    await chooseAndWait('movilizar-y-verificar', '#advance-button');
    await pressEnter('#advance-button');
    await waitForSelector('[data-action-id="despejar-corredor-operativo"]');
    assert(
      await evaluate(
        `document.querySelector('.visual-scene[data-visual-template="crisis"]')?.getAttribute('data-visual-scene-id') === 'crisis-decision-access-blockage'`
      ),
      'Vulnerable route did not reach the canonical access blockage scene.'
    );
    await captureEvidence(
      'crisis-vulnerable-desktop.png',
      '.visual-scene[data-visual-template="crisis"] .visual-canvas',
      { minWidth: 700, minHeight: 300 }
    );
  }

  assert(runtimeErrors.length === 0, `Browser console/runtime errors: ${runtimeErrors.join(' | ')}`);

  if (VISUAL_MODE) {
    const required = [
      'territory-initial-mobile.png',
      'territory-treated-desktop.png',
      'housing-initial-mobile.png',
      'housing-treated-desktop.png',
      'crisis-prepared-desktop.png',
      'crisis-vulnerable-desktop.png',
      'result-desktop.png',
      'comparison-desktop.png'
    ];
    assert(
      required.every((name) => evidence.some((item) => item.name === name)),
      'M5 visual evidence set is incomplete.'
    );
    await writeFile(
      join(VISUAL_CAPTURE_DIR, 'manifest.json'),
      `${JSON.stringify({ schemaVersion: 1, evidence }, null, 2)}\n`,
      'utf8'
    );
    console.log('M5_VISUAL_SMOKE_OK');
  } else {
    console.log('M4_BROWSER_SMOKE_OK');
  }
} catch (error) {
  if (chrome?.exitCode !== null && stderrState?.value) {
    console.error(stderrState.value);
  }
  console.error(error);
  process.exitCode = 1;
} finally {
  try {
    socket?.close();
  } catch {
    // Ignore close errors during cleanup.
  }
  if (chrome && profileDirectory) {
    await stopChrome(chrome, profileDirectory);
  }
}
