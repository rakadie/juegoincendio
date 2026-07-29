export const INHERITED_STATE_MIN = 0 as const;
export const INHERITED_STATE_MAX = 100 as const;

export const INHERITED_STATE_DIMENSIONS = [
  'fuelLoad',
  'fuelContinuity',
  'operationalAccess',
  'defensibility',
  'attackOpportunity'
] as const;

export type InheritedStateDimension = (typeof INHERITED_STATE_DIMENSIONS)[number];
export type InheritedStateValue = number;
export type InheritedStateDirection = 'lower-is-better' | 'higher-is-better';

export interface InheritedState {
  readonly fuelLoad: InheritedStateValue;
  readonly fuelContinuity: InheritedStateValue;
  readonly operationalAccess: InheritedStateValue;
  readonly defensibility: InheritedStateValue;
  readonly attackOpportunity: InheritedStateValue;
}

export interface InheritedStateCategoryDefinition {
  readonly id: string;
  readonly min: number;
  readonly max: number;
}

export interface InheritedStateDimensionDefinition {
  readonly direction: InheritedStateDirection;
  readonly derived: boolean;
  readonly categories: readonly InheritedStateCategoryDefinition[];
  readonly preventiveSources: readonly string[];
  readonly crisisUses: readonly string[];
}

/**
 * Normative semantic metadata for M1 issue #32.
 *
 * Category IDs are technical identifiers. Visible labels belong to i18n.
 * Initial values, action deltas, aggregation and branch thresholds are
 * deliberately excluded and remain the responsibility of #33 and #34.
 */
export const INHERITED_STATE_DEFINITIONS = {
  fuelLoad: {
    direction: 'lower-is-better',
    derived: false,
    categories: [
      { id: 'low', min: 0, max: 24 },
      { id: 'moderate', min: 25, max: 49 },
      { id: 'high', min: 50, max: 74 },
      { id: 'extreme', min: 75, max: 100 }
    ],
    preventiveSources: [
      'pruning-residue-management',
      'preventive-grazing',
      'dry-vegetation-removal'
    ],
    crisisUses: ['potential-intensity', 'propagation-energy', 'containment-difficulty']
  },
  fuelContinuity: {
    direction: 'lower-is-better',
    derived: false,
    categories: [
      { id: 'broken', min: 0, max: 24 },
      { id: 'discontinuous', min: 25, max: 49 },
      { id: 'continuous', min: 50, max: 74 },
      { id: 'highly-continuous', min: 75, max: 100 }
    ],
    preventiveSources: [
      'vegetation-discontinuities',
      'lower-branch-pruning',
      'crown-separation',
      'strategic-vegetation-management'
    ],
    crisisUses: [
      'propagation-speed',
      'surface-to-crown-transition',
      'ember-production',
      'defensive-line-pressure'
    ]
  },
  operationalAccess: {
    direction: 'higher-is-better',
    derived: false,
    categories: [
      { id: 'blocked', min: 0, max: 24 },
      { id: 'limited', min: 25, max: 49 },
      { id: 'operational', min: 50, max: 74 },
      { id: 'robust', min: 75, max: 100 }
    ],
    preventiveSources: [
      'rural-road-margin-clearance',
      'fire-engine-access-clearance',
      'entry-and-retreat-route-maintenance'
    ],
    crisisUses: [
      'arrival-time',
      'machinery-entry',
      'crew-mobility',
      'retreat-routes',
      'sustained-intervention'
    ]
  },
  defensibility: {
    direction: 'higher-is-better',
    derived: false,
    categories: [
      { id: 'unviable', min: 0, max: 24 },
      { id: 'weak', min: 25, max: 49 },
      { id: 'viable', min: 50, max: 74 },
      { id: 'strong', min: 75, max: 100 }
    ],
    preventiveSources: [
      'nearby-fuel-reduction',
      'lower-branch-pruning',
      'crown-separation',
      'fire-engine-access-clearance',
      'defensible-vegetation-discontinuities'
    ],
    crisisUses: [
      'housing-defense',
      'safe-crew-presence',
      'retreat-necessity',
      'avoidable-damage'
    ]
  },
  attackOpportunity: {
    direction: 'higher-is-better',
    derived: true,
    categories: [
      { id: 'none', min: 0, max: 24 },
      { id: 'restricted', min: 25, max: 49 },
      { id: 'viable', min: 50, max: 74 },
      { id: 'favorable', min: 75, max: 100 }
    ],
    preventiveSources: [
      'fuel-load',
      'fuel-continuity',
      'operational-access',
      'defensibility',
      'professional-line-evaluation'
    ],
    crisisUses: [
      'emergency-line-viability',
      'safe-attack-position',
      'causal-branch-selection',
      'final-causal-explanation'
    ]
  }
} as const satisfies Readonly<Record<InheritedStateDimension, InheritedStateDimensionDefinition>>;

export type InheritedStateCategoryId =
  (typeof INHERITED_STATE_DEFINITIONS)[InheritedStateDimension]['categories'][number]['id'];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function hasExactDimensionKeys(value: Record<string, unknown>): boolean {
  const actual = Object.keys(value).sort();
  const expected = [...INHERITED_STATE_DIMENSIONS].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

export function isInheritedStateValue(value: unknown): value is InheritedStateValue {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    Number.isInteger(value) &&
    value >= INHERITED_STATE_MIN &&
    value <= INHERITED_STATE_MAX
  );
}

export function clampInheritedStateValue(value: number): InheritedStateValue {
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    throw new TypeError('InheritedState values must be finite integers before clamping.');
  }

  return Math.min(INHERITED_STATE_MAX, Math.max(INHERITED_STATE_MIN, value));
}

export function isInheritedState(value: unknown): value is InheritedState {
  if (!isPlainObject(value) || !hasExactDimensionKeys(value)) return false;
  return INHERITED_STATE_DIMENSIONS.every((dimension) => isInheritedStateValue(value[dimension]));
}

export function assertInheritedState(value: unknown): asserts value is InheritedState {
  if (!isInheritedState(value)) {
    throw new TypeError(
      'InheritedState must contain exactly five finite integer dimensions in the inclusive range 0..100.'
    );
  }
}

export function getInheritedStateCategory(
  dimension: InheritedStateDimension,
  value: InheritedStateValue
): InheritedStateCategoryId {
  if (!isInheritedStateValue(value)) {
    throw new RangeError('InheritedState category lookup requires an integer in the range 0..100.');
  }

  const definition: InheritedStateDimensionDefinition = INHERITED_STATE_DEFINITIONS[dimension];
  const category = definition.categories.find((candidate) => value >= candidate.min && value <= candidate.max);

  if (!category) {
    throw new RangeError(`No category covers ${dimension}=${value}.`);
  }

  return category.id as InheritedStateCategoryId;
}

export function isMoreFavorableInheritedStateValue(
  dimension: InheritedStateDimension,
  candidate: InheritedStateValue,
  reference: InheritedStateValue
): boolean {
  if (!isInheritedStateValue(candidate) || !isInheritedStateValue(reference)) {
    throw new RangeError('Favorability comparison requires integer values in the range 0..100.');
  }

  const direction = INHERITED_STATE_DEFINITIONS[dimension].direction;
  return direction === 'lower-is-better' ? candidate < reference : candidate > reference;
}
