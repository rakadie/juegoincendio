import type { Scenario } from '../../../domain/types/scenario.js';

export const os032CasasDiseminadasMonte: Scenario = {
  "id": "s-032-casas-diseminadas-monte",
  "title": "Casas diseminadas en zona de monte",
  "category": "operaciones",
  "phase": "crisis",
  "block": "estrategia-extincion",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "casas-diseminadas",
    "interfaz-urbano-forestal",
    "monte",
    "triaje-estructural",
    "viviendas",
    "espacio-defendible",
    "brigadas",
    "rutas-escape"
  ],
  "status": "available",
  "context": "En otra zona afectada por el incendio, las brigadas continúan trabajando casi sin descanso. El fuego entra en un área de casas diseminadas dentro del monte. No hay una urbanización compacta, sino viviendas separadas entre sí, con parcelas grandes y vegetación entre ellas.",
  "question": "¿Cómo organizas la defensa de viviendas diseminadas dentro de una zona de monte?",
  "briefing": "El incendio avanza por una zona de interfaz dispersa, donde las casas están salpicadas dentro del monte. A diferencia de una urbanización compacta, no existe un único frente claro ni una línea continua de defensa. Cada vivienda puede quedar amenazada de forma independiente por llamas, humo o pavesas. Los equipos sobre el terreno advierten de que no hay recursos suficientes para proteger todas las casas al mismo tiempo. Algunas viviendas cuentan con espacio defendible: vegetación retirada, accesos despejados, zonas de maniobra y cierta distancia entre la casa y el combustible vegetal. Otras, en cambio, tienen árboles, matorral, leña, depósitos o materiales inflamables demasiado cerca. La decisión es difícil: aplicar un triaje estructural estricto. Las brigadas deben priorizar las viviendas defendibles y abandonar la defensa de aquellas donde el riesgo para los equipos sea demasiado alto o las posibilidades de éxito sean mínimas. La prioridad es proteger vidas humanas, evitar que los equipos queden aislados entre casas separadas y concentrar los recursos donde realmente puedan salvar estructuras sin comprometer la seguridad.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Aplicar un triaje estructural estricto: priorizar la defensa de viviendas con espacio defendible, accesos seguros, rutas de escape y posibilidades reales de protección, sin exponer a las brigadas en casas rodeadas de combustible.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. En una zona de casas diseminadas, intentar defenderlo todo puede dejar a los equipos atrapados y sin capacidad de respuesta. El triaje permite concentrar esfuerzos donde hay opciones reales.",
      "shortFeedback": "Respuesta adecuada. En una zona de casas diseminadas, intentar defenderlo todo puede dejar a los equipos atrapados y sin capacidad de respuesta. El triaje permite concentrar esfuerzos donde hay opciones reales.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": 5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 4
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -3
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -5
        },
        {
          "variableKey": "eficaciaExtincion",
          "delta": 4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Dividir a las brigadas en pequeños grupos para intentar cubrir todas las viviendas al mismo tiempo, aunque estén muy separadas entre sí.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Dispersar los equipos reduce la seguridad, dificulta la comunicación y puede dejar a las brigadas aisladas si el fuego cambia de dirección. En intermix, estar en todas partes puede significar no estar protegido en ninguna.",
      "shortFeedback": "Respuesta incorrecta. Dispersar los equipos reduce la seguridad, dificulta la comunicación y puede dejar a las brigadas aisladas si el fuego cambia de dirección. En intermix, estar en todas partes puede significar no estar protegido en ninguna.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": -5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -4
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 5
        },
        {
          "variableKey": "eficaciaExtincion",
          "delta": -3
        },
        {
          "variableKey": "saturacionRecursos",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Confirmar que no quedan personas en las viviendas más expuestas, comunicar qué zonas no son defendibles y desplazar recursos hacia casas con accesos viables, perímetros limpios y capacidad de maniobra para autobombas.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. La prioridad sigue siendo la vida humana. Una vivienda puede darse por no defendible, pero nunca se debe asumir que está vacía sin confirmarlo. Primero personas; después estructuras.",
      "shortFeedback": "Respuesta adecuada. La prioridad sigue siendo la vida humana. Una vivienda puede darse por no defendible, pero nunca se debe asumir que está vacía sin confirmarlo. Primero personas; después estructuras.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": 5
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -4
        },
        {
          "variableKey": "confusionPublica",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Mantener a los bomberos defendiendo una casa aunque esté rodeada de vegetación densa, porque abandonarla enviaría un mensaje negativo a la población.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La percepción pública importa, pero no puede pesar más que la seguridad de los equipos. Una casa sin espacio defendible puede convertirse en una trampa. La épica queda muy bien en los discursos, fatal en los partes de accidente.",
      "shortFeedback": "Respuesta incorrecta. La percepción pública importa, pero no puede pesar más que la seguridad de los equipos. Una casa sin espacio defendible puede convertirse en una trampa. La épica queda muy bien en los discursos, fatal en los partes de accidente.",
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
          "variableKey": "coordinacionOperativa",
          "delta": -3
        },
        {
          "variableKey": "eficaciaExtincion",
          "delta": -3
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
      "id": "e",
      "text": "Ordenar a los propietarios que se queden en sus parcelas limpiando vegetación y mojando el entorno mientras llegan las brigadas.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La autoprotección de viviendas debe hacerse antes de la emergencia, no con el fuego encima. Pedir a vecinos que trabajen en parcelas expuestas puede retrasar evacuaciones y poner vidas en peligro.",
      "shortFeedback": "Respuesta incorrecta. La autoprotección de viviendas debe hacerse antes de la emergencia, no con el fuego encima. Pedir a vecinos que trabajen en parcelas expuestas puede retrasar evacuaciones y poner vidas en peligro.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": -5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 4
        },
        {
          "variableKey": "confusionPublica",
          "delta": 4
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": -2
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "En zonas de casas diseminadas dentro del monte, la defensa estructural requiere priorizar viviendas defendibles y evitar dispersar a los equipos.",
    "El triaje estructural permite concentrar recursos donde existen accesos seguros, espacio defendible, rutas de escape y posibilidades reales de éxito.",
    "La prioridad debe ser confirmar que no quedan personas expuestas y proteger la seguridad de brigadas y bomberos antes que intentar defender todas las estructuras."
  ]
};
