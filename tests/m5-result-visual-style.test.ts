import { describe, expect, it } from 'vitest';
import {
  buildReferenceComparison,
  runCanonicalReference
} from '../src/application/vertical-beta/vertical-beta-reference-comparison.js';
import { buildApp } from '../src/interfaces/http/app.js';
import { M5_RESULT_VISUAL_STYLE } from '../src/interfaces/http/m5-result-visual-style.js';

describe('M5.5 result and comparison visual hierarchy', () => {
  it('prioritizes outcome, inherited state, causal rails and replay through stable selectors', () => {
    expect(M5_RESULT_VISUAL_STYLE).toContain('.scene[class*="result-"] .scene-heading');
    expect(M5_RESULT_VISUAL_STYLE).toContain('.scene[class*="result-"] .visual-dimension-summary');
    expect(M5_RESULT_VISUAL_STYLE).toContain('.scene[class*="result-"] .relation.decisive');
    expect(M5_RESULT_VISUAL_STYLE).toContain('.scene[class*="result-"] .m4-causal-steps');
    expect(M5_RESULT_VISUAL_STYLE).toContain('#m4-result-actions');
    expect(M5_RESULT_VISUAL_STYLE).toContain('.m4-comparison-grid');
    expect(M5_RESULT_VISUAL_STYLE).toContain('.m4-comparison-replay');
  });

  it('keeps the desktop crisis canvas aligned to the shared 900 by 500 ravine composition', () => {
    expect(M5_RESULT_VISUAL_STYLE).toContain(
      '.visual-scene[data-visual-template="crisis"] .visual-canvas'
    );
    expect(M5_RESULT_VISUAL_STYLE).toContain('aspect-ratio: 9 / 5');
    expect(M5_RESULT_VISUAL_STYLE).toContain(
      '.visual-scene[data-visual-template="crisis"] .crisis-svg'
    );
  });

  it('keeps the five inherited dimensions before visual detail for both canonical results', () => {
    for (const branch of ['prepared', 'vulnerable'] as const) {
      const view = runCanonicalReference(branch);
      expect(view.scene.type).toBe('result');
      expect(view.scene.type === 'result' ? view.scene.relations : []).toHaveLength(5);
      expect(view.session.inheritedState).not.toBeNull();
      expect(Object.keys(view.session.inheritedState ?? {})).toEqual([
        'fuelLoad',
        'fuelContinuity',
        'operationalAccess',
        'defensibility',
        'attackOpportunity'
      ]);
    }
  });

  it('preserves the comparison contract while styling it as two product sides', () => {
    const current = runCanonicalReference('prepared');
    const comparison = buildReferenceComparison(current);

    expect(comparison.current.dimensions).toHaveLength(5);
    expect(comparison.reference.dimensions).toHaveLength(5);
    expect(comparison.current.manifestations).toHaveLength(3);
    expect(comparison.reference.manifestations).toHaveLength(3);
    expect(comparison.title).toBe('Tu partida y otro recorrido de referencia');
  });

  it('injects the M5 visual hierarchy into the same player page and keeps the M4 client', async () => {
    const app = buildApp();
    const response = await app.inject({ method: 'GET', url: '/' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('id="m5-result-visual-style"');
    expect(response.body).toContain('.relation.decisive');
    expect(response.body).toContain('.m4-comparison-side:nth-child(2)');
    expect(response.body).toContain('<script src="/assets/m4-player-loop.js"></script>');
    await app.close();
  });
});
