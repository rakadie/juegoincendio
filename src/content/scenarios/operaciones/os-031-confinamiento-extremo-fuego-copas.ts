import type { Scenario } from '../../../domain/types/scenario.js';

export const os031ConfinamientoExtremoFuegoCopas: Scenario = {
  "id": "s-031-confinamiento-extremo-fuego-copas",
  "title": "Confinamiento extremo por fuego de copas",
  "category": "operaciones",
  "phase": "crisis",
  "block": "evacuacion-y-proteccion-civil",
  "difficulty": "critica",
  "estimatedTime": "2 min",
  "tags": [
    "confinamiento",
    "fuego-de-copas",
    "crown-fire",
    "evacuacion",
    "calor-radiante",
    "humo",
    "pavesas",
    "proteccion-civil"
  ],
  "status": "available",
  "context": "El incendio ha evolucionado a fuego de copas cerca de una zona habitada. Las llamas avanzan con gran intensidad y el calor radiante hace peligrosa cualquier salida improvisada.",
  "question": "¿Qué instrucciones das a la población cuando el fuego de copas impide una evacuación segura?",
  "briefing": "El incendio ha cambiado de comportamiento y ha pasado a fuego de copas. Las llamas avanzan por la parte alta de los árboles, generan calor radiante extremo y lanzan pavesas que pueden provocar focos secundarios en tejados, jardines y zonas próximas a las viviendas. Los equipos de emergencia advierten de que varias rutas de salida están comprometidas por humo, calor, baja visibilidad y riesgo de atrapamiento. En algunos sectores, ordenar una evacuación en ese momento puede exponer a la población a un peligro mayor que permanecer dentro de edificios protegidos. La decisión es crítica: hay que ordenar un confinamiento extremo, dar instrucciones muy concretas y evitar que la población salga por su cuenta. La prioridad es reducir la exposición al humo y al calor, mantener a las personas alejadas de ventanas y fachadas expuestas, cerrar entradas de aire, preparar agua y teléfono, y esperar nuevas instrucciones oficiales.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Ordenar confinamiento extremo en viviendas o edificios seguros: permanecer en habitaciones interiores, alejadas de ventanas y fachadas expuestas, cerrar puertas, ventanas, persianas y entradas de aire, y seguir solo instrucciones oficiales.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Si las rutas ya no son seguras, salir puede ser más peligroso que quedarse. El confinamiento extremo busca reducir exposición al calor, humo y pavesas hasta que el frente pase o se recupere una salida segura.",
      "shortFeedback": "Respuesta adecuada. Si las rutas ya no son seguras, salir puede ser más peligroso que quedarse. El confinamiento extremo busca reducir exposición al calor, humo y pavesas hasta que el frente pase o se recupere una salida segura.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": 5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -5
        },
        {
          "variableKey": "confusionPublica",
          "delta": -4
        },
        {
          "variableKey": "exposicionHumoCalor",
          "delta": -5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Ordenar a toda la población que salga inmediatamente por sus propios medios antes de que el fuego llegue al núcleo.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Con fuego de copas y rutas comprometidas, una salida desordenada puede provocar atrapamientos en carretera, accidentes y exposición directa al humo y al calor radiante.",
      "shortFeedback": "Respuesta incorrecta. Con fuego de copas y rutas comprometidas, una salida desordenada puede provocar atrapamientos en carretera, accidentes y exposición directa al humo y al calor radiante.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": -5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 5
        },
        {
          "variableKey": "confusionPublica",
          "delta": 4
        },
        {
          "variableKey": "exposicionHumoCalor",
          "delta": 5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Indicar a la población que cierre llaves de gas o combustible si puede hacerlo sin salir al exterior, prepare agua, medicación, documentación y teléfono cargado, y no abandone el edificio salvo orden expresa de los servicios de emergencia.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Son medidas concretas y realistas para ganar seguridad sin empujar a la población a una evacuación peligrosa. La instrucción clave es no salir salvo indicación oficial.",
      "shortFeedback": "Respuesta adecuada. Son medidas concretas y realistas para ganar seguridad sin empujar a la población a una evacuación peligrosa. La instrucción clave es no salir salvo indicación oficial.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": 4
        },
        {
          "variableKey": "confusionPublica",
          "delta": -3
        },
        {
          "variableKey": "exposicionHumoCalor",
          "delta": -4
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Recomendar que los vecinos salgan a mojar tejados, jardines y fachadas para evitar que las pavesas prendan cerca de las viviendas.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Esa medida solo tendría sentido antes de la llegada del frente y con condiciones seguras. Con fuego de copas próximo, exponer a la población al exterior aumenta el riesgo por calor, humo y pavesas.",
      "shortFeedback": "Respuesta incorrecta. Esa medida solo tendría sentido antes de la llegada del frente y con condiciones seguras. Con fuego de copas próximo, exponer a la población al exterior aumenta el riesgo por calor, humo y pavesas.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": -5
        },
        {
          "variableKey": "exposicionHumoCalor",
          "delta": 5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 4
        },
        {
          "variableKey": "confusionPublica",
          "delta": 3
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Pedir a la población que espere en balcones, azoteas o entradas de las viviendas para facilitar su localización por los equipos de emergencia.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Balcones, azoteas y entradas son zonas expuestas a humo, calor radiante y pavesas. En confinamiento extremo, la población debe protegerse en el interior, no asomarse al incendio como si fuera una procesión infernal.",
      "shortFeedback": "Respuesta incorrecta. Balcones, azoteas y entradas son zonas expuestas a humo, calor radiante y pavesas. En confinamiento extremo, la población debe protegerse en el interior, no asomarse al incendio como si fuera una procesión infernal.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": -5
        },
        {
          "variableKey": "exposicionHumoCalor",
          "delta": 5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 3
        },
        {
          "variableKey": "confusionPublica",
          "delta": 4
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "El confinamiento puede ser más seguro que la evacuación cuando las rutas están comprometidas por humo, calor, baja visibilidad o riesgo de atrapamiento.",
    "Ante fuego de copas próximo a zonas habitadas, la prioridad es reducir la exposición al calor radiante, humo y pavesas, y evitar salidas improvisadas.",
    "Las instrucciones a la población deben ser concretas, oficiales y orientadas a permanecer en espacios interiores protegidos hasta nueva orden."
  ]
};
