import type { Scenario } from '../../../domain/types/scenario.js';

export const ps038EleccionVegetacionFinca: Scenario = {
  "id": "s-038-eleccion-vegetacion-finca",
  "title": "Elección de vegetación tras limpiar la finca",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion-y-autoproteccion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion",
    "autoproteccion",
    "vegetacion",
    "finca",
    "monte",
    "verodes",
    "tabaibas",
    "bejeques",
    "cactus",
    "discontinuidad-combustible"
  ],
  "status": "available",
  "context": "Antes de la época de mayor riesgo de incendios, estás visitando varios municipios para hablar con vecinos y responsables municipales sobre medidas preventivas. En una de esas reuniones, un vecino explica que ya ha limpiado parte de su finca, situada cerca del monte, y pregunta qué plantas serían más adecuadas para replantar sin aumentar el riesgo de incendio. La cuestión no es solo estética. La vegetación que se elija puede reducir o aumentar la continuidad del combustible alrededor de la vivienda.",
  "question": "¿Qué vegetación recomiendas para replantar una finca en zona de riesgo?",
  "briefing": "Después de limpiar la finca, el vecino quiere replantar parte del terreno. Como responsable de Emergencias, debes dar una recomendación clara: evitar especies que generen mucha continuidad vegetal, acumulen material seco o formen masas densas cerca de la vivienda. Conviene priorizar vegetación de bajo porte, bien separada, mantenida y con menor carga de combustible. En Canarias, especies suculentas como verodes, tabaibas, bejeques o algunos cactus pueden ser una opción interesante si se plantan con diseño preventivo, porque no suelen generar la misma continuidad de combustible que setos densos, cañaverales o trepadoras sin control. Pero la clave no es llenar la finca de plantas “resistentes al fuego” y olvidarse. Hay que mantener separación entre ejemplares, evitar que la vegetación toque fachadas, retirar hojas secas y podas, y no crear continuidad entre el suelo, los arbustos y las copas.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Recomendar especies suculentas y de bajo porte propias o bien adaptadas al entorno, como verodes, tabaibas, bejeques o cactus, plantadas con separación, sin formar masas continuas y retirando siempre restos secos.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. No se trata de buscar plantas mágicas, sino vegetación con menor carga de combustible y bien diseñada. Separación, mantenimiento y discontinuidad son tan importantes como la especie elegida.",
      "shortFeedback": "Respuesta adecuada. No se trata de buscar plantas mágicas, sino vegetación con menor carga de combustible y bien diseñada. Separación, mantenimiento y discontinuidad son tan importantes como la especie elegida.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Replantar con bambú para crear una barrera verde densa alrededor de la finca.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. El bambú puede formar masas densas, generar continuidad vegetal y acumular material seco. Como pantalla verde queda estupendo; como estrategia contra incendios, bastante menos.",
      "shortFeedback": "Respuesta incorrecta. El bambú puede formar masas densas, generar continuidad vegetal y acumular material seco. Como pantalla verde queda estupendo; como estrategia contra incendios, bastante menos.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Combinar vegetación de bajo combustible con diseño preventivo: plantas separadas, sin tocar fachadas, sin continuidad entre matorral y copas, y con mantenimiento regular de podas y hojas secas.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. La prevención depende del diseño completo de la finca. Una planta razonable, mal colocada y sin mantenimiento, puede acabar comportándose como combustible.",
      "shortFeedback": "Respuesta adecuada. La prevención depende del diseño completo de la finca. Una planta razonable, mal colocada y sin mantenimiento, puede acabar comportándose como combustible.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Colocar palmeras, buganvillas o trepadoras densas junto a muros, porches y fachadas para dar sombra y proteger la vivienda.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Las trepadoras y vegetación densa pegada a la casa pueden conectar el fuego con muros, porches, cubiertas y ventanas. Dar sombra está bien; darle una escalera al fuego, no tanto.",
      "shortFeedback": "Respuesta incorrecta. Las trepadoras y vegetación densa pegada a la casa pueden conectar el fuego con muros, porches, cubiertas y ventanas. Dar sombra está bien; darle una escalera al fuego, no tanto.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Replantar helechos, hibiscos o matorral ornamental en masa, dejando que cubran rápido el suelo para que la finca se vea verde cuanto antes.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La vegetación densa y continua puede convertirse en combustible fino si se seca o no se mantiene. Una finca verde no siempre es una finca segura.",
      "shortFeedback": "Respuesta incorrecta. La vegetación densa y continua puede convertirse en combustible fino si se seca o no se mantiene. Una finca verde no siempre es una finca segura.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La elección de vegetación en zonas próximas al monte debe reducir la continuidad del combustible y evitar masas densas junto a viviendas.",
    "Las especies suculentas y de bajo porte pueden ser útiles si se plantan con separación, mantenimiento y retirada periódica de restos secos.",
    "El diseño preventivo de la finca debe evitar que la vegetación toque fachadas, porches, cubiertas o ventanas, y debe romper la continuidad entre suelo, arbustos y copas.",
    "No existen plantas mágicas frente al fuego: la especie, la ubicación, la separación y el mantenimiento determinan el riesgo real."
  ]
};
