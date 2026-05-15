import type { Scenario } from '../../../domain/types/scenario.js';

export const os028DefensaNocturnaPerimetro: Scenario = {
  "id": "s-028-defensa-nocturna-perimetro",
  "title": "Defensa nocturna del perímetro",
  "category": "operaciones",
  "phase": "crisis",
  "block": "estrategia-extincion",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "defensa-nocturna",
    "perimetro",
    "barranco",
    "pavesas",
    "camaras-termicas",
    "drones",
    "hidrantes",
    "quemas-ensanche",
    "efecto-chimenea"
  ],
  "status": "available",
  "context": "Cae la noche sobre el incendio. Los medios aéreos se retiran por falta de visibilidad y el frente sigue activo en una zona de barranco próxima a viviendas.",
  "question": "¿Cómo organizas la defensa nocturna del perímetro antes de que el incendio se reactive al amanecer?",
  "briefing": "La llegada de la noche cambia drásticamente el escenario. Los helicópteros y otros medios aéreos dejan de operar por falta de visibilidad, y los equipos terrestres quedan como principal recurso para contener el avance del fuego. El incendio sigue activo en una zona de barranco, donde el acceso es difícil y las rutas de escape pueden complicarse rápidamente. Durante la noche, la bajada de temperatura y el aumento de humedad pueden reducir la intensidad del fuego, pero las brisas de montaña pueden cambiar la dirección del viento y desplazar pavesas hacia viviendas, tejados, jardines o zonas con vegetación seca. La estrategia debe pasar de intentar apagar todo el frente a defender puntos críticos donde haya opciones reales de éxito: carreteras, franjas limpias, perímetros de urbanizaciones e hidrantes clave. También es el momento de reforzar la vigilancia con cámaras térmicas o drones si están autorizados, llenar depósitos y cisternas, asegurar agua para las autobombas y preparar quemas de ensanche solo desde líneas seguras y con control técnico. La prioridad es cerrar el perímetro antes del amanecer. Cuando el sol caliente las laderas del barranco, el efecto chimenea puede reactivar el incendio con fuerza y dejar a los retenes en una posición peligrosa.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Establecer un límite de defensa en zonas seguras y defendibles, como carreteras, franjas limpias o perímetros de viviendas, retirando a los equipos de áreas de difícil escape y concentrando recursos donde el éxito sea probable.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. De noche no se trata de perseguir el fuego por el barranco. La defensa eficaz consiste en elegir una línea segura, preparar el terreno y esperar al incendio donde las brigadas puedan trabajar y replegarse.",
      "shortFeedback": "Respuesta adecuada. De noche no se trata de perseguir el fuego por el barranco. La defensa eficaz consiste en elegir una línea segura, preparar el terreno y esperar al incendio donde las brigadas puedan trabajar y replegarse.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": 5
        },
        {
          "variableKey": "controlPerimetro",
          "delta": 5
        },
        {
          "variableKey": "riesgoReactivacion",
          "delta": -3
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Mantener el ataque directo en el interior del barranco durante toda la noche para aprovechar que el fuego parece avanzar más despacio.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Aunque la intensidad pueda bajar, el barranco sigue siendo peligroso: humo, pavesas, visibilidad reducida y rutas de escape frágiles. La noche no convierte una ratonera en un salón con vistas.",
      "shortFeedback": "Respuesta incorrecta. Aunque la intensidad pueda bajar, el barranco sigue siendo peligroso: humo, pavesas, visibilidad reducida y rutas de escape frágiles. La noche no convierte una ratonera en un salón con vistas.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": -5
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 5
        },
        {
          "variableKey": "controlPerimetro",
          "delta": -3
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Desplegar patrullas ligeras con cámaras térmicas y drones si están autorizados para vigilar pavesas, detectar puntos calientes y apagar focos secundarios en tejados, jardines o zonas próximas al perímetro.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. La noche permite identificar mejor puntos calientes. Detectar una pavesa a tiempo puede evitar que un foco pequeño se convierta en una vivienda ardiendo o en un nuevo frente.",
      "shortFeedback": "Respuesta adecuada. La noche permite identificar mejor puntos calientes. Detectar una pavesa a tiempo puede evitar que un foco pequeño se convierta en una vivienda ardiendo o en un nuevo frente.",
      "impacts": [
        {
          "variableKey": "controlPerimetro",
          "delta": 4
        },
        {
          "variableKey": "deteccionPavesas",
          "delta": 5
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -3
        },
        {
          "variableKey": "riesgoReactivacion",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Esperar a que amanezca para reorganizar los retenes, porque con luz será más fácil decidir dónde colocar los equipos.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Al amanecer puede activarse el efecto chimenea en las laderas del barranco. Si los retenes siguen mal ubicados cuando el sol calienta, la ventana de seguridad puede cerrarse muy rápido.",
      "shortFeedback": "Respuesta incorrecta. Al amanecer puede activarse el efecto chimenea en las laderas del barranco. Si los retenes siguen mal ubicados cuando el sol calienta, la ventana de seguridad puede cerrarse muy rápido.",
      "impacts": [
        {
          "variableKey": "seguridadEquipos",
          "delta": -4
        },
        {
          "variableKey": "riesgoReactivacion",
          "delta": 5
        },
        {
          "variableKey": "controlPerimetro",
          "delta": -4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -3
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Concentrar todos los recursos en iluminar la zona de trabajo y mantener presencia visible, aunque no se hayan asegurado hidrantes, depósitos ni rutas de agua para las autobombas.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La visibilidad ayuda, pero sin agua asegurada la defensa se queda en decorado. Durante la noche hay que llenar depósitos, movilizar cisternas y garantizar suministro en las calles más expuestas.",
      "shortFeedback": "Respuesta incorrecta. La visibilidad ayuda, pero sin agua asegurada la defensa se queda en decorado. Durante la noche hay que llenar depósitos, movilizar cisternas y garantizar suministro en las calles más expuestas.",
      "impacts": [
        {
          "variableKey": "disponibilidadAgua",
          "delta": -5
        },
        {
          "variableKey": "controlPerimetro",
          "delta": -3
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 3
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Durante la noche, la retirada de medios aéreos obliga a reforzar la defensa terrestre del perímetro desde posiciones seguras y defendibles.",
    "La vigilancia de pavesas y puntos calientes con cámaras térmicas o drones autorizados puede evitar focos secundarios en viviendas y jardines.",
    "Antes del amanecer conviene reubicar retenes y cerrar líneas de defensa, porque el calentamiento de laderas puede reactivar el incendio por efecto chimenea."
  ]
};
