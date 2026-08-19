# M1 — Puertas maestras de aceptación

- Fecha: 16 de agosto de 2026
- Issue: #40
- Issue padre: #18
- Alcance consolidado: #13–#17 y #19
- Estado contrastado: `main@3ed6dcdf9abcf48981a0afe5fff4255c5376fb15`

## 1. Propósito

Este documento reúne en un único checklist los resultados observables que debe demostrar la especificación ejecutable de la Vertical Beta 1. Evita que el cierre de M1 dependa de fórmulas vagas como “funciona”, “está completo” o “está bien documentado”.

Cada criterio tiene:

- un ID estable;
- una única puerta;
- un área primaria: `Producto`, `Narrativa` o `Arquitectura`;
- un resultado binario observable;
- una procedencia explícita entre #13–#17 y #19.

Este documento define **qué** se acepta. #41 asigna evidencia, responsable y carácter bloqueante en [`m1-acceptance-evidence.md`](m1-acceptance-evidence.md); #42 compone la [`Definition of Ready de M2`](m2-definition-of-ready.md); #43 ejecutará la revisión final cuando #44–#47 estén integradas.

## 2. Estado de evaluación

La revisión de #43 utilizará exactamente uno de estos estados por criterio:

| Estado | Significado |
|---|---|
| `not-evaluated` | Todavía no se ha contrastado la evidencia requerida. |
| `pass` | El resultado observable se demuestra por completo. |
| `fail` | El resultado no se demuestra o existe evidencia contradictoria. |
| `not-applicable` | Solo admisible con una decisión de alcance enlazada y una justificación explícita. |

La existencia de un documento, una PR integrada o una issue cerrada no convierte por sí sola un criterio en `pass`. Tampoco basta con que la suite actual esté verde si no comprueba el resultado descrito.

En #40 todos los criterios nacen como `not-evaluated`. La tabla siguiente solo indica si su fuente de especificación ya está disponible:

| Puerta | Procedencia | Disponibilidad de la fuente al crear #40 |
|---|---|---|
| G1 — Escenas e IDs | #13 | Integrada y épica cerrada. |
| G2 — Grafo | #14 | Integrada y épica cerrada. |
| G3 — `GameSession` | #15 | Integrada y épica cerrada. |
| G4 — `inheritedState` | #16 | Integrada y épica cerrada. |
| G5 — Causalidad | #17 | Integrada y épica cerrada. |
| G6 — Partidas de referencia | #19 | Pendiente de #44–#47. |
| G7 — Coherencia editorial | #13–#17 y #19 | Evaluación transversal pendiente. |

## 3. G1 — Escenas e IDs canónicos

| ID | Área | Resultado observable | Procedencia | Estado |
|---|---|---|---|---|
| `G1-01` | Producto | El catálogo objetivo enumera exactamente 12 nodos funcionales, seis tipos, dos inspecciones y cinco objetos `Scenario` oficiales. | #13 | `not-evaluated` |
| `G1-02` | Arquitectura | Cada nodo oficial tiene un ID canónico único, estable, en `kebab-case`, y toda referencia del grafo usa ese ID sin alias ejecutable. | #13 | `not-evaluated` |
| `G1-03` | Narrativa | Cada nodo declara función en el recorrido, fuente actual, dependencias de entrada, estado editorial y destino previsto. | #13 | `not-evaluated` |
| `G1-04` | Producto | Las 51 escenas existentes están clasificadas una sola vez como 5 oficiales, 36 de biblioteca y 10 históricas; ninguna excluida entra en el recorrido objetivo. | #13 | `not-evaluated` |
| `G1-05` | Arquitectura | Cada desviación enumerada en la validación del catálogo está asignada a una tarea #68–#76; M1 no presenta la documentación objetivo como implementación ya existente. | #13 | `not-evaluated` |

## 4. G2 — Grafo narrativo declarativo

| ID | Área | Resultado observable | Procedencia | Estado |
|---|---|---|---|---|
| `G2-01` | Producto | El grafo contiene exactamente los 12 IDs oficiales, una entrada y un único terminal `ending-result-causal-report`. | #14 | `not-evaluated` |
| `G2-02` | Narrativa | Las ramas `prepared` y `vulnerable` son alcanzables, reutilizan un único `crisis-decision-ravine-fire` y convergen en el mismo terminal con variantes distintas. | #14 | `not-evaluated` |
| `G2-03` | Arquitectura | Cada transición tiene origen, predicado, prioridad y destino canónico; la evaluación cubre validación, veto crítico, preparación suficiente y estado válido residual sin ambigüedad. | #14 | `not-evaluated` |
| `G2-04` | Arquitectura | Una validación reproducible demuestra ausencia de ciclos, nodos huérfanos, rutas muertas, IDs duplicados y referencias a biblioteca o archivo. | #14 | `not-evaluated` |
| `G2-05` | Arquitectura | La representación declarativa referencia contenido, predicados y consecuencias por ID sin duplicar textos, impactos ni lógica en el grafo. | #14 | `not-evaluated` |

## 5. G3 — Contrato único de `GameSession`

| ID | Área | Resultado observable | Procedencia | Estado |
|---|---|---|---|---|
| `G3-01` | Arquitectura | Existe un único esquema versionado y JSON-serializable con claves exactas para identidad, estado, progreso, decisiones, `inheritedState`, rama, resultado e historial. | #15 | `not-evaluated` |
| `G3-02` | Producto | El contrato representa los 12 nodos, las cinco fases, ambas ramas y las dos variantes sin añadir modelos de sesión alternativos. | #15 | `not-evaluated` |
| `G3-03` | Arquitectura | Cada decisión tiene un único `decision-applied`, cada escena completada un único `scene-completed`, y el cálculo de estado, la selección de rama y el resultado tienen exactamente un evento correlacionado. | #15 | `not-evaluated` |
| `G3-04` | Arquitectura | Guardar y restaurar una sesión conserva exactamente el snapshot y el historial; un validador rechaza divergencias, secuencias inválidas y datos fuera del contrato con códigos estables. | #15 | `not-evaluated` |
| `G3-05` | Arquitectura | El contrato y sus invariantes pueden ejecutarse sin HTTP, Fastify, DOM, textos editoriales ni tipos no JSON. | #15 | `not-evaluated` |

## 6. G4 — Estado heredado y selección de rama

| ID | Área | Resultado observable | Procedencia | Estado |
|---|---|---|---|---|
| `G4-01` | Producto | `inheritedState` contiene exactamente `fuelLoad`, `fuelContinuity`, `operationalAccess`, `defensibility` y `attackOpportunity`, como enteros `0..100` con dirección favorable definida. | #16 | `not-evaluated` |
| `G4-02` | Producto | Las ocho actuaciones preventivas oficiales enlazan condición observada, ejecución completa/parcial/fallida, evidencia y efectos sobre un máximo de dos dimensiones directas. | #16 | `not-evaluated` |
| `G4-03` | Arquitectura | Estado base, impactos, agregación, `clamp` y derivación de `attackOpportunity` forman un cálculo puro y reproducible; seleccionar una acción sin ejecutarla no concede beneficio. | #16 | `not-evaluated` |
| `G4-04` | Producto | Las restricciones críticas prevalecen sobre ventajas parciales y todo estado válido selecciona exactamente `prepared` o `vulnerable`; un estado inválido no selecciona rama. | #16 | `not-evaluated` |
| `G4-05` | Narrativa | Cada dimensión se manifiesta en al menos una escena oficial mediante intensidad, propagación, acceso, repliegue, posición, defensa o ataque, sin mostrar una puntuación desnuda como explicación. | #16 | `not-evaluated` |

## 7. G5 — Causalidad prevención–consecuencias

| ID | Área | Resultado observable | Procedencia | Estado |
|---|---|---|---|---|
| `G5-01` | Producto | Las ocho actuaciones oficiales y las diez consecuencias principales están conectadas mediante cadenas `actuación → estado → capacidad/restricción → escena → resultado`. | #17 | `not-evaluated` |
| `G5-02` | Producto | Las cinco combinaciones C-01–C-05 tienen predicados, prioridad, efecto distinto de una suma, escenas, contribución de rama y estado de validación. | #17 | `not-evaluated` |
| `G5-03` | Narrativa | El informe final selecciona entre tres y cinco relaciones completas, cada una trazable a decisiones, evidencias y escenas reales, e incluye una alternativa preventiva canónica. | #17 | `not-evaluated` |
| `G5-04` | Narrativa | `contained` y `overwhelmed` son variantes del mismo nodo; el informe separa prevención de respuesta operativa y conserva mejoras parciales reales en la variante vulnerable. | #17 | `not-evaluated` |
| `G5-05` | Producto | Comunicación, evacuación, daños y población aparecen solo como consecuencias derivadas; las afirmaciones operativas pendientes están identificadas y remitidas a #10. | #17 | `not-evaluated` |

## 8. G6 — Partidas de referencia reproducibles

| ID | Área | Resultado observable | Procedencia | Estado |
|---|---|---|---|---|
| `G6-01` | Producto | Ambas partidas usan el mismo escenario base, meteorología, configuración externa y tronco común; solo difieren la prevención y el estado heredado resultante. | #19 / #44 | `not-evaluated` |
| `G6-02` | Producto | La partida preparada especifica decisiones, evidencias, estado, opciones de crisis, consecuencias, duración y recorrido canónico completo hasta `contained`. | #19 / #45 | `not-evaluated` |
| `G6-03` | Producto | La partida vulnerable especifica decisiones, omisiones demostrables, evidencias, estado, opciones, consecuencias, duración y recorrido canónico completo hasta `overwhelmed`. | #19 / #46 | `not-evaluated` |
| `G6-04` | Narrativa | El barranco compartido muestra diferencias visibles atribuibles al estado heredado y ambos informes finales explican el contraste sin cambiar el contexto externo. | #19 / #45–#46 | `not-evaluated` |
| `G6-05` | Arquitectura | Fixtures JSON deterministas representan ambas sesiones, difieren en al menos tres dimensiones, sobreviven serialización/validación y permiten una comparación automática campo a campo. | #19 / #47 | `not-evaluated` |

## 9. G7 — Coherencia editorial transversal

| ID | Área | Resultado observable | Procedencia | Estado |
|---|---|---|---|---|
| `G7-01` | Narrativa | Todos los documentos normativos usan los mismos IDs, ocho actuaciones, cinco dimensiones, dos ramas y dos variantes; cualquier especificación anterior incompatible está alineada o marcada como histórica/no normativa. | #13–#17, #19 | `not-evaluated` |
| `G7-02` | Narrativa | Los 12 nodos con texto tienen familias de claves i18n definidas y una regla de cobertura estricta; ninguna ausencia de traducción se resuelve con fallback silencioso. | #13, #17, #19 | `not-evaluated` |
| `G7-03` | Arquitectura | Cada documento distingue especificación M1 de implementación M2 y enlaza las desviaciones del runtime sin exigir compatibilidad mediante alias o lógica duplicada. | #13–#17, #19 | `not-evaluated` |
| `G7-04` | Narrativa | Los textos y ejemplos describen causalidad del juego sin prometer resultados reales ni presentar umbrales lúdicos como validación científica; las puertas expertas permanecen visibles. | #17, #19 | `not-evaluated` |
| `G7-05` | Producto | Cantidades, orden de escenas, reglas de selección, perfiles y resultados coinciden entre catálogo, grafo, contrato, causalidad y partidas; toda discrepancia produce un hallazgo explícito. | #13–#17, #19 | `not-evaluated` |

## 10. Cobertura de entregables de M1

| Épica | Resultado cubierto | Criterios maestros |
|---|---|---|
| #13 — Escenas e IDs | Catálogo, clasificación, fuentes y migración objetivo. | `G1-01..05`, `G7-01..03`, `G7-05` |
| #14 — Grafo | Recorrido, ramas, transiciones e integridad. | `G2-01..05`, `G7-01`, `G7-03`, `G7-05` |
| #15 — `GameSession` | Esquema, eventos, serialización y reconstrucción causal. | `G3-01..05`, `G7-03`, `G7-05` |
| #16 — `inheritedState` | Dimensiones, cálculo, umbrales y efectos de crisis. | `G4-01..05`, `G7-01`, `G7-04..05` |
| #17 — Causalidad | Inventario, matriz, combinaciones e informe final. | `G5-01..05`, `G7-01..05` |
| #19 — Partidas | Base común, dos recorridos y fixtures comparables. | `G6-01..05`, `G7-01..05` |

No existe un entregable de las seis épicas fuera de estas siete puertas. Los criterios transversales no repiten la aceptación funcional: comprueban contradicciones entre fuentes que un criterio local no puede detectar.

## 11. Reglas para completar el checklist

1. La evaluación se realiza sobre una revisión concreta de `main` y registra su SHA.
2. Cada criterio recibe un único estado; no se marca una puerta completa como sustituto de sus filas.
3. Un criterio compuesto pasa solo cuando se observan todos los elementos unidos por “y”.
4. Un hallazgo contradictorio produce `fail`, aunque otra fuente afirme el resultado esperado.
5. `not-applicable` requiere una decisión de alcance previa; no sirve para aplazar trabajo.
6. Los criterios no se reinterpretan durante #43. Un cambio de significado requiere modificar este documento mediante PR.
7. #41 puede asociar una misma evidencia a varias filas, pero no fusionar sus resultados.
8. La preparación de M2 se decide en #42; #40 no clasifica todavía criterios como bloqueantes o recomendables.

## 12. Exclusiones

Esta entrega no:

- ejecuta la revisión final ni declara M1 aceptada;
- marca criterios como `pass` por el cierre previo de una épica;
- asigna responsables o revisores;
- define todavía evidencias mínimas o bloqueantes;
- fija la Definition of Ready de M2;
- sustituye las partidas y fixtures de #44–#47;
- exige que el runtime actual implemente ya la especificación objetivo de M1;
- evalúa la aprobación editorial o de publicación dependiente del plan #10 y su ejecución en #99/#100.

## 13. Matriz de aceptación de #40

| Criterio de #40 | Evidencia en esta entrega | Estado |
|---|---|---|
| Todos los entregables de M1 están cubiertos | Mapa #13–#17/#19, sección 10 | Cumplido |
| No hay criterios vagos o redundantes | 35 resultados observables con ID único, secciones 3–9 | Cumplido |
| Cada criterio admite resultado explícito | Estados y reglas, secciones 2 y 11 | Cumplido |
| Producto, narrativa y arquitectura se distinguen | Columna `Área` en las siete puertas | Cumplido |

## 14. Entregas siguientes

- #41 asocia a cada ID evidencia requerida, responsable de validación y carácter bloqueante en [`m1-acceptance-evidence.md`](m1-acceptance-evidence.md);
- #42 convierte los 35 bloqueantes, sus firmas y el control de cambios en la [`Definition of Ready de M2`](m2-definition-of-ready.md);
- #44–#47 completarán la fuente pendiente de G6;
- #43 evaluará todas las filas sobre un SHA único de `main` al final del milestone.
