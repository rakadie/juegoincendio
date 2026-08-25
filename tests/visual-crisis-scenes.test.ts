import { describe, expect, it } from 'vitest';
import { VerticalBetaApplicationService } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { presentSceneVisualModel } from '../src/application/vertical-beta/vertical-beta-visual-presenter.js';
import { renderSceneVisual } from '../src/interfaces/http/scene-visual-renderer.js';

function prepare(service: VerticalBetaApplicationService, id: string): void {
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
}

describe('M3 operational visual scenes', () => {
  it('renders the professional-line position in the emergency fuel-break scene', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-fuel-break';
    prepare(service, id);

    expect(service.view(id).scene.id).toBe('crisis-decision-emergency-fuel-break');
    const markup = renderSceneVisual(presentSceneVisualModel(service.view(id).session));
    expect(markup).toContain('id="crisis-professional-line"');
    expect(markup).toContain('visual-professional-line');
    expect(markup).toContain('state-unevaluated');
  });

  it('renders a home and local access in the housing-defense scene', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-housing-defense';
    prepare(service, id);
    service.applyAction(id, 'autorizar-maniobra-condicionada');
    service.advance(id);
    service.applyAction(id, 'asegurar-flancos-y-repliegue');
    service.advance(id);

    expect(service.view(id).scene.id).toBe('crisis-decision-housing-defense');
    const markup = renderSceneVisual(presentSceneVisualModel(service.view(id).session));
    expect(markup).toContain('id="crisis-house-access"');
    expect(markup).toContain('visual-house');
    expect(markup).toContain('visual-road local');
  });
});
