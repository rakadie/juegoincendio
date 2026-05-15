import type { Scenario } from '../../../domain/types/scenario.js';

export const os027FuegoEnBarranco: Scenario = {
  "id": "s-027-fuego-en-barranco",
  "title": "Fuego en el barranco",
  "category": "operaciones",
  "phase": "crisis",
  "block": "estrategia-extincion",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "barranco",
    "helicopteros",
    "medios-aereos",
    "medios-terrestres",
    "efecto-chimenea",
    "pavesas",
    "rutas-escape",
    "ataque-indirecto"
  ],
  "status": "available",
  "context": "Las llamas alcanzan una zona de barranco estrecho y profundo. El fuego empieza a ganar velocidad por la pendiente y el viento canalizado.",
  "question": "¿Cómo organizas la intervención en una zona de barranco?",
  "briefing": "El incendio entra en una zona de barranco estrecho, con fuerte pendiente, vegetación acumulada y accesos limitados. La orografía complica la intervención: el fuego puede acelerar ladera arriba por el efecto chimenea, lanzar pavesas a distancia y cerrar rutas de escape en pocos minutos. Los medios aéreos disponibles no tienen la misma utilidad en este terreno. Los helicópteros pueden maniobrar con más precisión, realizar descargas sobre puntos calientes y cargar agua en balsas o depósitos cercanos. En cambio, los hidroaviones necesitan trayectorias más amplias y no pueden operar con seguridad dentro de un barranco estrecho, aunque sí podrían apoyar en zonas abiertas, crestas o laderas superiores. Los medios terrestres siguen siendo esenciales, pero deben actuar con mucha prudencia. Las brigadas pueden consolidar el trabajo aéreo con tendidos de manguera, herramientas manuales y líneas de defensa, siempre que existan observación, comunicación, rutas de escape y zonas seguras. Tenemos que decidir cómo intervenir: aprovechar la precisión de los helicópteros, evitar maniobras aéreas inseguras, proteger a los equipos terrestres y valorar fuego técnico o líneas indirectas solo desde posiciones seguras.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Priorizar el uso de helicópteros para descargas precisas en puntos calientes del barranco, coordinando su actuación con brigadas terrestres solo en zonas con rutas de escape, comunicación y lugares seguros confirmados.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. En un barranco estrecho, el helicóptero ofrece mayor maniobrabilidad y precisión. Pero el apoyo aéreo no sustituye la seguridad terrestre: si las brigadas entran, deben hacerlo con observación, comunicación, escape y zona segura.",
      "shortFeedback": "Respuesta adecuada. En un barranco estrecho, el helicóptero ofrece mayor maniobrabilidad y precisión. Pero el apoyo aéreo no sustituye la seguridad terrestre: si las brigadas entran, deben hacerlo con observación, comunicación, escape y zona segura.",
      "impacts": [
        {
          "variableKey": "eficaciaExtincion",
          "delta": 4
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": 4
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": 3
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -3
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": -2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Enviar hidroaviones directamente al interior del barranco para aprovechar su mayor capacidad de descarga.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Un hidroavión puede cargar más agua, pero necesita espacio, trayectoria y margen de seguridad. En un barranco estrecho, su tamaño no es una ventaja: es un problema con alas.",
      "shortFeedback": "Respuesta incorrecta. Un hidroavión puede cargar más agua, pero necesita espacio, trayectoria y margen de seguridad. En un barranco estrecho, su tamaño no es una ventaja: es un problema con alas.",
      "impacts": [
        {
          "variableKey": "seguridadAerea",
          "delta": -5
        },
        {
          "variableKey": "coordinacionOperativa",
          "delta": -3
        },
        {
          "variableKey": "eficaciaExtincion",
          "delta": -2
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Usar los medios terrestres para consolidar la extinción desde posiciones seguras: tendidos de manguera, líneas manuales hasta suelo mineral y control de rescoldos, evitando entrar en zonas donde el efecto chimenea pueda cortar la salida.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Los medios aéreos enfrían y reducen intensidad, pero el trabajo terrestre consolida. Eso sí: en barranco, entrar sin escape claro puede convertir una maniobra útil en una encerrona.",
      "shortFeedback": "Respuesta adecuada. Los medios aéreos enfrían y reducen intensidad, pero el trabajo terrestre consolida. Eso sí: en barranco, entrar sin escape claro puede convertir una maniobra útil en una encerrona.",
      "impacts": [
        {
          "variableKey": "eficaciaExtincion",
          "delta": 5
        },
        {
          "variableKey": "seguridadEquipos",
          "delta": 4
        },
        {
          "variableKey": "riesgoAtrapamiento",
          "delta": -4
        },
        {
          "variableKey": "danosPotencialesVivienda",
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
      "id": "d",
      "text": "Ordenar a las brigadas que bajen al fondo del barranco para atacar directamente la llama antes de que suba por la ladera.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. El fondo del barranco puede ser una zona especialmente peligrosa por humo, calor, caída de material, pavesas y aceleración súbita del fuego. No se manda personal a donde el fuego puede cerrar la puerta.",
      "shortFeedback": "Respuesta incorrecta. El fondo del barranco puede ser una zona especialmente peligrosa por humo, calor, caída de material, pavesas y aceleración súbita del fuego. No se manda personal a donde el fuego puede cerrar la puerta.",
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
          "variableKey": "eficaciaExtincion",
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
      "id": "e",
      "text": "Mantener todos los medios esperando hasta que el fuego salga del barranco a una zona más abierta.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Esperar sin actuar puede permitir que el incendio gane intensidad y alcance crestas, viviendas o zonas forestales más extensas. La alternativa no es mirar el barranco como quien mira una lavadora: hay que actuar desde posiciones seguras y con táctica indirecta si es necesario.",
      "shortFeedback": "Respuesta incorrecta. Esperar sin actuar puede permitir que el incendio gane intensidad y alcance crestas, viviendas o zonas forestales más extensas. La alternativa no es mirar el barranco como quien mira una lavadora: hay que actuar desde posiciones seguras y con táctica indirecta si es necesario.",
      "impacts": [
        {
          "variableKey": "eficaciaExtincion",
          "delta": -4
        },
        {
          "variableKey": "danosPotencialesVivienda",
          "delta": 4
        },
        {
          "variableKey": "riesgoPropagacion",
          "delta": 5
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
    "En zonas de barranco, la orografía puede acelerar el comportamiento del fuego por efecto chimenea y dificultar las rutas de escape.",
    "Los helicópteros ofrecen mayor maniobrabilidad y precisión en barrancos estrechos, mientras que los hidroaviones requieren trayectorias amplias y zonas de operación seguras.",
    "Los medios terrestres son esenciales para consolidar la extinción, pero solo deben intervenir con observación, comunicación, rutas de escape y zonas seguras confirmadas."
  ]
};
