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
      body.gameplay-active .northstar-shell {
        width: 100%;
        height: 100dvh;
        min-height: 0;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        overflow: hidden;
      }
      body.gameplay-active .northstar-shell > main { min-height: 0; overflow: auto; }
      body.gameplay-active .northstar-shell > main > #game { height: 100%; min-height: 0; }
      .topbar {
        position: sticky;
        top: 0;
        z-index: 20;
        min-height: 62px;
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
        color: #ffd271;
        background: linear-gradient(160deg, #8e241f, #3e1720);
        box-shadow: inset 0 0 0 3px #071726;
      }
      .brand-mark svg { width: 24px; height: 28px; fill: currentColor; filter: drop-shadow(0 2px 2px rgba(0,0,0,.35)); }
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
      body.gameplay-active #notice:not(:empty) {
        position: fixed;
        top: 72px;
        left: 50%;
        z-index: 80;
        width: min(520px, calc(100% - 24px));
        min-height: 0;
        margin: 0;
        padding: 9px 12px;
        border: 1px solid rgba(255, 210, 196, .64);
        border-left: 3px solid #e26a4f;
        border-radius: 8px;
        color: #fff8f4;
        background: rgba(73, 22, 17, .95);
        box-shadow: 0 14px 34px rgba(3, 13, 20, .35);
        font-size: .78rem;
        line-height: 1.35;
        transform: translateX(-50%);
        backdrop-filter: blur(10px);
      }
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
      .entry-copy h1 { max-width: 780px; margin-bottom: 16px; font-size: clamp(2.05rem, 3.2vw, 3.05rem); line-height: 1.02; }
      .entry-copy .lead { max-width: 720px; font-size: clamp(.94rem, 1.15vw, 1.06rem); }
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
      h1 { margin-bottom: 12px; font-size: clamp(1.9rem, 4vw, 3.1rem); line-height: 1.02; letter-spacing: -.035em; }
      h2 { margin-bottom: 8px; font-size: clamp(1.35rem, 2.2vw, 1.95rem); line-height: 1.08; letter-spacing: -.02em; }
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
      .inspection-hidden-menu { display: none !important; }
      .inspection-scene .visual-hotspot { -webkit-tap-highlight-color: transparent; }
      .inspection-advance { display: flex; }
      .inspection-advance .footer-actions { margin: 0; }
      .inspection-advance .primary { height: 100%; }
      .scene-learning-panel { min-width: 0; }
      .summary-dashboard { display: grid; grid-template-columns: minmax(280px, .8fr) minmax(0, 1.2fr); gap: 12px; align-items: start; }
      .summary-dashboard .prevention-review { margin: 0; }
      .summary-emergency { min-width: 0; }
      .summary-emergency .balance-heading { margin-top: 0; }

      body.gameplay-active .session-footer { display: none; }

      .scene.briefing {
        position: relative;
        isolation: isolate;
        width: 100%;
        height: 100%;
        min-height: 0;
        display: grid;
        align-items: center;
        padding: clamp(22px, 4vw, 56px);
        color: #fff;
        background:
          linear-gradient(90deg, rgba(5, 17, 26, .9), rgba(5, 17, 26, .46) 58%, rgba(5,17,26,.2)),
          url('/images/operational-command-hero.png') center / cover;
      }
      .scene.briefing::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(180deg, rgba(2,12,19,.08), rgba(2,12,19,.62));
      }
      .mission-briefing-shell {
        width: min(1180px, 100%);
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(230px, 310px);
        align-items: end;
        gap: clamp(14px, 2vw, 24px);
        margin-inline: auto;
      }
      .mission-briefing-panel,
      .mission-briefing-note {
        border: 1px solid rgba(255,250,235,.3);
        background: linear-gradient(145deg, rgba(7,23,38,.94), rgba(12,39,43,.88));
        box-shadow: 0 22px 55px rgba(2,12,19,.42), inset 0 1px rgba(255,255,255,.08);
        backdrop-filter: blur(12px) saturate(1.08);
      }
      .mission-briefing-panel {
        padding: clamp(18px, 2.6vw, 30px);
        border-left: 5px solid #f0b44b;
        border-radius: 12px;
      }
      .mission-briefing-kicker {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        color: #f6c66c;
        font-size: .66rem;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .mission-briefing-kicker span:last-child {
        padding: 3px 7px;
        border: 1px solid rgba(122,183,139,.48);
        border-radius: 999px;
        color: #bfe1c7;
        background: rgba(62,123,93,.24);
      }
      .scene.briefing .scene-heading-copy { max-width: 780px; }
      .scene.briefing h1 { max-width: 760px; margin-bottom: 10px; font-size: clamp(1.75rem, 3vw, 2.55rem); }
      .scene.briefing .lead { max-width: 760px; color: #dce7ec; font-size: clamp(.88rem, 1.05vw, 1rem); }
      .scene.briefing .eyebrow { color: #f0b44b; }
      .mission-briefing-steps {
        counter-reset: mission-step;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 7px;
        margin: 18px 0 0;
        padding: 0;
        list-style: none;
      }
      .mission-briefing-steps li {
        counter-increment: mission-step;
        min-width: 0;
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr);
        gap: 8px;
        padding: 9px;
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 7px;
        background: rgba(255,255,255,.055);
      }
      .mission-briefing-steps li::before {
        content: '0' counter(mission-step);
        display: grid;
        place-items: center;
        width: 28px;
        height: 28px;
        border: 1px solid rgba(240,180,75,.56);
        border-radius: 5px;
        color: #f7c875;
        font-size: .65rem;
        font-weight: 900;
      }
      .mission-briefing-steps strong { display: block; color: #fff; font-size: .78rem; }
      .mission-briefing-steps small { display: block; margin-top: 2px; color: #becdc7; font-size: .68rem; line-height: 1.3; }
      .mission-briefing-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px solid rgba(255,255,255,.16);
      }
      .mission-briefing-footer p { max-width: 520px; margin: 0; color: #dce7e2; font-size: .78rem; line-height: 1.4; }
      .mission-briefing-footer p strong { color: #f5c66e; text-transform: uppercase; letter-spacing: .06em; }
      .mission-briefing-footer .footer-actions { flex: 0 0 auto; margin: 0; }
      .mission-briefing-footer .primary { min-width: 180px; }
      .mission-briefing-note {
        padding: 16px;
        border-top: 4px solid #619a70;
        border-radius: 10px;
      }
      .mission-briefing-note span { color: #98bca5; font-size: .62rem; font-weight: 900; letter-spacing: .11em; text-transform: uppercase; }
      .mission-briefing-note strong { display: block; margin-top: 6px; color: #fff; font-size: 1rem; line-height: 1.25; }
      .mission-briefing-note p { margin: 7px 0 0; color: #c8d7d1; font-size: .76rem; line-height: 1.4; }

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
        width: min(296px, calc(100% - 32px));
        max-height: calc(100% - 32px);
        padding: 11px;
        overflow: hidden auto;
        border: 1px solid rgba(245, 210, 145, .48);
        border-left: 3px solid #d89034;
        border-radius: 8px;
        color: #f7faf7;
        background: linear-gradient(145deg, rgba(7, 23, 38, .97), rgba(13, 43, 43, .95));
        box-shadow: 0 18px 44px rgba(3, 13, 20, .42), inset 0 1px rgba(255,255,255,.08);
        backdrop-filter: blur(12px) saturate(1.08);
        pointer-events: auto;
      }
      .visual-hover-card[hidden] { display: none; }
      .visual-hover-card:not([hidden]) { animation: contextual-card-enter .24s cubic-bezier(.2,.8,.2,1) both; }
      .visual-hover-card.is-closing { animation: contextual-card-exit .14s ease-in both; pointer-events: none; }
      .visual-hover-card.selected { border-color: #80b88c; border-left-color: #80b88c; box-shadow: 0 18px 44px rgba(3,13,20,.38), inset 0 0 0 1px rgba(128,184,140,.45); }
      .visual-card-close {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 32px;
        height: 32px;
        display: grid;
        place-items: center;
        padding: 0;
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 6px;
        color: #edf5f1;
        background: rgba(255,255,255,.07);
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
      }
      .visual-card-close:hover { background: rgba(255,255,255,.14); }
      .visual-card-state {
        display: grid;
        grid-template-columns: 18px minmax(0, 1fr);
        align-items: start;
        gap: 8px;
        padding-right: 30px;
      }
      .visual-card-state > span:last-child { display: grid; gap: 2px; }
      .visual-card-state strong { color: #fffdf4; font-size: .9rem; line-height: 1.2; }
      .visual-card-state small { color: #f1c97f; font-size: .75rem; }
      .visual-dimension small { color: var(--muted); }
      .visual-explanation { color: #cedbd6; }
      .visual-explanation { margin: 7px 0 0; font-size: .82rem; line-height: 1.38; }
      .visual-card-action { display: grid; gap: 6px; margin-top: 9px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,.16); }
      .visual-card-action > strong { font-size: .88rem; }
      .visual-card-action p { margin: 0; color: #c8d5d0; font-size: .8rem; line-height: 1.35; }
      .visual-card-action small { color: #ffb7a8; font-size: .75rem; }
      .visual-card-action button { justify-self: start; min-width: 112px; min-height: 44px; }
      @keyframes contextual-card-enter {
        from { opacity: 0; transform: translateY(9px) scale(.985); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes contextual-card-exit {
        from { opacity: 1; transform: translateY(0) scale(1); }
        to { opacity: 0; transform: translateY(5px) scale(.99); }
      }
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

      /* Prevention is a continuous map, not a page surrounded by controls. */
      body.gameplay-active:has(.inspection-scene) main {
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
      body.gameplay-active:has(.inspection-scene) #game { height: 100%; min-height: 0; }
      .inspection-scene {
        width: 100%;
        height: 100%;
        min-height: 0;
        margin: 0;
        border: 0;
        border-radius: 0;
        background: #102019;
        box-shadow: none;
      }
      .inspection-scene .scene-content,
      .inspection-scene .scene-workspace,
      .inspection-scene .scene-main,
      .inspection-scene .inspection-stage,
      .inspection-scene .visual-scene,
      .inspection-scene .visual-canvas { width: 100%; height: 100%; min-height: 0; }
      .inspection-scene .scene-content { padding: 0; }
      .inspection-scene .scene-workspace { display: block; margin: 0; }
      .inspection-scene .visual-scene { display: block; margin: 0; }
      .inspection-scene .visual-canvas {
        position: relative;
        display: block;
        overflow: clip;
        border: 0;
        border-radius: 0;
        background: #102019;
      }
      .inspection-scene .visual-canvas::before {
        content: '';
        position: absolute;
        inset: -12px;
        z-index: 0;
        background-position: center;
        background-size: cover;
        filter: brightness(.55) saturate(.78);
        transform: scale(1.015);
      }
      .inspection-scene .visual-scene[data-visual-template="territory"] .visual-canvas {
        background: #102019;
      }
      .inspection-scene .visual-scene[data-visual-template="housing"] .visual-canvas {
        background: #102019;
      }
      .inspection-scene .visual-scene[data-visual-template="territory"] .visual-canvas::before { background-image: url('/images/territory-prevention-aerial-v1.jpg'); }
      .inspection-scene .visual-scene[data-visual-template="housing"] .visual-canvas::before { background-image: url('/images/housing-prevention-aerial-v2.jpg'); }
      .inspection-scene .visual-scene[data-visual-template="territory"] .territory-map,
      .inspection-scene .visual-scene[data-visual-template="housing"] .housing-plan {
        position: absolute;
        inset: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        min-height: 0;
        max-height: none;
        aspect-ratio: auto;
      }
      .inspection-scene .territory-scene-caption,
      .inspection-scene .territory-place-label,
      .inspection-scene .housing-scene-caption,
      .inspection-scene .housing-place-label { display: none; }
      .inspection-map-hud,
      .inspection-map-progress,
      .inspection-response,
      .inspection-advance {
        position: absolute;
        z-index: 10;
        color: #fffdf4;
        background: rgba(7, 23, 38, .88);
        border: 1px solid rgba(255, 250, 235, .34);
        box-shadow: 0 12px 30px rgba(3, 13, 20, .28);
        backdrop-filter: blur(9px);
      }
      .inspection-map-hud {
        top: clamp(12px, 2vw, 24px);
        left: clamp(12px, 2vw, 28px);
        width: min(470px, calc(100% - 154px));
        padding: 8px 11px;
        border-left: 3px solid #f0b44b;
        border-radius: 8px;
      }
      .inspection-map-hud .eyebrow { margin-bottom: 2px; color: #f5c66e; font-size: .66rem; }
      .inspection-map-hud h2 { margin: 0 0 2px; color: #fff; font-size: clamp(1.02rem, 1.35vw, 1.35rem); line-height: 1.08; }
      .inspection-map-hud p { margin: 0; color: #dce7e2; font-size: .7rem; line-height: 1.3; }
      .inspection-map-progress {
        top: clamp(12px, 2vw, 24px);
        right: clamp(12px, 2vw, 28px);
        min-width: 100px;
        padding: 7px 9px;
        border-radius: 8px;
        text-align: right;
      }
      .inspection-map-progress small { display: block; color: #bfcfc8; font-size: .63rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
      .inspection-map-progress strong { display: block; margin-top: 1px; color: #fff; font-size: .92rem; }
      .inspection-response {
        left: clamp(12px, 2vw, 28px);
        bottom: clamp(12px, 2vw, 24px);
        width: min(590px, calc(100% - 220px));
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(190px, .8fr);
        gap: 0;
        margin: 0;
        overflow: hidden;
        border-radius: 10px;
      }
      .inspection-response.is-initial { display: none; }
      .inspection-response .inspection-confirmation,
      .inspection-response .inspection-selection {
        min-width: 0;
        padding: 10px 12px;
        border: 0;
        border-radius: 0;
        color: #f7fbf8;
        background: transparent;
      }
      .inspection-response .inspection-confirmation { border-right: 1px solid rgba(255,255,255,.18); }
      .inspection-response .inspection-confirmation.has-change { display: block; }
      .inspection-response .inspection-confirmation strong { color: #f4c36c; font-size: .78rem; text-transform: uppercase; letter-spacing: .05em; }
      .inspection-response .inspection-confirmation p { margin: 3px 0 0; color: #f5f8f6; font-size: .82rem; line-height: 1.32; }
      .inspection-response .inspection-selection { display: grid; gap: 5px; }
      .inspection-response .inspection-selection > strong { color: #fff; font-size: .76rem; }
      .inspection-response .inspection-selection small { color: #c3d0cb; font-size: .68rem; }
      .inspection-response .selected-action-list { display: flex; flex-wrap: wrap; gap: 4px; }
      .inspection-response .selected-action-chip {
        max-width: 210px;
        overflow: hidden;
        padding: 3px 6px;
        border-color: rgba(177, 216, 190, .55);
        color: #eaf6ed;
        background: rgba(62, 123, 93, .42);
        font-size: .65rem;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .inspection-advance {
        right: clamp(12px, 2vw, 28px);
        bottom: clamp(12px, 2vw, 24px);
        padding: 7px;
        border-radius: 10px;
      }
      .inspection-advance .footer-actions { margin: 0; }
      .inspection-advance .primary { min-height: 46px; }
      .inspection-scene .visual-card-layer { position: absolute; inset: 0; z-index: 20; display: block; padding: 0; pointer-events: none; }
      .inspection-scene .visual-hover-card {
        position: absolute;
        width: min(264px, calc(100% - 28px));
        max-height: min(340px, calc(100% - 28px));
        padding: 9px;
        overflow: auto;
        border: 1px solid rgba(244, 225, 186, .52);
        border-left: 3px solid #d18b31;
        border-radius: 8px;
        color: #f7faf7;
        background: linear-gradient(145deg, rgba(7,23,38,.97), rgba(13,43,43,.95));
        box-shadow: 0 18px 48px rgba(3, 13, 20, .42);
        backdrop-filter: blur(10px);
        pointer-events: auto;
      }
      .inspection-scene .visual-hover-card .visual-card-state strong { color: #fffdf4; font-size: .8rem; }
      .inspection-scene .visual-hover-card .visual-card-state small { color: #f1c97f; font-size: .67rem; }
      .inspection-scene .visual-hover-card .visual-explanation { color: #cedbd6; font-size: .73rem; line-height: 1.32; }
      .inspection-scene .visual-hover-card .visual-card-action { margin-top: 7px; padding-top: 7px; }
      .inspection-scene .visual-hover-card .visual-card-action > strong { color: #fff; font-size: .78rem; }
      .inspection-scene .visual-hover-card .visual-card-action p { font-size: .72rem; line-height: 1.3; }
      .inspection-scene .visual-hover-card .action-button { min-width: 0; min-height: 44px; padding: 7px 10px; font-size: .76rem; }
      .inspection-scene .visual-hover-card .action-button:not(:disabled) { color: #fff; border-color: #d08b3a; background: linear-gradient(180deg, #b86312, #914206); }
      .inspection-hidden-menu { display: none !important; }

      /* Emergency decisions continue on the photograph instead of opening a side menu. */
      body.gameplay-active:has(.crisis-decision-scene) {
        height: 100dvh;
        overflow: hidden;
      }
      body.gameplay-active:has(.crisis-decision-scene) main {
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
      body.gameplay-active:has(.crisis-decision-scene) #game { height: 100%; min-height: 0; }
      .crisis-decision-scene {
        width: 100%;
        height: 100%;
        min-height: 0;
        margin: 0;
        overflow: hidden;
        border: 0;
        border-radius: 0;
        background: #102019;
        box-shadow: none;
      }
      .crisis-decision-scene .scene-content,
      .crisis-decision-scene .decision-stage,
      .crisis-decision-scene .visual-scene,
      .crisis-decision-scene .visual-canvas { width: 100%; height: 100%; min-height: 0; }
      .crisis-decision-scene .scene-content { padding: 0; }
      .decision-stage { position: relative; overflow: clip; background: #102019; }
      .decision-stage.has-command-hero {
        background:
          linear-gradient(90deg, rgba(5,17,26,.86), rgba(5,17,26,.34) 58%, rgba(5,17,26,.5)),
          url('/images/operational-command-hero.png') center / cover;
      }
      .decision-stage.has-command-hero > .visual-scene { display: none; }
      .crisis-decision-scene .visual-scene { display: block; margin: 0; }
      .crisis-decision-scene .visual-canvas {
        position: relative;
        display: block;
        isolation: isolate;
        overflow: clip;
        border: 0;
        border-radius: 0;
        background: #102019;
      }
      .crisis-decision-scene .visual-canvas::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 0;
        background: url('/images/crisis-ravine-aerial-v2.jpg') center / cover;
        filter: brightness(.7) saturate(.9);
        transform: none;
      }
      .crisis-decision-scene .crisis-svg {
        position: absolute;
        inset: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        min-height: 0;
        max-height: none;
      }
      .decision-map-hud,
      .decision-map-status,
      .decision-preparation-review,
      .decision-action-menu,
      .decision-outcome,
      .decision-advance {
        position: absolute;
        z-index: 15;
        color: #fffdf4;
        border: 1px solid rgba(213,229,220,.3);
        background:
          linear-gradient(145deg, rgba(6,20,31,.96), rgba(10,41,42,.91)),
          radial-gradient(circle at 100% 0, rgba(240,180,75,.15), transparent 42%);
        box-shadow: 0 18px 46px rgba(3,13,20,.44), inset 0 1px rgba(255,255,255,.09);
        backdrop-filter: blur(14px) saturate(1.12);
      }
      .decision-map-hud {
        top: clamp(12px, 2vw, 24px);
        left: clamp(12px, 2vw, 28px);
        width: min(570px, calc(100% - 330px));
        padding: 10px 13px;
        border-left: 2px solid #f0b44b;
        border-radius: 10px;
      }
      .decision-map-hud .eyebrow { margin-bottom: 2px; color: #f5c66e; font-size: .66rem; }
      .decision-map-hud h2 { margin: 0 0 2px; color: #fff; font-size: clamp(1rem, 1.3vw, 1.25rem); line-height: 1.12; }
      .decision-map-hud p { margin: 0; color: #edf4f0; font-size: .78rem; line-height: 1.32; }
      .decision-context { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 8px; margin-top: 7px; padding-top: 7px; border-top: 1px solid rgba(255,255,255,.16); }
      .decision-context span { color: #f5c66e; font-size: .58rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
      .decision-context small { color: #bfd0c8; font-size: .7rem; line-height: 1.3; }
      .decision-map-status {
        top: clamp(12px, 2vw, 24px);
        right: clamp(12px, 2vw, 28px);
        min-width: 124px;
        padding: 8px 10px;
        border-radius: 8px;
        text-align: right;
      }
      .decision-map-status small { display: block; color: #bdcbc5; font-size: .62rem; font-weight: 850; letter-spacing: .06em; text-transform: uppercase; }
      .decision-map-status strong { display: block; margin-top: 2px; color: #fff; font-size: 1.06rem; }
      .decision-map-status.prepared { border-bottom: 4px solid #6eaa55; }
      .decision-map-status.vulnerable { border-bottom: 4px solid #d46a4d; }
      .decision-preparation-review {
        top: 78px;
        right: clamp(12px, 2vw, 28px);
        width: min(360px, calc(100% - 28px));
        max-height: min(54%, 420px);
        margin: 0;
        overflow: auto;
        border-radius: 8px;
      }
      .decision-preparation-review[hidden] { display: none; }
      .decision-preparation-review summary { padding: 9px 11px; color: #fff; font-size: .76rem; font-weight: 800; }
      .decision-preparation-review[open] summary { border-bottom: 1px solid rgba(255,255,255,.16); }
      .decision-preparation-review .visual-dimension-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; padding: 8px; }
      .decision-preparation-review .visual-dimension {
        min-height: 0;
        gap: 6px;
        padding: 8px;
        border-color: rgba(255,255,255,.18);
        color: #dce9e3;
        background: rgba(255,255,255,.08);
      }
      .decision-preparation-review .visual-dimension > div { color: #fff; }
      .decision-preparation-review .visual-dimension strong { font-size: .7rem; }
      .decision-preparation-review .visual-dimension-state { font-size: .8rem; }
      .decision-preparation-review .visual-dimension small { display: none; }
      .decision-action-menu {
        left: 50%;
        bottom: clamp(12px, 2vw, 24px);
        width: min(760px, calc(100% - 56px));
        padding: 7px 8px 8px;
        transform: translateX(-50%);
        border-radius: 12px;
        animation: decision-menu-enter .28s cubic-bezier(.2,.8,.2,1) both;
      }
      .decision-action-menu:has(.actions[data-action-count="1"]) { width: min(360px, calc(100% - 56px)); }
      .decision-action-menu:has(.actions[data-action-count="2"]) { width: min(500px, calc(100% - 56px)); }
      .decision-action-menu:has(.actions[data-action-count="3"]) { width: min(680px, calc(100% - 56px)); }
      .decision-action-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 5px; padding: 0 2px; }
      .decision-action-heading strong { color: #f5c66e; font-size: .7rem; letter-spacing: .08em; }
      .decision-action-heading span { color: #c5d2cc; font-size: .67rem; }
      .decision-action-menu .actions { counter-reset: decision-choice; grid-template-columns: repeat(auto-fit, minmax(168px, 205px)); justify-content: center; gap: 6px; margin: 0; }
      .decision-action-menu .actions[data-action-count="1"] { grid-template-columns: minmax(250px, 330px); }
      .decision-action-menu .action-card {
        position: relative;
        counter-increment: decision-choice;
        min-height: 0;
        gap: 4px;
        padding: 9px 42px 9px 38px;
        overflow: hidden;
        border-color: rgba(255,255,255,.2);
        border-radius: 8px;
        color: #fff;
        background:
          linear-gradient(145deg, rgba(255,255,255,.12), rgba(255,255,255,.045)),
          radial-gradient(circle at 100% 0, rgba(240,180,75,.1), transparent 45%);
        transition: transform .18s ease, border-color .18s ease, background .18s ease, box-shadow .18s ease;
        animation: decision-card-enter .3s cubic-bezier(.2,.8,.2,1) both;
      }
      .decision-action-menu .action-card::before {
        content: '';
        position: absolute;
        inset: 0 auto 0 0;
        width: 3px;
        background: #778d87;
      }
      .decision-action-menu .action-card::after {
        content: '0' counter(decision-choice);
        position: absolute;
        top: 7px;
        left: 7px;
        width: 22px;
        height: 22px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(245,198,110,.52);
        border-radius: 6px;
        color: #f5c66e;
        background: rgba(7,23,38,.54);
        font-size: .62rem;
        font-weight: 900;
        letter-spacing: .04em;
      }
      .decision-action-menu .action-card:has(button:not(:disabled))::before { background: #d88a32; }
      .decision-action-menu .action-card:has(button:not(:disabled)):hover,
      .decision-action-menu .action-card:has(button:not(:disabled)):focus-within {
        transform: translateY(-2px);
        border-color: rgba(245,198,110,.62);
        background: linear-gradient(150deg, rgba(244,190,96,.16), rgba(255,255,255,.07));
        box-shadow: 0 10px 22px rgba(2,10,16,.24);
      }
      .decision-action-menu .action-card:nth-child(2) { animation-delay: .035s; }
      .decision-action-menu .action-card:nth-child(3) { animation-delay: .07s; }
      .decision-action-menu .action-card:nth-child(4) { animation-delay: .105s; }
      .action-card-icon {
        position: absolute;
        top: 7px;
        right: 7px;
        width: 28px;
        height: 28px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(211,229,220,.25);
        border-radius: 8px;
        color: #dfe9e4;
        background: rgba(4,18,27,.45);
      }
      .action-card-icon svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
      .decision-action-menu .action-card:has(button:not(:disabled)) .action-card-icon { color: #f5c66e; border-color: rgba(245,198,110,.42); }
      .decision-action-menu .action-card h3 { margin: 0; color: #fff; font-size: .82rem; line-height: 1.2; }
      .decision-action-menu .action-card p { margin: 0; color: #d6e0dc; font-size: .78rem; line-height: 1.3; }
      .decision-action-menu .action-card small { color: #ffd2c7; font-size: .72rem; line-height: 1.25; }
      .decision-action-menu .action-card button { width: 100%; min-height: 45px; margin-top: 3px; padding-block: 7px; color: #17242d; background: #f7f4e9; font-size: .7rem; letter-spacing: .035em; text-transform: uppercase; }
      .decision-action-menu .action-card button:not(:disabled) { color: #fff; border-color: #d38a3a; background: linear-gradient(180deg, #b96211, #934406); box-shadow: 0 5px 13px rgba(0,0,0,.18); }
      .decision-outcome {
        left: clamp(12px, 2vw, 28px);
        bottom: clamp(12px, 2vw, 24px);
        width: min(760px, calc(100% - 250px));
        padding: 12px 14px;
        border-left: 5px solid #70ad80;
        border-radius: 9px;
        animation: decision-outcome-enter .3s cubic-bezier(.2,.8,.2,1) both;
      }
      .decision-outcome .decision-outcome-kicker { display: block; color: #8fc89c; font-size: .62rem; font-weight: 850; letter-spacing: .09em; text-transform: uppercase; }
      .decision-outcome strong { display: block; margin-top: 2px; color: #f5c66e; font-size: .78rem; }
      .decision-outcome p { margin: 3px 0 0; color: #f4f7f5; font-size: .86rem; line-height: 1.35; }
      .decision-advance { right: clamp(12px, 2vw, 28px); bottom: clamp(12px, 2vw, 24px); padding: 7px; border-radius: 9px; }
      .decision-advance .footer-actions { margin: 0; }
      .decision-advance .primary { min-height: 46px; }

      @keyframes decision-menu-enter {
        from { opacity: 0; translate: 0 14px; }
        to { opacity: 1; translate: 0 0; }
      }
      @keyframes decision-card-enter {
        from { opacity: 0; transform: translateY(7px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes decision-outcome-enter {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      body.gameplay-active:has(.result-screen) main { width: 100%; max-width: none; margin: 0; padding: 0; }
      .result-screen {
        position: relative;
        width: 100%;
        max-width: none;
        min-height: calc(100dvh - 62px);
        height: calc(100dvh - 62px);
        margin: 0;
        overflow-x: hidden;
        overflow-y: auto;
        border: 0;
        border-radius: 0;
        color: #f6faf7;
        background:
          linear-gradient(115deg, rgba(4,18,27,.97), rgba(7,37,36,.9) 55%, rgba(16,34,25,.9)),
          url('/images/crisis-ravine-aerial-v2.jpg') center / cover;
        box-shadow: none;
      }
      .result-screen::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(circle at 82% 14%, rgba(240,180,75,.12), transparent 34%), linear-gradient(180deg, rgba(255,255,255,.035), transparent 35%);
      }
      .result-screen .scene-content { position: relative; z-index: 1; display: grid; gap: 10px; padding: clamp(12px, 1.8vw, 24px); }
      .result-hero {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 18px;
        padding: 12px 15px;
        border: 1px solid rgba(213,229,220,.26);
        border-left: 6px solid #4f9139;
        border-radius: 12px;
        background: linear-gradient(115deg, rgba(14,42,50,.95), rgba(30,54,47,.9));
        box-shadow: 0 16px 36px rgba(0,0,0,.22), inset 0 1px rgba(255,255,255,.07);
        backdrop-filter: blur(12px);
      }
      .result-overwhelmed .result-hero { border-left-color: #b73228; }
      .result-hero h2 { margin: 0 0 3px; font-size: clamp(1.2rem, 1.65vw, 1.55rem); }
      .result-hero p:not(.eyebrow) { margin: 0; color: #d5e1dc; font-size: .84rem; line-height: 1.35; }
      .result-screen .result-layout { grid-template-columns: minmax(0, .62fr) minmax(0, 1.38fr); margin: 0; }
      .result-conditions, .result-causes { min-width: 0; }
      .result-conditions { padding: 10px; border: 1px solid rgba(213,229,220,.22); border-radius: 11px; background: rgba(4,20,29,.72); box-shadow: 0 16px 34px rgba(0,0,0,.2); backdrop-filter: blur(12px); }
      .result-conditions .visual-scene { margin: 0; }
      .result-conditions .visual-dimension-summary { grid-template-columns: 1fr; gap: 5px; }
      .result-conditions .visual-dimension { min-height: 0; padding: 7px 8px; }
      .result-causes .relations { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; }
      .result-screen .relation { min-height: 0; padding: 10px 10px 10px 44px; border-color: rgba(213,229,220,.22); color: #f8fbf9; background: linear-gradient(145deg, rgba(247,250,248,.96), rgba(226,235,231,.94)); box-shadow: 0 10px 26px rgba(0,0,0,.16); }
      .result-screen .relation::before { width: 24px; height: 24px; display: grid; place-items: center; left: 11px; top: 10px; content: '↘'; border: 1px solid #8aa096; border-radius: 7px; color: #315a4b; background: #eef4f0; }
      .result-screen .relation.decisive { grid-column: 1 / -1; }
      .final-prevention-review { margin: 0; padding: 12px; border: 1px solid rgba(213,229,220,.25); border-radius: 10px; color: #f4f8f5; background: rgba(4,20,29,.72); backdrop-filter: blur(12px); }
      .final-review-heading { display: grid; grid-template-columns: minmax(220px, .7fr) minmax(0, 1.3fr); gap: 14px; align-items: end; margin-bottom: 10px; }
      .final-review-heading h3 { margin: 0; color: #fff; font-size: .98rem; }
      .final-review-heading > p { margin: 0; color: #d6e2dc; font-size: .76rem; line-height: 1.45; }
      .final-prevention-review-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; padding: 0; }
      .final-prevention-review-grid section { padding: 10px; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; background: rgba(255,255,255,.07); }
      .final-prevention-review-grid strong { font-size: .82rem; }
      .final-prevention-review-grid section > p { margin: 5px 0 7px; color: #cbd8d2; font-size: .72rem; line-height: 1.4; }
      .final-prevention-review-grid ul { margin: 7px 0 0; padding-left: 20px; }
      .final-prevention-review-grid li { margin: 2px 0; font-size: .78rem; }
      .final-prevention-review-grid > p { grid-column: 1 / -1; margin: 0; color: #f1c97f; font-size: .78rem; }
      .relation-guidance { margin-top: 6px; padding-top: 6px; border-top: 1px solid #ced9d4; color: #29473a; font-size: .72rem; line-height: 1.38; }
      .relation-guidance strong { color: #173a30; }
      .result-screen > .scene-content > .footer-actions { margin: 0; }

      @media (min-width: 1051px) {
        body.gameplay-active { height: 100vh; overflow-y: hidden; }
        main { padding-top: 4px; padding-bottom: 0; }
        .inspection-scene { width: 100%; max-width: none; margin-inline: auto; }
        .inspection-scene .scene-workspace { display: block; margin-top: 0; }
        .inspection-scene .visual-scene[data-visual-template="territory"] .territory-map,
        .inspection-scene .visual-scene[data-visual-template="housing"] .housing-plan {
          width: 100%;
          height: 100%;
          max-height: none;
          aspect-ratio: auto;
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
          font-size: clamp(1.3rem, 1.65vw, 1.75rem);
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
        .scene:not(.inspection-scene):not(.crisis-decision-scene):not(.result-screen), .entry { width: 100%; max-width: 1480px; margin-inline: auto; }
      }

      @media (max-width: 1050px) {
        .topbar { grid-template-columns: 1fr auto; }
        .journey { grid-column: 1 / -1; grid-row: 2; }
        .topbar-actions { grid-column: 2; grid-row: 1; }
        .entry { grid-template-columns: 1fr; }
        .entry-visual { min-height: 280px; }
        .mission-briefing-shell { grid-template-columns: 1fr; }
        .mission-briefing-note { max-width: 620px; }
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
        body.gameplay-active:has(.inspection-scene) #game { height: 100%; }
        body.gameplay-active:has(.crisis-decision-scene) #game { height: 100%; }
        .decision-map-hud { width: min(540px, calc(100% - 200px)); }
        .decision-action-menu { width: min(720px, calc(100% - 24px)); }
        .result-screen .result-layout { grid-template-columns: 1fr; }
        .result-conditions .visual-dimension-summary { grid-template-columns: repeat(5, minmax(0, 1fr)); }
      }

      @media (max-width: 700px) {
        .topbar { position: static; min-height: 0; grid-template-columns: 1fr auto; gap: 8px; padding: 8px 10px; }
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
        .entry-copy { padding: 22px 18px; }
        .entry-copy h1 { font-size: clamp(1.7rem, 8vw, 2.05rem); }
        .entry-visual { min-height: 220px; padding: 16px; }
        .scene { min-height: auto; border-radius: 10px; }
        .scene-content { padding: 12px; }
        .scene.briefing { height: auto; min-height: 100%; align-items: start; padding: 10px; border-radius: 0; }
        .mission-briefing-shell { gap: 8px; }
        .mission-briefing-panel { padding: 14px; border-left-width: 4px; border-radius: 9px; }
        .mission-briefing-kicker { margin-bottom: 8px; }
        .scene.briefing h1 { margin-bottom: 7px; font-size: clamp(1.5rem, 6.5vw, 1.85rem); line-height: 1.05; }
        .scene.briefing .lead { font-size: .82rem; line-height: 1.38; }
        .mission-briefing-steps { grid-template-columns: 1fr; gap: 5px; margin-top: 12px; }
        .mission-briefing-steps li { min-height: 45px; align-items: center; padding: 7px; }
        .mission-briefing-steps small { font-size: .65rem; }
        .mission-briefing-footer { align-items: stretch; flex-direction: column; gap: 9px; margin-top: 11px; padding-top: 10px; }
        .mission-briefing-footer .footer-actions { width: 100%; }
        .mission-briefing-footer .primary { width: 100%; min-height: 44px; }
        .mission-briefing-note { padding: 11px 13px; }
        .mission-briefing-note strong { margin-top: 3px; font-size: .86rem; }
        .mission-briefing-note p { margin-top: 4px; font-size: .69rem; }
        .scene-heading { grid-template-columns: 1fr; gap: 7px; margin-bottom: 8px; }
        .scene-heading h2 { font-size: clamp(1.2rem, 5.6vw, 1.5rem); }
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
        .inspection-advance .primary { width: 100%; }
        .decision-feedback { grid-template-columns: 1fr; }
        .summary-dashboard { grid-template-columns: 1fr; }
        body.gameplay-active:has(.inspection-scene) main { padding: 0; }
        body.gameplay-active:has(.inspection-scene) #game { height: 100%; min-height: 0; }
        body.gameplay-active:has(.crisis-decision-scene) main { padding: 0; }
        body.gameplay-active:has(.crisis-decision-scene) #game { height: 100%; min-height: 0; }
        .inspection-scene .visual-canvas::before {
          inset: -24px;
          filter: blur(12px) brightness(.64) saturate(.76);
          transform: scale(1.09);
        }
        .crisis-decision-scene .visual-canvas::before {
          inset: 0;
          filter: brightness(.72) saturate(.88);
          transform: none;
        }
        .inspection-scene .visual-canvas::after,
        .crisis-decision-scene .visual-canvas::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(180deg,
            rgba(7,23,38,.26) 0,
            rgba(7,23,38,.12) calc(50% - 32vw),
            transparent calc(50% - 27.8vw),
            transparent calc(50% + 27.8vw),
            rgba(7,23,38,.12) calc(50% + 32vw),
            rgba(7,23,38,.3) 100%);
        }
        .crisis-decision-scene .visual-canvas::after {
          background: linear-gradient(180deg, rgba(4,18,27,.24), transparent 32%, transparent 64%, rgba(4,18,27,.34));
        }
        .crisis-decision-scene { border-radius: 0; }
        .decision-map-hud {
          top: 8px;
          left: 8px;
          width: calc(100% - 16px);
          padding: 8px 10px;
        }
        .decision-map-hud h2 { font-size: 1.08rem; }
        .decision-map-hud p { font-size: .72rem; }
        .decision-context { grid-template-columns: 1fr; gap: 2px; margin-top: 5px; padding-top: 5px; }
        .decision-context small { font-size: .63rem; line-height: 1.25; }
        .decision-map-status { top: 142px; right: 8px; min-width: 104px; padding: 7px 8px; }
        .decision-map-status strong { font-size: .88rem; }
        .decision-preparation-review { top: 142px; left: 8px; right: auto; width: min(205px, calc(100% - 128px)); max-height: 42%; }
        .decision-preparation-review[open] { width: calc(100% - 16px); max-height: 27%; }
        .decision-preparation-review summary { padding: 8px 9px; font-size: .68rem; }
        .decision-preparation-review .visual-dimension-summary { grid-template-columns: 1fr; }
        .decision-action-menu,
        .has-command-hero .decision-action-menu {
          left: 8px;
          right: 8px;
          bottom: 14px;
          width: auto;
          max-height: none;
          overflow: visible;
          padding: 6px;
          transform: none;
        }
        .decision-action-menu:has(.actions[data-action-count="1"]) {
          left: 50%;
          right: auto;
          width: min(326px, calc(100% - 16px));
          transform: translateX(-50%);
        }
        .decision-action-heading { position: sticky; top: -6px; z-index: 2; margin-bottom: 3px; padding: 4px 1px 5px; background: rgba(7,23,38,.98); }
        .decision-action-heading strong { font-size: .64rem; }
        .decision-action-heading span { font-size: .61rem; }
        .decision-action-menu .actions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .decision-action-menu .action-card { display: grid; grid-template-columns: 1fr; gap: 2px; padding: 7px 37px 7px 32px; }
        .decision-action-menu .action-card::after { top: 7px; left: 7px; width: 21px; height: 21px; font-size: .56rem; }
        .decision-action-menu .action-card-icon { top: 6px; right: 6px; width: 26px; height: 26px; }
        .decision-action-menu .action-card h3 { font-size: .75rem; line-height: 1.15; }
        .decision-action-menu .action-card p { font-size: .7rem; line-height: 1.2; }
        .decision-action-menu .action-card small { font-size: .65rem; line-height: 1.2; }
        .decision-action-menu .action-card:only-child { grid-column: 1 / -1; }
        .decision-action-menu .action-card:last-child:nth-child(odd):not(:only-child) {
          grid-column: 1 / -1;
          width: 100%;
        }
        .decision-action-menu .action-card h3,
        .decision-action-menu .action-card p,
        .decision-action-menu .action-card small { grid-column: 1; }
        .decision-action-menu .action-card p {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .decision-action-menu .action-card small {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .decision-action-menu .action-card button { grid-column: 1; width: 100%; min-width: 0; min-height: 45px; margin: 3px 0 0; }
        .decision-outcome { left: 8px; right: 8px; bottom: 70px; width: auto; padding: 10px 11px; }
        .decision-outcome p { font-size: .78rem; }
        .decision-advance { right: 8px; bottom: 8px; left: 8px; }
        .decision-advance .primary { width: 100%; }
        .result-hero { grid-template-columns: 1fr; gap: 8px; }
        .result-screen { height: auto; min-height: calc(100dvh - 112px); overflow: visible; }
        .result-hero .scene-state-badge { width: 100%; }
        .result-screen .result-layout { grid-template-columns: 1fr; }
        .result-conditions .visual-dimension-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .result-causes .relations { grid-template-columns: 1fr; }
        .result-screen .relation.decisive { grid-column: auto; }
        .final-review-heading { grid-template-columns: 1fr; gap: 5px; }
        .final-prevention-review-grid { grid-template-columns: 1fr; }
        .final-prevention-review-grid > p { grid-column: 1; }
        .inspection-scene { border-radius: 0; }
        .inspection-map-hud {
          top: 8px;
          left: 8px;
          width: calc(100% - 98px);
          padding: 8px 10px;
        }
        .inspection-map-hud h2 { font-size: 1.08rem; }
        .inspection-map-hud p { max-height: 2.7em; overflow: hidden; font-size: .72rem; }
        .inspection-map-progress { top: 8px; right: 8px; min-width: 78px; padding: 7px 8px; }
        .inspection-map-progress small { font-size: .52rem; }
        .inspection-map-progress strong { font-size: .96rem; }
        .inspection-response {
          left: 8px;
          bottom: 8px;
          width: calc(100% - 16px);
          grid-template-columns: 1fr;
        }
        .inspection-response .inspection-confirmation { border-right: 0; border-bottom: 1px solid rgba(255,255,255,.16); }
        .inspection-response .inspection-selection { display: none; }
        .inspection-advance { right: 8px; bottom: 8px; }
        .inspection-scene:has(.inspection-advance) .inspection-response { right: 164px; width: auto; }
        .inspection-scene .visual-scene[data-visual-template="territory"] .visual-card-layer,
        .inspection-scene .visual-scene[data-visual-template="housing"] .visual-card-layer { position: absolute; inset: 0; left: 0 !important; right: 0 !important; padding: 0; }
        .inspection-scene .visual-scene[data-visual-template="territory"] .visual-hover-card,
        .inspection-scene .visual-scene[data-visual-template="housing"] .visual-hover-card {
          position: absolute;
          right: auto !important;
          bottom: 8px;
          left: 8px !important;
          top: auto;
          width: min(264px, calc(100% - 16px)) !important;
          max-height: 42%;
          margin: 0;
          padding: 9px;
          box-shadow: 0 14px 36px rgba(3, 13, 20, .48);
        }
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
          <div class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 28"><path d="M13.7 1.5c.8 4.7-3.1 6.6-.9 10.2 1.2-1.8 3.2-2.8 3.7-5.7 4.4 4.1 5.5 7.7 3.8 12A8.9 8.9 0 0 1 12 26.5a8.3 8.3 0 0 1-8.3-8.4c0-4 2.2-7.3 6.3-10.6-.2 3.2.7 5 2 6.1.7-3 1.2-5.8 1.7-12.1Z"/><path d="M12.4 14.2c2.5 2.4 3.1 4.4 2.1 6.5A3.2 3.2 0 0 1 11.6 23a3.2 3.2 0 0 1-3.2-3.3c0-1.8 1-3.4 2.7-4.9-.1 1.5.3 2.4.9 2.9.2-1.2.3-2.3.4-3.5Z" fill="#fff3c4"/></svg></div>
          <div class="brand-copy"><strong>Apaga las llamas</strong><small>Prepara hoy, protege mañana</small></div>
        </div>
        <nav class="journey" aria-label="Progreso de la partida">
          <div class="stage" data-stage-id="territory"><span class="stage-dot">1</span><span class="stage-label">Monte</span></div>
          <div class="stage" data-stage-id="housing"><span class="stage-dot">2</span><span class="stage-label">Vivienda</span></div>
          <div class="stage" data-stage-id="crisis"><span class="stage-dot">3</span><span class="stage-label">Incendio</span></div>
          <div class="stage" data-stage-id="result"><span class="stage-dot">4</span><span class="stage-label">Final</span></div>
        </nav>
        <div class="topbar-actions"><button class="ghost-button" id="restart-button" type="button" disabled>↻ Reiniciar</button></div>
      </header>

      <main>
        <div id="game" aria-live="polite">
          <section class="entry" aria-labelledby="entry-title">
            <div class="entry-copy">
              <p class="eyebrow">Simulador interactivo</p>
              <h1 id="entry-title">Prepara el monte antes de que llegue el fuego</h1>
              <p class="lead">Prepara las fincas, los caminos y una vivienda próxima al monte. Después comprobarás cómo cada decisión facilita —o limita— la respuesta de los equipos de emergencia.</p>
              <div class="entry-meta" aria-label="Información de la partida">
                <span>Recorrido guiado</span>
                <span id="entry-duration">Duración según recorrido</span>
              </div>
              <div class="entry-actions"><button class="primary" id="start-session-button" type="button">Comenzar partida</button></div>
              <p class="entry-note">El juego te explicará cada paso antes de que elijas.</p>
            </div>
            <div class="entry-visual" role="img" aria-label="Monte, barranco y viviendas del juego">
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
          let payload = await response.json();
          if (!response.ok) throw new Error(requestErrorMessage(payload, response.status));
          payload = await advancePastInterstitials(payload);
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

      async function advancePastInterstitials(payload) {
        let view = payload;
        let guard = 0;
        while (view && view.scene && (view.scene.type === 'summary' || view.scene.type === 'router') && view.scene.canAdvance && guard < 3) {
          const response = await fetch('/api/game-sessions/' + encodeURIComponent(view.session.id) + '/advance', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{}'
          });
          const next = await response.json();
          if (!response.ok) throw new Error(requestErrorMessage(next, response.status));
          view = next;
          guard += 1;
        }
        return view;
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
          entryDuration.textContent = 'Duración según recorrido';
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
            button.textContent = action.selected ? 'Mejora aplicada' : 'Aplicar mejora';
          }
        });
      }

      function decisionActionIcon(actionId) {
        const id = String(actionId || '');
        let path = '<path d="M12 2.8 20 6v5.2c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6Z" /><path d="m8.4 12 2.2 2.2 4.8-5" />';
        if (/acceso|camino|corredor|paso|reubicar|cerrar/.test(id)) {
          path = '<path d="M5 21 9 3M15 21l-2-9M12 7l-1-4M8 16h8" /><path d="M6.5 10h2M14 15h2" />';
        } else if (/replegar|salida|flanco|retirada/.test(id)) {
          path = '<path d="M20 11a8 8 0 1 1-3-6.2" /><path d="M20 4v7h-7" /><path d="m8 12 2.5 2.5L16 9" />';
        } else if (/fuego|incendio|defender|intervenir|ataque|extin/.test(id)) {
          path = '<path d="M13.5 2.5c.8 4-2.8 5.4-.7 8.4 1.2-1.5 2.8-2.3 3.2-4.7 3.5 3.3 4.4 6 3.1 9.2A7.7 7.7 0 0 1 12 21a7 7 0 0 1-7-7.1c0-3.2 1.8-6 5.3-8.8-.2 2.7.6 4.2 1.7 5.1.6-2.5 1-4.8 1.5-7.7Z" />';
        } else if (/observar|verificar|evaluar|vigilar|mantener/.test(id)) {
          path = '<circle cx="11" cy="11" r="6" /><path d="m16 16 5 5M8.5 11h5M11 8.5v5" />';
        }
        return '<span class="action-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24">' + path + '</svg></span>';
      }

      function actionCards(scene) {
        return '<div class="actions" data-action-count="' + escapeHtml(String(scene.actions.length)) + '">' + scene.actions.map(function (action) {
          const selected = action.selected ? ' selected' : '';
          const disabled = !action.available ? ' disabled' : '';
          const label = action.selected ? 'Aplicada' : 'Elegir';
          return '<article class="action-card' + selected + '" data-action-card-id="' + escapeHtml(action.id) + '">' +
            decisionActionIcon(action.id) +
            '<h3>' + escapeHtml(action.label) + '</h3>' +
            '<p>' + escapeHtml(action.description) + '</p>' +
            (action.unavailableReason ? '<small>' + escapeHtml(action.unavailableReason) + '</small>' : '') +
            '<button class="secondary action-button" data-action-id="' + escapeHtml(action.id) + '" type="button" aria-label="' + escapeHtml(label + ': ' + action.label) + '"' + disabled + '>' + label + '</button>' +
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
          ? '<div class="inspection-confirmation has-change"><div class="inspection-confirmation-copy"><strong>Cambio en el mapa</strong><p>' + escapeHtml(scene.feedback) + '</p></div></div>'
          : '<div class="inspection-confirmation is-empty"><div class="inspection-confirmation-copy"><strong>Elige en el mapa</strong><p>Toca un punto del mapa para saber qué ocurre allí y qué puedes mejorar.</p></div></div>';
        return '<section class="inspection-response' + (!scene.feedback && selected.length === 0 ? ' is-initial' : '') + '" role="status" aria-live="polite" aria-atomic="true">' + confirmation +
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
        return '<section class="scene briefing" aria-labelledby="mission-briefing-title"><div class="mission-briefing-shell"><div class="mission-briefing-panel">' +
          '<div class="mission-briefing-kicker"><span>Misión 01</span><span>Prevención</span></div>' +
          '<div class="scene-heading-copy"><h1 id="mission-briefing-title">' + escapeHtml(scene.title) + '</h1><p class="lead">' + escapeHtml(scene.mission) + '</p></div>' +
          '<ol class="mission-briefing-steps" aria-label="Fases de la misión"><li><span><strong>Observa</strong><small>Localiza las condiciones de riesgo.</small></span></li><li><span><strong>Decide</strong><small>Distribuye cinco actuaciones en dos zonas.</small></span></li><li><span><strong>Comprueba</strong><small>Responde a la emergencia y revisa el resultado.</small></span></li></ol>' +
          '<div class="mission-briefing-footer"><p><strong>Objetivo:</strong> mejorar las condiciones sin presentar el territorio como completamente seguro.</p>' + advanceButton(scene) + '</div></div>' +
          '<aside class="mission-briefing-note" aria-label="Cómo funciona la partida"><span>Clave de la misión</span><strong>Observa · decide · comprueba</strong><p>Cada actuación deja un cambio visible y modifica las opciones de los equipos durante el incendio.</p></aside></div></section>';
      }

      function renderInspection(scene) {
        const count = scene.selectedCount + ' / ' + scene.actionQuota + ' mejoras';
        const main = '<div class="inspection-stage">' + visualMarkup() +
          '<header class="inspection-map-hud" data-inspection-overlay><p class="eyebrow">Prepara la zona</p><h2 id="inspection-map-heading">' + escapeHtml(scene.title) + '</h2><p>' + escapeHtml(scene.objective) + '</p></header>' +
          '<div class="inspection-map-progress" data-inspection-overlay aria-label="' + escapeHtml(count) + '"><small>Mejoras</small><strong>' + escapeHtml(scene.selectedCount + ' / ' + scene.actionQuota) + '</strong></div>' +
          '<div class="inspection-hidden-menu" data-visual-menu-slot hidden></div>' +
          inspectionResponse(scene).replace('<section class="inspection-response', '<section data-inspection-overlay class="inspection-response') +
          (scene.canAdvance ? '<div class="inspection-advance" data-inspection-overlay>' + advanceButton(scene) + '</div>' : '') + '</div>';
        return '<section class="scene inspection-scene" aria-labelledby="inspection-map-heading"><div class="scene-content">' +
          '<div class="scene-workspace"><div class="scene-main">' + main + '</div></div></div></section>';
      }

      function renderSummary(scene) {
        const main = '<div class="summary-dashboard">' + preventionAreaReview(scene) +
          '<div class="summary-emergency"><h3 class="balance-heading">Así empieza la emergencia</h3>' + visualMarkup() + '</div></div>';
        const intro = '<div class="objective"><strong>Qué ocurre ahora:</strong> lo que hiciste antes cambia las opciones de los bomberos.</div>' +
          '<div class="balance-caution"><strong>Importante:</strong> las mejoras reducen el peligro y amplían las opciones de respuesta, pero ninguna vivienda queda totalmente segura.</div>';
        return '<section class="scene scene-with-side-panel"><div class="scene-content">' + heading(scene, 'Tus mejoras', '') +
          sceneWorkspace(main, 'Balance preventivo', intro, advanceButton(scene), 'Ver balance y continuar') + '</div></section>';
      }

      function renderDecision(scene) {
        const branch = currentView.session.branch;
        const hasCrisisMap = currentView.visual && currentView.visual.templateId === 'crisis';
        const selectedAction = scene.actions.find(function (action) { return action.selected; });
        const badge = branch ? '<div class="decision-map-status ' + escapeHtml(branch) + '" data-decision-overlay><small>Margen de actuación</small><strong>' + (branch === 'prepared' ? 'Amplio' : 'Limitado') + '</strong></div>' : '';
        const hud = '<header class="decision-map-hud" data-decision-overlay><p class="eyebrow">EMERGENCIA' + (scene.difficulty ? ' · NIVEL ' + escapeHtml(String(scene.difficulty).toLocaleUpperCase('es')) : '') + '</p><h2 id="decision-map-heading">' + escapeHtml(scene.title) + '</h2><p>' + escapeHtml(scene.body || '') + '</p><div class="decision-context"><span>Condición operativa</span><small>' + escapeHtml(scene.context) + '</small></div></header>';
        const preparation = '<details class="decision-preparation-review" data-decision-overlay><summary>Ver condiciones de partida</summary><div data-crisis-condition-slot></div></details>';
        const choice = scene.feedback ? '' : '<section class="decision-action-menu" data-decision-overlay aria-label="Elige qué hacen los equipos"><div class="decision-action-heading"><strong>DECISIÓN OPERATIVA</strong><span>Selecciona la respuesta del equipo.</span></div>' + actionCards(scene) + '</section>';
        const outcome = scene.feedback
          ? '<section class="decision-outcome" data-decision-overlay role="status" aria-live="polite"><span class="decision-outcome-kicker">Resolución</span><strong>' + (selectedAction ? escapeHtml(selectedAction.label) : 'Respuesta aplicada') + '</strong><p>' + escapeHtml(scene.feedback) + '</p></section>'
          : '';
        const next = scene.canAdvance ? '<div class="decision-advance" data-decision-overlay>' + advanceButton(scene) + '</div>' : '';
        return '<section class="scene crisis-decision-scene" aria-labelledby="decision-map-heading"><div class="scene-content"><div class="decision-stage ' + (hasCrisisMap ? 'has-crisis-map' : 'has-command-hero') + '">' + visualMarkup() + hud + badge + preparation + choice + outcome + next + '</div></div></section>';
      }

      function renderRouter(scene) {
        return '<section class="scene scene-with-side-panel"><div class="scene-content"><div class="router-mark" aria-hidden="true">↝</div>' + heading(scene, 'El juego comprueba tus decisiones', '') +
          sceneWorkspace(visualMarkup(), 'Siguiente paso', '', advanceButton(scene), 'Ver siguiente paso') + '</div></section>';
      }

      function joinRecommendations(labels) {
        if (!labels || labels.length === 0) return '';
        if (labels.length === 1) return labels[0];
        return labels.slice(0, -1).join(', ') + ' y ' + labels[labels.length - 1];
      }

      function relationRecommendation(relation) {
        const guidance = {
          'fuel-load': 'Revisa la zona después de podas, temporales y periodos secos. Las ramas y la hierba retiradas no deben volver a acumularse junto a caminos o viviendas.',
          'fuel-continuity': 'Comprueba cada temporada que siguen existiendo espacios entre la vegetación baja, las ramas y las copas. Una separación que se abandona puede desaparecer con el nuevo crecimiento.',
          'operational-access': 'Mantén los bordes sin obstáculos y deja espacio para que un vehículo pueda entrar, girar y salir. Un camino abierto también debe conservar una salida alternativa cuando sea posible.',
          defensibility: 'Revisa primero el entorno inmediato de cada vivienda: vegetación próxima, ramas bajas y acceso. Estas mejoras reducen la exposición, pero no justifican permanecer allí si se ordena evacuar.',
          'attack-opportunity': 'Piensa en las medidas como un conjunto que necesita mantenimiento. Cuantas más condiciones favorables coincidan, más opciones tendrán los equipos para trabajar sin perder su salida.'
        };
        const base = guidance[relation.id] || 'Revisa esta condición antes de la época de mayor riesgo y mantén la mejora a lo largo del año.';
        if (relation.causeType === 'Quedó pendiente' && relation.alternativeActionLabels.length > 0) {
          return 'Para mejorar esta condición, prioriza ' + joinRecommendations(relation.alternativeActionLabels) + '. ' + base;
        }
        return 'La decisión ayudó en esta partida, pero necesita seguimiento. ' + base;
      }

      function renderResult(scene) {
        const badge = '<div class="scene-state-badge ' + (scene.variant === 'contained' ? 'prepared' : 'vulnerable') + '"><small>Estado final</small><strong>' + (scene.variant === 'contained' ? 'Contenido' : 'Fuera de capacidad') + '</strong></div>';
        const relations = '<section class="result-causes"><p class="eyebrow">Por qué ocurrió</p><div class="relations" aria-label="Cómo influyeron tus decisiones">' + scene.relations.map(function (relation) {
          return '<article class="relation' + (relation.branchDecisive ? ' decisive' : '') + '"><h3>' + escapeHtml(relation.title) + '</h3>' +
            '<div class="cause-list">' + escapeHtml(relation.causeType) + ' → ' + relation.causeActionLabels.map(escapeHtml).join(' · ') + '</div>' +
            '<p>' + escapeHtml(relation.effect) + '</p><div class="relation-guidance"><strong>Qué conviene hacer:</strong> ' + escapeHtml(relationRecommendation(relation)) + '</div></article>';
        }).join('') + '</div></section>';
        const conditions = '<section class="result-conditions"><p class="eyebrow">Así empezó la emergencia</p>' + visualMarkup() + '</section>';
        const main = '<div class="result-layout">' + conditions + relations + '</div>';
        const hero = '<header class="result-hero"><div><p class="eyebrow">BALANCE DE LA PARTIDA</p><h2>' + escapeHtml(scene.title) + '</h2><p>' + escapeHtml(scene.closing) + '</p></div>' + badge + '</header>';
        const review = '<section class="final-prevention-review" aria-labelledby="final-recommendations-title"><header class="final-review-heading"><div><p class="eyebrow">Recomendaciones</p><h3 id="final-recommendations-title">Qué conviene mantener y revisar</h3></div><p>La prevención continúa después de esta partida. Las actuaciones deben revisarse de forma periódica porque la vegetación vuelve a crecer, los caminos pueden estrecharse y aparecen nuevos restos secos.</p></header><div class="final-prevention-review-grid"><section><strong>Mantén las mejoras realizadas</strong><p>Comprueba que siguen funcionando y repítelas cuando el entorno vuelva a cambiar.</p><ul>' + currentView.session.preventionReview.map(function (entry) { return '<li>' + escapeHtml(entry.label) + '</li>'; }).join('') + '</ul></section>' +
          (currentView.session.pendingPreventionReview.length === 0 ? '' : '<section><strong>Prioriza lo que quedó pendiente</strong><p>Estas condiciones pueden reducir las opciones de respuesta si no se corrigen antes de la próxima época de riesgo.</p><ul>' + currentView.session.pendingPreventionReview.map(function (entry) { return '<li>' + escapeHtml(entry.label) + '</li>'; }).join('') + '</ul></section>') +
          '<section><strong>Si el incendio ya está cerca</strong><p>No empieces a podar, retirar vegetación ni despejar caminos. Sigue los avisos oficiales, mantén libres los accesos y abandona la zona cuando lo indiquen los servicios de emergencia.</p></section><p>Preparar el entorno reduce el riesgo y mejora las condiciones de trabajo, pero nunca garantiza una protección total.</p></div></section>';
        return '<section class="scene result-screen result-' + escapeHtml(scene.variant) + '"><div class="scene-content">' + hero + main + review + advanceButton(scene) + '</div></section>';
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
      const visualCardAnimationTimers = new WeakMap();
      let sidePanelReturnFocus = null;
      let sidePanelCleanup = null;

      function arrangeVisualSideMenu() {
        const slot = game.querySelector('[data-visual-menu-slot]');
        const visualScene = game.querySelector('.visual-scene');
        if (!slot || !visualScene) return;
        const menu = visualScene.querySelector('.territory-map-key, .housing-map-key');
        if (menu) slot.appendChild(menu);
        slot.hidden = true;
        const canvas = visualScene.querySelector('.visual-canvas');
        if (canvas) game.querySelectorAll('[data-inspection-overlay]').forEach(function (overlay) { canvas.appendChild(overlay); });
        fitInspectionMap();
      }

      function arrangeDecisionStage() {
        const stage = game.querySelector('.decision-stage');
        if (!stage) return;
        const preparation = stage.querySelector('.decision-preparation-review');
        const conditionSlot = stage.querySelector('[data-crisis-condition-slot]');
        const dimensionSummary = stage.querySelector('.visual-dimension-summary');
        if (preparation && conditionSlot && dimensionSummary) conditionSlot.appendChild(dimensionSummary);
        else if (preparation) preparation.hidden = true;
        const canvas = stage.querySelector('.visual-canvas');
        if (canvas) {
          stage.querySelectorAll('[data-decision-overlay]').forEach(function (overlay) { canvas.appendChild(overlay); });
          const map = canvas.querySelector('.crisis-svg');
          if (map) fitCrisisMap(map, canvas);
        }
      }

      function fitFullscreenMap(map, canvas) {
        const ratio = canvas && canvas.clientHeight > 0 ? canvas.clientWidth / canvas.clientHeight : window.innerWidth / window.innerHeight;
        map.setAttribute('preserveAspectRatio', ratio >= 1.25 ? 'xMidYMid slice' : 'xMidYMid meet');
      }

      function fitInspectionMap() {
        game.querySelectorAll('.inspection-scene .territory-map, .inspection-scene .housing-plan').forEach(function (map) {
          fitFullscreenMap(map, map.closest('.visual-canvas'));
        });
      }

      function fitCrisisMap(map, canvas) {
        const ratio = canvas && canvas.clientHeight > 0 ? canvas.clientWidth / canvas.clientHeight : window.innerWidth / window.innerHeight;
        const sceneId = map.closest('.visual-scene')?.getAttribute('data-visual-scene-id') || '';
        map.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        if (ratio >= 1.05) {
          map.setAttribute('viewBox', '0 0 900 500');
          return;
        }
        const focusWidth = Math.max(250, Math.min(420, Math.round(ratio * 500)));
        let focusCenter = 452;
        if (sceneId.includes('ravine-fire')) focusCenter = 520;
        if (sceneId.includes('crown-fire')) focusCenter = 730;
        if (sceneId.includes('housing-defense')) focusCenter = 750;
        const focusX = Math.max(0, Math.min(900 - focusWidth, Math.round(focusCenter - focusWidth / 2)));
        map.setAttribute('viewBox', focusX + ' 0 ' + focusWidth + ' 500');
      }

      function fitPlayableMaps() {
        fitInspectionMap();
        game.querySelectorAll('.crisis-decision-scene .crisis-svg').forEach(function (map) {
          fitCrisisMap(map, map.closest('.visual-canvas'));
        });
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

      function closeVisualCards(exceptCard) {
        const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.visual-hover-card').forEach(function (card) {
          if (card === exceptCard) return;
          const animationTimer = visualCardAnimationTimers.get(card);
          if (animationTimer) window.clearTimeout(animationTimer);
          visualCardAnimationTimers.delete(card);
          if (card.hidden || reducedMotion) {
            card.hidden = true;
            card.classList.remove('is-closing');
            return;
          }
          card.classList.add('is-closing');
          const timer = window.setTimeout(function () {
            card.hidden = true;
            card.classList.remove('is-closing');
            visualCardAnimationTimers.delete(card);
          }, 150);
          visualCardAnimationTimers.set(card, timer);
        });
        document.querySelectorAll('[data-visual-element-id]').forEach(function (element) {
          const staysOpen = Boolean(exceptCard && element.getAttribute('aria-controls') === exceptCard.id);
          element.setAttribute('aria-expanded', staysOpen ? 'true' : 'false');
          element.classList.toggle('is-context-active', staysOpen);
        });
      }

      function cancelVisualCardClose() {
        if (visualCardCloseTimer !== null) window.clearTimeout(visualCardCloseTimer);
        visualCardCloseTimer = null;
      }

      function scheduleVisualCardClose() {
        if (usesSideDrawer() && document.getElementById('scene-side-panel')?.classList.contains('is-open')) return;
        if (document.querySelector('.inspection-scene')) return;
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
          card.style.right = '8px';
          card.style.left = '8px';
          card.style.top = 'auto';
          card.style.bottom = '8px';
          return;
        }
        window.requestAnimationFrame(function () {
          const canvasRect = canvas.getBoundingClientRect();
          const anchor = element.querySelector('.map-pin') || element;
          const elementRect = anchor.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          const gap = 14;
          const clampLeft = function (value) { return Math.max(gap, Math.min(value, canvasRect.width - cardRect.width - gap)); };
          const clampTop = function (value) { return Math.max(gap, Math.min(value, canvasRect.height - cardRect.height - gap)); };
          const anchorLeft = elementRect.left - canvasRect.left;
          const anchorTop = elementRect.top - canvasRect.top;
          const anchorCenterX = anchorLeft + elementRect.width / 2;
          const anchorCenterY = anchorTop + elementRect.height / 2;
          const candidates = [
            { left: elementRect.right - canvasRect.left + gap, top: anchorCenterY - cardRect.height / 2 },
            { left: anchorLeft - cardRect.width - gap, top: anchorCenterY - cardRect.height / 2 },
            { left: anchorCenterX - cardRect.width / 2, top: elementRect.bottom - canvasRect.top + gap },
            { left: anchorCenterX - cardRect.width / 2, top: anchorTop - cardRect.height - gap }
          ].map(function (candidate, index) {
            return { left: clampLeft(candidate.left), top: clampTop(candidate.top), index: index };
          });
          const obstacles = Array.from(canvas.querySelectorAll('.map-pin, [data-inspection-overlay]')).filter(function (obstacle) {
            return !element.contains(obstacle) && !card.contains(obstacle) && obstacle !== card;
          }).map(function (obstacle) {
            const rect = obstacle.getBoundingClientRect();
            return {
              left: rect.left - canvasRect.left,
              right: rect.right - canvasRect.left,
              top: rect.top - canvasRect.top,
              bottom: rect.bottom - canvasRect.top
            };
          });
          const scored = candidates.map(function (candidate) {
            const candidateRect = {
              left: candidate.left,
              right: candidate.left + cardRect.width,
              top: candidate.top,
              bottom: candidate.top + cardRect.height
            };
            const overlap = obstacles.reduce(function (total, obstacle) {
              const width = Math.max(0, Math.min(candidateRect.right, obstacle.right) - Math.max(candidateRect.left, obstacle.left));
              const height = Math.max(0, Math.min(candidateRect.bottom, obstacle.bottom) - Math.max(candidateRect.top, obstacle.top));
              return total + width * height;
            }, 0);
            return { left: candidate.left, top: candidate.top, score: overlap + candidate.index };
          }).sort(function (leftCandidate, rightCandidate) { return leftCandidate.score - rightCandidate.score; });
          const best = scored[0];
          card.style.right = 'auto';
          card.style.bottom = '';
          card.style.left = Math.round(best.left) + 'px';
          card.style.top = Math.round(best.top) + 'px';
        });
      }

      function closeVisualCardAndRestoreFocus(card) {
        const controller = Array.from(document.querySelectorAll('[data-visual-element-id]')).find(function (element) {
          return element.getAttribute('aria-controls') === card.id;
        });
        closeVisualCards();
        if (controller) controller.focus();
      }

      function openVisualCard(element) {
        cancelVisualCardClose();
        const cardId = element.getAttribute('aria-controls');
        const card = cardId ? document.getElementById(cardId) : null;
        if (!card) return null;
        closeVisualCards(card);
        const animationTimer = visualCardAnimationTimers.get(card);
        if (animationTimer) window.clearTimeout(animationTimer);
        visualCardAnimationTimers.delete(card);
        card.classList.remove('is-closing');
        card.hidden = false;
        element.setAttribute('aria-expanded', 'true');
        element.classList.add('is-context-active');
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
        const inspectionCanvas = card.closest('.inspection-scene .visual-canvas');
        if (inspectionCanvas) {
          inspectionCanvas.scrollLeft = 0;
          inspectionCanvas.scrollTop = 0;
        }
        if (card.classList.contains('action-card')) {
          const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          card.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      }

      function wireCommands() {
        document.querySelectorAll('.action-button').forEach(function (button) {
          button.addEventListener('click', async function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (busy || button.disabled) return;
            const actionId = button.dataset.actionId;
            if (!actionId) return;
            button.disabled = true;
            button.setAttribute('aria-busy', 'true');
            const applied = await request('/api/game-sessions/' + encodeURIComponent(sessionId) + '/actions', { method: 'POST', body: JSON.stringify({ actionId: actionId }) });
            if (!applied) button.disabled = false;
            if (!applied) button.removeAttribute('aria-busy');
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
          card.addEventListener('pointerdown', function (event) { event.stopPropagation(); });
          card.addEventListener('click', function (event) { event.stopPropagation(); });
          card.addEventListener('mouseenter', cancelVisualCardClose);
          card.addEventListener('mouseleave', scheduleVisualCardClose);
          card.addEventListener('focusin', cancelVisualCardClose);
          card.addEventListener('focusout', scheduleVisualCardClose);
          card.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape') return;
            event.preventDefault();
            closeVisualCardAndRestoreFocus(card);
          });
          const close = card.querySelector('.visual-card-close');
          if (close) close.addEventListener('click', function () { closeVisualCardAndRestoreFocus(card); });
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
        arrangeDecisionStage();
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
      window.addEventListener('resize', fitPlayableMaps);
      startButton.addEventListener('click', startSession);
      setSessionChrome(false);
      hydrateEntryContext();
    </script>
  </body>
</html>`;
}
