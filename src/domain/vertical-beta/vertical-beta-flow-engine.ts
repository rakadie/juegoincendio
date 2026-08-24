import {
  OFFICIAL_PREVENTION_INSPECTIONS,
  type OfficialPreventionInspectionAction
} from '../../content/official-prevention-inspections.js';
import { VERTICAL_BETA_FLOW, transitionAppliesToBranch } from '../../content/vertical-beta-catalog.js';
import { VERTICAL_BETA_FIRST_ALERT } from '../../content/vertical-beta-flow-content.js';
import {
  executeGameSessionCommand,
  resultForBranch
} from '../game-session/game-session-engine.js';
import {
  INHERITED_STATE_KEYS,
  type GameDecision,
  type GameSession,
  type InheritedState
} from '../game-session/game-session.js';
import type {
  CanonicalSceneId,
  CrisisBranch,
  DecisionSceneId,
  ResultVariant
} from '../types/game-scene.js';

export type VerticalBetaFlowErrorCode =
  | 'invalid-flow-state'
  | 'invalid-inherited-state'
  | 'invalid-first-alert-action'
  | 'causal-report-insufficient-evidence';

export class VerticalBetaFlowError extends Error {
  constructor(
    readonly code: VerticalBetaFlowErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'VerticalBetaFlowError';
  }
}

export interface PreventionBalance {
  readonly state: InheritedState;
  readonly directState: Omit<InheritedState, 'attackOpportunity'>;
  readonly calculation: {
    readonly fuelControl: number;
    readonly continuityControl: number;
    readonly usableDefensibility: number;
    readonly strategicModifier: 0 | 10;
    readonly rawAttackOpportunity: number;
    readonly accessCriticalCapApplied: boolean;
  };
  readonly sourceDecisionSequences: readonly number[];
  readonly evidenceIds: readonly string[];
}

export interface CrisisBranchSelection {
  readonly branch: CrisisBranch;
  readonly nextSceneId:
    | 'crisis-decision-emergency-fuel-break'
    | 'crisis-decision-access-blockage';
  readonly reasonIds: readonly string[];
}

export type ReportDimension = keyof InheritedState;
export type PreventionExecution = 'completed' | 'omitted';

export interface CausalReportRelation {
  readonly id: string;
  readonly dimension: ReportDimension;
  readonly branchDecisive: boolean;
  readonly cause: {
    readonly inspectionSceneId:
      | 'prevention-inspection-territory-fuel'
      | 'prevention-inspection-housing-interface';
    readonly actionIds: readonly string[];
    readonly execution: PreventionExecution;
    readonly decisionSequences: readonly number[];
    readonly evidenceIds: readonly string[];
  };
  readonly stateEffect: {
    readonly bandKey: string;
    readonly evidenceIds: readonly string[];
  };
  readonly manifestation: {
    readonly sceneId: CanonicalSceneId;
    readonly consequenceId: string;
    readonly evidenceIds: readonly string[];
  };
  readonly combinationId?: 'C-01' | 'C-03' | 'C-04' | 'C-05';
  readonly alternativeActionIds: readonly string[];
  readonly validationClaimIds: readonly string[];
  readonly messageKeys: {
    readonly cause: string;
    readonly state: string;
    readonly manifestation: string;
    readonly effect: string;
    readonly alternative: string;
  };
}

export interface OperationalResponseEntry {
  readonly sceneId: DecisionSceneId;
  readonly actionId: string;
  readonly decisionSequence: number;
  readonly evidenceIds: readonly string[];
  readonly messageKey: string;
}

export interface CausalReportModel {
  readonly nodeId: 'ending-result-causal-report';
  readonly variant: ResultVariant;
  readonly summaryKey: string;
  readonly relations: readonly CausalReportRelation[];
  readonly operationalResponse: readonly OperationalResponseEntry[];
  readonly secondaryConsequenceKeys: readonly string[];
  readonly closingKey: string;
}

export interface CompletedVerticalBetaResult {
  readonly session: GameSession;
  readonly report: CausalReportModel;
}

const BASE_STATE = {
  fuelLoad: 75,
  fuelContinuity: 85,
  operationalAccess: 20,
  defensibility: 20
} as const;

const actions = new Map<string, OfficialPreventionInspectionAction>(
  OFFICIAL_PREVENTION_INSPECTIONS.flatMap((inspection) =>
    inspection.hotspots.map((hotspot) => [hotspot.action.id, hotspot.action] as const)
  )
);

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function completedEvidence(session: GameSession, sceneId?: CanonicalSceneId): string[] {
  return unique(
    session.history.flatMap((event) =>
      event.type === 'scene-completed' && (sceneId === undefined || event.sceneId === sceneId)
        ? event.evidenceIds
        : []
    )
  );
}

function assertAtScene(session: GameSession, sceneId: CanonicalSceneId, completed = false): void {
  if (
    session.status !== 'active' ||
    session.progress.currentSceneId !== sceneId ||
    (completed && !session.progress.completedSceneIds.includes(sceneId))
  ) {
    throw new VerticalBetaFlowError(
      'invalid-flow-state',
      `${sceneId} must be the ${completed ? 'completed ' : ''}current scene.`
    );
  }
}

function transition(session: GameSession, toSceneId: CanonicalSceneId): GameSession {
  return executeGameSessionCommand(session, { type: 'transition-scene', toSceneId });
}

function assertValidInheritedState(value: unknown): asserts value is InheritedState {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new VerticalBetaFlowError('invalid-inherited-state', 'InheritedState must be an object.');
  }
  const keys = Object.keys(value).sort();
  const expected = [...INHERITED_STATE_KEYS].sort();
  if (JSON.stringify(keys) !== JSON.stringify(expected)) {
    throw new VerticalBetaFlowError(
      'invalid-inherited-state',
      'InheritedState must contain exactly the five canonical dimensions.'
    );
  }
  for (const key of INHERITED_STATE_KEYS) {
    const dimension = (value as Record<string, unknown>)[key];
    if (!Number.isInteger(dimension) || (dimension as number) < 0 || (dimension as number) > 100) {
      throw new VerticalBetaFlowError(
        'invalid-inherited-state',
        `${key} must be an integer between 0 and 100.`
      );
    }
  }
}

export function calculatePreventionBalance(session: GameSession): PreventionBalance {
  assertAtScene(session, 'prevention-inspection-housing-interface', true);
  if (session.inheritedState !== null) {
    throw new VerticalBetaFlowError('invalid-flow-state', 'The prevention balance was already recorded.');
  }

  const preventionDecisions = session.decisions.filter((decision) => actions.has(decision.actionId));
  if (preventionDecisions.length !== 5) {
    throw new VerticalBetaFlowError(
      'invalid-flow-state',
      'The balance requires the five completed prevention actions.'
    );
  }

  const direct: Record<keyof typeof BASE_STATE, number> = { ...BASE_STATE };
  for (const decision of preventionDecisions) {
    const impact = actions.get(decision.actionId)!.inheritedStateImpact;
    for (const dimension of ['fuelLoad', 'fuelContinuity', 'operationalAccess', 'defensibility'] as const) {
      direct[dimension] += impact[dimension] ?? 0;
    }
  }

  const evidenceIds = completedEvidence(session).filter((id) => id !== 'preparedness-summary-produced');
  const fuelControl = 100 - direct.fuelLoad;
  const continuityControl = 100 - direct.fuelContinuity;
  const usableDefensibility = Math.min(direct.defensibility, direct.operationalAccess);
  const strategicModifier = evidenceIds.includes('professional-line-feasible') ? 10 : 0;
  const rawAttackOpportunity = Math.round(
    fuelControl * 0.2 +
      continuityControl * 0.3 +
      direct.operationalAccess * 0.25 +
      usableDefensibility * 0.25 +
      strategicModifier
  );
  const territorialAccessReady = evidenceIds.includes('rural-road-margins-cleared');
  const localAccessReady = evidenceIds.includes('fire-engine-access-cleared');
  const accessCriticalCapApplied =
    direct.operationalAccess <= 24 && !territorialAccessReady && !localAccessReady;
  const attackOpportunity = Math.max(
    0,
    Math.min(100, accessCriticalCapApplied ? Math.min(rawAttackOpportunity, 24) : rawAttackOpportunity)
  );

  return {
    state: { ...direct, attackOpportunity },
    directState: direct,
    calculation: {
      fuelControl,
      continuityControl,
      usableDefensibility,
      strategicModifier,
      rawAttackOpportunity,
      accessCriticalCapApplied
    },
    sourceDecisionSequences: preventionDecisions.map(({ sequence }) => sequence),
    evidenceIds
  };
}

export function selectCrisisBranch(state: unknown, evidenceIds: readonly string[] = []): CrisisBranchSelection {
  assertValidInheritedState(state);
  const criticalReasons: string[] = [];
  if (state.operationalAccess <= 24) criticalReasons.push('operational-access-critical');
  if (state.fuelContinuity >= 75) criticalReasons.push('fuel-continuity-critical');
  if (state.defensibility <= 24) criticalReasons.push('defensibility-critical');
  if (state.attackOpportunity <= 24) criticalReasons.push('attack-opportunity-critical');
  if (state.fuelLoad >= 75 && state.fuelContinuity >= 50) {
    criticalReasons.push('fuel-load-and-continuity-critical');
  }
  if (
    state.operationalAccess <= 24 &&
    !evidenceIds.includes('rural-road-margins-cleared') &&
    !evidenceIds.includes('fire-engine-access-cleared')
  ) {
    criticalReasons.splice(
      criticalReasons.includes('operational-access-critical') ? 1 : criticalReasons.length,
      0,
      'access-chain-unavailable'
    );
  }

  const prepared =
    criticalReasons.length === 0 &&
    state.fuelLoad <= 74 &&
    state.fuelContinuity <= 49 &&
    state.operationalAccess >= 50 &&
    state.defensibility >= 50 &&
    state.attackOpportunity >= 50;
  if (prepared) {
    return {
      branch: 'prepared',
      nextSceneId: 'crisis-decision-emergency-fuel-break',
      reasonIds: ['prepared-branch-selected', 'safe-attack-envelope']
    };
  }
  return {
    branch: 'vulnerable',
    nextSceneId: 'crisis-decision-access-blockage',
    reasonIds:
      criticalReasons.length > 0 ? criticalReasons : ['prepared-thresholds-unmet']
  };
}

export function completeBriefing(session: GameSession): GameSession {
  assertAtScene(session, 'intro-briefing-mission');
  const completed = executeGameSessionCommand(session, {
    type: 'complete-scene',
    sceneId: 'intro-briefing-mission',
    evidenceIds: []
  });
  return transition(completed, 'prevention-inspection-territory-fuel');
}

export function recordPreventionBalance(session: GameSession): { session: GameSession; balance: PreventionBalance } {
  const balance = calculatePreventionBalance(session);
  const recorded = executeGameSessionCommand(session, {
    type: 'record-inherited-state',
    state: balance.state,
    sourceDecisionSequences: balance.sourceDecisionSequences,
    evidenceIds: balance.evidenceIds
  });
  return { session: transition(recorded, 'transition-summary-prevention'), balance };
}

export function completePreventionSummary(session: GameSession): GameSession {
  assertAtScene(session, 'transition-summary-prevention');
  if (session.inheritedState === null) {
    throw new VerticalBetaFlowError('invalid-flow-state', 'The summary requires InheritedState.');
  }
  const completed = executeGameSessionCommand(session, {
    type: 'complete-scene',
    sceneId: 'transition-summary-prevention',
    evidenceIds: ['preparedness-summary-produced']
  });
  return transition(completed, 'crisis-decision-first-alert');
}

export function resolveFirstAlert(session: GameSession, actionId: string): GameSession {
  assertAtScene(session, 'crisis-decision-first-alert');
  const action = VERTICAL_BETA_FIRST_ALERT.actions.find((candidate) => candidate.id === actionId);
  if (action === undefined) {
    throw new VerticalBetaFlowError(
      'invalid-first-alert-action',
      `${actionId} is not an official first-alert action.`
    );
  }
  const decided = executeGameSessionCommand(session, {
    type: 'apply-decision',
    sceneId: 'crisis-decision-first-alert',
    actionId
  });
  const completed = executeGameSessionCommand(decided, {
    type: 'complete-scene',
    sceneId: 'crisis-decision-first-alert',
    evidenceIds: action.evidenceIds
  });
  return transition(completed, 'crisis-router-causal-map');
}

export function resolveCausalRouter(session: GameSession): { session: GameSession; selection: CrisisBranchSelection } {
  assertAtScene(session, 'crisis-router-causal-map');
  if (session.inheritedState === null) {
    throw new VerticalBetaFlowError('invalid-inherited-state', 'The router requires InheritedState.');
  }
  const inheritedEvent = session.history.find((event) => event.type === 'inherited-state-calculated');
  if (inheritedEvent?.type !== 'inherited-state-calculated' || JSON.stringify(inheritedEvent.state) !== JSON.stringify(session.inheritedState)) {
    throw new VerticalBetaFlowError(
      'invalid-inherited-state',
      'The InheritedState snapshot must match its recorded causal event.'
    );
  }
  const selection = selectCrisisBranch(session.inheritedState, inheritedEvent.evidenceIds);
  const selected = executeGameSessionCommand(session, {
    type: 'select-crisis-branch',
    branch: selection.branch,
    evidenceIds: selection.reasonIds
  });
  const completed = executeGameSessionCommand(selected, {
    type: 'complete-scene',
    sceneId: 'crisis-router-causal-map',
    evidenceIds: [`${selection.branch}-branch-selected`]
  });
  return { session: transition(completed, selection.nextSceneId), selection };
}

export function advanceAfterOperationalScene(session: GameSession): GameSession {
  const scene = VERTICAL_BETA_FLOW.find(({ id }) => id === session.progress.currentSceneId);
  if (
    session.crisisBranch === null ||
    scene === undefined ||
    !session.progress.completedSceneIds.includes(scene.id)
  ) {
    throw new VerticalBetaFlowError(
      'invalid-flow-state',
      'A completed operational scene and a selected branch are required.'
    );
  }
  const next = scene.transitions.find(({ predicate }) =>
    transitionAppliesToBranch(predicate, session.crisisBranch!)
  )?.target;
  if (next === undefined) {
    throw new VerticalBetaFlowError('invalid-flow-state', `${scene.id} has no branch transition.`);
  }
  return transition(session, next);
}

function decisionEvidence(session: GameSession, decision: GameDecision): string[] {
  return completedEvidence(session, decision.sceneId);
}

function bandKey(dimension: ReportDimension, value: number): string {
  const band = value <= 24 ? 'critical-low' : value <= 49 ? 'low' : value <= 74 ? 'conditioned' : 'high';
  return `verticalBeta.state.${dimension}.${band}`;
}

function messageKeys(id: string) {
  const prefix = `verticalBeta.report.relation.${id}`;
  return {
    cause: `${prefix}.cause`,
    state: `${prefix}.state`,
    manifestation: `${prefix}.manifestation`,
    effect: `${prefix}.effect`,
    alternative: `${prefix}.alternative`
  };
}

interface RelationSpec {
  readonly id: string;
  readonly dimension: ReportDimension;
  readonly preferredActionIds: readonly string[];
  readonly omittedActionIds: readonly string[];
  readonly inspectionSceneId:
    | 'prevention-inspection-territory-fuel'
    | 'prevention-inspection-housing-interface';
  readonly preparedSceneId: CanonicalSceneId;
  readonly vulnerableSceneId: CanonicalSceneId;
  readonly consequenceId: string;
  readonly combinationId?: 'C-01' | 'C-03' | 'C-04' | 'C-05';
  readonly alternatives: readonly string[];
}

const RELATION_SPECS: readonly RelationSpec[] = [
  {
    id: 'fuel-load',
    dimension: 'fuelLoad',
    preferredActionIds: ['gestionar-restos-poda', 'activar-pastoreo-preventivo'],
    omittedActionIds: ['gestionar-restos-poda'],
    inspectionSceneId: 'prevention-inspection-territory-fuel',
    preparedSceneId: 'crisis-decision-ravine-fire',
    vulnerableSceneId: 'crisis-decision-ravine-fire',
    consequenceId: 'intensityLevel',
    combinationId: 'C-01',
    alternatives: ['activar-pastoreo-preventivo']
  },
  {
    id: 'fuel-continuity',
    dimension: 'fuelContinuity',
    preferredActionIds: [
      'crear-discontinuidades-vegetales',
      'limpiar-margenes-caminos',
      'activar-pastoreo-preventivo'
    ],
    omittedActionIds: ['crear-discontinuidades-vegetales'],
    inspectionSceneId: 'prevention-inspection-territory-fuel',
    preparedSceneId: 'crisis-decision-emergency-fuel-break',
    vulnerableSceneId: 'crisis-decision-ravine-fire',
    consequenceId: 'spreadLevel',
    combinationId: 'C-03',
    alternatives: ['crear-discontinuidades-vegetales', 'separar-copas']
  },
  {
    id: 'operational-access',
    dimension: 'operationalAccess',
    preferredActionIds: ['limpiar-margenes-caminos'],
    omittedActionIds: ['limpiar-margenes-caminos'],
    inspectionSceneId: 'prevention-inspection-territory-fuel',
    preparedSceneId: 'crisis-decision-ravine-fire',
    vulnerableSceneId: 'crisis-decision-access-blockage',
    consequenceId: 'machineryAccess',
    alternatives: ['limpiar-margenes-caminos', 'despejar-accesos']
  },
  {
    id: 'defensibility',
    dimension: 'defensibility',
    preferredActionIds: ['separar-copas', 'despejar-accesos'],
    omittedActionIds: ['despejar-accesos'],
    inspectionSceneId: 'prevention-inspection-housing-interface',
    preparedSceneId: 'crisis-decision-housing-defense',
    vulnerableSceneId: 'crisis-decision-ravine-fire',
    consequenceId: 'positionHoldability',
    combinationId: 'C-04',
    alternatives: ['crear-discontinuidades-vegetales', 'despejar-accesos']
  },
  {
    id: 'attack-opportunity',
    dimension: 'attackOpportunity',
    preferredActionIds: ['evaluar-quema-tecnica', 'limpiar-margenes-caminos'],
    omittedActionIds: ['limpiar-margenes-caminos'],
    inspectionSceneId: 'prevention-inspection-territory-fuel',
    preparedSceneId: 'crisis-decision-emergency-fuel-break',
    vulnerableSceneId: 'crisis-decision-crown-fire',
    consequenceId: 'attackCapability',
    combinationId: 'C-05',
    alternatives: ['limpiar-margenes-caminos', 'despejar-accesos']
  }
];

function relationFromSpec(session: GameSession, spec: RelationSpec): CausalReportRelation | undefined {
  const selected = session.decisions.filter(
    (decision) =>
      decision.sceneId === spec.inspectionSceneId &&
      spec.preferredActionIds.includes(decision.actionId)
  );
  const sceneEvidence = completedEvidence(session, spec.inspectionSceneId);
  const causeEvidence = unique(
    selected.flatMap((decision) => {
      const favorable = actions
        .get(decision.actionId)
        ?.evidenceIds.filter((evidenceId) => sceneEvidence.includes(evidenceId)) ?? [];
      return decision.actionId === 'evaluar-quema-tecnica' &&
        sceneEvidence.includes('professional-line-feasible')
        ? [...favorable, 'professional-line-feasible']
        : favorable;
    })
  );
  let actionIds = selected.map(({ actionId }) => actionId);
  let decisionSequences = selected.map(({ sequence }) => sequence);
  let execution: PreventionExecution = 'completed';
  if (actionIds.length > 0 && causeEvidence.length === 0) return undefined;
  if (actionIds.length === 0) {
    const omittedEvidence = completedEvidence(session).filter((id) =>
      OFFICIAL_PREVENTION_INSPECTIONS.some((inspection) =>
        inspection.hotspots.some(
          (hotspot) =>
            spec.omittedActionIds.includes(hotspot.action.id) && hotspot.flagIfIgnored === id
        )
      )
    );
    if (omittedEvidence.length === 0) return undefined;
    actionIds = [...spec.omittedActionIds];
    decisionSequences = [];
    causeEvidence.push(...omittedEvidence);
    execution = 'omitted';
  }
  const manifestationSceneId =
    session.crisisBranch === 'prepared' ? spec.preparedSceneId : spec.vulnerableSceneId;
  const manifestationEvidence = completedEvidence(session, manifestationSceneId);
  if (manifestationEvidence.length === 0 || session.inheritedState === null) return undefined;
  const branchDecisive =
    spec.dimension === 'attackOpportunity' ||
    (session.crisisBranch === 'vulnerable' &&
      ['operationalAccess', 'defensibility'].includes(spec.dimension));
  return {
    id: spec.id,
    dimension: spec.dimension,
    branchDecisive,
    cause: {
      inspectionSceneId: spec.inspectionSceneId,
      actionIds: unique(actionIds),
      execution,
      decisionSequences,
      evidenceIds: unique(causeEvidence)
    },
    stateEffect: {
      bandKey: bandKey(spec.dimension, session.inheritedState[spec.dimension]),
      evidenceIds: unique(causeEvidence)
    },
    manifestation: {
      sceneId: manifestationSceneId,
      consequenceId: spec.consequenceId,
      evidenceIds: manifestationEvidence
    },
    ...(spec.combinationId === undefined ? {} : { combinationId: spec.combinationId }),
    alternativeActionIds: spec.alternatives,
    validationClaimIds: ['validated-product-rule'],
    messageKeys: messageKeys(spec.id)
  };
}

export function buildCausalReport(session: GameSession): CausalReportModel {
  if (
    session.progress.currentSceneId !== 'ending-result-causal-report' ||
    session.inheritedState === null ||
    session.crisisBranch === null
  ) {
    throw new VerticalBetaFlowError(
      'invalid-flow-state',
      'The causal report requires the terminal node, InheritedState and a branch.'
    );
  }
  const expectedVariant = session.crisisBranch === 'prepared' ? 'contained' : 'overwhelmed';
  if (session.result !== null && session.result.variant !== expectedVariant) {
    throw new VerticalBetaFlowError('invalid-flow-state', 'Result and branch are inconsistent.');
  }
  const relations = RELATION_SPECS.map((spec) => relationFromSpec(session, spec)).filter(
    (relation): relation is CausalReportRelation => relation !== undefined
  );
  if (relations.length < 3) {
    throw new VerticalBetaFlowError(
      'causal-report-insufficient-evidence',
      'At least three complete causal relations are required.'
    );
  }
  const operationalResponse = session.decisions
    .filter((decision) => decision.sceneId.startsWith('crisis-decision-'))
    .map((decision) => ({
      sceneId: decision.sceneId,
      actionId: decision.actionId,
      decisionSequence: decision.sequence,
      evidenceIds: decisionEvidence(session, decision),
      messageKey: `verticalBeta.report.operation.${decision.sceneId}.${decision.actionId}`
    }));
  return {
    nodeId: 'ending-result-causal-report',
    variant: expectedVariant,
    summaryKey: `verticalBeta.result.summary.${expectedVariant}`,
    relations: relations.slice(0, 5),
    operationalResponse,
    secondaryConsequenceKeys: [],
    closingKey: `verticalBeta.report.closing.${expectedVariant}`
  };
}

function resultEvidence(session: GameSession, report: CausalReportModel): string[] {
  const evidence = new Set<string>();
  const state = session.inheritedState!;
  const preventionEvidence = completedEvidence(session);
  if (state.fuelLoad <= 49 && state.fuelContinuity <= 49) evidence.add('fuel-behavior-buffer');
  if (
    preventionEvidence.includes('vertical-fuel-continuity-reduced') &&
    preventionEvidence.includes('crown-fuel-continuity-reduced') &&
    state.fuelContinuity <= 49
  ) {
    evidence.add('crown-transition-buffer');
  }
  const accessReady =
    preventionEvidence.includes('rural-road-margins-cleared') &&
    preventionEvidence.includes('fire-engine-access-cleared');
  evidence.add(accessReady ? 'territorial-and-local-access-ready' : 'access-chain-unavailable');
  if (report.variant === 'contained') evidence.add('safe-attack-envelope');
  for (const relation of report.relations) {
    for (const id of relation.manifestation.evidenceIds) evidence.add(id);
  }
  return [...evidence];
}

export function completeVerticalBetaResult(session: GameSession): CompletedVerticalBetaResult {
  assertAtScene(session, 'ending-result-causal-report');
  const report = buildCausalReport(session);
  const evidenceIds = resultEvidence(session, report);
  const completedNode = executeGameSessionCommand(session, {
    type: 'complete-scene',
    sceneId: 'ending-result-causal-report',
    evidenceIds
  });
  const completedSession = executeGameSessionCommand(completedNode, {
    type: 'complete-session',
    result: resultForBranch(completedNode.crisisBranch!, evidenceIds)
  });
  return { session: completedSession, report };
}
