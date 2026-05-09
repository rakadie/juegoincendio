import type { Scenario } from '../../../domain/types/scenario.js';

export const os010dZonaBarranco: Scenario = {
  "id": "s-010d-zona-barranco",
  "title": "Intervención en zona de barranco",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "Las llamas llegan a una zona de barranco…",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Las llamas llegan a una zona de barranco…",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Das las órdenes para que lleguen allí los hidroaviones",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Aporta alta capacidad de descarga en un terreno complejo donde el acceso terrestre puede estar limitado.",
      "shortFeedback": "Aporta alta capacidad de descarga en un terreno complejo donde el acceso terrestre puede estar limitado.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -7
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Ordenas desviar un camión de bomberos para que baje al fondo del barranco",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede comprometer la seguridad y la maniobrabilidad del vehículo en una zona de difícil acceso.",
      "shortFeedback": "Puede comprometer la seguridad y la maniobrabilidad del vehículo en una zona de difícil acceso.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -3
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Pides a los helicópteros que acudan a la zona de barranco",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Los helicópteros ofrecen flexibilidad táctica y precisión de descarga en relieve abrupto.",
      "shortFeedback": "Los helicópteros ofrecen flexibilidad táctica y precisión de descarga en relieve abrupto.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -5
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Ordenas a las brigadas terrestres que ataquen el flanco del incendio desde la parte alta del barranco",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede ser útil en combinación con medios aéreos, pero aislado incrementa exposición del personal.",
      "shortFeedback": "Puede ser útil en combinación con medios aéreos, pero aislado incrementa exposición del personal.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -5
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 1
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
