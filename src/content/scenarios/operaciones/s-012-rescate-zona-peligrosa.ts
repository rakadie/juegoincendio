import type { Scenario } from '../../../domain/types/scenario.js';

export const s012RescateZonaPeligrosa: Scenario = {
  "id": "s-012-rescate-zona-peligrosa",
  "title": "Vecino que se niega a evacuar",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "Han continuado las evacuaciones, sin embargo, a primera hora llega una alarma al Puesto de Mando Avanzado: un vecino no ha querido abandonar su vivienda y donde se encuentra las llamas avanzan sin control. Hablas con el resto del equipo…",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Han continuado las evacuaciones, sin embargo, a primera hora llega una alarma al Puesto de Mando Avanzado: un vecino no ha querido abandonar su vivienda y donde se encuentra las llamas avanzan sin control. Hablas con el resto del equipo…",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Decidís mandar una brigada para que obligue al vecino a abandonar su vivienda, si no podría morir.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "La intención es protectora, pero una entrada forzosa en zona de llama fuera de control puede poner en grave riesgo a la brigada.",
      "shortFeedback": "La intención es protectora, pero una entrada forzosa en zona de llama fuera de control puede poner en grave riesgo a la brigada.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -7
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
      "id": "b",
      "text": "La zona es demasiado peligrosa, tomáis la decisión de no mandar ningún equipo ante el riesgo de no poder salir de la zona.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Aplica criterio de seguridad operativa cuando la extracción no es viable sin comprometer más vidas.",
      "shortFeedback": "Aplica criterio de seguridad operativa cuando la extracción no es viable sin comprometer más vidas.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": 2
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": -1
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Intentáis evacuar al vecino con un helicóptero si las condiciones lo permiten",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Es una alternativa de extracción más segura en escenarios concretos, siempre sujeta a viabilidad aérea.",
      "shortFeedback": "Es una alternativa de extracción más segura en escenarios concretos, siempre sujeta a viabilidad aérea.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -5
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -2
        },
        {
          "variableKey": "confianzaVecinal",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Le pedís al vecino que moje su casa con una manguera hasta que pase el incendio",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "No es una medida de autoprotección suficiente en un frente sin control y puede aumentar el riesgo para la persona aislada.",
      "shortFeedback": "No es una medida de autoprotección suficiente en un frente sin control y puede aumentar el riesgo para la persona aislada.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 5
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
