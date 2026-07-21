# Manual de diseño — Pantalla 1 de prevención
## Inspección de viviendas en interfaz urbano-forestal

**Proyecto:** Newsgame de incendios forestales  
**Pantalla:** 1 — Fase preventiva  
**Función:** Preparar viviendas y edificios próximos al monte antes de la época de mayor riesgo  
**Versión:** propuesta inicial para prototipo jugable

---

## 1. Idea central

La primera pantalla de prevención debe funcionar como una **inspección estratégica del territorio**, no como una simple escena para colocar iconos.

La jugadora llega a un municipio antes de la campaña de alto riesgo. Todavía no hay humo, no hay llamas, no hay sirenas. Pero la imagen ya contiene señales de vulnerabilidad: canalones con hojas secas, leña junto a fachadas, vegetación seca bajo los árboles, copas que se tocan, huecos sin proteger, accesos estrechos y un edificio público demasiado cerca de vegetación.

La frase de entrada podría ser:

> **No hay humo todavía. Por eso este es el momento de actuar.**

La pantalla debe transmitir una idea clave del juego:

> La emergencia no empieza cuando aparece el fuego. Empieza antes, cuando decides si preparas o no el territorio.

---

## 2. Objetivo jugable

La misión de la jugadora es detectar vulnerabilidades y elegir qué actuaciones preventivas ejecutar antes de que llegue la época de mayor riesgo.

El objetivo no es dejarlo todo perfecto. Eso sería poco realista y poco jugable. El objetivo es **priorizar**.

La jugadora debe decidir qué corregir primero para que, si se declara un incendio más adelante:

- haya menos combustible junto a fachadas;
- las pavesas tengan menos oportunidades de prender;
- el fuego tenga más difícil subir desde el suelo a las copas;
- las autobombas puedan acceder mejor;
- y algunos edificios clave puedan servir como apoyo comunitario.

---

## 3. Crítica constructiva de diseño

La idea de trabajar sobre una imagen es fuerte, pero tiene un riesgo: que se convierta en una pantalla de “poner recursos verdes” sin tensión.

Para evitarlo, esta pantalla necesita tres capas:

1. **Observación:** la jugadora detecta problemas reales en la imagen.
2. **Decisión:** solo puede elegir algunas actuaciones, no todas.
3. **Consecuencia:** lo que arregla y lo que deja pendiente reaparece durante la crisis.

Lo que conviene evitar:

- un mapa gigante lleno de veinte iconos;
- recursos infinitos;
- puntos sin microhistoria;
- feedback basado solo en números;
- convertir la prevención en una lista de buenas prácticas sin conflicto.

Lo que sí aporta jugabilidad:

- recursos limitados;
- vulnerabilidades diferentes;
- decisiones con coste de oportunidad;
- consecuencias narrativas posteriores;
- cambios visuales en la imagen tras cada actuación.

---

## 4. Contexto narrativo de la pantalla

Antes de la campaña de alto riesgo, visitas un municipio con varias viviendas situadas en zona de interfaz urbano-forestal. Hay casas próximas al monte, un centro social que podría funcionar como punto de encuentro, árboles sin aclarar, vegetación seca, canalones llenos de hojas y accesos estrechos.

Los vecinos quieren saber qué medidas son realmente prioritarias. El ayuntamiento tiene margen para actuar, pero no puede hacerlo todo a la vez.

Como responsable de Emergencias, debes decidir qué vulnerabilidades corregir primero para reducir el riesgo antes de que llegue el verano.

---

## 5. Mecánica básica

La jugadora ve una imagen panorámica de una zona de viviendas próximas al monte. La imagen tiene **7 puntos vulnerables** marcados.

Al pulsar cada punto, aparece:

- una microhistoria;
- el riesgo que representa;
- la actuación preventiva posible;
- el impacto esperado;
- y un breve feedback si se elige.

La jugadora solo puede escoger **4 actuaciones de las 7**.

Esto obliga a priorizar. Si puede corregirlo todo, la pantalla pierde juego. Si tiene que decidir, empieza la estrategia.

---

## 6. Recursos disponibles

Para la primera versión del prototipo, recomiendo mantenerlo simple:

```js
resources: {
  actuacionesDisponibles: 4
}
```

Mensaje para la interfaz:

> Tienes capacidad para ejecutar 4 actuaciones antes de la época de mayor riesgo. Elige bien: lo que quede sin corregir puede aparecer después durante la crisis.

Más adelante, si quieres una versión más profunda, puedes añadir costes diferenciados:

```js
resources: {
  actuacionesDisponibles: 4,
  cuadrillaLimpieza: 2,
  presupuestoMunicipal: 6,
  visitaTecnica: 1
}
```

Crítica constructiva: para una primera implementación, no empezaría con demasiadas variables de coste. Puede parecer más serio, pero también puede enfriar la experiencia. Primero hay que probar si la pantalla funciona con una regla sencilla: **elige 4**.

---

## 7. Imagen sugerida

La imagen debería mostrar una zona tranquila, casi cotidiana. Esa es la gracia: el peligro todavía no parece urgente, pero ya está ahí.

Elementos visuales recomendados:

1. Una vivienda con canalones llenos de hojas secas.
2. Una fachada con leña, sillas, restos de poda o muebles de jardín pegados a la pared.
3. Árboles con ramas bajas y vegetación seca debajo.
4. Copas de árboles tocándose.
5. Respiraderos, huecos bajo porches o pequeñas aberturas sin protección.
6. Camino estrecho con vegetación, vallas, objetos o vehículos dificultando el paso.
7. Centro social o edificio público cerca de una ladera con vegetación.

La escena debe permitir una lectura clara. Si el dibujo está demasiado cargado, la jugadora no observa: busca botones. Mejor una ilustración limpia con puntos muy reconocibles.

---

## 8. Puntos vulnerables detallados

### Punto 1 — Canalones con hojas secas

**Microhistoria**

> El tejado y los canalones acumulan hojas secas y agujas de pino. Si llegan pavesas, pueden prender aunque la llama no toque directamente la vivienda.

**Acción posible**

Limpiar tejados, canalones y terrazas.

**Impacto sugerido**

```js
impact: {
  riesgoPavesas: -4,
  defensibilidadViviendas: 2,
  danosViviendas: -2
}
```

**Feedback si se elige**

> Buena decisión. Las pavesas no necesitan una gran llama para causar problemas: les basta un canalón lleno de hojas secas y un poco de viento haciendo de cómplice.

**Flag si se elige**

```js
flagsOnApply: ['canalonesLimpios']
```

**Flag si se ignora**

```js
flagIfIgnored: 'canalonesSucios'
```

**Consecuencia posible en crisis si se ignora**

> Las pavesas caen sobre varias cubiertas. En algunas viviendas, los canalones con hojas secas generan focos secundarios.

---

### Punto 2 — Leña y muebles junto a la fachada

**Microhistoria**

> Hay leña, sillas de plástico, restos de poda y una sombrilla junto a la pared exterior. Son combustible pegado a la casa.

**Acción posible**

Retirar materiales inflamables próximos a fachadas, ventanas, puertas y tejados.

**Impacto sugerido**

```js
impact: {
  continuidadCombustible: -3,
  danosViviendas: -3,
  defensibilidadViviendas: 3
}
```

**Feedback si se elige**

> Buena decisión. La vivienda no necesita tener el monte encima para arder: a veces basta con haber dejado el combustible justo al lado de la pared.

**Flag si se elige**

```js
flagsOnApply: ['fachadasDespejadas']
```

**Flag si se ignora**

```js
flagIfIgnored: 'combustiblePegadoFachada'
```

**Consecuencia posible en crisis si se ignora**

> El calor y las pavesas encuentran combustible junto a una fachada. La vivienda necesita defensa inmediata y complica el trabajo de las brigadas.

---

### Punto 3 — Árboles con ramas bajas y vegetación seca

**Microhistoria**

> Las ramas bajas conectan la vegetación seca del suelo con la copa del árbol. Si prende el matorral o los restos secos, el fuego puede trepar con facilidad y ganar intensidad.

**Acción posible**

Podar ramas bajas hasta unos **3 metros** y retirar vegetación seca bajo los árboles.

**Impacto sugerido**

```js
impact: {
  continuidadCombustible: -5,
  riesgoFuegoCopas: -3,
  defensibilidadViviendas: 2
}
```

**Feedback si se elige**

> Buena decisión. Cortar esa escalera vertical dificulta que el fuego pase del suelo a las copas. No es jardinería fina: es quitarle al incendio un ascensor.

**Flag si se elige**

```js
flagsOnApply: ['continuidadVerticalReducida']
```

**Flag si se ignora**

```js
flagIfIgnored: 'continuidadVerticalAlta'
```

**Consecuencia posible en crisis si se ignora**

> El fuego de superficie encuentra ramas bajas y vegetación seca bajo los árboles. La llama sube hacia las copas y gana intensidad.

---

### Punto 4 — Copas de árboles tocándose

**Microhistoria**

> Las copas de varios árboles se tocan entre sí. Si el fuego llega a una de ellas, puede avanzar por las alturas hacia otras zonas.

**Acción posible**

Aclareo de árboles para separar las copas unos **3 metros** entre sí.

**Impacto sugerido**

```js
impact: {
  continuidadCombustible: -4,
  riesgoFuegoCopas: -3,
  defensibilidadViviendas: 2
}
```

**Feedback si se elige**

> Buena decisión. Si las copas se tocan, el fuego puede correr por arriba como si hubiera encontrado una autopista vegetal. Separarlas reduce esa continuidad.

**Flag si se elige**

```js
flagsOnApply: ['copasSeparadas']
```

**Flag si se ignora**

```js
flagIfIgnored: 'copasConectadas'
```

**Consecuencia posible en crisis si se ignora**

> El incendio alcanza una copa y encuentra continuidad hacia otros árboles. La propagación se acelera en la zona alta de la vegetación.

---

### Punto 5 — Respiraderos y huecos sin protección

**Microhistoria**

> La vivienda tiene respiraderos, huecos bajo el porche y pequeñas aberturas sin protección. Una pavesa podría entrar o prender material acumulado.

**Acción posible**

Colocar mallas matachispas o rejillas metálicas de trama fina y sellar huecos bajo porches, terrazas o tejados.

**Impacto sugerido**

```js
impact: {
  riesgoPavesas: -5,
  danosViviendas: -3,
  defensibilidadViviendas: 2
}
```

**Feedback si se elige**

> Buena decisión. Una pavesa no necesita permiso de obra para entrar. Proteger huecos y ventilaciones reduce mucho las oportunidades de ignición.

**Flag si se elige**

```js
flagsOnApply: ['huecosProtegidos']
```

**Flag si se ignora**

```js
flagIfIgnored: 'huecosVulnerables'
```

**Consecuencia posible en crisis si se ignora**

> Las pavesas golpean la zona de porches y respiraderos. Algunos huecos sin protección se convierten en puntos vulnerables.

---

### Punto 6 — Acceso estrecho para autobombas

**Microhistoria**

> El camino de entrada está parcialmente ocupado por vegetación, vallas, objetos y vehículos aparcados. Una autobomba tendría dificultades para pasar o maniobrar.

**Acción posible**

Despejar accesos y garantizar espacio de entrada, giro y salida para vehículos de emergencia.

**Impacto sugerido**

```js
impact: {
  seguridadEquipos: 3,
  defensibilidadViviendas: 3,
  coordinacionOperativa: 2,
  riesgoAtrapamiento: -2
}
```

**Feedback si se elige**

> Buena decisión. Una casa puede ser defendible sobre el papel, pero si la autobomba no entra o no puede salir, la teoría se queda aparcada en la cuneta.

**Flag si se elige**

```js
flagsOnApply: ['accesosDespejados']
```

**Flag si se ignora**

```js
flagIfIgnored: 'accesosDificiles'
```

**Consecuencia posible en crisis si se ignora**

> Una autobomba tarda más de lo previsto en acceder a la zona. El camino estrecho complica la maniobra y retrasa la defensa de dos viviendas.

---

### Punto 7 — Centro social próximo a vegetación

**Microhistoria**

> El centro social está cerca de una ladera con vegetación. Podría funcionar como punto de encuentro o apoyo municipal, pero su entorno no está preparado.

**Acción posible**

Priorizar la limpieza y revisión preventiva del edificio público: entorno despejado, accesos libres, punto de información y posible zona de apoyo.

**Impacto sugerido**

```js
impact: {
  poblacionProtegida: 3,
  confianzaVecinal: 3,
  coordinacionOperativa: 3,
  defensibilidadViviendas: 1
}
```

**Feedback si se elige**

> Buena decisión. Preparar un edificio público no solo protege paredes: crea un punto de referencia para la población cuando la emergencia empieza a hacer ruido.

**Flag si se elige**

```js
flagsOnApply: ['edificioPublicoPreparado']
```

**Flag si se ignora**

```js
flagIfIgnored: 'edificioPublicoVulnerable'
```

**Consecuencia posible en crisis si se ignora**

> El centro social se plantea como punto de información, pero su entorno no está preparado y no puede usarse con seguridad.

---

## 9. Acciones disponibles para la interfaz

Pueden aparecer como tarjetas, botones o recursos arrastrables.

```txt
1. Limpiar tejados y canalones
2. Retirar materiales inflamables junto a fachadas
3. Podar ramas bajas y retirar vegetación seca
4. Separar copas de árboles
5. Colocar mallas matachispas y proteger huecos
6. Despejar accesos para emergencias
7. Preparar edificio público como punto de apoyo
```

La jugadora elige 4.

Crítica constructiva: no usar iconos demasiado genéricos. Si todos parecen “acciones verdes”, la pantalla pierde lectura. Mejor iconos concretos: canalón, leña, árbol podado, copas separadas, rejilla, carretera, edificio público.

---

## 10. Variables de la pantalla

La pantalla puede modificar estas variables:

```js
state: {
  defensibilidadViviendas: 0,
  continuidadCombustible: 0,
  riesgoPavesas: 0,
  riesgoFuegoCopas: 0,
  seguridadEquipos: 0,
  coordinacionOperativa: 0,
  poblacionProtegida: 0,
  confianzaVecinal: 0,
  danosViviendas: 0,
  riesgoAtrapamiento: 0
}
```

No hace falta mostrar todas estas variables a la jugadora. De cara a la experiencia, basta con un diagnóstico final más claro:

- Defensibilidad de viviendas.
- Riesgo por pavesas.
- Continuidad vegetal.
- Accesos de emergencia.
- Preparación comunitaria.

---

## 11. Combos o sinergias

Las combinaciones dan profundidad sin hacer la pantalla demasiado compleja.

### Combo 1 — Vivienda más defendible

**Requiere:**

- fachadas despejadas;
- canalones limpios;
- huecos protegidos.

**Texto de resultado**

> Varias viviendas reducen de forma importante su vulnerabilidad ante pavesas y calor radiante.

**Bonus**

```js
bonusImpact: {
  defensibilidadViviendas: 2,
  danosViviendas: -1
}
```

---

### Combo 2 — Menos riesgo de fuego de copas

**Requiere:**

- continuidad vertical reducida;
- copas separadas.

**Texto de resultado**

> La continuidad vertical y horizontal del combustible se reduce. Si el fuego llega al entorno, tendrá más difícil subir y avanzar por las copas.

**Bonus**

```js
bonusImpact: {
  riesgoFuegoCopas: -2,
  continuidadCombustible: -2
}
```

---

### Combo 3 — Mejor defensa operativa

**Requiere:**

- accesos despejados;
- edificio público preparado.

**Texto de resultado**

> El municipio mejora su capacidad de respuesta: hay mejores accesos y un punto público más útil para coordinar información.

**Bonus**

```js
bonusImpact: {
  coordinacionOperativa: 2,
  seguridadEquipos: 1
}
```

---

## 12. Diagnóstico final de la pantalla

Al terminar, el juego debería ofrecer un balance narrativo, no solo puntos.

### Resultado alto — Viviendas más defendibles

> Has reducido combustible junto a fachadas, protegido puntos vulnerables frente a pavesas y mejorado accesos para emergencias. Si el fuego llega, las viviendas no serán invulnerables, pero los equipos tendrán mejores condiciones para defenderlas.

### Resultado medio — Protección parcial

> Algunas vulnerabilidades importantes han sido corregidas, pero quedan puntos débiles: vegetación cercana, huecos sin proteger o accesos complicados. La zona llega mejor preparada, aunque todavía con flancos abiertos.

### Resultado bajo — Entorno vulnerable

> La zona mantiene combustible cerca de viviendas, puntos de entrada para pavesas y accesos difíciles. Si el incendio se aproxima, las casas y los equipos partirán con desventaja.

---

## 13. Consecuencias futuras durante la crisis

Esta es la parte que hace que la pantalla no sea decorativa. Lo que la jugadora deja sin corregir debe aparecer después.

Ejemplos:

### Si no se limpian canalones

```js
flags.canalonesSucios = true;
```

Texto futuro:

> Las pavesas caen sobre varias cubiertas. En algunas viviendas, los canalones con hojas secas generan focos secundarios.

### Si no se despejan accesos

```js
flags.accesosDificiles = true;
```

Texto futuro:

> Una autobomba tarda más de lo previsto en acceder a la zona. El camino estrecho complica la maniobra y retrasa la defensa de dos viviendas.

### Si no se podan ramas bajas ni se retira vegetación seca

```js
flags.continuidadVerticalAlta = true;
```

Texto futuro:

> El fuego de superficie encuentra ramas bajas y vegetación seca bajo los árboles. La llama sube hacia las copas y gana intensidad.

### Si no se prepara el edificio público

```js
flags.edificioPublicoVulnerable = true;
```

Texto futuro:

> El centro social se plantea como punto de información, pero su entorno no está preparado y no puede usarse con seguridad.

---

## 14. Propuesta de objeto de datos

Este objeto puede servir como base para implementar la pantalla.

```js
export const pantallaViviendasInterfaz = {
  id: 'p-001-viviendas-interfaz',
  title: 'Inspección de viviendas en interfaz',
  phase: 'prevencion',
  intro:
    'No hay humo todavía. Por eso este es el momento de actuar.',
  context:
    'Antes de la campaña de alto riesgo, visitas un municipio con viviendas próximas al monte. Hay casas con vegetación cercana, canalones llenos de hojas, leña junto a fachadas y accesos estrechos. El ayuntamiento tiene margen para intervenir, pero no puede corregirlo todo antes del verano.',
  objective:
    'Detecta vulnerabilidades y elige cuatro actuaciones preventivas para reducir el riesgo antes de la época de mayor peligro.',
  maxActions: 4,
  hotspots: [
    {
      id: 'canalones-hojas',
      title: 'Canalones con hojas secas',
      description:
        'El tejado y los canalones acumulan hojas secas y agujas de pino. Si llegan pavesas, pueden prender aunque la llama no toque directamente la vivienda.',
      action: {
        id: 'limpiar-canalones',
        label: 'Limpiar tejados y canalones',
        impact: {
          riesgoPavesas: -4,
          defensibilidadViviendas: 2,
          danosViviendas: -2
        },
        flagsOnApply: ['canalonesLimpios'],
        feedback:
          'Buena decisión. Las pavesas no necesitan una gran llama para causar problemas: les basta un canalón lleno de hojas secas y un poco de viento haciendo de cómplice.'
      },
      flagIfIgnored: 'canalonesSucios'
    },
    {
      id: 'combustibles-fachada',
      title: 'Leña y muebles junto a la fachada',
      description:
        'Hay leña, sillas de plástico, restos de poda y una sombrilla junto a la pared exterior. Son combustible pegado a la casa.',
      action: {
        id: 'retirar-combustibles-fachada',
        label: 'Retirar materiales inflamables junto a fachadas',
        impact: {
          continuidadCombustible: -3,
          danosViviendas: -3,
          defensibilidadViviendas: 3
        },
        flagsOnApply: ['fachadasDespejadas'],
        feedback:
          'Buena decisión. La vivienda no necesita tener el monte encima para arder: a veces basta con haber dejado el combustible justo al lado de la pared.'
      },
      flagIfIgnored: 'combustiblePegadoFachada'
    },
    {
      id: 'ramas-bajas-vegetacion-seca',
      title: 'Árboles con ramas bajas y vegetación seca',
      description:
        'Las ramas bajas conectan la vegetación seca del suelo con la copa del árbol. Si prende el matorral o los restos secos, el fuego puede trepar con facilidad y ganar intensidad.',
      action: {
        id: 'podar-ramas-y-retirar-seco',
        label: 'Podar ramas bajas y retirar vegetación seca',
        impact: {
          continuidadCombustible: -5,
          riesgoFuegoCopas: -3,
          defensibilidadViviendas: 2
        },
        flagsOnApply: ['continuidadVerticalReducida'],
        feedback:
          'Buena decisión. Cortar esa escalera vertical dificulta que el fuego pase del suelo a las copas. No es jardinería fina: es quitarle al incendio un ascensor.'
      },
      flagIfIgnored: 'continuidadVerticalAlta'
    },
    {
      id: 'copas-tocandose',
      title: 'Copas de árboles tocándose',
      description:
        'Las copas de varios árboles se tocan entre sí. Si el fuego llega a una de ellas, puede avanzar por las alturas hacia otras zonas.',
      action: {
        id: 'separar-copas',
        label: 'Separar copas de árboles',
        impact: {
          continuidadCombustible: -4,
          riesgoFuegoCopas: -3,
          defensibilidadViviendas: 2
        },
        flagsOnApply: ['copasSeparadas'],
        feedback:
          'Buena decisión. Si las copas se tocan, el fuego puede correr por arriba como si hubiera encontrado una autopista vegetal. Separarlas reduce esa continuidad.'
      },
      flagIfIgnored: 'copasConectadas'
    },
    {
      id: 'huecos-sin-proteger',
      title: 'Respiraderos y huecos sin protección',
      description:
        'La vivienda tiene respiraderos, huecos bajo el porche y pequeñas aberturas sin protección. Una pavesa podría entrar o prender material acumulado.',
      action: {
        id: 'mallas-matachispas',
        label: 'Colocar mallas matachispas y proteger huecos',
        impact: {
          riesgoPavesas: -5,
          danosViviendas: -3,
          defensibilidadViviendas: 2
        },
        flagsOnApply: ['huecosProtegidos'],
        feedback:
          'Buena decisión. Una pavesa no necesita permiso de obra para entrar. Proteger huecos y ventilaciones reduce mucho las oportunidades de ignición.'
      },
      flagIfIgnored: 'huecosVulnerables'
    },
    {
      id: 'acceso-estrecho',
      title: 'Acceso estrecho para autobombas',
      description:
        'El camino de entrada está parcialmente ocupado por vegetación, vallas, objetos y vehículos aparcados. Una autobomba tendría dificultades para pasar o maniobrar.',
      action: {
        id: 'despejar-accesos',
        label: 'Despejar accesos para emergencias',
        impact: {
          seguridadEquipos: 3,
          defensibilidadViviendas: 3,
          coordinacionOperativa: 2,
          riesgoAtrapamiento: -2
        },
        flagsOnApply: ['accesosDespejados'],
        feedback:
          'Buena decisión. Una casa puede ser defendible sobre el papel, pero si la autobomba no entra o no puede salir, la teoría se queda aparcada en la cuneta.'
      },
      flagIfIgnored: 'accesosDificiles'
    },
    {
      id: 'centro-social',
      title: 'Centro social próximo a vegetación',
      description:
        'El centro social está cerca de una ladera con vegetación. Podría funcionar como punto de encuentro o apoyo municipal, pero su entorno no está preparado.',
      action: {
        id: 'preparar-edificio-publico',
        label: 'Preparar edificio público como punto de apoyo',
        impact: {
          poblacionProtegida: 3,
          confianzaVecinal: 3,
          coordinacionOperativa: 3,
          defensibilidadViviendas: 1
        },
        flagsOnApply: ['edificioPublicoPreparado'],
        feedback:
          'Buena decisión. Preparar un edificio público no solo protege paredes: crea un punto de referencia para la población cuando la emergencia empieza a hacer ruido.'
      },
      flagIfIgnored: 'edificioPublicoVulnerable'
    }
  ],
  combos: [
    {
      id: 'viviendas-mas-defendibles',
      requires: [
        'fachadasDespejadas',
        'canalonesLimpios',
        'huecosProtegidos'
      ],
      text:
        'Varias viviendas reducen de forma importante su vulnerabilidad ante pavesas y calor radiante.',
      bonusImpact: {
        defensibilidadViviendas: 2,
        danosViviendas: -1
      }
    },
    {
      id: 'menos-riesgo-fuego-copas',
      requires: [
        'continuidadVerticalReducida',
        'copasSeparadas'
      ],
      text:
        'La continuidad vertical y horizontal del combustible se reduce. Si el fuego llega al entorno, tendrá más difícil subir y avanzar por las copas.',
      bonusImpact: {
        riesgoFuegoCopas: -2,
        continuidadCombustible: -2
      }
    },
    {
      id: 'mejor-defensa-operativa',
      requires: [
        'accesosDespejados',
        'edificioPublicoPreparado'
      ],
      text:
        'El municipio mejora su capacidad de respuesta: hay mejores accesos y un punto público más útil para coordinar información.',
      bonusImpact: {
        coordinacionOperativa: 2,
        seguridadEquipos: 1
      }
    }
  ],
  outcomes: [
    {
      id: 'alto',
      condition: {
        defensibilidadViviendas: '>=8',
        riesgoPavesas: '<=-6'
      },
      title: 'Viviendas más defendibles',
      text:
        'Has reducido combustible junto a fachadas, protegido puntos vulnerables frente a pavesas y mejorado accesos para emergencias. Si el fuego llega, las viviendas no serán invulnerables, pero los equipos tendrán mejores condiciones para defenderlas.'
    },
    {
      id: 'medio',
      condition: {
        defensibilidadViviendas: '>=4'
      },
      title: 'Protección parcial',
      text:
        'Algunas vulnerabilidades importantes han sido corregidas, pero quedan puntos débiles: vegetación cercana, huecos sin proteger o accesos complicados. La zona llega mejor preparada, aunque todavía con flancos abiertos.'
    },
    {
      id: 'bajo',
      condition: {
        defensibilidadViviendas: '<4'
      },
      title: 'Entorno vulnerable',
      text:
        'La zona mantiene combustible cerca de viviendas, puntos de entrada para pavesas y accesos difíciles. Si el incendio se aproxima, las casas y los equipos partirán con desventaja.'
    }
  ]
};
```

---

## 15. Recomendaciones de implementación visual

### Mejor si se ve así

- Imagen limpia y panorámica.
- Puntos vulnerables numerados o marcados con iconos discretos.
- Panel lateral con microhistoria y acción posible.
- Contador visible: “4 actuaciones disponibles”.
- Cambios visuales tras cada decisión.

### Cambios visuales sugeridos

- Canalones pasan de llenos de hojas a limpios.
- Leña y muebles desaparecen de la fachada.
- Árboles aparecen con ramas bajas podadas.
- Copas se muestran más separadas.
- Respiraderos aparecen con rejillas.
- Camino queda despejado.
- Centro social aparece marcado como punto de apoyo.

### Lo que no conviene

- Demasiados iconos.
- Texto largo dentro de la imagen.
- Variables visibles en exceso.
- Colores alarmistas antes de que empiece la crisis.

La prevención debe tener una estética tranquila, casi engañosa. La tensión viene de saber que después puede llegar el fuego.

---

## 16. Relación con escenarios ya creados

Esta pantalla conecta directamente con los escenarios preventivos:

- `s-035-limpieza-alrededor-viviendas`
- `s-036-defensa-pasiva-vivienda`

Y prepara consecuencias para escenarios de crisis:

- `s-026-defensa-operativa-nucleo-viviendas`
- `s-027-fuego-en-barranco`
- `s-028-defensa-nocturna-perimetro`
- `s-030-fuego-de-copas`
- `s-031-confinamiento-extremo-fuego-copas`

Ejemplo de conexión:

```js
if (flags.accesosDespejados) {
  crisis.seguridadEquipos += 2;
  crisis.coordinacionOperativa += 1;
}

if (flags.accesosDificiles) {
  crisis.riesgoAtrapamiento += 2;
  crisis.danosViviendas += 1;
}
```

---

## 17. Crítica final

Esta pantalla será potente si la jugadora siente que está **leyendo el territorio**. Si solo coloca recursos, se quedará corta. Si observa vulnerabilidades, escucha pequeñas historias y decide qué no puede arreglar, entonces aparece el juego.

La prevención no debe parecer un trámite. Debe dejar una pregunta incómoda:

> ¿Qué pasará después con lo que no he podido corregir?

Esa es la tensión que conecta esta primera pantalla con todo el resto del newsgame.

