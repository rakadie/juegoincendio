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
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Eres la persona responsable del Servicio de Emergencias. Ponte cara.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Imagen masculina (avatar bombero)",
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
      "text": "Imagen femenina (avatar bombera)",
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
      "text": "Imagen neutra (avatar neutro)",
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
