import type { Scenario } from '../../../domain/types/scenario.js';

export const ps004QuemasAgricolas: Scenario = {
  "id": "s-004-quemas-agricolas",
  "title": "Gestión de quemas agrícolas",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion"
  ],
  "status": "available",
  "context": "En tu visita al municipio un vecino te pregunta cómo gestionar una quema agrícola de forma legal y segura. ¿Qué consejo le darías?",
  "question": "¿Qué decisión tomas?",
  "briefing": "En tu visita al municipio un vecino te pregunta cómo gestionar una quema agrícola de forma legal y segura. ¿Qué consejo le darías?",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Solicitar autorización y confirmar que no existe prohibición activa por riesgo meteorológico",
      "evaluation": "acceptable",
      "severity": "medium",
      "rationale": "Es un paso v?lido y necesario, aunque debe completarse con medidas operativas antes de encender la quema.",
      "shortFeedback": "Es un paso v?lido y necesario, aunque debe completarse con medidas operativas antes de encender la quema.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Realizarla solo en horario autorizado, con perímetro limpio y medios de extinción preparados",
      "evaluation": "acceptable",
      "severity": "medium",
      "rationale": "Es una opci?n v?lida como parte del protocolo, pero necesita vigilancia hasta la extinci?n total y suspensi?n si cambian las condiciones.",
      "shortFeedback": "Es una opci?n v?lida como parte del protocolo, pero necesita vigilancia hasta la extinci?n total y suspensi?n si cambian las condiciones.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 3
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
      "id": "c",
      "text": "Comunicar inicio y fin a la autoridad competente cuando proceda y mantener vigilancia hasta extinción total",
      "evaluation": "acceptable",
      "severity": "medium",
      "rationale": "Aporta trazabilidad y seguridad. Es v?lida, aunque debe ir acompa?ada de autorizaci?n, revisi?n meteorol?gica y preparaci?n del per?metro.",
      "shortFeedback": "Aporta trazabilidad y seguridad. Es v?lida, aunque debe ir acompa?ada de autorizaci?n, revisi?n meteorol?gica y preparaci?n del per?metro.",
      "impacts": [
        {
          "variableKey": "confianzaVecinal",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Aplicar protocolo completo: autorización previa, revisión meteorológica, horario permitido, perímetro limpio, medios de extinción, vigilancia continua y suspensión inmediata si cambian las condiciones",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Integra requisitos administrativos y operativos para minimizar ignición y propagación.",
      "shortFeedback": "Integra requisitos administrativos y operativos para minimizar ignición y propagación.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 8
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
      "id": "e",
      "text": "Hacerla al atardecer, aunque no tengas autorización, si el terreno está húmedo",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Aunque haya humedad puntual, incumple normativa y mantiene riesgo de escape.",
      "shortFeedback": "Aunque haya humedad puntual, incumple normativa y mantiene riesgo de escape.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -7
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "f",
      "text": "Quemar restos en cualquier época si hay una manguera cerca",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Normaliza prácticas inseguras y fuera de protocolo.",
      "shortFeedback": "Normaliza prácticas inseguras y fuera de protocolo.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": -8
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
