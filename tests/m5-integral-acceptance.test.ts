import { describe, expect, it } from 'vitest';
import {
  buildReferenceComparison,
  runCanonicalReference
} from '../src/application/vertical-beta/vertical-beta-reference-comparison.js';
import { presentSceneVisualModel } from '../src/application/vertical-beta/vertical-beta-visual-presenter.js';
import { M5_RESULT_VISUAL_STYLE } from '../src/interfaces/http/m5-result-visual-style.js';
import { renderSceneVisual } from '../src/interfaces/http/scene-visual-renderer.js';

describe('M5 integral visual narrative acceptance', () => {
  it('keeps prepared and vulnerable crisis on the same ravine while exposing different operating states', () => {
    const prepared = runCanonicalReference('prepared');
    const vulnerable = runCanonicalReference('vulnerable');

    expect(prepared.session.branch).toBe('prepared');
    expect(vulnerable.session.branch).toBe('vulnerable');

    const preparedVisual = presentSceneVisualModel({
      ...prepared.session,
      currentSceneId: 'crisis-decision-housing-defense'
    });
    const vulnerableVisual = presentSceneVisualModel({
      ...vulnerable.session,
      currentSceneId: 'crisis-decision-crown-fire'
    });
    const preparedMarkup = renderSceneVisual(preparedVisual);
    const vulnerableMarkup = renderSceneVisual(vulnerableVisual);

    expect(preparedMarkup).toContain('data-visual-base="shared-ravine-v1"');
    expect(vulnerableMarkup).toContain('data-visual-base="shared-ravine-v1"');
    expect(preparedMarkup).toContain('state-sustainable');
    expect(preparedMarkup).toContain('state-viable');
    expect(vulnerableMarkup).toContain('state-unsustainable');
    expect(vulnerableMarkup).toContain('state-unavailable');
  });

  it('preserves five inherited dimensions and the four-step causal presentation contract', () => {
    const result = runCanonicalReference('prepared');
    expect(result.scene.type).toBe('result');
    if (result.scene.type !== 'result') throw new Error('Expected result scene.');

    expect(result.scene.relations).toHaveLength(5);
    expect(result.scene.relations.every((relation) => relation.dimensionLabel.length > 0)).toBe(true);
    expect(M5_RESULT_VISUAL_STYLE).toContain('.visual-dimension-summary');
    expect(M5_RESULT_VISUAL_STYLE).toContain('.m4-causal-steps');
    expect(M5_RESULT_VISUAL_STYLE).toContain('.relation.decisive');
  });

  it('keeps the canonical comparison as five dimensions and three manifestations per side', () => {
    const comparison = buildReferenceComparison(runCanonicalReference('prepared'));

    expect(comparison.current.dimensions).toHaveLength(5);
    expect(comparison.reference.dimensions).toHaveLength(5);
    expect(comparison.current.manifestations).toHaveLength(3);
    expect(comparison.reference.manifestations).toHaveLength(3);
    expect(comparison.title).toBe('Tu partida y otro recorrido de referencia');
  });

  it('keeps M5 visual hierarchy responsive without creating a second product surface', () => {
    expect(M5_RESULT_VISUAL_STYLE).toContain('@media (max-width: 1050px)');
    expect(M5_RESULT_VISUAL_STYLE).toContain('@media (max-width: 700px)');
    expect(M5_RESULT_VISUAL_STYLE).toContain('#m4-result-actions');
    expect(M5_RESULT_VISUAL_STYLE).toContain('.m4-comparison-replay');
  });
});
