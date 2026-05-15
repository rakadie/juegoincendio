import type { Scenario } from '../../../domain/types/scenario.js';

export const os033SenderistasDesorientadosHumo: Scenario = {
  "id": "s-033-senderistas-desorientados-humo",
  "title": "Senderistas desorientados por el humo",
  "category": "operaciones",
  "phase": "crisis",
  "block": "evacuacion-y-proteccion-civil",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "senderistas",
    "turistas",
    "humo",
    "geolocalizacion",
    "rescate",
    "zona-recreativa",
    "senderos",
    "cambio-viento"
  ],
  "status": "available",
  "context": "Un grupo de turistas se encuentra en una zona recreativa y de senderos cuando cambia el viento y el humo empieza a cubrir el área. No conocen bien el terreno, tienen poca batería en los móviles y han enviado un aviso confuso indicando que no saben hacia dónde salir.",
  "question": "¿Cómo organizas la localización y rescate de senderistas desorientados durante el incendio?",
  "briefing": "El cambio de viento desplaza el humo hacia una zona recreativa con varios senderos. Un grupo de turistas contacta con emergencias, pero la llamada se corta antes de poder confirmar su ubicación exacta. Los senderistas no conocen el terreno, tienen poca batería y podrían intentar moverse por su cuenta buscando una salida. La visibilidad empeora y algunas pistas forestales pueden quedar expuestas al humo o al avance irregular del fuego. Los equipos de emergencia deben decidir cómo actuar: intentar geolocalizarlos, cerrar accesos para que no entren más personas, enviar recursos de búsqueda desde puntos seguros y coordinar la operación sin dejar desprotegidos otros frentes activos. La prioridad es localizar al grupo con precisión, evitar que se desplacen hacia zonas de riesgo y no comprometer a los equipos de rescate en una búsqueda improvisada.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Activar la localización del grupo mediante llamada, mensajería o geolocalización si está disponible, pedirles que no se muevan salvo indicación expresa y enviar recursos de rescate desde accesos seguros confirmados.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Antes de mandar equipos al monte a ciegas, hay que fijar la posición del grupo. Si se mueven sin instrucciones, pueden alejarse de zonas seguras o meterse de lleno en el humo.",
      "shortFeedback": "Respuesta adecuada. Antes de mandar equipos al monte a ciegas, hay que fijar la posición del grupo. Si se mueven sin instrucciones, pueden alejarse de zonas seguras o meterse de lleno en el humo.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": 5
        },
        {
          "variableKey": "eficaciaRescate",
          "delta": 5
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": 4
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
      "id": "b",
      "text": "Enviar inmediatamente varias unidades por todos los senderos posibles para cubrir más terreno cuanto antes.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Buscar “a lo ancho” sin ubicación clara puede dispersar recursos, exponer a los equipos y dejar otros frentes sin cobertura. El monte no es un tablero de hundir la flota.",
      "shortFeedback": "Respuesta incorrecta. Buscar “a lo ancho” sin ubicación clara puede dispersar recursos, exponer a los equipos y dejar otros frentes sin cobertura. El monte no es un tablero de hundir la flota.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": -4
        },
        {
          "variableKey": "eficaciaRescate",
          "delta": -3
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -4
        },
        {
          "variableKey": "saturacionRecursos",
          "delta": 4
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Cerrar temporalmente accesos a la zona recreativa, avisar a alojamientos, guías y ayuntamientos cercanos, y coordinar la búsqueda con personal que conozca el terreno, priorizando rutas seguras y puntos de encuentro.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. No basta con rescatar al grupo: hay que evitar que entren más personas y aprovechar conocimiento local. En senderos, un mal cruce puede ser media hora perdida y mucho humo ganado.",
      "shortFeedback": "Respuesta adecuada. No basta con rescatar al grupo: hay que evitar que entren más personas y aprovechar conocimiento local. En senderos, un mal cruce puede ser media hora perdida y mucho humo ganado.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 5
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": 4
        },
        {
          "variableKey": "eficaciaRescate",
          "delta": 4
        },
        {
          "variableKey": "nuevosAtrapados",
          "delta": -5
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Indicar al grupo que camine cuesta abajo hasta encontrar una carretera o una zona habitada.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. En un incendio, “cuesta abajo” puede llevar a un barranco, una zona con humo acumulado o una pista comprometida. Sin información precisa, moverse por intuición puede empeorar la situación.",
      "shortFeedback": "Respuesta incorrecta. En un incendio, “cuesta abajo” puede llevar a un barranco, una zona con humo acumulado o una pista comprometida. Sin información precisa, moverse por intuición puede empeorar la situación.",
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
          "variableKey": "eficaciaRescate",
          "delta": -4
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
      "text": "Priorizar otros frentes y esperar a que el grupo vuelva a llamar cuando tenga mejor cobertura o más información.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Con poca batería, humo y desorientación, esperar puede hacer que se pierda la única ventana de localización. La emergencia no tiene botón de “llamar más tarde”.",
      "shortFeedback": "Respuesta incorrecta. Con poca batería, humo y desorientación, esperar puede hacer que se pierda la única ventana de localización. La emergencia no tiene botón de “llamar más tarde”.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": -5
        },
        {
          "variableKey": "eficaciaRescate",
          "delta": -5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -2
        },
        {
          "variableKey": "danosReputacionales",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "En rescates durante incendios forestales, la localización precisa reduce riesgos para la población afectada y para los equipos de intervención.",
    "Ante senderistas desorientados, debe evitarse que se desplacen sin instrucciones y priorizar rutas de acceso seguras para los equipos.",
    "Cerrar accesos a zonas recreativas evita que nuevas personas entren en áreas comprometidas por humo, viento o avance del fuego."
  ]
};
