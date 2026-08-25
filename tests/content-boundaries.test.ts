import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { FastifyInstance } from 'fastify';
import { afterEach, describe, expect, it } from 'vitest';
import { HISTORICAL_ARCHIVE } from '../src/content/archive/index.js';
import { EDITORIAL_CONTENT } from '../src/content/editorial-content.js';
import { CANDIDATE_LIBRARY } from '../src/content/library/index.js';
import { VERTICAL_BETA_PLAYER_CONTENT } from '../src/content/vertical-beta-player-content.js';
import { buildApp } from '../src/interfaces/http/app.js';
import { buildEditorialApp } from '../src/interfaces/http/editorial-app.js';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const openApps: FastifyInstance[] = [];

const OFFICIAL_SCENARIO_IDS = [
  's-011-corte-carretera-acceso',
  's-025-cortafuego-emergencia',
  's-026-defensa-operativa-nucleo-viviendas',
  's-027-fuego-en-barranco',
  's-030-fuego-de-copas'
];

const FORBIDDEN_RUNTIME_TERMS = [
  'p-003-comunidad-preparada',
  'invierno_',
  'verano_',
  'resultado-beta',
  'ruta-comunicacion'
];

afterEach(async () => {
  await Promise.all(openApps.splice(0).map((app) => app.close()));
});

async function source(path: string): Promise<string> {
  return readFile(`${ROOT}${path}`, 'utf8');
}

describe('content boundaries', () => {
  it('keeps the player payload limited to the official vertical', () => {
    expect(VERTICAL_BETA_PLAYER_CONTENT.scenarios.map(({ id }) => id)).toEqual(
      OFFICIAL_SCENARIO_IDS
    );
    expect(VERTICAL_BETA_PLAYER_CONTENT.scenarios).toHaveLength(5);
    expect(VERTICAL_BETA_PLAYER_CONTENT.inspections.map(({ id }) => id)).toEqual([
      'prevention-inspection-territory-fuel',
      'prevention-inspection-housing-interface'
    ]);
    expect(VERTICAL_BETA_PLAYER_CONTENT.inspections).toHaveLength(2);
    expect(VERTICAL_BETA_PLAYER_CONTENT.operationalScenes).toHaveLength(5);
    expect(VERTICAL_BETA_PLAYER_CONTENT.catalog.scenes).toHaveLength(12);

    const serialized = JSON.stringify(VERTICAL_BETA_PLAYER_CONTENT);
    FORBIDDEN_RUNTIME_TERMS.forEach((term) => expect(serialized).not.toContain(term));
  });

  it('preserves candidate and historical content outside the player payload', () => {
    expect(EDITORIAL_CONTENT.scenarios).toHaveLength(51);
    expect(EDITORIAL_CONTENT.inspections).toHaveLength(3);
    expect(CANDIDATE_LIBRARY.scenarios).toHaveLength(36);
    expect(CANDIDATE_LIBRARY.inspections.map(({ id }) => id)).toEqual([
      'p-003-comunidad-preparada'
    ]);
    expect(HISTORICAL_ARCHIVE.scenarios).toHaveLength(10);
    expect(HISTORICAL_ARCHIVE.inspections.map(({ id }) => id)).toEqual([
      'p-001-viviendas-interfaz',
      'p-002-fincas-vegetacion-combustible'
    ]);
    expect(HISTORICAL_ARCHIVE.campaignNodes.prevention).toHaveLength(3);
    expect(HISTORICAL_ARCHIVE.campaignNodes.crisis).toHaveLength(3);
  });

  it('serves official and editorial contracts from different applications', async () => {
    const player = buildApp();
    const editorial = buildEditorialApp();
    openApps.push(player, editorial);

    const officialResponse = await player.inject({
      method: 'GET',
      url: '/api/vertical-beta/content'
    });
    expect(officialResponse.statusCode).toBe(200);
    const officialPayload = officialResponse.json();
    expect(officialPayload.scenarios).toHaveLength(5);
    expect(officialPayload.inspections).toHaveLength(2);
    FORBIDDEN_RUNTIME_TERMS.forEach((term) =>
      expect(officialResponse.body).not.toContain(term)
    );

    expect((await player.inject({ method: 'GET', url: '/game-content/data' })).statusCode).toBe(404);
    expect((await player.inject({ method: 'GET', url: '/fires/active' })).statusCode).toBe(404);

    const editorialResponse = await editorial.inject({
      method: 'GET',
      url: '/game-content/data'
    });
    expect(editorialResponse.statusCode).toBe(200);
    const editorialPayload = editorialResponse.json();
    expect(editorialPayload.scenarios).toHaveLength(51);
    expect(editorialPayload.library.scenarios).toHaveLength(36);
    expect(editorialPayload.archive.scenarios).toHaveLength(10);
    expect(editorialResponse.body).toContain('p-003-comunidad-preparada');

    expect((await editorial.inject({ method: 'POST', url: '/api/game-sessions' })).statusCode).toBe(404);
  });

  it('prevents the player entrypoint from importing editorial or archived modules', async () => {
    const [server, app, playerContent, inspections, scenarioSources, prototype] =
      await Promise.all([
        source('src/interfaces/http/server.ts'),
        source('src/interfaces/http/app.ts'),
        source('src/content/vertical-beta-player-content.ts'),
        source('src/content/official-prevention-inspections.ts'),
        source('src/content/official-scenario-sources.ts'),
        source('src/interfaces/http/prototype-page.ts')
      ]);

    expect(server).toContain("from './app.js'");
    expect(server).not.toContain('editorial');

    const playerGraph = [app, playerContent, inspections, scenarioSources, prototype].join('\n');
    [
      'editorial-content',
      'scenarios/index',
      "from './prevention-inspections",
      "from '../prevention-inspections",
      "from './campaign",
      '/library/',
      '/archive/',
      'WINTER_CAMPAIGN_NODES',
      'SUMMER_CAMPAIGN_NODES',
      ...FORBIDDEN_RUNTIME_TERMS
    ].forEach((term) => expect(playerGraph).not.toContain(term));
  });
});
