import type { Scenario } from '../../../domain/types/scenario.js';

export const os023CentroMayoresRiesgo: Scenario = {
  "id": "s-023-centro-mayores-riesgo",
  "title": "Centro de mayores en zona de riesgo",
  "category": "operaciones",
  "phase": "crisis",
  "block": "evacuacion-y-proteccion-civil",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "centro-mayores",
    "evacuacion",
    "proteccion-civil",
    "personas-vulnerables",
    "movilidad-reducida",
    "humo",
    "transporte-sanitario"
  ],
  "status": "available",
  "context": "El incendio avanza hacia una zona donde se encuentra un centro de mayores. El humo empieza a afectar al entorno y las carreteras de acceso podrían quedar comprometidas si el viento cambia.",
  "question": "¿Cómo gestionas la protección y posible evacuación del centro de mayores?",
  "briefing": "La situación es delicada. El centro de mayores no está todavía directamente alcanzado por el fuego, pero el humo empieza a ser visible y las rutas de salida podrían empeorar en poco tiempo. La dirección del centro solicita instrucciones claras. Algunos familiares están llamando con insistencia y varias personas quieren acudir por su cuenta a recoger a los residentes. Los equipos de emergencia advierten de que una evacuación mal coordinada puede generar retrasos, bloqueos en los accesos y riesgos añadidos para personas frágiles. La prioridad es proteger a los residentes, coordinar el traslado con recursos sanitarios y sociales adecuados, evitar movimientos improvisados y mantener informadas a las familias por canales oficiales.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Activar una evacuación coordinada del centro con transporte sanitario y adaptado, priorizando a residentes dependientes, personas con oxígeno, movilidad reducida o deterioro cognitivo, y definiendo un destino seguro antes de iniciar los traslados.",
      "evaluation": "optimal",
      "severity": "medium",
      "rationale": "Un centro de mayores requiere una evacuación planificada, con recursos adecuados y destino confirmado.",
      "shortFeedback": "Respuesta adecuada. No basta con sacar a la gente: hay que asegurar cómo, en qué orden y a dónde.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "evacuacion-centro-mayores-coordinada"
      ]
    },
    {
      "id": "b",
      "text": "Pedir a los familiares que acudan al centro cuanto antes para recoger a cada residente y aliviar la carga de los servicios de emergencia.",
      "evaluation": "critical",
      "severity": "critical",
      "rationale": "Puede parecer práctico, pero suele generar más caos: tráfico, accesos bloqueados, familias expuestas al riesgo y residentes saliendo sin control sanitario ni registro claro.",
      "shortFeedback": "Respuesta incorrecta. La llegada desordenada de familiares puede agravar la emergencia.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "familiares-acuden-centro-mayores"
      ]
    },
    {
      "id": "c",
      "text": "Coordinar con la dirección del centro un censo urgente de residentes, necesidades médicas, movilidad, medicación y personal disponible, mientras se prepara una posible evacuación o confinamiento seguro según evolucione el incendio.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "El censo operativo permite decidir con más precisión y evitar olvidos graves antes de mover a personas vulnerables.",
      "shortFeedback": "Respuesta adecuada. Antes de mover a personas vulnerables, hay que saber quién necesita qué.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "censo-centro-mayores"
      ]
    },
    {
      "id": "d",
      "text": "Esperar hasta que el fuego esté más cerca para no alarmar a los residentes ni movilizar recursos antes de tiempo.",
      "evaluation": "critical",
      "severity": "critical",
      "rationale": "En población vulnerable, esperar demasiado reduce el margen de maniobra.",
      "shortFeedback": "Respuesta incorrecta. La calma no se consigue mirando el reloj: se consigue preparando bien la respuesta.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "espera-centro-mayores"
      ]
    },
    {
      "id": "e",
      "text": "Trasladar primero al personal del centro y dejar que los residentes esperen dentro hasta que lleguen más medios.",
      "evaluation": "critical",
      "severity": "critical",
      "rationale": "El personal es clave para mantener la atención, la medicación, la información clínica y la tranquilidad de los residentes.",
      "shortFeedback": "Respuesta incorrecta. Retirar al personal sin plan deja al centro en una situación crítica.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": [
        "personal-centro-retirado"
      ]
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La evacuación de personas vulnerables requiere planificación previa, recursos adecuados, priorización sanitaria y destino seguro.",
    "En centros sociosanitarios, debe evitarse la llegada desordenada de familiares y mantenerse una comunicación clara por canales oficiales.",
    "Renumerado desde id provisional s-013-centro-mayores-riesgo para evitar duplicidad con proteccion-civil/s-013-centro-mayores-riesgo."
  ]
};
