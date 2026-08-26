import { describe, expect, it } from 'vitest';
import { VerticalBetaApplicationService } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { buildApp } from '../src/interfaces/http/app.js';
import { M4_PLAYER_LOOP_CLIENT } from '../src/interfaces/http/m4-player-loop-client.js';

const TERRITORY_PROGRESS = [
  { type: 'advance' as const },
  { type: 'action' as const, actionId: 'gestionar-restos-poda' },
  { type: 'action' as const, actionId: 'crear-discontinuidades-vegetales' },
  { type: 'action' as const, actionId: 'limpiar-margenes-caminos' },
  { type: 'advance' as const }
];

describe('M4.2 local session continuity', () => {
  it('replays a command journal through the application and adopts it atomically', () => {
    const service = new VerticalBetaApplicationService();
    const restored = service.restore('resume-1', TERRITORY_PROGRESS);

    expect(restored.session.id).toBe('resume-1');
    expect(restored.session.currentSceneId).toBe('prevention-inspection-housing-interface');
    expect(restored.session.decisions.map(({ actionId }) => actionId)).toEqual([
      'gestionar-restos-poda',
      'crear-discontinuidades-vegetales',
      'limpiar-margenes-caminos'
    ]);
  });

  it('does not expose a partially restored session when replay fails', async () => {
    const app = buildApp();
    const response = await app.inject({
      method: 'POST',
      url: '/api/game-sessions/atomic-failure/restore',
      payload: {
        resumeSchemaVersion: 1,
        referenceContextId: 'vb1-reference-context-v1',
        commands: [
          { type: 'advance' },
          { type: 'action', actionId: 'accion-inexistente' }
        ]
      }
    });

    expect(response.statusCode).toBe(400);
    const lookup = await app.inject({ method: 'GET', url: '/api/game-sessions/atomic-failure' });
    expect(lookup.statusCode).toBe(404);
    await app.close();
  });

  it('restores after process loss with the same session id and progress', async () => {
    const app = buildApp();
    const response = await app.inject({
      method: 'POST',
      url: '/api/game-sessions/process-restart/restore',
      payload: {
        resumeSchemaVersion: 1,
        referenceContextId: 'vb1-reference-context-v1',
        commands: TERRITORY_PROGRESS
      }
    });

    expect(response.statusCode).toBe(200);
    const payload = response.json();
    expect(payload.session.id).toBe('process-restart');
    expect(payload.session.currentSceneId).toBe('prevention-inspection-housing-interface');
    expect(payload.session.decisions).toHaveLength(3);
    await app.close();
  });

  it('rejects incompatible version, incompatible context and oversized journals', async () => {
    const app = buildApp();
    const incompatibleVersion = await app.inject({
      method: 'POST',
      url: '/api/game-sessions/incompatible-version/restore',
      payload: {
        resumeSchemaVersion: 2,
        referenceContextId: 'vb1-reference-context-v1',
        commands: []
      }
    });
    const incompatibleContext = await app.inject({
      method: 'POST',
      url: '/api/game-sessions/incompatible-context/restore',
      payload: {
        resumeSchemaVersion: 1,
        referenceContextId: 'otro-contexto',
        commands: []
      }
    });
    const oversized = await app.inject({
      method: 'POST',
      url: '/api/game-sessions/oversized/restore',
      payload: {
        resumeSchemaVersion: 1,
        referenceContextId: 'vb1-reference-context-v1',
        commands: Array.from({ length: 33 }, () => ({ type: 'advance' }))
      }
    });

    expect(incompatibleVersion.statusCode).toBe(400);
    expect(incompatibleContext.statusCode).toBe(400);
    expect(oversized.statusCode).toBe(400);
    const lookup = await app.inject({ method: 'GET', url: '/api/game-sessions/incompatible-context' });
    expect(lookup.statusCode).toBe(404);
    await app.close();
  });

  it('serves the continuity client and injects it into the player page', async () => {
    const app = buildApp();
    const page = await app.inject({ method: 'GET', url: '/' });
    const client = await app.inject({ method: 'GET', url: '/assets/m4-player-loop.js' });

    expect(page.statusCode).toBe(200);
    expect(page.body).toContain('<script src="/assets/m4-player-loop.js"></script>');
    expect(client.statusCode).toBe(200);
    expect(client.headers['content-type']).toContain('application/javascript');
    expect(client.body).toContain('Continuar partida');
    expect(client.body).toContain('vertical-beta.resume.v1');
    expect(client.body).toContain('resumeSchemaVersion');
    await app.close();
  });

  it('keeps the journal as player commands rather than a GameSession snapshot', () => {
    expect(M4_PLAYER_LOOP_CLIENT).toContain("{ type: 'advance' }");
    expect(M4_PLAYER_LOOP_CLIENT).toContain("{ type: 'action', actionId }");
    expect(M4_PLAYER_LOOP_CLIENT).toContain('commands: []');
  });
});
