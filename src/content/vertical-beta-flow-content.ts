import type { ResultVariant } from '../domain/types/game-scene.js';
import { VERTICAL_BETA_I18N_ES } from './i18n/es/vertical-beta.js';
import {
  requireVerticalBetaActionMessages,
  requireVerticalBetaSceneMessages
} from './i18n/vertical-beta-i18n.js';

const briefing = requireVerticalBetaSceneMessages(
  VERTICAL_BETA_I18N_ES,
  'intro-briefing-mission'
);
const preventionSummary = requireVerticalBetaSceneMessages(
  VERTICAL_BETA_I18N_ES,
  'transition-summary-prevention'
);
const firstAlert = requireVerticalBetaSceneMessages(
  VERTICAL_BETA_I18N_ES,
  'crisis-decision-first-alert'
);
const firstAlertAction = requireVerticalBetaActionMessages(
  VERTICAL_BETA_I18N_ES,
  'crisis-decision-first-alert',
  'movilizar-y-verificar'
);
const causalRouter = requireVerticalBetaSceneMessages(
  VERTICAL_BETA_I18N_ES,
  'crisis-router-causal-map'
);
const result = requireVerticalBetaSceneMessages(
  VERTICAL_BETA_I18N_ES,
  'ending-result-causal-report'
);

export const VERTICAL_BETA_BRIEFING = {
  id: 'intro-briefing-mission',
  type: 'briefing',
  title: briefing.title,
  body: briefing.body,
  continueLabel: briefing.advanceLabel!
} as const;

export const VERTICAL_BETA_PREVENTION_SUMMARY = {
  id: 'transition-summary-prevention',
  type: 'summary',
  title: preventionSummary.title,
  body: preventionSummary.body,
  dimensionOrder: [
    'fuelLoad',
    'fuelContinuity',
    'operationalAccess',
    'defensibility',
    'attackOpportunity'
  ],
  continueLabel: preventionSummary.advanceLabel!
} as const;

export const VERTICAL_BETA_FIRST_ALERT = {
  id: 'crisis-decision-first-alert',
  type: 'decision',
  title: firstAlert.title,
  prompt: firstAlert.body,
  context: firstAlert.context!,
  actions: [
    {
      id: 'movilizar-y-verificar',
      label: firstAlertAction.label,
      description: firstAlertAction.description,
      feedback: firstAlertAction.feedback,
      evidenceIds: ['initial-response-mobilized']
    }
  ]
} as const;

export const VERTICAL_BETA_CAUSAL_ROUTER = {
  id: 'crisis-router-causal-map',
  type: 'router',
  title: causalRouter.title,
  body: causalRouter.body,
  continueLabel: causalRouter.advanceLabel!
} as const;

export interface VerticalBetaResultContent {
  readonly variant: ResultVariant;
  readonly title: string;
  readonly summary: string;
  readonly closing: string;
}

export const VERTICAL_BETA_RESULT_VARIANTS = {
  contained: {
    variant: 'contained',
    ...result.variants!.contained
  },
  overwhelmed: {
    variant: 'overwhelmed',
    ...result.variants!.overwhelmed
  }
} as const satisfies Readonly<Record<ResultVariant, VerticalBetaResultContent>>;

export const VERTICAL_BETA_RESULT_ADVANCE_LABEL = result.advanceLabel!;
export const VERTICAL_BETA_DIMENSION_LABELS = VERTICAL_BETA_I18N_ES.dimensions;
export const VERTICAL_BETA_CAUSAL_RELATION_CONTENT =
  VERTICAL_BETA_I18N_ES.causalRelations;

export const VERTICAL_BETA_DECLARATIVE_CONTENT = [
  VERTICAL_BETA_BRIEFING,
  VERTICAL_BETA_PREVENTION_SUMMARY,
  VERTICAL_BETA_FIRST_ALERT,
  VERTICAL_BETA_CAUSAL_ROUTER,
  {
    id: 'ending-result-causal-report',
    type: 'result',
    title: result.title,
    body: result.body,
    variants: VERTICAL_BETA_RESULT_VARIANTS
  }
] as const;
