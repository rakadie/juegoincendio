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
      .stage-label { min-width: 0; font-size: .8rem; font-weight: 780; line-height: 1.15; }
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
      .visual-capacity text { fill: #fff; font-size: 15px; font-weight: 900; letter-spacing: .05em; }

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
        .session-footer { grid-template-columns: 1fr 1fr; }
        .footer-cell:last-child { grid-column: 1 / -1; }
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
        .scene-content { padding: 15px; }
        .scene-heading { grid-template-columns: 1fr; gap: 10px; }
        .selection-counter, .scene-state-badge { width: 100%; min-width: 0; display: flex; justify-content: space-between; align-items: center; text-align: left; }
        .selection-counter strong, .scene-state-badge strong { font-size: 1.05rem; }
        .visual-canvas, .territory-svg { min-height: 300px; }
        .visual-dimension-summary, .actions { grid-template-columns: 1fr; }
        .inspection-response, .prevention-area-grid { grid-template-columns: 1fr; }
        .visual-hover-card { width: min(320px, calc(100% - 20px)); max-height: calc(100% - 20px); }
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
        <div class="topbar-actions"><button class="ghost-button" id="restart-button" type="button" disabled>↻ Reiniciar</button></div>
      </header>

      <main>
        <div id="game" aria-live="polite">
          <section class="entry" aria-labelledby="entry-title">
            <div class="entry-copy">
              <p class="eyebrow">Simulación educativa municipal</p>
              <h1 id="entry-title">Prepara hoy. Decide bajo presión después.</h1>
              <p class="lead">Gestiona el territorio y la interfaz de vivienda antes del incendio. Cuando llegue la emergencia, las condiciones que hayas construido limitarán o ampliarán tus opciones.</p>
              <div class="entry-meta" aria-label="Información de la partida">
                <span>Recorrido guiado</span>
                <span id="entry-duration">Duración orientativa</span>
              </div>
              <div class="entry-actions"><button class="primary" id="start-session-button" type="button">Comenzar partida</button></div>
              <p class="entry-note">Cuando comiences, conocerás la misión antes de tomar tu primera decisión.</p>
            </div>
            <div class="entry-visual" role="img" aria-label="Territorio de barranco e interfaz urbano-forestal del ejercicio">
              <div class="entry-visual-card"><strong>Una preparación, una emergencia.</strong><p>Observa cómo las decisiones preventivas se vuelven condiciones operativas cuando comienza el incendio.</p></div>
            </div>
          </section>
        </div>
        <div id="notice" role="alert"></div>
      </main>

      <footer class="session-footer" id="session-footer" hidden aria-label="Resumen de la partida">
        <div class="footer-cell"><strong>¿Por qué importa?</strong><p>La prevención modifica el territorio. El territorio condiciona las opciones disponibles durante el incendio.</p></div>
        <div class="footer-cell"><strong>Tu recorrido</strong><p id="progress-copy">0 pasos completados</p><div class="progress-line" role="progressbar" aria-label="Progreso del recorrido" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span id="progress-bar" style="width:0%"></span></div><div class="meta-row"><span class="chip accent" id="scene-type">Misión</span><span class="chip" id="branch-chip">Ruta pendiente</span><span class="chip" id="session-status">Partida activa</span></div></div>
        <div class="footer-cell"><strong>Últimas decisiones</strong><ol class="decision-history" id="decision-history"><li>Aún no hay decisiones.</li></ol></div>
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
          if (!response.ok) throw new Error(payload.message || 'No se pudo completar la acción.');
          currentView = payload;
          sessionId = payload.session.id;
          setSessionChrome(true);
          render();
          return true;
        } catch (error) {
          notice.textContent = error instanceof Error ? error.message : 'Error inesperado.';
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
            button.textContent = action.selected ? 'Seleccionada' : 'Elegir esta actuación';
          }
        });
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

      function inspectionResponse(scene) {
        const selected = scene.actions.filter(function (action) { return action.selected; });
        const remaining = Math.max(0, scene.actionQuota - scene.selectedCount);
        const selectedMarkup = selected.length === 0
          ? '<span class="selection-empty">Aún no has elegido ninguna.</span>'
          : '<div class="selected-action-list">' + selected.map(function (action) {
              return '<span class="selected-action-chip">' + escapeHtml(action.label) + '</span>';
            }).join('') + '</div>';
        const remainingLabel = remaining === 0
          ? 'No quedan actuaciones disponibles en esta zona.'
          : 'Queda' + (remaining === 1 ? '' : 'n') + ' ' + remaining + ' actuaci' + (remaining === 1 ? 'ón' : 'ones') + ' disponible' + (remaining === 1 ? '' : 's') + '.';
        const confirmation = scene.feedback
          ? '<div class="inspection-confirmation"><strong>Actuación aplicada</strong><p>' + escapeHtml(scene.feedback) + '</p></div>'
          : '<div class="inspection-confirmation is-empty"><strong>Observa antes de actuar</strong><p>Elige un punto para relacionar el riesgo visible con una medida preventiva.</p></div>';
        return '<section class="inspection-response" role="status" aria-live="polite" aria-atomic="true">' + confirmation +
          '<div class="inspection-selection"><strong>Actuaciones elegidas</strong>' + selectedMarkup + '<small>' + remainingLabel + '</small></div></section>';
      }

      function preventionAreaReview(scene) {
        return '<section class="prevention-review" aria-label="Decisiones y condiciones pendientes por zona">' +
          '<p class="prevention-review-intro">Compara lo aplicado con lo que sigue presente en cada zona.</p>' +
          '<div class="prevention-area-grid">' + scene.preventionAreas.map(function (area) {
            const applied = '<div class="prevention-area-section"><strong>Actuaciones aplicadas</strong><ul class="applied-list">' + area.selectedActions.map(function (action) {
              return '<li>' + escapeHtml(action.label) + '</li>';
            }).join('') + '</ul></div>';
            const pending = '<div class="prevention-area-section"><strong>Condiciones pendientes</strong><ul class="pending-list">' + area.pendingConditions.map(function (condition) {
              return '<li><b>' + escapeHtml(condition.label) + '</b><small>' + escapeHtml(condition.consequence) + '</small></li>';
            }).join('') + '</ul></div>';
            return '<article class="prevention-area" data-prevention-area="' + escapeHtml(area.sceneId) + '"><h3>' + escapeHtml(area.label) + '</h3>' + applied + pending + '</article>';
          }).join('') + '</div></section>';
      }

      function renderBriefing(scene) {
        return '<section class="scene briefing"><div class="scene-heading-copy"><p class="eyebrow">Misión municipal</p><h1>' + escapeHtml(scene.title) + '</h1><p class="lead">' + escapeHtml(scene.mission) + '</p>' + advanceButton(scene) + '</div></section>';
      }

      function renderInspection(scene) {
        const remaining = Math.max(0, scene.actionQuota - scene.selectedCount);
        const badge = '<div class="selection-counter"><small>Acciones seleccionadas</small><strong>' + scene.selectedCount + ' / ' + scene.actionQuota + '</strong><span class="selection-remaining">' + (remaining === 0 ? 'Presupuesto agotado' : 'Quedan ' + remaining) + '</span></div>';
        return '<section class="scene"><div class="scene-content">' + heading(scene, 'Inspección preventiva', badge) +
          '<div class="objective"><strong>Tu objetivo:</strong> ' + escapeHtml(scene.objective) + '</div>' +
          '<p class="visual-hint">Pasa sobre un punto de la escena, enfócalo con el teclado o tócalo para ver y elegir la actuación.</p>' +
          visualMarkup() + inspectionResponse(scene) + advanceButton(scene) + '</div></section>';
      }

      function renderSummary(scene) {
        return '<section class="scene"><div class="scene-content">' + heading(scene, 'Balance preventivo', '') +
          '<div class="objective"><strong>Puente causal:</strong> lo que trataste en prevención define las condiciones que hereda la emergencia.</div>' +
          preventionAreaReview(scene) +
          '<div class="balance-caution"><strong>Reducción, no garantía:</strong> estas medidas reducen el riesgo y mejoran las condiciones operativas; no convierten una vivienda en completamente segura.</div>' +
          '<h3 class="balance-heading">Condiciones que hereda la emergencia</h3>' + visualMarkup() + advanceButton(scene) + '</div></section>';
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

      const STAGE_BY_VISUAL_TEMPLATE = {
        briefing: 1,
        territory: 1,
        housing: 2,
        summary: 2,
        crisis: 3,
        result: 4
      };

      let visualCardCloseTimer = null;

      function closeVisualCards() {
        document.querySelectorAll('.visual-hover-card').forEach(function (card) { card.hidden = true; });
        document.querySelectorAll('[data-visual-element-id]').forEach(function (element) { element.setAttribute('aria-expanded', 'false'); });
      }

      function cancelVisualCardClose() {
        if (visualCardCloseTimer !== null) window.clearTimeout(visualCardCloseTimer);
        visualCardCloseTimer = null;
      }

      function scheduleVisualCardClose() {
        cancelVisualCardClose();
        visualCardCloseTimer = window.setTimeout(function () {
          const focusedCard = document.activeElement && document.activeElement.closest ? document.activeElement.closest('.visual-hover-card') : null;
          const focusedHotspot = document.activeElement && document.activeElement.closest ? document.activeElement.closest('[data-visual-element-id]') : null;
          if (!focusedCard && !focusedHotspot) closeVisualCards();
        }, 140);
      }

      function positionVisualCard(element, card) {
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
        positionVisualCard(element, card);
        return card;
      }

      function focusAction(actionId, sourceElement) {
        if (sourceElement) openVisualCard(sourceElement);
        const button = Array.from(document.querySelectorAll('.action-button')).find(function (candidate) { return candidate.dataset.actionId === actionId; });
        if (!button) return;
        const card = button.closest('.action-card, .visual-hover-card');
        if (!card) return;
        if (button.disabled) { card.setAttribute('tabindex', '-1'); card.focus(); } else { button.focus(); }
        if (sourceElement && sourceElement.closest('.territory-map-key, .housing-map-key')) {
          card.scrollIntoView({ block: 'nearest', behavior: 'auto' });
        }
        if (card.classList.contains('action-card')) {
          const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          card.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      }

      function wireCommands() {
        document.querySelectorAll('.action-button').forEach(function (button) {
          button.addEventListener('click', function () {
            button.disabled = true;
            request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/actions', { method: 'POST', body: JSON.stringify({ actionId: button.dataset.actionId }) });
          });
        });
        document.querySelectorAll('[data-visual-element-id]').forEach(function (element) {
          element.addEventListener('mouseenter', function () {
            if (visualHoverReady) openVisualCard(element);
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
        document.getElementById('branch-chip').textContent = session.branch ? 'Ruta ' + (BRANCH_LABELS[session.branch] || session.branch) : 'Ruta pendiente';
        document.getElementById('session-status').textContent = session.status === 'completed' ? 'Partida completada' : 'Partida activa';
        const decisions = session.decisionReview.slice(-3);
        document.getElementById('decision-history').innerHTML = decisions.length === 0 ? '<li>Aún no hay decisiones.</li>' : decisions.map(function (decision) { return '<li>' + escapeHtml(decision.label) + '</li>'; }).join('');
      }

      function render() {
        if (!currentView) return;
        const renderer = RENDERERS[currentView.scene.type];
        if (!renderer) throw new Error('Tipo de escena no soportado: ' + currentView.scene.type);
        visualHoverReady = false;
        if (visualHoverTimer !== null) window.clearTimeout(visualHoverTimer);
        game.innerHTML = renderer(currentView.scene);
        renderJourney();
        renderFooter();
        hydrateVisualActionCards(currentView.scene);
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
