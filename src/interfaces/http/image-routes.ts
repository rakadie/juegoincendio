import type { FastifyInstance } from 'fastify';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const IMAGE_FILES = [
  'primer-aviso-humo.png',
  'operational-command-hero.png',
  'gameplay-wildfire-scene.png',
  'territory-prevention-aerial-v1.jpg',
  'housing-prevention-aerial-v2.jpg',
  'crisis-ravine-aerial-v1.jpg',
  'crisis-scrub-fire-v1.png',
  'avatar-forestal-hombre.png',
  'avatar-forestal-mujer.png',
  'avatar-forestal-neutro.png'
] as const;

export function registerImageRoutes(app: FastifyInstance): void {
  for (const fileName of IMAGE_FILES) {
    app.get(`/images/${fileName}`, async (_request, reply) => {
      const image = await readFile(join(process.cwd(), 'public', 'images', fileName));
      reply.type(fileName.endsWith('.jpg') ? 'image/jpeg' : 'image/png');
      return image;
    });
  }
}
