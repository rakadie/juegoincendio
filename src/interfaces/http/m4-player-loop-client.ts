export const M4_PLAYER_LOOP_CLIENT = String.raw`
(function () {
  const STORAGE_KEY = 'vertical-beta.resume.v1';
  const RESUME_SCHEMA_VERSION = 1;
  const MAX_COMMANDS = 32;
  const originalFetch = window.fetch.bind(window);
  let lastGameView = null;

  function isResumeCommand(value) {
    return value && typeof value === 'object' &&
      (value.type === 'advance' ||
        (value.type === 'action' && typeof value.actionId === 'string' && value.actionId.length > 0));
  }

  function readEnvelope() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const value = JSON.parse(raw);
      if (!value || value.resumeSchemaVersion !== RESUME_SCHEMA_VERSION) return null;
      if (typeof value.referenceContextId !== 'string' || value.referenceContextId.length === 0) return null;
      if (typeof value.sessionId !== 'string' || value.sessionId.length === 0) return null;
      if (!Array.isArray(value.commands) || value.commands.length > MAX_COMMANDS) return null;
      if (!value.commands.every(isResumeCommand)) return null;
      return value;
    } catch {
      return null;
    }
  }

  function writeEnvelope(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Storage can be unavailable; the active server session still works normally.
    }
  }

  function clearEnvelope() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // No-op: continuity is optional when storage is unavailable.
    }
  }

  function payloadContextId(payload) {
    return payload && payload.context && typeof payload.context.referenceContextId === 'string'
      ? payload.context.referenceContextId
      : null;
  }

  function pathnameFor(input) {
    try {
      const raw = typeof input === 'string' ? input : input.url;
      return new URL(raw, window.location.origin).pathname;
    } catch {
      return '';
    }
  }

  function methodFor(init) {
    return String(init && init.method ? init.method : 'GET').toUpperCase();
  }

  function parseActionId(init) {
    try {
      const body = init && typeof init.body === 'string' ? JSON.parse(init.body) : null;
      return body && typeof body.actionId === 'string' ? body.actionId : null;
    } catch {
      return null;
    }
  }

  function recordSuccessfulResponse(pathname, method, init, payload) {
    if (!payload || !payload.session || typeof payload.session.id !== 'string') return;
    lastGameView = payload;
    const session = payload.session;
    const contextId = payloadContextId(payload);

    if (method === 'POST' && pathname === '/api/game-sessions') {
      if (session.status === 'active' && contextId) {
        writeEnvelope({
          resumeSchemaVersion: RESUME_SCHEMA_VERSION,
          referenceContextId: contextId,
          sessionId: session.id,
          commands: []
        });
      }
      return;
    }

    const sessionPrefix = '/api/game-sessions/' + encodeURIComponent(session.id);
    if (!pathname.startsWith(sessionPrefix)) return;

    if (session.status === 'completed') {
      clearEnvelope();
      return;
    }

    const current = readEnvelope();
    if (!current || current.sessionId !== session.id) return;

    if (method === 'POST' && pathname === sessionPrefix + '/restart') {
      writeEnvelope({ ...current, commands: [] });
      return;
    }

    if (method === 'POST' && pathname === sessionPrefix + '/advance') {
      if (current.commands.length < MAX_COMMANDS) {
        writeEnvelope({ ...current, commands: current.commands.concat([{ type: 'advance' }]) });
      }
      return;
    }

    if (method === 'POST' && pathname === sessionPrefix + '/actions') {
      const actionId = parseActionId(init);
      if (actionId && current.commands.length < MAX_COMMANDS) {
        writeEnvelope({ ...current, commands: current.commands.concat([{ type: 'action', actionId }]) });
      }
    }
  }

  window.fetch = async function (input, init) {
    const response = await originalFetch(input, init);
    if (response.ok) {
      try {
        const payload = await response.clone().json();
        recordSuccessfulResponse(pathnameFor(input), methodFor(init), init, payload);
      } catch {
        // Non-JSON responses are irrelevant to the player loop.
      }
    }
    return response;
  };

  function ensureResultStyle() {
    if (document.getElementById('m4-result-closure-style')) return;
    const style = document.createElement('style');
    style.id = 'm4-result-closure-style';
    style.textContent =
      '.m4-causal-steps{display:grid;gap:7px;margin:10px 0 0;padding:0;list-style:none}' +
      '.m4-causal-step{display:grid;grid-template-columns:minmax(110px,.32fr) minmax(0,1fr);gap:10px;padding:8px 10px;border-radius:7px;background:#f4f6f4}' +
      '.m4-causal-step strong{font-size:.72rem;text-transform:uppercase;letter-spacing:.04em;color:#49606a}' +
      '.m4-causal-step span{font-size:.84rem;color:#243740}' +
      '.m4-compare-actions{display:flex;justify-content:flex-start;margin:18px 0}' +
      '.m4-comparison{margin:18px 0;padding:18px;border:1px solid #c8d0cd;border-radius:11px;background:#f7f9f7}' +
      '.m4-comparison>p{max-width:850px;color:#52666f}' +
      '.m4-comparison-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}' +
      '.m4-comparison-side{padding:14px;border:1px solid #cbd3d0;border-radius:9px;background:#fff}' +
      '.m4-comparison-side h4{margin:0 0 4px;font-size:1.05rem}' +
      '.m4-comparison-meta{margin:0 0 12px;color:#566a73;font-size:.82rem}' +
      '.m4-comparison-dimensions{display:grid;gap:6px;margin:0 0 14px;padding:0;list-style:none}' +
      '.m4-comparison-dimension{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;padding:7px 9px;border-radius:7px;background:#f3f6f4}' +
      '.m4-comparison-dimension strong{font-size:.8rem}' +
      '.m4-comparison-dimension span{font-size:.78rem;color:#4c626b}' +
      '.m4-manifestations{display:grid;gap:7px}' +
      '.m4-manifestation{padding:8px 9px;border-left:3px solid #758d82;background:#f6f7f6}' +
      '.m4-manifestation strong{display:block;font-size:.8rem}' +
      '.m4-manifestation span,.m4-manifestation small{display:block;margin-top:2px;color:#53666e;font-size:.76rem;line-height:1.35}' +
      '@media(max-width:700px){.m4-causal-step{grid-template-columns:1fr;gap:2px}.m4-comparison-grid{grid-template-columns:1fr}}';
    document.head.appendChild(style);
  }

  function appendResultStep(list, label, value) {
    const item = document.createElement('li');
    item.className = 'm4-causal-step';
    const name = document.createElement('strong');
    name.textContent = label;
    const text = document.createElement('span');
    text.textContent = value;
    item.append(name, text);
    list.appendChild(item);
  }

  function renderComparisonSide(label, side) {
    const article = document.createElement('article');
    article.className = 'm4-comparison-side';
    const heading = document.createElement('h4');
    heading.textContent = label;
    const meta = document.createElement('p');
    meta.className = 'm4-comparison-meta';
    meta.textContent = side.branchLabel + ' · ' + side.resultLabel;
    const dimensions = document.createElement('ul');
    dimensions.className = 'm4-comparison-dimensions';
    side.dimensions.forEach(function (dimension) {
      const item = document.createElement('li');
      item.className = 'm4-comparison-dimension';
      const name = document.createElement('strong');
      name.textContent = dimension.label;
      const state = document.createElement('span');
      state.textContent = dimension.stateLabel;
      item.append(name, state);
      dimensions.appendChild(item);
    });
    const manifestationTitle = document.createElement('h4');
    manifestationTitle.textContent = 'Manifestaciones decisivas';
    const manifestations = document.createElement('div');
    manifestations.className = 'm4-manifestations';
    side.manifestations.forEach(function (manifestation) {
      const item = document.createElement('div');
      item.className = 'm4-manifestation';
      const title = document.createElement('strong');
      title.textContent = manifestation.title + ' · ' + manifestation.sceneLabel;
      const cause = document.createElement('span');
      cause.textContent = manifestation.causeLabel;
      const effect = document.createElement('small');
      effect.textContent = manifestation.effect;
      item.append(title, cause, effect);
      manifestations.appendChild(item);
    });
    article.append(heading, meta, dimensions, manifestationTitle, manifestations);
    return article;
  }

  function renderComparison(payload) {
    const sceneContent = document.querySelector('.scene[class*="result-"] .scene-content');
    if (!sceneContent) return;
    const previous = document.getElementById('m4-reference-comparison');
    if (previous) previous.remove();
    const section = document.createElement('section');
    section.id = 'm4-reference-comparison';
    section.className = 'm4-comparison';
    section.setAttribute('aria-labelledby', 'm4-reference-comparison-title');
    const title = document.createElement('h3');
    title.id = 'm4-reference-comparison-title';
    title.textContent = payload.title;
    const explanation = document.createElement('p');
    explanation.textContent = payload.explanation;
    const grid = document.createElement('div');
    grid.className = 'm4-comparison-grid';
    grid.append(
      renderComparisonSide('Tu partida', payload.current),
      renderComparisonSide('Otro recorrido de referencia', payload.reference)
    );
    section.append(title, explanation, grid);
    const details = sceneContent.querySelector('details');
    if (details) details.insertAdjacentElement('beforebegin', section); else sceneContent.appendChild(section);
    title.setAttribute('tabindex', '-1');
    title.focus();
  }

  function ensureComparisonAction() {
    const view = lastGameView;
    if (!view || !view.scene || view.scene.type !== 'result') return;
    const sceneContent = document.querySelector('.scene[class*="result-"] .scene-content');
    if (!sceneContent || document.getElementById('compare-reference-button')) return;
    const actions = document.createElement('div');
    actions.className = 'm4-compare-actions';
    const button = document.createElement('button');
    button.id = 'compare-reference-button';
    button.className = 'secondary';
    button.type = 'button';
    button.textContent = 'Comparar con otro recorrido';
    button.addEventListener('click', async function () {
      if (button.disabled) return;
      button.disabled = true;
      try {
        const response = await originalFetch(
          '/api/game-sessions/' + encodeURIComponent(view.session.id) + '/comparison'
        );
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.message || 'No se pudo abrir la comparación.');
        renderComparison(payload);
      } catch (error) {
        const notice = document.getElementById('notice');
        if (notice) notice.textContent = error instanceof Error ? error.message : 'No se pudo abrir la comparación.';
      } finally {
        button.disabled = false;
      }
    });
    actions.appendChild(button);
    const details = sceneContent.querySelector('details');
    if (details) details.insertAdjacentElement('beforebegin', actions); else sceneContent.appendChild(actions);
  }

  function enhanceResult() {
    const view = lastGameView;
    if (!view || !view.scene || view.scene.type !== 'result') return;
    const container = document.querySelector('.relations');
    if (!container) return;
    if (container.dataset.m4ClosureEnhanced !== 'true') {
      const cards = Array.from(container.querySelectorAll('.relation'));
      if (cards.length !== view.scene.relations.length) return;
      ensureResultStyle();
      view.scene.relations.forEach(function (relation, index) {
        const card = cards[index];
        const title = card.querySelector('h3');
        const oldCause = card.querySelector('.cause-list');
        const oldEffect = card.querySelector('p');
        if (oldCause) oldCause.remove();
        if (oldEffect) oldEffect.remove();
        const steps = document.createElement('ol');
        steps.className = 'm4-causal-steps';
        steps.setAttribute('aria-label', 'Cadena causal de ' + relation.dimensionLabel);
        appendResultStep(
          steps,
          'Causa',
          relation.causeType + ': ' + relation.causeActionLabels.join(' · ')
        );
        appendResultStep(
          steps,
          'Estado heredado',
          relation.dimensionLabel + ': ' + relation.stateLabel
        );
        appendResultStep(steps, 'Durante la crisis', relation.manifestationLabel);
        appendResultStep(steps, 'Consecuencia', relation.effect);
        if (title) title.insertAdjacentElement('afterend', steps); else card.appendChild(steps);
      });
      container.dataset.m4ClosureEnhanced = 'true';
    }
    ensureComparisonAction();
  }

  async function fetchReferenceContextId() {
    try {
      const response = await originalFetch('/api/vertical-beta/context');
      if (!response.ok) return null;
      const context = await response.json();
      return typeof context.referenceContextId === 'string' ? context.referenceContextId : null;
    } catch {
      return null;
    }
  }

  function addContinueButton(envelope, needsRestore) {
    const actions = document.querySelector('.entry-actions');
    if (!actions || document.getElementById('continue-session-button')) return;
    const button = document.createElement('button');
    button.className = 'secondary';
    button.id = 'continue-session-button';
    button.type = 'button';
    button.textContent = 'Continuar partida';
    button.addEventListener('click', async function () {
      if (button.disabled) return;
      button.disabled = true;
      try {
        if (needsRestore) {
          const restored = await originalFetch(
            '/api/game-sessions/' + encodeURIComponent(envelope.sessionId) + '/restore',
            {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                resumeSchemaVersion: envelope.resumeSchemaVersion,
                referenceContextId: envelope.referenceContextId,
                commands: envelope.commands
              })
            }
          );
          if (!restored.ok) throw new Error('No se pudo recuperar la partida guardada.');
        }
        if (typeof window.request !== 'function') throw new Error('La partida todavía no está disponible.');
        const loaded = await window.request(
          '/api/game-sessions/' + encodeURIComponent(envelope.sessionId),
          { method: 'GET' }
        );
        if (!loaded) throw new Error('No se pudo continuar la partida.');
        if (typeof window.focusCurrentSceneHeading === 'function') window.focusCurrentSceneHeading();
      } catch (error) {
        const notice = document.getElementById('notice');
        if (notice) notice.textContent = error instanceof Error ? error.message : 'No se pudo continuar la partida.';
        button.disabled = false;
      }
    });
    actions.appendChild(button);
  }

  async function prepareResume() {
    const envelope = readEnvelope();
    if (!envelope) {
      clearEnvelope();
      return;
    }
    const contextId = await fetchReferenceContextId();
    if (!contextId || contextId !== envelope.referenceContextId) {
      clearEnvelope();
      return;
    }
    try {
      const response = await originalFetch('/api/game-sessions/' + encodeURIComponent(envelope.sessionId));
      if (response.ok) {
        const payload = await response.json();
        if (payload && payload.session && payload.session.status === 'active') {
          addContinueButton(envelope, false);
        } else {
          clearEnvelope();
        }
        return;
      }
      if (response.status === 404) {
        addContinueButton(envelope, true);
        return;
      }
      clearEnvelope();
    } catch {
      // Keep the journal when the server is temporarily unreachable.
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    prepareResume();
    const game = document.getElementById('game');
    if (game) {
      new MutationObserver(enhanceResult).observe(game, { childList: true, subtree: true });
    }
    enhanceResult();
  }, { once: true });
})();
`;
