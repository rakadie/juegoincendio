import type { Scenario } from '../../../domain/types/scenario.js';

export const cs024PresionMediaticaZonaCaliente: Scenario = {
  "id": "s-024-presion-mediatica-zona-caliente",
  "title": "Presión mediática en zona caliente",
  "category": "comunicacion",
  "phase": "crisis",
  "block": "comunicacion-crisis",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prensa",
    "medios-comunicacion",
    "curiosos",
    "accesos",
    "perimetro-seguridad",
    "proteccion-civil",
    "trafico"
  ],
  "status": "available",
  "context": "El incendio se vuelve visible desde una carretera cercana y empiezan a llegar equipos de prensa, curiosos y vecinos que quieren grabar imágenes.",
  "question": "¿Cómo gestionas la presencia de periodistas, curiosos y vecinos en una zona próxima al incendio?",
  "briefing": "La emergencia atrae cada vez más atención. Varios equipos de prensa se desplazan a la zona para cubrir el incendio, mientras curiosos y vecinos se acercan con móviles para grabar desde los márgenes de la carretera. El problema crece rápido: algunos vehículos ocupan arcenes, otros reducen la velocidad para grabar y los accesos que necesitan los medios de emergencia empiezan a congestionarse. Al mismo tiempo, impedir toda presencia informativa puede generar tensión con los medios y alimentar la sensación de opacidad. La clave está en ordenar el perímetro: garantizar la seguridad, despejar accesos, permitir el trabajo periodístico en condiciones controladas y sancionar conductas que pongan en riesgo el operativo. Tenemos que decidir cómo actuar sin convertir la carretera en un plató improvisado ni tratar la información como un estorbo.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Establecer un perímetro de seguridad, despejar los accesos para emergencias y habilitar una zona segura para medios acreditados, con información periódica y normas claras de permanencia.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Ordena la situación sin bloquear el derecho a informar. La prensa puede trabajar, pero no desde el carril por donde tiene que pasar una autobomba.",
      "shortFeedback": "Respuesta adecuada. Ordena la situación sin bloquear el derecho a informar. La prensa puede trabajar, pero no desde el carril por donde tiene que pasar una autobomba.",
      "impacts": [
        {
          "variableKey": "coordinacionOperativa",
          "delta": 4
        },
        {
          "variableKey": "accesoEmergencias",
          "delta": 5
        },
        {
          "variableKey": "seguridadPoblacion",
          "delta": 4
        },
        {
          "variableKey": "transparenciaInformativa",
          "delta": 3
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
      "text": "Expulsar a todos los periodistas de la zona y prohibir cualquier grabación para evitar interferencias.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Una prohibición total puede generar conflicto, opacidad y más presión informativa. Lo adecuado es ordenar el acceso, no apagar las cámaras como si eso apagara el fuego.",
      "shortFeedback": "Respuesta incorrecta. Una prohibición total puede generar conflicto, opacidad y más presión informativa. Lo adecuado es ordenar el acceso, no apagar las cámaras como si eso apagara el fuego.",
      "impacts": [
        {
          "variableKey": "transparenciaInformativa",
          "delta": -5
        },
        {
          "variableKey": "confusionPublica",
          "delta": 3
        },
        {
          "variableKey": "tensionMediatica",
          "delta": 5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -2
        },
        {
          "variableKey": "accesoEmergencias",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Coordinar con seguridad y comunicación un punto informativo para prensa, actualizar la situación con frecuencia y sancionar o retirar a curiosos que bloqueen vías o incumplan el perímetro.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Combina comunicación, control de accesos y seguridad. Si los medios reciben información fiable, hay menos necesidad de perseguir humo por carreteras peligrosas.",
      "shortFeedback": "Respuesta adecuada. Combina comunicación, control de accesos y seguridad. Si los medios reciben información fiable, hay menos necesidad de perseguir humo por carreteras peligrosas.",
      "impacts": [
        {
          "variableKey": "accesoEmergencias",
          "delta": 5
        },
        {
          "variableKey": "transparenciaInformativa",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 5
        },
        {
          "variableKey": "seguridadPoblacion",
          "delta": 4
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
      "text": "Permitir que prensa y vecinos se coloquen donde quieran mientras no entren directamente en la zona quemada.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. El riesgo no empieza solo donde hay llamas. Humo, viento, vehículos de emergencia y cambios bruscos pueden convertir una zona aparentemente segura en un problema operativo.",
      "shortFeedback": "Respuesta incorrecta. El riesgo no empieza solo donde hay llamas. Humo, viento, vehículos de emergencia y cambios bruscos pueden convertir una zona aparentemente segura en un problema operativo.",
      "impacts": [
        {
          "variableKey": "accesoEmergencias",
          "delta": -5
        },
        {
          "variableKey": "seguridadPoblacion",
          "delta": -4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -4
        },
        {
          "variableKey": "confusionPublica",
          "delta": 3
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Atender primero a los medios de comunicación para controlar el relato, aunque eso retrase el despeje de accesos.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Comunicar es importante, pero la prioridad inmediata es mantener libres las vías de emergencia y proteger a las personas. El relato no sirve de mucho si la autobomba está atrapada en un atasco de directos.",
      "shortFeedback": "Respuesta incorrecta. Comunicar es importante, pero la prioridad inmediata es mantener libres las vías de emergencia y proteger a las personas. El relato no sirve de mucho si la autobomba está atrapada en un atasco de directos.",
      "impacts": [
        {
          "variableKey": "accesoEmergencias",
          "delta": -5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -4
        },
        {
          "variableKey": "seguridadPoblacion",
          "delta": -3
        },
        {
          "variableKey": "transparenciaInformativa",
          "delta": 2
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La gestión de medios durante una emergencia debe compatibilizar el derecho a informar con la seguridad del operativo y de las personas.",
    "Ordenar el perímetro, habilitar zonas seguras para prensa y mantener información oficial periódica ayuda a reducir interferencias y conductas de riesgo.",
    "Mantener libres los accesos para emergencias es prioritario cuando hay presencia de curiosos, prensa o vecinos cerca de zonas afectadas."
  ]
};
