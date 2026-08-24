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

      main { width: 100%; max-width: 1160px; margin: 0 auto; padding: 28px clamp(18px, 4vw, 54px) 48px; }
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

      function actionCards(scene) {
        return '<div class="actions">' + scene.actions.map(function (action) {
          const selected = action.selected ? ' selected' : '';
          const disabled = !action.available ? ' disabled' : '';
          const label = action.selected ? 'Seleccionada' : 'Elegir';
          return '<article class="action-card' + selected + '">' +
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
          actionCards(scene) + advanceButton(scene) + '</section>';
      }

      function renderSummary(scene) {
        return '<section class="scene"><p class="eyebrow">Lo que heredará la emergencia</p>' +
          '<h2>' + escapeHtml(scene.title) + '</h2><p class="lead">' + escapeHtml(scene.body) + '</p>' +
          '<div class="dimension-grid">' + scene.dimensions.map(function (dimension) {
            return '<article class="dimension"><span class="muted">' + escapeHtml(dimension.label) + '</span>' +
              '<strong>' + dimension.value + '<small>/100</small></strong>' +
              '<div class="meter"><span style="width:' + dimension.value + '%"></span></div></article>';
          }).join('') + '</div>' + advanceButton(scene) + '</section>';
      }

      function renderDecision(scene) {
        return '<section class="scene"><p class="eyebrow">Decisión operativa' + (scene.difficulty ? ' · ' + escapeHtml(scene.difficulty) : '') + '</p>' +
          '<h2>' + escapeHtml(scene.title) + '</h2><p class="lead">' + escapeHtml(scene.body) + '</p>' +
          '<div class="objective">' + escapeHtml(scene.context) + '</div>' + actionCards(scene) +
          (scene.feedback ? '<div class="feedback"><strong>Consecuencia</strong><br>' + escapeHtml(scene.feedback) + '</div>' : '') +
          advanceButton(scene) + '</section>';
      }

      function renderRouter(scene) {
        return '<section class="scene"><div class="router-mark" aria-hidden="true">↝</div>' +
          '<p class="eyebrow">Router causal automático</p><h2>' + escapeHtml(scene.title) + '</h2>' +
          '<p class="lead">' + escapeHtml(scene.body) + '</p>' + advanceButton(scene) + '</section>';
      }

      function renderResult(scene) {
        return '<section class="scene result-' + escapeHtml(scene.variant) + '"><p class="eyebrow">Informe causal · ' + escapeHtml(scene.variant) + '</p>' +
          '<h2>' + escapeHtml(scene.title) + '</h2><p class="lead">' + escapeHtml(scene.body) + '</p>' +
          '<div class="relations">' + scene.relations.map(function (relation) {
            return '<article class="relation' + (relation.branchDecisive ? ' decisive' : '') + '"><h3>' + escapeHtml(relation.title) + '</h3>' +
              '<div class="cause-list">Prevención: ' + relation.causeActionLabels.map(escapeHtml).join(' · ') + '</div>' +
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
