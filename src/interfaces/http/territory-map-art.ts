/** Decorative plan view. All decisions and state classes belong to the visual presenter. */
export const TERRITORY_ROAD_PATH = 'M-20 443 C90 390 143 421 231 354 S354 281 436 308 S564 341 640 259 S770 238 922 151';
export const TERRITORY_FUEL_PATH = 'M174 164 C284 100 353 212 449 169 S560 186 626 228';
export const TERRITORY_GRAZING_PATH = 'M647 310 L801 272 Q832 316 846 402 L696 446 Q661 396 647 310 Z';

export function renderTerritoryPine(x: number, y: number, scale = 1): string {
  return `<g class="map-pine" data-art-primitive="tree" transform="translate(${x} ${y}) scale(${scale})" aria-hidden="true">
    <ellipse cx="3" cy="7" rx="18" ry="16" fill="#365440" opacity=".12" />
    <path d="M0 -20 C9 -23 13 -15 14 -11 C27 -9 24 3 19 8 C22 20 10 24 3 19 C-7 25 -17 18 -16 11 C-27 8 -25 -6 -17 -10 C-16 -20 -6 -24 0 -20Z" fill="#52745c" stroke="#355842" stroke-width="1.2" />
    <path d="M-10 -9 Q-1 -19 8 -10 M-14 3 Q-7 -4 0 -1 M4 9 Q13 4 14 -3" fill="none" stroke="#8da27a" stroke-width="2" stroke-linecap="round" opacity=".65" />
  </g>`;
}

export function renderTerritoryBrush(x: number, y: number, scale = 1): string {
  return `<g data-art-primitive="shrubs" transform="translate(${x} ${y}) scale(${scale})" aria-hidden="true">
    <path d="M-15 2 C-24 -8 -9 -17 -3 -10 C5 -21 19 -11 13 -3 C27 4 14 18 4 12 C-8 23 -23 14 -15 2Z" fill="#91a174" stroke="#6f885b" stroke-width="1.4" />
    <path d="M-10 2 L0 -3 L9 4" fill="none" stroke="#cad0a4" stroke-width="1.5" />
  </g>`;
}

export function renderTerritoryMapDefs(): string {
  return `<defs>
    <pattern id="territory-grass" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#acb17e" />
      <path d="M4 15 l-2 -8 m2 8 l3 -10 M14 18 l-1 -7 m1 7 l3 -9" fill="none" stroke="#6e8659" stroke-width="1.5" stroke-linecap="round" />
      <path d="M4 7 l-2 -2 M7 5 l2 -2" stroke="#d8ce96" stroke-width="1.4" />
    </pattern>
    <pattern id="territory-short-grass" width="24" height="24" patternUnits="userSpaceOnUse">
      <rect width="24" height="24" fill="#d7d8ae" />
      <path d="M5 17 l3 -2 m9 -6 l3 -2" stroke="#98a276" stroke-width="1.5" stroke-linecap="round" />
    </pattern>
    <pattern id="territory-crop-rows" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-17)">
      <rect width="12" height="12" fill="#d8c89e" />
      <path d="M0 3 H12" stroke="#a6a16f" stroke-width="3" />
      <path d="M0 7 H12" stroke="#eee3be" stroke-width="1" />
    </pattern>
    <style>
      .territory-map { font-family: 'Segoe UI', Arial, sans-serif; }
      .territory-map .map-base { pointer-events: none; }
      .territory-map .map-contour { fill: none; stroke: #b9b997; stroke-width: 1.4; opacity: .4; }
      .territory-map .map-place-label { fill: #69745b; font-size: 11px; font-weight: 600; letter-spacing: 2px; }
      .territory-map .map-road-margin { fill: none; stroke: #8b9f6b; stroke-width: 36; stroke-linecap: round; }
      .territory-map #territory-road .visual-road { marker-start: none; stroke: #faf0d7; stroke-width: 14; stroke-dasharray: none; opacity: 1; filter: none; }
      .territory-map .map-road-centre { fill: none; stroke: #c4ac83; stroke-width: 1.2; stroke-dasharray: 5 7; }
      .territory-map #territory-road.state-clear .visual-road { stroke-width: 22; }
      .territory-map #territory-road.state-clear .map-road-margin { stroke: #d7c9a8; stroke-width: 40; }
      .territory-map .map-road-obstruction { opacity: 1; }
      .territory-map #territory-road.state-clear .map-road-obstruction { display: none; }
      .territory-map #territory-continuity .visual-vegetation-band { marker-start: none; stroke: #7c955f; stroke-width: 44; stroke-dasharray: none; opacity: .85; }
      .territory-map #territory-continuity.state-broken .visual-vegetation-band { stroke-width: 44; stroke-dasharray: 66 48; opacity: .65; }
      .territory-map #territory-continuity.state-broken .map-fuel-gap { display: none; }
      .territory-map #territory-residues .visual-residues { marker-start: none; stroke: #997047; stroke-width: 5; stroke-dasharray: none; opacity: 1; }
      .territory-map #territory-residues.state-treated .map-residue-pile { display: none; }
      .territory-map .map-treated-ground { display: none; fill: #e4d8b9; stroke: #b9aa88; stroke-dasharray: 3 5; }
      .territory-map #territory-residues.state-treated .map-treated-ground { display: block; }
      .territory-map #territory-grazing .visual-grazing { marker-start: none; fill: url(#territory-grass); stroke: #879665; stroke-width: 2; stroke-dasharray: none; }
      .territory-map #territory-grazing.state-treated .visual-grazing { fill: url(#territory-short-grass); stroke: #899969; stroke-dasharray: 7 5; }
      .territory-map .map-grazing-flock { display: none; }
      .territory-map #territory-grazing.state-treated .map-grazing-flock { display: block; }
      .territory-map #territory-professional-line .visual-professional-line { marker-start: none; stroke: #a27a46; stroke-width: 3; stroke-dasharray: 6 6; opacity: .8; filter: none; }
      .territory-map #territory-professional-line.state-evaluated .visual-professional-line { stroke: #346755; stroke-width: 4; stroke-dasharray: 10 5; }
      .territory-map .map-pin-halo { fill: none; stroke: #b17638; stroke-width: 2; opacity: 0; }
      .territory-map .map-pin-disc { fill: #fffaf0; stroke: #765837; stroke-width: 2; }
      .territory-map .map-pin-number { fill: #67492c; font-size: 16px; font-weight: 700; text-anchor: middle; dominant-baseline: central; }
      .territory-map .map-pin-label-bg { fill: #fffaf0; stroke: #d1ccb9; stroke-width: 1; }
      .territory-map .map-pin-label { fill: #34463b; font-size: 13px; font-weight: 600; dominant-baseline: central; }
      .territory-map .map-pin-check { display: none; fill: none; stroke: #fffaf0; stroke-width: 2.7; stroke-linecap: round; stroke-linejoin: round; }
      .territory-map .map-pin[data-applied="true"] .map-pin-disc { fill: #346755; stroke: #fffaf0; }
      .territory-map .map-pin[data-applied="true"] .map-pin-number { fill: #fffaf0; }
      .territory-map .map-pin[data-applied="true"] .map-pin-check { display: block; }
      .territory-map .visual-hotspot:hover, .territory-map .visual-hotspot:focus-visible { filter: none; }
      .territory-map .visual-hotspot:hover .map-pin-halo, .territory-map .visual-hotspot:focus-visible .map-pin-halo { opacity: 1; }
      .territory-map .visual-hotspot:focus-visible .map-pin-label-bg { stroke: #765837; stroke-width: 2.5; }
      @media (max-width: 700px) {
        .territory-map .map-pin-label-bg, .territory-map .map-pin-label { display: none; }
        .territory-map .map-pin-disc { r: 26px; stroke-width: 3; }
        .territory-map .map-pin-halo { r: 31px; }
        .territory-map .map-pin-number { font-size: 23px; }
        .territory-map .map-place-label { font-size: 16px; letter-spacing: 1px; }
      }
    </style>
  </defs>`;
}

export function renderTerritoryMapBase(): string {
  const pines = [
    [45, 133, .9], [70, 166, .8], [93, 143, 1], [117, 172, .9], [140, 135, .85],
    [62, 92, .8], [91, 72, .85], [122, 94, .95], [149, 73, .8], [176, 97, .9],
    [215, 73, .85], [248, 92, 1], [281, 70, .85], [310, 95, .8], [342, 77, .9],
    [376, 100, .75], [402, 75, .8], [440, 91, .8], [469, 117, .7],
    [716, 61, .9], [750, 83, 1], [787, 62, .8], [817, 100, .95], [850, 129, .75],
    [851, 73, .8], [686, 81, .7], [801, 188, .7], [840, 195, .85], [865, 237, .7]
  ];
  return `<g class="map-base" aria-hidden="true">
    <rect width="900" height="500" fill="#e5e3cb" />
    <path d="M0 0 H520 Q506 93 438 135 T260 236 Q117 191 0 219Z" fill="#ced6b3" />
    <path d="M621 0 H900 V275 Q773 231 692 156Z" fill="#c3cfa9" />
    <path d="M0 361 Q136 260 334 351 T597 500 H0Z" fill="#dfd4b6" />
    <path d="M586 288 Q747 236 900 273 V500 H654Z" fill="#d5d7b3" />
    <g class="map-contour">
      <path d="M0 56 Q155 -18 300 29 T506 39 M0 77 Q157 6 308 54 T485 66 M0 99 Q150 31 306 79 T466 91" />
      <path d="M651 0 Q638 92 709 126 T900 162 M674 0 Q662 79 733 103 T900 139 M697 0 Q696 62 757 80 T900 112" />
      <path d="M30 485 Q210 398 387 457 T569 490 M75 500 Q240 432 405 483 M625 485 Q731 435 895 465 M657 500 Q758 457 900 488" />
    </g>
    <path d="M517 -30 C651 93 487 152 565 242 S551 424 638 535" fill="none" stroke="#b1b08e" stroke-width="84" opacity=".55" />
    <path d="M517 -30 C651 93 487 152 565 242 S551 424 638 535" fill="none" stroke="#89937a" stroke-width="46" />
    <path d="M517 -30 C651 93 487 152 565 242 S551 424 638 535" fill="none" stroke="#667d70" stroke-width="22" />
    <path d="M517 -30 C651 93 487 152 565 242 S551 424 638 535" fill="none" stroke="#a5a78e" stroke-width="8" />
    <g fill="#c3bfa4" stroke="#818775" stroke-width="1">
      <path d="M560 66 l5 -5 7 4 -2 8 -9 -1Z M553 117 l5 -7 6 2 3 8 -9 3Z M552 183 l7 -4 5 5 -3 8 -7 -1Z M588 261 l5 -4 7 6 -4 7 -8 -2Z M601 345 l7 -6 4 4 1 8 -10 1Z M601 417 l4 -7 7 2 2 7 -9 3Z M624 487 l5 -4 6 3 2 7 -9 1Z" />
      <ellipse cx="564" cy="91" rx="2" ry="4" /><ellipse cx="550" cy="157" rx="3" ry="2" />
      <ellipse cx="573" cy="233" rx="3" ry="2" /><ellipse cx="600" cy="290" rx="2" ry="4" />
      <ellipse cx="599" cy="373" rx="2" ry="4" /><ellipse cx="610" cy="457" rx="3" ry="2" />
    </g>
    <path d="M543 57 l-16 7 M543 88 l-14 -2 M525 139 l-14 -5 M526 170 l-14 2 M544 214 l-15 10 M576 264 l-15 5 M577 352 l-14 -4 M577 389 l-15 1 M580 434 l-15 6 M597 480 l-15 8 M596 73 l15 1 M584 120 l15 7 M582 184 l15 -5 M611 232 l15 -6 M631 312 l14 0 M630 355 l14 4 M626 405 l14 -2 M636 460 l13 -6" fill="none" stroke="#727f69" stroke-width="2" opacity=".6" />
    <path d="M50 321 L135 295 L175 393 L80 418Z" fill="url(#territory-crop-rows)" stroke="#f4ecd4" stroke-width="4" />
    <path d="M172 404 L215 380 L276 459 L220 483Z" fill="url(#territory-crop-rows)" stroke="#f4ecd4" stroke-width="4" />
    <path d="M289 376 L391 390 L383 464 L300 451Z" fill="#b4ba8b" stroke="#efe9cd" stroke-width="4" />
    ${[313, 341, 369].flatMap((x) => [405, 429, 452].map((y) => renderTerritoryBrush(x, y, .42))).join('')}
    <path d="M131 262 Q163 280 176 305" fill="none" stroke="#c5b18b" stroke-width="9" />
    <g transform="translate(105 246) rotate(-16)">
      <rect x="-28" y="-17" width="62" height="47" rx="3" fill="#9c967e" opacity=".2" />
      <rect x="-32" y="-23" width="59" height="43" rx="2" fill="#f5ead0" stroke="#9a8767" stroke-width="1.4" />
      <path d="M-37 -26 H32 V14 H-37Z" fill="#b67c56" stroke="#8b6247" stroke-width="1.5" />
      <path d="M-35 -6 H30 M-22 -24 V12 M-6 -24 V12 M10 -24 V12" stroke="#d09d71" stroke-width="1.4" />
      <rect x="-13" y="17" width="13" height="5" fill="#82755f" />
    </g>
    ${pines.map(([x, y, scale]) => renderTerritoryPine(x, y, scale)).join('')}
    ${renderTerritoryBrush(477, 373, .85)}${renderTerritoryBrush(492, 410, .7)}
    ${renderTerritoryBrush(616, 105, .65)}${renderTerritoryBrush(678, 468, .6)}
    <text class="map-place-label" x="56" y="205">PINAR</text>
    <text class="map-place-label" x="245" y="485">PARCELAS</text>
    <text class="map-place-label" transform="translate(576 220) rotate(61)">BARRANCO</text>
    <text class="map-place-label" x="755" y="259">PASTOS</text>
    <path d="M32 38 h25" stroke="#53715a" stroke-width="3" />
    <text x="68" y="42" fill="#435c49" font-size="13" font-weight="700" letter-spacing="2">FINCAS Y MONTE</text>
    <text x="870" y="36" text-anchor="end" fill="#77806b" font-size="11">Escenario ilustrado · sin escala</text>
  </g>`;
}

/** Pins stay a fixed size in map coordinates; they never inherit a path's stroke width. */
export function renderTerritoryMapPin(number: number, x: number, y: number, label: string, width: number, applied: boolean): string {
  return `<g class="map-pin" data-applied="${applied}" transform="translate(${x} ${y})" aria-hidden="true">
    <rect class="map-pin-label-bg" x="10" y="-16" width="${width}" height="32" rx="8" />
    <text class="map-pin-label" x="29" y="0">${label}</text>
    <circle class="map-pin-halo" r="23" />
    <circle class="map-pin-disc" r="18" />
    <text class="map-pin-number" x="0" y="0">${number}</text>
    <g class="map-pin-check" transform="translate(15 -15)"><circle r="7" fill="#346755" stroke-width="1.5" /><path d="M-3 0 l2 2 4 -4" stroke-width="1.5" /></g>
  </g>`;
}
