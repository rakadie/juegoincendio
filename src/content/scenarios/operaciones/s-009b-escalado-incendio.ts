import type { Scenario } from '../../../domain/types/scenario.js';

export const s009bEscaladoIncendio: Scenario = {
  "id": "s-009b-escalado-incendio",
  "title": "Escalado de medios por empeoramiento del incendio",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "Las temperaturas y la falta de humedad no ayudan. El incendio ocupa más masa forestal.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Las temperaturas y la falta de humedad no ayudan. El incendio ocupa más masa forestal.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Envío medios aéreos más grandes (hidroaviones, helicópteros Kamov)",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Ante intensificación del fuego, aumentar capacidad de descarga y alcance mejora la contención inicial.",
      "shortFeedback": "Ante intensificación del fuego, aumentar capacidad de descarga y alcance mejora la contención inicial.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -10
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -5
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Solo mando más medios terrestres",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Refuerza el frente, pero puede resultar insuficiente sin apoyo aéreo en condiciones extremas.",
      "shortFeedback": "Refuerza el frente, pero puede resultar insuficiente sin apoyo aéreo en condiciones extremas.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -6
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
      "text": "Enviar un medio aéreo adicional y reforzar ligeramente las brigadas terrestres",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Es una escalada parcial que puede ayudar, aunque puede quedarse corta si el frente sigue creciendo.",
      "shortFeedback": "Es una escalada parcial que puede ayudar, aunque puede quedarse corta si el frente sigue creciendo.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -7
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
      "id": "d",
      "text": "No enviar más recursos y confiar en que el viento reduzca la intensidad del incendio",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "La inacción en un escenario adverso aumenta el riesgo de propagación y de daños a población y viviendas.",
      "shortFeedback": "La inacción en un escenario adverso aumenta el riesgo de propagación y de daños a población y viviendas.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 8
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
