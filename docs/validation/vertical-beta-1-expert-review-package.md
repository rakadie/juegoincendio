# Vertical Beta 1 — Paquete de revisión experta

- Issue de ejecución: #99
- Plan normativo: #10
- Estado: preparado; revisores y dictámenes pendientes
- Dictamen inicial: permitido sobre documentación integrada
- Dictamen final: bloqueado hasta disponer del candidato #76

## 1. Propósito y límite

Este paquete permite ejecutar de forma reproducible la revisión experta de la Vertical Beta 1. Reúne el manifiesto de versión, el inventario de artefactos, las afirmaciones, las escenas, el registro de hallazgos y las cinco firmas requeridas.

El documento **no contiene aprobaciones**. Una celda vacía, una revisión informal o la existencia de tests no equivale a `accept`. Los dictámenes solo son válidos cuando una persona identificada registra dominio, decisión, justificación, fecha y commit revisado.

La revisión tiene dos cortes:

1. **ronda documental inicial:** contrasta catálogo, causalidad, simplificaciones y textos antes o durante M2;
2. **ronda final:** recorre el build candidato aceptado por #76 y ratifica únicamente las filas afectadas por la implementación.

## 2. Responsabilidades

| Código | Dominio | Persona | Afiliación/experiencia | Conflicto declarado | Rondas | Estado |
|---|---|---|---|---|---|---|
| `E-PREV` | Prevención, combustibles y comportamiento del fuego | Pendiente | Pendiente | Pendiente | inicial + final | `unassigned` |
| `E-PC` | Protección civil, evacuación y coordinación territorial | Pendiente | Pendiente | Pendiente | inicial + final | `unassigned` |
| `E-OPS` | Operaciones de extinción y seguridad | Pendiente | Pendiente | Pendiente | inicial + final | `unassigned` |
| `E-COMMS` | Comunicación pública y uso del 112 | Pendiente | Pendiente | Pendiente | inicial + final | `unassigned` |
| `E-VULN` | Población vulnerable, interfaz y accesibilidad | Pendiente | Pendiente | Pendiente | inicial + final | `unassigned` |

Reglas:

- cada dominio necesita una decisión separada;
- una persona puede cubrir como máximo dos dominios acreditados;
- producto y desarrollo responden preguntas, pero no firman como especialistas externos;
- identidad o afiliación se publica solo con consentimiento; GitHub no almacena datos de contacto privados;
- una sustitución conserva el dictamen anterior y añade una nueva fila, no sobrescribe evidencia.

## 3. Manifiesto de versión

Se copia y completa este bloque al abrir cada ronda:

```text
reviewRound: expert-initial | expert-final
baselineCommit:
candidateCommit:
candidateUrl:
reviewOpenedAt:
reviewClosedAt:
language: es
catalogVersion:
fixturePreparedSha:
fixtureVulnerableSha:
acceptanceRunUrl:
knownLimitations:
```

Para la ronda inicial, `baselineCommit` debe ser un commit de `main` que contenga este paquete. Para la final, `candidateCommit`, `candidateUrl` y `acceptanceRunUrl` son obligatorios y deben corresponder al mismo artefacto aceptado por #76.

## 4. Inventario que recibe cada revisor

| ID | Artefacto | Propósito | Comprobación de entrega |
|---|---|---|---|
| `PKG-01` | [`vertical-beta-1-validation-plan.md`](../product/vertical-beta-1-validation-plan.md) | Método, severidad y puertas. | [ ] |
| `PKG-02` | [`vertical-beta-1-catalog.md`](../product/vertical-beta-1-catalog.md) | 12 nodos, fuentes y clasificación. | [ ] |
| `PKG-03` | [`vertical-beta-1-graph-transitions.md`](../product/vertical-beta-1-graph-transitions.md) | Predicados, prioridad y errores. | [ ] |
| `PKG-04` | [`vertical-beta-1-causal-matrix.md`](../product/vertical-beta-1-causal-matrix.md) | Cadenas prevención–estado–crisis. | [ ] |
| `PKG-05` | [`vertical-beta-1-causal-combinations-validation.md`](../product/vertical-beta-1-causal-combinations-validation.md) | `PR-*`, `OP-*`, `SIM-*` y límites. | [ ] |
| `PKG-06` | [`vertical-beta-1-causal-report.md`](../product/vertical-beta-1-causal-report.md) | Explicación final y variantes. | [ ] |
| `PKG-07` | [`vertical-beta-1-reference-comparison.md`](../product/vertical-beta-1-reference-comparison.md) | Diferencias canónicas entre partidas. | [ ] |
| `PKG-08` | [`reference-contained.json`](../../tests/fixtures/game-session/reference-contained.json) | Fixture preparado. | [ ] |
| `PKG-09` | [`reference-overwhelmed.json`](../../tests/fixtures/game-session/reference-overwhelmed.json) | Fixture vulnerable. | [ ] |
| `PKG-10` | Candidato y resultado de #76 | Comportamiento ejecutable final. | [ ] pendiente de #76 |

Los enlaces de `PKG-08` y `PKG-09` son especificaciones ejecutables, no pruebas de realismo operativo.

## 5. Cobertura de escenas

Cada fila recibe `accept`, `adjust` o `reject`, justificación y al menos un dominio responsable. `N/A` exige explicar por qué el dominio no es competente o la escena no contiene esa afirmación.

| Nodo | Tipo/rama | Foco mínimo | Dominio principal | Decisión | Finding IDs |
|---|---|---|---|---|---|
| `intro-briefing-mission` | `briefing`, común | Rol, límites educativos y ausencia de autoridad real. | `E-PC`, `E-COMMS` | Pendiente | — |
| `prevention-inspection-territory-fuel` | `inspection`, común | Combustible, discontinuidad, caminos, pastoreo y evaluación profesional. | `E-PREV` | Pendiente | — |
| `prevention-inspection-housing-interface` | `inspection`, común | Vegetación, separación de copas, acceso y defensa pasiva. | `E-PREV`, `E-VULN` | Pendiente | — |
| `transition-summary-prevention` | `summary`, común | Qué se hereda y cómo se expresa sin prometer resultados. | `E-PREV`, `E-PC` | Pendiente | — |
| `crisis-decision-first-alert` | `decision`, común | Verificación, movilización, acceso, comunicación y 112. | `E-PC`, `E-COMMS` | Pendiente | — |
| `crisis-router-causal-map` | `router`, común | Vetos, envolvente, dos ramas y error ante inconsistencia. | `E-PREV`, `E-OPS` | Pendiente | — |
| `crisis-decision-emergency-fuel-break` | `decision`, preparada | Viabilidad, acceso, repliegue y oportunidad de ataque. | `E-OPS`, `E-PREV` | Pendiente | — |
| `crisis-decision-access-blockage` | `decision`, vulnerable | Bloqueo, rutas seguras, población expuesta y límites operativos. | `E-OPS`, `E-PC`, `E-VULN` | Pendiente | — |
| `crisis-decision-ravine-fire` | `decision`, ambas | Comportamiento condicionado, seguridad y reutilización sin falsa equivalencia. | `E-OPS`, `E-PREV` | Pendiente | — |
| `crisis-decision-housing-defense` | `decision`, preparada | Defensa selectiva, acceso, salida y población vulnerable. | `E-OPS`, `E-VULN` | Pendiente | — |
| `crisis-decision-crown-fire` | `decision`, vulnerable | Transición a copas, repliegue y ausencia de garantía. | `E-PREV`, `E-OPS` | Pendiente | — |
| `ending-result-causal-report` | `result`, común | Causalidad, mejoras parciales, límites y transferencia educativa. | Todos | Pendiente | — |

## 6. Matriz de afirmaciones

La columna `Decisión` permanece pendiente hasta recibir el registro individual. `PR-*` comprueba coherencia de producto; `OP-*` exige criterio experto; `SIM-*` revisa que la simplificación sea comprensible y no peligrosa.

| ID | Afirmación | Estado de entrada | Dominio mínimo | Decisión | Justificación/evidencia | Findings |
|---|---|---|---|---|---|---|
| `PR-001` | Estado y evidencias iguales producen la misma salida. | `validated-product-rule` | Producto + contraste de todos | Pendiente | — | — |
| `PR-002` | Un veto crítico precede a toda ventaja parcial. | `validated-product-rule` | `E-PREV`, `E-OPS` | Pendiente | — | — |
| `PR-003` | Las combinaciones explican capacidades sin sumar puntos. | `validated-product-rule` | `E-PREV`, `E-OPS` | Pendiente | — | — |
| `OP-001` | Carga y continuidad reducidas juntas moderan intensidad y propagación. | `plausible-pending-expert-review` | `E-PREV` | Pendiente | — | — |
| `OP-002` | Una línea evaluada requiere acceso completo y oportunidad suficiente para ser operable. | `plausible-pending-expert-review` | `E-OPS`, `E-PREV` | Pendiente | — | — |
| `OP-003` | Reducir continuidad vertical y entre copas amortigua la transición a copas. | `plausible-pending-expert-review` | `E-PREV` | Pendiente | — | — |
| `OP-004` | Defensa y acceso local suficientes permiten una defensa selectiva de viviendas. | `plausible-pending-expert-review` | `E-OPS`, `E-VULN` | Pendiente | — | — |
| `OP-005` | La envolvente C-05 es suficiente para describir oportunidad segura en el contexto estándar. | `plausible-pending-expert-review` | `E-OPS`, `E-PREV` | Pendiente | — | — |
| `SIM-001` | Cinco enteros `0..100` representan el estado causal necesario. | `gameplay-simplification` | Todos | Pendiente | — | — |
| `SIM-002` | Los cortes `24/25`, `49/50` y `74/75` representan cambios discretos. | `gameplay-simplification` | `E-PREV`, `E-OPS` | Pendiente | — | — |
| `SIM-003` | Todo estado válido termina en `prepared` o `vulnerable`. | `gameplay-simplification` | Todos | Pendiente | — | — |
| `SIM-004` | `prepared` conduce a `contained` y `vulnerable` a `overwhelmed` en esta beta. | `gameplay-simplification` | Todos | Pendiente | — | — |

`OP-002`, `OP-004` y `OP-005` afectan seguridad operativa: un `adjust` debe revalidarse y un `reject` bloquea el dictamen. Ninguna etiqueta cambia en la fuente normativa hasta que la decisión se integre con su evidencia.

## 7. Formato de dictamen individual

Cada decisión se registra sin reescribir la afirmación original:

```text
reviewId:
reviewRound: expert-initial | expert-final
reviewerCode: E-PREV | E-PC | E-OPS | E-COMMS | E-VULN
reviewerIdentityOrPublicAlias:
reviewedCommit:
sceneIds:
claimIds:
decision: accept | adjust | reject
rationale:
evidenceOrReference:
severity: blocker | major | moderate | improvement | none
findingIds:
reviewedAt:
```

Una decisión `adjust` incluye redacción o regla propuesta y sus elementos afectados. Una decisión `reject` identifica qué afirmación no puede publicarse y por qué.

## 8. Registro de hallazgos

| ID | Fuente | Versión | Escenas/claims | Observación e impacto | Severidad | Responsable | Issue | Estado | Verificación |
|---|---|---|---|---|---|---|---|---|---|
| Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | `open` | Pendiente |

Severidades y reglas de privacidad: [`vertical-beta-1-validation-plan.md`](../product/vertical-beta-1-validation-plan.md#9-registro-y-priorización-de-hallazgos). Todo `blocker` o `major` necesita issue, corrección y revalidación. `accepted-risk` no es válido para un `blocker`.

## 9. Acta y firmas

| Dominio | Revisor | Commit | Claims/escenas | Resultado | Finding IDs | Fecha | Firma/enlace |
|---|---|---|---|---|---|---|---|
| `E-PREV` | Pendiente | Pendiente | Pendiente | Pendiente | — | Pendiente | Pendiente |
| `E-PC` | Pendiente | Pendiente | Pendiente | Pendiente | — | Pendiente | Pendiente |
| `E-OPS` | Pendiente | Pendiente | Pendiente | Pendiente | — | Pendiente | Pendiente |
| `E-COMMS` | Pendiente | Pendiente | Pendiente | Pendiente | — | Pendiente | Pendiente |
| `E-VULN` | Pendiente | Pendiente | Pendiente | Pendiente | — | Pendiente | Pendiente |

Decisión final:

```text
reviewedCandidateCommit:
reviewedCandidateUrl:
allRequiredDomainsSigned: no
openBlockers:
openMajors:
canonicalFixturesRevalidated: no
decision: pending
decisionOwner:
decidedAt:
```

Valores permitidos cuando el acta esté completa:

- `approved`;
- `approved-with-non-blocking-follow-up`;
- `rejected`.

## 10. Definition of Done de #99

- [ ] cinco dominios asignados y conflictos declarados;
- [ ] manifiesto inicial completo sobre un commit integrado;
- [ ] 12 nodos revisados con decisión y evidencia;
- [ ] `OP-001`–`OP-005` y `SIM-001`–`SIM-004` decididos;
- [ ] bloqueantes y mayores corregidos y revalidados;
- [ ] #76 correcta y manifiesto final apuntando al mismo candidato;
- [ ] cinco firmas finales registradas;
- [ ] fixtures preparado y vulnerable revalidados tras cambios;
- [ ] decisión final distinta de `pending`;
- [ ] acta enlazada en #99 sin datos personales innecesarios.

Hasta completar todas las filas, #99 permanece abierta y no autoriza #100 ni publicación pública.
