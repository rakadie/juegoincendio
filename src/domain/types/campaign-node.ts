import type { PreventionInspectionScreen } from './prevention-inspection.js';
import type { InspectionImpact, InspectionMetric } from './prevention-inspection.js';

export interface CampaignIndicator {
  icon: string;
  text: string;
  tone: 'good' | 'warn' | 'bad';
}

export interface CampaignOption {
  id: string;
  text: string;
  recommended: boolean;
  resourceEffects: Record<string, number>;
  terrainEffects?: Record<string, number>;
  fireDelta?: number;
  burnedDelta?: number;
  indicators: CampaignIndicator[];
  diagnosisHint?: string;
}

export interface CampaignNode {
  id: string;
  title: string;
  context: string;
  options: CampaignOption[];
}

export interface CampaignContent {
  preventionInspection: PreventionInspectionScreen;
  preventionInspections: PreventionInspectionScreen[];
  preventionBalance: PreventionBalanceContent;
  firstAlert: FirstAlertScenario;
  crisisRouteModule: CrisisRouteModule;
  winterNodes: CampaignNode[];
  summerNodes: CampaignNode[];
}

export interface PreventionBalanceIndicator {
  id: string;
  label: string;
  variables: InspectionMetric[];
}

export interface PreventionBalanceOutcome {
  id: 'municipio-preparado' | 'preparacion-desigual' | 'territorio-vulnerable';
  title: string;
  text: string;
  crisisImpact: InspectionImpact;
}

export interface PreventionBalanceContent {
  id: string;
  title: string;
  phase: 'prevencion';
  type: 'summary';
  intro: string;
  context: string;
  objective: string;
  indicators: PreventionBalanceIndicator[];
  outcomes: PreventionBalanceOutcome[];
  nextScreen: string;
}

export interface FirstAlertOption {
  id: string;
  shortLabel?: string;
  summary?: string;
  text: string;
  isCorrect: boolean;
  impact: Record<string, number>;
  feedback: string;
  transition: string;
}

export interface FirstAlertScenario {
  id: string;
  title: string;
  category: 'operaciones';
  phase: 'inicio-crisis';
  block: string;
  difficulty: 'baja' | 'media' | 'alta' | 'critica';
  estimatedTime: string;
  tags: string[];
  status: 'available';
  intro: string;
  context: string;
  question: string;
  briefing: string;
  options: FirstAlertOption[];
  unlocks: string[];
  sourceNotes: string[];
}

export interface CrisisMapZone {
  id: string;
  title: string;
  icon: string;
  colorHint: string;
  visualCue: string;
  description: string;
  linkedScenarios: string[];
}

export interface CrisisRouteConditionExpression {
  variable: string;
  operator: '<' | '<=' | '>' | '>=' | '===' | '!==';
  value: number | string | boolean;
}

export type CrisisRouteCondition =
  | 'default'
  | { flag: string }
  | { any: CrisisRouteConditionExpression[] };

export interface CrisisRouteUiState {
  headline: string;
  body: string;
  buttonLabel: string;
}

export interface CrisisRoute {
  id: string;
  priority: number;
  condition: CrisisRouteCondition;
  highlightedZone: string;
  nextScenario: string;
  uiState: CrisisRouteUiState;
  transition: string;
}

export interface CrisisRouteModule {
  id: string;
  title: string;
  phase: 'inicio-crisis';
  type: 'route-selector';
  intro: string;
  context: string;
  objective: string;
  visualMode: 'crisis-map';
  mapZones: CrisisMapZone[];
  routeLogic: CrisisRoute[];
  designNotes: string[];
}
