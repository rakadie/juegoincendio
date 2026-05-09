import type { Scenario } from '../../../domain/types/scenario.js';

export const cs013SimulacroEscolar: Scenario = {
  "id": "s-013-simulacro-escolar",
  "title": "Nueva variable: simulacros en centros educativos",
  "category": "comunicacion",
  "phase": "alerta",
  "block": "comunicacion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "comunicacion"
  ],
  "status": "available",
  "context": "Se propone realizar simulacros escolares trimestrales para mejorar cultura preventiva.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Se propone realizar simulacros escolares trimestrales para mejorar cultura preventiva.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Implantar simulacro con guion de autoprotección y coordinación municipal",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Aumenta preparación comunitaria intergeneracional.",
      "shortFeedback": "Aumenta preparación comunitaria intergeneracional.",
      "impacts": [
        {
          "variableKey": "confianzaVecinal",
          "delta": 3
        },
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Posponer indefinidamente por carga administrativa",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Se pierde oportunidad de entrenamiento en calma.",
      "shortFeedback": "Se pierde oportunidad de entrenamiento en calma.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
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
