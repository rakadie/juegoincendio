import {
  CANONICAL_SCENE_IDS,
  GAME_SCENE_TYPES,
  type CanonicalSceneId,
  type CrisisBranch,
  type GameScene,
  type GameSceneCatalog,
  type GameSceneTransition,
  type GameSceneTransitionPredicate
} from '../domain/types/game-scene.js';

export const VERTICAL_BETA_ENTRY_ID: CanonicalSceneId = 'intro-briefing-mission';
export const VERTICAL_BETA_TERMINAL_ID: CanonicalSceneId =
  'ending-result-causal-report';

export const VERTICAL_BETA_FLOW = [
  {
    id: 'intro-briefing-mission',
    type: 'briefing',
    contentRef: 'briefing:intro-briefing-mission',
    transitions: [
      { predicate: 'scene-completed', target: 'prevention-inspection-territory-fuel' }
    ]
  },
  {
    id: 'prevention-inspection-territory-fuel',
    type: 'inspection',
    contentRef: 'inspection:prevention-inspection-territory-fuel',
    transitions: [
      { predicate: 'scene-completed', target: 'prevention-inspection-housing-interface' }
    ]
  },
  {
    id: 'prevention-inspection-housing-interface',
    type: 'inspection',
    contentRef: 'inspection:prevention-inspection-housing-interface',
    transitions: [{ predicate: 'scene-completed', target: 'transition-summary-prevention' }]
  },
  {
    id: 'transition-summary-prevention',
    type: 'summary',
    contentRef: 'summary:balance-prevencion',
    transitions: [{ predicate: 'scene-completed', target: 'crisis-decision-first-alert' }]
  },
  {
    id: 'crisis-decision-first-alert',
    type: 'decision',
    contentRef: 'scenario:s-040-primer-aviso-incendio',
    transitions: [{ predicate: 'scene-completed', target: 'crisis-router-causal-map' }]
  },
  {
    id: 'crisis-router-causal-map',
    type: 'router',
    contentRef: 'router:m-001-apertura-tres-frentes',
    transitions: [
      {
        predicate: 'scene-completed:router-prepared',
        target: 'crisis-decision-emergency-fuel-break'
      },
      {
        predicate: 'scene-completed:router-vulnerable',
        target: 'crisis-decision-access-blockage'
      }
    ]
  },
  {
    id: 'crisis-decision-emergency-fuel-break',
    type: 'decision',
    contentRef: 'scenario:s-025-cortafuego-emergencia',
    transitions: [
      { predicate: 'scene-completed:branch-prepared', target: 'crisis-decision-ravine-fire' }
    ]
  },
  {
    id: 'crisis-decision-access-blockage',
    type: 'decision',
    contentRef: 'scenario:s-011-corte-carretera-acceso',
    transitions: [
      {
        predicate: 'scene-completed:branch-vulnerable',
        target: 'crisis-decision-ravine-fire'
      }
    ]
  },
  {
    id: 'crisis-decision-ravine-fire',
    type: 'decision',
    contentRef: 'scenario:s-027-fuego-en-barranco',
    transitions: [
      {
        predicate: 'scene-completed:branch-prepared',
        target: 'crisis-decision-housing-defense'
      },
      {
        predicate: 'scene-completed:branch-vulnerable',
        target: 'crisis-decision-crown-fire'
      }
    ]
  },
  {
    id: 'crisis-decision-housing-defense',
    type: 'decision',
    contentRef: 'scenario:s-026-defensa-operativa-nucleo-viviendas',
    transitions: [
      {
        predicate: 'scene-completed:branch-prepared',
        target: 'ending-result-causal-report'
      }
    ]
  },
  {
    id: 'crisis-decision-crown-fire',
    type: 'decision',
    contentRef: 'scenario:s-030-fuego-de-copas',
    transitions: [
      {
        predicate: 'scene-completed:branch-vulnerable',
        target: 'ending-result-causal-report'
      }
    ]
  },
  {
    id: 'ending-result-causal-report',
    type: 'result',
    contentRef: 'result:ending-result-causal-report',
    transitions: [],
    resultVariants: ['contained', 'overwhelmed']
  }
] as const satisfies readonly GameScene[];

export const VERTICAL_BETA_CONTENT = VERTICAL_BETA_FLOW.map((scene) => ({
  ref: scene.contentRef,
  scope: 'official' as const
}));

export const VERTICAL_BETA_CATALOG = {
  scenes: VERTICAL_BETA_FLOW,
  content: VERTICAL_BETA_CONTENT
} as const satisfies GameSceneCatalog;

export const VERTICAL_BETA_CANONICAL_IDS: readonly CanonicalSceneId[] =
  CANONICAL_SCENE_IDS;
export const VERTICAL_BETA_NODE_TYPES = GAME_SCENE_TYPES;

export type VerticalBetaTransition = GameSceneTransition;
export type VerticalBetaTransitionPredicate = GameSceneTransitionPredicate;

export function transitionAppliesToBranch(
  predicate: GameSceneTransitionPredicate,
  branch: CrisisBranch
): boolean {
  return predicate === 'scene-completed' || predicate.endsWith(branch);
}
