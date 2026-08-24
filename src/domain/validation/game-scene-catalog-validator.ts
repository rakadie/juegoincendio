import {
  CANONICAL_SCENE_IDS,
  CANONICAL_SCENE_TYPE_BY_ID,
  CRISIS_BRANCHES,
  GAME_SCENE_TYPES,
  RESULT_VARIANTS,
  type CanonicalSceneId,
  type CrisisBranch,
  type GameSceneTransitionPredicate
} from '../types/game-scene.js';

export const GAME_SCENE_CATALOG_ERROR_CODES = [
  'invalid-catalog',
  'unexpected-catalog-key',
  'invalid-entry',
  'invalid-terminal',
  'invalid-scene',
  'unexpected-scene-key',
  'duplicate-scene-id',
  'missing-scene-id',
  'invalid-scene-id',
  'invalid-scene-type',
  'scene-type-mismatch',
  'invalid-content-reference',
  'duplicate-content-reference',
  'excluded-content-reference',
  'invalid-transition',
  'duplicate-transition',
  'missing-transition-target',
  'invalid-result-variants',
  'invalid-edge-count',
  'orphan-scene',
  'dead-route',
  'cycle-detected',
  'invalid-branch-path'
] as const;

export type GameSceneCatalogErrorCode = (typeof GAME_SCENE_CATALOG_ERROR_CODES)[number];

export interface GameSceneCatalogValidationError {
  readonly code: GameSceneCatalogErrorCode;
  readonly path: string;
  readonly message: string;
}

export type GameSceneCatalogValidationResult =
  | { readonly valid: true; readonly errors: readonly [] }
  | { readonly valid: false; readonly errors: readonly GameSceneCatalogValidationError[] };

type JsonObject = Record<string, unknown>;

interface ParsedTransition {
  readonly predicate: string;
  readonly target: string;
  readonly path: string;
}

interface ParsedScene {
  readonly id: string;
  readonly type: string;
  readonly contentRef: string;
  readonly transitions: readonly ParsedTransition[];
  readonly resultVariants?: readonly unknown[];
  readonly path: string;
}

const CANONICAL_ID_SET = new Set<string>(CANONICAL_SCENE_IDS);
const SCENE_TYPE_SET = new Set<string>(GAME_SCENE_TYPES);
const PREDICATE_SET = new Set<string>([
  'scene-completed',
  'scene-completed:router-prepared',
  'scene-completed:router-vulnerable',
  'scene-completed:branch-prepared',
  'scene-completed:branch-vulnerable'
] satisfies readonly GameSceneTransitionPredicate[]);

const CATALOG_KEYS = ['entryId', 'terminalId', 'scenes'] as const;
const SCENE_KEYS = ['id', 'type', 'contentRef', 'transitions'] as const;
const RESULT_SCENE_KEYS = [...SCENE_KEYS, 'resultVariants'] as const;
const TRANSITION_KEYS = ['predicate', 'target'] as const;
const EXCLUDED_CONTENT = /(?:^|:)(?:library|archive)(?::|$)|p-003|invierno_|verano_|resultado-beta|ruta-comunicacion/i;

function isObject(value: unknown): value is JsonObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function sortedKeys(value: JsonObject): string[] {
  return Object.keys(value).sort();
}

function hasExactKeys(value: JsonObject, expected: readonly string[]): boolean {
  const actual = sortedKeys(value);
  const wanted = [...expected].sort();
  return actual.length === wanted.length && actual.every((key, index) => key === wanted[index]);
}

function pushError(
  errors: GameSceneCatalogValidationError[],
  code: GameSceneCatalogErrorCode,
  path: string,
  message: string
): void {
  errors.push({ code, path, message });
}

function parseScenes(
  value: unknown,
  errors: GameSceneCatalogValidationError[]
): ParsedScene[] {
  if (!Array.isArray(value)) {
    pushError(errors, 'invalid-catalog', '$.scenes', 'Catalog scenes must be an array.');
    return [];
  }

  const parsed: ParsedScene[] = [];

  value.forEach((sceneValue, sceneIndex) => {
    const path = `$.scenes[${sceneIndex}]`;
    if (!isObject(sceneValue)) {
      pushError(errors, 'invalid-scene', path, 'Scene must be a plain object.');
      return;
    }

    const type = typeof sceneValue.type === 'string' ? sceneValue.type : '';
    const expectedKeys = type === 'result' ? RESULT_SCENE_KEYS : SCENE_KEYS;
    if (!hasExactKeys(sceneValue, expectedKeys)) {
      pushError(
        errors,
        'unexpected-scene-key',
        path,
        `Scene must contain exactly: ${expectedKeys.join(', ')}.`
      );
    }

    const id = typeof sceneValue.id === 'string' ? sceneValue.id : '';
    const contentRef = typeof sceneValue.contentRef === 'string' ? sceneValue.contentRef : '';

    if (!id) {
      pushError(errors, 'invalid-scene-id', `${path}.id`, 'Scene ID must be a non-empty string.');
    } else if (!CANONICAL_ID_SET.has(id)) {
      pushError(errors, 'invalid-scene-id', `${path}.id`, `Scene ID is not canonical: ${id}.`);
    }

    if (!SCENE_TYPE_SET.has(type)) {
      pushError(errors, 'invalid-scene-type', `${path}.type`, `Unsupported scene type: ${type || '<empty>'}.`);
    } else if (CANONICAL_ID_SET.has(id)) {
      const expectedType = CANONICAL_SCENE_TYPE_BY_ID[id as CanonicalSceneId];
      if (type !== expectedType) {
        pushError(
          errors,
          'scene-type-mismatch',
          `${path}.type`,
          `${id} must use type ${expectedType}, received ${type}.`
        );
      }
    }

    if (!contentRef.trim()) {
      pushError(
        errors,
        'invalid-content-reference',
        `${path}.contentRef`,
        'Content reference must be a non-empty ID reference.'
      );
    } else if (EXCLUDED_CONTENT.test(contentRef)) {
      pushError(
        errors,
        'excluded-content-reference',
        `${path}.contentRef`,
        `Official catalog cannot reference library, archive or retired content: ${contentRef}.`
      );
    }

    const transitions: ParsedTransition[] = [];
    if (!Array.isArray(sceneValue.transitions)) {
      pushError(errors, 'invalid-transition', `${path}.transitions`, 'Transitions must be an array.');
    } else {
      sceneValue.transitions.forEach((transitionValue, transitionIndex) => {
        const transitionPath = `${path}.transitions[${transitionIndex}]`;
        if (!isObject(transitionValue) || !hasExactKeys(transitionValue, TRANSITION_KEYS)) {
          pushError(
            errors,
            'invalid-transition',
            transitionPath,
            'Transition must contain predicate and target only.'
          );
          return;
        }

        const predicate =
          typeof transitionValue.predicate === 'string' ? transitionValue.predicate : '';
        const target = typeof transitionValue.target === 'string' ? transitionValue.target : '';

        if (!PREDICATE_SET.has(predicate)) {
          pushError(
            errors,
            'invalid-transition',
            `${transitionPath}.predicate`,
            `Unsupported transition predicate: ${predicate || '<empty>'}.`
          );
        }
        if (!target) {
          pushError(
            errors,
            'invalid-transition',
            `${transitionPath}.target`,
            'Transition target must be a non-empty scene ID.'
          );
        }

        transitions.push({ predicate, target, path: transitionPath });
      });
    }

    const resultVariants = Array.isArray(sceneValue.resultVariants)
      ? sceneValue.resultVariants
      : undefined;

    if (type === 'result') {
      if (
        resultVariants === undefined ||
        resultVariants.length !== RESULT_VARIANTS.length ||
        resultVariants.some((variant, index) => variant !== RESULT_VARIANTS[index])
      ) {
        pushError(
          errors,
          'invalid-result-variants',
          `${path}.resultVariants`,
          'Result scene must declare contained and overwhelmed, in that order.'
        );
      }
    }

    parsed.push({ id, type, contentRef, transitions, resultVariants, path });
  });

  return parsed;
}

function transitionAppliesToBranch(predicate: string, branch: CrisisBranch): boolean {
  return predicate === 'scene-completed' || predicate.endsWith(branch);
}

export function validateGameSceneCatalog(value: unknown): GameSceneCatalogValidationResult {
  const errors: GameSceneCatalogValidationError[] = [];

  if (!isObject(value)) {
    return {
      valid: false,
      errors: [{ code: 'invalid-catalog', path: '$', message: 'Catalog must be a plain object.' }]
    };
  }

  if (!hasExactKeys(value, CATALOG_KEYS)) {
    pushError(
      errors,
      'unexpected-catalog-key',
      '$',
      `Catalog must contain exactly: ${CATALOG_KEYS.join(', ')}.`
    );
  }

  const entryId = typeof value.entryId === 'string' ? value.entryId : '';
  const terminalId = typeof value.terminalId === 'string' ? value.terminalId : '';

  if (entryId !== 'intro-briefing-mission') {
    pushError(
      errors,
      'invalid-entry',
      '$.entryId',
      'Vertical Beta 1 entry must be intro-briefing-mission.'
    );
  }
  if (terminalId !== 'ending-result-causal-report') {
    pushError(
      errors,
      'invalid-terminal',
      '$.terminalId',
      'Vertical Beta 1 terminal must be ending-result-causal-report.'
    );
  }

  const scenes = parseScenes(value.scenes, errors);
  const idCounts = new Map<string, number>();
  const contentRefCounts = new Map<string, number>();

  for (const scene of scenes) {
    idCounts.set(scene.id, (idCounts.get(scene.id) ?? 0) + 1);
    contentRefCounts.set(scene.contentRef, (contentRefCounts.get(scene.contentRef) ?? 0) + 1);
  }

  for (const [id, count] of idCounts) {
    if (id && count > 1) {
      pushError(errors, 'duplicate-scene-id', '$.scenes', `Scene ID appears ${count} times: ${id}.`);
    }
  }
  for (const [contentRef, count] of contentRefCounts) {
    if (contentRef && count > 1) {
      pushError(
        errors,
        'duplicate-content-reference',
        '$.scenes',
        `Content reference appears ${count} times: ${contentRef}.`
      );
    }
  }

  for (const id of CANONICAL_SCENE_IDS) {
    if (!idCounts.has(id)) {
      pushError(errors, 'missing-scene-id', '$.scenes', `Canonical scene is missing: ${id}.`);
    }
  }

  const scenesById = new Map<string, ParsedScene>();
  for (const scene of scenes) {
    if (scene.id && !scenesById.has(scene.id)) scenesById.set(scene.id, scene);
  }

  const edgeKeys = new Set<string>();
  const indegree = new Map<string, number>();
  for (const id of CANONICAL_SCENE_IDS) indegree.set(id, 0);

  for (const scene of scenes) {
    for (const transition of scene.transitions) {
      const edgeKey = `${scene.id}|${transition.predicate}|${transition.target}`;
      if (edgeKeys.has(edgeKey)) {
        pushError(
          errors,
          'duplicate-transition',
          transition.path,
          `Duplicate transition: ${scene.id} -> ${transition.target} (${transition.predicate}).`
        );
      }
      edgeKeys.add(edgeKey);

      if (!scenesById.has(transition.target)) {
        pushError(
          errors,
          'missing-transition-target',
          `${transition.path}.target`,
          `Transition target does not exist in the catalog: ${transition.target}.`
        );
      } else {
        indegree.set(transition.target, (indegree.get(transition.target) ?? 0) + 1);
      }
    }
  }

  if (edgeKeys.size !== 13) {
    pushError(
      errors,
      'invalid-edge-count',
      '$.scenes',
      `Vertical Beta 1 must contain 13 unique transitions, received ${edgeKeys.size}.`
    );
  }

  const entries = [...scenesById.values()].filter((scene) => (indegree.get(scene.id) ?? 0) === 0);
  if (entries.length !== 1 || entries[0]?.id !== entryId) {
    pushError(
      errors,
      'invalid-entry',
      '$.scenes',
      `Catalog must have one entry matching ${entryId || '<empty>'}; found ${entries
        .map((scene) => scene.id)
        .join(', ') || '<none>'}.`
    );
  }

  const terminals = [...scenesById.values()].filter((scene) => scene.transitions.length === 0);
  if (terminals.length !== 1 || terminals[0]?.id !== terminalId) {
    pushError(
      errors,
      'invalid-terminal',
      '$.scenes',
      `Catalog must have one terminal matching ${terminalId || '<empty>'}; found ${terminals
        .map((scene) => scene.id)
        .join(', ') || '<none>'}.`
    );
  }

  const reachable = new Set<string>();
  const pending = entryId && scenesById.has(entryId) ? [entryId] : [];
  while (pending.length > 0) {
    const current = pending.pop();
    if (current === undefined || reachable.has(current)) continue;
    reachable.add(current);
    for (const transition of scenesById.get(current)?.transitions ?? []) {
      if (scenesById.has(transition.target)) pending.push(transition.target);
    }
  }

  for (const id of CANONICAL_SCENE_IDS) {
    if (scenesById.has(id) && !reachable.has(id)) {
      pushError(errors, 'orphan-scene', '$.scenes', `Scene is not reachable from the entry: ${id}.`);
    }
  }

  const active = new Set<string>();
  const finished = new Set<string>();
  let cycleReported = false;
  const visit = (id: string): void => {
    if (active.has(id)) {
      if (!cycleReported) {
        pushError(errors, 'cycle-detected', '$.scenes', `Cycle detected at scene: ${id}.`);
        cycleReported = true;
      }
      return;
    }
    if (finished.has(id)) return;

    active.add(id);
    for (const transition of scenesById.get(id)?.transitions ?? []) {
      if (scenesById.has(transition.target)) visit(transition.target);
    }
    active.delete(id);
    finished.add(id);
  };
  for (const id of scenesById.keys()) visit(id);

  const terminalReachability = new Map<string, boolean>();
  const canReachTerminal = (id: string, visiting: Set<string>): boolean => {
    if (id === terminalId) return true;
    const cached = terminalReachability.get(id);
    if (cached !== undefined) return cached;
    if (visiting.has(id)) return false;

    const nextVisiting = new Set(visiting).add(id);
    const result = (scenesById.get(id)?.transitions ?? []).some(
      (transition) =>
        scenesById.has(transition.target) && canReachTerminal(transition.target, nextVisiting)
    );
    terminalReachability.set(id, result);
    return result;
  };

  for (const id of CANONICAL_SCENE_IDS) {
    if (scenesById.has(id) && !canReachTerminal(id, new Set())) {
      pushError(errors, 'dead-route', '$.scenes', `Terminal is not reachable from scene: ${id}.`);
    }
  }

  for (const branch of CRISIS_BRANCHES) {
    const branchPath = new Set<string>();
    let current = 'crisis-router-causal-map';
    let validPath = scenesById.has(current);

    while (validPath && current !== terminalId) {
      if (branchPath.has(current)) {
        validPath = false;
        break;
      }
      branchPath.add(current);

      const candidates = (scenesById.get(current)?.transitions ?? []).filter((transition) =>
        transitionAppliesToBranch(transition.predicate, branch)
      );
      if (candidates.length !== 1 || !scenesById.has(candidates[0].target)) {
        validPath = false;
        break;
      }
      current = candidates[0].target;
    }

    if (!validPath || current !== terminalId) {
      pushError(
        errors,
        'invalid-branch-path',
        '$.scenes',
        `Branch ${branch} must resolve exactly one acyclic path from the router to the terminal.`
      );
    }
  }

  return errors.length === 0 ? { valid: true, errors: [] } : { valid: false, errors };
}
