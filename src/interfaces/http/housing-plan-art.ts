/** Decorative plan view. Decision state is supplied by the visual presenter. */
export const HOUSING_ACCESS_PATH = 'M910 454 C790 445 747 417 710 391 S682 371 661 355';

export function renderHousingShrub(x: number, y: number, scale = 1): string {
  return `<g class="housing-shrub" data-art-primitive="shrubs" transform="translate(${x} ${y}) scale(${scale})" aria-hidden="true">
    <path d="M-17 3 C-24 -8 -11 -19 -2 -12 C4 -23 20 -12 15 -2 C27 5 14 19 3 13 C-8 23 -24 15 -17 3Z" />
    <path d="M-10 4 Q0 -4 10 4" />
  </g>`;
}

export function renderHousingTree(x: number, y: number, scale = 1): string {
  return `<g class="housing-tree" data-art-primitive="tree" transform="translate(${x} ${y}) scale(${scale})" aria-hidden="true">
    <circle class="housing-tree-shadow" cx="5" cy="7" r="49" />
    <circle class="housing-tree-crown" r="47" />
    <path class="housing-tree-needles" d="M-25 -17 Q-7 -35 8 -22 M-34 5 Q-15 -7 2 1 M7 -28 Q28 -23 31 -6 M9 18 Q29 9 34 17 M-18 28 Q-4 13 9 23" />
    <circle class="housing-tree-trunk" r="8" />
  </g>`;
}

export function renderHousingPlanDefs(): string {
  return `<defs>
    <pattern id="housing-ground" width="28" height="28" patternUnits="userSpaceOnUse">
      <rect width="28" height="28" fill="#d8dab7" />
      <path d="M4 22 l5 -3 m11 -10 l4 -2 M7 7 l3 2" stroke="#aab18b" stroke-width="1.2" stroke-linecap="round" />
    </pattern>
    <pattern id="housing-cleared-ground" width="22" height="22" patternUnits="userSpaceOnUse">
      <rect width="22" height="22" fill="#e5dec1" />
      <path d="M3 15 l5 -2 m7 -7 l4 -1" stroke="#b9a98a" stroke-width="1.3" stroke-linecap="round" />
    </pattern>
    <linearGradient id="housing-roof" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c9825d" /><stop offset="1" stop-color="#9d5d45" />
    </linearGradient>
    <filter id="housing-shadow" x="-25%" y="-25%" width="160%" height="170%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#243c32" flood-opacity=".22" />
    </filter>
    <style>
      .housing-plan { font-family: 'Segoe UI', Arial, sans-serif; }
      .housing-plan .housing-base { pointer-events: none; }
      .housing-plan .housing-boundary { fill: none; stroke: #f7f0d8; stroke-width: 5; stroke-dasharray: 13 8; }
      .housing-plan .housing-contour { fill: none; stroke: #a8ad88; stroke-width: 1.4; opacity: .45; }
      .housing-plan .housing-place-label { fill: #69745b; font-size: 11px; font-weight: 700; letter-spacing: 1.8px; }
      .housing-plan .housing-tree-shadow { fill: #405947; opacity: .2; }
      .housing-plan .housing-tree-crown { fill: #63805e; stroke: #3f644d; stroke-width: 2; }
      .housing-plan .housing-tree-needles { fill: none; stroke: #9cb181; stroke-width: 3; stroke-linecap: round; opacity: .78; }
      .housing-plan .housing-tree-trunk { fill: #76573d; stroke: #f0dbb6; stroke-width: 2; }
      .housing-plan .housing-shrub path:first-child { fill: #8e9f6d; stroke: #687f57; stroke-width: 1.6; }
      .housing-plan .housing-shrub path:last-child { fill: none; stroke: #d0d5a7; stroke-width: 1.6; }
      .housing-plan .housing-home-shadow { fill: #344f40; opacity: .17; }
      .housing-plan .housing-house-wall { fill: #e5c69f; stroke: #8d6b50; stroke-width: 2; }
      .housing-plan .housing-roof { fill: url(#housing-roof); stroke: #fff3df; stroke-width: 5; filter: url(#housing-shadow); }
      .housing-plan .housing-roof-ridge { stroke: #7f4d3d; stroke-width: 3; }
      .housing-plan .housing-porch, .housing-plan .housing-garage { fill: #f4e8ce; stroke: #94765b; stroke-width: 2; }
      .housing-plan .housing-door { fill: #6e5141; }
      .housing-plan .housing-window { fill: #b8e2eb; stroke: #f4ffff; stroke-width: 2; }
      .housing-plan .housing-chimney { fill: #8f5c4c; stroke: #fff0df; stroke-width: 1.5; }
      .housing-plan .housing-condition-ring { fill: none; stroke: #b17638; stroke-width: 4; stroke-dasharray: 9 7; opacity: .8; }
      .housing-plan #housing-vertical-fuel .housing-fuel-patch { fill: #aa9867; stroke: #8a704b; stroke-width: 2; }
      .housing-plan #housing-vertical-fuel .housing-dry-fuel { fill: none; stroke: #9b754a; stroke-width: 4; stroke-linecap: round; }
      .housing-plan #housing-vertical-fuel .housing-low-branches { fill: none; stroke: #76573d; stroke-width: 8; stroke-linecap: round; }
      .housing-plan #housing-vertical-fuel .housing-clearance { display: none; fill: url(#housing-cleared-ground); stroke: #688363; stroke-width: 3; stroke-dasharray: 7 5; }
      .housing-plan #housing-vertical-fuel.state-reduced .housing-fuel-patch,
      .housing-plan #housing-vertical-fuel.state-reduced .housing-dry-fuel,
      .housing-plan #housing-vertical-fuel.state-reduced .housing-low-branches,
      .housing-plan #housing-vertical-fuel.state-reduced .housing-fuel-shrubs { display: none; }
      .housing-plan #housing-vertical-fuel.state-reduced .housing-clearance { display: block; }
      .housing-plan #housing-canopy .housing-canopy-separated { display: none; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-connected { display: none; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-separated { display: block; }
      .housing-plan #housing-canopy .housing-canopy-link { fill: none; stroke: #6f8b63; stroke-width: 52; stroke-linecap: round; opacity: .72; }
      .housing-plan #housing-canopy.state-broken .housing-canopy-gap { fill: #e2dfbd; stroke: #698463; stroke-width: 3; stroke-dasharray: 7 6; }
      .housing-plan #housing-local-access .housing-access-margin { fill: none; stroke: #82956c; stroke-width: 74; stroke-linecap: round; }
      .housing-plan #housing-local-access .housing-driveway { fill: none; stroke: #f6ebd1; stroke-width: 31; stroke-linecap: round; }
      .housing-plan #housing-local-access .housing-access-centre { fill: none; stroke: #b9a47f; stroke-width: 2; stroke-dasharray: 8 9; }
      .housing-plan #housing-local-access .housing-clear-route { display: none; fill: none; stroke: #3d7b62; stroke-width: 4; stroke-dasharray: 10 7; }
      .housing-plan #housing-local-access.state-clear .housing-access-margin { stroke: #d6cfad; stroke-width: 86; }
      .housing-plan #housing-local-access.state-clear .housing-driveway { stroke-width: 47; }
      .housing-plan #housing-local-access.state-clear .housing-access-obstructions { display: none; }
      .housing-plan #housing-local-access.state-clear .housing-clear-route { display: block; }
      .housing-plan .housing-engine-body { fill: #c85143; stroke: #fff; stroke-width: 2.5; }
      .housing-plan .housing-engine-cab { fill: #e06a55; stroke: #fff; stroke-width: 2; }
      .housing-plan .housing-engine-window { fill: #b8e2eb; }
      .housing-plan .housing-engine-wheel { fill: #17201b; }
      .housing-plan .map-pin-halo { fill: none; stroke: #b17638; stroke-width: 2; opacity: 0; }
      .housing-plan .map-pin-disc { fill: #fffaf0; stroke: #765837; stroke-width: 2; }
      .housing-plan .map-pin-number { fill: #67492c; font-size: 16px; font-weight: 700; text-anchor: middle; dominant-baseline: central; }
      .housing-plan .map-pin-label-bg { fill: #fffaf0; stroke: #d1ccb9; stroke-width: 1; }
      .housing-plan .map-pin-label { fill: #34463b; font-size: 13px; font-weight: 600; dominant-baseline: central; }
      .housing-plan .map-pin-check { display: none; fill: none; stroke: #fffaf0; stroke-width: 2.7; stroke-linecap: round; stroke-linejoin: round; }
      .housing-plan .map-pin[data-applied="true"] .map-pin-disc { fill: #346755; stroke: #fffaf0; }
      .housing-plan .map-pin[data-applied="true"] .map-pin-number { fill: #fffaf0; }
      .housing-plan .map-pin[data-applied="true"] .map-pin-check { display: block; }
      .housing-plan .map-pin-info .map-pin-disc { fill: #fff5df; stroke: #b17638; }
      .housing-plan .visual-hotspot:hover, .housing-plan .visual-hotspot:focus-visible { filter: none; }
      .housing-plan .visual-hotspot:hover .map-pin-halo, .housing-plan .visual-hotspot:focus-visible .map-pin-halo { opacity: 1; }
      .housing-plan .visual-hotspot:focus-visible .map-pin-label-bg { stroke: #765837; stroke-width: 2.5; }
      @media (max-width: 700px) {
        .housing-plan .map-pin-label-bg, .housing-plan .map-pin-label { display: none; }
        .housing-plan .map-pin-disc { r: 26px; stroke-width: 3; }
        .housing-plan .map-pin-halo { r: 31px; }
        .housing-plan .map-pin-number { font-size: 23px; }
        .housing-plan .housing-place-label { font-size: 16px; letter-spacing: 1px; }
      }
    </style>
  </defs>`;
}

export function renderHousingPlanBase(): string {
  return `<g class="housing-base" aria-hidden="true">
    <rect width="900" height="500" fill="#e4e2c5" />
    <path d="M0 0 H900 V500 H0Z" fill="url(#housing-ground)" />
    <path d="M0 0 H900 V118 Q725 90 560 124 T205 107 Q88 100 0 135Z" fill="#c6d0aa" />
    <path d="M0 405 Q170 360 300 400 T610 454 T900 416 V500 H0Z" fill="#d0d3ab" />
    <g class="housing-contour">
      <path d="M0 50 Q155 15 303 45 T603 37 T900 58 M0 76 Q151 43 302 71 T607 63 T900 84" />
      <path d="M0 443 Q140 393 290 435 T590 470 T900 443 M0 468 Q145 420 291 460 T595 492 T900 470" />
    </g>
    <path class="housing-boundary" d="M96 102 L744 79 L833 435 L119 461Z" />
    <path d="M371 167 Q489 105 683 146 L721 334 Q534 399 346 319Z" fill="#d9d9b6" stroke="#b2b592" stroke-width="2" />
    <path d="M714 141 l22 -15 21 12 -4 24 -35 3Z" fill="#c8bc9a" stroke="#8e8c72" stroke-width="2" />
    <path d="M316 358 l18 -13 21 8 -1 21 -30 5Z M281 384 l14 -10 18 8 -2 17 -25 3Z" fill="#b6b299" stroke="#85897a" stroke-width="1.5" />
    <text class="housing-place-label" x="124" y="447">LÍMITE DE PARCELA</text>
    <path d="M32 38 h25" stroke="#53715a" stroke-width="3" />
    <text x="68" y="42" fill="#435c49" font-size="13" font-weight="700" letter-spacing="2">VIVIENDA Y ENTORNO</text>
    <text x="870" y="36" text-anchor="end" fill="#77806b" font-size="11">Escenario ilustrado · sin escala</text>
  </g>`;
}

export function renderHousingHome(): string {
  return `<g aria-hidden="true">
    <path d="M402 203 h250 v142 H402Z" class="housing-home-shadow" transform="translate(8 10)" />
    <path d="M402 203 h250 v142 H402Z" class="housing-house-wall" />
    <path class="housing-roof" d="M379 219 L526 137 L677 219 L636 306 L418 306Z" />
    <path class="housing-roof-ridge" d="M526 139 V306" />
    <rect class="housing-chimney" x="598" y="164" width="25" height="34" rx="2" />
    <rect class="housing-window" x="437" y="263" width="41" height="27" rx="2" />
    <rect class="housing-window" x="570" y="263" width="41" height="27" rx="2" />
    <rect class="housing-porch" x="488" y="307" width="78" height="39" />
    <rect class="housing-door" x="512" y="312" width="30" height="34" />
    <rect class="housing-garage" x="608" y="306" width="59" height="55" rx="3" />
    <path d="M618 317 H657 M618 330 H657 M618 343 H657" stroke="#b29a79" stroke-width="2" />
    <ellipse class="housing-condition-ring" cx="527" cy="250" rx="176" ry="139" />
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
    <rect class="map-pin-label-bg" x="10" y="-16" width="${width}" height="32" rx="8" />
    <text class="map-pin-label" x="29" y="0">${label}</text>
    <circle class="map-pin-halo" r="23" />
    <circle class="map-pin-disc" r="18" />
    <text class="map-pin-number" x="0" y="0">${number}</text>
    <g class="map-pin-check" transform="translate(15 -15)"><circle r="7" fill="#346755" stroke-width="1.5" /><path d="M-3 0 l2 2 4 -4" stroke-width="1.5" /></g>
  </g>`;
}
