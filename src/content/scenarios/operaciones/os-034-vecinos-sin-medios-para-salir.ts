import type { Scenario } from '../../../domain/types/scenario.js';

export const os034VecinosSinMediosParaSalir: Scenario = {
  "id": "s-034-vecinos-sin-medios-para-salir",
  "title": "Vecinos sin medios para salir",
  "category": "operaciones",
  "phase": "crisis",
  "block": "evacuacion-y-proteccion-civil",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "evacuacion",
    "personas-vulnerables",
    "sin-vehiculo",
    "transporte-adaptado",
    "puntos-recogida",
    "aviso-puerta-a-puerta",
    "servicios-sociales"
  ],
  "status": "available",
  "context": "Se activa la evacuación preventiva de un núcleo afectado por el avance del incendio. Durante el operativo, el ayuntamiento informa de que varias personas mayores, vecinos con movilidad reducida y algunas familias no tienen vehículo propio ni red familiar cercana para abandonar la zona.",
  "question": "¿Cómo organizas la evacuación de personas que no tienen medios para salir por su cuenta?",
  "briefing": "La orden de evacuación ya está en marcha, pero empiezan a detectarse casos de vecinos que no pueden abandonar la zona por sus propios medios. Algunas personas mayores viven solas, hay vecinos con movilidad reducida y varias familias no disponen de coche ni de apoyo cercano. La situación exige una respuesta específica. Si se da por hecho que todo el mundo puede salir en vehículo privado, parte de la población puede quedar atrapada o retrasar la evacuación general. La prioridad es identificar rápidamente a las personas que necesitan ayuda, organizar transporte adaptado o colectivo, establecer puntos de recogida seguros, activar aviso puerta a puerta si la comunicación telefónica falla y coordinar el traslado hacia zonas de acogida.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Activar un dispositivo específico para personas sin vehículo, con transporte adaptado o colectivo, puntos de recogida seguros, registro de personas trasladadas y prioridad para mayores, dependientes y familias con menores.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Una evacuación real no puede depender solo del coche privado. Identificar, recoger, registrar y trasladar a quienes no tienen medios evita que la orden deje a gente atrás.",
      "shortFeedback": "Respuesta adecuada. Una evacuación real no puede depender solo del coche privado. Identificar, recoger, registrar y trasladar a quienes no tienen medios evita que la orden deje a gente atrás.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": 5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 4
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -4
        },
        {
          "variableKey": "inclusionVulnerables",
          "delta": 5
        },
        {
          "variableKey": "confusionPublica",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Pedir a los vecinos con coche que lleven a quienes no tengan vehículo, sin organizar puntos de recogida ni registro oficial.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La solidaridad ayuda, pero sin coordinación puede generar confusión, personas sin localizar y traslados inseguros. En una evacuación, “que alguien los lleve” no es un plan: es una apuesta.",
      "shortFeedback": "Respuesta incorrecta. La solidaridad ayuda, pero sin coordinación puede generar confusión, personas sin localizar y traslados inseguros. En una evacuación, “que alguien los lleve” no es un plan: es una apuesta.",
      "impacts": [
        {
          "variableKey": "coordinacionOperativa",
          "delta": -4
        },
        {
          "variableKey": "confusionPublica",
          "delta": 3
        },
        {
          "variableKey": "inclusionVulnerables",
          "delta": -3
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 3
        },
        {
          "variableKey": "poblacionProtegida",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Coordinar con ayuntamiento, Protección Civil, servicios sociales y fuerzas de seguridad un aviso puerta a puerta en las zonas más vulnerables para localizar a quienes no pueden salir solos y trasladarlos por rutas confirmadas.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Algunas personas no verán redes, no recibirán llamadas o no podrán moverse. El puerta a puerta permite detectar casos invisibles y evitar que la evacuación sea solo para quienes tienen batería, coche y familia cerca.",
      "shortFeedback": "Respuesta adecuada. Algunas personas no verán redes, no recibirán llamadas o no podrán moverse. El puerta a puerta permite detectar casos invisibles y evitar que la evacuación sea solo para quienes tienen batería, coche y familia cerca.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": 5
        },
        {
          "variableKey": "inclusionVulnerables",
          "delta": 5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -3
        },
        {
          "variableKey": "confusionPublica",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Retrasar toda la evacuación hasta conseguir transporte para todas las personas sin vehículo.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Hay que ayudar a quienes lo necesitan sin paralizar el resto del operativo. Retrasar toda la evacuación puede aumentar el riesgo para la población que sí puede salir ya por rutas seguras.",
      "shortFeedback": "Respuesta incorrecta. Hay que ayudar a quienes lo necesitan sin paralizar el resto del operativo. Retrasar toda la evacuación puede aumentar el riesgo para la población que sí puede salir ya por rutas seguras.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": -3
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -3
        },
        {
          "variableKey": "saturacionRecursos",
          "delta": 3
        },
        {
          "variableKey": "confusionPublica",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Indicar a las personas sin vehículo que caminen hasta el punto de encuentro más cercano aunque haya humo o poca visibilidad.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Caminar en una zona con humo, calor, mala visibilidad o carreteras con tráfico de emergencia puede ser muy peligroso, especialmente para mayores, menores o personas con movilidad reducida.",
      "shortFeedback": "Respuesta incorrecta. Caminar en una zona con humo, calor, mala visibilidad o carreteras con tráfico de emergencia puede ser muy peligroso, especialmente para mayores, menores o personas con movilidad reducida.",
      "impacts": [
        {
          "variableKey": "poblacionProtegida",
          "delta": -5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 5
        },
        {
          "variableKey": "inclusionVulnerables",
          "delta": -4
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": -2
        },
        {
          "variableKey": "confusionPublica",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Una orden de evacuación debe contemplar a personas sin vehículo, mayores, dependientes, familias sin apoyo cercano y vecinos con movilidad reducida.",
    "Los puntos de recogida, el transporte adaptado o colectivo y el registro de personas trasladadas ayudan a evitar que alguien quede atrás.",
    "El aviso puerta a puerta puede ser necesario cuando la comunicación telefónica o digital no garantiza que la información llegue a toda la población."
  ]
};
