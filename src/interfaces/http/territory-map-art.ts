/**
 * Photo-backed territory scene. The photograph establishes the real landscape;
 * every prevention treatment remains an SVG layer driven by the game state.
 */
export const TERRITORY_BACKGROUND_IMAGE = '/images/territory-prevention-aerial-v1.jpg';

export const TERRITORY_ROAD_PATH =
  'M-12 389 C133 339 276 298 421 271 C558 246 681 203 785 153 C850 122 883 69 914 27';
export const TERRITORY_FUEL_PATH =
  'M61 146 C145 78 240 107 326 92 C381 82 419 105 468 139';
export const TERRITORY_GRAZING_PATH =
  'M628 303 L856 244 Q887 332 873 466 L650 445 Q624 386 628 303 Z';
export const TERRITORY_EVALUATION_PATH = 'M650 206 Q724 166 826 142';

export function renderTerritoryMapDefs(): string {
  return `<defs>
    <linearGradient id="territory-photo-wash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#102821" stop-opacity=".12" />
      <stop offset=".48" stop-color="#102821" stop-opacity=".02" />
      <stop offset="1" stop-color="#102821" stop-opacity=".2" />
    </linearGradient>
    <linearGradient id="territory-treated-ground" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#dce5ca" stop-opacity=".7" />
      <stop offset="1" stop-color="#9db48a" stop-opacity=".4" />
    </linearGradient>
    <pattern id="territory-pasture-natural" width="22" height="22" patternUnits="userSpaceOnUse">
      <path d="M4 19 l2 -8 m4 8 l-1 -6 m7 6 l2 -10" stroke="#f1d39a" stroke-width="2" stroke-linecap="round" opacity=".72" />
    </pattern>
    <pattern id="territory-pasture-managed" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M5 17 l4 -2 m8 -7 l3 -2" stroke="#d9ead0" stroke-width="2" stroke-linecap="round" opacity=".8" />
    </pattern>
    <filter id="territory-overlay-shadow" x="-35%" y="-35%" width="180%" height="190%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.4" flood-color="#071712" flood-opacity=".62" />
    </filter>
    <style>
      .territory-map { font-family: 'Segoe UI', Arial, sans-serif; }
      .territory-map .map-base, .territory-map .territory-photo-layer { pointer-events: none; }
      .territory-map .territory-photo-background { width: 900px; height: 500px; }
      .territory-map .territory-photo-wash { fill: url(#territory-photo-wash); }
      .territory-map .territory-scene-caption { fill: #102821; fill-opacity: .9; stroke: #fffaf0; stroke-opacity: .72; stroke-width: 1; }
      .territory-map .territory-place-label { fill: #fffaf0; font-size: 13px; font-weight: 750; letter-spacing: 1.7px; }

      .territory-map .map-road-context { fill: none; stroke: #fff8e8; stroke-width: 7; stroke-linecap: round; opacity: .16; }
      .territory-map #territory-road .visual-road { marker-start: none; fill: none; stroke: #fff7e7; stroke-width: 1.2; stroke-linecap: round; stroke-dasharray: 5 8; opacity: .92; }
      .territory-map .map-road-risk { fill: none; stroke: #c8793a; stroke-width: 2.6; stroke-linecap: round; stroke-dasharray: 7 8; opacity: .9; }
      .territory-map #territory-road.state-clear .map-road-risk { stroke: #8fc28d; stroke-width: 2.4; stroke-dasharray: none; opacity: .82; }
      .territory-map #territory-road.state-clear .visual-road { stroke: #f3f8e9; stroke-width: 1.2; stroke-dasharray: none; }
      .territory-map .map-road-obstruction { opacity: 1; filter: url(#territory-overlay-shadow); }
      .territory-map #territory-road.state-clear .map-road-obstruction { display: none; }
      .territory-map .map-road-debris-shadow { fill: #251b13; opacity: .28; }
      .territory-map .map-road-debris-branch { fill: none; stroke: #5f4430; stroke-width: 3.2; stroke-linecap: round; }
      .territory-map .map-road-debris-twig { fill: none; stroke: #9b7954; stroke-width: 1.6; stroke-linecap: round; }

      .territory-map #territory-continuity .visual-vegetation-band { marker-start: none; fill: none; stroke: #f1c879; stroke-width: 2.2; stroke-dasharray: 8 9; opacity: .9; }
      .territory-map #territory-continuity.state-broken .visual-vegetation-band { stroke: #cfe8c6; stroke-width: 2.2; stroke-dasharray: 22 34; opacity: .96; }
      .territory-map .map-fuel-gap { display: none; }
      .territory-map #territory-continuity.state-broken .map-fuel-gap { display: block; }
      .territory-map .map-fuel-gap-zone { fill: url(#territory-treated-ground); stroke: #f5f5e8; stroke-width: 1.4; stroke-dasharray: 5 5; opacity: .58; }
      .territory-map .map-fuel-gap-mark { fill: none; stroke: #396c53; stroke-width: 2.2; stroke-linecap: round; }

      .territory-map .map-residue-shadow { fill: #241911; opacity: .26; }
      .territory-map #territory-residues .visual-residues { marker-start: none; fill: none; stroke: #704c31; stroke-width: 4.2; stroke-linecap: round; stroke-dasharray: none; opacity: 1; filter: url(#territory-overlay-shadow); }
      .territory-map .map-residue-twig { fill: none; stroke: #b18b5c; stroke-width: 2; stroke-linecap: round; }
      .territory-map .map-residue-cut { fill: #d0a66c; stroke: #5f422c; stroke-width: 1.5; }
      .territory-map #territory-residues.state-treated .map-residue-pile { display: none; }
      .territory-map .map-treated-ground { display: none; fill: url(#territory-treated-ground); stroke: #eef4df; stroke-width: 1.4; stroke-dasharray: 5 5; opacity: .66; }
      .territory-map #territory-residues.state-treated .map-treated-ground,
      .territory-map #territory-residues.state-treated .map-treated-rake { display: block; }
      .territory-map .map-treated-rake { display: none; fill: none; stroke: #426f57; stroke-width: 2.5; stroke-linecap: round; opacity: .9; }

      .territory-map #territory-grazing .visual-grazing { marker-start: none; fill: url(#territory-pasture-natural); stroke: #f0c779; stroke-width: 1.5; stroke-dasharray: 7 7; opacity: .68; }
      .territory-map #territory-grazing.state-treated .visual-grazing { fill: url(#territory-pasture-managed); stroke: #cfe6c4; stroke-width: 1.7; stroke-dasharray: none; opacity: .72; }
      .territory-map .map-grazing-flock { display: none; }
      .territory-map #territory-grazing.state-treated .map-grazing-flock { display: block; }

      .territory-map #territory-professional-line .visual-professional-line { marker-start: none; fill: none; stroke: #f2c36d; stroke-width: 1.8; stroke-dasharray: 6 7; opacity: .9; }
      .territory-map #territory-professional-line.state-evaluated .visual-professional-line { stroke: #cfe9c8; stroke-width: 2; stroke-dasharray: 12 7; }
      .territory-map .map-survey-point { fill: #173a30; stroke: #fff6e2; stroke-width: 1.5; filter: url(#territory-overlay-shadow); }

      .territory-map .map-pin { filter: url(#territory-overlay-shadow); }
      .territory-map .map-pin-hit-target { fill: #fff; fill-opacity: .001; stroke: none; pointer-events: all; }
      .territory-map .map-pin-halo { fill: none; stroke: #fff2d1; stroke-width: 3; opacity: 0; }
      .territory-map .map-pin-tail { stroke: #fffaf0; stroke-width: 3; stroke-linecap: round; }
      .territory-map .map-pin-disc { fill: #fffaf0; stroke: #173a30; stroke-width: 3; }
      .territory-map .map-pin-number { fill: #173a30; font-size: 16px; font-weight: 800; text-anchor: middle; dominant-baseline: central; }
      .territory-map .map-pin-label-bg { fill: #102821; fill-opacity: .92; stroke: #fffaf0; stroke-opacity: .78; stroke-width: 1.5; }
      .territory-map .map-pin-label { fill: #fffaf0; font-size: 13px; font-weight: 650; dominant-baseline: central; }
      .territory-map .map-pin-check { display: none; fill: none; stroke: #fffaf0; stroke-width: 2.7; stroke-linecap: round; stroke-linejoin: round; }
      .territory-map .map-pin[data-applied="true"] .map-pin-disc { fill: #2f6b55; stroke: #fffaf0; }
      .territory-map .map-pin[data-applied="true"] .map-pin-number { fill: #fffaf0; }
      .territory-map .map-pin[data-applied="true"] .map-pin-check { display: block; }
      .territory-map .visual-hotspot:hover, .territory-map .visual-hotspot:focus-visible { filter: none; }
      .territory-map .visual-hotspot:hover .map-pin-halo, .territory-map .visual-hotspot:focus-visible .map-pin-halo { opacity: 1; }
      .territory-map .visual-hotspot:focus-visible .map-pin-label-bg { stroke: #ffd68a; stroke-width: 3; }

      @media (max-width: 700px) {
        .territory-map .map-pin-label-bg, .territory-map .map-pin-label, .territory-map .map-pin-tail { display: none; }
        .territory-map .map-pin-disc { r: 29px; stroke-width: 4; }
        .territory-map .map-pin-halo { r: 35px; }
        .territory-map .map-pin-number { font-size: 24px; }
        .territory-map .territory-place-label { font-size: 16px; letter-spacing: 1px; }
      }
    </style>
  </defs>`;
}

export function renderTerritoryMapBase(): string {
  return `<g class="map-base" aria-hidden="true">
    <rect width="900" height="500" fill="#7d775d" />
    <image class="territory-photo-layer territory-photo-background" data-background-layer="photo" href="${TERRITORY_BACKGROUND_IMAGE}" x="0" y="0" width="900" height="500" preserveAspectRatio="xMidYMid slice" />
    <rect class="territory-photo-layer territory-photo-wash" width="900" height="500" />
    <g transform="translate(24 60)">
      <rect class="territory-scene-caption" width="226" height="42" rx="10" />
      <text class="territory-place-label" x="18" y="27">FINCAS Y MONTE</text>
    </g>
  </g>`;
}

export function renderTerritoryBranchPile(x: number, y: number, scale = 1): string {
  return `<g class="map-residue-pile" transform="translate(${x} ${y}) scale(${scale})" aria-hidden="true">
    <ellipse class="map-residue-shadow" cx="0" cy="8" rx="39" ry="17" />
    <path class="visual-residues" d="M-31 8 l54 -27 M-28 -10 l58 29 M-19 18 l46 -31 M-36 0 l62 8 M-9 -22 l21 43 M-24 17 l51 -9" />
    <path class="map-residue-twig" d="M-20 -5 l-11 -9 m19 1 l-2 -13 M8 5 l15 -13 m-2 20 l13 4 M-4 13 l-8 11" />
    <circle class="map-residue-cut" cx="23" cy="-19" r="3.5" /><circle class="map-residue-cut" cx="30" cy="18" r="3" />
  </g>`;
}

export function renderTerritoryRoadDebris(x: number, y: number, rotation: number): string {
  return `<g class="map-road-obstruction-item" transform="translate(${x} ${y}) rotate(${rotation})" aria-hidden="true">
    <ellipse class="map-road-debris-shadow" cx="0" cy="4" rx="18" ry="7" />
    <path class="map-road-debris-branch" d="M-17 3 L17 -3 M-6 0 l-8 -10 M5 -1 l7 -10" />
    <path class="map-road-debris-twig" d="M-12 2 l-5 7 M11 -2 l6 6 M-2 -1 l1 10" />
  </g>`;
}

type TerritoryPinSide = 'left' | 'right';

/** Visible marker and a larger transparent hit target remain stable at every viewport. */
export function renderTerritoryMapPin(
  number: number,
  x: number,
  y: number,
  label: string,
  width: number,
  applied: boolean,
  side: TerritoryPinSide = 'right'
): string {
  const labelX = side === 'right' ? 15 : -width - 15;
  const textX = labelX + 18;
  const tailStart = side === 'right' ? 18 : -18;
  const tailEnd = side === 'right' ? 27 : -27;
  return `<g class="map-pin" data-applied="${applied}" transform="translate(${x} ${y})" aria-hidden="true">
    <circle class="map-pin-hit-target" r="62" />
    <path class="map-pin-tail" d="M${tailStart} 0 H${tailEnd}" />
    <rect class="map-pin-label-bg" x="${labelX}" y="-18" width="${width}" height="36" rx="9" />
    <text class="map-pin-label" x="${textX}" y="0">${label}</text>
    <circle class="map-pin-halo" r="26" />
    <circle class="map-pin-disc" r="20" />
    <text class="map-pin-number" x="0" y="0">${number}</text>
    <g class="map-pin-check" transform="translate(16 -16)"><circle r="7.5" fill="#2f6b55" stroke-width="1.5" /><path d="M-3 0 l2 2 4 -4" stroke-width="1.5" /></g>
  </g>`;
}
