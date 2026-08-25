import Fastify, { FastifyInstance } from 'fastify';
import { GetActiveFiresQueryHandler } from '../../application/queries/get-active-fires-query-handler.js';
import { EDITORIAL_CONTENT } from '../../content/editorial-content.js';
import { InMemoryFireIncidentRepository } from '../../infrastructure/repositories/in-memory-fire-incident-repository.js';
import { renderGameContentPage } from './game-content-page.js';
import { registerImageRoutes } from './image-routes.js';

/**
 * Separate tool entrypoint. It can inspect candidate and historical content,
 * but it does not expose the player session API or participate in the MVP.
 */
export function buildEditorialApp(): FastifyInstance {
  const repository = new InMemoryFireIncidentRepository();
  const getActiveFires = new GetActiveFiresQueryHandler(repository);
  const app = Fastify();

  app.get('/health', async () => ({ status: 'ok', service: 'editorial-content' }));

  app.get('/fires/active', async () => ({ fires: await getActiveFires.execute() }));

  app.get('/game-content/data', async () => EDITORIAL_CONTENT);

  app.get('/game-content', async (_request, reply) => {
    reply.type('text/html; charset=utf-8');
    return renderGameContentPage();
  });

  registerImageRoutes(app);

  return app;
}
