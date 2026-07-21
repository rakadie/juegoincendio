import type { Scenario } from '../../../domain/types/scenario.js';

export const ps039UsoMaquinariaEpocaRiesgo: Scenario = {
  "id": "s-039-uso-maquinaria-epoca-riesgo",
  "title": "Uso de maquinaria en época de riesgo",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion-y-autoproteccion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion",
    "maquinaria",
    "desbroce",
    "radial",
    "chispas",
    "alerta-oficial",
    "calor",
    "viento",
    "autoproteccion"
  ],
  "status": "available",
  "context": "Antes de la época de mayor riesgo de incendios, estás visitando varios municipios para hablar con vecinos y responsables municipales sobre prevención. Durante una charla, un vecino comenta que necesita usar maquinaria en su terreno cuando le haga falta, aunque haga calor intenso. Dice que siempre tiene cuidado y que, si pasa algo, tiene una manguera cerca.",
  "question": "¿Qué le indicas sobre el uso de maquinaria en terrenos próximos al monte?",
  "briefing": "El uso de maquinaria puede provocar igniciones, especialmente en días de calor, viento, baja humedad o presencia de vegetación seca. Herramientas como radiales, desbrozadoras, motosierras o maquinaria agrícola pueden generar chispas, contacto caliente o fricción suficiente para iniciar un fuego. La recomendación debe ser clara: evitar trabajos de riesgo en horas de calor, no usar maquinaria si hay alerta oficial o restricciones activas, preparar previamente la zona, humedecer el entorno si procede y contar con medios de primera intervención, como agua o extintor. Tener cuidado es importante, pero no basta. En prevención de incendios, el “yo controlo” es una frase muy peligrosa cuando hay viento, rastrojo seco y una radial con complejo de dragón.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Puede cortar con una radial en el jardín cuando lo necesite, siempre que esté atento.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La radial puede generar chispas capaces de prender vegetación seca o restos combustibles. Estar atento ayuda, pero no elimina el riesgo si se trabaja con calor, viento o material seco cerca.",
      "shortFeedback": "Respuesta incorrecta. La radial puede generar chispas capaces de prender vegetación seca o restos combustibles. Estar atento ayuda, pero no elimina el riesgo si se trabaja con calor, viento o material seco cerca.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Puede cortar con una radial en un patio solo si evita las horas de calor, despeja el entorno, humedece la zona si procede y tiene agua o extintor preparado.",
      "evaluation": "acceptable",
      "severity": "medium",
      "rationale": "Respuesta aceptable con matices. Un patio puede reducir parte del riesgo si no hay vegetaci?n ni materiales combustibles cerca, pero no autoriza el trabajo si hay alerta, viento o restricciones activas.",
      "shortFeedback": "Respuesta aceptable con matices. Un patio puede reducir parte del riesgo si no hay vegetaci?n ni materiales combustibles cerca, pero no autoriza el trabajo si hay alerta, viento o restricciones activas.",
      "impacts": [
        {
          "variableKey": "cumplimientoPreventivo",
          "delta": 2
        }
      ],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Puede desbrozar lo que quiera mientras sea en su terreno.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Que el terreno sea suyo no cambia las condiciones de riesgo. Una desbrozadora puede provocar igniciones por contacto con piedras, metal, material seco o por calentamiento de la maquinaria.",
      "shortFeedback": "Respuesta incorrecta. Que el terreno sea suyo no cambia las condiciones de riesgo. Una desbrozadora puede provocar igniciones por contacto con piedras, metal, material seco o por calentamiento de la maquinaria.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Puede realizar trabajos de desbroce solo con medidas preventivas estrictas: evitar horas de calor, trabajar preferentemente de madrugada o primera hora, humedecer previamente la zona si es posible, tener agua o extintor a mano y no hacerlo nunca si existe alerta oficial, prohibición o condiciones meteorológicas desfavorables.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. La manguera ayuda, pero no es suficiente por sí sola. La prevención real combina horario seguro, reducción de material seco, humedad previa, medios de primera respuesta y respeto absoluto a alertas o restricciones oficiales.",
      "shortFeedback": "Respuesta adecuada. La manguera ayuda, pero no es suficiente por sí sola. La prevención real combina horario seguro, reducción de material seco, humedad previa, medios de primera respuesta y respeto absoluto a alertas o restricciones oficiales.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Puede usar maquinaria en cualquier momento si ya ha limpiado la finca anteriormente.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Haber limpiado la finca reduce combustible, pero no autoriza trabajos de riesgo en cualquier condición. Con calor, viento o alerta activa, una chispa puede encontrar combustible incluso en zonas aparentemente controladas.",
      "shortFeedback": "Respuesta incorrecta. Haber limpiado la finca reduce combustible, pero no autoriza trabajos de riesgo en cualquier condición. Con calor, viento o alerta activa, una chispa puede encontrar combustible incluso en zonas aparentemente controladas.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "El uso de maquinaria en zonas próximas al monte puede generar chispas, fricción o calor suficiente para iniciar un incendio si hay vegetación seca.",
    "Las medidas preventivas deben combinar horario de menor riesgo, humedecimiento previo si procede, medios de primera intervención y respeto a alertas o restricciones oficiales.",
    "Tener una manguera cerca reduce el riesgo, pero no sustituye la planificación ni autoriza trabajos peligrosos en condiciones meteorológicas desfavorables."
  ]
};
