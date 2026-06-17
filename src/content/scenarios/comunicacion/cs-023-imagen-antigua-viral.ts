import type { Scenario } from '../../../domain/types/scenario.js';

export const cs023ImagenAntiguaViral: Scenario = {
  id: 's-023-imagen-antigua-viral',
  title: 'Una imagen antigua se hace viral',
  category: 'comunicacion',
  phase: 'crisis',
  block: 'comunicacion-crisis',
  type: 'action-selection',
  difficulty: 'media',
  estimatedTime: '2 min',
  maxActions: 2,
  tags: [
    'desinformacion',
    'imagen-viral',
    'redes-sociales',
    'rumores',
    'mapa-actualizado',
    'medios-comunicacion',
    'canales-oficiales'
  ],
  status: 'available',
  intro:
    'Una imagen impactante empieza a circular como si mostrara el avance actual del incendio.',
  context:
    'La fotografia no corresponde a la emergencia en curso, pero se comparte con rapidez: llamas cerca de viviendas, humo intenso y vecinos huyendo. En una zona que no esta afectada empiezan las llamadas al 112 y algunos grupos vecinales preparan salidas por su cuenta. El problema no es solo desmentir la imagen: hay que sustituir el miedo por una referencia verificable.',
  objective:
    'Frenar la desinformacion visual sin amplificar el panico ni dejar a la poblacion sin contexto.',
  question:
    'Que dos actuaciones priorizas para neutralizar la imagen antigua y recuperar claridad publica?',
  briefing:
    'No basta con decir que algo es falso. En emergencia, un desmentido util debe ir acompanado de informacion actual, canales oficiales y coordinacion con quienes amplifican el mensaje correcto.',
  requirements: null,
  pressureIndicators: [
    { id: 'confusionPublica', label: 'Confusion publica', level: 'alta' },
    { id: 'saturacion112', label: 'Llamadas por dudas', level: 'subiendo' },
    { id: 'confianzaInstitucional', label: 'Confianza institucional', level: 'fragil' }
  ],
  actions: [
    {
      id: 'desmentido-oficial-claro',
      label: 'Publicar desmentido oficial claro',
      description:
        'Explicar que la imagen no corresponde al incendio actual y acompanarlo de informacion confirmada sobre zonas afectadas.',
      impact: {
        confusionPublica: -4,
        confianzaInstitucional: 3,
        saturacion112: -2
      },
      flagsOnApply: ['desmentidoOficialClaro'],
      feedback:
        'La poblacion recibe una correccion visible. El rumor pierde fuerza porque el desmentido no llega solo: llega con contexto.'
    },
    {
      id: 'mapa-actualizado-zonas',
      label: 'Difundir mapa actualizado de zonas afectadas',
      description:
        'Publicar un mapa sencillo con zona afectada, zonas no afectadas y canales oficiales de actualizacion.',
      impact: {
        confusionPublica: -4,
        riesgoAtrapamiento: -2,
        confianzaInstitucional: 3
      },
      flagsOnApply: ['mapaActualizadoPublicado'],
      feedback:
        'El mapa da una referencia concreta. Varias dudas dejan de convertirse en llamadas al 112.'
    },
    {
      id: 'coordinar-medios-ayuntamientos',
      label: 'Coordinar correccion con medios y ayuntamientos',
      description:
        'Enviar una correccion comun a radios locales, ayuntamientos y perfiles institucionales para que repliquen la misma informacion.',
      impact: {
        confusionPublica: -3,
        coordinacionOperativa: 3,
        confianzaInstitucional: 2
      },
      flagsOnApply: ['correccionCoordinada'],
      feedback:
        'La misma version circula por varios canales fiables. La emergencia habla con menos ruido.'
    },
    {
      id: 'responder-comentarios',
      label: 'Responder solo en comentarios',
      description:
        'Contestar manualmente a quienes comparten la imagen, caso por caso, sin comunicado ni referencia central.',
      impact: {
        confusionPublica: 3,
        saturacion112: 2,
        coordinacionOperativa: -2
      },
      flagsOnApply: ['respuestaSoloComentarios'],
      feedback:
        'La respuesta se fragmenta. Algunas personas ven la correccion, muchas otras solo ven la imagen.'
    },
    {
      id: 'ignorar-imagen',
      label: 'Ignorar la imagen para no amplificarla',
      description:
        'Esperar a que deje de circular por si misma y evitar que la institucion le de mas visibilidad.',
      impact: {
        confusionPublica: 5,
        saturacion112: 3,
        confianzaInstitucional: -3
      },
      flagsOnApply: ['imagenAntiguaIgnorada'],
      feedback:
        'El silencio no apaga la imagen. La deja correr sin una referencia oficial que la contradiga.'
    },
    {
      id: 'publicar-sin-marca',
      label: 'Publicar la imagen sin marca visual',
      description:
        'Reproducir la imagen en canales oficiales junto al texto de desmentido, pero sin sello claro de antigua o falsa.',
      impact: {
        confusionPublica: 4,
        saturacion112: 2,
        confianzaInstitucional: -2
      },
      flagsOnApply: ['imagenFalsaAmplificada'],
      feedback:
        'La imagen gana una segunda vida. Quien lea deprisa puede quedarse con el impacto visual y no con el desmentido.'
    }
  ],
  combos: [
    {
      id: 'desmentido-con-mapa',
      title: 'Desmentido con referencia verificable',
      requires: ['desmentidoOficialClaro', 'mapaActualizadoPublicado'],
      text:
        'La correccion no se queda en un no: ofrece una imagen clara de lo que si esta ocurriendo. Baja el panico y baja el ruido.',
      bonusImpact: {
        confusionPublica: -2,
        saturacion112: -1,
        confianzaInstitucional: 1
      }
    },
    {
      id: 'correccion-amplificada',
      title: 'Correccion amplificada',
      requires: ['desmentidoOficialClaro', 'correccionCoordinada'],
      text:
        'Medios y ayuntamientos repiten una misma correccion. La informacion fiable alcanza a gente que no sigue el canal principal.',
      bonusImpact: {
        confusionPublica: -2,
        coordinacionOperativa: 1
      }
    },
    {
      id: 'rumor-sin-freno',
      title: 'Rumor sin freno',
      requires: ['imagenAntiguaIgnorada', 'respuestaSoloComentarios'],
      text:
        'La respuesta llega tarde y dispersa. La imagen antigua ya ha hecho el trabajo emocional.',
      bonusImpact: {
        confusionPublica: 3,
        saturacion112: 2
      }
    }
  ],
  outcomes: [
    {
      id: 'alto',
      title: 'Imagen desactivada con rapidez',
      condition: {
        confusionPublica: '<=0',
        confianzaInstitucional: '>=3'
      },
      text:
        'El desmentido llega con contexto y circula por canales fiables. La imagen no desaparece del todo, pero deja de marcar la respuesta de la poblacion.',
      crisisImpact: {
        confusionPublica: -1,
        confianzaInstitucional: 1
      }
    },
    {
      id: 'medio',
      title: 'Rumor contenido, dudas persistentes',
      condition: {
        confusionPublica: '<=4'
      },
      text:
        'La correccion reduce parte del dano, aunque la imagen sigue apareciendo en conversaciones y grupos locales.',
      crisisImpact: {
        saturacion112: 1
      }
    },
    {
      id: 'bajo',
      title: 'La imagen alimenta el panico',
      condition: {
        confusionPublica: '>4'
      },
      text:
        'La respuesta oficial no logra ocupar el espacio informativo. La imagen antigua se mezcla con rumores de evacuacion y dispara nuevas dudas.',
      crisisImpact: {
        confusionPublica: 3,
        saturacion112: 2,
        confianzaInstitucional: -2
      }
    }
  ],
  nextLogic: [
    {
      id: 'rumor-evacuacion-con-claridad',
      condition: {
        confusionPublica: '<=2',
        confianzaInstitucional: '>=3'
      },
      nextScenario: 's-016-rumor-evacuacion-noroeste',
      transition:
        'La imagen queda bastante acotada, pero un nuevo mensaje empieza a circular: alguien asegura que varios municipios deben evacuar.'
    },
    {
      id: 'rumor-evacuacion-con-panico',
      condition: {
        confusionPublica: '>=5'
      },
      nextScenario: 's-016-rumor-evacuacion-noroeste',
      transition:
        'La imagen antigua deja terreno abonado para el siguiente rumor: una supuesta orden de evacuacion empieza a moverse por grupos locales.'
    },
    {
      id: 'ruta-base-rumor',
      condition: 'default',
      nextScenario: 's-016-rumor-evacuacion-noroeste',
      transition:
        'La desinformacion no se detiene del todo. El siguiente mensaje ya no habla de llamas: habla de evacuar.'
    }
  ],
  options: [],
  unlocks: ['s-016-rumor-evacuacion-noroeste'],
  sourceNotes: [
    'La desinformacion visual durante una emergencia puede generar miedo, saturacion de llamadas y movimientos innecesarios de poblacion.',
    'Los desmentidos deben acompanarse de informacion actualizada, canales oficiales y materiales verificables como mapas o comunicados claros.',
    'Esta version forma parte de la beta vertical de la ruta comunicacion.'
  ]
};
