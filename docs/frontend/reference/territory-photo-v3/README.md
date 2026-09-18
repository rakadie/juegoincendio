# Territorio fotográfico y controles profesionales

Issue de referencia: #176.

## Problema

El mapa vectorial permitía completar la fase, pero abstraía demasiado el relieve y colocaba los controles sobre una superficie plana. Costaba relacionar el barranco, la pista, el pinar, las parcelas y los pastos con las decisiones preventivas. La leyenda tampoco diferenciaba con suficiente jerarquía el lugar, su condición y el estado de la actuación.

## Comportamiento resultante

La escena usa una fotografía aérea original y neutral del paisaje canario. La imagen no incluye actuaciones ejecutadas: el estado real del juego sigue dibujando encima las cinco localizaciones y sus consecuencias.

- Los restos ocupan un claro real y desaparecen al gestionarlos.
- La continuidad sigue la masa de pinar y abre huecos visibles al tratarla.
- El corredor se alinea con la pista fotografiada y pasa a operativo al limpiar márgenes.
- El pastoreo queda limitado a la parcela reconocible del extremo inferior derecho.
- La evaluación técnica se representa como una medición de la ladera; no implica una quema ejecutada.

Los pines usan discos numerados estables, etiquetas oscuras de alto contraste en escritorio y áreas de interacción transparentes mayores de 44 px. En móvil se ocultan las etiquetas sobre la foto y la leyenda pasa a ser el control principal. Cada tarjeta separa nombre, condición y estado tratado/no tratado.

## Capturas reales de navegador

Las imágenes se capturaron con Chrome mediante `Page.captureScreenshot`; no son renders aislados del SVG.

### Antes: mapa vectorial

| Escritorio | Móvil |
|---|---|
| ![Mapa vectorial anterior en escritorio](antes-vectorial-escritorio.png) | ![Mapa vectorial anterior en móvil](antes-vectorial-movil.png) |

### Después: fotografía y estado inicial

| Escritorio | Móvil |
|---|---|
| ![Mapa fotográfico inicial en escritorio](despues-inicial-escritorio.png) | ![Mapa fotográfico inicial en móvil](despues-inicial-movil.png) |

### Después de tres actuaciones

| Escritorio | Móvil |
|---|---|
| ![Mapa fotográfico tratado en escritorio](despues-tratado-escritorio.png) | ![Mapa fotográfico tratado en móvil](despues-tratado-movil.png) |

### Selección táctil

![Tarjeta de actuación abierta con control táctil](menu-tactil-movil.png)

## Validación

- Chrome real a 1280 × 900 y 390 × 844: `M5_VISUAL_SMOKE_OK`.
- Cinco pines y cinco controles; áreas interactivas de al menos 44 px.
- Tarjetas de leyenda de al menos 64 px en escritorio y 66 px en móvil.
- Pines, rótulos visibles y tarjetas sin solapamientos ni recortes.
- La pila de restos ocupa menos del 14 % del ancho y del 16 % del alto del mapa.
- Ratón, teclado y toque abren las tarjetas y permiten elegir acciones.
- Se conserva el límite de tres actuaciones y el avance a vivienda, crisis y resultado.
- `npm run accept:m5`: 195 pruebas Vitest, aceptación M4 y M5, tipos, compilación y auditoría de dependencias en verde.

## Alcance y reversión

No cambian el motor, las acciones, el presupuesto ni las consecuencias. La fotografía es una base neutral; todos los cambios visibles proceden del presentador. Para volver al mapa anterior se puede revertir el commit de esta entrega, incluidos los dos recursos raster y las reglas visuales asociadas.
