import type { Scenario } from '../../../domain/types/scenario.js';

export const s010bDefensaNucleoViviendas: Scenario = {
  "id": "s-010b-defensa-nucleo-viviendas",
  "title": "Defensa del núcleo de viviendas con incendio fuera de control",
  "category": "operaciones",
  "phase": "crisis",
  "block": "operaciones",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "operaciones"
  ],
  "status": "available",
  "context": "El incendio sigue avanzando sin control. Las llamas superan los dos metros y medio. Vas a mandar a los bomberos al núcleo de viviendas…",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "El incendio sigue avanzando sin control. Las llamas superan los dos metros y medio. Vas a mandar a los bomberos al núcleo de viviendas…",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Refuerzas la defensa con maquinaria pesada para abrir líneas cortafuegos alrededor del barrio",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Prioriza la defensa de la interfaz urbana con una estrategia de contención más robusta.",
      "shortFeedback": "Prioriza la defensa de la interfaz urbana con una estrategia de contención más robusta.",
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
      "id": "b",
      "text": "Van a hacer una defensa activa del barrio para que no se quemen las viviendas",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede ayudar, pero sin reforzar la contención perimetral puede ser insuficiente ante un frente tan intenso.",
      "shortFeedback": "Puede ayudar, pero sin reforzar la contención perimetral puede ser insuficiente ante un frente tan intenso.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -1
        },
        {
          "variableKey": "capacidadOperativa",
          "delta": -5
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Les pides que dejen pasar el frente de llamas y luego que entren para apagar lo que quede activo, para minimizar daños",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Reduce exposición directa inicial, pero puede permitir más afección en viviendas antes del control.",
      "shortFeedback": "Reduce exposición directa inicial, pero puede permitir más afección en viviendas antes del control.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": 1
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 4
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
      "text": "Intentas apagar las llamas con camiones cisterna de agua del ayuntamiento",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Como estrategia principal frente a llama muy intensa suele ser insuficiente y poco segura.",
      "shortFeedback": "Como estrategia principal frente a llama muy intensa suele ser insuficiente y poco segura.",
      "impacts": [
        {
          "variableKey": "capacidadOperativa",
          "delta": -2
        },
        {
          "variableKey": "danosPotencialesVivienda",
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
