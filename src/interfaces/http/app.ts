import Fastify, { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import {
  VerticalBetaApplicationError,
  VerticalBetaApplicationService
} from '../../application/vertical-beta/vertical-beta-application-service.js';
import { VERTICAL_BETA_PLAYER_CONTENT } from '../../content/vertical-beta-player-content.js';
import { registerImageRoutes } from './image-routes.js';
import { renderPrototypePage } from './prototype-page.js';

export function buildApp(): FastifyInstance {
  const verticalBeta = new VerticalBetaApplicationService();
  const app = Fastify();

  app.setErrorHandler((error, _request, reply) => {
    const isKnownDomainError = error instanceof Error && 'code' in error;
    const statusCode =
      error instanceof VerticalBetaApplicationError && error.code === 'session-not-found'
        ? 404
        : isKnownDomainError
          ? 400
          : 500;
    reply.status(statusCode).send({
      code: isKnownDomainError ? error.code : 'request-failed',
      message: error instanceof Error ? error.message : 'The request could not be completed.'
    });
  });

  app.get('/health', async () => ({ status: 'ok' }));

  app.get('/api/vertical-beta/content', async () => VERTICAL_BETA_PLAYER_CONTENT);

  app.post('/api/game-sessions', async () => verticalBeta.create(randomUUID()));

  app.get<{ Params: { sessionId: string } }>(
    '/api/game-sessions/:sessionId',
    async (request) => verticalBeta.view(request.params.sessionId)
  );

  app.post<{ Params: { sessionId: string } }>(
    '/api/game-sessions/:sessionId/restart',
    async (request) => verticalBeta.restart(request.params.sessionId)
  );

  app.post<{ Params: { sessionId: string }; Body: { actionId?: string } }>(
    '/api/game-sessions/:sessionId/actions',
    async (request) => {
      if (typeof request.body?.actionId !== 'string' || request.body.actionId.trim() === '') {
        throw new VerticalBetaApplicationError(
          'unsupported-command',
          'A non-empty actionId is required.'
        );
      }
      return verticalBeta.applyAction(request.params.sessionId, request.body.actionId);
    }
  );

  app.post<{ Params: { sessionId: string } }>(
    '/api/game-sessions/:sessionId/advance',
    async (request) => verticalBeta.advance(request.params.sessionId)
  );

  registerImageRoutes(app);

  app.get('/', async (_request, reply) => {
    reply.type('text/html; charset=utf-8');
    return renderPrototypePage();
  });

  app.get('/prototype', async (_request, reply) => {
    reply.type('text/html; charset=utf-8');
    return renderPrototypePage();
  });

  return app;
}
