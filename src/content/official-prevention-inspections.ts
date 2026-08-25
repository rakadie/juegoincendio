import type { InheritedState } from '../domain/game-session/game-session.js';
import type { DecisionSceneId } from '../domain/types/game-scene.js';
import type {
  PreventionInspectionAction,
  PreventionInspectionHotspot,
  PreventionInspectionOutcome,
  PreventionInspectionScreen
} from '../domain/types/prevention-inspection.js';
import { VERTICAL_BETA_I18N_ES } from './i18n/es/vertical-beta.js';
import { requireVerticalBetaSceneMessages } from './i18n/vertical-beta-i18n.js';

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

interface HotspotContract {
  readonly id: string;
  readonly position: { readonly x: number; readonly y: number };
  readonly action: {
    readonly id: string;
    readonly impact: PreventionInspectionAction['impact'];
    readonly flagsOnApply: string[];
    readonly inheritedStateImpact: PreventionInheritedStateImpact;
    readonly evidenceIds: string[];
  };
  readonly conditionIfOmitted: string;
}

function localizedHotspot(
  sceneId: PreventionInspectionSceneId,
  contract: HotspotContract
): OfficialPreventionInspectionHotspot {
  const scene = requireVerticalBetaSceneMessages(VERTICAL_BETA_I18N_ES, sceneId);
  const copy = scene.hotspots?.[contract.id];
  if (copy === undefined) {
    throw new Error(`Missing official hotspot translation for ${sceneId}.${contract.id}.`);
  }
  return {
    id: contract.id,
    title: copy.title,
    position: { ...contract.position },
    visualHint: copy.visualHint,
    description: copy.description,
    futureConsequence: copy.futureConsequence,
    action: {
      id: contract.action.id,
      label: copy.action.label,
      shortLabel: copy.action.label,
      description: copy.action.description,
      impact: contract.action.impact,
      flagsOnApply: contract.action.flagsOnApply,
      feedback: copy.action.feedback,
      inheritedStateImpact: contract.action.inheritedStateImpact,
      evidenceIds: contract.action.evidenceIds
    },
    flagIfIgnored: contract.conditionIfOmitted
  };
}

function localizedOutcomes(
  sceneId: PreventionInspectionSceneId
): PreventionInspectionOutcome[] {
  const copy = requireVerticalBetaSceneMessages(VERTICAL_BETA_I18N_ES, sceneId).outcomes!;
  return (['alto', 'medio', 'bajo'] as const).map((id) => ({ id, ...copy[id] }));
}

function inspectionBase(sceneId: PreventionInspectionSceneId) {
  const copy = requireVerticalBetaSceneMessages(VERTICAL_BETA_I18N_ES, sceneId);
  return {
    id: sceneId,
    title: copy.title,
    shortTitle: copy.shortTitle!,
    phase: 'prevencion' as const,
    intro: copy.body,
    context: copy.context!,
    objective: copy.objective!,
    initialState: {},
    combos: [] as []
  };
}

export const PREVENTION_INSPECTION_TERRITORY_FUEL: OfficialPreventionInspectionScreen = {
  ...inspectionBase('prevention-inspection-territory-fuel'),
  maxActions: 3,
  hotspots: [
    localizedHotspot('prevention-inspection-territory-fuel', {
      id: 'restos-poda-acumulados',
      position: { x: 22, y: 66 },
      action: {
        id: 'gestionar-restos-poda',
        impact: { continuidadCombustible: -4, riesgoIgnicion: -2 },
        flagsOnApply: ['restosPodaGestionados'],
        inheritedStateImpact: { fuelLoad: -20 },
        evidenceIds: ['pruning-residues-removed-or-processed']
      },
      conditionIfOmitted: 'pruning-residues-accumulated'
    }),
    localizedHotspot('prevention-inspection-territory-fuel', {
      id: 'vegetacion-densa-borde-fincas',
      position: { x: 42, y: 46 },
      action: {
        id: 'crear-discontinuidades-vegetales',
        impact: { continuidadCombustible: -5, riesgoPropagacion: -4 },
        flagsOnApply: ['discontinuidadesVegetales'],
        inheritedStateImpact: { fuelContinuity: -30, defensibility: 10 },
        evidenceIds: ['strategic-vegetation-discontinuity-created']
      },
      conditionIfOmitted: 'territorial-vegetation-continuity-present'
    }),
    localizedHotspot('prevention-inspection-territory-fuel', {
      id: 'camino-rural-invadido',
      position: { x: 73, y: 62 },
      action: {
        id: 'limpiar-margenes-caminos',
        impact: { accesosDespejados: 4, seguridadEquipos: 3 },
        flagsOnApply: ['margenesCaminosLimpios'],
        inheritedStateImpact: { fuelContinuity: -10, operationalAccess: 30 },
        evidenceIds: ['rural-road-margins-cleared']
      },
      conditionIfOmitted: 'rural-road-margins-obstructed'
    }),
    localizedHotspot('prevention-inspection-territory-fuel', {
      id: 'pastoreo-preventivo',
      position: { x: 54, y: 70 },
      action: {
        id: 'activar-pastoreo-preventivo',
        impact: { continuidadCombustible: -4, riesgoPropagacion: -3 },
        flagsOnApply: ['pastoreoPreventivoCompletado'],
        inheritedStateImpact: { fuelLoad: -20, fuelContinuity: -10 },
        evidenceIds: ['preventive-grazing-completed-in-priority-strips']
      },
      conditionIfOmitted: 'fine-fuel-accumulated-in-priority-strips'
    }),
    localizedHotspot('prevention-inspection-territory-fuel', {
      id: 'quema-tecnica-profesional',
      position: { x: 82, y: 31 },
      action: {
        id: 'evaluar-quema-tecnica',
        impact: { controlIncendio: 3, coordinacionOperativa: 4 },
        flagsOnApply: ['lineaProfesionalEvaluada'],
        inheritedStateImpact: {},
        evidenceIds: ['professional-line-assessed', 'professional-line-feasible']
      },
      conditionIfOmitted: 'strategic-area-without-assessed-line'
    })
  ],
  outcomes: localizedOutcomes('prevention-inspection-territory-fuel')
};

export const PREVENTION_INSPECTION_HOUSING_INTERFACE: OfficialPreventionInspectionScreen = {
  ...inspectionBase('prevention-inspection-housing-interface'),
  maxActions: 2,
  hotspots: [
    localizedHotspot('prevention-inspection-housing-interface', {
      id: 'ramas-bajas-vegetacion-seca',
      position: { x: 54, y: 47 },
      action: {
        id: 'podar-ramas-y-retirar-seco',
        impact: { continuidadCombustible: -5, riesgoFuegoCopas: -3 },
        flagsOnApply: ['continuidadVerticalReducida'],
        inheritedStateImpact: { fuelLoad: -10, fuelContinuity: -20 },
        evidenceIds: ['vertical-fuel-continuity-reduced']
      },
      conditionIfOmitted: 'vertical-fuel-ladder-present'
    }),
    localizedHotspot('prevention-inspection-housing-interface', {
      id: 'copas-tocandose',
      position: { x: 68, y: 30 },
      action: {
        id: 'separar-copas',
        impact: { continuidadCombustible: -4, riesgoFuegoCopas: -3 },
        flagsOnApply: ['copasSeparadas'],
        inheritedStateImpact: { fuelContinuity: -20, defensibility: 10 },
        evidenceIds: ['crown-fuel-continuity-reduced']
      },
      conditionIfOmitted: 'crown-fuel-continuity-present'
    }),
    localizedHotspot('prevention-inspection-housing-interface', {
      id: 'acceso-estrecho',
      position: { x: 76, y: 71 },
      action: {
        id: 'despejar-accesos',
        impact: { seguridadEquipos: 3, defensibilidadViviendas: 3 },
        flagsOnApply: ['accesosDespejados'],
        inheritedStateImpact: { operationalAccess: 30, defensibility: 20 },
        evidenceIds: ['fire-engine-access-cleared']
      },
      conditionIfOmitted: 'fire-engine-access-obstructed'
    })
  ],
  outcomes: localizedOutcomes('prevention-inspection-housing-interface')
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
