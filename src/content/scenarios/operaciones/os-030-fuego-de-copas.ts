import type { Scenario } from '../../../domain/types/scenario.js';

export const os030FuegoDeCopas: Scenario = {
  "id": "s-030-fuego-de-copas",
  "title": "Fuego de copas",
  "category": "operaciones",
  "phase": "crisis",
  "block": "estrategia-extincion",
  "difficulty": "critica",
  "estimatedTime": "2 min",
  "tags": [
    "fuego-de-copas",
    "crown-fire",
    "barranco",
    "calor-radiante",
    "repliegue",
    "confinamiento",
    "evacuacion",
    "pavesas",
    "interfaz-urbano-forestal"
  ],
  "status": "available",
  "context": "El incendio en el barranco gana energía y alcanza las copas de los árboles. Las llamas crecen de forma súbita y el calor radiante amenaza viviendas próximas incluso antes de que el frente llegue directamente a ellas.",
  "question": "¿Cómo actúas cuando el incendio evoluciona a fuego de copas cerca de una zona habitada?",
  "briefing": "El incendio ha cambiado de comportamiento. Tras ganar intensidad en el barranco, el fuego asciende a las copas de los árboles y avanza con mucha más velocidad. Las llamas pueden alcanzar alturas extremas y el calor radiante se vuelve peligroso incluso a distancia. Los equipos sobre el terreno advierten de que la defensa directa de viviendas ya no es segura. El agua puede perder eficacia por la intensidad térmica, las pavesas se multiplican y las rutas de escape pueden quedar comprometidas en cuestión de minutos. En este escenario, mantener medios terrestres en primera línea puede provocar atrapamientos. La prioridad pasa a ser retirar equipos a zonas seguras, confirmar si la evacuación ya se realizó y, si no es posible evacuar con seguridad, ordenar confinamiento extremo en espacios interiores protegidos siguiendo instrucciones oficiales. La decisión es crítica: aceptar que el frente no es defendible, proteger vidas y evitar que la emergencia se cobre también a quienes intentan contenerla.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Ordenar el retroceso inmediato de los medios terrestres a zonas seguras, suspender la defensa directa de viviendas expuestas y concentrar la actuación en proteger vidas, rutas de escape y puntos defendibles alejados del frente.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Cuando el fuego entra en copas y gana esa intensidad, insistir en la defensa directa puede ser letal. La prioridad es retirar equipos antes de que el incendio cierre las salidas.",
      "shortFeedback": "Respuesta adecuada. Cuando el fuego entra en copas y gana esa intensidad, insistir en la defensa directa puede ser letal. La prioridad es retirar equipos antes de que el incendio cierre las salidas.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": 5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -5
        },
        {
          "variableKey": "poblacionProtegida",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 4
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Mantener a los bomberos junto a las viviendas usando mangueras para enfriar fachadas hasta que pase el frente principal.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Con fuego de copas y calor radiante extremo, el agua puede no ser suficiente y los equipos pueden quedar expuestos a condiciones incompatibles con una defensa segura. La épica no baja la temperatura.",
      "shortFeedback": "Respuesta incorrecta. Con fuego de copas y calor radiante extremo, el agua puede no ser suficiente y los equipos pueden quedar expuestos a condiciones incompatibles con una defensa segura. La épica no baja la temperatura.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": -5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 5
        },
        {
          "variableKey": "eficaciaExtincion",
          "delta": -4
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Confirmar de inmediato el estado de la población: si hay tiempo y rutas seguras, ejecutar evacuación urgente; si la evacuación ya no es segura, ordenar confinamiento extremo en habitaciones interiores, alejadas de ventanas y con entradas de aire cerradas.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. La decisión depende del margen real. Evacuar tarde puede ser más peligroso que confinar, pero confinar sin instrucciones claras también lo es. Hay que elegir según rutas, tiempo y exposición.",
      "shortFeedback": "Respuesta adecuada. La decisión depende del margen real. Evacuar tarde puede ser más peligroso que confinar, pero confinar sin instrucciones claras también lo es. Hay que elegir según rutas, tiempo y exposición.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": 5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -4
        },
        {
          "variableKey": "confusionPublica",
          "delta": -3
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 4
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Enviar más medios terrestres al barranco para reforzar la línea y evitar que el fuego llegue a las viviendas.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. En un fuego de copas, el barranco puede convertirse en una trampa por calor, humo, pavesas y efecto chimenea. Mandar más personal a una zona no defendible multiplica el riesgo.",
      "shortFeedback": "Respuesta incorrecta. En un fuego de copas, el barranco puede convertirse en una trampa por calor, humo, pavesas y efecto chimenea. Mandar más personal a una zona no defendible multiplica el riesgo.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": -5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 5
        },
        {
          "variableKey": "eficaciaExtincion",
          "delta": -5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -3
        },
        {
          "variableKey": "saturacionRecursos",
          "delta": 4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Esperar a comprobar si el fuego baja de intensidad antes de ordenar el repliegue, para no abandonar viviendas que aún podrían salvarse.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. En un cambio a fuego de copas, esperar puede dejar sin salida a los equipos y a la población. A veces la decisión más dura es retirarse a tiempo; quedarse por orgullo sale carísimo.",
      "shortFeedback": "Respuesta incorrecta. En un cambio a fuego de copas, esperar puede dejar sin salida a los equipos y a la población. A veces la decisión más dura es retirarse a tiempo; quedarse por orgullo sale carísimo.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": -5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 5
        },
        {
          "variableKey": "poblacionProtegida",
          "delta": -3
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -4
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "El fuego de copas implica un cambio extremo de comportamiento del incendio, con mayor velocidad, intensidad térmica y riesgo de pavesas.",
    "Cuando la defensa directa deja de ser segura, la prioridad es el repliegue de equipos, la protección de vidas y la toma de decisiones entre evacuación urgente o confinamiento extremo según las rutas disponibles.",
    "La exposición al calor radiante y la pérdida de rutas de escape pueden hacer inviable la defensa terrestre de viviendas en primera línea."
  ]
};
