import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { VerticalBetaApplicationService } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import {
  presentSceneVisualModel,
  type PresentedSceneVisualModel
} from '../src/application/vertical-beta/vertical-beta-visual-presenter.js';
import { renderSceneVisual } from '../src/interfaces/http/scene-visual-renderer.js';

const ROOT = fileURLToPath(new URL('../', import.meta.url));

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

  it('explains a critical inherited dimension with omitted treatments', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-omitted-causes';
    applyPrevention(
      service,
      id,
      ['crear-discontinuidades-vegetales', 'limpiar-margenes-caminos', 'evaluar-quema-tecnica'],
      ['separar-copas', 'despejar-accesos']
    );

    const model = presentSceneVisualModel(service.view(id).session);
    const fuelLoad = model.dimensions.find(({ id }) => id === 'fuelLoad');
    expect(fuelLoad?.state).toBe('critical');
    expect(fuelLoad?.causeActionLabels).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Sin tratar: Gestionar restos de poda'),
        expect.stringContaining('Sin tratar: Ejecutar pastoreo preventivo')
      ])
    );
  });

  it('prioritizes missing access treatments when attack opportunity is critical', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-critical-attack-opportunity';
    applyPrevention(
      service,
      id,
      ['gestionar-restos-poda', 'activar-pastoreo-preventivo', 'evaluar-quema-tecnica'],
      ['podar-ramas-y-retirar-seco', 'separar-copas']
    );

    const model = presentSceneVisualModel(service.view(id).session);
    const opportunity = model.dimensions.find(({ id }) => id === 'attackOpportunity');
    expect(opportunity).toMatchObject({ state: 'critical', value: 24 });
    expect(opportunity?.causeActionLabels).toEqual(
      expect.arrayContaining([
        'Sin tratar: Limpiar márgenes de caminos rurales',
        'Sin tratar: Despejar accesos para autobombas'
      ])
    );
  });

  it('does not render an empty visual canvas for summary-only markup', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-summary-no-canvas';
    applyPrevention(
      service,
      id,
      ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'],
      ['podar-ramas-y-retirar-seco', 'despejar-accesos']
    );

    const markup = renderSceneVisual(presentSceneVisualModel(service.view(id).session));
    expect(markup).toContain('visual-dimension-summary');
    expect(markup).not.toContain('visual-canvas');
  });

  it('fails explicitly when a visual scene loses a required element', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-incomplete';
    service.create(id);
    service.advance(id);
    const model = presentSceneVisualModel(service.view(id).session);
    const incomplete: PresentedSceneVisualModel = {
      ...model,
      elements: model.elements.filter(({ id: elementId }) => elementId !== 'territory-road')
    };

    expect(() => renderSceneVisual(incomplete)).toThrowError(/missing territory-road/);
  });

  it('honours reduced motion and focuses the card when its official action is disabled', async () => {
    const source = await readFile(`${ROOT}src/interfaces/http/prototype-page.ts`, 'utf8');
    expect(source).toContain("matchMedia('(prefers-reduced-motion: reduce)')");
    expect(source).toContain("behavior: reducedMotion ? 'auto' : 'smooth'");
    expect(source).toContain('if (button.disabled)');
    expect(source).toContain("card.setAttribute('tabindex', '-1')");
    expect(source).toContain('card.focus()');
    expect(source).not.toContain('state-conditionned');
  });
});
