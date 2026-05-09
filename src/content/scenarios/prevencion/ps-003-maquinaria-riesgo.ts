import type { Scenario } from '../../../domain/types/scenario.js';

export const ps003MaquinariaRiesgo: Scenario = {
  "id": "s-003-maquinaria-riesgo",
  "title": "Uso de maquinaria en horas de riesgo",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "Un vecino quiere usar maquinaria en su terreno en cualquier momento que lo necesite, aunque haga calor intenso. Dice que él siempre tiene cuidado. ¿Qué le indicas?",
  "question": "¿Qué decisión tomas?",
  "briefing": "Un vecino quiere usar maquinaria en su terreno en cualquier momento que lo necesite, aunque haga calor intenso. Dice que él siempre tiene cuidado. ¿Qué le indicas?",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Puede cortar con una radial en el jardín",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Actividad de alto riesgo por posibles chispas.",
      "shortFeedback": "Actividad de alto riesgo por posibles chispas.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 6
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Puede cortar con una radial en un patio",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Sigue siendo de riesgo si no hay medidas estrictas.",
      "shortFeedback": "Sigue siendo de riesgo si no hay medidas estrictas.",
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
      "id": "c",
      "text": "Puede desbrozar lo que quiera.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Sin medidas adicionales, puede provocar igniciones por contacto con material seco.",
      "shortFeedback": "Sin medidas adicionales, puede provocar igniciones por contacto con material seco.",
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
      "text": "Puede desbrozar con una manguera al lado",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Reduce riesgo al añadir medios inmediatos de primera respuesta.",
      "shortFeedback": "Reduce riesgo al añadir medios inmediatos de primera respuesta.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 5
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
