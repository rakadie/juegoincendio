import {
  getOfficialPreventionInspection,
  type OfficialPreventionInspectionAction,
  type PreventionInheritedStateImpact,
  type PreventionInspectionSceneId
} from '../../content/official-prevention-inspections.js';
import {
  executeGameSessionCommand,
  GameSessionCommandError
} from '../game-session/game-session-engine.js';
import type { GameSession } from '../game-session/game-session.js';

export type PreventionInspectionErrorCode =
  | 'invalid-inspection-scene'
  | 'invalid-inspection-action'
  | 'inspection-quota-reached'
  | 'inspection-quota-incomplete';

export class PreventionInspectionError extends Error {
  constructor(
    readonly code: PreventionInspectionErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'PreventionInspectionError';
  }
}

export interface CompletedPreventionInspection {
  readonly session: GameSession;
  readonly selectedActionIds: readonly string[];
  readonly inheritedStateImpact: PreventionInheritedStateImpact;
  readonly evidenceIds: readonly string[];
  readonly omittedConditionIds: readonly string[];
}

function currentInspectionId(session: GameSession): PreventionInspectionSceneId {
  const sceneId = session.progress.currentSceneId;
  if (
    sceneId !== 'prevention-inspection-territory-fuel' &&
    sceneId !== 'prevention-inspection-housing-interface'
  ) {
    throw new PreventionInspectionError(
      'invalid-inspection-scene',
      `${sceneId} is not an official prevention inspection.`
    );
  }
  return sceneId;
}

function selectedActionIds(session: GameSession, sceneId: PreventionInspectionSceneId): string[] {
  return session.decisions
    .filter((decision) => decision.sceneId === sceneId)
    .map((decision) => decision.actionId);
}

function actionById(
  sceneId: PreventionInspectionSceneId,
  actionId: string
): OfficialPreventionInspectionAction {
  const action = getOfficialPreventionInspection(sceneId).hotspots.find(
    (hotspot) => hotspot.action.id === actionId
  )?.action;
  if (action === undefined) {
    throw new PreventionInspectionError(
      'invalid-inspection-action',
      `${actionId} is not available in ${sceneId}.`
    );
  }
  return action;
}

function sumImpacts(
  actions: readonly OfficialPreventionInspectionAction[]
): PreventionInheritedStateImpact {
  const impact: Record<string, number> = {};
  for (const action of actions) {
    for (const [key, value] of Object.entries(action.inheritedStateImpact)) {
      impact[key] = (impact[key] ?? 0) + value;
    }
  }
  return impact as PreventionInheritedStateImpact;
}

export function applyPreventionInspectionAction(
  session: GameSession,
  actionId: string
): GameSession {
  const sceneId = currentInspectionId(session);
  const inspection = getOfficialPreventionInspection(sceneId);
  actionById(sceneId, actionId);

  if (selectedActionIds(session, sceneId).length >= inspection.maxActions) {
    throw new PreventionInspectionError(
      'inspection-quota-reached',
      `${sceneId} accepts exactly ${inspection.maxActions} actions.`
    );
  }

  try {
    return executeGameSessionCommand(session, {
      type: 'apply-decision',
      sceneId,
      actionId
    });
  } catch (error) {
    if (error instanceof GameSessionCommandError && error.code === 'invalid-decision') {
      throw new PreventionInspectionError('invalid-inspection-action', error.message);
    }
    throw error;
  }
}

export function completePreventionInspection(
  session: GameSession
): CompletedPreventionInspection {
  const sceneId = currentInspectionId(session);
  const inspection = getOfficialPreventionInspection(sceneId);
  const selectedIds = selectedActionIds(session, sceneId);
  if (selectedIds.length !== inspection.maxActions) {
    throw new PreventionInspectionError(
      'inspection-quota-incomplete',
      `${sceneId} requires exactly ${inspection.maxActions} actions before completion.`
    );
  }

  const selected = selectedIds.map((actionId) => actionById(sceneId, actionId));
  const selectedSet = new Set(selectedIds);
  const omittedConditionIds = inspection.hotspots
    .filter((hotspot) => !selectedSet.has(hotspot.action.id))
    .map((hotspot) => hotspot.flagIfIgnored);
  const evidenceIds = selected.flatMap((action) => action.evidenceIds);
  const completed = executeGameSessionCommand(session, {
    type: 'complete-scene',
    sceneId,
    evidenceIds: [...evidenceIds, ...omittedConditionIds]
  });

  return {
    session: completed,
    selectedActionIds: selectedIds,
    inheritedStateImpact: sumImpacts(selected),
    evidenceIds,
    omittedConditionIds
  };
}
