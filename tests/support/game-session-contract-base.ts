import {
  CANONICAL_SCENE_IDS,
  CRISIS_BRANCHES,
  DECISION_SCENE_IDS,
  RESULT_VARIANTS,
  type CanonicalSceneId,
  type CrisisBranch,
  type DecisionSceneId,
  type ResultVariant
} from '../../src/domain/types/game-scene.js';

export {
  CANONICAL_SCENE_IDS,
  CRISIS_BRANCHES,
  DECISION_SCENE_IDS,
  RESULT_VARIANTS,
  type CanonicalSceneId,
  type CrisisBranch,
  type DecisionSceneId,
  type ResultVariant
};
export const INHERITED_STATE_KEYS = [
  'fuelLoad',
  'fuelContinuity',
  'operationalAccess',
  'defensibility',
  'attackOpportunity'
] as const;

export type GameSessionContractErrorCode =
  | 'invalid-json-value'
  | 'unexpected-key'
  | 'unsupported-schema-version'
  | 'invalid-session-id'
  | 'invalid-status'
  | 'invalid-current-scene'
  | 'invalid-completed-scenes'
  | 'invalid-decision-sequence'
  | 'invalid-decision'
  | 'invalid-inherited-state'
  | 'invalid-branch'
  | 'invalid-result'
  | 'invalid-event-sequence'
  | 'invalid-event'
  | 'corrupt-session-history'
  | 'branch-path-mismatch'
  | 'session-completion-mismatch'
  | 'event-after-completion';

export interface ContractValidationError {
  readonly code: GameSessionContractErrorCode;
  readonly path: string;
  readonly message: string;
}

export type ContractValidationResult =
  | { readonly valid: true; readonly errors: readonly [] }
  | { readonly valid: false; readonly errors: readonly ContractValidationError[] };

interface JsonObject {
  readonly [key: string]: unknown;
}

const CANONICAL_SCENE_ID_SET = new Set<string>(CANONICAL_SCENE_IDS);
const DECISION_SCENE_ID_SET = new Set<string>(DECISION_SCENE_IDS);
const BRANCH_SET = new Set<string>(CRISIS_BRANCHES);
const RESULT_SET = new Set<string>(RESULT_VARIANTS);

const SESSION_KEYS = [
  'schemaVersion',
  'id',
  'status',
  'progress',
  'decisions',
  'inheritedState',
  'crisisBranch',
  'result',
  'history'
] as const;

const EVENT_KEYS: Readonly<Record<string, readonly string[]>> = {
  'session-created': ['sequence', 'type', 'sessionId', 'schemaVersion', 'initialSceneId'],
  'decision-applied': ['sequence', 'type', 'decisionSequence', 'sceneId', 'actionId'],
  'scene-completed': ['sequence', 'type', 'sceneId', 'evidenceIds'],
  'inherited-state-calculated': [
    'sequence',
    'type',
    'state',
    'sourceDecisionSequences',
    'evidenceIds'
  ],
  'crisis-branch-selected': ['sequence', 'type', 'branch', 'nextSceneId', 'evidenceIds'],
  'scene-transitioned': ['sequence', 'type', 'fromSceneId', 'toSceneId'],
  'session-completed': ['sequence', 'type', 'result']
};

function isPlainObject(value: unknown): value is JsonObject {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function sortedKeys(value: JsonObject): string[] {
  return Object.keys(value).sort();
}

function hasExactKeys(value: JsonObject, expected: readonly string[]): boolean {
  const actual = sortedKeys(value);
  const wanted = [...expected].sort();
  return actual.length === wanted.length && actual.every((key, index) => key === wanted[index]);
}

function deepEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isNonEmptyString);
}

function isUnique(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}

function pushError(
  errors: ContractValidationError[],
  code: GameSessionContractErrorCode,
  path: string,
  message: string
): void {
  errors.push({ code, path, message });
}

function validateJsonValue(
  value: unknown,
  path: string,
  errors: ContractValidationError[],
  seen: Set<object>
): void {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      pushError(errors, 'invalid-json-value', path, 'Numbers must be finite JSON values.');
    }
    return;
  }

  if (typeof value !== 'object') {
    pushError(errors, 'invalid-json-value', path, 'Only JSON-compatible values are allowed.');
    return;
  }

  if (seen.has(value)) {
    pushError(errors, 'invalid-json-value', path, 'Circular references are not JSON-compatible.');
    return;
  }
  seen.add(value);

  if (Array.isArray(value)) {
    value.forEach((item, index) => validateJsonValue(item, `${path}[${index}]`, errors, seen));
    seen.delete(value);
    return;
  }

  if (!isPlainObject(value)) {
    pushError(errors, 'invalid-json-value', path, 'Class instances, Date, Map and Set are not allowed.');
    seen.delete(value);
    return;
  }

  Object.entries(value).forEach(([key, item]) => {
    validateJsonValue(item, `${path}.${key}`, errors, seen);
  });
  seen.delete(value);
}

function validateInheritedState(
  value: unknown,
  path: string,
  errors: ContractValidationError[]
): value is JsonObject {
  if (!isPlainObject(value) || !hasExactKeys(value, INHERITED_STATE_KEYS)) {
    pushError(
      errors,
      'invalid-inherited-state',
      path,
      'InheritedState must contain exactly the five approved dimensions.'
    );
    return false;
  }

  for (const key of INHERITED_STATE_KEYS) {
    if (typeof value[key] !== 'number' || !Number.isFinite(value[key])) {
      pushError(
        errors,
        'invalid-inherited-state',
        `${path}.${key}`,
        'InheritedState dimensions must be finite numbers.'
      );
    }
  }
  return true;
}

function validateResult(value: unknown, path: string, errors: ContractValidationError[]): value is JsonObject {
  if (!isPlainObject(value) || !hasExactKeys(value, ['variant', 'evidenceIds'])) {
    pushError(errors, 'invalid-result', path, 'Result must contain variant and evidenceIds only.');
    return false;
  }

  if (typeof value.variant !== 'string' || !RESULT_SET.has(value.variant)) {
    pushError(errors, 'invalid-result', `${path}.variant`, 'Unsupported result variant.');
  }
  if (!isStringArray(value.evidenceIds) || !isUnique(value.evidenceIds)) {
    pushError(errors, 'invalid-result', `${path}.evidenceIds`, 'Evidence IDs must be unique strings.');
  }
  return true;
}

function validateEventShape(
  event: unknown,
  index: number,
  errors: ContractValidationError[]
): event is JsonObject {
  const path = `$.history[${index}]`;
  if (!isPlainObject(event) || typeof event.type !== 'string' || !(event.type in EVENT_KEYS)) {
    pushError(errors, 'invalid-event', path, 'Unknown or malformed event.');
    return false;
  }

  if (!hasExactKeys(event, EVENT_KEYS[event.type])) {
    pushError(errors, 'unexpected-key', path, `Unexpected or missing keys for ${event.type}.`);
  }

  if (!Number.isInteger(event.sequence) || (event.sequence as number) <= 0) {
    pushError(errors, 'invalid-event-sequence', `${path}.sequence`, 'Event sequence must be positive.');
  }

  switch (event.type) {
    case 'session-created':
      if (!isNonEmptyString(event.sessionId) || event.schemaVersion !== 1) {
        pushError(errors, 'invalid-event', path, 'Invalid session-created metadata.');
      }
      if (event.initialSceneId !== 'intro-briefing-mission') {
        pushError(errors, 'invalid-event', `${path}.initialSceneId`, 'Invalid initial scene.');
      }
      break;
    case 'decision-applied':
      if (!Number.isInteger(event.decisionSequence) || (event.decisionSequence as number) <= 0) {
        pushError(errors, 'invalid-event', `${path}.decisionSequence`, 'Invalid decision sequence.');
      }
      if (typeof event.sceneId !== 'string' || !DECISION_SCENE_ID_SET.has(event.sceneId)) {
        pushError(errors, 'invalid-event', `${path}.sceneId`, 'Invalid decision scene.');
      }
      if (!isNonEmptyString(event.actionId)) {
        pushError(errors, 'invalid-event', `${path}.actionId`, 'Action ID is required.');
      }
      break;
    case 'scene-completed':
      if (typeof event.sceneId !== 'string' || !CANONICAL_SCENE_ID_SET.has(event.sceneId)) {
        pushError(errors, 'invalid-event', `${path}.sceneId`, 'Invalid completed scene.');
      }
      if (!isStringArray(event.evidenceIds) || !isUnique(event.evidenceIds)) {
        pushError(errors, 'invalid-event', `${path}.evidenceIds`, 'Evidence IDs must be unique strings.');
      }
      break;
    case 'inherited-state-calculated':
      validateInheritedState(event.state, `${path}.state`, errors);
      if (
        !Array.isArray(event.sourceDecisionSequences) ||
        !event.sourceDecisionSequences.every((item) => Number.isInteger(item) && item > 0) ||
        new Set(event.sourceDecisionSequences).size !== event.sourceDecisionSequences.length
      ) {
        pushError(errors, 'invalid-event', `${path}.sourceDecisionSequences`, 'Invalid source decisions.');
      }
      if (!isStringArray(event.evidenceIds) || !isUnique(event.evidenceIds)) {
        pushError(errors, 'invalid-event', `${path}.evidenceIds`, 'Evidence IDs must be unique strings.');
      }
      break;
    case 'crisis-branch-selected': {
      if (typeof event.branch !== 'string' || !BRANCH_SET.has(event.branch)) {
        pushError(errors, 'invalid-event', `${path}.branch`, 'Invalid crisis branch.');
      }
      const expectedNext =
        event.branch === 'prepared'
          ? 'crisis-decision-emergency-fuel-break'
          : 'crisis-decision-access-blockage';
      if (event.nextSceneId !== expectedNext) {
        pushError(errors, 'invalid-event', `${path}.nextSceneId`, 'Branch and next scene do not match.');
      }
      if (!isStringArray(event.evidenceIds) || !isUnique(event.evidenceIds)) {
        pushError(errors, 'invalid-event', `${path}.evidenceIds`, 'Evidence IDs must be unique strings.');
      }
      break;
    }
    case 'scene-transitioned':
      if (
        typeof event.fromSceneId !== 'string' ||
        !CANONICAL_SCENE_ID_SET.has(event.fromSceneId) ||
        typeof event.toSceneId !== 'string' ||
        !CANONICAL_SCENE_ID_SET.has(event.toSceneId)
      ) {
        pushError(errors, 'invalid-event', path, 'Transition must use canonical scene IDs.');
      }
      break;
    case 'session-completed':
      validateResult(event.result, `${path}.result`, errors);
      break;
  }

  return true;
}

export function validateGameSessionContract(value: unknown): ContractValidationResult {
  const errors: ContractValidationError[] = [];
  validateJsonValue(value, '$', errors, new Set<object>());

  if (!isPlainObject(value)) {
    pushError(errors, 'invalid-json-value', '$', 'GameSession must be a plain object.');
    return { valid: false, errors };
  }

  if (!hasExactKeys(value, SESSION_KEYS)) {
    pushError(errors, 'unexpected-key', '$', 'GameSession has missing or unexpected top-level keys.');
  }

  if (value.schemaVersion !== 1) {
    pushError(errors, 'unsupported-schema-version', '$.schemaVersion', 'Only schema version 1 is supported.');
  }
  if (!isNonEmptyString(value.id)) {
    pushError(errors, 'invalid-session-id', '$.id', 'Session ID must be a non-empty string.');
  }
  if (value.status !== 'active' && value.status !== 'completed') {
    pushError(errors, 'invalid-status', '$.status', 'Unsupported session status.');
  }

  const progress = value.progress;
  let currentSceneId: string | null = null;
  let completedSceneIds: string[] = [];
  if (!isPlainObject(progress) || !hasExactKeys(progress, ['currentSceneId', 'completedSceneIds'])) {
    pushError(errors, 'invalid-current-scene', '$.progress', 'Progress has an invalid shape.');
  } else {
    if (typeof progress.currentSceneId !== 'string' || !CANONICAL_SCENE_ID_SET.has(progress.currentSceneId)) {
      pushError(errors, 'invalid-current-scene', '$.progress.currentSceneId', 'Current scene is not canonical.');
    } else {
      currentSceneId = progress.currentSceneId;
    }

    if (
      !Array.isArray(progress.completedSceneIds) ||
      !progress.completedSceneIds.every(
        (item): item is string => typeof item === 'string' && CANONICAL_SCENE_ID_SET.has(item)
      ) ||
      new Set(progress.completedSceneIds).size !== progress.completedSceneIds.length
    ) {
      pushError(
        errors,
        'invalid-completed-scenes',
        '$.progress.completedSceneIds',
        'Completed scenes must be unique canonical IDs.'
      );
    } else {
      completedSceneIds = progress.completedSceneIds;
    }
  }

  const decisions = value.decisions;
  const validDecisions: JsonObject[] = [];
  if (!Array.isArray(decisions)) {
    pushError(errors, 'invalid-decision', '$.decisions', 'Decisions must be an array.');
  } else {
    decisions.forEach((decision, index) => {
      const path = `$.decisions[${index}]`;
      if (!isPlainObject(decision) || !hasExactKeys(decision, ['sequence', 'sceneId', 'actionId'])) {
        pushError(errors, 'invalid-decision', path, 'Decision has an invalid shape.');
        return;
      }
      if (decision.sequence !== index + 1) {
        pushError(errors, 'invalid-decision-sequence', `${path}.sequence`, 'Decision sequences must be contiguous.');
      }
      if (typeof decision.sceneId !== 'string' || !DECISION_SCENE_ID_SET.has(decision.sceneId)) {
        pushError(errors, 'invalid-decision', `${path}.sceneId`, 'Decision scene is not canonical.');
      }
      if (!isNonEmptyString(decision.actionId)) {
        pushError(errors, 'invalid-decision', `${path}.actionId`, 'Action ID is required.');
      }
      validDecisions.push(decision);
    });
  }

  let inheritedState: JsonObject | null = null;
  if (value.inheritedState !== null) {
    if (validateInheritedState(value.inheritedState, '$.inheritedState', errors)) {
      inheritedState = value.inheritedState;
    }
  }

  const crisisBranch = value.crisisBranch;
  if (crisisBranch !== null && (typeof crisisBranch !== 'string' || !BRANCH_SET.has(crisisBranch))) {
    pushError(errors, 'invalid-branch', '$.crisisBranch', 'Crisis branch must be prepared, vulnerable or null.');
  }

  let result: JsonObject | null = null;
  if (value.result !== null) {
    if (validateResult(value.result, '$.result', errors)) result = value.result;
  }

  const history = value.history;
  const validEvents: JsonObject[] = [];
  if (!Array.isArray(history) || history.length === 0) {
    pushError(errors, 'invalid-event', '$.history', 'History must contain session-created.');
  } else {
    history.forEach((event, index) => {
      if (validateEventShape(event, index, errors)) validEvents.push(event);
      if (isPlainObject(event) && event.sequence !== index + 1) {
        pushError(errors, 'invalid-event-sequence', `$.history[${index}].sequence`, 'Event sequences must be contiguous.');
      }
    });
  }

  const createdEvents = validEvents.filter((event) => event.type === 'session-created');
  if (
    createdEvents.length !== 1 ||
    validEvents[0]?.type !== 'session-created' ||
    createdEvents[0]?.sessionId !== value.id ||
    createdEvents[0]?.schemaVersion !== value.schemaVersion
  ) {
    pushError(errors, 'corrupt-session-history', '$.history', 'History must start with one matching session-created event.');
  }

  const completionIndex = validEvents.findIndex((event) => event.type === 'session-completed');
  if (completionIndex >= 0 && completionIndex !== validEvents.length - 1) {
    pushError(errors, 'event-after-completion', '$.history', 'No events are allowed after session-completed.');
  }

  const decisionEvents = validEvents.filter((event) => event.type === 'decision-applied');
  if (
    decisionEvents.length !== validDecisions.length ||
    validDecisions.some((decision, index) => {
      const event = decisionEvents[index];
      return (
        event?.decisionSequence !== decision.sequence ||
        event?.sceneId !== decision.sceneId ||
        event?.actionId !== decision.actionId
      );
    })
  ) {
    pushError(errors, 'corrupt-session-history', '$.decisions', 'Decisions and decision-applied events must match one to one.');
  }

  const sceneCompletedEvents = validEvents.filter((event) => event.type === 'scene-completed');
  const completedFromHistory = sceneCompletedEvents
    .map((event) => event.sceneId)
    .filter((sceneId): sceneId is string => typeof sceneId === 'string');
  if (!deepEqual(completedFromHistory, completedSceneIds)) {
    pushError(
      errors,
      'corrupt-session-history',
      '$.progress.completedSceneIds',
      'Completed scenes must match scene-completed events in order.'
    );
  }

  let replaySceneId = 'intro-briefing-mission';
  let replaySceneCompleted = false;
  for (const [index, event] of validEvents.entries()) {
    const path = `$.history[${index}]`;
    if (event.type === 'decision-applied' && event.sceneId !== replaySceneId) {
      pushError(errors, 'corrupt-session-history', path, 'Decision was applied outside the current scene.');
    }
    if (event.type === 'scene-completed') {
      if (event.sceneId !== replaySceneId || replaySceneCompleted) {
        pushError(errors, 'corrupt-session-history', path, 'Scene completion does not match the replayed current scene.');
      }
      replaySceneCompleted = true;
    }
    if (event.type === 'scene-transitioned') {
      if (event.fromSceneId !== replaySceneId || !replaySceneCompleted) {
        pushError(errors, 'corrupt-session-history', path, 'Transition does not follow a completed current scene.');
      }
      if (typeof event.toSceneId === 'string') replaySceneId = event.toSceneId;
      replaySceneCompleted = false;
    }
  }
  if (currentSceneId !== null && replaySceneId !== currentSceneId) {
    pushError(errors, 'corrupt-session-history', '$.progress.currentSceneId', 'Current scene does not match replayed history.');
  }

  const inheritedEvents = validEvents.filter((event) => event.type === 'inherited-state-calculated');
  if (
    (inheritedState === null && inheritedEvents.length !== 0) ||
    (inheritedState !== null &&
      (inheritedEvents.length !== 1 || !deepEqual(inheritedEvents[0]?.state, inheritedState)))
  ) {
    pushError(errors, 'corrupt-session-history', '$.inheritedState', 'InheritedState and history must match exactly.');
  }
  if (inheritedEvents.length === 1 && Array.isArray(inheritedEvents[0]?.sourceDecisionSequences)) {
    const preventionSequences = new Set(
      validDecisions
        .filter(
          (decision) =>
            decision.sceneId === 'prevention-inspection-territory-fuel' ||
            decision.sceneId === 'prevention-inspection-housing-interface'
        )
        .map((decision) => decision.sequence)
    );
    if (
      !(inheritedEvents[0].sourceDecisionSequences as unknown[]).every(
        (sequence) => typeof sequence === 'number' && preventionSequences.has(sequence)
      )
    ) {
      pushError(
        errors,
        'corrupt-session-history',
        '$.inheritedState',
        'InheritedState source decisions must come from the two inspections.'
      );
    }
  }

  const branchEvents = validEvents.filter((event) => event.type === 'crisis-branch-selected');
  if (
    (crisisBranch === null && branchEvents.length !== 0) ||
    (crisisBranch !== null && (branchEvents.length !== 1 || branchEvents[0]?.branch !== crisisBranch))
  ) {
    pushError(errors, 'corrupt-session-history', '$.crisisBranch', 'Branch and branch-selection event must match.');
  }

  const pathScenes = new Set<string>([...completedSceneIds, ...(currentSceneId ? [currentSceneId] : [])]);
  if (crisisBranch === 'prepared') {
    if (
      pathScenes.has('crisis-decision-access-blockage') ||
      pathScenes.has('crisis-decision-crown-fire')
    ) {
      pushError(errors, 'branch-path-mismatch', '$.crisisBranch', 'Prepared sessions cannot enter vulnerable-only scenes.');
    }
  }
  if (crisisBranch === 'vulnerable') {
    if (
      pathScenes.has('crisis-decision-emergency-fuel-break') ||
      pathScenes.has('crisis-decision-housing-defense')
    ) {
      pushError(errors, 'branch-path-mismatch', '$.crisisBranch', 'Vulnerable sessions cannot enter prepared-only scenes.');
    }
  }

  const completedEvents = validEvents.filter((event) => event.type === 'session-completed');
  if (value.status === 'active') {
    if (result !== null || completedEvents.length !== 0) {
      pushError(errors, 'session-completion-mismatch', '$.status', 'Active sessions cannot have a final result.');
    }
  }
  if (value.status === 'completed') {
    if (
      result === null ||
      completedEvents.length !== 1 ||
      !deepEqual(completedEvents[0]?.result, result) ||
      currentSceneId !== 'ending-result-causal-report' ||
      !completedSceneIds.includes('ending-result-causal-report')
    ) {
      pushError(errors, 'session-completion-mismatch', '$.status', 'Completed session snapshot and history are inconsistent.');
    }
  }

  if (result !== null && typeof result.variant === 'string' && crisisBranch !== null) {
    const expectedVariant = crisisBranch === 'prepared' ? 'contained' : 'overwhelmed';
    if (result.variant !== expectedVariant) {
      pushError(errors, 'invalid-result', '$.result.variant', 'Result variant does not match the selected branch.');
    }
  }

  return errors.length === 0 ? { valid: true, errors: [] } : { valid: false, errors };
}

export function roundTripJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
