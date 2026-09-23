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
        --surface: #f7f8f6;
        --line: #cbd2cf;
        --ink: #17242d;
        --muted: #617079;
        --green: #4f9139;
        --green-dark: #24622f;
        --orange: #d8780f;
        --red: #b73228;
        --accent: #f0b44b;
        --primary-action: #a95000;
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
      [data-visual-element-id]:focus-visible,
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
        min-height: 64px;
        display: grid;
        grid-template-columns: minmax(210px, .8fr) minmax(520px, 2fr) minmax(160px, .7fr);
        align-items: center;
        gap: 22px;
        padding: 8px clamp(16px, 3vw, 38px);
        color: #f7fbff;
        background: linear-gradient(90deg, #061522, var(--navy) 58%, #0c2130);
        border-bottom: 1px solid #294052;
        box-shadow: 0 8px 28px rgba(2, 13, 22, .24);
      }

      .brand { display: flex; align-items: center; gap: 11px; min-width: 0; }
      .brand-mark {
        width: 38px;
        height: 42px;
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
      .stage {
        position: relative;
        display: grid;
        grid-template-columns: 32px minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        min-width: 0;
        color: #9db0bc;
      }
      .stage:not(:last-child)::after {
        content: '';
        position: absolute;
        height: 2px;
        left: 42px;
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
      .stage-label {
        position: relative;
        z-index: 2;
        justify-self: start;
        min-width: 0;
        padding: 2px 8px 2px 0;
        background: var(--navy);
        font-size: .8rem;
        font-weight: 780;
        line-height: 1.15;
      }
      .stage.complete, .stage.active { color: #fff; }
      .stage.complete .stage-dot { border-color: #6dab4a; background: #5b9d3f; }
      .stage.active .stage-dot {
        border-color: #f4a93a;
        background: var(--primary-action);
        box-shadow: 0 0 0 4px rgba(240, 180, 75, .15);
      }
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
      #notice:empty { display: none; }
      .loading { min-height: 62vh; display: grid; place-items: center; color: var(--muted); }

      .entry {
        min-height: min(720px, calc(100vh - 142px));
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(320px, .92fr);
        overflow: hidden;
        border: 1px solid #c7cfcc;
        border-radius: 14px;
        background: rgba(250, 251, 249, .98);
        box-shadow: var(--shadow);
      }
      .entry-copy {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: clamp(30px, 5vw, 76px);
      }
      .entry-copy h1 { max-width: 780px; margin-bottom: 18px; }
      .entry-copy .lead { max-width: 720px; font-size: clamp(1rem, 1.5vw, 1.18rem); }
      .entry-meta { display: flex; flex-wrap: wrap; gap: 8px; margin: 22px 0 4px; }
      .entry-meta span {
        padding: 7px 10px;
        border: 1px solid #c5ceca;
        border-radius: 999px;
        color: #4e626a;
        background: #f5f8f6;
        font-size: .78rem;
        font-weight: 740;
      }
      .entry-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
      .entry-actions .primary { min-width: 190px; min-height: 48px; }
      .entry-note { max-width: 660px; margin: 15px 0 0; color: #64757c; font-size: .82rem; }
      .entry-visual {
        position: relative;
        min-height: 420px;
        display: flex;
        align-items: flex-end;
        padding: clamp(22px, 4vw, 48px);
        color: #fff;
        background:
          linear-gradient(180deg, rgba(7, 23, 38, .08), rgba(7, 23, 38, .82)),
          url('/images/operational-command-hero.png') center / cover;
      }
      .entry-visual-card {
        max-width: 420px;
        padding: 16px 18px;
        border: 1px solid rgba(255,255,255,.28);
        border-radius: 10px;
        background: rgba(7, 23, 38, .72);
        backdrop-filter: blur(4px);
      }
      .entry-visual-card strong { display: block; margin-bottom: 5px; font-size: .92rem; }
      .entry-visual-card p { margin: 0; color: #dce7ec; font-size: .82rem; }

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
      h1, h2, .scene-content, .visual-canvas { scroll-margin-top: 88px; }
      .scene h1:focus, .scene h2:focus { outline: none; }
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
      .visual-hint { margin: 10px 0 0; color: #53666f; font-size: .8rem; font-weight: 700; }

      .scene-workspace {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(300px, 350px);
        align-items: start;
        gap: clamp(12px, 1.6vw, 18px);
        margin-top: 12px;
        scroll-margin-top: 96px;
      }
      .scene.scene-with-side-panel { min-height: 0; overflow: visible; }
      .scene-with-side-panel .scene-content { padding: clamp(14px, 1.7vw, 22px); }
      .scene-main { min-width: 0; }
      .scene-main .visual-scene { margin: 0; }
      .scene-main > .inspection-response { margin-top: 10px; }
      .scene-side-panel {
        position: sticky;
        top: 84px;
        z-index: 9;
        max-height: calc(100dvh - 102px);
        display: grid;
        align-content: start;
        gap: 9px;
        overflow: auto;
        padding: 12px;
        border: 1px solid #bac6c1;
        border-radius: 12px;
        background: rgba(248, 250, 247, .98);
        box-shadow: 0 12px 30px rgba(7, 23, 38, .13);
      }
      .scene-side-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid #d6ded9;
      }
      .scene-side-header h3 { margin: 0; color: #1f4034; font-size: 1rem; }
      .scene-side-close {
        display: none;
        min-width: 44px;
        min-height: 44px;
        border: 1px solid #aebbb5;
        border-radius: 9px;
        color: #263941;
        background: #fff;
        cursor: pointer;
        font-weight: 800;
      }
      .scene-side-trigger {
        display: none;
        width: 100%;
        min-height: 48px;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 11px 14px;
        border: 1px solid #315f4e;
        border-radius: 10px;
        color: #fff;
        background: #244c3d;
        box-shadow: 0 8px 18px rgba(36, 76, 61, .18);
        cursor: pointer;
        font-weight: 820;
      }
      .scene-side-trigger::after { content: '\\2192'; font-size: 1.2rem; }
      .scene-side-backdrop { display: none; }
      .scene-side-panel .objective,
      .scene-side-panel .visual-hint,
      .scene-side-panel .inspection-response,
      .scene-side-panel .actions,
      .scene-side-panel .feedback,
      .scene-side-panel .footer-actions { margin: 0; }
      .scene-side-panel .selection-counter,
      .scene-side-panel .scene-state-badge { width: 100%; }
      .scene-side-panel .selection-counter,
      .scene-side-panel .scene-state-badge {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 2px 10px;
        padding: 8px 10px;
        text-align: left;
      }
      .scene-side-panel .selection-counter strong,
      .scene-side-panel .scene-state-badge strong { grid-column: 2; grid-row: 1; margin: 0; font-size: 1.15rem; }
      .scene-side-panel .selection-counter .selection-remaining { grid-column: 1 / -1; margin: 0; }
      .scene-side-panel .objective { padding: 9px 11px; font-size: .84rem; line-height: 1.35; }
      .scene-side-panel .visual-hint { font-size: .74rem; line-height: 1.35; }
      .scene-side-panel [data-visual-menu-slot] { display: grid; gap: 10px; }
      .scene-side-panel [data-visual-menu-slot][hidden] { display: none; }
      .scene-side-panel .territory-map-key,
      .scene-side-panel .housing-map-key {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 7px;
        padding: 0;
        border: 0;
        background: transparent;
      }
      .scene-side-panel .territory-map-key-item,
      .scene-side-panel .housing-map-key-item { min-height: 56px; padding: 8px; }
      .scene-side-panel .housing-map-key-item {
        border-color: #d3d9cf;
        border-radius: 10px;
        background: rgba(255,255,255,.9);
        box-shadow: 0 2px 7px rgba(21, 50, 40, .08);
      }
      .scene-side-panel .housing-map-key-item:hover {
        border-color: #9dac9f;
        background: #fff;
        box-shadow: 0 4px 11px rgba(21, 50, 40, .12);
      }
      .scene-side-panel .housing-map-key-item .housing-key-number {
        flex-basis: 32px;
        height: 32px;
        border-width: 2px;
        border-color: #8f7049;
        font-size: 14px;
        font-weight: 800;
      }
      .scene-side-panel .housing-map-key-item strong { color: #1b3c31; font-size: .8rem; }
      .scene-side-panel .housing-map-key-item small {
        width: fit-content;
        margin-top: 5px;
        padding: 2px 7px;
        border-radius: 999px;
        color: #6c5333;
        background: #f6ead5;
        font-size: .66rem;
        font-weight: 700;
      }
      .scene-side-panel .territory-map-key-item:last-child { grid-column: 1 / -1; }
      .scene-side-panel .visual-card-layer {
        position: static;
        display: grid;
        pointer-events: auto;
      }
      .scene-side-panel .visual-hover-card {
        position: static;
        width: 100%;
        max-height: none;
        padding: 11px;
        border-color: #c5d0cb;
        box-shadow: 0 5px 15px rgba(7, 23, 38, .1);
      }
      .scene-side-panel .inspection-response { grid-template-columns: 1fr; }
      .scene-side-panel .actions { grid-template-columns: 1fr; }
      .scene-side-panel .action-card { min-height: 0; gap: 4px; padding: 10px; }
      .scene-side-panel .action-card h3 { margin-bottom: 2px; font-size: .94rem; }
      .scene-side-panel .action-card p { margin-bottom: 5px; font-size: .76rem; line-height: 1.35; }
      .scene-side-panel .action-card button { min-height: 38px; }
      .scene-side-panel .footer-actions {
        position: sticky;
        bottom: -12px;
        z-index: 2;
        padding: 8px 0 12px;
        background: linear-gradient(180deg, rgba(248,250,247,0), #f8faf7 24%);
      }
      .scene-side-panel .footer-actions .primary { width: 100%; }
      .scene-side-panel details { margin-top: 0; }
      .inspection-taskbar {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 6px;
        padding: 8px 11px;
        border-left: 4px solid #6eaa55;
        border-radius: 0 8px 8px 0;
        color: #344851;
        background: #edf3ea;
        font-size: .82rem;
        line-height: 1.35;
      }
      .inspection-taskbar::before {
        content: 'Objetivo';
        flex: 0 0 auto;
        color: #315a4b;
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .06em;
        text-transform: uppercase;
      }
      [data-visual-card-slot][hidden] { display: none; }
      .inspection-action-tray { margin-top: 6px; }
      .inspection-action-tray .visual-card-layer {
        position: static;
        display: grid;
        pointer-events: auto;
      }
      .inspection-action-tray .visual-hover-card {
        position: static;
        width: 100%;
        max-height: none;
        display: grid;
        grid-template-columns: minmax(170px, .55fr) minmax(190px, .8fr) minmax(280px, 1.1fr);
        align-items: center;
        gap: 14px;
        overflow: visible;
        padding: 8px 10px;
        border-color: #9eb7aa;
        border-left: 5px solid #3f775f;
        box-shadow: 0 5px 15px rgba(7, 23, 38, .09);
      }
      .inspection-action-tray .visual-hover-card[hidden] { display: none; }
      .inspection-action-tray .visual-explanation { margin: 0; }
      .inspection-action-tray .visual-card-action {
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 3px 10px;
        margin: 0;
        padding: 0 0 0 13px;
        border-top: 0;
        border-left: 1px solid #d7dedb;
      }
      .inspection-action-tray .visual-card-action p,
      .inspection-action-tray .visual-card-action small { grid-column: 1; }
      .inspection-action-tray .visual-card-action button { grid-column: 2; grid-row: 1 / 4; min-width: 150px; }
      .scene-learning-panel { min-width: 0; }
      .inspection-change-visual { width: 112px; display: grid; gap: 5px; }
      .inspection-change-vignette {
        width: 100%;
        margin: 0;
        overflow: hidden;
        border: 1px solid #a8bcae;
        border-radius: 9px;
        background: linear-gradient(180deg, #dfead9, #f7efd9);
      }
      .inspection-change-vignette svg { display: block; width: 100%; height: auto; }
      .change-ground { fill: #d8c89f; }
      .change-plant { fill: none; stroke: #527b50; stroke-width: 3; stroke-linecap: round; }
      .change-ink { fill: none; stroke: #23473b; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
      .change-fill { fill: #356b55; }
      .change-accent { fill: #d8892d; }
      .change-light { fill: #fff8df; }
      .change-tool { transform-box: fill-box; transform-origin: 12% 86%; animation: change-tool-cut 1.15s ease-in-out infinite alternate; }
      .change-animal-one { animation: change-graze 1.8s ease-in-out infinite alternate; }
      .change-animal-two { animation: change-graze 2.1s .25s ease-in-out infinite alternate-reverse; }
      .change-route-marker { animation: change-route 1.8s ease-in-out infinite; }
      .change-benefit {
        display: inline-flex;
        width: fit-content;
        margin-top: 5px;
        padding: 3px 7px;
        border-radius: 999px;
        color: #24543e;
        background: #dcebdd;
        font-size: .68rem;
        font-weight: 800;
      }
      .inspection-change-placeholder { display: none; }
      @keyframes change-tool-cut { from { transform: rotate(-8deg); } to { transform: rotate(17deg); } }
      @keyframes change-graze { from { transform: translateX(-2px) rotate(-1deg); } to { transform: translateX(6px) rotate(2deg); } }
      @keyframes change-route { 0% { transform: translateX(-18px); opacity: .25; } 45%, 70% { opacity: 1; } 100% { transform: translateX(32px); opacity: .2; } }
      .summary-dashboard { display: grid; grid-template-columns: minmax(280px, .8fr) minmax(0, 1.2fr); gap: 12px; align-items: start; }
      .summary-dashboard .prevention-review { margin: 0; }
      .summary-emergency { min-width: 0; }
      .summary-emergency .balance-heading { margin-top: 0; }

      body.gameplay-active .session-footer { display: none; }

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
        grid-template-columns: minmax(0, 1fr);
      }
      .visual-canvas {
        position: relative;
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

      .visual-scene[data-visual-template="territory"] .visual-canvas,
      .visual-scene[data-visual-template="housing"] .visual-canvas {
        min-height: 0;
        background: #e5e3cb;
        border-color: #c0c6b0;
        grid-template-rows: auto auto;
      }
      .visual-scene[data-visual-template="crisis"] .visual-canvas { min-height: 0; }
      .visual-scene[data-visual-template="crisis"] .crisis-svg {
        height: auto;
        min-height: 0;
        max-height: none;
      }
      .visual-scene[data-visual-template="territory"] .territory-map,
      .visual-scene[data-visual-template="housing"] .housing-plan {
        width: 100%;
        height: auto;
        min-height: 0;
        max-height: none;
        aspect-ratio: 9 / 5;
      }
      .territory-map-key, .housing-map-key {
        display: grid;
        gap: 6px;
        padding: 12px;
        border-top: 1px solid #cbd0b8;
        background: #faf8ef;
      }
      .territory-map-key { grid-template-columns: repeat(5, minmax(0, 1fr)); }
      .housing-map-key { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .territory-map-key-item, .housing-map-key-item {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        min-height: 48px;
        padding: 8px;
        text-align: left;
        color: #34463b;
        border: 1px solid transparent;
        border-radius: 7px;
        background: transparent;
        cursor: pointer;
      }
      .territory-map-key-item:hover, .housing-map-key-item:hover { background: #edeedd; border-color: #cbd0b8; }
      .territory-map-key-item:focus-visible, .housing-map-key-item:focus-visible { outline: 3px solid var(--focus); outline-offset: 1px; }
      .territory-key-number, .housing-key-number {
        display: grid;
        place-items: center;
        flex: 0 0 27px;
        height: 27px;
        border: 1px solid #b9a484;
        border-radius: 50%;
        color: #765837;
        background: #fffaf0;
        font-size: 13px;
        font-weight: 700;
      }
      .territory-map-key-item strong, .housing-map-key-item strong { display: block; font-size: .78rem; line-height: 1.25; }
      .territory-map-key-item small, .housing-map-key-item small { display: block; margin-top: 3px; color: #727961; font-size: .7rem; }
      .territory-map-key-item:is(.state-treated, .state-broken, .state-clear, .state-evaluated) .territory-key-number,
      .housing-map-key-item:is(.state-reduced, .state-broken, .state-clear) .housing-key-number {
        color: #fffaf0;
        border-color: #346755;
        background: #346755;
      }
      .housing-map-key-item.state-conditioned .housing-key-number {
        color: #765837;
        border-color: #b17638;
        background: #fff5df;
      }
      .territory-map-key {
        gap: 8px;
        padding: 10px;
        border-top-color: #c8d0c3;
        background: linear-gradient(180deg, #f4f5ef 0%, #e9ede5 100%);
      }
      .territory-map-key-item {
        min-height: 66px;
        padding: 10px;
        border-color: #d3d9cf;
        border-radius: 10px;
        background: rgba(255,255,255,.88);
        box-shadow: 0 2px 7px rgba(21, 50, 40, .08);
      }
      .territory-map-key-item:hover {
        border-color: #9dac9f;
        background: #fff;
        box-shadow: 0 4px 11px rgba(21, 50, 40, .12);
      }
      .territory-map-key-item.selected {
        border-color: #4f8069;
        background: #edf5ed;
        box-shadow: inset 0 0 0 1px #4f8069, 0 3px 9px rgba(21, 50, 40, .1);
      }
      .territory-map-key-item .territory-key-number {
        flex-basis: 32px;
        height: 32px;
        border-width: 2px;
        border-color: #315b49;
        color: #244c3d;
        background: #fffdf5;
        font-size: 14px;
        font-weight: 800;
      }
      .territory-key-copy { min-width: 0; }
      .territory-map-key-item strong { color: #1b3c31; font-size: .8rem; letter-spacing: -.01em; }
      .territory-map-key-item small {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        width: fit-content;
        margin-top: 5px;
        padding: 2px 7px;
        border-radius: 999px;
        color: #6c5333;
        background: #f6ead5;
        font-size: .66rem;
        font-weight: 700;
      }
      .territory-key-state-dot { width: 6px; height: 6px; border-radius: 50%; background: #bd7935; }
      .territory-map-key-item:is(.state-treated, .state-broken, .state-clear, .state-evaluated) small {
        color: #285946;
        background: #e0ede0;
      }
      .territory-map-key-item:is(.state-treated, .state-broken, .state-clear, .state-evaluated) .territory-key-state-dot { background: #3e7b5d; }
      @media (max-width: 700px) {
        .territory-map-key, .housing-map-key { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px; padding: 8px; }
        .territory-map-key-item:last-child { grid-column: 1 / -1; }
        .territory-map-key-item, .housing-map-key-item { min-height: 52px; }
        .territory-map-key { gap: 7px; }
        .territory-map-key-item { min-height: 68px; padding: 9px; }
        .visual-scene[data-visual-template="territory"] .visual-card-layer,
        .visual-scene[data-visual-template="housing"] .visual-card-layer { position: static; padding: 0 10px; }
        .visual-scene[data-visual-template="territory"] .visual-hover-card,
        .visual-scene[data-visual-template="housing"] .visual-hover-card {
          position: static;
          width: 100%;
          max-height: none;
          margin: 10px 0;
          box-shadow: 0 3px 12px rgba(5, 20, 29, .12);
        }
      }

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
      .visual-hotspot:focus-visible { outline: none; filter: brightness(1.16) drop-shadow(0 0 8px #f4b942); }
      .visual-capacity circle { fill: rgba(7, 23, 38, .82); stroke: #f0b44b; stroke-width: 4; }
      .visual-capacity text { fill: #fff; font-size: 10px; font-weight: 900; letter-spacing: .03em; }

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

      .visual-card-layer {
        position: absolute;
        inset: 0;
        z-index: 8;
        pointer-events: none;
      }
      .visual-hover-card {
        position: absolute;
        top: 16px;
        right: 16px;
        width: min(360px, calc(100% - 32px));
        max-height: calc(100% - 32px);
        overflow: auto;
        padding: 14px;
        border: 1px solid rgba(212, 222, 218, .96);
        border-radius: 11px;
        color: var(--ink);
        background: rgba(255, 255, 255, .97);
        box-shadow: 0 16px 38px rgba(5, 20, 29, .28);
        pointer-events: auto;
      }
      .visual-hover-card[hidden] { display: none; }
      .visual-hover-card.selected { border-color: #79a867; box-shadow: 0 16px 38px rgba(5, 20, 29, .24), inset 0 0 0 1px #79a867; }
      .visual-card-state {
        display: grid;
        grid-template-columns: 18px minmax(0, 1fr);
        align-items: start;
        gap: 10px;
      }
      .visual-card-state > span:last-child { display: grid; gap: 2px; }
      .visual-card-state small, .visual-dimension small, .visual-explanation { color: var(--muted); }
      .visual-explanation { margin: 9px 0 0; font-size: .8rem; line-height: 1.4; }
      .visual-card-action { display: grid; gap: 7px; margin-top: 12px; padding-top: 11px; border-top: 1px solid #d7dedb; }
      .visual-card-action > strong { font-size: .92rem; }
      .visual-card-action p { margin: 0; color: var(--muted); font-size: .79rem; line-height: 1.35; }
      .visual-card-action small { color: var(--red); }
      .visual-card-action button { justify-self: start; min-width: 120px; }
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
      .visual-dimension-state { font-size: 1.08rem; font-weight: 850; }
      .scene-main .visual-dimension-summary { gap: 7px; }
      .scene-main .visual-dimension {
        min-height: 78px;
        gap: 8px;
        padding: 9px;
      }
      .scene-main .visual-dimension-state { font-size: .95rem; }
      .scene-main .visual-dimension small { font-size: .68rem; line-height: 1.25; }

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
      .primary {
        border: 1px solid #8f4300;
        color: #fff;
        background: var(--primary-action);
        box-shadow: 0 6px 16px rgba(169, 80, 0, .2);
      }
      .secondary { border: 1px solid #9aa7a2; color: #263941; background: #eef2ef; }
      button:disabled { cursor: not-allowed; opacity: .52; }
      .footer-actions { display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
      .feedback { margin-top: 14px; padding: 12px 14px; border: 1px solid #a9c9b6; border-radius: 8px; color: #234336; background: #edf7f0; }
      .decision-feedback {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        gap: 4px 12px;
        margin-top: 10px;
        border-left: 5px solid #3f775f;
      }
      .decision-feedback strong { white-space: nowrap; }
      .decision-feedback p { margin: 0; font-size: .88rem; }
      .selection-counter .selection-remaining { display: block; margin-top: 3px; color: var(--muted); font-size: .72rem; }
      .inspection-response {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(260px, .8fr);
        gap: 10px;
        margin-top: 14px;
      }
      .inspection-confirmation, .inspection-selection {
        min-width: 0;
        padding: 13px 14px;
        border: 1px solid #c6d0cb;
        border-radius: 9px;
        background: #f5f7f4;
      }
      .inspection-confirmation { color: #29483a; border-color: #9fc4ad; background: #edf7f0; }
      .inspection-confirmation p { margin: 4px 0 0; font-size: .86rem; }
      .inspection-confirmation.has-change {
        display: grid;
        grid-template-columns: 112px minmax(0, 1fr);
        align-items: center;
        gap: 10px;
      }
      .inspection-confirmation-copy { min-width: 0; }
      .inspection-confirmation.is-empty { color: #5b6b64; border-color: #cbd3d0; background: #f5f7f4; }
      .inspection-selection { display: grid; align-content: start; gap: 7px; }
      .inspection-selection > strong, .prevention-area h3 { font-size: .88rem; }
      .selected-action-list { display: flex; flex-wrap: wrap; gap: 6px; }
      .selected-action-chip { padding: 5px 8px; border: 1px solid #9cc0aa; border-radius: 999px; color: #24543e; background: #e8f2ea; font-size: .72rem; font-weight: 750; }
      .selection-empty, .inspection-selection small { color: var(--muted); font-size: .76rem; }
      .prevention-review { margin: 18px 0; }
      .prevention-review-intro { margin-bottom: 10px; color: #53666f; font-size: .84rem; }
      .prevention-area-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .prevention-area { padding: 14px; border: 1px solid #c8d0cd; border-radius: 9px; background: #fff; }
      .prevention-area h3 { margin-bottom: 12px; color: #29483a; }
      .prevention-area-section + .prevention-area-section { margin-top: 13px; padding-top: 12px; border-top: 1px solid #dde3df; }
      .prevention-area-section > strong { display: block; margin-bottom: 6px; color: #52636b; font-size: .7rem; letter-spacing: .06em; text-transform: uppercase; }
      .prevention-area ul { display: grid; gap: 6px; margin: 0; padding-left: 18px; }
      .prevention-area li { color: #344851; font-size: .82rem; line-height: 1.35; }
      .prevention-area li small { display: block; margin-top: 2px; color: var(--muted); }
      .prevention-area .applied-list li::marker { color: var(--green); }
      .prevention-area .pending-list li::marker { color: var(--orange); }
      .balance-caution { margin: 12px 0 16px; padding: 11px 13px; border-left: 4px solid var(--orange); color: #55483a; background: #fff7e8; font-size: .83rem; }
      .balance-heading { margin: 20px 0 8px; font-size: 1rem; }
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
      .relation.decisive { border-left: 4px solid var(--primary-action); }
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
      .session-footer[hidden] { display: none; }
      .footer-cell { min-width: 0; padding: 13px 16px; background: #edf1ef; }
      .footer-cell strong { display: block; margin-bottom: 5px; font-size: .78rem; text-transform: uppercase; letter-spacing: .05em; color: #243944; }
      .footer-cell p { margin: 0; color: #5b6c74; font-size: .8rem; line-height: 1.4; }
      .decision-history { margin: 0; padding-left: 18px; color: #5b6c74; font-size: .78rem; }
      .progress-line { height: 6px; margin-top: 8px; overflow: hidden; border-radius: 999px; background: #d4dbd8; }
      .progress-line span { display: block; height: 100%; background: linear-gradient(90deg, #5b9d3f, var(--primary-action)); transition: width .2s ease; }
      .meta-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .chip { padding: 5px 8px; border: 1px solid #c5ceca; border-radius: 999px; color: #53656e; background: #f8faf9; font-size: .7rem; }
      .chip.accent { color: #24543e; border-color: #9cc0aa; background: #e8f2ea; }
      details { margin-top: 14px; }
      summary { cursor: pointer; color: #3d606b; }

      @media (min-width: 1051px) {
        main { padding-top: 4px; padding-bottom: 0; }
        .inspection-scene .scene-workspace {
          grid-template-columns: minmax(0, 1fr) minmax(220px, 248px);
          grid-template-areas:
            "main controls"
            "learning controls";
          align-items: stretch;
        }
        .inspection-scene .scene-main { grid-area: main; }
        .inspection-scene .scene-side-panel { grid-area: controls; }
        .inspection-scene .scene-learning-panel { grid-area: learning; }
        .inspection-scene .scene-side-panel {
          top: 84px;
          max-height: none;
          overflow: visible;
          height: 100%;
          padding: 10px;
          gap: 7px;
          background: linear-gradient(180deg, #f8faf7, #edf3ee);
          box-shadow: 0 7px 20px rgba(7, 23, 38, .09);
        }
        .inspection-scene .scene-side-header { padding-bottom: 6px; }
        .inspection-scene .scene-side-panel .selection-counter { padding: 7px 9px; }
        .inspection-scene .scene-side-panel .visual-hint { padding: 0 2px; }
        .inspection-scene .scene-side-panel .territory-map-key,
        .inspection-scene .scene-side-panel .housing-map-key { grid-template-columns: 1fr; gap: 5px; }
        .inspection-scene .scene-side-panel .territory-map-key-item,
        .inspection-scene .scene-side-panel .housing-map-key-item { min-height: 56px; padding: 6px 7px; }
        .inspection-scene .scene-side-panel .territory-map-key-item:last-child { grid-column: auto; }
        .inspection-scene .scene-side-panel .territory-map-key-item small,
        .inspection-scene .scene-side-panel .housing-map-key-item small { margin-top: 2px; padding-block: 1px; }
        .inspection-scene .inspection-response {
          grid-template-columns: minmax(260px, .72fr) minmax(0, 1.28fr);
          gap: 8px;
          margin-top: 6px;
        }
        .inspection-scene .inspection-confirmation,
        .inspection-scene .inspection-selection { padding: 8px 10px; }
        .inspection-scene .inspection-confirmation {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          align-items: center;
          gap: 8px;
        }
        .inspection-scene .inspection-confirmation strong { white-space: nowrap; }
        .inspection-scene .inspection-confirmation p { margin: 0; line-height: 1.3; }
        .inspection-scene .inspection-selection {
          grid-template-columns: auto minmax(0, 1fr);
          align-items: center;
          gap: 5px 8px;
        }
        .inspection-scene .inspection-selection > strong { white-space: nowrap; }
        .inspection-scene .inspection-selection small { grid-column: 2; grid-row: 1; text-align: right; }
        .inspection-scene .inspection-selection .selected-action-list,
        .inspection-scene .inspection-selection .selection-empty { grid-column: 1 / -1; }
        .inspection-scene .scene-workspace:has(.inspection-action-tray .visual-hover-card:not([hidden])) .inspection-response {
          grid-template-columns: 1fr;
        }
        .inspection-scene .scene-workspace:has(.inspection-action-tray .visual-hover-card:not([hidden])) .inspection-confirmation {
          display: none;
        }
        .scene-with-side-panel .scene-heading { margin-bottom: 0; }
        .scene-with-side-panel .scene-heading-copy {
          max-width: none;
          display: grid;
          grid-template-columns: minmax(300px, .8fr) minmax(360px, 1.2fr);
          grid-template-rows: auto auto;
          column-gap: 24px;
          align-items: end;
        }
        .scene-with-side-panel .scene-heading-copy .eyebrow { grid-column: 1; grid-row: 1; margin-bottom: 2px; }
        .scene-with-side-panel .scene-heading-copy h2 {
          grid-column: 1;
          grid-row: 2;
          margin-bottom: 0;
          font-size: clamp(1.55rem, 2.2vw, 2.15rem);
        }
        .scene-with-side-panel .scene-heading-copy .lead {
          grid-column: 2;
          grid-row: 1 / 3;
          align-self: center;
          font-size: .92rem;
          line-height: 1.4;
        }
        .prevention-review-intro { margin-bottom: 7px; }
        .prevention-area { padding: 10px; }
        .prevention-area h3 { margin-bottom: 8px; }
        .prevention-area-section + .prevention-area-section { margin-top: 9px; padding-top: 8px; }
        .prevention-area ul { gap: 4px; }
      }

      @media (min-width: 1600px) {
        main { width: min(1740px, 100%); }
        .scene:not(.inspection-scene), .entry { width: 100%; max-width: 1480px; margin-inline: auto; }
        .inspection-scene .scene-workspace {
          grid-template-columns: minmax(0, 1fr) 248px 310px;
          grid-template-areas: "main controls learning";
        }
        .inspection-scene .scene-learning-panel {
          min-height: 100%;
          padding: 10px;
          border: 1px solid #bac6c1;
          border-radius: 12px;
          background: linear-gradient(180deg, #edf5ee, #f8f4e8);
          box-shadow: 0 7px 20px rgba(7, 23, 38, .08);
        }
        .inspection-scene .scene-learning-panel .inspection-response {
          height: 100%;
          grid-template-columns: 1fr;
          align-content: start;
          gap: 8px;
          margin: 0;
        }
        .inspection-scene .scene-learning-panel .inspection-confirmation,
        .inspection-scene .scene-learning-panel .inspection-selection { padding: 10px; }
        .inspection-scene .scene-learning-panel .inspection-confirmation {
          grid-template-columns: 1fr;
          align-content: start;
        }
        .inspection-scene .scene-learning-panel .inspection-change-visual { width: 100%; }
        .inspection-scene .scene-learning-panel .inspection-change-placeholder {
          display: grid;
          gap: 8px;
          margin-bottom: 4px;
          padding: 12px;
          border: 1px solid #c3d1c7;
          border-radius: 9px;
          color: #315a4b;
          background: rgba(255, 255, 255, .7);
          font-size: .76rem;
          font-weight: 800;
        }
        .inspection-change-placeholder svg { display: block; width: 100%; height: auto; }
      }

      @media (max-width: 1050px) {
        .topbar { grid-template-columns: 1fr auto; }
        .journey { grid-column: 1 / -1; grid-row: 2; }
        .topbar-actions { grid-column: 2; grid-row: 1; }
        .entry { grid-template-columns: 1fr; }
        .entry-visual { min-height: 280px; }
        .visual-scene[data-visual-template="territory"],
        .visual-scene[data-visual-template="housing"],
        .visual-scene[data-visual-template="crisis"],
        .result-layout { grid-template-columns: 1fr; }
        .session-footer { display: none; }
        .scene-workspace { grid-template-columns: 1fr; }
        .summary-dashboard { grid-template-columns: 1fr; }
        .scene-side-trigger { display: flex; }
        .scene-side-panel {
          position: fixed;
          inset: auto 0 0 0;
          z-index: 60;
          width: 100%;
          height: auto;
          max-height: min(72dvh, 620px);
          border: 0;
          border-top: 1px solid #aebbb5;
          border-radius: 18px 18px 0 0;
          visibility: hidden;
          transform: translateY(104%);
          transition: transform .22s ease, visibility .22s linear;
        }
        .scene-side-panel.is-open { visibility: visible; transform: translateY(0); }
        .scene-side-close { display: inline-grid; place-items: center; }
        .scene-side-backdrop {
          position: fixed;
          inset: 0;
          z-index: 55;
          display: block;
          border: 0;
          background: rgba(4, 16, 24, .56);
          cursor: pointer;
        }
        .scene-side-backdrop[hidden] { display: none; }
        body.scene-side-locked { overflow: hidden; }
      }

      @media (max-width: 700px) {
        .topbar { position: static; min-height: 0; grid-template-columns: 1fr auto; gap: 12px; padding: 11px 12px; }
        .brand-copy small { display: none; }
        .journey { gap: 4px; align-items: start; }
        .stage {
          grid-template-columns: 1fr;
          grid-template-rows: 28px auto;
          justify-items: center;
          gap: 4px;
          text-align: center;
        }
        .stage-dot { width: 28px; height: 28px; }
        .stage:not(:last-child)::after {
          top: 13px;
          left: calc(50% + 18px);
          right: calc(-50% + 18px);
        }
        .stage-label {
          justify-self: center;
          padding: 2px 4px;
          overflow: visible;
          text-overflow: clip;
          white-space: normal;
          font-size: .68rem;
          line-height: 1.05;
        }
        main { padding: 10px 8px; }
        .entry { min-height: auto; border-radius: 10px; }
        .entry-copy { padding: 24px 18px; }
        .entry-copy h1 { font-size: clamp(2.25rem, 12vw, 3.5rem); }
        .entry-visual { min-height: 220px; padding: 16px; }
        .scene { min-height: auto; border-radius: 10px; }
        .scene-content { padding: 12px; }
        .scene-heading { grid-template-columns: 1fr; gap: 7px; margin-bottom: 8px; }
        .scene-heading h2 { font-size: clamp(1.45rem, 7vw, 1.9rem); }
        .scene-heading .lead { font-size: .88rem; line-height: 1.35; }
        .selection-counter, .scene-state-badge { width: 100%; min-width: 0; display: flex; justify-content: space-between; align-items: center; text-align: left; }
        .selection-counter strong, .scene-state-badge strong { font-size: 1.05rem; }
        .visual-canvas, .territory-svg { min-height: 300px; }
        .visual-dimension-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .actions { grid-template-columns: 1fr; }
        .inspection-response, .prevention-area-grid { grid-template-columns: 1fr; }
        .visual-hover-card { width: min(320px, calc(100% - 20px)); max-height: calc(100% - 20px); }
        .scene-side-panel .visual-hover-card { width: 100%; max-height: none; }
        .scene-side-panel .territory-map-key,
        .scene-side-panel .housing-map-key { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .scene-side-panel .territory-map-key-item:last-child { grid-column: 1 / -1; }
        .inspection-taskbar { align-items: flex-start; flex-direction: column; gap: 2px; }
        .inspection-action-tray .visual-hover-card { grid-template-columns: 1fr; gap: 7px; padding: 10px; }
        .inspection-action-tray .visual-card-action {
          grid-template-columns: 1fr;
          padding: 8px 0 0;
          border-top: 1px solid #d7dedb;
          border-left: 0;
        }
        .inspection-action-tray .visual-card-action button { grid-column: 1; grid-row: auto; width: 100%; }
        .inspection-confirmation.has-change { grid-template-columns: 96px minmax(0, 1fr); }
        .inspection-change-visual { width: 96px; }
        .decision-feedback { grid-template-columns: 1fr; }
        .summary-dashboard { grid-template-columns: 1fr; }
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
          <div class="brand-copy"><strong>Apaga las llamas</strong><small>Prepara hoy, protege mañana</small></div>
        </div>
        <nav class="journey" aria-label="Progreso de la partida">
          <div class="stage" data-stage-id="territory"><span class="stage-dot">1</span><span class="stage-label">Monte</span></div>
          <div class="stage" data-stage-id="housing"><span class="stage-dot">2</span><span class="stage-label">Casa</span></div>
          <div class="stage" data-stage-id="crisis"><span class="stage-dot">3</span><span class="stage-label">Incendio</span></div>
          <div class="stage" data-stage-id="result"><span class="stage-dot">4</span><span class="stage-label">Final</span></div>
        </nav>
        <div class="topbar-actions"><button class="ghost-button" id="restart-button" type="button" disabled>↻ Reiniciar</button></div>
      </header>

      <main>
        <div id="game" aria-live="polite">
          <section class="entry" aria-labelledby="entry-title">
            <div class="entry-copy">
              <p class="eyebrow">Juego educativo</p>
              <h1 id="entry-title">Prepara el monte antes de que llegue el fuego</h1>
              <p class="lead">Cuida las fincas, los caminos y una casa junto al monte. Después verás cómo tus decisiones ayudan —o dificultan— el trabajo de los bomberos.</p>
              <div class="entry-meta" aria-label="Información de la partida">
                <span>Historia guiada</span>
                <span id="entry-duration">Duración orientativa</span>
              </div>
              <div class="entry-actions"><button class="primary" id="start-session-button" type="button">Comenzar partida</button></div>
              <p class="entry-note">El juego te explicará cada paso antes de que elijas.</p>
            </div>
            <div class="entry-visual" role="img" aria-label="Monte, barranco y casas del juego">
              <div class="entry-visual-card"><strong>Lo que haces antes importa.</strong><p>Prepara el lugar y descubre qué cambia cuando empieza el incendio.</p></div>
            </div>
          </section>
        </div>
        <div id="notice" role="alert"></div>
      </main>

      <footer class="session-footer" id="session-footer" hidden aria-label="Resumen de la partida">
        <div class="footer-cell"><strong>¿Por qué importa?</strong><p>Un monte cuidado y unos caminos libres dan más opciones a los bomberos.</p></div>
        <div class="footer-cell"><strong>Tu partida</strong><p id="progress-copy">0 pasos completados</p><div class="progress-line" role="progressbar" aria-label="Progreso de la partida" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span id="progress-bar" style="width:0%"></span></div><div class="meta-row"><span class="chip accent" id="scene-type">Misión</span><span class="chip" id="branch-chip">Historia sin decidir</span><span class="chip" id="session-status">Partida activa</span></div></div>
        <div class="footer-cell"><strong>Lo último que elegiste</strong><ol class="decision-history" id="decision-history"><li>Aún no has elegido nada.</li></ol></div>
      </footer>
    </div>

    <script>
      let currentView = null;
      let sessionId = null;
      let busy = false;
      let visualHoverReady = true;
      let visualHoverTimer = null;

      const game = document.getElementById('game');
      const notice = document.getElementById('notice');
      const startButton = document.getElementById('start-session-button');
      const restartButton = document.getElementById('restart-button');
      const sessionFooter = document.getElementById('session-footer');
      const entryDuration = document.getElementById('entry-duration');

      function escapeHtml(value) {
        return String(value)
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#039;');
      }

      function setSessionChrome(active) {
        restartButton.disabled = !active;
        sessionFooter.hidden = !active;
      }

      async function request(path, options) {
        if (busy) return false;
        notice.textContent = '';
        busy = true;
        try {
          const response = await fetch(path, { headers: { 'content-type': 'application/json' }, ...options });
          const payload = await response.json();
          if (!response.ok) throw new Error(requestErrorMessage(payload, response.status));
          currentView = payload;
          sessionId = payload.session.id;
          setSessionChrome(true);
          render();
          return true;
        } catch (error) {
          notice.textContent = error instanceof Error ? error.message : 'Ha ocurrido un problema. Inténtalo otra vez.';
          return false;
        } finally {
          busy = false;
        }
      }

      async function hydrateEntryContext() {
        if (!entryDuration) return;
        try {
          const response = await fetch('/api/vertical-beta/context');
          if (!response.ok) return;
          const context = await response.json();
          const target = context.targetDurationMinutes;
          if (target && Number.isInteger(target.min) && Number.isInteger(target.max)) {
            entryDuration.textContent = 'Duración estimada: ' + target.min + '–' + target.max + ' min';
          }
        } catch {
          entryDuration.textContent = 'Duración orientativa';
        }
      }

      function focusCurrentSceneHeading() {
        const heading = game.querySelector('h1, h2');
        if (!heading) return;
        heading.setAttribute('tabindex', '-1');
        heading.focus();
      }

      async function startSession() {
        if (busy || sessionId !== null) return;
        if (!startButton) return;
        startButton.disabled = true;
        startButton.textContent = 'Preparando partida…';
        const created = await request('/api/game-sessions', { method: 'POST', body: '{}' });
        if (created) {
          focusCurrentSceneHeading();
          return;
        }
        if (!created && sessionId === null) {
          startButton.disabled = false;
          startButton.textContent = 'Comenzar partida';
        }
      }

      function visualMarkup() {
        return currentView && currentView.visualMarkup ? currentView.visualMarkup : '';
      }

      function hydrateVisualActionCards(scene) {
        const actions = Array.isArray(scene.actions) ? scene.actions : [];
        document.querySelectorAll('[data-visual-action-card-id]').forEach(function (card) {
          const action = actions.find(function (candidate) { return candidate.id === card.dataset.visualActionCardId; });
          if (!action) return;
          const label = card.querySelector('[data-visual-action-label]');
          const description = card.querySelector('[data-visual-action-description]');
          const reason = card.querySelector('[data-visual-action-reason]');
          const button = card.querySelector('.action-button');
          if (label) label.textContent = action.label;
          if (description) description.textContent = action.description;
          if (reason) {
            reason.textContent = action.unavailableReason || '';
            reason.hidden = !action.unavailableReason;
          }
          card.classList.toggle('selected', Boolean(action.selected));
          if (button) {
            button.disabled = !action.available;
            button.textContent = action.selected ? 'Mejora hecha' : 'Hacer esta mejora';
          }
        });
      }

      function actionCards(scene) {
        return '<div class="actions">' + scene.actions.map(function (action) {
          const selected = action.selected ? ' selected' : '';
          const disabled = !action.available ? ' disabled' : '';
          const label = action.selected ? 'Mejora hecha' : 'Elegir';
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

      function sceneWorkspace(mainMarkup, panelLabel, panelIntro, panelBody, triggerLabel, learningMarkup) {
        return '<button class="scene-side-trigger" type="button" aria-controls="scene-side-panel" aria-expanded="false">' + escapeHtml(triggerLabel) + '</button>' +
          '<div class="scene-workspace"><div class="scene-main">' + mainMarkup + '</div>' +
          '<aside class="scene-side-panel" id="scene-side-panel" aria-label="' + escapeHtml(panelLabel) + '" aria-hidden="false">' +
            '<div class="scene-side-header"><h3>' + escapeHtml(panelLabel) + '</h3><button class="scene-side-close" type="button" aria-label="Cerrar panel">Cerrar</button></div>' +
            panelIntro + '<div data-visual-menu-slot hidden></div>' + panelBody +
          '</aside>' + (learningMarkup ? '<aside class="scene-learning-panel" aria-label="Cambios y aprendizaje">' + learningMarkup + '</aside>' : '') +
          '<button class="scene-side-backdrop" type="button" aria-label="Cerrar panel de opciones" hidden></button></div>';
      }

      function requestErrorMessage(payload, status) {
        const code = payload && typeof payload.code === 'string' ? payload.code : '';
        if (code === 'inspection-quota-incomplete') return 'Elige todas las mejoras disponibles antes de continuar.';
        if (code === 'inspection-quota-reached') return 'Ya has elegido todas las mejoras permitidas en esta zona.';
        if (code === 'session-not-found') return 'La partida ya no está disponible. Reiníciala para continuar.';
        return status >= 500
          ? 'No se pudo completar la operación. Inténtalo de nuevo en unos instantes.'
          : 'No se pudo completar esta operación. Revisa la selección e inténtalo de nuevo.';
      }

      function inspectionChangeVisual(scene) {
        const decisions = currentView.session.decisionReview.filter(function (decision) {
          return scene.actions.some(function (action) { return action.id === decision.actionId; });
        });
        const lastDecision = decisions.length > 0 ? decisions[decisions.length - 1] : null;
        if (!scene.feedback || !lastDecision) return '';
        const actionId = lastDecision.actionId;
        const kindByAction = {
          'gestionar-restos-poda': 'pruning',
          'podar-ramas-y-retirar-seco': 'pruning',
          'crear-discontinuidades-vegetales': 'separation',
          'separar-copas': 'separation',
          'limpiar-margenes-caminos': 'access',
          'despejar-accesos': 'access',
          'activar-pastoreo-preventivo': 'grazing',
          'evaluar-quema-tecnica': 'assessment'
        };
        const benefitByAction = {
          'gestionar-restos-poda': 'Menos ramas secas que puedan arder',
          'podar-ramas-y-retirar-seco': 'Al fuego le cuesta más subir',
          'crear-discontinuidades-vegetales': 'El fuego encuentra un corte',
          'separar-copas': 'El fuego salta peor entre árboles',
          'limpiar-margenes-caminos': 'Entrada y salida más fáciles',
          'despejar-accesos': 'Más espacio para los bomberos',
          'activar-pastoreo-preventivo': 'Queda menos hierba seca',
          'evaluar-quema-tecnica': 'Más información para decidir'
        };
        const artByKind = {
          pruning: '<svg viewBox="0 0 180 96" aria-hidden="true" focusable="false"><path class="change-ground" d="M0 67H180V96H0z"/><path class="change-plant" d="M18 70V42m0 13-10-8m10 2 11-10M43 70V51m0 8-8-5"/><g class="change-worker"><circle class="change-accent" cx="91" cy="25" r="9"/><path class="change-fill" d="M81 37h20l7 30H75z"/><path class="change-ink" d="M84 47 65 60m16-6 19 13M82 67 75 86m22-19 9 19"/></g><g class="change-tool"><path class="change-ink" d="M64 56 45 74m5-23 14 5"/><circle class="change-light" cx="63" cy="56" r="4"/></g><path class="change-ink" d="M123 70h39m-34-9 13 9-12 10"/></svg>',
          grazing: '<svg viewBox="0 0 180 96" aria-hidden="true" focusable="false"><path class="change-ground" d="M0 68H180V96H0z"/><path class="change-plant" d="M12 75v-18m0 8-7-8m7 4 7-9m20 23V59m0 7-6-7m6 3 7-8m113 21V56m0 8-7-8"/><g class="change-animal-one"><ellipse class="change-light" cx="75" cy="55" rx="23" ry="15"/><circle class="change-fill" cx="101" cy="57" r="10"/><path class="change-ink" d="M61 66v18m19-18v18m27-19 6 9m-17-24 7-7"/></g><g class="change-animal-two"><ellipse class="change-light" cx="129" cy="36" rx="18" ry="12"/><circle class="change-fill" cx="149" cy="39" r="8"/><path class="change-ink" d="M119 45v14m15-14v14m19-15 5 7"/></g></svg>',
          separation: '<svg viewBox="0 0 180 96" aria-hidden="true" focusable="false"><path class="change-ground" d="M0 75H180V96H0z"/><path class="change-ink" d="M46 73V42m88 31V42"/><circle class="change-fill" cx="42" cy="32" r="25"/><circle class="change-fill" cx="138" cy="32" r="25"/><path class="change-ink change-route-marker" d="M76 36h28m-22-7-7 7 7 7m16-14 7 7-7 7"/></svg>',
          access: '<svg viewBox="0 0 180 96" aria-hidden="true" focusable="false"><path class="change-ground" d="M0 0H180V96H0z"/><path d="M-5 82 185 22" fill="none" stroke="#fff8df" stroke-width="25"/><path d="M-5 82 185 22" fill="none" stroke="#567a65" stroke-width="3" stroke-dasharray="10 7"/><g class="change-route-marker"><rect class="change-accent" x="67" y="43" width="31" height="16" rx="4"/><path class="change-fill" d="M74 43h16l-4-9h-9z"/><circle class="change-ink" cx="75" cy="61" r="4"/><circle class="change-ink" cx="92" cy="61" r="4"/></g></svg>',
          assessment: '<svg viewBox="0 0 180 96" aria-hidden="true" focusable="false"><path class="change-ground" d="M0 72H180V96H0z"/><circle class="change-accent" cx="62" cy="25" r="9"/><path class="change-fill" d="M52 37h20l7 34H45z"/><path class="change-ink" d="M54 69 49 87m20-18 8 18m-1-39 20 6"/><rect class="change-light" x="94" y="33" width="37" height="47" rx="4"/><path class="change-ink" d="M103 47h19m-19 10h19m-19 10h11"/><path d="m139 57 8 8 18-22" fill="none" stroke="#4f9139" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        };
        const kind = kindByAction[actionId] || 'assessment';
        const benefit = benefitByAction[actionId] || 'Mejores condiciones para actuar';
        return '<div class="inspection-change-visual"><figure class="inspection-change-vignette change-' + escapeHtml(kind) + '" role="img" aria-label="Ilustración del cambio: ' + escapeHtml(benefit) + '" data-change-action-id="' + escapeHtml(actionId) + '">' + artByKind[kind] + '</figure>' +
          '<span class="change-benefit">' + escapeHtml(benefit) + '</span></div>';
      }

      function inspectionResponse(scene) {
        const selected = scene.actions.filter(function (action) { return action.selected; });
        const remaining = Math.max(0, scene.actionQuota - scene.selectedCount);
        const selectedMarkup = selected.length === 0
          ? '<span class="selection-empty">Aún no has elegido ninguna mejora.</span>'
          : '<div class="selected-action-list">' + selected.map(function (action) {
              return '<span class="selected-action-chip">' + escapeHtml(action.label) + '</span>';
            }).join('') + '</div>';
        const remainingLabel = remaining === 0
          ? 'Ya has elegido todas las mejoras de esta zona.'
          : 'Puedes elegir ' + remaining + ' mejora' + (remaining === 1 ? '' : 's') + ' más.';
        const confirmation = scene.feedback
          ? '<div class="inspection-confirmation has-change">' + inspectionChangeVisual(scene) + '<div class="inspection-confirmation-copy"><strong>Cambio realizado</strong><p>' + escapeHtml(scene.feedback) + '</p></div></div>'
          : '<div class="inspection-confirmation is-empty"><div class="inspection-change-placeholder" aria-hidden="true"><svg viewBox="0 0 240 72"><circle cx="28" cy="36" r="17" fill="#fffaf0" stroke="#315a4b" stroke-width="3"/><text x="28" y="42" text-anchor="middle" fill="#315a4b" font-size="18" font-weight="800">1</text><path d="M51 36h35" fill="none" stroke="#70947d" stroke-width="4" stroke-linecap="round"/><path d="m78 28 10 8-10 8" fill="none" stroke="#70947d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="99" y="18" width="58" height="36" rx="8" fill="#fff" stroke="#315a4b" stroke-width="3"/><path d="M114 31h28m-28 10h20" stroke="#70947d" stroke-width="3" stroke-linecap="round"/><path d="M169 36h31" fill="none" stroke="#70947d" stroke-width="4" stroke-linecap="round"/><path d="m193 28 10 8-10 8" fill="none" stroke="#70947d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="222" cy="36" r="17" fill="#e4f0df" stroke="#4f9139" stroke-width="3"/><path d="m213 36 6 6 12-14" fill="none" stroke="#4f9139" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg><span>1. Elige · 2. Actúa · 3. Mira el cambio</span></div><div class="inspection-confirmation-copy"><strong>Mira y elige</strong><p>Toca un punto del mapa para saber qué ocurre allí y qué puedes mejorar.</p></div></div>';
        return '<section class="inspection-response" role="status" aria-live="polite" aria-atomic="true">' + confirmation +
          '<div class="inspection-selection"><strong>Mejoras elegidas</strong>' + selectedMarkup + '<small>' + remainingLabel + '</small></div></section>';
      }

      function preventionAreaReview(scene) {
        return '<section class="prevention-review" aria-label="Mejoras hechas y tareas pendientes por zona">' +
          '<p class="prevention-review-intro">Estas son tus mejoras y las cosas que quedaron sin hacer.</p>' +
          '<div class="prevention-area-grid">' + scene.preventionAreas.map(function (area) {
            const applied = '<div class="prevention-area-section"><strong>Mejoras hechas</strong><ul class="applied-list">' + area.selectedActions.map(function (action) {
              return '<li>' + escapeHtml(action.label) + '</li>';
            }).join('') + '</ul></div>';
            const pending = '<div class="prevention-area-section"><strong>Cosas pendientes</strong><ul class="pending-list">' + area.pendingConditions.map(function (condition) {
              return '<li><b>' + escapeHtml(condition.label) + '</b><small>' + escapeHtml(condition.consequence) + '</small></li>';
            }).join('') + '</ul></div>';
            return '<article class="prevention-area" data-prevention-area="' + escapeHtml(area.sceneId) + '"><h3>' + escapeHtml(area.label) + '</h3>' + applied + pending + '</article>';
          }).join('') + '</div></section>';
      }

      function renderBriefing(scene) {
        return '<section class="scene briefing"><div class="scene-heading-copy"><p class="eyebrow">Tu misión</p><h1>' + escapeHtml(scene.title) + '</h1><p class="lead">' + escapeHtml(scene.mission) + '</p>' + advanceButton(scene) + '</div></section>';
      }

      function renderInspection(scene) {
        const remaining = Math.max(0, scene.actionQuota - scene.selectedCount);
        const badge = '<div class="selection-counter"><small>Mejoras elegidas</small><strong>' + scene.selectedCount + ' / ' + scene.actionQuota + '</strong><span class="selection-remaining">' + (remaining === 0 ? 'Ya elegiste todas' : 'Puedes elegir ' + remaining + ' más') + '</span></div>';
        const intro = badge + '<p class="visual-hint">Elige un punto en el mapa o en esta lista.</p>';
        const main = '<div class="inspection-taskbar">' + escapeHtml(scene.objective) + '</div>' + visualMarkup() +
          '<div class="inspection-action-tray" data-visual-card-slot hidden></div>';
        return '<section class="scene scene-with-side-panel inspection-scene"><div class="scene-content">' + heading(scene, 'Prepara la zona', '') +
          sceneWorkspace(main, 'Puntos y mejoras', intro, advanceButton(scene), 'Ver puntos y mejoras', inspectionResponse(scene)) + '</div></section>';
      }

      function renderSummary(scene) {
        const main = '<div class="summary-dashboard">' + preventionAreaReview(scene) +
          '<div class="summary-emergency"><h3 class="balance-heading">Así empieza la emergencia</h3>' + visualMarkup() + '</div></div>';
        const intro = '<div class="objective"><strong>Qué ocurre ahora:</strong> lo que hiciste antes cambia las opciones de los bomberos.</div>' +
          '<div class="balance-caution"><strong>Importante:</strong> las mejoras reducen el peligro, pero ninguna casa queda totalmente segura.</div>';
        return '<section class="scene scene-with-side-panel"><div class="scene-content">' + heading(scene, 'Tus mejoras', '') +
          sceneWorkspace(main, 'Balance preventivo', intro, advanceButton(scene), 'Ver balance y continuar') + '</div></section>';
      }

      function renderDecision(scene) {
        const branch = currentView.session.branch;
        const badge = branch ? '<div class="scene-state-badge ' + escapeHtml(branch) + '"><small>Situación</small><strong>' + (branch === 'prepared' ? 'Más opciones' : 'Pocas opciones') + '</strong></div>' : '';
        const intro = badge + '<div class="objective">' + escapeHtml(scene.context) + '</div>';
        const main = visualMarkup() + (scene.feedback
          ? '<div class="feedback decision-feedback" role="status" aria-live="polite"><strong>Esto ocurre</strong><p>' + escapeHtml(scene.feedback) + '</p></div>'
          : '');
        const response = actionCards(scene) + advanceButton(scene);
        return '<section class="scene scene-with-side-panel"><div class="scene-content">' + heading(scene, 'Decide qué hacer' + (scene.difficulty ? ' · ' + scene.difficulty : ''), '') +
          sceneWorkspace(main, 'Elige qué hacer', intro, response, 'Ver opciones de respuesta') + '</div></section>';
      }

      function renderRouter(scene) {
        return '<section class="scene scene-with-side-panel"><div class="scene-content"><div class="router-mark" aria-hidden="true">↝</div>' + heading(scene, 'El juego comprueba tus decisiones', '') +
          sceneWorkspace(visualMarkup(), 'Siguiente paso', '', advanceButton(scene), 'Ver siguiente paso') + '</div></section>';
      }

      function renderResult(scene) {
        const badge = '<div class="scene-state-badge ' + (scene.variant === 'contained' ? 'prepared' : 'vulnerable') + '"><small>Resultado</small><strong>' + (scene.variant === 'contained' ? 'Controlado' : 'Demasiado fuerte') + '</strong></div>';
        const relations = '<div><p class="eyebrow">Por qué ocurrió</p><div class="relations" aria-label="Cómo influyeron tus decisiones">' + scene.relations.map(function (relation) {
          return '<article class="relation' + (relation.branchDecisive ? ' decisive' : '') + '"><h3>' + escapeHtml(relation.title) + '</h3>' +
            '<div class="cause-list">Antes del incendio → ' + relation.causeActionLabels.map(escapeHtml).join(' · ') + '</div>' +
            '<p>' + escapeHtml(relation.effect) + '</p></article>';
        }).join('') + '</div></div>';
        const main = '<div class="result-layout"><div><p class="eyebrow">Así empezó la emergencia</p>' + visualMarkup() + '</div>' + relations + '</div>';
        const intro = badge + '<div class="feedback">' + escapeHtml(scene.closing) + '</div>';
        const review = '<details><summary>Ver las mejoras que elegí</summary><ul>' + currentView.session.preventionReview.map(function (entry) { return '<li>' + escapeHtml(entry.label) + '</li>'; }).join('') + '</ul></details>' + advanceButton(scene);
        return '<section class="scene scene-with-side-panel result-' + escapeHtml(scene.variant) + '"><div class="scene-content">' + heading(scene, 'Resultado de tus decisiones', '') +
          sceneWorkspace(main, 'Tu resultado', intro, review, 'Ver resultado y opciones') + '</div></section>';
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
        inspection: 'Preparación',
        summary: 'Tus mejoras',
        decision: 'Emergencia',
        router: 'Comprobación',
        result: 'Final'
      };

      const BRANCH_LABELS = {
        prepared: 'con más opciones',
        vulnerable: 'con pocas opciones'
      };

      const STAGE_BY_VISUAL_TEMPLATE = {
        briefing: 1,
        territory: 1,
        housing: 2,
        summary: 2,
        crisis: 3,
        result: 4
      };

      let visualCardCloseTimer = null;
      let sidePanelReturnFocus = null;
      let sidePanelCleanup = null;

      function arrangeVisualSideMenu() {
        const slot = game.querySelector('[data-visual-menu-slot]');
        const cardSlot = game.querySelector('[data-visual-card-slot]');
        const visualScene = game.querySelector('.visual-scene');
        if (!slot || !visualScene) return;
        const menu = visualScene.querySelector('.territory-map-key, .housing-map-key');
        const cards = visualScene.querySelector('.visual-card-layer');
        if (menu) slot.appendChild(menu);
        if (cards && cardSlot) cardSlot.appendChild(cards);
        else if (cards) slot.appendChild(cards);
        slot.hidden = !menu;
        if (cardSlot) cardSlot.hidden = !cards;
      }

      function usesSideDrawer() {
        return window.matchMedia && window.matchMedia('(max-width: 1050px)').matches;
      }

      function openSceneSidePanel(source, moveFocus) {
        const panel = document.getElementById('scene-side-panel');
        const trigger = game.querySelector('.scene-side-trigger');
        const backdrop = game.querySelector('.scene-side-backdrop');
        const main = game.querySelector('.scene-main');
        if (!panel || !trigger || !backdrop || !usesSideDrawer()) return;
        sidePanelReturnFocus = source || trigger;
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');
        backdrop.hidden = false;
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        if (main) main.setAttribute('inert', '');
        document.body.classList.add('scene-side-locked');
        if (moveFocus) window.requestAnimationFrame(function () { panel.querySelector('.scene-side-close')?.focus(); });
      }

      function closeSceneSidePanel(restoreFocus) {
        const panel = document.getElementById('scene-side-panel');
        const trigger = game.querySelector('.scene-side-trigger');
        const backdrop = game.querySelector('.scene-side-backdrop');
        const main = game.querySelector('.scene-main');
        if (!panel || !trigger || !backdrop) return;
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', usesSideDrawer() ? 'true' : 'false');
        trigger.setAttribute('aria-expanded', 'false');
        backdrop.hidden = true;
        panel.removeAttribute('role');
        panel.removeAttribute('aria-modal');
        if (main) main.removeAttribute('inert');
        document.body.classList.remove('scene-side-locked');
        if (restoreFocus && sidePanelReturnFocus && sidePanelReturnFocus.isConnected) sidePanelReturnFocus.focus();
      }

      function wireSceneSidePanel() {
        if (sidePanelCleanup) sidePanelCleanup();
        const panel = document.getElementById('scene-side-panel');
        const trigger = game.querySelector('.scene-side-trigger');
        const close = game.querySelector('.scene-side-close');
        const backdrop = game.querySelector('.scene-side-backdrop');
        if (!panel || !trigger || !close || !backdrop) return;
        const media = window.matchMedia('(max-width: 1050px)');
        const onTrigger = function () { openSceneSidePanel(trigger, true); };
        const onClose = function () { closeSceneSidePanel(true); };
        const onKeydown = function (event) {
          if (event.key === 'Escape' && panel.classList.contains('is-open')) {
            event.preventDefault();
            closeSceneSidePanel(true);
            return;
          }
          if (event.key === 'Tab' && panel.classList.contains('is-open')) {
            const controls = Array.from(panel.querySelectorAll('button:not(:disabled), summary, [tabindex="0"]')).filter(function (element) {
              const rect = element.getBoundingClientRect();
              return !element.hidden && rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility !== 'hidden';
            });
            if (controls.length === 0) return;
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (!panel.contains(document.activeElement)) {
              event.preventDefault();
              first.focus();
            } else if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }
        };
        const onMediaChange = function () {
          if (!media.matches) closeSceneSidePanel(false);
          else if (!panel.classList.contains('is-open')) panel.setAttribute('aria-hidden', 'true');
        };
        trigger.addEventListener('click', onTrigger);
        close.addEventListener('click', onClose);
        backdrop.addEventListener('click', onClose);
        document.addEventListener('keydown', onKeydown);
        media.addEventListener('change', onMediaChange);
        onMediaChange();
        sidePanelCleanup = function () {
          trigger.removeEventListener('click', onTrigger);
          close.removeEventListener('click', onClose);
          backdrop.removeEventListener('click', onClose);
          document.removeEventListener('keydown', onKeydown);
          media.removeEventListener('change', onMediaChange);
          document.body.classList.remove('scene-side-locked');
        };
      }

      function closeVisualCards() {
        document.querySelectorAll('.visual-hover-card').forEach(function (card) { card.hidden = true; });
        document.querySelectorAll('[data-visual-element-id]').forEach(function (element) { element.setAttribute('aria-expanded', 'false'); });
      }

      function cancelVisualCardClose() {
        if (visualCardCloseTimer !== null) window.clearTimeout(visualCardCloseTimer);
        visualCardCloseTimer = null;
      }

      function scheduleVisualCardClose() {
        if (usesSideDrawer() && document.getElementById('scene-side-panel')?.classList.contains('is-open')) return;
        cancelVisualCardClose();
        visualCardCloseTimer = window.setTimeout(function () {
          const focusedCard = document.activeElement && document.activeElement.closest ? document.activeElement.closest('.visual-hover-card') : null;
          const focusedHotspot = document.activeElement && document.activeElement.closest ? document.activeElement.closest('[data-visual-element-id]') : null;
          if (!focusedCard && !focusedHotspot) closeVisualCards();
        }, 140);
      }

      function positionVisualCard(element, card) {
        if (card.closest('.scene-side-panel')) {
          card.style.right = '';
          card.style.left = '';
          card.style.top = '';
          return;
        }
        const canvas = element.closest('.visual-canvas');
        if (!canvas) return;
        if (canvas.querySelector('.territory-map, .housing-plan') && window.matchMedia('(max-width: 700px)').matches) {
          card.style.right = '';
          card.style.left = '';
          card.style.top = '';
          return;
        }
        window.requestAnimationFrame(function () {
          const canvasRect = canvas.getBoundingClientRect();
          const anchor = element.querySelector('.map-pin') || element;
          const elementRect = anchor.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          const gap = 14;
          let left = elementRect.right - canvasRect.left + gap;
          if (left + cardRect.width > canvasRect.width - gap) left = elementRect.left - canvasRect.left - cardRect.width - gap;
          left = Math.max(gap, Math.min(left, canvasRect.width - cardRect.width - gap));
          let top = elementRect.top - canvasRect.top + (elementRect.height - cardRect.height) / 2;
          top = Math.max(gap, Math.min(top, canvasRect.height - cardRect.height - gap));
          card.style.right = 'auto';
          card.style.left = Math.round(left) + 'px';
          card.style.top = Math.round(top) + 'px';
        });
      }

      function openVisualCard(element) {
        cancelVisualCardClose();
        const cardId = element.getAttribute('aria-controls');
        const card = cardId ? document.getElementById(cardId) : null;
        if (!card) return null;
        closeVisualCards();
        card.hidden = false;
        element.setAttribute('aria-expanded', 'true');
        if (card.closest('.scene-side-panel')) openSceneSidePanel(element, false);
        positionVisualCard(element, card);
        return card;
      }

      function focusAction(actionId, sourceElement) {
        if (sourceElement) openVisualCard(sourceElement);
        const button = Array.from(document.querySelectorAll('.action-button')).find(function (candidate) { return candidate.dataset.actionId === actionId; });
        if (!button) return;
        const card = button.closest('.action-card, .visual-hover-card');
        if (!card) return;
        if (sourceElement && sourceElement.closest('.territory-map-key, .housing-map-key') && usesSideDrawer()) {
          closeSceneSidePanel(false);
        }
        if (button.disabled) { card.setAttribute('tabindex', '-1'); card.focus(); } else { button.focus(); }
        if (sourceElement && sourceElement.closest('.inspection-scene')) {
          card.scrollIntoView({ block: 'nearest', behavior: 'auto' });
        }
        if (card.classList.contains('action-card')) {
          const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          card.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      }

      function wireCommands() {
        document.querySelectorAll('.action-button').forEach(function (button) {
          button.addEventListener('click', async function () {
            button.disabled = true;
            const applied = await request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/actions', { method: 'POST', body: JSON.stringify({ actionId: button.dataset.actionId }) });
            if (!applied) button.disabled = false;
          });
        });
        document.querySelectorAll('[data-visual-element-id]').forEach(function (element) {
          element.addEventListener('mouseenter', function () {
            if (visualHoverReady && !element.closest('.inspection-scene')) openVisualCard(element);
          });
          element.addEventListener('mouseleave', scheduleVisualCardClose);
          element.addEventListener('focus', function () { openVisualCard(element); });
          element.addEventListener('blur', scheduleVisualCardClose);
          element.addEventListener('click', function (event) {
            event.preventDefault();
            const card = openVisualCard(element);
            if (element.dataset.focusActionId) focusAction(element.dataset.focusActionId, element);
            else if (card) { card.setAttribute('tabindex', '-1'); card.focus(); }
          });
          element.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          });
        });
        document.querySelectorAll('.visual-hover-card').forEach(function (card) {
          card.addEventListener('mouseenter', cancelVisualCardClose);
          card.addEventListener('mouseleave', scheduleVisualCardClose);
          card.addEventListener('focusin', cancelVisualCardClose);
          card.addEventListener('focusout', scheduleVisualCardClose);
        });
        const advance = document.getElementById('advance-button');
        if (advance) {
          advance.addEventListener('click', async function () {
            advance.disabled = true;
            const advanced = await request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/advance', { method: 'POST', body: '{}' });
            if (advanced) focusCurrentSceneHeading();
            else advance.disabled = false;
          });
        }
      }

      function currentJourneyStage() {
        const templateId = currentView && currentView.visual ? currentView.visual.templateId : 'briefing';
        return STAGE_BY_VISUAL_TEMPLATE[templateId] || 1;
      }

      function renderJourney() {
        const activeStage = currentJourneyStage();
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
        const total = currentView.context && Number.isInteger(currentView.context.expectedVisitedNodeCount)
          ? currentView.context.expectedVisitedNodeCount
          : 10;
        const completed = Math.min(total, session.completedSceneIds.length);
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
        document.getElementById('progress-copy').textContent = completed + ' de ' + total + ' pasos completados';
        document.getElementById('progress-bar').style.width = progress + '%';
        const progressLine = document.querySelector('.progress-line[role="progressbar"]');
        if (progressLine) progressLine.setAttribute('aria-valuenow', String(progress));
        document.getElementById('scene-type').textContent = SCENE_TYPE_LABELS[currentView.scene.type] || 'Escena';
        document.getElementById('branch-chip').textContent = session.branch ? 'Historia ' + (BRANCH_LABELS[session.branch] || session.branch) : 'Historia sin decidir';
        document.getElementById('session-status').textContent = session.status === 'completed' ? 'Partida terminada' : 'Partida en curso';
        const decisions = session.decisionReview.slice(-3);
        document.getElementById('decision-history').innerHTML = decisions.length === 0 ? '<li>Aún no hay decisiones.</li>' : decisions.map(function (decision) { return '<li>' + escapeHtml(decision.label) + '</li>'; }).join('');
      }

      function render() {
        if (!currentView) return;
        const renderer = RENDERERS[currentView.scene.type];
        if (!renderer) throw new Error('Tipo de escena no soportado: ' + currentView.scene.type);
        document.body.classList.add('gameplay-active');
        visualHoverReady = false;
        if (visualHoverTimer !== null) window.clearTimeout(visualHoverTimer);
        game.innerHTML = renderer(currentView.scene);
        arrangeVisualSideMenu();
        renderJourney();
        renderFooter();
        hydrateVisualActionCards(currentView.scene);
        wireSceneSidePanel();
        wireCommands();
        visualHoverTimer = window.setTimeout(function () { visualHoverReady = true; }, 220);
      }

      restartButton.addEventListener('click', function () {
        if (!sessionId || busy) return;
        request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/restart', { method: 'POST', body: '{}' });
      });
      startButton.addEventListener('click', startSession);
      setSessionChrome(false);
      hydrateEntryContext();
    </script>
  </body>
</html>`;
}
