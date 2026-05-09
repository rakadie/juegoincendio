import type { Scenario } from '../../../domain/types/scenario.js';

export const os012FalloComunicacionesRadio: Scenario = {
  "id": "s-012-fallo-comunicaciones-radio",
  "title": "Fallo de comunicaciones por radio",
  "category": "operaciones",
  "phase": "crisis",
  "block": "coordinacion-operativa",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "comunicaciones",
    "radio",
    "coordinacion",
    "puesto-mando",
    "brigadas",
    "evacuacion",
    "emergencia"
  ],
  "status": "available",
  "context": "Durante la fase crítica del incendio, varias unidades desplegadas sobre el terreno informan de fallos intermitentes en las comunicaciones por radio.",
  "question": "¿Cómo gestionas el fallo de comunicaciones por radio durante la emergencia?",
  "briefing": "El incendio avanza por varios frentes y la situación exige coordinación constante entre el puesto de mando avanzado, las brigadas, los cuerpos de seguridad y los equipos de evacuación. Sin embargo, las comunicaciones por radio empiezan a fallar en algunas zonas. Hay mensajes entrecortados, unidades que no confirman recepción y dudas sobre la ubicación exacta de varios equipos. Si el problema no se gestiona rápido, pueden producirse órdenes contradictorias, duplicidad de esfuerzos, retrasos en evacuaciones y riesgo para los equipos que trabajan cerca del fuego. La prioridad es mantener la cadena de mando, asegurar canales alternativos y confirmar que las unidades críticas reciben instrucciones claras.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Activar un protocolo de comunicaciones alternativas, establecer canales secundarios o enlaces por telefonía/satélite si están disponibles, y priorizar los mensajes críticos: ubicación de equipos, cambios de viento, evacuaciones y órdenes de repliegue.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Ante un fallo de radio, no basta con “seguir intentando”. Hay que ordenar la comunicación, priorizar lo urgente y usar canales alternativos sin romper la cadena de mando.",
      "shortFeedback": "Respuesta adecuada. Ante un fallo de radio, no basta con “seguir intentando”. Hay que ordenar la comunicación, priorizar lo urgente y usar canales alternativos sin romper la cadena de mando.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Mantener todas las operaciones igual y esperar a que la señal se recupere por sí sola.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. En una emergencia dinámica, esperar sin adaptar la coordinación puede dejar a equipos sin instrucciones, duplicar esfuerzos o retrasar decisiones críticas.",
      "shortFeedback": "Respuesta incorrecta. En una emergencia dinámica, esperar sin adaptar la coordinación puede dejar a equipos sin instrucciones, duplicar esfuerzos o retrasar decisiones críticas.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Designar puntos de enlace y responsables de comunicación en zonas clave para confirmar órdenes, recopilar posiciones y trasladar información al puesto de mando de forma periódica.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Los enlaces ayudan a reconstruir la coordinación cuando la radio falla. Ponen orden donde el ruido empieza a mandar más que la emergencia, que ya es decir.",
      "shortFeedback": "Respuesta adecuada. Los enlaces ayudan a reconstruir la coordinación cuando la radio falla. Ponen orden donde el ruido empieza a mandar más que la emergencia, que ya es decir.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Permitir que cada unidad tome decisiones de forma autónoma hasta que vuelvan las comunicaciones.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La autonomía total puede romper la estrategia común y provocar decisiones incompatibles entre sí. En un incendio con varios frentes, la improvisación se contagia más rápido que un mal audio de WhatsApp.",
      "shortFeedback": "Respuesta incorrecta. La autonomía total puede romper la estrategia común y provocar decisiones incompatibles entre sí. En un incendio con varios frentes, la improvisación se contagia más rápido que un mal audio de WhatsApp.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Saturar todos los canales disponibles repitiendo continuamente los mismos mensajes para asegurarse de que alguien los escuche.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Saturar los canales puede impedir que entren mensajes realmente urgentes. En crisis, comunicar más no siempre es comunicar mejor: a veces es atascar la autopista con sirenas.",
      "shortFeedback": "Respuesta incorrecta. Saturar los canales puede impedir que entren mensajes realmente urgentes. En crisis, comunicar más no siempre es comunicar mejor: a veces es atascar la autopista con sirenas.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Ante fallos de comunicación en una emergencia, la prioridad es mantener la cadena de mando y asegurar canales alternativos.",
    "La comunicación operativa debe priorizar mensajes críticos, evitar saturación y confirmar recepción de órdenes esenciales."
  ]
};
