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
      'Carga de combustible',
      'Continuidad del combustible',
      'Acceso operativo',
      'Defensibilidad',
      'Oportunidad de ataque'
    ]);
    for (const relation of scene.relations) {
      expect(relation.causeType).toBe('Acción aplicada');
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
    const access = scene.relations.find(({ dimensionLabel }) => dimensionLabel === 'Acceso operativo');
    expect(access).toMatchObject({
      causeType: 'Omisión relevante',
      dimensionLabel: 'Acceso operativo',
      manifestationLabel: 'Bloqueo de accesos'
    });
    expect(access?.causeActionLabels).toEqual(['Limpiar márgenes de caminos rurales']);
  });

  it('uses the same information structure for contained and overwhelmed', () => {
    const prepared = resultFor('structure-prepared', preparedCommands);
    const vulnerable = resultFor('structure-vulnerable', vulnerableCommands);
    const shape = (scene: PresentedResultScene) =>
      scene.relations.map((relation) => Object.keys(relation).sort());

    expect(shape(prepared)).toEqual(shape(vulnerable));
  });

  it('defines the four player-facing steps rendered for every causal relation', () => {
    expect(M4_PLAYER_LOOP_CLIENT).toContain("appendResultStep(\n        steps,\n        'Causa'");
    expect(M4_PLAYER_LOOP_CLIENT).toContain("'Estado heredado'");
    expect(M4_PLAYER_LOOP_CLIENT).toContain("'Durante la crisis'");
    expect(M4_PLAYER_LOOP_CLIENT).toContain("'Consecuencia'");
  });
});
