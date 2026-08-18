import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  CANONICAL_SCENE_IDS,
  CRISIS_BRANCHES,
  RESULT_VARIANTS,
  roundTripJson,
  validateGameSessionContract,
  type GameSessionContractErrorCode
} from './support/game-session-contract.js';

const FIXTURE_DIRECTORY = fileURLToPath(new URL('./fixtures/game-session/', import.meta.url));
const SESSION_FIXTURES = [
  'initial.json',
  'prevention-completed.json',
  'crisis-prepared.json',
  'completed-contained.json',
  'reference-contained.json',
  'reference-overwhelmed.json'
] as const;

const TOP_LEVEL_SESSION_FIELDS = new Set([
  'schemaVersion',
  'id',
  'status',
  'progress',
  'decisions',
  'inheritedState',
  'crisisBranch',
  'result',
  'history'
]);

type MutableJson = Record<string, any>;

async function loadJson(name: string): Promise<MutableJson> {
  const text = await readFile(`${FIXTURE_DIRECTORY}${name}`, 'utf8');
  return JSON.parse(text) as MutableJson;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function expectContractError(value: unknown, code: GameSessionContractErrorCode): void {
  const result = validateGameSessionContract(value);
  expect(result.valid).toBe(false);
  if (result.valid) return;
  expect(result.errors.map((error) => error.code)).toContain(code);
}

describe('GameSession fixture contract', () => {
  for (const fixtureName of SESSION_FIXTURES) {
    it(`${fixtureName} is valid and survives a JSON round trip`, async () => {
      const fixture = await loadJson(fixtureName);
      const result = validateGameSessionContract(fixture);

      expect(result).toEqual({ valid: true, errors: [] });
      expect(roundTripJson(fixture)).toEqual(fixture);
    });
  }

  it('preserves progress and causal history after restoration', async () => {
    const fixture = await loadJson('completed-contained.json');
    const restored = roundTripJson(fixture);

    expect(restored.progress).toEqual(fixture.progress);
    expect(restored.decisions).toEqual(fixture.decisions);
    expect(restored.inheritedState).toEqual(fixture.inheritedState);
    expect(restored.crisisBranch).toBe(fixture.crisisBranch);
    expect(restored.result).toEqual(fixture.result);
    expect(restored.history).toEqual(fixture.history);
  });

  it('represents the vulnerable branch and overwhelmed result without adding fields', async () => {
    const prepared = await loadJson('reference-contained.json');
    const vulnerable = await loadJson('reference-overwhelmed.json');

    expect(validateGameSessionContract(vulnerable)).toEqual({ valid: true, errors: [] });
    expect(vulnerable.crisisBranch).toBe('vulnerable');
    expect(vulnerable.result.variant).toBe('overwhelmed');
    expect(Object.keys(vulnerable).sort()).toEqual(Object.keys(prepared).sort());
  });
});

describe('GameSession coverage matrix', () => {
  it('covers exactly the canonical graph, phases, branches and results', async () => {
    const coverage = await loadJson('coverage.json');
    const sceneIds = coverage.scenes.map((scene: MutableJson) => scene.id);

    expect(coverage.schemaVersion).toBe(1);
    expect(coverage.canonicalSceneIds).toEqual(CANONICAL_SCENE_IDS);
    expect(sceneIds).toEqual(CANONICAL_SCENE_IDS);
    expect(new Set(sceneIds).size).toBe(12);
    expect(new Set(coverage.phases)).toEqual(
      new Set(['intro', 'prevention', 'transition', 'crisis', 'ending'])
    );
    expect(coverage.branches).toEqual(CRISIS_BRANCHES);
    expect(coverage.resultVariants).toEqual(RESULT_VARIANTS);
  });

  it('uses only fields defined by the GameSession contract', async () => {
    const coverage = await loadJson('coverage.json');
    const requiredFields = [
      ...coverage.scenes.flatMap((scene: MutableJson) => scene.requiredSessionFields),
      ...coverage.operations.flatMap((operation: MutableJson) => operation.requiredSessionFields)
    ];

    expect(requiredFields.every((field: string) => TOP_LEVEL_SESSION_FIELDS.has(field))).toBe(true);
    expect(coverage.operations.map((operation: MutableJson) => operation.id)).toEqual([
      'createGameSession',
      'applyDecision',
      'completeNonDecisionScene',
      'resolveCrisisRouter',
      'advanceSession',
      'completeSession',
      'restoreGameSession'
    ]);
  });
});

describe('GameSession corruption detection', () => {
  it('rejects an unsupported schema version', async () => {
    const fixture = await loadJson('initial.json');
    fixture.schemaVersion = 2;
    expectContractError(fixture, 'unsupported-schema-version');
  });

  it('rejects historical or unknown scene IDs', async () => {
    const fixture = await loadJson('initial.json');
    fixture.progress.currentSceneId = 'resultado-beta';
    expectContractError(fixture, 'invalid-current-scene');
  });

  it('rejects gaps in event sequences', async () => {
    const fixture = await loadJson('prevention-completed.json');
    fixture.history[4].sequence = 99;
    expectContractError(fixture, 'invalid-event-sequence');
  });

  it('rejects a decision without its matching event', async () => {
    const fixture = await loadJson('prevention-completed.json');
    fixture.decisions[0].actionId = 'different-action';
    expectContractError(fixture, 'corrupt-session-history');
  });

  it('rejects duplicated completed scenes', async () => {
    const fixture = await loadJson('prevention-completed.json');
    fixture.progress.completedSceneIds.push('prevention-inspection-territory-fuel');
    expectContractError(fixture, 'invalid-completed-scenes');
  });

  it('rejects a current scene that diverges from the last transition', async () => {
    const fixture = await loadJson('prevention-completed.json');
    fixture.progress.currentSceneId = 'crisis-decision-first-alert';
    expectContractError(fixture, 'corrupt-session-history');
  });

  it('rejects incomplete or non-finite InheritedState values', async () => {
    const fixture = await loadJson('prevention-completed.json');
    delete fixture.inheritedState.attackOpportunity;
    fixture.inheritedState.fuelLoad = Number.NaN;
    expectContractError(fixture, 'invalid-inherited-state');
    expectContractError(fixture, 'invalid-json-value');
  });

  it('rejects a branch that is incompatible with the traversed path', async () => {
    const fixture = await loadJson('crisis-prepared.json');
    fixture.crisisBranch = 'vulnerable';
    fixture.history.find((event: MutableJson) => event.type === 'crisis-branch-selected').branch =
      'vulnerable';
    expectContractError(fixture, 'branch-path-mismatch');
  });

  it('rejects a completed session without a result', async () => {
    const fixture = await loadJson('completed-contained.json');
    fixture.result = null;
    expectContractError(fixture, 'session-completion-mismatch');
  });

  it('rejects an active session that already has a final result', async () => {
    const fixture = await loadJson('completed-contained.json');
    fixture.status = 'active';
    expectContractError(fixture, 'session-completion-mismatch');
  });

  it('rejects events appended after session completion', async () => {
    const fixture = await loadJson('completed-contained.json');
    fixture.history.push({
      sequence: 33,
      type: 'scene-transitioned',
      fromSceneId: 'ending-result-causal-report',
      toSceneId: 'intro-briefing-mission'
    });
    expectContractError(fixture, 'event-after-completion');
  });

  it('rejects snapshot/history divergence', async () => {
    const fixture = await loadJson('prevention-completed.json');
    fixture.inheritedState.fuelLoad += 1;
    expectContractError(fixture, 'corrupt-session-history');
  });

  it('rejects unexpected top-level state from the legacy campaign', async () => {
    const fixture = await loadJson('initial.json');
    fixture.resources = { dinero: 1200 };
    expectContractError(fixture, 'unexpected-key');
  });

  it('rejects class instances and other non-JSON values', async () => {
    const fixture = await loadJson('initial.json');
    fixture.history[0].createdAt = new Date();
    expectContractError(fixture, 'invalid-json-value');
  });
});
