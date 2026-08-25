import Fastify, { type FastifyInstance } from 'fastify';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { EDITORIAL_LIBRARY_CONTENT } from '../../content/editorial/editorial-library-content.js';
import { renderGameContentPage } from './game-content-page.js';

function image(path: string): Promise<Buffer> {
  return readFile(join(process.cwd(), 'public', 'images', path));
}

export function buildEditorialApp(): FastifyInstance {
  const app = Fastify();

  app.get('/editorial-content/data', async () => EDITORIAL_LIBRARY_CONTENT);

  app.get('/', async (_request, reply) => {
    reply.type('text/html; charset=utf-8');
    return renderGameContentPage();
  });

  app.get('/images/operational-command-hero.png', async (_request, reply) => {
    reply.type('image/png');
    return image('operational-command-hero.png');
  });

  for (const filename of [
    'avatar-forestal-hombre.png',
    'avatar-forestal-mujer.png',
    'avatar-forestal-neutro.png'
  ]) {
    app.get(`/images/${filename}`, async (_request, reply) => {
      reply.type('image/png');
      return image(filename);
    });
  }

  return app;
}
