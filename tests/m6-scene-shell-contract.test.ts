import { describe, expect, it } from 'vitest';
import { renderSceneShell } from '../src/interfaces/http/scene-shell.js';

const hotspot =
  '<button data-visual-element-id="territory-road" data-focus-action-id="limpiar-margenes-caminos" aria-controls="visual-card-territory-road">Camino</button>';
const card = '<article id="visual-card-territory-road">Detalle del camino</article>';

describe('M6.1a hybrid scene shell', () => {
  it('renders the four layers in one stable order', () => {
    const markup = renderSceneShell({
      baseArt: '<svg><path d="M0 0H10" /></svg>',
      stateOverlays: '<svg><path data-state="constrained" /></svg>',
      hotspots: hotspot,
      cards: card
    });

    const base = markup.indexOf('data-scene-layer="base-art"');
    const state = markup.indexOf('data-scene-layer="state-overlays"');
    const hotspots = markup.indexOf('data-scene-layer="hotspots"');
    const cards = markup.indexOf('data-scene-layer="cards"');

    expect(markup).toContain('data-scene-shell="hybrid-v1"');
    expect(base).toBeGreaterThan(-1);
    expect(base).toBeLessThan(state);
    expect(state).toBeLessThan(hotspots);
    expect(hotspots).toBeLessThan(cards);
    expect(markup.match(/aria-hidden="true"/g)).toHaveLength(2);
  });

  it('keeps semantic hotspot identity stable when base art is replaced', () => {
    const first = renderSceneShell({
      baseArt: '<svg><path class="road-art-v1" /></svg>',
      stateOverlays: '',
      hotspots: hotspot,
      cards: card
    });
    const second = renderSceneShell({
      baseArt: '<svg><path class="road-art-v2" /><circle r="12" /></svg>',
      stateOverlays: '',
      hotspots: hotspot,
      cards: card
    });

    expect(first).toContain('data-visual-element-id="territory-road"');
    expect(second).toContain('data-visual-element-id="territory-road"');
    expect(first).toContain('data-focus-action-id="limpiar-margenes-caminos"');
    expect(second).toContain('data-focus-action-id="limpiar-margenes-caminos"');
  });

  it('rejects interaction leaking into decorative or state layers', () => {
    expect(() =>
      renderSceneShell({
        baseArt: '<g role="button"></g>',
        stateOverlays: '',
        hotspots: hotspot,
        cards: card
      })
    ).toThrow('base-art must remain non-interactive');

    expect(() =>
      renderSceneShell({
        baseArt: '<svg></svg>',
        stateOverlays: '<g tabindex="0"></g>',
        hotspots: hotspot,
        cards: card
      })
    ).toThrow('state-overlays must remain non-interactive');
  });
});
