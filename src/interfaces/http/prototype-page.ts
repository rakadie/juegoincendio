export function renderPrototypePage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>¡Apaga las llamas!</title>
    <style>
      :root {
        color-scheme: light;
        --navy: #071726;
        --navy-soft: #102536;
        --surface: #f7f8f6;
        --surface-muted: #eef1ee;
        --line: #cbd2cf;
        --ink: #17242d;
        --muted: #617079;
        --green: #4f9139;
        --green-dark: #24622f;
        --orange: #d8780f;
        --red: #b73228;
        --accent: #f0b44b;
        --focus: #0b7b67;
        --shadow: 0 18px 48px rgba(7, 23, 38, .14);
      }

      * { box-sizing: border-box; }
      html { background: #dfe6e3; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--ink);
        background:
          radial-gradient(circle at 8% 0%, rgba(79, 145, 57, .12), transparent 26rem),
          linear-gradient(180deg, #e9efec, #dfe6e3 58%, #d8e0dd);
      }

      button { font: inherit; }
      button:focus-visible,
      [data-focus-action-id]:focus-visible,
      .action-card:focus-visible,
      summary:focus-visible {
        outline: 3px solid var(--focus);
        outline-offset: 3px;
      }

      .northstar-shell { min-height: 100vh; display: flex; flex-direction: column; }
      .topbar {
        position: sticky;
        top: 0;
        z-index: 20;
        min-height: 76px;
        display: grid;
        grid-template-columns: minmax(210px, .8fr) minmax(520px, 2fr) minmax(160px, .7fr);
        align-items: center;
        gap: 22px;
        padding: 12px clamp(16px, 3vw, 38px);
        color: #f7fbff;
        background: linear-gradient(90deg, #061522, var(--navy) 58%, #0c2130);
        border-bottom: 1px solid #294052;
        box-shadow: 0 8px 28px rgba(2, 13, 22, .24);
      }

      .brand { display: flex; align-items: center; gap: 11px; min-width: 0; }
      .brand-mark {
        width: 42px;
        height: 48px;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        border: 2px solid #f0b44b;
        border-radius: 12px 12px 16px 16px;
        color: #fff;
        background: #982c23;
        font-size: 1.35rem;
        box-shadow: inset 0 0 0 3px #071726;
      }
      .brand-copy { min-width: 0; }
      .brand-copy strong { display: block; font-size: 1rem; letter-spacing: .08em; text-transform: uppercase; }
      .brand-copy small { display: block; margin-top: 2px; color: #b9c8d2; font-size: .69rem; }

      .journey { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); align-items: center; }
      .stage { position: relative; display: grid; grid-template-columns: 32px 1fr; align-items: center; gap: 8px; min-width: 0; color: #9db0bc; }
      .stage:not(:last-child)::after {
        content: '';
        position: absolute;
        height: 2px;
        left: calc(32px + 10px);
        right: 8px;
        top: 15px;
        background: #4d6170;
      }
      .stage-dot {
        position: relative;
        z-index: 1;
        width: 32px;
        height: 32px;
        display: grid;
        place-items: center;
        border: 2px solid #4d6170;
        border-radius: 999px;
        background: var(--navy);
        color: inherit;
        font-size: .78rem;
        font-weight: 850;
      }
      .stage-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .8rem; font-weight: 780; }
      .stage.complete, .stage.active { color: #fff; }
      .stage.complete .stage-dot { border-color: #6dab4a; background: #5b9d3f; }
      .stage.active .stage-dot { border-color: #f4a93a; background: #c96b08; box-shadow: 0 0 0 4px rgba(240, 180, 75, .15); }
      .stage.complete:not(:last-child)::after { background: #739e62; }

      .topbar-actions { display: flex; justify-content: flex-end; gap: 8px; }
      .ghost-button {
        min-height: 40px;
        border: 1px solid #385267;
        border-radius: 9px;
        padding: 8px 13px;
        color: #f7fbff;
        background: rgba(255,255,255,.03);
        cursor: pointer;
        font-weight: 760;
      }
      .ghost-button:hover { background: rgba(255,255,255,.08); }

      main { width: min(1480px, 100%); margin: 0 auto; padding: 18px clamp(12px, 2.5vw, 34px) 14px; }
      #game { min-height: 60vh; }
      #notice { min-height: 24px; margin-top: 10px; color: var(--red); font-weight: 700; }
      .loading { min-height: 62vh; display: grid; place-items: center; color: var(--muted); }

      .scene {
        min-height: min(720px, calc(100vh - 142px));
        border: 1px solid #c7cfcc;
        border-radius: 14px;
        overflow: hidden;
        background: rgba(250, 251, 249, .98);
        box-shadow: var(--shadow);
      }
      .scene-content { padding: clamp(18px, 2.6vw, 34px); }
      .scene-heading {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: start;
        gap: 20px;
        margin-bottom: 16px;
      }
      .scene-heading-copy { max-width: 900px; }
      .eyebrow { margin: 0 0 5px; color: #315a4b; font-size: .72rem; font-weight: 900; letter-spacing: .09em; text-transform: uppercase; }
      h1, h2, h3, p { margin-top: 0; }
      h1 { margin-bottom: 12px; font-size: clamp(2.25rem, 6vw, 4.8rem); line-height: .96; letter-spacing: -.045em; }
      h2 { margin-bottom: 8px; font-size: clamp(1.65rem, 3vw, 2.55rem); line-height: 1.02; letter-spacing: -.025em; }
      h3 { margin-bottom: 7px; }
      p { line-height: 1.5; }
      .lead { margin-bottom: 0; color: #4c5d66; font-size: 1rem; }
      .selection-counter, .scene-state-badge {
        min-width: 124px;
        padding: 10px 14px;
        border: 1px solid #d5dbd8;
        border-radius: 9px;
        text-align: center;
        background: #f3f5f3;
        color: #263741;
      }
      .selection-counter small, .scene-state-badge small { display: block; color: var(--muted); font-size: .65rem; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; }
      .selection-counter strong, .scene-state-badge strong { display: block; margin-top: 2px; font-size: 1.38rem; }
      .scene-state-badge.prepared strong { color: var(--green-dark); }
      .scene-state-badge.vulnerable strong { color: var(--red); }

      .objective {
        margin: 12px 0 18px;
        padding: 11px 14px;
        border-left: 4px solid #6eaa55;
        border-radius: 0 8px 8px 0;
        color: #344851;
        background: #edf3ea;
      }

      .scene.briefing {
        display: grid;
        align-items: end;
        padding: clamp(28px, 5vw, 72px);
        color: #fff;
        background:
          linear-gradient(90deg, rgba(5, 17, 26, .94), rgba(5, 17, 26, .58) 58%, rgba(5,17,26,.18)),
          url('/images/operational-command-hero.png') center / cover;
      }
      .scene.briefing .lead { max-width: 680px; color: #dce7ec; font-size: 1.08rem; }
      .scene.briefing .eyebrow { color: #f0b44b; }

      .visual-scene { display: grid; gap: 12px; margin: 18px 0; }
      .visual-scene[data-visual-template="territory"],
      .visual-scene[data-visual-template="housing"],
      .visual-scene[data-visual-template="crisis"] {
        grid-template-columns: minmax(0, 2.15fr) minmax(270px, .85fr);
        align-items: stretch;
      }
      .visual-canvas {
        min-width: 0;
        min-height: 390px;
        display: grid;
        align-items: stretch;
        overflow: hidden;
        border: 1px solid #9ca9a4;
        border-radius: 11px;
        background: #102019;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.05);
      }
      .territory-svg { display: block; width: 100%; height: 100%; min-height: 390px; max-height: 620px; object-fit: cover; }

      .visual-sky { fill: #6f8b76; }
      .visual-sky.crisis { fill: #49535a; }
      .visual-hill-back { fill: #708b5c; }
      .visual-hill-front { fill: #57714d; }
      .visual-ravine { fill: #334c3d; stroke: #b2c0b8; stroke-width: 3; }
      .visual-ravine.crisis { fill: #3d3f35; }
      .visual-road { fill: none; stroke: #e1d1a5; stroke-width: 24; stroke-linecap: round; }
      .visual-road.local { stroke-width: 32; }
      .visual-vegetation-band { fill: none; stroke: #83a95f; stroke-width: 28; stroke-linecap: round; }
      .visual-vegetation-band.secondary { stroke-width: 18; opacity: .82; }
      .visual-residues { fill: none; stroke: #d49357; stroke-width: 9; stroke-linecap: round; }
      .visual-grazing { fill: #87965d; stroke: #d9dc95; stroke-width: 3; }
      .visual-professional-line, .visual-attack-window { fill: none; stroke: #f0b44b; stroke-width: 10; stroke-dasharray: 18 12; }
      .visual-line-marker { fill: #f0b44b; }
      .visual-house { fill: #d4b18f; stroke: #fff3df; stroke-width: 4; }
      .visual-door { fill: #6e5141; }
      .visual-window { fill: #b8e2eb; }
      .visual-trunk { fill: none; stroke: #76573d; stroke-width: 14; }
      .visual-branches { fill: none; stroke: #837055; stroke-width: 10; stroke-linecap: round; }
      .visual-canopy { fill: #567d50; stroke: #a5ca84; stroke-width: 4; }
      .visual-engine { fill: #c85143; stroke: #fff; stroke-width: 3; }
      .visual-engine + circle, .visual-engine ~ circle { fill: #17201b; }
      .visual-retreat { fill: none; stroke: #59c89d; stroke-width: 11; stroke-dasharray: 15 10; }
      .visual-arrow { fill: none; stroke: #59c89d; stroke-width: 8; }
      .visual-position { fill: rgba(57, 174, 124, .2); stroke: #4cc28e; stroke-width: 5; }
      .visual-position + path { stroke: #eafff5; stroke-width: 5; }
      .visual-fire { fill: #e2593f; stroke: #ffd05a; stroke-width: 5; }
      .visual-label-group text { fill: #f7faf7; font-size: 17px; font-weight: 800; paint-order: stroke; stroke: #1b2b22; stroke-width: 5; }
      .visual-hotspot { cursor: pointer; }
      .visual-hotspot:hover { filter: brightness(1.12); }

      .state-treated .visual-residues { opacity: .18; stroke-dasharray: 8 18; }
      .state-broken .visual-vegetation-band, .state-broken .visual-canopy { stroke-dasharray: 20 28; opacity: .6; }
      .state-reduced .visual-vegetation-band, .state-reduced .visual-canopy, .state-reduced .visual-branches { opacity: .48; stroke-dasharray: 25 16; }
      .state-noCrownFire .visual-canopy { opacity: .7; stroke-dasharray: 22 14; }
      .state-constrained .visual-road, .state-limited .visual-retreat { stroke-dasharray: 24 19; opacity: .68; }
      .state-blocked .visual-road { stroke: #9b564d; stroke-dasharray: 12 21; }
      .state-unevaluated .visual-professional-line { opacity: .3; stroke-dasharray: 5 22; }
      .state-unavailable .visual-attack-window, .state-unsustainable .visual-position { opacity: .3; stroke-dasharray: 8 18; }
      .state-severe .visual-fire { transform-origin: 585px 340px; transform: scale(1.14); }
      .state-crownRisk .visual-canopy { stroke: #e39a45; stroke-width: 8; }
      .state-crownFire .visual-canopy { fill: #844b3b; stroke: #ffad42; stroke-width: 10; }

      .visual-status-list {
        display: grid;
        grid-template-columns: 1fr;
        align-content: start;
        gap: 7px;
        padding: 10px;
        border: 1px solid #c8d0cd;
        border-radius: 11px;
        background: #f2f4f2;
      }
      .visual-status {
        min-height: 60px;
        display: grid;
        grid-template-columns: 18px minmax(0, 1fr);
        align-items: start;
        gap: 10px;
        border: 1px solid #d1d8d5;
        border-radius: 9px;
        padding: 9px 10px;
        text-align: left;
        color: var(--ink);
        background: #fff;
      }
      .visual-status:not(:disabled) { cursor: pointer; }
      .visual-status:disabled { opacity: 1; cursor: default; }
      .visual-status span:last-child { display: grid; gap: 2px; }
      .visual-status small, .visual-dimension small, .visual-explanation { color: var(--muted); }
      .visual-explanation { font-size: .74rem; line-height: 1.3; }
      .visual-status-symbol {
        width: 17px;
        height: 17px;
        margin-top: 2px;
        border: 2px solid currentColor;
        border-radius: 50%;
        color: #718079;
      }
      .state-clear .visual-status-symbol, .state-treated .visual-status-symbol, .state-broken .visual-status-symbol,
      .state-viable .visual-status-symbol, .state-sustainable .visual-status-symbol, .state-withinCapacity .visual-status-symbol,
      .state-favorable .visual-status-symbol, .state-noCrownFire .visual-status-symbol { border-radius: 4px; transform: rotate(45deg); color: var(--green); }
      .state-blocked .visual-status-symbol, .state-unavailable .visual-status-symbol, .state-unsustainable .visual-status-symbol,
      .state-exceeded .visual-status-symbol, .state-critical .visual-status-symbol { border-radius: 0; transform: rotate(45deg); color: var(--red); }
      .state-constrained .visual-status-symbol, .state-limited .visual-status-symbol, .state-conditioned .visual-status-symbol { border-style: dashed; color: var(--orange); }

      .visual-dimension-summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        gap: 9px;
      }
      .visual-dimension {
        min-height: 108px;
        display: grid;
        grid-template-columns: 18px minmax(0, 1fr);
        gap: 10px;
        padding: 13px;
        border: 1px solid #cbd3d0;
        border-radius: 9px;
        background: #fff;
      }
      .visual-dimension > div { min-width: 0; display: flex; flex-direction: column; gap: 3px; }
      .visual-dimension-state { font-size: 1.08rem; font-weight: 850; text-transform: capitalize; }
      .visual-dimension details { margin-top: auto; font-size: .78rem; }
      .visual-dimension summary { color: #596b74; }

      .actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 9px; margin-top: 16px; }
      .action-card {
        display: flex;
        min-height: 160px;
        flex-direction: column;
        gap: 7px;
        padding: 13px;
        border: 1px solid #ccd4d1;
        border-radius: 9px;
        background: #fff;
      }
      .action-card.selected { border-color: #79a867; box-shadow: inset 0 0 0 1px #79a867; background: #f2f7ef; }
      .action-card p { margin-bottom: 8px; color: var(--muted); font-size: .84rem; }
      .action-card button { margin-top: auto; }
      .action-card small { color: var(--red); }

      .primary, .secondary {
        min-height: 42px;
        border-radius: 8px;
        padding: 9px 14px;
        cursor: pointer;
        font-weight: 800;
      }
      .primary { border: 1px solid #bf6b10; color: #fff; background: #c96b08; box-shadow: 0 6px 16px rgba(201, 107, 8, .18); }
      .secondary { border: 1px solid #9aa7a2; color: #263941; background: #eef2ef; }
      button:disabled { cursor: not-allowed; opacity: .52; }
      .footer-actions { display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
      .feedback { margin-top: 14px; padding: 12px 14px; border: 1px solid #a9c9b6; border-radius: 8px; color: #234336; background: #edf7f0; }
      .router-mark { width: 62px; height: 62px; display: grid; place-items: center; margin-bottom: 14px; border-radius: 50%; color: #fff; background: #2f7c5d; font-size: 1.7rem; }

      .result-layout { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 14px; align-items: start; }
      .relations { display: grid; gap: 8px; }
      .relation {
        position: relative;
        padding: 12px 12px 12px 44px;
        border: 1px solid #cbd3d0;
        border-radius: 9px;
        background: #fff;
      }
      .relation::before { content: '↓'; position: absolute; left: 16px; top: 13px; font-weight: 900; color: #647780; }
      .relation.decisive { border-left: 4px solid #c96b08; }
      .relation h3 { font-size: .95rem; }
      .relation p { margin-bottom: 0; color: var(--muted); font-size: .84rem; }
      .cause-list { color: #344952; font-size: .78rem; font-weight: 700; }
      .result-contained { border-top: 4px solid var(--green); }
      .result-overwhelmed { border-top: 4px solid var(--red); }

      .session-footer {
        width: min(1480px, calc(100% - 24px));
        display: grid;
        grid-template-columns: minmax(220px, 1fr) minmax(260px, .9fr) minmax(220px, .8fr);
        gap: 1px;
        margin: 0 auto 16px;
        overflow: hidden;
        border: 1px solid #c4cdca;
        border-radius: 11px;
        background: #c4cdca;
        box-shadow: 0 10px 28px rgba(7,23,38,.08);
      }
      .footer-cell { min-width: 0; padding: 13px 16px; background: #edf1ef; }
      .footer-cell strong { display: block; margin-bottom: 5px; font-size: .78rem; text-transform: uppercase; letter-spacing: .05em; color: #243944; }
      .footer-cell p { margin: 0; color: #5b6c74; font-size: .8rem; line-height: 1.4; }
      .decision-history { margin: 0; padding-left: 18px; color: #5b6c74; font-size: .78rem; }
      .progress-line { height: 6px; margin-top: 8px; overflow: hidden; border-radius: 999px; background: #d4dbd8; }
      .progress-line span { display: block; height: 100%; background: linear-gradient(90deg, #5b9d3f, #c96b08); transition: width .2s ease; }
      .meta-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .chip { padding: 5px 8px; border: 1px solid #c5ceca; border-radius: 999px; color: #53656e; background: #f8faf9; font-size: .7rem; }
      .chip.accent { color: #24543e; border-color: #9cc0aa; background: #e8f2ea; }
      details { margin-top: 14px; }
      summary { cursor: pointer; color: #3d606b; }

      @media (max-width: 1050px) {
        .topbar { grid-template-columns: 1fr auto; }
        .journey { grid-column: 1 / -1; grid-row: 2; }
        .topbar-actions { grid-column: 2; grid-row: 1; }
        .visual-scene[data-visual-template="territory"],
        .visual-scene[data-visual-template="housing"],
        .visual-scene[data-visual-template="crisis"],
        .result-layout { grid-template-columns: 1fr; }
        .visual-status-list { grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }
        .session-footer { grid-template-columns: 1fr 1fr; }
        .footer-cell:last-child { grid-column: 1 / -1; }
      }

      @media (max-width: 700px) {
        .topbar { position: static; min-height: 0; grid-template-columns: 1fr auto; gap: 12px; padding: 11px 12px; }
        .brand-copy small { display: none; }
        .journey { gap: 4px; }
        .stage { grid-template-columns: 28px minmax(0, 1fr); gap: 5px; }
        .stage-dot { width: 28px; height: 28px; }
        .stage:not(:last-child)::after { top: 13px; left: 36px; right: 4px; }
        .stage-label { font-size: .68rem; }
        main { padding: 10px 8px; }
        .scene { min-height: auto; border-radius: 10px; }
        .scene-content { padding: 15px; }
        .scene-heading { grid-template-columns: 1fr; gap: 10px; }
        .selection-counter, .scene-state-badge { width: 100%; min-width: 0; display: flex; justify-content: space-between; align-items: center; text-align: left; }
        .selection-counter strong, .scene-state-badge strong { font-size: 1.05rem; }
        .visual-canvas, .territory-svg { min-height: 300px; }
        .visual-status-list, .visual-dimension-summary, .actions { grid-template-columns: 1fr; }
        .session-footer { width: calc(100% - 16px); grid-template-columns: 1fr; }
        .footer-cell:last-child { grid-column: auto; }
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .001ms !important; animation-duration: .001ms !important; animation-iteration-count: 1 !important; }
      }
    </style>
  </head>
  <body>
    <div class="northstar-shell">
      <header class="topbar">
        <div class="brand" aria-label="Apaga las llamas">
          <div class="brand-mark" aria-hidden="true">🔥</div>
          <div class="brand-copy"><strong>Apaga las llamas</strong><small>Decide hoy, protege mañana</small></div>
        </div>
        <nav class="journey" aria-label="Progreso de la partida">
          <div class="stage" data-stage-id="territory"><span class="stage-dot">1</span><span class="stage-label">Territorio</span></div>
          <div class="stage" data-stage-id="housing"><span class="stage-dot">2</span><span class="stage-label">Vivienda</span></div>
          <div class="stage" data-stage-id="crisis"><span class="stage-dot">3</span><span class="stage-label">Crisis</span></div>
          <div class="stage" data-stage-id="result"><span class="stage-dot">4</span><span class="stage-label">Resultado</span></div>
        </nav>
        <div class="topbar-actions"><button class="ghost-button" id="restart-button" type="button">↻ Reiniciar</button></div>
      </header>

      <main>
        <div id="game" aria-live="polite"><div class="loading">Creando sesión…</div></div>
        <div id="notice" role="alert"></div>
      </main>

      <footer class="session-footer" aria-label="Resumen de la partida">
        <div class="footer-cell"><strong>¿Por qué importa?</strong><p>La prevención modifica el territorio. El territorio condiciona las opciones disponibles durante el incendio.</p></div>
        <div class="footer-cell"><strong>Tu recorrido</strong><p id="progress-copy">0 nodos completados</p><div class="progress-line" aria-hidden="true"><span id="progress-bar" style="width:0%"></span></div><div class="meta-row"><span class="chip accent" id="scene-type">Misión</span><span class="chip" id="branch-chip">Ruta pendiente</span><span class="chip" id="session-status">Partida activa</span></div></div>
        <div class="footer-cell"><strong>Últimas decisiones</strong><ol class="decision-history" id="decision-history"><li>Aún no hay decisiones.</li></ol></div>
      </footer>
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
          const response = await fetch(path, { headers: { 'content-type': 'application/json' }, ...options });
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
        return '<div class="footer-actions"><button class="primary" id="advance-button" type="button">' + escapeHtml(scene.advanceLabel || 'Continuar') + '</button></div>';
      }

      function heading(scene, eyebrow, badge) {
        return '<div class="scene-heading"><div class="scene-heading-copy"><p class="eyebrow">' + escapeHtml(eyebrow) + '</p><h2>' + escapeHtml(scene.title) + '</h2><p class="lead">' + escapeHtml(scene.body || '') + '</p></div>' + (badge || '') + '</div>';
      }

      function renderBriefing(scene) {
        return '<section class="scene briefing"><div class="scene-heading-copy"><p class="eyebrow">Misión municipal</p><h1>' + escapeHtml(scene.title) + '</h1><p class="lead">' + escapeHtml(scene.mission) + '</p>' + advanceButton(scene) + '</div></section>';
      }

      function renderInspection(scene) {
        const badge = '<div class="selection-counter"><small>Acciones seleccionadas</small><strong>' + scene.selectedCount + ' / ' + scene.actionQuota + '</strong></div>';
        return '<section class="scene"><div class="scene-content">' + heading(scene, 'Inspección preventiva', badge) +
          '<div class="objective"><strong>Tu objetivo:</strong> ' + escapeHtml(scene.objective) + '</div>' +
          visualMarkup() + actionCards(scene) + advanceButton(scene) + '</div></section>';
      }

      function renderSummary(scene) {
        return '<section class="scene"><div class="scene-content">' + heading(scene, 'Balance preventivo', '') +
          '<div class="objective"><strong>Puente causal:</strong> lo que trataste en prevención define las condiciones que hereda la emergencia.</div>' +
          visualMarkup() + advanceButton(scene) + '</div></section>';
      }

      function renderDecision(scene) {
        const branch = currentView.session.branch;
        const badge = branch ? '<div class="scene-state-badge ' + escapeHtml(branch) + '"><small>Estado actual</small><strong>' + (branch === 'prepared' ? 'Preparado' : 'Vulnerable') + '</strong></div>' : '';
        return '<section class="scene"><div class="scene-content">' + heading(scene, 'Decisión operativa' + (scene.difficulty ? ' · ' + scene.difficulty : ''), badge) +
          '<div class="objective">' + escapeHtml(scene.context) + '</div>' + visualMarkup() + actionCards(scene) +
          (scene.feedback ? '<div class="feedback"><strong>Consecuencia</strong><br>' + escapeHtml(scene.feedback) + '</div>' : '') +
          advanceButton(scene) + '</div></section>';
      }

      function renderRouter(scene) {
        return '<section class="scene"><div class="scene-content"><div class="router-mark" aria-hidden="true">↝</div>' + heading(scene, 'Transición causal automática', '') + visualMarkup() + advanceButton(scene) + '</div></section>';
      }

      function renderResult(scene) {
        const badge = '<div class="scene-state-badge ' + (scene.variant === 'contained' ? 'prepared' : 'vulnerable') + '"><small>Resultado</small><strong>' + (scene.variant === 'contained' ? 'Contenido' : 'Fuera de capacidad') + '</strong></div>';
        const relations = '<div><p class="eyebrow">Cadena causal principal</p><div class="relations" aria-label="Cadenas causales de la partida">' + scene.relations.map(function (relation) {
          return '<article class="relation' + (relation.branchDecisive ? ' decisive' : '') + '"><h3>' + escapeHtml(relation.title) + '</h3>' +
            '<div class="cause-list">Prevención → ' + relation.causeActionLabels.map(escapeHtml).join(' · ') + '</div>' +
            '<p>' + escapeHtml(relation.effect) + '</p></article>';
        }).join('') + '</div></div>';
        return '<section class="scene result-' + escapeHtml(scene.variant) + '"><div class="scene-content">' + heading(scene, 'Resultado · balance causal', badge) +
          '<div class="result-layout"><div><p class="eyebrow">Estado heredado</p>' + visualMarkup() + '</div>' + relations + '</div>' +
          '<div class="feedback">' + escapeHtml(scene.closing) + '</div>' +
          '<details><summary>Revisar mis decisiones preventivas</summary><ul>' + currentView.session.preventionReview.map(function (entry) { return '<li>' + escapeHtml(entry.label) + '</li>'; }).join('') + '</ul></details>' +
          advanceButton(scene) + '</div></section>';
      }

      const RENDERERS = {
        briefing: renderBriefing,
        inspection: renderInspection,
        summary: renderSummary,
        decision: renderDecision,
        router: renderRouter,
        result: renderResult
      };

      const SCENE_TYPE_LABELS = {
        briefing: 'Misión',
        inspection: 'Inspección',
        summary: 'Balance',
        decision: 'Decisión',
        router: 'Transición',
        result: 'Resultado'
      };

      const BRANCH_LABELS = {
        prepared: 'preparada',
        vulnerable: 'vulnerable'
      };

      function focusAction(actionId) {
        const button = Array.from(document.querySelectorAll('.action-button')).find(function (candidate) { return candidate.dataset.actionId === actionId; });
        if (!button) return;
        const card = button.closest('.action-card');
        if (!card) return;
        if (button.disabled) { card.setAttribute('tabindex', '-1'); card.focus(); } else { button.focus(); }
        const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        card.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
      }

      function wireCommands() {
        document.querySelectorAll('.action-button').forEach(function (button) {
          button.addEventListener('click', function () {
            button.disabled = true;
            request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/actions', { method: 'POST', body: JSON.stringify({ actionId: button.dataset.actionId }) });
          });
        });
        document.querySelectorAll('[data-focus-action-id]').forEach(function (element) {
          element.addEventListener('click', function (event) { event.preventDefault(); focusAction(element.dataset.focusActionId); });
        });
        const advance = document.getElementById('advance-button');
        if (advance) {
          advance.addEventListener('click', function () {
            advance.disabled = true;
            request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/advance', { method: 'POST', body: '{}' });
          });
        }
      }

      function stageForScene(sceneId) {
        if (sceneId === 'ending-result-causal-report') return 4;
        if (sceneId === 'prevention-inspection-housing-interface' || sceneId === 'transition-summary-prevention') return 2;
        if (sceneId === 'intro-briefing-mission' || sceneId === 'prevention-inspection-territory-fuel') return 1;
        return 3;
      }

      function renderJourney() {
        const activeStage = stageForScene(currentView.session.currentSceneId);
        document.querySelectorAll('.stage').forEach(function (stage, index) {
          const stageNumber = index + 1;
          const completed = stageNumber < activeStage || currentView.session.status === 'completed';
          const active = stageNumber === activeStage && currentView.session.status !== 'completed';
          stage.classList.toggle('complete', completed);
          stage.classList.toggle('active', active);
          if (active) stage.setAttribute('aria-current', 'step'); else stage.removeAttribute('aria-current');
          const dot = stage.querySelector('.stage-dot');
          if (dot) dot.textContent = completed ? '✓' : String(stageNumber);
        });
      }

      function renderFooter() {
        const session = currentView.session;
        document.getElementById('progress-copy').textContent = session.completedSceneIds.length + ' nodos completados';
        document.getElementById('progress-bar').style.width = Math.min(100, session.completedSceneIds.length * 10) + '%';
        document.getElementById('scene-type').textContent = SCENE_TYPE_LABELS[currentView.scene.type] || 'Escena';
        document.getElementById('branch-chip').textContent = session.branch ? 'Ruta ' + (BRANCH_LABELS[session.branch] || session.branch) : 'Ruta pendiente';
        document.getElementById('session-status').textContent = session.status === 'completed' ? 'Partida completada' : 'Partida activa';
        const decisions = session.decisionReview.slice(-3);
        document.getElementById('decision-history').innerHTML = decisions.length === 0 ? '<li>Aún no hay decisiones.</li>' : decisions.map(function (decision) { return '<li>' + escapeHtml(decision.label) + '</li>'; }).join('');
      }

      function render() {
        if (!currentView) return;
        const renderer = RENDERERS[currentView.scene.type];
        if (!renderer) throw new Error('Tipo de escena no soportado: ' + currentView.scene.type);
        game.innerHTML = renderer(currentView.scene);
        renderJourney();
        renderFooter();
        wireCommands();
      }

      document.getElementById('restart-button').addEventListener('click', function () {
        if (!sessionId || busy) return;
        request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/restart', { method: 'POST', body: '{}' });
      });

      request('/api/game-sessions', { method: 'POST', body: '{}' });
    </script>
  </body>
</html>`;
}
