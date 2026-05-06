import type { Scenario } from '../../../domain/types/scenario.js';

export const s010CambioVientoEvacuacion: Scenario = {
  "id": "s-010-cambio-viento-evacuacion",
  "title": "Cambio de viento hacia núcleo poblado",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "El frente cambia dirección y amenaza zona habitada.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "El frente cambia dirección y amenaza zona habitada.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Ordenar evacuación y traslado también de animales a centros de acogida",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Protege vidas humanas y reduce pérdidas indirectas en explotaciones.",
      "shortFeedback": "Protege vidas humanas y reduce pérdidas indirectas en explotaciones.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -5
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": 4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Evacuar solo a personas y dejar animales en fincas",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Aumenta impacto en economía familiar y bienestar animal.",
      "shortFeedback": "Aumenta impacto en economía familiar y bienestar animal.",
      "impacts": [
        {
          "variableKey": "continuidadSectorPrimario",
          "delta": -4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Ordeno una evacuación escalonada y habilito varios puntos de acogida en municipios cercanos",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Reduce cuellos de botella, ordena los traslados y mejora la protección de la población desplazada.",
      "shortFeedback": "Reduce cuellos de botella, ordena los traslados y mejora la protección de la población desplazada.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -3
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": 5
        },
        {
          "variableKey": "capacidadOperativa",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Doy a los vecinos la opción de decidir si quieren evacuar o no",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Delegar la evacuación en decisión individual en fase crítica aumenta la exposición y descoordinación.",
      "shortFeedback": "Delegar la evacuación en decisión individual en fase crítica aumenta la exposición y descoordinación.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 6
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": -5
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
