import {
  VerticalBetaApplicationError,
  VerticalBetaApplicationService,
  type PresentedResultScene,
  type VerticalBetaApplicationView,
  type VerticalBetaResumeCommand
} from './vertical-beta-application-service.js';
import { VERTICAL_BETA_PREVENTION_SUMMARY } from '../../content/vertical-beta-flow-content.js';
import type { CrisisBranch } from '../../domain/types/game-scene.js';

export const CANONICAL_REFERENCE_RECIPE_VERSION = 1 as const;

const PREPARED_COMMANDS: readonly VerticalBetaResumeCommand[] = [
  { type: 'advance' },
  { type: 'action', actionId: 'gestionar-restos-poda' },
  { type: 'action', actionId: 'crear-discontinuidades-vegetales' },
  { type: 'action', actionId: 'limpiar-margenes-caminos' },
  { type: 'advance' },
  { type: 'action', actionId: 'podar-ramas-y-retirar-seco' },
  { type: 'action', actionId: 'despejar-accesos' },
  { type: 'advance' },
  { type: 'advance' },
  { type: 'action', actionId: 'movilizar-y-verificar' },
  { type: 'advance' },
  { type: 'action', actionId: 'autorizar-maniobra-condicionada' },
  { type: 'advance' },
  { type: 'action', actionId: 'asegurar-flancos-y-repliegue' },
  { type: 'advance' },
  { type: 'action', actionId: 'defender-desde-posicion-segura' },
  { type: 'advance' },
  { type: 'advance' }
];

const VULNERABLE_COMMANDS: readonly VerticalBetaResumeCommand[] = [
  { type: 'advance' },
  { type: 'action', actionId: 'gestionar-restos-poda' },
  { type: 'action', actionId: 'activar-pastoreo-preventivo' },
  { type: 'action', actionId: 'evaluar-quema-tecnica' },
  { type: 'advance' },
  { type: 'action', actionId: 'podar-ramas-y-retirar-seco' },
  { type: 'action', actionId: 'separar-copas' },
  { type: 'advance' },
  { type: 'advance' },
  { type: 'action', actionId: 'movilizar-y-verificar' },
  { type: 'advance' },
  { type: 'action', actionId: 'despejar-corredor-operativo' },
  { type: 'advance' },
  { type: 'action', actionId: 'asegurar-flancos-y-repliegue' },
  { type: 'advance' },
  { type: 'action', actionId: 'replegar-ante-fuego-de-copas' },
  { type: 'advance' },
  { type: 'advance' }
];

export const CANONICAL_REFERENCE_RECIPES = {
  prepared: {
    schemaVersion: CANONICAL_REFERENCE_RECIPE_VERSION,
    branch: 'prepared',
    commands: PREPARED_COMMANDS
  },
  vulnerable: {
    schemaVersion: CANONICAL_REFERENCE_RECIPE_VERSION,
    branch: 'vulnerable',
    commands: VULNERABLE_COMMANDS
  }
} as const;

export interface PresentedReferenceComparisonSide {
  readonly branch: CrisisBranch;
  readonly branchLabel: string;
  readonly resultLabel: string;
  readonly dimensions: readonly {
    id: string;
    label: string;
    value: number;
    stateLabel: string;
  }[];
  readonly manifestations: readonly {
    title: string;
    sceneLabel: string;
    causeLabel: string;
    effect: string;
  }[];
}

export interface PresentedReferenceComparison {
  readonly title: 'Tu partida y otro recorrido de referencia';
  readonly explanation: string;
  readonly current: PresentedReferenceComparisonSide;
  readonly reference: PresentedReferenceComparisonSide;
}

function requireResult(view: VerticalBetaApplicationView): PresentedResultScene {
  if (view.scene.type !== 'result' || view.session.inheritedState === null || view.session.branch === null) {
    throw new VerticalBetaApplicationError(
      'unsupported-command',
      'Reference comparison is available only from the result.'
    );
  }
  return view.scene;
}

export function runCanonicalReference(branch: CrisisBranch): VerticalBetaApplicationView {
  const recipe = CANONICAL_REFERENCE_RECIPES[branch];
  const service = new VerticalBetaApplicationService();
  const view = service.restore(`m4-reference-${branch}-v${recipe.schemaVersion}`, recipe.commands);
  const result = requireResult(view);
  if (view.session.branch !== branch) {
    throw new VerticalBetaApplicationError(
      'unsupported-command',
      `Canonical ${branch} recipe selected ${view.session.branch}.`
    );
  }
  if (
    (branch === 'prepared' && result.variant !== 'contained') ||
    (branch === 'vulnerable' && result.variant !== 'overwhelmed')
  ) {
    throw new VerticalBetaApplicationError(
      'unsupported-command',
      `Canonical ${branch} recipe produced an unexpected result.`
    );
  }
  return view;
}

function comparisonSide(view: VerticalBetaApplicationView): PresentedReferenceComparisonSide {
  const result = requireResult(view);
  const state = view.session.inheritedState!;
  const relationByDimension = new Map(
    result.relations.map((relation) => [relation.dimensionLabel, relation] as const)
  );
  const dimensions = VERTICAL_BETA_PREVENTION_SUMMARY.dimensionOrder.map((id) => {
    const label = result.relations.find((relation) => relation.dimensionLabel && relation.id)?.dimensionLabel;
    const relation = result.relations.find((candidate) => {
      const normalized = candidate.dimensionLabel.toLowerCase();
      return (
        (id === 'fuelLoad' && normalized.includes('carga')) ||
        (id === 'fuelContinuity' && normalized.includes('continuidad')) ||
        (id === 'operationalAccess' && normalized.includes('acceso')) ||
        (id === 'defensibility' && normalized.includes('defensibilidad')) ||
        (id === 'attackOpportunity' && normalized.includes('oportunidad'))
      );
    });
    if (!relation || !label) {
      throw new VerticalBetaApplicationError(
        'unsupported-command',
        `Missing result relation for ${id}.`
      );
    }
    return { id, label: relation.dimensionLabel, value: state[id], stateLabel: relation.stateLabel };
  });
  const manifestations = [...result.relations]
    .sort((left, right) => Number(right.branchDecisive) - Number(left.branchDecisive))
    .slice(0, 3)
    .map((relation) => ({
      title: relation.dimensionLabel,
      sceneLabel: relation.manifestationLabel,
      causeLabel: `${relation.causeType}: ${relation.causeActionLabels.join(' · ')}`,
      effect: relation.effect
    }));
  return {
    branch: view.session.branch!,
    branchLabel: view.session.branch === 'prepared' ? 'Ruta preparada' : 'Ruta vulnerable',
    resultLabel: result.title,
    dimensions,
    manifestations
  };
}

export function buildReferenceComparison(
  currentView: VerticalBetaApplicationView
): PresentedReferenceComparison {
  requireResult(currentView);
  const opposite: CrisisBranch = currentView.session.branch === 'prepared' ? 'vulnerable' : 'prepared';
  const referenceView = runCanonicalReference(opposite);
  return {
    title: 'Tu partida y otro recorrido de referencia',
    explanation:
      'Compara tu recorrido con una referencia canónica del mismo modelo para observar cómo cambian las condiciones y la respuesta.',
    current: comparisonSide(currentView),
    reference: comparisonSide(referenceView)
  };
}
