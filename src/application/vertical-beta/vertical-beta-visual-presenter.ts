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
  attackOpportunity: [
    'gestionar-restos-poda',
    'crear-discontinuidades-vegetales',
    'limpiar-margenes-caminos',
    'activar-pastoreo-preventivo',
    'evaluar-quema-tecnica',
    'podar-ramas-y-retirar-seco',
    'separar-copas',
    'despejar-accesos'
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
        ? 'Los restos se han retirado o procesado.'
        : 'Los restos siguen disponibles como combustible acumulado.',
      'gestionar-restos-poda',
      selected.has('gestionar-restos-poda')
    ),
    visualElement(
      'territory-continuity',
      'vegetation',
      preventionState(selected, 'crear-discontinuidades-vegetales', 'broken', 'continuous'),
      selected.has('crear-discontinuidades-vegetales')
        ? 'La continuidad entre sectores queda interrumpida.'
        : 'La vegetación sigue conectando parcelas y ladera.',
      'crear-discontinuidades-vegetales',
      selected.has('crear-discontinuidades-vegetales')
    ),
    visualElement(
      'territory-road',
      'road',
      preventionState(selected, 'limpiar-margenes-caminos', 'clear', 'constrained'),
      selected.has('limpiar-margenes-caminos')
        ? 'El camino conserva anchura útil para entrada y repliegue.'
        : 'Los márgenes reducen el corredor operativo.',
      'limpiar-margenes-caminos',
      selected.has('limpiar-margenes-caminos')
    ),
    visualElement(
      'territory-grazing',
      'grazing',
      preventionState(selected, 'activar-pastoreo-preventivo', 'treated', 'untreated'),
      selected.has('activar-pastoreo-preventivo')
        ? 'La franja prioritaria muestra menos combustible fino.'
        : 'La franja mantiene combustible fino disponible.',
      'activar-pastoreo-preventivo',
      selected.has('activar-pastoreo-preventivo')
    ),
    visualElement(
      'territory-professional-line',
      'professionalLine',
      preventionState(selected, 'evaluar-quema-tecnica', 'evaluated', 'unevaluated'),
      selected.has('evaluar-quema-tecnica')
        ? 'La posición ha sido evaluada; no significa que la maniobra se haya ejecutado.'
        : 'La posible posición estratégica sigue sin evaluación profesional.',
      'evaluar-quema-tecnica',
      selected.has('evaluar-quema-tecnica')
    )
  ];
}

function housingElements(selected: Set<string>): PresentedVisualElement[] {
  return [
    visualElement(
      'housing-vertical-fuel',
      'vegetation',
      preventionState(selected, 'podar-ramas-y-retirar-seco', 'reduced', 'continuous'),
      selected.has('podar-ramas-y-retirar-seco')
        ? 'La escalera vertical se reduce y la biomasa se gestiona.'
        : 'Las ramas bajas mantienen continuidad vertical junto a la vivienda.',
      'podar-ramas-y-retirar-seco',
      selected.has('podar-ramas-y-retirar-seco')
    ),
    visualElement(
      'housing-canopy',
      'canopy',
      preventionState(selected, 'separar-copas', 'broken', 'continuous'),
      selected.has('separar-copas')
        ? 'Las copas quedan separadas y pierden continuidad horizontal.'
        : 'Las copas siguen conectadas junto a la vivienda.',
      'separar-copas',
      selected.has('separar-copas')
    ),
    visualElement(
      'housing-local-access',
      'localAccess',
      preventionState(selected, 'despejar-accesos', 'clear', 'blocked'),
      selected.has('despejar-accesos')
        ? 'Entrada, maniobra y salida local quedan disponibles.'
        : 'El acceso local sigue comprometido para una autobomba.',
      'despejar-accesos',
      selected.has('despejar-accesos')
    ),
    visualElement(
      'housing-home',
      'house',
      'conditioned',
      'El tratamiento mejora condiciones; no garantiza que la vivienda sea defendible.'
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
  const crownState: VisualElementState = crown ? 'crownFire' : prepared ? 'reduced' : 'crownRisk';
  const capacityState: VisualElementState = prepared ? 'withinCapacity' : 'exceeded';

  const professionalLineEvaluated = selected.has('evaluar-quema-tecnica');
  const localAccessClear = selected.has('despejar-accesos');

  return [
    visualElement(
      'crisis-road',
      'road',
      roadState,
      prepared
        ? 'La cadena de acceso permite aproximación y repliegue.'
        : 'La movilidad operativa está limitada por el estado heredado.'
    ),
    visualElement(
      'crisis-retreat',
      'retreatRoute',
      prepared ? 'viable' : 'limited',
      prepared
        ? 'Existe una ruta de repliegue identificable.'
        : 'La retirada condiciona cualquier intento de sostener posición.'
    ),
    visualElement(
      'crisis-position',
      'operationalPosition',
      positionState,
      prepared
        ? 'La posición puede sostenerse dentro del modelo del juego.'
        : 'La posición no puede sostenerse con seguridad.'
    ),
    visualElement(
      'crisis-pressure',
      'firePressure',
      pressureState,
      prepared
        ? 'La prevención conserva margen operativo frente a la presión del fuego.'
        : 'La presión del fuego reduce el margen de actuación.'
    ),
    visualElement(
      'crisis-attack-window',
      'attackWindow',
      attackState,
      prepared
        ? 'Existe una ventana de ataque compatible con acceso y repliegue.'
        : 'La ventana de ataque directo no está disponible.'
    ),
    visualElement(
      'crisis-crown',
      'crownEscalation',
      crownState,
      crown
        ? 'La escalada a copas ya se manifiesta en esta escena.'
        : prepared
          ? 'La continuidad tratada reduce la escalada visible.'
          : 'La continuidad mantiene riesgo de escalada a copas.'
    ),
    visualElement(
      'crisis-capacity',
      'extinctionCapacity',
      capacityState,
      prepared
        ? 'La respuesta permanece dentro de capacidad en la partida de referencia.'
        : 'La respuesta queda superada en la partida vulnerable de referencia.'
    ),
    ...(sceneId === 'crisis-decision-emergency-fuel-break'
      ? [
          visualElement(
            'crisis-professional-line',
            'professionalLine',
            professionalLineEvaluated ? 'evaluated' : 'unevaluated',
            professionalLineEvaluated
              ? 'La posición fue evaluada en prevención; su uso sigue condicionado por la crisis.'
              : 'No existe evidencia preventiva de evaluación profesional.'
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
              ? 'El acceso local despejado facilita la defensa selectiva.'
              : 'La defensa sigue condicionada por el acceso local.'
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
    return value <= 49 ? 'favorable' : value <= 74 ? 'conditioned' : 'critical';
  }
  return value >= 50 ? 'favorable' : value >= 25 ? 'conditioned' : 'critical';
}

function dimensionModels(session: VisualSessionSource): PresentedVisualDimension[] {
  if (session.inheritedState === null) return [];
  const selected = selectedIds(session);
  return (Object.keys(VERTICAL_BETA_DIMENSION_LABELS) as Array<keyof InheritedState>).map(
    (id) => {
      const state = visualDimensionState(id, session.inheritedState![id]);
      const causeActionLabels = DIMENSION_ACTIONS[id]
        .filter((actionId) => selected.has(actionId))
        .map((actionId) => actionById.get(actionId)?.label)
        .filter((label): label is string => label !== undefined);
      return {
        id,
        label: VERTICAL_BETA_DIMENSION_LABELS[id],
        value: session.inheritedState![id],
        state,
        stateLabel: VERTICAL_BETA_VISUAL_COPY_ES.states[state],
        causeActionLabels
      };
    }
  );
}

function templateFor(sceneId: CanonicalSceneId): VisualTemplateId {
  if (sceneId === 'intro-briefing-mission') return 'briefing';
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
        ? 'Estado visual del territorio y el combustible.'
        : templateId === 'housing'
          ? 'Estado visual de la vivienda y su interfaz con la vegetación.'
          : templateId === 'crisis'
            ? 'Manifestaciones visuales de las condiciones operativas durante la crisis.'
            : templateId === 'summary'
              ? 'Resumen visual de las condiciones heredadas por la emergencia.'
              : templateId === 'result'
                ? 'Resumen visual de la cadena causal de la partida.'
                : 'Misión de la Vertical Beta 1.',
    elements,
    dimensions: dimensionModels(session)
  };
}
