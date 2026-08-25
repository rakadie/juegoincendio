export function renderGameContentPage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Apaga las llamas · Playtest de escenarios</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #111416;
        --surface: #fbfaf6;
        --surface-2: #f0eee7;
        --ink: #161b1f;
        --muted: #64707a;
        --line: #d6d0c4;
        --line-strong: #9c9281;
        --teal: #006d74;
        --teal-soft: #d6f0ed;
        --red: #b5312b;
        --red-soft: #ffe0d9;
        --amber: #b56b00;
        --amber-soft: #fff0c9;
        --green: #1d7945;
        --green-soft: #dff5e5;
        --night: #17232b;
        --paper: #fffaf0;
        --shadow: 0 18px 40px rgba(16, 20, 24, 0.22);
      }

      * { box-sizing: border-box; }

      html {
        min-height: 100%;
        background: var(--bg);
      }

      body {
        margin: 0;
        min-height: 100%;
        overflow-x: hidden;
        color: var(--ink);
        font-family: Inter, Segoe UI, Roboto, Arial, sans-serif;
        background:
          linear-gradient(90deg, rgba(17, 20, 22, 0.92), rgba(17, 20, 22, 0.76)),
          url('/images/operational-command-hero.png') center / cover fixed,
          var(--bg);
      }

      button,
      input,
      select {
        font: inherit;
      }

      button {
        cursor: pointer;
      }

      .app {
        min-height: 100vh;
        display: grid;
        grid-template-columns: minmax(300px, 370px) minmax(0, 1fr);
      }

      .sidebar {
        position: sticky;
        top: 0;
        height: 100vh;
        overflow: auto;
        border-right: 1px solid rgba(255, 255, 255, 0.16);
        background: rgba(15, 22, 27, 0.82);
        backdrop-filter: blur(10px);
        padding: 16px;
      }

      .brand {
        display: grid;
        gap: 4px;
        margin-bottom: 14px;
      }

      .brand h1 {
        margin: 0;
        color: #fff8e8;
        font-size: 24px;
        line-height: 1.15;
      }

      .brand p {
        margin: 0;
        color: #c8d2d7;
        font-size: 13px;
        line-height: 1.4;
      }

      .search {
        display: grid;
        gap: 8px;
        margin-bottom: 12px;
      }

      .search input {
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.24);
        border-radius: 8px;
        padding: 10px 11px;
        color: #fff8e8;
        background: rgba(255, 255, 255, 0.08);
      }

      .search input::placeholder {
        color: #b8c5cc;
      }

      .filters {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        margin-bottom: 12px;
      }

      .filter-btn,
      .small-btn,
      .primary-btn,
      .ghost-btn {
        min-height: 38px;
        border-radius: 8px;
        border: 1px solid var(--line);
        color: var(--ink);
        background: var(--surface);
      }

      .filter-btn {
        padding: 7px 8px;
        text-align: center;
        font-size: 13px;
        color: #f3ead7;
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.22);
      }

      .filter-btn.active {
        border-color: #f3b950;
        background: #f3b950;
        color: #241800;
        font-weight: 700;
      }

      .scenario-list {
        display: grid;
        gap: 7px;
      }

      .scenario-btn {
        width: 100%;
        min-height: 72px;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 8px;
        padding: 10px;
        text-align: left;
        color: #fff8e8;
        background: rgba(255, 255, 255, 0.08);
        display: grid;
        gap: 5px;
      }

      .scenario-btn:hover {
        border-color: rgba(255, 255, 255, 0.34);
      }

      .scenario-btn.active {
        border-color: #f3b950;
        background: rgba(243, 185, 80, 0.14);
        box-shadow: 0 0 0 2px rgba(243, 185, 80, 0.12) inset;
      }

      .scenario-btn strong {
        font-size: 14px;
        line-height: 1.25;
      }

      .scenario-meta {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        color: #becad1;
        font-size: 12px;
      }

      main {
        min-width: 0;
        padding: 22px;
      }

      .workbench {
        max-width: 1260px;
        min-width: 0;
        margin: 0 auto;
        display: grid;
        gap: 14px;
      }

      .topbar {
        min-width: 0;
        min-height: 52px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 9px 10px;
        color: #fff8e8;
        background: rgba(21, 32, 39, 0.82);
        backdrop-filter: blur(10px);
        box-shadow: var(--shadow);
      }

      .progress {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        min-height: 26px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 999px;
        padding: 4px 9px;
        color: #54606b;
        background: rgba(255, 255, 255, 0.74);
        font-size: 12px;
        white-space: nowrap;
      }

      .pill.strong {
        border-color: #69d4d2;
        color: #04383d;
        background: #d9fbf7;
        font-weight: 700;
      }

      .pill.warn {
        border-color: #e7b355;
        color: #714400;
        background: var(--amber-soft);
      }

      .toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        min-width: 0;
      }

      .small-btn,
      .ghost-btn {
        padding: 7px 10px;
      }

      .primary-btn {
        padding: 8px 12px;
        border-color: var(--teal);
        color: #fff;
        background: var(--teal);
        font-weight: 700;
      }

      .ghost-btn {
        background: transparent;
      }

      .topbar .ghost-btn {
        border-color: rgba(255, 255, 255, 0.38);
        color: #fff8e8;
      }

      .topbar .ghost-btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .debug-toggle {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        color: #d6e2e7;
        font-size: 13px;
        user-select: none;
      }

      .scenario-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(320px, 410px);
        gap: 14px;
        align-items: start;
      }

      .panel {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: rgba(251, 250, 246, 0.96);
        box-shadow: var(--shadow);
      }

      .scene {
        overflow: hidden;
        position: relative;
        min-width: 0;
        min-height: calc(100vh - 96px);
        color: #fff8e8;
        background:
          linear-gradient(180deg, rgba(5, 10, 14, 0.18), rgba(5, 10, 14, 0.88) 58%, rgba(5, 10, 14, 0.94)),
          linear-gradient(90deg, rgba(5, 10, 14, 0.88), rgba(5, 10, 14, 0.12) 48%, rgba(5, 10, 14, 0.72)),
          url('/images/gameplay-wildfire-scene.png') center / cover;
        box-shadow: 0 26px 60px rgba(0, 0, 0, 0.4);
      }

      .scene-image {
        position: relative;
        min-height: 230px;
        background: none;
        display: grid;
        align-content: end;
        padding: 34px 28px 18px;
        color: #fff;
      }

      .scene-image::after {
        content: '';
        position: absolute;
        left: 28px;
        bottom: 0;
        width: min(220px, 45%);
        height: 3px;
        border-radius: 99px;
        background: #f3b950;
        box-shadow: 0 0 24px rgba(243, 185, 80, 0.72);
        pointer-events: none;
      }

      .scene-image h2,
      .scene-image p {
        position: relative;
        z-index: 1;
      }

      .scene-image h2 {
        max-width: 820px;
        overflow-wrap: anywhere;
        margin: 0 0 8px;
        text-shadow: 0 3px 22px rgba(0, 0, 0, 0.78);
        font-size: 42px;
        line-height: 1.1;
      }

      .scene-image p {
        max-width: 760px;
        margin: 0;
        color: #e8f0f5;
        line-height: 1.45;
        text-shadow: 0 2px 16px rgba(0, 0, 0, 0.72);
      }

      .decision-overlay {
        position: absolute;
        right: 24px;
        bottom: 18px;
        z-index: 2;
        width: min(360px, 46%);
        border: 1px solid rgba(243, 185, 80, 0.72);
        border-radius: 8px;
        padding: 12px 13px;
        color: #fff8e8;
        background:
          linear-gradient(135deg, rgba(89, 49, 0, 0.88), rgba(12, 24, 30, 0.9));
        box-shadow: 0 18px 36px rgba(0, 0, 0, 0.36), 0 0 26px rgba(243, 185, 80, 0.18);
        backdrop-filter: blur(12px);
      }

      .decision-overlay.hidden {
        display: none;
      }

      .decision-overlay small {
        display: block;
        margin-bottom: 5px;
        color: #ffd98c;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .decision-overlay strong {
        display: block;
        line-height: 1.28;
      }

      .decision-overlay span {
        display: block;
        margin-top: 5px;
        color: #cfe2e7;
        font-size: 12px;
        line-height: 1.35;
      }

      .scene-body {
        position: relative;
        z-index: 1;
        padding: 0 28px 28px;
        display: grid;
        gap: 14px;
        background: none;
      }

      .brief {
        display: grid;
        gap: 10px;
        max-height: 270px;
        overflow: auto;
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: 8px;
        padding: 16px;
        color: #fff8e8;
        background: rgba(9, 16, 22, 0.72);
        backdrop-filter: blur(14px);
        box-shadow: 0 18px 34px rgba(0, 0, 0, 0.28);
      }

      .brief p {
        margin: 0;
        line-height: 1.58;
      }

      .objective {
        border-left: 4px solid #69d4d2;
        border-radius: 8px;
        padding: 10px 12px;
        color: #eaffff;
        background: rgba(0, 109, 116, 0.42);
      }

      .objective strong {
        display: block;
        margin-bottom: 4px;
      }

      .question {
        border-left: 4px solid #f3b950;
        border-radius: 8px;
        padding: 10px 12px;
        color: #fff7dc;
        background: rgba(181, 107, 0, 0.36);
        font-weight: 700;
      }

      .choice-area {
        display: grid;
        gap: 10px;
        border: 1px solid rgba(255, 255, 255, 0.24);
        border-radius: 8px;
        padding: 14px;
        background: rgba(10, 16, 20, 0.68);
        backdrop-filter: blur(12px);
        box-shadow: 0 18px 34px rgba(0, 0, 0, 0.28);
      }

      .choice-head {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        align-items: end;
      }

      .choice-head h3,
      .side h3 {
        margin: 0;
        font-size: 18px;
      }

      .choice-head small {
        color: #c8d5dc;
      }

      .choice-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 9px;
        max-height: min(42vh, 390px);
        overflow: auto;
        padding-right: 2px;
      }

      .start-panel {
        min-height: 148px;
        border: 1px solid rgba(243, 185, 80, 0.76);
        border-radius: 8px;
        padding: 18px;
        display: grid;
        gap: 14px;
        align-items: center;
        background:
          linear-gradient(135deg, rgba(255, 240, 201, 0.94), rgba(214, 240, 237, 0.86)),
          url('/images/gameplay-wildfire-scene.png') center / cover;
      }

      .start-panel p {
        max-width: 650px;
        margin: 0;
        color: #263440;
        line-height: 1.5;
      }

      .start-btn {
        width: fit-content;
        min-height: 46px;
        border: 1px solid #8d5600;
        border-radius: 8px;
        padding: 11px 16px;
        color: #241800;
        background: #f3b950;
        font-weight: 800;
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }

      .start-btn:hover {
        filter: brightness(1.04);
      }

      .avatar-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
      }

      .avatar-card {
        min-height: 360px;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 0;
        overflow: hidden;
        text-align: left;
        color: var(--ink);
        background: #fffdf8;
        display: grid;
        grid-template-rows: 1fr auto;
      }

      .avatar-card:hover {
        border-color: var(--amber);
        transform: translateY(-1px);
      }

      .avatar-card.selected {
        border-color: var(--green);
        box-shadow: 0 0 0 3px rgba(29, 121, 69, 0.18) inset;
      }

      .avatar-card:disabled {
        cursor: default;
        opacity: 0.72;
      }

      .avatar-card img {
        width: 100%;
        height: 260px;
        object-fit: cover;
        object-position: center top;
        display: block;
      }

      .avatar-copy {
        padding: 11px;
        display: grid;
        gap: 6px;
      }

      .avatar-copy strong {
        line-height: 1.25;
      }

      .avatar-copy small {
        color: var(--muted);
        line-height: 1.35;
      }

      .choice-card {
        width: 100%;
        min-height: 92px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 12px;
        text-align: left;
        color: #fff8e8;
        background: linear-gradient(135deg, rgba(20, 31, 38, 0.92), rgba(31, 42, 47, 0.76));
        display: grid;
        grid-template-columns: 42px 1fr;
        gap: 10px;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 12px 28px rgba(0, 0, 0, 0.24);
      }

      .choice-card:hover {
        border-color: var(--amber);
        transform: translateY(-1px);
        background: linear-gradient(135deg, rgba(34, 48, 54, 0.95), rgba(58, 54, 42, 0.84));
      }

      .choice-card.selected {
        border-color: var(--green);
        background: linear-gradient(135deg, rgba(20, 88, 50, 0.92), rgba(18, 58, 48, 0.82));
        box-shadow: 0 0 0 3px rgba(93, 224, 142, 0.18) inset, 0 16px 30px rgba(0, 0, 0, 0.28);
      }

      .choice-index {
        width: 34px;
        height: 34px;
        border-radius: 8px;
        display: grid;
        place-items: center;
        color: #221600;
        background: #f3b950;
        font-size: 13px;
        font-weight: 800;
      }

      .choice-content {
        display: grid;
        gap: 8px;
        min-width: 0;
      }

      .choice-card:disabled {
        cursor: default;
        opacity: 0.72;
      }

      .choice-title {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        align-items: start;
      }

      .choice-title strong {
        line-height: 1.3;
        min-width: 0;
      }

      .choice-card p {
        margin: 0;
        color: #d8e3e8;
        line-height: 1.45;
      }

      .impact-row {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
      }

      .impact-pill {
        border-radius: 999px;
        padding: 3px 7px;
        font-size: 11px;
        color: #35475a;
        background: var(--surface-2);
      }

      .impact-pill.good {
        color: #145f31;
        background: var(--green-soft);
      }

      .impact-pill.bad {
        color: #8a1f1f;
        background: var(--red-soft);
      }

      .side {
        position: sticky;
        top: 18px;
        display: grid;
        gap: 14px;
      }

      .side-section {
        padding: 14px;
        display: grid;
        gap: 10px;
      }

      .side-section h3 {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .side-section h3::before {
        content: '';
        width: 8px;
        height: 22px;
        border-radius: 99px;
        background: var(--amber);
      }

      .pressure-list,
      .feedback-list,
      .review-list {
        display: grid;
        gap: 8px;
      }

      .pressure-item,
      .feedback-item,
      .review-item {
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 9px;
        background: var(--surface-2);
      }

      .pressure-item {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        align-items: center;
      }

      .pressure-item small,
      .feedback-item small,
      .review-item small {
        color: var(--muted);
      }

      .metric-board {
        display: grid;
        gap: 7px;
      }

      .metric-row {
        display: grid;
        grid-template-columns: minmax(115px, 1fr) 44px;
        gap: 8px;
        align-items: center;
        font-size: 13px;
      }

      .meter {
        height: 8px;
        border-radius: 99px;
        overflow: hidden;
        background: #dbe4ec;
      }

      .meter span {
        display: block;
        height: 100%;
        width: 50%;
        background: var(--teal);
      }

      .empty {
        color: var(--muted);
        border: 1px dashed var(--line-strong);
        border-radius: 8px;
        padding: 12px;
        background: #fbfcfd;
        line-height: 1.45;
      }

      .result-panel {
        border-color: #e0b35f;
        background: linear-gradient(180deg, #fff9ed, #fff3d3);
      }

      .result-panel h3 {
        margin: 0;
      }

      .hidden {
        display: none;
      }

      .toast {
        position: fixed;
        left: 50%;
        bottom: 18px;
        transform: translateX(-50%);
        border: 1px solid var(--teal);
        border-radius: 8px;
        padding: 9px 12px;
        color: #063b43;
        background: var(--teal-soft);
        box-shadow: var(--shadow);
        opacity: 0;
        pointer-events: none;
        transition: opacity 160ms ease;
      }

      .toast.visible {
        opacity: 1;
      }

      @media (max-width: 980px) {
        .app {
          grid-template-columns: 1fr;
        }

        .sidebar {
          position: static;
          height: auto;
          max-height: none;
        }

        main {
          order: -1;
        }

        .scenario-grid {
          grid-template-columns: 1fr;
        }

        .scene {
          min-height: auto;
        }

        .side {
          position: static;
        }
      }

      @media (max-width: 620px) {
        main {
          padding: 10px;
          min-width: 0;
          max-width: 100vw;
          overflow: hidden;
        }

        .sidebar {
          padding: 10px;
          max-width: 100vw;
        }

        .filters {
          grid-template-columns: 1fr;
        }

        .topbar {
          align-items: stretch;
          flex-direction: column;
          width: min(360px, calc(100vw - 20px));
          max-width: min(360px, calc(100vw - 20px));
          overflow: hidden;
        }

        .workbench,
        .scenario-grid,
        .scene {
          width: min(360px, calc(100vw - 20px));
          max-width: min(360px, calc(100vw - 20px));
        }

        .toolbar {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }

        .toolbar button {
          min-width: 0;
          flex: 1;
          padding-left: 8px;
          padding-right: 8px;
          white-space: normal;
          overflow-wrap: anywhere;
        }

        .debug-toggle {
          grid-column: 1 / -1;
        }

        .scene-image h2 {
          font-size: 22px;
          max-width: 100%;
        }

        .scene-image {
          padding: 26px 16px 16px;
          min-height: 258px;
        }

        .scene-image::after {
          left: 16px;
        }

        .decision-overlay {
          position: relative;
          right: auto;
          bottom: auto;
          width: 100%;
          margin-top: 14px;
        }

        .scene-body {
          padding: 0 16px 16px;
        }

        .scene,
        .brief,
        .choice-area {
          overflow-wrap: anywhere;
        }

        .brief,
        .choice-area {
          width: 100%;
          max-width: 100%;
        }

        .choice-grid {
          grid-template-columns: 1fr;
          max-height: none;
          overflow: visible;
        }

        .choice-card {
          grid-template-columns: 42px minmax(0, 1fr);
        }

        .choice-title {
          display: grid;
          grid-template-columns: 1fr;
        }

        .choice-title .pill {
          justify-self: start;
        }

        .choice-card p {
          overflow-wrap: anywhere;
        }

        .avatar-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="app">
      <aside class="sidebar">
        <div class="brand">
          <h1>Apaga las llamas</h1>
          <p>Playtest de escenarios: lee la situación, elige acciones y revisa consecuencias.</p>
        </div>

        <div class="search">
          <input id="search" type="search" placeholder="Buscar escenario o texto" autocomplete="off" />
          <div class="filters" id="filters"></div>
        </div>

        <div class="scenario-list" id="scenario-list"></div>
      </aside>

      <main>
        <div class="workbench">
          <div class="topbar">
            <div class="progress" id="progress"></div>
            <div class="toolbar">
              <label class="debug-toggle">
                <input id="debug-toggle" type="checkbox" />
                Ver impactos
              </label>
              <button class="ghost-btn" id="copy-link" type="button">Copiar enlace</button>
              <button class="small-btn" id="reset-scene" type="button">Reiniciar</button>
            </div>
          </div>

          <div class="scenario-grid">
            <section class="panel scene">
              <div class="scene-image">
                <h2 id="scenario-title">Cargando escenario</h2>
                <p id="scenario-intro"></p>
                <div class="decision-overlay hidden" id="decision-overlay"></div>
              </div>
              <div class="scene-body">
                <div class="brief" id="brief"></div>
                <div class="choice-area">
                  <div class="choice-head">
                    <div>
                      <h3 id="choice-title">Decisión</h3>
                      <small id="choice-help"></small>
                    </div>
                    <span class="pill strong" id="choice-counter">0/0</span>
                  </div>
                  <div class="choice-grid" id="choices"></div>
                </div>
              </div>
            </section>

            <aside class="side">
              <section class="panel side-section">
                <h3>Presión</h3>
                <div class="pressure-list" id="pressure"></div>
              </section>

              <section class="panel side-section">
                <h3>Estado de la escena</h3>
                <div class="metric-board" id="metrics"></div>
              </section>

              <section class="panel side-section">
                <h3>Feedback</h3>
                <div class="feedback-list" id="feedback"></div>
              </section>

              <section class="panel side-section result-panel hidden" id="result-panel">
                <h3 id="result-title"></h3>
                <p id="result-text"></p>
                <div class="review-list" id="review"></div>
                <button class="primary-btn" id="next-scenario" type="button">Avanzar →</button>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>

    <div class="toast" id="toast">Enlace copiado</div>

    <script>
      const state = {
        data: null,
        selectedCategory: 'todos',
        selectedScenarioId: null,
        query: '',
        showImpacts: false,
        selectedIds: [],
        feedback: [],
        metrics: {},
        flags: [],
        completed: false,
        result: null,
        transition: null,
        decisionLog: [],
        selectedAvatar: null
      };

      const categoryLabel = {
        prevencion: 'Prevención',
        operaciones: 'Operaciones',
        'proteccion-civil': 'Protección civil',
        evacuacion: 'Evacuación',
        comunicacion: 'Comunicación',
        postincendio: 'Postincendio'
      };

      const metricLabel = {
        confusionPublica: 'Confusión',
        saturacion112: '112',
        confianzaInstitucional: 'Confianza',
        coordinacionOperativa: 'Coordinación',
        riesgoAtrapamiento: 'Atrapamiento',
        poblacionProtegida: 'Población',
        seguridadEquipos: 'Equipos',
        danosViviendas: 'Viviendas',
        exposicionHumoCalor: 'Humo/calor'
      };

      function escapeHtml(value) {
        return String(value ?? '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      }

      function paragraphHtml(value) {
        return escapeHtml(value).split('\\n').filter(Boolean).map(function (line) {
          return '<p>' + line + '</p>';
        }).join('');
      }

      function currentScenario() {
        return state.data?.scenarios.find(function (scenario) {
          return scenario.id === state.selectedScenarioId;
        });
      }

      function categoryName(value) {
        return categoryLabel[value] ?? value ?? 'Sin categoría';
      }

      function evaluationName(value) {
        const labels = {
          optimal: 'Opción óptima',
          recommended: 'Opción recomendada',
          acceptable: 'Opción aceptable con matices',
          risky: 'Opción arriesgada',
          critical: 'Opción crítica'
        };
        return labels[value] ?? 'Opción seleccionada';
      }

      function resetInteraction() {
        state.selectedIds = [];
        state.feedback = [];
        state.metrics = {};
        state.flags = [];
        state.completed = false;
        state.result = null;
        state.transition = null;
        state.decisionLog = [];
      }

      function goToScenario(scenarioId) {
        state.selectedScenarioId = scenarioId;
        const scenario = state.data?.scenarios.find(function (item) {
          return item.id === scenarioId;
        });
        if (scenario) state.selectedCategory = scenario.category;
        window.location.hash = scenarioId;
        resetInteraction();
        render();
      }

      function goToNextScenario() {
        const scenarios = state.data?.scenarios || [];
        const index = scenarios.findIndex(function (scenario) {
          return scenario.id === state.selectedScenarioId;
        });
        const next = scenarios[index + 1] || scenarios[0];
        if (next) goToScenario(next.id);
      }

      function filteredScenarios() {
        if (!state.data) return [];
        const query = state.query.trim().toLowerCase();

        return state.data.scenarios.filter(function (scenario) {
          const categoryMatches = state.selectedCategory === 'todos' || scenario.category === state.selectedCategory;
          const queryMatches = query.length === 0 || [
            scenario.title,
            scenario.context,
            scenario.intro,
            scenario.objective,
            scenario.question,
            scenario.tags?.join(' ')
          ].join(' ').toLowerCase().includes(query);

          return categoryMatches && queryMatches;
        });
      }

      function renderFilters() {
        const el = document.getElementById('filters');
        const preferredOrder = ['prevencion', 'comunicacion', 'operaciones'];
        const available = Array.from(new Set(state.data.scenarios.map(function (scenario) {
          return scenario.category;
        })));
        const categories = ['todos']
          .concat(preferredOrder.filter(function (category) {
            return available.includes(category);
          }))
          .concat(available.filter(function (category) {
            return !preferredOrder.includes(category);
          }));

        el.innerHTML = categories.map(function (category) {
          const label = category === 'todos' ? 'Todos' : categoryName(category);
          const active = state.selectedCategory === category ? ' active' : '';
          return '<button class="filter-btn' + active + '" data-category="' + escapeHtml(category) + '" type="button">' + escapeHtml(label) + '</button>';
        }).join('');

        Array.from(el.querySelectorAll('button')).forEach(function (button) {
          button.addEventListener('click', function () {
            state.selectedCategory = button.dataset.category;
            const first = filteredScenarios()[0];
            state.selectedScenarioId = first?.id ?? null;
            resetInteraction();
            render();
          });
        });
      }

      function renderScenarioList() {
        const el = document.getElementById('scenario-list');
        const scenarios = filteredScenarios();

        if (scenarios.length === 0) {
          el.innerHTML = '<div class="empty">No hay escenarios con ese filtro.</div>';
          return;
        }

        el.innerHTML = scenarios.map(function (scenario) {
          const active = scenario.id === state.selectedScenarioId ? ' active' : '';
          return '<button class="scenario-btn' + active + '" data-id="' + escapeHtml(scenario.id) + '" type="button">' +
            '<strong>' + escapeHtml(scenario.title) + '</strong>' +
            '<span class="scenario-meta">' +
              '<span>' + escapeHtml(categoryName(scenario.category)) + '</span>' +
              '<span>' + escapeHtml(scenario.difficulty ?? 'sin dificultad') + '</span>' +
              '<span>' + escapeHtml(scenario.estimatedTime ?? '') + '</span>' +
            '</span>' +
          '</button>';
        }).join('');

        Array.from(el.querySelectorAll('button')).forEach(function (button) {
          button.addEventListener('click', function () {
            state.selectedScenarioId = button.dataset.id;
            window.location.hash = button.dataset.id;
            resetInteraction();
            render();
          });
        });
      }

      function renderProgress(scenario) {
        const scenarios = filteredScenarios();
        const index = Math.max(0, scenarios.findIndex(function (item) {
          return item.id === scenario?.id;
        }));

        document.getElementById('progress').innerHTML = scenario
          ? '<span class="pill strong">Escenario ' + (index + 1) + '/' + scenarios.length + '</span>' +
            '<span class="pill">' + escapeHtml(categoryName(scenario.category)) + '</span>' +
            '<span class="pill">' + escapeHtml(scenario.difficulty ?? 'media') + '</span>' +
            '<span class="pill warn">' + escapeHtml(scenario.estimatedTime ?? 'sin tiempo') + '</span>'
          : '<span class="pill">Sin escenario</span>';
      }

      function renderBrief(scenario) {
        const parts = [];
        const sameBriefingAsContext = String(scenario.briefing || '').trim() === String(scenario.context || '').trim();
        if (scenario.objective) {
          parts.push('<div class="objective"><strong>Objetivo</strong>' + escapeHtml(scenario.objective) + '</div>');
        }
        if (scenario.context) {
          parts.push('<div>' + paragraphHtml(scenario.context) + '</div>');
        }
        if (scenario.briefing && !sameBriefingAsContext && !['s-000-introduccion', 's-000b-avatar-emergencias', 's-000c-contexto-prevencion-otono'].includes(scenario.id)) {
          parts.push('<div class="objective"><strong>Criterio de emergencia</strong>' + escapeHtml(scenario.briefing) + '</div>');
        }
        if (scenario.question && scenario.id !== 's-000-introduccion') {
          parts.push('<div class="question">' + escapeHtml(scenario.question) + '</div>');
        }
        document.getElementById('brief').innerHTML = parts.join('');
      }

      function signed(value) {
        return value > 0 ? '+' + value : String(value);
      }

      function impactClass(key, value) {
        const badWhenPositive = [
          'confusionPublica',
          'saturacion112',
          'riesgoAtrapamiento',
          'danosViviendas',
          'exposicionHumoCalor',
          'riesgoPropagacion'
        ];
        const positiveIsBad = badWhenPositive.includes(key);
        if (value === 0) return '';
        return positiveIsBad === value > 0 ? ' bad' : ' good';
      }

      function impactHtml(impact) {
        if (!impact || Object.keys(impact).length === 0) return '';
        return '<div class="impact-row">' + Object.keys(impact).map(function (key) {
          const value = impact[key];
          return '<span class="impact-pill' + impactClass(key, value) + '">' + escapeHtml(metricLabel[key] ?? key) + ' ' + signed(value) + '</span>';
        }).join('') + '</div>';
      }

      function conditionMatches(condition) {
        if (!condition || condition === 'default') return condition === 'default';
        return Object.keys(condition).every(function (key) {
          const expression = String(condition[key]);
          const value = state.metrics[key] || 0;
          const match = /^(<=|>=|<|>|=)?\\s*(-?\\d+)$/.exec(expression);
          if (!match) return false;
          const operator = match[1] || '=';
          const expected = Number(match[2]);
          if (operator === '<=') return value <= expected;
          if (operator === '>=') return value >= expected;
          if (operator === '<') return value < expected;
          if (operator === '>') return value > expected;
          return value === expected;
        });
      }

      function chooseOutcome(scenario) {
        return scenario.outcomes?.find(function (outcome) {
          return conditionMatches(outcome.condition);
        }) ?? scenario.outcomes?.[scenario.outcomes.length - 1] ?? null;
      }

      function chooseTransition(scenario) {
        return scenario.nextLogic?.find(function (logic) {
          return conditionMatches(logic.condition);
        }) ?? scenario.nextLogic?.find(function (logic) {
          return logic.condition === 'default';
        }) ?? null;
      }

      function applyImpact(impact) {
        Object.keys(impact || {}).forEach(function (key) {
          state.metrics[key] = (state.metrics[key] || 0) + impact[key];
        });
      }

      function renderDecisionOverlay(scenario) {
        const overlay = document.getElementById('decision-overlay');
        if (!overlay) return;

        if (!scenario || state.decisionLog.length === 0) {
          overlay.classList.add('hidden');
          overlay.innerHTML = '';
          return;
        }

        const latest = state.decisionLog[state.decisionLog.length - 1];
        const countText = state.decisionLog.length > 1
          ? state.decisionLog.length + ' decisiones en escena'
          : 'Tu elección';

        overlay.classList.remove('hidden');
        overlay.innerHTML =
          '<small>' + escapeHtml(countText) + '</small>' +
          '<strong>' + escapeHtml(latest.title) + '</strong>' +
          (latest.detail ? '<span>' + escapeHtml(latest.detail) + '</span>' : '');
      }

      function completeActionScenario(scenario) {
        if (state.completed) return;

        (scenario.combos || []).forEach(function (combo) {
          const active = (combo.requires || []).every(function (flag) {
            return state.flags.includes(flag);
          });

          if (!active) return;
          state.feedback.push(combo.title + ': ' + combo.text);
          applyImpact(combo.bonusImpact || {});
        });

        state.result = chooseOutcome(scenario);
        if (state.result) applyImpact(state.result.crisisImpact || {});
        state.transition = chooseTransition(scenario);
        state.completed = true;
      }

      function selectAction(scenario, action) {
        if (!scenario || !action || state.completed) return;
        if (state.selectedIds.includes(action.id)) return;
        if (state.selectedIds.length >= (scenario.maxActions || 1)) return;

        state.selectedIds.push(action.id);
        state.decisionLog.push({
          title: action.label,
          detail: action.description
        });
        (action.flagsOnApply || []).forEach(function (flag) {
          if (!state.flags.includes(flag)) state.flags.push(flag);
        });
        applyImpact(action.impact || {});
        if (action.feedback) state.feedback.push(action.feedback);

        if (state.selectedIds.length >= (scenario.maxActions || 1)) {
          completeActionScenario(scenario);
        }

        render();
      }

      function selectOption(scenario, option) {
        if (!scenario || !option) return;
        const scenarios = state.data?.scenarios || [];
        const index = scenarios.findIndex(function (item) {
          return item.id === scenario.id;
        });
        const next = scenarios[index + 1] || null;
        state.selectedIds = [option.id];
        state.decisionLog = [{
          title: option.text,
          detail: evaluationName(option.evaluation)
        }];
        state.feedback = [option.shortFeedback || option.rationale || 'Decisión registrada.'];
        state.completed = true;
        state.result = {
          title: evaluationName(option.evaluation),
          text: option.longFeedback || option.rationale || ''
        };
        state.transition = next
          ? {
              nextScenario: next.id,
              transition: 'Continúa con la siguiente escena.'
            }
          : null;
        render();
      }

      function selectAvatar(option) {
        if (!option) return;
        state.selectedAvatar = {
          id: option.id,
          text: option.text
        };
        state.selectedCategory = 'prevencion';
        goToScenario('s-000c-contexto-prevencion-otono');
      }

      function renderChoices(scenario) {
        const choices = document.getElementById('choices');
        const counter = document.getElementById('choice-counter');
        const choiceTitle = document.getElementById('choice-title');
        const help = document.getElementById('choice-help');

        if (scenario.id === 's-000-introduccion') {
          counter.textContent = 'Inicio';
          choiceTitle.textContent = 'Comenzar';
          help.textContent = '';
          choices.innerHTML =
            '<div class="start-panel">' +
              '<p>Entra en el simulador cuando estés listo para tomar decisiones de prevención, comunicación y emergencia.</p>' +
              '<button class="start-btn" id="start-game" type="button">Comenzar <span aria-hidden="true">→</span></button>' +
            '</div>';

          document.getElementById('start-game').addEventListener('click', goToNextScenario);
          return;
        }

        if (scenario.id === 's-000c-contexto-prevencion-otono') {
          counter.textContent = 'Contexto';
          choiceTitle.textContent = 'Continuar';
          help.textContent = '';
          choices.innerHTML =
            '<div class="start-panel">' +
              '<p>Cuando tengas claro el punto de partida, entra en la fase de prevención.</p>' +
              '<button class="start-btn" id="continue-context" type="button">Continuar <span aria-hidden="true">→</span></button>' +
            '</div>';

          document.getElementById('continue-context').addEventListener('click', goToNextScenario);
          return;
        }

        if (scenario.id === 's-000b-avatar-emergencias') {
          const avatarSrc = {
            a: '/images/avatar-forestal-hombre.png',
            b: '/images/avatar-forestal-mujer.png',
            c: '/images/avatar-forestal-neutro.png?v=3'
          };
          const options = scenario.options || [];
          counter.textContent = state.selectedIds.length > 0 ? '1/1' : '0/1';
          choiceTitle.textContent = 'Elige avatar';
          help.textContent = state.completed ? 'Avatar seleccionado.' : 'Selecciona la persona que te representará en la partida.';

          choices.innerHTML = '<div class="avatar-grid">' + options.map(function (option) {
            const selected = state.selectedIds.includes(option.id);
            const disabled = state.completed && !selected;
            return '<button class="avatar-card' + (selected ? ' selected' : '') + '" data-option="' + escapeHtml(option.id) + '" type="button" ' + (disabled ? 'disabled' : '') + '>' +
              '<img src="' + escapeHtml(avatarSrc[option.id] || avatarSrc.c) + '" alt="' + escapeHtml(option.text) + '" />' +
              '<span class="avatar-copy">' +
                '<strong>' + escapeHtml(option.text) + '</strong>' +
                '<small>' + escapeHtml(option.rationale || 'Perfil de responsable de emergencias.') + '</small>' +
              '</span>' +
            '</button>';
          }).join('') + '</div>';

          Array.from(choices.querySelectorAll('button')).forEach(function (button) {
            button.addEventListener('click', function () {
              const option = options.find(function (item) {
                return item.id === button.dataset.option;
              });
              selectAvatar(option);
            });
          });
          return;
        }

        if (scenario.type === 'action-selection') {
          const max = scenario.maxActions || 1;
          counter.textContent = state.selectedIds.length + '/' + max;
          choiceTitle.textContent = 'Elige acciones';
          help.textContent = state.completed
            ? 'Escena cerrada. Revisa el resultado.'
            : 'Selecciona ' + max + ' acción' + (max > 1 ? 'es' : '') + ' antes de ver el resultado.';

          choices.innerHTML = (scenario.actions || []).map(function (action, index) {
            const selected = state.selectedIds.includes(action.id);
            const disabled = state.completed || selected || state.selectedIds.length >= max;
            return '<button class="choice-card' + (selected ? ' selected' : '') + '" data-action="' + escapeHtml(action.id) + '" type="button" ' + (disabled ? 'disabled' : '') + '>' +
              '<span class="choice-index">' + String(index + 1).padStart(2, '0') + '</span>' +
              '<span class="choice-content">' +
                '<span class="choice-title"><strong>' + escapeHtml(action.label) + '</strong><span class="pill">' + (selected ? 'Elegida' : 'Elegir') + '</span></span>' +
                '<p>' + escapeHtml(action.description) + '</p>' +
                (state.showImpacts ? impactHtml(action.impact) : '') +
              '</span>' +
            '</button>';
          }).join('');

          Array.from(choices.querySelectorAll('button')).forEach(function (button) {
            button.addEventListener('click', function () {
              const action = (scenario.actions || []).find(function (item) {
                return item.id === button.dataset.action;
              });
              selectAction(scenario, action);
            });
          });
          return;
        }

        const options = scenario.options || [];
        counter.textContent = state.selectedIds.length > 0 ? '1/1' : '0/1';
        choiceTitle.textContent = 'Elige una respuesta';
        help.textContent = state.completed ? 'Respuesta registrada.' : 'Selecciona una opción para revelar feedback.';
        choices.innerHTML = options.map(function (option, index) {
          const selected = state.selectedIds.includes(option.id);
          const disabled = state.completed && !selected;
          const impacts = (option.impacts || []).reduce(function (acc, item) {
            acc[item.variableKey] = item.delta ?? item.setTo ?? 0;
            return acc;
          }, {});

          return '<button class="choice-card' + (selected ? ' selected' : '') + '" data-option="' + escapeHtml(option.id) + '" type="button" ' + (disabled ? 'disabled' : '') + '>' +
            '<span class="choice-index">' + String(index + 1).padStart(2, '0') + '</span>' +
            '<span class="choice-content">' +
              '<span class="choice-title"><strong>Opción ' + escapeHtml(String(option.id).toUpperCase()) + '</strong><span class="pill">' + (selected ? 'Elegida' : 'Elegir') + '</span></span>' +
              '<p>' + escapeHtml(option.text) + '</p>' +
              (state.showImpacts ? impactHtml(impacts) : '') +
            '</span>' +
          '</button>';
        }).join('');

        Array.from(choices.querySelectorAll('button')).forEach(function (button) {
          button.addEventListener('click', function () {
            const option = options.find(function (item) {
              return item.id === button.dataset.option;
            });
            selectOption(scenario, option);
          });
        });
      }

      function renderPressure(scenario) {
        const pressure = document.getElementById('pressure');
        const indicators = scenario.pressureIndicators || [];
        pressure.innerHTML = indicators.length
          ? indicators.map(function (item) {
              return '<div class="pressure-item"><strong>' + escapeHtml(item.label) + '</strong><small>' + escapeHtml(item.level) + '</small></div>';
            }).join('')
          : '<div class="empty">Sin indicadores de presión definidos.</div>';
      }

      function renderMetrics() {
        const el = document.getElementById('metrics');
        const keys = Object.keys(state.metrics);
        if (keys.length === 0) {
          el.innerHTML = '<div class="empty">El estado aparecerá cuando tomes decisiones.</div>';
          return;
        }

        el.innerHTML = keys.sort().map(function (key) {
          const value = state.metrics[key];
          const width = Math.max(0, Math.min(100, 50 + value * 8));
          return '<div class="metric-row">' +
            '<div><strong>' + escapeHtml(metricLabel[key] ?? key) + '</strong><div class="meter"><span style="width:' + width + '%"></span></div></div>' +
            '<span>' + signed(value) + '</span>' +
          '</div>';
        }).join('');
      }

      function renderFeedback() {
        const el = document.getElementById('feedback');
        el.innerHTML = state.feedback.length
          ? state.feedback.map(function (item) {
              return '<div class="feedback-item">' + escapeHtml(item) + '</div>';
            }).join('')
          : '<div class="empty">El feedback se muestra después de elegir. Así la decisión pesa más.</div>';
      }

      function renderResult(scenario) {
        const panel = document.getElementById('result-panel');
        const next = document.getElementById('next-scenario');

        if (!state.completed || !state.result) {
          panel.classList.add('hidden');
          return;
        }

        panel.classList.remove('hidden');
        document.getElementById('result-title').textContent = state.result.title || 'Resultado';
        document.getElementById('result-text').textContent = state.result.text || '';
        document.getElementById('review').innerHTML =
          '<div class="review-item"><strong>Decisiones tomadas</strong><br/><small>' + state.selectedIds.length + ' registrada(s)</small></div>' +
          '<div class="review-item"><strong>Siguiente tensión</strong><br/><small>' + escapeHtml(state.transition?.transition ?? 'Sin transición definida.') + '</small></div>';

        if (state.transition?.nextScenario) {
          next.classList.remove('hidden');
          next.onclick = function () {
            goToScenario(state.transition.nextScenario);
          };
        } else {
          next.classList.add('hidden');
        }
      }

      function renderScenario() {
        const scenario = currentScenario();
        renderProgress(scenario);

        if (!scenario) {
          document.getElementById('scenario-title').textContent = 'Sin escenario';
          document.getElementById('scenario-intro').textContent = '';
          document.getElementById('brief').innerHTML = '<div class="empty">Elige otro filtro o borra la búsqueda.</div>';
          document.getElementById('choices').innerHTML = '';
          renderPressure({});
          renderMetrics();
          renderFeedback();
          renderResult({});
          renderDecisionOverlay(null);
          return;
        }

        document.getElementById('scenario-title').textContent = scenario.title;
        document.getElementById('scenario-intro').textContent = scenario.intro || categoryName(scenario.category);
        renderDecisionOverlay(scenario);
        renderBrief(scenario);
        renderChoices(scenario);
        renderPressure(scenario);
        renderMetrics();
        renderFeedback();
        renderResult(scenario);
      }

      function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('visible');
        window.setTimeout(function () {
          toast.classList.remove('visible');
        }, 1400);
      }

      function render() {
        renderFilters();
        renderScenarioList();
        renderScenario();
      }

      async function init() {
        const response = await fetch('/editorial-content/data');
        state.data = await response.json();

        const hashId = window.location.hash.replace('#', '');
        const hashScenario = state.data.scenarios.find(function (scenario) {
          return scenario.id === hashId;
        });

        state.selectedScenarioId = hashScenario?.id ?? state.data.scenarios[0]?.id ?? null;
        if (hashScenario) state.selectedCategory = hashScenario.category;

        document.getElementById('search').addEventListener('input', function (event) {
          state.query = event.target.value;
          const scenarios = filteredScenarios();
          if (!scenarios.find(function (scenario) { return scenario.id === state.selectedScenarioId; })) {
            state.selectedScenarioId = scenarios[0]?.id ?? null;
            resetInteraction();
          }
          render();
        });

        document.getElementById('debug-toggle').addEventListener('change', function (event) {
          state.showImpacts = event.target.checked;
          renderScenario();
        });

        document.getElementById('reset-scene').addEventListener('click', function () {
          resetInteraction();
          renderScenario();
        });

        document.getElementById('copy-link').addEventListener('click', async function () {
          const url = window.location.origin + window.location.pathname + '#' + (state.selectedScenarioId || '');
          try {
            await navigator.clipboard.writeText(url);
            showToast('Enlace copiado');
          } catch (_error) {
            showToast(url);
          }
        });

        render();
      }

      init();
    </script>
  </body>
</html>`;
}
