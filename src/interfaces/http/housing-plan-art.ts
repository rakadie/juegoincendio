/**
 * Photo-backed housing scene. The bitmap establishes the place while this module
 * owns the explanatory overlays, so all treatment changes still come from game state.
 */
export const HOUSING_BACKGROUND_IMAGE = '/images/housing-prevention-aerial-v2.jpg';

export const HOUSING_ACCESS_PATH = 'M900 483 C860 456 840 416 823 373 C810 339 795 310 778 286';
export const HOUSING_CANOPY_ZONE_PATH =
  'M31 86 C73 40 134 50 167 80 C195 53 253 55 285 87 C313 69 360 78 389 108 C412 132 410 173 388 199 C355 228 307 215 276 194 C240 219 190 216 158 193 C118 216 65 205 38 171 C18 146 16 111 31 86 Z';
export const HOUSING_LOW_VEGETATION_PATH =
  'M95 285 C129 247 203 241 263 267 C315 289 342 335 330 386 C318 436 268 458 209 455 C149 452 99 426 83 381 C70 343 75 309 95 285 Z';

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
      .housing-plan .housing-risk-zone { fill: #c47a32; fill-opacity: .12; stroke: #ffe0a8; stroke-width: 1.5; stroke-dasharray: 6 7; }
      .housing-plan .housing-risk-detail { fill: none; stroke: #fff1ce; stroke-width: 1.6; stroke-linecap: round; filter: drop-shadow(0 1px 1px #513219); }
      .housing-plan #housing-vertical-fuel .housing-clearance { display: none; fill: url(#housing-treated-ground); stroke: #e9f1db; stroke-width: 1.5; stroke-dasharray: 6 6; opacity: .36; }
      .housing-plan #housing-vertical-fuel .housing-cut-marks { display: none; fill: none; stroke: #496c57; stroke-width: 2; stroke-linecap: round; }
      .housing-plan #housing-vertical-fuel.state-reduced .housing-risk-zone,
      .housing-plan #housing-vertical-fuel.state-reduced .housing-dry-fuel,
      .housing-plan #housing-vertical-fuel.state-reduced .housing-low-branches { display: none; }
      .housing-plan #housing-vertical-fuel.state-reduced .housing-clearance,
      .housing-plan #housing-vertical-fuel.state-reduced .housing-cut-marks { display: block; }
      .housing-plan #housing-canopy .housing-canopy-separated { display: none; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-connected { display: none; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-separated { display: block; }
      .housing-plan #housing-canopy .housing-canopy-crown { fill: none; stroke: #ffe4ae; stroke-width: 1.5; stroke-dasharray: 7 7; filter: drop-shadow(0 1px 1px #274433); }
      .housing-plan #housing-canopy .housing-canopy-link { fill: none; stroke: #c87831; stroke-width: 5; stroke-linecap: round; opacity: .3; }
      .housing-plan #housing-canopy .housing-canopy-link-detail { fill: none; stroke: #fff1c9; stroke-width: 1.5; stroke-dasharray: 6 7; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-crown { stroke: #dcedd7; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-gap { fill: url(#housing-treated-ground); stroke: #f3f7e8; stroke-width: 1.5; stroke-dasharray: 5 6; opacity: .6; }
      .housing-plan #housing-canopy.state-broken .housing-gap-mark { fill: none; stroke: #3f7359; stroke-width: 2.2; stroke-linecap: round; }
      .housing-plan #housing-local-access .housing-access-risk { fill: none; stroke: #c87831; stroke-width: 8; stroke-linecap: round; opacity: .22; }
      .housing-plan #housing-local-access .housing-access-centre { fill: none; stroke: #fff0c6; stroke-width: 1.6; stroke-linecap: round; stroke-dasharray: 6 7; }
      .housing-plan #housing-local-access .housing-clear-route { display: none; fill: none; stroke: #dcebd6; stroke-width: 8; stroke-linecap: round; opacity: .3; }
      .housing-plan #housing-local-access .housing-clear-route-line { display: none; fill: none; stroke: #356b53; stroke-width: 1.8; stroke-linecap: round; stroke-dasharray: 8 7; }
      .housing-plan #housing-local-access.state-clear .housing-access-risk,
      .housing-plan #housing-local-access.state-clear .housing-access-obstructions { display: none; }
      .housing-plan #housing-local-access.state-clear .housing-clear-route,
      .housing-plan #housing-local-access.state-clear .housing-clear-route-line { display: block; }
      .housing-plan .housing-access-obstructions { fill: none; stroke: #fff0cf; stroke-width: 5; stroke-linecap: round; filter: drop-shadow(0 1px 1px #513219); }
      .housing-plan .housing-condition-ring { fill: #c07832; fill-opacity: .05; stroke: #ffe1ac; stroke-width: 1.5; stroke-dasharray: 7 8; }
      .housing-plan .map-pin-hit-target { fill: #fff; fill-opacity: .001; stroke: none; pointer-events: all; }
      .housing-plan .map-pin-halo { fill: none; stroke: #ffe2a7; stroke-width: 3; opacity: 0; }
      .housing-plan .map-pin-disc { fill: #fffaf0; stroke: #765837; stroke-width: 2.5; filter: url(#housing-pin-shadow); }
      .housing-plan .map-pin-number { fill: #67492c; font-size: 16px; font-weight: 700; text-anchor: middle; dominant-baseline: central; }
      .housing-plan .map-pin-label-bg { fill: #fffaf0; stroke: #765837; stroke-width: 1.5; filter: url(#housing-pin-shadow); }
      .housing-plan .map-pin-label { fill: #263b31; font-size: 13px; font-weight: 650; dominant-baseline: central; }
      .housing-plan .map-pin-check { display: none; fill: none; stroke: #fffaf0; stroke-width: 2.7; stroke-linecap: round; stroke-linejoin: round; }
      .housing-plan .map-pin[data-applied="true"] .map-pin-disc { fill: #346755; stroke: #fffaf0; }
      .housing-plan .map-pin[data-applied="true"] .map-pin-number { fill: #fffaf0; }
      .housing-plan .map-pin[data-applied="true"] .map-pin-check { display: block; }
      .housing-plan .map-pin-info .map-pin-disc { fill: #fff5df; stroke: #b17638; }
      .housing-plan .visual-hotspot:hover, .housing-plan .visual-hotspot:focus-visible { filter: none; }
      .housing-plan .visual-hotspot:hover .map-pin-halo, .housing-plan .visual-hotspot:focus-visible .map-pin-halo { opacity: 1; }
      .housing-plan .visual-hotspot:focus-visible .map-pin-label-bg { stroke: #fffaf0; stroke-width: 3; }
      @media (max-width: 700px) {
        .housing-plan .map-pin-label-bg, .housing-plan .map-pin-label { display: none; }
        .housing-plan .map-pin-disc { r: 26px; stroke-width: 3; }
        .housing-plan .map-pin-halo { r: 31px; }
        .housing-plan .map-pin-number { font-size: 23px; }
        .housing-plan .housing-place-label { font-size: 16px; letter-spacing: 1px; }
        .housing-plan .housing-scene-note { display: none; }
      }
    </style>
  </defs>`;
}

export function renderHousingPlanBase(): string {
  return `<g class="housing-base" aria-hidden="true">
    <rect width="900" height="500" fill="#c9c19f" />
    <image class="housing-photo-layer housing-photo-background" data-background-layer="photo" href="${HOUSING_BACKGROUND_IMAGE}" x="0" y="0" width="900" height="500" preserveAspectRatio="xMidYMid slice" />
    <rect class="housing-photo-layer housing-photo-wash" width="900" height="500" />
    <g transform="translate(24 22)">
      <rect class="housing-scene-caption" width="292" height="42" rx="10" />
      <text class="housing-place-label" x="18" y="27">VIVIENDA Y ENTORNO</text>
    </g>
    <g transform="translate(641 24)">
      <rect class="housing-scene-caption" width="235" height="34" rx="9" />
      <text class="housing-scene-note" x="118" y="22" text-anchor="middle">Las distancias no son exactas</text>
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
  applied: boolean
): string {
  const infoClass = number === 'i' ? ' map-pin-info' : '';
  return `<g class="map-pin${infoClass}" data-applied="${applied}" transform="translate(${x} ${y})" aria-hidden="true">
    <circle class="map-pin-hit-target" r="58" />
    <rect class="map-pin-label-bg" x="10" y="-16" width="${width}" height="32" rx="8" />
    <text class="map-pin-label" x="29" y="0">${label}</text>
    <circle class="map-pin-halo" r="23" />
    <circle class="map-pin-disc" r="18" />
    <text class="map-pin-number" x="0" y="0">${number}</text>
    <g class="map-pin-check" transform="translate(15 -15)"><circle r="7" fill="#346755" stroke-width="1.5" /><path d="M-3 0 l2 2 4 -4" stroke-width="1.5" /></g>
  </g>`;
}
