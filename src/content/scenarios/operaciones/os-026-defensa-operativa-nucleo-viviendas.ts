import type { Scenario } from '../../../domain/types/scenario.js';

export const os026DefensaOperativaNucleoViviendas: Scenario = {
  "id": "s-026-defensa-operativa-nucleo-viviendas",
  "title": "Defensa operativa del núcleo de viviendas",
  "category": "operaciones",
  "phase": "crisis",
  "block": "estrategia-extincion",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "defensa-operativa",
    "viviendas",
    "interfaz-urbano-forestal",
    "bomberos",
    "brigadas",
    "pavesas",
    "ataque-indirecto",
    "rutas-escape"
  ],
  "status": "available",
  "context": "El incendio sigue avanzando sin control. El frente se aproxima a un núcleo de viviendas y se plantea enviar bomberos y brigadas forestales para intentar defender la zona habitada.",
  "question": "¿Cómo organizas la defensa del núcleo de viviendas ante un incendio de alta intensidad?",
  "briefing": "El incendio ha ganado intensidad y avanza hacia una zona de interfaz urbano-forestal. Las llamas superan los dos metros y medio, el humo reduce la visibilidad y el viento puede lanzar pavesas que provoquen focos secundarios en jardines, tejados, cunetas o zonas con vegetación seca. Los servicios de extinción valoran entrar en el núcleo de viviendas para proteger las casas más expuestas, pero la operación tiene un riesgo elevado. No todas las viviendas son defendibles: algunas tienen vegetación muy próxima, accesos estrechos o carecen de zonas seguras para el trabajo de las autobombas. Antes de enviar equipos, es necesario decidir una estrategia: priorizar vidas humanas, confirmar rutas de entrada y salida, identificar viviendas defendibles, controlar pavesas y focos secundarios, y combinar la defensa directa de estructuras con maniobras indirectas si las condiciones lo permiten. La prioridad absoluta es proteger a la población y a los equipos de emergencia. Ninguna vivienda justifica dejar a bomberos atrapados sin vía de escape.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Enviar a los bomberos al núcleo de viviendas solo con una estrategia de defensa operativa clara: priorizar vidas humanas, comprobar rutas de entrada y salida, evaluar qué viviendas son defendibles y posicionar las autobombas siempre de cara a una vía segura de repliegue.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Con llamas de más de dos metros y medio, no se puede improvisar. La defensa de viviendas debe hacerse con triaje estructural, rutas de escape y protección del personal. Defender casas sí; meter bomberos en una ratonera, no.",
      "shortFeedback": "Respuesta adecuada. Con llamas de más de dos metros y medio, no se puede improvisar. La defensa de viviendas debe hacerse con triaje estructural, rutas de escape y protección del personal. Defender casas sí; meter bomberos en una ratonera, no.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": 5
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
          "variableKey": "riesgoAtrapamiento",
          "delta": -5
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Ordenar a los bomberos que ataquen directamente el frente de llama desde el núcleo de viviendas para frenar el incendio antes de que alcance las casas.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Con esa intensidad de llama, el ataque directo puede ser demasiado peligroso si no hay condiciones favorables. El calor radiante, el humo y los cambios de viento pueden poner en riesgo a los equipos. No todo fuego se apaga de frente; a veces hay que ganarle por los lados.",
      "shortFeedback": "Respuesta incorrecta. Con esa intensidad de llama, el ataque directo puede ser demasiado peligroso si no hay condiciones favorables. El calor radiante, el humo y los cambios de viento pueden poner en riesgo a los equipos. No todo fuego se apaga de frente; a veces hay que ganarle por los lados.",
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
          "delta": -2
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Combinar la defensa de viviendas con maniobras indirectas: crear líneas de defensa, retirar combustible próximo a las casas si hay tiempo, controlar pavesas y focos secundarios, y valorar quemas de ensanche o contrafuegos solo si la dirección técnica confirma que son seguros.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. En incendios de alta intensidad, la defensa no depende solo de echar agua al frente. Hay que reducir combustible, proteger estructuras defendibles, vigilar pavesas y usar maniobras técnicas únicamente cuando las condiciones lo permiten.",
      "shortFeedback": "Respuesta adecuada. En incendios de alta intensidad, la defensa no depende solo de echar agua al frente. Hay que reducir combustible, proteger estructuras defendibles, vigilar pavesas y usar maniobras técnicas únicamente cuando las condiciones lo permiten.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 5
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -3
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Pedir a los vecinos que permanezcan en el exterior mojando tejados, retirando muebles y ayudando a los bomberos mientras llega el frente de llama.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La autoprotección de la vivienda solo tiene sentido si hay tiempo y condiciones seguras. Con el frente próximo y llamas altas, la prioridad es evacuar o confinar según orden oficial. Convertir a los vecinos en brigada improvisada es mala idea con casco invisible.",
      "shortFeedback": "Respuesta incorrecta. La autoprotección de la vivienda solo tiene sentido si hay tiempo y condiciones seguras. Con el frente próximo y llamas altas, la prioridad es evacuar o confinar según orden oficial. Convertir a los vecinos en brigada improvisada es mala idea con casco invisible.",
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
      "text": "Mandar todos los medios disponibles al núcleo de viviendas, aunque no haya rutas de escape confirmadas ni se haya evaluado qué casas pueden defenderse.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Concentrar medios sin evaluación previa puede dejar a los equipos atrapados, bloquear accesos y debilitar otros frentes. En una emergencia, “todos para allá” suena contundente, pero puede ser exactamente lo contrario de una estrategia.",
      "shortFeedback": "Respuesta incorrecta. Concentrar medios sin evaluación previa puede dejar a los equipos atrapados, bloquear accesos y debilitar otros frentes. En una emergencia, “todos para allá” suena contundente, pero puede ser exactamente lo contrario de una estrategia.",
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
          "delta": -5
        },
        {
          "variableKey": "saturacionRecursos",
          "delta": 4
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La defensa operativa de viviendas en interfaz urbano-forestal requiere priorizar vidas humanas, confirmar rutas de escape y evaluar qué estructuras son defendibles.",
    "En incendios de alta intensidad, el ataque directo puede ser inseguro; deben valorarse maniobras indirectas, control de pavesas y protección de los equipos.",
    "La seguridad de los equipos debe prevalecer sobre la defensa de estructuras cuando no existen rutas de escape ni condiciones operativas seguras."
  ]
};
