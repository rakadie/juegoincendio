import { describe, expect, it } from 'vitest';
import { VerticalBetaApplicationService } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { presentSceneVisualModel } from '../src/application/vertical-beta/vertical-beta-visual-presenter.js';
import { renderSceneArtDefs } from '../src/interfaces/http/scene-art-kit.js';
import { renderSceneVisual } from '../src/interfaces/http/scene-visual-renderer.js';

function reachPreparedCrisis(id: string): { markup: string; states: Map<string, string> } {
  const service = new VerticalBetaApplicationService();
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
  const model = presentSceneVisualModel(service.view(id).session);
  return {
    markup: renderSceneVisual(model),
    states: new Map(model.elements.map(({ id: elementId, state }) => [elementId, state]))
  };
}

function reachVulnerableCrisis(id: string): { markup: string; states: Map<string, string> } {
  const service = new VerticalBetaApplicationService();
  service.create(id);
  service.advance(id);
  ['gestionar-restos-poda', 'activar-pastoreo-preventivo', 'evaluar-quema-tecnica'].forEach(
    (actionId) => service.applyAction(id, actionId)
  );
  service.advance(id);
  ['podar-ramas-y-retirar-seco', 'separar-copas'].forEach((actionId) =>
    service.applyAction(id, actionId)
  );
  service.advance(id);
  service.advance(id);
  service.applyAction(id, 'movilizar-y-verificar');
  service.advance(id);
  const model = presentSceneVisualModel(service.view(id).session);
  return {
    markup: renderSceneVisual(model),
    states: new Map(model.elements.map(({ id: elementId, state }) => [elementId, state]))
  };
}

describe('M5.4 shared ravine crisis art direction', () => {
  it('uses the exact same spatial base for prepared and vulnerable crisis scenes', () => {
    const prepared = reachPreparedCrisis('m5-crisis-prepared');
    const vulnerable = reachVulnerableCrisis('m5-crisis-vulnerable');

    expect(prepared.markup).toContain('data-visual-base="shared-ravine-v1"');
    expect(vulnerable.markup).toContain('data-visual-base="shared-ravine-v1"');
    for (const id of [
      'crisis-road',
      'crisis-retreat',
      'crisis-position',
      'crisis-pressure',
      'crisis-attack-window',
      'crisis-crown'
    ]) {
      expect(prepared.markup).toContain(`id="${id}"`);
      expect(vulnerable.markup).toContain(`id="${id}"`);
    }
  });

  it('presents different operating envelopes from the same ravine geometry', () => {
    const prepared = reachPreparedCrisis('m5-envelope-prepared').states;
    const vulnerable = reachVulnerableCrisis('m5-envelope-vulnerable').states;

    expect(Object.fromEntries(prepared)).toMatchObject({
      'crisis-road': 'clear',
      'crisis-retreat': 'viable',
      'crisis-position': 'sustainable',
      'crisis-pressure': 'surface',
      'crisis-attack-window': 'viable',
      'crisis-crown': 'noCrownFire',
      'crisis-capacity': 'withinCapacity'
    });
    expect(Object.fromEntries(vulnerable)).toMatchObject({
      'crisis-road': 'blocked',
      'crisis-retreat': 'limited',
      'crisis-position': 'unsustainable',
      'crisis-pressure': 'severe',
      'crisis-attack-window': 'unavailable',
      'crisis-crown': 'crownRisk',
      'crisis-capacity': 'limited'
    });
  });

  it('defines structural crisis differences rather than relying only on color', () => {
    const defs = renderSceneArtDefs();
    expect(defs).toContain('#crisis-road.state-clear .visual-road');
    expect(defs).toContain('#crisis-road.state-blocked .visual-road');
    expect(defs).toContain('#crisis-retreat.state-viable .visual-retreat');
    expect(defs).toContain('#crisis-retreat.state-limited .visual-retreat');
    expect(defs).toContain('#crisis-position.state-sustainable .visual-position');
    expect(defs).toContain('#crisis-position.state-unsustainable .visual-position');
    expect(defs).toContain('#crisis-pressure.state-surface .visual-fire');
    expect(defs).toContain('#crisis-pressure.state-severe .visual-fire');
    expect(defs).toContain('#crisis-attack-window.state-viable .visual-attack-window');
    expect(defs).toContain('#crisis-attack-window.state-unavailable .visual-attack-window');
    expect(defs).toContain('#crisis-crown.state-noCrownFire .visual-canopy');
    expect(defs).toContain('#crisis-crown.state-crownRisk .visual-canopy');
    expect(defs).toContain('#crisis-crown.state-crownFire .visual-canopy');
  });
});
