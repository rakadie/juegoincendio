import type { Scenario } from '../../../domain/types/scenario.js';

export const cs008CampanaSectorPrimario: Scenario = {
  "id": "s-008-campana-sector-primario",
  "title": "Campaña de comunicación sector primario",
  "category": "comunicacion",
  "phase": "alerta",
  "block": "comunicacion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "comunicacion"
  ],
  "status": "available",
  "context": "Debes activar mensajes de campaña sobre consumo local y sostenibilidad territorial.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Debes activar mensajes de campaña sobre consumo local y sostenibilidad territorial.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Promover consumo local para reforzar economía y paisaje gestionado",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Favorece resiliencia territorial y continuidad de actividades rurales.",
      "shortFeedback": "Favorece resiliencia territorial y continuidad de actividades rurales.",
      "impacts": [
        {
          "variableKey": "continuidadSectorPrimario",
          "delta": 8
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Priorizar siempre producto exterior si es más barato",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Debilita la cadena de valor local en el medio rural.",
      "shortFeedback": "Debilita la cadena de valor local en el medio rural.",
      "impacts": [
        {
          "variableKey": "continuidadSectorPrimario",
          "delta": -7
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
