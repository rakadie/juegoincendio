# Prevención alrededor de la vivienda

Issue: #192. Referencia integrada: PR #190.

## Problema

La escena fotográfica anterior seguía encajada entre un encabezado grande, un menú lateral y una respuesta situada debajo del mapa. La casa perdía protagonismo, las opciones requerían desplazamiento y el jugador podía separar mentalmente la decisión del elemento real que estaba observando. La poda se explicaba con trazos vectoriales, sin mostrar quién realiza el trabajo.

## Comportamiento resultante

La fotografía aérea ocupa toda la superficie jugable. La vivienda, las copas, la vegetación baja y el acceso mantienen una perspectiva común con el mapa de fincas. No existe una columna de tarjetas: cada punto abre sobre la propia fotografía una ficha contextual compacta y accesible. El objetivo, el contador, la respuesta a la última decisión y el botón para continuar también flotan sobre el mapa sin crear una segunda pantalla.

Los cambios proceden de las decisiones registradas por el motor:

- Podar ramas y gestionar biomasa retira la vegetación seca, muestra el suelo gestionado y añade una persona trabajando con desbrozadora.
- Separar copas abre dos discontinuidades visibles entre los árboles.
- Despejar accesos retira los obstáculos y revela el corredor operativo de entrada y salida.

La persona trabajando es una imagen raster fotorrealista con movimiento CSS breve, no un icono vectorial. Solo aparece cuando se ha aplicado la actuación. La confirmación usa frases breves como «Al fuego le cuesta más subir a las copas» y deja claro que se reducen riesgos y se mejoran condiciones, sin presentar la vivienda como completamente segura.

El presupuesto sigue siendo de dos actuaciones entre tres opciones en vivienda y de tres actuaciones en territorio. No cambian impactos, estados, rutas ni consecuencias. Las pantallas de balance y encaminamiento intermedias se recorren internamente sin interrumpir la partida. En el resultado final se puede desplegar una revisión con las mejoras realizadas, las condiciones pendientes y el aviso de que ninguna medida elimina todo el riesgo.

## Capturas reales de navegador

Las imágenes de esta carpeta proceden de Chrome real mediante `Page.captureScreenshot`; no son renders SVG aislados.

### Antes

| Móvil, estado inicial | Escritorio, dos actuaciones aplicadas |
|---|---|
| ![Escena anterior en móvil](antes-movil.png) | ![Escena anterior en escritorio](antes-escritorio.png) |

### Nueva escena y efectos

| Estado inicial | Vegetación baja gestionada |
|---|---|
| ![Nueva escena inicial en móvil](vivienda-inicial-movil.png) | ![Poda y biomasa gestionada en móvil](vivienda-poda-movil.png) |

| Estado inicial en escritorio | Poda y acceso despejado | Copas separadas |
|---|---|---|
| ![Nueva escena inicial en escritorio](vivienda-inicial-escritorio.png) | ![Vegetación baja gestionada y acceso despejado](vivienda-acceso-escritorio.png) | ![Vegetación baja gestionada y copas separadas](vivienda-copas-escritorio.png) |

La respuesta se mantiene sobre la fotografía y no compite con la ficha de elección:

![Confirmación de la actuación en móvil](respuesta-movil.png)

La revisión final distingue lo aplicado y lo que quedó pendiente:

![Revisión preventiva al final de la partida](balance-escritorio.png)

## Validación realizada

- `npm run accept:m5`: auditoría sin vulnerabilidades, tipos y compilación correctos, 202 pruebas Vitest, 4 pruebas de aceptación M4 y 4 de aceptación M5.
- Chrome real a 1920 × 920, 1280 × 900 y 390 × 844: `M5_VISUAL_SMOKE_OK`, sin desplazamiento de página, espacios blancos, tarjetas laterales ni acciones fuera de pantalla.
- Apertura y selección de los tres puntos con toque, teclado y ratón; la ficha permanece dentro del lienzo.
- Comprobación antes/después de vegetación baja, copas y acceso mediante estilos calculados del navegador.
- Persona con desbrozadora visible y animada únicamente tras aplicar la poda.
- Confirmación causal visible, una actuación restante tras la primera elección y bloqueo de la tercera opción al alcanzar 2/2.
- Revisión final con decisiones aplicadas y condiciones pendientes de territorio y vivienda.
- Recorrido completo de las rutas preparada y vulnerable hasta incendio y resultado. Se conserva la evaluación técnica como evaluación, sin representar una quema ejecutada.
- Las escenas de incendio continúan reutilizando el marcador corregido por #190.

## Cómo probar el recorrido

1. Ejecutar `npm ci`, `npm run build` y `npm start`.
2. Abrir la aplicación y comenzar una partida.
3. Elegir tres mejoras en fincas tocando los puntos de la fotografía.
4. En vivienda, abrir los puntos 1, 2 y 3 con ratón, `Tab` + `Enter`/espacio o toque. Aplicar dos actuaciones y comparar el elemento antes y después.
5. Verificar la confirmación, el contador 2/2 y la tercera opción deshabilitada.
6. Continuar directamente al incendio y abrir «Revisar toda la preparación» en el resultado final.

## Limitaciones y reversión

Las imágenes de fondo y los actores raster son recursos educativos y no documentan una finca, vivienda o cuadrilla reales. En móvil se conserva la panorámica completa en una banda central, acompañada por una ampliación desenfocada del mismo paisaje, para que ningún punto quede recortado. El presupuesto obliga a dejar una condición de vivienda pendiente y la revisión final la hace explícita.
