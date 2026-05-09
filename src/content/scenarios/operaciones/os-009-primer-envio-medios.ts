import type { Scenario } from '../../../domain/types/scenario.js';

export const os009PrimerEnvioMedios: Scenario = {
  "id": "s-009-primer-envio-medios",
  "title": "Activación inicial de medios",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "Con aviso naranja por calor y primer humo detectado en cumbre, debes decidir el primer despliegue.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Con aviso naranja por calor y primer humo detectado en cumbre, debes decidir el primer despliegue.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Dos brigadas, dos medios aéreos y dos unidades policiales",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Permite respuesta inicial robusta ante condiciones extremas.",
      "shortFeedback": "Permite respuesta inicial robusta ante condiciones extremas.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -8
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Una brigada, un medio aéreo y unidades policiales",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede quedarse corto para estabilización temprana.",
      "shortFeedback": "Puede quedarse corto para estabilización temprana.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 5
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Enviar una unidad policial y un helicóptero de reconocimiento para evaluar el incendio antes de desplegar brigadas",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Aporta información, pero puede retrasar el ataque inicial en condiciones de riesgo alto.",
      "shortFeedback": "Aporta información, pero puede retrasar el ataque inicial en condiciones de riesgo alto.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "No movilizar recursos y observar la evolución del incendio desde el centro de coordinación",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Retrasa la respuesta operativa y aumenta la probabilidad de propagación del incendio.",
      "shortFeedback": "Retrasa la respuesta operativa y aumenta la probabilidad de propagación del incendio.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": 2
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 8
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
