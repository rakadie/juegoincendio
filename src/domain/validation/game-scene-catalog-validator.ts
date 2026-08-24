import {
  CANONICAL_SCENE_IDS,
  GAME_SCENE_TYPES,
  RESULT_VARIANTS,
  type CanonicalSceneId,
  type GameScene,
  type GameSceneCatalog
} from '../types/game-scene.js';

export type GameSceneCatalogErrorCode =
  | 'duplicate-scene-id'
  | 'missing-canonical-scene'
  | 'unexpected-scene-id'
  | 'missing-scene-type'
  | 'duplicate-content-ref'
  | 'missing-content-ref'
  | 'excluded-content-ref'
  | 'content-type-mismatch'
  | 'missing-scene-reference'
  | 'duplicate-transition'
  | 'invalid-entry'
  | 'invalid-terminal'
  | 'invalid-result-variants'
  | 'orphan-scene'
  | 'cycle-detected'
  | 'dead-route';

export interface GameSceneCatalogError {
  readonly code: GameSceneCatalogErrorCode;
  readonly path: string;
  readonly message: string;
}

export type GameSceneCatalogValidationResult =
  | { readonly valid: true; readonly errors: readonly [] }
  | { readonly valid: false; readonly errors: readonly GameSceneCatalogError[] };

const ENTRY_ID: CanonicalSceneId = 'intro-briefing-mission';
const TERMINAL_ID: CanonicalSceneId = 'ending-result-causal-report';
const CANONICAL_ID_SET = new Set<string>(CANONICAL_SCENE_IDS);

function addError(
  errors: GameSceneCatalogError[],
  code: GameSceneCatalogErrorCode,
  path: string,
  message: string
): void {
  errors.push({ code, path, message });
}

function contentPrefix(scene: GameScene): string {
  return scene.type === 'decision' ? 'scenario:' : `${scene.type}:`;
}

function reachableFrom(
  start: string,
  adjacency: ReadonlyMap<string, readonly string[]>
): Set<string> {
  const visited = new Set<string>();
  const pending = [start];

  while (pending.length > 0) {
    const current = pending.pop();
    if (current === undefined || visited.has(current)) continue;
    visited.add(current);
    for (const next of adjacency.get(current) ?? []) pending.push(next);
  }

  return visited;
}

function findCycle(
  sceneIds: readonly string[],
  adjacency: ReadonlyMap<string, readonly string[]>
): string | undefined {
  const active = new Set<string>();
  const finished = new Set<string>();

  const visit = (id: string): string | undefined => {
    if (active.has(id)) return id;
    if (finished.has(id)) return undefined;

    active.add(id);
    for (const target of adjacency.get(id) ?? []) {
      const cycleAt = visit(target);
      if (cycleAt !== undefined) return cycleAt;
    }
    active.delete(id);
    finished.add(id);
    return undefined;
  };

  for (const id of sceneIds) {
    const cycleAt = visit(id);
    if (cycleAt !== undefined) return cycleAt;
  }
  return undefined;
}

export function validateGameSceneCatalog(
  catalog: GameSceneCatalog
): GameSceneCatalogValidationResult {
  const errors: GameSceneCatalogError[] = [];
  const sceneIndexes = new Map<string, number[]>();
  const contentIndexes = new Map<string, number[]>();

  catalog.scenes.forEach((scene, index) => {
    const indexes = sceneIndexes.get(scene.id) ?? [];
    indexes.push(index);
    sceneIndexes.set(scene.id, indexes);
  });

  for (const [id, indexes] of sceneIndexes) {
    if (indexes.length > 1) {
      addError(
        errors,
        'duplicate-scene-id',
        `scenes[${indexes[1]}].id`,
        `Scene ID "${id}" is duplicated at indexes ${indexes.join(', ')}.`
      );
    }
  }

  catalog.content.forEach((content, index) => {
    const indexes = contentIndexes.get(content.ref) ?? [];
    indexes.push(index);
    contentIndexes.set(content.ref, indexes);
  });

  for (const [ref, indexes] of contentIndexes) {
    if (indexes.length > 1) {
      addError(
        errors,
        'duplicate-content-ref',
        `content[${indexes[1]}].ref`,
        `Content reference "${ref}" is duplicated at indexes ${indexes.join(', ')}.`
      );
    }
  }

  for (const expectedId of CANONICAL_SCENE_IDS) {
    if (!sceneIndexes.has(expectedId)) {
      addError(
        errors,
        'missing-canonical-scene',
        'scenes',
        `Canonical scene "${expectedId}" is missing from the official catalog.`
      );
    }
  }

  catalog.scenes.forEach((scene, index) => {
    if (!CANONICAL_ID_SET.has(scene.id)) {
      addError(
        errors,
        'unexpected-scene-id',
        `scenes[${index}].id`,
        `Scene "${scene.id}" is not one of the 12 canonical IDs.`
      );
    }
  });

  for (const type of GAME_SCENE_TYPES) {
    if (!catalog.scenes.some((scene) => scene.type === type)) {
      addError(
        errors,
        'missing-scene-type',
        'scenes',
        `The discriminated union member "${type}" is not represented in the catalog.`
      );
    }
  }

  const contentByRef = new Map(catalog.content.map((content) => [content.ref, content]));

  catalog.scenes.forEach((scene, index) => {
    const content = contentByRef.get(scene.contentRef);
    if (content === undefined) {
      addError(
        errors,
        'missing-content-ref',
        `scenes[${index}].contentRef`,
        `Scene "${scene.id}" references missing content "${scene.contentRef}".`
      );
    } else if (content.scope !== 'official') {
      addError(
        errors,
        'excluded-content-ref',
        `scenes[${index}].contentRef`,
        `Scene "${scene.id}" references ${content.scope} content "${scene.contentRef}".`
      );
    }

    const expectedPrefix = contentPrefix(scene);
    if (!scene.contentRef.startsWith(expectedPrefix)) {
      addError(
        errors,
        'content-type-mismatch',
        `scenes[${index}].contentRef`,
        `Scene type "${scene.type}" requires a "${expectedPrefix}" content reference.`
      );
    }

    if (scene.type === 'result') {
      if (
        scene.resultVariants.length !== RESULT_VARIANTS.length ||
        !RESULT_VARIANTS.every((variant) => scene.resultVariants.includes(variant))
      ) {
        addError(
          errors,
          'invalid-result-variants',
          `scenes[${index}].resultVariants`,
          'The result scene must expose exactly the contained and overwhelmed variants.'
        );
      }
    }
  });

  const knownIds = new Set(sceneIndexes.keys());
  const adjacency = new Map<string, string[]>();
  const reverseAdjacency = new Map<string, string[]>();
  const indegree = new Map<string, number>();
  for (const id of knownIds) {
    adjacency.set(id, []);
    reverseAdjacency.set(id, []);
    indegree.set(id, 0);
  }

  catalog.scenes.forEach((scene, sceneIndex) => {
    const transitionKeys = new Set<string>();
    scene.transitions.forEach((transition, transitionIndex) => {
      const transitionKey = `${transition.predicate}->${transition.target}`;
      if (transitionKeys.has(transitionKey)) {
        addError(
          errors,
          'duplicate-transition',
          `scenes[${sceneIndex}].transitions[${transitionIndex}]`,
          `Scene "${scene.id}" repeats transition "${transitionKey}".`
        );
      }
      transitionKeys.add(transitionKey);

      if (!knownIds.has(transition.target)) {
        addError(
          errors,
          'missing-scene-reference',
          `scenes[${sceneIndex}].transitions[${transitionIndex}].target`,
          `Scene "${scene.id}" references missing target "${transition.target}".`
        );
        return;
      }

      adjacency.get(scene.id)?.push(transition.target);
      reverseAdjacency.get(transition.target)?.push(scene.id);
      indegree.set(transition.target, (indegree.get(transition.target) ?? 0) + 1);
    });
  });

  const entries = [...knownIds].filter((id) => (indegree.get(id) ?? 0) === 0);
  if (entries.length !== 1 || entries[0] !== ENTRY_ID) {
    addError(
      errors,
      'invalid-entry',
      'scenes',
      `Expected the only entry to be "${ENTRY_ID}"; found ${entries.length === 0 ? 'none' : entries.join(', ')}.`
    );
  }

  const terminals = catalog.scenes.filter((scene) => scene.transitions.length === 0);
  if (
    terminals.length !== 1 ||
    terminals[0]?.id !== TERMINAL_ID ||
    terminals[0]?.type !== 'result'
  ) {
    addError(
      errors,
      'invalid-terminal',
      'scenes',
      `Expected the only terminal to be result scene "${TERMINAL_ID}"; found ${
        terminals.length === 0 ? 'none' : terminals.map((scene) => scene.id).join(', ')
      }.`
    );
  }

  if (knownIds.has(ENTRY_ID)) {
    const reachable = reachableFrom(ENTRY_ID, adjacency);
    for (const id of knownIds) {
      if (!reachable.has(id)) {
        addError(
          errors,
          'orphan-scene',
          `scenes[${sceneIndexes.get(id)?.[0] ?? 0}].id`,
          `Scene "${id}" is not reachable from "${ENTRY_ID}".`
        );
      }
    }
  }

  const cycleAt = findCycle([...knownIds], adjacency);
  if (cycleAt !== undefined) {
    addError(
      errors,
      'cycle-detected',
      `scenes[${sceneIndexes.get(cycleAt)?.[0] ?? 0}].transitions`,
      `The official flow contains a cycle involving "${cycleAt}".`
    );
  }

  if (knownIds.has(TERMINAL_ID)) {
    const canReachTerminal = reachableFrom(TERMINAL_ID, reverseAdjacency);
    for (const id of knownIds) {
      if (!canReachTerminal.has(id)) {
        addError(
          errors,
          'dead-route',
          `scenes[${sceneIndexes.get(id)?.[0] ?? 0}].id`,
          `Scene "${id}" cannot reach terminal "${TERMINAL_ID}".`
        );
      }
    }
  }

  return errors.length === 0 ? { valid: true, errors: [] } : { valid: false, errors };
}
