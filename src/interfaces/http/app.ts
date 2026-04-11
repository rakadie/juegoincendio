import Fastify, { FastifyInstance } from 'fastify';
import { GetActiveFiresQueryHandler } from '../../application/queries/get-active-fires-query-handler.js';
import {
  EMERGENCY_GAME_VARIABLES,
  EMERGENCY_TRAINING_SCENARIOS
} from '../../domain/entities/emergency-training-content.js';
import { InMemoryFireIncidentRepository } from '../../infrastructure/repositories/in-memory-fire-incident-repository.js';
import { renderGameContentPage } from './game-content-page.js';
import { renderPrototypePage } from './prototype-page.js';

export function buildApp(): FastifyInstance {
  const repository = new InMemoryFireIncidentRepository();
  const getActiveFires = new GetActiveFiresQueryHandler(repository);

  const app = Fastify();

  app.get('/health', async () => {
    return { status: 'ok' };
  });

  app.get('/fires/active', async () => {
    const data = await getActiveFires.execute();
    return { fires: data };
  });

  app.get('/game-content/data', async () => {
    return {
      variables: EMERGENCY_GAME_VARIABLES,
      scenarios: EMERGENCY_TRAINING_SCENARIOS
    };
  });

  app.get('/game-content', async (_request, reply) => {
    reply.type('text/html; charset=utf-8');
    return renderGameContentPage();
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

