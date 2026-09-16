# Barranco y acceso en la fase de crisis

## Problema

La escena anterior dibujaba el barranco, la vía y la vegetación con formas vectoriales abstractas. El fuego y los marcadores dominaban el paisaje, por lo que costaba reconocer el paso real del barranco y entender que los estados preparado y vulnerable describen condiciones distintas sobre el mismo lugar.

## Comportamiento resultante

Una fotografía aérea original y neutral muestra el barranco volcánico, la vía rural, su paso y las copas próximas. La misma imagen se reutiliza en todas las rutas. Encima se mantienen como SVG generado desde el estado real del juego:

- la disponibilidad o bloqueo de la vía;
- la ruta de repliegue y la posición operativa;
- la presión del incendio y su humo;
- la oportunidad de ataque, el riesgo de copas y la capacidad operativa.

La foto no contiene fuego, equipos, símbolos ni una intervención ya ejecutada. Por tanto, no anticipa consecuencias ni confunde una evaluación con una actuación. La llama se ha reducido y los trazados se han alineado con la vía y el paso visibles.

## Capturas reales de navegador

Las capturas proceden del recorrido automatizado en Chrome mediante `Page.captureScreenshot`; no son renders aislados del SVG.

### Antes

![Escena vectorial vulnerable en escritorio](antes-vectorial-vulnerable-escritorio.png)

### Después

| Preparado, escritorio | Vulnerable, escritorio |
|---|---|
| ![Barranco preparado en escritorio](despues-preparado-escritorio.png) | ![Barranco vulnerable en escritorio](despues-vulnerable-escritorio.png) |

| Preparado, móvil | Vulnerable, móvil |
|---|---|
| ![Barranco preparado en móvil](despues-preparado-movil.png) | ![Barranco vulnerable en móvil](despues-vulnerable-movil.png) |

## Validación visual

- Escritorio a 1280 × 900 y móvil a 390 × 844.
- Foto completa, sin recortes, barras vacías ni desbordamiento horizontal.
- Recurso JPEG servido correctamente y base idéntica en las rutas preparada y vulnerable.
- Indicador de capacidad con zona táctil mínima de 44 px en móvil.
- Llama limitada para que no domine la escena; vía, repliegue, posición, copas y oportunidad permanecen dentro del lienzo.
- Recorrido completo desde territorio y vivienda hasta ambas variantes de emergencia y el resultado final.

La comprobación de navegador finaliza con `M5_VISUAL_SMOKE_OK`.
