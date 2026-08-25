import { describe, expect, it } from 'vitest';
import { VerticalBetaApplicationService } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { presentSceneVisualModel } from '../src/application/vertical-beta/vertical-beta-visual-presenter.js';

function applyPrevention(
  service: VerticalBetaApplicationService,
  id: string,
  territory: readonly string[],
  housing: readonly string[]
): void {
  service.create(id);
  service.advance(id);
  territory.forEach((actionId) => service.applyAction(id, actionId));
  service.advance(id);
  housing.forEach((actionId) => service.applyAction(id, actionId));
  service.advance(id);
}

describe('M3 product hardening', () => {
  it('does not reveal a crisis branch in the common first-alert scene', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-common-alert';
    applyPrevention(
      service,
      id,
      ['gestionar-restos-poda', 'activar-pastoreo-preventivo', 'evaluar-quema-tecnica'],
      ['podar-ramas-y-retirar-seco', 'separar-copas']
    );
    service.advance(id);

    const view = service.view(id);
    expect(view.scene.id).toBe('crisis-decision-first-alert');
    expect(view.session.branch).toBeNull();
    const model = presentSceneVisualModel(view.session);
    expect(model.templateId).toBe('briefing');
    expect(model.elements).toEqual([]);
  });

  it('does not present exceeded extinction capacity before crown fire manifests', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-vulnerable-capacity';
    applyPrevention(
      service,
      id,
      ['gestionar-restos-poda', 'activar-pastoreo-preventivo', 'evaluar-quema-tecnica'],
      ['podar-ramas-y-retirar-seco', 'separar-copas']
    );
    service.advance(id);
    service.applyAction(id, 'movilizar-y-verificar');
    service.advance(id);

    let model = presentSceneVisualModel(service.view(id).session);
    expect(service.view(id).scene.id).toBe('crisis-decision-access-blockage');
    expect(model.elements.find(({ id }) => id === 'crisis-capacity')?.state).toBe('limited');

    service.applyAction(id, 'despejar-corredor-operativo');
    service.advance(id);
    model = presentSceneVisualModel(service.view(id).session);
    expect(service.view(id).scene.id).toBe('crisis-decision-ravine-fire');
    expect(model.elements.find(({ id }) => id === 'crisis-capacity')?.state).toBe('limited');

    service.applyAction(id, 'asegurar-flancos-y-repliegue');
    service.advance(id);
    model = presentSceneVisualModel(service.view(id).session);
    expect(service.view(id).scene.id).toBe('crisis-decision-crown-fire');
    expect(model.elements.find(({ id }) => id === 'crisis-capacity')?.state).toBe('exceeded');
    expect(model.elements.find(({ id }) => id === 'crisis-crown')?.state).toBe('crownFire');
  });
});
