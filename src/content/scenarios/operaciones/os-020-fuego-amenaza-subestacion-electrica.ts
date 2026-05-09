import type { Scenario } from '../../../domain/types/scenario.js';

export const os020FuegoAmenazaSubestacionElectrica: Scenario = {
  "id": "s-020-fuego-amenaza-subestacion-electrica",
  "title": "El fuego amenaza una subestación eléctrica",
  "category": "operaciones",
  "phase": "crisis",
  "block": "infraestructuras-criticas",
  "difficulty": "alta",
  "estimatedTime": "2 min",
  "tags": [
    "subestacion-electrica",
    "infraestructuras-criticas",
    "apagones",
    "proteccion-civil",
    "servicios-esenciales",
    "evacuacion",
    "coordinacion"
  ],
  "status": "available",
  "context": "El incendio se aproxima a una subestación eléctrica que abastece a varios núcleos de población y servicios esenciales.",
  "question": "¿Cómo gestionas la amenaza sobre una infraestructura crítica sin descuidar la protección de la población?",
  "briefing": "El frente avanza hacia una subestación eléctrica situada cerca de una zona forestal. La instalación abastece a varios núcleos, un centro de salud, sistemas de bombeo de agua y comunicaciones municipales. Los técnicos de la compañía eléctrica solicitan apoyo para proteger el perímetro y facilitar una intervención preventiva. Sin embargo, los medios de extinción también están siendo necesarios en otro flanco, donde hay viviendas dispersas y varias personas pendientes de una posible evacuación. La decisión es delicada: proteger la subestación puede evitar un apagón que agrave toda la emergencia, pero desviar demasiados recursos podría debilitar la defensa de zonas habitadas. La prioridad es equilibrar la protección de la población con la defensa de servicios esenciales, sin perder de vista que las personas siguen siendo el criterio principal de decisión.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Mantener como prioridad la protección de la población y destinar recursos proporcionados a la subestación solo si no comprometen la defensa de viviendas, evacuaciones o zonas con personas en riesgo.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. La infraestructura es importante porque sostiene servicios esenciales, pero no puede desplazar la protección directa de la población. La clave está en equilibrar, no en elegir a ciegas.",
      "shortFeedback": "Respuesta adecuada. La infraestructura es importante porque sostiene servicios esenciales, pero no puede desplazar la protección directa de la población. La clave está en equilibrar, no en elegir a ciegas.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Retirar medios del flanco con viviendas para concentrarlos en la defensa de la subestación, ya que un apagón afectaría a más personas.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Aunque la subestación sea crítica, abandonar un flanco con población expuesta puede generar un riesgo inmediato mayor. No se protege a la gente dejando a la gente desprotegida.",
      "shortFeedback": "Respuesta incorrecta. Aunque la subestación sea crítica, abandonar un flanco con población expuesta puede generar un riesgo inmediato mayor. No se protege a la gente dejando a la gente desprotegida.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Coordinar con la compañía eléctrica, Protección Civil y el puesto de mando una defensa técnica de la instalación, evaluando accesos, riesgos eléctricos, cortes preventivos y recursos mínimos necesarios para reducir el impacto sin desatender otros frentes.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Las infraestructuras críticas requieren coordinación especializada. No basta con mandar medios: hay que saber qué riesgos hay, qué se puede cortar, qué se puede proteger y qué impacto tendría cada decisión.",
      "shortFeedback": "Respuesta adecuada. Las infraestructuras críticas requieren coordinación especializada. No basta con mandar medios: hay que saber qué riesgos hay, qué se puede cortar, qué se puede proteger y qué impacto tendría cada decisión.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Ignorar la amenaza sobre la subestación porque las infraestructuras materiales siempre pueden repararse después del incendio.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Algunas infraestructuras sostienen servicios básicos. Si fallan, pueden agravar la emergencia: menos comunicaciones, menos agua, más personas vulnerables en riesgo y más caos operativo.",
      "shortFeedback": "Respuesta incorrecta. Algunas infraestructuras sostienen servicios básicos. Si fallan, pueden agravar la emergencia: menos comunicaciones, menos agua, más personas vulnerables en riesgo y más caos operativo.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Permitir que los técnicos de la compañía entren solos en la zona para proteger la instalación mientras los medios de emergencia siguen en otros frentes.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Los técnicos conocen la instalación, pero no deben operar solos en una zona amenazada por fuego, humo o cambios de viento. La especialización no convierte a nadie en ignífugo, por mucho casco que lleve.",
      "shortFeedback": "Respuesta incorrecta. Los técnicos conocen la instalación, pero no deben operar solos en una zona amenazada por fuego, humo o cambios de viento. La especialización no convierte a nadie en ignífugo, por mucho casco que lleve.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "Las infraestructuras críticas deben protegerse cuando su fallo pueda agravar la emergencia o afectar a servicios esenciales.",
    "La protección de infraestructuras no debe comprometer la prioridad principal: la seguridad de la población y de los equipos de intervención."
  ]
};
