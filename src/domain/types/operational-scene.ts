import type { InheritedState } from '../game-session/game-session.js';
import type {
  EvaluationType,
  ScenarioDifficulty,
  VariableImpact
} from './scenario.js';
import type { CrisisBranch, DecisionSceneId } from './game-scene.js';

export const OPERATIONAL_SCENE_IDS = [
  'crisis-decision-access-blockage',
  'crisis-decision-emergency-fuel-break',
  'crisis-decision-housing-defense',
  'crisis-decision-ravine-fire',
  'crisis-decision-crown-fire'
] as const satisfies readonly DecisionSceneId[];

export type OperationalSceneId = (typeof OPERATIONAL_SCENE_IDS)[number];
export type InheritedStateDimension = keyof InheritedState;
export type OperationalConditionOperator = '<' | '<=' | '>' | '>=' | '===';

export interface OperationalStateCondition {
  readonly dimension: InheritedStateDimension;
  readonly operator: OperationalConditionOperator;
  readonly value: number;
}

export interface OperationalActionRequirements {
  readonly inheritedState?: readonly OperationalStateCondition[];
  readonly priorActionIds?: readonly string[];
}

export interface OperationalActionResolution {
  readonly evidenceIds: readonly string[];
  readonly consequence: string;
}

export interface OperationalAction {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly evaluation: EvaluationType;
  readonly effects: readonly VariableImpact[];
  readonly flags: readonly string[];
  readonly feedback: string;
  readonly requirements?: OperationalActionRequirements;
  readonly blockedReason?: string;
  readonly resolutions: Partial<Readonly<Record<CrisisBranch, OperationalActionResolution>>>;
}

export interface OperationalScene {
  readonly id: OperationalSceneId;
  readonly type: 'decision';
  readonly title: string;
  readonly context: string;
  readonly briefing: string;
  readonly branches: readonly CrisisBranch[];
  readonly difficulty: ScenarioDifficulty;
  readonly difficultyByBranch?: Partial<Readonly<Record<CrisisBranch, ScenarioDifficulty>>>;
  readonly actions: readonly OperationalAction[];
}

export interface ResolvedOperationalAction extends OperationalAction {
  readonly available: boolean;
  readonly unavailableReason?: string;
  readonly resolution?: OperationalActionResolution;
}

export interface OperationalSceneView {
  readonly id: OperationalSceneId;
  readonly type: 'decision';
  readonly title: string;
  readonly context: string;
  readonly briefing: string;
  readonly branch: CrisisBranch;
  readonly difficulty: ScenarioDifficulty;
  readonly inheritedState: InheritedState;
  readonly actions: readonly ResolvedOperationalAction[];
}
