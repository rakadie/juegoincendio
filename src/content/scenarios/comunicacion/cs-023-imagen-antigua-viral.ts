import type { Scenario } from '../../../domain/types/scenario.js';

export const cs023ImagenAntiguaViral: Scenario = {
  "id": "s-023-imagen-antigua-viral",
  "title": "Una imagen antigua se hace viral",
  "category": "comunicacion",
  "phase": "crisis",
  "block": "comunicacion-crisis",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "desinformacion",
    "imagen-viral",
    "redes-sociales",
    "rumores",
    "mapa-actualizado",
    "medios-comunicacion",
    "canales-oficiales"
  ],
  "status": "available",
  "context": "Empieza a circular por redes sociales una imagen impactante de un incendio como si fuera actual, aunque no corresponde a la emergencia en curso.",
  "question": "¿Cómo respondes ante una imagen falsa o antigua que está generando alarma durante la emergencia?",
  "briefing": "Durante la evolución del incendio, una fotografía antigua empieza a circular como si mostrara el avance actual del fuego. La imagen es espectacular: llamas cerca de viviendas, humo intenso y personas huyendo. En pocos minutos, vecinos de una zona no afectada comienzan a llamar al 112 y a los ayuntamientos preguntando si deben evacuar. Algunos incluso se preparan para salir por su cuenta. El problema no es solo desmentir una imagen: hay que evitar que el miedo provoque movimientos innecesarios, saturación de llamadas y pérdida de confianza en la información oficial. Tenemos que decidir cómo actuar: verificar rápidamente la imagen, desmentir sin amplificar el pánico, publicar información actualizada y reforzar los canales oficiales.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Publicar un desmentido oficial claro, explicar que la imagen no corresponde al incendio actual y acompañarlo de información actualizada sobre las zonas realmente afectadas.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. El desmentido debe ir acompañado de información útil. No basta con decir “esto es falso”; hay que dar a la población una referencia fiable para orientarse.",
      "shortFeedback": "Respuesta adecuada. El desmentido debe ir acompañado de información útil. No basta con decir “esto es falso”; hay que dar a la población una referencia fiable para orientarse.",
      "impacts": [
        {
          "variableKey": "confusionPublica",
          "delta": -5
        },
        {
          "variableKey": "confianzaInstitucional",
          "delta": 4
        },
        {
          "variableKey": "saturacion112",
          "delta": -3
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -2
        },
        {
          "variableKey": "transparenciaInformativa",
          "delta": 4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Ignorar la imagen para no darle más difusión y esperar a que deje de circular.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. En una emergencia, el silencio puede permitir que la imagen falsa marque la percepción pública. El rumor corre; la información oficial no puede ir paseando.",
      "shortFeedback": "Respuesta incorrecta. En una emergencia, el silencio puede permitir que la imagen falsa marque la percepción pública. El rumor corre; la información oficial no puede ir paseando.",
      "impacts": [
        {
          "variableKey": "confusionPublica",
          "delta": 5
        },
        {
          "variableKey": "confianzaInstitucional",
          "delta": -4
        },
        {
          "variableKey": "saturacion112",
          "delta": 4
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 3
        },
        {
          "variableKey": "transparenciaInformativa",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Difundir un mapa actualizado de la emergencia, pedir apoyo a medios de comunicación y ayuntamientos para amplificar la corrección, y recordar qué canales oficiales deben consultarse.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Una imagen falsa se combate mejor con contexto verificable: mapa actualizado, canales oficiales y aliados informativos que ayuden a llegar rápido a la población.",
      "shortFeedback": "Respuesta adecuada. Una imagen falsa se combate mejor con contexto verificable: mapa actualizado, canales oficiales y aliados informativos que ayuden a llegar rápido a la población.",
      "impacts": [
        {
          "variableKey": "confusionPublica",
          "delta": -5
        },
        {
          "variableKey": "confianzaInstitucional",
          "delta": 5
        },
        {
          "variableKey": "saturacion112",
          "delta": -4
        },
        {
          "variableKey": "transparenciaInformativa",
          "delta": 5
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
      "text": "Responder solo en comentarios de redes sociales a quienes estén compartiendo la imagen.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Contestar caso por caso es insuficiente y desordenado. La respuesta debe ser institucional, visible y fácil de encontrar.",
      "shortFeedback": "Respuesta incorrecta. Contestar caso por caso es insuficiente y desordenado. La respuesta debe ser institucional, visible y fácil de encontrar.",
      "impacts": [
        {
          "variableKey": "confusionPublica",
          "delta": 3
        },
        {
          "variableKey": "confianzaInstitucional",
          "delta": -2
        },
        {
          "variableKey": "saturacion112",
          "delta": 2
        },
        {
          "variableKey": "transparenciaInformativa",
          "delta": -2
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Publicar la imagen falsa junto al desmentido sin ningún tipo de advertencia visual ni contexto, para que la gente sepa cuál es.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Reproducir la imagen sin cuidado puede amplificarla todavía más. Si se muestra, debe hacerse con marca clara de “falso” o “imagen antigua” y siempre junto a información verificada.",
      "shortFeedback": "Respuesta incorrecta. Reproducir la imagen sin cuidado puede amplificarla todavía más. Si se muestra, debe hacerse con marca clara de “falso” o “imagen antigua” y siempre junto a información verificada.",
      "impacts": [
        {
          "variableKey": "confusionPublica",
          "delta": 4
        },
        {
          "variableKey": "confianzaInstitucional",
          "delta": -3
        },
        {
          "variableKey": "saturacion112",
          "delta": 3
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 2
        },
        {
          "variableKey": "transparenciaInformativa",
          "delta": -1
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La desinformación visual durante una emergencia puede generar miedo, saturación de llamadas y movimientos innecesarios de población.",
    "Los desmentidos deben acompañarse de información actualizada, canales oficiales y materiales verificables como mapas o comunicados claros.",
    "La coordinación con medios de comunicación y ayuntamientos ayuda a amplificar la corrección y reducir la circulación de rumores."
  ]
};
