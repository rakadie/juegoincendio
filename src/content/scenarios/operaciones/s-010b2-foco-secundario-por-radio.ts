import type { Scenario } from '../../../domain/types/scenario.js';

export const s010b2FocoSecundarioPorRadio: Scenario = {
  "id": "s-010b2-foco-secundario-por-radio",
  "title": "Foco secundario detectado por radio",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "El incendio principal sigue activo, pero llega una nueva información por radio: ha aparecido un foco secundario a varios kilómetros. Los técnicos advierten que, si el viento cambia, ambos frentes podrían unirse.\n\n¿Qué decisión tomas?",
  "question": "¿Qué decisión tomas?",
  "briefing": "El incendio principal sigue activo, pero llega una nueva información por radio: ha aparecido un foco secundario a varios kilómetros. Los técnicos advierten que, si el viento cambia, ambos frentes podrían unirse.\n\n¿Qué decisión tomas?",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Dividir los recursos: mantener equipos en el incendio principal y enviar una brigada rápida al foco secundario para intentar apagarlo antes de que crezca.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Permite sostener la defensa del frente principal y atacar de forma temprana el foco secundario para evitar su consolidación.",
      "shortFeedback": "Permite sostener la defensa del frente principal y atacar de forma temprana el foco secundario para evitar su consolidación.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -3
        },
        {
          "variableKey": "capacidadOperativa",
          "delta": -5
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
      "text": "Concentrar todos los medios en el incendio principal para evitar que avance hacia zonas habitadas.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede proteger el frente principal a corto plazo, pero deja el foco secundario con margen para crecer y complicar la maniobra.",
      "shortFeedback": "Puede proteger el frente principal a corto plazo, pero deja el foco secundario con margen para crecer y complicar la maniobra.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
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
      "text": "Esperar a confirmar si el foco secundario crece antes de enviar recursos.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Retrasar la intervención reduce las opciones de control temprano y aumenta el riesgo de que ambos frentes se aproximen.",
      "shortFeedback": "Retrasar la intervención reduce las opciones de control temprano y aumenta el riesgo de que ambos frentes se aproximen.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 5
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
      "text": "Priorizar la vigilancia aérea del foco secundario sin enviar equipos terrestres todavía.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Mejora la información situacional, pero sin ataque inicial el foco puede intensificarse con rapidez en condiciones adversas.",
      "shortFeedback": "Mejora la información situacional, pero sin ataque inicial el foco puede intensificarse con rapidez en condiciones adversas.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 3
        },
        {
          "variableKey": "capacidadOperativa",
          "delta": -1
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
