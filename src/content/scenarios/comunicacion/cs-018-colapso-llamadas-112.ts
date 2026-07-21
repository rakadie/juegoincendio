import type { Scenario } from '../../../domain/types/scenario.js';

export const cs018ColapsoLlamadas112: Scenario = {
  "id": "s-018-colapso-llamadas-112",
  "title": "Colapso de llamadas al 112",
  "category": "comunicacion",
  "phase": "crisis",
  "block": "comunicacion-crisis",
  "type": "action-selection",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "maxActions": 2,
  "tags": [
    "112",
    "comunicacion",
    "crisis",
    "rumores",
    "informacion-publica",
    "medios-comunicacion",
    "canales-oficiales",
    "saturacion"
  ],
  "status": "available",
  "intro": "El humo ya se ve desde varios municipios. El miedo empieza a llamar por telefono.",
  "context": "El humo ya es visible desde varios municipios. Y con ?l llega el miedo. En pocos minutos, el Centro Coordinador de Emergencias y Seguridad (112) empieza a recibir una avalancha de llamadas.\n\nAlgunas alertan de situaciones reales: llamas acerc?ndose a una finca, humo entrando en viviendas o personas con movilidad reducida que necesitan saber si deben prepararse para evacuar. Pero muchas otras son consultas que no requieren una llamada al servicio de emergencias: vecinos que preguntan si deben salir de casa, conductores que quieren saber si una carretera est? cortada o personas preocupadas por un audio que circula por WhatsApp y cuya veracidad desconocen.\n\nLa centralita est? al l?mite. Ahora debes decidir c?mo actuar. Lo que hagas puede ayudar a mantener libre una l?nea de emergencia? o contribuir a bloquearla.",
  "objective": "Reducir la saturacion del 112 sin dejar a la poblacion desinformada.",
  "question": "Que dos actuaciones inmediatas priorizas para reducir la saturacion del 112 sin dejar a la poblacion desinformada?",
  "briefing": "La crisis debe gestionarse con presion y priorizacion. No hay tiempo para hacerlo todo: elige dos actuaciones inmediatas entre seis opciones posibles.",
  "requirements": null,
  "pressureIndicators": [
    {
      "id": "saturacion112",
      "label": "Saturacion del 112",
      "level": "alta"
    },
    {
      "id": "confusionPublica",
      "label": "Confusion publica",
      "level": "subiendo"
    },
    {
      "id": "confianzaInstitucional",
      "label": "Confianza institucional",
      "level": "inestable"
    }
  ],
  "actions": [
    {
      "id": "mensaje-oficial-breve",
      "label": "Emitir mensaje oficial breve y claro",
      "description": "Publicar un primer mensaje oficial con informacion confirmada: zona aproximada afectada, recomendaciones basicas, canales de actualizacion y recordatorio de que el 112 debe reservarse para emergencias reales.",
      "impact": {
        "saturacion112": -3,
        "confusionPublica": -3,
        "confianzaInstitucional": 2
      },
      "flagsOnApply": [
        "mensajeOficialBreveEmitido"
      ],
      "feedback": "La poblacion recibe una primera referencia fiable. No resuelve todo, pero reduce llamadas de duda y corta parte del ruido inicial."
    },
    {
      "id": "canal-informacion-no-urgente",
      "label": "Abrir canal de informacion no urgente",
      "description": "Habilitar o reforzar canales de informacion no urgente: web municipal, redes institucionales, linea informativa si existe, mensajes de ayuntamiento y avisos coordinados con medios.",
      "impact": {
        "saturacion112": -4,
        "coordinacionOperativa": 2,
        "confusionPublica": -2
      },
      "flagsOnApply": [
        "canalInformacionNoUrgenteActivado"
      ],
      "feedback": "Las dudas generales empiezan a desviarse fuera del 112. Las llamadas criticas tienen mas opciones de entrar."
    },
    {
      "id": "actualizaciones-periodicas-medios",
      "label": "Programar actualizaciones periodicas con medios y ayuntamientos",
      "description": "Convocar actualizaciones periodicas para medios de comunicacion y ayuntamientos afectados, con mensajes breves, horarios claros y datos confirmados.",
      "impact": {
        "confianzaInstitucional": 4,
        "confusionPublica": -3,
        "saturacion112": -2,
        "coordinacionOperativa": 3
      },
      "flagsOnApply": [
        "actualizacionesPeriodicasActivadas"
      ],
      "feedback": "Los medios y ayuntamientos ayudan a amplificar informacion util. La comunicacion deja de ir a golpes."
    },
    {
      "id": "coordinar-ayuntamientos",
      "label": "Coordinar un mensaje unico con los ayuntamientos afectados",
      "description": "Acordar un mensaje unico con ayuntamientos, Proteccion Civil y comunicacion institucional para evitar contradicciones sobre zonas afectadas, carreteras, evacuaciones y canales oficiales.",
      "impact": {
        "confusionPublica": -4,
        "confianzaInstitucional": 3,
        "coordinacionOperativa": 4
      },
      "flagsOnApply": [
        "mensajeUnicoAyuntamientosCoordinado"
      ],
      "feedback": "Se reducen contradicciones entre instituciones. La poblacion recibe una instruccion mas coherente."
    },
    {
      "id": "responder-caso-por-caso-redes",
      "label": "Responder caso por caso en redes sociales",
      "description": "Destinar el equipo de comunicacion a responder manualmente preguntas en redes sociales y comentarios individuales.",
      "impact": {
        "confusionPublica": 2,
        "saturacion112": 1,
        "coordinacionOperativa": -2
      },
      "flagsOnApply": [
        "respuestaCasoPorCasoRedes"
      ],
      "feedback": "Contestar uno a uno consume tiempo y no ordena la informacion general. La emergencia necesita un canal claro, no una conversacion infinita."
    },
    {
      "id": "esperar-datos-completos",
      "label": "Esperar a tener todos los datos antes de comunicar",
      "description": "Retrasar la comunicaci?n p?blica hasta tener confirmaci?n completa sobre el per?metro, las carreteras, el riesgo para las viviendas y la evoluci?n prevista.",
      "impact": {
        "confusionPublica": 5,
        "saturacion112": 4,
        "confianzaInstitucional": -3
      },
      "flagsOnApply": [
        "comunicacionRetrasada"
      ],
      "feedback": "El silencio deja hueco a rumores. Comunicar lo confirmado y actualizar despu?s es m?s seguro que esperar a tener el puzzle perfecto."
    }
  ],
  "combos": [
    {
      "id": "informacion-publica-ordenada",
      "title": "Informacion publica ordenada",
      "requires": [
        "mensajeOficialBreveEmitido",
        "canalInformacionNoUrgenteActivado"
      ],
      "text": "La poblacion recibe una referencia inicial y un lugar alternativo para resolver dudas. El 112 empieza a recuperar margen para llamadas criticas.",
      "bonusImpact": {
        "saturacion112": -2,
        "confusionPublica": -1
      }
    },
    {
      "id": "comunicacion-coordinada",
      "title": "Comunicaci?n coordinada",
      "requires": [
        "actualizacionesPeriodicasActivadas",
        "mensajeUnicoAyuntamientosCoordinado"
      ],
      "text": "Medios y ayuntamientos replican una misma l?nea informativa. La emergencia est? lanzando un mensaje ?nico.",
      "bonusImpact": {
        "confianzaInstitucional": 2,
        "confusionPublica": -2,
        "coordinacionOperativa": 1
      }
    },
    {
      "id": "silencio-fragmentado",
      "title": "Silencio fragmentado",
      "requires": [
        "respuestaCasoPorCasoRedes",
        "comunicacionRetrasada"
      ],
      "text": "La informacion oficial llega tarde y dispersa. Los grupos de mensajeria llenan el vacio con versiones contradictorias.",
      "bonusImpact": {
        "confusionPublica": 3,
        "saturacion112": 2,
        "confianzaInstitucional": -2
      }
    }
  ],
  "outcomes": [
    {
      "id": "alto",
      "title": "112 descongestionado parcialmente",
      "condition": {
        "saturacion112": "<=0",
        "confusionPublica": "<=2"
      },
      "text": "La comunicacion oficial reduce parte de las llamadas innecesarias. La poblacion empieza a consultar canales alternativos y el 112 recupera margen para atender emergencias reales. El incendio sigue avanzando, pero el ruido informativo baja varios decibelios.",
      "crisisImpact": {
        "confianzaInstitucional": 2,
        "confusionPublica": -2
      }
    },
    {
      "id": "medio",
      "title": "Saturacion contenida, rumores activos",
      "condition": {
        "saturacion112": "<=4"
      },
      "text": "La situacion mejora, pero no queda resuelta. Parte de la poblacion encuentra informacion fiable, aunque siguen circulando dudas y mensajes no verificados. El 112 continua tensionado.",
      "crisisImpact": {
        "confusionPublica": 1
      }
    },
    {
      "id": "bajo",
      "title": "Caos informativo",
      "condition": {
        "saturacion112": ">4"
      },
      "text": "Las llamadas se acumulan, los canales oficiales llegan tarde o no se entienden y los rumores empiezan a circular mas rapido que las aclaraciones. La siguiente desinformacion encontrara la puerta abierta.",
      "crisisImpact": {
        "confusionPublica": 3,
        "confianzaInstitucional": -2,
        "saturacion112": 2
      }
    }
  ],
  "nextLogic": [
    {
      "id": "imagen-viral-con-respuesta-ordenada",
      "condition": {
        "confusionPublica": "<=2",
        "confianzaInstitucional": ">=4"
      },
      "nextScenario": "s-023-imagen-antigua-viral",
      "transition": "Aunque la comunicacion oficial ha reducido la saturacion del 112, una imagen antigua empieza a circular como si fuera actual. La diferencia es que ahora hay canales activos para desmentirla rapido."
    },
    {
      "id": "imagen-viral-con-caos",
      "condition": {
        "confusionPublica": ">=6"
      },
      "nextScenario": "s-023-imagen-antigua-viral",
      "transition": "La comunicacion llega tarde y la confusion gana terreno. Una imagen antigua empieza a circular como si mostrara el avance actual del incendio. Cae sobre un terreno perfecto para el panico."
    },
    {
      "id": "ruta-base-imagen-viral",
      "condition": "default",
      "nextScenario": "s-023-imagen-antigua-viral",
      "transition": "El 112 sigue tensionado y la informacion se mueve deprisa. Una imagen impactante aparece en redes y amenaza con disparar de nuevo la alarma social."
    }
  ],
  "options": [],
  "unlocks": [
    "s-023-imagen-antigua-viral"
  ],
  "sourceNotes": [
    "Esta escena debe ser una pantalla de seleccion de acciones, no un cuestionario.",
    "La jugadora solo puede elegir dos actuaciones para reforzar la sensacion de urgencia.",
    "En esta escena, el fuego esta en el monte, pero la propagacion tambien ocurre por telefono."
  ]
};
