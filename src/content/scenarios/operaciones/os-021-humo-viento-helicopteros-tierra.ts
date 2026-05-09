import type { Scenario } from '../../../domain/types/scenario.js';

export const os021HumoVientoHelicopterosTierra: Scenario = {
  "id": "s-021-humo-viento-helicopteros-tierra",
  "title": "Humo y viento dejan en tierra a los helicópteros",
  "category": "operaciones",
  "phase": "crisis",
  "block": "coordinacion-operativa",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "medios-aereos",
    "helicopteros",
    "humo",
    "viento",
    "brigadas",
    "repliegue",
    "estrategia-terrestre"
  ],
  "status": "available",
  "context": "La baja visibilidad por humo y las rachas de viento impiden operar a los medios aéreos con seguridad.",
  "question": "¿Cómo reorganizas la estrategia cuando los medios aéreos no pueden operar?",
  "briefing": "El incendio avanza por una zona de pendiente complicada y vegetación densa. Hasta ahora, los medios aéreos estaban ayudando a contener el frente, pero el aumento del humo y las rachas de viento hacen inseguras las descargas. La coordinación aérea comunica que los helicópteros no podrán operar hasta que mejore la visibilidad y se reduzca el riesgo para las tripulaciones. Sobre el terreno, varias brigadas trabajan en una zona expuesta y esperaban apoyo aéreo para frenar el avance. Si se mantiene la misma estrategia sin ese respaldo, los equipos podrían quedar en una posición vulnerable. La prioridad es reorganizar la intervención terrestre, proteger a las brigadas, valorar repliegues tácticos y preparar una nueva ventana de trabajo para cuando los medios aéreos puedan volver a operar.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Reorganizar la estrategia terrestre, revisar la seguridad de las brigadas desplegadas, reforzar puntos defendibles y ordenar repliegues tácticos si alguna unidad queda expuesta sin apoyo aéreo.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Si desaparece el apoyo aéreo, la estrategia debe cambiar. Mantener a equipos en posiciones pensadas para otra situación puede convertir una operación difícil en una trampa.",
      "shortFeedback": "Respuesta adecuada. Si desaparece el apoyo aéreo, la estrategia debe cambiar. Mantener a equipos en posiciones pensadas para otra situación puede convertir una operación difícil en una trampa.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Mantener a las brigadas en las mismas posiciones y esperar a que los helicópteros puedan volver a volar.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Esperar sin adaptar la estrategia puede dejar a los equipos expuestos a cambios de viento, humo y avance rápido del fuego. El cielo no siempre vuelve a abrirse cuando uno lo necesita.",
      "shortFeedback": "Respuesta incorrecta. Esperar sin adaptar la estrategia puede dejar a los equipos expuestos a cambios de viento, humo y avance rápido del fuego. El cielo no siempre vuelve a abrirse cuando uno lo necesita.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Coordinar con meteorología, dirección de extinción y mandos terrestres una reevaluación continua de viento, visibilidad y comportamiento del fuego, preparando prioridades claras para una posible reactivación de medios aéreos.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. No basta con dejar los helicópteros en tierra. Hay que anticipar cuándo podrán volver, dónde serán más útiles y cómo encajar su regreso en la estrategia general.",
      "shortFeedback": "Respuesta adecuada. No basta con dejar los helicópteros en tierra. Hay que anticipar cuándo podrán volver, dónde serán más útiles y cómo encajar su regreso en la estrategia general.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Ordenar a los pilotos que realicen descargas puntuales aunque la visibilidad sea mala, porque el frente está avanzando demasiado rápido.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Forzar operaciones aéreas en condiciones inseguras pone en riesgo a las tripulaciones y puede provocar accidentes graves. Un helicóptero no es una moneda para lanzar al humo.",
      "shortFeedback": "Respuesta incorrecta. Forzar operaciones aéreas en condiciones inseguras pone en riesgo a las tripulaciones y puede provocar accidentes graves. Un helicóptero no es una moneda para lanzar al humo.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Suspender toda la intervención hasta que los medios aéreos puedan operar de nuevo.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Que no vuelen los helicópteros no significa que la emergencia se congele. Hay que adaptar la estrategia terrestre, proteger zonas prioritarias y mantener acciones seguras mientras cambia la situación.",
      "shortFeedback": "Respuesta incorrecta. Que no vuelen los helicópteros no significa que la emergencia se congele. Hay que adaptar la estrategia terrestre, proteger zonas prioritarias y mantener acciones seguras mientras cambia la situación.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Los medios aéreos deben operar solo cuando las condiciones de visibilidad, viento y seguridad lo permiten.",
    "La pérdida temporal del apoyo aéreo obliga a revisar la estrategia terrestre, proteger a los equipos desplegados y valorar repliegues tácticos."
  ]
};
