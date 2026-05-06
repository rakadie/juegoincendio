import type { Scenario } from '../../../domain/types/scenario.js';

export const s005RecoleccionMonte: Scenario = {
  "id": "s-005-recoleccion-monte",
  "title": "Recogida de pinocha, leña, caña y forraje",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "Te llega otra consulta sobre la recolección de material vegetal y aprovechamientos. Se dice por ahí que no es posible cogerla.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Te llega otra consulta sobre la recolección de material vegetal y aprovechamientos. Se dice por ahí que no es posible cogerla.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Pueden recoger pinocha en cualquier lugar para limpiar el monte",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Recoger sin autorización y sin zonificación puede generar riesgo y conflictos normativos.",
      "shortFeedback": "Recoger sin autorización y sin zonificación puede generar riesgo y conflictos normativos.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -5
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Pueden recoger pinocha en los márgenes de las carreteras",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Los márgenes viarios tienen condicionantes de seguridad y titularidad que requieren permiso.",
      "shortFeedback": "Los márgenes viarios tienen condicionantes de seguridad y titularidad que requieren permiso.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Puede coger leña en cualquier lugar, así evitan que haya material combustible",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "La retirada indiscriminada no sustituye la gestión autorizada y puede afectar al ecosistema.",
      "shortFeedback": "La retirada indiscriminada no sustituye la gestión autorizada y puede afectar al ecosistema.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -4
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
      "id": "d",
      "text": "Puede recoger leña con autorización",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "La autorización permite control técnico, trazabilidad y condiciones de seguridad.",
      "shortFeedback": "La autorización permite control técnico, trazabilidad y condiciones de seguridad.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 6
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
      "id": "e",
      "text": "Puede recoger caña en cualquier lugar para evitar la propagación de las llamas",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Aunque la caña influye en la continuidad del combustible, su retirada exige criterios y autorización.",
      "shortFeedback": "Aunque la caña influye en la continuidad del combustible, su retirada exige criterios y autorización.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "f",
      "text": "Puede recoger caña en los cauces de barranco",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Los cauces tienen regulación específica y riesgo hidrológico, por lo que no procede sin permiso.",
      "shortFeedback": "Los cauces tienen regulación específica y riesgo hidrológico, por lo que no procede sin permiso.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -5
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 1
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "g",
      "text": "Puede recoger forraje en cualquier sitio, así ayuda a la limpieza de los terrenos",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "La recogida sin autorización puede incumplir normativa de uso y conservación.",
      "shortFeedback": "La recogida sin autorización puede incumplir normativa de uso y conservación.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "h",
      "text": "Pueden recoger forraje con autorización",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "La autorización ordena el aprovechamiento y mejora la seguridad en labores de recolección.",
      "shortFeedback": "La autorización ordena el aprovechamiento y mejora la seguridad en labores de recolección.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 6
        },
        {
          "variableKey": "continuidadSectorPrimario",
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
