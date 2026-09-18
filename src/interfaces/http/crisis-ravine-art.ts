/**
 * Photo-backed crisis scene. The photograph is deliberately neutral: every
 * operational consequence is drawn as an SVG overlay from the current game state.
 */
export const CRISIS_RAVINE_BACKGROUND_IMAGE = '/images/crisis-ravine-aerial-v1.jpg';
export const CRISIS_FIRE_IMAGE = '/images/crisis-scrub-fire-v1.png';

export const CRISIS_ROAD_PATH =
  'M-10 371 C145 341 303 300 448 258 C584 219 700 190 797 143 C852 116 885 83 914 45';
export const CRISIS_RETREAT_PATH = 'M452 258 C338 293 225 326 115 354';
export const CRISIS_CROWN_ZONE_PATH =
  'M571 46 C618 18 689 20 747 42 C793 59 829 91 840 130 C816 126 793 121 765 118 C722 113 684 123 645 124 C609 125 580 107 568 81 C563 68 564 57 571 46 Z';

export function renderCrisisRavineDefs(): string {
  return `<defs>
    <linearGradient id="crisis-photo-wash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#13251f" stop-opacity=".12" />
      <stop offset=".55" stop-color="#13251f" stop-opacity=".02" />
      <stop offset="1" stop-color="#13251f" stop-opacity=".2" />
    </linearGradient>
    <linearGradient id="crisis-crown-zone-fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eef4d8" stop-opacity=".04" />
      <stop offset="1" stop-color="#e2a84c" stop-opacity=".24" />
    </linearGradient>
    <filter id="crisis-overlay-shadow" x="-35%" y="-35%" width="180%" height="190%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#091712" flood-opacity=".72" />
    </filter>
    <style>
      .crisis-photo { font-family: 'Segoe UI', Arial, sans-serif; }
      .crisis-photo .crisis-base, .crisis-photo .crisis-photo-layer { pointer-events: none; }
      .crisis-photo .crisis-photo-background { width: 900px; height: 500px; }
      .crisis-photo .crisis-photo-wash { fill: url(#crisis-photo-wash); }
      .crisis-photo .crisis-scene-caption { fill: #102821; fill-opacity: .88; stroke: #f8f2df; stroke-opacity: .72; stroke-width: 1; }
      .crisis-photo .crisis-place-label { fill: #fffaf0; font-size: 13px; font-weight: 750; letter-spacing: 1.7px; }
      .crisis-photo .m5-art-smoke { filter: blur(1.2px); }

      .crisis-photo #crisis-road .visual-road,
      .crisis-photo #crisis-retreat .visual-retreat,
      .crisis-photo #crisis-retreat .visual-arrow,
      .crisis-photo #crisis-position,
      .crisis-photo #crisis-attack-window .visual-attack-window { filter: url(#crisis-overlay-shadow); }

      .crisis-photo #crisis-road .crisis-road-bed { fill: none; stroke: #fff8e7; stroke-width: 9; stroke-linecap: round; opacity: .16; }
      .crisis-photo #crisis-road .visual-road { fill: none; stroke-linecap: round; filter: none; }
      .crisis-photo #crisis-road.state-clear .crisis-road-bed { stroke: #e8f3dc; stroke-width: 10; opacity: .2; }
      .crisis-photo #crisis-road.state-clear .visual-road { stroke: #e0f2d5; stroke-width: 2.8; stroke-dasharray: none; opacity: .94; }
      .crisis-photo #crisis-road.state-constrained .crisis-road-bed { stroke: #f1d4a0; opacity: .17; }
      .crisis-photo #crisis-road.state-constrained .visual-road { stroke: #f0c574; stroke-width: 3.1; stroke-dasharray: 14 10; opacity: .9; }
      .crisis-photo #crisis-road.state-blocked .crisis-road-bed { stroke: #dda084; opacity: .2; }
      .crisis-photo #crisis-road.state-blocked .visual-road { stroke: #e79779; stroke-width: 3.4; stroke-dasharray: 5 9; opacity: .94; }

      .crisis-photo #crisis-retreat.state-viable .visual-retreat { stroke-width: 5; }
      .crisis-photo #crisis-retreat.state-limited .visual-retreat { stroke-width: 3.5; opacity: .72; }
      .crisis-photo #crisis-retreat .visual-arrow { stroke-width: 4; }
      .crisis-photo #crisis-position.state-sustainable .visual-position { r: 19px; }
      .crisis-photo #crisis-position.state-unsustainable .visual-position { r: 15px; opacity: .7; }
      .crisis-photo #crisis-position .visual-position + path { stroke-width: 3; }
      .crisis-photo #crisis-attack-window.state-viable .visual-attack-window { stroke-width: 4; }

      .crisis-photo #crisis-crown .crisis-crown-zone { fill: url(#crisis-crown-zone-fill); mix-blend-mode: multiply; }
      .crisis-photo #crisis-crown .crisis-crown-boundary { fill: none; stroke-linecap: round; stroke-linejoin: round; }
      .crisis-photo #crisis-crown.state-noCrownFire .crisis-crown-zone { opacity: .22; }
      .crisis-photo #crisis-crown.state-noCrownFire .crisis-crown-boundary { stroke: #dbe8c6; stroke-width: 1.8; stroke-dasharray: none; opacity: .76; }
      .crisis-photo #crisis-crown.state-crownRisk .crisis-crown-zone { opacity: .52; }
      .crisis-photo #crisis-crown.state-crownRisk .crisis-crown-boundary { stroke: #efb458; stroke-width: 2.6; stroke-dasharray: 9 7; opacity: .96; }
      .crisis-photo #crisis-crown.state-crownFire .crisis-crown-zone { fill: #c9653d; opacity: .38; }
      .crisis-photo #crisis-crown.state-crownFire .crisis-crown-boundary { stroke: #f09a55; stroke-width: 3.2; stroke-dasharray: 5 5; opacity: 1; }
      .crisis-photo .visual-capacity { filter: url(#crisis-overlay-shadow); }
      .crisis-photo #crisis-pressure .crisis-flame { transform-box: fill-box; transform-origin: center bottom; filter: url(#crisis-overlay-shadow); }
      .crisis-photo #crisis-pressure.state-surface .crisis-flame { transform: scale(.76); }
      .crisis-photo #crisis-pressure.state-severe .crisis-flame { transform: scale(1.08); }
      .crisis-photo #crisis-pressure .visual-fire-photo { opacity: .96; transform: none; filter: none; }
      .crisis-photo #crisis-pressure.state-surface .visual-fire-photo { opacity: .78; }
      .crisis-photo .crisis-capacity-hit-target { fill: #fff; fill-opacity: .001; stroke: none; pointer-events: all; }
      .crisis-photo .visual-label-group text { font-size: 15px; }

      @media (max-width: 700px) {
        .crisis-photo .crisis-place-label { font-size: 16px; letter-spacing: 1px; }
        .crisis-photo .visual-capacity text { font-size: 18px; }
      }
    </style>
  </defs>`;
}

export function renderCrisisRavineBase(): string {
  return `<g class="crisis-base" aria-hidden="true">
    <rect width="900" height="500" fill="#77745d" />
    <image class="crisis-photo-layer crisis-photo-background" data-background-layer="photo" href="${CRISIS_RAVINE_BACKGROUND_IMAGE}" x="0" y="0" width="900" height="500" preserveAspectRatio="xMidYMid slice" />
    <rect class="crisis-photo-layer crisis-photo-wash" width="900" height="500" />
    <g transform="translate(145 20)">
      <rect class="crisis-scene-caption" width="250" height="42" rx="10" />
      <text class="crisis-place-label" x="18" y="27">BARRANCO Y ACCESO</text>
    </g>
  </g>`;
}

export function renderCrisisFlame(): string {
  return `<g class="crisis-flame" aria-hidden="true">
    <image class="visual-fire visual-fire-photo" href="${CRISIS_FIRE_IMAGE}" x="535" y="239" width="84" height="126" preserveAspectRatio="xMidYMid meet" />
  </g>`;
}
