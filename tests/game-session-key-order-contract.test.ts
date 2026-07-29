import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  validateGameSessionContract,
  type GameSessionContractErrorCode
} from './support/game-session-contract.js';

const FIXTURE_DIRECTORY = fileURLToPath(new URL('./fixtures/game-session/', import.meta.url));

type MutableJson = Record<string, any>;

async function loadCompletedFixture(): Promise<MutableJson> {
  const text = await readFile(`${FIXTURE_DIRECTORY}completed-contained.json`, 'utf8');
  return JSON.parse(text) as MutableJson;
}

function expectContractError(value: unknown, code: GameSessionContractErrorCode): void {
  const result = validateGameSessionContract(value);
  expect(result.valid).toBe(false);
  if (result.valid) return;
  expect(result.errors.map((error) => error.code)).toContain(code);
}

describe('GameSession structural JSON equality', () => {
  it('accepts equivalent InheritedState objects with different key order', async () => {
    const fixture = await loadCompletedFixture();
    const inheritedEvent = fixture.history.find(
      (event: MutableJson) => event.type === 'inherited-state-calculated'
    );

    inheritedEvent.state = {
      attackOpportunity: fixture.inheritedState.attackOpportunity,
      defensibility: fixture.inheritedState.defensibility,
      operationalAccess: fixture.inheritedState.operationalAccess,
      fuelContinuity: fixture.inheritedState.fuelContinuity,
      fuelLoad: fixture.inheritedState.fuelLoad
    };

    expect(validateGameSessionContract(fixture)).toEqual({ valid: true, errors: [] });
  });

  it('accepts equivalent result objects with different key order', async () => {
    const fixture = await loadCompletedFixture();
    const completedEvent = fixture.history.find(
      (event: MutableJson) => event.type === 'session-completed'
    );

    completedEvent.result = {
      evidenceIds: [...fixture.result.evidenceIds],
      variant: fixture.result.variant
    };

    expect(validateGameSessionContract(fixture)).toEqual({ valid: true, errors: [] });
  });

  it('still rejects a reordered InheritedState when a value differs', async () => {
    const fixture = await loadCompletedFixture();
    const inheritedEvent = fixture.history.find(
      (event: MutableJson) => event.type === 'inherited-state-calculated'
    );

    inheritedEvent.state = {
      attackOpportunity: fixture.inheritedState.attackOpportunity,
      defensibility: fixture.inheritedState.defensibility,
      operationalAccess: fixture.inheritedState.operationalAccess,
      fuelContinuity: fixture.inheritedState.fuelContinuity,
      fuelLoad: fixture.inheritedState.fuelLoad + 1
    };

    expectContractError(fixture, 'corrupt-session-history');
  });

  it('keeps array order significant while ignoring object key order', async () => {
    const fixture = await loadCompletedFixture();
    const completedEvent = fixture.history.find(
      (event: MutableJson) => event.type === 'session-completed'
    );

    completedEvent.result = {
      evidenceIds: [...fixture.result.evidenceIds].reverse(),
      variant: fixture.result.variant
    };

    expectContractError(fixture, 'session-completion-mismatch');
  });
});
