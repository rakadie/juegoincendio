export const SCENE_ART_KIT_VERSION = 'm5-v1' as const;

export type SceneArtTone = 'olive' | 'dry' | 'charred';

export function renderSceneArtDefs(): string {
  return `<defs data-scene-art-kit="${SCENE_ART_KIT_VERSION}">
    <filter id="m5-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#102019" flood-opacity=".22" />
    </filter>
    <linearGradient id="m5-sky-haze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dce5de" stop-opacity=".2" />
      <stop offset="1" stop-color="#e8c98d" stop-opacity=".04" />
    </linearGradient>
    <linearGradient id="m5-sky-depth" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#789789" />
      <stop offset=".62" stop-color="#91a686" />
      <stop offset="1" stop-color="#c2b684" />
    </linearGradient>
    <linearGradient id="m5-crisis-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#59686e" />
      <stop offset=".58" stop-color="#777d73" />
      <stop offset="1" stop-color="#a28d6d" />
    </linearGradient>
    <linearGradient id="m5-hill-back" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7f9867" />
      <stop offset="1" stop-color="#647a53" />
    </linearGradient>
    <linearGradient id="m5-hill-front" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#647e54" />
      <stop offset="1" stop-color="#455f48" />
    </linearGradient>
    <linearGradient id="m5-ravine-depth" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#405748" />
      <stop offset=".55" stop-color="#2f4639" />
      <stop offset="1" stop-color="#24382f" />
    </linearGradient>
    <linearGradient id="m5-house-wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e6c7a3" />
      <stop offset="1" stop-color="#b68a68" />
    </linearGradient>
    <linearGradient id="m5-window-glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d8f0f1" />
      <stop offset=".55" stop-color="#95c7d2" />
      <stop offset="1" stop-color="#6a9ca9" />
    </linearGradient>
    <linearGradient id="m5-fire-surface" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#d4552d" />
      <stop offset=".62" stop-color="#ef9937" />
      <stop offset="1" stop-color="#f4c867" />
    </linearGradient>
    <linearGradient id="m5-fire-severe" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#91291f" />
      <stop offset=".52" stop-color="#d84528" />
      <stop offset="1" stop-color="#f0a135" />
    </linearGradient>
    <pattern id="m5-grazed-pattern" width="18" height="12" patternUnits="userSpaceOnUse">
      <rect width="18" height="12" fill="#8e9769" />
      <path d="M1 9 L7 5 M9 10 L15 6" stroke="#c9c88e" stroke-width="2" stroke-linecap="round" opacity=".8" />
    </pattern>
    <pattern id="m5-dense-fuel-pattern" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="14" height="14" fill="#6f8753" />
      <path d="M2 13 L5 4 M7 13 L9 2 M11 13 L13 6" stroke="#aebd76" stroke-width="2" opacity=".75" />
    </pattern>
    <linearGradient id="m5-smoke-fill" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#59636a" stop-opacity=".7" />
      <stop offset="1" stop-color="#c5c9c7" stop-opacity=".16" />
    </linearGradient>
    <marker id="m5-hotspot-marker" viewBox="0 0 20 20" refX="10" refY="10" markerWidth="9" markerHeight="9" orient="0">
      <circle cx="10" cy="10" r="8" fill="#f7f0dc" stroke="#263941" stroke-width="2" />
      <circle cx="10" cy="10" r="3" fill="#a95000" />
    </marker>
    <style>
      .m5-art-layer { pointer-events: none; }
      .m5-art-tree-trunk { fill: #67533d; }
      .m5-art-tree-crown { fill: #5f7d4f; stroke: #a2b77c; stroke-width: 2.5; }
      .m5-art-tone-dry .m5-art-tree-crown { fill: #7f7650; stroke: #c1ae72; }
      .m5-art-tone-charred .m5-art-tree-trunk { fill: #3a3430; }
      .m5-art-tone-charred .m5-art-tree-crown { fill: #4a4940; stroke: #777564; }
      .m5-art-shrub { fill: #718957; stroke: #a9b77a; stroke-width: 2; }
      .m5-art-tone-dry .m5-art-shrub { fill: #8d835a; stroke: #c2ad72; }
      .m5-art-tone-charred .m5-art-shrub { fill: #504d43; stroke: #777266; }
      .m5-art-rock { fill: #72766c; stroke: #9da197; stroke-width: 2; }
      .m5-art-smoke { fill: url(#m5-smoke-fill); }
      .m5-art-haze { fill: url(#m5-sky-haze); }

      /* M5 territory art direction: one coherent place, five spatially anchored treatments. */
      svg:has(#territory-road) .visual-sky { fill: url(#m5-sky-depth); }
      svg:has(#territory-road) .visual-hill-back { fill: url(#m5-hill-back); }
      svg:has(#territory-road) .visual-hill-front { fill: url(#m5-hill-front); }
      svg:has(#territory-road) .visual-ravine { fill: url(#m5-ravine-depth); stroke: #b8c2b5; filter: url(#m5-soft-shadow); }

      #territory-road .visual-road,
      #territory-continuity .visual-vegetation-band:first-of-type,
      #territory-residues .visual-residues,
      #territory-grazing .visual-grazing,
      #territory-professional-line .visual-professional-line { marker-start: url(#m5-hotspot-marker); }

      #territory-road .visual-road { filter: url(#m5-soft-shadow); }
      #territory-road.state-clear .visual-road { stroke-width: 30; stroke-dasharray: none; }
      #territory-road.state-constrained .visual-road { stroke-width: 20; stroke-dasharray: 22 16; }
      #territory-continuity.state-continuous .visual-vegetation-band { stroke-width: 31; opacity: .96; }
      #territory-continuity.state-broken .visual-vegetation-band { stroke-width: 25; stroke-dasharray: 44 52; stroke-linecap: butt; opacity: .66; }
      #territory-residues.state-untreated .visual-residues { stroke-width: 12; opacity: 1; }
      #territory-residues.state-treated .visual-residues { stroke-width: 5; stroke-dasharray: 5 18; opacity: .26; }
      #territory-grazing.state-untreated .visual-grazing { fill: url(#m5-dense-fuel-pattern); stroke-width: 4; }
      #territory-grazing.state-treated .visual-grazing { fill: url(#m5-grazed-pattern); stroke-width: 3; stroke-dasharray: 14 8; }
      #territory-professional-line.state-unevaluated .visual-professional-line { stroke-width: 7; stroke-dasharray: 5 20; opacity: .4; }
      #territory-professional-line.state-evaluated .visual-professional-line { stroke-width: 11; stroke-dasharray: 18 8; opacity: 1; filter: url(#m5-soft-shadow); }
      #territory-professional-line.state-evaluated .visual-line-marker { stroke: #f7f0dc; stroke-width: 5; }

      /* M5 housing art direction: better conditions without implying a safe house. */
      svg:has(#housing-home) .visual-sky { fill: url(#m5-sky-depth); }
      svg:has(#housing-home) .visual-hill-front { fill: url(#m5-hill-front); }
      #housing-home.state-conditioned .visual-house { fill: url(#m5-house-wall); stroke-width: 5; filter: url(#m5-soft-shadow); }
      #housing-home .visual-window { fill: url(#m5-window-glass); stroke: #e6f4f4; stroke-width: 2; }
      #housing-vertical-fuel .visual-branches,
      #housing-local-access .visual-road { marker-start: url(#m5-hotspot-marker); }
      #housing-vertical-fuel.state-continuous .visual-branches { stroke-width: 13; stroke-dasharray: none; opacity: 1; }
      #housing-vertical-fuel.state-continuous .visual-trunk { stroke-width: 15; }
      #housing-vertical-fuel.state-reduced .visual-branches { stroke-width: 6; stroke-dasharray: 16 18; opacity: .58; }
      #housing-vertical-fuel.state-reduced .visual-trunk { stroke-width: 10; opacity: .72; }
      #housing-canopy.state-continuous .visual-canopy { r: 76px; stroke-width: 5; opacity: 1; }
      #housing-canopy.state-broken .visual-canopy { r: 43px; stroke-width: 4; stroke-dasharray: 12 8; opacity: .82; }
      #housing-local-access .visual-road { filter: url(#m5-soft-shadow); }
      #housing-local-access.state-clear .visual-road { stroke-width: 42; stroke-dasharray: none; }
      #housing-local-access.state-clear .visual-engine { opacity: 1; }
      #housing-local-access.state-blocked .visual-road { stroke-width: 21; stroke-dasharray: 20 16; opacity: .68; }
      #housing-local-access.state-blocked .visual-engine { opacity: .46; }

      /* M5 crisis art direction: identical ravine geometry, state-driven operating envelope. */
      svg:has(#crisis-road) .visual-sky.crisis { fill: url(#m5-crisis-sky); }
      svg:has(#crisis-road) .visual-hill-back { fill: #68735c; }
      svg:has(#crisis-road) .visual-hill-front { fill: #4e5d4b; }
      svg:has(#crisis-road) .visual-ravine.crisis { fill: url(#m5-ravine-depth); stroke: #9ba49c; filter: url(#m5-soft-shadow); }

      #crisis-road.state-clear .visual-road { stroke-width: 31; stroke-dasharray: none; filter: url(#m5-soft-shadow); }
      #crisis-road.state-constrained .visual-road { stroke-width: 22; stroke-dasharray: 24 16; opacity: .78; }
      #crisis-road.state-blocked .visual-road { stroke-width: 17; stroke-dasharray: 12 18; opacity: .52; }

      #crisis-retreat.state-viable .visual-retreat { stroke-width: 13; stroke-dasharray: none; opacity: 1; }
      #crisis-retreat.state-limited .visual-retreat { stroke-width: 8; stroke-dasharray: 18 18; opacity: .6; }
      #crisis-retreat.state-limited .visual-arrow { opacity: .45; }

      #crisis-position .visual-position { filter: url(#m5-soft-shadow); }
      #crisis-position.state-sustainable .visual-position { r: 35px; stroke-width: 7; opacity: 1; }
      #crisis-position.state-sustainable path { stroke-width: 6; }
      #crisis-position.state-unsustainable .visual-position { r: 23px; stroke-width: 5; stroke-dasharray: 8 8; opacity: .48; }
      #crisis-position.state-unsustainable path { stroke-width: 4; stroke-dasharray: 7 7; opacity: .5; }

      #crisis-pressure .visual-fire { transform-box: fill-box; transform-origin: center bottom; filter: url(#m5-soft-shadow); }
      #crisis-pressure.state-surface .visual-fire { fill: url(#m5-fire-surface); transform: scale(.78); }
      #crisis-pressure.state-severe .visual-fire { fill: url(#m5-fire-severe); transform: scale(1.28); }
      svg:has(#crisis-pressure.state-surface) .m5-art-smoke { opacity: .42; transform-box: fill-box; transform-origin: center bottom; transform: scale(.82); }
      svg:has(#crisis-pressure.state-severe) .m5-art-smoke { opacity: .95; transform-box: fill-box; transform-origin: center bottom; transform: scale(1.18); }

      #crisis-attack-window.state-viable .visual-attack-window { stroke-width: 12; stroke-dasharray: 18 8; opacity: 1; filter: url(#m5-soft-shadow); }
      #crisis-attack-window.state-unavailable .visual-attack-window { stroke-width: 6; stroke-dasharray: 5 19; opacity: .35; }

      #crisis-crown.state-noCrownFire .visual-canopy { r: 48px; stroke-width: 4; stroke-dasharray: 12 10; opacity: .55; }
      #crisis-crown.state-crownRisk .visual-canopy { r: 63px; stroke-width: 7; stroke-dasharray: 6 6; opacity: .9; }
      #crisis-crown.state-crownFire .visual-canopy { r: 72px; fill: #925238; stroke: #ef9340; stroke-width: 9; opacity: 1; filter: url(#m5-soft-shadow); }

      #crisis-professional-line .visual-professional-line,
      #crisis-house-access .visual-road { filter: url(#m5-soft-shadow); }
    </style>
  </defs>`;
}

export function renderSceneHaze(): string {
  return '<rect class="m5-art-layer m5-art-haze" data-art-primitive="haze" x="0" y="0" width="900" height="500" rx="24" />';
}

export function renderSceneTree(
  x: number,
  y: number,
  scale = 1,
  tone: SceneArtTone = 'olive'
): string {
  return `<g class="m5-art-layer m5-art-tone-${tone}" data-art-primitive="tree" transform="translate(${x} ${y}) scale(${scale})" filter="url(#m5-soft-shadow)">
    <rect class="m5-art-tree-trunk" x="-8" y="-74" width="16" height="78" rx="6" />
    <circle class="m5-art-tree-crown" cx="-24" cy="-78" r="34" />
    <circle class="m5-art-tree-crown" cx="18" cy="-92" r="39" />
    <circle class="m5-art-tree-crown" cx="42" cy="-64" r="30" />
  </g>`;
}

export function renderSceneShrubs(
  x: number,
  y: number,
  scale = 1,
  tone: SceneArtTone = 'olive'
): string {
  return `<g class="m5-art-layer m5-art-tone-${tone}" data-art-primitive="shrubs" transform="translate(${x} ${y}) scale(${scale})">
    <ellipse class="m5-art-shrub" cx="0" cy="0" rx="38" ry="19" />
    <ellipse class="m5-art-shrub" cx="34" cy="-8" rx="31" ry="18" />
    <ellipse class="m5-art-shrub" cx="-30" cy="-6" rx="27" ry="16" />
  </g>`;
}

export function renderSceneRocks(x: number, y: number, scale = 1): string {
  return `<g class="m5-art-layer" data-art-primitive="rocks" transform="translate(${x} ${y}) scale(${scale})">
    <path class="m5-art-rock" d="M-42 8 l18 -30 34 2 17 28 -17 18 h-35 z" />
    <path class="m5-art-rock" d="M17 13 l16 -23 29 4 11 24 -19 14 h-28 z" />
  </g>`;
}

export function renderSceneSmoke(x: number, y: number, scale = 1): string {
  return `<g class="m5-art-layer" data-art-primitive="smoke" transform="translate(${x} ${y}) scale(${scale})">
    <ellipse class="m5-art-smoke" cx="0" cy="0" rx="34" ry="24" />
    <ellipse class="m5-art-smoke" cx="18" cy="-34" rx="42" ry="30" />
    <ellipse class="m5-art-smoke" cx="-7" cy="-72" rx="48" ry="35" />
  </g>`;
}
