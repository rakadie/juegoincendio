import Fastify, { FastifyInstance } from 'fastify';
import { GetActiveFiresQueryHandler } from '../../application/queries/get-active-fires-query-handler.js';
import { InMemoryFireIncidentRepository } from '../../infrastructure/repositories/in-memory-fire-incident-repository.js';

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

  return app;
}

