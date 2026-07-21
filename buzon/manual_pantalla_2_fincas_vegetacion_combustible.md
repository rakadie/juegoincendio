# Manual de diseño — Pantalla 2: Fincas, vegetación y gestión del combustible

## 1. Idea general

La **Pantalla 2** forma parte de la fase preventiva del newsgame. Después de inspeccionar viviendas y edificios en zona de interfaz urbano-forestal, la jugadora pasa a una escala más amplia: **fincas, parcelas rurales, caminos, vegetación, restos agrícolas, pastoreo preventivo y quemas**.

La clave es que esta pantalla no trata solo de “limpiar el monte”. Trata de algo más interesante:

> ¿Cómo gestionas un territorio donde la actividad humana puede reducir el riesgo… o encenderlo todo?

Aquí la prevención se juega en la relación entre vecinos, agricultores, ganaderos, técnicos municipales y paisaje.

---

## 2. Función narrativa dentro del juego

La Pantalla 1 prepara las **viviendas**.

La Pantalla 2 prepara el **territorio rural que rodea esas viviendas**.

La Pantalla 3 preparará a la **comunidad y la población**.

Esta división ayuda a que el juego tenga una progresión clara:

```txt
Pantalla 1 — Casas y edificios
Pantalla 2 — Fincas, vegetación y combustible
Pantalla 3 — Comunidad preparada
Inicio del incendio
Crisis
```

La Pantalla 2 debe transmitir que un incendio no solo se propaga por el monte. También puede avanzar por restos de poda, vegetación continua, caminos rurales mal mantenidos, quemas agrícolas mal gestionadas o actividades con maquinaria en días inadecuados.

---

## 3. Crítica constructiva de diseño

La inclusión de **quemas agrícolas**, **quemas técnicas** y **ovejas bombero** aporta mucho interés, pero exige cuidado.

### Lo que funciona muy bien

- Hace que la prevención sea más local, rural y reconocible.
- Introduce dilemas reales: no todo se resuelve prohibiendo, ni todo se resuelve dejando hacer.
- Permite mostrar que el territorio necesita gestión continua.
- Da identidad visual y narrativa al juego, especialmente con el pastoreo preventivo.

### El riesgo

Puede confundirse la quema agrícola con la quema técnica.

No son lo mismo:

- **Quema agrícola:** práctica agraria o vecinal para eliminar restos vegetales. Debe estar autorizada, condicionada por meteorología, horarios y medios de control, y puede prohibirse o suspenderse.
- **Quema técnica/prescrita:** actuación profesional planificada, con autorización, análisis meteorológico, medios preparados y objetivos estratégicos.

### Regla de oro

> El fuego puede ser herramienta, pero no ocurrencia.

La pantalla debe dejar claro que no se está recomendando “quemar para limpiar”, sino **gestionar el combustible con criterios técnicos y preventivos**.

---

## 4. Nombre de la pantalla

**Pantalla 2 — Fincas, vegetación y gestión del combustible**

---

## 5. Frase de entrada

> El fuego no siempre avanza por donde quiere. A veces avanza por donde le hemos dejado combustible.

Esta frase da tono y conecta con la tesis de la pantalla: el paisaje no es neutro. Lo que se acumula, se abandona o se gestiona mal puede condicionar la crisis posterior.

---

## 6. Contexto narrativo

Sigues visitando municipios antes de la época de mayor riesgo. En esta segunda parada, técnicos municipales, agricultores y ganaderos te muestran varias fincas próximas al monte.

Hay restos de poda acumulados, vegetación densa, caminos rurales estrechos, parcelas abandonadas y zonas donde el matorral conecta con viviendas dispersas.

El ayuntamiento quiere reducir la continuidad del combustible, pero no puede actuar en todo el territorio a la vez. También hay una propuesta sobre la mesa: usar pastoreo preventivo —las llamadas **ovejas bombero**— para mantener a raya la vegetación en zonas estratégicas.

Tu tarea es decidir qué actuaciones priorizar para reducir el riesgo de ignición y propagación antes de que llegue la campaña de alto riesgo.

---

## 7. Objetivo de la pantalla

La jugadora debe reducir el riesgo en fincas y zonas rurales próximas al monte.

Debe decidir qué medidas aplicar para:

- reducir restos vegetales acumulados;
- evitar que una quema agrícola origine un incendio;
- disminuir la continuidad del matorral;
- facilitar accesos por caminos rurales;
- orientar la replantación de fincas;
- valorar el pastoreo preventivo;
- y estudiar actuaciones técnicas profesionales si procede.

---

## 8. Mecánica básica

La jugadora ve una imagen panorámica de una zona rural cercana al monte.

Aparecen **7 puntos vulnerables**.

La jugadora solo puede elegir **4 actuaciones preventivas**.

```js
maxActions: 4
```

Esto es importante. Si puede hacerlo todo, la pantalla pierde interés. La decisión aparece cuando hay que priorizar.

---

## 9. Imagen sugerida

La imagen debería mostrar una zona rural próxima al monte, con:

- fincas agrícolas;
- restos de poda acumulados;
- matorral denso en bordes de parcelas;
- rebaño de ovejas o cabras en una franja de pastoreo;
- zona de replantación;
- camino rural estrecho;
- agricultores consultando sobre quemas;
- técnicos forestales valorando una línea preventiva;
- viviendas dispersas al fondo o en el borde de la escena;
- ladera o monte cercano.

### Consejo visual

Conviene diferenciar claramente:

- la **actividad agraria/vecinal**, como restos de poda o quemas agrícolas;
- y la **actuación técnica profesional**, como quema prescrita o línea preventiva.

Esto puede hacerse con iconos, colores o presencia de técnicos/equipos.

---

## 10. Puntos vulnerables

## Punto 1 — Restos de poda acumulados

### Microhistoria

Varias fincas acumulan restos de poda, ramas secas y material vegetal junto a muros y caminos. Si se secan más, pueden convertirse en combustible disponible para el fuego.

### Acción posible

**Gestionar restos de poda**

Retirar, triturar o compostar restos vegetales antes de la época de riesgo.

### Impacto sugerido

```js
impact: {
  continuidadCombustible: -4,
  riesgoIgnicion: -2,
  danosViviendas: -2
}
```

### Feedback

> Buena decisión. Los restos de poda no desaparecen por arte municipal: si se acumulan y se secan, el incendio los encuentra encantadores.

### Consecuencia si se ignora

> El fuego encuentra restos secos acumulados junto a caminos y fincas. La propagación gana velocidad.

---

## Punto 2 — Vegetación densa en el borde de las fincas

### Microhistoria

En el límite entre las parcelas y el monte hay matorral denso y continuo. Si prende, puede conectar rápidamente la finca con la ladera y acercar el fuego a las viviendas.

### Acción posible

**Crear discontinuidades vegetales**

Abrir discontinuidades, retirar material seco y reducir masas vegetales densas en puntos estratégicos.

### Impacto sugerido

```js
impact: {
  continuidadCombustible: -5,
  riesgoPropagacion: -4,
  defensibilidadViviendas: 2
}
```

### Feedback

> Buena decisión. No todo lo verde protege. Una masa vegetal continua puede ser una mecha elegante, pero mecha al fin y al cabo.

### Consecuencia si se ignora

> El fuego conecta rápidamente parcelas, matorral y borde de monte. No avanza como una línea limpia, sino como un problema con muchas manos.

---

## Punto 3 — Pastoreo preventivo: ovejas bombero

### Microhistoria

Una asociación ganadera propone usar rebaños para reducir matorral y pasto seco en franjas concretas antes del verano. La idea interesa al ayuntamiento, pero exige planificación: acuerdos con propietarios, calendario, zonas seguras, agua para el ganado y seguimiento técnico.

### Acción posible

**Activar pastoreo preventivo**

Poner en marcha un programa de pastoreo preventivo en zonas estratégicas, coordinado con ganaderos, técnicos municipales y propietarios.

### Impacto sugerido

```js
impact: {
  continuidadCombustible: -4,
  riesgoPropagacion: -3,
  confianzaVecinal: 3,
  cumplimientoPreventivo: 3
}
```

### Feedback

> Buena decisión. El pastoreo preventivo puede reducir combustible fino y mantener franjas menos cargadas de vegetación. Pero funciona si se planifica: las ovejas no son una brigada helitransportada con lana.

### Consecuencia si se ignora

> Algunas franjas mantienen pasto seco y matorral bajo. El fuego encuentra más continuidad en zonas donde el pastoreo preventivo podría haber reducido combustible.

### Crítica constructiva

Este punto es muy potente visual y narrativamente, pero debe evitarse el tono de “solución mágica”. El pastoreo preventivo requiere:

- planificación;
- acuerdos con propietarios;
- ganaderos disponibles;
- agua y logística;
- zonas adecuadas;
- seguimiento técnico.

---

## Punto 4 — Replantación tras limpiar finca

### Microhistoria

Un vecino ha limpiado parte de su finca y quiere replantar. Duda entre especies suculentas y discontinuas o una pantalla vegetal densa para separar la finca del monte.

### Acción posible

**Recomendar vegetación suculenta y discontinua**

Recomendar vegetación suculenta, de bajo porte y discontinua, como verodes, tabaibas, bejeques o cactus, siempre con separación y mantenimiento.

### Impacto sugerido

```js
impact: {
  continuidadCombustible: -4,
  defensibilidadViviendas: 3,
  riesgoIgnicion: -2
}
```

### Feedback

> Buena decisión. No se trata de llenar la finca de plantas “mágicas”, sino de diseñar un paisaje que no le ponga una pasarela al fuego.

### Consecuencia si se ignora

> La nueva vegetación forma masas continuas cerca de la vivienda. El paisaje queda verde, sí, pero también más conectado para el fuego.

---

## Punto 5 — Camino rural con márgenes invadidos

### Microhistoria

Un camino rural comunica varias fincas con el núcleo. Los márgenes tienen vegetación seca y ramas que estrechan el paso.

### Acción posible

**Limpiar márgenes de caminos rurales**

Limpiar márgenes y mantener el camino practicable como acceso de emergencia o ruta de evacuación.

### Impacto sugerido

```js
impact: {
  accesosDespejados: 4,
  seguridadEquipos: 3,
  riesgoAtrapamiento: -2,
  coordinacionOperativa: 2
}
```

### Feedback

> Buena decisión. Un camino rural puede ser acceso, salida o línea de defensa. Si está invadido por vegetación, se convierte en decoración peligrosa.

### Consecuencia si se ignora

> Los equipos tardan más en acceder a las fincas dispersas. Algunas rutas rurales no están despejadas y complican la defensa.

---

## Punto 6 — Quema agrícola de restos

### Microhistoria

Agricultores de la zona preguntan si podrán quemar restos vegetales antes del verano. Algunos prefieren hacerlo como siempre; otros piden alternativas.

### Acción posible

**Regular quemas agrícolas autorizadas**

Permitir solo quemas autorizadas, con condiciones meteorológicas favorables, ausencia de alerta oficial, horario seguro, perímetro limpio, agua o medios de control y alternativas como trituración o retirada.

### Impacto sugerido

```js
impact: {
  riesgoIgnicion: -5,
  cumplimientoPreventivo: 4,
  confianzaVecinal: 2,
  confusionPublica: -2
}
```

### Feedback

> Buena decisión. La quema agrícola no puede depender del “yo controlo”. Debe estar autorizada, condicionada y suspendida si hay alerta, viento o riesgo alto.

### Consecuencia si se ignora

> Varias llamadas mencionan una quema de restos que se ha descontrolado. Todavía no está confirmado, pero los primeros indicios complican la respuesta.

### Crítica constructiva

Este punto debe formularse con cuidado. No conviene que el juego parezca promover la quema como primera opción. La recomendación debería incluir siempre alternativas como retirada, trituración o compostaje.

---

## Punto 7 — Quema técnica o línea preventiva profesional

### Microhistoria

Técnicos forestales proponen estudiar una quema prescrita o una línea preventiva en una zona estratégica. No es una actuación vecinal: requiere planificación, autorización, meteorología adecuada y medios de control.

### Acción posible

**Solicitar evaluación de quema técnica profesional**

Solicitar evaluación técnica para una actuación profesional de reducción de combustible: quema prescrita, quema de ensanche planificada o línea de defensa.

### Impacto sugerido

```js
impact: {
  controlIncendio: 3,
  continuidadCombustible: -4,
  coordinacionOperativa: 4,
  riesgoIgnicion: 1
}
```

### Feedback

> Buena decisión si se hace con criterio técnico. El fuego puede ser herramienta, pero solo en manos preparadas, con permisos, meteorología favorable y medios de control.

### Consecuencia si se ignora

> Cuando el incendio se aproxime a esta zona, no habrá una línea preventiva preparada ni una actuación técnica estudiada con antelación.

### Crítica constructiva

El pequeño `riesgoIgnicion: 1` es deliberado. Sirve para que la quema técnica no parezca una carta mágica. Incluso bien planteada, exige control, autorización y condiciones adecuadas.

---

## 11. Acciones disponibles

La interfaz podría mostrar estas siete tarjetas:

```txt
1. Gestionar restos de poda
2. Crear discontinuidades vegetales
3. Activar pastoreo preventivo
4. Recomendar vegetación suculenta y discontinua
5. Limpiar márgenes de caminos rurales
6. Regular quemas agrícolas autorizadas
7. Solicitar evaluación de quema técnica profesional
```

La jugadora elige **4**.

---

## 12. Variables principales

```js
estadoPrevencion: {
  riesgoIgnicion: 0,
  continuidadCombustible: 0,
  riesgoPropagacion: 0,
  cumplimientoPreventivo: 0,
  accesosDespejados: 0,
  confianzaVecinal: 0,
  coordinacionOperativa: 0,
  controlIncendio: 0,
  seguridadEquipos: 0,
  danosViviendas: 0
}
```

No es necesario mostrar todas. En pantalla podrían traducirse a barras más comprensibles:

- Riesgo de ignición
- Continuidad del combustible
- Capacidad de acceso
- Confianza vecinal
- Preparación territorial

---

## 13. Combos o bonificaciones

Los combos ayudan a que la pantalla no sea solo una suma de puntos. Premian decisiones coherentes.

## Combo 1 — Menos riesgo de ignición

### Requiere

```js
[
  'quemasAgricolasReguladas',
  'restosPodaGestionados'
]
```

### Opcional

```js
[
  'margenesCaminosLimpios'
]
```

### Texto

> El municipio reduce significativamente las posibilidades de que una chispa, una quema mal gestionada o restos secos acumulados originen el incendio.

### Bonus

```js
bonusImpact: {
  riesgoIgnicion: -3,
  cumplimientoPreventivo: 2
}
```

---

## Combo 2 — Paisaje menos continuo

### Requiere

```js
[
  'discontinuidadesVegetales',
  'vegetacionDiscontinua',
  'restosPodaGestionados'
]
```

### Texto

> Las fincas ya no funcionan como una alfombra continua de combustible entre el monte y las viviendas.

### Bonus

```js
bonusImpact: {
  continuidadCombustible: -3,
  riesgoPropagacion: -2
}
```

---

## Combo 3 — Respuesta rural más segura

### Requiere

```js
[
  'margenesCaminosLimpios',
  'quemaTecnicaEvaluada'
]
```

### Texto

> Los equipos cuentan con mejores accesos y posibles líneas de trabajo si el fuego entra en la zona rural.

### Bonus

```js
bonusImpact: {
  seguridadEquipos: 2,
  coordinacionOperativa: 2
}
```

---

## Combo 4 — Gestión del combustible con identidad local

### Requiere

```js
[
  'pastoreoPreventivoActivado',
  'discontinuidadesVegetales'
]
```

### Texto

> El pastoreo preventivo y las discontinuidades vegetales reducen combustible fino en zonas estratégicas sin convertir toda la prevención en desbrozadora y cemento.

### Bonus

```js
bonusImpact: {
  continuidadCombustible: -2,
  confianzaVecinal: 2
}
```

---

## 14. Consecuencias futuras

Lo importante es que lo no elegido no desaparezca. Debe reaparecer durante la crisis.

### Si no se gestionan restos de poda

```js
flag: 'restosPodaAcumulados'
```

Consecuencia futura:

> El fuego encuentra restos secos acumulados junto a caminos y fincas. La propagación gana velocidad.

### Si no se crean discontinuidades

```js
flag: 'continuidadVegetalAlta'
```

Consecuencia futura:

> El borde entre finca y monte mantiene una continuidad vegetal alta. El fuego podría conectar parcelas y ladera con rapidez.

### Si no se activa pastoreo preventivo

```js
flag: 'sinPastoreoPreventivo'
```

Consecuencia futura:

> No se activa el pastoreo preventivo. Algunas franjas con pasto y matorral seguirán acumulando combustible fino.

### Si no se orienta la replantación

```js
flag: 'replantacionRiesgo'
```

Consecuencia futura:

> La replantación queda sin orientación preventiva. Existe riesgo de que se creen pantallas vegetales densas junto a viviendas.

### Si no se limpian caminos rurales

```js
flag: 'caminosRuralesComplicados'
```

Consecuencia futura:

> Los márgenes de caminos rurales siguen invadidos por vegetación. Esto puede complicar accesos de emergencia y rutas de salida.

### Si no se regulan quemas agrícolas

```js
flag: 'quemasAgricolasSinControl'
```

Consecuencia futura:

> Las quemas agrícolas quedan sin una regulación clara. Una mala práctica podría convertirse en origen de incendio.

### Si no se evalúa quema técnica

```js
flag: 'sinEvaluacionQuemaTecnica'
```

Consecuencia futura:

> No se estudia ninguna línea preventiva profesional. Si el fuego llega a esta zona, habrá menos margen táctico.

---

## 15. Diagnóstico final de la pantalla

## Resultado alto — Fincas menos vulnerables

> Has reducido restos combustibles, limitado actividades de riesgo y roto parte de la continuidad vegetal entre fincas y monte. Si se declara un incendio, tendrá más difícil encontrar una autopista de combustible.

Impacto en crisis:

```js
crisisImpact: {
  riesgoIgnicion: -3,
  riesgoPropagacion: -3,
  seguridadEquipos: 2,
  danosViviendas: -2
}
```

---

## Resultado medio — Riesgo contenido, pero no eliminado

> Algunas medidas clave se han tomado, pero quedan puntos delicados: restos vegetales, caminos rurales, vegetación densa o actividades de riesgo. La zona mejora, aunque sigue dependiendo mucho del comportamiento de vecinos y condiciones meteorológicas.

Impacto en crisis:

```js
crisisImpact: {
  riesgoPropagacion: -1,
  riesgoIgnicion: -1,
  confianzaVecinal: 1
}
```

---

## Resultado bajo — Territorio preparado para arder

> Las fincas mantienen combustible acumulado, actividades de riesgo poco controladas y continuidad vegetal hacia el monte. Si aparece una chispa en mal día, el incendio tendrá demasiadas facilidades.

Impacto en crisis:

```js
crisisImpact: {
  riesgoIgnicion: 4,
  riesgoPropagacion: 4,
  danosViviendas: 3,
  seguridadEquipos: -1
}
```

---

## 16. Código base de la pantalla

```js
export const pantallaFincasVegetacionCombustible = {
  id: 'p-002-fincas-vegetacion-combustible',
  title: 'Fincas, vegetación y gestión del combustible',
  phase: 'prevencion',
  intro:
    'El fuego no siempre avanza por donde quiere. A veces avanza por donde le hemos dejado combustible.',
  context:
    'Sigues visitando municipios antes de la época de mayor riesgo. En esta segunda parada, técnicos municipales, agricultores y ganaderos te muestran varias fincas próximas al monte. Hay restos de poda acumulados, vegetación densa, caminos rurales estrechos, parcelas abandonadas y zonas donde el matorral conecta con viviendas dispersas. El ayuntamiento quiere reducir la continuidad del combustible, pero no puede actuar en todo el territorio a la vez. También hay una propuesta sobre la mesa: usar pastoreo preventivo —las llamadas “ovejas bombero”— para mantener a raya la vegetación en zonas estratégicas.',
  objective:
    'Detecta puntos de riesgo en fincas y zonas rurales próximas al monte. Elige cuatro actuaciones preventivas para reducir el riesgo de ignición y propagación antes de la época de mayor peligro.',
  maxActions: 4,
  nextScreen: 'p-003-comunidad-preparada'
};
```

---

## 17. Recomendación de interfaz

La pantalla debería tener:

- imagen central de fincas y monte;
- siete hotspots numerados;
- panel lateral con vulnerabilidades;
- contador: “Actuaciones disponibles: 4”;
- tarjetas de acción;
- feedback inmediato al seleccionar;
- diagnóstico final.

### Ejemplo de etiquetas del panel lateral

```txt
1 Restos de poda acumulados
2 Vegetación densa en borde de fincas
3 Pastoreo preventivo: ovejas bombero
4 Replantación tras limpiar finca
5 Camino rural con márgenes invadidos
6 Quema agrícola de restos
7 Quema técnica profesional
```

---

## 18. Manual de tono

Esta pantalla debe tener un tono:

- práctico;
- rural;
- didáctico;
- con chispa, pero sin frivolizar;
- crítico con soluciones mágicas;
- respetuoso con agricultores y ganaderos.

### Frases útiles

> El paisaje también se prepara.

> No todo lo verde protege.

> Una quema agrícola no es encender y mirar.

> Las ovejas bombero ayudan, pero no hacen guardias de 24 horas.

> El fuego puede ser herramienta, pero no ocurrencia.

> Reducir combustible no significa borrar el territorio: significa gestionarlo mejor.

---

## 19. Qué no hacer

No conviene:

- presentar las quemas como una solución simple;
- convertir el pastoreo en una broma sin rigor;
- saturar la pantalla con demasiados iconos;
- usar demasiadas variables visibles;
- mezclar dudas vecinales con gestión física del territorio, porque eso puede quedar mejor en la Pantalla 3.

---

## 20. Conexión con la Pantalla 3

La Pantalla 3 debería centrarse en:

- familias sin mochila;
- planes de evacuación;
- personas mayores o sin vehículo;
- canales oficiales;
- puntos de encuentro;
- edificios públicos con protocolo;
- turistas o senderistas.

Así queda clara la lógica:

```txt
Pantalla 1 — Viviendas
Pantalla 2 — Territorio y combustible
Pantalla 3 — Comunidad y preparación social
```

---

## 21. Veredicto de diseño

La Pantalla 2 funciona si se entiende como una pantalla de **gestión del paisaje**.

No debe limitarse a “limpiar fincas”. Debe mostrar que el territorio puede prepararse de muchas formas:

- retirando combustible;
- usando ganadería extensiva;
- regulando quemas;
- orientando replantaciones;
- limpiando caminos;
- y estudiando actuaciones técnicas.

La clave es que la jugadora sienta que está tomando decisiones sobre un territorio vivo, no sobre una maqueta decorativa.
