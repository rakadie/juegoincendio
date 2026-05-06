import type { Scenario } from '../../../domain/types/scenario.js';

export const s009cContinuidadIncendio: Scenario = {
  "id": "s-009c-continuidad-incendio",
  "title": "Seguimiento tras inicio del incendio",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "Están actuando los medios que has enviado aunque te avisan de que el incendio continúa.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Están actuando los medios que has enviado aunque te avisan de que el incendio continúa.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Reorganizo la estrategia: priorizo proteger viviendas y crear líneas cortafuegos",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Permite concentrar esfuerzos en protección de personas y contención del frente con criterio táctico.",
      "shortFeedback": "Permite concentrar esfuerzos en protección de personas y contención del frente con criterio táctico.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -4
        },
        {
          "variableKey": "capacidadOperativa",
          "delta": -4
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
      "text": "Aumento los medios enviados",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Mejora parcialmente la respuesta, aunque suele ser menos eficaz que reorganizar la estrategia por prioridades.",
      "shortFeedback": "Mejora parcialmente la respuesta, aunque suele ser menos eficaz que reorganizar la estrategia por prioridades.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 2
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": 1
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Espero. Todavía están actuando y pueden apagarlo",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Demorar decisiones de ajuste puede facilitar la propagación en condiciones adversas.",
      "shortFeedback": "Demorar decisiones de ajuste puede facilitar la propagación en condiciones adversas.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 4
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Retiro algunos medios para ahorrar recursos por si es necesario más tarde",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Retirar medios en fase activa reduce capacidad de control y puede empeorar el escenario.",
      "shortFeedback": "Retirar medios en fase activa reduce capacidad de control y puede empeorar el escenario.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": 3
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 6
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
