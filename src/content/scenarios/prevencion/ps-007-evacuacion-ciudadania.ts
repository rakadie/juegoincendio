import type { Scenario } from '../../../domain/types/scenario.js';

export const ps007EvacuacionCiudadania: Scenario = {
  "id": "s-007-evacuacion-ciudadania",
  "title": "¿Qué hacer si se declara un incendio?",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "Durante esta visita surge otra duda. Muchos vecinos no saben qué deben hacer si se declara un incendio cerca de su municipio.",
  "question": "¿Cómo respondes ante este escenario?",
  "briefing": "Durante esta visita surge otra duda. Muchos vecinos no saben qué deben hacer si se declara un incendio cerca de su municipio.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Regar mi terreno antes de que lleguen las llamas",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Puede exponer a la persona en un momento crítico y generar una falsa sensación de control.",
      "shortFeedback": "Puede exponer a la persona en un momento crítico y generar una falsa sensación de control.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 2
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
      "id": "c",
      "text": "Salir de mi vivienda y acudir a una zona alta para saber por dónde va el fuego",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Buscar visibilidad del incendio desde zonas expuestas aumenta el riesgo personal.",
      "shortFeedback": "Buscar visibilidad del incendio desde zonas expuestas aumenta el riesgo personal.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 1
        },
        {
          "variableKey": "capacidadOperativa",
          "delta": -1
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Salir lo antes posible de mi vivienda, tal y como leo en una cadena de Wassap",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Aumenta caos y exposición por desinformación.",
      "shortFeedback": "Aumenta caos y exposición por desinformación.",
      "impacts": [
        {
          "variableKey": "confianzaVecinal",
          "delta": -6
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Esperar indicaciones de las autoridades antes de evacuar",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Evita movimientos descoordinados y mejora seguridad colectiva.",
      "shortFeedback": "Evita movimientos descoordinados y mejora seguridad colectiva.",
      "impacts": [
        {
          "variableKey": "confianzaVecinal",
          "delta": 5
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Retirar enseres que estén cerca de puertas y ventanas, y cerrar contraventanas.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Reduce la exposición de elementos vulnerables y mejora la autoprotección básica de la vivienda.",
      "shortFeedback": "Reduce la exposición de elementos vulnerables y mejora la autoprotección básica de la vivienda.",
      "impacts": [
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -3
        },
        {
          "variableKey": "cumplimientoPreventivo",
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
