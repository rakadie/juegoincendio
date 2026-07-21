import type {
  MediaOutput,
  NarrativeEffects,
  PressureIndicator,
  Scenario,
  ScenarioAction,
  ScenarioCombo,
  ScenarioNextLogic,
  ScenarioOption,
  ScenarioOutcome
} from '../../domain/types/scenario.js';

export type IndexedTextMap<T> = Record<string, T>;

export interface ScenarioOptionText {
  text?: string;
  rationale?: string;
  shortFeedback?: string;
  longFeedback?: string;
  operationalNote?: string;
  publicReaction?: string;
  narrativeEffects?: Partial<NarrativeEffects>;
  mediaOutputs?: IndexedTextMap<Partial<Pick<MediaOutput, 'title' | 'text'>>>;
}

export interface ScenarioTextTemplate {
  title?: string;
  estimatedTime?: string;
  tags?: string[];
  intro?: string;
  objective?: string;
  context?: string;
  question?: string;
  briefing?: string;
  pressureIndicators?: IndexedTextMap<Partial<Pick<PressureIndicator, 'label' | 'level'>>>;
  actions?: IndexedTextMap<Partial<Pick<ScenarioAction, 'label' | 'description' | 'feedback'>>>;
  combos?: IndexedTextMap<Partial<Pick<ScenarioCombo, 'title' | 'text'>>>;
  outcomes?: IndexedTextMap<Partial<Pick<ScenarioOutcome, 'title' | 'text'>>>;
  nextLogic?: IndexedTextMap<Partial<Pick<ScenarioNextLogic, 'transition'>>>;
  options?: IndexedTextMap<ScenarioOptionText>;
  designNotes?: IndexedTextMap<string>;
  sourceNotes?: IndexedTextMap<string>;
}

export interface ScenarioI18nCatalog {
  locale: string;
  namespace: 'scenarios';
  scenarios: IndexedTextMap<ScenarioTextTemplate>;
}

const indexedKey = (prefix: string, index: number): string =>
  `${prefix}-${String(index + 1).padStart(3, '0')}`;

const textValues = (texts: IndexedTextMap<string> | undefined): string[] | undefined => {
  if (!texts) return undefined;

  return Object.entries(texts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value);
};

const applyById = <T extends { id: string }, U>(
  items: T[] | undefined,
  texts: IndexedTextMap<U> | undefined,
  apply: (item: T, text: U) => T
): T[] | undefined => {
  if (!items || !texts) return items;

  return items.map((item) => {
    const text = texts[item.id];

    return text ? apply(item, text) : item;
  });
};

const applyMediaOutputs = (
  outputs: MediaOutput[] | undefined,
  texts: IndexedTextMap<Partial<Pick<MediaOutput, 'title' | 'text'>>> | undefined
): MediaOutput[] | undefined => {
  if (!outputs || !texts) return outputs;

  return outputs.map((output, index) => ({
    ...output,
    ...texts[indexedKey('mediaOutput', index)]
  }));
};

const applyOptionText = (option: ScenarioOption, text: ScenarioOptionText): ScenarioOption => ({
  ...option,
  ...('text' in text ? { text: text.text ?? option.text } : {}),
  ...('rationale' in text ? { rationale: text.rationale ?? option.rationale } : {}),
  ...('shortFeedback' in text ? { shortFeedback: text.shortFeedback } : {}),
  ...('longFeedback' in text ? { longFeedback: text.longFeedback } : {}),
  ...('operationalNote' in text ? { operationalNote: text.operationalNote } : {}),
  ...('publicReaction' in text ? { publicReaction: text.publicReaction } : {}),
  narrativeEffects: text.narrativeEffects
    ? {
        ...option.narrativeEffects,
        ...text.narrativeEffects
      }
    : option.narrativeEffects,
  mediaOutputs: applyMediaOutputs(option.mediaOutputs, text.mediaOutputs)
});

const applyScenarioText = (scenario: Scenario, text: ScenarioTextTemplate): Scenario => ({
  ...scenario,
  ...('title' in text ? { title: text.title ?? scenario.title } : {}),
  ...('estimatedTime' in text ? { estimatedTime: text.estimatedTime ?? scenario.estimatedTime } : {}),
  ...('tags' in text ? { tags: text.tags ?? scenario.tags } : {}),
  ...('intro' in text ? { intro: text.intro } : {}),
  ...('objective' in text ? { objective: text.objective } : {}),
  ...('context' in text ? { context: text.context ?? scenario.context } : {}),
  ...('question' in text ? { question: text.question ?? scenario.question } : {}),
  ...('briefing' in text ? { briefing: text.briefing ?? scenario.briefing } : {}),
  pressureIndicators: applyById(scenario.pressureIndicators, text.pressureIndicators, (indicator, value) => ({
    ...indicator,
    ...value
  })),
  actions: applyById(scenario.actions, text.actions, (action, value) => ({
    ...action,
    ...value
  })),
  combos: applyById(scenario.combos, text.combos, (combo, value) => ({
    ...combo,
    ...value
  })),
  outcomes: applyById(scenario.outcomes, text.outcomes, (outcome, value) => ({
    ...outcome,
    ...value
  })),
  nextLogic: applyById(scenario.nextLogic, text.nextLogic, (logic, value) => ({
    ...logic,
    ...value
  })),
  options: applyById(scenario.options, text.options, applyOptionText) ?? scenario.options,
  designNotes: textValues(text.designNotes) ?? scenario.designNotes,
  sourceNotes: textValues(text.sourceNotes) ?? scenario.sourceNotes
});

export const applyScenarioI18n = (
  scenarios: Scenario[],
  catalog: ScenarioI18nCatalog
): Scenario[] =>
  scenarios.map((scenario) => {
    const text = catalog.scenarios[scenario.id];

    return text ? applyScenarioText(scenario, text) : scenario;
  });
