export const MINIMUM_HOTSPOT_SIZE_PX = 44;

export interface SceneHotspotArea {
  readonly id: string;
  readonly label: string;
  readonly controlsId: string;
  readonly targetId: string;
  readonly actionId?: string;
  readonly xPercent: number;
  readonly yPercent: number;
  readonly widthPercent: number;
  readonly heightPercent: number;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function assertPercentage(name: string, value: number, allowZero = true): void {
  const lowerBound = allowZero ? 0 : Number.EPSILON;
  if (!Number.isFinite(value) || value < lowerBound || value > 100) {
    throw new Error(`${name} must be ${allowZero ? 'between 0 and 100' : 'greater than 0 and at most 100'}.`);
  }
}

function assertArea(area: SceneHotspotArea): void {
  for (const [name, value] of [
    ['id', area.id],
    ['label', area.label],
    ['controlsId', area.controlsId],
    ['targetId', area.targetId]
  ] as const) {
    if (value.trim() === '') throw new Error(`Scene hotspot ${name} cannot be empty.`);
  }

  assertPercentage(`${area.id}.xPercent`, area.xPercent);
  assertPercentage(`${area.id}.yPercent`, area.yPercent);
  assertPercentage(`${area.id}.widthPercent`, area.widthPercent, false);
  assertPercentage(`${area.id}.heightPercent`, area.heightPercent, false);
}

/**
 * Renders invisible HTML hit areas over the scene. The element is deliberately
 * not a native button and has no visible marker; its accessible button role is
 * the keyboard/touch contract, while feedback belongs to the referenced state
 * overlay.
 */
export function renderSceneHotspotAreas(areas: readonly SceneHotspotArea[]): string {
  const ids = new Set<string>();
  return areas
    .map((area) => {
      assertArea(area);
      if (ids.has(area.id)) throw new Error(`Duplicate scene hotspot id: ${area.id}.`);
      ids.add(area.id);

      return `<span id="hotspot-${escapeHtml(area.id)}" class="scene-hotspot-area" role="button" tabindex="0" aria-label="${escapeHtml(
        area.label
      )}" aria-controls="${escapeHtml(area.controlsId)}" aria-expanded="false" data-scene-hotspot data-visual-element-id="${escapeHtml(
        area.id
      )}" data-scene-target-id="${escapeHtml(area.targetId)}"${
        area.actionId === undefined
          ? ''
          : ` data-focus-action-id="${escapeHtml(area.actionId)}"`
      } style="--hotspot-x:${area.xPercent}%;--hotspot-y:${area.yPercent}%;--hotspot-width:${area.widthPercent}%;--hotspot-height:${area.heightPercent}%"></span>`;
    })
    .join('');
}

export const SCENE_HOTSPOT_AREA_CSS = String.raw`
  .scene-hotspots {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .scene-hotspot-area {
    position: absolute;
    left: var(--hotspot-x);
    top: var(--hotspot-y);
    width: max(var(--hotspot-width), ${MINIMUM_HOTSPOT_SIZE_PX}px);
    height: max(var(--hotspot-height), ${MINIMUM_HOTSPOT_SIZE_PX}px);
    transform: translate(-50%, -50%);
    display: block;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: transparent;
    cursor: pointer;
    pointer-events: auto;
  }
`;

