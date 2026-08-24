import type {
  CanonicalSceneId,
  CrisisBranch,
  DecisionSceneId,
  ResultVariant
} from '../types/game-scene.js';

export const INHERITED_STATE_KEYS = [
  'fuelLoad',
  'fuelContinuity',
  'operationalAccess',
  'defensibility',
  'attackOpportunity'
] as const;

export interface InheritedState {
  readonly fuelLoad: number;
  readonly fuelContinuity: number;
  readonly operationalAccess: number;
  readonly defensibility: number;
  readonly attackOpportunity: number;
}

export interface GameDecision {
  readonly sequence: number;
  readonly sceneId: DecisionSceneId;
  readonly actionId: string;
}

export interface GameResult {
  readonly variant: ResultVariant;
  readonly evidenceIds: readonly string[];
}

export interface SessionCreatedEvent {
  readonly sequence: number;
  readonly type: 'session-created';
  readonly sessionId: string;
  readonly schemaVersion: 1;
  readonly initialSceneId: 'intro-briefing-mission';
}

export interface DecisionAppliedEvent {
  readonly sequence: number;
  readonly type: 'decision-applied';
  readonly decisionSequence: number;
  readonly sceneId: DecisionSceneId;
  readonly actionId: string;
}

export interface SceneCompletedEvent {
  readonly sequence: number;
  readonly type: 'scene-completed';
  readonly sceneId: CanonicalSceneId;
  readonly evidenceIds: readonly string[];
}

export interface InheritedStateCalculatedEvent {
  readonly sequence: number;
  readonly type: 'inherited-state-calculated';
  readonly state: InheritedState;
  readonly sourceDecisionSequences: readonly number[];
  readonly evidenceIds: readonly string[];
}

export interface CrisisBranchSelectedEvent {
  readonly sequence: number;
  readonly type: 'crisis-branch-selected';
  readonly branch: CrisisBranch;
  readonly nextSceneId:
    | 'crisis-decision-emergency-fuel-break'
    | 'crisis-decision-access-blockage';
  readonly evidenceIds: readonly string[];
}

export interface SceneTransitionedEvent {
  readonly sequence: number;
  readonly type: 'scene-transitioned';
  readonly fromSceneId: CanonicalSceneId;
  readonly toSceneId: CanonicalSceneId;
}

export interface SessionCompletedEvent {
  readonly sequence: number;
  readonly type: 'session-completed';
  readonly result: GameResult;
}

export type GameSessionEvent =
  | SessionCreatedEvent
  | DecisionAppliedEvent
  | SceneCompletedEvent
  | InheritedStateCalculatedEvent
  | CrisisBranchSelectedEvent
  | SceneTransitionedEvent
  | SessionCompletedEvent;

export interface GameSession {
  readonly schemaVersion: 1;
  readonly id: string;
  readonly status: 'active' | 'completed';
  readonly progress: {
    readonly currentSceneId: CanonicalSceneId;
    readonly completedSceneIds: readonly CanonicalSceneId[];
  };
  readonly decisions: readonly GameDecision[];
  readonly inheritedState: InheritedState | null;
  readonly crisisBranch: CrisisBranch | null;
  readonly result: GameResult | null;
  readonly history: readonly GameSessionEvent[];
}

export type GameSessionCommand =
  | {
      readonly type: 'apply-decision';
      readonly sceneId: DecisionSceneId;
      readonly actionId: string;
    }
  | {
      readonly type: 'complete-scene';
      readonly sceneId: CanonicalSceneId;
      readonly evidenceIds: readonly string[];
    }
  | {
      readonly type: 'record-inherited-state';
      readonly state: InheritedState;
      readonly sourceDecisionSequences: readonly number[];
      readonly evidenceIds: readonly string[];
    }
  | {
      readonly type: 'select-crisis-branch';
      readonly branch: CrisisBranch;
      readonly evidenceIds: readonly string[];
    }
  | {
      readonly type: 'transition-scene';
      readonly toSceneId: CanonicalSceneId;
    }
  | {
      readonly type: 'complete-session';
      readonly result: GameResult;
    };
