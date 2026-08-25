import type { InheritedState } from '../domain/game-session/game-session.js';
import type { DecisionSceneId } from '../domain/types/game-scene.js';
import type {
  PreventionInspectionAction,
  PreventionInspectionHotspot,
  PreventionInspectionScreen
} from '../domain/types/prevention-inspection.js';

export type PreventionInspectionSceneId = Extract<
  DecisionSceneId,
  | 'prevention-inspection-territory-fuel'
  | 'prevention-inspection-housing-interface'
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

interface OfficialHotspotInput {
  id: string;
  title: string;
  position: { x: number; y: number };
  visualHint: string;
  description: string;
  futureConsequence: string;
  action: {
    id: string;
    label: string;
    impact: PreventionInspectionAction['impact'];
    flagsOnApply: string[];
    feedback: string;
    inheritedStateImpact: PreventionInheritedStateImpact;
    evidenceIds: string[];
  };
  conditionIfOmitted: string;
}

function officialHotspot(input: OfficialHotspotInput): OfficialPreventionInspectionHotspot {
  return {
    id: input.id,
    title: input.title,
    position: input.position,
    visualHint: input.visualHint,
    description: input.description,
    futureConsequence: input.futureConsequence,
    action: input.action,
    flagIfIgnored: input.conditionIfOmitted
  };
}

export const PREVENTION_INSPECTION_TERRITORY_FUEL: OfficialPreventionInspectionScreen = {
  id: 'prevention-inspection-territory-fuel',
  title: 'Fincas, vegetación y gestión del combustible',
  shortTitle: 'Territorio y combustible',
  phase: 'prevencion',
  intro:
    'El fuego no siempre avanza por donde quiere. A veces avanza por donde le hemos dejado combustible.',
  context:
    'Técnicos municipales, agricultores y ganaderos muestran fincas próximas al monte con restos de poda, vegetación continua y caminos estrechos.',
  objective:
    'Detecta los riesgos y elige tres actuaciones para reducir combustible, romper continuidad y conservar accesos operativos.',
  maxActions: 3,
  initialState: {},
  hotspots: [
    officialHotspot({
      id: 'restos-poda-acumulados',
      title: 'Restos de poda acumulados',
      position: { x: 22, y: 66 },
      visualHint: 'Ramas secas y restos vegetales junto a muros',
      description:
        'Varias fincas acumulan restos de poda y material vegetal seco junto a muros y caminos.',
      futureConsequence:
        'Los restos acumulados permanecen disponibles para intensificar y sostener la propagación.',
      action: {
        id: 'gestionar-restos-poda',
        label: 'Gestionar restos de poda',
        impact: { continuidadCombustible: -4, riesgoIgnicion: -2 },
        flagsOnApply: ['restosPodaGestionados'],
        feedback:
          'Los restos se retiran o procesan y dejan de actuar como combustible acumulado.',
        inheritedStateImpact: { fuelLoad: -20 },
        evidenceIds: ['pruning-residues-removed-or-processed']
      },
      conditionIfOmitted: 'pruning-residues-accumulated'
    }),
    officialHotspot({
      id: 'vegetacion-densa-borde-fincas',
      title: 'Continuidad vegetal entre fincas y monte',
      position: { x: 42, y: 46 },
      visualHint: 'Matorral continuo conectando parcelas y ladera',
      description:
        'El matorral forma una conexión continua entre parcelas, monte y viviendas dispersas.',
      futureConsequence:
        'La continuidad territorial facilita que el frente enlace sectores sin interrupciones útiles.',
      action: {
        id: 'crear-discontinuidades-vegetales',
        label: 'Crear discontinuidades vegetales',
        impact: { continuidadCombustible: -5, riesgoPropagacion: -4 },
        flagsOnApply: ['discontinuidadesVegetales'],
        feedback:
          'Se crea una discontinuidad estratégica y mantenible en el recorrido probable del fuego.',
        inheritedStateImpact: { fuelContinuity: -30, defensibility: 10 },
        evidenceIds: ['strategic-vegetation-discontinuity-created']
      },
      conditionIfOmitted: 'territorial-vegetation-continuity-present'
    }),
    officialHotspot({
      id: 'camino-rural-invadido',
      title: 'Camino rural con márgenes invadidos',
      position: { x: 73, y: 62 },
      visualHint: 'Camino estrecho con vegetación seca en los bordes',
      description:
        'Los márgenes reducen el paso y comprometen la aproximación y la retirada de los medios.',
      futureConsequence:
        'La aproximación territorial queda limitada aunque el acceso local junto a las viviendas esté despejado.',
      action: {
        id: 'limpiar-margenes-caminos',
        label: 'Limpiar márgenes de caminos rurales',
        impact: { accesosDespejados: 4, seguridadEquipos: 3 },
        flagsOnApply: ['margenesCaminosLimpios'],
        feedback:
          'El camino recupera anchura útil para aproximación, maniobra y repliegue.',
        inheritedStateImpact: { fuelContinuity: -10, operationalAccess: 30 },
        evidenceIds: ['rural-road-margins-cleared']
      },
      conditionIfOmitted: 'rural-road-margins-obstructed'
    }),
    officialHotspot({
      id: 'pastoreo-preventivo',
      title: 'Pastoreo preventivo en franjas prioritarias',
      position: { x: 54, y: 70 },
      visualHint: 'Rebaño en una franja planificada',
      description:
        'La asociación ganadera puede ejecutar un programa con calendario, agua y seguimiento técnico.',
      futureConsequence:
        'El combustible fino permanece si el programa no llega a ejecutarse antes de la crisis.',
      action: {
        id: 'activar-pastoreo-preventivo',
        label: 'Ejecutar pastoreo preventivo',
        impact: { continuidadCombustible: -4, riesgoPropagacion: -3 },
        flagsOnApply: ['pastoreoPreventivoCompletado'],
        feedback:
          'El pastoreo se completa en las franjas prioritarias y reduce combustible fino.',
        inheritedStateImpact: { fuelLoad: -20, fuelContinuity: -10 },
        evidenceIds: ['preventive-grazing-completed-in-priority-strips']
      },
      conditionIfOmitted: 'fine-fuel-accumulated-in-priority-strips'
    }),
    officialHotspot({
      id: 'quema-tecnica-profesional',
      title: 'Evaluación de una línea preventiva profesional',
      position: { x: 82, y: 31 },
      visualHint: 'Técnicos forestales estudiando una posición estratégica',
      description:
        'Una posible línea requiere evaluación profesional, autorización y condiciones operativas compatibles.',
      futureConsequence:
        'No se conoce si existe una posición estratégica viable que pueda aprovecharse durante la crisis.',
      action: {
        id: 'evaluar-quema-tecnica',
        label: 'Solicitar evaluación profesional',
        impact: { controlIncendio: 3, coordinacionOperativa: 4 },
        flagsOnApply: ['lineaProfesionalEvaluada'],
        feedback:
          'La evaluación concluye que existe una línea viable; no sustituye el acceso ni el repliegue seguros.',
        inheritedStateImpact: {},
        evidenceIds: ['professional-line-assessed', 'professional-line-feasible']
      },
      conditionIfOmitted: 'strategic-area-without-assessed-line'
    })
  ],
  combos: [],
  outcomes: [
    {
      id: 'alto',
      title: 'Territorio con margen operativo',
      text: 'El combustible, la continuidad y los accesos ofrecen mejores condiciones de intervención.'
    },
    {
      id: 'medio',
      title: 'Preparación parcial',
      text: 'Persisten condiciones territoriales que pueden limitar la intervención.'
    },
    {
      id: 'bajo',
      title: 'Territorio vulnerable',
      text: 'El fuego encontrará combustible continuo y una cadena de acceso insuficiente.'
    }
  ]
};

export const PREVENTION_INSPECTION_HOUSING_INTERFACE: OfficialPreventionInspectionScreen = {
  id: 'prevention-inspection-housing-interface',
  title: 'Viviendas en interfaz urbano-forestal',
  shortTitle: 'Viviendas e interfaz',
  phase: 'prevencion',
  intro: 'No hay humo todavía. Por eso este es el momento de actuar.',
  context:
    'Las viviendas próximas al monte presentan continuidad vertical y horizontal de vegetación y accesos estrechos para autobombas.',
  objective:
    'Elige dos actuaciones para reducir la continuidad junto a viviendas y conservar entrada, maniobra y salida seguras.',
  maxActions: 2,
  initialState: {},
  hotspots: [
    officialHotspot({
      id: 'ramas-bajas-vegetacion-seca',
      title: 'Ramas bajas y vegetación seca',
      position: { x: 54, y: 47 },
      visualHint: 'Escalera vegetal desde el suelo a las copas',
      description:
        'Las ramas bajas conectan la vegetación seca del suelo con las copas junto a las viviendas.',
      futureConsequence:
        'La escalera vertical permite que un fuego de superficie gane altura e intensidad.',
      action: {
        id: 'podar-ramas-y-retirar-seco',
        label: 'Podar ramas y gestionar la biomasa',
        impact: { continuidadCombustible: -5, riesgoFuegoCopas: -3 },
        flagsOnApply: ['continuidadVerticalReducida'],
        feedback:
          'La poda se completa con la retirada o gestión de toda la biomasa generada.',
        inheritedStateImpact: { fuelLoad: -10, fuelContinuity: -20 },
        evidenceIds: ['vertical-fuel-continuity-reduced']
      },
      conditionIfOmitted: 'vertical-fuel-ladder-present'
    }),
    officialHotspot({
      id: 'copas-tocandose',
      title: 'Copas conectadas',
      position: { x: 68, y: 30 },
      visualHint: 'Continuidad horizontal entre copas',
      description:
        'Las copas se tocan y permiten que el fuego avance por la parte alta de la vegetación.',
      futureConsequence:
        'La continuidad horizontal incrementa el riesgo de propagación y transición a copas.',
      action: {
        id: 'separar-copas',
        label: 'Separar copas y gestionar la biomasa',
        impact: { continuidadCombustible: -4, riesgoFuegoCopas: -3 },
        flagsOnApply: ['copasSeparadas'],
        feedback:
          'Las copas quedan separadas estratégicamente y la biomasa generada se gestiona.',
        inheritedStateImpact: { fuelContinuity: -20, defensibility: 10 },
        evidenceIds: ['crown-fuel-continuity-reduced']
      },
      conditionIfOmitted: 'crown-fuel-continuity-present'
    }),
    officialHotspot({
      id: 'acceso-estrecho',
      title: 'Acceso estrecho para autobombas',
      position: { x: 76, y: 71 },
      visualHint: 'Entrada con obstáculos y vegetación',
      description:
        'La entrada local impide que una autobomba pueda acceder, maniobrar y salir con seguridad.',
      futureConsequence:
        'La defensa de viviendas queda limitada aunque el camino territorial esté disponible.',
      action: {
        id: 'despejar-accesos',
        label: 'Despejar accesos para autobombas',
        impact: { seguridadEquipos: 3, defensibilidadViviendas: 3 },
        flagsOnApply: ['accesosDespejados'],
        feedback:
          'La entrada, la maniobra y el repliegue local quedan disponibles para los equipos.',
        inheritedStateImpact: { operationalAccess: 30, defensibility: 20 },
        evidenceIds: ['fire-engine-access-cleared']
      },
      conditionIfOmitted: 'fire-engine-access-obstructed'
    })
  ],
  combos: [],
  outcomes: [
    {
      id: 'alto',
      title: 'Viviendas defendibles',
      text: 'La continuidad próxima se reduce y los medios conservan un acceso local utilizable.'
    },
    {
      id: 'medio',
      title: 'Defensa condicionada',
      text: 'Queda una vulnerabilidad que obliga a priorizar durante la crisis.'
    },
    {
      id: 'bajo',
      title: 'Interfaz vulnerable',
      text: 'La vegetación y los accesos limitan la capacidad de sostener la defensa.'
    }
  ]
};

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
