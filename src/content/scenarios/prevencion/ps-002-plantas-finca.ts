import type { Scenario } from '../../../domain/types/scenario.js';

export const ps002PlantasFinca: Scenario = {
  "id": "s-002-plantas-finca",
  "title": "Elección de vegetación tras limpiar finca",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "En una de tus visitas a un municipio, un vecino te pregunta qué plantas son más idóneas para replantar en su finca, ¿qué le aconsejas?",
  "question": "¿Qué decisión tomas?",
  "briefing": "En una de tus visitas a un municipio, un vecino te pregunta qué plantas son más idóneas para replantar en su finca, ¿qué le aconsejas?",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Bambú",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede generar continuidad vegetal y acumulación de material seco.",
      "shortFeedback": "Puede generar continuidad vegetal y acumulación de material seco.",
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
      "text": "Cactus",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Puede integrarse con menor continuidad de combustible si se diseña con distancias.",
      "shortFeedback": "Puede integrarse con menor continuidad de combustible si se diseña con distancias.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 3
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -1
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Lentiscos",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Bien gestionado y con discontinuidad vegetal, mejora el equilibrio de la finca.",
      "shortFeedback": "Bien gestionado y con discontinuidad vegetal, mejora el equilibrio de la finca.",
      "impacts": [
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
      "text": "Pitas",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Sin planificación de seguridad pueden aumentar exposición en la interfaz.",
      "shortFeedback": "Sin planificación de seguridad pueden aumentar exposición en la interfaz.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Palmeras",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede generar continuidad y acumulación de material vegetal seco.",
      "shortFeedback": "Puede generar continuidad y acumulación de material vegetal seco.",
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
      "id": "f",
      "text": "Buganvillas",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Si se colocan de forma densa y sin separación, aumentan el riesgo en perímetros.",
      "shortFeedback": "Si se colocan de forma densa y sin separación, aumentan el riesgo en perímetros.",
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
      "id": "g",
      "text": "Helecho",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "En condiciones secas puede comportarse como combustible fino y favorecer propagación.",
      "shortFeedback": "En condiciones secas puede comportarse como combustible fino y favorecer propagación.",
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
      "id": "h",
      "text": "Hibisco",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Requiere diseño preventivo específico; en masa y sin distancias puede elevar exposición.",
      "shortFeedback": "Requiere diseño preventivo específico; en masa y sin distancias puede elevar exposición.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 2
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
