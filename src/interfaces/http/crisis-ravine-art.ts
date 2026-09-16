/**
 * Photo-backed crisis scene. The photograph is deliberately neutral: every
 * operational consequence is drawn as an SVG overlay from the current game state.
 */
export const CRISIS_RAVINE_BACKGROUND_IMAGE = '/images/crisis-ravine-aerial-v1.jpg';

export const CRISIS_ROAD_PATH =
  'M-10 404 C145 368 306 326 450 286 C585 255 701 217 796 172 C855 144 887 108 914 68';

export function renderCrisisRavineDefs(): string {
  return `<defs>
    <linearGradient id="crisis-photo-wash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#13251f" stop-opacity=".12" />
      <stop offset=".55" stop-color="#13251f" stop-opacity=".02" />
      <stop offset="1" stop-color="#13251f" stop-opacity=".2" />
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
      .crisis-photo #crisis-attack-window .visual-attack-window,
      .crisis-photo #crisis-crown .visual-canopy { filter: url(#crisis-overlay-shadow); }

      .crisis-photo #crisis-road.state-clear .visual-road { stroke: #cfe9c9; stroke-width: 16; stroke-dasharray: none; opacity: .92; }
      .crisis-photo #crisis-road.state-constrained .visual-road { stroke: #f3c76f; stroke-width: 13; stroke-dasharray: 22 15; opacity: .86; }
      .crisis-photo #crisis-road.state-blocked .visual-road { stroke: #d8826d; stroke-width: 11; stroke-dasharray: 11 16; opacity: .82; }

      .crisis-photo #crisis-retreat.state-viable .visual-retreat { stroke-width: 10; }
      .crisis-photo #crisis-retreat.state-limited .visual-retreat { stroke-width: 7; opacity: .7; }
      .crisis-photo #crisis-position.state-sustainable .visual-position { r: 28px; }
      .crisis-photo #crisis-position.state-unsustainable .visual-position { r: 21px; opacity: .66; }
      .crisis-photo #crisis-attack-window.state-viable .visual-attack-window { stroke-width: 9; }
      .crisis-photo #crisis-crown.state-noCrownFire .visual-canopy { r: 45px; opacity: .62; }
      .crisis-photo #crisis-crown.state-crownRisk .visual-canopy { r: 54px; opacity: .9; }
      .crisis-photo #crisis-crown.state-crownFire .visual-canopy { r: 62px; }
      .crisis-photo .visual-capacity { filter: url(#crisis-overlay-shadow); }
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
