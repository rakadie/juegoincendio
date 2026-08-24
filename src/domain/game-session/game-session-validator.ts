import {
  validateGameSessionContract as validateBaseGameSessionContract,
  type CanonicalSceneId,
  type ContractValidationError,
  type ContractValidationResult
} from './game-session-validator-base.js';

export {
  CANONICAL_SCENE_IDS,
  CRISIS_BRANCHES,
  DECISION_SCENE_IDS,
  INHERITED_STATE_KEYS,
  RESULT_VARIANTS,
  roundTripJson
} from './game-session-validator-base.js';

export type {
  CanonicalSceneId,
  ContractValidationError,
  ContractValidationResult,
  CrisisBranch,
  DecisionSceneId,
  GameSessionContractErrorCode,
  ResultVariant
} from './game-session-validator-base.js';

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

const PREVENTION_SCENE_IDS = new Set([
  'prevention-inspection-territory-fuel',
  'prevention-inspection-housing-interface'
]);

interface JsonObject {
  readonly [key: string]: unknown;
}

function isPlainObject(value: unknown): value is JsonObject {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function canonicalizeJson(value: unknown, ancestors = new Set<object>()): unknown {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError('Non-finite numbers are not valid JSON.');
    return value;
  }

  if (typeof value !== 'object') {
    throw new TypeError('Only JSON-compatible values can be canonicalized.');
  }

  if (ancestors.has(value)) throw new TypeError('Circular values are not valid JSON.');
  ancestors.add(value);

  try {
    if (Array.isArray(value)) {
      return value.map((item) => canonicalizeJson(item, ancestors));
    }

    if (!isPlainObject(value)) {
      throw new TypeError('Only plain JSON objects can be canonicalized.');
    }

    // A null-prototype target preserves every enumerable JSON key as an own
    // data property. In particular, assigning "__proto__" cannot invoke the
    // legacy Object.prototype setter and silently remove the unexpected key.
    const canonical = Object.create(null) as Record<string, unknown>;
    for (const key of Object.keys(value).sort()) {
      canonical[key] = canonicalizeJson(value[key], ancestors);
    }
    return canonical;
  } finally {
    ancestors.delete(value);
  }
}

function canonicalizeContractInput(value: unknown): unknown {
  try {
    return canonicalizeJson(value);
  } catch {
    // Preserve malformed values so the base validator reports their original
    // JSON/type error instead of normalizing the problem away.
    return value;
  }
}

function validateCanonicalTransitions(value: unknown): ContractValidationError[] {
  if (!isPlainObject(value)) return [];
  const history = value.history;
  if (!Array.isArray(history)) return [];

  const errors: ContractValidationError[] = [];
  history.forEach((event, index) => {
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

function validateInheritedStateCalculationOrder(value: unknown): ContractValidationError[] {
  if (!isPlainObject(value)) return [];
  const history = value.history;
  if (!Array.isArray(history)) return [];

  const errors: ContractValidationError[] = [];
  const seenPreventionDecisionSequences: number[] = [];

  history.forEach((event, index) => {
    if (!isPlainObject(event)) return;

    if (
      event.type === 'decision-applied' &&
      typeof event.sceneId === 'string' &&
      PREVENTION_SCENE_IDS.has(event.sceneId) &&
      typeof event.decisionSequence === 'number' &&
      Number.isInteger(event.decisionSequence)
    ) {
      seenPreventionDecisionSequences.push(event.decisionSequence);
      return;
    }

    if (event.type !== 'inherited-state-calculated') return;

    const path = `$.history[${index}]`;
    const previousEvent = history[index - 1];
    if (
      !isPlainObject(previousEvent) ||
      previousEvent.type !== 'scene-completed' ||
      previousEvent.sceneId !== 'prevention-inspection-housing-interface'
    ) {
      errors.push({
        code: 'corrupt-session-history',
        path,
        message:
          'InheritedState must be calculated immediately after completing the housing-interface inspection.'
      });
    }

    if (!Array.isArray(event.sourceDecisionSequences)) return;

    const sourceDecisionSequences = event.sourceDecisionSequences.filter(
      (sequence): sequence is number => typeof sequence === 'number' && Number.isInteger(sequence)
    );
    const referencesOnlyPriorDecisions = sourceDecisionSequences.every((sequence) =>
      seenPreventionDecisionSequences.includes(sequence)
    );
    const referencesAllPriorPreventionDecisions =
      sourceDecisionSequences.length === seenPreventionDecisionSequences.length &&
      sourceDecisionSequences.every(
        (sequence, sourceIndex) => sequence === seenPreventionDecisionSequences[sourceIndex]
      );

    if (!referencesOnlyPriorDecisions || !referencesAllPriorPreventionDecisions) {
      errors.push({
        code: 'corrupt-session-history',
        path: `${path}.sourceDecisionSequences`,
        message:
          'InheritedState sources must be exactly the prevention decisions applied before the calculation event.'
      });
    }
  });

  return errors;
}

export function validateGameSessionContract(value: unknown): ContractValidationResult {
  const canonicalValue = canonicalizeContractInput(value);
  const baseResult = validateBaseGameSessionContract(canonicalValue);
  const extensionErrors = [
    ...validateCanonicalTransitions(canonicalValue),
    ...validateInheritedStateCalculationOrder(canonicalValue)
  ];

  if (extensionErrors.length === 0) return baseResult;
  if (baseResult.valid) return { valid: false, errors: extensionErrors };
  return { valid: false, errors: [...baseResult.errors, ...extensionErrors] };
}
