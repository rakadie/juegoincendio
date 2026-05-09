import type { Scenario } from '../../../domain/types/scenario.js';

export const os019ApagonPlenaEmergencia: Scenario = {
  "id": "s-019-apagon-plena-emergencia",
  "title": "Apagón en plena emergencia",
  "category": "operaciones",
  "phase": "crisis",
  "block": "infraestructuras-criticas",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "apagon",
    "linea-electrica",
    "infraestructuras-criticas",
    "comunicaciones",
    "agua",
    "personas-vulnerables",
    "generadores",
    "evacuacion-parcial"
  ],
  "status": "available",
  "context": "El avance del fuego afecta una línea eléctrica y deja sin suministro a un núcleo poblado cercano a la zona de riesgo.",
  "question": "¿Cómo gestionas el apagón en un núcleo afectado por la emergencia?",
  "briefing": "El incendio ha dañado una línea eléctrica y el núcleo queda sin luz en plena evolución de la emergencia. La situación genera varios problemas a la vez: las comunicaciones móviles son inestables, algunas viviendas pierden acceso al agua porque dependen de bombas eléctricas y parte de la población tiene dificultades para recibir instrucciones oficiales. Además, el ayuntamiento informa de que hay personas mayores, vecinos con movilidad reducida y familias que no saben si deben quedarse, prepararse para evacuar o acudir a otro punto. Tenemos que decidir cómo actuar: garantizar información directa, proteger a las personas vulnerables, asegurar recursos básicos y valorar si conviene activar generadores, puntos de apoyo o una evacuación parcial antes de que el apagón complique todavía más la respuesta.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Activar equipos municipales y de Protección Civil para hacer información puerta a puerta en las zonas más vulnerables, identificar personas mayores o dependientes y comprobar quién necesita apoyo inmediato.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Si falla la luz y la telefonía es inestable, no basta con publicar avisos. Hay que llevar la información hasta la población que puede quedarse fuera del radar.",
      "shortFeedback": "Respuesta adecuada. Si falla la luz y la telefonía es inestable, no basta con publicar avisos. Hay que llevar la información hasta la población que puede quedarse fuera del radar.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Esperar a que la compañía eléctrica restablezca el suministro antes de tomar nuevas decisiones operativas.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. El apagón afecta a la seguridad, la comunicación y el acceso a recursos básicos. Esperar sin medidas de apoyo puede dejar aisladas a personas vulnerables.",
      "shortFeedback": "Respuesta incorrecta. El apagón afecta a la seguridad, la comunicación y el acceso a recursos básicos. Esperar sin medidas de apoyo puede dejar aisladas a personas vulnerables.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Priorizar generadores y recursos de apoyo para puntos críticos, como centro social, consultorio, sistemas de bombeo de agua o zonas de acogida, mientras se prepara una posible evacuación parcial si el riesgo aumenta.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Los generadores deben asignarse donde sostienen funciones esenciales. No se trata de iluminar el pueblo como en fiestas, sino de mantener servicios vitales.",
      "shortFeedback": "Respuesta adecuada. Los generadores deben asignarse donde sostienen funciones esenciales. No se trata de iluminar el pueblo como en fiestas, sino de mantener servicios vitales.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Pedir a la población que acuda por su cuenta al punto más cercano con luz para informarse y cargar teléfonos.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Puede generar desplazamientos innecesarios, saturar vías y reunir a personas en lugares que quizá no son seguros. En una emergencia, “vayan donde haya enchufe” no es un plan; es una romería eléctrica.",
      "shortFeedback": "Respuesta incorrecta. Puede generar desplazamientos innecesarios, saturar vías y reunir a personas en lugares que quizá no son seguros. En una emergencia, “vayan donde haya enchufe” no es un plan; es una romería eléctrica.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Centrar todos los recursos en reparar la línea eléctrica, aunque eso retrase la atención a vecinos vulnerables y la gestión del agua.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Recuperar la electricidad es importante, pero no puede desplazar la protección inmediata de la población. La emergencia no espera a que vuelva el fluorescente.",
      "shortFeedback": "Respuesta incorrecta. Recuperar la electricidad es importante, pero no puede desplazar la protección inmediata de la población. La emergencia no espera a que vuelva el fluorescente.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Un apagón durante una emergencia puede afectar a comunicaciones, abastecimiento de agua, atención a personas vulnerables y capacidad de recibir instrucciones oficiales.",
    "La respuesta debe combinar información directa, apoyo a puntos críticos, priorización de recursos básicos y valoración de evacuación parcial si el riesgo aumenta."
  ]
};
