import type { Scenario } from '../../../domain/types/scenario.js';

export const cs000bAvatarEmergencias: Scenario = {
  "id": "s-000b-avatar-emergencias",
  "title": "Avatar de responsable de emergencias",
  "category": "comunicacion",
  "phase": "alerta",
  "block": "comunicacion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "comunicacion"
  ],
  "status": "available",
  "context": "Eres la persona responsable del Servicio de Emergencias. Ponte cara.",
  "question": "",
  "briefing": "Eres la persona responsable del Servicio de Emergencias. Ponte cara.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Bombero forestal",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Personaliza tu perfil para iniciar la experiencia de juego.",
      "shortFeedback": "Personaliza tu perfil para iniciar la experiencia de juego.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Bombera forestal",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Personaliza tu perfil para iniciar la experiencia de juego.",
      "shortFeedback": "Personaliza tu perfil para iniciar la experiencia de juego.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Perfil forestal neutro",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Personaliza tu perfil para iniciar la experiencia de juego.",
      "shortFeedback": "Personaliza tu perfil para iniciar la experiencia de juego.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
  ]
};
