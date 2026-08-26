import { describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { CANONICAL_REFERENCE_RECIPES } from '../src/application/vertical-beta/vertical-beta-reference-comparison.js';
import type { VerticalBetaResumeCommand } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { buildApp } from '../src/interfaces/http/app.js';

async function applyCommand(
  app: FastifyInstance,
  sessionId: string,
  command: VerticalBetaResumeCommand
) {
  if (command.type === 'action') {
    return app.inject({
      method: 'POST',
      url: `/api/game-sessions/${encodeURIComponent(sessionId)}/actions`,
      payload: { actionId: command.actionId }
    });
  }
  return app.inject({
    method: 'POST',
    url: `/api/game-sessions/${encodeURIComponent(sessionId)}/advance`,
    payload: {}
  });
}

async function playToResult(
  app: FastifyInstance,
  branch: 'prepared' | 'vulnerable'
) {
  const created = await app.inject({ method: 'POST', url: '/api/game-sessions' });
  expect(created.statusCode).toBe(200);
  const sessionId = created.json().session.id as string;
  const commands = CANONICAL_REFERENCE_RECIPES[branch].commands.slice(0, -1);
  let response = created;
  for (const command of commands) {
    response = await applyCommand(app, sessionId, command);
    expect(response.statusCode).toBe(200);
  }
  const payload = response.json();
  expect(payload.session).toMatchObject({
    id: sessionId,
    status: 'active',
    branch,
    currentSceneId: 'ending-result-causal-report'
  });
  expect(payload.scene.type).toBe('result');
  expect(payload.scene.relations).toHaveLength(5);
  return { sessionId, payload };
}

async function expectComparisonAndReplay(
  app: FastifyInstance,
  branch: 'prepared' | 'vulnerable'
) {
  const { sessionId, payload } = await playToResult(app, branch);
  expect(payload.scene.variant).toBe(branch === 'prepared' ? 'contained' : 'overwhelmed');

  const comparison = await app.inject({
    method: 'GET',
    url: `/api/game-sessions/${encodeURIComponent(sessionId)}/comparison`
  });
  expect(comparison.statusCode).toBe(200);
  const comparisonPayload = comparison.json();
  expect(comparisonPayload).toMatchObject({
    title: 'Tu partida y otro recorrido de referencia',
    current: { branch },
    reference: { branch: branch === 'prepared' ? 'vulnerable' : 'prepared' }
  });
  expect(comparisonPayload.current.dimensions).toHaveLength(5);
  expect(comparisonPayload.reference.dimensions).toHaveLength(5);

  const replay = await app.inject({
    method: 'POST',
    url: `/api/game-sessions/${encodeURIComponent(sessionId)}/restart`,
    payload: {}
  });
  expect(replay.statusCode).toBe(200);
  expect(replay.json().session).toMatchObject({
    id: sessionId,
    status: 'active',
    currentSceneId: 'intro-briefing-mission',
    completedSceneIds: [],
    decisions: [],
    inheritedState: null,
    branch: null,
    result: null
  });
}

describe('M4 integral player-loop acceptance', () => {
  it('serves an explicit product entry before the first session', async () => {
    const app = buildApp();
    const page = await app.inject({ method: 'GET', url: '/' });
    const context = await app.inject({ method: 'GET', url: '/api/vertical-beta/context' });

    expect(page.statusCode).toBe(200);
    expect(page.body).toContain('id="start-session-button"');
    expect(page.body).toContain('Comenzar partida');
    expect(context.statusCode).toBe(200);
    expect(context.json()).toMatchObject({
      referenceContextId: 'vb1-reference-context-v1',
      targetDurationMinutes: { min: 20, max: 25 }
    });
    await app.close();
  });

  it('completes the prepared product loop through comparison and replay', async () => {
    const app = buildApp();
    await expectComparisonAndReplay(app, 'prepared');
    await app.close();
  });

  it('completes the vulnerable product loop through comparison and replay', async () => {
    const app = buildApp();
    await expectComparisonAndReplay(app, 'vulnerable');
    await app.close();
  });

  it('restores the same progress after a simulated process restart', async () => {
    const commands = CANONICAL_REFERENCE_RECIPES.prepared.commands.slice(0, 6);
    const firstProcess = buildApp();
    const created = await firstProcess.inject({ method: 'POST', url: '/api/game-sessions' });
    const sessionId = created.json().session.id as string;
    let beforeRestart = created;
    for (const command of commands) {
      beforeRestart = await applyCommand(firstProcess, sessionId, command);
      expect(beforeRestart.statusCode).toBe(200);
    }
    const expected = beforeRestart.json().session;
    await firstProcess.close();

    const secondProcess = buildApp();
    const restored = await secondProcess.inject({
      method: 'POST',
      url: `/api/game-sessions/${encodeURIComponent(sessionId)}/restore`,
      payload: {
        resumeSchemaVersion: 1,
        referenceContextId: 'vb1-reference-context-v1',
        commands
      }
    });

    expect(restored.statusCode).toBe(200);
    expect(restored.json().session).toMatchObject({
      id: expected.id,
      currentSceneId: expected.currentSceneId,
      completedSceneIds: expected.completedSceneIds,
      decisions: expected.decisions,
      inheritedState: expected.inheritedState,
      branch: expected.branch,
      result: expected.result
    });
    await secondProcess.close();
  });
});
