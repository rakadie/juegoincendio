import type { Scenario } from '../../../domain/types/scenario.js';

export const ps037PlanFamiliarEmergencia: Scenario = {
  "id": "s-037-plan-familiar-emergencia",
  "title": "Plan familiar de emergencia",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion-y-autoproteccion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion",
    "autoproteccion",
    "plan-familiar",
    "mochila-emergencia",
    "evacuacion",
    "punto-encuentro",
    "rutas-salida",
    "plan-autoproteccion"
  ],
  "status": "available",
  "context": "Antes de la época de mayor riesgo de incendios, estás realizando sesiones informativas con vecinos de zonas próximas al monte. Después de hablar de limpieza exterior y defensa pasiva de la vivienda, surge una duda práctica: muchas familias no tienen preparada una mochila de emergencia, no han pensado por dónde salir si se ordena la evacuación y desconocen si su comunidad o urbanización cuenta con un plan de autoprotección.",
  "question": "¿Qué medidas recomiendas para que las familias estén preparadas antes de un incendio?",
  "briefing": "La preparación familiar puede marcar la diferencia cuando una evacuación debe hacerse con poco margen. En una emergencia, perder tiempo buscando documentación, medicinas, cargadores o pensando a qué familiar avisar puede retrasar la salida y aumentar el riesgo. Por eso, cada familia debería tener preparada una mochila básica de emergencia con documentación, medicación necesaria, cargadores, linterna, radio con pilas, agua y otros elementos esenciales. También debe conocer las rutas de salida, acordar un punto de encuentro y saber cómo actuar si algún miembro de la familia no está en casa cuando se da la orden. Además, en zonas de riesgo es importante conocer el plan de autoprotección de la comunidad, urbanización o municipio: qué puntos de encuentro existen, qué rutas están previstas, cómo se avisará a la población y qué instrucciones deben seguirse. La prioridad es que la respuesta familiar no dependa de la improvisación. En un incendio, la mochila no debería hacerse mientras la televisión ya dice “última hora”.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Recomendar que cada familia prepare una mochila de emergencia con documentación, medicación necesaria, cargadores, linterna, radio con pilas, agua y elementos básicos, y que la revise antes de la época de mayor riesgo.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Tener lo esencial preparado evita retrasos en una evacuación. La mochila no apaga incendios, pero evita que la familia pierda minutos valiosos buscando papeles, pastillas, una linterna o una radio para seguir instrucciones si fallan las comunicaciones habituales.",
      "shortFeedback": "Respuesta adecuada. Tener lo esencial preparado evita retrasos en una evacuación. La mochila no apaga incendios, pero evita que la familia pierda minutos valiosos buscando papeles, pastillas, una linterna o una radio para seguir instrucciones si fallan las comunicaciones habituales.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Indicar que no hace falta preparar nada con antelación, porque en caso de evacuación siempre habrá tiempo para recoger lo necesario.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Una evacuación puede activarse con muy poco margen. Confiar en que habrá tiempo para buscar todo en casa puede retrasar la salida y aumentar el riesgo.",
      "shortFeedback": "Respuesta incorrecta. Una evacuación puede activarse con muy poco margen. Confiar en que habrá tiempo para buscar todo en casa puede retrasar la salida y aumentar el riesgo.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Aconsejar a las familias que acuerden rutas de salida, un punto de encuentro y un sistema de aviso entre sus miembros, además de conocer el plan de autoprotección de su comunidad, urbanización o municipio.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Un plan familiar sencillo reduce la confusión. Saber por dónde salir, dónde reunirse y qué instrucciones oficiales seguir ayuda a evitar decisiones improvisadas.",
      "shortFeedback": "Respuesta adecuada. Un plan familiar sencillo reduce la confusión. Saber por dónde salir, dónde reunirse y qué instrucciones oficiales seguir ayuda a evitar decisiones improvisadas.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Recomendar que cada familia decida su ruta de evacuación en el momento, según vea el humo o lo que comenten los vecinos.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Decidir bajo presión, con humo y mensajes contradictorios, es una receta estupenda para equivocarse. Las rutas deben conocerse antes y ajustarse después a las órdenes oficiales.",
      "shortFeedback": "Respuesta incorrecta. Decidir bajo presión, con humo y mensajes contradictorios, es una receta estupenda para equivocarse. Las rutas deben conocerse antes y ajustarse después a las órdenes oficiales.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Sugerir que la mochila de emergencia incluya todos los objetos de valor posibles, aunque eso retrase la salida.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La mochila debe contener lo esencial, no media mudanza sentimental. En una evacuación, cargar demasiado puede retrasar la salida y complicar el traslado.",
      "shortFeedback": "Respuesta incorrecta. La mochila debe contener lo esencial, no media mudanza sentimental. En una evacuación, cargar demasiado puede retrasar la salida y complicar el traslado.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La planificación familiar previa reduce retrasos y decisiones improvisadas durante una evacuación por incendio.",
    "Una mochila de emergencia debe contener elementos esenciales como documentación, medicación, cargadores, linterna, radio con pilas, agua y otros básicos.",
    "Las familias deben conocer rutas de salida, puntos de encuentro y el plan de autoprotección de su comunidad, urbanización o municipio.",
    "La preparación debe hacerse antes de la época de mayor riesgo; durante una emergencia la prioridad es seguir instrucciones oficiales."
  ]
};
