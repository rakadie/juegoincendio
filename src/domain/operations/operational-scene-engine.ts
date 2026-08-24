import { getOfficialOperationalScene } from '../../content/official-operational-scenes.js';
import {
  executeGameSessionCommand
} from '../game-session/game-session-engine.js';
import type { GameSession, InheritedState } from '../game-session/game-session.js';
import {
  OPERATIONAL_SCENE_IDS,
  type OperationalAction,
  type OperationalConditionOperator,
  type OperationalSceneId,
  type OperationalSceneView,
  type OperationalStateCondition,
  type ResolvedOperationalAction
} from '../types/operational-scene.js';

export type OperationalSceneErrorCode =
  | 'invalid-operational-scene'
  | 'missing-operational-state'
  | 'operational-branch-mismatch'
  | 'invalid-operational-action'
  | 'operational-action-unavailable'
  | 'operational-scene-already-resolved';

export class OperationalSceneError extends Error {
  constructor(
    readonly code: OperationalSceneErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'OperationalSceneError';
  }
}

export interface OperationalDecisionResult {
  readonly session: GameSession;
  readonly sceneId: OperationalSceneId;
  readonly actionId: string;
  readonly evidenceIds: readonly string[];
  readonly consequence: string;
}

function isOperationalSceneId(value: string): value is OperationalSceneId {
  return (OPERATIONAL_SCENE_IDS as readonly string[]).includes(value);
}

function compare(
  actual: number,
  operator: OperationalConditionOperator,
  expected: number
): boolean {
  switch (operator) {
    case '<':
      return actual < expected;
    case '<=':
      return actual <= expected;
    case '>':
      return actual > expected;
    case '>=':
      return actual >= expected;
    case '===':
      return actual === expected;
  }
}

function describeCondition(condition: OperationalStateCondition): string {
  return `${condition.dimension} must be ${condition.operator} ${condition.value}.`;
}

function resolveAction(
  action: OperationalAction,
  session: GameSession,
  state: InheritedState
): ResolvedOperationalAction {
  const branch = session.crisisBranch!;
  const resolution = action.resolutions[branch];
  if (action.blockedReason !== undefined) {
    return { ...action, available: false, unavailableReason: action.blockedReason };
  }
  if (resolution === undefined) {
    return {
      ...action,
      available: false,
      unavailableReason: `The action is not available on the ${branch} branch.`
    };
  }

  const failedCondition = action.requirements?.inheritedState?.find(
    (condition) => !compare(state[condition.dimension], condition.operator, condition.value)
  );
  if (failedCondition !== undefined) {
    return {
      ...action,
      available: false,
      unavailableReason: describeCondition(failedCondition),
      resolution
    };
  }

  const priorActionIds = new Set(session.decisions.map(({ actionId }) => actionId));
  const missingPriorAction = action.requirements?.priorActionIds?.find(
    (actionId) => !priorActionIds.has(actionId)
  );
  if (missingPriorAction !== undefined) {
    return {
      ...action,
      available: false,
      unavailableReason: `Prior action ${missingPriorAction} is required.`,
      resolution
    };
  }

  return { ...action, available: true, resolution };
}

export function getOperationalSceneView(session: GameSession): OperationalSceneView {
  const sceneId = session.progress.currentSceneId;
  if (!isOperationalSceneId(sceneId)) {
    throw new OperationalSceneError(
      'invalid-operational-scene',
      `${sceneId} is not an official operational scene.`
    );
  }
  if (session.inheritedState === null || session.crisisBranch === null) {
    throw new OperationalSceneError(
      'missing-operational-state',
      'Operational scenes require inheritedState and a selected crisis branch.'
    );
  }

  const scene = getOfficialOperationalScene(sceneId);
  if (!scene.branches.includes(session.crisisBranch)) {
    throw new OperationalSceneError(
      'operational-branch-mismatch',
      `${sceneId} is not part of the ${session.crisisBranch} branch.`
    );
  }

  return {
    id: scene.id,
    type: scene.type,
    title: scene.title,
    context: scene.context,
    briefing: scene.briefing,
    branch: session.crisisBranch,
    difficulty: scene.difficultyByBranch?.[session.crisisBranch] ?? scene.difficulty,
    inheritedState: structuredClone(session.inheritedState),
    actions: scene.actions.map((action) =>
      resolveAction(action, session, session.inheritedState!)
    )
  };
}

export function resolveOperationalDecision(
  session: GameSession,
  actionId: string
): OperationalDecisionResult {
  const view = getOperationalSceneView(session);
  if (
    session.progress.completedSceneIds.includes(view.id) ||
    session.decisions.some(({ sceneId }) => sceneId === view.id)
  ) {
    throw new OperationalSceneError(
      'operational-scene-already-resolved',
      `${view.id} already has an operational decision.`
    );
  }

  const action = view.actions.find(({ id }) => id === actionId);
  if (action === undefined) {
    throw new OperationalSceneError(
      'invalid-operational-action',
      `${actionId} is not part of ${view.id}.`
    );
  }
  if (!action.available || action.resolution === undefined) {
    throw new OperationalSceneError(
      'operational-action-unavailable',
      action.unavailableReason ?? `${actionId} is not available.`
    );
  }

  const decided = executeGameSessionCommand(session, {
    type: 'apply-decision',
    sceneId: view.id,
    actionId
  });
  const completed = executeGameSessionCommand(decided, {
    type: 'complete-scene',
    sceneId: view.id,
    evidenceIds: action.resolution.evidenceIds
  });

  return {
    session: completed,
    sceneId: view.id,
    actionId,
    evidenceIds: action.resolution.evidenceIds,
    consequence: action.resolution.consequence
  };
}
