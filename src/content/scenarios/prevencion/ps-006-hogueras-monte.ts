import type { Scenario } from '../../../domain/types/scenario.js';

export const ps006HoguerasMonte: Scenario = {
  "id": "s-006-hogueras-monte",
  "title": "Hogueras o barbacoas en entorno forestal",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "Otra de las dudas que circulan es si es posible hacer hogueras o barbacoas en el monte.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Otra de las dudas que circulan es si es posible hacer hogueras o barbacoas en el monte.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Sí, si la zona está limpia aunque haga calor o sea verano",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "La limpieza del entorno no sustituye la restricción por riesgo alto en periodos críticos.",
      "shortFeedback": "La limpieza del entorno no sustituye la restricción por riesgo alto en periodos críticos.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Si estamos de acampada, en una zona limpia de matorral",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "La acampada no habilita por sí sola el uso de fuego en entorno forestal.",
      "shortFeedback": "La acampada no habilita por sí sola el uso de fuego en entorno forestal.",
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
      "id": "c",
      "text": "Solo en las zonas autorizadas",
      "evaluation": "acceptable",
      "severity": "medium",
      "rationale": "Es condición necesaria, pero también deben cumplirse las condiciones meteorológicas y normativas vigentes.",
      "shortFeedback": "Es condición necesaria, pero también deben cumplirse las condiciones meteorológicas y normativas vigentes.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 1
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Solo es posible en otoño e invierno",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "La autorización no depende únicamente de la estación, sino del riesgo y de la regulación activa.",
      "shortFeedback": "La autorización no depende únicamente de la estación, sino del riesgo y de la regulación activa.",
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
      "text": "Solo en zonas autorizadas y si las condiciones meteorológicas lo permiten",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Es la opción más segura y alineada con prevención y control de igniciones.",
      "shortFeedback": "Es la opción más segura y alineada con prevención y control de igniciones.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 5
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -2
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
