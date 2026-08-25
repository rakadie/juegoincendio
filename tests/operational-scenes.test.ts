import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { OFFICIAL_OPERATIONAL_SCENES } from '../src/content/official-operational-scenes.js';
import { VERTICAL_BETA_FLOW } from '../src/content/vertical-beta-catalog.js';
import { replayGameSession } from '../src/domain/game-session/game-session-engine.js';
import type {
  GameSession,
  GameSessionEvent
} from '../src/domain/game-session/game-session.js';
import {
  getOperationalSceneView,
  resolveOperationalDecision
} from '../src/domain/operations/operational-scene-engine.js';
import type { OperationalSceneId } from '../src/domain/types/operational-scene.js';
import { buildApp } from '../src/interfaces/http/app.js';

const FIXTURES = fileURLToPath(new URL('./fixtures/game-session/', import.meta.url));

async function sessionBeforeDecision(
  fixtureName: string,
  sceneId: OperationalSceneId
): Promise<GameSession> {
  const fixture = JSON.parse(
    await readFile(`${FIXTURES}${fixtureName}`, 'utf8')
  ) as GameSession;
  const decisionIndex = fixture.history.findIndex(
    (event) => event.type === 'decision-applied' && event.sceneId === sceneId
  );
  if (decisionIndex < 0) throw new Error(`${fixtureName} has no decision for ${sceneId}.`);
  return replayGameSession(fixture.history.slice(0, decisionIndex) as GameSessionEvent[]);
}

describe('official operational scene catalog', () => {
  it('publishes exactly five canonical scenes through one interactive contract', () => {
    expect(OFFICIAL_OPERATIONAL_SCENES.map(({ id }) => id)).toEqual([
      'crisis-decision-access-blockage',
      'crisis-decision-emergency-fuel-break',
      'crisis-decision-housing-defense',
      'crisis-decision-ravine-fire',
      'crisis-decision-crown-fire'
    ]);
    for (const scene of OFFICIAL_OPERATIONAL_SCENES) {
      expect(scene.type).toBe('decision');
      expect(scene.title.length).toBeGreaterThan(5);
      expect(scene.context.length).toBeGreaterThan(20);
      expect(scene.briefing.length).toBeGreaterThan(20);
      expect(scene.actions.length).toBeGreaterThanOrEqual(3);
      expect(new Set(scene.actions.map(({ id }) => id)).size).toBe(scene.actions.length);
      expect(scene).not.toHaveProperty('nextLogic');
      expect(scene).not.toHaveProperty('unlocks');
    }
  });

  it('uses canonical GameScene content references without historical navigation IDs', () => {
    const operationalRefs = VERTICAL_BETA_FLOW
      .filter(({ id }) => id.startsWith('crisis-decision-') && id !== 'crisis-decision-first-alert')
      .map(({ contentRef }) => contentRef);

    expect(operationalRefs).toEqual([
      'scenario:crisis-decision-emergency-fuel-break',
      'scenario:crisis-decision-access-blockage',
      'scenario:crisis-decision-ravine-fire',
      'scenario:crisis-decision-housing-defense',
      'scenario:crisis-decision-crown-fire'
    ]);
    expect(JSON.stringify(OFFICIAL_OPERATIONAL_SCENES)).not.toMatch(
      /s-011-corte|s-025-cortafuego|s-026-defensa|s-027-fuego|s-030-fuego/
    );
  });

  it('exposes the same canonical contract in the official player payload', async () => {
    const app = buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/api/vertical-beta/content'
    });
    await app.close();

    expect(response.statusCode).toBe(200);
    const payload = response.json<{ operationalScenes: unknown[] }>();
    expect(payload.operationalScenes).toHaveLength(5);
    expect(payload.operationalScenes).toEqual(OFFICIAL_OPERATIONAL_SCENES);
  });
});

describe('operational scene GameSession service', () => {
  const referenceCases = [
    {
      fixture: 'reference-contained.json',
      sceneId: 'crisis-decision-emergency-fuel-break',
      actionId: 'autorizar-maniobra-condicionada',
      evidenceId: 'conditioned-emergency-maneuver-authorized'
    },
    {
      fixture: 'reference-contained.json',
      sceneId: 'crisis-decision-ravine-fire',
      actionId: 'asegurar-flancos-y-repliegue',
      evidenceId: 'ravine-position-held-with-safe-retreat'
    },
    {
      fixture: 'reference-contained.json',
      sceneId: 'crisis-decision-housing-defense',
      actionId: 'defender-desde-posicion-segura',
      evidenceId: 'housing-defense-sustained-selectively'
    },
    {
      fixture: 'reference-overwhelmed.json',
      sceneId: 'crisis-decision-access-blockage',
      actionId: 'despejar-corredor-operativo',
      evidenceId: 'temporary-operational-corridor-limited'
    },
    {
      fixture: 'reference-overwhelmed.json',
      sceneId: 'crisis-decision-ravine-fire',
      actionId: 'asegurar-flancos-y-repliegue',
      evidenceId: 'ravine-position-not-holdable-safe-retreat'
    },
    {
      fixture: 'reference-overwhelmed.json',
      sceneId: 'crisis-decision-crown-fire',
      actionId: 'replegar-ante-fuego-de-copas',
      evidenceId: 'safe-retreat-before-crown-fire'
    }
  ] as const;

  for (const reference of referenceCases) {
    it(`resolves ${reference.sceneId} from ${reference.fixture}`, async () => {
      const session = await sessionBeforeDecision(reference.fixture, reference.sceneId);
      const inheritedState = structuredClone(session.inheritedState);
      const result = resolveOperationalDecision(session, reference.actionId);

      expect(result.evidenceIds).toContain(reference.evidenceId);
      expect(result.consequence.length).toBeGreaterThan(20);
      expect(result.session.inheritedState).toEqual(inheritedState);
      expect(result.session.decisions.at(-1)).toEqual(
        expect.objectContaining({
          sceneId: reference.sceneId,
          actionId: reference.actionId
        })
      );
      expect(result.session.history.at(-1)).toEqual(
        expect.objectContaining({
          type: 'scene-completed',
          sceneId: reference.sceneId,
          evidenceIds: expect.arrayContaining([reference.evidenceId])
        })
      );
    });
  }

  it('reuses one ravine while changing difficulty, availability and consequence by branch', async () => {
    const prepared = await sessionBeforeDecision(
      'reference-contained.json',
      'crisis-decision-ravine-fire'
    );
    const vulnerable = await sessionBeforeDecision(
      'reference-overwhelmed.json',
      'crisis-decision-ravine-fire'
    );
    const preparedView = getOperationalSceneView(prepared);
    const vulnerableView = getOperationalSceneView(vulnerable);

    expect(preparedView.id).toBe(vulnerableView.id);
    expect(preparedView.difficulty).toBe('alta');
    expect(vulnerableView.difficulty).toBe('critica');
    expect(
      preparedView.actions.find(({ id }) => id === 'mantener-ataque-anclado')?.available
    ).toBe(true);
    expect(
      vulnerableView.actions.find(({ id }) => id === 'mantener-ataque-anclado')?.available
    ).toBe(false);
    expect(
      preparedView.actions.find(({ id }) => id === 'asegurar-flancos-y-repliegue')
        ?.resolution?.consequence
    ).not.toBe(
      vulnerableView.actions.find(({ id }) => id === 'asegurar-flancos-y-repliegue')
        ?.resolution?.consequence
    );
  });

  it('blocks unsafe actions and prevents a second decision in the scene', async () => {
    const session = await sessionBeforeDecision(
      'reference-overwhelmed.json',
      'crisis-decision-access-blockage'
    );
    const view = getOperationalSceneView(session);
    expect(
      view.actions.find(({ id }) => id === 'introducir-maquinaria-sin-repliegue')
    ).toEqual(
      expect.objectContaining({
        available: false,
        unavailableReason: expect.stringContaining('ruta segura')
      })
    );
    expect(() =>
      resolveOperationalDecision(session, 'introducir-maquinaria-sin-repliegue')
    ).toThrowError(expect.objectContaining({ code: 'operational-action-unavailable' }));

    const resolved = resolveOperationalDecision(session, 'despejar-corredor-operativo');
    expect(() =>
      resolveOperationalDecision(resolved.session, 'cerrar-acceso-y-reorganizar-medios')
    ).toThrowError(expect.objectContaining({ code: 'operational-scene-already-resolved' }));
  });
});
