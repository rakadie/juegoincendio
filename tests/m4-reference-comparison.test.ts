import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  buildReferenceComparison,
  CANONICAL_REFERENCE_RECIPES,
  runCanonicalReference
} from '../src/application/vertical-beta/vertical-beta-reference-comparison.js';
import { buildApp } from '../src/interfaces/http/app.js';
import { M4_PLAYER_LOOP_CLIENT } from '../src/interfaces/http/m4-player-loop-client.js';

const FIXTURE_DIRECTORY = fileURLToPath(new URL('./fixtures/game-session/', import.meta.url));

async function loadFixture(name: string): Promise<Record<string, any>> {
  return JSON.parse(await readFile(`${FIXTURE_DIRECTORY}${name}`, 'utf8')) as Record<string, any>;
}

function comparableSession(view: ReturnType<typeof runCanonicalReference>) {
  return {
    status: view.session.status,
    progress: {
      currentSceneId: view.session.currentSceneId,
      completedSceneIds: view.session.completedSceneIds
    },
    decisions: view.session.decisions,
    inheritedState: view.session.inheritedState,
    crisisBranch: view.session.branch,
    result: view.session.result,
    history: view.session.history
  };
}

describe('M4.4 canonical reference comparison', () => {
  it('keeps the runtime recipes aligned with both M2 reference fixtures', async () => {
    const prepared = runCanonicalReference('prepared');
    const vulnerable = runCanonicalReference('vulnerable');
    const preparedFixture = await loadFixture('reference-contained.json');
    const vulnerableFixture = await loadFixture('reference-overwhelmed.json');

    expect(comparableSession(prepared)).toEqual({
      status: preparedFixture.status,
      progress: preparedFixture.progress,
      decisions: preparedFixture.decisions,
      inheritedState: preparedFixture.inheritedState,
      crisisBranch: preparedFixture.crisisBranch,
      result: preparedFixture.result,
      history: preparedFixture.history
    });
    expect(comparableSession(vulnerable)).toEqual({
      status: vulnerableFixture.status,
      progress: vulnerableFixture.progress,
      decisions: vulnerableFixture.decisions,
      inheritedState: vulnerableFixture.inheritedState,
      crisisBranch: vulnerableFixture.crisisBranch,
      result: vulnerableFixture.result,
      history: vulnerableFixture.history
    });
  });

  it('selects the opposite canonical route in both directions', () => {
    const fromPrepared = buildReferenceComparison(runCanonicalReference('prepared'));
    const fromVulnerable = buildReferenceComparison(runCanonicalReference('vulnerable'));

    expect(fromPrepared.current.branch).toBe('prepared');
    expect(fromPrepared.reference.branch).toBe('vulnerable');
    expect(fromVulnerable.current.branch).toBe('vulnerable');
    expect(fromVulnerable.reference.branch).toBe('prepared');
  });

  it('compares five canonical dimensions and three decisive manifestations per side', () => {
    const comparison = buildReferenceComparison(runCanonicalReference('prepared'));

    expect(comparison.title).toBe('Tu partida y otro recorrido de referencia');
    expect(comparison.explanation).toBe(
      'Compara tu recorrido con una referencia canónica del mismo modelo para observar cómo cambian las condiciones y la respuesta.'
    );
    expect(comparison.current.dimensions.map(({ id }) => id)).toEqual([
      'fuelLoad',
      'fuelContinuity',
      'operationalAccess',
      'defensibility',
      'attackOpportunity'
    ]);
    expect(comparison.reference.dimensions.map(({ id }) => id)).toEqual(
      comparison.current.dimensions.map(({ id }) => id)
    );
    expect(comparison.current.manifestations).toHaveLength(3);
    expect(comparison.reference.manifestations).toHaveLength(3);
  });

  it('runs the reference in isolation from the current session', () => {
    const current = runCanonicalReference('prepared');
    const before = JSON.stringify(current.session);

    buildReferenceComparison(current);

    expect(JSON.stringify(current.session)).toBe(before);
  });

  it('exposes comparison only from a result session', async () => {
    const app = buildApp();
    const created = await app.inject({ method: 'POST', url: '/api/game-sessions' });
    const sessionId = created.json().session.id as string;
    const response = await app.inject({
      method: 'GET',
      url: `/api/game-sessions/${encodeURIComponent(sessionId)}/comparison`
    });

    expect(response.statusCode).toBe(400);
    await app.close();
  });

  it('defines the player-facing comparison action and two explicit sides', () => {
    expect(M4_PLAYER_LOOP_CLIENT).toContain('Comparar con otro recorrido');
    expect(M4_PLAYER_LOOP_CLIENT).toContain("renderComparisonSide('Tu partida'");
    expect(M4_PLAYER_LOOP_CLIENT).toContain("renderComparisonSide('Otro recorrido de referencia'");
  });

  it('keeps both recipes versioned and branch-specific', () => {
    expect(CANONICAL_REFERENCE_RECIPES.prepared).toMatchObject({ schemaVersion: 1, branch: 'prepared' });
    expect(CANONICAL_REFERENCE_RECIPES.vulnerable).toMatchObject({ schemaVersion: 1, branch: 'vulnerable' });
  });
});
