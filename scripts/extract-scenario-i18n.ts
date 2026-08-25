import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE_EDITORIAL_SCENARIOS } from '../src/content/scenarios/index.js';
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
} from '../src/domain/types/scenario.js';

type TextMap<T> = Record<string, T>;
type PrimitiveText = string | string[] | undefined;

interface ScenarioOptionTemplate {
  text?: string;
  rationale?: string;
  shortFeedback?: string;
  longFeedback?: string;
  operationalNote?: string;
  publicReaction?: string;
  narrativeEffects?: Partial<NarrativeEffects>;
  mediaOutputs?: TextMap<Partial<Pick<MediaOutput, 'title' | 'text'>>>;
}

interface ScenarioTemplate {
  title?: string;
  estimatedTime?: string;
  tags?: string[];
  intro?: string;
  objective?: string;
  context?: string;
  question?: string;
  briefing?: string;
  pressureIndicators?: TextMap<Partial<Pick<PressureIndicator, 'label' | 'level'>>>;
  actions?: TextMap<Partial<Pick<ScenarioAction, 'label' | 'description' | 'feedback'>>>;
  combos?: TextMap<Partial<Pick<ScenarioCombo, 'title' | 'text'>>>;
  outcomes?: TextMap<Partial<Pick<ScenarioOutcome, 'title' | 'text'>>>;
  nextLogic?: TextMap<Partial<Pick<ScenarioNextLogic, 'transition'>>>;
  options?: TextMap<ScenarioOptionTemplate>;
  designNotes?: TextMap<string>;
  sourceNotes?: TextMap<string>;
}

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = join(repoRoot, 'src', 'content', 'i18n', 'es', 'scenarios.ts');

const indexedKey = (prefix: string, index: number): string =>
  `${prefix}-${String(index + 1).padStart(3, '0')}`;

const isText = (value: PrimitiveText): value is string | string[] =>
  (typeof value === 'string' && value.length > 0) || (Array.isArray(value) && value.length > 0);

const addText = <T extends Record<string, unknown>>(
  target: T,
  key: keyof T,
  value: PrimitiveText
): void => {
  if (isText(value)) {
    target[key] = value as T[keyof T];
  }
};

const byId = <T extends { id: string }, U>(
  items: T[] | undefined,
  pick: (item: T) => U
): TextMap<U> | undefined => {
  if (!items || items.length === 0) return undefined;

  return Object.fromEntries(items.map((item) => [item.id, pick(item)]));
};

const indexedStrings = (items: string[] | undefined, prefix: string): TextMap<string> | undefined => {
  if (!items || items.length === 0) return undefined;

  return Object.fromEntries(items.map((item, index) => [indexedKey(prefix, index), item]));
};

const mediaOutputs = (
  outputs: MediaOutput[] | undefined
): TextMap<Partial<Pick<MediaOutput, 'title' | 'text'>>> | undefined => {
  if (!outputs || outputs.length === 0) return undefined;

  return Object.fromEntries(
    outputs.map((output, index) => [
      indexedKey('mediaOutput', index),
      {
        ...(output.title ? { title: output.title } : {}),
        text: output.text
      }
    ])
  );
};

const optionTemplate = (option: ScenarioOption): ScenarioOptionTemplate => ({
  text: option.text,
  rationale: option.rationale,
  ...(option.shortFeedback ? { shortFeedback: option.shortFeedback } : {}),
  ...(option.longFeedback ? { longFeedback: option.longFeedback } : {}),
  ...(option.operationalNote ? { operationalNote: option.operationalNote } : {}),
  ...(option.publicReaction ? { publicReaction: option.publicReaction } : {}),
  ...(option.narrativeEffects ? { narrativeEffects: option.narrativeEffects } : {}),
  ...(option.mediaOutputs && option.mediaOutputs.length > 0
    ? { mediaOutputs: mediaOutputs(option.mediaOutputs) }
    : {})
});

const scenarioTemplate = (scenario: Scenario): ScenarioTemplate => {
  const template: ScenarioTemplate = {};

  addText(template, 'title', scenario.title);
  addText(template, 'estimatedTime', scenario.estimatedTime);
  addText(template, 'tags', scenario.tags);
  addText(template, 'intro', scenario.intro);
  addText(template, 'objective', scenario.objective);
  addText(template, 'context', scenario.context);
  addText(template, 'question', scenario.question);
  addText(template, 'briefing', scenario.briefing);

  const pressureIndicators = byId(scenario.pressureIndicators, (indicator) => ({
    label: indicator.label,
    level: indicator.level
  }));
  if (pressureIndicators) template.pressureIndicators = pressureIndicators;

  const actions = byId(scenario.actions, (action) => ({
    label: action.label,
    description: action.description,
    feedback: action.feedback
  }));
  if (actions) template.actions = actions;

  const combos = byId(scenario.combos, (combo) => ({
    title: combo.title,
    text: combo.text
  }));
  if (combos) template.combos = combos;

  const outcomes = byId(scenario.outcomes, (outcome) => ({
    title: outcome.title,
    text: outcome.text
  }));
  if (outcomes) template.outcomes = outcomes;

  const nextLogic = byId(scenario.nextLogic, (logic) => ({
    transition: logic.transition
  }));
  if (nextLogic) template.nextLogic = nextLogic;

  const options = byId(scenario.options, optionTemplate);
  if (options) template.options = options;

  const designNotes = indexedStrings(scenario.designNotes, 'note');
  if (designNotes) template.designNotes = designNotes;

  const sourceNotes = indexedStrings(scenario.sourceNotes, 'note');
  if (sourceNotes) template.sourceNotes = sourceNotes;

  return template;
};

const catalog = {
  locale: 'es',
  namespace: 'scenarios',
  scenarios: Object.fromEntries(
    BASE_EDITORIAL_SCENARIOS.map((scenario) => [scenario.id, scenarioTemplate(scenario)])
  )
};

const body = `import type { ScenarioI18nCatalog } from '../scenario-i18n.js';

export const scenarioI18nEs = ${JSON.stringify(catalog, null, 2)} satisfies ScenarioI18nCatalog;
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, body, 'utf8');

console.log(`Plantilla i18n de escenarios escrita en ${outputPath}`);
