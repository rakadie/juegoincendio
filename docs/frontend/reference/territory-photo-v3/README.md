# Territorio fotográfico y juego contextual

Issue de referencia: #176.

## Problema

La versión anterior ya usaba una fotografía, pero reservaba demasiado espacio a una lista lateral y desplazaba las explicaciones y decisiones fuera del área visible. El mapa quedaba pequeño, había zonas blancas y la relación entre el punto elegido, la actuación y su efecto se perdía. Los cambios sobre el terreno seguían dependiendo en exceso de líneas y dibujos vectoriales.

## Comportamiento resultante

La fotografía ocupa toda la superficie jugable entre la cabecera y el borde inferior de la ventana. No hay menú derecho ni bandeja bajo el mapa. La información necesaria se reparte en cuatro capas breves:

- título y objetivo, arriba a la izquierda;
- contador de mejoras, arriba a la derecha;
- ficha contextual junto al punto que se abre al tocarlo, enfocarlo o hacer clic;
- confirmación y mejoras elegidas, sobre el borde inferior de la propia fotografía.

Los cinco puntos continúan siendo controles accesibles y conservan sus números, estados y áreas de pulsación. La ficha contextual explica con palabras sencillas qué ocurre y qué mejora se puede realizar. El mapa admite ratón, teclado y toque sin depender de un panel separado.

Los cambios proceden del estado real del juego. Al gestionar vegetación se muestra sobre el lugar una persona trabajando con desbrozadora; al activar el pastoreo aparece un pequeño rebaño de cabras. Son recursos raster fotorrealistas con movimiento CSS suave, integrados en la escena y escalados según la perspectiva. Los restos, huecos entre vegetación y corredor de la pista siguen cambiando con cada actuación. La evaluación técnica permanece identificada como una revisión: el texto confirma que no se ha quemado nada.

Las pantallas explicativas intermedias ya no cortan el recorrido. El motor conserva sus estados y relaciones causales, pero la interfaz avanza directamente desde la prevención a la decisión jugable. La revisión completa de lo realizado y lo pendiente puede abrirse al final de la partida.

## Capturas reales de navegador

Las imágenes se capturaron con Chrome mediante `Page.captureScreenshot`; no son renders aislados del SVG.

### Antes: mapa vectorial

| Escritorio | Móvil |
|---|---|
| ![Mapa vectorial anterior en escritorio](antes-vectorial-escritorio.png) | ![Mapa vectorial anterior en móvil](antes-vectorial-movil.png) |

### Después: fotografía a pantalla completa

| Estado inicial en escritorio | Estado inicial en móvil |
|---|---|
| ![Mapa fotográfico inicial en escritorio](despues-inicial-escritorio.png) | ![Mapa fotográfico inicial en móvil](despues-inicial-movil.png) |

### Después de tres actuaciones

| Escritorio | Móvil |
|---|---|
| ![Mapa fotográfico tratado en escritorio](despues-tratado-escritorio.png) | ![Mapa fotográfico tratado en móvil](despues-tratado-movil.png) |

### Selección táctil contextual

![Ficha de actuación abierta sobre el mapa con control táctil](menu-tactil-movil.png)

### Recorrido y combinación límite

La línea de progreso queda detrás de un fondo opaco y no atraviesa los rótulos de las etapas.

![Cabecera del recorrido sin rótulos atravesados](cabecera-sin-tachado-escritorio.png)

La combinación de mayor reducción de continuidad satura el indicador en `0`; el juego continúa sin errores de validación.

![Estado obtenido con la combinación límite](balance-combinacion-limite-escritorio.png)

## Validación

- Chrome real a 1920 × 920, 1280 × 900 y 390 × 844: `M5_VISUAL_SMOKE_OK`.
- Fotografía ajustada al alto y ancho jugables, sin menú lateral, bandeja inferior ni desplazamiento de página.
- Cinco puntos estables y controles de al menos 44 px; fichas dentro del mapa y acción siempre visible.
- Apertura y selección con ratón, `Tab` + `Enter`/espacio y toque.
- Animaciones raster visibles únicamente cuando el estado correspondiente está aplicado.
- Límite de tres actuaciones y avance directo a vivienda, incendio y resultado.
- Las 30 combinaciones legales de tres actuaciones territoriales y dos de vivienda producen dimensiones enteras entre 0 y 100.
- `npm run accept:m5`: auditoría sin vulnerabilidades, tipos y compilación correctos, 202 pruebas Vitest, 4 pruebas de aceptación M4 y 4 de aceptación M5.

## Alcance y reversión

No cambian el motor, las acciones, el presupuesto ni las consecuencias. La fotografía sigue siendo una base neutral y los cambios visibles proceden del presentador. En móvil, la panorámica completa se mantiene en una banda central y la misma imagen desenfocada ocupa el resto del fondo para evitar recortes de puntos o espacios blancos. Los recursos raster son una primera biblioteca de efectos ampliable con fuego, equipos y animales adicionales.
