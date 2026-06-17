export function renderGameContentPage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contenido del juego de emergencias</title>
    <style>
      :root {
        color-scheme: light dark;
        --bg: #08141f;
        --card: #132536d9;
        --muted: #94a3b8;
        --text: #e2e8f0;
        --ok: #22c55e;
        --warn: #f59e0b;
        --bad: #ef4444;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, Segoe UI, Roboto, Arial, sans-serif;
        background:
          radial-gradient(circle at 10% 15%, rgba(34, 197, 94, 0.24), transparent 34%),
          radial-gradient(circle at 90% 20%, rgba(239, 68, 68, 0.2), transparent 30%),
          linear-gradient(180deg, #0a1d2a 0%, #112638 45%, #1c1b16 100%);
        color: var(--text);
      }
      .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 24px;
      }
      h1, h2, h3 { margin: 0 0 12px; }
      .muted { color: var(--muted); }
      .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
      }
      @media (min-width: 900px) {
        .grid { grid-template-columns: 360px 1fr; }
      }
      .card {
        background: var(--card);
        border: 1px solid #35506d;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
        backdrop-filter: blur(2px);
      }
      .list {
        display: grid;
        gap: 8px;
        max-height: 70vh;
        overflow: auto;
      }
      button.item {
        width: 100%;
        text-align: left;
        border: 1px solid #3e5b77;
        background: transparent;
        color: var(--text);
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
      }
      button.item:hover { border-color: #64748b; }
      button.item.active {
        border-color: #93c5fd;
        background: #1d4ed81f;
      }
      .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
      .chip {
        background: #27445f;
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 12px;
      }
      .option {
        border: 1px solid #3e5b77;
        background: #102132d0;
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 10px;
      }
      .pressure-grid {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        margin: 12px 0;
      }
      .pressure {
        border: 1px solid #3e5b77;
        background: #0f2234;
        border-radius: 10px;
        padding: 10px;
      }
      .tag-ok { color: var(--ok); font-weight: 700; }
      .tag-bad { color: var(--bad); font-weight: 700; }
      .impact { color: var(--warn); font-size: 13px; }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border-bottom: 1px solid #3d5874;
        text-align: left;
        padding: 8px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Panel de contenido del juego</h1>
      <p class="muted">Visualización de variables, escenarios y opciones de decisión.</p>

      <div class="card" style="margin-bottom:16px">
        <h2>Variables</h2>
        <div id="variables"></div>
      </div>

      <div class="grid">
        <aside class="card">
          <h2>Escenarios</h2>
          <div class="chips" id="filters"></div>
          <div class="list" id="scenario-list"></div>
        </aside>
        <section class="card">
          <h2 id="scenario-title">Selecciona un escenario</h2>
          <p id="scenario-context" class="muted"></p>
          <div id="options"></div>
        </section>
      </div>
    </div>

    <script>
      const state = {
        data: null,
        selectedCategory: 'todos',
        selectedScenarioId: null
      };

      const categoryLabel = {
        prevencion: 'Prevención',
        operaciones: 'Operaciones',
        'proteccion-civil': 'Protección civil',
        evacuacion: 'Evacuación',
        comunicacion: 'Comunicación',
        postincendio: 'Postincendio'
      };

      function renderVariables(variables) {
        const container = document.getElementById('variables');
        let rows = '';
        variables.forEach(function (v) {
          rows += '<tr>' +
            '<td>' + v.key + '</td>' +
            '<td>' + v.type + '</td>' +
            '<td>' + v.initialValue + '</td>' +
            '<td>' + v.description + '</td>' +
          '</tr>';
        });

        container.innerHTML = '<table>' +
          '<thead><tr><th>Clave</th><th>Tipo</th><th>Valor inicial</th><th>Descripción</th></tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
          '</table>';
      }

      function filteredScenarios() {
        if (!state.data) return [];
        if (state.selectedCategory === 'todos') return state.data.scenarios;
        return state.data.scenarios.filter((s) => s.category === state.selectedCategory);
      }

      function renderFilters() {
        const el = document.getElementById('filters');
        const categories = ['todos', ...new Set(state.data.scenarios.map((s) => s.category))];
        let html = '';

        categories.forEach(function (c) {
          const active = state.selectedCategory === c ? 'active' : '';
          const label = c === 'todos' ? 'Todos' : categoryLabel[c] ?? c;
          html += '<button class="item ' + active + '" data-cat="' + c + '">' +
            label +
          '</button>';
        });

        el.innerHTML = html;

        [...el.querySelectorAll('button')].forEach((btn) => {
          btn.addEventListener('click', () => {
            state.selectedCategory = btn.dataset.cat;
            state.selectedScenarioId = filteredScenarios()[0]?.id ?? null;
            render();
          });
        });
      }

      function renderScenarioList() {
        const el = document.getElementById('scenario-list');
        const items = filteredScenarios();
        let html = '';

        items.forEach(function (s) {
          const active = state.selectedScenarioId === s.id ? 'active' : '';
          html += '<button class="item ' + active + '" data-id="' + s.id + '">' +
            '<strong>' + s.title + '</strong><br/>' +
            '<span class="muted">' + (categoryLabel[s.category] ?? s.category) + '</span>' +
          '</button>';
        });

        el.innerHTML = html;

        [...el.querySelectorAll('button')].forEach((btn) => {
          btn.addEventListener('click', () => {
            state.selectedScenarioId = btn.dataset.id;
            window.location.hash = btn.dataset.id;
            renderScenarioDetail();
            renderScenarioList();
          });
        });

        el.querySelector('button.active')?.scrollIntoView({
          block: 'nearest'
        });
      }

      function renderScenarioDetail() {
        const scenario = state.data.scenarios.find((s) => s.id === state.selectedScenarioId);
        const title = document.getElementById('scenario-title');
        const context = document.getElementById('scenario-context');
        const options = document.getElementById('options');

        if (!scenario) {
          title.textContent = 'No hay escenarios en este filtro';
          context.textContent = '';
          options.innerHTML = '';
          return;
        }

        title.textContent = scenario.title;
        context.textContent = scenario.intro
          ? scenario.intro + ' ' + scenario.context
          : scenario.context;
        let html = '';

        if (scenario.type === 'action-selection') {
          html += '<div class="chips">' +
            '<span class="chip">Tipo: selección de acciones</span>' +
            '<span class="chip">Actuaciones disponibles: ' + scenario.maxActions + '</span>' +
          '</div>';

          if (scenario.objective) {
            html += '<p><strong>Objetivo:</strong> ' + scenario.objective + '</p>';
          }

          if (scenario.pressureIndicators?.length > 0) {
            html += '<div class="pressure-grid">' + scenario.pressureIndicators.map(function (p) {
              return '<div class="pressure"><strong>' + p.label + '</strong><br/><span class="muted">' + p.level + '</span></div>';
            }).join('') + '</div>';
          }

          (scenario.actions || []).forEach(function (a) {
            const impactsText = Object.keys(a.impact || {}).map(function (key) {
              return key + ' ' + a.impact[key];
            }).join(', ');

            html += '<div class="option">' +
              '<div><strong>' + a.label + '</strong></div>' +
              '<div class="muted">' + a.description + '</div>' +
              '<div class="impact">Impactos: ' + impactsText + '</div>' +
              '<div class="muted">' + a.feedback + '</div>' +
            '</div>';
          });

          if (scenario.combos?.length > 0) {
            html += '<h3>Combos</h3>' + scenario.combos.map(function (combo) {
              return '<div class="option"><strong>' + combo.title + '</strong><div class="muted">' + combo.text + '</div></div>';
            }).join('');
          }

          options.innerHTML = html;
          return;
        }

        scenario.options.forEach(function (o) {
          const isRecommended = o.recommended === true || ['optimal', 'recommended'].includes(o.evaluation);
          const tagClass = isRecommended ? 'tag-ok' : 'tag-bad';
          const tagText = o.evaluation ?? (o.recommended ? 'Recomendada' : 'No recomendada');
          const impactsText = o.impacts.length > 0
            ? o.impacts.map(function (i) {
                return i.variableKey + ' ' + (i.delta != null ? i.delta : i.setTo);
              }).join(', ')
            : 'Sin impactos';

          html += '<div class="option">' +
            '<div><strong>Opción ' + o.id.toUpperCase() + ':</strong> ' + o.text + '</div>' +
            '<div class="' + tagClass + '">' + tagText + '</div>' +
            '<div class="muted">' + o.rationale + '</div>' +
            '<div class="impact">Impactos: ' + impactsText + '</div>' +
          '</div>';
        });

        options.innerHTML = html;
      }

      function render() {
        renderFilters();
        renderScenarioList();
        renderScenarioDetail();
      }

      async function init() {
        const response = await fetch('/game-content/data');
        state.data = await response.json();
        const scenarioIdFromHash = window.location.hash.replace('#', '');
        const scenarioFromHash = state.data.scenarios.find((s) => s.id === scenarioIdFromHash);

        if (scenarioFromHash) {
          state.selectedCategory = scenarioFromHash.category;
          state.selectedScenarioId = scenarioFromHash.id;
        } else {
          state.selectedScenarioId = state.data.scenarios[0]?.id ?? null;
        }

        renderVariables(state.data.variables);
        render();
      }

      init();
    </script>
  </body>
</html>`;
}

