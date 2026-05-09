import type { Scenario } from '../../../domain/types/scenario.js';

export const pcs013CentroMayoresRiesgo: Scenario = {
  "id": "s-013-centro-mayores-riesgo",
  "title": "Centro de mayores en zona de humo denso",
  "category": "proteccion-civil",
  "phase": "crisis",
  "block": "evacuacion-y-proteccion-civil",
  "difficulty": "alta",
  "estimatedTime": "3 min",
  "tags": [
    "mayores",
    "humo",
    "evacuacion",
    "salud",
    "vulnerabilidad"
  ],
  "status": "available",
  "context": "Un centro de mayores queda bajo una nube de humo y se complica la evacuación inmediata.",
  "question": "¿Qué prioridad das al traslado y al confinamiento temporal?",
  "briefing": "El centro tiene personas con movilidad reducida y dependencia respiratoria. Las ambulancias disponibles son limitadas y el humo reduce la visibilidad en el acceso más cercano.",
  "requirements": null,
  "options": [],
  "unlocks": [],
  "sourceNotes": []
};
