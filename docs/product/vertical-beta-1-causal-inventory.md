# Vertical Beta 1 — Inventario causal invierno–verano

- Fecha: 16 de agosto de 2026
- Issue: #36
- Issue padre: #17
- Entradas normativas: #23, #25, #32–#35
- Estado contrastado: `main@78743fa6f6da7be235608abd5c9391233a789043`

## 1. Propósito

Este documento normaliza las causas preventivas y las consecuencias observables del recorrido oficial de la Vertical Beta 1. Es la entrada de #37, que construirá la matriz causal directa sin volver a decidir qué elementos pertenecen al MVP.

El inventario contiene dos listas normativas:

1. ocho actuaciones preventivas oficiales;
2. diez consecuencias mecánicas observables durante la crisis y el resultado.

No asigna nuevos deltas, umbrales o fórmulas. Esos valores ya están aprobados en #34 y no se duplican aquí.

## 2. Frontera semántica

La cadena causal conserva cuatro niveles distintos:

```text
condición observada
→ actuación preventiva ejecutada
→ inheritedState
→ consecuencia observable durante la crisis
```

- `observedConditionId` explica por qué una actuación está disponible;
- `actionId` identifica lo que el jugador decide y ejecuta;
- `fuelLoad`, `fuelContinuity`, `operationalAccess`, `defensibility` y `attackOpportunity` son estado interno causal;
- las consecuencias describen capacidades, restricciones y comportamiento perceptibles durante el verano.

Una dimensión interna no se presenta como consecuencia por sí sola. Por ejemplo, `fuelLoad = 75` se proyecta como intensidad sostenida y margen temporal crítico; no se muestra como un efecto narrativo sin traducir.

## 3. Inventario de actuaciones preventivas

Fuente actual común: `src/content/prevention-inspections.ts`. Las tablas identifican además la constante y el hotspot donde existe cada `actionId`.

### 3.1 Territorio y combustible — cinco oficiales, elegir tres

Fuente canónica de escena: `prevention-inspection-territory-fuel`.

| Condición observada estable | Actuación oficial | Función causal | Evidencia favorable | Condición si se omite | Fuente actual |
|---|---|---|---|---|---|
| `pruning-residues-accumulated` | `gestionar-restos-poda` | Reduce principalmente `fuelLoad`. Trata restos preexistentes; no representa una poda nueva. | `pruning-residues-removed-or-processed` | `pruning-residues-accumulated` | `PREVENTION_INSPECTION_FINCAS`; hotspot `restos-poda-acumulados` |
| `territorial-vegetation-continuity-present` | `crear-discontinuidades-vegetales` | Reduce principalmente `fuelContinuity` y mejora secundariamente `defensibility`. | `strategic-vegetation-discontinuity-created` | `territorial-vegetation-continuity-present` | `PREVENTION_INSPECTION_FINCAS`; hotspot `vegetacion-densa-borde-fincas` |
| `rural-road-margins-obstructed` | `limpiar-margenes-caminos` | Mejora principalmente `operationalAccess` y reduce secundariamente `fuelContinuity`. | `rural-road-margins-cleared` | `rural-road-margins-obstructed` | `PREVENTION_INSPECTION_FINCAS`; hotspot `camino-rural-invadido` |
| `fine-fuel-accumulated-in-priority-strips` | `activar-pastoreo-preventivo` | Reduce principalmente `fuelLoad` y secundariamente `fuelContinuity`. | `preventive-grazing-completed-in-priority-strips` | `fine-fuel-accumulated-in-priority-strips` | `PREVENTION_INSPECTION_FINCAS`; hotspot `pastoreo-preventivo` |
| `strategic-area-without-assessed-line` | `evaluar-quema-tecnica` | Registra evaluación estratégica para derivar `attackOpportunity`; no aplica un delta directo. | `professional-line-assessed` más resultado profesional explícito | `strategic-area-without-assessed-line` | `PREVENTION_INSPECTION_FINCAS`; hotspot `quema-tecnica-profesional` |

El resultado profesional de `evaluar-quema-tecnica` debe ser uno de:

```text
professional-line-feasible
professional-line-not-feasible
professional-line-assessment-inconclusive
```

Solo `professional-line-feasible` aporta el modificador estratégico aprobado. Ningún resultado compensa accesos bloqueados, continuidad extrema o una posición insegura.

### 3.2 Viviendas e interfaz — tres oficiales, elegir dos

Fuente canónica de escena: `prevention-inspection-housing-interface`.

| Condición observada estable | Actuación oficial | Función causal | Evidencia favorable | Condición si se omite | Fuente actual |
|---|---|---|---|---|---|
| `vertical-fuel-ladder-present` | `podar-ramas-y-retirar-seco` | Reduce principalmente `fuelContinuity` y secundariamente `fuelLoad`. | `vertical-fuel-continuity-reduced` | `vertical-fuel-ladder-present` | `PREVENTION_INSPECTION_INTERFAZ`; hotspot `ramas-bajas-vegetacion-seca` |
| `crown-fuel-continuity-present` | `separar-copas` | Reduce principalmente `fuelContinuity` y mejora secundariamente `defensibility`. | `crown-fuel-continuity-reduced` | `crown-fuel-continuity-present` | `PREVENTION_INSPECTION_INTERFAZ`; hotspot `copas-tocandose` |
| `fire-engine-access-obstructed` | `despejar-accesos` | Mejora principalmente `operationalAccess` y secundariamente `defensibility`. | `fire-engine-access-cleared` | `fire-engine-access-obstructed` | `PREVENTION_INSPECTION_INTERFAZ`; hotspot `acceso-estrecho` |

### 3.3 Reglas comunes de ejecución

1. Seleccionar no equivale a completar.
2. La evidencia favorable solo se registra cuando se cumplen los requisitos y el resultado es verificable.
3. Poda, corte, desbroce y separación incluyen retirada o tratamiento seguro de la biomasa generada.
4. Abandonar material cortado no completa la actuación ni produce el beneficio aprobado.
5. Omitir conserva la condición observada; no crea una segunda penalización automática.
6. Ninguna actuación afecta directamente a más de dos dimensiones.
7. `attackOpportunity` se deriva; no recibe deltas arbitrarios.

## 4. Inventario de consecuencias observables

Las ocho primeras claves proceden de la proyección mecánica mínima de #35. `emergencyLineViability` y `extinctionCapacityState` normalizan dos consecuencias exigidas expresamente por #35 y #36 que no tenían todavía una clave propia.

| Clave estable | Fuente normativa | Expresión observable | Estado causal consumido | Escenas o salida | Función en el recorrido |
|---|---|---|---|---|---|
| `intensityLevel` | #35, efecto de `fuelLoad` | Intensidad potencial reducida, manejable, alta o sostenida; cambia el margen temporal. | `fuelLoad` | Cortafuego, barranco, defensa de viviendas, fuego de copas | Explica cuánto combustible está disponible y la dificultad de sostener la intervención. |
| `spreadLevel` | #35, efecto de `fuelContinuity` | Propagación limitada, acelerada o rápida y disponibilidad de puntos de anclaje. | `fuelContinuity` | Cortafuego, barranco, defensa de viviendas, fuego de copas | Hace visible la continuidad horizontal y vertical sin mostrar una métrica desnuda. |
| `crownTransitionRisk` | #35, `fuelContinuity` y escena de copas | Riesgo bajo, condicionado o alto de transición de superficie a copas. | `fuelContinuity`, `fuelLoad`, `attackOpportunity`, `defensibility` | Barranco y fuego de copas | Explica la escalada como combinación causal, nunca por un único valor. |
| `machineryAccess` | #35, efecto de `operationalAccess` | Maquinaria disponible, restringida o no disponible; retraso de llegada y maniobra. | `operationalAccess`; evidencias territorial/local | Bloqueo de accesos, barranco y defensa de viviendas | Distingue aproximación territorial de acceso local a la interfaz. |
| `safeRetreat` | #35, acceso y restricciones de seguridad | Repliegue disponible, limitado o inseguro. | `operationalAccess`, `defensibility` | Bloqueo de accesos, barranco y defensa de viviendas | Bloquea opciones incompatibles con la seguridad aunque otras dimensiones sean favorables. |
| `positionHoldability` | #35, efecto de `defensibility` | Posición sostenible, parcial o que debe abandonarse. | `defensibility`, `operationalAccess`, `fuelContinuity`, `fuelLoad` | Cortafuego, barranco, defensa de viviendas y fuego de copas | Traduce la defensibilidad utilizable a una restricción operativa observable. |
| `housingDefenseCapability` | #35, escena de defensa de viviendas | Defensa sostenida, selectiva, temporal o inviable. | `defensibility`, `operationalAccess`, `fuelLoad`, `fuelContinuity` | Defensa de viviendas | Explica por qué la rama preparada puede sostener prioridades y la vulnerable pierde margen. |
| `attackCapability` | #35, efecto de `attackOpportunity` | Ataque viable, condicionado, indirecto o bloqueado. | `attackOpportunity` y restricciones críticas de las otras dimensiones | Cortafuego, barranco y fuego de copas | Expresa la oportunidad real de intervención sin sustituir el resto del estado. |
| `emergencyLineViability` | #35, escena de cortafuego de emergencia | Línea de emergencia viable, viable con restricciones o superable/no utilizable. | `attackOpportunity`, `operationalAccess`, `fuelLoad`, `fuelContinuity` | Cortafuego de emergencia y barranco | Conecta preparación del territorio, acceso y comportamiento del frente con la maniobra técnica. |
| `extinctionCapacityState` | #36 y convergencia aprobada en #25 | Incendio dentro de capacidad o fuera de capacidad de extinción. | Conjunto de las cinco dimensiones, restricciones críticas, rama e historial | Resultado causal | Resume el estado operativo final como `contained` o `overwhelmed` sin crear otro nodo. |

## 5. Cobertura por rama

### Preparada

La rama preparada debe hacer observables, como mínimo:

- `emergencyLineViability` viable o condicionada;
- `machineryAccess` utilizable;
- `safeRetreat` disponible;
- `positionHoldability` sostenible con límites;
- `housingDefenseCapability` viable;
- `attackCapability` disponible;
- `extinctionCapacityState` dentro de capacidad y variante `contained`.

No implica ausencia de riesgo: `intensityLevel`, `spreadLevel` y `crownTransitionRisk` pueden seguir mostrando presión residual.

### Vulnerable

La rama vulnerable debe hacer observables, como mínimo:

- `machineryAccess` restringido o no disponible;
- `safeRetreat` limitado o inseguro;
- `positionHoldability` parcial o inviable;
- `attackCapability` indirecto o bloqueado;
- `emergencyLineViability` no aprovechable con seguridad;
- `crownTransitionRisk` elevado por una combinación causal;
- `extinctionCapacityState` fuera de capacidad y variante `overwhelmed`.

Las mejoras preventivas parciales siguen apareciendo en intensidad o propagación; no se borran solo porque la rama sea vulnerable.

## 6. Consecuencias narrativas secundarias

Comunicación, evacuación, daños y población pueden aparecer únicamente como evidencias o efectos narrativos derivados de las consecuencias principales. No son:

- dimensiones de `inheritedState`;
- causas preventivas independientes;
- predicados del router;
- ramas del MVP;
- compensaciones de una restricción de seguridad.

Ejemplo permitido:

```text
machineryAccess = unavailable
+ safeRetreat = false
→ se prioriza protección de vidas
→ aumenta la presión de evacuación como consecuencia secundaria
```

Ejemplo excluido:

```text
campaña de comunicación
→ rama alternativa de verano
```

Los IDs concretos de explicación y evidencia secundaria pertenecen a #39; #36 solo fija su posición subordinada en la cadena.

## 7. Contraste con el contenido actual

Los ocho `actionId` existen en `src/content/prevention-inspections.ts`, pero el archivo todavía no representa el catálogo oficial completo:

- `PREVENTION_INSPECTIONS` contiene también `PREVENTION_INSPECTION_COMUNIDAD`;
- el array coloca interfaz antes de fincas, mientras el grafo canónico usa territorio y después vivienda;
- ambas pantallas conservan `maxActions: 4`, no las selecciones oficiales 3 de 5 y 2 de 3;
- las dos pantallas contienen hotspots y acciones adicionales de biblioteca;
- impactos, flags y nombres heredados aún no usan el contrato de `inheritedState` aprobado.

Estas diferencias no cambian el inventario normativo. Su adaptación corresponde a #70 y la separación de contenido a #74.

## 8. Exclusiones

No forman parte de las causas oficiales:

- acciones de `PREVENTION_INSPECTION_COMUNIDAD`;
- acciones adicionales de las pantallas actuales;
- cualquier decisión de `p-003`;
- contenido clasificado como biblioteca o archivo;
- preparación familiar, confianza, canales o población vulnerable;
- decisiones de crisis, que son respuesta operativa y no prevención heredada.

Tampoco se definen aquí combinaciones entre varias actuaciones, umbrales expertos, textos finales o guiones completos. Esos alcances corresponden respectivamente a #37, #38, #39 y #45–#47.

## 9. Matriz de aceptación de #36

| Criterio | Evidencia | Estado |
|---|---|---|
| Ocho actuaciones oficiales | Dos tablas de la sección 3: cinco + tres | Cumplido |
| Consecuencias necesarias para ambas ramas | Diez claves de la sección 4 y cobertura de la sección 5 | Cumplido |
| Cada elemento tiene ID o clave estable y fuente | Tablas de las secciones 3–4 | Cumplido |
| Sin `p-003` ni biblioteca como causas | Secciones 7–8 | Cumplido |
| Estado interno separado de expresión narrativa | Sección 2 y columna de expresión observable | Cumplido |
| Comunicación y evacuación no son el eje | Sección 6 | Cumplido |

## 10. Entrega siguiente

#37 podrá construir la matriz directa:

```text
actionId
→ dimensión y evidencia
→ consecuencia observable
→ escena afectada
→ explicación causal
```

sin ampliar el conjunto de actuaciones ni inventar nuevas consecuencias principales.
