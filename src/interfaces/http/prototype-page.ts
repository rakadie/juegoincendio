export function renderPrototypePage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>¡Apaga las llamas!</title>
    <style>
      :root {
        --bg-1: #141817;
        --bg-2: #202722;
        --panel: #151d1adf;
        --panel-2: #23312bde;
        --stroke: #52625b;
        --text: #f1f3ed;
        --muted: #b7c1bb;
        --primary: #f1bd58;
        --primary-2: #52b9aa;
        --accent: #9fd8cf;
        --ok: #22c55e;
        --warn: #f59e0b;
        --bad: #ef4444;
      }

      * { box-sizing: border-box; }
      html, body {
        width: 100%;
        min-height: 100%;
        overflow-x: hidden;
      }

      body {
        margin: 0;
        font-family: Inter, Segoe UI, Roboto, Arial, sans-serif;
        color: var(--text);
        background: linear-gradient(165deg, var(--bg-1) 0%, var(--bg-2) 62%, #191b19 100%);
        background-attachment: fixed;
      }

      .layout {
        position: relative;
        width: 100%;
        max-width: 100%;
        min-height: 100%;
        display: grid;
        grid-template-columns: 250px minmax(0, 1fr);
      }

      .sidebar {
        border-right: 1px solid #39453f;
        background: #101613f2;
        backdrop-filter: blur(6px);
        padding: 20px 16px;
        display: grid;
        align-content: start;
        gap: 14px;
        min-width: 0;
      }

      .brand {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0;
      }

      .subtitle {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.4;
      }

      .season-pill {
        border: 1px solid #61756c;
        border-radius: 999px;
        width: fit-content;
        padding: 6px 11px;
        font-size: 12px;
        color: #d7e8e3;
        background: #23312b;
      }

      .nav {
        display: grid;
        gap: 9px;
        min-width: 0;
        max-width: 100%;
      }

      .stage-btn {
        width: 100%;
        border: 1px solid #46564f;
        border-radius: 8px;
        padding: 11px 12px;
        cursor: pointer;
        text-align: left;
        color: var(--text);
        background: #1a231fa0;
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
        background: #24483f;
        box-shadow: 0 0 0 1px #52b9aa35 inset;
      }

      .stage-btn.locked {
        opacity: 0.58;
        cursor: not-allowed;
      }

      .stage-btn:disabled {
        pointer-events: none;
      }

      .content {
        position: relative;
        width: 100%;
        max-width: 100%;
        padding: 22px;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 16px;
        min-width: 0;
      }

      .card {
        background: var(--panel);
        border: 1px solid var(--stroke);
        border-radius: 8px;
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
        width: 100%;
        max-width: 100%;
        min-width: 0;
      }

      .hidden {
        display: none;
      }

      .screen-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: 1.45fr 1fr;
      }

      .briefing-hero {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        min-height: min(680px, calc(100vh - 130px));
        border: 1px solid #59665f;
        border-radius: 8px;
        padding: clamp(24px, 5vw, 64px);
        display: grid;
        align-items: end;
        overflow: hidden;
        background:
          linear-gradient(90deg, rgba(9, 13, 11, 0.94) 0%, rgba(9, 13, 11, 0.72) 56%, rgba(9, 13, 11, 0.28) 100%),
          linear-gradient(0deg, rgba(9, 13, 11, 0.78), transparent 52%),
          url('/images/operational-command-hero.png') center / cover;
        box-shadow: 0 18px 42px rgba(0, 0, 0, 0.34);
      }

      .briefing-copy {
        width: min(680px, 100%);
        min-width: 0;
        display: grid;
        align-content: end;
        gap: 16px;
      }

      .briefing-kicker {
        margin: 0;
        color: #f1bd58;
        font-size: 13px;
        font-weight: 750;
        text-transform: uppercase;
      }

      .briefing-copy h2 {
        max-width: 650px;
        margin: 0;
        font-size: clamp(34px, 5vw, 58px);
        line-height: 1.06;
        overflow-wrap: anywhere;
        text-shadow: 0 3px 20px rgba(0, 0, 0, 0.74);
      }

      .briefing-copy > p:not(.briefing-kicker) {
        max-width: 620px;
        margin: 0;
        color: #e5e9e3;
        font-size: 17px;
        line-height: 1.55;
        text-shadow: 0 2px 14px rgba(0, 0, 0, 0.74);
      }

      .button-row {
        width: 100%;
        min-width: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      button.primary,
      button.secondary,
      button.ghost,
      .context-trigger {
        min-height: 44px;
        border-radius: 8px;
        border: 1px solid transparent;
        font-size: 14px;
        cursor: pointer;
        padding: 10px 14px;
        color: #e6f2ff;
      }

      button.primary {
        border-color: #f1bd58;
        color: #211803;
        background: #f1bd58;
        font-weight: 750;
      }

      button.primary:hover {
        filter: brightness(1.1);
      }

      button.primary:disabled {
        cursor: wait;
        filter: grayscale(0.65);
        opacity: 0.7;
      }

      button:focus-visible,
      a:focus-visible,
      [tabindex]:focus-visible {
        outline: 3px solid #f1bd58;
        outline-offset: 3px;
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

      .context-trigger {
        width: fit-content;
        border-color: #82938b;
        padding: 9px 12px;
        color: #eff4ef;
        background: rgba(20, 27, 24, 0.78);
      }

      .context-trigger:hover {
        border-color: var(--primary);
        background: #29352f;
      }

      .inline-status {
        width: fit-content;
        margin: 0;
        border-left: 3px solid var(--warn);
        padding: 8px 10px;
        color: #f5deb1;
        background: rgba(42, 31, 12, 0.82);
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

      .outcome-chip.contenida {
        border-color: #22c55e88;
        color: #86efac;
        background: #14532d66;
      }

      .outcome-chip.parcial {
        border-color: #f59e0b88;
        color: #fcd34d;
        background: #78350f66;
      }

      .outcome-chip.moderado {
        border-color: #f59e0b88;
        color: #fcd34d;
        background: #78350f66;
      }

      .outcome-chip.derrota {
        border-color: #ef444488;
        color: #fca5a5;
        background: #7f1d1d66;
      }

      .outcome-chip.desbordada {
        border-color: #ef444488;
        color: #fca5a5;
        background: #7f1d1d66;
      }

      .inspection-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: minmax(0, 1.5fr) minmax(300px, 0.55fr);
        align-items: start;
      }

      .inspection-board {
        display: grid;
        gap: 12px;
      }

      .inspection-brief {
        display: grid;
        gap: 8px;
        border: 1px solid #d8c799;
        border-radius: 12px;
        padding: 12px;
        color: #172819;
        background: linear-gradient(180deg, #fff8df, #eee0ba);
      }

      .inspection-brief h2 {
        margin: 0;
        font-size: 24px;
      }

      .inspection-brief p {
        margin: 0;
        line-height: 1.4;
      }

      .inspection-quota {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border: 2px solid #9a6b12;
        border-radius: 12px;
        padding: 10px 14px;
        color: #1f1b0b;
        background: linear-gradient(180deg, #fde68a, #fbbf24);
        font-weight: 800;
      }

      .inspection-quota strong {
        font-size: 36px;
        line-height: 1;
      }

      .inspection-scene {
        position: relative;
        min-height: 455px;
        overflow: hidden;
        border: 1px solid #385879;
        border-radius: 8px;
        background:
          linear-gradient(180deg, #8fc5d3 0%, #c6dfc8 28%, #7ea063 29%, #4d6d3f 54%, #786b4d 55%, #9d8a64 100%);
      }

      .inspection-scene svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .inspection-hotspot {
        position: absolute;
        width: 34px;
        height: 34px;
        border: 2px solid #fef3c7;
        border-radius: 50%;
        display: grid;
        place-items: center;
        transform: translate(-50%, -50%);
        color: #08141f;
        background: #f59e0b;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
      }

      .inspection-hotspot:hover,
      .inspection-hotspot.active {
        background: #22d3ee;
        border-color: #cffafe;
      }

      .inspection-hotspot.selected {
        background: #22c55e;
        border-color: #dcfce7;
      }

      .inspection-hotspot.ignored {
        background: #64748b;
        color: #e2e8f0;
      }

      .inspection-panel {
        display: grid;
        gap: 12px;
      }

      .vulnerability-list {
        display: grid;
        gap: 8px;
      }

      .vulnerability-item {
        display: grid;
        grid-template-columns: 30px 28px 1fr;
        align-items: center;
        gap: 8px;
        border: 1px solid #3e5b77;
        border-radius: 8px;
        padding: 8px;
        color: var(--text);
        background: #102335d9;
        text-align: left;
        cursor: pointer;
      }

      .vulnerability-item.active {
        border-color: #22d3ee;
        background: #164e6338;
      }

      .vulnerability-item.selected {
        border-color: #22c55e;
      }

      .vulnerability-number {
        display: grid;
        place-items: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        color: #fff7ed;
        background: #ea580c;
        font-weight: 800;
      }

      .inspection-actions {
        display: grid;
        grid-template-columns: repeat(7, minmax(130px, 1fr));
        gap: 8px;
      }

      .action-card {
        min-height: 148px;
        border: 1px solid #94a3b8;
        border-radius: 8px;
        padding: 10px;
        color: #10201a;
        background: linear-gradient(180deg, #f7f4df, #dfead0);
        cursor: pointer;
        display: grid;
        align-content: start;
        gap: 6px;
        text-align: center;
      }

      .action-card:nth-child(2n) {
        background: linear-gradient(180deg, #fff0cf, #f3d9a5);
      }

      .action-card:nth-child(3n) {
        background: linear-gradient(180deg, #e8f4f8, #cfe2eb);
      }

      .action-card.active {
        outline: 3px solid #22d3ee;
      }

      .action-card.selected {
        outline: 3px solid #22c55e;
      }

      .action-card:disabled {
        opacity: 0.64;
        cursor: not-allowed;
      }

      .action-icon {
        font-size: 30px;
        line-height: 1;
      }

      .action-card strong {
        font-size: 13px;
      }

      .action-card small {
        font-size: 12px;
        line-height: 1.25;
      }

      .inspection-summary {
        display: grid;
        gap: 9px;
      }

      .inspection-summary .metric {
        padding: 9px;
      }

      .combo-list {
        display: grid;
        gap: 8px;
      }

      .combo-item {
        border: 1px solid #4f6780;
        border-radius: 10px;
        padding: 8px;
        background: #11263a;
        font-size: 13px;
      }

      .details-toggle {
        border: 1px solid #63809f;
        border-radius: 8px;
        padding: 8px 10px;
        color: var(--text);
        background: #20364d;
        cursor: pointer;
      }

      .action-details {
        display: grid;
        gap: 10px;
        margin-top: 10px;
        border: 1px solid #456789;
        border-radius: 10px;
        padding: 10px;
        background: #0f2234;
      }

      .action-details.hidden {
        display: none;
      }

      .context-dialog {
        width: min(520px, 100%);
        max-width: none;
        height: 100vh;
        max-height: none;
        margin: 0 0 0 auto;
        border: 0;
        border-left: 1px solid #65736c;
        padding: 0;
        color: var(--text);
        background: #171e1b;
        box-shadow: -18px 0 48px rgba(0, 0, 0, 0.42);
      }

      .context-dialog::backdrop {
        background: rgba(5, 8, 7, 0.68);
      }

      .context-dialog-shell {
        height: 100%;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
      }

      .context-dialog-header {
        min-height: 72px;
        border-bottom: 1px solid #46534d;
        padding: 16px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .context-dialog-header h2 {
        margin: 0;
        font-size: 21px;
      }

      .context-dialog-close {
        width: 44px;
        height: 44px;
        flex: 0 0 44px;
        border: 1px solid #68766f;
        border-radius: 50%;
        color: var(--text);
        background: transparent;
        font-size: 25px;
        line-height: 1;
        cursor: pointer;
      }

      .context-dialog-body {
        overflow: auto;
        padding: 24px 20px 40px;
      }

      .context-section + .context-section {
        margin-top: 24px;
        border-top: 1px solid #3f4c46;
        padding-top: 22px;
      }

      .context-section h3 {
        margin: 0 0 8px;
        color: #f1bd58;
        font-size: 14px;
      }

      .context-section p {
        margin: 0;
        color: #d6ddd8;
        line-height: 1.65;
        white-space: pre-line;
      }

      .detail-section h4 {
        margin: 0 0 6px;
        font-size: 14px;
      }

      .detail-section ul {
        margin: 0;
        padding-left: 18px;
        color: var(--muted);
        line-height: 1.45;
      }

      .balance-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: minmax(0, 1fr) minmax(320px, 0.75fr);
      }

      .balance-indicators {
        display: grid;
        gap: 10px;
      }

      .balance-indicator {
        border: 1px solid #3a5978;
        border-radius: 10px;
        padding: 10px;
        background: var(--panel-2);
      }

      .balance-indicator small {
        color: var(--muted);
        display: block;
        margin-top: 4px;
      }

      .alert-option {
        border: 1px solid #456789;
        background: #102335d9;
        color: var(--text);
        border-radius: 10px;
        text-align: left;
        padding: 11px;
        cursor: pointer;
        display: grid;
        gap: 7px;
      }

      .alert-option:hover {
        border-color: #83a9cf;
      }

      .alert-option.correct {
        border-color: #22c55e88;
      }

      .alert-option.incorrect {
        border-color: #ef444488;
      }

      .first-alert-scene {
        overflow: hidden;
        border: 1px solid #385879;
        border-radius: 8px;
        background: #0a1827;
      }

      .first-alert-scene img {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
      }

      .fronts-map {
        position: relative;
        overflow: hidden;
        min-height: 430px;
        border: 1px solid #385879;
        border-radius: 8px;
        background:
          linear-gradient(180deg, rgba(8, 20, 31, 0.08), rgba(8, 20, 31, 0.78)),
          url('/images/primer-aviso-humo.png') center / cover;
      }

      .front-zone {
        position: absolute;
        display: grid;
        gap: 6px;
        width: min(30%, 260px);
        border: 1px solid #94a3b866;
        border-radius: 8px;
        padding: 11px;
        color: var(--text);
        background: #0d1b2bdc;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.28);
      }

      .front-zone strong {
        font-size: 15px;
      }

      .front-zone small {
        color: var(--muted);
        line-height: 1.35;
      }

      .front-zone.active {
        border-color: #fbbf24;
        background: #3a2608e8;
        box-shadow: 0 0 0 2px #fbbf2455 inset, 0 0 34px #f59e0b66;
      }

      .front-zone[data-zone="zona-comunicacion"] {
        left: 5%;
        top: 12%;
      }

      .front-zone[data-zone="zona-territorio-accesos"] {
        left: 35%;
        bottom: 10%;
      }

      .front-zone[data-zone="zona-poblacion-riesgo"] {
        right: 5%;
        top: 18%;
      }

      .crisis-pressure {
        display: grid;
        gap: 9px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .pressure-card {
        border: 1px solid #4f6780;
        border-radius: 8px;
        padding: 10px;
        background: #11263a;
      }

      .crisis-action-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .crisis-action {
        border: 1px solid #456789;
        border-radius: 10px;
        padding: 11px;
        color: var(--text);
        background: #102335d9;
        text-align: left;
        cursor: pointer;
        display: grid;
        gap: 7px;
      }

      .crisis-action.selected {
        border-color: #22c55e;
        box-shadow: 0 0 0 1px #22c55e55 inset;
      }

      .crisis-action:disabled {
        opacity: 0.62;
        cursor: not-allowed;
      }

      @media (max-width: 1120px) {
        .layout {
          grid-template-columns: minmax(0, 1fr);
        }

        .sidebar {
          border-right: 0;
          border-bottom: 1px solid #39453f;
          position: relative;
          z-index: 2;
        }

        .nav {
          grid-auto-flow: column;
          grid-auto-columns: minmax(150px, 42vw);
          overflow-x: auto;
          overscroll-behavior-inline: contain;
          padding-bottom: 4px;
        }

        .screen-grid,
        .balance-grid,
        .inspection-grid,
        .inspection-scene {
          min-height: 420px;
        }

        .inspection-actions {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 760px) {
        .sidebar {
          gap: 9px;
          padding: 10px 14px;
        }

        .sidebar .brand,
        .sidebar .subtitle,
        .season-pill {
          display: none;
        }

        .nav {
          grid-auto-columns: minmax(145px, 68vw);
        }

        .stage-btn {
          min-height: 48px;
          padding: 8px 10px;
        }

        .stage-btn small {
          display: none;
        }

        .content {
          padding: 14px;
        }

        .title {
          font-size: 22px;
        }

        .briefing-hero {
          min-height: 590px;
          padding: 24px 20px;
          background-position: 60% center;
        }

        .briefing-copy {
          width: 100%;
          max-width: 100%;
        }

        .briefing-copy h2 {
          font-size: 38px;
        }

        .briefing-copy > p:not(.briefing-kicker) {
          font-size: 16px;
          overflow-wrap: anywhere;
        }

        .briefing-copy .button-row > button {
          width: 100%;
        }

        .context-dialog {
          width: 100%;
          height: min(76vh, 720px);
          margin: auto 0 0;
          border-top: 1px solid #65736c;
          border-left: 0;
          border-radius: 12px 12px 0 0;
        }

        .inspection-quota {
          align-items: flex-start;
          flex-direction: column;
        }

        .inspection-actions {
          grid-template-columns: 1fr;
        }

        .front-zone {
          position: static;
          width: auto;
          margin: 10px;
        }

        .crisis-pressure,
        .crisis-action-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          scroll-behavior: auto !important;
          transition-duration: 0.01ms !important;
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">¡Apaga las llamas!</div>
        <div class="subtitle">
          Simulador de decisiones estacionales para prevención y respuesta frente a incendios forestales.
        </div>
        <div class="season-pill" id="season-pill">Fase activa: Briefing</div>

        <nav class="nav" id="stage-nav"></nav>
      </aside>

      <main class="content">
        <header class="topbar">
          <div>
            <h1 class="title" id="screen-title">¡Apaga las llamas!</h1>
            <div class="muted" id="screen-subtitle">
              La emergencia empieza antes del fuego. Prepara, responde y asume consecuencias.
            </div>
          </div>

        </header>

        <section id="screen-briefing" class="screen briefing-hero">
          <div class="briefing-copy">
            <p class="briefing-kicker">Simulador de decisiones</p>
            <h2>La emergencia empieza antes del fuego</h2>
            <p>
              Preparas viviendas, territorio y comunidad. Cuando aparezca el humo,
              cada decisión previa cambiará el margen de respuesta.
            </p>
            <p class="inline-status hidden" id="briefing-status" role="status"></p>
            <div class="button-row">
              <button class="primary" id="btn-start-campaign" type="button" disabled>Comenzar la prevención →</button>
              <button class="context-trigger" id="btn-briefing-context" type="button" aria-haspopup="dialog" aria-controls="context-dialog">ⓘ Contexto completo</button>
            </div>
          </div>
        </section>

        <section id="screen-inspection" class="screen hidden">
          <div class="inspection-grid">
            <article class="inspection-board">
              <div class="inspection-brief">
                <div class="decision-header">
                  <h2 id="inspection-title">Inspeccion preventiva</h2>
                  <div class="inspection-quota">
                    <span>Actuaciones disponibles</span>
                    <strong id="inspection-counter">4</strong>
                  </div>
                </div>
                <p><strong id="inspection-intro">No hay humo todavia.</strong></p>
                <p id="inspection-context"></p>
                <button class="context-trigger" id="btn-inspection-context" type="button" aria-haspopup="dialog" aria-controls="context-dialog">ⓘ Contexto completo</button>
              </div>

              <div class="inspection-scene" id="inspection-scene" aria-label="Zona de viviendas en interfaz urbano-forestal">
                <svg viewBox="0 0 900 520" role="presentation" preserveAspectRatio="none">
                  <rect x="0" y="0" width="900" height="520" fill="#b8d7ca" />
                  <path d="M0 145 C150 95 260 115 410 82 C560 48 710 62 900 22 L900 260 L0 260 Z" fill="#597b46" />
                  <path d="M0 202 C180 140 330 164 500 128 C650 96 770 122 900 80 L900 290 L0 290 Z" fill="#47683c" opacity="0.86" />
                  <path d="M0 384 C170 344 336 356 490 382 C640 408 752 404 900 348 L900 520 L0 520 Z" fill="#9c855f" />
                  <path d="M565 520 C610 448 682 420 752 388 C810 360 842 326 900 284" stroke="#c8b28a" stroke-width="74" fill="none" />
                  <path d="M565 520 C610 448 682 420 752 388 C810 360 842 326 900 284" stroke="#6f5f46" stroke-width="8" fill="none" opacity="0.55" />
                  <g>
                    <rect x="135" y="230" width="142" height="118" rx="8" fill="#eadcc6" stroke="#725b45" stroke-width="3" />
                    <path d="M120 232 L207 164 L292 232 Z" fill="#8b4a32" stroke="#5f3325" stroke-width="3" />
                    <rect x="169" y="281" width="36" height="67" fill="#6e4a35" />
                    <rect x="224" y="265" width="35" height="30" fill="#9cc3d5" stroke="#385879" />
                    <path d="M147 210 C168 220 190 204 210 216 C230 228 252 208 272 222" stroke="#d6b25c" stroke-width="9" fill="none" />
                    <rect x="118" y="356" width="190" height="12" fill="#6b4f37" opacity="0.8" />
                  </g>
                  <g>
                    <rect x="705" y="210" width="118" height="98" rx="6" fill="#d6e3ee" stroke="#4f6780" stroke-width="3" />
                    <path d="M690 210 L765 156 L838 210 Z" fill="#50708a" />
                    <rect x="748" y="248" width="34" height="60" fill="#324963" />
                    <rect x="792" y="236" width="24" height="22" fill="#bfe4f0" />
                  </g>
                  <g fill="#365b36">
                    <circle cx="450" cy="170" r="55" />
                    <circle cx="520" cy="146" r="60" />
                    <circle cx="610" cy="120" r="62" />
                    <circle cx="690" cy="128" r="58" />
                  </g>
                  <g stroke="#5b3a27" stroke-width="12">
                    <line x1="450" y1="220" x2="450" y2="350" />
                    <line x1="520" y1="205" x2="520" y2="346" />
                    <line x1="610" y1="185" x2="610" y2="322" />
                    <line x1="690" y1="190" x2="690" y2="316" />
                  </g>
                  <g fill="#b7791f" opacity="0.88">
                    <rect x="296" y="337" width="44" height="18" rx="4" />
                    <rect x="290" y="359" width="60" height="14" rx="4" />
                    <rect x="372" y="326" width="94" height="22" rx="11" />
                    <rect x="438" y="350" width="36" height="20" rx="4" />
                  </g>
                  <g fill="#d9b36a" opacity="0.72">
                    <ellipse cx="455" cy="314" rx="62" ry="18" />
                    <ellipse cx="535" cy="304" rx="70" ry="20" />
                  </g>
                </svg>
                <div id="inspection-hotspots"></div>
              </div>

              <div class="inspection-actions" id="inspection-action-cards"></div>
            </article>

            <aside class="card inspection-panel">
              <div>
                <h3>Vulnerabilidades detectables</h3>
                <div class="vulnerability-list" id="inspection-vulnerability-list"></div>
              </div>
              <div>
                <h3 id="inspection-hotspot-title">Selecciona un punto vulnerable</h3>
                <p class="muted" id="inspection-hotspot-description"></p>
              </div>
              <div class="status-box" id="inspection-action-box"></div>
              <div class="inspection-summary" id="inspection-summary"></div>
              <div class="status-box hidden" id="inspection-finish-box"></div>
            </aside>
          </div>
        </section>

        <section id="screen-balance" class="screen hidden">
          <div class="balance-grid">
            <article class="card result-hero">
              <div class="outcome-chip" id="balance-phase-chip">Balance preventivo</div>
              <h2 id="balance-title">Balance preventivo del municipio</h2>
              <p class="muted" id="balance-intro"></p>
              <button class="context-trigger" id="btn-balance-context" type="button" aria-haspopup="dialog" aria-controls="context-dialog">ⓘ Contexto completo</button>

              <div class="balance-indicators" id="balance-indicators"></div>
              <div class="status-box" id="balance-outcome"></div>
            </article>

            <aside class="card decision-panel">
              <div class="decision-header">
                <h2 id="first-alert-title">Primer aviso de incendio</h2>
                <span class="step-label">s-040</span>
              </div>
              <div class="first-alert-scene">
                <img src="/images/primer-aviso-humo.png" alt="Columna de humo sobre una zona rural próxima a viviendas y monte" />
              </div>
              <p class="muted" id="first-alert-intro"></p>
              <button class="context-trigger" id="btn-first-alert-context" type="button" aria-haspopup="dialog" aria-controls="context-dialog">ⓘ Contexto completo</button>
              <h3 id="first-alert-question"></h3>
              <div class="decision-list" id="first-alert-options"></div>
              <div class="status-box hidden" id="first-alert-feedback"></div>
            </aside>
          </div>
        </section>

        <section id="screen-fronts" class="screen hidden">
          <div class="screen-grid">
            <article class="card">
              <div class="decision-header">
                <h2 id="fronts-title">La emergencia se abre en tres frentes</h2>
                <span class="step-label">Mapa de crisis</span>
              </div>
              <p class="muted" id="fronts-intro"></p>
              <div class="fronts-map" id="fronts-map"></div>
            </article>

            <aside class="card decision-panel">
              <h2 id="fronts-headline"></h2>
              <p class="muted" id="fronts-body"></p>
              <div class="status-box">
                <strong>Ruta activada</strong>
                <p class="muted" id="fronts-route-detail"></p>
              </div>
              <div class="button-row">
                <button class="primary" id="btn-fronts-continue" type="button">Continuar</button>
              </div>
            </aside>
          </div>
        </section>

        <section id="screen-crisis" class="screen hidden">
          <div class="screen-grid">
            <article class="card decision-panel">
              <div class="decision-header">
                <h2 id="crisis-title">Escena de crisis</h2>
                <span class="step-label" id="crisis-counter">0/2 acciones</span>
              </div>
              <p class="muted" id="crisis-intro"></p>
              <button class="context-trigger" id="btn-crisis-context" type="button" aria-haspopup="dialog" aria-controls="context-dialog">ⓘ Contexto completo</button>
              <div class="crisis-pressure" id="crisis-pressure"></div>
              <div class="crisis-action-grid" id="crisis-actions"></div>
            </article>

            <aside class="card">
              <h3>Consecuencia acumulada</h3>
              <div class="status-box" id="crisis-feedback"></div>
              <div class="status-box hidden" id="crisis-result"></div>
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
              <h3>Balance de la emergencia</h3>

              <div class="metrics" style="margin-top:10px;">
                <div class="metric">
                  <div class="metric-head"><span>Proteccion de poblacion</span><strong id="result-risk">0</strong></div>
                </div>
                <div class="metric">
                  <div class="metric-head"><span>Danos materiales</span><strong id="result-burned">0</strong></div>
                </div>
                <div class="metric">
                  <div class="metric-head"><span>Confianza publica</span><strong id="result-budget">0</strong></div>
                </div>
              </div>

              <div class="button-row" style="margin-top:12px;">
                <button class="primary" id="btn-restart" type="button">Jugar de nuevo</button>
                <button class="secondary" id="btn-review-winter" type="button">Revisar prevencion</button>
              </div>
            </article>

            <article class="card">
              <h3>Trazabilidad de decisiones</h3>
              <div class="log-list" id="result-log"></div>
            </article>
          </div>
        </section>

      </main>
    </div>

    <dialog class="context-dialog" id="context-dialog" aria-labelledby="context-dialog-title">
      <div class="context-dialog-shell">
        <header class="context-dialog-header">
          <h2 id="context-dialog-title">Contexto completo</h2>
          <form method="dialog">
            <button class="context-dialog-close" type="submit" aria-label="Cerrar contexto">×</button>
          </form>
        </header>
        <div class="context-dialog-body" id="context-dialog-body"></div>
      </div>
    </dialog>

    <script>
      const STAGES = [
        { id: 'briefing', label: '01 · Inicio', subtitle: 'Rol y objetivo' },
        { id: 'inspection', label: '02 · Prevencion', subtitle: 'Tres inspecciones' },
        { id: 'balance', label: '03 · Primer aviso', subtitle: 'Balance y ruptura' },
        { id: 'fronts', label: '04 · Tres frentes', subtitle: 'Mapa de crisis' },
        { id: 'crisis', label: '05 · Crisis', subtitle: 'Ruta comunicacion' },
        { id: 'result', label: '06 · Resultado', subtitle: 'Balance final' }
      ];

      const HEADER_TEXT = {
        briefing: {
          title: '¡Apaga las llamas!',
          subtitle: 'La emergencia no empieza cuando aparece el fuego. Empieza antes.'
        },
        inspection: {
          title: 'Acto I · Prevencion',
          subtitle: 'Lee el territorio antes de que haya humo y prioriza cuatro actuaciones por pantalla.'
        },
        balance: {
          title: 'Puente narrativo · Primer aviso',
          subtitle: 'Lo preparado antes del fuego empieza a pesar cuando aparece el humo.'
        },
        fronts: {
          title: 'Inicio de crisis · Tres frentes',
          subtitle: 'La crisis acaba de elegir por donde entrar.'
        },
        crisis: {
          title: 'Acto II · Ruta de comunicacion',
          subtitle: 'Elige dos acciones por escena. No puedes hacerlo todo.'
        },
        result: {
          title: 'Resultado final',
          subtitle: 'Lee que decisiones compraron margen y cuales dejaron entrar el caos.'
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

      const INSPECTION_METRIC_LABELS = {
        defensibilidadViviendas: 'Defensibilidad de viviendas',
        riesgoPavesas: 'Riesgo por pavesas',
        continuidadCombustible: 'Continuidad vegetal',
        riesgoFuegoCopas: 'Riesgo de fuego de copas',
        riesgoIgnicion: 'Riesgo de ignicion',
        riesgoPropagacion: 'Riesgo de propagacion',
        seguridadEquipos: 'Seguridad de equipos',
        coordinacionOperativa: 'Coordinacion operativa',
        cumplimientoPreventivo: 'Cumplimiento preventivo',
        accesosDespejados: 'Accesos despejados',
        controlIncendio: 'Control del incendio',
        poblacionProtegida: 'Poblacion protegida',
        confianzaVecinal: 'Confianza vecinal',
        preparacionFamiliar: 'Preparacion familiar',
        autonomiaCiudadana: 'Autonomia ciudadana',
        canalesOficiales: 'Canales oficiales',
        atencionVulnerables: 'Atencion vulnerable',
        inclusionVulnerables: 'Inclusion vulnerable',
        saturacion112: 'Saturacion 112',
        exposicionHumoCalor: 'Exposicion a humo y calor',
        danosViviendas: 'Danos potenciales en viviendas',
        riesgoAtrapamiento: 'Riesgo de atrapamiento',
        confusionPublica: 'Confusion publica'
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
      let INSPECTION_SCREENS = [];
      let PREVENTION_BALANCE = null;
      let FIRST_ALERT = null;
      let CRISIS_ROUTE_MODULE = null;
      let GAME_SCENARIOS = [];

      function buildInitialState() {
        return {
          stage: 'briefing',
          unlocked: {
            briefing: true,
            inspection: false,
            balance: false,
            fronts: false,
            crisis: false,
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
          inspectionIndex: 0,
          inspections: {},
          balance: {
            outcomeId: null,
            alertOptionId: null,
            alertFeedback: null,
            activeRouteId: null
          },
          crisis: {
            activeScenarioId: null,
            selectedActionIds: [],
            appliedFlags: [],
            metrics: {},
            feedbackLog: [],
            completed: false,
            outcome: null
          },
          riskBase: null,
          fireIntensity: 0,
          burned: 8,
          diagnosis: [],
          winterLog: [],
          summerLog: [],
          result: null,
          emergencyAidUsed: false,
          contentStatus: 'loading',
          contentError: null
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
        if (state.stage === 'briefing') return 'Inicio';
        if (state.stage === 'inspection') return 'Prevencion';
        if (state.stage === 'balance') return 'Primer aviso';
        if (state.stage === 'fronts') return 'Tres frentes';
        if (state.stage === 'crisis') return 'Crisis';
        return 'Resultado';
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

      function openContext(title, sections) {
        const dialog = document.getElementById('context-dialog');
        const dialogTitle = document.getElementById('context-dialog-title');
        const dialogBody = document.getElementById('context-dialog-body');

        dialogTitle.textContent = title || 'Contexto completo';
        dialogBody.replaceChildren();

        sections.filter(function (section) {
          return section && section.text;
        }).forEach(function (section) {
          const sectionElement = document.createElement('section');
          sectionElement.className = 'context-section';

          const heading = document.createElement('h3');
          heading.textContent = section.title;

          const paragraph = document.createElement('p');
          paragraph.textContent = section.text;

          sectionElement.append(heading, paragraph);
          dialogBody.append(sectionElement);
        });

        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
          return;
        }

        dialog.setAttribute('open', '');
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

      function inspectionIcon(hotspotId) {
        const icons = {
          'canalones-hojas': '🧹',
          'combustibles-fachada': '🪵',
          'ramas-bajas-vegetacion-seca': '✂️',
          'copas-tocandose': '🌳',
          'huecos-sin-proteger': '▤',
          'acceso-estrecho': '🚒',
          'centro-social': '🏛️',
          'restos-poda-acumulados': '🍂',
          'vegetacion-densa-borde-fincas': '🌿',
          'pastoreo-preventivo': '🐑',
          'replantacion-finca': '🌵',
          'camino-rural-invadido': '🛣️',
          'quema-agricola-restos': '🔥',
          'quema-tecnica-profesional': '🧭',
          'familias-sin-mochila': '🎒',
          'personas-vulnerables-sin-registro': '♿',
          'hogares-sin-plan-evacuacion-confinamiento': '🏠',
          'canales-oficiales-poco-claros': '📢',
          'canales-oficiales-debiles': '📢',
          'edificio-publico-sin-protocolo': '🏛️',
          'punto-encuentro-sin-protocolo': '🏛️',
          'turistas-senderistas-sin-informacion': '🥾',
          'turistas-senderistas-sin-aviso': '🥾',
          'mascotas-sin-prevision': '🐾',
          'familias-sin-kit-basico': '🎒',
          'voluntariado-sin-coordinacion': '🤝'
        };

        return icons[hotspotId] || '•';
      }

      function actionSummary(hotspot) {
        const summaries = {
          'canalones-hojas': 'Evita que las hojas secas sean combustible.',
          'combustibles-fachada': 'Separa leña, muebles y objetos de la fachada.',
          'ramas-bajas-vegetacion-seca': 'Reduce el combustible cercano al suelo.',
          'copas-tocandose': 'Aumenta la distancia entre árboles.',
          'huecos-sin-proteger': 'Evita la entrada de brasas en la vivienda.',
          'acceso-estrecho': 'Asegura paso libre para medios de extinción.',
          'centro-social': 'Prepara un punto público de apoyo.',
          'restos-poda-acumulados': 'Retira, tritura o composta restos secos.',
          'vegetacion-densa-borde-fincas': 'Rompe la continuidad entre finca y monte.',
          'pastoreo-preventivo': 'Reduce combustible fino con gestion ganadera.',
          'replantacion-finca': 'Evita pantallas vegetales continuas.',
          'camino-rural-invadido': 'Mantiene acceso y salida practicables.',
          'quema-agricola-restos': 'Autoriza solo con condiciones seguras.',
          'quema-tecnica-profesional': 'Evalua una actuacion tecnica planificada.',
          'familias-sin-mochila': 'Evita perder minutos buscando lo esencial.',
          'personas-vulnerables-sin-registro': 'Prioriza avisos, apoyo y transporte.',
          'hogares-sin-plan-evacuacion-confinamiento': 'Aclara como salir o protegerse.',
          'canales-oficiales-poco-claros': 'Reduce rumores y llamadas innecesarias.',
          'canales-oficiales-debiles': 'Reduce rumores y mensajes contradictorios.',
          'edificio-publico-sin-protocolo': 'Da funcion real a un edificio publico.',
          'punto-encuentro-sin-protocolo': 'Prepara acogida e informacion vecinal.',
          'turistas-senderistas-sin-informacion': 'Informa a visitantes y rutas expuestas.',
          'turistas-senderistas-sin-aviso': 'Informa a visitantes y rutas expuestas.',
          'mascotas-sin-prevision': 'Evita retrasos por animales domesticos.',
          'familias-sin-kit-basico': 'Evita retrasos buscando lo esencial.',
          'voluntariado-sin-coordinacion': 'Ordena la ayuda vecinal disponible.'
        };

        return summaries[hotspot.id] || hotspot.visualHint;
      }

      function actionDetailsHtml(action) {
        if (!action.details) return '';

        return '<button class="details-toggle" id="btn-action-details" type="button">' + action.details.buttonLabel + '</button>' +
          '<div class="action-details hidden" id="action-details-panel">' +
            action.details.sections.map(function (section) {
              return '<div class="detail-section">' +
                '<h4>' + section.title + '</h4>' +
                '<ul>' + section.items.map(function (item) {
                  return '<li>' + item + '</li>';
                }).join('') + '</ul>' +
              '</div>';
            }).join('') +
          '</div>';
      }

      function wireActionDetailsToggle() {
        const button = document.getElementById('btn-action-details');
        const panel = document.getElementById('action-details-panel');
        if (!button || !panel) return;

        button.onclick = function () {
          panel.classList.toggle('hidden');
          button.textContent = panel.classList.contains('hidden') ? 'Ver detalles' : 'Ocultar detalles';
        };
      }

      function currentInspectionScreen() {
        return INSPECTION_SCREENS[state.inspectionIndex] || null;
      }

      function aggregateInspectionMetrics() {
        const aggregate = {};
        Object.keys(state.inspections || {}).forEach(function (screenId) {
          const metrics = state.inspections[screenId].metrics || {};
          Object.keys(metrics).forEach(function (key) {
            aggregate[key] = (aggregate[key] || 0) + metrics[key];
          });
        });
        return aggregate;
      }

      function aggregateIgnoredFlags() {
        const flags = [];
        Object.keys(state.inspections || {}).forEach(function (screenId) {
          (state.inspections[screenId].ignoredFlags || []).forEach(function (flag) {
            uniquePush(flags, flag);
          });
        });
        return flags;
      }

      function crisisRouteState() {
        const metrics = aggregateInspectionMetrics();
        const balanceOutcome = chooseBalanceOutcome();
        if (balanceOutcome?.crisisImpact) {
          Object.keys(balanceOutcome.crisisImpact).forEach(function (key) {
            metrics[key] = (metrics[key] || 0) + balanceOutcome.crisisImpact[key];
          });
        }
        if (state.balance.alertFeedback?.impact) {
          Object.keys(state.balance.alertFeedback.impact).forEach(function (key) {
            metrics[key] = (metrics[key] || 0) + state.balance.alertFeedback.impact[key];
          });
        }
        return {
          metrics: metrics,
          flags: aggregateIgnoredFlags()
        };
      }

      function compareValue(left, operator, right) {
        if (operator === '>=') return left >= right;
        if (operator === '<=') return left <= right;
        if (operator === '>') return left > right;
        if (operator === '<') return left < right;
        if (operator === '===') return left === right;
        if (operator === '!==') return left !== right;
        return false;
      }

      function parseConditionExpression(expression) {
        const match = String(expression).trim().match(/^(<=|>=|<|>|===|!==)\\s*(-?\\d+(?:\\.\\d+)?)$/);
        if (!match) return null;
        return {
          operator: match[1],
          value: Number(match[2])
        };
      }

      function conditionRecordMatches(condition, metrics) {
        if (condition === 'default') return true;
        if (!condition) return false;

        return Object.keys(condition).every(function (key) {
          const expression = parseConditionExpression(condition[key]);
          if (!expression) return false;
          return compareValue(metrics[key] || 0, expression.operator, expression.value);
        });
      }

      function scenarioNextStep(scenario) {
        const logic = scenario.nextLogic || [];
        return logic.find(function (item) {
          return conditionRecordMatches(item.condition, state.crisis.metrics);
        }) || logic.find(function (item) {
          return item.condition === 'default';
        }) || null;
      }

      function routeConditionMatches(condition, routeState) {
        if (condition === 'default') return true;
        if (condition.flag) return routeState.flags.includes(condition.flag);
        if (condition.any) {
          return condition.any.some(function (expression) {
            return compareValue(
              routeState.metrics[expression.variable] || 0,
              expression.operator,
              expression.value
            );
          });
        }
        return false;
      }

      function activeCrisisRoute() {
        if (!CRISIS_ROUTE_MODULE) return null;
        const preferredRoute = CRISIS_ROUTE_MODULE.routeLogic.find(function (route) {
          return route.id === 'ruta-comunicacion';
        });
        if (preferredRoute) return preferredRoute;
        const routeState = crisisRouteState();
        const routes = CRISIS_ROUTE_MODULE.routeLogic.slice().sort(function (a, b) {
          return a.priority - b.priority;
        });
        return routes.find(function (route) {
          return routeConditionMatches(route.condition, routeState);
        }) || routes[routes.length - 1] || null;
      }

      function beneficialMetricValue(key, value) {
        const negativeIsGood = [
          'riesgoPavesas',
          'riesgoIgnicion',
          'riesgoPropagacion',
          'confusionPublica',
          'saturacion112',
          'danosViviendas',
          'riesgoAtrapamiento',
          'exposicionHumoCalor'
        ];

        if (negativeIsGood.includes(key)) return -value;
        return value;
      }

      function preventionPreparednessScore() {
        const metrics = aggregateInspectionMetrics();
        return Object.keys(metrics).reduce(function (total, key) {
          return total + Math.max(0, beneficialMetricValue(key, metrics[key]));
        }, 0);
      }

      function chooseBalanceOutcome() {
        if (!PREVENTION_BALANCE) return null;
        const score = preventionPreparednessScore();
        if (score >= 58) {
          return PREVENTION_BALANCE.outcomes.find(function (outcome) { return outcome.id === 'municipio-preparado'; });
        }
        if (score >= 28) {
          return PREVENTION_BALANCE.outcomes.find(function (outcome) { return outcome.id === 'preparacion-desigual'; });
        }
        return PREVENTION_BALANCE.outcomes.find(function (outcome) { return outcome.id === 'territorio-vulnerable'; });
      }

      function blankInspectionSession(screen) {
        return {
          selectedHotspotId: screen?.hotspots?.[0]?.id || null,
          appliedHotspotIds: [],
          appliedFlags: [],
          ignoredFlags: [],
          futureConsequences: [],
          metrics: Object.assign({}, screen?.initialState || {}),
          completed: false,
          outcome: null,
          combos: []
        };
      }

      function currentInspectionState() {
        const screen = currentInspectionScreen();
        if (!screen) return blankInspectionSession(null);
        if (!state.inspections[screen.id]) {
          state.inspections[screen.id] = blankInspectionSession(screen);
        }
        return state.inspections[screen.id];
      }

      function inspectionMetrics() {
        return currentInspectionState().metrics;
      }

      function applyInspectionImpact(impact) {
        const metrics = inspectionMetrics();
        Object.keys(impact || {}).forEach(function (key) {
          if (typeof metrics[key] !== 'number') metrics[key] = 0;
          metrics[key] += impact[key];
        });
      }

      function selectedInspectionHotspot() {
        const screen = currentInspectionScreen();
        const inspection = currentInspectionState();
        if (!screen) return null;
        return screen.hotspots.find(function (hotspot) {
          return hotspot.id === inspection.selectedHotspotId;
        }) || screen.hotspots[0] || null;
      }

      function chooseInspectionOutcome() {
        const metrics = inspectionMetrics();
        const screen = currentInspectionScreen();
        const protectionScore =
          (metrics.defensibilidadViviendas || 0) +
          Math.abs(metrics.riesgoPavesas || 0) +
          Math.abs(metrics.riesgoIgnicion || 0) +
          Math.abs(metrics.riesgoPropagacion || 0) +
          Math.abs(metrics.continuidadCombustible || 0) +
          (metrics.seguridadEquipos || 0) +
          (metrics.cumplimientoPreventivo || 0);

        if (protectionScore >= 18) {
          return screen.outcomes.find(function (outcome) { return outcome.id === 'alto'; });
        }
        if (protectionScore >= 9) {
          return screen.outcomes.find(function (outcome) { return outcome.id === 'medio'; });
        }
        return screen.outcomes.find(function (outcome) { return outcome.id === 'bajo'; });
      }

      function completeInspectionIfReady() {
        const screen = currentInspectionScreen();
        const inspection = currentInspectionState();
        if (!screen || inspection.completed) return;
        if (inspection.appliedHotspotIds.length < screen.maxActions) return;

        const appliedFlags = inspection.appliedFlags;
        inspection.combos = screen.combos.filter(function (combo) {
          return combo.requires.every(function (flag) { return appliedFlags.includes(flag); });
        });

        inspection.combos.forEach(function (combo) {
          applyInspectionImpact(combo.bonusImpact);
        });

        const ignoredHotspots = screen.hotspots.filter(function (hotspot) {
          return !inspection.appliedHotspotIds.includes(hotspot.id);
        });

        inspection.ignoredFlags = ignoredHotspots.map(function (hotspot) {
          return hotspot.flagIfIgnored;
        });
        inspection.futureConsequences = ignoredHotspots.map(function (hotspot) {
          return hotspot.futureConsequence;
        });
        inspection.futureConsequences.forEach(function (message) {
          uniquePush(state.diagnosis, message);
        });

        const metrics = inspectionMetrics();
        state.terrain.combustible = clamp(
          state.terrain.combustible + Math.round((metrics.continuidadCombustible || 0) * 1.5),
          0,
          100
        );
        state.terrain.cortafuegos = clamp(
          state.terrain.cortafuegos + Math.max(0, Math.round(((metrics.defensibilidadViviendas || 0) + (metrics.controlIncendio || 0)) * 0.7)),
          0,
          100
        );
        state.terrain.accesibilidad = clamp(
          state.terrain.accesibilidad + Math.max(0, ((metrics.seguridadEquipos || 0) + (metrics.accesosDespejados || 0)) * 1.5),
          0,
          100
        );
        state.resources.apoyo = clamp(
          state.resources.apoyo + Math.max(0, (metrics.confianzaVecinal || 0) + Math.round((metrics.cumplimientoPreventivo || 0) / 2)),
          0,
          100
        );

        inspection.outcome = chooseInspectionOutcome();
        inspection.completed = true;

        state.winterLog.push({
          node: screen.title,
          decision: inspection.appliedHotspotIds.length + ' actuaciones preventivas priorizadas',
          effects: 'Flags: ' + inspection.appliedFlags.join(', ')
        });

      }

      function applyInspectionAction(hotspot) {
        const screen = currentInspectionScreen();
        const inspection = currentInspectionState();
        if (!screen || !hotspot || inspection.completed) return;
        if (inspection.appliedHotspotIds.includes(hotspot.id)) return;
        if (inspection.appliedHotspotIds.length >= screen.maxActions) return;

        inspection.appliedHotspotIds.push(hotspot.id);
        hotspot.action.flagsOnApply.forEach(function (flag) {
          uniquePush(inspection.appliedFlags, flag);
        });
        applyInspectionImpact(hotspot.action.impact);

        completeInspectionIfReady();
        render();
      }

      function renderInspectionSummary() {
        const summary = document.getElementById('inspection-summary');
        const metrics = inspectionMetrics();
        const visible = [
          'defensibilidadViviendas',
          'riesgoPavesas',
          'riesgoIgnicion',
          'riesgoPropagacion',
          'continuidadCombustible',
          'seguridadEquipos',
          'coordinacionOperativa',
          'cumplimientoPreventivo'
        ].filter(function (key) {
          return typeof metrics[key] === 'number' && metrics[key] !== 0;
        }).slice(0, 5);

        const keys = visible.length > 0 ? visible : ['continuidadCombustible', 'seguridadEquipos', 'coordinacionOperativa'];
        summary.innerHTML = keys.map(function (key) {
          const value = metrics[key] || 0;
          return '<div class="metric">' +
            '<div class="metric-head"><span>' + INSPECTION_METRIC_LABELS[key] + '</span><strong>' + signed(value) + '</strong></div>' +
          '</div>';
        }).join('');
      }

      function renderInspection() {
        const screen = currentInspectionScreen();
        const inspection = currentInspectionState();
        const title = document.getElementById('inspection-title');
        const intro = document.getElementById('inspection-intro');
        const context = document.getElementById('inspection-context');
        const contextButton = document.getElementById('btn-inspection-context');
        const counter = document.getElementById('inspection-counter');
        const hotspotLayer = document.getElementById('inspection-hotspots');
        const actionCards = document.getElementById('inspection-action-cards');
        const vulnerabilityList = document.getElementById('inspection-vulnerability-list');
        const hotspotTitle = document.getElementById('inspection-hotspot-title');
        const hotspotDescription = document.getElementById('inspection-hotspot-description');
        const actionBox = document.getElementById('inspection-action-box');
        const finishBox = document.getElementById('inspection-finish-box');

        if (!screen) {
          title.textContent = 'Inspeccion preventiva';
          context.textContent = 'Cargando datos de inspeccion...';
          hotspotLayer.innerHTML = '';
          actionBox.innerHTML = '<p class="muted">Esperando contenido.</p>';
          contextButton.disabled = true;
          return;
        }

        if (!inspection.selectedHotspotId) {
          inspection.selectedHotspotId = screen.hotspots[0]?.id || null;
        }

        const selected = selectedInspectionHotspot();
        const remaining = screen.maxActions - inspection.appliedHotspotIds.length;

        title.textContent = 'Pantalla ' + (state.inspectionIndex + 1) + ' — ' + screen.title;
        intro.textContent = screen.intro;
        context.textContent = 'Objetivo: ' + screen.objective;
        contextButton.disabled = false;
        contextButton.onclick = function () {
          openContext(screen.title, [
            { title: 'Situación', text: screen.context },
            { title: 'Objetivo', text: screen.objective }
          ]);
        };
        counter.textContent = String(remaining);

        hotspotLayer.innerHTML = screen.hotspots.map(function (hotspot, index) {
          const isActive = selected && selected.id === hotspot.id ? 'active' : '';
          const isApplied = inspection.appliedHotspotIds.includes(hotspot.id) ? 'selected' : '';
          const isIgnored = inspection.completed && !inspection.appliedHotspotIds.includes(hotspot.id) ? 'ignored' : '';
          return '<button class="inspection-hotspot ' + isActive + ' ' + isApplied + ' ' + isIgnored + '" ' +
            'style="left:' + hotspot.position.x + '%; top:' + hotspot.position.y + '%" ' +
            'title="' + hotspot.visualHint + '" data-hotspot="' + hotspot.id + '">' + (index + 1) + '</button>';
        }).join('');

        Array.from(hotspotLayer.querySelectorAll('button')).forEach(function (btn) {
          btn.addEventListener('click', function () {
            inspection.selectedHotspotId = btn.dataset.hotspot;
            render();
          });
        });

        vulnerabilityList.innerHTML = screen.hotspots.map(function (hotspot, index) {
          const isActive = selected && selected.id === hotspot.id ? 'active' : '';
          const isApplied = inspection.appliedHotspotIds.includes(hotspot.id) ? 'selected' : '';
          return '<button class="vulnerability-item ' + isActive + ' ' + isApplied + '" data-hotspot="' + hotspot.id + '">' +
            '<span class="vulnerability-number">' + (index + 1) + '</span>' +
            '<span>' + inspectionIcon(hotspot.id) + '</span>' +
            '<strong>' + hotspot.title + '</strong>' +
          '</button>';
        }).join('');

        Array.from(vulnerabilityList.querySelectorAll('button')).forEach(function (btn) {
          btn.addEventListener('click', function () {
            inspection.selectedHotspotId = btn.dataset.hotspot;
            render();
          });
        });

        actionCards.innerHTML = screen.hotspots.map(function (hotspot) {
          const isActive = selected && selected.id === hotspot.id ? 'active' : '';
          const isApplied = inspection.appliedHotspotIds.includes(hotspot.id) ? 'selected' : '';
          const disable = inspection.completed ||
            isApplied ||
            inspection.appliedHotspotIds.length >= screen.maxActions;
          return '<button class="action-card ' + isActive + ' ' + isApplied + '" data-hotspot="' + hotspot.id + '" ' + (disable ? 'disabled' : '') + '>' +
            '<span class="action-icon">' + inspectionIcon(hotspot.id) + '</span>' +
            '<strong>' + hotspot.action.label + '</strong>' +
            '<small>' + actionSummary(hotspot) + '</small>' +
          '</button>';
        }).join('');

        Array.from(actionCards.querySelectorAll('button')).forEach(function (btn) {
          btn.addEventListener('click', function () {
            const hotspot = screen.hotspots.find(function (item) {
              return item.id === btn.dataset.hotspot;
            });
            inspection.selectedHotspotId = btn.dataset.hotspot;
            applyInspectionAction(hotspot);
          });
        });

        if (selected) {
          const alreadyApplied = inspection.appliedHotspotIds.includes(selected.id);
          hotspotTitle.textContent = selected.title;
          hotspotDescription.textContent = selected.description;

          if (inspection.completed) {
            actionBox.innerHTML = alreadyApplied
              ? '<p><strong>Actuacion aplicada:</strong> ' + selected.action.label + '</p><p class="muted">' + selected.action.feedback + '</p>' + actionDetailsHtml(selected.action)
              : '<p><strong>Quedo pendiente:</strong> ' + selected.flagIfIgnored + '</p><p class="muted">' + selected.futureConsequence + '</p>';
            wireActionDetailsToggle();
          } else if (alreadyApplied) {
            actionBox.innerHTML =
              '<p><strong>Actuacion aplicada:</strong> ' + selected.action.label + '</p>' +
              '<p class="muted">' + selected.action.feedback + '</p>' +
              actionDetailsHtml(selected.action);
            wireActionDetailsToggle();
          } else {
            actionBox.innerHTML =
              '<p><strong>Accion posible:</strong> ' + selected.action.label + '</p>' +
              '<p class="muted">' + (selected.action.description || actionSummary(selected)) + '</p>' +
              actionDetailsHtml(selected.action) +
              '<div class="effects">Impactos: ' + Object.keys(selected.action.impact).map(function (key) {
                return INSPECTION_METRIC_LABELS[key] + ' ' + signed(selected.action.impact[key]);
              }).join(' · ') + '</div>' +
              '<div class="button-row" style="margin-top:10px;">' +
                '<button class="primary" id="btn-apply-inspection" type="button">Ejecutar actuacion</button>' +
              '</div>';

            document.getElementById('btn-apply-inspection').onclick = function () {
              applyInspectionAction(selected);
            };
            wireActionDetailsToggle();
          }
        }

        renderInspectionSummary();

        if (inspection.completed) {
          const combosHtml = inspection.combos.length > 0
            ? '<div class="combo-list">' + inspection.combos.map(function (combo) {
                return '<div class="combo-item"><strong>' + combo.title + '</strong><br/>' + combo.text + '</div>';
              }).join('') + '</div>'
            : '<p class="muted">No se activaron sinergias completas, pero las medidas elegidas quedan registradas.</p>';

          const hasNextInspection = state.inspectionIndex < INSPECTION_SCREENS.length - 1;
          const nextButtonText = hasNextInspection ? 'Continuar a pantalla ' + (state.inspectionIndex + 2) : 'Continuar al balance';
          finishBox.classList.remove('hidden');
          finishBox.innerHTML =
            '<h3 style="margin-top:0;">' + inspection.outcome.title + '</h3>' +
            '<p class="muted">' + inspection.outcome.text + '</p>' +
            combosHtml +
            '<div class="button-row" style="margin-top:12px;"><button class="primary" id="btn-next-inspection" type="button">' + nextButtonText + '</button></div>';

          document.getElementById('btn-next-inspection').onclick = function () {
            if (hasNextInspection) {
              state.inspectionIndex += 1;
              render();
              return;
            }
            unlockStage('balance');
            setStage('balance');
          };
        } else {
          finishBox.classList.add('hidden');
        }
      }

      function renderBalance() {
        const title = document.getElementById('balance-title');
        const intro = document.getElementById('balance-intro');
        const contextButton = document.getElementById('btn-balance-context');
        const indicators = document.getElementById('balance-indicators');
        const outcomeBox = document.getElementById('balance-outcome');
        const alertTitle = document.getElementById('first-alert-title');
        const alertIntro = document.getElementById('first-alert-intro');
        const alertContextButton = document.getElementById('btn-first-alert-context');
        const alertQuestion = document.getElementById('first-alert-question');
        const alertOptions = document.getElementById('first-alert-options');
        const alertFeedback = document.getElementById('first-alert-feedback');

        if (!PREVENTION_BALANCE || !FIRST_ALERT) {
          title.textContent = 'Balance preventivo';
          intro.textContent = 'Cargando balance...';
          return;
        }

        const metrics = aggregateInspectionMetrics();
        const outcome = chooseBalanceOutcome();
        state.balance.outcomeId = outcome.id;

        title.textContent = PREVENTION_BALANCE.title;
        intro.textContent = PREVENTION_BALANCE.intro;
        contextButton.onclick = function () {
          openContext(PREVENTION_BALANCE.title, [
            { title: 'Situación', text: PREVENTION_BALANCE.context },
            { title: 'Objetivo', text: PREVENTION_BALANCE.objective }
          ]);
        };

        indicators.innerHTML = PREVENTION_BALANCE.indicators.map(function (indicator) {
          const score = indicator.variables.reduce(function (total, key) {
            return total + beneficialMetricValue(key, metrics[key] || 0);
          }, 0);
          const width = clamp(Math.round((score + 12) * 3), 6, 100);
          const details = indicator.variables.map(function (key) {
            return INSPECTION_METRIC_LABELS[key] + ' ' + signed(metrics[key] || 0);
          }).join(' · ');

          return '<div class="balance-indicator">' +
            '<div class="metric-head"><span>' + indicator.label + '</span><strong>' + signed(score) + '</strong></div>' +
            '<div class="bar"><span style="width:' + width + '%"></span></div>' +
            '<small>' + details + '</small>' +
          '</div>';
        }).join('');

        outcomeBox.innerHTML =
          '<h3 style="margin-top:0;">' + outcome.title + '</h3>' +
          '<p class="muted">' + outcome.text + '</p>' +
          '<p><strong>Lectura de diseño:</strong> No decides si hay incendio. Decides con cuanto caos llega la siguiente escena.</p>';

        alertTitle.textContent = FIRST_ALERT.title;
        alertIntro.textContent = FIRST_ALERT.intro;
        alertContextButton.onclick = function () {
          const completeOptions = FIRST_ALERT.options.map(function (option) {
            return (option.shortLabel || 'Opción ' + option.id.toUpperCase()) + ': ' + option.text;
          }).join('\\n\\n');

          openContext(FIRST_ALERT.title, [
            { title: 'Situación', text: FIRST_ALERT.context },
            { title: 'Criterio operativo', text: FIRST_ALERT.briefing },
            { title: 'Opciones completas', text: completeOptions }
          ]);
        };
        alertQuestion.textContent = FIRST_ALERT.question;

        alertOptions.innerHTML = FIRST_ALERT.options.map(function (option) {
          const selected = state.balance.alertOptionId === option.id ? (option.isCorrect ? 'correct' : 'incorrect') : '';
          return '<button class="alert-option ' + selected + '" data-option="' + option.id + '">' +
            '<strong>' + (option.shortLabel || 'Opción ' + option.id.toUpperCase()) + '</strong>' +
            '<span>' + (option.summary || option.text) + '</span>' +
          '</button>';
        }).join('');

        Array.from(alertOptions.querySelectorAll('button')).forEach(function (btn) {
          btn.addEventListener('click', function () {
            const selected = FIRST_ALERT.options.find(function (option) {
              return option.id === btn.dataset.option;
            });
            if (!selected) return;

            state.balance.alertOptionId = selected.id;
            state.balance.alertFeedback = selected;
            state.winterLog.push({
              node: FIRST_ALERT.title,
              decision: selected.text,
              effects: selected.isCorrect ? 'Decisión sólida' : 'Decisión arriesgada'
            });
            render();
          });
        });

        if (state.balance.alertFeedback) {
          alertFeedback.classList.remove('hidden');
          const feedbackText = state.balance.alertFeedback.feedback
            .replace(/^Respuesta adecuada\\.\\s*/i, '')
            .replace(/^Respuesta incorrecta\\.\\s*/i, '');
          alertFeedback.innerHTML =
            '<p><strong>' + (state.balance.alertFeedback.isCorrect ? 'Decisión sólida' : 'Decisión arriesgada') + ':</strong> ' +
            feedbackText + '</p>' +
            '<p class="muted">' + state.balance.alertFeedback.transition + '</p>' +
            '<div class="button-row"><button class="primary" id="btn-balance-to-winter" type="button">Abrir mapa de crisis</button></div>';

          document.getElementById('btn-balance-to-winter').onclick = function () {
            unlockStage('fronts');
            setStage('fronts');
          };
        } else {
          alertFeedback.classList.add('hidden');
        }
      }

      function crisisZoneIcon(zone) {
        if (zone.icon === 'phone-alert') return '☎';
        if (zone.icon === 'road-fire') return '▰';
        if (zone.icon === 'home-warning') return '⌂';
        return '!';
      }

      function renderFronts() {
        const title = document.getElementById('fronts-title');
        const intro = document.getElementById('fronts-intro');
        const map = document.getElementById('fronts-map');
        const headline = document.getElementById('fronts-headline');
        const body = document.getElementById('fronts-body');
        const routeDetail = document.getElementById('fronts-route-detail');
        const continueButton = document.getElementById('btn-fronts-continue');

        if (!CRISIS_ROUTE_MODULE) {
          title.textContent = 'La emergencia se abre en tres frentes';
          intro.textContent = 'Cargando mapa de crisis...';
          return;
        }

        const route = activeCrisisRoute();
        state.balance.activeRouteId = route.id;

        title.textContent = CRISIS_ROUTE_MODULE.title;
        intro.textContent = CRISIS_ROUTE_MODULE.intro + ' ' + CRISIS_ROUTE_MODULE.objective;

        map.innerHTML = CRISIS_ROUTE_MODULE.mapZones.map(function (zone) {
          const active = zone.id === route.highlightedZone ? 'active' : '';
          return '<div class="front-zone ' + active + '" data-zone="' + zone.id + '">' +
            '<strong>' + crisisZoneIcon(zone) + ' ' + zone.title + '</strong>' +
            '<small>' + zone.description + '</small>' +
          '</div>';
        }).join('');

        headline.textContent = route.uiState.headline;
        body.textContent = route.uiState.body;
        routeDetail.textContent = route.transition + ' Siguiente escenario sugerido: ' + route.nextScenario + '.';
        continueButton.textContent = route.uiState.buttonLabel;
        continueButton.onclick = function () {
          state.winterLog.push({
            node: CRISIS_ROUTE_MODULE.title,
            decision: route.uiState.headline,
            effects: 'Ruta: ' + route.nextScenario
          });
          const nextScenario = GAME_SCENARIOS.find(function (scenario) {
            return scenario.id === route.nextScenario;
          });
          if (nextScenario && nextScenario.type === 'action-selection') {
            startCrisisScenario(nextScenario.id, false);
            return;
          }
          finalizeCampaignResult('La emergencia avanza hacia una nueva fase operativa.');
        };
      }

      function activeCrisisScenario() {
        return GAME_SCENARIOS.find(function (scenario) {
          return scenario.id === state.crisis.activeScenarioId;
        }) || null;
      }

      function startCrisisScenario(scenarioId, preserveMetrics) {
        state.crisis.activeScenarioId = scenarioId;
        state.crisis.selectedActionIds = [];
        state.crisis.appliedFlags = [];
        if (!preserveMetrics) {
          state.crisis.metrics = Object.assign({}, crisisRouteState().metrics);
        }
        state.crisis.feedbackLog = [];
        state.crisis.completed = false;
        state.crisis.outcome = null;
        unlockStage('crisis');
        setStage('crisis');
      }

      function applyCrisisImpact(impact) {
        Object.keys(impact || {}).forEach(function (key) {
          state.crisis.metrics[key] = (state.crisis.metrics[key] || 0) + impact[key];
        });
      }

      function chooseCrisisOutcome(scenario) {
        const outcomes = scenario.outcomes || [];
        const matched = outcomes.find(function (outcome) {
          return conditionRecordMatches(outcome.condition, state.crisis.metrics);
        });
        if (matched) return matched;

        if (outcomes.length > 0) {
          return outcomes[outcomes.length - 1];
        }

        return {
          id: 'medio',
          title: 'Escena resuelta',
          condition: {},
          text: 'La decision queda registrada y la crisis avanza.',
          crisisImpact: {}
        };
      }

      function completeCrisisScenarioIfReady(scenario) {
        if (state.crisis.completed) return;
        if (state.crisis.selectedActionIds.length < scenario.maxActions) return;

        const activeCombos = (scenario.combos || []).filter(function (combo) {
          return combo.requires.every(function (flag) {
            return state.crisis.appliedFlags.includes(flag);
          });
        });

        activeCombos.forEach(function (combo) {
          applyCrisisImpact(combo.bonusImpact);
          state.crisis.feedbackLog.push(combo.title + ': ' + combo.text);
        });

        state.crisis.outcome = chooseCrisisOutcome(scenario);
        applyCrisisImpact(state.crisis.outcome.crisisImpact);
        state.crisis.completed = true;
        state.winterLog.push({
          node: scenario.title,
          decision: state.crisis.selectedActionIds.length + ' acciones inmediatas aplicadas',
          effects: state.crisis.outcome.title
        });
      }

      function applyCrisisAction(scenario, action) {
        if (!scenario || !action || state.crisis.completed) return;
        if (state.crisis.selectedActionIds.includes(action.id)) return;
        if (state.crisis.selectedActionIds.length >= scenario.maxActions) return;

        state.crisis.selectedActionIds.push(action.id);
        (action.flagsOnApply || []).forEach(function (flag) {
          uniquePush(state.crisis.appliedFlags, flag);
        });
        applyCrisisImpact(action.impact);
        state.crisis.feedbackLog.push(action.feedback);
        completeCrisisScenarioIfReady(scenario);
        render();
      }

      function renderCrisisScenario() {
        const scenario = activeCrisisScenario();
        const title = document.getElementById('crisis-title');
        const counter = document.getElementById('crisis-counter');
        const intro = document.getElementById('crisis-intro');
        const contextButton = document.getElementById('btn-crisis-context');
        const pressure = document.getElementById('crisis-pressure');
        const actions = document.getElementById('crisis-actions');
        const feedback = document.getElementById('crisis-feedback');
        const result = document.getElementById('crisis-result');

        if (!scenario) {
          title.textContent = 'Escena de crisis';
          intro.textContent = 'No hay escenario de crisis activo.';
          contextButton.disabled = true;
          return;
        }

        const remaining = scenario.maxActions - state.crisis.selectedActionIds.length;
        title.textContent = scenario.title;
        counter.textContent = remaining + '/' + scenario.maxActions + ' acciones';
        intro.textContent = scenario.intro || '';
        contextButton.disabled = false;
        contextButton.onclick = function () {
          openContext(scenario.title, [
            { title: 'Situación', text: scenario.context },
            { title: 'Criterio operativo', text: scenario.briefing }
          ]);
        };

        pressure.innerHTML = (scenario.pressureIndicators || []).map(function (item) {
          return '<div class="pressure-card"><strong>' + item.label + '</strong><br/><span class="muted">' + item.level + '</span></div>';
        }).join('');

        actions.innerHTML = (scenario.actions || []).map(function (action) {
          const selected = state.crisis.selectedActionIds.includes(action.id);
          const disabled = state.crisis.completed || selected || state.crisis.selectedActionIds.length >= scenario.maxActions;
          return '<button class="crisis-action ' + (selected ? 'selected' : '') + '" data-action="' + action.id + '" ' + (disabled ? 'disabled' : '') + '>' +
            '<strong>' + action.label + '</strong>' +
            '<span>' + action.description + '</span>' +
          '</button>';
        }).join('');

        Array.from(actions.querySelectorAll('button')).forEach(function (btn) {
          btn.addEventListener('click', function () {
            const action = scenario.actions.find(function (item) {
              return item.id === btn.dataset.action;
            });
            applyCrisisAction(scenario, action);
          });
        });

        feedback.innerHTML = state.crisis.feedbackLog.length > 0
          ? state.crisis.feedbackLog.map(function (item) { return '<p class="muted">' + item + '</p>'; }).join('')
          : '<p class="muted">Elige dos actuaciones inmediatas. El 112 no puede esperar a una estrategia perfecta.</p>';

        if (state.crisis.completed) {
          const nextStep = scenarioNextStep(scenario);
          result.classList.remove('hidden');
          result.innerHTML =
            '<h3 style="margin-top:0;">' + state.crisis.outcome.title + '</h3>' +
            '<p class="muted">' + state.crisis.outcome.text + '</p>' +
            (nextStep ? '<p class="muted">' + nextStep.transition + '</p>' : '') +
            '<div class="button-row"><button class="primary" id="btn-crisis-next" type="button">' +
              (nextStep && nextStep.nextScenario !== 'resultado-beta' ? 'Continuar' : 'Ver resultado final') +
            '</button></div>';
          document.getElementById('btn-crisis-next').onclick = function () {
            const step = scenarioNextStep(scenario);
            if (!step || step.nextScenario === 'resultado-beta') {
              finalizeCampaignResult(step?.transition || 'La ruta de crisis queda cerrada.');
              return;
            }

            const nextScenario = GAME_SCENARIOS.find(function (item) {
              return item.id === step.nextScenario;
            });
            if (nextScenario && nextScenario.type === 'action-selection') {
              startCrisisScenario(nextScenario.id, true);
              return;
            }

            finalizeCampaignResult('La emergencia entra en una nueva fase. Revisa el balance de tus decisiones.');
          };
        } else {
          result.classList.add('hidden');
        }
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

      function renderStageStatus() {
        const seasonPill = document.getElementById('season-pill');
        seasonPill.textContent = 'Fase activa: ' + seasonLabel();
      }

      function renderBriefing() {
        const startButton = document.getElementById('btn-start-campaign');
        const contextButton = document.getElementById('btn-briefing-context');
        const status = document.getElementById('briefing-status');
        const isLoading = state.contentStatus === 'loading';
        const hasError = state.contentStatus === 'error';

        startButton.disabled = isLoading;
        startButton.textContent = isLoading
          ? 'Preparando la partida...'
          : hasError
            ? 'Reintentar'
            : state.unlocked.inspection
              ? 'Volver a prevención'
              : 'Comenzar la prevención →';

        status.classList.toggle('hidden', !hasError);
        status.textContent = hasError ? state.contentError : '';

        startButton.onclick = async function () {
          if (hasError) {
            await loadExternalData();
            if (state.contentStatus !== 'ready') {
              render();
              return;
            }
          }
          unlockStage('inspection');
          setStage('inspection');
        };

        contextButton.onclick = function () {
          openContext('Tu misión', [
            {
              title: 'Responsabilidad',
              text: 'Eres responsable de Emergencias en un municipio con zonas de interfaz urbano-forestal. Antes de la época de mayor riesgo puedes preparar viviendas, fincas y comunidad.'
            },
            {
              title: 'Lo que está en juego',
              text: 'Cuando aparezca el humo, las decisiones preventivas condicionarán la seguridad de la población, el margen de los equipos y la claridad de la respuesta pública.'
            }
          ]);
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

            state.summerIndex += 1;

            applyEmergencyAidIfNeeded();
            if (evaluateImmediateDefeat()) return;

            render();
          });
        });
      }

      function finalMetricValue(key) {
        return state.crisis.metrics[key] || 0;
      }

      function finalizeCampaignResult(reason) {
        const protection =
          finalMetricValue('poblacionProtegida') +
          finalMetricValue('inclusionVulnerables') -
          Math.max(0, finalMetricValue('riesgoAtrapamiento'));
        const damage =
          finalMetricValue('danosViviendas') +
          finalMetricValue('riesgoPropagacion') +
          Math.max(0, finalMetricValue('exposicionHumoCalor'));
        const trust =
          finalMetricValue('confianzaInstitucional') +
          finalMetricValue('confianzaPublica') +
          finalMetricValue('confianzaVecinal') -
          Math.max(0, finalMetricValue('confusionPublica'));
        const operational =
          finalMetricValue('coordinacionOperativa') +
          finalMetricValue('seguridadEquipos') -
          Math.max(0, finalMetricValue('saturacion112'));

        const total = protection + trust + operational - damage;
        let type = 'moderado';
        let label = 'Crisis con danos moderados';
        let title = 'La emergencia deja margen, pero no sale limpia';

        if (total >= 10 && protection >= 2) {
          type = 'contenida';
          label = 'Respuesta contenida';
          title = 'La respuesta gana tiempo cuando mas falta hacia';
        } else if (total <= -6 || protection <= -5) {
          type = 'desbordada';
          label = 'Emergencia desbordada';
          title = 'El incendio encuentra demasiadas puertas abiertas';
        }

        state.result = {
          type: type,
          label: label,
          title: title,
          reason: reason,
          metrics: {
            protection: protection,
            damage: damage,
            trust: trust,
            operational: operational
          }
        };

        unlockStage('result');
        state.stage = 'result';
        render();
      }

      function renderResult() {
        const hero = document.getElementById('result-hero');

        if (!state.result) {
          hero.innerHTML = '<h2>Aun no hay resultado</h2><p class="muted">Completa la ruta de crisis para obtener evaluacion final.</p>';
          return;
        }

        hero.innerHTML =
          '<div class="outcome-chip ' + state.result.type + '">' + state.result.label + '</div>' +
          '<h2>' + state.result.title + '</h2>' +
          '<p class="muted">' + state.result.reason + '</p>';

        document.getElementById('result-risk').textContent = signed(state.result.metrics?.protection || 0);
        document.getElementById('result-burned').textContent = signed(state.result.metrics?.damage || 0);
        document.getElementById('result-budget').textContent = signed(state.result.metrics?.trust || 0);

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
          render();
        };

        const reviewButton = document.getElementById('btn-review-winter');
        reviewButton.onclick = function () {
          if (!state.unlocked.inspection) return;
          setStage('inspection');
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
        render();
      }

      async function loadExternalData() {
        state.contentStatus = 'loading';
        state.contentError = null;

        try {
          const contentRes = await fetch('/game-content/data');
          if (!contentRes.ok) throw new Error('No se pudo cargar el contenido');
          const content = await contentRes.json();

          INSPECTION_SCREENS = content.campaign?.preventionInspections || [];
          if (INSPECTION_SCREENS.length === 0 && content.campaign?.preventionInspection) {
            INSPECTION_SCREENS = [content.campaign.preventionInspection];
          }
          PREVENTION_BALANCE = content.campaign?.preventionBalance || null;
          FIRST_ALERT = content.campaign?.firstAlert || null;
          CRISIS_ROUTE_MODULE = content.campaign?.crisisRouteModule || null;
          WINTER_NODES = content.campaign?.winterNodes || [];
          SUMMER_NODES = content.campaign?.summerNodes || [];
          GAME_SCENARIOS = content.scenarios || [];
          state.contentStatus = 'ready';
        } catch (_error) {
          state.contentStatus = 'error';
          state.contentError = 'No se pudo preparar la partida. Comprueba la conexión y vuelve a intentarlo.';
        }
      }

      function render() {
        renderHeader();
        renderStageNav();
        renderScreens();
        renderStageStatus();
        renderBriefing();

        if (state.unlocked.inspection || state.stage === 'inspection') {
          renderInspection();
        }

        if (state.unlocked.balance || state.stage === 'balance') {
          renderBalance();
        }

        if (state.unlocked.fronts || state.stage === 'fronts') {
          renderFronts();
        }

        if (state.unlocked.crisis || state.stage === 'crisis') {
          renderCrisisScenario();
        }

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
        await loadExternalData();
        render();
      }

      init();
    </script>
  </body>
</html>`;
}

