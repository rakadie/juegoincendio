export function renderPrototypePage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Guardián del Bosque · Prototipo visual</title>
    <style>
      :root {
        --bg: #061018;
        --panel: #0d1a28d9;
        --panel-2: #15283bd9;
        --text: #e2e8f0;
        --muted: #94a3b8;
        --primary: #22d3ee;
        --ok: #22c55e;
        --warn: #f59e0b;
        --bad: #ef4444;
      }
      * { box-sizing: border-box; }
      html, body { height: 100%; }
      body {
        margin: 0;
        font-family: Inter, Segoe UI, Roboto, Arial, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at 12% 15%, rgba(34, 197, 94, 0.28), transparent 36%),
          radial-gradient(circle at 86% 12%, rgba(245, 158, 11, 0.2), transparent 30%),
          radial-gradient(circle at 50% 110%, rgba(14, 116, 144, 0.35), transparent 45%),
          linear-gradient(180deg, #0a1f17 0%, #101f2e 45%, #141414 100%);
        background-attachment: fixed;
      }
      .layout {
        position: relative;
        min-height: 100%;
        display: grid;
        grid-template-columns: 260px 1fr;
      }
      .layout::before {
        content: '';
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(to top, rgba(255, 115, 0, 0.08), transparent 35%),
          repeating-linear-gradient(
            -22deg,
            rgba(255, 255, 255, 0.015) 0 2px,
            transparent 2px 7px
          );
        mix-blend-mode: screen;
      }
      .sidebar {
        border-right: 1px solid #2e3b57;
        background: #08111ccf;
        backdrop-filter: blur(4px);
        padding: 18px 14px;
      }
      .brand {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 6px;
      }
      .subtitle {
        color: var(--muted);
        font-size: 13px;
        margin-bottom: 18px;
      }
      .nav {
        display: grid;
        gap: 8px;
      }
      .nav-btn {
        width: 100%;
        border: 1px solid #334155;
        border-radius: 10px;
        padding: 10px 12px;
        cursor: pointer;
        text-align: left;
        color: var(--text);
        background: transparent;
      }
      .nav-btn:hover { border-color: #64748b; }
      .nav-btn.active {
        border-color: #67e8f9;
        background: #164e6335;
      }
      .links {
        margin-top: 18px;
        display: grid;
        gap: 8px;
      }
      .links a {
        color: var(--primary);
        text-decoration: none;
        font-size: 13px;
      }
      .content {
        position: relative;
        padding: 20px;
        display: grid;
        gap: 14px;
      }
      .topbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .title {
        font-size: 24px;
        margin: 0;
      }
      .muted { color: var(--muted); }
      .chips { display: flex; gap: 8px; flex-wrap: wrap; }
      .chip {
        border: 1px solid #334155;
        border-radius: 999px;
        padding: 6px 10px;
        font-size: 12px;
      }
      .grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(12, 1fr);
      }
      .card {
        background: var(--panel);
        border: 1px solid #35506d;
        border-radius: 14px;
        padding: 14px;
        backdrop-filter: blur(2px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
      }
      .kpi { grid-column: span 3; }
      .kpi strong { font-size: 22px; display: block; margin-top: 8px; }
      .col-8 { grid-column: span 8; }
      .col-4 { grid-column: span 4; }
      .col-12 { grid-column: span 12; }
      .hidden { display: none; }
      .list { display: grid; gap: 8px; max-height: 360px; overflow: auto; }
      .item {
        border: 1px solid #3e5b77;
        border-radius: 10px;
        padding: 10px;
        background: var(--panel-2);
      }
      .badge-ok { color: var(--ok); font-weight: 700; }
      .badge-bad { color: var(--bad); font-weight: 700; }
      .bar {
        height: 8px;
        border-radius: 99px;
        background: #334155;
        overflow: hidden;
      }
      .bar > span {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, #22d3ee, #22c55e);
      }
      @media (max-width: 980px) {
        .layout { grid-template-columns: 1fr; }
        .sidebar { border-right: 0; border-bottom: 1px solid #2e3b57; }
        .kpi, .col-8, .col-4, .col-12 { grid-column: span 12; }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">Guardián del Bosque</div>
        <div class="subtitle">Prototipo visual · navegación base</div>

        <nav class="nav" id="nav"></nav>

        <div class="links">
          <a href="/game-content">Abrir panel de contenido detallado</a>
          <a href="/fires/active">Ver JSON de incendios activos</a>
        </div>
      </aside>

      <main class="content">
        <header class="topbar">
          <div>
            <h1 class="title" id="screen-title">Inicio operativo</h1>
            <div class="muted" id="screen-subtitle">Resumen rápido del estado actual</div>
          </div>
          <div class="chips">
            <span class="chip">Fase: Invierno → Verano</span>
            <span class="chip">Modo: Entrenamiento</span>
            <span class="chip" id="health-chip">API: comprobando...</span>
          </div>
        </header>

        <section id="screen-inicio" class="screen grid">
          <article class="card kpi">
            <div class="muted">Incendios activos</div>
            <strong id="kpi-fires">-</strong>
          </article>
          <article class="card kpi">
            <div class="muted">Escenarios disponibles</div>
            <strong id="kpi-scenarios">-</strong>
          </article>
          <article class="card kpi">
            <div class="muted">Variables de simulación</div>
            <strong id="kpi-variables">-</strong>
          </article>
          <article class="card kpi">
            <div class="muted">Riesgo agregado</div>
            <strong id="kpi-risk">Medio</strong>
          </article>

          <article class="card col-8">
            <h2>Timeline de juego</h2>
            <p class="muted">Flujo propuesto para navegación principal.</p>
            <div class="chips">
              <span class="chip">Inicio</span>
              <span class="chip">Selección escenario</span>
              <span class="chip">Decisiones</span>
              <span class="chip">Crisis</span>
              <span class="chip">Post-incendio</span>
              <span class="chip">Replay</span>
            </div>
          </article>

          <article class="card col-4">
            <h2>Preparación campaña</h2>
            <p class="muted">Progreso del prototipo visual base.</p>
            <div class="bar"><span style="width: 45%"></span></div>
          </article>
        </section>

        <section id="screen-escenarios" class="screen grid hidden">
          <article class="card col-4">
            <h2>Categorías</h2>
            <div class="list" id="category-list"></div>
          </article>
          <article class="card col-8">
            <h2>Escenarios</h2>
            <div class="list" id="scenario-list"></div>
          </article>
        </section>

        <section id="screen-operacion" class="screen grid hidden">
          <article class="card col-8">
            <h2>Panel de decisión</h2>
            <p class="muted">Vista de ejemplo para decisiones tácticas durante crisis.</p>
            <div id="operation-preview"></div>
          </article>
          <article class="card col-4">
            <h2>Recursos</h2>
            <div class="item">Brigadas disponibles: 4</div>
            <div class="item">Medios aéreos: 2</div>
            <div class="item">Unidades policiales: 3</div>
          </article>
        </section>

        <section id="screen-post" class="screen grid hidden">
          <article class="card col-12">
            <h2>Post-incendio y replay</h2>
            <p class="muted">Espacio reservado para análisis de decisiones, impactos y aprendizaje.</p>
            <div class="item">Lección 1: reforzar comunicación oficial temprana.</div>
            <div class="item">Lección 2: activar medios en función de alerta meteorológica.</div>
            <div class="item">Lección 3: mejorar continuidad del sector primario en recuperación.</div>
          </article>
        </section>
      </main>
    </div>

    <script>
      const state = {
        screen: 'inicio',
        scenarios: [],
        variables: [],
        fires: []
      };

      const screens = [
        { id: 'inicio', label: 'Inicio operativo', subtitle: 'Resumen rápido del estado actual' },
        { id: 'escenarios', label: 'Escenarios', subtitle: 'Selección y navegación de contenidos' },
        { id: 'operacion', label: 'Operación', subtitle: 'Decisiones tácticas y recursos' },
        { id: 'post', label: 'Post-incendio', subtitle: 'Replay y análisis de aprendizaje' }
      ];

      function renderNav() {
        const nav = document.getElementById('nav');
        nav.innerHTML = screens.map((s) => {
          const active = state.screen === s.id ? 'active' : '';
          return '<button class="nav-btn ' + active + '" data-screen="' + s.id + '">' + s.label + '</button>';
        }).join('');

        [...nav.querySelectorAll('button')].forEach((btn) => {
          btn.addEventListener('click', () => {
            state.screen = btn.dataset.screen;
            renderScreen();
            renderNav();
          });
        });
      }

      function renderScreen() {
        screens.forEach((s) => {
          const section = document.getElementById('screen-' + s.id);
          if (!section) return;
          section.classList.toggle('hidden', s.id !== state.screen);
        });

        const current = screens.find((s) => s.id === state.screen);
        document.getElementById('screen-title').textContent = current.label;
        document.getElementById('screen-subtitle').textContent = current.subtitle;
      }

      function renderData() {
        document.getElementById('kpi-fires').textContent = String(state.fires.length);
        document.getElementById('kpi-scenarios').textContent = String(state.scenarios.length);
        document.getElementById('kpi-variables').textContent = String(state.variables.length);

        const grouped = {};
        state.scenarios.forEach((s) => {
          grouped[s.category] = (grouped[s.category] || 0) + 1;
        });

        document.getElementById('category-list').innerHTML = Object.keys(grouped).map((cat) => {
          return '<div class="item"><strong>' + cat + '</strong><br/><span class="muted">' + grouped[cat] + ' escenarios</span></div>';
        }).join('');

        document.getElementById('scenario-list').innerHTML = state.scenarios.slice(0, 12).map((s) => {
          const recommended = s.options.find((o) => o.recommended);
          const badge = recommended ? '<span class="badge-ok">Con opción recomendada</span>' : '<span class="badge-bad">Revisión pendiente</span>';
          return '<div class="item"><strong>' + s.title + '</strong><br/><span class="muted">' + s.context + '</span><br/>' + badge + '</div>';
        }).join('');

        const opScenario = state.scenarios.find((s) => s.category === 'operaciones') || state.scenarios[0];
        if (opScenario) {
          document.getElementById('operation-preview').innerHTML =
            '<div class="item"><strong>' + opScenario.title + '</strong><br/><span class="muted">' + opScenario.context + '</span></div>' +
            opScenario.options.slice(0, 3).map((o) => {
              const badge = o.recommended ? 'badge-ok' : 'badge-bad';
              const label = o.recommended ? 'Recomendada' : 'No recomendada';
              return '<div class="item">' +
                '<strong>Opción ' + o.id.toUpperCase() + ':</strong> ' + o.text + '<br/>' +
                '<span class="' + badge + '">' + label + '</span>' +
              '</div>';
            }).join('');
        }
      }

      async function loadData() {
        try {
          const [healthRes, contentRes, firesRes] = await Promise.all([
            fetch('/health'),
            fetch('/game-content/data'),
            fetch('/fires/active')
          ]);

          const health = await healthRes.json();
          const content = await contentRes.json();
          const firesData = await firesRes.json();

          state.variables = content.variables || [];
          state.scenarios = content.scenarios || [];
          state.fires = firesData.fires || [];

          document.getElementById('health-chip').textContent =
            health.status === 'ok' ? 'API: disponible' : 'API: error';
        } catch (_error) {
          document.getElementById('health-chip').textContent = 'API: sin conexión';
        }
      }

      async function init() {
        renderNav();
        renderScreen();
        await loadData();
        renderData();
      }

      init();
    </script>
  </body>
</html>`;
}

