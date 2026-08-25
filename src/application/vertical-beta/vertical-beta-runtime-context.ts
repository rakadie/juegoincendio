export interface VerticalBetaRuntimeContext {
  readonly schemaVersion: 1;
  readonly referenceContextId: 'vb1-reference-context-v1';
  readonly municipalityProfileId: 'fictional-ravine-interface-municipality-v1';
  readonly weatherProfile: {
    readonly id: 'dry-windy-daylight-v1';
    readonly alertTime: '13:42';
    readonly daylight: true;
    readonly precipitation: 'none';
    readonly temperature: 'warm';
    readonly humidity: 'low';
    readonly windPattern: 'irregular-gusts';
    readonly windDirection: 'lower-ravine-to-interface';
    readonly changesDuringSession: false;
  };
  readonly ignitionProfile: {
    readonly id: 'lower-ravine-rural-track-v1';
    readonly location: 'lower-ravine-rural-track-edge';
    readonly cause: 'unconfirmed';
    readonly initialObservation: 'smoke-column-and-incipient-flames';
  };
  readonly externalCapacityProfileId: 'standard-response-capacity-v1';
  readonly exposureProfileId: 'same-homes-and-positions-v1';
  readonly rulesetId: 'm1-reference-rules-v1';
  readonly gameSessionSchemaVersion: 1;
  readonly randomness: 'none';
  readonly selectionLimits: {
    readonly territory: 3;
    readonly housing: 2;
  };
  readonly firstAlertActionId: 'movilizar-y-verificar';
  readonly expectedDecisionCount: 9;
  readonly expectedVisitedNodeCount: 10;
  readonly targetDurationMinutes: {
    readonly min: 20;
    readonly max: 25;
  };
}

export const VERTICAL_BETA_REFERENCE_CONTEXT: VerticalBetaRuntimeContext = {
  schemaVersion: 1,
  referenceContextId: 'vb1-reference-context-v1',
  municipalityProfileId: 'fictional-ravine-interface-municipality-v1',
  weatherProfile: {
    id: 'dry-windy-daylight-v1',
    alertTime: '13:42',
    daylight: true,
    precipitation: 'none',
    temperature: 'warm',
    humidity: 'low',
    windPattern: 'irregular-gusts',
    windDirection: 'lower-ravine-to-interface',
    changesDuringSession: false
  },
  ignitionProfile: {
    id: 'lower-ravine-rural-track-v1',
    location: 'lower-ravine-rural-track-edge',
    cause: 'unconfirmed',
    initialObservation: 'smoke-column-and-incipient-flames'
  },
  externalCapacityProfileId: 'standard-response-capacity-v1',
  exposureProfileId: 'same-homes-and-positions-v1',
  rulesetId: 'm1-reference-rules-v1',
  gameSessionSchemaVersion: 1,
  randomness: 'none',
  selectionLimits: { territory: 3, housing: 2 },
  firstAlertActionId: 'movilizar-y-verificar',
  expectedDecisionCount: 9,
  expectedVisitedNodeCount: 10,
  targetDurationMinutes: { min: 20, max: 25 }
};

export class VerticalBetaRuntimeContextError extends Error {
  readonly code = 'invalid-runtime-context';

  constructor(message: string) {
    super(message);
    this.name = 'VerticalBetaRuntimeContextError';
  }
}

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => `${JSON.stringify(key)}:${canonicalJson(child)}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

export function createVerticalBetaRuntimeContext(value: unknown): VerticalBetaRuntimeContext {
  if (canonicalJson(value) !== canonicalJson(VERTICAL_BETA_REFERENCE_CONTEXT)) {
    throw new VerticalBetaRuntimeContextError(
      'Vertical Beta 1 requires the exact vb1-reference-context-v1 configuration; randomness and silent context drift are forbidden.'
    );
  }
  return structuredClone(value) as VerticalBetaRuntimeContext;
}
