import type { FastifyInstance } from 'fastify';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const IMAGE_FILES = [
  'primer-aviso-humo.png',
  'operational-command-hero.png',
  'gameplay-wildfire-scene.png',
  'avatar-forestal-hombre.png',
  'avatar-forestal-mujer.png',
  'avatar-forestal-neutro.png'
] as const;

export function registerImageRoutes(app: FastifyInstance): void {
  for (const fileName of IMAGE_FILES) {
    app.get(`/images/${fileName}`, async (_request, reply) => {
      const image = await readFile(join(process.cwd(), 'public', 'images', fileName));
      reply.type('image/png');
      return image;
    });
  }
}
