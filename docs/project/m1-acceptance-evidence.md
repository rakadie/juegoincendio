# M1 — Evidencias, responsables y bloqueantes

- Fecha: 16 de agosto de 2026
- Issue: #41
- Issue padre: #18
- Checklist de entrada: [`m1-acceptance-gates.md`](m1-acceptance-gates.md), #40
- Estado contrastado: `main@cca57091ad60646787e398e6ad674509c799f5f4`

## 1. Propósito

Este documento asigna a cada criterio `G1-01..G7-05` una evidencia mínima concreta, una persona responsable de validarla, una severidad y un estado. No modifica el significado de los 35 criterios aprobados en #40.

La matriz responde a cuatro preguntas:

1. ¿qué artefacto y comprobación demuestran el criterio?;
2. ¿quién firma su resultado?;
3. ¿un fallo impide cerrar M1?;
4. ¿cuál es su estado antes de la revisión final de #43?

## 2. Responsables

| ID | Responsabilidad | Persona actual | Firma requerida |
|---|---|---|---|
| `R-PRODUCT` | Valida alcance, cantidades, recorrido, causalidad de producto y partidas. | `rakadie` | Comentario o registro firmado en #43. |
| `R-TECH` | Valida contratos, reglas puras, integridad, serialización, tests y límites M1/M2. | `dunay2` | Revisión técnica explícita en #43 o en su PR. |
| `R-EDITORIAL` | Valida coherencia narrativa, i18n, terminología, ejemplos y ausencia de promesas impropias. | `rakadie` | Revisión editorial explícita en #43 o en su PR. |
| `R-ACCEPTANCE` | Congela el SHA, reúne las firmas y publica el resultado final sin reinterpretar criterios. | `rakadie` | Registro final de #43. |

Una misma persona puede ejercer más de un rol, pero las firmas técnica y editorial se registran por separado. Si una persona delega, #43 debe identificar la cuenta sustituta antes de evaluar la primera fila de ese rol; no se acepta una firma anónima como “equipo”.

Esta asignación no sustituye revisores especialistas de incendios. Su designación y trabajo pertenecen a #10 y bloquean la aprobación editorial/publicación cuando proceda, no la definición estructural de M1.

## 3. Severidad

| Severidad | Efecto |
|---|---|
| `m1-blocker` | Un estado distinto de `pass` impide cerrar M1 y declarar preparada la entrada a M2. |
| `post-m1-improvement` | Puede continuar después de M1 con una issue y aceptación propias; no compensa un criterio bloqueante. |

Los 35 criterios de #40 son resultados obligatorios y, por tanto, se clasifican como `m1-blocker`. Rebajar uno a mejora requeriría cambiar primero el alcance de #40 mediante una PR y una decisión enlazada; #41 no puede hacerlo de forma implícita.

El trabajo posterior se registra aparte en la sección 8 para diferenciarlo sin debilitar el checklist maestro.

## 4. Reglas de evidencia

Toda evidencia aceptada en #43 debe incluir:

```text
criterionId
evaluatedMainSha
evidenceIds
artifactLinks
commandAndExitCode, cuando aplique
reviewerRole
reviewerAccount
reviewedAt
result: pass | fail | not-applicable
findingLinks
```

Reglas:

1. todos los artefactos deben pertenecer al mismo SHA de `main`, salvo enlaces históricos de decisión explícitamente identificados;
2. una revisión documental cita archivo y sección; “documentación revisada” no es evidencia suficiente;
3. una comprobación automática registra comando, código de salida y enlace a ejecución o resumen reproducible;
4. una issue o PR cerrada aporta procedencia, no demuestra por sí sola el criterio;
5. una fila con varias evidencias exige que todas estén disponibles y sean coherentes;
6. una contradicción se registra como hallazgo y produce `fail` hasta resolverse;
7. una evidencia futura no puede producir `pass`; la fila permanece `not-evaluated`;
8. los logs extensos se enlazan; el registro final conserva un resumen y los conteos relevantes.

## 5. Catálogo de evidencias

| ID | Artefactos y comprobación mínima | Disponibilidad actual |
|---|---|---|
| `EV-01-CATALOG` | [`vertical-beta-1-catalog.md`](../product/vertical-beta-1-catalog.md): convención, tabla, clasificación `5 + 36 + 10`, desviaciones y tareas #68–#76. Recontar nodos, tipos, inspecciones, `Scenario` y clasificación. | Disponible. |
| `EV-02-GRAPH-SPEC` | [`vertical-beta-1-common-trunk.md`](../product/vertical-beta-1-common-trunk.md), [`vertical-beta-1-crisis-branches.md`](../product/vertical-beta-1-crisis-branches.md), [`vertical-beta-1-graph-transitions.md`](../product/vertical-beta-1-graph-transitions.md) y [`vertical-beta-1-graph-validation.md`](../product/vertical-beta-1-graph-validation.md). Contrastar nodos, aristas, predicados, prioridades y exclusiones. | Disponible. |
| `EV-03-GRAPH-AUTO` | `tests/support/vertical-beta-flow-example.ts` y `tests/vertical-beta-graph-integrity.test.ts`; ejecutar `npm run test:contract` y registrar 4/4 pruebas de integridad dentro del total. | Disponible. |
| `EV-04-SESSION-SPEC` | [`decision-game-domain.md`](../architecture/decision-game-domain.md) y [`game-session-serialization.md`](../domain/game-session-serialization.md): esquema, independencia, serialización, eventos e invariantes. | Disponible. |
| `EV-05-SESSION-FIXTURES` | `tests/fixtures/game-session/*.json` y `coverage.json`: validar round-trip, claves exactas, fases, escenas, ramas y resultados. Los valores causales provisionales no se tratan como parámetros normativos. | Disponible; no sustituye EV-13. |
| `EV-06-SESSION-AUTO` | `tests/support/game-session-contract*.ts` y tests `game-session-*.test.ts`; ejecutar `npm run test:contract`, `npm test`, `npm run typecheck` y `npm run build`. | Disponible. |
| `EV-07-INHERITED-STATE` | Decisiones cerradas #32–#35, [`vertical-beta-1-graph-transitions.md`](../product/vertical-beta-1-graph-transitions.md) y [`vertical-beta-1-causal-inventory.md`](../product/vertical-beta-1-causal-inventory.md). Revisar cinco claves, escala, ocho actuaciones, ejecución, cálculo, vetos, rama y proyección de crisis. | Disponible. |
| `EV-08-CAUSAL-SPEC` | [`vertical-beta-1-causal-inventory.md`](../product/vertical-beta-1-causal-inventory.md), [`vertical-beta-1-causal-matrix.md`](../product/vertical-beta-1-causal-matrix.md) y [`vertical-beta-1-causal-combinations-validation.md`](../product/vertical-beta-1-causal-combinations-validation.md). Recontar 8 actuaciones, 10 consecuencias y C-01–C-05. | Disponible. |
| `EV-09-CAUSAL-REPORT` | [`vertical-beta-1-causal-report.md`](../product/vertical-beta-1-causal-report.md). Comprobar 3–5 relaciones, trazabilidad de omisiones, separación operativa, dos variantes y ausencia de puntuaciones visibles. | Disponible. |
| `EV-10-REFERENCE-BASE` | [`vertical-beta-1-reference-common.md`](../product/vertical-beta-1-reference-common.md): contexto versionado, supuestos, estado base, tronco, presupuesto temporal y variables inmutables compartidas. | Disponible. |
| `EV-11-REFERENCE-PREPARED` | [`vertical-beta-1-reference-prepared.md`](../product/vertical-beta-1-reference-prepared.md): decisiones, evidencias, cálculo, opciones, consecuencias, duración, recorrido e informe `contained`. | Disponible. |
| `EV-12-REFERENCE-VULNERABLE` | [`vertical-beta-1-reference-vulnerable.md`](../product/vertical-beta-1-reference-vulnerable.md): decisiones/omisiones, evidencias, cálculo, opciones, consecuencias, duración, recorrido e informe `overwhelmed`. | Disponible. |
| `EV-13-REFERENCE-AUTO` | [`vertical-beta-1-reference-comparison.md`](../product/vertical-beta-1-reference-comparison.md), `tests/fixtures/game-session/reference-context.json`, `reference-contained.json`, `reference-overwhelmed.json` y `tests/reference-game-sessions.test.ts`; ejecutar suite, round-trip y comparación de contexto/dimensiones/rutas. | Disponible. |
| `EV-14-I18N-SPEC` | Sección i18n de [`vertical-beta-1-catalog.md`](../product/vertical-beta-1-catalog.md) y contrato de [`vertical-beta-1-causal-report.md`](../product/vertical-beta-1-causal-report.md). Inventariar 12 nodos y familias de claves, sin fallback como resultado válido. | Disponible; completar con #45–#46. |
| `EV-15-CROSS-AUDIT` | Informe de #43 en `docs/project/m1-final-acceptance.md`: manifest de fuentes normativas, SHA único, conteos cruzados, hallazgos y estado de las 35 filas. | Pendiente de #43. |

Las rutas previstas para #44–#47 fijan el nombre de la evidencia, no su contenido. Esas issues siguen siendo responsables de diseñar los artefactos.

## 6. Matriz criterio → evidencia → responsable → severidad → estado

### G1 — Escenas e IDs

| Criterio | Evidencia mínima y comprobación | Responsable | Severidad | Estado |
|---|---|---|---|---|
| `G1-01` | `EV-01-CATALOG`: conteos exactos `12 / 6 / 2 / 5`. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |
| `G1-02` | `EV-01-CATALOG` + `EV-03-GRAPH-AUTO`: unicidad, formato y cero alias en referencias objetivo. | `R-TECH` | `m1-blocker` | `not-evaluated` |
| `G1-03` | `EV-01-CATALOG`: ninguna fila oficial carece de función, fuente, entrada, estado o destino. | `R-EDITORIAL` | `m1-blocker` | `not-evaluated` |
| `G1-04` | `EV-01-CATALOG`: clasificación disjunta con total `5 + 36 + 10 = 51` y cero excluidas en el flujo objetivo. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |
| `G1-05` | `EV-01-CATALOG`: cada desviación de la tabla de contraste enlaza al menos una tarea #68–#76. | `R-TECH` | `m1-blocker` | `not-evaluated` |

### G2 — Grafo

| Criterio | Evidencia mínima y comprobación | Responsable | Severidad | Estado |
|---|---|---|---|---|
| `G2-01` | `EV-02-GRAPH-SPEC` + `EV-03-GRAPH-AUTO`: 12 nodos, una entrada y un terminal. | `R-TECH` | `m1-blocker` | `not-evaluated` |
| `G2-02` | `EV-02-GRAPH-SPEC` + `EV-03-GRAPH-AUTO`: dos ramas alcanzables, un barranco y una convergencia. | `R-EDITORIAL` | `m1-blocker` | `not-evaluated` |
| `G2-03` | `EV-02-GRAPH-SPEC`: todas las transiciones tienen predicado/prioridad/destino y las cuatro prioridades cubren todo estado. | `R-TECH` | `m1-blocker` | `not-evaluated` |
| `G2-04` | `EV-03-GRAPH-AUTO`: 4/4 casos de integridad y cero ciclos, huérfanos, rutas muertas, duplicados o referencias excluidas. | `R-TECH` | `m1-blocker` | `not-evaluated` |
| `G2-05` | `EV-02-GRAPH-SPEC`: el ejemplo declarativo solo contiene IDs/referencias y no cuerpos editoriales, deltas o fórmulas duplicadas. | `R-TECH` | `m1-blocker` | `not-evaluated` |

### G3 — `GameSession`

| Criterio | Evidencia mínima y comprobación | Responsable | Severidad | Estado |
|---|---|---|---|---|
| `G3-01` | `EV-04-SESSION-SPEC` + `EV-05-SESSION-FIXTURES`: versión y claves exactas; todos los snapshots pasan round-trip JSON. | `R-TECH` | `m1-blocker` | `not-evaluated` |
| `G3-02` | `EV-05-SESSION-FIXTURES`: `coverage.json` contiene 12 nodos, 5 fases, 2 ramas y 2 variantes sin un segundo esquema. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |
| `G3-03` | `EV-04-SESSION-SPEC` + `EV-06-SESSION-AUTO`: correlación uno a uno de decisiones, escenas, estado, rama y resultado. | `R-TECH` | `m1-blocker` | `not-evaluated` |
| `G3-04` | `EV-05-SESSION-FIXTURES` + `EV-06-SESSION-AUTO`: restauración exacta y casos negativos con códigos estables. | `R-TECH` | `m1-blocker` | `not-evaluated` |
| `G3-05` | `EV-04-SESSION-SPEC` + `EV-06-SESSION-AUTO`: tests ejecutables en Node sin importar HTTP, Fastify, DOM o catálogo textual. | `R-TECH` | `m1-blocker` | `not-evaluated` |

### G4 — `inheritedState`

| Criterio | Evidencia mínima y comprobación | Responsable | Severidad | Estado |
|---|---|---|---|---|
| `G4-01` | `EV-07-INHERITED-STATE`: exactamente cinco enteros `0..100` y dirección favorable explícita por clave. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |
| `G4-02` | `EV-07-INHERITED-STATE`: 8 actuaciones con condición, cuatro estados de ejecución, evidencia y máximo dos efectos directos. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |
| `G4-03` | `EV-07-INHERITED-STATE`: base, deltas, clamp y fórmula trazable reproducen los perfiles aprobados; seleccionar sin completar no cambia estado. | `R-TECH` | `m1-blocker` | `not-evaluated` |
| `G4-04` | `EV-07-INHERITED-STATE` + `EV-02-GRAPH-SPEC`: vetos primero, preparación completa después, residual vulnerable y estado inválido sin rama. | `R-TECH` | `m1-blocker` | `not-evaluated` |
| `G4-05` | `EV-07-INHERITED-STATE` + `EV-08-CAUSAL-SPEC`: cada clave enlaza una consecuencia y escena oficial con interpretación no numérica. | `R-EDITORIAL` | `m1-blocker` | `not-evaluated` |

### G5 — Causalidad

| Criterio | Evidencia mínima y comprobación | Responsable | Severidad | Estado |
|---|---|---|---|---|
| `G5-01` | `EV-08-CAUSAL-SPEC`: cobertura inversa completa de 8 actuaciones y 10 consecuencias. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |
| `G5-02` | `EV-08-CAUSAL-SPEC`: exactamente C-01–C-05 con predicado, prioridad, efecto, escenas, rama y validación. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |
| `G5-03` | `EV-09-CAUSAL-REPORT`: ambos ejemplos contienen 3–5 relaciones y cada relación los cinco pasos trazables. | `R-EDITORIAL` | `m1-blocker` | `not-evaluated` |
| `G5-04` | `EV-09-CAUSAL-REPORT`: un nodo, dos variantes, bloque operativo separado y mejora real conservada en `overwhelmed`. | `R-EDITORIAL` | `m1-blocker` | `not-evaluated` |
| `G5-05` | `EV-08-CAUSAL-SPEC` + `EV-09-CAUSAL-REPORT`: cero causas sociales primarias y todas las afirmaciones operativas enlazadas a su estado/#10. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |

### G6 — Partidas de referencia

| Criterio | Evidencia mínima y comprobación | Responsable | Severidad | Estado |
|---|---|---|---|---|
| `G6-01` | `EV-10-REFERENCE-BASE` + `EV-13-REFERENCE-AUTO`: igualdad exacta del contexto externo y tronco común en ambos fixtures. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |
| `G6-02` | `EV-10-REFERENCE-BASE` + `EV-11-REFERENCE-PREPARED` + `EV-13-REFERENCE-AUTO`: guion completo y resultado `contained`. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |
| `G6-03` | `EV-10-REFERENCE-BASE` + `EV-12-REFERENCE-VULNERABLE` + `EV-13-REFERENCE-AUTO`: guion/omisiones completos y resultado `overwhelmed`. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |
| `G6-04` | `EV-11-REFERENCE-PREPARED` + `EV-12-REFERENCE-VULNERABLE`: diferencias visibles en barranco e informes atribuibles a prevención, no al contexto. | `R-EDITORIAL` | `m1-blocker` | `not-evaluated` |
| `G6-05` | `EV-13-REFERENCE-AUTO`: dos JSON válidos, round-trip, al menos 3 dimensiones distintas y comparación automática de contexto/rutas/resultados. | `R-TECH` | `m1-blocker` | `not-evaluated` |

### G7 — Coherencia editorial transversal

| Criterio | Evidencia mínima y comprobación | Responsable | Severidad | Estado |
|---|---|---|---|---|
| `G7-01` | `EV-15-CROSS-AUDIT`: manifest normativo sin contradicciones; cada fuente anterior incompatible queda alineada o marcada no normativa. | `R-EDITORIAL` | `m1-blocker` | `not-evaluated` |
| `G7-02` | `EV-14-I18N-SPEC` + `EV-15-CROSS-AUDIT`: 12 nodos con familias de claves y regla explícita de error sin fallback. | `R-EDITORIAL` | `m1-blocker` | `not-evaluated` |
| `G7-03` | `EV-01-CATALOG` + `EV-02-GRAPH-SPEC` + `EV-04-SESSION-SPEC` + `EV-15-CROSS-AUDIT`: límites M1/M2 coherentes y desviaciones enlazadas. | `R-TECH` | `m1-blocker` | `not-evaluated` |
| `G7-04` | `EV-08-CAUSAL-SPEC` + `EV-09-CAUSAL-REPORT` + `EV-15-CROSS-AUDIT`: cero garantías reales/umbrales científicos y puertas expertas visibles. | `R-EDITORIAL` | `m1-blocker` | `not-evaluated` |
| `G7-05` | `EV-15-CROSS-AUDIT` + `EV-13-REFERENCE-AUTO`: conteos, orden, reglas, perfiles y resultados coinciden en todas las fuentes. | `R-PRODUCT` | `m1-blocker` | `not-evaluated` |

## 7. Estado inicial y condición de cierre de #41

La matriz contiene:

- 35 criterios únicos;
- 35 evidencias mínimas asignadas;
- 35 responsables identificables;
- 35 severidades `m1-blocker` justificadas por el carácter obligatorio de #40;
- 35 estados `not-evaluated`, porque #43 aún no se ha ejecutado.

G1–G6 disponen de `EV-01..EV-14`; G7 necesita la auditoría cruzada final de #43 para `EV-15`. Esta diferencia de disponibilidad no cambia el estado de aceptación.

## 8. Trabajo posterior y no bloqueante para M1

| Trabajo | Clasificación | Motivo | Seguimiento |
|---|---|---|---|
| Validación experta de afirmaciones operativas y pruebas con ciudadanía | Puerta editorial/de publicación posterior; no bloquea el diseño estructural de M1 ni iniciar implementación. | Requiere perfiles externos y sesiones que no forman parte de la especificación ejecutable. | #10 |
| Implementación del catálogo, motor, flujo, UI, separación de contenido, migración i18n y aceptación integral | Entrega M2, no evidencia de M1. | M1 define contratos objetivo; exigir el runtime nuevo para cerrar M1 produciría una dependencia circular. | #67–#76 |
| Ajustes derivados de pruebas expertas o ciudadanas que no cambien contratos estructurales | `post-m1-improvement`. | Pueden versionarse sobre la implementación; si cambian un criterio G*, M1 debe reabrirse o revalidarse. | Issue específica creada desde #10 |

Una mejora posterior nunca transforma en aceptable un `fail` de G1–G7.

## 9. Exclusiones

Esta entrega no:

- ejecuta los criterios ni marca filas `pass`;
- define la combinación final de puertas que formará la DoR de #42;
- crea los artefactos de #44–#47 o #43;
- exige implementar #67–#76 para cerrar M1;
- declara realizada la validación experta de #10;
- asigna automáticamente personas en GitHub ni envía solicitudes de revisión;
- permite sustituir evidencia técnica por aprobación editorial, o al contrario.

## 10. Matriz de aceptación de #41

| Criterio de #41 | Evidencia en esta entrega | Estado |
|---|---|---|
| Cada criterio tiene evidencia concreta | Catálogo EV-01..15 y 35 filas, secciones 5–6 | Cumplido |
| Bloqueantes diferenciados | Severidad y trabajo posterior, secciones 3 y 8 | Cumplido |
| No se exige implementación M2 | EV-10..13 son especificación/fixtures M1; #67–#76 quedan fuera, sección 8 | Cumplido |
| Revisión editorial y técnica con responsable | `R-EDITORIAL` y `R-TECH` con persona y firma, sección 2 | Cumplido |

## 11. Entregas siguientes

- #42 compone la [`Definition of Ready de M2`](m2-definition-of-ready.md) a partir de los 35 `m1-blocker`, sus firmas y el tratamiento de reapertura;
- #44–#47 produjeron EV-10..13;
- #43 congelará el SHA, producirá EV-15 y evaluará cada fila.
