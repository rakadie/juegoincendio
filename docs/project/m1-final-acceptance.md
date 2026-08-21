# Acta final de aceptación de M1

- Issue: #43
- Línea base evaluada: `main@8ef0916331f0fb0fac5169d74d68ec30dd41e3ff`
- Fecha de auditoría: `2026-08-18T20:54:18+01:00`
- Auditor: `rakadie`, rol `R-ACCEPTANCE`
- Criterios: **35/35 `pass`**
- Hallazgos de criterio `m1-blocker`: **0**
- Decisión actual de DoR: **`WAITING-EVIDENCE` — M2 todavía no está autorizado**

## 1. Alcance y método

La revisión aplica sin reinterpretación los 35 criterios de [`m1-acceptance-gates.md`](m1-acceptance-gates.md) y las reglas de evidencia de [`m1-acceptance-evidence.md`](m1-acceptance-evidence.md). La línea base es el merge de #47, anterior a esta acta; la PR de #43 debe integrarse como descendiente de ese SHA para satisfacer `DR-01-BASELINE`.

Cada resultado de las secciones 4–10 hereda estos campos comunes:

```text
evaluatedMainSha: 8ef0916331f0fb0fac5169d74d68ec30dd41e3ff
reviewerRole: R-ACCEPTANCE
reviewerAccount: rakadie
reviewedAt: 2026-08-18T20:54:18+01:00
result: pass
findingLinks: []
```

La auditoría de aceptación constata el resultado; no sustituye las firmas separadas exigidas por `DR-05-SIGNATURES`. El rol responsable de cada fila aparece en las tablas y debe ratificar su grupo sobre el mismo SHA.

## 2. Manifest de evidencia `EV-01..EV-15`

| Evidencia | Artefactos congelados en la línea base | Comprobación |
|---|---|---|
| `EV-01-CATALOG` | [`vertical-beta-1-catalog.md`](../product/vertical-beta-1-catalog.md) | 12 nodos, 6 tipos, 2 inspecciones, 5 `Scenario`, clasificación `5 + 36 + 10` y destino #68–#76. |
| `EV-02-GRAPH-SPEC` | [`vertical-beta-1-common-trunk.md`](../product/vertical-beta-1-common-trunk.md), [`vertical-beta-1-crisis-branches.md`](../product/vertical-beta-1-crisis-branches.md), [`vertical-beta-1-graph-transitions.md`](../product/vertical-beta-1-graph-transitions.md), [`vertical-beta-1-graph-validation.md`](../product/vertical-beta-1-graph-validation.md) | IDs, 13 aristas, predicados, prioridades, una entrada y un terminal. |
| `EV-03-GRAPH-AUTO` | `tests/support/vertical-beta-flow-example.ts`, `tests/vertical-beta-graph-integrity.test.ts` | 4/4 pruebas: referencias, alcance, aciclicidad, ramas y barranco compartido. |
| `EV-04-SESSION-SPEC` | [`decision-game-domain.md`](../architecture/decision-game-domain.md), [`game-session-serialization.md`](../domain/game-session-serialization.md) | Esquema único, nueve claves, eventos, serialización y límites. |
| `EV-05-SESSION-FIXTURES` | `tests/fixtures/game-session/*.json` | Cobertura de 12 nodos, 5 fases, 2 ramas y 2 resultados; round-trip. |
| `EV-06-SESSION-AUTO` | `tests/support/game-session-contract*.ts`, `tests/game-session-*.test.ts` | Correlación, restauración, orden, transiciones y corrupción. |
| `EV-07-INHERITED-STATE` | [`vertical-beta-1-graph-transitions.md`](../product/vertical-beta-1-graph-transitions.md), [`vertical-beta-1-causal-inventory.md`](../product/vertical-beta-1-causal-inventory.md) | Cinco dimensiones, ocho actuaciones, fórmula, ejecución y vetos. |
| `EV-08-CAUSAL-SPEC` | [`vertical-beta-1-causal-inventory.md`](../product/vertical-beta-1-causal-inventory.md), [`vertical-beta-1-causal-matrix.md`](../product/vertical-beta-1-causal-matrix.md), [`vertical-beta-1-causal-combinations-validation.md`](../product/vertical-beta-1-causal-combinations-validation.md) | 8 actuaciones, 10 consecuencias y C-01..C-05. |
| `EV-09-CAUSAL-REPORT` | [`vertical-beta-1-causal-report.md`](../product/vertical-beta-1-causal-report.md) | Trazabilidad completa, 3–5 relaciones, variantes y separación operativa. |
| `EV-10-REFERENCE-BASE` | [`vertical-beta-1-reference-common.md`](../product/vertical-beta-1-reference-common.md) | Contexto único, tronco, estado base, duración y exclusiones. |
| `EV-11-REFERENCE-PREPARED` | [`vertical-beta-1-reference-prepared.md`](../product/vertical-beta-1-reference-prepared.md) | Guion preparado completo hasta `contained`. |
| `EV-12-REFERENCE-VULNERABLE` | [`vertical-beta-1-reference-vulnerable.md`](../product/vertical-beta-1-reference-vulnerable.md) | Guion vulnerable completo hasta `overwhelmed`. |
| `EV-13-REFERENCE-AUTO` | [`vertical-beta-1-reference-comparison.md`](../product/vertical-beta-1-reference-comparison.md), fixtures `reference-*.json`, `tests/reference-game-sessions.test.ts` | Contexto, rutas, decisiones, cinco dimensiones y resultados comparados. |
| `EV-14-I18N-SPEC` | [`vertical-beta-1-catalog.md`](../product/vertical-beta-1-catalog.md), [`vertical-beta-1-causal-report.md`](../product/vertical-beta-1-causal-report.md) | 12 nodos con texto, familias de claves y error obligatorio sin fallback. |
| `EV-15-CROSS-AUDIT` | Este informe y `tests/m1-final-acceptance.test.ts` | 35 IDs, 15 evidencias, fuentes, vocabulario canónico, i18n, frontera M1/M2 y partidas. |

Todos los archivos pertenecen al mismo SHA salvo esta acta y su prueba, que se integrarán en un commit descendiente sin modificar las fuentes evaluadas.

## 3. Comprobaciones reproducibles

| Comando | Resultado sobre la rama de #43 | Código |
|---|---:|---:|
| `npm run test:m1-acceptance` | 7 archivos, 49/49 pruebas | `0` |
| `vitest run tests/prototype-page.test.ts` | 1 archivo, 3/3 pruebas | `0` |
| Cobertura final combinada | 8 archivos, 52/52 pruebas | `0 + 0` |
| `tsc --noEmit` | TypeScript sin errores | `0` |
| `tsc -p tsconfig.json` | Build completo | `0` |

La primera ejecución de `test:m1-acceptance` detectó que el patrón del propio test no admitía el dígito de `EV-14-I18N-SPEC`. Se corrigió el patrón y se repitieron todas las comprobaciones. No se alteró ninguna fuente normativa para forzar el resultado.

La repetición monolítica final de `npm test` se intentó dos veces y agotó el tiempo del orquestador antes de emitir resultados durante una degradación general de PowerShell. No se registra como pase. Para obtener evidencia completa, los mismos ocho archivos se ejecutaron en dos invocaciones: 49 pruebas de aceptación/contrato y 3 pruebas de interfaz, ambas con código `0`. Typecheck y build se repitieron después, también con código `0`.

## 4. G1 — Escenas e IDs

| `criterionId` | `evidenceIds` | Resultado observado | Responsable | Resultado |
|---|---|---|---|---|
| `G1-01` | EV-01, EV-15 | Conteos exactos `12 / 6 / 2 / 5`. | `R-PRODUCT` | `pass` |
| `G1-02` | EV-01, EV-03, EV-15 | IDs únicos `kebab-case`; grafo sin alias ejecutables. | `R-TECH` | `pass` |
| `G1-03` | EV-01 | Las 12 filas declaran función, fuente, entrada, estado y destino. | `R-EDITORIAL` | `pass` |
| `G1-04` | EV-01, EV-15 | Clasificación disjunta `5 + 36 + 10 = 51`; exclusiones fuera del flujo. | `R-PRODUCT` | `pass` |
| `G1-05` | EV-01, EV-15 | Todas las desviaciones se asignan a #68–#76 y se declaran pendientes M2. | `R-TECH` | `pass` |

## 5. G2 — Grafo

| `criterionId` | `evidenceIds` | Resultado observado | Responsable | Resultado |
|---|---|---|---|---|
| `G2-01` | EV-02, EV-03 | 12 nodos, entrada única y terminal único. | `R-TECH` | `pass` |
| `G2-02` | EV-02, EV-03 | Dos ramas alcanzables, un barranco y convergencia en un nodo final. | `R-EDITORIAL` | `pass` |
| `G2-03` | EV-02 | Transiciones con origen, predicado, prioridad y destino; cuatro niveles exhaustivos. | `R-TECH` | `pass` |
| `G2-04` | EV-03 | 4/4 pruebas; cero ciclos, huérfanos, rutas muertas, duplicados o referencias excluidas. | `R-TECH` | `pass` |
| `G2-05` | EV-02, EV-03 | Grafo declarativo limitado a IDs, referencias y predicados. | `R-TECH` | `pass` |

## 6. G3 — `GameSession`

| `criterionId` | `evidenceIds` | Resultado observado | Responsable | Resultado |
|---|---|---|---|---|
| `G3-01` | EV-04, EV-05, EV-06 | Esquema v1, nueve claves exactas y round-trip JSON. | `R-TECH` | `pass` |
| `G3-02` | EV-05, EV-15 | Un contrato cubre 12 nodos, 5 fases, 2 ramas y 2 variantes. | `R-PRODUCT` | `pass` |
| `G3-03` | EV-04, EV-06 | Correlación uno a uno de decisiones, escenas, estado, rama y resultado. | `R-TECH` | `pass` |
| `G3-04` | EV-05, EV-06 | Restauración exacta y rechazo de corrupción con códigos estables. | `R-TECH` | `pass` |
| `G3-05` | EV-04, EV-06 | Tests puros en Node, sin HTTP, Fastify, DOM ni texto editorial. | `R-TECH` | `pass` |

## 7. G4 — `inheritedState`

| `criterionId` | `evidenceIds` | Resultado observado | Responsable | Resultado |
|---|---|---|---|---|
| `G4-01` | EV-07, EV-15 | Cinco enteros `0..100` con dirección favorable explícita. | `R-PRODUCT` | `pass` |
| `G4-02` | EV-07, EV-15 | Ocho actuaciones, cuatro estados de ejecución, evidencia y máximo dos efectos directos. | `R-PRODUCT` | `pass` |
| `G4-03` | EV-07, EV-13 | Cálculo puro reproduce ambos perfiles; seleccionar no concede beneficio. | `R-TECH` | `pass` |
| `G4-04` | EV-02, EV-07 | Vetos antes que ventajas; rama única para estados válidos y ninguna para inválidos. | `R-TECH` | `pass` |
| `G4-05` | EV-07, EV-08 | Cada dimensión se proyecta en consecuencias y escenas sin puntuación desnuda. | `R-EDITORIAL` | `pass` |

## 8. G5 — Causalidad

| `criterionId` | `evidenceIds` | Resultado observado | Responsable | Resultado |
|---|---|---|---|---|
| `G5-01` | EV-08, EV-15 | Cobertura inversa completa de 8 actuaciones y 10 consecuencias. | `R-PRODUCT` | `pass` |
| `G5-02` | EV-08, EV-15 | C-01..C-05 tienen predicado, prioridad, efecto, escenas, rama y validación. | `R-PRODUCT` | `pass` |
| `G5-03` | EV-09 | Ejemplos con cinco relaciones completas y alternativa preventiva. | `R-EDITORIAL` | `pass` |
| `G5-04` | EV-09, EV-13 | Un nodo, dos variantes, respuesta separada y mejoras vulnerables conservadas. | `R-EDITORIAL` | `pass` |
| `G5-05` | EV-08, EV-09 | Cero causas sociales primarias; afirmaciones operativas enlazadas a #10. | `R-PRODUCT` | `pass` |

## 9. G6 — Partidas de referencia

| `criterionId` | `evidenceIds` | Resultado observado | Responsable | Resultado |
|---|---|---|---|---|
| `G6-01` | EV-10, EV-13 | Manifest único, mismo contexto, configuración y tronco. | `R-PRODUCT` | `pass` |
| `G6-02` | EV-10, EV-11, EV-13 | Guion preparado completo, 10 nodos, 9 decisiones y `contained`. | `R-PRODUCT` | `pass` |
| `G6-03` | EV-10, EV-12, EV-13 | Guion vulnerable completo, omisiones demostrables y `overwhelmed`. | `R-PRODUCT` | `pass` |
| `G6-04` | EV-11, EV-12, EV-13 | Misma acción en barranco con efectos distintos atribuibles al estado. | `R-EDITORIAL` | `pass` |
| `G6-05` | EV-13 | Dos JSON válidos, round-trip, cinco dimensiones distintas y comparación automática. | `R-TECH` | `pass` |

## 10. G7 — Coherencia transversal

| `criterionId` | `evidenceIds` | Resultado observado | Responsable | Resultado |
|---|---|---|---|---|
| `G7-01` | EV-15 | Manifest sin vocabularios normativos contradictorios; runtime anterior marcado como desviación M2. | `R-EDITORIAL` | `pass` |
| `G7-02` | EV-14, EV-15 | Cobertura definida para 12 nodos y fallo obligatorio sin fallback silencioso. | `R-EDITORIAL` | `pass` |
| `G7-03` | EV-01, EV-02, EV-04, EV-15 | M1 especifica; #68–#76 implementan sin alias ni lógica duplicada. | `R-TECH` | `pass` |
| `G7-04` | EV-08, EV-09, EV-15 | Sin garantías reales ni umbrales científicos; #10 permanece visible. | `R-EDITORIAL` | `pass` |
| `G7-05` | EV-13, EV-15 | Conteos, IDs, orden, ramas, perfiles y resultados coinciden. | `R-PRODUCT` | `pass` |

## 11. Hallazgos y tratamiento

No se encontraron incumplimientos de los criterios G1–G7. Sí quedan requisitos de gobierno de la DoR, visibles y con destino concreto:

| ID | Requisito | Severidad | Estado | Tratamiento y destino |
|---|---|---|---|---|
| `F-43-01` | Firma técnica separada de `R-TECH` | `m1-blocker` | Abierto | Solicitar revisión de `dunay2` en la PR de #43. No integrar ni autorizar M2 sin su firma explícita sobre el SHA evaluado. |
| `F-43-02` | Acta integrada en el historial de la línea base | `m1-blocker` | Abierto hasta merge | Integrar la PR de #43 solo después de la firma técnica; verificar que el merge desciende de `8ef0916`. |
| `F-43-03` | Cierre de #18 y #12 | `m1-blocker` | Abierto | Tras integrar el acta, cerrar ambas épicas con enlaces a #43 y al merge. #19 ya se cerró tras #44–#47. |
| `F-43-04` | Autorización y etiquetas M2 | `m1-blocker` | Bloqueado por F-43-01..03 | Publicar el registro `DR-08` en #67 y aplicar `status:ready` únicamente a #67 y #68. |

No se abre una issue adicional para estos puntos: pertenecen al flujo de cierre ya definido en #43 y #42, tienen responsable y destino identificables, y separar su seguimiento duplicaría la puerta existente.

Mejoras no bloqueantes ya destinadas:

- #10: validación experta y pruebas con ciudadanía;
- #9: formato de publicación y proveedor inicial;
- #68–#76: implementación del contrato aceptado en M2.

## 12. Firmas

| Rol | Cuenta asignada | Cobertura | Registro | Estado |
|---|---|---|---|---|
| `R-PRODUCT` | `rakadie` | Filas de Producto | Comentario separado en #43 sobre `8ef0916` | Registrada |
| `R-EDITORIAL` | `rakadie` | Filas de Narrativa | Comentario separado en #43 sobre `8ef0916` | Registrada |
| `R-TECH` | `dunay2` | Filas de Arquitectura | Revisión explícita de la PR de #43 | **Pendiente; bloqueante** |
| `R-ACCEPTANCE` | `rakadie` | Conteos, firmas y DoR | Registro final en #43 y autorización posterior en #67 | Pendiente de las anteriores |

Las firmas no se infieren del cierre de issues, del autor del commit ni de una suite verde.

## 13. Decisión

La especificación M1 demuestra **35/35 criterios `pass`** y no presenta bloqueantes técnicos o editoriales ocultos. Sin embargo, la Definition of Ready exige además firma técnica, acta integrada, cierre de gobierno y autorización explícita.

Por tanto:

```text
M1 criteria: PASS
M2 readiness: WAITING-EVIDENCE
M2 authorization: NOT ISSUED
```

No se debe comenzar #68 ni aplicar `status:ready` hasta resolver `F-43-01..04`. Esta decisión evita confundir la calidad de la evidencia con el cumplimiento todavía incompleto del procedimiento de autorización.
