import {
  CANONICAL_SCENE_IDS,
  type CanonicalSceneId,
  type CrisisBranch,
  type ResultVariant
} from './game-session-contract-base.js';

export const VERTICAL_BETA_NODE_TYPES = [
  'briefing',
  'inspection',
  'summary',
  'decision',
  'router',
  'result'
] as const;

export type VerticalBetaNodeType = (typeof VERTICAL_BETA_NODE_TYPES)[number];

export type VerticalBetaTransitionPredicate =
  | 'scene-completed'
  | 'scene-completed:router-prepared'
  | 'scene-completed:router-vulnerable'
  | 'scene-completed:branch-prepared'
  | 'scene-completed:branch-vulnerable';

export interface VerticalBetaTransition {
  readonly predicate: VerticalBetaTransitionPredicate;
  readonly target: CanonicalSceneId;
}

export interface VerticalBetaFlowNode {
  readonly id: CanonicalSceneId;
  readonly type: VerticalBetaNodeType;
  readonly contentRef: string;
  readonly transitions: readonly VerticalBetaTransition[];
  readonly resultVariants?: readonly ResultVariant[];
}

export const VERTICAL_BETA_ENTRY_ID: CanonicalSceneId = 'intro-briefing-mission';
export const VERTICAL_BETA_TERMINAL_ID: CanonicalSceneId = 'ending-result-causal-report';

/**
 * Reference-only declarative graph for M1. Runtime integration belongs to M2.
 * Content and transition logic are referenced by ID instead of being copied here.
 */
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
    contentRef: 'inspection:p-002-fincas-vegetacion-combustible',
    transitions: [
      { predicate: 'scene-completed', target: 'prevention-inspection-housing-interface' }
    ]
  },
  {
    id: 'prevention-inspection-housing-interface',
    type: 'inspection',
    contentRef: 'inspection:p-001-viviendas-interfaz',
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
      { predicate: 'scene-completed:branch-vulnerable', target: 'crisis-decision-ravine-fire' }
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
      { predicate: 'scene-completed:branch-prepared', target: 'ending-result-causal-report' }
    ]
  },
  {
    id: 'crisis-decision-crown-fire',
    type: 'decision',
    contentRef: 'scenario:s-030-fuego-de-copas',
    transitions: [
      { predicate: 'scene-completed:branch-vulnerable', target: 'ending-result-causal-report' }
    ]
  },
  {
    id: 'ending-result-causal-report',
    type: 'result',
    contentRef: 'result:ending-result-causal-report',
    transitions: [],
    resultVariants: ['contained', 'overwhelmed']
  }
] as const satisfies readonly VerticalBetaFlowNode[];

// Compile-time alignment: changes to the canonical contract must be reflected here.
export const VERTICAL_BETA_CANONICAL_IDS: readonly CanonicalSceneId[] = CANONICAL_SCENE_IDS;

export function transitionAppliesToBranch(
  predicate: VerticalBetaTransitionPredicate,
  branch: CrisisBranch
): boolean {
  return predicate === 'scene-completed' || predicate.endsWith(branch);
}
