# Acta de aceptación integral de M2

- Issue: #76
- Épica: #67
- Línea base previa: `main@f5cf733eb663833446b5742dd4ee03ea2815a237`
- Entrega: PR #133
- Commit de integración: `fe2cf15f189a93ad0d8da76de0a4b01bd15793f1`
- Estado: **M2 aceptado — todas las puertas automáticas superadas**

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

La puerta oficial es:

```bash
npm run accept:m2
```

Ese comando incluye, en este orden:

1. `npm audit`;
2. typecheck TypeScript;
3. build completo;
4. suite Vitest completa, incluidos catálogo, contexto, sesión, flujo, contenido, i18n, interfaz y aceptación integral.

El workflow `Vertical Beta 1 acceptance` se ejecuta en cada pull request, en cada actualización de `main` y manualmente mediante `workflow_dispatch`.

## 3. Catálogo y contenido oficial

La aceptación exige simultáneamente:

- 12 nodos canónicos únicos;
- los seis tipos `briefing`, `inspection`, `summary`, `decision`, `router` y `result`;
- un grafo válido, alcanzable y sin ciclos;
- cinco proyecciones `Scenario` con IDs canónicos;
- dos inspecciones oficiales;
- catálogo i18n estricto para los 12 nodos;
- payload oficial idéntico al contrato productivo;
- ausencia de biblioteca, archivo, campaña paralela e IDs históricos en el payload del jugador.

Los validadores de catálogo e i18n se ejecutan sobre los objetos productivos, no sobre copias exclusivas de test.

## 4. Contexto fijo consumido por el runtime

El manifest `vb1-reference-context-v1` es configuración inmutable de aplicación y no una clave nueva de `GameSession`.

Cada reproducción inyecta en `buildApp` exactamente:

- municipio ficticio `fictional-ravine-interface-municipality-v1`;
- perfil meteorológico `dry-windy-daylight-v1`;
- ignición `lower-ravine-rural-track-v1`;
- ruleset `m1-reference-rules-v1`;
- esquema de sesión `1`;
- cuotas `3 + 2`;
- primer aviso `movilizar-y-verificar`;
- `randomness: none`;
- ausencia de cambios meteorológicos durante la sesión.

El contexto acompaña todas las respuestas de sesión. Una alteración del manifest, incluso para activar azar, produce `invalid-runtime-context`. De esta forma las dos partidas consumen la misma envolvente externa y solo difieren por sus decisiones preventivas y consecuencias derivadas.

## 5. Partidas canónicas por la API real

La prueba `tests/m2-integral-acceptance.test.ts` ejecuta dos veces cada recorrido mediante los endpoints que consume la interfaz:

```text
POST /api/game-sessions
POST /api/game-sessions/:id/actions
POST /api/game-sessions/:id/advance
```

Para cada repetición reconstruye la sesión serializable y la compara íntegramente con su fixture, normalizando únicamente el UUID generado para la sesión.

### Municipio preparado

Reproduce exactamente:

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

Reproduce exactamente:

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

Ambas partidas usan el mismo contexto externo y permanecen dentro del presupuesto aprobado de 20–25 minutos y nueve decisiones.

## 6. Sincronización de los fixtures

La ejecución integral detectó que los fixtures M1 no conservaban toda la evidencia que el motor productivo ya registraba correctamente:

- condiciones observadas que permanecen cuando una actuación se omite;
- evidencia de la maniobra de emergencia realmente seleccionada;
- evidencia del corredor operativo temporal en la rama vulnerable.

No se redujo la evidencia del motor para hacer pasar la prueba. Los fixtures se sincronizaron con el historial causal productivo, manteniendo sin cambios:

- las nueve decisiones;
- los diez nodos;
- los 32 eventos;
- las cinco dimensiones;
- las ramas;
- los resultados.

## 7. Ausencia de modelo paralelo

La aceptación falla si el entrypoint del jugador o la vista vuelven a contener o importar:

- `WINTER_CAMPAIGN_NODES` o `SUMMER_CAMPAIGN_NODES`;
- `winterNodes`, `summerNodes` o `resultado-beta`;
- `ruta-comunicacion`;
- catálogo editorial, biblioteca o archivo;
- agregación preventiva, selección de rama o resultado dentro del HTML;
- umbrales de `fuelLoad`, `fuelContinuity` o `attackOpportunity` en la vista;
- estado mutable paralelo al `currentView` recibido desde aplicación.

## 8. Evidencias automáticas

| Evidencia | Prueba o comando |
|---|---|
| Catálogo productivo | `tests/game-scene-catalog.test.ts` y aceptación integral |
| Contexto fijo sin azar | `vertical-beta-runtime-context.ts` y aceptación integral |
| `GameSession` e invariantes | suites `game-session-*` |
| Inspecciones | `tests/prevention-inspections.test.ts` |
| Escenas operativas | `tests/operational-scenes.test.ts` |
| Flujo, router y resultado | `tests/vertical-beta-flow.test.ts` |
| Frontera HTTP/aplicación/motor | `tests/vertical-beta-application.test.ts` y aceptación integral |
| Separación de contenido | `tests/content-boundaries.test.ts` |
| IDs e i18n | `tests/vertical-beta-i18n.test.ts` |
| Fixtures de referencia | `tests/reference-game-sessions.test.ts` |
| Recorridos integrales reproducibles | `tests/m2-integral-acceptance.test.ts` |
| Vista sin reglas | `tests/prototype-page.test.ts` y aceptación integral |
| Seguridad, tipos y compilación | `npm run accept:m2` |

## 9. Resultado final

La candidata final superó:

```text
npm audit               0 vulnerabilidades
TypeScript typecheck    correcto
Build                    correcto
Archivos de prueba       17/17
Pruebas                   110/110
Aceptación integral       4/4
Hilos bloqueantes         0
```

La revisión independiente produjo:

- Copilot: aprobación recomendada y cero comentarios;
- Codex: un P2 sobre inyección del contexto común;
- tratamiento: contexto convertido en configuración inmutable, inyectado en todas las reproducciones y verificado en cada respuesta;
- hilo resuelto antes de la integración.

## 10. Decisión

Se cumplen las condiciones de cierre de #76 y de la épica #67:

1. PR #133 integrada en `main`;
2. workflow verde sobre la candidata final;
3. ningún hilo de revisión bloqueante;
4. integración y evidencia registradas;
5. `npm run accept:m2` establecido como puerta única de M2.

**Decisión: M2 completado y aceptado.**
