import { describe, expect, it } from 'vitest';
import { VERTICAL_BETA_CATALOG } from '../src/content/vertical-beta-flow.js';
import type {
  CanonicalSceneId,
  GameSceneCatalog,
  ResultVariant
} from '../src/domain/types/game-scene.js';
import {
  validateGameSceneCatalog,
  type GameSceneCatalogErrorCode
} from '../src/domain/validation/game-scene-catalog-validator.js';

type DeepMutable<T> = T extends readonly (infer U)[]
  ? DeepMutable<U>[]
  : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T;

function cloneCatalog(): DeepMutable<GameSceneCatalog> {
  return structuredClone(VERTICAL_BETA_CATALOG) as unknown as DeepMutable<GameSceneCatalog>;
}

function errorCodes(value: unknown): GameSceneCatalogErrorCode[] {
  const result = validateGameSceneCatalog(value);
  return result.valid ? [] : result.errors.map((error) => error.code);
}

describe('validateGameSceneCatalog', () => {
  it('accepts the canonical production catalog', () => {
    expect(validateGameSceneCatalog(VERTICAL_BETA_CATALOG)).toEqual({ valid: true, errors: [] });
  });

  it('rejects duplicate or missing canonical scene IDs', () => {
    const catalog = cloneCatalog();
    catalog.scenes[1].id = catalog.scenes[0].id;

    expect(errorCodes(catalog)).toEqual(
      expect.arrayContaining(['duplicate-scene-id', 'missing-scene-id'])
    );
  });

  it('rejects transitions to scenes that do not exist', () => {
    const catalog = cloneCatalog();
    catalog.scenes[0].transitions[0].target = 'missing-scene' as CanonicalSceneId;

    expect(errorCodes(catalog)).toContain('missing-transition-target');
  });

  it('rejects orphan nodes and dead routes', () => {
    const catalog = cloneCatalog();
    catalog.scenes[0].transitions[0].target = 'ending-result-causal-report';

    expect(errorCodes(catalog)).toEqual(expect.arrayContaining(['orphan-scene', 'dead-route']));
  });

  it('rejects cycles in either branch', () => {
    const catalog = cloneCatalog();
    const housingDefense = catalog.scenes.find(
      (scene) => scene.id === 'crisis-decision-housing-defense'
    );
    if (housingDefense === undefined) throw new Error('Housing defense scene is required.');
    housingDefense.transitions[0].target = 'crisis-decision-ravine-fire';

    expect(errorCodes(catalog)).toEqual(
      expect.arrayContaining(['cycle-detected', 'invalid-branch-path'])
    );
  });

  it('rejects library, archive and retired content references', () => {
    const catalog = cloneCatalog();
    catalog.scenes[0].contentRef = 'archive:resultado-beta';

    expect(errorCodes(catalog)).toContain('excluded-content-reference');
  });

  it('rejects result nodes without the two approved variants', () => {
    const catalog = cloneCatalog();
    const result = catalog.scenes.find((scene) => scene.id === 'ending-result-causal-report');
    if (result === undefined || result.type !== 'result') throw new Error('Result scene is required.');
    result.resultVariants = ['contained'] as ResultVariant[];

    expect(errorCodes(catalog)).toContain('invalid-result-variants');
  });

  it('rejects editorial fields copied into the declarative graph', () => {
    const catalog = cloneCatalog();
    const firstScene = catalog.scenes[0] as unknown as Record<string, unknown>;
    firstScene.title = 'Texto editorial que debe resolverse fuera del grafo';

    expect(errorCodes(catalog)).toContain('unexpected-scene-key');
  });

  it('rejects a canonical ID assigned to the wrong node type', () => {
    const catalog = cloneCatalog();
    catalog.scenes[0].type = 'decision';

    expect(errorCodes(catalog)).toContain('scene-type-mismatch');
  });
});
