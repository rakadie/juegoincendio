import type { Scenario } from '../../../domain/types/scenario.js';

export const os010cAtaqueZonaSecundaria: Scenario = {
  "id": "s-010c-ataque-zona-secundaria",
  "title": "Actuación en otra zona del monte antes de la noche",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "Mientras tanto, en otra zona del monte los medios aéreos continúan trabajando sin descanso antes de que llegue la noche.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Mientras tanto, en otra zona del monte los medios aéreos continúan trabajando sin descanso antes de que llegue la noche.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Ordenas parar las descargas aéreas para ahorrar agua y utilizarla más tarde",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Interrumpir descargas en fase activa suele favorecer la continuidad del frente de incendio.",
      "shortFeedback": "Interrumpir descargas en fase activa suele favorecer la continuidad del frente de incendio.",
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
      "id": "b",
      "text": "Mandas a las brigadas terrestres que sigan atacando desde la cola",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede aportar control local, pero puede ser insuficiente si no se actúa también sobre zonas críticas.",
      "shortFeedback": "Puede aportar control local, pero puede ser insuficiente si no se actúa también sobre zonas críticas.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -4
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 1
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Pides a los medios terrestres que realicen líneas de defensa",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Consolida la contención y mejora la capacidad de frenar propagación antes del periodo nocturno.",
      "shortFeedback": "Consolida la contención y mejora la capacidad de frenar propagación antes del periodo nocturno.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -4
        },
        {
          "variableKey": "capacidadOperativa",
          "delta": -5
        },
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Rediriges parte de las brigadas para atacar los flancos del incendio",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Atacar flancos puede reducir la expansión lateral y reforzar el cierre táctico del perímetro.",
      "shortFeedback": "Atacar flancos puede reducir la expansión lateral y reforzar el cierre táctico del perímetro.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -3
        },
        {
          "variableKey": "capacidadOperativa",
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
