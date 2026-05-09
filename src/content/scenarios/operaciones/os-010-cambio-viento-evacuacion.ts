import type { Scenario } from '../../../domain/types/scenario.js';

export const os010CambioVientoEvacuacion: Scenario = {
  "id": "s-010-cambio-viento-evacuacion",
  "title": "Cambio de viento hacia núcleo poblado",
  "category": "operaciones",
  "phase": "crisis",
  "block": "evacuacion-y-proteccion-civil",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "evacuacion",
    "proteccion-civil",
    "ganaderia",
    "viento",
    "zona-habitada"
  ],
  "status": "available",
  "context": "El frente del incendio cambia de dirección y empieza a amenazar una zona habitada.",
  "question": "¿Cómo gestionas la evacuación?",
  "briefing": "El cambio de viento obliga a tomar una decisión rápida. El frente avanza hacia un núcleo poblado donde hay viviendas, explotaciones ganaderas y carreteras secundarias con capacidad limitada. Los equipos sobre el terreno advierten de que el humo puede reducir la visibilidad en poco tiempo y que algunas rutas podrían quedar comprometidas si el fuego sigue ganando velocidad. La población empieza a recibir información fragmentada y algunos vecinos ya se plantean salir por su cuenta. Es necesario decidir si se activa una evacuación preventiva, cómo se ordena la salida y qué instrucciones se trasladan para evitar improvisaciones, colapsos o atrapamientos.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Activar una evacuación preventiva y escalonada de las viviendas más expuestas, priorizando a personas vulnerables, explotaciones con trabajadores presentes y zonas con peor acceso, siempre con rutas confirmadas y control de tráfico.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. El cambio de viento puede reducir mucho el margen de reacción. Una evacuación preventiva, ordenada y con rutas seguras evita salidas improvisadas y reduce el riesgo de atrapamientos.",
      "shortFeedback": "Respuesta adecuada. El cambio de viento puede reducir mucho el margen de reacción. Una evacuación preventiva, ordenada y con rutas seguras evita salidas improvisadas y reduce el riesgo de atrapamientos.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Esperar a que el fuego esté más cerca del núcleo poblado antes de ordenar la evacuación, para evitar alarmar a la población antes de tiempo.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Esperar demasiado puede dejar sin margen a vecinos, equipos de emergencia y personas vulnerables. En incendios con viento cambiante, la prudencia no es quedarse mirando: es anticiparse.",
      "shortFeedback": "Respuesta incorrecta. Esperar demasiado puede dejar sin margen a vecinos, equipos de emergencia y personas vulnerables. En incendios con viento cambiante, la prudencia no es quedarse mirando: es anticiparse.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Coordinar con Protección Civil, ayuntamientos y cuerpos de seguridad un mensaje único de evacuación, indicando zonas afectadas, rutas habilitadas, puntos de encuentro y qué deben llevar los vecinos.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Una evacuación no funciona solo con dar la orden. Hay que explicar quién debe salir, por dónde, hacia dónde y qué hacer para evitar confusión, colapsos y rumores.",
      "shortFeedback": "Respuesta adecuada. Una evacuación no funciona solo con dar la orden. Hay que explicar quién debe salir, por dónde, hacia dónde y qué hacer para evitar confusión, colapsos y rumores.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Permitir que cada vecino decida si evacúa o permanece en casa según vea la evolución del humo desde su vivienda.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La percepción individual puede ser engañosa. El humo, el viento y la visibilidad cambian rápido. Dejar la decisión a cada persona genera respuestas desordenadas y puede poner en riesgo al operativo.",
      "shortFeedback": "Respuesta incorrecta. La percepción individual puede ser engañosa. El humo, el viento y la visibilidad cambian rápido. Dejar la decisión a cada persona genera respuestas desordenadas y puede poner en riesgo al operativo.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Ordenar una evacuación general inmediata de toda la comarca sin confirmar rutas, recursos de transporte ni capacidad de acogida.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Una evacuación masiva sin planificación puede saturar carreteras, bloquear el acceso de emergencias y crear un problema nuevo encima del incendio. Y el incendio ya venía bastante completo.",
      "shortFeedback": "Respuesta incorrecta. Una evacuación masiva sin planificación puede saturar carreteras, bloquear el acceso de emergencias y crear un problema nuevo encima del incendio. Y el incendio ya venía bastante completo.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La evacuación preventiva debe activarse con rutas confirmadas, control de tráfico y prioridad para personas vulnerables o zonas más expuestas.",
    "La comunicación de una evacuación debe ser clara, coordinada y única para evitar rumores, salidas improvisadas y colapsos en las vías."
  ]
};
