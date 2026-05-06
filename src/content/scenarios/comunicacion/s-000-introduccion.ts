import type { Scenario } from '../../../domain/types/scenario.js';

export const s000Introduccion: Scenario = {
  "id": "s-000-introduccion",
  "title": "Introducción: Apaga las llamas",
  "category": "comunicacion",
  "phase": "alerta",
  "block": "comunicacion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "comunicacion"
  ],
  "status": "available",
  "context": "Los medios de extinción son cada vez más efectivos. Son capaces de frenar los conatos que se declaran cada año en nuestras áreas forestales. Sin embargo, cuando esto no se produce, cuando las llamas avanzan y no se frenan, el fuego se convierte en un incendio voraz. El abandono del campo, el cambio climático y la falta de prevención convierten nuestros montes en un auténtico polvorín.\n\nEste juego quiere contribuir a la concienciación y comprensión del trabajo que debe realizarse para disminuir las consecuencias de los incendios.\n\nSi quieres descubrir más, entra y ¡Apaga las llamas!",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Los medios de extinción son cada vez más efectivos. Son capaces de frenar los conatos que se declaran cada año en nuestras áreas forestales. Sin embargo, cuando esto no se produce, cuando las llamas avanzan y no se frenan, el fuego se convierte en un incendio voraz. El abandono del campo, el cambio climático y la falta de prevención convierten nuestros montes en un auténtico polvorín.\n\nEste juego quiere contribuir a la concienciación y comprensión del trabajo que debe realizarse para disminuir las consecuencias de los incendios.\n\nSi quieres descubrir más, entra y ¡Apaga las llamas!",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Entrar al simulador y comenzar",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Permite iniciar el recorrido de aprendizaje y toma de decisiones sobre prevención y respuesta.",
      "shortFeedback": "Permite iniciar el recorrido de aprendizaje y toma de decisiones sobre prevención y respuesta.",
      "impacts": [
        {
          "variableKey": "confianzaVecinal",
          "delta": 1
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
