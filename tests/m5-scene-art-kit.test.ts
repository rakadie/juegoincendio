import { describe, expect, it } from 'vitest';
import { VerticalBetaApplicationService } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { presentSceneVisualModel } from '../src/application/vertical-beta/vertical-beta-visual-presenter.js';
import {
  renderSceneArtDefs,
  renderSceneRocks,
  renderSceneShrubs,
  renderSceneSmoke,
  renderSceneTree,
  SCENE_ART_KIT_VERSION
} from '../src/interfaces/http/scene-art-kit.js';
import { renderSceneVisual } from '../src/interfaces/http/scene-visual-renderer.js';

function territoryMarkup(): string {
  const service = new VerticalBetaApplicationService();
  service.create('m5-kit-territory');
  service.advance('m5-kit-territory');
  return renderSceneVisual(presentSceneVisualModel(service.view('m5-kit-territory').session));
}

function housingMarkup(): string {
  const service = new VerticalBetaApplicationService();
  const id = 'm5-kit-housing';
  service.create(id);
  service.advance(id);
  ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'].forEach(
    (actionId) => service.applyAction(id, actionId)
  );
  service.advance(id);
  return renderSceneVisual(presentSceneVisualModel(service.view(id).session));
}

function crisisMarkup(): string {
  const service = new VerticalBetaApplicationService();
  const id = 'm5-kit-crisis';
  service.create(id);
  service.advance(id);
  ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'].forEach(
    (actionId) => service.applyAction(id, actionId)
  );
  service.advance(id);
  ['podar-ramas-y-retirar-seco', 'despejar-accesos'].forEach((actionId) =>
    service.applyAction(id, actionId)
  );
  service.advance(id);
  service.advance(id);
  service.applyAction(id, 'movilizar-y-verificar');
  service.advance(id);
  return renderSceneVisual(presentSceneVisualModel(service.view(id).session));
}

describe('M5.1 shared SVG scene art kit', () => {
  it('provides one versioned set of decorative SVG primitives', () => {
    expect(SCENE_ART_KIT_VERSION).toBe('m5-v1');
    expect(renderSceneArtDefs()).toContain('data-scene-art-kit="m5-v1"');
    expect(renderSceneTree(10, 20)).toContain('data-art-primitive="tree"');
    expect(renderSceneShrubs(10, 20)).toContain('data-art-primitive="shrubs"');
    expect(renderSceneRocks(10, 20)).toContain('data-art-primitive="rocks"');
    expect(renderSceneSmoke(10, 20)).toContain('data-art-primitive="smoke"');
  });

  it('reuses the same kit in territory while keeping semantic hotspots explicit', () => {
    const markup = territoryMarkup();
    expect(markup).toContain('data-scene-art-kit="m5-v1"');
    expect(markup).toContain('data-art-primitive="tree"');
    expect(markup).toContain('data-art-primitive="shrubs"');
    expect(markup).toContain('data-art-primitive="rocks"');
    expect(markup).toContain('id="territory-road"');
    expect(markup).toContain('id="territory-professional-line"');
  });

  it('reuses the same kit in housing without changing the existing visual contract', () => {
    const markup = housingMarkup();
    expect(markup).toContain('data-scene-art-kit="m5-v1"');
    expect(markup).toContain('data-art-primitive="tree"');
    expect(markup).toContain('data-art-primitive="shrubs"');
    expect(markup).toContain('id="housing-home"');
    expect(markup).toContain('id="housing-local-access"');
  });

  it('reuses the same kit in crisis and adds atmosphere without changing the shared ravine base', () => {
    const markup = crisisMarkup();
    expect(markup).toContain('data-scene-art-kit="m5-v1"');
    expect(markup).toContain('data-art-primitive="smoke"');
    expect(markup).toContain('data-visual-base="shared-ravine-v1"');
    expect(markup).toContain('id="crisis-road"');
    expect(markup).toContain('id="crisis-position"');
  });
});
