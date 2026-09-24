import { VERTICAL_BETA_VISUAL_COPY_ES } from '../../content/i18n/es/vertical-beta-visual.js';
import { OFFICIAL_PREVENTION_INSPECTIONS } from '../../content/official-prevention-inspections.js';
import { VERTICAL_BETA_DIMENSION_LABELS } from '../../content/vertical-beta-flow-content.js';
import type {
  GameDecision,
  InheritedState
} from '../../domain/game-session/game-session.js';
import type {
  CanonicalSceneId,
  CrisisBranch
} from '../../domain/types/game-scene.js';

export type VisualTemplateId =
  | 'briefing'
  | 'territory'
  | 'housing'
  | 'summary'
  | 'crisis'
  | 'result';

export type VisualElementKind = keyof typeof VERTICAL_BETA_VISUAL_COPY_ES.elements;
export type VisualElementState = keyof typeof VERTICAL_BETA_VISUAL_COPY_ES.states;
export type VisualDimensionState = 'favorable' | 'conditioned' | 'critical';

export interface VisualSessionSource {
  readonly currentSceneId: CanonicalSceneId;
  readonly branch: CrisisBranch | null;
  readonly inheritedState: InheritedState | null;
  readonly decisions: readonly GameDecision[];
}

export interface PresentedVisualElement {
  readonly id: string;
  readonly kind: VisualElementKind;
  readonly label: string;
  readonly state: VisualElementState;
  readonly stateLabel: string;
  readonly actionId?: string;
  readonly selected?: boolean;
  readonly explanation: string;
}

export interface PresentedVisualDimension {
  readonly id: keyof InheritedState;
  readonly label: string;
  readonly value: number;
  readonly state: VisualDimensionState;
  readonly stateLabel: string;
  readonly causeActionLabels: readonly string[];
}

export interface PresentedSceneVisualModel {
  readonly sceneId: CanonicalSceneId;
  readonly templateId: VisualTemplateId;
  readonly ariaLabel: string;
  readonly elements: readonly PresentedVisualElement[];
  readonly dimensions: readonly PresentedVisualDimension[];
}

const actionById = new Map(
  OFFICIAL_PREVENTION_INSPECTIONS.flatMap((inspection) =>
    inspection.hotspots.map(({ action }) => [action.id, action] as const)
  )
);

/** Presentation bands mirror the stable M2 routing interpretation.
 * They never choose a branch; they only translate an already-calculated state for users.
 */
const PRESENTATION_BANDS = {
  lowerFavorableMax: 49,
  lowerConditionedMax: 74,
  higherFavorableMin: 50,
  higherCriticalMax: 24
} as const;

const DIMENSION_STATE_LABELS: Readonly<
  Record<keyof InheritedState, Readonly<Record<VisualDimensionState, string>>>
> = {
  fuelLoad: {
    favorable: 'queda poca',
    conditioned: 'queda bastante',
    critical: 'queda demasiada'
  },
  fuelContinuity: {
    favorable: 'pocos se tocan',
    conditioned: 'algunos se tocan',
    critical: 'muchos se tocan'
  },
  operationalAccess: {
    favorable: 'paso libre',
    conditioned: 'paso difícil',
    critical: 'sin paso seguro'
  },
  defensibility: {
    favorable: 'más fácil',
    conditioned: 'difícil',
    critical: 'muy difícil'
  },
  attackOpportunity: {
    favorable: 'varias opciones',
    conditioned: 'pocas opciones',
    critical: 'casi ninguna opción'
  }
};

const DIMENSION_ACTIONS: Readonly<Record<keyof InheritedState, readonly string[]>> = {
  fuelLoad: [
    'gestionar-restos-poda',
    'activar-pastoreo-preventivo',
    'podar-ramas-y-retirar-seco'
  ],
  fuelContinuity: [
    'crear-discontinuidades-vegetales',
    'limpiar-margenes-caminos',
    'activar-pastoreo-preventivo',
    'podar-ramas-y-retirar-seco',
    'separar-copas'
  ],
  operationalAccess: ['limpiar-margenes-caminos', 'despejar-accesos'],
  defensibility: [
    'crear-discontinuidades-vegetales',
    'separar-copas',
    'despejar-accesos'
  ],
  // Access omissions are intentionally first because they can cap attack opportunity.
  attackOpportunity: [
    'limpiar-margenes-caminos',
    'despejar-accesos',
    'evaluar-quema-tecnica',
    'crear-discontinuidades-vegetales',
    'gestionar-restos-poda',
    'activar-pastoreo-preventivo',
    'podar-ramas-y-retirar-seco',
    'separar-copas'
  ]
};

function selectedIds(session: VisualSessionSource): Set<string> {
  return new Set(session.decisions.map(({ actionId }) => actionId));
}

function visualElement(
  id: string,
  kind: VisualElementKind,
  state: VisualElementState,
  explanation: string,
  actionId?: string,
  selected?: boolean
): PresentedVisualElement {
  return {
    id,
    kind,
    label: VERTICAL_BETA_VISUAL_COPY_ES.elements[kind],
    state,
    stateLabel: VERTICAL_BETA_VISUAL_COPY_ES.states[state],
    ...(actionId === undefined ? {} : { actionId }),
    ...(selected === undefined ? {} : { selected }),
    explanation
  };
}

function preventionState(
  selected: Set<string>,
  actionId: string,
  selectedState: VisualElementState,
  omittedState: VisualElementState
): VisualElementState {
  return selected.has(actionId) ? selectedState : omittedState;
}

function territoryElements(selected: Set<string>): PresentedVisualElement[] {
  return [
    visualElement(
      'territory-residues',
      'residues',
      preventionState(selected, 'gestionar-restos-poda', 'treated', 'untreated'),
      selected.has('gestionar-restos-poda')
        ? 'Las ramas cortadas ya no están en el suelo.'
        : 'Las ramas secas pueden ayudar al fuego a crecer.',
      'gestionar-restos-poda',
      selected.has('gestionar-restos-poda')
    ),
    visualElement(
      'territory-continuity',
      'vegetation',
      preventionState(selected, 'crear-discontinuidades-vegetales', 'broken', 'continuous'),
      selected.has('crear-discontinuidades-vegetales')
        ? 'Hay espacios sin plantas que frenan el paso del fuego.'
        : 'Las plantas están unidas y el fuego puede pasar de una zona a otra.',
      'crear-discontinuidades-vegetales',
      selected.has('crear-discontinuidades-vegetales')
    ),
    visualElement(
      'territory-road',
      'road',
      preventionState(selected, 'limpiar-margenes-caminos', 'clear', 'constrained'),
      selected.has('limpiar-margenes-caminos')
        ? 'El camino tiene sitio para que entren y salgan los bomberos.'
        : 'Las plantas de los bordes dejan poco espacio para pasar.',
      'limpiar-margenes-caminos',
      selected.has('limpiar-margenes-caminos')
    ),
    visualElement(
      'territory-grazing',
      'grazing',
      preventionState(selected, 'activar-pastoreo-preventivo', 'treated', 'untreated'),
      selected.has('activar-pastoreo-preventivo')
        ? 'Los animales han comido parte de la hierba seca.'
        : 'Todavía hay mucha hierba seca que puede arder.',
      'activar-pastoreo-preventivo',
      selected.has('activar-pastoreo-preventivo')
    ),
    visualElement(
      'territory-professional-line',
      'professionalLine',
      preventionState(selected, 'evaluar-quema-tecnica', 'evaluated', 'unevaluated'),
      selected.has('evaluar-quema-tecnica')
        ? 'Una persona experta ha revisado la zona. No se ha quemado nada.'
        : 'Una persona experta aún no ha revisado esta zona.',
      'evaluar-quema-tecnica',
      selected.has('evaluar-quema-tecnica')
    )
  ];
}

function housingElements(selected: Set<string>): PresentedVisualElement[] {
  return [
    visualElement(
      'housing-vertical-fuel',
      'lowVegetation',
      preventionState(selected, 'podar-ramas-y-retirar-seco', 'reduced', 'continuous'),
      selected.has('podar-ramas-y-retirar-seco')
        ? 'Hay menos hierba seca y las ramas bajas se han cortado.'
        : 'El fuego podría subir desde la hierba hasta las ramas bajas.',
      'podar-ramas-y-retirar-seco',
      selected.has('podar-ramas-y-retirar-seco')
    ),
    visualElement(
      'housing-canopy',
      'canopy',
      preventionState(selected, 'separar-copas', 'broken', 'continuous'),
      selected.has('separar-copas')
        ? 'Las copas están separadas y el fuego tiene más difícil saltar entre árboles.'
        : 'Las copas se tocan y el fuego podría pasar de un árbol a otro.',
      'separar-copas',
      selected.has('separar-copas')
    ),
    visualElement(
      'housing-local-access',
      'localAccess',
      preventionState(selected, 'despejar-accesos', 'clear', 'blocked'),
      selected.has('despejar-accesos')
        ? 'El camión de bomberos puede entrar, girar y salir mejor.'
        : 'El camión de bomberos no tiene espacio suficiente para pasar.',
      'despejar-accesos',
      selected.has('despejar-accesos')
    ),
    visualElement(
      'housing-home',
      'house',
      'conditioned',
      'Las mejoras reducen el peligro, pero ninguna casa queda totalmente segura.'
    )
  ];
}

function crisisElements(session: VisualSessionSource): PresentedVisualElement[] {
  const branch = session.branch;
  const sceneId = session.currentSceneId;
  const selected = selectedIds(session);
  const prepared = branch === 'prepared';
  const crown = sceneId === 'crisis-decision-crown-fire';

  const roadState: VisualElementState = prepared
    ? 'clear'
    : sceneId === 'crisis-decision-access-blockage'
      ? 'blocked'
      : 'constrained';
  const attackState: VisualElementState = prepared ? 'viable' : 'unavailable';
  const positionState: VisualElementState = prepared ? 'sustainable' : 'unsustainable';
  const pressureState: VisualElementState = prepared ? 'surface' : 'severe';
  const crownState: VisualElementState = crown ? 'crownFire' : prepared ? 'noCrownFire' : 'crownRisk';
  const capacityState: VisualElementState = prepared ? 'withinCapacity' : crown ? 'exceeded' : 'limited';

  const professionalLineEvaluated = selected.has('evaluar-quema-tecnica');
  const localAccessClear = selected.has('despejar-accesos');

  return [
    visualElement(
      'crisis-road',
      'road',
      roadState,
      prepared
        ? 'El camino permite que los equipos entren y salgan.'
        : 'Lo que quedó sin preparar dificulta el paso de los equipos.'
    ),
    visualElement(
      'crisis-retreat',
      'retreatRoute',
      prepared ? 'viable' : 'limited',
      prepared
        ? 'Los equipos tienen una salida segura.'
        : 'Los equipos deben poder salir antes de quedarse trabajando aquí.'
    ),
    visualElement(
      'crisis-position',
      'operationalPosition',
      positionState,
      prepared
        ? 'Los equipos pueden trabajar aquí sin perder la salida.'
        : 'Trabajar aquí sería demasiado peligroso.'
    ),
    visualElement(
      'crisis-pressure',
      'firePressure',
      pressureState,
      prepared
        ? 'La preparación da más tiempo y espacio para actuar.'
        : 'El fuego fuerte deja menos tiempo para actuar.'
    ),
    visualElement(
      'crisis-attack-window',
      'attackWindow',
      attackState,
      prepared
        ? 'Los equipos pueden acercarse porque tienen entrada y salida.'
        : 'Acercarse al fuego no es seguro en este momento.'
    ),
    visualElement(
      'crisis-crown',
      'crownEscalation',
      crownState,
      crown
        ? 'El fuego ya ha llegado a la parte alta de los árboles.'
        : prepared
          ? 'El fuego todavía no ha llegado a las copas.'
          : 'Las copas unidas facilitan que el fuego suba y avance.',
    ),
    visualElement(
      'crisis-capacity',
      'extinctionCapacity',
      capacityState,
      prepared
        ? 'Los equipos todavía pueden trabajar con seguridad.'
        : crown
          ? 'El fuego en las copas es demasiado peligroso para acercarse.'
          : 'Los equipos tienen pocas opciones, pero la partida aún no ha terminado.',
    ),
    ...(sceneId === 'crisis-decision-emergency-fuel-break'
      ? [
          visualElement(
            'crisis-professional-line',
            'professionalLine',
            professionalLineEvaluated ? 'evaluated' : 'unevaluated',
            professionalLineEvaluated
              ? 'La zona se revisó antes. Ahora hay que comprobar si sigue siendo segura.'
              : 'Esta zona no fue revisada antes del incendio.'
          )
        ]
      : []),
    ...(sceneId === 'crisis-decision-housing-defense'
      ? [
          visualElement(
            'crisis-house-access',
            'localAccess',
            localAccessClear ? 'clear' : 'constrained',
            localAccessClear
              ? 'El camino despejado ayuda a proteger las casas que tienen salida.'
              : 'El camino estrecho dificulta proteger las casas.'
          )
        ]
      : [])
  ];
}

function visualDimensionState(
  dimension: keyof InheritedState,
  value: number
): VisualDimensionState {
  const lowerIsBetter = dimension === 'fuelLoad' || dimension === 'fuelContinuity';
  if (lowerIsBetter) {
    return value <= PRESENTATION_BANDS.lowerFavorableMax
      ? 'favorable'
      : value <= PRESENTATION_BANDS.lowerConditionedMax
        ? 'conditioned'
        : 'critical';
  }
  return value >= PRESENTATION_BANDS.higherFavorableMin
    ? 'favorable'
    : value > PRESENTATION_BANDS.higherCriticalMax
      ? 'conditioned'
      : 'critical';
}

function actionLabel(actionId: string): string | undefined {
  return actionById.get(actionId)?.label;
}

function dimensionCauseLabels(
  id: keyof InheritedState,
  state: VisualDimensionState,
  selected: Set<string>
): string[] {
  const related = DIMENSION_ACTIONS[id];
  const applied = related
    .filter((actionId) => selected.has(actionId))
    .map(actionLabel)
    .filter((label): label is string => label !== undefined);
  if (state === 'favorable') return applied;

  const omitted = related
    .filter((actionId) => !selected.has(actionId))
    .map(actionLabel)
    .filter((label): label is string => label !== undefined)
    .map((label) => `Quedó pendiente: ${label}`);

  const prioritizedOmissions = omitted.slice(0, 2);
  const remainingSlots = Math.max(0, 4 - prioritizedOmissions.length);
  return [...prioritizedOmissions, ...applied.slice(0, remainingSlots)];
}

function dimensionModels(session: VisualSessionSource): PresentedVisualDimension[] {
  if (session.inheritedState === null) return [];
  const selected = selectedIds(session);
  return (Object.keys(VERTICAL_BETA_DIMENSION_LABELS) as Array<keyof InheritedState>).map(
    (id) => {
      const state = visualDimensionState(id, session.inheritedState![id]);
      return {
        id,
        label: VERTICAL_BETA_DIMENSION_LABELS[id],
        value: session.inheritedState![id],
        state,
        stateLabel: DIMENSION_STATE_LABELS[id][state],
        causeActionLabels: dimensionCauseLabels(id, state, selected)
      };
    }
  );
}

function templateFor(sceneId: CanonicalSceneId): VisualTemplateId {
  if (sceneId === 'intro-briefing-mission' || sceneId === 'crisis-decision-first-alert') {
    return 'briefing';
  }
  if (sceneId === 'prevention-inspection-territory-fuel') return 'territory';
  if (sceneId === 'prevention-inspection-housing-interface') return 'housing';
  if (sceneId === 'transition-summary-prevention' || sceneId === 'crisis-router-causal-map') {
    return 'summary';
  }
  if (sceneId === 'ending-result-causal-report') return 'result';
  return 'crisis';
}

export function presentSceneVisualModel(
  session: VisualSessionSource
): PresentedSceneVisualModel {
  const sceneId = session.currentSceneId;
  const selected = selectedIds(session);
  const templateId = templateFor(sceneId);
  const elements =
    templateId === 'territory'
      ? territoryElements(selected)
      : templateId === 'housing'
        ? housingElements(selected)
        : templateId === 'crisis'
          ? crisisElements(session)
          : [];

  return {
    sceneId,
    templateId,
    ariaLabel:
      templateId === 'territory'
        ? 'Mapa de fincas, vegetación y caminos.'
        : templateId === 'housing'
          ? 'Casa junto al monte con árboles, ramas y camino de entrada.'
          : templateId === 'crisis'
            ? 'El incendio y las opciones que tienen los equipos.'
            : templateId === 'summary'
              ? 'Resumen de cómo empieza la emergencia.'
              : templateId === 'result'
                ? 'Resumen de tus decisiones y sus resultados.'
                : 'Misión y primer aviso de incendio.',
    elements,
    dimensions: dimensionModels(session)
  };
}
