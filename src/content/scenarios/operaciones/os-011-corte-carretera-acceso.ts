import type { Scenario } from '../../../domain/types/scenario.js';

export const os011CorteCarreteraAcceso: Scenario = {
  "id": "s-011-corte-carretera-acceso",
  "title": "Corte de carretera de acceso",
  "category": "operaciones",
  "phase": "crisis",
  "block": "evacuacion-y-proteccion-civil",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "carretera",
    "accesos",
    "evacuacion",
    "proteccion-civil",
    "trafico",
    "humo",
    "rutas-alternativas"
  ],
  "status": "available",
  "context": "Una carretera secundaria que servía como vía principal de acceso a la zona afectada queda cortada por humo denso, caída de ramas y avance del fuego en los márgenes.",
  "question": "¿Cómo gestionas el corte de la carretera de acceso?",
  "briefing": "La situación se acelera. La carretera que hasta ahora permitía el acceso de medios terrestres y la salida controlada de vecinos deja de ser segura. El humo reduce la visibilidad, el viento empuja el fuego hacia los márgenes de la vía y hay riesgo de que algunos vehículos queden atrapados si intentan pasar por su cuenta. Los equipos sobre el terreno solicitan una decisión rápida: mantener el corte, buscar una ruta alternativa o intentar abrir paso de forma controlada. La prioridad es evitar atrapamientos, garantizar la seguridad de los equipos y dar instrucciones claras a la población afectada.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Mantener el corte de la carretera, señalizarlo con apoyo de seguridad, informar a la población de que no intente pasar y coordinar de inmediato rutas alternativas verificadas para equipos y vecinos.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Si la vía no es segura, mantener el corte evita atrapamientos. La clave no es solo cerrar: es explicar, señalizar y activar alternativas reales.",
      "shortFeedback": "Respuesta adecuada. Si la vía no es segura, mantener el corte evita atrapamientos. La clave no es solo cerrar: es explicar, señalizar y activar alternativas reales.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Permitir el paso de vecinos durante unos minutos para que puedan salir antes de que el fuego avance más.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Abrir una vía insegura “solo un momento” puede acabar en vehículos atrapados, humo, pánico y una emergencia dentro de la emergencia. El incendio no respeta turnos de cortesía.",
      "shortFeedback": "Respuesta incorrecta. Abrir una vía insegura “solo un momento” puede acabar en vehículos atrapados, humo, pánico y una emergencia dentro de la emergencia. El incendio no respeta turnos de cortesía.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Enviar una unidad de reconocimiento para evaluar rutas secundarias, confirmar su estado antes de usarlas y comunicar al puesto de mando qué accesos son seguros, cuáles quedan descartados y dónde se necesita control de tráfico.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Las rutas alternativas no se improvisan sobre un mapa bonito. Hay que verificarlas sobre el terreno antes de mover población o medios.",
      "shortFeedback": "Respuesta adecuada. Las rutas alternativas no se improvisan sobre un mapa bonito. Hay que verificarlas sobre el terreno antes de mover población o medios.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Desviar a todos los vehículos por cualquier camino rural disponible para descongestionar la carretera cortada.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Un camino rural no comprobado puede ser estrecho, sin salida, estar afectado por humo o no permitir el paso de vehículos de emergencia. Eso no es una alternativa: es una trampa con polvo.",
      "shortFeedback": "Respuesta incorrecta. Un camino rural no comprobado puede ser estrecho, sin salida, estar afectado por humo o no permitir el paso de vehículos de emergencia. Eso no es una alternativa: es una trampa con polvo.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Retirar a los agentes del corte para reforzar otras zonas y dejar que cada conductor decida si puede pasar o no.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Sin control, una carretera cortada se convierte en una invitación al caos. En una emergencia, la señal más peligrosa es la ausencia de señal.",
      "shortFeedback": "Respuesta incorrecta. Sin control, una carretera cortada se convierte en una invitación al caos. En una emergencia, la señal más peligrosa es la ausencia de señal.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "El corte de una vía insegura debe ir acompañado de señalización, control de tráfico e información clara a la población.",
    "Las rutas alternativas deben verificarse antes de utilizarlas para evacuación o entrada de medios de emergencia."
  ]
};
