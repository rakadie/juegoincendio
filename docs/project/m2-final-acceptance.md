# Acta de aceptación integral de M2

- Issue: #76
- Épica: #67
- Línea base: `main@f5cf733eb663833446b5742dd4ee03ea2815a237`
- Entrega: PR de aceptación integral de M2
- Estado inicial del acta: candidata; la decisión final se registra tras integrar una ejecución verde

## 1. Objetivo

Demostrar con una única puerta reproducible que la Vertical Beta 1 implementada coincide con la especificación aceptada en M1 y que no sobrevive un segundo modelo ejecutable.

La aceptación atraviesa las mismas fronteras utilizadas por el jugador:

```text
HTTP del producto
→ VerticalBetaApplicationService
→ GameSession y motores de dominio
→ nuevo estado presentado por la interfaz
```

Las comprobaciones estáticas del HTML se conservan como smoke tests, pero no sustituyen la ejecución completa de las partidas.

## 2. Comando único

La puerta de CI ejecuta:

```bash
npm run accept:m2
```

Ese comando incluye, en este orden:

1. `npm audit`;
2. typecheck TypeScript;
3. build completo;
4. suite Vitest completa, incluidos catálogo, sesión, flujo, contenido, i18n, interfaz y aceptación integral.

El workflow `Vertical Beta 1 acceptance` se ejecuta en cada pull request, en cada actualización de `main` y manualmente mediante `workflow_dispatch`.

## 3. Catálogo y contenido oficial

La prueba de aceptación exige simultáneamente:

- 12 nodos canónicos únicos;
- los seis tipos `briefing`, `inspection`, `summary`, `decision`, `router` y `result`;
- un grafo válido, alcanzable y sin ciclos;
- cinco proyecciones `Scenario` con IDs canónicos;
- dos inspecciones oficiales;
- catálogo i18n estricto para los 12 nodos;
- payload oficial idéntico al contrato productivo;
- ausencia de biblioteca, archivo, campaña paralela e IDs históricos en el payload del jugador.

Los validadores de catálogo e i18n se ejecutan sobre los objetos productivos, no sobre copias exclusivas de test.

## 4. Partidas canónicas por la API real

La prueba `tests/m2-integral-acceptance.test.ts` ejecuta dos veces cada recorrido mediante los endpoints que consume la interfaz:

```text
POST /api/game-sessions
POST /api/game-sessions/:id/actions
POST /api/game-sessions/:id/advance
```

Para cada repetición reconstruye la sesión serializable y la compara íntegramente con su fixture M1, normalizando únicamente el UUID generado para la sesión.

### Municipio preparado

Debe reproducir exactamente:

- 9 decisiones;
- 10 nodos visitados;
- 32 eventos ordenados;
- `fuelLoad: 45`;
- `fuelContinuity: 25`;
- `operationalAccess: 80`;
- `defensibility: 50`;
- `attackOpportunity: 66`;
- rama `prepared`;
- resultado `contained`;
- posición del barranco sostenible con repliegue;
- cinco relaciones causales finales.

### Territorio vulnerable

Debe reproducir exactamente:

- 9 decisiones;
- 10 nodos visitados;
- 32 eventos ordenados;
- `fuelLoad: 25`;
- `fuelContinuity: 35`;
- `operationalAccess: 20`;
- `defensibility: 30`;
- `attackOpportunity: 24`;
- rama `vulnerable`;
- resultado `overwhelmed`;
- ataque anclado y ataque directo bloqueados;
- posición del barranco no sostenible;
- cinco relaciones causales finales.

Ambas partidas utilizan el mismo contexto externo, `randomness: none`, cuotas `3 + 2`, un máximo de nueve decisiones y el presupuesto aprobado de 20–25 minutos.

## 5. Ausencia de modelo paralelo

La aceptación falla si el entrypoint del jugador o la vista vuelven a contener o importar:

- `WINTER_CAMPAIGN_NODES` o `SUMMER_CAMPAIGN_NODES`;
- `winterNodes`, `summerNodes` o `resultado-beta`;
- `ruta-comunicacion`;
- catálogo editorial, biblioteca o archivo;
- agregación preventiva, selección de rama o resultado dentro del HTML;
- umbrales de `fuelLoad`, `fuelContinuity` o `attackOpportunity` en la vista;
- estado mutable paralelo al `currentView` recibido desde aplicación.

## 6. Evidencias automáticas

| Evidencia | Prueba o comando |
|---|---|
| Catálogo productivo | `tests/game-scene-catalog.test.ts` y aceptación integral |
| `GameSession` e invariantes | suites `game-session-*` |
| Inspecciones | `tests/prevention-inspections.test.ts` |
| Escenas operativas | `tests/operational-scenes.test.ts` |
| Flujo, router y resultado | `tests/vertical-beta-flow.test.ts` |
| Frontera HTTP/aplicación/motor | `tests/vertical-beta-application.test.ts` y aceptación integral |
| Separación de contenido | `tests/content-boundaries.test.ts` |
| IDs e i18n | `tests/vertical-beta-i18n.test.ts` |
| Fixtures M1 | `tests/reference-game-sessions.test.ts` |
| Recorridos integrales reproducibles | `tests/m2-integral-acceptance.test.ts` |
| Vista sin reglas | `tests/prototype-page.test.ts` y aceptación integral |
| Seguridad, tipos y compilación | `npm run accept:m2` |

## 7. Criterio de cierre

#76 y #67 pueden cerrarse cuando:

1. la PR esté integrada en `main`;
2. la ejecución del workflow sobre la candidata sea verde;
3. no queden hilos de revisión bloqueantes;
4. el commit de integración quede registrado en esta acta y en las issues;
5. `npm run accept:m2` sea el único comando oficial de aceptación de M2.
