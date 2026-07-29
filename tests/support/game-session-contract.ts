import {
  validateGameSessionContract as validateBaseGameSessionContract,
  type CanonicalSceneId,
  type ContractValidationError,
  type ContractValidationResult
} from './game-session-contract-base.js';

export {
  CANONICAL_SCENE_IDS,
  CRISIS_BRANCHES,
  DECISION_SCENE_IDS,
  INHERITED_STATE_KEYS,
  RESULT_VARIANTS,
  roundTripJson
} from './game-session-contract-base.js';

export type {
  CanonicalSceneId,
  ContractValidationError,
  ContractValidationResult,
  CrisisBranch,
  DecisionSceneId,
  GameSessionContractErrorCode,
  ResultVariant
} from './game-session-contract-base.js';

const ALLOWED_TRANSITIONS: Readonly<Record<CanonicalSceneId, readonly CanonicalSceneId[]>> = {
  'intro-briefing-mission': ['prevention-inspection-territory-fuel'],
  'prevention-inspection-territory-fuel': ['prevention-inspection-housing-interface'],
  'prevention-inspection-housing-interface': ['transition-summary-prevention'],
  'transition-summary-prevention': ['crisis-decision-first-alert'],
  'crisis-decision-first-alert': ['crisis-router-causal-map'],
  'crisis-router-causal-map': [
    'crisis-decision-emergency-fuel-break',
    'crisis-decision-access-blockage'
  ],
  'crisis-decision-emergency-fuel-break': ['crisis-decision-ravine-fire'],
  'crisis-decision-access-blockage': ['crisis-decision-ravine-fire'],
  'crisis-decision-ravine-fire': [
    'crisis-decision-housing-defense',
    'crisis-decision-crown-fire'
  ],
  'crisis-decision-housing-defense': ['ending-result-causal-report'],
  'crisis-decision-crown-fire': ['ending-result-causal-report'],
  'ending-result-causal-report': []
};

interface JsonObject {
  readonly [key: string]: unknown;
}

function isPlainObject(value: unknown): value is JsonObject {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function validateCanonicalTransitions(value: unknown): ContractValidationError[] {
  if (!isPlainObject(value) || !Array.isArray(value.history)) return [];

  const errors: ContractValidationError[] = [];
  value.history.forEach((event, index) => {
    if (!isPlainObject(event) || event.type !== 'scene-transitioned') return;
    if (typeof event.fromSceneId !== 'string' || typeof event.toSceneId !== 'string') return;

    const allowedSuccessors = ALLOWED_TRANSITIONS[event.fromSceneId as CanonicalSceneId];
    if (!allowedSuccessors || !allowedSuccessors.includes(event.toSceneId as CanonicalSceneId)) {
      errors.push({
        code: 'corrupt-session-history',
        path: `$.history[${index}]`,
        message: `Transition ${event.fromSceneId} -> ${event.toSceneId} is not an edge of the canonical graph.`
      });
    }
  });

  return errors;
}

export function validateGameSessionContract(value: unknown): ContractValidationResult {
  const baseResult = validateBaseGameSessionContract(value);
  const transitionErrors = validateCanonicalTransitions(value);

  if (transitionErrors.length === 0) return baseResult;
  if (baseResult.valid) return { valid: false, errors: transitionErrors };
  return { valid: false, errors: [...baseResult.errors, ...transitionErrors] };
}
