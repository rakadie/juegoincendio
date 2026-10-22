/**
 * Photo-backed housing scene. The bitmap establishes the place while this module
 * owns the explanatory overlays, so all treatment changes still come from game state.
 */
export const HOUSING_BACKGROUND_IMAGE = '/images/housing-prevention-aerial-v2.jpg';
export type HousingPinSide = 'left' | 'right';

export const HOUSING_ACCESS_PATH = 'M900 483 C860 456 840 416 823 373 C810 339 795 310 778 286';
export const HOUSING_CANOPY_ZONE_PATH =
  'M31 86 C73 40 134 50 167 80 C195 53 253 55 285 87 C313 69 360 78 389 108 C412 132 410 173 388 199 C355 228 307 215 276 194 C240 219 190 216 158 193 C118 216 65 205 38 171 C18 146 16 111 31 86 Z';
export const HOUSING_LOW_VEGETATION_PATH =
  'M95 285 C129 247 203 241 263 267 C315 289 342 335 330 386 C318 436 268 458 209 455 C149 452 99 426 83 381 C70 343 75 309 95 285 Z';
export const HOUSING_EMBER_ZONE_PATH =
  'M492 160 Q622 125 775 170 Q844 194 850 282 Q789 331 649 326 Q530 323 474 274 Q459 210 492 160 Z';
export const HOUSING_FIREWOOD_ZONE_PATH =
  'M704 314 Q758 292 814 318 L844 388 Q787 413 720 389 Z';

export function renderHousingPlanDefs(): string {
  return `<defs>
    <linearGradient id="housing-photo-wash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#102b25" stop-opacity=".16" />
      <stop offset=".48" stop-color="#102b25" stop-opacity=".02" />
      <stop offset="1" stop-color="#102b25" stop-opacity=".12" />
    </linearGradient>
    <pattern id="housing-treated-ground" width="18" height="18" patternUnits="userSpaceOnUse">
      <rect width="18" height="18" fill="#d8cfad" fill-opacity=".9" />
      <path d="M2 13 l6 -2 m5 -6 l3 -1" stroke="#8aa07b" stroke-width="1.3" stroke-linecap="round" opacity=".75" />
    </pattern>
    <filter id="housing-pin-shadow" x="-35%" y="-35%" width="180%" height="190%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0b1d18" flood-opacity=".35" />
    </filter>
    <style>
      .housing-plan { font-family: 'Segoe UI', Arial, sans-serif; }
      .housing-plan .housing-base, .housing-plan .housing-photo-layer { pointer-events: none; }
      .housing-plan .housing-photo-background { width: 900px; height: 500px; }
      .housing-plan .housing-photo-wash { fill: url(#housing-photo-wash); }
      .housing-plan .housing-scene-caption { fill: #102821; fill-opacity: .86; stroke: #f8f2df; stroke-opacity: .72; stroke-width: 1; }
      .housing-plan .housing-place-label { fill: #fffaf0; font-size: 13px; font-weight: 750; letter-spacing: 1.7px; }
      .housing-plan .housing-scene-note { fill: #f3ead5; font-size: 11px; }
      .housing-plan .visual-hotspot path, .housing-plan .visual-hotspot ellipse { vector-effect: non-scaling-stroke; }
      .housing-plan .housing-risk-zone { fill: #c47a32; fill-opacity: .045; stroke: #ffe0a8; stroke-width: .9; stroke-dasharray: 6 7; opacity: .58; transition: fill-opacity .2s ease, opacity .2s ease, stroke-width .2s ease; }
      .housing-plan .housing-risk-detail { fill: none; stroke: #fff1ce; stroke-width: .85; stroke-linecap: round; opacity: .5; filter: drop-shadow(0 1px 1px #513219); transition: opacity .2s ease, stroke-width .2s ease; }
      .housing-plan #housing-vertical-fuel:is(:hover, :focus-visible, .is-context-active) .housing-risk-zone { fill-opacity: .09; stroke-width: 1.25; opacity: .95; }
      .housing-plan #housing-vertical-fuel:is(:hover, :focus-visible, .is-context-active) .housing-risk-detail { stroke-width: 1.2; opacity: .9; }
      .housing-plan #housing-vertical-fuel .housing-clearance { display: none; fill: url(#housing-treated-ground); stroke: #e9f1db; stroke-width: 1.5; stroke-dasharray: 6 6; opacity: .36; }
      .housing-plan #housing-vertical-fuel .housing-cut-marks { display: none; fill: none; stroke: #496c57; stroke-width: 2; stroke-linecap: round; }
      .housing-plan #housing-vertical-fuel.state-reduced .housing-risk-zone,
      .housing-plan #housing-vertical-fuel.state-reduced .housing-dry-fuel,
      .housing-plan #housing-vertical-fuel.state-reduced .housing-low-branches { display: none; }
      .housing-plan #housing-vertical-fuel.state-reduced .housing-clearance,
      .housing-plan #housing-vertical-fuel.state-reduced .housing-cut-marks { display: block; }
      .housing-plan .housing-clearance-worker { display: none; pointer-events: none; transform-box: fill-box; transform-origin: center; filter: url(#housing-pin-shadow); }
      .housing-plan #housing-vertical-fuel.state-reduced .housing-clearance-worker { display: block; animation: housing-worker-cut 1.9s ease-in-out infinite alternate; }
      .housing-plan #housing-canopy .housing-canopy-separated { display: none; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-connected { display: none; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-separated { display: block; }
      .housing-plan #housing-canopy .housing-canopy-crown { fill: none; stroke: #ffe4ae; stroke-width: 1; stroke-dasharray: 7 7; opacity: .56; filter: drop-shadow(0 1px 1px #274433); transition: opacity .2s ease, stroke-width .2s ease; }
      .housing-plan #housing-canopy .housing-canopy-link { fill: none; stroke: #c87831; stroke-width: 2.5; stroke-linecap: round; opacity: .14; transition: opacity .2s ease, stroke-width .2s ease; }
      .housing-plan #housing-canopy .housing-canopy-link-detail { fill: none; stroke: #fff1c9; stroke-width: .8; stroke-dasharray: 6 7; opacity: .48; transition: opacity .2s ease, stroke-width .2s ease; }
      .housing-plan #housing-canopy:is(:hover, :focus-visible, .is-context-active) .housing-canopy-crown { stroke-width: 1.35; opacity: .95; }
      .housing-plan #housing-canopy:is(:hover, :focus-visible, .is-context-active) .housing-canopy-link { stroke-width: 3; opacity: .24; }
      .housing-plan #housing-canopy:is(:hover, :focus-visible, .is-context-active) .housing-canopy-link-detail { stroke-width: 1.15; opacity: .88; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-crown { stroke: #dcedd7; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-gap { fill: url(#housing-treated-ground); stroke: #f3f7e8; stroke-width: 1.5; stroke-dasharray: 5 6; opacity: .6; }
      .housing-plan #housing-canopy.state-broken .housing-gap-mark { fill: none; stroke: #3f7359; stroke-width: 2.2; stroke-linecap: round; }
      .housing-plan #housing-local-access .housing-firewood-zone { fill: #9b5327; fill-opacity: .05; stroke: #ffe0a8; stroke-width: .85; stroke-dasharray: 6 7; opacity: .6; }
      .housing-plan #housing-local-access .housing-firewood-pile { transform-box: fill-box; transform-origin: center; filter: url(#housing-pin-shadow); }
      .housing-plan #housing-local-access .housing-log-body { fill: #80502d; stroke: #f0c58d; stroke-width: .8; }
      .housing-plan #housing-local-access .housing-log-end { fill: #c49158; stroke: #5d3c25; stroke-width: .7; }
      .housing-plan #housing-local-access .housing-log-ring { fill: none; stroke: #7b4d2c; stroke-width: .55; opacity: .9; }
      .housing-plan #housing-local-access .housing-firewood-rack { fill: none; stroke: #e8d6b5; stroke-width: 2.2; stroke-linecap: round; }
      .housing-plan #housing-local-access.state-clear .housing-firewood-pile { animation: housing-firewood-remove .78s ease-out forwards; }
      .housing-plan #housing-local-access.state-clear .housing-firewood-zone { fill: #dcebd6; fill-opacity: .06; stroke: #dcebd6; opacity: .45; }
      .housing-plan #housing-local-access .housing-clear-route { display: none; fill: none; stroke: #dcebd6; stroke-width: 5; stroke-linecap: round; opacity: .17; }
      .housing-plan #housing-local-access .housing-clear-route-line { display: none; fill: none; stroke: #356b53; stroke-width: 1.25; stroke-linecap: round; stroke-dasharray: 8 7; opacity: .82; }
      .housing-plan #housing-local-access.state-clear .housing-access-obstructions { display: none; }
      .housing-plan #housing-local-access.state-clear .housing-clear-route,
      .housing-plan #housing-local-access.state-clear .housing-clear-route-line { display: block; }
      .housing-plan .housing-access-obstructions { fill: none; stroke: #fff0cf; stroke-width: 5; stroke-linecap: round; filter: drop-shadow(0 1px 1px #513219); }
      .housing-plan .housing-condition-ring { fill: #c07832; fill-opacity: .025; stroke: #ffe1ac; stroke-width: .85; stroke-dasharray: 7 8; opacity: .46; transition: fill-opacity .2s ease, opacity .2s ease, stroke-width .2s ease; }
      .housing-plan #housing-home:is(:hover, :focus-visible, .is-context-active) .housing-condition-ring { fill-opacity: .055; stroke-width: 1.2; opacity: .9; }
      .housing-plan .housing-ember-state-overlay { pointer-events: none; }
      .housing-plan .housing-ember-zone { fill: #bc6d2f; fill-opacity: .035; stroke: #ffe3af; stroke-width: .8; stroke-dasharray: 6 7; opacity: .52; }
      .housing-plan .housing-ember-gutter { fill: none; stroke: #f6dfb9; stroke-width: 3.2; stroke-linecap: round; filter: drop-shadow(0 1px 1px #3f2b1b); }
      .housing-plan .housing-ember-debris { fill: #6e431f; stroke: #f0bf73; stroke-width: .55; filter: drop-shadow(0 1px 1px #2b2017); }
      .housing-plan .housing-ember-vent-shell { fill: #efe8d7; stroke: #423f38; stroke-width: 1.1; }
      .housing-plan .housing-ember-vent-opening { fill: #1e2927; stroke: #f4c680; stroke-width: .8; }
      .housing-plan .housing-ember-treated { opacity: 0; }
      .housing-plan .housing-ember-clean-gutter { fill: none; stroke: #eaf4e7; stroke-width: 3.4; stroke-linecap: round; filter: drop-shadow(0 1px 1px #294b3b); }
      .housing-plan .housing-ember-mesh { fill: #dce9df; fill-opacity: .84; stroke: #2f6650; stroke-width: 1.2; }
      .housing-plan .housing-ember-mesh-line { fill: none; stroke: #2f6650; stroke-width: .65; opacity: .9; }
      .housing-plan .housing-ember-cap { fill: #dce9df; stroke: #2f6650; stroke-width: 1.1; }
      .housing-plan .housing-ember-maintenance-sweep { opacity: 0; transform-box: fill-box; transform-origin: center; }
      .housing-plan .housing-ember-state-overlay.state-protected .housing-ember-vulnerable { animation: housing-ember-debris-clear .72s ease-out forwards; }
      .housing-plan .housing-ember-state-overlay.state-protected .housing-ember-treated { animation: housing-ember-protection-install .82s .16s ease-out forwards; }
      .housing-plan .housing-ember-state-overlay.state-protected .housing-ember-maintenance-sweep { animation: housing-ember-sweep .72s ease-out forwards; }
      .housing-plan .housing-hotspot-area { fill: #fff; fill-opacity: .001; stroke: none; pointer-events: all; }
      .housing-plan .map-pin-hit-target { fill: #fff; fill-opacity: .001; stroke: none; pointer-events: all; }
      .housing-plan .map-pin-halo { fill: none; stroke: #ffe2a7; stroke-width: 1.5; opacity: 0; }
      .housing-plan .map-pin-disc { fill: #fffaf0; stroke: #765837; stroke-width: 1.5; filter: url(#housing-pin-shadow); }
      .housing-plan .map-pin-number { fill: #67492c; font-size: 7.2px; font-weight: 750; text-anchor: middle; dominant-baseline: central; }
      .housing-plan .map-pin-label-bg { fill: #fffaf0; fill-opacity: .9; stroke: #765837; stroke-opacity: .72; stroke-width: 1; filter: url(#housing-pin-shadow); }
      .housing-plan .map-pin-label { fill: #263b31; font-size: 6.25px; font-weight: 700; dominant-baseline: central; letter-spacing: .03px; }
      .housing-plan .map-pin-check { display: none; fill: none; stroke: #fffaf0; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
      .housing-plan .map-pin[data-applied="true"] .map-pin-disc { fill: #346755; stroke: #fffaf0; }
      .housing-plan .map-pin[data-applied="true"] .map-pin-number { fill: #fffaf0; }
      .housing-plan .map-pin[data-applied="true"] .map-pin-check { display: block; }
      .housing-plan .map-pin-info .map-pin-disc { fill: #fff5df; stroke: #b17638; }
      .housing-plan .visual-hotspot:hover, .housing-plan .visual-hotspot:focus-visible { filter: none; }
      .housing-plan .visual-hotspot:hover .map-pin-halo, .housing-plan .visual-hotspot:focus-visible .map-pin-halo, .housing-plan .visual-hotspot.is-context-active .map-pin-halo { opacity: 1; }
      .housing-plan .visual-hotspot:focus-visible .map-pin-label-bg { stroke: #fffaf0; stroke-width: 2; }
      @keyframes housing-worker-cut {
        from { transform: translate(-.6px, .5px) rotate(-.4deg); }
        to { transform: translate(1px, -.5px) rotate(.5deg); }
      }
      @keyframes housing-firewood-remove {
        0% { opacity: 1; transform: translate(0, 0) scale(1); }
        72% { opacity: .18; transform: translate(24px, 10px) scale(.86); }
        100% { opacity: 0; transform: translate(32px, 13px) scale(.8); }
      }
      @keyframes housing-ember-debris-clear {
        0% { opacity: 1; transform: translateY(0); }
        70% { opacity: .15; transform: translate(12px, 7px); }
        100% { opacity: 0; transform: translate(18px, 9px); }
      }
      @keyframes housing-ember-protection-install {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes housing-ember-sweep {
        0% { opacity: 0; transform: translate(-16px, 1px) rotate(-10deg); }
        20% { opacity: 1; }
        85% { opacity: 1; transform: translate(20px, -1px) rotate(8deg); }
        100% { opacity: 0; transform: translate(24px, -1px) rotate(8deg); }
      }
      @media (prefers-reduced-motion: reduce) {
        .housing-plan #housing-local-access.state-clear .housing-firewood-pile { display: none; animation: none; }
        .housing-plan .housing-ember-state-overlay.state-protected .housing-ember-vulnerable { display: none; animation: none; }
        .housing-plan .housing-ember-state-overlay.state-protected .housing-ember-treated { opacity: 1; animation: none; }
        .housing-plan .housing-ember-state-overlay.state-protected .housing-ember-maintenance-sweep { display: none; animation: none; }
      }
      @media (max-width: 700px) {
        .housing-plan .map-pin-label-bg, .housing-plan .map-pin-label { display: none; }
        .housing-plan .map-pin-disc { r: 10.5px; stroke-width: 1.7; }
        .housing-plan .map-pin-halo { r: 15px; }
        .housing-plan .map-pin-number { font-size: 8.4px; }
        .housing-plan .housing-place-label { font-size: 22px; letter-spacing: 1px; }
        .housing-plan .housing-scene-note { display: none; }
        .housing-plan .housing-scale-caption { display: none; }
      }
    </style>
  </defs>`;
}

export function renderHousingPlanBase(): string {
  return `<g class="housing-base" aria-hidden="true">
    <rect width="900" height="500" fill="#c9c19f" />
    <image class="housing-photo-layer housing-photo-background" data-background-layer="photo" href="${HOUSING_BACKGROUND_IMAGE}" x="0" y="0" width="900" height="500" preserveAspectRatio="xMidYMid slice" />
    <rect class="housing-photo-layer housing-photo-wash" width="900" height="500" />
    <g transform="translate(24 60)">
      <rect class="housing-scene-caption" width="292" height="42" rx="10" />
      <text class="housing-place-label" x="18" y="27">VIVIENDA Y ENTORNO</text>
    </g>
  </g>`;
}

export function renderHousingHome(): string {
  return `<g aria-hidden="true">
    <path class="housing-condition-ring" d="M487 159 Q623 121 787 173 Q869 203 861 313 Q788 367 626 349 Q510 342 459 280 Q451 207 487 159Z" />
  </g>`;
}

export function renderHousingPin(
  number: number | 'i',
  x: number,
  y: number,
  label: string,
  width: number,
  applied: boolean,
  side: HousingPinSide = 'right'
): string {
  const infoClass = number === 'i' ? ' map-pin-info' : '';
  const labelX = side === 'right' ? 6.5 : -width - 6.5;
  const textX = labelX + 8;
  return `<g class="map-pin${infoClass}" data-applied="${applied}" transform="translate(${x} ${y})" aria-hidden="true">
    <circle class="map-pin-hit-target" r="54" />
    <rect class="map-pin-label-bg" x="${labelX}" y="-8" width="${width}" height="16" rx="3.5" />
    <text class="map-pin-label" x="${textX}" y="0">${label}</text>
    <circle class="map-pin-halo" r="12" />
    <circle class="map-pin-disc" r="8" />
    <text class="map-pin-number" x="0" y="0">${number}</text>
    <g class="map-pin-check" transform="translate(7 -7)"><circle r="3.5" fill="#346755" stroke-width="1" /><path d="M-1.4 0 l1.1 1 2.2 -2.2" stroke-width=".9" /></g>
  </g>`;
}

export function renderHousingFirewoodPile(): string {
  const logs = [
    [726, 347, -5], [751, 343, 4], [776, 346, -3], [801, 343, 5],
    [737, 362, 3], [763, 360, -4], [789, 363, 2],
    [748, 377, -2], [776, 377, 4]
  ] as const;
  return `<g class="housing-firewood-pile" aria-hidden="true">
    <path class="housing-firewood-rack" d="M718 389 l13 -62 m79 63 l-13 -63 M719 383 h90" />
    ${logs.map(([x, y, rotation]) => `<g transform="translate(${x} ${y}) rotate(${rotation})">
      <rect class="housing-log-body" x="-17" y="-6" width="34" height="12" rx="5" />
      <ellipse class="housing-log-end" cx="17" cy="0" rx="5" ry="6" />
      <ellipse class="housing-log-ring" cx="17" cy="0" rx="2.4" ry="3.2" />
    </g>`).join('')}
  </g>`;
}

export function renderHousingEmberProtectionOverlay(
  state: 'exposed' | 'protected'
): string {
  return `<g class="housing-ember-state-overlay state-${state}" data-state-overlay="home-ember-protection" aria-hidden="true">
    <path class="housing-ember-zone" d="${HOUSING_EMBER_ZONE_PATH}" />
    <g class="housing-ember-vulnerable">
      <path class="housing-ember-gutter" d="M552 184 Q636 157 739 183" />
      <g class="housing-ember-debris">
        <ellipse cx="574" cy="178" rx="5" ry="2.4" transform="rotate(-18 574 178)" />
        <ellipse cx="598" cy="171" rx="4.5" ry="2.2" transform="rotate(14 598 171)" />
        <path d="M625 167 l5 -4 4 5 -5 4Z M651 165 l6 -2 3 6 -6 2Z M685 169 l5 -4 5 5 -6 4Z M713 176 l5 -3 4 5 -5 3Z" />
      </g>
      <g transform="translate(693 198)">
        <rect class="housing-ember-vent-shell" width="34" height="22" rx="3" />
        <rect class="housing-ember-vent-opening" x="5" y="5" width="24" height="12" rx="2" />
        <path class="housing-ember-vent-opening" d="M8 8 h18 M8 12 h18 M8 16 h18" />
      </g>
      <g class="housing-ember-debris" transform="translate(748 246)">
        <path d="M0 18 l8 -17 12 15 8 -11 11 19Z" />
        <ellipse cx="15" cy="27" rx="17" ry="4" />
      </g>
    </g>
    <g class="housing-ember-treated">
      <path class="housing-ember-clean-gutter" d="M552 184 Q636 157 739 183" />
      <g transform="translate(693 198)">
        <rect class="housing-ember-vent-shell" width="34" height="22" rx="3" />
        <rect class="housing-ember-mesh" x="5" y="5" width="24" height="12" rx="1.5" />
        <path class="housing-ember-mesh-line" d="M9 5 v12 M13 5 v12 M17 5 v12 M21 5 v12 M25 5 v12 M29 5 v12 M5 9 h24 M5 13 h24" />
      </g>
      <g transform="translate(626 145)">
        <path class="housing-ember-cap" d="M0 16 h24 l-3 -5 H3Z" />
        <path class="housing-ember-mesh-line" d="M5 11 V2 M10 11 V2 M15 11 V2 M20 11 V2 M3 5 h18 M3 8 h18" />
      </g>
      <path class="housing-ember-clean-gutter" d="M740 250 q18 8 32 -1" />
    </g>
    <g class="housing-ember-maintenance-sweep" transform="translate(645 172)">
      <path d="M0 0 l21 -16" stroke="#f7ecd2" stroke-width="2.4" stroke-linecap="round" />
      <path d="M-4 -2 l9 8 M-1 -5 l9 8 M2 -8 l9 8" stroke="#d48a3b" stroke-width="2" stroke-linecap="round" />
    </g>
  </g>`;
}
