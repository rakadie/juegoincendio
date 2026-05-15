import type { Scenario } from '../../../domain/types/scenario.js';

export const ps035LimpiezaAlrededorViviendas: Scenario = {
  "id": "s-035-limpieza-alrededor-viviendas",
  "title": "Limpieza alrededor de viviendas",
  "category": "prevencion",
  "phase": "prevencion",
  "block": "prevencion-y-autoproteccion",
  "difficulty": "media",
  "estimatedTime": "2 min",
  "tags": [
    "prevencion",
    "autoproteccion",
    "interfaz-urbano-forestal",
    "viviendas",
    "edificios-publicos",
    "franja-seguridad",
    "limpieza-vegetacion",
    "poda",
    "aclareo"
  ],
  "status": "available",
  "context": "Antes de que llegue la época de mayor riesgo de incendios, estás visitando varios municipios para hablar con vecinos y responsables municipales sobre medidas preventivas. En las reuniones se detecta una preocupación común: muchas viviendas, edificios públicos y parcelas próximas al monte tienen vegetación seca, restos de poda, leña, muebles exteriores o materiales inflamables demasiado cerca de fachadas, ventanas, tejados y accesos. También hay zonas con árboles sin aclarar, copas que se tocan entre sí y ramas bajas que pueden facilitar que el fuego suba desde el suelo hasta las copas. Como responsable de Emergencias, debes dar una recomendación clara, sencilla y aplicable antes de que empiece la fase de mayor riesgo.",
  "question": "¿Qué instrucciones das sobre la limpieza mínima alrededor de viviendas y edificios públicos?",
  "briefing": "La prevención empieza antes de que haya humo en el horizonte. En las zonas de interfaz urbano-forestal, la limpieza del entorno de viviendas y edificios públicos puede reducir el riesgo de ignición, facilitar el trabajo de los equipos de emergencia y mejorar las posibilidades de defensa si se produce un incendio. Durante las visitas municipales, explicas que el peligro no viene solo del frente de llamas. Las pavesas, el calor radiante y la continuidad de la vegetación pueden hacer que una vivienda arda aunque la llama no llegue directamente a tocarla. La recomendación debe ser concreta: establecer una franja mínima de seguridad, retirar materiales inflamables próximos a la edificación, mantener accesos despejados y reducir la continuidad del combustible tanto en el suelo como en la vegetación alta. También es importante dejar claro que estas tareas deben hacerse antes de la época de mayor riesgo. Cuando el incendio ya está cerca, la prioridad no es limpiar, podar ni improvisar defensas, sino seguir las instrucciones de evacuación o confinamiento de los servicios de emergencia.",
  "requirements": null,
  "options": [
    {
      "id": "a",
      "text": "Recomendar una franja mínima de limpieza de al menos 15 metros y, siempre que sea posible, ampliarla hasta 30 metros alrededor de viviendas y edificios públicos, retirando matorral seco, restos vegetales, leña, muebles exteriores y otros materiales inflamables próximos a fachadas, ventanas, tejados y accesos.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. Una franja de seguridad de al menos 15 metros, ampliable hasta 30 cuando el terreno lo permita, reduce la carga de combustible cerca de la edificación y facilita la defensa si se produce un incendio. No hace milagros, pero evita ponerle una alfombra roja al fuego.",
      "shortFeedback": "Respuesta adecuada. Una franja de seguridad de al menos 15 metros, ampliable hasta 30 cuando el terreno lo permita, reduce la carga de combustible cerca de la edificación y facilita la defensa si se produce un incendio. No hace milagros, pero evita ponerle una alfombra roja al fuego.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "b",
      "text": "Limitar la limpieza a los dos o tres metros más próximos a la fachada, porque es la única zona que realmente puede afectar a la vivienda.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Limpiar solo el borde inmediato de la casa es insuficiente en zona de interfaz urbano-forestal. El fuego, las pavesas y el calor radiante no se detienen en la jardinera.",
      "shortFeedback": "Respuesta incorrecta. Limpiar solo el borde inmediato de la casa es insuficiente en zona de interfaz urbano-forestal. El fuego, las pavesas y el calor radiante no se detienen en la jardinera.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "c",
      "text": "Además de limpiar el entorno, recomendar el aclareo y poda de árboles: separar las copas unos tres metros entre sí y cortar las ramas bajas hasta unos tres metros de altura para reducir la continuidad del fuego entre el suelo y las copas.",
      "evaluation": "recommended",
      "severity": "medium",
      "rationale": "Respuesta adecuada. No basta con retirar combustible del suelo. Si las copas se tocan o las ramas bajas conectan con el matorral, el fuego puede subir y avanzar por las alturas con mucha más intensidad.",
      "shortFeedback": "Respuesta adecuada. No basta con retirar combustible del suelo. Si las copas se tocan o las ramas bajas conectan con el matorral, el fuego puede subir y avanzar por las alturas con mucha más intensidad.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "d",
      "text": "Recomendar que la limpieza se haga solo cuando haya aviso de incendio cercano, para evitar trabajos innecesarios durante el resto del año.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. La limpieza debe hacerse antes de la emergencia. Cuando el frente está cerca, ponerse a podar o retirar leña no es prevención: es tentar a la estadística con una desbrozadora.",
      "shortFeedback": "Respuesta incorrecta. La limpieza debe hacerse antes de la emergencia. Cuando el frente está cerca, ponerse a podar o retirar leña no es prevención: es tentar a la estadística con una desbrozadora.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    },
    {
      "id": "e",
      "text": "Centrar la recomendación únicamente en mojar la vegetación cercana a las viviendas cuando se vea humo en la zona.",
      "evaluation": "risky",
      "severity": "high",
      "rationale": "Respuesta incorrecta. Mojar puede ayudar puntualmente si hay tiempo y agua, pero no sustituye la gestión del combustible. La defensa empieza mucho antes: limpiar, separar, podar y retirar materiales inflamables.",
      "shortFeedback": "Respuesta incorrecta. Mojar puede ayudar puntualmente si hay tiempo y agua, pero no sustituye la gestión del combustible. La defensa empieza mucho antes: limpiar, separar, podar y retirar materiales inflamables.",
      "impacts": [],
      "mediaOutputs": [],
      "flags": []
    }
  ],
  "unlocks": [],
  "sourceNotes": [
    "La limpieza preventiva alrededor de viviendas y edificios públicos reduce la carga de combustible y facilita la defensa en zonas de interfaz urbano-forestal.",
    "La recomendación operativa combina una franja mínima de limpieza de al menos 15 metros, ampliable hasta 30 metros cuando sea posible, con retirada de materiales inflamables próximos a la edificación.",
    "La separación entre copas y la poda de ramas bajas ayudan a reducir la continuidad del combustible y dificultan que el fuego pase del suelo a las copas.",
    "Estas tareas deben realizarse antes de la época de mayor riesgo; durante una emergencia la prioridad es seguir las instrucciones oficiales de evacuación o confinamiento."
  ]
};
