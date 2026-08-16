# Vertical Beta 1 — Condiciones y transiciones del grafo

- Fecha: 15 de agosto de 2026
- Issue: #26
- Issue padre: #14
- Entradas normativas: #23, #24, #25, #34 y #35
- Estado contrastado: `main@6e9b3ddc770c9fd8126f93594ee54e2fff0a09ea`

## 1. Propósito

Este documento define las condiciones declarativas y deterministas de todas las transiciones de la Vertical Beta 1. Completa el catálogo de #23, el tronco común de #24 y las dos ramas de #25 sin implementar todavía el motor de flujo.

La selección de rama consume el `inheritedState` aprobado en #34. No recalcula las decisiones preventivas ni incorpora meteorología, capacidad externa, azar o una elección manual de ruta.

## 2. Vocabulario normativo

Se utilizan los siguientes predicados:

```text
completed(sceneId)
  existe un único scene-completed para sceneId,
  posterior a sus decisiones válidas y coherente con el historial

validInheritedState(state)
  state contiene exactamente fuelLoad, fuelContinuity,
  operationalAccess, defensibility y attackOpportunity;
  cada valor es un entero dentro de 0..100

branchIs(value)
  GameSession.crisisBranch es exactamente value y existe un único
  crisis-branch-selected coherente con la salida registrada

validResult(variant)
  el resultado usa la variante esperada, conserva evidencia causal
  y es coherente con crisisBranch
```

Una transición solo puede emitirse después de completar el nodo origen. Cada evento `scene-transitioned` debe usar IDs canónicos, coincidir con el nodo actual y aparecer una sola vez para ese avance.

## 3. Clasificación determinista del router

El router evalúa exclusivamente las cinco dimensiones almacenadas. Primero valida el estado y después aplica estas reglas en orden:

### Prioridad 0 — validación bloqueante

No se selecciona ninguna rama si `validInheritedState(inheritedState)` es falso. También se bloquea la evaluación cuando el snapshot y el evento `inherited-state-calculated` difieren o cuando el estado se calculó fuera del punto aprobado del historial.

### Prioridad 10 — restricción crítica

La rama es `vulnerable` cuando se cumple al menos una condición:

```text
operationalAccess <= 24
OR fuelContinuity >= 75
OR defensibility <= 24
OR attackOpportunity <= 24
OR (fuelLoad >= 75 AND fuelContinuity >= 50)
```

Una restricción crítica no puede compensarse con otra dimensión favorable.

### Prioridad 20 — preparación suficiente

Si no existe una restricción crítica, la rama es `prepared` únicamente cuando se cumplen todas las condiciones:

```text
fuelLoad <= 74
AND fuelContinuity <= 49
AND operationalAccess >= 50
AND defensibility >= 50
AND attackOpportunity >= 50
```

### Prioridad 30 — estado válido residual

Cualquier estado válido que no cumpla la regla preparada es `vulnerable`. Esta regla cubre valores intermedios sin crear una tercera rama.

En forma declarativa:

```text
selectBranch(state):
  require validInheritedState(state)

  if hasCriticalConstraint(state):
    return vulnerable

  if meetsPreparedThresholds(state):
    return prepared

  return vulnerable
```

Las reglas no compiten: la validación precede a toda salida, las restricciones críticas preceden a la preparación suficiente y el caso residual solo se evalúa al final.

## 4. Tabla normativa de transiciones

| # | Origen | Condición declarativa | Prioridad | Destino / efecto | Justificación causal |
|---:|---|---|---:|---|---|
| 1 | `intro-briefing-mission` | `completed(origin)` | Única | `prevention-inspection-territory-fuel` | La misión debe conocerse antes de inspeccionar el territorio. |
| 2 | `prevention-inspection-territory-fuel` | `completed(origin)` | Única | `prevention-inspection-housing-interface` | La lectura territorial precede a la inspección local de viviendas. |
| 3 | `prevention-inspection-housing-interface` | `completed(origin) AND validInheritedState(inheritedState)` | Única | `transition-summary-prevention` | El balance solo puede mostrarse después de consolidar ambas inspecciones. |
| 4 | `transition-summary-prevention` | `completed(origin) AND validInheritedState(inheritedState)` | Única | `crisis-decision-first-alert` | El jugador confirma un balance causal válido antes del verano. |
| 5 | `crisis-decision-first-alert` | `completed(origin) AND validInheritedState(inheritedState)` | Única | `crisis-router-causal-map` | La primera respuesta común termina antes de aplicar el balance preventivo. |
| 6A | `crisis-router-causal-map` | `completed(origin) AND branchIs(prepared) AND selectBranch(inheritedState) = prepared` | 20 | `crisis-decision-emergency-fuel-break` | El estado supera todos los mínimos de preparación sin restricciones críticas. |
| 6B | `crisis-router-causal-map` | `completed(origin) AND branchIs(vulnerable) AND selectBranch(inheritedState) = vulnerable` por restricción crítica | 10 | `crisis-decision-access-blockage` | Una condición de seguridad crítica elimina la maniobra preparada. |
| 6C | `crisis-router-causal-map` | `completed(origin) AND branchIs(vulnerable) AND selectBranch(inheritedState) = vulnerable` por estado residual | 30 | `crisis-decision-access-blockage` | Un estado válido que no alcanza todos los mínimos conserva vulnerabilidades operativas. |
| 7A | `crisis-decision-emergency-fuel-break` | `completed(origin) AND branchIs(prepared)` | Única | `crisis-decision-ravine-fire` | La maniobra habilitada desemboca en el problema compartido del barranco. |
| 7B | `crisis-decision-access-blockage` | `completed(origin) AND branchIs(vulnerable)` | Única | `crisis-decision-ravine-fire` | La pérdida de acceso desemboca en el mismo problema con otras restricciones. |
| 8A | `crisis-decision-ravine-fire` | `completed(origin) AND branchIs(prepared)` | Exclusiva | `crisis-decision-housing-defense` | La rama preparada conserva acceso y margen para sostener la defensa. |
| 8B | `crisis-decision-ravine-fire` | `completed(origin) AND branchIs(vulnerable)` | Exclusiva | `crisis-decision-crown-fire` | La vulnerabilidad acumulada proyecta la crisis hacia la escalada de copas. |
| 9A | `crisis-decision-housing-defense` | `completed(origin) AND branchIs(prepared)` | Única | `ending-result-causal-report`; preparar variante `contained` | La ruta preparada culmina en contención explicada causalmente. |
| 9B | `crisis-decision-crown-fire` | `completed(origin) AND branchIs(vulnerable)` | Única | `ending-result-causal-report`; preparar variante `overwhelmed` | La ruta vulnerable culmina en pérdida de capacidad explicada causalmente. |

La tabla contiene 14 filas condicionales para las 13 aristas del grafo: la salida vulnerable del router aparece dos veces para hacer explícitas sus prioridades crítica y residual. Estructuralmente existen cinco aristas comunes, dos salidas del router, dos entradas al barranco, dos salidas del barranco y dos entradas al resultado.

## 5. Registro y conservación de la rama

Al resolver el router se ejecuta esta secuencia normativa:

1. validar `inheritedState` y calcular `selectBranch(inheritedState)`;
2. persistir `GameSession.crisisBranch` y un único `crisis-branch-selected` coherente;
3. completar `crisis-router-causal-map`;
4. emitir `scene-transitioned` hacia la apertura correspondiente.

Tras cada paso persistido deben mantenerse coherentes:

```text
GameSession.crisisBranch
crisis-branch-selected.branch
crisis-branch-selected.nextSceneId
crisis-branch-selected.evidenceIds
scene-transitioned.toSceneId
```

La correspondencia obligatoria es:

| `crisisBranch` | `nextSceneId` | Variante final |
|---|---|---|
| `prepared` | `crisis-decision-emergency-fuel-break` | `contained` |
| `vulnerable` | `crisis-decision-access-blockage` | `overwhelmed` |

Una vez registrada, `crisisBranch` es inmutable. El barranco consulta la rama conservada; no vuelve a clasificar `inheritedState`. Esto impide oscilaciones, cambios de ruta por decisiones de crisis y duplicación del nodo compartido.

Si una sesión se reanuda después de registrar `crisis-branch-selected` pero antes de completar el router o emitir `scene-transitioned`, el flujo reutiliza la selección existente, comprueba su coherencia y continúa desde el primer paso ausente. No añade un segundo evento ni recalcula una rama distinta.

## 6. Terminación y variante de resultado

`ending-result-causal-report` es un único nodo terminal y no tiene sucesores. Al completarlo:

```text
branchIs(prepared)   -> validResult(contained)
branchIs(vulnerable) -> validResult(overwhelmed)
```

El snapshot pasa a `status = completed`, conserva `currentSceneId = ending-result-causal-report` y registra un único `session-completed` como último evento. La evidencia del resultado explica la cadena preventiva y de crisis; la variante no constituye una escena nueva.

## 7. Tratamiento de estados inválidos

Ante cualquiera de estas condiciones se devuelve un error explícito y no se modifica el snapshot ni el historial:

| Condición inválida | Error contractual esperado | Tratamiento |
|---|---|---|
| Falta `inheritedState` cuando ya es necesario | `invalid-inherited-state` | Bloquear el avance. |
| Faltan dimensiones, sobran claves o un valor no es entero `0..100` | `invalid-inherited-state` | Bloquear el router; no normalizar ni imputar valores. |
| Snapshot y evento de cálculo no coinciden | `corrupt-session-history` | Rechazar la sesión hasta reparar o restaurar una versión válida. |
| Origen no completado, origen distinto del nodo actual o arista inexistente | `corrupt-session-history` | No emitir `scene-transitioned`. |
| Rama ausente después del router o valor distinto de `prepared`/`vulnerable` | `invalid-branch` | Bloquear la escena de crisis. |
| Evento de selección, siguiente escena y rama no coinciden | `branch-path-mismatch` | Rechazar la transición. |
| Se intenta cambiar una rama ya registrada | `branch-path-mismatch` | Conservar el historial y rechazar la mutación. |
| Variante final incompatible con la rama | `invalid-result` | No completar la sesión. |
| Evento posterior a `session-completed` | `event-after-completion` | Rechazar el evento. |

No existe fallback hacia comunicación, evacuación, una escena histórica, una entrada de biblioteca ni un tercer resultado. Un error técnico tampoco se transforma en `vulnerable`: los estados válidos residuales sí pertenecen a esa rama; los estados inválidos no pertenecen a ninguna.

## 8. Invariantes verificables

1. Cada nodo no terminal tiene al menos una salida válida.
2. Solo el router selecciona `crisisBranch`.
3. La selección produce exactamente `prepared` o `vulnerable` para todo `inheritedState` válido.
4. Las restricciones críticas tienen precedencia y no se compensan.
5. La rama preparada exige que se cumplan simultáneamente sus cinco umbrales.
6. Los estados válidos restantes se clasifican como vulnerables.
7. `crisisBranch` no cambia después de registrarse.
8. El barranco tiene un único ID y sus dos predicados de salida son mutuamente excluyentes.
9. Cada rama contiene exactamente tres decisiones de crisis después del router.
10. Ambas ramas convergen en el mismo nodo terminal.
11. `contained` solo acompaña a `prepared`; `overwhelmed` solo acompaña a `vulnerable`.
12. Un fallo de validación no produce eventos ni una ruta alternativa.
13. No hay aristas hacia contenido excluido del catálogo canónico.

## 9. Evidencia ejecutable existente

La implementación de M2 deberá mantener alineados estos artefactos:

- `tests/support/game-session-contract.ts` enumera exactamente las 13 aristas canónicas y rechaza cualquier otra;
- `tests/support/game-session-contract-base.ts` valida las cinco claves de `inheritedState`, la correspondencia entre rama y apertura, la conservación de ruta y la variante final;
- `tests/fixtures/game-session/prevention-completed.json` demuestra que el estado se calcula después de las dos inspecciones;
- `tests/fixtures/game-session/crisis-prepared.json` registra una única selección preparada antes de entrar en su apertura;
- `tests/fixtures/game-session/completed-contained.json` demuestra la convergencia y terminación preparada;
- `tests/game-session-contract.test.ts` aporta la variante vulnerable completa y los casos negativos del contrato.

Los tests actuales demuestran forma, orden y aristas. Los umbrales, la validación entera `0..100` y la evaluación del router quedan especificados aquí para su implementación en M2.

## 10. Matriz de aceptación de #26

| Criterio | Evidencia | Estado |
|---|---|---|
| Cada nodo no terminal tiene una salida | Tabla normativa e invariante 1 | Cumplido |
| Condiciones deterministas | Secciones 2–4 | Cumplido |
| Sin prioridades ambiguas ni fallbacks excluidos | Precedencia 0/10/20/30 y sección 7 | Cumplido |
| Rama registrada y conservada | Sección 5 | Cumplido |
| Dos variantes de un único terminal | Sección 6 | Cumplido |
| Justificación causal por transición | Última columna de la tabla | Cumplido |
| IDs canónicos de #23 | Tabla normativa completa | Cumplido |

## 11. Entrega siguiente

#27 valida el grafo completo en [`vertical-beta-1-graph-validation.md`](vertical-beta-1-graph-validation.md): unicidad de IDs, alcanzabilidad desde el inicio, ausencia de ciclos, convergencias permitidas y correspondencia entre predicados y destinos.
