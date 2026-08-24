import { describe, expect, it } from 'vitest';
import {
  VERTICAL_BETA_CATALOG,
  VERTICAL_BETA_ENTRY_ID,
  VERTICAL_BETA_FLOW,
  VERTICAL_BETA_TERMINAL_ID
} from '../src/content/vertical-beta-catalog.js';
import {
  GAME_SCENE_TYPES,
  type GameScene,
  type GameSceneCatalog
} from '../src/domain/types/game-scene.js';
import {
  validateGameSceneCatalog,
  type GameSceneCatalogErrorCode
} from '../src/domain/validation/game-scene-catalog-validator.js';

interface MutableTransition {
  predicate: string;
  target: string;
}

interface MutableScene {
  id: string;
  type: string;
  contentRef: string;
  transitions: MutableTransition[];
  resultVariants?: string[];
}

interface MutableCatalog {
  scenes: MutableScene[];
  content: Array<{ ref: string; scope: string }>;
}

function changedCatalog(change: (catalog: MutableCatalog) => void): GameSceneCatalog {
  const catalog = structuredClone(VERTICAL_BETA_CATALOG) as unknown as MutableCatalog;
  change(catalog);
  return catalog as unknown as GameSceneCatalog;
}

function errorCodes(catalog: GameSceneCatalog): GameSceneCatalogErrorCode[] {
  return [...validateGameSceneCatalog(catalog).errors].map((error) => error.code);
}

function sceneContractKey(scene: GameScene): string {
  switch (scene.type) {
    case 'briefing':
    case 'inspection':
    case 'summary':
    case 'decision':
    case 'router':
    case 'result':
      return `${scene.type}:${scene.id}`;
  }

  const exhaustive: never = scene;
  return exhaustive;
}

describe('GameScene catalog contract', () => {
  it('accepts the exact official Vertical Beta 1 catalog', () => {
    expect(validateGameSceneCatalog(VERTICAL_BETA_CATALOG)).toEqual({
      valid: true,
      errors: []
    });
    expect(VERTICAL_BETA_FLOW).toHaveLength(12);
    expect(new Set(VERTICAL_BETA_FLOW.map((scene) => scene.type))).toEqual(
      new Set(GAME_SCENE_TYPES)
    );
    expect(VERTICAL_BETA_FLOW[0].id).toBe(VERTICAL_BETA_ENTRY_ID);
    expect(VERTICAL_BETA_FLOW.at(-1)?.id).toBe(VERTICAL_BETA_TERMINAL_ID);
    expect(VERTICAL_BETA_FLOW.map(sceneContractKey)).toHaveLength(12);
  });

  it('reports duplicate and non-canonical scene IDs', () => {
    const duplicate = changedCatalog((catalog) => {
      catalog.scenes[1].id = catalog.scenes[0].id;
    });

    expect(errorCodes(duplicate)).toEqual(
      expect.arrayContaining(['duplicate-scene-id', 'missing-canonical-scene'])
    );

    const unexpected = changedCatalog((catalog) => {
      catalog.scenes[0].id = 'library-scene';
    });
    expect(errorCodes(unexpected)).toEqual(
      expect.arrayContaining(['unexpected-scene-id', 'missing-canonical-scene'])
    );
  });

  it('reports missing targets and duplicate transitions with precise paths', () => {
    const invalid = changedCatalog((catalog) => {
      catalog.scenes[0].transitions[0].target = 'missing-scene';
      catalog.scenes[5].transitions.push({ ...catalog.scenes[5].transitions[0] });
    });
    const result = validateGameSceneCatalog(invalid);

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'missing-scene-reference',
          path: 'scenes[0].transitions[0].target'
        }),
        expect.objectContaining({
          code: 'duplicate-transition',
          path: 'scenes[5].transitions[2]'
        })
      ])
    );
  });

  it('rejects missing, duplicated, library and archive content references', () => {
    const missing = changedCatalog((catalog) => {
      catalog.content.splice(0, 1);
    });
    expect(errorCodes(missing)).toContain('missing-content-ref');

    const duplicate = changedCatalog((catalog) => {
      catalog.content.push({ ...catalog.content[0] });
    });
    expect(errorCodes(duplicate)).toContain('duplicate-content-ref');

    for (const scope of ['library', 'archive']) {
      const excluded = changedCatalog((catalog) => {
        catalog.content[0].scope = scope;
      });
      expect(errorCodes(excluded)).toContain('excluded-content-ref');
    }
  });

  it('detects orphan scenes and invalid entry sets', () => {
    const invalid = changedCatalog((catalog) => {
      catalog.scenes[1].transitions[0].target = 'transition-summary-prevention';
    });
    const codes = errorCodes(invalid);

    expect(codes).toContain('orphan-scene');
    expect(codes).toContain('invalid-entry');
  });

  it('detects cycles and catalogs without one valid terminal', () => {
    const invalid = changedCatalog((catalog) => {
      catalog.scenes.at(-1)?.transitions.push({
        predicate: 'scene-completed',
        target: 'intro-briefing-mission'
      });
    });
    const codes = errorCodes(invalid);

    expect(codes).toContain('cycle-detected');
    expect(codes).toContain('invalid-terminal');
  });

  it('detects routes that cannot reach the official terminal', () => {
    const invalid = changedCatalog((catalog) => {
      catalog.scenes[10].transitions = [];
    });
    const codes = errorCodes(invalid);

    expect(codes).toContain('dead-route');
    expect(codes).toContain('invalid-terminal');
  });

  it('validates result variants and content-reference families', () => {
    const invalid = changedCatalog((catalog) => {
      catalog.scenes.at(-1)!.resultVariants = ['contained'];
      catalog.scenes[0].contentRef = 'scenario:intro-briefing-mission';
      catalog.content[0].ref = 'scenario:intro-briefing-mission';
    });
    const codes = errorCodes(invalid);

    expect(codes).toContain('invalid-result-variants');
    expect(codes).toContain('content-type-mismatch');
  });

  it('always returns actionable error messages', () => {
    const invalid = changedCatalog((catalog) => {
      catalog.scenes[0].transitions[0].target = 'missing-scene';
    });
    const result = validateGameSceneCatalog(invalid);

    expect(result.valid).toBe(false);
    for (const error of result.errors) {
      expect(error.path.length).toBeGreaterThan(0);
      expect(error.message.length).toBeGreaterThan(20);
    }
  });
});
