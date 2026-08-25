import type { Scenario } from '../domain/types/scenario.js';
import { OFFICIAL_OPERATIONAL_SCENES } from './official-operational-scenes.js';

/**
 * Canonical Scenario projections exposed by the player payload.
 * Historical source IDs remain only in the editorial library and archive.
 */
export const OFFICIAL_SOURCE_SCENARIOS = OFFICIAL_OPERATIONAL_SCENES.map(
  (scene): Scenario => ({
    id: scene.id,
    title: scene.title,
    category: 'operaciones',
    phase: 'crisis',
    block: 'vertical-beta-1',
    type: 'question',
    difficulty: scene.difficulty,
    estimatedTime: '2 min',
    tags: ['vertical-beta-1', 'canonical'],
    status: 'available',
    context: scene.context,
    question: scene.context,
    briefing: scene.briefing,
    requirements: null,
    options: scene.actions.map((action) => ({
      id: action.id,
      text: action.description,
      evaluation: action.evaluation,
      rationale: action.feedback,
      shortFeedback: action.feedback,
      impacts: [...action.effects],
      flags: [...action.flags]
    })),
    unlocks: [],
    sourceNotes: [
      `Canonical Vertical Beta 1 scene ${scene.id}; historical correspondence is documentation-only.`
    ]
  })
) as readonly Scenario[];
