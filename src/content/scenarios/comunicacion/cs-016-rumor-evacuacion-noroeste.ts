import type { Scenario } from '../../../domain/types/scenario.js';

export const cs016RumorEvacuacionNoroeste: Scenario = {
  "id": "s-016-rumor-evacuacion-noroeste",
  "title": "Rumor de evacuación en municipios del noroeste",
  "category": "comunicacion",
  "phase": "crisis",
  "block": "informacion-publica-y-rumores",
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
      "rationale": "Corta el rumor sin dejar vacío informativo, reduce el riesgo de pánico y refuerza la autoridad de los canales oficiales.",
      "shortFeedback": "Respuesta adecuada. La aclaración oficial reduce la confusión y dirige a la población hacia fuentes verificadas.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "rumor-evacuacion-desmentido"
      ]
    },
    {
      "id": "b",
      "text": "No decir nada para no dar más difusión al rumor y esperar a que la población se dé cuenta de que no hay una evacuación real.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "El silencio deja espacio al miedo y permite que el rumor crezca. En una emergencia, no comunicar también comunica, y suele comunicar mal.",
      "shortFeedback": "Respuesta arriesgada. La falta de una aclaración oficial alimenta la incertidumbre.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "rumor-evacuacion-sin-respuesta"
      ]
    },
    {
      "id": "c",
      "text": "Coordinar un mensaje conjunto con Protección Civil, ayuntamientos afectados y cuerpos de seguridad para desmentir el rumor, actualizar la situación y explicar que cualquier evacuación se comunicará por vías oficiales.",
      "evaluation": "optimal",
      "severity": "medium",
      "rationale": "Un mensaje coordinado evita contradicciones, aporta confianza y ayuda a que la población sepa dónde mirar antes de actuar.",
      "shortFeedback": "Respuesta óptima. La coordinación institucional reduce el ruido y refuerza la credibilidad del operativo.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "rumor-evacuacion-desmentido",
        "mensaje-institucional-coordinado"
      ]
    },
    {
      "id": "d",
      "text": "Ordenar una evacuación preventiva de todos los municipios del noroeste para evitar críticas si el incendio cambia de dirección.",
      "evaluation": "critical",
      "severity": "critical",
      "rationale": "Una evacuación masiva sin base operativa puede generar caos, saturar carreteras y exponer a la población a riesgos innecesarios.",
      "shortFeedback": "Respuesta crítica. La decisión convierte un rumor en una crisis logística real.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "evacuacion-innecesaria-por-rumor"
      ]
    },
    {
      "id": "e",
      "text": "Responder desde una cuenta personal criticando a quienes han difundido el rumor y señalando que están creando alarma.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Personalizar el conflicto empeora la comunicación. La respuesta debe ser institucional, clara y útil.",
      "shortFeedback": "Respuesta arriesgada. La comunicación personalista puede aumentar la tensión y desviar el foco.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "respuesta-personalista-rumor"
      ]
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La gestión de rumores en emergencias requiere comunicación rápida, oficial, coordinada y verificable.",
    "Ante una falsa orden de evacuación, el objetivo es evitar pánico, movimientos innecesarios de población y saturación de vías."
  ]
};
