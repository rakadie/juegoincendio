import type { Scenario } from '../../../domain/types/scenario.js';

export const cs016RumorEvacuacionNoroeste: Scenario = {
  id: 's-016-rumor-evacuacion-noroeste',
  title: 'Rumor de evacuacion en municipios del noroeste',
  category: 'comunicacion',
  phase: 'crisis',
  block: 'evacuacion-y-proteccion-civil',
  type: 'action-selection',
  difficulty: 'media',
  estimatedTime: '2 min',
  maxActions: 2,
  tags: [
    'evacuacion',
    'redes-sociales',
    'rumor',
    'proteccion-civil',
    'municipios-noroeste',
    'comunicacion-crisis'
  ],
  status: 'available',
  intro:
    'Un audio asegura que todos los municipios del noroeste deben evacuar de inmediato.',
  context:
    'La direccion de la emergencia no ha ordenado una evacuacion general en esa zona. Aun asi, el mensaje se mueve rapido por grupos vecinales y perfiles locales. Algunas familias empiezan a cargar el coche, otras llaman al 112 y varios ayuntamientos piden una aclaracion urgente. Si el rumor empuja salidas espontaneas, puede bloquear carreteras secundarias antes de que la amenaza real llegue.',
  objective:
    'Cortar una falsa orden de evacuacion sin crear mas alarma ni debilitar la autoridad de los canales oficiales.',
  question:
    'Que dos actuaciones priorizas para frenar el rumor y mantener preparada a la poblacion?',
  briefing:
    'La respuesta debe ser inmediata, institucional y util: aclarar que no hay orden general, explicar que zonas si estan afectadas y recordar como se comunicaria una evacuacion real.',
  requirements: null,
  pressureIndicators: [
    { id: 'confusionPublica', label: 'Rumor de evacuacion', level: 'activo' },
    { id: 'riesgoAtrapamiento', label: 'Riesgo de salidas espontaneas', level: 'subiendo' },
    { id: 'coordinacionOperativa', label: 'Coordinacion institucional', level: 'bajo presion' }
  ],
  actions: [
    {
      id: 'comunicado-inmediato',
      label: 'Emitir comunicado oficial inmediato',
      description:
        'Aclarar que no existe una orden de evacuacion general, indicar zonas afectadas y pedir seguimiento exclusivo de canales oficiales.',
      impact: {
        confusionPublica: -4,
        saturacion112: -3,
        confianzaInstitucional: 3,
        riesgoAtrapamiento: -2
      },
      flagsOnApply: ['comunicadoEvacuacionInmediato'],
      feedback:
        'El rumor encuentra una respuesta clara. La poblacion tiene una frase concreta a la que agarrarse.'
    },
    {
      id: 'mensaje-conjunto-instituciones',
      label: 'Coordinar mensaje conjunto con ayuntamientos y Proteccion Civil',
      description:
        'Publicar una aclaracion coordinada con ayuntamientos, Proteccion Civil y cuerpos de seguridad para evitar contradicciones.',
      impact: {
        confusionPublica: -4,
        coordinacionOperativa: 4,
        confianzaInstitucional: 3
      },
      flagsOnApply: ['mensajeConjuntoInstituciones'],
      feedback:
        'Las instituciones no compiten entre si. La aclaracion llega con una sola voz.'
    },
    {
      id: 'actualizar-zonas-rutas',
      label: 'Actualizar zonas afectadas y rutas oficiales',
      description:
        'Publicar una referencia breve con zonas vigiladas, zonas sin orden de salida, rutas reservadas y punto de informacion.',
      impact: {
        confusionPublica: -3,
        riesgoAtrapamiento: -3,
        coordinacionOperativa: 2
      },
      flagsOnApply: ['zonasYRutasActualizadas'],
      feedback:
        'La aclaracion se convierte en instruccion practica. Menos gente improvisa.'
    },
    {
      id: 'silencio-no-amplificar',
      label: 'Guardar silencio para no amplificar el rumor',
      description:
        'No responder de momento y esperar a que el mensaje pierda fuerza por si solo.',
      impact: {
        confusionPublica: 5,
        saturacion112: 3,
        riesgoAtrapamiento: 3,
        confianzaInstitucional: -3
      },
      flagsOnApply: ['silencioAnteRumorEvacuacion'],
      feedback:
        'El hueco lo ocupa el miedo. El rumor empieza a comportarse como si fuera una orden.'
    },
    {
      id: 'evacuacion-masiva-preventiva',
      label: 'Ordenar evacuacion masiva preventiva sin base operativa',
      description:
        'Evacuar todos los municipios mencionados en el rumor para evitar criticas si el viento cambia.',
      impact: {
        confusionPublica: 4,
        riesgoAtrapamiento: 5,
        coordinacionOperativa: -5,
        saturacionRecursos: 4
      },
      flagsOnApply: ['evacuacionMasivaSinBase'],
      feedback:
        'La decision convierte un rumor en trafico real. Las carreteras secundarias pierden margen.'
    },
    {
      id: 'respuesta-personal-redes',
      label: 'Responder desde una cuenta personal',
      description:
        'Criticar publicamente a quienes difundieron el rumor y pedir que dejen de alarmar.',
      impact: {
        confusionPublica: 3,
        confianzaInstitucional: -4,
        coordinacionOperativa: -2,
        tensionPublica: 3
      },
      flagsOnApply: ['respuestaPersonalConfrontativa'],
      feedback:
        'La respuesta se convierte en disputa. La poblacion necesitaba instrucciones, no una bronca.'
    }
  ],
  combos: [
    {
      id: 'voz-unica',
      title: 'Una sola voz institucional',
      requires: ['comunicadoEvacuacionInmediato', 'mensajeConjuntoInstituciones'],
      text:
        'El rumor queda contradicho por un mensaje rapido y coordinado. La poblacion sabe donde mirar antes de actuar.',
      bonusImpact: {
        confusionPublica: -2,
        confianzaInstitucional: 2
      }
    },
    {
      id: 'aclaracion-operativa',
      title: 'Aclaracion con instrucciones',
      requires: ['comunicadoEvacuacionInmediato', 'zonasYRutasActualizadas'],
      text:
        'La aclaracion no solo desmiente: explica que hacer y que no hacer. Baja el riesgo de salidas espontaneas.',
      bonusImpact: {
        riesgoAtrapamiento: -2,
        saturacion112: -1
      }
    },
    {
      id: 'caos-por-exceso',
      title: 'Caos por exceso de reaccion',
      requires: ['evacuacionMasivaSinBase', 'respuestaPersonalConfrontativa'],
      text:
        'La institucion transmite nerviosismo y contradiccion. El rumor ya no solo circula: mueve coches.',
      bonusImpact: {
        confusionPublica: 3,
        riesgoAtrapamiento: 3,
        coordinacionOperativa: -2
      }
    }
  ],
  outcomes: [
    {
      id: 'alto',
      title: 'Rumor frenado antes de mover a la poblacion',
      condition: {
        confusionPublica: '<=1',
        riesgoAtrapamiento: '<=0'
      },
      text:
        'La aclaracion llega a tiempo y con una sola voz. Algunas dudas siguen abiertas, pero la falsa evacuacion no llega a convertirse en salida desordenada.',
      crisisImpact: {
        poblacionProtegida: 2,
        confianzaInstitucional: 1,
        riesgoAtrapamiento: -1
      }
    },
    {
      id: 'medio',
      title: 'Rumor contenido con tension vecinal',
      condition: {
        confusionPublica: '<=5'
      },
      text:
        'La respuesta reduce el dano, pero parte de la poblacion sigue inquieta. El siguiente cambio de viento llegara con nervios acumulados.',
      crisisImpact: {
        confusionPublica: 1,
        saturacion112: 1
      }
    },
    {
      id: 'bajo',
      title: 'Salidas espontaneas y carreteras tensionadas',
      condition: {
        confusionPublica: '>5'
      },
      text:
        'El rumor gana velocidad. Algunas familias salen sin instrucciones claras y los equipos empiezan a perder margen en las vias secundarias.',
      crisisImpact: {
        confusionPublica: 3,
        riesgoAtrapamiento: 3,
        coordinacionOperativa: -2
      }
    }
  ],
  nextLogic: [
    {
      id: 'viento-con-poblacion-preparada',
      condition: {
        riesgoAtrapamiento: '<=1',
        confianzaInstitucional: '>=3'
      },
      nextScenario: 's-010-cambio-viento-evacuacion',
      transition:
        'El rumor queda bajo control, pero el incendio no negocia con la informacion. El viento cambia hacia un nucleo poblado.'
    },
    {
      id: 'viento-con-carreteras-tensas',
      condition: {
        riesgoAtrapamiento: '>=4'
      },
      nextScenario: 's-010-cambio-viento-evacuacion',
      transition:
        'El rumor deja carreteras mas cargadas justo cuando el viento empuja el frente hacia una zona habitada.'
    },
    {
      id: 'ruta-base-cambio-viento',
      condition: 'default',
      nextScenario: 's-010-cambio-viento-evacuacion',
      transition:
        'La comunicacion estabiliza parte de la situacion, pero el incendio abre una amenaza nueva: el viento gira hacia viviendas.'
    }
  ],
  options: [],
  unlocks: ['s-010-cambio-viento-evacuacion'],
  sourceNotes: [
    'La gestion de rumores en emergencias requiere comunicacion rapida, oficial, coordinada y verificable.',
    'Ante una falsa orden de evacuacion, el objetivo es evitar panico, movimientos innecesarios de poblacion y saturacion de vias.',
    'Esta version forma parte de la beta vertical de la ruta comunicacion.'
  ]
};
