import { describe, expect, it } from 'vitest';
import {
  VerticalBetaApplicationService,
  type PresentedInspectionScene,
  type PresentedSummaryScene
} from '../src/application/vertical-beta/vertical-beta-application-service.js';

function reachHousing(service: VerticalBetaApplicationService, id: string): void {
  service.create(id);
  service.advance(id);
  ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'].forEach(
    (actionId) => service.applyAction(id, actionId)
  );
  service.advance(id);
}

describe('housing prevention product response', () => {
  it('explains the latest effect while keeping the real two-action budget visible', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'housing-product-feedback';
    reachHousing(service, id);

    service.applyAction(id, 'podar-ramas-y-retirar-seco');
    const first = service.view(id).scene as PresentedInspectionScene;
    expect(first).toMatchObject({
      selectedCount: 1,
      actionQuota: 2,
      canAdvance: false,
      feedback:
        'Ramas podadas y suelo limpio. Al fuego le cuesta más subir a las copas.'
    });
    expect(first.actions.find(({ id: actionId }) => actionId === 'podar-ramas-y-retirar-seco'))
      .toMatchObject({ selected: true, available: false });

    service.applyAction(id, 'despejar-accesos');
    const complete = service.view(id).scene as PresentedInspectionScene;
    expect(complete).toMatchObject({
      selectedCount: 2,
      actionQuota: 2,
      canAdvance: true,
      feedback:
        'Entrada despejada. El camión de bomberos puede entrar, girar y salir mejor.'
    });
    expect(complete.actions.every(({ available }) => available === false)).toBe(true);
  });

  it('groups applied decisions and pending conditions by territory and housing', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'housing-product-balance';
    reachHousing(service, id);
    service.applyAction(id, 'podar-ramas-y-retirar-seco');
    service.applyAction(id, 'despejar-accesos');
    service.advance(id);

    const summary = service.view(id).scene as PresentedSummaryScene;
    expect(summary.preventionAreas).toHaveLength(2);
    expect(summary.preventionAreas[0]).toMatchObject({
      sceneId: 'prevention-inspection-territory-fuel',
      selectedActions: expect.arrayContaining([
        expect.objectContaining({ actionId: 'limpiar-margenes-caminos' })
      ])
    });
    expect(summary.preventionAreas[0]?.pendingConditions).toHaveLength(2);
    expect(summary.preventionAreas[1]).toMatchObject({
      sceneId: 'prevention-inspection-housing-interface',
      selectedActions: expect.arrayContaining([
        expect.objectContaining({ actionId: 'podar-ramas-y-retirar-seco' }),
        expect.objectContaining({ actionId: 'despejar-accesos' })
      ]),
      pendingConditions: [
        expect.objectContaining({
          actionId: 'separar-copas',
          label: 'Copas de árboles unidas'
        })
      ]
    });
    expect(summary.dimensions).toHaveLength(5);
  });
});
