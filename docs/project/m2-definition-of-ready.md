# M2 — Definition of Ready

- Fecha: 17 de agosto de 2026
- Issue: #42
- Issue padre: #18
- Entrada: [`m1-acceptance-gates.md`](m1-acceptance-gates.md) y [`m1-acceptance-evidence.md`](m1-acceptance-evidence.md)
- Estado contrastado al definir el contrato: `main@b45ed4958d6600a70d4098592e37c90e058d9f82`

## 1. Propósito

Este documento fija las condiciones verificables para autorizar el inicio de M2 sin reabrir durante la implementación las decisiones estructurales de M1. Define la puerta; no declara que la puerta esté superada.

La DoR se aplica a la épica #67. Su satisfacción habilita primero #68 y no convierte automáticamente en ejecutables #69–#76, que conservan sus dependencias y orden propios.

## 2. Estado de la puerta

| Estado | Significado |
|---|---|
| `draft` | El contrato de esta DoR todavía no está integrado en `main`. |
| `waiting-evidence` | La DoR está definida, pero falta al menos un requisito `DR-*`. |
| `ready` | `R-ACCEPTANCE` ha comprobado todos los requisitos y publicado la autorización en #67. |
| `revoked` | Una modificación o un hallazgo posterior ha invalidado una autorización previa. |

Tras integrar #42, el estado inicial será `waiting-evidence`. Ni cerrar #42 ni tener documentos normativos disponibles permite aplicar por sí solo `status:ready`.

## 3. Requisitos obligatorios

Todos los requisitos siguientes deben cumplirse simultáneamente sobre la misma revisión aceptada de `main`.

| ID | Condición verificable | Evidencia M1 |
|---|---|---|
| `DR-01-BASELINE` | #43 ha congelado un único `evaluatedMainSha` y su informe `docs/project/m1-final-acceptance.md` está integrado en ese historial. No se acepta evidencia procedente únicamente de una rama o PR abierta. | `EV-15-CROSS-AUDIT` |
| `DR-02-CRITERIA` | Las 35 filas `G1-01..G7-05` tienen resultado `pass`. Quedan prohibidos `not-evaluated`, `fail` y `not-applicable` para autorizar M2 porque las 35 filas están clasificadas como `m1-blocker`. | `EV-01..EV-15` y registro de #43 |
| `DR-03-EVIDENCE` | Los paquetes `EV-01..EV-15` están disponibles, son coherentes entre sí y apuntan al `evaluatedMainSha` o a una procedencia histórica identificada según las reglas de evidencia. | Matriz completa de #41 |
| `DR-04-REFERENCE-GAMES` | #44–#47 y su épica #19 están cerradas; los dos fixtures canónicos parten del mismo contexto, pasan validación y round-trip, difieren en al menos tres dimensiones y producen respectivamente `contained` y `overwhelmed` por las rutas esperadas. | `EV-10..EV-13`, `G6-01..G6-05` |
| `DR-05-SIGNATURES` | `R-PRODUCT`, `R-TECH` y `R-EDITORIAL` han firmado por separado los resultados que les corresponden sobre el mismo SHA; `R-ACCEPTANCE` ha comprobado cuentas, fechas y enlaces. | Sección 2 de #41 e informe de #43 |
| `DR-06-FINDINGS` | No existe ningún hallazgo `m1-blocker` abierto. Todo trabajo diferido permitido tiene issue, responsable, justificación y clasificación no estructural; una mejora no compensa un criterio fallido. | Hallazgos de #43 y sección 8 de #41 |
| `DR-07-GOVERNANCE` | #40–#47 están cerradas y sus entregas integradas; las épicas #12, #18 y #19 cumplen su criterio de cierre y están cerradas. #67 permanece abierta como contenedor de M2. | Estados de issues y enlaces de integración registrados por #43 |
| `DR-08-AUTHORIZATION` | `R-ACCEPTANCE` publica en #67 el registro de la sección 5, con decisión `READY`, y solo entonces aplica `status:ready` a #67 y #68. | Comentario de autorización y cambio de etiquetas en #67/#68 |

No hay requisitos opcionales ni aprobación parcial. La implementación de #67–#76 no se usa para demostrar M1: hacerlo crearía una dependencia circular.

## 4. Secuencia de comprobación

1. #44–#47 producen `EV-10..EV-13` y cierran #19.
2. #43 fija el `evaluatedMainSha`, reúne `EV-01..EV-15`, ejecuta los 35 criterios y registra hallazgos.
3. Cada responsable firma por separado sobre ese mismo SHA.
4. `R-ACCEPTANCE` verifica `DR-01..DR-07` y cierra las épicas M1 cuyo criterio esté satisfecho.
5. `R-ACCEPTANCE` publica la autorización de `DR-08` en #67.
6. Se añade `status:ready` a #67 y #68. #69–#76 permanecen sin esa etiqueta hasta satisfacer sus dependencias particulares.

La etiqueta operativa única es `status:ready`; no se combina con la etiqueta genérica `ready`.

## 5. Registro de autorización

El comentario de #67 debe conservar estos campos y enlaces verificables:

```text
## M2 Ready authorization
m1AcceptanceSha: <SHA completo de main>
acceptanceReport: <enlace al informe integrado de #43>
criteria: 35/35 pass
evidence: EV-01..EV-15 complete
signatures:
  product: <cuenta, fecha, enlace>
  technical: <cuenta, fecha, enlace>
  editorial: <cuenta, fecha, enlace>
referenceGames: <enlaces a #44, #45, #46 y #47 cerradas>
openM1Blockers: 0
decision: READY
authorizedBy: <cuenta R-ACCEPTANCE>
authorizedAt: <fecha y hora ISO 8601>
```

La persona autorizadora actual es `rakadie` como `R-ACCEPTANCE`. Una sustitución debe constar previamente en #43 con una cuenta identificable.

## 6. Pendientes editoriales permitidos

M2 no se bloquea por una corrección posterior de ortografía, puntuación, gramática, claridad expositiva o traducción si se cumplen **todas** estas condiciones:

- no altera IDs canónicos, cantidades, tipos, orden, aristas, predicados o prioridades;
- no altera claves o eventos de `GameSession`, dimensiones, fórmulas, umbrales, vetos ni selección de rama;
- no altera actuaciones, evidencias, combinaciones causales, fixtures, contexto, decisiones, rutas o resultados;
- no elimina claves i18n ni cambia su cobertura o significado funcional;
- tiene issue o PR propia, clasificación `editorial-safe` y revisión de `R-EDITORIAL`;
- no invalida ninguna fila `G*`, firma ni evidencia aceptada.

La validación experta o ciudadana de #10 continúa siendo una puerta editorial o de publicación posterior. Solo bloquea o revoca esta DoR si descubre un cambio necesario que afecte a la estructura o a una fila `G*`.

## 7. Cambios que bloquean o revocan Ready

Antes de autorizar, cualquier incumplimiento mantiene el estado `waiting-evidence`. Después de autorizar, se revoca `ready` cuando ocurre al menos uno de estos casos:

- cambia una fuente normativa de M1 en un aspecto excluido de `editorial-safe`;
- cambia uno de los fixtures canónicos, su contexto, recorrido o resultado esperado;
- una evidencia deja de corresponder a la especificación aceptada;
- aparece un hallazgo `m1-blocker` o falta una firma requerida;
- se detecta una contradicción entre catálogo, grafo, sesión, causalidad y partidas.

Los commits de implementación M2 que aplican el contrato aceptado no revocan por sí solos la autorización, aunque `main` avance más allá de `m1AcceptanceSha`. El SHA identifica la línea base normativa, no inmoviliza el repositorio.

## 8. Reapertura y control de cambios

Si la autorización deja de ser válida:

1. `R-ACCEPTANCE` elimina `status:ready` de #67 y de toda tarea M2 aún no iniciada y publica el motivo en #67;
2. se reabre el criterio `G*` afectado y #43, o se crea un hallazgo enlazado si la plataforma no permite reabrir la fila de forma independiente;
3. se realiza análisis de impacto sobre #68–#76 y se bloquean las tareas dependientes;
4. se actualizan y vuelven a ejecutar las evidencias afectadas y siempre la auditoría transversal G7;
5. se emiten de nuevo las firmas afectadas y un registro completo de autorización; no se edita silenciosamente el registro anterior.

Si aún no se ha integrado ninguna PR de M2, el flujo vuelve a `waiting-evidence`. Si M2 ya comenzó, el cambio se gestiona mediante una issue de control de cambio y no se adapta la implementación sin actualizar primero su fuente normativa y el impacto registrado.

## 9. Matriz de aceptación de #42

| Criterio de #42 | Evidencia en esta entrega | Estado |
|---|---|---|
| Los requisitos protegen de cambios estructurales | `DR-01..DR-08` y reglas de revocación, secciones 3, 7 y 8 | Cumplido |
| Los retoques menores no bloquean M2 | Clasificación cerrada `editorial-safe`, sección 6 | Cumplido |
| Cada requisito enlaza evidencia M1 | Columna de evidencia de `DR-01..DR-08` | Cumplido |
| Se define quién autoriza M2 | `R-ACCEPTANCE`, secuencia y registro, secciones 4 y 5 | Cumplido |

## 10. Exclusiones

Esta entrega no evalúa todavía `DR-01..DR-08`, no ejecuta #43, no produce `EV-10..EV-15`, no cierra las épicas M1 y no etiqueta #67 o #68 como Ready.
