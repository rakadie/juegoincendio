import type { Scenario } from '../../../domain/types/scenario.js';

export const ps000cContextoPrevencionOtono: Scenario = {
  "id": "s-000c-contexto-prevencion-otono",
  "title": "Contexto inicial de prevención",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "Los inviernos están siendo secos. Ya no son lo que eran. Los montes y zonas rurales han perdido el verdor de otras épocas por la falta de lluvias. Esto significa que aumenta el riesgo de un gran incendio. Tus Servicios de Emergencias están preparados para actuar, y lo hacen cada vez mejor. Están evitando muchas catástrofes, pero cuando las hay, sin unos terrenos en buen estado, se desencadena una tragedia. Este otoño, decides comenzar tu plan de prevención. Por tu experiencia, debes preparar un plan de acción. Recuerda que no siempre hay una sola respuesta correcta.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Los inviernos están siendo secos. Ya no son lo que eran. Los montes y zonas rurales han perdido el verdor de otras épocas por la falta de lluvias. Esto significa que aumenta el riesgo de un gran incendio. Tus Servicios de Emergencias están preparados para actuar, y lo hacen cada vez mejor. Están evitando muchas catástrofes, pero cuando las hay, sin unos terrenos en buen estado, se desencadena una tragedia. Este otoño, decides comenzar tu plan de prevención. Por tu experiencia, debes preparar un plan de acción. Recuerda que no siempre hay una sola respuesta correcta.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Continuar",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Permite avanzar al siguiente cuadro del escenario.",
      "shortFeedback": "Permite avanzar al siguiente cuadro del escenario.",
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
