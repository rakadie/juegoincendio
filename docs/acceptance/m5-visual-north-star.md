# M5 — aceptación visual contra el north star

## Propósito

M5 valida que la Vertical Beta 1 se acerca a la dirección visual aprobada en `docs/frontend/reference/m3-north-star-ui.jpg` sin convertir esa imagen en una especificación pixel-perfect ni modificar dominio, causalidad o reglas.

La autoridad sigue siendo:

```text
GameSession
→ presenter
→ PresentedSceneVisualModel
→ SVG + HTML accesible
```

## Gate automatizado

```bash
npm run accept:m5
```

`accept:m5` incluye íntegramente `accept:m4` y añade la aceptación integral M5.

## Smoke visual real

El mismo harness CDP de M4 tiene un modo M5 activado con `M5_CAPTURE_DIR`:

```bash
PORT=3001 npm start
CHROME_BIN=/ruta/a/chrome \
M4_BASE_URL=http://127.0.0.1:3001 \
M5_CAPTURE_DIR=artifacts/m5-visual \
npm run smoke:m5
```

En Windows PowerShell se pueden definir las mismas variables mediante `$env:CHROME_BIN`, `$env:M4_BASE_URL` y `$env:M5_CAPTURE_DIR` antes de ejecutar `npm run smoke:m5`.

## Evidencia generada

El gate produce PNG de navegador real:

1. `territory-initial-mobile.png`
2. `territory-treated-desktop.png`
3. `housing-initial-mobile.png`
4. `housing-treated-desktop.png`
5. `crisis-prepared-desktop.png`
6. `crisis-vulnerable-desktop.png`
7. `result-desktop.png`
8. `comparison-desktop.png`
9. `manifest.json`

En CI se suben como artefacto `m5-visual-evidence`.

## Qué se valida antes de cada captura

- la escena/selector esperado existe;
- el objetivo visual tiene tamaño mínimo;
- no está oculto;
- no existe overflow horizontal crítico;
- los controles de start, continuar, comparación y replay funcionan por teclado;
- `localStorage` real soporta reload y continuidad;
- prepared y vulnerable usan la misma base canónica de barranco;
- comparación presenta dos lados y cinco dimensiones por lado;
- consola y excepciones runtime permanecen limpias.

Las capturas son evidencia de revisión humana y trazabilidad. **No se comparan píxeles** ni se convierten en nueva fuente de verdad.

## Robustez del launcher Chrome

Tras observar timeouts esporádicos de CDP en runners anteriores, el harness intenta hasta tres arranques con:

- puerto CDP distinto por intento;
- perfil temporal limpio por intento;
- detección de salida prematura de Chrome;
- stderr conservado para diagnóstico;
- cleanup explícito entre intentos.

Esto endurece infraestructura de prueba; no relaja ningún gate de producto.

## Límites

M5 no sustituye:

- #99 revisión experta operativa;
- #100 pruebas ciudadanas de comprensión/accesibilidad;
- validación científica de comportamiento del fuego;
- publicación pública.
