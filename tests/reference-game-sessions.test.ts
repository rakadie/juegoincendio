import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  INHERITED_STATE_KEYS,
  roundTripJson,
  validateGameSessionContract
} from './support/game-session-contract.js';

const FIXTURE_DIRECTORY = fileURLToPath(new URL('./fixtures/game-session/', import.meta.url));
const SESSION_FIELDS = [
  'schemaVersion',
  'id',
  'status',
  'progress',
  'decisions',
  'inheritedState',
  'crisisBranch',
  'result',
  'history'
].sort();

type JsonObject = Record<string, any>;

async function loadJson(name: string): Promise<JsonObject> {
  return JSON.parse(await readFile(`${FIXTURE_DIRECTORY}${name}`, 'utf8')) as JsonObject;
}

const COMMON_PATH = [
  'intro-briefing-mission',
  'prevention-inspection-territory-fuel',
  'prevention-inspection-housing-interface',
  'transition-summary-prevention',
  'crisis-decision-first-alert',
  'crisis-router-causal-map'
];

const PREPARED_ACTIONS = [
  'gestionar-restos-poda',
  'crear-discontinuidades-vegetales',
  'limpiar-margenes-caminos',
  'podar-ramas-y-retirar-seco',
  'despejar-accesos',
  'movilizar-y-verificar',
  'autorizar-maniobra-condicionada',
  'asegurar-flancos-y-repliegue',
  'defender-desde-posicion-segura'
];

const VULNERABLE_ACTIONS = [
  'gestionar-restos-poda',
  'activar-pastoreo-preventivo',
  'evaluar-quema-tecnica',
  'podar-ramas-y-retirar-seco',
  'separar-copas',
  'movilizar-y-verificar',
  'despejar-corredor-operativo',
  'asegurar-flancos-y-repliegue',
  'replegar-ante-fuego-de-copas'
];

describe('canonical reference game sessions', () => {
  it('pins one deterministic external context outside GameSession', async () => {
    const context = await loadJson('reference-context.json');

    expect(context).toEqual({
      schemaVersion: 1,
      referenceContextId: 'vb1-reference-context-v1',
      municipalityProfileId: 'fictional-ravine-interface-municipality-v1',
      weatherProfile: {
        id: 'dry-windy-daylight-v1',
        alertTime: '13:42',
        daylight: true,
        precipitation: 'none',
        temperature: 'warm',
        humidity: 'low',
        windPattern: 'irregular-gusts',
        windDirection: 'lower-ravine-to-interface',
        changesDuringSession: false
      },
      ignitionProfile: {
        id: 'lower-ravine-rural-track-v1',
        location: 'lower-ravine-rural-track-edge',
        cause: 'unconfirmed',
        initialObservation: 'smoke-column-and-incipient-flames'
      },
      externalCapacityProfileId: 'standard-response-capacity-v1',
      exposureProfileId: 'same-homes-and-positions-v1',
      rulesetId: 'm1-reference-rules-v1',
      gameSessionSchemaVersion: 1,
      randomness: 'none',
      selectionLimits: { territory: 3, housing: 2 },
      firstAlertActionId: 'movilizar-y-verificar',
      expectedDecisionCount: 9,
      expectedVisitedNodeCount: 10,
      targetDurationMinutes: { min: 20, max: 25 }
    });
    expect(roundTripJson(context)).toEqual(context);
  });

  it('validates and restores both canonical sessions exactly', async () => {
    const sessions = await Promise.all([
      loadJson('reference-contained.json'),
      loadJson('reference-overwhelmed.json')
    ]);

    for (const session of sessions) {
      expect(validateGameSessionContract(session)).toEqual({ valid: true, errors: [] });
      expect(roundTripJson(session)).toEqual(session);
      expect(Object.keys(session).sort()).toEqual(SESSION_FIELDS);
      expect(session.decisions).toHaveLength(9);
      expect(session.progress.completedSceneIds).toHaveLength(10);
      expect(session.history).toHaveLength(32);
      expect(session.history.map((event: JsonObject) => event.sequence)).toEqual(
        Array.from({ length: 32 }, (_, index) => index + 1)
      );
    }
  });

  it('attributes different outcomes to identifiable prevention decisions', async () => {
    const prepared = await loadJson('reference-contained.json');
    const vulnerable = await loadJson('reference-overwhelmed.json');

    expect(prepared.decisions.map((decision: JsonObject) => decision.actionId)).toEqual(
      PREPARED_ACTIONS
    );
    expect(vulnerable.decisions.map((decision: JsonObject) => decision.actionId)).toEqual(
      VULNERABLE_ACTIONS
    );

    expect(prepared.decisions.slice(0, 5).map((decision: JsonObject) => decision.actionId)).not.toEqual(
      vulnerable.decisions.slice(0, 5).map((decision: JsonObject) => decision.actionId)
    );
    expect(prepared.decisions[5].actionId).toBe('movilizar-y-verificar');
    expect(vulnerable.decisions[5].actionId).toBe('movilizar-y-verificar');
    expect(prepared.decisions[7].actionId).toBe('asegurar-flancos-y-repliegue');
    expect(vulnerable.decisions[7].actionId).toBe('asegurar-flancos-y-repliegue');
  });

  it('keeps the common graph trunk and proves the expected branch divergence', async () => {
    const prepared = await loadJson('reference-contained.json');
    const vulnerable = await loadJson('reference-overwhelmed.json');

    expect(prepared.progress.completedSceneIds.slice(0, 6)).toEqual(COMMON_PATH);
    expect(vulnerable.progress.completedSceneIds.slice(0, 6)).toEqual(COMMON_PATH);
    expect(prepared.progress.completedSceneIds.slice(6)).toEqual([
      'crisis-decision-emergency-fuel-break',
      'crisis-decision-ravine-fire',
      'crisis-decision-housing-defense',
      'ending-result-causal-report'
    ]);
    expect(vulnerable.progress.completedSceneIds.slice(6)).toEqual([
      'crisis-decision-access-blockage',
      'crisis-decision-ravine-fire',
      'crisis-decision-crown-fire',
      'ending-result-causal-report'
    ]);
    expect(prepared.crisisBranch).toBe('prepared');
    expect(vulnerable.crisisBranch).toBe('vulnerable');
  });

  it('changes every inherited dimension and produces opposite causal results', async () => {
    const prepared = await loadJson('reference-contained.json');
    const vulnerable = await loadJson('reference-overwhelmed.json');
    const changedDimensions = INHERITED_STATE_KEYS.filter(
      (key) => prepared.inheritedState[key] !== vulnerable.inheritedState[key]
    );

    expect(Object.keys(prepared.inheritedState)).toEqual(INHERITED_STATE_KEYS);
    expect(Object.keys(vulnerable.inheritedState)).toEqual(INHERITED_STATE_KEYS);
    expect(prepared.inheritedState).toEqual({
      fuelLoad: 45,
      fuelContinuity: 25,
      operationalAccess: 80,
      defensibility: 50,
      attackOpportunity: 66
    });
    expect(vulnerable.inheritedState).toEqual({
      fuelLoad: 25,
      fuelContinuity: 35,
      operationalAccess: 20,
      defensibility: 30,
      attackOpportunity: 24
    });
    expect(changedDimensions).toHaveLength(5);
    expect(prepared.result.variant).toBe('contained');
    expect(vulnerable.result.variant).toBe('overwhelmed');
    expect(prepared.result.evidenceIds).not.toEqual(vulnerable.result.evidenceIds);
  });

  it('makes the same ravine decision produce context-dependent evidence', async () => {
    const prepared = await loadJson('reference-contained.json');
    const vulnerable = await loadJson('reference-overwhelmed.json');
    const ravineEvidence = (session: JsonObject): string[] =>
      session.history.find(
        (event: JsonObject) =>
          event.type === 'scene-completed' && event.sceneId === 'crisis-decision-ravine-fire'
      ).evidenceIds as string[];

    expect(ravineEvidence(prepared)).toEqual(['ravine-position-held-with-safe-retreat']);
    expect(ravineEvidence(vulnerable)).toEqual([
      'ravine-position-not-holdable-safe-retreat'
    ]);
  });
});
