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

export interface PressureIndicator {
  id: string;
  label: string;
  level: string;
}

export interface ScenarioAction {
  id: string;
  label: string;
  description: string;
  impact: Record<string, number>;
  flagsOnApply: string[];
  feedback: string;
}

export interface ScenarioCombo {
  id: string;
  title: string;
  requires: string[];
  text: string;
  bonusImpact: Record<string, number>;
}

export interface ScenarioOutcome {
  id: 'alto' | 'medio' | 'bajo';
  title: string;
  condition: Record<string, string>;
  text: string;
  crisisImpact: Record<string, number>;
}

export interface ScenarioNextLogic {
  id: string;
  condition: Record<string, string> | 'default';
  nextScenario: string;
  transition: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  phase: ScenarioPhase;
  block: string;
  type?: 'question' | 'action-selection';
  difficulty: ScenarioDifficulty;
  estimatedTime: string;
  maxActions?: number;
  tags: string[];
  status: ScenarioStatus;
  intro?: string;
  objective?: string;
  pressureIndicators?: PressureIndicator[];
  actions?: ScenarioAction[];
  combos?: ScenarioCombo[];
  outcomes?: ScenarioOutcome[];
  nextLogic?: ScenarioNextLogic[];
  designNotes?: string[];
  context: string;
  question: string;
  briefing: string;
  requirements: ScenarioRequirements | null;
  options: ScenarioOption[];
  unlocks: Array<string | ScenarioUnlock>;
  sourceNotes: string[];
}
