import type { InheritedState } from '../domain/game-session/game-session.js';
import type { DecisionSceneId } from '../domain/types/game-scene.js';
import type {
  PreventionInspectionAction,
  PreventionInspectionHotspot,
  PreventionInspectionScreen
} from '../domain/types/prevention-inspection.js';

export type PreventionInspectionSceneId = Extract<
  DecisionSceneId,
  'prevention-inspection-territory-fuel' | 'prevention-inspection-housing-interface'
>;

export type PreventionInheritedStateImpact = Partial<InheritedState>;

export interface OfficialPreventionInspectionAction extends PreventionInspectionAction {
  inheritedStateImpact: PreventionInheritedStateImpact;
  evidenceIds: string[];
}

export interface OfficialPreventionInspectionHotspot extends PreventionInspectionHotspot {
  action: OfficialPreventionInspectionAction;
  flagIfIgnored: string;
}

export interface OfficialPreventionInspectionScreen
  extends Omit<PreventionInspectionScreen, 'id' | 'maxActions' | 'hotspots' | 'combos'> {
  id: PreventionInspectionSceneId;
  maxActions: 2 | 3;
  hotspots: OfficialPreventionInspectionHotspot[];
  combos: [];
}

interface OfficialActionContract {
  readonly id: string;
  readonly title: string;
  readonly label: string;
  readonly shortLabel: string;
  readonly description: string;
  readonly feedback: string;
  readonly position: { readonly x: number; readonly y: number };
  readonly inheritedStateImpact: PreventionInheritedStateImpact;
  readonly evidenceIds: string[];
  readonly conditionIfOmitted: string;
}

function hotspot(contract: OfficialActionContract): OfficialPreventionInspectionHotspot {
  return {
    id: contract.id,
    title: contract.title,
    position: { ...contract.position },
    visualHint: contract.title,
    description: contract.description,
    flagIfIgnored: contract.conditionIfOmitted,
    futureConsequence: `La condición ${contract.conditionIfOmitted} permanece durante la emergencia.`,
    action: {
      id: contract.id,
      label: contract.label,
      shortLabel: contract.shortLabel,
      description: contract.description,
      impact: {},
      flagsOnApply: [],
      feedback: contract.feedback,
      inheritedStateImpact: { ...contract.inheritedStateImpact },
      evidenceIds: [...contract.evidenceIds]
    }
  };
}

const TERRITORY_ACTIONS: OfficialActionContract[] = [
  {
    id: 'gestionar-restos-poda',
    title: 'Restos de poda acumulados',
    label: 'Retirar o procesar los restos de poda',
    shortLabel: 'Gestionar restos de poda',
    description: 'Retira o tritura los restos secos para que no aumenten la energía disponible para el fuego.',
    feedback: 'La carga de combustible disminuye antes de la época de mayor peligro.',
    position: { x: 18, y: 30 },
    inheritedStateImpact: { fuelLoad: -20 },
    evidenceIds: ['pruning-residues-removed-or-processed'],
    conditionIfOmitted: 'pruning-residues-accumulated'
  },
  {
    id: 'crear-discontinuidades-vegetales',
    title: 'Vegetación continua hacia el monte',
    label: 'Crear discontinuidades estratégicas de vegetación',
    shortLabel: 'Crear discontinuidades vegetales',
    description: 'Interrumpe corredores continuos de vegetación y conserva puntos de anclaje utilizables.',
    feedback: 'La propagación encuentra menos continuidad y la posición gana defensibilidad.',
    position: { x: 37, y: 52 },
    inheritedStateImpact: { fuelContinuity: -30, defensibility: 10 },
    evidenceIds: ['strategic-vegetation-discontinuity-created'],
    conditionIfOmitted: 'territorial-vegetation-continuity-present'
  },
  {
    id: 'limpiar-margenes-caminos',
    title: 'Márgenes rurales invadidos',
    label: 'Limpiar los márgenes de caminos rurales',
    shortLabel: 'Limpiar márgenes rurales',
    description: 'Recupera el tramo territorial de entrada, maniobra y retirada de los medios terrestres.',
    feedback: 'El acceso territorial queda disponible y también funciona como discontinuidad.',
    position: { x: 68, y: 58 },
    inheritedStateImpact: { fuelContinuity: -10, operationalAccess: 30 },
    evidenceIds: ['rural-road-margins-cleared'],
    conditionIfOmitted: 'rural-road-margins-obstructed'
  },
  {
    id: 'activar-pastoreo-preventivo',
    title: 'Combustible fino en franjas prioritarias',
    label: 'Activar pastoreo preventivo planificado',
    shortLabel: 'Activar pastoreo preventivo',
    description: 'Reduce combustible fino y continuidad en franjas seleccionadas mediante manejo planificado.',
    feedback: 'La carga y la continuidad local disminuyen sin tratar todo el territorio por igual.',
    position: { x: 47, y: 28 },
    inheritedStateImpact: { fuelLoad: -20, fuelContinuity: -10 },
    evidenceIds: ['preventive-grazing-completed-in-priority-strips'],
    conditionIfOmitted: 'fine-fuel-accumulated-in-priority-strips'
  },
  {
    id: 'evaluar-quema-tecnica',
    title: 'Línea estratégica sin evaluar',
    label: 'Solicitar evaluación profesional de una línea preventiva',
    shortLabel: 'Evaluar línea profesional',
    description: 'Un equipo profesional evalúa si existe una línea estratégica viable en el escenario de la beta.',
    feedback: 'La línea queda evaluada como viable, aunque no sustituye el acceso ni el repliegue.',
    position: { x: 82, y: 35 },
    inheritedStateImpact: {},
    evidenceIds: ['professional-line-assessed', 'professional-line-feasible'],
    conditionIfOmitted: 'strategic-area-without-assessed-line'
  }
];

const HOUSING_ACTIONS: OfficialActionContract[] = [
  {
    id: 'podar-ramas-y-retirar-seco',
    title: 'Continuidad vertical junto a viviendas',
    label: 'Podar ramas bajas y retirar material seco',
    shortLabel: 'Podar y retirar seco',
    description: 'Separa el combustible de superficie de las copas y retira material seco próximo a viviendas.',
    feedback: 'Disminuyen la carga local y la continuidad vertical.',
    position: { x: 28, y: 40 },
    inheritedStateImpact: { fuelLoad: -10, fuelContinuity: -20 },
    evidenceIds: ['vertical-fuel-continuity-reduced'],
    conditionIfOmitted: 'vertical-fuel-ladder-present'
  },
  {
    id: 'separar-copas',
    title: 'Copas conectadas',
    label: 'Separar copas de árboles próximas',
    shortLabel: 'Separar copas',
    description: 'Reduce la conexión entre copas para amortiguar la transición y propagación aérea.',
    feedback: 'La continuidad de copas baja y la posición física mejora parcialmente.',
    position: { x: 55, y: 29 },
    inheritedStateImpact: { fuelContinuity: -20, defensibility: 10 },
    evidenceIds: ['crown-fuel-continuity-reduced'],
    conditionIfOmitted: 'crown-fuel-continuity-present'
  },
  {
    id: 'despejar-accesos',
    title: 'Acceso local obstruido',
    label: 'Despejar el acceso de autobombas',
    shortLabel: 'Despejar accesos',
    description: 'Recupera el tramo local de entrada, maniobra y salida junto a las viviendas.',
    feedback: 'Los medios pueden llegar y la defensa física se convierte en una posición más utilizable.',
    position: { x: 78, y: 61 },
    inheritedStateImpact: { operationalAccess: 30, defensibility: 20 },
    evidenceIds: ['fire-engine-access-cleared'],
    conditionIfOmitted: 'fire-engine-access-obstructed'
  }
];

function inspection(
  id: PreventionInspectionSceneId,
  title: string,
  intro: string,
  context: string,
  objective: string,
  maxActions: 2 | 3,
  actions: OfficialActionContract[]
): OfficialPreventionInspectionScreen {
  return {
    id,
    title,
    shortTitle: title,
    phase: 'prevencion',
    intro,
    context,
    objective,
    maxActions,
    initialState: {},
    hotspots: actions.map(hotspot),
    combos: [],
    outcomes: []
  };
}

export const PREVENTION_INSPECTION_TERRITORY_FUEL = inspection(
  'prevention-inspection-territory-fuel',
  'Territorio y combustible',
  'Antes del verano, revisa cómo la vegetación, los restos y los caminos condicionarán el incendio.',
  'El municipio conecta fincas, caminos rurales y monte. Solo puedes completar tres actuaciones.',
  'Elige tres actuaciones que modifiquen las condiciones que heredará la emergencia.',
  3,
  TERRITORY_ACTIONS
);

export const PREVENTION_INSPECTION_HOUSING_INTERFACE = inspection(
  'prevention-inspection-housing-interface',
  'Viviendas e interfaz forestal',
  'La segunda inspección comprueba continuidad vertical, copas y acceso local para los medios.',
  'Las viviendas conservan vegetación próxima y una única cadena de acceso operativo.',
  'Elige dos actuaciones antes de consolidar el balance preventivo.',
  2,
  HOUSING_ACTIONS
);

export const OFFICIAL_PREVENTION_INSPECTIONS = [
  PREVENTION_INSPECTION_TERRITORY_FUEL,
  PREVENTION_INSPECTION_HOUSING_INTERFACE
] as const;

export function getOfficialPreventionInspection(
  sceneId: PreventionInspectionSceneId
): OfficialPreventionInspectionScreen {
  return sceneId === 'prevention-inspection-territory-fuel'
    ? PREVENTION_INSPECTION_TERRITORY_FUEL
    : PREVENTION_INSPECTION_HOUSING_INTERFACE;
}
