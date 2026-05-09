import type { Scenario } from '../../../domain/types/scenario.js';

export const os014FincaGanaderaAtrapada: Scenario = {
  "id": "s-014-finca-ganadera-atrapada",
  "title": "Finca ganadera atrapada por el avance del fuego",
  "category": "operaciones",
  "phase": "crisis",
  "block": "evacuacion-y-proteccion-civil",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "ganaderia",
    "evacuacion",
    "proteccion-civil",
    "zona-rural",
    "animales",
    "accesos",
    "riesgo"
  ],
  "status": "available",
  "context": "Una finca ganadera queda en una zona amenazada por el avance del fuego. Los accesos son complicados y varios ganaderos piden entrar para sacar a los animales.",
  "question": "¿Cómo gestionas la situación de una finca ganadera atrapada por el incendio?",
  "briefing": "El avance del fuego amenaza una finca con ganado en su interior. Los caminos de acceso son estrechos y están expuestos al humo, a la caída de material vegetal y a posibles cambios bruscos del viento. Varios ganaderos solicitan permiso para entrar por su cuenta y evacuar a los animales. Los equipos de emergencia advierten de que la intervención puede ser peligrosa si no se coordina bien. Debes tomar una decisión que proteja a las personas, tenga en cuenta el bienestar animal y evite que una acción improvisada genere nuevos rescates.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Priorizar la seguridad de las personas, ordenar la evacuación de los vecinos y trabajadores expuestos, y coordinar con los servicios de emergencia una valoración rápida para rescatar o proteger al ganado solo si las condiciones lo permiten.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. En una emergencia, la vida humana es la prioridad. El ganado puede requerir apoyo específico, pero no debe ponerse en riesgo a personas sin una ruta ni una intervención segura.",
      "shortFeedback": "Respuesta adecuada. En una emergencia, la vida humana es la prioridad. El ganado puede requerir apoyo específico, pero no debe ponerse en riesgo a personas sin una ruta ni una intervención segura.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Permitir que los ganaderos entren por su cuenta a la finca para sacar a los animales antes de que llegue el fuego.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Aunque la intención sea comprensible, dejar que personas entren sin control en una zona amenazada puede generar atrapamientos y obligar a desviar recursos para rescatarlas.",
      "shortFeedback": "Respuesta incorrecta. Aunque la intención sea comprensible, dejar que personas entren sin control en una zona amenazada puede generar atrapamientos y obligar a desviar recursos para rescatarlas.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Activar un dispositivo coordinado con Protección Civil, agentes de medio ambiente y responsables ganaderos para identificar accesos seguros, posibles zonas de resguardo animal y necesidades urgentes de traslado.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. La respuesta debe ser coordinada y realista: evaluar accesos, tiempos, medios disponibles y zonas seguras antes de mover animales o personas.",
      "shortFeedback": "Respuesta adecuada. La respuesta debe ser coordinada y realista: evaluar accesos, tiempos, medios disponibles y zonas seguras antes de mover animales o personas.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Ordenar que todos los recursos disponibles se destinen al rescate del ganado, aunque eso retrase la evacuación de la población cercana.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. El ganado importa, y mucho, pero no puede desplazar la protección de las personas. Cambiar la prioridad puede agravar la emergencia y dejar a vecinos en riesgo.",
      "shortFeedback": "Respuesta incorrecta. El ganado importa, y mucho, pero no puede desplazar la protección de las personas. Cambiar la prioridad puede agravar la emergencia y dejar a vecinos en riesgo.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Ignorar la situación de la finca porque los animales no forman parte de la emergencia principal.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La ganadería sí forma parte del impacto del incendio: puede afectar a medios de vida, generar presión social y provocar decisiones peligrosas si no se gestiona. No atenderlo es dejar una mecha encendida, literalmente y en sentido figurado.",
      "shortFeedback": "Respuesta incorrecta. La ganadería sí forma parte del impacto del incendio: puede afectar a medios de vida, generar presión social y provocar decisiones peligrosas si no se gestiona. No atenderlo es dejar una mecha encendida, literalmente y en sentido figurado.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La seguridad de las personas debe ser prioritaria en cualquier operación de evacuación o rescate.",
    "La gestión de explotaciones ganaderas en incendios requiere coordinación operativa, evaluación de accesos y comunicación clara con los propietarios."
  ]
};
