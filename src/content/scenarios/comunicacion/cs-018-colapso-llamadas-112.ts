import type { Scenario } from '../../../domain/types/scenario.js';

export const cs018ColapsoLlamadas112: Scenario = {
  "id": "s-018-colapso-llamadas-112",
  "title": "Colapso de llamadas al 112",
  "category": "comunicacion",
  "phase": "crisis",
  "block": "comunicacion-crisis",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "112",
    "comunicacion",
    "crisis",
    "rumores",
    "informacion-publica",
    "ruedas-prensa",
    "medios-comunicacion"
  ],
  "status": "available",
  "context": "El incendio evoluciona rápido y el humo ya es visible desde varios municipios. En pocos minutos, el 112 empieza a recibir una avalancha de llamadas.",
  "question": "¿Cómo comunicas a la población para reducir la saturación del 112 sin dejar a nadie desinformado?",
  "briefing": "La emergencia entra en una fase de alta presión informativa. La ciudadanía necesita saber qué ocurre, qué zonas están afectadas, qué debe hacer y dónde consultar información fiable. El problema es que el 112 empieza a saturarse con llamadas que no siempre son emergencias: dudas generales, rumores, mensajes reenviados y peticiones de información que podrían resolverse por otros canales. Si no se actúa rápido, las llamadas críticas pueden quedar bloqueadas. Pero si se comunica mal, la población puede interpretar que se le está pidiendo “no molestar” justo cuando tiene miedo. La prioridad es separar la información general de la emergencia real: mantener el 112 para situaciones urgentes, abrir canales claros de información pública, actualizar con frecuencia y explicar qué debe hacer la población según su zona.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Emitir mensajes oficiales frecuentes, breves y claros, indicando qué zonas están afectadas, qué zonas no tienen orden de evacuación, dónde consultar actualizaciones y recordando que el 112 debe reservarse para emergencias reales.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Informar bien reduce llamadas innecesarias y evita que el miedo colapse el canal de emergencias. La claridad también es una herramienta de protección civil.",
      "shortFeedback": "Respuesta adecuada. Informar bien reduce llamadas innecesarias y evita que el miedo colapse el canal de emergencias. La claridad también es una herramienta de protección civil.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Pedir públicamente que nadie llame al 112 salvo que vea llamas cerca de su casa.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. El mensaje es demasiado restrictivo y puede hacer que personas en riesgo no pidan ayuda. Hay emergencias sin llamas visibles: humo intenso, personas dependientes, atrapamientos o problemas sanitarios.",
      "shortFeedback": "Respuesta incorrecta. El mensaje es demasiado restrictivo y puede hacer que personas en riesgo no pidan ayuda. Hay emergencias sin llamas visibles: humo intenso, personas dependientes, atrapamientos o problemas sanitarios.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Organizar ruedas de prensa periódicas y habilitar canales específicos para información no urgente, como web oficial, redes institucionales, medios de comunicación, ayuntamientos y líneas informativas si están disponibles, dejando claro cuándo sí debe llamarse al 112.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Las ruedas de prensa periódicas transmiten control, reducen rumores y permiten ordenar la información. Si además ofreces canales alternativos, la población sabe dónde informarse sin saturar el teléfono de emergencias.",
      "shortFeedback": "Respuesta adecuada. Las ruedas de prensa periódicas transmiten control, reducen rumores y permiten ordenar la información. Si además ofreces canales alternativos, la población sabe dónde informarse sin saturar el teléfono de emergencias.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Esperar a tener todos los datos confirmados antes de comunicar, para evitar errores.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. En una crisis, el silencio se llena rápido con rumores. Es mejor comunicar lo confirmado, reconocer lo que se está verificando y actualizar con transparencia.",
      "shortFeedback": "Respuesta incorrecta. En una crisis, el silencio se llena rápido con rumores. Es mejor comunicar lo confirmado, reconocer lo que se está verificando y actualizar con transparencia.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Publicar un mensaje técnico con muchos detalles operativos para demostrar que la situación está bajo control.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. En plena emergencia, la población necesita instrucciones comprensibles, no una tesis con humo. El exceso de tecnicismos puede confundir y aumentar las llamadas.",
      "shortFeedback": "Respuesta incorrecta. En plena emergencia, la población necesita instrucciones comprensibles, no una tesis con humo. El exceso de tecnicismos puede confundir y aumentar las llamadas.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "En una crisis, la comunicación pública debe reducir la incertidumbre, combatir rumores y orientar a la población hacia canales oficiales.",
    "El 112 debe reservarse para emergencias reales; la información general debe canalizarse por vías alternativas claras, actualizadas y accesibles."
  ]
};
