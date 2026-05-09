import type { Scenario } from '../../../domain/types/scenario.js';

export const os025CortafuegoEmergencia: Scenario = {
  "id": "s-025-cortafuego-emergencia",
  "title": "Cortafuego de emergencia",
  "category": "operaciones",
  "phase": "crisis",
  "block": "estrategia-extincion",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "cortafuego",
    "quema-tecnica",
    "maquinaria",
    "zona-agricola",
    "zona-forestal",
    "direccion-extincion",
    "riesgo"
  ],
  "status": "available",
  "context": "El incendio avanza hacia una zona agrícola y forestal con continuidad de combustible. Los técnicos proponen una maniobra agresiva para frenar el avance.",
  "question": "¿Autorizas una maniobra de cortafuego o quema técnica para frenar el avance del incendio?",
  "briefing": "El frente del incendio gana velocidad y se dirige hacia una zona donde la vegetación seca conecta directamente con terrenos agrícolas, pistas forestales y viviendas dispersas. Los técnicos plantean una intervención de emergencia: crear una discontinuidad en el combustible mediante maquinaria, quemas técnicas controladas o una combinación de ambas. La maniobra podría frenar el avance y ganar tiempo para proteger zonas habitadas. Sin embargo, la decisión tiene costes. La actuación puede afectar cultivos, suelo forestal, infraestructuras rurales y generar rechazo entre propietarios que no entienden por qué se autoriza provocar más fuego o destruir parte del terreno. Tenemos que decidir cómo actuar: valorar el criterio técnico, medir el riesgo para la población, explicar la medida, coordinar recursos y evitar que una maniobra necesaria se convierta en otro foco de conflicto.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Autorizar la maniobra solo si cuenta con evaluación técnica favorable, condiciones meteorológicas compatibles, recursos suficientes para controlarla y una justificación clara vinculada a la protección de personas o bienes esenciales.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Una quema técnica o cortafuego de emergencia no se improvisa. Puede ser útil, pero solo con criterio técnico, control operativo y una finalidad clara.",
      "shortFeedback": "Respuesta adecuada. La autorización queda ligada a condiciones técnicas y de seguridad.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "cortafuego-condicionado"
      ]
    },
    {
      "id": "b",
      "text": "Rechazar cualquier quema técnica o cortafuego porque provocar daños controlados nunca debe formar parte de la respuesta a un incendio.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "En algunas situaciones, crear discontinuidades o usar fuego técnico puede evitar un daño mayor. Negarlo por principio puede dejar que el incendio elija el terreno de juego.",
      "shortFeedback": "Respuesta incorrecta. El rechazo absoluto puede cerrar una herramienta útil de contención.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "rechazo-cortafuego-tecnico"
      ]
    },
    {
      "id": "c",
      "text": "Coordinar la actuación con dirección de extinción, técnicos forestales, maquinaria, seguridad y comunicación pública, informando a propietarios y población afectada de por qué se realiza y qué zonas quedarán protegidas.",
      "evaluation": "optimal",
      "severity": "medium",
      "rationale": "La maniobra necesita control técnico y también explicación pública. Si no se comunica bien, la población puede interpretar una decisión estratégica como una agresión gratuita al territorio.",
      "shortFeedback": "Respuesta adecuada. La coordinación técnica y pública reduce el riesgo operativo y social.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "cortafuego-coordinado"
      ]
    },
    {
      "id": "d",
      "text": "Autorizar la quema técnica de inmediato aunque el viento sea inestable, para adelantarse al frente antes de que llegue a la zona agrícola.",
      "evaluation": "critical",
      "severity": "critical",
      "rationale": "Con viento inestable, una quema técnica puede escapar al control y convertirse en otro problema.",
      "shortFeedback": "Respuesta incorrecta. No se combate un incendio añadiendo un nuevo foco descontrolado.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "quema-tecnica-viento-inestable"
      ]
    },
    {
      "id": "e",
      "text": "Esperar a que el fuego llegue a la zona agrícola y decidir entonces, para evitar daños innecesarios si finalmente cambia de dirección.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Algunas maniobras necesitan anticipación. Esperar demasiado puede hacer que ya no haya tiempo, recursos ni condiciones seguras para ejecutarlas.",
      "shortFeedback": "Respuesta incorrecta. En incendios, el “ya veremos” suele llegar tarde.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "cortafuego-decision-tardia"
      ]
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Los cortafuegos de emergencia y las quemas técnicas deben basarse en evaluación técnica, condiciones meteorológicas adecuadas y capacidad real de control.",
    "Las maniobras que implican daños controlados requieren coordinación operativa y comunicación clara con población y propietarios afectados.",
    "Renombrado desde s-024-quema-tecnica porque el contenido define el escenario s-025-cortafuego-emergencia."
  ]
};
