import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { validateGameSessionContract } from './support/game-session-contract.js';

const FIXTURE_DIRECTORY = fileURLToPath(new URL('./fixtures/game-session/', import.meta.url));

type MutableJson = Record<string, any>;

async function loadInitialSession(): Promise<MutableJson> {
  const text = await readFile(`${FIXTURE_DIRECTORY}initial.json`, 'utf8');
  return JSON.parse(text) as MutableJson;
}

describe('canonical graph transitions', () => {
  it('rejects a transition between canonical scenes when it is not a graph edge', async () => {
    const session = await loadInitialSession();
    session.progress.currentSceneId = 'ending-result-causal-report';
    session.progress.completedSceneIds = ['intro-briefing-mission'];
    session.history.push(
      {
        sequence: 2,
        type: 'scene-completed',
        sceneId: 'intro-briefing-mission',
        evidenceIds: []
      },
      {
        sequence: 3,
        type: 'scene-transitioned',
        fromSceneId: 'intro-briefing-mission',
        toSceneId: 'ending-result-causal-report'
      }
    );

    const result = validateGameSessionContract(session);

    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        code: 'corrupt-session-history',
        path: '$.history[2]'
      })
    );
  });
});
