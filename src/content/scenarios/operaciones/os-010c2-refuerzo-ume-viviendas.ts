import type { Scenario } from '../../../domain/types/scenario.js';

export const os010c2RefuerzoUmeViviendas: Scenario = {
  "id": "s-010c2-refuerzo-ume-viviendas",
  "title": "Refuerzo con UME para proteger viviendas",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "No quieres que se quemen más viviendas… Continúan los relevos de los medios terrestres. La Unidad Militar de Emergencias se ha unido a ellos.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "No quieres que se quemen más viviendas… Continúan los relevos de los medios terrestres. La Unidad Militar de Emergencias se ha unido a ellos.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Continúan los relevos de los medios terrestres. La Unidad Militar de Emergencias se ha unido a ellos",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Mantiene la presión operativa, pero puede quedarse corta si no se refuerza la protección del núcleo urbano.",
      "shortFeedback": "Mantiene la presión operativa, pero puede quedarse corta si no se refuerza la protección del núcleo urbano.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -4
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
      "id": "b",
      "text": "La Unidad Militar de Emergencias se ha unido y los medios aéreos deben continuar",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Combina continuidad aérea y refuerzo terrestre para sostener la contención en una fase crítica.",
      "shortFeedback": "Combina continuidad aérea y refuerzo terrestre para sostener la contención en una fase crítica.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -8
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -4
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
      "id": "c",
      "text": "Creas un perímetro de protección alrededor del núcleo de viviendas con maquinaria y brigadas",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Prioriza la defensa de viviendas y mejora la capacidad de frenar la llegada del frente al casco habitado.",
      "shortFeedback": "Prioriza la defensa de viviendas y mejora la capacidad de frenar la llegada del frente al casco habitado.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -5
        },
        {
          "variableKey": "capacidadOperativa",
          "delta": -6
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
      "text": "Ordenas apagar primero los jardines y piscinas de las casas para evitar que el fuego llegue",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "No centra recursos en los puntos de mayor propagación y puede resultar insuficiente como estrategia principal.",
      "shortFeedback": "No centra recursos en los puntos de mayor propagación y puede resultar insuficiente como estrategia principal.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 3
        },
        {
          "variableKey": "capacidadOperativa",
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
