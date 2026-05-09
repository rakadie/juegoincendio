import type { Scenario } from '../../../domain/types/scenario.js';

export const ps014RedAguaRural: Scenario = {
  "id": "s-014-red-agua-rural",
  "title": "Puntos de agua rurales",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "Tras campaña de evaluación, se detectan carencias de hidrantes y balsas para primera intervención.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Tras campaña de evaluación, se detectan carencias de hidrantes y balsas para primera intervención.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Plan municipal para señalizar y mantener puntos de agua estratégicos",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Refuerza respuesta temprana y logística en zonas dispersas.",
      "shortFeedback": "Refuerza respuesta temprana y logística en zonas dispersas.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": 5
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Dejar el mantenimiento para actuaciones puntuales",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Mantiene vulnerabilidad estructural del territorio.",
      "shortFeedback": "Mantiene vulnerabilidad estructural del territorio.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Crear nuevas balsas de agua y mejorar los accesos para vehículos de emergencia",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Aumenta disponibilidad hídrica y reduce tiempos de acceso en primera respuesta.",
      "shortFeedback": "Aumenta disponibilidad hídrica y reduce tiempos de acceso en primera respuesta.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": 6
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
      "id": "d",
      "text": "Llegado el momento las brigadas pueden encontrar agua en charcos o estanques cercanos",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Depender de puntos no garantizados ni preparados puede fallar en momentos críticos.",
      "shortFeedback": "Depender de puntos no garantizados ni preparados puede fallar en momentos críticos.",
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
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
  ]
};
