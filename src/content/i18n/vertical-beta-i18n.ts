import {
  INHERITED_STATE_KEYS,
  type InheritedState
} from '../../domain/game-session/game-session.js';
import {
  CANONICAL_SCENE_IDS,
  RESULT_VARIANTS,
  type CanonicalSceneId,
  type CrisisBranch,
  type ResultVariant
} from '../../domain/types/game-scene.js';

export const VERTICAL_BETA_CAUSAL_RELATION_IDS = [
  'fuel-load',
  'fuel-continuity',
  'operational-access',
  'defensibility',
  'attack-opportunity'
] as const;

export type VerticalBetaCausalRelationId =
  (typeof VERTICAL_BETA_CAUSAL_RELATION_IDS)[number];

export interface VerticalBetaActionMessages {
  readonly label: string;
  readonly description: string;
  readonly feedback: string;
  readonly blockedReason?: string;
  readonly consequences?: Partial<Readonly<Record<CrisisBranch, string>>>;
}

export interface VerticalBetaHotspotMessages {
  readonly title: string;
  readonly visualHint: string;
  readonly description: string;
  readonly futureConsequence: string;
  readonly action: {
    readonly label: string;
    readonly description: string;
    readonly feedback: string;
  };
}

export interface VerticalBetaOutcomeMessages {
  readonly title: string;
  readonly text: string;
}

export interface VerticalBetaResultMessages {
  readonly title: string;
  readonly summary: string;
  readonly closing: string;
}

export interface VerticalBetaSceneMessages {
  readonly title: string;
  readonly body: string;
  readonly shortTitle?: string;
  readonly context?: string;
  readonly objective?: string;
  readonly advanceLabel?: string;
  readonly actions?: Readonly<Record<string, VerticalBetaActionMessages>>;
  readonly hotspots?: Readonly<Record<string, VerticalBetaHotspotMessages>>;
  readonly outcomes?: Readonly<Record<string, VerticalBetaOutcomeMessages>>;
  readonly variants?: Readonly<Record<ResultVariant, VerticalBetaResultMessages>>;
}

export interface VerticalBetaI18nCatalog {
  readonly locale: string;
  readonly namespace: 'verticalBeta';
  readonly scenes: Readonly<Record<CanonicalSceneId, VerticalBetaSceneMessages>>;
  readonly dimensions: Readonly<Record<keyof InheritedState, string>>;
  readonly causalRelations: Readonly<
    Record<VerticalBetaCausalRelationId, { readonly title: string; readonly effect: string }>
  >;
}

export type VerticalBetaI18nValidationResult =
  | { readonly valid: true; readonly errors: readonly [] }
  | { readonly valid: false; readonly errors: readonly string[] };

export class VerticalBetaI18nError extends Error {
  constructor(
    readonly code:
      | 'unsupported-locale'
      | 'invalid-catalog'
      | 'missing-translation',
    message: string
  ) {
    super(message);
    this.name = 'VerticalBetaI18nError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function exactKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  return actual.length === wanted.length && actual.every((key, index) => key === wanted[index]);
}

function validateTranslatedValue(value: unknown, path: string, errors: string[]): void {
  if (typeof value === 'string') {
    if (value.trim() === '') errors.push(`${path} must be a non-empty translated string.`);
    return;
  }
  if (!isRecord(value)) {
    errors.push(`${path} must be a translated string or object.`);
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    validateTranslatedValue(child, `${path}.${key}`, errors);
  }
}

export function validateVerticalBetaI18nCatalog(
  value: unknown
): VerticalBetaI18nValidationResult {
  const errors: string[] = [];
  if (!isRecord(value)) {
    return { valid: false, errors: ['Catalog must be a plain object.'] };
  }

  if (typeof value.locale !== 'string' || value.locale.trim() === '') {
    errors.push('locale must be a non-empty string.');
  }
  if (value.namespace !== 'verticalBeta') {
    errors.push('namespace must be verticalBeta.');
  }

  if (!isRecord(value.scenes)) {
    errors.push('scenes must be an object keyed by canonical scene ID.');
  } else {
    if (!exactKeys(value.scenes, CANONICAL_SCENE_IDS)) {
      errors.push('scenes must contain exactly the 12 canonical scene IDs.');
    }
    for (const sceneId of CANONICAL_SCENE_IDS) {
      const scene = value.scenes[sceneId];
      if (!isRecord(scene)) {
        errors.push(`scenes.${sceneId} is missing.`);
        continue;
      }
      if (typeof scene.title !== 'string' || scene.title.trim() === '') {
        errors.push(`scenes.${sceneId}.title is missing.`);
      }
      if (typeof scene.body !== 'string' || scene.body.trim() === '') {
        errors.push(`scenes.${sceneId}.body is missing.`);
      }
      validateTranslatedValue(scene, `scenes.${sceneId}`, errors);
    }

    for (const sceneId of [
      'intro-briefing-mission',
      'transition-summary-prevention',
      'crisis-router-causal-map'
    ] as const) {
      const scene = value.scenes[sceneId];
      if (isRecord(scene) && (typeof scene.advanceLabel !== 'string' || scene.advanceLabel.trim() === '')) {
        errors.push(`scenes.${sceneId}.advanceLabel is missing.`);
      }
    }

    for (const sceneId of [
      'prevention-inspection-territory-fuel',
      'prevention-inspection-housing-interface'
    ] as const) {
      const scene = value.scenes[sceneId];
      if (!isRecord(scene)) continue;
      if (typeof scene.shortTitle !== 'string' || scene.shortTitle.trim() === '') {
        errors.push(`scenes.${sceneId}.shortTitle is missing.`);
      }
      if (typeof scene.context !== 'string' || scene.context.trim() === '') {
        errors.push(`scenes.${sceneId}.context is missing.`);
      }
      if (typeof scene.objective !== 'string' || scene.objective.trim() === '') {
        errors.push(`scenes.${sceneId}.objective is missing.`);
      }
      if (!isRecord(scene.hotspots) || Object.keys(scene.hotspots).length === 0) {
        errors.push(`scenes.${sceneId}.hotspots is missing.`);
      }
      if (!isRecord(scene.outcomes) || !exactKeys(scene.outcomes, ['alto', 'medio', 'bajo'])) {
        errors.push(`scenes.${sceneId}.outcomes must contain alto, medio and bajo.`);
      }
    }

    for (const sceneId of [
      'crisis-decision-first-alert',
      'crisis-decision-emergency-fuel-break',
      'crisis-decision-access-blockage',
      'crisis-decision-ravine-fire',
      'crisis-decision-housing-defense',
      'crisis-decision-crown-fire'
    ] as const) {
      const scene = value.scenes[sceneId];
      if (!isRecord(scene) || !isRecord(scene.actions) || Object.keys(scene.actions).length === 0) {
        errors.push(`scenes.${sceneId}.actions is missing.`);
      }
    }

    const result = value.scenes['ending-result-causal-report'];
    if (!isRecord(result) || !isRecord(result.variants) || !exactKeys(result.variants, RESULT_VARIANTS)) {
      errors.push('ending-result-causal-report must contain contained and overwhelmed variants.');
    }
  }

  if (!isRecord(value.dimensions) || !exactKeys(value.dimensions, INHERITED_STATE_KEYS)) {
    errors.push('dimensions must contain exactly the five inherited-state dimensions.');
  } else {
    validateTranslatedValue(value.dimensions, 'dimensions', errors);
  }

  if (
    !isRecord(value.causalRelations) ||
    !exactKeys(value.causalRelations, VERTICAL_BETA_CAUSAL_RELATION_IDS)
  ) {
    errors.push('causalRelations must contain exactly the five official relations.');
  } else {
    validateTranslatedValue(value.causalRelations, 'causalRelations', errors);
  }

  return errors.length === 0 ? { valid: true, errors: [] } : { valid: false, errors };
}

export function assertVerticalBetaI18nCatalog<T extends VerticalBetaI18nCatalog>(catalog: T): T {
  const validation = validateVerticalBetaI18nCatalog(catalog);
  if (!validation.valid) {
    throw new VerticalBetaI18nError(
      'invalid-catalog',
      `Invalid ${catalog.locale || '<unknown>'} Vertical Beta catalog: ${validation.errors.join(' ')}`
    );
  }
  return catalog;
}

export function requireVerticalBetaSceneMessages(
  catalog: VerticalBetaI18nCatalog,
  sceneId: CanonicalSceneId
): VerticalBetaSceneMessages {
  const scene = catalog.scenes[sceneId];
  if (scene === undefined) {
    throw new VerticalBetaI18nError(
      'missing-translation',
      `Missing official translation for ${sceneId} in ${catalog.locale}.`
    );
  }
  return scene;
}

export function requireVerticalBetaActionMessages(
  catalog: VerticalBetaI18nCatalog,
  sceneId: CanonicalSceneId,
  actionId: string
): VerticalBetaActionMessages {
  const action = requireVerticalBetaSceneMessages(catalog, sceneId).actions?.[actionId];
  if (action === undefined) {
    throw new VerticalBetaI18nError(
      'missing-translation',
      `Missing official translation for ${sceneId}.${actionId} in ${catalog.locale}.`
    );
  }
  return action;
}
