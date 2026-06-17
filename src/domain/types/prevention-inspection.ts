export type InspectionMetric =
  | 'defensibilidadViviendas'
  | 'continuidadCombustible'
  | 'riesgoPavesas'
  | 'riesgoFuegoCopas'
  | 'riesgoIgnicion'
  | 'riesgoPropagacion'
  | 'seguridadEquipos'
  | 'coordinacionOperativa'
  | 'cumplimientoPreventivo'
  | 'accesosDespejados'
  | 'controlIncendio'
  | 'poblacionProtegida'
  | 'confianzaVecinal'
  | 'preparacionFamiliar'
  | 'autonomiaCiudadana'
  | 'canalesOficiales'
  | 'atencionVulnerables'
  | 'inclusionVulnerables'
  | 'saturacion112'
  | 'exposicionHumoCalor'
  | 'danosViviendas'
  | 'riesgoAtrapamiento'
  | 'confusionPublica';

export type InspectionImpact = Partial<Record<InspectionMetric, number>>;

export interface HotspotPosition {
  x: number;
  y: number;
}

export interface PreventionInspectionAction {
  id: string;
  label: string;
  shortLabel?: string;
  description?: string;
  details?: {
    buttonLabel: string;
    sections: Array<{
      title: string;
      items: string[];
    }>;
  };
  impact: InspectionImpact;
  flagsOnApply: string[];
  feedback: string;
}

export interface PreventionInspectionHotspot {
  id: string;
  title: string;
  position: HotspotPosition;
  visualHint: string;
  description: string;
  action: PreventionInspectionAction;
  flagIfIgnored: string;
  futureConsequence: string;
}

export interface PreventionInspectionCombo {
  id: string;
  title: string;
  requires: string[];
  text: string;
  bonusImpact: InspectionImpact;
}

export interface PreventionInspectionOutcome {
  id: 'alto' | 'medio' | 'bajo';
  title: string;
  text: string;
}

export interface PreventionInspectionScreen {
  id: string;
  title: string;
  phase: 'prevencion';
  shortTitle?: string;
  intro: string;
  context: string;
  objective: string;
  maxActions: number;
  initialState: InspectionImpact;
  hotspots: PreventionInspectionHotspot[];
  combos: PreventionInspectionCombo[];
  outcomes: PreventionInspectionOutcome[];
}
