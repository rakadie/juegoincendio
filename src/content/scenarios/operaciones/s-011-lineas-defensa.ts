import type { Scenario } from '../../../domain/types/scenario.js';

export const s011LineasDefensa: Scenario = {
  "id": "s-011-lineas-defensa",
  "title": "Defensa nocturna del perímetro",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "Con la caída de la noche, el objetivo es evitar más daños en viviendas.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Con la caída de la noche, el objetivo es evitar más daños en viviendas.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Relevos terrestres + líneas de defensa coordinadas",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Mejora sostenibilidad táctica y contención progresiva.",
      "shortFeedback": "Mejora sostenibilidad táctica y contención progresiva.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Forzar ataque directo continuo sin relevo",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Fatiga operativa y mayor exposición de personal.",
      "shortFeedback": "Fatiga operativa y mayor exposición de personal.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -10
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Priorizar la protección del núcleo urbano y retirar equipos de zonas menos críticas",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Concentra recursos en la zona con mayor riesgo para viviendas y mejora la eficacia de la defensa.",
      "shortFeedback": "Concentra recursos en la zona con mayor riesgo para viviendas y mejora la eficacia de la defensa.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -3
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": 2
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
      "text": "Suspender las operaciones hasta el amanecer cuando haya más luz",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Detener la respuesta en fase activa puede permitir propagación nocturna y aumentar daños acumulados.",
      "shortFeedback": "Detener la respuesta en fase activa puede permitir propagación nocturna y aumentar daños acumulados.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 6
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": -4
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
