import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
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
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    try {
      await rm(profileDirectory, { recursive: true, force: true });
      return;
    } catch (error) {
      const retryable =
        error && typeof error === 'object' &&
        ['ENOTEMPTY', 'EBUSY', 'EPERM'].includes(error.code);
      if (!retryable || attempt === 12) throw error;
      await sleep(Math.min(attempt * 250, 1_000));
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
    const profileDirectory = join(tmpdir(), `m4-chrome-${process.pid}-${attempt}`);
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

  async function interactionPoint(selector) {
    await waitFor(
      `(() => {
        const element = document.querySelector(${JSON.stringify(selector)});
        if (!element || element.disabled) return false;
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })()`,
      `${selector} visible and enabled`
    );
    await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({ block: 'center', inline: 'center', behavior: 'auto' })`);
    await sleep(80);
    return evaluate(`(() => {
      const rect = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    })()`);
  }

  async function clickWithMouse(selector) {
    const point = await interactionPoint(selector);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
    await send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      ...point,
      button: 'left',
      buttons: 1,
      clickCount: 1
    });
    await send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      ...point,
      button: 'left',
      buttons: 0,
      clickCount: 1
    });
  }

  async function tapWithTouch(selector) {
    const point = await interactionPoint(selector);
    const touchPoint = { ...point, radiusX: 2, radiusY: 2, force: 1, id: 1 };
    await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [touchPoint] });
    await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  }

  async function activateWithPointer(selector, pointer) {
    if (pointer === 'touch') await tapWithTouch(selector);
    else await clickWithMouse(selector);
  }

  async function movePointerAway() {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 4, y: 4 });
    await sleep(240);
  }

  async function openVisualActionCard(actionId, pointer) {
    const hotspotSelector = `[data-focus-action-id=${JSON.stringify(actionId)}].visual-hotspot .map-pin-disc`;
    await activateWithPointer(hotspotSelector, pointer);
    await waitFor(
      `(() => {
        const card = document.querySelector(${JSON.stringify(
          `[data-visual-action-card-id="${actionId}"]`
        )});
        return card && !card.hidden;
      })()`,
      `${actionId} visual card opened with ${pointer}`
    );
  }

  async function chooseWithPointer(actionId, pointer, expectedMobile, evidenceName, template = 'territory') {
    await openVisualActionCard(actionId, pointer);
    await assertOpenSceneCard(actionId, expectedMobile, template);
    if (evidenceName) {
      const cardSelector = `[data-visual-action-card-id=${JSON.stringify(actionId)}]:not([hidden])`;
      if (pointer === 'mouse') {
        await captureViewportEvidence(evidenceName, cardSelector, { minWidth: 220, minHeight: 120 });
      } else {
        await captureEvidence(evidenceName, cardSelector, { minWidth: 280, minHeight: 120 });
      }
    }
    const selector = `[data-visual-action-card-id=${JSON.stringify(actionId)}]:not([hidden]) [data-action-id=${JSON.stringify(actionId)}]`;
    await activateWithPointer(selector, pointer);
    await waitFor(
      `Boolean(document.querySelector(${JSON.stringify(
        `[data-action-card-id="${actionId}"].selected, [data-visual-action-card-id="${actionId}"].selected`
      )}))`,
      `${actionId} selected with ${pointer}`
    );
  }

  async function assertTerritoryLayout(expectedMobile) {
    const layout = await evaluate(`(() => {
      const canvas = document.querySelector('.visual-scene[data-visual-template="territory"] .visual-canvas');
      const map = canvas?.querySelector('.territory-map');
      const key = canvas?.querySelector('.territory-map-key');
      if (!canvas || !map || !key) return null;
      const canvasRect = canvas.getBoundingClientRect();
      const mapRect = map.getBoundingClientRect();
      const keyRect = key.getBoundingClientRect();
      const items = Array.from(key.querySelectorAll('.territory-map-key-item')).map((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, height: rect.height };
      });
      const visiblePinParts = Array.from(map.querySelectorAll('.map-pin'))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
        });
      const overlaps = [];
      for (let i = 0; i < visiblePinParts.length; i += 1) {
        for (let j = i + 1; j < visiblePinParts.length; j += 1) {
          const a = visiblePinParts[i];
          const b = visiblePinParts[j];
          if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) {
            overlaps.push([i, j]);
          }
        }
      }
      return {
        viewportWidth: window.innerWidth,
        pageWidth: document.documentElement.scrollWidth,
        canvas: { left: canvasRect.left, right: canvasRect.right },
        map: { left: mapRect.left, right: mapRect.right, top: mapRect.top, bottom: mapRect.bottom },
        key: { left: keyRect.left, right: keyRect.right },
        itemCount: items.length,
        items,
        overlaps
      };
    })()`);
    assert(layout, 'Territory layout was not available.');
    assert(layout.itemCount === 5, 'Territory legend must expose five controls.');
    assert(layout.pageWidth <= layout.viewportWidth + 3, 'Territory layout has horizontal overflow.');
    assert(layout.map.left >= layout.canvas.left - 1 && layout.map.right <= layout.canvas.right + 1, 'Territory map is clipped by its canvas.');
    assert(layout.key.left >= layout.canvas.left - 1 && layout.key.right <= layout.canvas.right + 1, 'Territory legend is clipped by its canvas.');
    assert(
      layout.items.every((item) => item.left >= layout.key.left - 1 && item.right <= layout.key.right + 1),
      'A territory legend item escapes its container.'
    );
    assert(
      layout.items.every((item) => item.height >= (expectedMobile ? 52 : 48)),
      'Territory legend controls are smaller than their expected target size.'
    );
    assert(layout.overlaps.length === 0, 'Territory pins or visible labels overlap.');
  }

  async function assertHousingLayout(expectedMobile) {
    const layout = await evaluate(`(() => {
      const canvas = document.querySelector('.visual-scene[data-visual-template="housing"] .visual-canvas');
      const map = canvas?.querySelector('.housing-plan');
      const key = canvas?.querySelector('.housing-map-key');
      if (!canvas || !map || !key) return null;
      const canvasRect = canvas.getBoundingClientRect();
      const mapRect = map.getBoundingClientRect();
      const keyRect = key.getBoundingClientRect();
      const items = Array.from(key.querySelectorAll('.housing-map-key-item')).map((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, height: rect.height };
      });
      const visiblePinParts = Array.from(map.querySelectorAll('.map-pin'))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
        });
      const overlaps = [];
      for (let i = 0; i < visiblePinParts.length; i += 1) {
        for (let j = i + 1; j < visiblePinParts.length; j += 1) {
          const a = visiblePinParts[i];
          const b = visiblePinParts[j];
          if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) {
            overlaps.push([i, j]);
          }
        }
      }
      return {
        viewportWidth: window.innerWidth,
        pageWidth: document.documentElement.scrollWidth,
        canvas: { left: canvasRect.left, right: canvasRect.right },
        map: { left: mapRect.left, right: mapRect.right, top: mapRect.top, bottom: mapRect.bottom },
        key: { left: keyRect.left, right: keyRect.right },
        itemCount: items.length,
        items,
        overlaps
      };
    })()`);
    assert(layout, 'Housing layout was not available.');
    assert(layout.itemCount === 4, 'Housing legend must expose three actions and the house condition.');
    assert(layout.pageWidth <= layout.viewportWidth + 3, 'Housing layout has horizontal overflow.');
    assert(layout.map.left >= layout.canvas.left - 1 && layout.map.right <= layout.canvas.right + 1, 'Housing map is clipped by its canvas.');
    assert(layout.key.left >= layout.canvas.left - 1 && layout.key.right <= layout.canvas.right + 1, 'Housing legend is clipped by its canvas.');
    assert(
      layout.items.every((item) => item.left >= layout.key.left - 1 && item.right <= layout.key.right + 1),
      'A housing legend item escapes its container.'
    );
    assert(
      layout.items.every((item) => item.height >= (expectedMobile ? 52 : 48)),
      'Housing legend controls are smaller than their expected target size.'
    );
    assert(layout.overlaps.length === 0, 'Housing pins or visible labels overlap.');
  }

  async function assertOpenSceneCard(actionId, expectedMobile, template) {
    const geometry = await evaluate(`(() => {
      const canvas = document.querySelector(${JSON.stringify(`.visual-scene[data-visual-template="${template}"] .visual-canvas`)});
      const key = canvas?.querySelector(${JSON.stringify(template === 'territory' ? '.territory-map-key' : '.housing-map-key')});
      const card = canvas?.querySelector(${JSON.stringify(`[data-visual-action-card-id="${actionId}"]`)});
      const button = card?.querySelector('.action-button');
      if (!canvas || !key || !card || card.hidden || !button) return null;
      const canvasRect = canvas.getBoundingClientRect();
      const keyRect = key.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      return {
        canvas: { left: canvasRect.left, right: canvasRect.right, top: canvasRect.top, bottom: canvasRect.bottom },
        keyBottom: keyRect.bottom,
        card: { left: cardRect.left, right: cardRect.right, top: cardRect.top, bottom: cardRect.bottom },
        button: { width: buttonRect.width, height: buttonRect.height }
      };
    })()`);
    assert(geometry, `${actionId} card is not visible.`);
    assert(
      geometry.card.left >= geometry.canvas.left - 1 && geometry.card.right <= geometry.canvas.right + 1,
      `${actionId} card escapes the ${template} canvas horizontally.`
    );
    assert(
      geometry.card.top >= geometry.canvas.top - 1 && geometry.card.bottom <= geometry.canvas.bottom + 1,
      `${actionId} card escapes the ${template} canvas vertically.`
    );
    if (expectedMobile) {
      assert(geometry.card.top >= geometry.keyBottom - 1, `${actionId} mobile card overlaps the ${template} legend.`);
    }
    assert(geometry.button.width > 0 && geometry.button.height > 0, `${actionId} card action is not visible.`);
  }

  async function choose(actionId) {
    const selector = `[data-action-id=${JSON.stringify(actionId)}]`;
    await waitForSelector(selector);
    const hotspotSelector = `[data-focus-action-id=${JSON.stringify(actionId)}]`;
    const hasContextualHotspot = await evaluate(
      `Boolean(document.querySelector(${JSON.stringify(hotspotSelector)}))`
    );
    if (hasContextualHotspot) await pressEnter(hotspotSelector);
    await pressEnter(selector);
    await waitFor(
      `Boolean(document.querySelector(${JSON.stringify(
        `[data-action-card-id="${actionId}"].selected, [data-visual-action-card-id="${actionId}"].selected`
      )}))`,
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

  async function captureViewportEvidence(name, selector, expected = {}) {
    if (!VISUAL_MODE) return;
    await waitFor(
      `(() => {
        const element = document.querySelector(${JSON.stringify(selector)});
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.width >= ${expected.minWidth ?? 180} && rect.height >= ${expected.minHeight ?? 100};
      })()`,
      `${selector} ready for viewport evidence`
    );
    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false
    });
    assert(typeof screenshot.data === 'string' && screenshot.data.length > 100, `${name} screenshot is empty.`);
    await writeFile(join(VISUAL_CAPTURE_DIR, name), screenshot.data, 'base64');
    const viewport = await evaluate(`({ width: window.innerWidth, height: window.innerHeight })`);
    evidence.push({
      name,
      selector,
      width: viewport.width,
      height: viewport.height,
      mobile: viewport.width < 700
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
  await assertTerritoryLayout(true);
  await chooseWithPointer(
    'gestionar-restos-poda',
    'touch',
    true,
    'territory-card-touch-mobile.png'
  );
  await choose('crear-discontinuidades-vegetales');
  await choose('limpiar-margenes-caminos');
  assert(
    await evaluate(`(() => {
      const counter = document.querySelector('.selection-counter strong')?.textContent.trim();
      const cards = Array.from(document.querySelectorAll('[data-visual-action-card-id]'));
      return counter === '3 / 3' && cards.filter((card) => card.classList.contains('selected')).length === 3 &&
        cards.every((card) => card.querySelector('.action-button')?.disabled === true) &&
        Boolean(document.getElementById('advance-button'));
    })()`),
    'Territory inspection did not enforce the three-action limit before advancing.'
  );

  if (VISUAL_MODE) {
    await setViewport(1280, 900, false);
    await assertTerritoryLayout(false);
    await captureEvidence(
      'territory-treated-desktop.png',
      '.visual-scene[data-visual-template="territory"] .visual-canvas',
      { minWidth: 700, minHeight: 300 }
    );
    await setViewport(390, 844, true);
  }

  await advanceAndWait('[data-action-id="podar-ramas-y-retirar-seco"]');
  await assertHousingLayout(true);
  await captureEvidence(
    'housing-initial-mobile.png',
    '.visual-scene[data-visual-template="housing"] .visual-canvas',
    { minWidth: 300, minHeight: 240 }
  );
  if (VISUAL_MODE) {
    await setViewport(1280, 900, false);
    await assertHousingLayout(false);
    await captureEvidence(
      'housing-initial-desktop.png',
      '.visual-scene[data-visual-template="housing"] .visual-canvas',
      { minWidth: 700, minHeight: 300 }
    );
    await setViewport(390, 844, true);
    await assertHousingLayout(true);
  }
  await chooseWithPointer(
    'podar-ramas-y-retirar-seco',
    'touch',
    true,
    'housing-card-touch-mobile.png',
    'housing'
  );
  assert(
    await evaluate(`(() => {
      const zone = document.getElementById('housing-vertical-fuel');
      const clearance = zone?.querySelector('.housing-clearance');
      const dryFuel = zone?.querySelector('.housing-dry-fuel');
      const feedback = document.querySelector('.inspection-confirmation p')?.textContent;
      const remaining = document.querySelector('.selection-remaining')?.textContent;
      const selected = document.querySelectorAll('.selected-action-chip').length;
      return zone?.classList.contains('state-reduced') && clearance && dryFuel &&
        getComputedStyle(clearance).display !== 'none' && getComputedStyle(dryFuel).display === 'none' &&
        feedback?.includes('Reduce la continuidad desde el suelo hacia las copas') &&
        remaining === 'Quedan 1' && selected === 1;
    })()`),
    'Housing pruning did not update the visible fuel, feedback and remaining budget.'
  );
  await captureEvidence(
    'housing-pruned-mobile.png',
    '.visual-scene[data-visual-template="housing"] .visual-canvas',
    { minWidth: 300, minHeight: 240 }
  );
  await captureEvidence(
    'housing-feedback-mobile.png',
    '.inspection-response',
    { minWidth: 300, minHeight: 100 }
  );
  await choose('despejar-accesos');

  assert(
    await evaluate(`(() => {
      const access = document.getElementById('housing-local-access');
      const obstructions = access?.querySelector('.housing-access-obstructions');
      const route = access?.querySelector('.housing-clear-route');
      const counter = document.querySelector('.selection-counter strong')?.textContent.trim();
      const cards = Array.from(document.querySelectorAll('[data-visual-action-card-id]'));
      return access?.classList.contains('state-clear') && obstructions && route &&
        getComputedStyle(obstructions).display === 'none' && getComputedStyle(route).display !== 'none' &&
        counter === '2 / 2' && cards.filter((card) => card.classList.contains('selected')).length === 2 &&
        cards.every((card) => card.querySelector('.action-button')?.disabled === true) &&
        Boolean(document.getElementById('advance-button'));
    })()`),
    'Housing inspection did not show the clear corridor or enforce its two-action limit.'
  );

  if (VISUAL_MODE) {
    await setViewport(1280, 900, false);
    await assertHousingLayout(false);
    await captureEvidence(
      'housing-treated-desktop.png',
      '.visual-scene[data-visual-template="housing"] .visual-canvas',
      { minWidth: 700, minHeight: 300 }
    );
  }

  await waitForSelector('#advance-button');
  await pressEnter('#advance-button');
  await waitForSelector('.prevention-area');
  const balanceState = await evaluate(`(() => {
      const areas = document.querySelectorAll('.prevention-area');
      const applied = document.querySelectorAll('.prevention-area .applied-list li');
      const pending = document.querySelectorAll('.prevention-area .pending-list li');
      const caution = document.querySelector('.balance-caution')?.textContent;
      return { areas: areas.length, applied: applied.length, pending: pending.length, caution };
    })()`);
  assert(
    balanceState?.areas === 2 && balanceState?.applied === 5 && balanceState?.pending === 3 &&
      balanceState?.caution?.includes('no convierten una vivienda en completamente segura'),
    `Prevention balance did not distinguish applied decisions and pending conditions by area: ${JSON.stringify(balanceState)}`
  );
  await captureEvidence('prevention-balance-desktop.png', '.scene-content', {
    minWidth: 700,
    minHeight: 400
  });
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
    await assertTerritoryLayout(false);
    await chooseWithPointer(
      'gestionar-restos-poda',
      'mouse',
      false,
      'territory-card-mouse-desktop.png'
    );
    await choose('activar-pastoreo-preventivo');
    await choose('evaluar-quema-tecnica');
    assert(
      await evaluate(`(() => {
        const grazing = document.getElementById('territory-grazing');
        const line = document.getElementById('territory-professional-line');
        const explanation = document.querySelector('[data-visual-action-card-id="evaluar-quema-tecnica"] .visual-explanation');
        const flock = grazing?.querySelector('.map-grazing-flock');
        return grazing?.classList.contains('state-treated') &&
          line?.classList.contains('state-evaluated') &&
          flock && getComputedStyle(flock).display !== 'none' &&
          explanation?.textContent.includes('no significa que la maniobra se haya ejecutado');
      })()`),
      'Pastoreo and technical evaluation did not keep their expected visual and pedagogical states.'
    );
    await assertTerritoryLayout(false);
    await captureEvidence(
      'territory-grazing-evaluation-desktop.png',
      '.visual-scene[data-visual-template="territory"] .visual-canvas',
      { minWidth: 700, minHeight: 300 }
    );
    await advanceAndWait('[data-action-id="podar-ramas-y-retirar-seco"]');
    await assertHousingLayout(false);
    await choose('podar-ramas-y-retirar-seco');
    await chooseWithPointer(
      'separar-copas',
      'mouse',
      false,
      'housing-card-mouse-desktop.png',
      'housing'
    );
    assert(
      await evaluate(`(() => {
        const canopy = document.getElementById('housing-canopy');
        const connected = canopy?.querySelector('.housing-canopy-connected');
        const separated = canopy?.querySelector('.housing-canopy-separated');
        const feedback = document.querySelector('.inspection-confirmation p')?.textContent;
        return canopy?.classList.contains('state-broken') && connected && separated &&
          getComputedStyle(connected).display === 'none' && getComputedStyle(separated).display !== 'none' &&
          feedback?.includes('Reduce la continuidad horizontal junto a la vivienda');
      })()`),
      'Housing canopy treatment did not create visible discontinuities and causal feedback.'
    );
    await movePointerAway();
    await assertHousingLayout(false);
    await captureEvidence(
      'housing-canopy-separated-desktop.png',
      '.visual-scene[data-visual-template="housing"] .visual-canvas',
      { minWidth: 700, minHeight: 300 }
    );
    await waitForSelector('#advance-button');
    await pressEnter('#advance-button');
    await waitForSelector('.prevention-area');
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
      'territory-card-touch-mobile.png',
      'territory-treated-desktop.png',
      'territory-card-mouse-desktop.png',
      'territory-grazing-evaluation-desktop.png',
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
