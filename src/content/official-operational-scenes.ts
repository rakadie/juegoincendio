import {
  os011CorteCarreteraAcceso
} from './scenarios/operaciones/os-011-corte-carretera-acceso.js';
import {
  os025CortafuegoEmergencia
} from './scenarios/operaciones/os-025-cortafuego-emergencia.js';
import {
  os026DefensaOperativaNucleoViviendas
} from './scenarios/operaciones/os-026-defensa-operativa-nucleo-viviendas.js';
import {
  os027FuegoEnBarranco
} from './scenarios/operaciones/os-027-fuego-en-barranco.js';
import {
  os030FuegoDeCopas
} from './scenarios/operaciones/os-030-fuego-de-copas.js';
import type {
  OperationalAction,
  OperationalScene,
  OperationalSceneId
} from '../domain/types/operational-scene.js';
import type { Scenario, ScenarioOption } from '../domain/types/scenario.js';

function legacyOption(scene: Scenario, optionId: string): ScenarioOption {
  const option = scene.options.find(({ id }) => id === optionId);
  if (option === undefined) throw new Error(`${scene.id} does not contain option ${optionId}.`);
  return option;
}

function adaptedAction(
  scene: Scenario,
  optionId: string,
  contract: Omit<OperationalAction, 'description' | 'evaluation' | 'effects' | 'flags' | 'feedback'>
): OperationalAction {
  const option = legacyOption(scene, optionId);
  return {
    ...contract,
    description: option.text,
    evaluation: option.evaluation,
    effects: option.impacts,
    flags: option.flags ?? [],
    feedback: option.shortFeedback ?? option.rationale
  };
}

const accessBlockage: OperationalScene = {
  id: 'crisis-decision-access-blockage',
  type: 'decision',
  title: os011CorteCarreteraAcceso.title,
  context: os011CorteCarreteraAcceso.context,
  briefing: os011CorteCarreteraAcceso.briefing,
  branches: ['vulnerable'],
  difficulty: 'alta',
  actions: [
    adaptedAction(os011CorteCarreteraAcceso, 'c', {
      id: 'despejar-corredor-operativo',
      label: 'Abrir un corredor operativo limitado',
      resolutions: {
        vulnerable: {
          evidenceIds: ['temporary-operational-corridor-limited'],
          consequence:
            'Se habilita un corredor temporal, sin reparar la cadena preventiva de acceso.'
        }
      }
    }),
    adaptedAction(os011CorteCarreteraAcceso, 'a', {
      id: 'cerrar-acceso-y-reorganizar-medios',
      label: 'Cerrar el acceso y reorganizar los medios',
      resolutions: {
        vulnerable: {
          evidenceIds: ['unsafe-access-closed-resources-reorganized'],
          consequence: 'El acceso inseguro queda cerrado y los medios buscan posiciones exteriores.'
        }
      }
    }),
    adaptedAction(os011CorteCarreteraAcceso, 'd', {
      id: 'introducir-maquinaria-sin-repliegue',
      label: 'Introducir maquinaria sin repliegue confirmado',
      blockedReason: 'No existe una ruta segura de entrada, maniobra y retirada.',
      resolutions: {}
    }),
    adaptedAction(os011CorteCarreteraAcceso, 'e', {
      id: 'usar-linea-profesional-sin-acceso',
      label: 'Usar la línea evaluada sin acceso operativo',
      blockedReason: 'Una línea evaluada no es utilizable sin acceso y retirada seguros.',
      resolutions: {}
    })
  ]
};

const emergencyFuelBreak: OperationalScene = {
  id: 'crisis-decision-emergency-fuel-break',
  type: 'decision',
  title: os025CortafuegoEmergencia.title,
  context: os025CortafuegoEmergencia.context,
  briefing: os025CortafuegoEmergencia.briefing,
  branches: ['prepared'],
  difficulty: 'alta',
  actions: [
    adaptedAction(os025CortafuegoEmergencia, 'a', {
      id: 'autorizar-maniobra-condicionada',
      label: 'Autorizar una maniobra condicionada',
      requirements: {
        inheritedState: [
          { dimension: 'operationalAccess', operator: '>=', value: 50 },
          { dimension: 'defensibility', operator: '>=', value: 50 },
          { dimension: 'attackOpportunity', operator: '>=', value: 50 }
        ]
      },
      resolutions: {
        prepared: {
          evidenceIds: ['conditioned-emergency-maneuver-authorized'],
          consequence: 'La maniobra aprovecha una envolvente segura y conserva el repliegue.'
        }
      }
    }),
    adaptedAction(os025CortafuegoEmergencia, 'e', {
      id: 'mantener-evaluacion-sin-maniobra',
      label: 'Mantener la evaluación sin ejecutar la maniobra',
      resolutions: {
        prepared: {
          evidenceIds: ['emergency-maneuver-deferred-for-safety'],
          consequence: 'Se conserva el margen operativo sin abrir una línea adicional.'
        }
      }
    }),
    adaptedAction(os025CortafuegoEmergencia, 'd', {
      id: 'usar-linea-profesional-no-evaluada',
      label: 'Usar una línea profesional no evaluada',
      blockedReason: 'La maniobra exige evaluación técnica previa y condiciones compatibles.',
      resolutions: {}
    })
  ]
};

const housingDefense: OperationalScene = {
  id: 'crisis-decision-housing-defense',
  type: 'decision',
  title: os026DefensaOperativaNucleoViviendas.title,
  context: os026DefensaOperativaNucleoViviendas.context,
  briefing: os026DefensaOperativaNucleoViviendas.briefing,
  branches: ['prepared'],
  difficulty: 'alta',
  actions: [
    adaptedAction(os026DefensaOperativaNucleoViviendas, 'a', {
      id: 'defender-desde-posicion-segura',
      label: 'Defender desde una posición segura',
      requirements: {
        inheritedState: [
          { dimension: 'operationalAccess', operator: '>=', value: 50 },
          { dimension: 'defensibility', operator: '>=', value: 50 }
        ]
      },
      resolutions: {
        prepared: {
          evidenceIds: ['housing-defense-sustained-selectively'],
          consequence: 'La defensa se sostiene con prioridades y una vía segura de retirada.'
        }
      }
    }),
    adaptedAction(os026DefensaOperativaNucleoViviendas, 'c', {
      id: 'defensa-selectiva-con-prioridades',
      label: 'Priorizar las viviendas defendibles',
      requirements: {
        inheritedState: [
          { dimension: 'operationalAccess', operator: '>=', value: 25 },
          { dimension: 'defensibility', operator: '>=', value: 25 }
        ]
      },
      resolutions: {
        prepared: {
          evidenceIds: ['housing-defense-priorities-established'],
          consequence: 'Los recursos se concentran en posiciones defendibles y con retirada.'
        }
      }
    }),
    adaptedAction(os026DefensaOperativaNucleoViviendas, 'e', {
      id: 'defensa-total-sin-repliegue',
      label: 'Defender todas las viviendas sin repliegue',
      blockedReason: 'La defensa total expone a los equipos y elimina la salida segura.',
      resolutions: {}
    })
  ]
};

const ravineFire: OperationalScene = {
  id: 'crisis-decision-ravine-fire',
  type: 'decision',
  title: os027FuegoEnBarranco.title,
  context: os027FuegoEnBarranco.context,
  briefing: os027FuegoEnBarranco.briefing,
  branches: ['prepared', 'vulnerable'],
  difficulty: 'alta',
  difficultyByBranch: { vulnerable: 'critica' },
  actions: [
    adaptedAction(os027FuegoEnBarranco, 'c', {
      id: 'asegurar-flancos-y-repliegue',
      label: 'Asegurar flancos y repliegue',
      resolutions: {
        prepared: {
          evidenceIds: ['ravine-position-held-with-safe-retreat'],
          consequence: 'La posición se sostiene y conserva una retirada segura.'
        },
        vulnerable: {
          evidenceIds: ['ravine-position-not-holdable-safe-retreat'],
          consequence: 'Los flancos protegen la retirada, pero la posición no puede sostenerse.'
        }
      }
    }),
    adaptedAction(os027FuegoEnBarranco, 'a', {
      id: 'mantener-ataque-anclado',
      label: 'Mantener un ataque anclado',
      requirements: {
        inheritedState: [
          { dimension: 'operationalAccess', operator: '>=', value: 50 },
          { dimension: 'defensibility', operator: '>=', value: 50 },
          { dimension: 'attackOpportunity', operator: '>=', value: 50 }
        ]
      },
      resolutions: {
        prepared: {
          evidenceIds: ['ravine-anchored-attack-maintained'],
          consequence: 'El ataque permanece anclado mientras se conserva una salida segura.'
        }
      }
    }),
    adaptedAction(os027FuegoEnBarranco, 'e', {
      id: 'vigilancia-y-proteccion-indirecta',
      label: 'Vigilar y proteger desde el exterior',
      resolutions: {
        prepared: {
          evidenceIds: ['ravine-indirect-protection-established'],
          consequence: 'Se limita la exposición manteniendo vigilancia exterior.'
        },
        vulnerable: {
          evidenceIds: ['ravine-indirect-protection-established'],
          consequence: 'La respuesta exterior protege equipos sin fingir una posición sostenible.'
        }
      }
    }),
    adaptedAction(os027FuegoEnBarranco, 'd', {
      id: 'ataque-directo-sin-anclaje',
      label: 'Atacar directamente sin anclaje',
      blockedReason: 'El efecto chimenea puede cortar la retirada en pocos minutos.',
      resolutions: {}
    })
  ]
};

const crownFire: OperationalScene = {
  id: 'crisis-decision-crown-fire',
  type: 'decision',
  title: os030FuegoDeCopas.title,
  context: os030FuegoDeCopas.context,
  briefing: os030FuegoDeCopas.briefing,
  branches: ['vulnerable'],
  difficulty: 'critica',
  actions: [
    adaptedAction(os030FuegoDeCopas, 'a', {
      id: 'replegar-ante-fuego-de-copas',
      label: 'Replegar y priorizar vidas',
      resolutions: {
        vulnerable: {
          evidenceIds: ['safe-retreat-before-crown-fire'],
          consequence: 'El repliegue protege a los equipos ante una propagación fuera de capacidad.'
        }
      }
    }),
    adaptedAction(os030FuegoDeCopas, 'c', {
      id: 'ataque-indirecto-y-vigilancia',
      label: 'Mantener ataque indirecto y vigilancia',
      resolutions: {
        vulnerable: {
          evidenceIds: ['crown-fire-indirect-monitoring-established'],
          consequence: 'La vigilancia exterior protege vidas sin exponer medios al frente de copas.'
        }
      }
    }),
    adaptedAction(os030FuegoDeCopas, 'b', {
      id: 'sostener-ataque-directo',
      label: 'Sostener el ataque directo',
      blockedReason: 'El fuego de copas supera la capacidad segura de ataque directo.',
      resolutions: {}
    }),
    adaptedAction(os030FuegoDeCopas, 'e', {
      id: 'defender-posicion-sin-salida',
      label: 'Defender una posición sin salida',
      blockedReason: 'Una posición sin retirada confirmada no es defendible.',
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
