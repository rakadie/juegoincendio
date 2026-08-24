import {
  CANONICAL_SCENE_IDS,
  GAME_SCENE_TYPES,
  type CrisisBranch,
  type GameScene,
  type GameSceneTransition,
  type GameSceneTransitionPredicate,
  type GameSceneType
} from '../../src/domain/types/game-scene.js';
import {
  VERTICAL_BETA_ENTRY_ID,
  VERTICAL_BETA_SCENES,
  VERTICAL_BETA_TERMINAL_ID
} from '../../src/content/vertical-beta-flow.js';

/**
 * Compatibility facade for the M1 tests and documentation.
 * The production catalog in src/content/vertical-beta-flow.ts is authoritative.
 */
export const VERTICAL_BETA_NODE_TYPES = GAME_SCENE_TYPES;
export type VerticalBetaNodeType = GameSceneType;
export type VerticalBetaTransitionPredicate = GameSceneTransitionPredicate;
export type VerticalBetaTransition = GameSceneTransition;
export type VerticalBetaFlowNode = GameScene;

export { VERTICAL_BETA_ENTRY_ID, VERTICAL_BETA_TERMINAL_ID };
export const VERTICAL_BETA_FLOW = VERTICAL_BETA_SCENES;
export const VERTICAL_BETA_CANONICAL_IDS = CANONICAL_SCENE_IDS;

export function transitionAppliesToBranch(
  predicate: VerticalBetaTransitionPredicate,
  branch: CrisisBranch
): boolean {
  return predicate === 'scene-completed' || predicate.endsWith(branch);
}
