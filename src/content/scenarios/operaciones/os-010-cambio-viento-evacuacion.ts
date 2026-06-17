import type { Scenario } from '../../../domain/types/scenario.js';

export const os010CambioVientoEvacuacion: Scenario = {
  id: 's-010-cambio-viento-evacuacion',
  title: 'Cambio de viento hacia nucleo poblado',
  category: 'operaciones',
  phase: 'crisis',
  block: 'evacuacion-y-proteccion-civil',
  type: 'action-selection',
  difficulty: 'alta',
  estimatedTime: '2 min',
  maxActions: 2,
  tags: [
    'evacuacion',
    'proteccion-civil',
    'ganaderia',
    'viento',
    'zona-habitada'
  ],
  status: 'available',
  intro:
    'El viento cambia y empuja el frente hacia un nucleo poblado.',
  context:
    'El incendio gana velocidad en una ladera con viviendas dispersas, explotaciones ganaderas y carreteras secundarias con capacidad limitada. El humo puede reducir la visibilidad en pocos minutos. Parte de la poblacion llega inquieta por los rumores previos y algunos vecinos ya se plantean salir por su cuenta. Ahora la prioridad es proteger a la poblacion sin bloquear el trabajo de los equipos.',
  objective:
    'Ordenar evacuacion, confinamiento y rutas con margen suficiente para evitar atrapamientos.',
  question:
    'Que dos actuaciones inmediatas priorizas ante el cambio de viento?',
  briefing:
    'Esta es la convergencia de la beta vertical: lo que se preparo antes y lo que se comunico durante la crisis condiciona el margen disponible para proteger a la poblacion.',
  requirements: null,
  pressureIndicators: [
    { id: 'riesgoAtrapamiento', label: 'Riesgo de atrapamiento', level: 'critico' },
    { id: 'poblacionProtegida', label: 'Poblacion protegida', level: 'en disputa' },
    { id: 'coordinacionOperativa', label: 'Coordinacion operativa', level: 'decisiva' }
  ],
  actions: [
    {
      id: 'evacuacion-escalonada',
      label: 'Activar evacuacion preventiva escalonada',
      description:
        'Ordenar la salida de las viviendas mas expuestas, priorizando personas vulnerables y zonas con peor acceso, con rutas confirmadas.',
      impact: {
        poblacionProtegida: 5,
        riesgoAtrapamiento: -4,
        coordinacionOperativa: 2,
        confusionPublica: -1
      },
      flagsOnApply: ['evacuacionEscalonadaActivada'],
      feedback:
        'La salida empieza por donde el margen es menor. La evacuacion gana orden antes de que el humo complique las rutas.'
    },
    {
      id: 'mensaje-rutas-puntos',
      label: 'Comunicar rutas y puntos de encuentro',
      description:
        'Emitir una instruccion unica con zonas afectadas, rutas habilitadas, puntos de encuentro y objetos esenciales.',
      impact: {
        confusionPublica: -4,
        coordinacionOperativa: 4,
        poblacionProtegida: 2,
        riesgoAtrapamiento: -2
      },
      flagsOnApply: ['rutasYPuntosComunicados'],
      feedback:
        'La poblacion sabe quien debe salir, por donde y hacia donde. Menos decisiones se toman desde el miedo.'
    },
    {
      id: 'transporte-vulnerables',
      label: 'Activar transporte para personas sin vehiculo',
      description:
        'Movilizar apoyo municipal y Proteccion Civil para personas registradas sin vehiculo o con movilidad reducida.',
      impact: {
        poblacionProtegida: 4,
        inclusionVulnerables: 3,
        coordinacionOperativa: 2,
        riesgoAtrapamiento: -3
      },
      flagsOnApply: ['transporteVulnerablesActivado'],
      feedback:
        'La evacuacion deja de depender de tener coche, familia cerca o buena suerte.'
    },
    {
      id: 'confinamiento-si-rutas-no-seguras',
      label: 'Preparar confinamiento si las rutas se cierran',
      description:
        'Definir instrucciones de confinamiento para viviendas o edificios donde salir pueda ser mas peligroso que permanecer dentro.',
      impact: {
        poblacionProtegida: 3,
        exposicionHumoCalor: -2,
        coordinacionOperativa: 3
      },
      flagsOnApply: ['confinamientoPreparado'],
      feedback:
        'No todas las salidas son seguras. Tener plan de confinamiento evita improvisar cuando una ruta deja de ser viable.'
    },
    {
      id: 'esperar-fuego-cerca',
      label: 'Esperar a que el fuego este mas cerca',
      description:
        'Retrasar la decision para no alarmar a la poblacion antes de confirmar que el nucleo esta directamente amenazado.',
      impact: {
        poblacionProtegida: -4,
        riesgoAtrapamiento: 5,
        coordinacionOperativa: -2,
        confusionPublica: 2
      },
      flagsOnApply: ['evacuacionRetrasada'],
      feedback:
        'El margen se estrecha. En incendios con viento cambiante, esperar puede convertir una salida ordenada en una carrera.'
    },
    {
      id: 'evacuacion-general-sin-rutas',
      label: 'Ordenar evacuacion general sin rutas confirmadas',
      description:
        'Pedir la salida de toda la comarca de inmediato, aunque no esten confirmadas rutas, transporte ni capacidad de acogida.',
      impact: {
        confusionPublica: 4,
        riesgoAtrapamiento: 4,
        coordinacionOperativa: -5,
        poblacionProtegida: -2
      },
      flagsOnApply: ['evacuacionGeneralSinRutas'],
      feedback:
        'La orden mueve mucha gente sin estructura. Las carreteras se cargan justo cuando los equipos necesitan paso.'
    }
  ],
  combos: [
    {
      id: 'evacuacion-con-instrucciones',
      title: 'Evacuacion con instrucciones claras',
      requires: ['evacuacionEscalonadaActivada', 'rutasYPuntosComunicados'],
      text:
        'La orden llega con ruta, prioridad y destino. La poblacion se mueve con menos confusion y los equipos conservan margen.',
      bonusImpact: {
        poblacionProtegida: 2,
        riesgoAtrapamiento: -2,
        confusionPublica: -1
      }
    },
    {
      id: 'proteccion-inclusiva',
      title: 'Proteccion de quienes necesitan apoyo',
      requires: ['transporteVulnerablesActivado', 'confinamientoPreparado'],
      text:
        'La respuesta no presupone que todo el mundo puede salir igual. Las personas vulnerables entran en el plan.',
      bonusImpact: {
        poblacionProtegida: 2,
        inclusionVulnerables: 2,
        confianzaInstitucional: 1
      }
    },
    {
      id: 'salida-caotica',
      title: 'Salida caotica',
      requires: ['evacuacionRetrasada', 'evacuacionGeneralSinRutas'],
      text:
        'Primero se pierde margen y despues se ordena todo a la vez. La emergencia acumula humo, trafico y confusion.',
      bonusImpact: {
        riesgoAtrapamiento: 4,
        confusionPublica: 3,
        coordinacionOperativa: -3
      }
    }
  ],
  outcomes: [
    {
      id: 'alto',
      title: 'Poblacion protegida con margen',
      condition: {
        poblacionProtegida: '>=6',
        riesgoAtrapamiento: '<=0'
      },
      text:
        'La evacuacion se ordena antes de perder visibilidad y las instrucciones reducen salidas improvisadas. El fuego sigue avanzando, pero no encuentra a la poblacion desordenada.',
      crisisImpact: {
        poblacionProtegida: 2,
        danosViviendas: -1,
        seguridadEquipos: 1
      }
    },
    {
      id: 'medio',
      title: 'Evacuacion posible, margen justo',
      condition: {
        riesgoAtrapamiento: '<=5'
      },
      text:
        'La poblacion recibe instrucciones suficientes para actuar, aunque algunas dudas y retrasos mantienen la situacion tensionada.',
      crisisImpact: {
        danosViviendas: 1,
        confusionPublica: 1
      }
    },
    {
      id: 'bajo',
      title: 'Evacuacion desordenada',
      condition: {
        riesgoAtrapamiento: '>5'
      },
      text:
        'La salida llega tarde o sin estructura. El humo, el trafico y los mensajes contradictorios reducen el margen operativo.',
      crisisImpact: {
        riesgoAtrapamiento: 3,
        danosViviendas: 3,
        seguridadEquipos: -2
      }
    }
  ],
  nextLogic: [
    {
      id: 'final-beta',
      condition: 'default',
      nextScenario: 'resultado-beta',
      transition:
        'La fase mas critica queda resuelta para esta beta. Ahora toca leer que decisiones dieron margen y cuales abrieron la puerta al caos.'
    }
  ],
  options: [],
  unlocks: [],
  sourceNotes: [
    'La evacuacion preventiva debe activarse con rutas confirmadas, control de trafico y prioridad para personas vulnerables o zonas mas expuestas.',
    'La comunicacion de una evacuacion debe ser clara, coordinada y unica para evitar rumores, salidas improvisadas y colapsos en las vias.',
    'Esta version funciona como convergencia minima de la beta vertical.'
  ]
};
