import type { Scenario } from '../../../domain/types/scenario.js';

export const os008bRiesgoExtremoVerano: Scenario = {
  "id": "s-008b-riesgo-extremo-verano",
  "title": "Medidas ante riesgo extremo en verano",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "Es pleno verano. El termómetro supera los 38 °C, la humedad es muy baja y el viento puede cambiar en cualquier momento. Los técnicos advierten que el riesgo de incendio es extremo y que cualquier chispa podría provocar un gran fuego.\n\n¿Qué medidas decides tomar para reducir el riesgo en el monte?",
  "question": "¿Qué decisión tomas?",
  "briefing": "Es pleno verano. El termómetro supera los 38 °C, la humedad es muy baja y el viento puede cambiar en cualquier momento. Los técnicos advierten que el riesgo de incendio es extremo y que cualquier chispa podría provocar un gran fuego.\n\n¿Qué medidas decides tomar para reducir el riesgo en el monte?",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Activar el nivel máximo de alerta: prohibir barbacoas y quemas, cerrar algunas pistas forestales y aumentar la vigilancia con patrullas y torres de observación.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Combina restricciones, control de accesos y refuerzo de vigilancia para reducir igniciones y mejorar detección temprana.",
      "shortFeedback": "Combina restricciones, control de accesos y refuerzo de vigilancia para reducir igniciones y mejorar detección temprana.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 8
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -4
        },
        {
          "variableKey": "capacidadOperativa",
          "delta": -2
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Recomendar a la población que tenga precaución en el monte, pero mantener todas las actividades recreativas abiertas.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "La recomendación genérica sin medidas adicionales suele ser insuficiente en condiciones extremas.",
      "shortFeedback": "La recomendación genérica sin medidas adicionales suele ser insuficiente en condiciones extremas.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -4
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
      "id": "c",
      "text": "Permitir el uso de barbacoas solo en zonas habilitadas porque están preparadas para el fuego.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Incluso en áreas habilitadas, mantener focos de ignición con riesgo extremo eleva la probabilidad de incidente.",
      "shortFeedback": "Incluso en áreas habilitadas, mantener focos de ignición con riesgo extremo eleva la probabilidad de incidente.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -6
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 5
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "No tomar medidas especiales porque todavía no se ha declarado ningún incendio.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Esperar a la declaración de incendio en riesgo extremo reduce la capacidad de prevención y reacción temprana.",
      "shortFeedback": "Esperar a la declaración de incendio en riesgo extremo reduce la capacidad de prevención y reacción temprana.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -9
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 7
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
  ]
};
