import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  createGameSession,
  deserializeGameSession,
  executeGameSessionCommand,
  replayGameSession,
  serializeGameSession
} from '../src/domain/game-session/game-session-engine.js';
import type {
  GameSession,
  GameSessionCommand,
  GameSessionEvent
} from '../src/domain/game-session/game-session.js';

const FIXTURES = fileURLToPath(new URL('./fixtures/game-session/', import.meta.url));

async function fixture(name: string): Promise<GameSession> {
  return JSON.parse(await readFile(`${FIXTURES}${name}`, 'utf8')) as GameSession;
}

function commandFor(event: GameSessionEvent): GameSessionCommand | undefined {
  switch (event.type) {
    case 'session-created':
      return undefined;
    case 'decision-applied':
      return { type: 'apply-decision', sceneId: event.sceneId, actionId: event.actionId };
    case 'scene-completed':
      return {
        type: 'complete-scene',
        sceneId: event.sceneId,
        evidenceIds: event.evidenceIds
      };
    case 'inherited-state-calculated':
      return {
        type: 'record-inherited-state',
        state: event.state,
        sourceDecisionSequences: event.sourceDecisionSequences,
        evidenceIds: event.evidenceIds
      };
    case 'crisis-branch-selected':
      return {
        type: 'select-crisis-branch',
        branch: event.branch,
        evidenceIds: event.evidenceIds
      };
    case 'scene-transitioned':
      return { type: 'transition-scene', toSceneId: event.toSceneId };
    case 'session-completed':
      return { type: 'complete-session', result: event.result };
  }
}

function executeHistory(events: readonly GameSessionEvent[]): GameSession {
  const created = events[0];
  if (created?.type !== 'session-created') throw new Error('Missing session-created event.');
  let session = createGameSession(created.sessionId);
  for (const event of events.slice(1)) {
    const command = commandFor(event);
    if (command !== undefined) session = executeGameSessionCommand(session, command);
  }
  return session;
}

describe('GameSession domain engine', () => {
  it('creates the canonical initial session as immutable JSON state', async () => {
    const expected = await fixture('initial.json');
    const session = createGameSession(expected.id);

    expect(session).toEqual(expected);
    expect(Object.isFrozen(session)).toBe(true);
    expect(Object.isFrozen(session.history)).toBe(true);
    expect(() => (session.history as GameSessionEvent[]).push(session.history[0])).toThrow();
  });

  it('serializes and restores without losing data or mutability boundaries', async () => {
    const expected = await fixture('crisis-prepared.json');
    const restored = deserializeGameSession(JSON.stringify(expected));

    expect(restored).toEqual(expected);
    expect(JSON.parse(serializeGameSession(restored))).toEqual(expected);
    expect(Object.isFrozen(restored.progress)).toBe(true);
  });

  for (const fixtureName of ['reference-contained.json', 'reference-overwhelmed.json'] as const) {
    it(`replays ${fixtureName} into the exact persisted snapshot`, async () => {
      const expected = await fixture(fixtureName);
      expect(replayGameSession(expected.history)).toEqual(expected);
    });

    it(`executes ${fixtureName} deterministically through commands`, async () => {
      const expected = await fixture(fixtureName);
      const first = executeHistory(expected.history);
      const second = executeHistory(expected.history);

      expect(first).toEqual(expected);
      expect(second).toEqual(first);
      expect(serializeGameSession(second)).toBe(serializeGameSession(first));
    });
  }

  it('returns new snapshots and never mutates the caller state', () => {
    const initial = createGameSession('immutable-session');
    const completed = executeGameSessionCommand(initial, {
      type: 'complete-scene',
      sceneId: 'intro-briefing-mission',
      evidenceIds: []
    });
    const advanced = executeGameSessionCommand(completed, {
      type: 'transition-scene',
      toSceneId: 'prevention-inspection-territory-fuel'
    });

    expect(initial.progress.completedSceneIds).toEqual([]);
    expect(initial.history).toHaveLength(1);
    expect(completed.progress.currentSceneId).toBe('intro-briefing-mission');
    expect(advanced.progress.currentSceneId).toBe('prevention-inspection-territory-fuel');
  });

  it('rejects invalid order, scenes, transitions and completed-session commands', async () => {
    const initial = createGameSession('invalid-commands');
    expect(() =>
      executeGameSessionCommand(initial, {
        type: 'transition-scene',
        toSceneId: 'prevention-inspection-territory-fuel'
      })
    ).toThrowError(expect.objectContaining({ code: 'invalid-command-order' }));
    expect(() =>
      executeGameSessionCommand(initial, {
        type: 'apply-decision',
        sceneId: 'crisis-decision-first-alert',
        actionId: 'not-current'
      })
    ).toThrowError(expect.objectContaining({ code: 'scene-mismatch' }));

    const completed = await fixture('completed-contained.json');
    expect(() =>
      executeGameSessionCommand(completed, {
        type: 'complete-scene',
        sceneId: 'ending-result-causal-report',
        evidenceIds: []
      })
    ).toThrowError(expect.objectContaining({ code: 'inactive-session' }));
  });

  it('rejects corrupt serialized snapshots and invalid replay histories', async () => {
    const corrupt = structuredClone(await fixture('initial.json')) as unknown as {
      schemaVersion: number;
    };
    corrupt.schemaVersion = 2;

    expect(() => deserializeGameSession(JSON.stringify(corrupt))).toThrowError(
      expect.objectContaining({ code: 'invalid-session' })
    );
    expect(() => replayGameSession([])).toThrowError(
      expect.objectContaining({ code: 'invalid-session' })
    );
  });
});
