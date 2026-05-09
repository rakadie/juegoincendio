import type { Scenario } from '../../../domain/types/scenario.js';

export const os022EvacuacionConMascotas: Scenario = {
  "id": "s-022-evacuacion-con-mascotas",
  "title": "Evacuación con mascotas",
  "category": "operaciones",
  "phase": "crisis",
  "block": "evacuacion-y-proteccion-civil",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "mascotas",
    "animales-domesticos",
    "evacuacion",
    "proteccion-civil",
    "albergues",
    "transporte",
    "poblacion"
  ],
  "status": "available",
  "context": "Se ordena la evacuación preventiva de varios barrios próximos al frente del incendio, pero numerosos vecinos se niegan a salir si no pueden llevarse a sus mascotas.",
  "question": "¿Cómo gestionas una evacuación en la que muchas personas se niegan a salir sin sus mascotas?",
  "briefing": "La evacuación avanza más despacio de lo previsto. En varios puntos, los equipos informan de que algunas familias se resisten a abandonar sus viviendas porque no quieren dejar atrás a sus animales domésticos. La situación genera tensión: cada minuto cuenta, pero separar a las personas de sus mascotas puede aumentar la resistencia, provocar decisiones improvisadas y retrasar la salida de zonas en riesgo. Además, no todos los recursos están preparados para transportar animales y los albergues iniciales no cuentan con espacios diferenciados para mascotas. Tenemos que decidir cómo actuar: facilitar la evacuación sin perder seguridad, evitar retrasos peligrosos, ordenar los flujos de personas y animales, y habilitar soluciones realistas para que la población coopere.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Habilitar un punto de acogida o zona diferenciada para mascotas, coordinar transporte cuando sea necesario y comunicar claramente que las personas pueden evacuar con sus animales siguiendo las instrucciones de los equipos.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Permitir una salida organizada con mascotas reduce la resistencia a evacuar y evita que la población tome decisiones peligrosas por su cuenta.",
      "shortFeedback": "Respuesta adecuada. El vínculo con los animales también cuenta en la emergencia.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "evacuacion-mascotas-organizada"
      ]
    },
    {
      "id": "b",
      "text": "Prohibir que las personas evacúen con mascotas para agilizar el operativo y evitar complicaciones en los albergues.",
      "evaluation": "critical",
      "severity": "critical",
      "rationale": "Una prohibición rígida puede provocar que muchas personas se nieguen a salir, vuelvan a zonas peligrosas o intenten esconder animales en vehículos sin control.",
      "shortFeedback": "Respuesta incorrecta. Lo que parece orden puede acabar en bloqueo.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "mascotas-prohibidas-evacuacion"
      ]
    },
    {
      "id": "c",
      "text": "Separar y ordenar los flujos de evacuación: personas vulnerables primero, familias con mascotas en vehículos o transporte habilitado, registro básico de animales y derivación a espacios seguros preparados para acogerlos.",
      "evaluation": "optimal",
      "severity": "medium",
      "rationale": "Un flujo claro evita retrasos, reduce estrés y permite saber quién sale, con qué animal y hacia dónde.",
      "shortFeedback": "Respuesta adecuada. Organizar no significa improvisar jaulas en una esquina.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "flujos-evacuacion-mascotas"
      ]
    },
    {
      "id": "d",
      "text": "Indicar a los vecinos que suelten a los animales para que puedan escapar por sí solos y centrarse solo en la evacuación humana.",
      "evaluation": "critical",
      "severity": "critical",
      "rationale": "Soltar mascotas puede causar accidentes, animales perdidos, riesgos sanitarios y más angustia para las familias.",
      "shortFeedback": "Respuesta incorrecta. Además, puede hacer que algunas personas regresen a buscarlas.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "mascotas-sueltas"
      ]
    },
    {
      "id": "e",
      "text": "Permitir que cada familia resuelva el traslado de sus mascotas como pueda, sin instrucciones específicas, para no complicar el dispositivo oficial.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "La falta de instrucciones genera improvisación, retrasos y conflictos en los puntos de evacuación.",
      "shortFeedback": "Respuesta incorrecta. En una emergencia, “arréglense como puedan” es casi siempre el principio de otro problema.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "evacuacion-mascotas-sin-instrucciones"
      ]
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Incluir a las mascotas en la planificación de evacuaciones puede reducir la resistencia de la población a abandonar zonas de riesgo.",
    "La evacuación con animales domésticos requiere comunicación clara, espacios diferenciados, registro básico y coordinación de transporte cuando sea necesario."
  ]
};
