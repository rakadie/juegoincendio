import Fastify, { FastifyInstance } from 'fastify';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { GetActiveFiresQueryHandler } from '../../application/queries/get-active-fires-query-handler.js';
import { EMERGENCY_GAME_VARIABLES } from '../../domain/entities/emergency-training-content.js';
import { CAMPAIGN_CONTENT } from '../../content/campaign.js';
import { OFFICIAL_OPERATIONAL_SCENES } from '../../content/official-operational-scenes.js';
import { NEW_GAME_SCENARIOS } from '../../content/scenarios/index.js';
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
      scenarios: NEW_GAME_SCENARIOS,
      operationalScenes: OFFICIAL_OPERATIONAL_SCENES,
      campaign: CAMPAIGN_CONTENT
    };
  });

  app.get('/game-content', async (_request, reply) => {
    reply.type('text/html; charset=utf-8');
    return renderGameContentPage();
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

