import type { Scenario } from '../../../domain/types/scenario.js';

export const os029RelevoCuadrillasAgotadas: Scenario = {
  "id": "s-029-relevo-cuadrillas-agotadas",
  "title": "Relevo de cuadrillas agotadas",
  "category": "operaciones",
  "phase": "crisis",
  "block": "coordinacion-operativa",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "relevo-cuadrillas",
    "agotamiento",
    "bomberos",
    "brigadas",
    "logistica",
    "seguridad-operativa",
    "base-descanso",
    "reten-intervencion-rapida"
  ],
  "status": "available",
  "context": "La defensa del nucleo de viviendas se prolonga durante horas. Las cuadrillas llevan mucho tiempo trabajando entre humo, calor y tension constante. Los mandos advierten de que el cansancio puede empezar a afectar a la toma de decisiones, al manejo de vehiculos y a la seguridad de los equipos.",
  "question": "?Como organizas el relevo de cuadrillas para que la defensa del nucleo no colapse por agotamiento?",
  "briefing": "La defensa del nucleo de viviendas entra en una fase larga y exigente. Los equipos han trabajado durante horas protegiendo estructuras, apagando focos secundarios y manteniendo lineas de defensa en condiciones duras. El agotamiento empieza a ser un riesgo operativo. Un bombero cansado puede calcular peor una ruta de escape, reaccionar mas tarde ante un cambio de viento o cometer errores al conducir una autobomba por accesos estrechos. Ademas, los vehiculos y el material tambien necesitan revision: filtros saturados de ceniza, mangueras danadas, herramientas perdidas o depositos bajos pueden comprometer el siguiente turno. La prioridad es organizar un relevo escalonado, con solape entre mandos salientes y entrantes, traspaso de informacion critica, descanso real para el personal, reabastecimiento de agua, comida y material, y mantenimiento de un reten de intervencion rapida por si el fuego salta el perimetro durante la noche.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Organizar un relevo escalonado por turnos, con solape entre jefes de cuadrilla salientes y entrantes para transmitir puntos calientes, viviendas de riesgo, hidrantes con poca presión, rutas de escape y cambios recientes del perímetro.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. El relevo no es solo cambiar personas: es transferir memoria operativa. Sin ese solape, el turno entrante llega fresco, sí, pero ciego. Y en un incendio eso no es una virtud.",
      "shortFeedback": "Respuesta adecuada. El relevo no es solo cambiar personas: es transferir memoria operativa. Sin ese solape, el turno entrante llega fresco, sí, pero ciego. Y en un incendio eso no es una virtud.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": 5
        },
        {
          "variableKey": "continuidadOperativa",
          "delta": 5
        },
        {
          "variableKey": "agotamientoEquipos",
          "delta": -4
        },
        {
          "variableKey": "controlPerimetro",
          "delta": 3
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Mantener a las mismas cuadrillas en primera línea mientras el núcleo siga amenazado, porque ya conocen el terreno y sustituirlas puede hacer perder tiempo.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Conocer el terreno ayuda, pero el agotamiento deteriora la atención, la conducción, la comunicación y la toma de decisiones. Un equipo exhausto puede convertirse en parte del problema.",
      "shortFeedback": "Respuesta incorrecta. Conocer el terreno ayuda, pero el agotamiento deteriora la atención, la conducción, la comunicación y la toma de decisiones. Un equipo exhausto puede convertirse en parte del problema.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": -5
        },
        {
          "variableKey": "agotamientoEquipos",
          "delta": 5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 3
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -2
        },
        {
          "variableKey": "controlPerimetro",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Crear una base segura de descanso y logística fuera del humo, donde el personal relevado pueda hidratarse, comer, ducharse, dormir y donde los vehículos sean revisados, repostados y reabastecidos antes de volver al servicio.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. La recuperación del personal y el mantenimiento del material sostienen la operación. No sirve de mucho tener bomberos con épica si la autobomba vuelve sin agua, con filtros saturados y la tripulación al borde del fundido.",
      "shortFeedback": "Respuesta adecuada. La recuperación del personal y el mantenimiento del material sostienen la operación. No sirve de mucho tener bomberos con épica si la autobomba vuelve sin agua, con filtros saturados y la tripulación al borde del fundido.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": 5
        },
        {
          "variableKey": "continuidadOperativa",
          "delta": 4
        },
        {
          "variableKey": "agotamientoEquipos",
          "delta": -5
        },
        {
          "variableKey": "disponibilidadRecursos",
          "delta": 4
        },
        {
          "variableKey": "controlPerimetro",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Hacer el relevo completo de todas las unidades a la vez para que el nuevo turno empiece desde cero con una organización limpia.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Un relevo total y simultáneo puede dejar huecos de cobertura, perder información crítica y desproteger el perímetro. En una emergencia, “empezar desde cero” suele ser una forma elegante de decir “hemos olvidado lo importante”.",
      "shortFeedback": "Respuesta incorrecta. Un relevo total y simultáneo puede dejar huecos de cobertura, perder información crítica y desproteger el perímetro. En una emergencia, “empezar desde cero” suele ser una forma elegante de decir “hemos olvidado lo importante”.",
      "impacts": [
        {
          "variableKey": "continuidadOperativa",
          "delta": -5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -4
        },
        {
          "variableKey": "controlPerimetro",
          "delta": -4
        },
        {
          "variableKey": "riesgoReactivacion",
          "delta": 3
        },
        {
          "variableKey": "confusionOperativa",
          "delta": 4
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Enviar a descansar a todas las cuadrillas agotadas sin dejar retén de intervención rápida, confiando en que el perímetro aguantará hasta el siguiente turno.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Aunque haya descanso, debe mantenerse capacidad de respuesta inmediata. Las pavesas, los focos secundarios y los cambios de viento no respetan horarios laborales ni fichan salida.",
      "shortFeedback": "Respuesta incorrecta. Aunque haya descanso, debe mantenerse capacidad de respuesta inmediata. Las pavesas, los focos secundarios y los cambios de viento no respetan horarios laborales ni fichan salida.",
      "impacts": [
        {
          "variableKey": "controlPerimetro",
          "delta": -5
        },
        {
          "variableKey": "riesgoReactivacion",
          "delta": 5
        },
        {
          "variableKey": "continuidadOperativa",
          "delta": -4
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": -2
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "El relevo de cuadrillas debe organizarse de forma escalonada para evitar huecos de cobertura y perdida de informacion operativa.",
    "El agotamiento del personal puede afectar a la seguridad, la conduccion, la comunicacion y la toma de decisiones durante una emergencia.",
    "La logistica de descanso, hidratacion, alimentacion, revision de vehiculos y mantenimiento de un reten de intervencion rapida es clave para sostener la defensa del perimetro.",
    "Reconstruido desde el fragmento sincronizado de opciones para conservar la actualizacion sin perder el escenario."
  ]
};
