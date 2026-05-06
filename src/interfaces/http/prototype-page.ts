export function renderPrototypePage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Guardián del Bosque · Simulador navegable</title>
    <style>
      :root {
        --bg-1: #08141f;
        --bg-2: #0f2335;
        --panel: #0d1b2bd9;
        --panel-2: #152a41de;
        --stroke: #33516f;
        --text: #e5edf6;
        --muted: #9eb0c4;
        --primary: #5eead4;
        --primary-2: #22d3ee;
        --accent: #93c5fd;
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
          radial-gradient(circle at 10% 15%, rgba(34, 197, 94, 0.24), transparent 34%),
          radial-gradient(circle at 84% 10%, rgba(245, 158, 11, 0.2), transparent 28%),
          radial-gradient(circle at 70% 112%, rgba(14, 116, 144, 0.4), transparent 44%),
          linear-gradient(170deg, var(--bg-1) 0%, var(--bg-2) 55%, #191919 100%);
        background-attachment: fixed;
      }

      .layout {
        position: relative;
        min-height: 100%;
        display: grid;
        grid-template-columns: 290px 1fr;
      }

      .layout::before {
        content: '';
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(to top, rgba(255, 115, 0, 0.08), transparent 36%),
          repeating-linear-gradient(
            -22deg,
            rgba(255, 255, 255, 0.015) 0 2px,
            transparent 2px 7px
          );
        mix-blend-mode: screen;
      }

      .sidebar {
        border-right: 1px solid #2f455f;
        background: #07121dcf;
        backdrop-filter: blur(6px);
        padding: 20px 16px;
        display: grid;
        align-content: start;
        gap: 14px;
      }

      .brand {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.2px;
      }

      .subtitle {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.4;
      }

      .season-pill {
        border: 1px solid #3f5f80;
        border-radius: 999px;
        width: fit-content;
        padding: 6px 11px;
        font-size: 12px;
        color: var(--accent);
        background: #15304a80;
      }

      .nav {
        display: grid;
        gap: 9px;
      }

      .stage-btn {
        width: 100%;
        border: 1px solid #324963;
        border-radius: 12px;
        padding: 11px 12px;
        cursor: pointer;
        text-align: left;
        color: var(--text);
        background: #0e1f31a0;
        display: grid;
        gap: 2px;
      }

      .stage-btn span {
        font-size: 13px;
        font-weight: 650;
      }

      .stage-btn small {
        color: var(--muted);
        font-size: 12px;
      }

      .stage-btn:hover { border-color: #6482a0; }

      .stage-btn.active {
        border-color: var(--primary-2);
        background: #164e6338;
        box-shadow: 0 0 0 1px #22d3ee2e inset;
      }

      .stage-btn.locked {
        opacity: 0.58;
        cursor: not-allowed;
      }

      .stage-btn:disabled {
        pointer-events: none;
      }

      .legend {
        border: 1px solid #304b67;
        background: #0f2234b0;
        border-radius: 12px;
        padding: 10px;
        display: grid;
        gap: 7px;
      }

      .legend-title {
        font-size: 12px;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }

      .legend-item {
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .legend-item span:first-child {
        width: 21px;
        display: inline-grid;
        place-items: center;
      }

      .links {
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
        padding: 22px;
        display: grid;
        gap: 16px;
      }

      .card {
        background: var(--panel);
        border: 1px solid var(--stroke);
        border-radius: 16px;
        padding: 15px;
        backdrop-filter: blur(2px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.24);
      }

      .topbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .title {
        font-size: 27px;
        margin: 0;
      }

      .muted { color: var(--muted); }

      .chips {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .chip {
        border: 1px solid #3c5977;
        border-radius: 999px;
        padding: 7px 11px;
        font-size: 12px;
        background: #11263a9e;
      }

      .chip.important {
        border-color: #22d3ee96;
        color: #8ce6f7;
      }

      .chip.bad {
        border-color: #ef44447c;
        color: #fca5a5;
        background: #ef444433;
      }

      .screen {
        display: block;
      }

      .hidden {
        display: none;
      }

      .screen-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: 1.45fr 1fr;
      }

      .hero-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: 1.2fr 1fr;
        align-items: stretch;
      }

      .hero-copy {
        display: grid;
        align-content: start;
        gap: 12px;
      }

      .hero-copy h2 {
        margin: 0;
        font-size: 24px;
      }

      .hero-copy p {
        margin: 0;
        line-height: 1.5;
      }

      .hero-illustration {
        border: 1px solid #385879;
        border-radius: 14px;
        background: linear-gradient(170deg, #12253a 0%, #142d21 100%);
        display: grid;
        place-items: center;
        min-height: 210px;
      }

      .hero-illustration svg {
        width: 94%;
        max-width: 360px;
        height: auto;
      }

      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      button.primary,
      button.secondary,
      button.ghost {
        border-radius: 10px;
        border: 1px solid transparent;
        font-size: 14px;
        cursor: pointer;
        padding: 10px 14px;
        color: #e6f2ff;
      }

      button.primary {
        border-color: #30b8ce;
        background: linear-gradient(180deg, #0e7490, #155e75);
      }

      button.primary:hover {
        filter: brightness(1.1);
      }

      button.secondary {
        border-color: #63809f;
        background: #20364d;
      }

      button.secondary:hover {
        border-color: #89a9ca;
      }

      button.ghost {
        border-color: #456789;
        background: transparent;
      }

      .metrics {
        display: grid;
        gap: 10px;
      }

      .metric {
        border: 1px solid #3a5978;
        background: var(--panel-2);
        border-radius: 11px;
        padding: 10px;
      }

      .metric-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        margin-bottom: 7px;
      }

      .bar {
        height: 8px;
        border-radius: 99px;
        background: #2f4055;
        overflow: hidden;
      }

      .bar > span {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, #22d3ee, #22c55e);
      }

      .bar.fire > span {
        background: linear-gradient(90deg, #f97316, #ef4444);
      }

      .decision-panel h2 {
        margin: 0 0 6px;
      }

      .step-label {
        color: var(--accent);
        font-size: 12px;
        border: 1px solid #4f7397;
        border-radius: 999px;
        padding: 4px 9px;
      }

      .decision-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;
      }

      .decision-list {
        display: grid;
        gap: 10px;
        margin-top: 12px;
      }

      .decision-btn {
        border: 1px solid #456789;
        background: #102335d9;
        color: var(--text);
        border-radius: 12px;
        text-align: left;
        padding: 11px;
        cursor: pointer;
      }

      .decision-btn:hover {
        border-color: #83a9cf;
      }

      .decision-btn.recommended {
        border-color: #2db98a;
        box-shadow: 0 0 0 1px #2db98a3f inset;
      }

      .decision-title {
        font-size: 14px;
        margin-bottom: 6px;
      }

      .decision-tags {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-bottom: 7px;
      }

      .tag {
        border-radius: 999px;
        font-size: 11px;
        padding: 3px 8px;
        border: 1px solid #4f6f8e;
        background: #20374d;
      }

      .tag.good {
        border-color: #22c55e70;
        color: #86efac;
        background: #14532d66;
      }

      .tag.bad {
        border-color: #ef444470;
        color: #fca5a5;
        background: #7f1d1d55;
      }

      .tag.warn {
        border-color: #f59e0b70;
        color: #fcd34d;
        background: #78350f66;
      }

      .effects {
        color: var(--muted);
        font-size: 12px;
        line-height: 1.35;
      }

      .status-box {
        border: 1px dashed #4d6c8c;
        border-radius: 12px;
        padding: 12px;
        background: #102336b5;
        margin-top: 12px;
      }

      .diagnosis {
        display: grid;
        gap: 8px;
      }

      .diag-item {
        border: 1px solid #4f6780;
        border-radius: 10px;
        padding: 8px;
        font-size: 13px;
        background: #11263a;
      }

      .diag-item::before {
        content: '⚠';
        margin-right: 8px;
        color: #fbbf24;
      }

      .log-card {
        max-height: 260px;
        overflow: auto;
      }

      .log-list {
        display: grid;
        gap: 8px;
      }

      .log-item {
        border: 1px solid #436382;
        border-radius: 10px;
        padding: 8px;
        background: #13273b;
        font-size: 13px;
      }

      .log-item small {
        color: var(--muted);
        display: block;
        margin-top: 4px;
      }

      .result-hero {
        display: grid;
        gap: 10px;
      }

      .result-hero h2 {
        margin: 0;
        font-size: 25px;
      }

      .outcome-chip {
        width: fit-content;
        border-radius: 999px;
        border: 1px solid #48709a;
        padding: 6px 10px;
        font-size: 12px;
      }

      .outcome-chip.victoria {
        border-color: #22c55e88;
        color: #86efac;
        background: #14532d66;
      }

      .outcome-chip.parcial {
        border-color: #f59e0b88;
        color: #fcd34d;
        background: #78350f66;
      }

      .outcome-chip.derrota {
        border-color: #ef444488;
        color: #fca5a5;
        background: #7f1d1d66;
      }

      @media (max-width: 1120px) {
        .layout {
          grid-template-columns: 1fr;
        }

        .sidebar {
          border-right: 0;
          border-bottom: 1px solid #2f455f;
        }

        .screen-grid,
        .hero-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 760px) {
        .content {
          padding: 14px;
        }

        .title {
          font-size: 22px;
        }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">Guardián del Bosque</div>
        <div class="subtitle">
          Simulador de decisiones estacionales para prevención y respuesta frente a incendios forestales.
        </div>
        <div class="season-pill" id="season-pill">Fase activa: Briefing</div>

        <nav class="nav" id="stage-nav"></nav>

        <div class="legend">
          <div class="legend-title">Lectura rápida</div>
          <div class="legend-item"><span>🔥</span> <span>Más combustible o propagación</span></div>
          <div class="legend-item"><span>🛡️</span> <span>Refuerzo de cortafuegos y defensa</span></div>
          <div class="legend-item"><span>💧</span> <span>Uso de agua y logística hídrica</span></div>
          <div class="legend-item"><span>👥</span> <span>Apoyo vecinal y confianza social</span></div>
        </div>

        <div class="links">
          <a href="/game-content">Panel de contenido técnico</a>
          <a href="/fires/active">JSON de incendios activos</a>
        </div>
      </aside>

      <main class="content">
        <header class="topbar">
          <div>
            <h1 class="title" id="screen-title">Campaña anual · Guardián del Bosque</h1>
            <div class="muted" id="screen-subtitle">
              Planifica en invierno, responde en verano y evalúa resultados en otoño.
            </div>
          </div>

          <div class="chips">
            <span class="chip" id="chip-dinero">💰 Presupuesto: --</span>
            <span class="chip" id="chip-brigadas">🚒 Brigadas: --</span>
            <span class="chip" id="chip-bosque">🌲 Bosque quemado: --</span>
            <span class="chip" id="chip-catalogo">📚 Escenarios base: --</span>
            <span class="chip important" id="chip-riesgo">Riesgo base: pendiente</span>
            <span class="chip" id="health-chip">API: comprobando...</span>
          </div>
        </header>

        <section id="screen-briefing" class="screen card">
          <div class="hero-grid">
            <article class="hero-copy">
              <h2>Diseña la estrategia y navega por escenarios críticos</h2>
              <p>
                En invierno asignas recursos limitados para reducir vulnerabilidad del monte.
                En verano, cada decisión táctica se ve afectada por ese patrón previo.
                El objetivo es terminar la campaña con menos del 20% del bosque quemado y sin quiebra.
              </p>

              <div class="chips">
                <span class="chip">Ciclo: Invierno → Verano → Resultado</span>
                <span class="chip">Sistema dual: recursos + riesgo</span>
                <span class="chip">Heurística: decisiones con memoria</span>
              </div>

              <div class="button-row">
                <button class="primary" id="btn-start-campaign" type="button">Iniciar campaña de invierno</button>
                <button class="ghost" id="btn-jump-game-content" type="button">Ver base de escenarios</button>
              </div>
            </article>

            <aside class="hero-illustration" aria-hidden="true">
              <svg viewBox="0 0 360 220" role="presentation">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#1d4ed8" />
                    <stop offset="100%" stop-color="#059669" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#fb923c" />
                    <stop offset="100%" stop-color="#dc2626" />
                  </linearGradient>
                </defs>
                <rect x="12" y="15" width="336" height="190" rx="16" fill="#0a1827" stroke="#406080" />
                <path d="M25 145 Q90 95 155 130 T300 120" stroke="url(#g1)" stroke-width="11" fill="none" stroke-linecap="round" />
                <path d="M50 175 Q135 120 210 160 T325 152" stroke="#22c55e" stroke-opacity="0.55" stroke-width="8" fill="none" stroke-linecap="round" />
                <path d="M210 98 Q248 78 288 95" stroke="url(#g2)" stroke-width="13" fill="none" stroke-linecap="round" />
                <circle cx="242" cy="96" r="15" fill="#f97316" fill-opacity="0.65" />
                <rect x="35" y="34" width="105" height="26" rx="13" fill="#19324b" stroke="#3c6a91" />
                <text x="50" y="51" fill="#cde7ff" font-size="12" font-family="Inter, Arial">Riesgo dinámico</text>
                <rect x="154" y="34" width="158" height="26" rx="13" fill="#173729" stroke="#2f7d58" />
                <text x="168" y="51" fill="#d8ffea" font-size="12" font-family="Inter, Arial">Decisiones con impacto diferido</text>
              </svg>
            </aside>
          </div>
        </section>

        <section id="screen-winter" class="screen hidden">
          <div class="screen-grid">
            <article class="card decision-panel">
              <div class="decision-header">
                <h2 id="winter-title">Invierno · Preparación</h2>
                <span class="step-label" id="winter-step">Decisión 1/3</span>
              </div>

              <p class="muted" id="winter-context"></p>
              <div class="decision-list" id="winter-options"></div>
              <div class="status-box hidden" id="winter-complete-box"></div>
            </article>

            <aside class="card">
              <h3>Estado del territorio</h3>
              <p class="muted">Tus elecciones cambian el patrón heurístico que condicionará el verano.</p>

              <div class="metrics">
                <div class="metric">
                  <div class="metric-head"><span>Combustible vegetal</span><strong id="m-combustible">0%</strong></div>
                  <div class="bar"><span id="bar-combustible" style="width: 0%"></span></div>
                </div>
                <div class="metric">
                  <div class="metric-head"><span>Cortafuegos</span><strong id="m-cortafuegos">0%</strong></div>
                  <div class="bar"><span id="bar-cortafuegos" style="width: 0%"></span></div>
                </div>
                <div class="metric">
                  <div class="metric-head"><span>Humedad del suelo</span><strong id="m-humedad">0%</strong></div>
                  <div class="bar"><span id="bar-humedad" style="width: 0%"></span></div>
                </div>
                <div class="metric">
                  <div class="metric-head"><span>Accesibilidad táctica</span><strong id="m-accesibilidad">0%</strong></div>
                  <div class="bar"><span id="bar-accesibilidad" style="width: 0%"></span></div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="screen-summer" class="screen hidden">
          <div class="screen-grid">
            <article class="card decision-panel">
              <div class="decision-header">
                <h2 id="summer-title">Verano · Gestión de crisis</h2>
                <span class="step-label" id="summer-step">Evento 1/3</span>
              </div>

              <p class="muted" id="summer-context"></p>
              <div class="decision-list" id="summer-options"></div>
              <div class="status-box hidden" id="summer-finish-box"></div>
            </article>

            <aside class="card">
              <h3>Estado del incendio</h3>

              <div class="metrics" style="margin-top:10px;">
                <div class="metric">
                  <div class="metric-head"><span>Intensidad del frente</span><strong id="m-intensidad">0%</strong></div>
                  <div class="bar fire"><span id="bar-intensidad" style="width:0%"></span></div>
                </div>
                <div class="metric">
                  <div class="metric-head"><span>Porcentaje de bosque quemado</span><strong id="m-quemado">0%</strong></div>
                  <div class="bar fire"><span id="bar-quemado" style="width:0%"></span></div>
                </div>
              </div>

              <h4 style="margin:14px 0 8px;">Diagnóstico del verano</h4>
              <div class="diagnosis" id="diagnosis-list"></div>
            </aside>
          </div>
        </section>

        <section id="screen-result" class="screen hidden">
          <article class="card result-hero" id="result-hero"></article>

          <div class="screen-grid">
            <article class="card">
              <h3>Resumen de campaña</h3>

              <div class="metrics" style="margin-top:10px;">
                <div class="metric">
                  <div class="metric-head"><span>Riesgo base calculado</span><strong id="result-risk">0</strong></div>
                </div>
                <div class="metric">
                  <div class="metric-head"><span>Bosque quemado final</span><strong id="result-burned">0%</strong></div>
                </div>
                <div class="metric">
                  <div class="metric-head"><span>Presupuesto final</span><strong id="result-budget">0 €</strong></div>
                </div>
              </div>

              <div class="button-row" style="margin-top:12px;">
                <button class="primary" id="btn-restart" type="button">Jugar otra campaña</button>
                <button class="secondary" id="btn-review-winter" type="button">Revisar decisiones de invierno</button>
              </div>
            </article>

            <article class="card">
              <h3>Trazabilidad de decisiones</h3>
              <div class="log-list" id="result-log"></div>
            </article>
          </div>
        </section>

        <section class="card log-card">
          <h3 style="margin-top:0;">Bitácora operativa</h3>
          <div class="log-list" id="global-log"></div>
        </section>
      </main>
    </div>

    <script>
      const STAGES = [
        { id: 'briefing', label: '01 · Briefing', subtitle: 'Contexto y objetivos' },
        { id: 'winter', label: '02 · Invierno', subtitle: 'Preparación y prevención' },
        { id: 'summer', label: '03 · Verano', subtitle: 'Crisis y respuesta' },
        { id: 'result', label: '04 · Otoño', subtitle: 'Resultado final' }
      ];

      const HEADER_TEXT = {
        briefing: {
          title: 'Campaña anual · Guardián del Bosque',
          subtitle: 'Planifica en invierno, responde en verano y evalúa resultados en otoño.'
        },
        winter: {
          title: 'Invierno · Fase de preparación',
          subtitle: 'Asigna recursos para reducir vulnerabilidad estructural del monte.'
        },
        summer: {
          title: 'Verano · Fase de crisis',
          subtitle: 'Gestiona el incendio con la severidad heredada de tus decisiones de invierno.'
        },
        result: {
          title: 'Otoño · Cierre de campaña',
          subtitle: 'Evalúa impacto final, sostenibilidad y aprendizaje táctico.'
        }
      };

      const RESOURCE_LABELS = {
        dinero: 'Dinero',
        maquinaria: 'Maquinaria',
        brigadas: 'Brigadas',
        agua: 'Agua',
        apoyo: 'Apoyo vecinal',
        moral: 'Moral'
      };

      const TERRAIN_LABELS = {
        combustible: 'Combustible',
        cortafuegos: 'Cortafuegos',
        humedad: 'Humedad',
        accesibilidad: 'Accesibilidad'
      };

      const RESOURCE_LIMITS = {
        dinero: [-1200, 3200],
        maquinaria: [0, 8],
        brigadas: [0, 8],
        agua: [0, 120],
        apoyo: [0, 100],
        moral: [0, 100]
      };

      const TERRAIN_LIMITS = {
        combustible: [0, 100],
        cortafuegos: [0, 100],
        humedad: [0, 100],
        pendiente: [0, 100],
        accesibilidad: [0, 100]
      };

      let WINTER_NODES = [];
      let SUMMER_NODES = [];

      function buildInitialState() {
        return {
          stage: 'briefing',
          unlocked: {
            briefing: true,
            winter: false,
            summer: false,
            result: false
          },
          resources: {
            dinero: 1200,
            maquinaria: 4,
            brigadas: 5,
            agua: 82,
            apoyo: 62,
            moral: 68
          },
          terrain: {
            combustible: 58,
            cortafuegos: 22,
            humedad: 34,
            pendiente: 45,
            accesibilidad: 52
          },
          winterIndex: 0,
          summerIndex: 0,
          riskBase: null,
          fireIntensity: 0,
          burned: 8,
          diagnosis: [],
          winterLog: [],
          summerLog: [],
          eventLog: [],
          result: null,
          emergencyAidUsed: false,
          catalog: {
            scenarios: 0,
            variables: 0,
            activeFires: 0
          }
        };
      }

      let state = buildInitialState();

      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      function signed(value) {
        if (value > 0) return '+' + value;
        if (value < 0) return String(value);
        return '0';
      }

      function safeRound(value) {
        return Math.round(value * 10) / 10;
      }

      function riskFromTerrain() {
        const raw =
          state.terrain.combustible * 0.7 +
          state.terrain.pendiente * 0.2 -
          state.terrain.cortafuegos * 0.5;

        return clamp(safeRound(raw), 0, 100);
      }

      function riskLabel(risk) {
        if (risk >= 65) return 'Muy alto';
        if (risk >= 45) return 'Alto';
        if (risk >= 28) return 'Medio';
        return 'Bajo';
      }

      function seasonLabel() {
        if (state.stage === 'briefing') return 'Briefing';
        if (state.stage === 'winter') return 'Invierno';
        if (state.stage === 'summer') return 'Verano';
        return 'Otoño';
      }

      function applyVector(target, changes, limits) {
        if (!changes) return;

        Object.keys(changes).forEach(function (key) {
          if (typeof target[key] !== 'number') return;
          const range = limits[key] || [-9999, 9999];
          target[key] = clamp(target[key] + changes[key], range[0], range[1]);
        });
      }

      function uniquePush(collection, text) {
        if (!text) return;
        if (!collection.includes(text)) collection.push(text);
      }

      function addEventLog(label, subtitle) {
        state.eventLog.unshift({ label: label, subtitle: subtitle });
        state.eventLog = state.eventLog.slice(0, 10);
      }

      function unlockStage(id) {
        state.unlocked[id] = true;
      }

      function setStage(id) {
        if (!state.unlocked[id]) return;
        state.stage = id;
        render();
      }

      function applyEmergencyAidIfNeeded() {
        if (state.resources.dinero > 0 || state.emergencyAidUsed) {
          return;
        }

        state.emergencyAidUsed = true;
        state.resources.dinero += 340;
        state.resources.apoyo = clamp(state.resources.apoyo - 12, 0, 100);
        state.resources.moral = clamp(state.resources.moral - 8, 0, 100);

        addEventLog(
          'Ayuda de emergencia activada',
          'Recibiste financiación urgente con penalización de apoyo vecinal y moral de brigadas.'
        );
      }

      function evaluateImmediateDefeat() {
        if (state.burned >= 80) {
          finalizeResult('derrota', 'Incendio descontrolado: se superó el 80% del bosque afectado.');
          return true;
        }

        if (state.resources.brigadas <= 0 || state.resources.moral <= 0) {
          finalizeResult('derrota', 'Colapso operativo: brigadas sin capacidad de respuesta.');
          return true;
        }

        if (state.resources.dinero <= 0) {
          finalizeResult('derrota', 'Quiebra presupuestaria en plena campaña de crisis.');
          return true;
        }

        return false;
      }

      function summarizeEffects(resourceEffects, terrainEffects) {
        const chunks = [];

        Object.keys(resourceEffects || {}).forEach(function (key) {
          chunks.push(RESOURCE_LABELS[key] + ' ' + signed(resourceEffects[key]));
        });

        Object.keys(terrainEffects || {}).forEach(function (key) {
          chunks.push(TERRAIN_LABELS[key] + ' ' + signed(terrainEffects[key]));
        });

        if (chunks.length === 0) return 'Sin variación directa';
        return chunks.join(' · ');
      }

      function tagsHtml(tags) {
        return (tags || [])
          .map(function (tag) {
            return '<span class="tag ' + tag.tone + '">' + tag.icon + ' ' + tag.text + '</span>';
          })
          .join('');
      }

      function renderHeader() {
        const info = HEADER_TEXT[state.stage] || HEADER_TEXT.briefing;
        document.getElementById('screen-title').textContent = info.title;
        document.getElementById('screen-subtitle').textContent = info.subtitle;
      }

      function renderStageNav() {
        const nav = document.getElementById('stage-nav');

        nav.innerHTML = STAGES.map(function (stage) {
          const active = state.stage === stage.id ? 'active' : '';
          const locked = state.unlocked[stage.id] ? '' : 'locked';
          const disabled = state.unlocked[stage.id] ? '' : 'disabled';

          return '<button class="stage-btn ' + active + ' ' + locked + '" data-stage="' + stage.id + '" ' + disabled + '>' +
            '<span>' + stage.label + '</span>' +
            '<small>' + stage.subtitle + '</small>' +
          '</button>';
        }).join('');

        Array.from(nav.querySelectorAll('button')).forEach(function (btn) {
          btn.addEventListener('click', function () {
            setStage(btn.dataset.stage);
          });
        });
      }

      function renderScreens() {
        STAGES.forEach(function (stage) {
          const section = document.getElementById('screen-' + stage.id);
          if (!section) return;
          section.classList.toggle('hidden', stage.id !== state.stage);
        });
      }

      function renderTopHUD() {
        const currentRisk = state.riskBase != null ? state.riskBase : riskFromTerrain();
        const riskText = state.riskBase == null
          ? 'Riesgo provisional: ' + currentRisk + ' (' + riskLabel(currentRisk) + ')'
          : 'Riesgo base: ' + currentRisk + ' (' + riskLabel(currentRisk) + ')';

        document.getElementById('chip-dinero').textContent = '💰 Presupuesto: ' + state.resources.dinero + ' €';
        document.getElementById('chip-brigadas').textContent = '🚒 Brigadas: ' + state.resources.brigadas;
        document.getElementById('chip-bosque').textContent = '🌲 Bosque quemado: ' + state.burned + '%';
        document.getElementById('chip-catalogo').textContent =
          '📚 Escenarios base: ' + state.catalog.scenarios + ' · Variables: ' + state.catalog.variables;
        document.getElementById('chip-riesgo').textContent = riskText;

        const seasonPill = document.getElementById('season-pill');
        seasonPill.textContent = 'Fase activa: ' + seasonLabel();

        const riskChip = document.getElementById('chip-riesgo');
        riskChip.classList.remove('bad');
        if (currentRisk >= 45) {
          riskChip.classList.add('bad');
        }
      }

      function renderGlobalLog() {
        const container = document.getElementById('global-log');

        if (state.eventLog.length === 0) {
          container.innerHTML = '<div class="log-item">Aún no hay decisiones registradas.<small>Comienza la campaña para ver trazabilidad.</small></div>';
          return;
        }

        container.innerHTML = state.eventLog.map(function (item) {
          return '<div class="log-item"><strong>' + item.label + '</strong><small>' + item.subtitle + '</small></div>';
        }).join('');
      }

      function renderBriefing() {
        const startButton = document.getElementById('btn-start-campaign');
        const jumpButton = document.getElementById('btn-jump-game-content');

        if (state.unlocked.winter && state.stage === 'briefing') {
          startButton.textContent = 'Reanudar campaña';
        }

        startButton.onclick = function () {
          unlockStage('winter');
          setStage('winter');
        };

        jumpButton.onclick = function () {
          window.location.href = '/game-content';
        };
      }

      function renderTerrainMetrics() {
        document.getElementById('m-combustible').textContent = state.terrain.combustible + '%';
        document.getElementById('m-cortafuegos').textContent = state.terrain.cortafuegos + '%';
        document.getElementById('m-humedad').textContent = state.terrain.humedad + '%';
        document.getElementById('m-accesibilidad').textContent = state.terrain.accesibilidad + '%';

        document.getElementById('bar-combustible').style.width = state.terrain.combustible + '%';
        document.getElementById('bar-cortafuegos').style.width = state.terrain.cortafuegos + '%';
        document.getElementById('bar-humedad').style.width = state.terrain.humedad + '%';
        document.getElementById('bar-accesibilidad').style.width = state.terrain.accesibilidad + '%';
      }

      function renderWinter() {
        renderTerrainMetrics();

        const node = WINTER_NODES[state.winterIndex];
        const title = document.getElementById('winter-title');
        const step = document.getElementById('winter-step');
        const context = document.getElementById('winter-context');
        const options = document.getElementById('winter-options');
        const done = document.getElementById('winter-complete-box');

        if (node) {
          done.classList.add('hidden');
          title.textContent = node.title;
          step.textContent = 'Decisión ' + (state.winterIndex + 1) + '/' + WINTER_NODES.length;
          context.textContent = node.context;

          options.innerHTML = node.options.map(function (option) {
            const recommendedClass = option.recommended ? 'recommended' : '';

            return '<button class="decision-btn ' + recommendedClass + '" data-option="' + option.id + '">' +
              '<div class="decision-title"><strong>Opción ' + option.id.toUpperCase() + ':</strong> ' + option.text + '</div>' +
              '<div class="decision-tags">' + tagsHtml(option.indicators) + '</div>' +
              '<div class="effects">Impactos: ' + summarizeEffects(option.resourceEffects, option.terrainEffects) + '</div>' +
            '</button>';
          }).join('');

          Array.from(options.querySelectorAll('button')).forEach(function (btn) {
            btn.addEventListener('click', function () {
              const selected = node.options.find(function (option) {
                return option.id === btn.dataset.option;
              });
              if (!selected) return;

              applyVector(state.resources, selected.resourceEffects, RESOURCE_LIMITS);
              applyVector(state.terrain, selected.terrainEffects, TERRAIN_LIMITS);

              state.winterLog.push({
                node: node.title,
                decision: selected.text,
                effects: summarizeEffects(selected.resourceEffects, selected.terrainEffects)
              });

              uniquePush(state.diagnosis, selected.diagnosisHint);

              addEventLog('❄️ ' + node.title, selected.text);
              state.winterIndex += 1;
              applyEmergencyAidIfNeeded();
              render();
            });
          });

          return;
        }

        title.textContent = 'Invierno completado';
        step.textContent = 'Decisiones finalizadas';
        context.textContent =
          'Ya tienes el estado final de preparación. Ahora se calcula el índice de severidad para el incendio de verano.';
        options.innerHTML = '';

        const projectedRisk = riskFromTerrain();
        done.classList.remove('hidden');
        done.innerHTML =
          '<p><strong>Índice de riesgo estimado:</strong> ' + projectedRisk + ' (' + riskLabel(projectedRisk) + ')</p>' +
          '<p class="muted">Fórmula aplicada: (Combustible × 0.7) + (Pendiente × 0.2) - (Cortafuegos × 0.5)</p>' +
          '<div class="button-row"><button class="primary" id="btn-to-summer" type="button">Pasar a verano</button></div>';

        const startSummerButton = document.getElementById('btn-to-summer');
        startSummerButton.onclick = function () {
          startSummer();
        };
      }

      function buildSummerDiagnosis() {
        const messages = [];

        if (state.terrain.cortafuegos < 28) {
          messages.push('Diagnóstico: cortafuegos insuficientes, el fuego encuentra corredores de avance.');
        }
        if (state.terrain.combustible > 55) {
          messages.push('Diagnóstico: la carga de combustible acumulada incrementa la intensidad del frente.');
        }
        if (state.resources.apoyo < 45) {
          messages.push('Diagnóstico: bajo apoyo vecinal, más fricción en evacuaciones y comunicación de crisis.');
        }

        state.diagnosis.forEach(function (hint) {
          uniquePush(messages, 'Diagnóstico: ' + hint);
        });

        state.diagnosis = messages.slice(0, 5);
      }

      function startSummer() {
        state.riskBase = riskFromTerrain();
        state.fireIntensity = clamp(Math.round(18 + state.riskBase * 0.9), 5, 95);
        state.burned = clamp(Math.round(6 + state.riskBase * 0.45 - state.terrain.humedad * 0.12), 2, 70);
        state.resources.agua = clamp(state.resources.agua + Math.round(state.terrain.humedad / 5), 0, 120);

        buildSummerDiagnosis();
        unlockStage('summer');
        state.stage = 'summer';

        addEventLog(
          '☀️ Inicio del verano',
          'Severidad calculada: ' + state.riskBase + ' (' + riskLabel(state.riskBase) + ').'
        );

        render();
      }

      function applySummerFireModel(option) {
        const riskPenalty = Math.round((state.riskBase || 0) / 10);
        let adjustedFireDelta = option.fireDelta;

        if (adjustedFireDelta < 0) {
          adjustedFireDelta = adjustedFireDelta + riskPenalty;
        }

        if (adjustedFireDelta > 0) {
          adjustedFireDelta = adjustedFireDelta + Math.round((state.riskBase || 0) / 20);
        }

        state.fireIntensity = clamp(state.fireIntensity + adjustedFireDelta, 0, 100);

        let burnedShift = option.burnedDelta + Math.round(state.fireIntensity / 22);
        if (state.terrain.cortafuegos >= 42) burnedShift -= 2;
        if (state.resources.agua < 20) burnedShift += 2;

        state.burned = clamp(state.burned + burnedShift, 0, 100);

        return {
          adjustedFireDelta: adjustedFireDelta,
          burnedShift: burnedShift
        };
      }

      function finishCampaignFromSummer() {
        if (state.burned < 20 && state.resources.dinero > 0 && state.resources.brigadas > 0) {
          finalizeResult(
            'victoria',
            'Campaña exitosa: llegaste a otoño con menos del 20% del bosque afectado y recursos críticos en positivo.'
          );
          return;
        }

        if (state.burned < 45 && state.resources.dinero > 0) {
          finalizeResult(
            'parcial',
            'Resultado intermedio: se evitó el colapso total, pero el impacto ambiental y social fue significativo.'
          );
          return;
        }

        finalizeResult(
          'derrota',
          'No se alcanzaron las condiciones de victoria. El territorio entra en recuperación forzosa.'
        );
      }

      function renderSummer() {
        const node = SUMMER_NODES[state.summerIndex];

        document.getElementById('m-intensidad').textContent = state.fireIntensity + '%';
        document.getElementById('m-quemado').textContent = state.burned + '%';
        document.getElementById('bar-intensidad').style.width = state.fireIntensity + '%';
        document.getElementById('bar-quemado').style.width = state.burned + '%';

        const diagnosisList = document.getElementById('diagnosis-list');
        if (state.diagnosis.length === 0) {
          diagnosisList.innerHTML = '<div class="diag-item">Sin alertas críticas heredadas del invierno.</div>';
        } else {
          diagnosisList.innerHTML = state.diagnosis.map(function (item) {
            return '<div class="diag-item">' + item + '</div>';
          }).join('');
        }

        const title = document.getElementById('summer-title');
        const step = document.getElementById('summer-step');
        const context = document.getElementById('summer-context');
        const options = document.getElementById('summer-options');
        const finishBox = document.getElementById('summer-finish-box');

        if (!node) {
          title.textContent = 'Verano completado';
          step.textContent = 'Eventos resueltos';
          context.textContent = 'Has completado los eventos críticos del incendio.';
          options.innerHTML = '';

          finishBox.classList.remove('hidden');
          finishBox.innerHTML =
            '<p><strong>Estado final del frente:</strong> intensidad ' + state.fireIntensity + '% · bosque quemado ' + state.burned + '%</p>' +
            '<div class="button-row"><button class="primary" id="btn-finish-campaign" type="button">Evaluar campaña</button></div>';

          const finishButton = document.getElementById('btn-finish-campaign');
          finishButton.onclick = function () {
            finishCampaignFromSummer();
          };

          return;
        }

        finishBox.classList.add('hidden');
        title.textContent = node.title;
        step.textContent = 'Evento ' + (state.summerIndex + 1) + '/' + SUMMER_NODES.length;
        context.textContent = node.context;

        options.innerHTML = node.options.map(function (option) {
          const recommendedClass = option.recommended ? 'recommended' : '';

          return '<button class="decision-btn ' + recommendedClass + '" data-option="' + option.id + '">' +
            '<div class="decision-title"><strong>Opción ' + option.id.toUpperCase() + ':</strong> ' + option.text + '</div>' +
            '<div class="decision-tags">' + tagsHtml(option.indicators) + '</div>' +
            '<div class="effects">Impactos directos: ' + summarizeEffects(option.resourceEffects, {}) + ' · Fuego base ' + signed(option.fireDelta) + '</div>' +
          '</button>';
        }).join('');

        Array.from(options.querySelectorAll('button')).forEach(function (btn) {
          btn.addEventListener('click', function () {
            const selected = node.options.find(function (option) {
              return option.id === btn.dataset.option;
            });
            if (!selected) return;

            applyVector(state.resources, selected.resourceEffects, RESOURCE_LIMITS);
            const fireResult = applySummerFireModel(selected);

            state.summerLog.push({
              node: node.title,
              decision: selected.text,
              effects:
                summarizeEffects(selected.resourceEffects, {}) +
                ' · Δintensidad ' + signed(fireResult.adjustedFireDelta) +
                ' · Δbosque ' + signed(fireResult.burnedShift)
            });

            addEventLog('☀️ ' + node.title, selected.text);
            state.summerIndex += 1;

            applyEmergencyAidIfNeeded();
            if (evaluateImmediateDefeat()) return;

            render();
          });
        });
      }

      function renderResult() {
        const hero = document.getElementById('result-hero');

        if (!state.result) {
          hero.innerHTML = '<h2>Aún no hay resultado</h2><p class="muted">Completa invierno y verano para obtener evaluación final.</p>';
          return;
        }

        hero.innerHTML =
          '<div class="outcome-chip ' + state.result.type + '">' + state.result.label + '</div>' +
          '<h2>' + state.result.title + '</h2>' +
          '<p class="muted">' + state.result.reason + '</p>';

        document.getElementById('result-risk').textContent = String(state.riskBase == null ? 0 : state.riskBase);
        document.getElementById('result-burned').textContent = state.burned + '%';
        document.getElementById('result-budget').textContent = state.resources.dinero + ' €';

        const fullLog = state.winterLog.concat(state.summerLog);
        const logContainer = document.getElementById('result-log');

        if (fullLog.length === 0) {
          logContainer.innerHTML = '<div class="log-item">Sin decisiones registradas.</div>';
        } else {
          logContainer.innerHTML = fullLog.map(function (item, index) {
            return '<div class="log-item">' +
              '<strong>' + (index + 1) + '. ' + item.node + '</strong><br/>' +
              item.decision +
              '<small>' + item.effects + '</small>' +
            '</div>';
          }).join('');
        }

        const restartButton = document.getElementById('btn-restart');
        restartButton.onclick = function () {
          state = buildInitialState();
          addEventLog('Nueva campaña', 'Se reiniciaron recursos, terreno y eventos.');
          render();
        };

        const reviewButton = document.getElementById('btn-review-winter');
        reviewButton.onclick = function () {
          if (!state.unlocked.winter) return;
          setStage('winter');
        };
      }

      function finalizeResult(type, reason) {
        const labels = {
          victoria: { label: 'Victoria', title: 'Territorio protegido', type: 'victoria' },
          parcial: { label: 'Resultado parcial', title: 'Contención con daños', type: 'parcial' },
          derrota: { label: 'Derrota', title: 'Incendio fuera de control', type: 'derrota' }
        };

        state.result = {
          type: labels[type].type,
          label: labels[type].label,
          title: labels[type].title,
          reason: reason
        };

        unlockStage('result');
        state.stage = 'result';
        addEventLog('🧾 Resultado final', labels[type].label + ': ' + reason);
        render();
      }

      async function loadExternalData() {
        try {
          const [contentRes, firesRes] = await Promise.all([
            fetch('/game-content/data'),
            fetch('/fires/active')
          ]);

          const content = await contentRes.json();
          const firesData = await firesRes.json();

          WINTER_NODES = content.campaign?.winterNodes || [];
          SUMMER_NODES = content.campaign?.summerNodes || [];

          state.catalog.scenarios = (content.scenarios || []).length;
          state.catalog.variables = (content.variables || []).length;
          state.catalog.activeFires = (firesData.fires || []).length;

          addEventLog(
            'Datos cargados',
            'Escenarios: ' + state.catalog.scenarios + ' · Variables: ' + state.catalog.variables + ' · Incendios activos API: ' + state.catalog.activeFires
          );
        } catch (_error) {
          addEventLog('Modo offline de contenido', 'No fue posible cargar catálogo externo; se usa simulación local.');
        }
      }

      async function loadHealth() {
        try {
          const response = await fetch('/health');
          const data = await response.json();
          document.getElementById('health-chip').textContent =
            data.status === 'ok' ? 'API: disponible' : 'API: error';
        } catch (_error) {
          document.getElementById('health-chip').textContent = 'API: sin conexión';
        }
      }

      function render() {
        renderHeader();
        renderStageNav();
        renderScreens();
        renderTopHUD();
        renderGlobalLog();
        renderBriefing();

        if (state.unlocked.winter || state.stage === 'winter') {
          renderWinter();
        }

        if (state.unlocked.summer || state.stage === 'summer') {
          renderSummer();
        }

        if (state.unlocked.result || state.stage === 'result') {
          renderResult();
        }
      }

      async function init() {
        render();
        await Promise.all([loadHealth(), loadExternalData()]);
        render();
      }

      init();
    </script>
  </body>
</html>`;
}

