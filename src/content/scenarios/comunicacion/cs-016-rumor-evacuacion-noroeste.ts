import type { Scenario } from '../../../domain/types/scenario.js';

export const cs016RumorEvacuacionNoroeste: Scenario = {
  "id": "s-016-rumor-evacuacion-noroeste",
  "title": "Rumor de evacuación en municipios del noroeste",
  "category": "comunicacion",
  "phase": "crisis",
  "block": "evacuacion-y-proteccion-civil",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "evacuacion",
    "redes-sociales",
    "rumor",
    "proteccion-civil",
    "municipios-noroeste",
    "comunicacion-crisis"
  ],
  "status": "available",
  "context": "En redes sociales comienza a circular el rumor de que la población de los municipios del noroeste debe evacuar de inmediato.",
  "question": "¿Cómo respondes ante un rumor de evacuación que no corresponde con una orden oficial?",
  "briefing": "Durante la evolución del incendio, varios mensajes en redes sociales aseguran que todos los vecinos de los municipios del noroeste deben abandonar sus casas. La información se está compartiendo rápidamente por grupos de mensajería y perfiles locales. Sin embargo, desde la dirección de la emergencia no se ha dado ninguna orden de evacuación general en esa zona. Existe riesgo de pánico, colapso de carreteras secundarias y desinformación.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Emitir de inmediato un comunicado oficial aclarando que no existe orden de evacuación general, indicar qué zonas sí están afectadas y pedir a la población que siga solo los canales oficiales.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Corta el rumor sin dejar vacío informativo, reduce el riesgo de pánico y refuerza la autoridad de los canales oficiales.",
      "shortFeedback": "Respuesta adecuada. Corta el rumor sin dejar vacío informativo, reduce el riesgo de pánico y refuerza la autoridad de los canales oficiales.",
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
          "variableKey": "riesgoAtrapamiento",
          "delta": -3
        },
        {
          "variableKey": "saturacion112",
          "delta": -3
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
      "text": "No decir nada para no dar más difusión al rumor y esperar a que la población se dé cuenta de que no hay una evacuación real.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. El silencio deja espacio al miedo y permite que el rumor crezca. En una emergencia, no comunicar también comunica, y suele comunicar mal.",
      "shortFeedback": "Respuesta incorrecta. El silencio deja espacio al miedo y permite que el rumor crezca. En una emergencia, no comunicar también comunica, y suele comunicar mal.",
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
          "variableKey": "riesgoAtrapamiento",
          "delta": 3
        },
        {
          "variableKey": "saturacion112",
          "delta": 4
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
      "id": "c",
      "text": "Coordinar un mensaje conjunto con Protección Civil, ayuntamientos afectados y cuerpos de seguridad para desmentir el rumor, actualizar la situación y explicar que cualquier evacuación se comunicará por vías oficiales.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Un mensaje coordinado evita contradicciones, aporta confianza y ayuda a que la población sepa dónde mirar antes de actuar.",
      "shortFeedback": "Respuesta adecuada. Un mensaje coordinado evita contradicciones, aporta confianza y ayuda a que la población sepa dónde mirar antes de actuar.",
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
          "variableKey": "coordinacionOperativa",
          "delta": 5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -3
        },
        {
          "variableKey": "saturacion112",
          "delta": -4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Ordenar una evacuación preventiva de todos los municipios del noroeste para evitar críticas si el incendio cambia de dirección.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Una evacuación masiva sin base operativa puede generar caos, saturar carreteras y exponer a la población a riesgos innecesarios.",
      "shortFeedback": "Respuesta incorrecta. Una evacuación masiva sin base operativa puede generar caos, saturar carreteras y exponer a la población a riesgos innecesarios.",
      "impacts": [
        {
          "variableKey": "confusionPublica",
          "delta": 4
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -5
        },
        {
          "variableKey": "saturacionRecursos",
          "delta": 5
        },
        {
          "variableKey": "confianzaInstitucional",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Responder desde una cuenta personal criticando a quienes han difundido el rumor y señalando que están creando alarma.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Personalizar el conflicto empeora la comunicación. La respuesta debe ser institucional, clara y útil, no una bronca en la plaza digital.",
      "shortFeedback": "Respuesta incorrecta. Personalizar el conflicto empeora la comunicación. La respuesta debe ser institucional, clara y útil, no una bronca en la plaza digital.",
      "impacts": [
        {
          "variableKey": "confianzaInstitucional",
          "delta": -4
        },
        {
          "variableKey": "confusionPublica",
          "delta": 3
        },
        {
          "variableKey": "tensionPublica",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -2
        },
        {
          "variableKey": "saturacion112",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La gestión de rumores en emergencias requiere comunicación rápida, oficial, coordinada y verificable.",
    "Ante una falsa orden de evacuación, el objetivo es evitar pánico, movimientos innecesarios de población y saturación de vías.",
    "La coordinación entre Protección Civil, ayuntamientos y cuerpos de seguridad ayuda a reducir contradicciones y reforzar la confianza pública."
  ]
};
