export function renderPrototypePage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>¡Apaga las llamas!</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #101512;
        --panel: #18221d;
        --panel-soft: #202e27;
        --stroke: #43554b;
        --text: #f4f2e9;
        --muted: #b9c4bd;
        --primary: #f2b84b;
        --primary-ink: #201706;
        --accent: #62c4ad;
        --danger: #ef7b68;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at 82% 8%, rgba(81, 135, 104, 0.22), transparent 32rem),
          linear-gradient(145deg, #0d120f, var(--bg) 50%, #172019);
      }

      button { font: inherit; }
      button:focus-visible, [data-focus-action-id]:focus-visible, .action-card:focus-visible, summary:focus-visible {
        outline: 3px solid var(--primary);
        outline-offset: 3px;
      }
      .shell { min-height: 100vh; display: grid; grid-template-columns: 260px minmax(0, 1fr); }
      aside {
        padding: 24px 20px;
        border-right: 1px solid var(--stroke);
        background: rgba(11, 17, 13, 0.88);
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .brand { font-size: 1.25rem; font-weight: 800; }
      .brand span { color: var(--primary); }
      .eyebrow { margin: 0; color: var(--primary); font-size: .76rem; font-weight: 800; letter-spacing: .11em; text-transform: uppercase; }
      .muted { color: var(--muted); }
      .session-card, .history-card {
        padding: 14px;
        border: 1px solid var(--stroke);
        border-radius: 12px;
        background: rgba(27, 39, 32, .74);
      }
      .session-card strong { display: block; margin-top: 6px; overflow-wrap: anywhere; }
      .progress { display: grid; gap: 8px; margin-top: 14px; }
      .progress-line { height: 7px; border-radius: 999px; overflow: hidden; background: #2d3932; }
      .progress-line span { display: block; height: 100%; background: var(--accent); transition: width .25s ease; }
      .history-card { margin-top: auto; }
      .history-card ol { margin: 10px 0 0; padding-left: 20px; color: var(--muted); font-size: .82rem; line-height: 1.5; }

      main { width: 100%; max-width: 1240px; margin: 0 auto; padding: 28px clamp(18px, 4vw, 54px) 48px; }
      header { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 22px; }
      .status-row { display: flex; flex-wrap: wrap; gap: 8px; }
      .chip { padding: 7px 11px; border: 1px solid var(--stroke); border-radius: 999px; color: var(--muted); font-size: .78rem; }
      .chip.accent { color: #b9f2e3; border-color: #4e8f7f; background: #173b32; }
      .link-button { border: 0; padding: 8px; color: var(--muted); background: transparent; cursor: pointer; text-decoration: underline; }
      .link-button:hover { color: var(--text); }

      .scene {
        min-height: min(700px, calc(100vh - 145px));
        border: 1px solid var(--stroke);
        border-radius: 18px;
        padding: clamp(22px, 5vw, 56px);
        background: linear-gradient(150deg, rgba(31, 44, 36, .97), rgba(20, 29, 24, .96));
        box-shadow: 0 24px 70px rgba(0, 0, 0, .28);
      }
      .scene.briefing {
        display: grid;
        align-items: end;
        background:
          linear-gradient(90deg, rgba(10, 15, 12, .95), rgba(10, 15, 12, .58)),
          url('/images/operational-command-hero.png') center / cover;
      }
      .scene-copy { max-width: 760px; }
      h1 { margin: 10px 0 14px; font-size: clamp(2.25rem, 6vw, 4.7rem); line-height: .98; letter-spacing: -.045em; }
      h2 { margin: 8px 0 12px; font-size: clamp(1.9rem, 4vw, 3.25rem); line-height: 1.05; }
      h3 { margin: 0 0 8px; }
      p { line-height: 1.6; }
      .lead { max-width: 760px; color: #d9e0da; font-size: 1.08rem; }
      .objective { margin: 24px 0; padding: 16px 18px; border-left: 3px solid var(--accent); background: rgba(15, 26, 20, .55); }

      .visual-scene {
        margin: 28px 0;
        display: grid;
        gap: 14px;
      }
      .visual-canvas {
        min-width: 0;
        border: 1px solid var(--stroke);
        border-radius: 18px;
        overflow: hidden;
        background: #111a15;
      }
      .territory-svg { display: block; width: 100%; height: auto; max-height: 560px; }
      .visual-sky { fill: #24372d; }
      .visual-sky.crisis { fill: #342b24; }
      .visual-hill-back { fill: #355645; }
      .visual-hill-front { fill: #294536; }
      .visual-ravine { fill: #1c3026; stroke: #607c6d; stroke-width: 3; }
      .visual-ravine.crisis { fill: #2a2921; }
      .visual-road { fill: none; stroke: #d7c69d; stroke-width: 24; stroke-linecap: round; }
      .visual-road.local { stroke-width: 32; }
      .visual-vegetation-band { fill: none; stroke: #7aa25c; stroke-width: 28; stroke-linecap: round; }
      .visual-vegetation-band.secondary { stroke-width: 18; opacity: .75; }
      .visual-residues { fill: none; stroke: #c28a58; stroke-width: 9; stroke-linecap: round; }
      .visual-grazing { fill: #7c8852; stroke: #bdc985; stroke-width: 3; }
      .visual-professional-line, .visual-attack-window { fill: none; stroke: #f0c86b; stroke-width: 10; stroke-dasharray: 18 12; }
      .visual-line-marker { fill: #f0c86b; }
      .visual-house { fill: #b98e6c; stroke: #f0dfc5; stroke-width: 4; }
      .visual-door { fill: #574236; }
      .visual-window { fill: #b8dbe0; }
      .visual-trunk { fill: none; stroke: #72543a; stroke-width: 14; }
      .visual-branches { fill: none; stroke: #837055; stroke-width: 10; stroke-linecap: round; }
      .visual-canopy { fill: #466a47; stroke: #82a76e; stroke-width: 4; }
      .visual-engine { fill: #b64d42; stroke: #f2e8dd; stroke-width: 3; }
      .visual-engine + circle, .visual-engine ~ circle { fill: #171b18; }
      .visual-retreat { fill: none; stroke: #68c9b1; stroke-width: 11; stroke-dasharray: 15 10; }
      .visual-arrow { fill: none; stroke: #68c9b1; stroke-width: 8; }
      .visual-position { fill: rgba(98,196,173,.18); stroke: #62c4ad; stroke-width: 5; }
      .visual-position + path { stroke: #d9fff5; stroke-width: 5; }
      .visual-fire { fill: #e66f4e; stroke: #ffd166; stroke-width: 5; }
      .visual-label-group text { fill: #d4dfd8; font-size: 17px; font-weight: 700; paint-order: stroke; stroke: #172019; stroke-width: 5; }
      .visual-hotspot { cursor: pointer; }
      .visual-hotspot:hover { filter: brightness(1.16); }

      .state-treated .visual-residues { opacity: .18; stroke-dasharray: 8 18; }
      .state-broken .visual-vegetation-band, .state-broken .visual-canopy { stroke-dasharray: 20 28; opacity: .58; }
      .state-reduced .visual-vegetation-band, .state-reduced .visual-canopy, .state-reduced .visual-branches { opacity: .48; stroke-dasharray: 25 16; }
      .state-noCrownFire .visual-canopy { opacity: .7; stroke-dasharray: 22 14; }
      .state-constrained .visual-road, .state-limited .visual-retreat { stroke-dasharray: 24 19; opacity: .68; }
      .state-blocked .visual-road { stroke: #8b645d; stroke-dasharray: 12 21; }
      .state-unevaluated .visual-professional-line { opacity: .3; stroke-dasharray: 5 22; }
      .state-unavailable .visual-attack-window, .state-unsustainable .visual-position { opacity: .28; stroke-dasharray: 8 18; }
      .state-severe .visual-fire { transform-origin: 585px 340px; transform: scale(1.16); }
      .state-crownRisk .visual-canopy { stroke: #d69a5b; stroke-width: 8; }
      .state-crownFire .visual-canopy { fill: #7f483a; stroke: #f3a348; stroke-width: 10; }

      .visual-status-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 9px;
      }
      .visual-status {
        min-height: 58px;
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid var(--stroke);
        border-radius: 12px;
        padding: 10px 12px;
        text-align: left;
        color: var(--text);
        background: #152019;
      }
      .visual-status:not(:disabled) { cursor: pointer; }
      .visual-status:disabled { opacity: 1; cursor: default; }
      .visual-status span:last-child { display: grid; gap: 2px; }
      .visual-status small, .visual-dimension small, .visual-explanation { color: var(--muted); }
      .visual-explanation { font-size: .78rem; line-height: 1.35; }
      .visual-status-symbol {
        width: 18px;
        height: 18px;
        flex: 0 0 18px;
        border: 2px solid currentColor;
        border-radius: 50%;
      }
      .state-clear .visual-status-symbol, .state-treated .visual-status-symbol, .state-broken .visual-status-symbol,
      .state-viable .visual-status-symbol, .state-sustainable .visual-status-symbol, .state-withinCapacity .visual-status-symbol,
      .state-favorable .visual-status-symbol, .state-noCrownFire .visual-status-symbol { border-radius: 4px; transform: rotate(45deg); }
      .state-blocked .visual-status-symbol, .state-unavailable .visual-status-symbol, .state-unsustainable .visual-status-symbol,
      .state-exceeded .visual-status-symbol, .state-critical .visual-status-symbol { border-radius: 0; transform: rotate(45deg); }
      .state-constrained .visual-status-symbol, .state-limited .visual-status-symbol,
      .state-conditioned .visual-status-symbol { border-style: dashed; }

      .visual-dimension-summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        gap: 10px;
      }
      .visual-dimension {
        display: flex;
        gap: 12px;
        min-height: 116px;
        padding: 15px;
        border: 1px solid var(--stroke);
        border-radius: 13px;
        background: rgba(12,20,15,.58);
      }
      .visual-dimension > div { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
      .visual-dimension-state { font-size: 1.25rem; font-weight: 850; text-transform: capitalize; }
      .visual-dimension details { margin-top: auto; font-size: .8rem; }
      .visual-dimension summary { color: var(--muted); }

      .actions, .relations, .dimension-grid { display: grid; gap: 12px; margin-top: 24px; }
      .actions { grid-template-columns: repeat(auto-fit, minmax(235px, 1fr)); }
      .action-card, .relation, .dimension {
        border: 1px solid var(--stroke);
        border-radius: 13px;
        padding: 17px;
        background: rgba(12, 20, 15, .48);
      }
      .action-card { display: flex; min-height: 190px; flex-direction: column; gap: 8px; }
      .action-card.selected { border-color: var(--accent); background: rgba(31, 83, 69, .34); }
      .action-card p { margin: 0 0 12px; color: var(--muted); font-size: .9rem; }
      .action-card button { margin-top: auto; }
      .action-card small { color: var(--danger); }

      .primary, .secondary {
        min-height: 46px;
        border-radius: 10px;
        padding: 11px 17px;
        cursor: pointer;
        font-weight: 780;
      }
      .primary { border: 1px solid #ffd37c; color: var(--primary-ink); background: var(--primary); }
      .secondary { border: 1px solid #5c7568; color: var(--text); background: #293a31; }
      button:disabled { cursor: not-allowed; opacity: .48; }
      .footer-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }

      .dimension-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
      .dimension strong { display: block; margin-top: 7px; font-size: 1.75rem; }
      .meter { height: 7px; margin-top: 12px; border-radius: 999px; background: #2f3b34; overflow: hidden; }
      .meter span { display: block; height: 100%; background: linear-gradient(90deg, var(--accent), var(--primary)); }
      .feedback { margin-top: 18px; padding: 15px; border: 1px solid #4d8e7c; border-radius: 11px; background: #173a31; }
      .router-mark { width: 72px; height: 72px; display: grid; place-items: center; margin-bottom: 22px; border-radius: 50%; color: #10231d; background: var(--accent); font-size: 2rem; }
      .result-contained { border-color: #4d8e7c; }
      .result-overwhelmed { border-color: #9f665b; }
      .relation { position: relative; padding-left: 48px; }
      .relation::before { content: '→'; position: absolute; left: 17px; top: 16px; font-weight: 900; color: var(--accent); }
      .relation.decisive { border-left: 4px solid var(--primary); }
      .relation p { margin-bottom: 0; color: var(--muted); }
      .cause-list { color: #dce6df; font-size: .88rem; }
      details { margin-top: 22px; }
      summary { cursor: pointer; color: var(--accent); }
      #notice { min-height: 24px; margin-top: 12px; color: var(--danger); }
      .loading { min-height: 60vh; display: grid; place-items: center; color: var(--muted); }

      @media (max-width: 800px) {
        .shell { grid-template-columns: 1fr; }
        aside { border-right: 0; border-bottom: 1px solid var(--stroke); }
        .history-card { display: none; }
        main { padding-top: 18px; }
        .scene { min-height: auto; }
        .visual-status-list, .visual-dimension-summary { grid-template-columns: 1fr; }
        .territory-svg { min-height: 320px; }
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .001ms !important; animation-duration: .001ms !important; animation-iteration-count: 1 !important; }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <aside>
        <div>
          <div class="brand"><span>🔥</span> Apaga las llamas</div>
          <p class="muted">Vertical Beta 1 · decisiones con consecuencias</p>
        </div>
        <div class="session-card">
          <span class="muted">Escena actual</span>
          <strong id="current-scene">Preparando partida…</strong>
          <div class="progress">
            <span class="muted" id="progress-copy">0 nodos completados</span>
            <div class="progress-line"><span id="progress-bar" style="width:0%"></span></div>
          </div>
        </div>
        <div class="history-card">
          <strong>Últimas decisiones</strong>
          <ol id="decision-history"><li>Aún no hay decisiones.</li></ol>
        </div>
      </aside>

      <main>
        <header>
          <div class="status-row">
            <span class="chip accent" id="scene-type">briefing</span>
            <span class="chip" id="branch-chip">Ruta pendiente</span>
            <span class="chip" id="session-status">Partida activa</span>
          </div>
          <button class="link-button" id="restart-button" type="button">Reiniciar partida</button>
        </header>
        <div id="game" aria-live="polite"><div class="loading">Creando sesión…</div></div>
        <div id="notice" role="alert"></div>
      </main>
    </div>

    <script>
      let currentView = null;
      let sessionId = null;
      let busy = false;

      const game = document.getElementById('game');
      const notice = document.getElementById('notice');

      function escapeHtml(value) {
        return String(value)
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#039;');
      }

      async function request(path, options) {
        notice.textContent = '';
        busy = true;
        try {
          const response = await fetch(path, {
            headers: { 'content-type': 'application/json' },
            ...options
          });
          const payload = await response.json();
          if (!response.ok) throw new Error(payload.message || 'No se pudo completar la acción.');
          currentView = payload;
          sessionId = payload.session.id;
          render();
        } catch (error) {
          notice.textContent = error instanceof Error ? error.message : 'Error inesperado.';
        } finally {
          busy = false;
        }
      }

      function visualMarkup() {
        return currentView && currentView.visualMarkup ? currentView.visualMarkup : '';
      }

      function actionCards(scene) {
        return '<div class="actions">' + scene.actions.map(function (action) {
          const selected = action.selected ? ' selected' : '';
          const disabled = !action.available ? ' disabled' : '';
          const label = action.selected ? 'Seleccionada' : 'Elegir';
          return '<article class="action-card' + selected + '" data-action-card-id="' + escapeHtml(action.id) + '">' +
            '<h3>' + escapeHtml(action.label) + '</h3>' +
            '<p>' + escapeHtml(action.description) + '</p>' +
            (action.unavailableReason ? '<small>' + escapeHtml(action.unavailableReason) + '</small>' : '') +
            '<button class="secondary action-button" data-action-id="' + escapeHtml(action.id) + '" type="button"' + disabled + '>' + label + '</button>' +
          '</article>';
        }).join('') + '</div>';
      }

      function advanceButton(scene) {
        if (!scene.canAdvance) return '';
        return '<div class="footer-actions"><button class="primary" id="advance-button" type="button">' +
          escapeHtml(scene.advanceLabel || 'Continuar') + '</button></div>';
      }

      function renderBriefing(scene) {
        return '<section class="scene briefing"><div class="scene-copy">' +
          '<p class="eyebrow">Misión municipal</p><h1>' + escapeHtml(scene.title) + '</h1>' +
          '<p class="lead">' + escapeHtml(scene.mission) + '</p>' + advanceButton(scene) +
        '</div></section>';
      }

      function renderInspection(scene) {
        return '<section class="scene"><p class="eyebrow">Inspección preventiva · ' + scene.selectedCount + '/' + scene.actionQuota + '</p>' +
          '<h2>' + escapeHtml(scene.title) + '</h2><p class="lead">' + escapeHtml(scene.body) + '</p>' +
          '<div class="objective"><strong>Objetivo</strong><br>' + escapeHtml(scene.objective) + '</div>' +
          visualMarkup() + actionCards(scene) + advanceButton(scene) + '</section>';
      }

      function renderSummary(scene) {
        return '<section class="scene"><p class="eyebrow">Lo que heredará la emergencia</p>' +
          '<h2>' + escapeHtml(scene.title) + '</h2><p class="lead">' + escapeHtml(scene.body) + '</p>' +
          '<div class="objective"><strong>Puente causal</strong><br>Lo que trataste en prevención define las condiciones con las que empieza la emergencia.</div>' +
          visualMarkup() + advanceButton(scene) + '</section>';
      }

      function renderDecision(scene) {
        return '<section class="scene"><p class="eyebrow">Decisión operativa' + (scene.difficulty ? ' · ' + escapeHtml(scene.difficulty) : '') + '</p>' +
          '<h2>' + escapeHtml(scene.title) + '</h2><p class="lead">' + escapeHtml(scene.body) + '</p>' +
          '<div class="objective">' + escapeHtml(scene.context) + '</div>' + visualMarkup() + actionCards(scene) +
          (scene.feedback ? '<div class="feedback"><strong>Consecuencia</strong><br>' + escapeHtml(scene.feedback) + '</div>' : '') +
          advanceButton(scene) + '</section>';
      }

      function renderRouter(scene) {
        return '<section class="scene"><div class="router-mark" aria-hidden="true">↝</div>' +
          '<p class="eyebrow">Router causal automático</p><h2>' + escapeHtml(scene.title) + '</h2>' +
          '<p class="lead">' + escapeHtml(scene.body) + '</p>' + visualMarkup() + advanceButton(scene) + '</section>';
      }

      function renderResult(scene) {
        return '<section class="scene result-' + escapeHtml(scene.variant) + '"><p class="eyebrow">Informe causal · ' + escapeHtml(scene.variant) + '</p>' +
          '<h2>' + escapeHtml(scene.title) + '</h2><p class="lead">' + escapeHtml(scene.body) + '</p>' + visualMarkup() +
          '<div class="relations" aria-label="Cadenas causales de la partida">' + scene.relations.map(function (relation) {
            return '<article class="relation' + (relation.branchDecisive ? ' decisive' : '') + '"><h3>' + escapeHtml(relation.title) + '</h3>' +
              '<div class="cause-list">Prevención → ' + relation.causeActionLabels.map(escapeHtml).join(' · ') + '</div>' +
              '<p>' + escapeHtml(relation.effect) + '</p></article>';
          }).join('') + '</div><div class="feedback">' + escapeHtml(scene.closing) + '</div>' +
          '<details><summary>Revisar mis decisiones preventivas</summary><ul>' +
            currentView.session.preventionReview.map(function (entry) { return '<li>' + escapeHtml(entry.label) + '</li>'; }).join('') +
          '</ul></details>' + advanceButton(scene) + '</section>';
      }

      const RENDERERS = {
        briefing: renderBriefing,
        inspection: renderInspection,
        summary: renderSummary,
        decision: renderDecision,
        router: renderRouter,
        result: renderResult
      };

      function focusAction(actionId) {
        const button = Array.from(document.querySelectorAll('.action-button')).find(function (candidate) {
          return candidate.dataset.actionId === actionId;
        });
        if (!button) return;
        const card = button.closest('.action-card');
        if (!card) return;
        if (button.disabled) {
          card.setAttribute('tabindex', '-1');
          card.focus();
        } else {
          button.focus();
        }
        const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        card.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
      }

      function wireCommands() {
        document.querySelectorAll('.action-button').forEach(function (button) {
          button.addEventListener('click', function () {
            button.disabled = true;
            request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/actions', {
              method: 'POST',
              body: JSON.stringify({ actionId: button.dataset.actionId })
            });
          });
        });
        document.querySelectorAll('[data-focus-action-id]').forEach(function (element) {
          element.addEventListener('click', function (event) {
            event.preventDefault();
            focusAction(element.dataset.focusActionId);
          });
        });
        const advance = document.getElementById('advance-button');
        if (advance) {
          advance.addEventListener('click', function () {
            advance.disabled = true;
            request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/advance', {
              method: 'POST', body: '{}'
            });
          });
        }
      }

      function renderSidebar() {
        const session = currentView.session;
        document.getElementById('current-scene').textContent = currentView.scene.title;
        document.getElementById('progress-copy').textContent = session.completedSceneIds.length + ' nodos completados';
        document.getElementById('progress-bar').style.width = Math.min(100, session.completedSceneIds.length * 10) + '%';
        document.getElementById('scene-type').textContent = currentView.scene.type;
        document.getElementById('branch-chip').textContent = session.branch ? 'Ruta ' + session.branch : 'Ruta pendiente';
        document.getElementById('session-status').textContent = session.status === 'completed' ? 'Partida completada' : 'Partida activa';
        const decisions = session.decisionReview.slice(-5);
        document.getElementById('decision-history').innerHTML = decisions.length === 0
          ? '<li>Aún no hay decisiones.</li>'
          : decisions.map(function (decision) { return '<li>' + escapeHtml(decision.label) + '</li>'; }).join('');
      }

      function render() {
        if (!currentView) return;
        const renderer = RENDERERS[currentView.scene.type];
        if (!renderer) throw new Error('Tipo de escena no soportado: ' + currentView.scene.type);
        game.innerHTML = renderer(currentView.scene);
        renderSidebar();
        wireCommands();
      }

      document.getElementById('restart-button').addEventListener('click', function () {
        if (!sessionId || busy) return;
        request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/restart', {
          method: 'POST', body: '{}'
        });
      });

      request('/api/game-sessions', { method: 'POST', body: '{}' });
    </script>
  </body>
</html>`;
}
