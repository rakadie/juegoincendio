import Fastify, { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { GetActiveFiresQueryHandler } from '../../application/queries/get-active-fires-query-handler.js';
import {
  VerticalBetaApplicationError,
  VerticalBetaApplicationService
} from '../../application/vertical-beta/vertical-beta-application-service.js';
import { OFFICIAL_PLAYER_CONTENT } from '../../content/official-player-content.js';
import { InMemoryFireIncidentRepository } from '../../infrastructure/repositories/in-memory-fire-incident-repository.js';
import { renderPrototypePage } from './prototype-page.js';

export function buildApp(): FastifyInstance {
  const repository = new InMemoryFireIncidentRepository();
  const getActiveFires = new GetActiveFiresQueryHandler(repository);
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

  app.get('/health', async () => {
    return { status: 'ok' };
  });

  app.get('/fires/active', async () => {
    const data = await getActiveFires.execute();
    return { fires: data };
  });

  app.post('/api/game-sessions', async () => {
    return verticalBeta.create(randomUUID());
  });

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

  app.get('/game-content/data', async () => {
    return OFFICIAL_PLAYER_CONTENT;
  });

  app.get('/images/primer-aviso-humo.png', async (_request, reply) => {
    const image = await readFile(join(process.cwd(), 'public', 'images', 'primer-aviso-humo.png'));
    reply.type('image/png');
    return image;
  });

  app.get('/images/operational-command-hero.png', async (_request, reply) => {
    const image = await readFile(join(process.cwd(), 'public', 'images', 'operational-command-hero.png'));
    reply.type('image/png');
    return image;
  });

  app.get('/images/gameplay-wildfire-scene.png', async (_request, reply) => {
    const image = await readFile(join(process.cwd(), 'public', 'images', 'gameplay-wildfire-scene.png'));
    reply.type('image/png');
    return image;
  });

  app.get('/images/avatar-forestal-hombre.png', async (_request, reply) => {
    const image = await readFile(join(process.cwd(), 'public', 'images', 'avatar-forestal-hombre.png'));
    reply.type('image/png');
    return image;
  });

  app.get('/images/avatar-forestal-mujer.png', async (_request, reply) => {
    const image = await readFile(join(process.cwd(), 'public', 'images', 'avatar-forestal-mujer.png'));
    reply.type('image/png');
    return image;
  });

  app.get('/images/avatar-forestal-neutro.png', async (_request, reply) => {
    const image = await readFile(join(process.cwd(), 'public', 'images', 'avatar-forestal-neutro.png'));
    reply.type('image/png');
    return image;
  });

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

