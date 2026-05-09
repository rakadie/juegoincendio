import type { Scenario } from '../../../domain/types/scenario.js';

export const ps000dQuemasPrescritasOtono: Scenario = {
  "id": "s-000d-quemas-prescritas-otono",
  "title": "Planificación de quemas prescritas",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "Este otoño estás pensando en realizar algunas quemas prescritas. Sabes que hay zonas que pueden tener acumulación de combustible vegetal que alimentarán la intensidad de las llamas en caso de incendio. ¿Qué decisión tomas?",
  "question": "¿Qué decisión tomas?",
  "briefing": "Este otoño estás pensando en realizar algunas quemas prescritas. Sabes que hay zonas que pueden tener acumulación de combustible vegetal que alimentarán la intensidad de las llamas en caso de incendio. ¿Qué decisión tomas?",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Planificar algunas quemas controladas en invierno que realizará el equipo de Emergencias",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Prioriza la ventana estacional más segura y la ejecución por personal preparado, reduciendo el riesgo de escape.",
      "shortFeedback": "Prioriza la ventana estacional más segura y la ejecución por personal preparado, reduciendo el riesgo de escape.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 7
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -3
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
      "text": "Permitir solo pequeñas quemas realizadas por vecinos para limpiar sus parcelas",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Aunque sean pequeñas, sin un dispositivo técnico completo aumentan la variabilidad del riesgo y la probabilidad de incidentes.",
      "shortFeedback": "Aunque sean pequeñas, sin un dispositivo técnico completo aumentan la variabilidad del riesgo y la probabilidad de incidentes.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
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
      "text": "El año pasado ya hiciste quemas. Decides finalmente que la vegetación acumulada sirva de alimento a los animales.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "No actuar sobre el combustible acumulado puede incrementar la intensidad potencial del fuego en condiciones secas.",
      "shortFeedback": "No actuar sobre el combustible acumulado puede incrementar la intensidad potencial del fuego en condiciones secas.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -4
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Realizar quemas durante la temporada seca para eliminar rápidamente el combustible.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Es la opción de mayor exposición al riesgo: condiciones secas y mayor probabilidad de propagación rápida.",
      "shortFeedback": "Es la opción de mayor exposición al riesgo: condiciones secas y mayor probabilidad de propagación rápida.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -8
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 6
        },
        {
          "variableKey": "confianzaVecinal",
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
