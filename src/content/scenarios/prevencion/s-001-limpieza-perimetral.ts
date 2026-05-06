import type { Scenario } from '../../../domain/types/scenario.js';

export const s001LimpiezaPerimetral: Scenario = {
  "id": "s-001-limpieza-perimetral",
  "title": "Limpieza alrededor de viviendas",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "Como responsable de Emergencias, debes recomendar la distancia de limpieza mínima alrededor de viviendas y edificios públicos.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Como responsable de Emergencias, debes recomendar la distancia de limpieza mínima alrededor de viviendas y edificios públicos.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "5 metros",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Insuficiente para reducir continuidad del combustible.",
      "shortFeedback": "Insuficiente para reducir continuidad del combustible.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "8 metros",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Mejora parcial, pero sigue siendo limitada.",
      "shortFeedback": "Mejora parcial, pero sigue siendo limitada.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -1
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "12 metros",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Mejor equilibrio para reducir riesgo en interfaz urbano-forestal.",
      "shortFeedback": "Mejor equilibrio para reducir riesgo en interfaz urbano-forestal.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 6
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "15 metros",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede ser adecuada en contextos concretos, pero no siempre exigible.",
      "shortFeedback": "Puede ser adecuada en contextos concretos, pero no siempre exigible.",
      "impacts": [
        {
          "variableKey": "confianzaVecinal",
          "delta": -1
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "20 metros",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede percibirse desproporcionada y bajar adherencia social.",
      "shortFeedback": "Puede percibirse desproporcionada y bajar adherencia social.",
      "impacts": [
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
