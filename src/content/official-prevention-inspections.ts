import type {
  PreventionInspectionAction,
  PreventionInspectionHotspot,
  PreventionInspectionScreen
} from '../domain/types/prevention-inspection.js';
import type { InheritedState } from '../domain/game-session/game-session.js';
import type { DecisionSceneId } from '../domain/types/game-scene.js';
import {
  PREVENTION_INSPECTION_FINCAS,
  PREVENTION_INSPECTION_INTERFAZ
} from './prevention-inspections.js';

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

interface ActionContract {
  actionId: string;
  inheritedStateImpact: PreventionInheritedStateImpact;
  evidenceIds: string[];
  conditionIfOmitted: string;
}

function officialHotspot(
  source: PreventionInspectionScreen,
  contract: ActionContract
): OfficialPreventionInspectionHotspot {
  const hotspot = source.hotspots.find(({ action }) => action.id === contract.actionId);
  if (hotspot === undefined) {
    throw new Error(`${source.id} does not contain action ${contract.actionId}.`);
  }

  return {
    ...hotspot,
    action: {
      ...hotspot.action,
      inheritedStateImpact: { ...contract.inheritedStateImpact },
      evidenceIds: [...contract.evidenceIds]
    },
    flagIfIgnored: contract.conditionIfOmitted
  };
}

const TERRITORY_ACTIONS: ActionContract[] = [
  {
    actionId: 'gestionar-restos-poda',
    inheritedStateImpact: { fuelLoad: -20 },
    evidenceIds: ['pruning-residues-removed-or-processed'],
    conditionIfOmitted: 'pruning-residues-accumulated'
  },
  {
    actionId: 'crear-discontinuidades-vegetales',
    inheritedStateImpact: { fuelContinuity: -30, defensibility: 10 },
    evidenceIds: ['strategic-vegetation-discontinuity-created'],
    conditionIfOmitted: 'territorial-vegetation-continuity-present'
  },
  {
    actionId: 'limpiar-margenes-caminos',
    inheritedStateImpact: { fuelContinuity: -10, operationalAccess: 30 },
    evidenceIds: ['rural-road-margins-cleared'],
    conditionIfOmitted: 'rural-road-margins-obstructed'
  },
  {
    actionId: 'activar-pastoreo-preventivo',
    inheritedStateImpact: { fuelLoad: -20, fuelContinuity: -10 },
    evidenceIds: ['preventive-grazing-completed-in-priority-strips'],
    conditionIfOmitted: 'fine-fuel-accumulated-in-priority-strips'
  },
  {
    actionId: 'evaluar-quema-tecnica',
    inheritedStateImpact: {},
    evidenceIds: ['professional-line-assessed'],
    conditionIfOmitted: 'strategic-area-without-assessed-line'
  }
];

const HOUSING_ACTIONS: ActionContract[] = [
  {
    actionId: 'podar-ramas-y-retirar-seco',
    inheritedStateImpact: { fuelLoad: -10, fuelContinuity: -20 },
    evidenceIds: ['vertical-fuel-continuity-reduced'],
    conditionIfOmitted: 'vertical-fuel-ladder-present'
  },
  {
    actionId: 'separar-copas',
    inheritedStateImpact: { fuelContinuity: -20, defensibility: 10 },
    evidenceIds: ['crown-fuel-continuity-reduced'],
    conditionIfOmitted: 'crown-fuel-continuity-present'
  },
  {
    actionId: 'despejar-accesos',
    inheritedStateImpact: { operationalAccess: 30, defensibility: 20 },
    evidenceIds: ['fire-engine-access-cleared'],
    conditionIfOmitted: 'fire-engine-access-obstructed'
  }
];

export const PREVENTION_INSPECTION_TERRITORY_FUEL: OfficialPreventionInspectionScreen = {
  ...PREVENTION_INSPECTION_FINCAS,
  id: 'prevention-inspection-territory-fuel',
  objective:
    'Detecta puntos de riesgo en fincas y zonas rurales proximas al monte. Elige tres actuaciones preventivas para reducir el riesgo de ignicion y propagacion.',
  maxActions: 3,
  hotspots: TERRITORY_ACTIONS.map((contract) =>
    officialHotspot(PREVENTION_INSPECTION_FINCAS, contract)
  ),
  combos: []
};

export const PREVENTION_INSPECTION_HOUSING_INTERFACE: OfficialPreventionInspectionScreen = {
  ...PREVENTION_INSPECTION_INTERFAZ,
  id: 'prevention-inspection-housing-interface',
  objective:
    'Detecta vulnerabilidades y elige dos actuaciones preventivas para reducir el riesgo antes de la epoca de mayor peligro.',
  maxActions: 2,
  hotspots: HOUSING_ACTIONS.map((contract) =>
    officialHotspot(PREVENTION_INSPECTION_INTERFAZ, contract)
  ),
  combos: []
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
