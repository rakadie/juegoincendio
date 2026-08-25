import { VERTICAL_BETA_I18N_ES } from '../../content/i18n/es/vertical-beta.js';
import { requireVerticalBetaSceneMessages } from '../../content/i18n/vertical-beta-i18n.js';
import {
  getOfficialPreventionInspection,
  OFFICIAL_PREVENTION_INSPECTIONS,
  type PreventionInspectionSceneId
} from '../../content/official-prevention-inspections.js';
import { OFFICIAL_OPERATIONAL_SCENES } from '../../content/official-operational-scenes.js';
import {
  VERTICAL_BETA_BRIEFING,
  VERTICAL_BETA_CAUSAL_RELATION_CONTENT,
  VERTICAL_BETA_CAUSAL_ROUTER,
  VERTICAL_BETA_DIMENSION_LABELS,
  VERTICAL_BETA_FIRST_ALERT,
  VERTICAL_BETA_PREVENTION_SUMMARY,
  VERTICAL_BETA_RESULT_ADVANCE_LABEL,
  VERTICAL_BETA_RESULT_VARIANTS
} from '../../content/vertical-beta-flow-content.js';
import {
  createGameSession,
  executeGameSessionCommand
} from '../../domain/game-session/game-session-engine.js';
import type {
  GameDecision,
  GameSession,
  GameSessionEvent,
  InheritedState
} from '../../domain/game-session/game-session.js';
import {
  getOperationalSceneView,
  resolveOperationalDecision
} from '../../domain/operations/operational-scene-engine.js';
import {
  applyPreventionInspectionAction,
  completePreventionInspection
} from '../../domain/prevention/prevention-inspection-engine.js';
import type {
  CanonicalSceneId,
  CrisisBranch,
  GameSceneType,
  ResultVariant
} from '../../domain/types/game-scene.js';
import {
  OPERATIONAL_SCENE_IDS,
  type OperationalSceneId
} from '../../domain/types/operational-scene.js';
import {
  advanceAfterOperationalScene,
  buildCausalReport,
  completeBriefing,
  completePreventionSummary,
  completeVerticalBetaResult,
  recordPreventionBalance,
  resolveCausalRouter,
  resolveFirstAlert
} from '../../domain/vertical-beta/vertical-beta-flow-engine.js';

export type VerticalBetaApplicationErrorCode = 'session-not-found' | 'unsupported-command';

export class VerticalBetaApplicationError extends Error {
  constructor(
    readonly code: VerticalBetaApplicationErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'VerticalBetaApplicationError';
  }
}

export interface PresentedAction {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly selected: boolean;
  readonly available: boolean;
  readonly unavailableReason?: string;
}

interface PresentedSceneBase<TType extends GameSceneType> {
  readonly id: CanonicalSceneId;
  readonly type: TType;
  readonly title: string;
  readonly body: string;
  readonly canAdvance: boolean;
  readonly advanceLabel?: string;
}

export interface PresentedBriefingScene extends PresentedSceneBase<'briefing'> {
  readonly mission: string;
}

export interface PresentedInspectionScene extends PresentedSceneBase<'inspection'> {
  readonly objective: string;
  readonly actionQuota: number;
  readonly selectedCount: number;
  readonly actions: readonly PresentedAction[];
}

export interface PresentedSummaryScene extends PresentedSceneBase<'summary'> {
  readonly dimensions: readonly {
    id: keyof InheritedState;
    label: string;
    value: number;
  }[];
}

export interface PresentedDecisionScene extends PresentedSceneBase<'decision'> {
  readonly context: string;
  readonly difficulty?: string;
  readonly actions: readonly PresentedAction[];
  readonly feedback?: string;
}

export interface PresentedRouterScene extends PresentedSceneBase<'router'> {
  readonly automatic: true;
}

export interface PresentedResultScene extends PresentedSceneBase<'result'> {
  readonly variant: ResultVariant;
  readonly closing: string;
  readonly relations: readonly {
    id: string;
    title: string;
    effect: string;
    causeActionLabels: readonly string[];
    manifestationSceneId: CanonicalSceneId;
    branchDecisive: boolean;
  }[];
}

export type PresentedVerticalBetaScene =
  | PresentedBriefingScene
  | PresentedInspectionScene
  | PresentedSummaryScene
  | PresentedDecisionScene
  | PresentedRouterScene
  | PresentedResultScene;

export interface VerticalBetaSessionView {
  readonly id: string;
  readonly status: GameSession['status'];
  readonly currentSceneId: CanonicalSceneId;
  readonly completedSceneIds: readonly CanonicalSceneId[];
  readonly branch: CrisisBranch | null;
  readonly inheritedState: InheritedState | null;
  readonly result: GameSession['result'];
  readonly decisions: readonly GameDecision[];
  readonly decisionReview: readonly {
    sceneId: CanonicalSceneId;
    actionId: string;
    label: string;
  }[];
  readonly history: readonly GameSessionEvent[];
  readonly preventionReview: readonly {
    sceneId: PreventionInspectionSceneId;
    actionId: string;
    label: string;
  }[];
}

export interface VerticalBetaApplicationView {
  readonly session: VerticalBetaSessionView;
  readonly scene: PresentedVerticalBetaScene;
}

const preventionActions = new Map(
  OFFICIAL_PREVENTION_INSPECTIONS.flatMap((inspection) =>
    inspection.hotspots.map((hotspot) => [
      hotspot.action.id,
      { sceneId: inspection.id, action: hotspot.action }
    ] as const)
  )
);

function isInspectionScene(sceneId: CanonicalSceneId): sceneId is PreventionInspectionSceneId {
  return (
    sceneId === 'prevention-inspection-territory-fuel' ||
    sceneId === 'prevention-inspection-housing-interface'
  );
}

function isOperationalScene(sceneId: CanonicalSceneId): sceneId is OperationalSceneId {
  return (OPERATIONAL_SCENE_IDS as readonly CanonicalSceneId[]).includes(sceneId);
}

function actionLabel(actionId: string): string {
  const prevention = preventionActions.get(actionId)?.action.label;
  if (prevention !== undefined) return prevention;
  const operational = OFFICIAL_OPERATIONAL_SCENES.flatMap(({ actions }) => actions).find(
    ({ id }) => id === actionId
  )?.label;
  if (operational !== undefined) return operational;
  const firstAlert = VERTICAL_BETA_FIRST_ALERT.actions.find(({ id }) => id === actionId)?.label;
  if (firstAlert !== undefined) return firstAlert;
  throw new VerticalBetaApplicationError(
    'unsupported-command',
    `Missing official translation for action ${actionId}.`
  );
}

function sessionView(session: GameSession): VerticalBetaSessionView {
  return {
    id: session.id,
    status: session.status,
    currentSceneId: session.progress.currentSceneId,
    completedSceneIds: session.progress.completedSceneIds,
    branch: session.crisisBranch,
    inheritedState: session.inheritedState,
    result: session.result,
    decisions: session.decisions,
    decisionReview: session.decisions.map((decision) => ({
      sceneId: decision.sceneId,
      actionId: decision.actionId,
      label: actionLabel(decision.actionId)
    })),
    history: session.history,
    preventionReview: session.decisions.flatMap((decision) => {
      const entry = preventionActions.get(decision.actionId);
      return entry === undefined
        ? []
        : [{ sceneId: entry.sceneId, actionId: decision.actionId, label: entry.action.label }];
    })
  };
}

function selectedIds(session: GameSession, sceneId: CanonicalSceneId): Set<string> {
  return new Set(
    session.decisions
      .filter((decision) => decision.sceneId === sceneId)
      .map(({ actionId }) => actionId)
  );
}

function presentInspection(
  session: GameSession,
  sceneId: PreventionInspectionSceneId
): PresentedInspectionScene {
  const inspection = getOfficialPreventionInspection(sceneId);
  const copy = requireVerticalBetaSceneMessages(VERTICAL_BETA_I18N_ES, sceneId);
  const selected = selectedIds(session, sceneId);
  return {
    id: sceneId,
    type: 'inspection',
    title: inspection.title,
    body: inspection.intro,
    objective: inspection.objective,
    actionQuota: inspection.maxActions,
    selectedCount: selected.size,
    actions: inspection.hotspots.map(({ action }) => ({
      id: action.id,
      label: action.shortLabel ?? action.label,
      description: action.description ?? action.feedback,
      selected: selected.has(action.id),
      available: !selected.has(action.id) && selected.size < inspection.maxActions
    })),
    canAdvance: selected.size === inspection.maxActions,
    advanceLabel: copy.advanceLabel!
  };
}

function presentOperationalDecision(session: GameSession): PresentedDecisionScene {
  const view = getOperationalSceneView(session);
  const copy = requireVerticalBetaSceneMessages(VERTICAL_BETA_I18N_ES, view.id);
  const selected = session.decisions.find(({ sceneId }) => sceneId === view.id);
  const selectedAction = view.actions.find(({ id }) => id === selected?.actionId);
  const completed = session.progress.completedSceneIds.includes(view.id);
  return {
    id: view.id,
    type: 'decision',
    title: view.title,
    body: view.briefing,
    context: view.context,
    difficulty: view.difficulty,
    actions: view.actions.map((action) => ({
      id: action.id,
      label: action.label,
      description: action.description,
      selected: action.id === selected?.actionId,
      available: !completed && action.available,
      ...(action.unavailableReason === undefined
        ? {}
        : { unavailableReason: action.unavailableReason })
    })),
    ...(selectedAction?.resolution?.consequence === undefined
      ? {}
      : { feedback: selectedAction.resolution.consequence }),
    canAdvance: completed,
    advanceLabel: copy.advanceLabel!
  };
}

function presentResult(session: GameSession): PresentedResultScene {
  const report = buildCausalReport(session);
  const content = VERTICAL_BETA_RESULT_VARIANTS[report.variant];
  return {
    id: 'ending-result-causal-report',
    type: 'result',
    title: content.title,
    body: content.summary,
    variant: report.variant,
    closing: content.closing,
    relations: report.relations.map((relation) => {
      const copy = VERTICAL_BETA_CAUSAL_RELATION_CONTENT[
        relation.id as keyof typeof VERTICAL_BETA_CAUSAL_RELATION_CONTENT
      ];
      return {
        id: relation.id,
        title: copy.title,
        effect: copy.effect,
        causeActionLabels: relation.cause.actionIds.map(actionLabel),
        manifestationSceneId: relation.manifestation.sceneId,
        branchDecisive: relation.branchDecisive
      };
    }),
    canAdvance: session.status === 'active',
    ...(session.status === 'active'
      ? { advanceLabel: VERTICAL_BETA_RESULT_ADVANCE_LABEL }
      : {})
  };
}

function presentScene(session: GameSession): PresentedVerticalBetaScene {
  const sceneId = session.progress.currentSceneId;
  if (sceneId === 'intro-briefing-mission') {
    return {
      ...VERTICAL_BETA_BRIEFING,
      mission: VERTICAL_BETA_BRIEFING.body,
      canAdvance: true,
      advanceLabel: VERTICAL_BETA_BRIEFING.continueLabel
    };
  }
  if (isInspectionScene(sceneId)) return presentInspection(session, sceneId);
  if (sceneId === 'transition-summary-prevention') {
    if (session.inheritedState === null) {
      throw new VerticalBetaApplicationError(
        'unsupported-command',
        'The summary requires InheritedState.'
      );
    }
    return {
      id: sceneId,
      type: 'summary',
      title: VERTICAL_BETA_PREVENTION_SUMMARY.title,
      body: VERTICAL_BETA_PREVENTION_SUMMARY.body,
      dimensions: VERTICAL_BETA_PREVENTION_SUMMARY.dimensionOrder.map((id) => ({
        id,
        label: VERTICAL_BETA_DIMENSION_LABELS[id],
        value: session.inheritedState![id]
      })),
      canAdvance: true,
      advanceLabel: VERTICAL_BETA_PREVENTION_SUMMARY.continueLabel
    };
  }
  if (sceneId === 'crisis-decision-first-alert') {
    return {
      id: sceneId,
      type: 'decision',
      title: VERTICAL_BETA_FIRST_ALERT.title,
      body: VERTICAL_BETA_FIRST_ALERT.prompt,
      context: VERTICAL_BETA_FIRST_ALERT.context,
      actions: VERTICAL_BETA_FIRST_ALERT.actions.map((action) => ({
        id: action.id,
        label: action.label,
        description: action.description,
        selected: false,
        available: true
      })),
      canAdvance: false
    };
  }
  if (sceneId === 'crisis-router-causal-map') {
    return {
      id: sceneId,
      type: 'router',
      title: VERTICAL_BETA_CAUSAL_ROUTER.title,
      body: VERTICAL_BETA_CAUSAL_ROUTER.body,
      automatic: true,
      canAdvance: true,
      advanceLabel: VERTICAL_BETA_CAUSAL_ROUTER.continueLabel
    };
  }
  if (isOperationalScene(sceneId)) return presentOperationalDecision(session);
  if (sceneId === 'ending-result-causal-report') return presentResult(session);
  const exhaustive: never = sceneId;
  throw new VerticalBetaApplicationError(
    'unsupported-command',
    `Unsupported scene ${exhaustive}.`
  );
}

export class VerticalBetaApplicationService {
  private readonly sessions = new Map<string, GameSession>();

  create(sessionId: string): VerticalBetaApplicationView {
    const session = createGameSession(sessionId);
    this.sessions.set(sessionId, session);
    return this.view(sessionId);
  }

  restart(sessionId: string): VerticalBetaApplicationView {
    return this.create(sessionId);
  }

  view(sessionId: string): VerticalBetaApplicationView {
    const session = this.requireSession(sessionId);
    return { session: sessionView(session), scene: presentScene(session) };
  }

  applyAction(sessionId: string, actionId: string): VerticalBetaApplicationView {
    const session = this.requireSession(sessionId);
    const sceneId = session.progress.currentSceneId;
    let next: GameSession;
    if (isInspectionScene(sceneId)) {
      next = applyPreventionInspectionAction(session, actionId);
    } else if (sceneId === 'crisis-decision-first-alert') {
      next = resolveFirstAlert(session, actionId);
    } else if (isOperationalScene(sceneId)) {
      next = resolveOperationalDecision(session, actionId).session;
    } else {
      throw new VerticalBetaApplicationError(
        'unsupported-command',
        `${sceneId} does not accept player actions.`
      );
    }
    this.sessions.set(sessionId, next);
    return this.view(sessionId);
  }

  advance(sessionId: string): VerticalBetaApplicationView {
    const session = this.requireSession(sessionId);
    const sceneId = session.progress.currentSceneId;
    let next: GameSession;
    switch (sceneId) {
      case 'intro-briefing-mission':
        next = completeBriefing(session);
        break;
      case 'prevention-inspection-territory-fuel': {
        const completed = completePreventionInspection(session).session;
        next = executeGameSessionCommand(completed, {
          type: 'transition-scene',
          toSceneId: 'prevention-inspection-housing-interface'
        });
        break;
      }
      case 'prevention-inspection-housing-interface': {
        const completed = completePreventionInspection(session).session;
        next = recordPreventionBalance(completed).session;
        break;
      }
      case 'transition-summary-prevention':
        next = completePreventionSummary(session);
        break;
      case 'crisis-router-causal-map':
        next = resolveCausalRouter(session).session;
        break;
      case 'crisis-decision-emergency-fuel-break':
      case 'crisis-decision-access-blockage':
      case 'crisis-decision-ravine-fire':
      case 'crisis-decision-housing-defense':
      case 'crisis-decision-crown-fire':
        next = advanceAfterOperationalScene(session);
        break;
      case 'ending-result-causal-report':
        next = completeVerticalBetaResult(session).session;
        break;
      case 'crisis-decision-first-alert':
        throw new VerticalBetaApplicationError(
          'unsupported-command',
          'The first alert requires a player decision.'
        );
    }
    this.sessions.set(sessionId, next);
    return this.view(sessionId);
  }

  private requireSession(sessionId: string): GameSession {
    const session = this.sessions.get(sessionId);
    if (session === undefined) {
      throw new VerticalBetaApplicationError(
        'session-not-found',
        `Session ${sessionId} was not found.`
      );
    }
    return session;
  }
}
