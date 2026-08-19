# Vertical Beta 1 — Combinaciones causales, umbrales y validación experta

- Fecha: 16 de agosto de 2026
- Issue: #38
- Issue padre: #17
- Entradas normativas: #10, #34–#37
- Estado contrastado: `main@b6fade41161fa83271e589fb7f0f5e838caf5a3d`

## 1. Propósito

Este documento reduce la matriz causal de #37 a cinco combinaciones preventivas necesarias para distinguir las ramas `prepared` y `vulnerable`. Para cada combinación fija predicados reproducibles, efecto derivado, prioridad y estado de validación.

Las combinaciones no añaden puntos a `inheritedState`, no recalculan sus cinco dimensiones y no sustituyen el selector de rama de #34. Son capacidades semánticas derivadas: permiten explicar por qué varias condiciones juntas habilitan un efecto que ninguna garantiza por separado.

## 2. Qué significa “validado”

Se usan exactamente tres estados:

| Estado | Significado | Uso permitido |
|---|---|---|
| `validated-product-rule` | Invariante de producto ya acordada, determinista y comprobable en el repositorio. | Forma de datos, precedencia, reproducibilidad y correspondencia con el grafo. No implica aval científico u operativo externo. |
| `plausible-pending-expert-review` | La dirección causal es coherente con las fuentes técnicas consultadas, pero su formulación para este territorio y contexto debe revisarse según el plan #10 y registrarse en #99. | Afirmaciones sobre comportamiento del fuego, acceso, repliegue, defensa o ataque. |
| `gameplay-simplification` | Abstracción deliberada para ofrecer reglas legibles y dos recorridos de beta. | Escala `0..100`, cortes exactos y reducción de un sistema real a cinco dimensiones y dos ramas. |

No se utilizará la etiqueta “validado” sin el sufijo `product-rule`. Una afirmación operativa pendiente no asciende de estado por estar implementada o cubierta por tests.

## 3. Precedencia normativa

Las reglas se evalúan siempre en este orden:

| Prioridad | Evaluación | Resultado |
|---:|---|---|
| 0 | Estado válido | Bloquear si faltan dimensiones, sobran claves o un valor no es entero `0..100`. |
| 10 | Restricción crítica | Marcar el veto y seleccionar `vulnerable`; ninguna combinación favorable lo compensa. |
| 20 | Envolvente de ataque seguro | Si se cumplen simultáneamente los cinco mínimos de #34, seleccionar `prepared`. |
| 30 | Capacidades operativas locales | Derivar línea preventiva utilizable y defensa de viviendas utilizable para explicación. |
| 40 | Amortiguadores de comportamiento | Derivar reducción conjunta de intensidad/propagación y de transición a copas para explicación. |
| 50 | Estado residual | Si el estado es válido pero no alcanza la envolvente, seleccionar `vulnerable`. |

Las combinaciones de prioridades 30 y 40 pueden coexistir. Su prioridad ordena evaluación y explicación; no elige una única ganadora.

### Restricciones críticas heredadas de #34

```text
operationalAccess <= 24
OR fuelContinuity >= 75
OR defensibility <= 24
OR attackOpportunity <= 24
OR (fuelLoad >= 75 AND fuelContinuity >= 50)
```

Además, para las capacidades que requieren entrada y repliegue, la ausencia de cualquiera de los dos tramos de acceso limita la capacidad y la ausencia de ambos la bloquea:

```text
territorialAccessReady = has(rural-road-margins-cleared)
localAccessReady = has(fire-engine-access-cleared)
```

Esta evidencia no introduce un sexto valor en `inheritedState`: concreta por qué `operationalAccess` es o no utilizable.

## 4. Catálogo normativo de combinaciones

### C-01 — Amortiguador de comportamiento del combustible

| Campo | Definición |
|---|---|
| Predicado | `fuelLoad <= 49 AND fuelContinuity <= 49` |
| Evidencia preventiva mínima | Al menos una evidencia favorable sobre reducción de carga y otra sobre discontinuidad territorial o local. |
| Efecto distinto de la suma | Deriva `fuelBehaviorBuffer`: existe simultáneamente menos energía disponible y menor conexión para sostener la propagación. No es un bonus numérico. |
| Consecuencias | `intensityLevel` moderado o bajo; `spreadLevel` interrumpido o condicionado; mayor `positionHoldability` potencial. |
| Escenas | Cortafuego de emergencia, barranco y primer aviso. |
| Prioridad | 40 |
| Contribución a rama | Evidencia favorable, pero insuficiente por sí sola para `prepared`. Un acceso crítico puede conservar `vulnerable`. |
| Validación | Dirección causal: `plausible-pending-expert-review`. Cortes `49`: `gameplay-simplification`. Predicado determinista: `validated-product-rule`. |

### C-02 — Línea preventiva evaluada y operable

| Campo | Definición |
|---|---|
| Predicado | `has(professional-line-feasible) AND operationalAccess >= 50 AND territorialAccessReady AND localAccessReady AND attackOpportunity >= 50` |
| Efecto distinto de la suma | Deriva `assessedLineOperable`: una línea técnicamente viable pasa a ser alcanzable y utilizable; ni la evaluación ni el acceso aislados lo garantizan. |
| Consecuencias | `attackCapability` viable o condicionada; `emergencyLineViability` utilizable, nunca garantizada. |
| Escenas | Cortafuego de emergencia y barranco. |
| Prioridad | 30 |
| Contribución a rama | Refuerza la explicación de `prepared`; su ausencia no decide por sí sola `vulnerable`, porque #34 admite preparación sin esa evidencia estratégica. |
| Validación | Necesidad de acceso, repliegue y evaluación: `plausible-pending-expert-review`. Cortes `50`: `gameplay-simplification`. Composición: `validated-product-rule`. |

### C-03 — Amortiguador de transición a copas

| Campo | Definición |
|---|---|
| Predicado | `has(vertical-fuel-continuity-reduced) AND has(crown-fuel-continuity-reduced) AND fuelContinuity <= 49` |
| Efecto distinto de la suma | Deriva `crownTransitionBuffer`: se reduce conjuntamente la conexión de superficie a copas y entre copas; podar o separar de forma aislada no deriva la capacidad completa. |
| Consecuencias | `crownTransitionRisk` reducido o retrasado; mejora potencial de `positionHoldability`. No significa riesgo eliminado. |
| Escenas | Barranco, defensa de viviendas y fuego de copas. |
| Prioridad | 40 |
| Contribución a rama | Evidencia favorable de continuidad; insuficiente para `prepared` si fallan acceso, defensa u oportunidad. |
| Validación | Dirección causal: `plausible-pending-expert-review`. Corte `49` y categoría discreta: `gameplay-simplification`. Predicado: `validated-product-rule`. |

### C-04 — Defensa de viviendas operable

| Campo | Definición |
|---|---|
| Predicado | `defensibility >= 50 AND operationalAccess >= 50 AND localAccessReady AND min(defensibility, operationalAccess) >= 50` |
| Efecto distinto de la suma | Deriva `housingDefenseOperable`: una posición físicamente defendible pasa a admitir entrada, maniobra y salida. Ni la defensibilidad sin acceso ni el acceso sin posición defendible bastan. |
| Consecuencias | `housingDefenseCapability` viable o selectiva; `safeRetreat` disponible solo si también se completa la cadena territorial. |
| Escenas | Bloqueo de acceso, barranco y defensa de viviendas. |
| Prioridad | 30 |
| Contribución a rama | Es necesaria para la envolvente preparada mediante sus dimensiones; una evidencia local favorable no anula una restricción crítica territorial. |
| Validación | Relación acceso–defensa: `plausible-pending-expert-review`. Cortes `50`: `gameplay-simplification`. Uso de `min`: `validated-product-rule`. |

### C-05 — Envolvente de oportunidad de ataque seguro

| Campo | Definición |
|---|---|
| Predicado | Sin restricción crítica y `fuelLoad <= 74 AND fuelContinuity <= 49 AND operationalAccess >= 50 AND defensibility >= 50 AND attackOpportunity >= 50`. |
| Evidencia explicativa | Debe conservar causas de combustible, acceso y posición; cuando una capacidad exige entrada y repliegue, se aplica además la cadena de acceso de #37. |
| Efecto distinto de la suma | Deriva `safeAttackEnvelope`: las cinco condiciones forman una ventana conjunta de maniobra. Ninguna puntuación alta compensa una condición crítica. |
| Consecuencias | `attackCapability` y `positionHoldability` suficientes para el contexto estándar; `extinctionCapacityState = within-capacity`. No garantiza el éxito de una operación real. |
| Escenas | Router, cortafuego de emergencia, barranco, defensa de viviendas y resultado. |
| Prioridad | 20 |
| Contribución a rama | Es exactamente la condición de `prepared`. Su fallo produce `vulnerable` por veto crítico o por estado residual. |
| Validación | No compensación de restricciones y correspondencia con el grafo: `validated-product-rule`. Suficiencia operativa: `plausible-pending-expert-review`. Escala, cortes y salida binaria: `gameplay-simplification`. |

## 5. Umbrales reproducibles

Las bandas se aplican igual a las cinco dimensiones; su interpretación favorable o desfavorable depende de la dimensión:

| Intervalo entero | Etiqueta técnica | Uso en esta entrega |
|---:|---|---|
| `0..24` | Crítico bajo | Veto para acceso, defensa u oportunidad. |
| `25..49` | Insuficiente o favorable bajo | Favorable para carga/continuidad; insuficiente para capacidades operativas. |
| `50..74` | Suficiente condicionado | Mínimo operativo para acceso, defensa y oportunidad; carga no crítica. |
| `75..100` | Alto | Continuidad crítica; carga crítica cuando continuidad es al menos `50`. |

Reglas de frontera obligatorias:

1. los valores son enteros inclusivos;
2. `49` y `50` pertenecen a bandas distintas;
3. `74` y `75` pertenecen a bandas distintas;
4. primero se evalúan todos los vetos y después la preparación;
5. la misma entrada y las mismas evidencias producen siempre las mismas combinaciones, razones y rama;
6. una combinación no muta los valores que evalúa;
7. un estado inválido produce error, no la rama `vulnerable`.

Los cortes son parámetros de juego propuestos en #34. Son comprobables, pero no son magnitudes físicas ni umbrales científicos.

## 6. Registro de afirmaciones

| ID | Afirmación sometida a control | Estado | Revisión necesaria en #99 |
|---|---|---|---|
| `PR-001` | Estado y evidencias iguales producen la misma salida. | `validated-product-rule` | No; mantener test de determinismo. |
| `PR-002` | Un veto crítico precede a toda ventaja parcial. | `validated-product-rule` | Revisar por experto solo la suficiencia de la lista de vetos. |
| `PR-003` | Las combinaciones explican capacidades sin sumar puntos. | `validated-product-rule` | No; verificar trazabilidad en implementación. |
| `OP-001` | Carga y continuidad reducidas juntas moderan intensidad y propagación. | `plausible-pending-expert-review` | Prevención y comportamiento del fuego. |
| `OP-002` | Una línea evaluada requiere acceso completo y oportunidad suficiente para ser operable. | `plausible-pending-expert-review` | Operaciones, seguridad y extinción. |
| `OP-003` | Reducir continuidad vertical y entre copas amortigua la transición a copas. | `plausible-pending-expert-review` | Comportamiento del fuego y tratamientos de combustible. |
| `OP-004` | Defensa y acceso local suficientes permiten una defensa selectiva de viviendas. | `plausible-pending-expert-review` | Interfaz urbano-forestal y seguridad operativa. |
| `OP-005` | La envolvente C-05 es suficiente para describir oportunidad segura en el contexto estándar. | `plausible-pending-expert-review` | Operaciones; revisión bloqueante antes de publicación. |
| `SIM-001` | Cinco enteros `0..100` representan el estado causal necesario. | `gameplay-simplification` | Comprobar comprensión con ciudadanía. |
| `SIM-002` | Los cortes `24/25`, `49/50` y `74/75` representan cambios discretos. | `gameplay-simplification` | Ajuste conjunto experto–diseño tras probar ambos perfiles. |
| `SIM-003` | Todo estado válido termina en `prepared` o `vulnerable`. | `gameplay-simplification` | Comprobar que no induce conclusiones universales. |
| `SIM-004` | `prepared` conduce a `contained` y `vulnerable` a `overwhelmed` en esta beta. | `gameplay-simplification` | Validar mensaje educativo y evitar promesa de resultado real. |

## 7. Contraste técnico limitado

Las fuentes externas sostienen únicamente la dirección general de algunas relaciones:

- la investigación del US Forest Service describe que combinar tratamientos de combustible superficial y de copa puede reducir severidad y limitar comportamiento de copas, pero también que el resultado depende del tipo, ubicación y condiciones del incendio;
- el sistema LCES de NWCG trata rutas de escape y zonas de seguridad como elementos de seguridad operativa, lo que respalda que una ventaja de combustible no compense un veto de acceso o repliegue;
- la formación WUI de NWCG advierte que variables propias de la protección de estructuras alteran la evaluación y que cálculos generales de zona segura no se trasladan automáticamente a ese contexto.

De estas fuentes se infiere que C-01 a C-04 son causalmente plausibles y que los vetos deben prevalecer. No se infieren de ellas los valores `0..100`, los cortes exactos, la suficiencia de C-05 ni la correspondencia binaria de resultados.

Referencias:

- [US Forest Service — Forest thinning and prescribed burning treatments reduce wildfire severity](https://research.fs.usda.gov/treesearch/67354)
- [US Forest Service — Science basis for changing forest structure to modify wildfire behavior and severity](https://research.fs.usda.gov/treesearch/6279)
- [NWCG — Lookouts, Communications, Escape Routes, and Safety Zones](https://www.nwcg.gov/publications/pms205/nwcg-glossary-of-wildland-fire-pms-205/lookouts-communications-escape-routes-and-safety-zones-139)
- [NWCG — S-215 Fire Operations in the Wildland/Urban Interface](https://training.nwcg.gov/dl/s215/s-215-ig.pdf)

## 8. Paquete de revisión para #99 según el plan #10

### Perfiles revisores mínimos

1. especialista en prevención, combustibles y comportamiento del fuego;
2. responsable de operaciones de extinción con experiencia en acceso, repliegue y líneas;
3. especialista en interfaz urbano-forestal y defensa de estructuras;
4. responsable de diseño educativo para revisar las simplificaciones y su comprensión.

### Método y registro

Cada revisor recibe este catálogo, los parámetros de #34, la matriz #37 y los dos perfiles de referencia. Para cada `OP-*` debe registrar:

```text
claimId
decision: accept | adjust | reject
rationale
evidenceOrReference
reviewerProfile
reviewDate
reviewedVersion
affectedRuleIds
```

Una ronda queda aprobada cuando:

- ningún `OP-*` permanece sin decisión;
- `OP-002`, `OP-004` y `OP-005`, por afectar seguridad operativa, están aceptados o ajustados antes de publicación;
- todo ajuste de umbral versiona los parámetros, actualiza #34, este catálogo y las partidas de referencia #45–#47;
- los perfiles preparado y vulnerable siguen siendo reproducibles y diferentes;
- los textos no presentan `contained` como garantía ni `vulnerable` como predicción universal.

Cerrar #38 deja preparado este paquete. No ejecuta #99/#100 ni autoriza la publicación de la beta.

## 9. Forma de regla pura

```ts
type ValidationStatus =
  | 'validated-product-rule'
  | 'plausible-pending-expert-review'
  | 'gameplay-simplification';

interface CausalCombinationRule {
  id: 'C-01' | 'C-02' | 'C-03' | 'C-04' | 'C-05';
  priority: 20 | 30 | 40;
  all: readonly PredicateRef[];
  none: readonly CriticalConstraintRef[];
  derives: readonly CrisisConsequenceKey[];
  sceneIds: readonly CanonicalSceneId[];
  claimIds: readonly string[];
}

evaluateCombinations(inheritedState, evidenceIds)
  -> { combinationIds, consequenceIds, claimIds }
```

El selector de rama sigue siendo una función aparte y normativa:

```text
selectBranch(inheritedState)
  -> prepared | vulnerable
```

La implementación compara la combinación C-05 con la salida del selector y falla ante una discrepancia. Las combinaciones C-01 a C-04 solo aportan consecuencias y razones; nunca corrigen la rama.

## 10. Perfiles de frontera obligatorios

| Caso | Estado / evidencia diferencial | Combinaciones esperadas | Rama |
|---|---|---|---|
| Preparado mínimo | `74,49,50,50,50`; cadena de acceso completa | C-05; otras según evidencia | `prepared` |
| Continuidad crítica | Como el anterior, `fuelContinuity = 75` | C-05 ausente; veto crítico | `vulnerable` |
| Acceso crítico | Combustible favorable, `operationalAccess = 24` | Puede existir C-01/C-03; C-02/C-04/C-05 ausentes | `vulnerable` |
| Defensa residual | Sin veto, `defensibility = 49` | C-05 y C-04 ausentes | `vulnerable` |
| Línea sin acceso local | Línea viable y dimensiones suficientes, sin `localAccessReady` | C-02 y C-04 ausentes; la rama conserva el cálculo de #34 | Según `inheritedState` |
| Poda aislada | Solo evidencia vertical, continuidad `49` | C-03 ausente | Según `inheritedState` |
| Estado inválido | Un decimal, valor fuera de rango o clave ausente | Ninguna; error explícito | Sin rama |

El primer caso usa el orden `fuelLoad, fuelContinuity, operationalAccess, defensibility, attackOpportunity`.

## 11. Exclusiones

Esta entrega no:

- convierte valores del juego en umbrales físicos;
- afirma validación científica o aprobación de un servicio de extinción;
- incorpora meteorología, topografía dinámica, medios disponibles, exposición o fatiga;
- define comunicación, evacuación o población vulnerable como causa de rama;
- garantiza que un tratamiento o una maniobra controle un incendio real;
- implementa código de producción, textos finales ni las partidas completas;
- sustituye el plan #10 ni las ejecuciones experta #99 y ciudadana #100.

## 12. Matriz de aceptación de #38

| Criterio | Evidencia | Estado |
|---|---|---|
| Solo combinaciones necesarias para ambas ramas | Cinco reglas C-01–C-05, sección 4 | Cumplido |
| Efecto distinto de una suma simple | Capacidad semántica derivada en cada regla | Cumplido |
| Umbrales concretos y comprobables | Predicados y fronteras, secciones 3, 5 y 10 | Cumplido |
| Restricciones críticas no compensables | Prioridad 10 y C-05 | Cumplido |
| Estado de validación por afirmación | Registro `PR-*`, `OP-*`, `SIM-*`, sección 6 | Cumplido |
| Revisión experta accionable | Paquete y puerta de publicación, sección 8 | Cumplido |
| Sin centralidad de comunicación o evacuación | Exclusiones, sección 11 | Cumplido |
| Traducible a reglas puras | Contrato de referencia, sección 9 | Cumplido |

## 13. Entregas siguientes

- #10 define el método; #99 ejecutará la revisión de `OP-*` y #100 las pruebas ciudadanas como puertas editoriales y de publicación;
- #39 ordena las combinaciones y evidencias prioritarias en el informe causal final definido en [`vertical-beta-1-causal-report.md`](vertical-beta-1-causal-report.md);
- #45–#47 convertirán los perfiles y fronteras en recorridos reproducibles;
- #72 podrá implementar las reglas puras sin duplicar el selector de rama.
