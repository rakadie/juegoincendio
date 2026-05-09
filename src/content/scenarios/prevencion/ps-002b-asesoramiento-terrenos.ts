import type { Scenario } from '../../../domain/types/scenario.js';

export const ps002bAsesoramientoTerrenos: Scenario = {
  "id": "s-002b-asesoramiento-terrenos",
  "title": "Asesoramiento sobre terrenos colindantes",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "En la finca de al lado te encuentras a otro vecino. Tiene varios terrenos y no sabe qué hacer con ellos. ¿Qué le aconsejas?",
  "question": "¿Qué decisión tomas?",
  "briefing": "En la finca de al lado te encuentras a otro vecino. Tiene varios terrenos y no sabe qué hacer con ellos. ¿Qué le aconsejas?",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Que plante la vegetación que le guste alrededor de las zonas urbanas",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Plantar sin diseño preventivo en interfaz urbano-forestal puede aumentar la continuidad del combustible.",
      "shortFeedback": "Plantar sin diseño preventivo en interfaz urbano-forestal puede aumentar la continuidad del combustible.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Que hable con los ganaderos del municipio para que sus animales limpien el terreno de malas hierbas cuando lo necesite",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "El pastoreo controlado ayuda a reducir la carga de combustible y mejora el mantenimiento periódico.",
      "shortFeedback": "El pastoreo controlado ayuda a reducir la carga de combustible y mejora el mantenimiento periódico.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 5
        },
        {
          "variableKey": "continuidadSectorPrimario",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Que si no quiere plantar, que deje crecer las plantas para que el terreno esté bonito",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "El crecimiento sin gestión preventiva puede elevar el riesgo de propagación del incendio.",
      "shortFeedback": "El crecimiento sin gestión preventiva puede elevar el riesgo de propagación del incendio.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -4
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 5
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Que arriende los terrenos para uso agrícola",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Un uso agrícola planificado evita el abandono del terreno y favorece su gestión continuada.",
      "shortFeedback": "Un uso agrícola planificado evita el abandono del terreno y favorece su gestión continuada.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 4
        },
        {
          "variableKey": "continuidadSectorPrimario",
          "delta": 4
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
