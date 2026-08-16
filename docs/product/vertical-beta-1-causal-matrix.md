# Vertical Beta 1 — Matriz causal directa prevención–crisis

- Fecha: 16 de agosto de 2026
- Issue: #37
- Issue padre: #17
- Entradas normativas: #25, #33–#36
- Estado contrastado: `main@15424435af6c873e1b5c4b8d057fd66d4d9eadde`

## 1. Propósito

Este documento conecta cada actuación preventiva oficial con las capacidades, restricciones y consecuencias que modifica durante la crisis. No redefine el inventario de #36: construye las cadenas directas necesarias para que #38 pueda señalar las afirmaciones que requieren validación experta y #39 redacte el informe final.

Se utiliza “prevención–crisis” en lugar de “invierno–verano” porque el grafo canónico ya no conserva la campaña estacional heredada como estructura del flujo.

## 2. Fuentes de verdad y precedencia

| Fuente | Responsabilidad que se reutiliza aquí |
|---|---|
| #33 | Condición observada, actuación, evidencia, omisión y dirección del impacto. |
| #34 | Magnitudes, ejecución completa/parcial/fallida, agregación, restricciones críticas, `attackOpportunity` y rama. |
| #35 | Capacidades y restricciones mecánicas consumidas por las escenas. |
| #36 | Ocho actuaciones y diez consecuencias con claves estables. |
| #25–#27 | Escenas, ramas, transiciones, convergencia y variantes terminales. |

Cuando una relación depende de varias actuaciones o dimensiones, la matriz la marca como derivada. Ninguna fila aislada garantiza una rama o resultado.

## 3. Convenciones

### Resultado de ejecución

- `completed`: aplica el impacto favorable completo y registra evidencia;
- `partial`: aplica el tratamiento parcial aprobado en #34;
- `failed`: no aplica el impacto favorable;
- omitida: conserva el `observedConditionId` sin una penalización duplicada.

### Intensidad y dirección

- `principal ↓` o `principal ↑`: impacto directo dominante;
- `secundaria ↓` o `secundaria ↑`: impacto directo adicional y menor;
- `estratégica`: evidencia que interviene en una derivación, sin delta directo.

Las magnitudes numéricas permanecen exclusivamente en #34.

### Explicación

La columna de explicación contiene una proposición causal breve, no el texto final para el jugador. #39 definirá plantillas, orden y selección de evidencias del informe.

## 4. Matriz causal directa

| Actuación | Resultado o condición causal | Impacto y rango | Consecuencias afectadas | Escenas canónicas | Manifestación observable | Explicación causal breve |
|---|---|---|---|---|---|---|
| `gestionar-restos-poda` | Completada: `pruning-residues-removed-or-processed`.<br>Omitida: `pruning-residues-accumulated`. | `fuelLoad ↓` principal | `intensityLevel`; derivadas `positionHoldability`, `housingDefenseCapability`, `emergencyLineViability`, `extinctionCapacityState` | `crisis-decision-emergency-fuel-break`<br>`crisis-decision-ravine-fire`<br>`crisis-decision-housing-defense`<br>`crisis-decision-crown-fire` | Menos restos secos disponibles reducen intensidad sostenida y amplían el margen temporal. | Retirar o procesar el combustible observado reduce la presión del frente; omitir deja esa carga disponible. |
| `crear-discontinuidades-vegetales` | Completada: `strategic-vegetation-discontinuity-created`.<br>Omitida: `territorial-vegetation-continuity-present`. | `fuelContinuity ↓` principal;<br>`defensibility ↑` secundaria | `spreadLevel`, `positionHoldability`; derivadas `crownTransitionRisk`, `housingDefenseCapability`, `attackCapability`, `emergencyLineViability`, `extinctionCapacityState` | `crisis-decision-emergency-fuel-break`<br>`crisis-decision-ravine-fire`<br>`crisis-decision-housing-defense`<br>`crisis-decision-crown-fire` | El frente encuentra interrupciones y puntos de anclaje; las posiciones tienen menor probabilidad de ser superadas. | Romper la conexión territorial limita la propagación y aporta bordes utilizables, sin garantizar por sí sola un ataque seguro. |
| `limpiar-margenes-caminos` | Completada: `rural-road-margins-cleared`.<br>Omitida: `rural-road-margins-obstructed`. | `operationalAccess ↑` principal;<br>`fuelContinuity ↓` secundaria | `machineryAccess`, `safeRetreat`, `spreadLevel`; derivadas `positionHoldability`, `attackCapability`, `emergencyLineViability`, `extinctionCapacityState` | `crisis-decision-access-blockage`<br>`crisis-decision-emergency-fuel-break`<br>`crisis-decision-ravine-fire` | Mejora la aproximación territorial, reduce retrasos y permite reposicionamiento; la vegetación junto a la vía deja de prolongar la continuidad. | Recuperar los márgenes elimina un cuello de botella territorial, pero el acceso local aún puede permanecer bloqueado. |
| `activar-pastoreo-preventivo` | Completada: `preventive-grazing-completed-in-priority-strips`.<br>Omitida: `fine-fuel-accumulated-in-priority-strips`. | `fuelLoad ↓` principal;<br>`fuelContinuity ↓` secundaria | `intensityLevel`, `spreadLevel`; derivadas `crownTransitionRisk`, `positionHoldability`, `emergencyLineViability`, `extinctionCapacityState` | `crisis-decision-emergency-fuel-break`<br>`crisis-decision-ravine-fire`<br>`crisis-decision-crown-fire` | El fuego encuentra menos combustible fino y pierde continuidad local en las franjas tratadas. | El beneficio solo existe si el pastoreo se ejecuta y verifica; seleccionarlo sin resultado no reduce el combustible. |
| `evaluar-quema-tecnica` | Evaluación: `professional-line-assessed`.<br>Resultado favorable: `professional-line-feasible`.<br>Otros: `professional-line-not-feasible` o `professional-line-assessment-inconclusive`. | Entrada estratégica para derivar `attackOpportunity`; sin delta directo | `attackCapability`, `emergencyLineViability`; derivadas `positionHoldability`, `crownTransitionRisk`, `extinctionCapacityState` | `crisis-decision-emergency-fuel-break`<br>`crisis-decision-ravine-fire`<br>`crisis-decision-crown-fire` | Puede habilitar o mejorar una posición evaluada cuando acceso, continuidad y defensibilidad también lo permiten. | Evaluar no equivale a disponer de una línea segura; solo `professional-line-feasible` aporta evidencia favorable y nunca anula restricciones críticas. |
| `podar-ramas-y-retirar-seco` | Completada: `vertical-fuel-continuity-reduced`.<br>Omitida: `vertical-fuel-ladder-present`. | `fuelContinuity ↓` principal;<br>`fuelLoad ↓` secundaria | `spreadLevel`, `intensityLevel`, `crownTransitionRisk`; derivadas `positionHoldability`, `housingDefenseCapability`, `emergencyLineViability`, `extinctionCapacityState` | `crisis-decision-ravine-fire`<br>`crisis-decision-housing-defense`<br>`crisis-decision-crown-fire` | Disminuye la conexión del fuego de superficie con las copas y la intensidad próxima a posiciones y viviendas. | Podar solo produce el efecto aprobado cuando el material seco y la biomasa generada se retiran o tratan. |
| `separar-copas` | Completada: `crown-fuel-continuity-reduced`.<br>Omitida: `crown-fuel-continuity-present`. | `fuelContinuity ↓` principal;<br>`defensibility ↑` secundaria | `spreadLevel`, `crownTransitionRisk`, `positionHoldability`; derivadas `housingDefenseCapability`, `attackCapability`, `extinctionCapacityState` | `crisis-decision-ravine-fire`<br>`crisis-decision-housing-defense`<br>`crisis-decision-crown-fire` | La propagación horizontal por copas puede evitarse o retrasarse y disminuye la exposición de posiciones defendibles. | Separar copas rompe la conexión aérea; no sustituye una discontinuidad territorial ni un acceso seguro. |
| `despejar-accesos` | Completada: `fire-engine-access-cleared`.<br>Omitida: `fire-engine-access-obstructed`. | `operationalAccess ↑` principal;<br>`defensibility ↑` secundaria | `machineryAccess`, `safeRetreat`, `housingDefenseCapability`, `positionHoldability`; derivadas `attackCapability`, `emergencyLineViability`, `extinctionCapacityState` | `crisis-decision-access-blockage`<br>`crisis-decision-ravine-fire`<br>`crisis-decision-housing-defense` | Las autobombas pueden entrar, maniobrar, sostener la defensa y salir; la posición local pasa a ser utilizable. | El acceso local completa la cadena operativa; despejar solo los márgenes rurales no elimina un bloqueo junto a viviendas. |

## 5. Reglas derivadas compartidas

### 5.1 Cadena de acceso

```text
territorialAccessReady = has(rural-road-margins-cleared)
localAccessReady = has(fire-engine-access-cleared)

territorialAccessReady AND localAccessReady
→ machineryAccess disponible
→ safeRetreat disponible

solo uno disponible
→ cadena incompleta
→ machineryAccess y safeRetreat restringidos

ninguno disponible
→ bloqueo crítico
```

Una actuación de acceso no borra la omisión de la otra.

### 5.2 Defensibilidad utilizable

```text
usableDefensibility = min(defensibility, operationalAccess)
```

La mejora física de una posición solo se manifiesta como `positionHoldability` o `housingDefenseCapability` hasta el límite que permitan entrada, maniobra y repliegue.

### 5.3 Oportunidad de ataque

```text
fuelLoad
+ fuelContinuity
+ operationalAccess
+ usableDefensibility
+ professional-line-feasible?
→ attackOpportunity
→ attackCapability
→ emergencyLineViability
```

Los pesos, límites y restricciones críticas son los de #34. Esta matriz solo identifica entradas y salidas causales.

### 5.4 Escalada a copas

```text
fuelContinuity alta o muy continua
+ intensidad disponible
+ attackCapability restringida o bloqueada
+ positionHoldability débil o inviable
→ crownTransitionRisk elevada
→ crisis-decision-crown-fire
```

La escalada es una combinación. No se atribuye a una única omisión ni a una puntuación opaca.

### 5.5 Capacidad de extinción

```text
consecuencias mecánicas
+ restricciones críticas
+ crisisBranch conservada
+ historial de decisiones de crisis
→ extinctionCapacityState

prepared   → within-capacity → contained
vulnerable → outside-capacity → overwhelmed
```

La correspondencia es normativa para el contexto estándar de la Vertical Beta 1; no constituye una simulación universal de incendios.

## 6. Cobertura inversa de consecuencias

| Consecuencia | Causas preventivas identificadas | Naturaleza |
|---|---|---|
| `intensityLevel` | `gestionar-restos-poda`, `activar-pastoreo-preventivo`, `podar-ramas-y-retirar-seco` | Proyección de `fuelLoad`. |
| `spreadLevel` | `crear-discontinuidades-vegetales`, `limpiar-margenes-caminos`, `activar-pastoreo-preventivo`, `podar-ramas-y-retirar-seco`, `separar-copas` | Proyección de `fuelContinuity`. |
| `crownTransitionRisk` | Principalmente `crear-discontinuidades-vegetales`, `activar-pastoreo-preventivo`, `podar-ramas-y-retirar-seco`, `separar-copas`; condicionada además por acceso, posición y oportunidad | Combinación derivada. |
| `machineryAccess` | `limpiar-margenes-caminos`, `despejar-accesos` | Cadena territorial/local. |
| `safeRetreat` | `limpiar-margenes-caminos`, `despejar-accesos`; limitada por defensibilidad utilizable | Cadena territorial/local y seguridad. |
| `positionHoldability` | `crear-discontinuidades-vegetales`, `separar-copas`, `despejar-accesos`; condicionada por todas las reducciones de carga y continuidad | Combinación derivada. |
| `housingDefenseCapability` | `crear-discontinuidades-vegetales`, `gestionar-restos-poda`, `podar-ramas-y-retirar-seco`, `separar-copas`, `despejar-accesos` | Combinación de defensa, acceso y comportamiento del fuego. |
| `attackCapability` | Las ocho actuaciones mediante las cuatro dimensiones directas; `evaluar-quema-tecnica` aporta evidencia estratégica condicional | Derivación de `attackOpportunity`. |
| `emergencyLineViability` | Las cinco actuaciones territoriales y las actuaciones de vivienda que modifican continuidad, carga, defensa o acceso | Combinación de oportunidad, acceso y comportamiento. |
| `extinctionCapacityState` | Las ocho actuaciones, restricciones críticas, rama e historial | Resultado agregado explicable; ninguna acción aislada lo determina. |

Cada consecuencia principal de #36 tiene al menos una causa preventiva identificada. Las relaciones de combinación quedan visibles en lugar de ocultarse dentro de una puntuación global.

## 7. Cobertura por escena

| Escena | Cadenas mínimas que debe manifestar |
|---|---|
| `crisis-decision-first-alert` | `fuelLoad → intensityLevel`; `fuelContinuity → spreadLevel`; acceso territorial → retraso o llegada utilizable. |
| `crisis-decision-emergency-fuel-break` | Cadena de acceso + `safeRetreat` + `attackCapability` + intensidad/continuidad → `emergencyLineViability`. |
| `crisis-decision-access-blockage` | Omisión de acceso territorial o local → `machineryAccess` restringido/no disponible + `safeRetreat` limitado + defensa reducida. |
| `crisis-decision-ravine-fire` | Cinco dimensiones → intensidad, propagación, posición, ataque y repliegue; un único nodo proyectado según rama. |
| `crisis-decision-housing-defense` | Acceso local + defensibilidad utilizable + carga/continuidad residual → `housingDefenseCapability`. |
| `crisis-decision-crown-fire` | Continuidad + intensidad + falta de oportunidad/posición → `crownTransitionRisk` y escalada. |
| `ending-result-causal-report` | Cadenas prioritarias + rama + historial → `extinctionCapacityState` y variante. |

## 8. Perfiles de referencia

### 8.1 Municipio preparado

Actuaciones completadas:

```text
gestionar-restos-poda
crear-discontinuidades-vegetales
limpiar-margenes-caminos
podar-ramas-y-retirar-seco
despejar-accesos
```

Estado aprobado en #34:

```text
fuelLoad: 45
fuelContinuity: 25
operationalAccess: 80
defensibility: 50
attackOpportunity: 66
branch: prepared
```

Cadena resultante:

```text
menor carga + discontinuidad territorial y vertical + acceso completo
→ intensidad moderada y propagación interrumpida
→ maquinaria y repliegue disponibles
→ barranco sostenible y ataque condicionado viable
→ defensa de viviendas utilizable
→ extinctionCapacityState = within-capacity
→ contained
```

La partida conserva omisiones y riesgo residual; `contained` no significa prevención perfecta.

### 8.2 Territorio vulnerable

Actuaciones completadas:

```text
gestionar-restos-poda
activar-pastoreo-preventivo
evaluar-quema-tecnica [professional-line-feasible]
podar-ramas-y-retirar-seco
separar-copas
```

Estado aprobado en #34:

```text
fuelLoad: 25
fuelContinuity: 35
operationalAccess: 20
defensibility: 30
attackOpportunity: 24
branch: vulnerable
```

Cadena resultante:

```text
reducción de carga y continuidad
+ omisión de ambos tramos de acceso
→ maquinaria y repliegue no disponibles
→ línea profesional viable pero no aprovechable
→ barranco no sostenible y ataque directo bloqueado
→ crownTransitionRisk elevada
→ extinctionCapacityState = outside-capacity
→ overwhelmed
```

La prevención parcial produjo mejoras reales, pero no compensó la restricción crítica de acceso.

## 9. Representación como reglas puras

La matriz puede traducirse a datos sin textos ni efectos duplicados:

```ts
interface CausalRuleRef {
  actionId: string;
  outcomeRef: string;
  dimensionEffects: readonly {
    dimension: InheritedStateKey;
    direction: 'increase' | 'decrease';
    rank: 'primary' | 'secondary';
  }[];
  consequenceRefs: readonly CrisisConsequenceKey[];
  sceneIds: readonly CanonicalSceneId[];
  explanationKey: string;
}
```

El evaluador futuro recibe estado y evidencias y devuelve una proyección nueva. No lee textos de interfaz, no modifica la entrada y no decide mediante azar:

```text
projectCrisis(inheritedState, evidenceIds, crisisBranch)
→ CrisisProjection
```

Las magnitudes se referencian desde parámetros de #34; las plantillas de explicación se resolverán desde #39.

## 10. Consecuencias secundarias

Comunicación, evacuación, daños y presión sobre población solo aparecen después de una consecuencia estructural:

```text
machineryAccess no disponible
→ retraso operativo
→ mayor presión de evacuación

crownTransitionRisk elevada
→ mayor exposición
→ daños o presión sobre población
```

No son dimensiones, causas primarias, ramas ni selectores del resultado.

## 11. Exclusiones

Esta entrega no:

- inventa actuaciones o consecuencias;
- modifica deltas, pesos, fórmulas o umbrales;
- cambia escenas, ramas o variantes;
- valida científicamente las afirmaciones, alcance de #38;
- redacta el informe final, alcance de #39;
- diseña opciones completas o los guiones de #45–#46;
- incorpora meteorología, capacidad externa, exposición o IA;
- implementa código de producción, API o interfaz.

## 12. Matriz de aceptación de #37

| Criterio | Evidencia | Estado |
|---|---|---|
| Ocho cadenas causales completas | Sección 4 | Cumplido |
| Consecuencias de ambas ramas con causa | Cobertura inversa y escenas, secciones 6–7 | Cumplido |
| Sin salto de puntuación a narrativa | Convenciones, reglas derivadas y consecuencias intermedias | Cumplido |
| Relaciones traducibles a reglas puras | Sección 9 | Cumplido |
| `contained` y `overwhelmed` explicados | Perfiles de referencia, sección 8 | Cumplido |
| Comunicación y evacuación subordinadas | Sección 10 | Cumplido |

## 13. Entregas siguientes

- #38 clasifica combinaciones, umbrales y afirmaciones según su necesidad de validación experta en [`vertical-beta-1-causal-combinations-validation.md`](vertical-beta-1-causal-combinations-validation.md);
- #39 convierte las cadenas prioritarias en explicaciones trazables en [`vertical-beta-1-causal-report.md`](vertical-beta-1-causal-report.md);
- #45 y #46 usarán los dos perfiles para construir recorridos completos;
- #72 podrá implementar reglas y evidencias sin reconstruir causalidad en la vista.
