export type ScenarioCategory =
  | 'prevencion'
  | 'operaciones'
  | 'evacuacion'
  | 'proteccion-civil'
  | 'comunicacion'
  | 'postincendio';

export type ScenarioPhase =
  | 'prevencion'
  | 'alerta'
  | 'crisis'
  | 'estabilizacion'
  | 'recuperacion';

export type ScenarioDifficulty = 'baja' | 'media' | 'alta' | 'critica';

export type ScenarioStatus = 'locked' | 'available' | 'completed';

export type EvaluationType =
  | 'optimal'
  | 'recommended'
  | 'acceptable'
  | 'risky'
  | 'critical';

export type ImpactValue = number | boolean | string;

export interface VariableImpact {
  variableKey: string;
  delta?: number;
  setTo?: ImpactValue;
}

export interface MediaOutput {
  type: 'radio' | 'press' | 'social' | 'official';
  tone: 'urgent' | 'calm' | 'critical' | 'mixed' | 'analysis' | 'warning';
  title?: string;
  text: string;
}

export interface NarrativeEffects {
  immediate?: string;
  delayed?: string;
  operational?: string;
  social?: string;
}

export interface ScenarioRequirementVariable {
  variableKey: string;
  operator: '<' | '<=' | '>' | '>=' | '===' | '!==';
  value: ImpactValue;
}

export interface ScenarioRequirements {
  flagsAny?: string[];
  flagsAll?: string[];
  completedScenarios?: string[];
  variables?: ScenarioRequirementVariable[];
}

export interface ScenarioUnlock {
  scenarioId: string;
  condition?: ScenarioRequirementVariable;
}

export interface ScenarioOption {
  id: string;
  text: string;
  evaluation: EvaluationType;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  rationale: string;
  shortFeedback?: string;
  longFeedback?: string;
  operationalNote?: string;
  publicReaction?: string;
  impacts: VariableImpact[];
  narrativeEffects?: NarrativeEffects;
  mediaOutputs?: MediaOutput[];
  unlocks?: Array<string | ScenarioUnlock>;
  flags?: string[];
}

export interface Scenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  phase: ScenarioPhase;
  block: string;
  difficulty: ScenarioDifficulty;
  estimatedTime: string;
  tags: string[];
  status: ScenarioStatus;
  context: string;
  question: string;
  briefing: string;
  requirements: ScenarioRequirements | null;
  options: ScenarioOption[];
  unlocks: Array<string | ScenarioUnlock>;
  sourceNotes: string[];
}
