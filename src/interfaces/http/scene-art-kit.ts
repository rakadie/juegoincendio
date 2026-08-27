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
    <linearGradient id="m5-smoke-fill" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#59636a" stop-opacity=".7" />
      <stop offset="1" stop-color="#c5c9c7" stop-opacity=".16" />
    </linearGradient>
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
