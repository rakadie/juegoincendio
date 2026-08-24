export const CANONICAL_SCENE_IDS = [
  'intro-briefing-mission',
  'prevention-inspection-territory-fuel',
  'prevention-inspection-housing-interface',
  'transition-summary-prevention',
  'crisis-decision-first-alert',
  'crisis-router-causal-map',
  'crisis-decision-emergency-fuel-break',
  'crisis-decision-access-blockage',
  'crisis-decision-ravine-fire',
  'crisis-decision-housing-defense',
  'crisis-decision-crown-fire',
  'ending-result-causal-report'
] as const;

export const DECISION_SCENE_IDS = [
  'prevention-inspection-territory-fuel',
  'prevention-inspection-housing-interface',
  'crisis-decision-first-alert',
  'crisis-decision-emergency-fuel-break',
  'crisis-decision-access-blockage',
  'crisis-decision-ravine-fire',
  'crisis-decision-housing-defense',
  'crisis-decision-crown-fire'
] as const;

export const GAME_SCENE_TYPES = [
  'briefing',
  'inspection',
  'summary',
  'decision',
  'router',
  'result'
] as const;

export const CRISIS_BRANCHES = ['prepared', 'vulnerable'] as const;
export const RESULT_VARIANTS = ['contained', 'overwhelmed'] as const;

export const GAME_SCENE_TRANSITION_PREDICATES = [
  'scene-completed',
  'scene-completed:router-prepared',
  'scene-completed:router-vulnerable',
  'scene-completed:branch-prepared',
  'scene-completed:branch-vulnerable'
] as const;

export type CanonicalSceneId = (typeof CANONICAL_SCENE_IDS)[number];
export type DecisionSceneId = (typeof DECISION_SCENE_IDS)[number];
export type GameSceneType = (typeof GAME_SCENE_TYPES)[number];
export type CrisisBranch = (typeof CRISIS_BRANCHES)[number];
export type ResultVariant = (typeof RESULT_VARIANTS)[number];
export type GameSceneTransitionPredicate =
  (typeof GAME_SCENE_TRANSITION_PREDICATES)[number];

export interface GameSceneTransition {
  readonly predicate: GameSceneTransitionPredicate;
  readonly target: CanonicalSceneId;
}

interface GameSceneBase<TType extends GameSceneType, TContentRef extends string> {
  readonly id: CanonicalSceneId;
  readonly type: TType;
  readonly contentRef: TContentRef;
  readonly transitions: readonly GameSceneTransition[];
}

export interface BriefingGameScene
  extends GameSceneBase<'briefing', `briefing:${string}`> {
  readonly resultVariants?: never;
}

export interface InspectionGameScene
  extends GameSceneBase<'inspection', `inspection:${string}`> {
  readonly resultVariants?: never;
}

export interface SummaryGameScene extends GameSceneBase<'summary', `summary:${string}`> {
  readonly resultVariants?: never;
}

export interface DecisionGameScene
  extends GameSceneBase<'decision', `scenario:${string}`> {
  readonly resultVariants?: never;
}

export interface RouterGameScene extends GameSceneBase<'router', `router:${string}`> {
  readonly resultVariants?: never;
}

export interface ResultGameScene extends GameSceneBase<'result', `result:${string}`> {
  readonly transitions: readonly [];
  readonly resultVariants: readonly ResultVariant[];
}

export type GameScene =
  | BriefingGameScene
  | InspectionGameScene
  | SummaryGameScene
  | DecisionGameScene
  | RouterGameScene
  | ResultGameScene;

export type GameContentScope = 'official' | 'library' | 'archive';

export interface GameContentReference {
  readonly ref: string;
  readonly scope: GameContentScope;
}

export interface GameSceneCatalog {
  readonly scenes: readonly GameScene[];
  readonly content: readonly GameContentReference[];
}
