import { describe, expect, it } from 'vitest';
import {
  VerticalBetaApplicationService,
  type PresentedResultScene,
  type VerticalBetaResumeCommand
} from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { M4_PLAYER_LOOP_CLIENT } from '../src/interfaces/http/m4-player-loop-client.js';

const preparedCommands: readonly VerticalBetaResumeCommand[] = [
  { type: 'advance' },
  { type: 'action', actionId: 'gestionar-restos-poda' },
  { type: 'action', actionId: 'crear-discontinuidades-vegetales' },
  { type: 'action', actionId: 'limpiar-margenes-caminos' },
  { type: 'advance' },
  { type: 'action', actionId: 'podar-ramas-y-retirar-seco' },
  { type: 'action', actionId: 'despejar-accesos' },
  { type: 'advance' },
  { type: 'advance' },
  { type: 'action', actionId: 'movilizar-y-verificar' },
  { type: 'advance' },
  { type: 'action', actionId: 'autorizar-maniobra-condicionada' },
  { type: 'advance' },
  { type: 'action', actionId: 'asegurar-flancos-y-repliegue' },
  { type: 'advance' },
  { type: 'action', actionId: 'defender-desde-posicion-segura' },
  { type: 'advance' }
];

const vulnerableCommands: readonly VerticalBetaResumeCommand[] = [
  { type: 'advance' },
  { type: 'action', actionId: 'gestionar-restos-poda' },
  { type: 'action', actionId: 'activar-pastoreo-preventivo' },
  { type: 'action', actionId: 'evaluar-quema-tecnica' },
  { type: 'advance' },
  { type: 'action', actionId: 'podar-ramas-y-retirar-seco' },
  { type: 'action', actionId: 'separar-copas' },
  { type: 'advance' },
  { type: 'advance' },
  { type: 'action', actionId: 'movilizar-y-verificar' },
  { type: 'advance' },
  { type: 'action', actionId: 'despejar-corredor-operativo' },
  { type: 'advance' },
  { type: 'action', actionId: 'asegurar-flancos-y-repliegue' },
  { type: 'advance' },
  { type: 'action', actionId: 'replegar-ante-fuego-de-copas' },
  { type: 'advance' }
];

function resultFor(id: string, commands: readonly VerticalBetaResumeCommand[]): PresentedResultScene {
  const service = new VerticalBetaApplicationService();
  const view = service.restore(id, commands);
  expect(view.scene.type).toBe('result');
  return view.scene as PresentedResultScene;
}

describe('M4.3 pedagogical result closure', () => {
  it('presents the prepared result as five complete causal chains', () => {
    const scene = resultFor('prepared-result', preparedCommands);

    expect(scene.variant).toBe('contained');
    expect(scene.relations).toHaveLength(5);
    expect(scene.relations.map(({ dimensionLabel }) => dimensionLabel)).toEqual([
      'Ramas y hierba seca',
      'Plantas y árboles unidos',
      'Paso para bomberos',
      'Protección de las casas',
      'Formas de apagar el fuego'
    ]);
    for (const relation of scene.relations) {
      expect(relation.causeType).toBe('Lo elegiste');
      expect(relation.causeActionLabels.length).toBeGreaterThan(0);
      expect(relation.stateLabel.length).toBeGreaterThan(0);
      expect(relation.manifestationLabel.length).toBeGreaterThan(0);
      expect(relation.effect.length).toBeGreaterThan(0);
    }
  });

  it('preserves relevant omissions in the vulnerable result', () => {
    const scene = resultFor('vulnerable-result', vulnerableCommands);

    expect(scene.variant).toBe('overwhelmed');
    expect(scene.relations).toHaveLength(5);
    const access = scene.relations.find(({ dimensionLabel }) => dimensionLabel === 'Paso para bomberos');
    expect(access).toMatchObject({
      causeType: 'Quedó pendiente',
      dimensionLabel: 'Paso para bomberos',
      manifestationLabel: 'Camino bloqueado'
    });
    expect(access?.causeActionLabels).toEqual(['Limpiar los bordes del camino']);
  });

  it('uses the same information structure for contained and overwhelmed', () => {
    const prepared = resultFor('structure-prepared', preparedCommands);
    const vulnerable = resultFor('structure-vulnerable', vulnerableCommands);
    const shape = (scene: PresentedResultScene) =>
      scene.relations.map((relation) => Object.keys(relation).sort());

    expect(shape(prepared)).toEqual(shape(vulnerable));
  });

  it('defines the four player-facing steps rendered for every causal relation', () => {
    expect(M4_PLAYER_LOOP_CLIENT).toContain('appendResultStep(');
    expect(M4_PLAYER_LOOP_CLIENT).toContain("'Antes del incendio'");
    expect(M4_PLAYER_LOOP_CLIENT).toContain("'Así empezó'");
    expect(M4_PLAYER_LOOP_CLIENT).toContain("'Cuando llegó el fuego'");
    expect(M4_PLAYER_LOOP_CLIENT).toContain("'Qué ocurrió'");
  });
});
