import type { Scenario } from '../../../domain/types/scenario.js';

export const ps036DefensaPasivaVivienda: Scenario = {
  "id": "s-036-defensa-pasiva-vivienda",
  "title": "Defensa pasiva de la vivienda",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion-y-autoproteccion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion",
    "autoproteccion",
    "vivienda",
    "defensa-pasiva",
    "pavesas",
    "tejados",
    "canalones",
    "mallas-matachispas",
    "ventilacion",
    "porches"
  ],
  "status": "available",
  "context": "Antes de la época de mayor riesgo de incendios, estás realizando sesiones informativas con vecinos de municipios próximos al monte. Tras hablar de limpieza exterior y franjas de seguridad, surge una cuestión importante: muchas viviendas tienen tejados, canalones, chimeneas, respiraderos, porches o huecos donde pueden entrar pavesas o acumularse hojas secas.",
  "question": "¿Qué medidas recomiendas para preparar la vivienda frente a la entrada de pavesas?",
  "briefing": "En un incendio forestal, una vivienda no solo puede verse amenazada por el frente de llamas. Las pavesas pueden viajar con el viento y caer sobre tejados, canalones, terrazas, porches o conductos de ventilación. Si encuentran hojas secas, agujas de pino, restos vegetales o huecos por los que entrar, pueden iniciar un foco pequeño que acabe afectando a toda la casa. Por eso, la defensa pasiva de la vivienda es una parte clave de la prevención. La recomendación debe centrarse en reducir puntos vulnerables: limpiar tejados y canalones, colocar mallas matachispas en chimeneas y rejillas metálicas de trama fina en conductos de ventilación, y sellar huecos bajo porches, terrazas o tejados donde pueda acumularse material inflamable o entrar aire caliente. Estas medidas deben realizarse antes de la emergencia. Cuando el incendio ya está cerca, la prioridad es seguir las instrucciones oficiales de evacuación o confinamiento, no subirse al tejado a pelearse con un canalón.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Recomendar la limpieza periódica de tejados, canalones, terrazas y rincones donde puedan acumularse hojas secas, agujas de pino o restos vegetales que puedan prender con una pavesa.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Las pavesas pueden iniciar focos pequeños en materiales muy secos. Un canalón lleno de hojas no es decoración otoñal: es combustible esperando turno.",
      "shortFeedback": "Respuesta adecuada. Las pavesas pueden iniciar focos pequeños en materiales muy secos. Un canalón lleno de hojas no es decoración otoñal: es combustible esperando turno.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Centrar la prevención únicamente en regar el tejado cuando se vea humo cerca de la vivienda.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Mojar puede ayudar en circunstancias muy concretas, pero no sustituye la limpieza previa ni elimina los puntos vulnerables. La prevención no debería empezar cuando el humo ya está llamando al timbre.",
      "shortFeedback": "Respuesta incorrecta. Mojar puede ayudar en circunstancias muy concretas, pero no sustituye la limpieza previa ni elimina los puntos vulnerables. La prevención no debería empezar cuando el humo ya está llamando al timbre.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Instalar mallas matachispas o rejillas metálicas de trama fina en chimeneas, respiraderos y conductos de ventilación, además de sellar huecos bajo porches, terrazas o tejados donde puedan entrar pavesas o acumularse materiales inflamables.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. La defensa pasiva busca impedir que una pavesa encuentre entrada o combustible. Proteger huecos y ventilaciones reduce el riesgo de ignición dentro o junto a la vivienda.",
      "shortFeedback": "Respuesta adecuada. La defensa pasiva busca impedir que una pavesa encuentre entrada o combustible. Proteger huecos y ventilaciones reduce el riesgo de ignición dentro o junto a la vivienda.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Dejar abiertos respiraderos, huecos y accesos bajo porches para que circule mejor el aire y se reduzca el calor acumulado.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. En un incendio, esos huecos pueden permitir la entrada de pavesas, humo o aire caliente. La ventilación sin protección puede convertirse en una puerta de entrada al problema.",
      "shortFeedback": "Respuesta incorrecta. En un incendio, esos huecos pueden permitir la entrada de pavesas, humo o aire caliente. La ventilación sin protección puede convertirse en una puerta de entrada al problema.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Guardar leña, cartones o herramientas bajo porches y terrazas para que no estén expuestos al viento durante la época de riesgo.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Bajo porches y terrazas no deben acumularse materiales inflamables. Protegerlos del viento no sirve de mucho si se convierten en el combustible perfecto pegado a la casa.",
      "shortFeedback": "Respuesta incorrecta. Bajo porches y terrazas no deben acumularse materiales inflamables. Protegerlos del viento no sirve de mucho si se convierten en el combustible perfecto pegado a la casa.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La defensa pasiva de la vivienda busca reducir puntos vulnerables frente a pavesas, calor y entrada de aire caliente.",
    "La limpieza de tejados, canalones y terrazas reduce la posibilidad de ignición por acumulación de hojas secas, agujas de pino o restos vegetales.",
    "Las mallas matachispas, rejillas metálicas de trama fina y el sellado de huecos ayudan a impedir que las pavesas entren en chimeneas, respiraderos, porches o cubiertas.",
    "Estas medidas deben aplicarse antes de la época de mayor riesgo; durante una emergencia la prioridad es seguir las instrucciones oficiales de evacuación o confinamiento."
  ]
};
