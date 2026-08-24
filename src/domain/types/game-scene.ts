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

export type CanonicalSceneId = (typeof CANONICAL_SCENE_IDS)[number];
export type GameSceneType = (typeof GAME_SCENE_TYPES)[number];
export type CrisisBranch = (typeof CRISIS_BRANCHES)[number];
export type ResultVariant = (typeof RESULT_VARIANTS)[number];

export const CANONICAL_SCENE_TYPE_BY_ID = {
  'intro-briefing-mission': 'briefing',
  'prevention-inspection-territory-fuel': 'inspection',
  'prevention-inspection-housing-interface': 'inspection',
  'transition-summary-prevention': 'summary',
  'crisis-decision-first-alert': 'decision',
  'crisis-router-causal-map': 'router',
  'crisis-decision-emergency-fuel-break': 'decision',
  'crisis-decision-access-blockage': 'decision',
  'crisis-decision-ravine-fire': 'decision',
  'crisis-decision-housing-defense': 'decision',
  'crisis-decision-crown-fire': 'decision',
  'ending-result-causal-report': 'result'
} as const satisfies Readonly<Record<CanonicalSceneId, GameSceneType>>;

export type GameSceneTransitionPredicate =
  | 'scene-completed'
  | 'scene-completed:router-prepared'
  | 'scene-completed:router-vulnerable'
  | 'scene-completed:branch-prepared'
  | 'scene-completed:branch-vulnerable';

export interface GameSceneTransition {
  readonly predicate: GameSceneTransitionPredicate;
  readonly target: CanonicalSceneId;
}

interface BaseGameScene<TType extends GameSceneType> {
  readonly id: CanonicalSceneId;
  readonly type: TType;
  readonly contentRef: string;
  readonly transitions: readonly GameSceneTransition[];
}

export interface BriefingGameScene extends BaseGameScene<'briefing'> {}
export interface InspectionGameScene extends BaseGameScene<'inspection'> {}
export interface SummaryGameScene extends BaseGameScene<'summary'> {}
export interface DecisionGameScene extends BaseGameScene<'decision'> {}
export interface RouterGameScene extends BaseGameScene<'router'> {}

export interface ResultGameScene extends BaseGameScene<'result'> {
  readonly resultVariants: readonly ResultVariant[];
}

export type GameScene =
  | BriefingGameScene
  | InspectionGameScene
  | SummaryGameScene
  | DecisionGameScene
  | RouterGameScene
  | ResultGameScene;

export interface GameSceneCatalog {
  readonly entryId: CanonicalSceneId;
  readonly terminalId: CanonicalSceneId;
  readonly scenes: readonly GameScene[];
}
