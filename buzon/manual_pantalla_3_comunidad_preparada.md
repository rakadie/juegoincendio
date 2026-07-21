# Manual de diseño — Pantalla 3: Comunidad preparada

## 1. Idea general

La **Pantalla 3** cierra la fase preventiva del newsgame. Después de revisar viviendas, fincas, vegetación, caminos y combustible, esta pantalla se centra en la parte más humana de la prevención:

> ¿Sabe la población qué hacer antes de que suene la sirena?

La prevención no es solo limpiar el territorio. También es que una familia sepa qué llevar, por dónde salir, cómo cerrar su vivienda, cuándo confinarse, dónde informarse, qué hacer con sus mascotas y cómo identificar a quienes necesitarán apoyo si hay que evacuar.

Esta pantalla prepara a la comunidad antes de que empiece el incendio.

---

## 2. Función narrativa dentro del juego

La fase preventiva queda ordenada así:

```txt
Pantalla 1 — Viviendas y edificios en interfaz
Pantalla 2 — Fincas, vegetación y gestión del combustible
Pantalla 3 — Comunidad preparada
```

La Pantalla 3 prepara la transición hacia la crisis.

Si la jugadora lo hace bien, el municipio entra en la emergencia con:

- familias mejor preparadas;
- menos llamadas innecesarias al 112;
- canales oficiales más claros;
- población vulnerable mejor identificada;
- turistas y senderistas mejor informados;
- evacuación con mascotas prevista;
- edificios públicos con función definida.

Si lo hace mal, la crisis empezará con más improvisación, rumores, dudas y retrasos.

---

## 3. Crítica constructiva de diseño

Esta pantalla puede ser muy potente, pero también tiene un riesgo: puede convertirse en una lista administrativa.

Para evitarlo, cada punto debe presentarse como una **microhistoria humana**.

No basta con decir:

> “Preparar canales oficiales”.

Es mejor mostrar la situación:

> En las reuniones vecinales, varias personas preguntan si deben mirar redes sociales, llamar al 112, esperar al ayuntamiento o fiarse de los grupos de WhatsApp.

La diferencia es importante. La primera suena a trámite. La segunda suena a crisis esperando turno.

---

## 4. Nombre de la pantalla

**Pantalla 3 — Comunidad preparada**

---

## 5. Frase de entrada

> La prevención también se juega en lo que la gente sabe antes de que suene la sirena.

---

## 6. Contexto narrativo

Antes de que llegue la época de mayor riesgo, continúas las visitas municipales. Tras revisar viviendas, fincas y zonas de combustible, ahora toca hablar con la población: familias, asociaciones vecinales, responsables municipales, alojamientos turísticos y personal de edificios públicos.

No hay incendio todavía, pero ya aparecen dudas: qué llevar si hay evacuación, por dónde salir, qué hacer con la vivienda antes de marcharse, cómo actuar si se ordena confinamiento, dónde informarse, qué ocurre con mascotas y cómo identificar a personas que necesitarán apoyo si hay que evacuar.

El ayuntamiento quiere preparar mejor a la comunidad, pero no puede lanzar todas las acciones a la vez. Debes elegir qué medidas priorizar para que, cuando llegue la emergencia, la población no dependa de rumores ni de improvisaciones.

---

## 7. Objetivo de la pantalla

Preparar a la población para actuar con rapidez, calma y seguridad en caso de incendio forestal.

La jugadora debe elegir **4 actuaciones preventivas** entre **7 puntos vulnerables**.

```js
maxActions: 4
```

---

## 8. Imagen sugerida

La imagen debería mostrar una escena de municipio o barrio rural próximo al monte, con:

- plaza o ayuntamiento;
- centro social o polideportivo;
- familia en una vivienda;
- mochila de emergencia;
- panel informativo;
- parada o punto de encuentro;
- personas mayores o familias sin coche;
- alojamientos rurales;
- sendero o zona recreativa;
- mascota con transportín o correa;
- cartelería de canales oficiales.

El estilo debe ser claro y humano. Menos “mapa técnico” y más “comunidad antes de la emergencia”.

---

## 9. Puntos vulnerables finales

```txt
1. Familias sin mochila de emergencia
2. Hogares sin plan de evacuación, confinamiento ni punto de encuentro
3. Canales oficiales poco claros
4. Edificio público sin protocolo de uso
5. Turistas o senderistas sin información preventiva
6. Mascotas sin previsión en la evacuación
7. Personas vulnerables o sin apoyo sin identificar
```

---

# Punto 1 — Familias sin mochila de emergencia

## Microhistoria

Varias familias reconocen que no tienen preparada ninguna mochila básica. Si se ordena evacuar, tendrían que buscar documentación, medicinas, cargadores, linterna o agua en el último momento.

En una evacuación con poco margen, esos minutos pueden marcar la diferencia entre una salida ordenada y una carrera por la casa buscando el DNI, las pastillas o el cargador que desapareció misteriosamente en 2021.

## Acción posible

**Preparar mochila de emergencia**

Difundir una guía de mochila básica familiar con:

- documentación;
- medicación necesaria;
- cargadores;
- linterna;
- radio con pilas;
- agua;
- elementos esenciales para menores, mayores o personas dependientes si procede.

## Impacto sugerido

```js
impact: {
  preparacionFamiliar: 4,
  poblacionProtegida: 3,
  confusionPublica: -2,
  riesgoAtrapamiento: -2
}
```

## Feedback si se elige

> Buena decisión. Una mochila no apaga incendios, pero evita perder minutos valiosos buscando papeles, pastillas o el cargador que siempre se esconde cuando huele la tragedia.

## Consecuencia si se ignora

```js
flagIfIgnored: 'familiasSinMochila'
```

Texto futuro:

> Cuando se ordena la evacuación, varias familias pierden tiempo buscando documentación, medicinas, cargadores o linternas. La salida se retrasa.

---

# Punto 2 — Hogares sin plan de evacuación, confinamiento ni punto de encuentro

## Microhistoria

Varias familias no tienen claro qué hacer si el fuego se acerca. Algunas no saben por dónde salir si se ordena evacuar, otras no han acordado punto de encuentro y muchas dudan sobre cómo dejar la vivienda antes de marcharse.

También hay vecinos que no saben qué hacer si la evacuación ya no es segura y se ordena confinamiento.

En una emergencia real, esos minutos de duda pueden convertirse en retrasos, llamadas innecesarias, salidas improvisadas o exposiciones peligrosas al humo y al calor.

## Acción posible

**Difundir plan de evacuación y confinamiento**

Preparar instrucciones claras sobre rutas oficiales, punto de encuentro, cierre básico de la vivienda si se evacúa y medidas de protección si se ordena confinamiento.

## Ver detalles

Este punto debe tener un botón tipo **“Ver detalles”**, porque contiene mucha información útil pero no debe saturar la tarjeta principal.

### Si se ordena evacuar

- Seguir rutas oficiales.
- Llevar solo lo esencial.
- Cerrar puertas y ventanas antes de salir.
- Bajar persianas si no retrasa la salida.
- Cerrar llaves de gas o combustibles si puede hacerse con seguridad.
- Dejar accesos despejados.
- No bloquear calles ni caminos.
- Acordar un punto de encuentro familiar fuera de la zona de riesgo.
- Prever qué hacer si la familia está separada.

### Si se ordena confinarse

- Permanecer dentro de la vivienda o edificio indicado.
- Cerrar puertas, ventanas, persianas y entradas de aire.
- Tapar rendijas con paños húmedos si entra humo.
- Alejarse de ventanas y fachadas expuestas.
- Tener agua, medicación, linterna, radio con pilas y teléfono cargado.
- No salir al exterior para mojar, mirar o grabar.
- Esperar instrucciones oficiales.

## Impacto sugerido

```js
impact: {
  preparacionFamiliar: 5,
  poblacionProtegida: 5,
  confusionPublica: -4,
  riesgoAtrapamiento: -4,
  exposicionHumoCalor: -3,
  coordinacionOperativa: 2
}
```

## Feedback si se elige

> Buena decisión. La población necesita saber dos cosas antes de que llegue el humo: cómo salir si hay evacuación y cómo protegerse si toca confinamiento. Improvisar bajo presión es una pésima app de emergencias.

## Consecuencia si se ignora

```js
flagIfIgnored: 'hogaresSinPlanEvacuacionConfinamiento'
```

Texto futuro:

> Cuando el fuego se aproxima, varias familias dudan si salir, quedarse, cerrar la vivienda o esperar nuevas instrucciones. Aumentan las llamadas al 112 y aparecen salidas improvisadas por rutas poco seguras.

---

# Punto 3 — Canales oficiales poco claros

## Microhistoria

En algunas reuniones, los vecinos preguntan dónde deben mirar si hay incendio: redes sociales, ayuntamiento, radio, grupos de WhatsApp, 112, medios de comunicación… La falta de un canal claro puede multiplicar rumores y llamadas innecesarias.

Si no se define antes dónde consultar información fiable, el vacío lo llenarán capturas de pantalla, audios reenviados y mensajes con mucho dramatismo y poca verificación.

## Acción posible

**Definir canales oficiales**

Definir y comunicar canales oficiales:

- web municipal;
- redes institucionales;
- radio;
- medios de comunicación;
- avisos del ayuntamiento;
- mensajes de Protección Civil;
- recordatorio de que el 112 debe reservarse para emergencias reales.

## Impacto sugerido

```js
impact: {
  confianzaVecinal: 4,
  confusionPublica: -5,
  saturacion112: -4,
  coordinacionOperativa: 3
}
```

## Feedback si se elige

> Buena decisión. En una crisis, el silencio no deja calma: deja sitio a capturas de pantalla, audios reenviados y teorías con mucha seguridad y poca gasolina factual.

## Consecuencia si se ignora

```js
flagIfIgnored: 'canalesOficialesPocoClaros'
```

Texto futuro:

> Al hacerse visible el humo, crecen los mensajes contradictorios y las llamadas de dudas generales. El 112 empieza a saturarse con preguntas que podrían haberse resuelto por canales oficiales claros.

---

# Punto 4 — Edificio público sin protocolo de uso

## Microhistoria

El centro social o polideportivo del municipio podría servir como punto de información, apoyo o acogida temporal, pero nadie ha definido responsables, accesos, suministros, comunicación o condiciones de uso.

Un edificio público no se convierte en punto útil por existir. Necesita saber para qué sirve, quién lo abre, quién informa, qué recursos tiene y cuándo debe activarse.

## Acción posible

**Preparar protocolo de edificio público**

Preparar un protocolo para edificios públicos:

- uso previsto;
- responsables;
- accesos;
- comunicación;
- agua;
- luz;
- botiquín;
- punto informativo;
- coordinación con Protección Civil;
- criterios de apertura y cierre.

## Impacto sugerido

```js
impact: {
  coordinacionOperativa: 4,
  poblacionProtegida: 3,
  confianzaVecinal: 3,
  confusionPublica: -2
}
```

## Feedback si se elige

> Buena decisión. Un edificio público no se convierte en punto de apoyo por tener paredes y una llave. Necesita protocolo, responsables y una función clara.

## Consecuencia si se ignora

```js
flagIfIgnored: 'edificioPublicoSinProtocolo'
```

Texto futuro:

> Durante la emergencia, se plantea usar el edificio público como punto de apoyo, pero no hay responsables definidos ni protocolo claro. La improvisación retrasa la respuesta.

---

# Punto 5 — Turistas o senderistas sin información preventiva

## Microhistoria

El municipio tiene alojamientos rurales, senderos y zonas recreativas. Muchas personas visitantes no conocen el terreno, no siguen canales locales y pueden no entender avisos o restricciones.

En caso de humo o cambio de viento, pueden intentar salir por intuición, seguir una ruta inadecuada o quedar fuera de los avisos municipales.

## Acción posible

**Informar a turistas y senderistas**

Crear información preventiva para turistas y senderistas:

- cartelería en senderos;
- avisos en alojamientos;
- códigos QR;
- rutas cerradas en días de riesgo;
- recomendaciones multilingües;
- coordinación con guías y turismo municipal;
- información en zonas recreativas.

## Impacto sugerido

```js
impact: {
  poblacionProtegida: 4,
  riesgoAtrapamiento: -3,
  confusionPublica: -2,
  coordinacionOperativa: 3
}
```

## Feedback si se elige

> Buena decisión. Quien está de paso no tiene por qué conocer el monte, los vientos ni las salidas. La prevención también consiste en traducir el riesgo antes de que alguien se pierda entre humo y roaming.

## Consecuencia si se ignora

```js
flagIfIgnored: 'turistasSenderistasSinInformacion'
```

Texto futuro:

> Cuando cambia el viento, un grupo de senderistas no sabe qué ruta tomar ni dónde consultar avisos. La localización y rescate se complican.

---

# Punto 6 — Mascotas sin previsión en la evacuación

## Microhistoria

Varias familias preguntan qué ocurriría con sus animales si se ordena evacuar. Algunas personas reconocen que no saldrían de casa si no pueden llevarse a sus mascotas.

En muchas evacuaciones, los animales domésticos no son un detalle secundario: pueden ser el motivo por el que una familia retrasa la salida.

## Acción posible

**Preparar evacuación con mascotas**

Preparar pautas de evacuación con mascotas:

- transportines;
- correas;
- identificación;
- cartilla o documentación si procede;
- punto de acogida diferenciado;
- comunicación clara;
- coordinación con albergues o entidades de protección animal;
- instrucciones para no soltar animales en una evacuación.

## Impacto sugerido

```js
impact: {
  poblacionProtegida: 3,
  confianzaVecinal: 4,
  confusionPublica: -2,
  riesgoAtrapamiento: -3
}
```

## Feedback si se elige

> Buena decisión. Para muchas familias, el perro, el gato o los animales domésticos no son un detalle logístico: son la razón por la que podrían negarse a evacuar.

## Consecuencia si se ignora

```js
flagIfIgnored: 'mascotasSinPrevision'
```

Texto futuro:

> Al ordenarse la evacuación, varias personas se resisten a salir porque no saben si podrán llevarse a sus mascotas. La evacuación se ralentiza.

---

# Punto 7 — Personas vulnerables o sin apoyo sin identificar

## Microhistoria

En la zona hay personas que podrían necesitar ayuda si se ordena evacuar: mayores que viven solas, personas con movilidad reducida, familias sin vehículo o vecinos sin red cercana. El municipio no tiene claro cómo localizarlas a tiempo.

Si no se identifican antes, aparecerán tarde en la emergencia: cuando las llamadas se acumulen, las rutas estén más comprometidas y el margen de actuación sea menor.

## Acción posible

**Registrar personas que necesitan apoyo**

Crear un registro preventivo y voluntario de personas que pueden necesitar apoyo, coordinado con servicios sociales, Protección Civil y ayuntamiento, con protocolo de aviso puerta a puerta si fallan las comunicaciones.

## Impacto sugerido

```js
impact: {
  poblacionProtegida: 5,
  inclusionVulnerables: 5,
  riesgoAtrapamiento: -4,
  coordinacionOperativa: 4,
  confusionPublica: -2
}
```

## Feedback si se elige

> Buena decisión. Una evacuación no puede depender solo de tener coche, batería y familia cerca. Las personas que necesitan apoyo no deberían aparecer en el radar cuando ya hay humo en la calle.

## Consecuencia si se ignora

```js
flagIfIgnored: 'personasVulnerablesSinRegistro'
```

Texto futuro:

> Durante la evacuación, el ayuntamiento detecta tarde que varias personas no tienen coche, apoyo familiar o movilidad suficiente para salir por su cuenta.

---

## 10. Acciones disponibles

La interfaz podría mostrar estas siete tarjetas:

```txt
1. Preparar mochila de emergencia
2. Difundir plan de evacuación y confinamiento
3. Definir canales oficiales
4. Preparar protocolo de edificio público
5. Informar a turistas y senderistas
6. Preparar evacuación con mascotas
7. Registrar personas que necesitan apoyo
```

La jugadora elige **4 actuaciones**.

---

## 11. Variables principales

```js
estadoPrevencion: {
  preparacionFamiliar: 0,
  poblacionProtegida: 0,
  confusionPublica: 0,
  riesgoAtrapamiento: 0,
  exposicionHumoCalor: 0,
  coordinacionOperativa: 0,
  confianzaVecinal: 0,
  saturacion112: 0,
  inclusionVulnerables: 0
}
```

En la interfaz no hace falta mostrar todas. Pueden traducirse a barras comprensibles:

- Preparación familiar
- Claridad informativa
- Protección de población vulnerable
- Riesgo de atrapamiento
- Confianza vecinal

---

## 12. Combos o bonificaciones

## Combo 1 — Familias preparadas

### Requiere

```js
[
  'mochilaEmergenciaPreparada',
  'planEvacuacionConfinamientoDifundido'
]
```

### Texto

> Las familias cuentan con lo básico para salir rápido y saben qué hacer tanto si se ordena evacuación como si se ordena confinamiento.

### Bonus

```js
bonusImpact: {
  preparacionFamiliar: 2,
  riesgoAtrapamiento: -2,
  confusionPublica: -1
}
```

---

## Combo 2 — Información pública ordenada

### Requiere

```js
[
  'canalesOficialesDefinidos',
  'protocoloEdificioPublicoPreparado'
]
```

### Texto

> El municipio dispone de canales claros y un edificio público con función definida para apoyar la información y la coordinación.

### Bonus

```js
bonusImpact: {
  confianzaVecinal: 2,
  saturacion112: -2,
  coordinacionOperativa: 2
}
```

---

## Combo 3 — Evacuación más inclusiva

### Requiere

```js
[
  'personasVulnerablesRegistradas',
  'evacuacionMascotasPreparada'
]
```

### Texto

> La planificación contempla a personas que necesitan apoyo y a familias que no evacuarían sin sus animales. La salida será menos improvisada.

### Bonus

```js
bonusImpact: {
  poblacionProtegida: 2,
  riesgoAtrapamiento: -2,
  confianzaVecinal: 2
}
```

---

## Combo 4 — Visitantes mejor informados

### Requiere

```js
[
  'turistasSenderistasInformados',
  'canalesOficialesDefinidos'
]
```

### Texto

> Las personas visitantes tienen más opciones de recibir avisos fiables y evitar zonas de riesgo durante la emergencia.

### Bonus

```js
bonusImpact: {
  poblacionProtegida: 2,
  riesgoAtrapamiento: -2,
  confusionPublica: -1
}
```

---

## 13. Consecuencias futuras

Lo importante es que lo no elegido no desaparezca. Debe reaparecer durante la crisis.

### Si no se prepara mochila

```js
flag: 'familiasSinMochila'
```

Consecuencia futura:

> Varias familias pierden tiempo buscando lo esencial cuando se ordena evacuar.

### Si no se difunde plan de evacuación y confinamiento

```js
flag: 'hogaresSinPlanEvacuacionConfinamiento'
```

Consecuencia futura:

> Aumentan las dudas sobre si salir, quedarse, cerrar la vivienda o esperar instrucciones.

### Si no se definen canales oficiales

```js
flag: 'canalesOficialesPocoClaros'
```

Consecuencia futura:

> Los rumores ganan terreno y el 112 recibe llamadas que no son emergencias reales.

### Si no se prepara edificio público

```js
flag: 'edificioPublicoSinProtocolo'
```

Consecuencia futura:

> Se intenta activar un edificio público como punto de apoyo, pero no hay responsables ni protocolo.

### Si no se informa a turistas y senderistas

```js
flag: 'turistasSenderistasSinInformacion'
```

Consecuencia futura:

> Un grupo de visitantes queda desorientado por el humo y no sabe qué ruta tomar.

### Si no se prevé evacuación con mascotas

```js
flag: 'mascotasSinPrevision'
```

Consecuencia futura:

> Algunas familias retrasan la salida porque no saben qué hacer con sus animales.

### Si no se identifican personas vulnerables o sin apoyo

```js
flag: 'personasVulnerablesSinRegistro'
```

Consecuencia futura:

> El ayuntamiento detecta tarde que varias personas no pueden salir por sus propios medios.

---

## 14. Diagnóstico final de la pantalla

## Resultado alto — Comunidad preparada

> La población cuenta con instrucciones claras, canales oficiales definidos y medidas básicas para evacuar o confinarse sin improvisar. La comunidad no será inmune al incendio, pero llegará con más orden y menos ruido.

Impacto en crisis:

```js
crisisImpact: {
  poblacionProtegida: 3,
  confusionPublica: -3,
  saturacion112: -2,
  riesgoAtrapamiento: -2
}
```

---

## Resultado medio — Preparación social desigual

> Algunas acciones preventivas han calado, pero quedan dudas importantes sobre canales oficiales, mascotas, turistas o personas que necesitan apoyo. La comunidad está mejor que antes, aunque todavía con puntos ciegos.

Impacto en crisis:

```js
crisisImpact: {
  poblacionProtegida: 1,
  confusionPublica: 1,
  confianzaVecinal: 1
}
```

---

## Resultado bajo — Comunidad vulnerable a la improvisación

> La población llega a la época de riesgo sin pautas claras. Hay familias sin mochila, dudas sobre evacuación y confinamiento, canales poco definidos y personas vulnerables sin identificar. Si el incendio se acerca, la confusión tendrá ventaja.

Impacto en crisis:

```js
crisisImpact: {
  poblacionProtegida: -2,
  confusionPublica: 4,
  saturacion112: 3,
  riesgoAtrapamiento: 3
}
```

---

## 15. Código base de la pantalla

```js
export const pantallaComunidadPreparada = {
  id: 'p-003-comunidad-preparada',
  title: 'Comunidad preparada',
  phase: 'prevencion',
  intro:
    'La prevención también se juega en lo que la gente sabe antes de que suene la sirena.',
  context:
    'Antes de que llegue la época de mayor riesgo, continúas las visitas municipales. Tras revisar viviendas, fincas y zonas de combustible, ahora toca hablar con la población: familias, asociaciones vecinales, responsables municipales, alojamientos turísticos y personal de edificios públicos. No hay incendio todavía, pero ya aparecen dudas: qué llevar si hay evacuación, por dónde salir, qué hacer con la vivienda antes de marcharse, cómo actuar si se ordena confinamiento, dónde informarse, qué ocurre con mascotas y cómo identificar a personas que necesitarán apoyo si hay que evacuar.',
  objective:
    'Prepara a la población para actuar con rapidez, calma y seguridad en caso de incendio forestal. Elige cuatro actuaciones preventivas entre los puntos vulnerables detectados.',
  maxActions: 4,
  nextScreen: 'balance-prevencion'
};
```

---

## 16. Recomendación de interfaz

La pantalla debería tener:

- imagen central de comunidad/municipio;
- siete hotspots numerados;
- panel lateral con vulnerabilidades;
- contador: “Actuaciones disponibles: 4”;
- tarjetas de acción;
- botón “Ver detalles” en el punto de evacuación/confinamiento;
- feedback inmediato al seleccionar;
- diagnóstico final.

### Ejemplo de etiquetas del panel lateral

```txt
1 Familias sin mochila de emergencia
2 Hogares sin plan de evacuación/confinamiento
3 Canales oficiales poco claros
4 Edificio público sin protocolo
5 Turistas o senderistas sin información
6 Mascotas sin previsión
7 Personas vulnerables sin identificar
```

---

## 17. Manual de tono

Esta pantalla debe tener un tono:

- humano;
- práctico;
- claro;
- nada paternalista;
- con chispa, pero sin frivolizar;
- centrado en decisiones reales;
- orientado a reducir improvisación.

### Frases útiles

> La comunidad no se improvisa cuando el incendio ya está subiendo por la ladera.

> Una evacuación no puede depender de tener coche, batería y familia cerca.

> La mochila no apaga incendios, pero compra minutos.

> El silencio no calma: deja sitio a rumores.

> No todo el mundo recibe una alerta de la misma manera.

> Una mascota puede ser la razón por la que una familia no quiera salir.

---

## 18. Qué no hacer

No conviene:

- saturar la tarjeta principal con todas las instrucciones de evacuación y confinamiento;
- tratar a la población vulnerable como un detalle secundario;
- dejar el 112 como canal de dudas generales;
- convertir la pantalla en una lista fría de protocolos;
- repetir el bloque de quemas agrícolas o maquinaria, ya tratado en la Pantalla 2.

---

## 19. Conexión con la crisis

Esta pantalla conecta especialmente con estos escenarios:

```txt
s-018 Colapso de llamadas al 112
s-016 Rumor de evacuación
s-034 Vecinos sin medios para salir
s-033 Senderistas desorientados por el humo
s-022 Evacuación con mascotas
s-031 Confinamiento extremo por fuego de copas
```

---

## 20. Veredicto de diseño

La Pantalla 3 funciona si la jugadora siente que no está marcando casillas, sino preparando a una comunidad real.

La pregunta de fondo no es:

> ¿Qué folleto repartes?

Sino:

> ¿Cómo reduces la improvisación cuando llegue el miedo?
