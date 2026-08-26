# M4 — Aceptación integral del loop de jugador

## Propósito

Este gate demuestra el incremento M4 completo sin sustituir las revisiones experta (#99) ni ciudadana (#100).

## Gate automatizado

```bash
npm run accept:m4
```

`accept:m4` conserva íntegro `accept:m2` y añade `tests/m4-integral-acceptance.test.ts` como prueba explícita del loop de producto.

La aceptación integral cubre:

- entrada sin auto-start y contexto oficial;
- recorrido prepared hasta resultado;
- recorrido vulnerable hasta resultado;
- cinco relaciones causales en ambos resultados;
- comparación con el recorrido canónico opuesto;
- replay a una sesión limpia;
- recuperación del mismo progreso tras simular un reinicio del proceso.

## Smoke de navegador

El workflow levanta el Fastify compilado y ejecuta:

```bash
CHROME_BIN=/ruta/a/chrome M4_BASE_URL=http://127.0.0.1:3001 npm run smoke:m4
```

`scripts/m4-browser-smoke.mjs` usa Chrome headless mediante Chrome DevTools Protocol y APIs nativas de Node 22. No añade Playwright, Cypress ni otra dependencia de navegador.

El smoke reproduce en navegador real:

1. viewport móvil de 390 × 844;
2. landing y `Comenzar partida` mediante teclado;
3. creación real del journal en `localStorage`;
4. reload de página;
5. aparición y activación por teclado de `Continuar partida`;
6. recorrido prepared completo usando los controles de la UI;
7. resultado causal;
8. apertura de `Tu partida y otro recorrido de referencia`;
9. cinco dimensiones por cada lado de la comparación;
10. `Jugar otra partida` desde el cierre comparativo;
11. vuelta a misión con el mismo id técnico y journal `commands: []`;
12. cambio real a viewport desktop de 1280 × 900;
13. reload de la landing en desktop y comprobación del layout de entrada en dos columnas;
14. activación por teclado de `Continuar partida` también en desktop y vuelta a la misión;
15. ausencia de excepciones JavaScript y llamadas `console.error` durante todo el recorrido.

El script imprime `M4_BROWSER_SMOKE_OK` únicamente al completar la secuencia móvil + desktop.

## Evidencia de candidato

La PR final de #151 debe registrar:

- SHA candidato;
- ejecución verde de `Vertical Beta 1 acceptance`;
- resultado de `accept:m4`;
- resultado `M4_BROWSER_SMOKE_OK` cubriendo móvil y desktop;
- dictamen Product Owner;
- dictamen QA.

Si cambia una decisión contractual de #146–#150, la tarea afectada vuelve a refinamiento en lugar de ampliar silenciosamente este gate.
