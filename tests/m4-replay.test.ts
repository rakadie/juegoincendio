import { describe, expect, it } from 'vitest';
import { VerticalBetaApplicationService } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { CANONICAL_REFERENCE_RECIPES } from '../src/application/vertical-beta/vertical-beta-reference-comparison.js';
import { buildApp } from '../src/interfaces/http/app.js';
import { M4_PLAYER_LOOP_CLIENT } from '../src/interfaces/http/m4-player-loop-client.js';

function expectCleanRestart(branch: 'prepared' | 'vulnerable') {
  const service = new VerticalBetaApplicationService();
  const id = `replay-${branch}`;
  const completed = service.restore(id, CANONICAL_REFERENCE_RECIPES[branch].commands);
  expect(completed.session.status).toBe('completed');

  const restarted = service.restart(id);
  expect(restarted.session).toMatchObject({
    id,
    status: 'active',
    currentSceneId: 'intro-briefing-mission',
    completedSceneIds: [],
    decisions: [],
    inheritedState: null,
    branch: null,
    result: null
  });
  expect(restarted.session.history).toEqual([
    {
      sequence: 1,
      type: 'session-created',
      sessionId: id,
      schemaVersion: 1,
      initialSceneId: 'intro-briefing-mission'
    }
  ]);
}

describe('M4.5 intentional replay', () => {
  it('starts a clean new cycle after a prepared result', () => {
    expectCleanRestart('prepared');
  });

  it('starts a clean new cycle after a vulnerable result', () => {
    expectCleanRestart('vulnerable');
  });

  it('keeps the same technical session id through the HTTP restart contract', async () => {
    const app = buildApp();
    const created = await app.inject({ method: 'POST', url: '/api/game-sessions' });
    const id = created.json().session.id as string;
    const restarted = await app.inject({
      method: 'POST',
      url: `/api/game-sessions/${encodeURIComponent(id)}/restart`,
      payload: {}
    });

    expect(restarted.statusCode).toBe(200);
    expect(restarted.json().session).toMatchObject({
      id,
      status: 'active',
      currentSceneId: 'intro-briefing-mission',
      decisions: [],
      inheritedState: null,
      branch: null,
      result: null
    });
    await app.close();
  });

  it('presents replay as an intentional learning action from result and comparison', () => {
    expect(M4_PLAYER_LOOP_CLIENT).toContain('Jugar otra partida');
    expect(M4_PLAYER_LOOP_CLIENT).toContain(
      'Prueba una preparación diferente y observa qué cambia durante la emergencia.'
    );
    expect(M4_PLAYER_LOOP_CLIENT).toContain("makeReplayButton('replay-button')");
    expect(M4_PLAYER_LOOP_CLIENT).toContain("makeReplayButton('comparison-replay-button')");
  });

  it('creates a fresh continuity envelope after a successful restart response', () => {
    expect(M4_PLAYER_LOOP_CLIENT).toContain('function writeFreshSessionEnvelope(session, contextId)');
    expect(M4_PLAYER_LOOP_CLIENT).toContain("pathname === sessionPrefix + '/restart'");
    expect(M4_PLAYER_LOOP_CLIENT).toContain('writeFreshSessionEnvelope(session, contextId)');
    expect(M4_PLAYER_LOOP_CLIENT).toContain('commands: []');
  });
});
