export type SceneLayerName = 'base-art' | 'state-overlays' | 'hotspots' | 'cards';

export interface SceneShellLayers {
  readonly baseArt: string;
  readonly stateOverlays: string;
  readonly hotspots: string;
  readonly cards: string;
}

const INTERACTIVE_ATTRIBUTE = /\b(?:tabindex|data-action-id|data-focus-action-id|aria-controls|aria-expanded|contenteditable)\s*=|\brole\s*=\s*["']button["']/i;
const NATIVE_INTERACTIVE_ELEMENT = /<(?:a\b|area\b|button\b|input\b|select\b|textarea\b|summary\b|iframe\b|object\b|embed\b)|<(?:audio|video)\b[^>]*\bcontrols\b/i;

function assertNonInteractiveLayer(name: 'base-art' | 'state-overlays', markup: string): void {
  if (INTERACTIVE_ATTRIBUTE.test(markup) || NATIVE_INTERACTIVE_ELEMENT.test(markup)) {
    throw new Error(`${name} must remain non-interactive.`);
  }
}

function renderLayer(name: SceneLayerName, markup: string, decorative: boolean): string {
  return `<div class="scene-layer scene-${name}" data-scene-layer="${name}"${
    decorative ? ' aria-hidden="true"' : ''
  }>${markup}</div>`;
}

/**
 * Stable composition boundary for M6.
 *
 * The shell owns only layer responsibilities and order. Coordinates, state
 * classification and game actions remain outside this helper.
 */
export function renderSceneShell(layers: SceneShellLayers): string {
  assertNonInteractiveLayer('base-art', layers.baseArt);
  assertNonInteractiveLayer('state-overlays', layers.stateOverlays);

  return `<div class="scene-shell" data-scene-shell="hybrid-v1">${[
    renderLayer('base-art', layers.baseArt, true),
    renderLayer('state-overlays', layers.stateOverlays, true),
    renderLayer('hotspots', layers.hotspots, false),
    renderLayer('cards', layers.cards, false)
  ].join('')}</div>`;
}
