import type {
  OperationalAction,
  OperationalActionResolution,
  OperationalScene,
  OperationalSceneId
} from '../domain/types/operational-scene.js';
import {
  CRISIS_BRANCHES,
  type CrisisBranch
} from '../domain/types/game-scene.js';
import { VERTICAL_BETA_I18N_ES } from './i18n/es/vertical-beta.js';
import {
  requireVerticalBetaActionMessages,
  requireVerticalBetaSceneMessages
} from './i18n/vertical-beta-i18n.js';

interface OperationalActionContract {
  readonly evaluation: OperationalAction['evaluation'];
  readonly effects: OperationalAction['effects'];
  readonly flags: OperationalAction['flags'];
  readonly requirements?: OperationalAction['requirements'];
  readonly resolutions: Partial<
    Readonly<Record<CrisisBranch, { readonly evidenceIds: readonly string[] }>>
  >;
}

function localizedAction(
  sceneId: OperationalSceneId,
  actionId: string,
  contract: OperationalActionContract
): OperationalAction {
  const copy = requireVerticalBetaActionMessages(
    VERTICAL_BETA_I18N_ES,
    sceneId,
    actionId
  );
  const resolutions: Partial<Record<CrisisBranch, OperationalActionResolution>> = {};
  for (const branch of CRISIS_BRANCHES) {
    const resolution = contract.resolutions[branch];
    if (resolution === undefined) continue;
    const consequence = copy.consequences?.[branch];
    if (consequence === undefined) {
      throw new Error(`Missing consequence translation for ${sceneId}.${actionId}.${branch}.`);
    }
    resolutions[branch] = {
      evidenceIds: resolution.evidenceIds,
      consequence
    };
  }

  return {
    id: actionId,
    label: copy.label,
    description: copy.description,
    evaluation: contract.evaluation,
    effects: contract.effects,
    flags: contract.flags,
    feedback: copy.feedback,
    ...(contract.requirements === undefined ? {} : { requirements: contract.requirements }),
    ...(copy.blockedReason === undefined ? {} : { blockedReason: copy.blockedReason }),
    resolutions
  };
}

function sceneCopy(sceneId: OperationalSceneId) {
  return requireVerticalBetaSceneMessages(VERTICAL_BETA_I18N_ES, sceneId);
}

const accessCopy = sceneCopy('crisis-decision-access-blockage');
const accessBlockage: OperationalScene = {
  id: 'crisis-decision-access-blockage',
  type: 'decision',
  title: accessCopy.title,
  context: accessCopy.context!,
  briefing: accessCopy.body,
  branches: ['vulnerable'],
  difficulty: 'alta',
  actions: [
    localizedAction('crisis-decision-access-blockage', 'despejar-corredor-operativo', {
      evaluation: 'recommended',
      effects: [],
      flags: [],
      resolutions: {
        vulnerable: { evidenceIds: ['temporary-operational-corridor-limited'] }
      }
    }),
    localizedAction('crisis-decision-access-blockage', 'cerrar-acceso-y-reorganizar-medios', {
      evaluation: 'recommended',
      effects: [],
      flags: [],
      resolutions: {
        vulnerable: { evidenceIds: ['unsafe-access-closed-resources-reorganized'] }
      }
    }),
    localizedAction('crisis-decision-access-blockage', 'introducir-maquinaria-sin-repliegue', {
      evaluation: 'risky',
      effects: [],
      flags: [],
      resolutions: {}
    }),
    localizedAction('crisis-decision-access-blockage', 'usar-linea-profesional-sin-acceso', {
      evaluation: 'risky',
      effects: [],
      flags: [],
      resolutions: {}
    })
  ]
};

const fuelBreakCopy = sceneCopy('crisis-decision-emergency-fuel-break');
const emergencyFuelBreak: OperationalScene = {
  id: 'crisis-decision-emergency-fuel-break',
  type: 'decision',
  title: fuelBreakCopy.title,
  context: fuelBreakCopy.context!,
  briefing: fuelBreakCopy.body,
  branches: ['prepared'],
  difficulty: 'alta',
  actions: [
    localizedAction('crisis-decision-emergency-fuel-break', 'autorizar-maniobra-condicionada', {
      evaluation: 'recommended',
      effects: [],
      flags: ['cortafuego-condicionado'],
      requirements: {
        inheritedState: [
          { dimension: 'operationalAccess', operator: '>=', value: 50 },
          { dimension: 'defensibility', operator: '>=', value: 50 },
          { dimension: 'attackOpportunity', operator: '>=', value: 50 }
        ]
      },
      resolutions: {
        prepared: { evidenceIds: ['conditioned-emergency-maneuver-authorized'] }
      }
    }),
    localizedAction('crisis-decision-emergency-fuel-break', 'mantener-evaluacion-sin-maniobra', {
      evaluation: 'risky',
      effects: [],
      flags: ['cortafuego-decision-tardia'],
      resolutions: {
        prepared: { evidenceIds: ['emergency-maneuver-deferred-for-safety'] }
      }
    }),
    localizedAction('crisis-decision-emergency-fuel-break', 'usar-linea-profesional-no-evaluada', {
      evaluation: 'critical',
      effects: [],
      flags: ['quema-tecnica-viento-inestable'],
      resolutions: {}
    })
  ]
};

const housingCopy = sceneCopy('crisis-decision-housing-defense');
const housingDefense: OperationalScene = {
  id: 'crisis-decision-housing-defense',
  type: 'decision',
  title: housingCopy.title,
  context: housingCopy.context!,
  briefing: housingCopy.body,
  branches: ['prepared'],
  difficulty: 'alta',
  actions: [
    localizedAction('crisis-decision-housing-defense', 'defender-desde-posicion-segura', {
      evaluation: 'recommended',
      effects: [
        { variableKey: 'seguridadEquipos', delta: 5 },
        { variableKey: 'poblacionProtegida', delta: 4 },
        { variableKey: 'coordinacionOperativa', delta: 4 },
        { variableKey: 'riesgoAtrapamiento', delta: -5 }
      ],
      flags: [],
      requirements: {
        inheritedState: [
          { dimension: 'operationalAccess', operator: '>=', value: 50 },
          { dimension: 'defensibility', operator: '>=', value: 50 }
        ]
      },
      resolutions: {
        prepared: { evidenceIds: ['housing-defense-sustained-selectively'] }
      }
    }),
    localizedAction('crisis-decision-housing-defense', 'defensa-selectiva-con-prioridades', {
      evaluation: 'recommended',
      effects: [
        { variableKey: 'seguridadEquipos', delta: 4 },
        { variableKey: 'coordinacionOperativa', delta: 5 },
        { variableKey: 'danosPotencialesVivienda', delta: -3 },
        { variableKey: 'riesgoAtrapamiento', delta: -3 }
      ],
      flags: [],
      requirements: {
        inheritedState: [
          { dimension: 'operationalAccess', operator: '>=', value: 25 },
          { dimension: 'defensibility', operator: '>=', value: 25 }
        ]
      },
      resolutions: {
        prepared: { evidenceIds: ['housing-defense-priorities-established'] }
      }
    }),
    localizedAction('crisis-decision-housing-defense', 'defensa-total-sin-repliegue', {
      evaluation: 'risky',
      effects: [
        { variableKey: 'seguridadEquipos', delta: -5 },
        { variableKey: 'riesgoAtrapamiento', delta: 5 },
        { variableKey: 'coordinacionOperativa', delta: -5 },
        { variableKey: 'saturacionRecursos', delta: 4 },
        { variableKey: 'danosPotencialesVivienda', delta: 3 }
      ],
      flags: [],
      resolutions: {}
    })
  ]
};

const ravineCopy = sceneCopy('crisis-decision-ravine-fire');
const ravineFire: OperationalScene = {
  id: 'crisis-decision-ravine-fire',
  type: 'decision',
  title: ravineCopy.title,
  context: ravineCopy.context!,
  briefing: ravineCopy.body,
  branches: ['prepared', 'vulnerable'],
  difficulty: 'alta',
  difficultyByBranch: { vulnerable: 'critica' },
  actions: [
    localizedAction('crisis-decision-ravine-fire', 'asegurar-flancos-y-repliegue', {
      evaluation: 'recommended',
      effects: [
        { variableKey: 'eficaciaExtincion', delta: 5 },
        { variableKey: 'seguridadEquipos', delta: 4 },
        { variableKey: 'riesgoAtrapamiento', delta: -4 },
        { variableKey: 'danosPotencialesVivienda', delta: -3 },
        { variableKey: 'coordinacionOperativa', delta: 3 }
      ],
      flags: [],
      resolutions: {
        prepared: { evidenceIds: ['ravine-position-held-with-safe-retreat'] },
        vulnerable: { evidenceIds: ['ravine-position-not-holdable-safe-retreat'] }
      }
    }),
    localizedAction('crisis-decision-ravine-fire', 'mantener-ataque-anclado', {
      evaluation: 'recommended',
      effects: [
        { variableKey: 'eficaciaExtincion', delta: 4 },
        { variableKey: 'seguridadEquipos', delta: 4 },
        { variableKey: 'coordinacionOperativa', delta: 3 },
        { variableKey: 'riesgoAtrapamiento', delta: -3 },
        { variableKey: 'danosPotencialesVivienda', delta: -2 }
      ],
      flags: [],
      requirements: {
        inheritedState: [
          { dimension: 'operationalAccess', operator: '>=', value: 50 },
          { dimension: 'defensibility', operator: '>=', value: 50 },
          { dimension: 'attackOpportunity', operator: '>=', value: 50 }
        ]
      },
      resolutions: {
        prepared: { evidenceIds: ['ravine-anchored-attack-maintained'] }
      }
    }),
    localizedAction('crisis-decision-ravine-fire', 'vigilancia-y-proteccion-indirecta', {
      evaluation: 'risky',
      effects: [
        { variableKey: 'eficaciaExtincion', delta: -4 },
        { variableKey: 'danosPotencialesVivienda', delta: 4 },
        { variableKey: 'riesgoPropagacion', delta: 5 },
        { variableKey: 'coordinacionOperativa', delta: -2 }
      ],
      flags: [],
      resolutions: {
        prepared: { evidenceIds: ['ravine-indirect-protection-established'] },
        vulnerable: { evidenceIds: ['ravine-indirect-protection-established'] }
      }
    }),
    localizedAction('crisis-decision-ravine-fire', 'ataque-directo-sin-anclaje', {
      evaluation: 'risky',
      effects: [
        { variableKey: 'seguridadEquipos', delta: -5 },
        { variableKey: 'riesgoAtrapamiento', delta: 5 },
        { variableKey: 'eficaciaExtincion', delta: -3 },
        { variableKey: 'coordinacionOperativa', delta: -2 }
      ],
      flags: [],
      resolutions: {}
    })
  ]
};

const crownCopy = sceneCopy('crisis-decision-crown-fire');
const crownFire: OperationalScene = {
  id: 'crisis-decision-crown-fire',
  type: 'decision',
  title: crownCopy.title,
  context: crownCopy.context!,
  briefing: crownCopy.body,
  branches: ['vulnerable'],
  difficulty: 'critica',
  actions: [
    localizedAction('crisis-decision-crown-fire', 'replegar-ante-fuego-de-copas', {
      evaluation: 'recommended',
      effects: [
        { variableKey: 'seguridadEquipos', delta: 5 },
        { variableKey: 'riesgoAtrapamiento', delta: -5 },
        { variableKey: 'poblacionProtegida', delta: 4 },
        { variableKey: 'coordinacionOperativa', delta: 4 },
        { variableKey: 'danosPotencialesVivienda', delta: 3 }
      ],
      flags: [],
      resolutions: {
        vulnerable: { evidenceIds: ['safe-retreat-before-crown-fire'] }
      }
    }),
    localizedAction('crisis-decision-crown-fire', 'ataque-indirecto-y-vigilancia', {
      evaluation: 'recommended',
      effects: [
        { variableKey: 'poblacionProtegida', delta: 5 },
        { variableKey: 'riesgoAtrapamiento', delta: -4 },
        { variableKey: 'confusionPublica', delta: -3 },
        { variableKey: 'coordinacionOperativa', delta: 4 },
        { variableKey: 'seguridadEquipos', delta: 3 }
      ],
      flags: [],
      resolutions: {
        vulnerable: { evidenceIds: ['crown-fire-indirect-monitoring-established'] }
      }
    }),
    localizedAction('crisis-decision-crown-fire', 'sostener-ataque-directo', {
      evaluation: 'risky',
      effects: [
        { variableKey: 'seguridadEquipos', delta: -5 },
        { variableKey: 'riesgoAtrapamiento', delta: 5 },
        { variableKey: 'eficaciaExtincion', delta: -4 },
        { variableKey: 'danosPotencialesVivienda', delta: 4 },
        { variableKey: 'coordinacionOperativa', delta: -3 }
      ],
      flags: [],
      resolutions: {}
    }),
    localizedAction('crisis-decision-crown-fire', 'defender-posicion-sin-salida', {
      evaluation: 'risky',
      effects: [
        { variableKey: 'seguridadEquipos', delta: -5 },
        { variableKey: 'riesgoAtrapamiento', delta: 5 },
        { variableKey: 'poblacionProtegida', delta: -3 },
        { variableKey: 'coordinacionOperativa', delta: -4 },
        { variableKey: 'danosPotencialesVivienda', delta: 4 }
      ],
      flags: [],
      resolutions: {}
    })
  ]
};

export const OFFICIAL_OPERATIONAL_SCENES = [
  accessBlockage,
  emergencyFuelBreak,
  housingDefense,
  ravineFire,
  crownFire
] as const satisfies readonly OperationalScene[];

export function getOfficialOperationalScene(sceneId: OperationalSceneId): OperationalScene {
  const scene = OFFICIAL_OPERATIONAL_SCENES.find(({ id }) => id === sceneId);
  if (scene === undefined) throw new Error(`Unknown official operational scene ${sceneId}.`);
  return scene;
}
