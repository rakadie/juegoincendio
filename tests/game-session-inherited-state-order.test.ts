import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  validateGameSessionContract,
  type GameSessionContractErrorCode
} from './support/game-session-contract.js';

const FIXTURE_DIRECTORY = fileURLToPath(new URL('./fixtures/game-session/', import.meta.url));

type MutableJson = Record<string, any>;

async function loadPreventionCompletedFixture(): Promise<MutableJson> {
  const text = await readFile(`${FIXTURE_DIRECTORY}prevention-completed.json`, 'utf8');
  return JSON.parse(text) as MutableJson;
}

function renumberHistory(history: MutableJson[]): void {
  history.forEach((event, index) => {
    event.sequence = index + 1;
  });
}

function expectContractError(value: unknown, code: GameSessionContractErrorCode): void {
  const result = validateGameSessionContract(value);
  expect(result.valid).toBe(false);
  if (result.valid) return;
  expect(result.errors.map((error) => error.code)).toContain(code);
}

describe('InheritedState calculation ordering', () => {
  it('rejects source decisions that occur after inherited-state-calculated', async () => {
    const fixture = await loadPreventionCompletedFixture();
    const calculationIndex = fixture.history.findIndex(
      (event: MutableJson) => event.type === 'inherited-state-calculated'
    );
    const [calculationEvent] = fixture.history.splice(calculationIndex, 1);
    const firstDecisionIndex = fixture.history.findIndex(
      (event: MutableJson) => event.type === 'decision-applied'
    );

    fixture.history.splice(firstDecisionIndex, 0, calculationEvent);
    renumberHistory(fixture.history);

    expectContractError(fixture, 'corrupt-session-history');
  });

  it('requires inherited-state-calculated at the completed-inspection boundary', async () => {
    const fixture = await loadPreventionCompletedFixture();
    const calculationIndex = fixture.history.findIndex(
      (event: MutableJson) => event.type === 'inherited-state-calculated'
    );
    const [calculationEvent] = fixture.history.splice(calculationIndex, 1);
    const transitionIndex = fixture.history.findIndex(
      (event: MutableJson) =>
        event.type === 'scene-transitioned' &&
        event.fromSceneId === 'prevention-inspection-housing-interface' &&
        event.toSceneId === 'transition-summary-prevention'
    );

    fixture.history.splice(transitionIndex + 1, 0, calculationEvent);
    renumberHistory(fixture.history);

    expectContractError(fixture, 'corrupt-session-history');
  });
});
