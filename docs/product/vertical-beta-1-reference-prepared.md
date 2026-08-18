# Vertical Beta 1 — Partida de referencia Municipio preparado

- Fecha: 18 de agosto de 2026
- Issue: #45
- Issue padre: #19
- Contexto obligatorio: [`vertical-beta-1-reference-common.md`](vertical-beta-1-reference-common.md), `vb1-reference-context-v1`
- Entradas normativas: #23–#27 y #32–#39
- Estado contrastado: `main@dd00d82fd1749cb35c82f25c0170430e1c61f378`

## 1. Propósito

Este documento fija el guion canónico de la partida preparada. Demuestra que cinco actuaciones preventivas efectivas producen un estado `prepared` reproducible, conservan decisiones significativas durante la crisis y terminan en `contained` dentro del contexto ficticio de referencia.

`prepared` no significa prevención perfecta y `contained` no garantiza el control de un incendio real. La partida conserva combustible, una defensibilidad mínima y omisiones preventivas visibles.

## 2. Invariantes de entrada

La partida consume sin modificaciones:

```text
referenceContextId = vb1-reference-context-v1
rulesetId = m1-reference-rules-v1
gameSessionSchemaVersion = 1
randomness = none
```

Municipio, condiciones observadas, meteorología narrativa, ignición, exposición, capacidad externa, briefing, presupuesto y primer aviso son exactamente los de #44. El avatar no forma parte del guion.

## 3. Recorrido, decisiones y duración

| Orden | Nodo | Decisión almacenada | Duración objetivo |
|---:|---|---|---:|
| 1 | `intro-briefing-mission` | Ninguna; solo confirma el inicio. | 1 min |
| 2 | `prevention-inspection-territory-fuel` | Tres actuaciones. | 4 min |
| 3 | `prevention-inspection-housing-interface` | Dos actuaciones. | 3 min |
| 4 | `transition-summary-prevention` | Ninguna; confirma el balance. | 2 min |
| 5 | `crisis-decision-first-alert` | `movilizar-y-verificar` | 2 min |
| 6 | `crisis-router-causal-map` | Ninguna; selección automática `prepared`. | 0 min |
| 7 | `crisis-decision-emergency-fuel-break` | `autorizar-maniobra-condicionada` | 2 min |
| 8 | `crisis-decision-ravine-fire` | `asegurar-flancos-y-repliegue` | 3 min |
| 9 | `crisis-decision-housing-defense` | `defender-desde-posicion-segura` | 2 min |
| 10 | `ending-result-causal-report` | Ninguna; presenta `contained`. | 3 min |

Total: **10 nodos, 9 decisiones registradas y 22 minutos estimados**, dentro del objetivo común de 20–25 minutos. La duración no se guarda en `GameSession` ni modifica las reglas.

## 4. Prevención elegida

Todas las actuaciones seleccionadas tienen resultado `completed`. Poda, desbroce y retirada incluyen la gestión de la biomasa generada.

| Secuencia | Actuación | Estado | Impacto | Evidencia o condición persistente |
|---:|---|---|---|---|
| 1 | `gestionar-restos-poda` | Seleccionada y completada | `fuelLoad -20` | `pruning-residues-removed-or-processed` |
| 2 | `crear-discontinuidades-vegetales` | Seleccionada y completada | `fuelContinuity -30`; `defensibility +10` | `strategic-vegetation-discontinuity-created` |
| 3 | `limpiar-margenes-caminos` | Seleccionada y completada | `operationalAccess +30`; `fuelContinuity -10` | `rural-road-margins-cleared` |
| — | `activar-pastoreo-preventivo` | Disponible, no seleccionada | Sin delta | `fine-fuel-accumulated-in-priority-strips` permanece |
| — | `evaluar-quema-tecnica` | Disponible, no seleccionada | Sin modificador estratégico | `strategic-area-without-assessed-line` permanece |
| 4 | `podar-ramas-y-retirar-seco` | Seleccionada y completada | `fuelContinuity -20`; `fuelLoad -10` | `vertical-fuel-continuity-reduced` |
| — | `separar-copas` | Disponible, no seleccionada | Sin delta | `crown-fuel-continuity-present` permanece |
| 5 | `despejar-accesos` | Seleccionada y completada | `operationalAccess +30`; `defensibility +20` | `fire-engine-access-cleared` |

La selección prioriza reducir carga y continuidad, completar ambos tramos de acceso y alcanzar defensibilidad utilizable. Renuncia deliberadamente a pastoreo, evaluación profesional y separación de copas por el límite común de tres más dos actuaciones.

## 5. Cálculo de `inheritedState`

### 5.1 Dimensiones directas

| Dimensión | Estado base | Deltas completados | Resultado |
|---|---:|---|---:|
| `fuelLoad` | `75` | `-20` restos, `-10` poda | `45` |
| `fuelContinuity` | `85` | `-30` discontinuidad, `-10` márgenes, `-20` poda | `25` |
| `operationalAccess` | `20` | `+30` márgenes, `+30` acceso local | `80` |
| `defensibility` | `20` | `+10` discontinuidad, `+20` acceso local | `50` |

Todos los factores son `completed = 1.0`; no hay redondeo intermedio ni `clamp` activo.

### 5.2 Oportunidad de ataque

```text
fuelControl = 100 - 45 = 55
continuityControl = 100 - 25 = 75
usableDefensibility = min(50, 80) = 50
strategicModifier = 0

rawAttackOpportunity = round(
  55 × 0.20 +
  75 × 0.30 +
  80 × 0.25 +
  50 × 0.25
) = round(66) = 66
```

Los dos tramos de acceso están disponibles:

```text
territorialAccessReady = true  // rural-road-margins-cleared
localAccessReady = true        // fire-engine-access-cleared
```

No se aplica ningún límite crítico. El estado final es:

```text
InheritedState = {
  fuelLoad: 45,
  fuelContinuity: 25,
  operationalAccess: 80,
  defensibility: 50,
  attackOpportunity: 66
}
```

## 6. Prueba de selección de rama

No existe restricción crítica:

- `operationalAccess = 80 > 24` y ambos tramos están disponibles;
- `fuelContinuity = 25 < 75`;
- `defensibility = 50 > 24`;
- `attackOpportunity = 66 > 24`;
- no se cumple `fuelLoad >= 75 AND fuelContinuity >= 50`.

Se cumplen simultáneamente los cinco mínimos de preparación:

```text
fuelLoad <= 74                 // 45
fuelContinuity <= 49           // 25
operationalAccess >= 50        // 80
defensibility >= 50            // 50
attackOpportunity >= 50        // 66
```

Por tanto, `crisis-router-causal-map` registra una sola vez:

```text
crisisBranch = prepared
nextSceneId = crisis-decision-emergency-fuel-break
```

## 7. Capacidades y limitaciones observables

| Dimensión | Categoría | Ventaja durante la crisis | Límite conservado |
|---|---|---|---|
| `fuelLoad = 45` | Moderada | Intensidad manejable y más margen temporal. | El pastoreo omitido deja combustible fino; el fuego no es leve. |
| `fuelContinuity = 25` | Discontinua | Propagación condicionada y puntos de anclaje. | La separación de copas omitida impide derivar C-03. |
| `operationalAccess = 80` | Robusto | Aproximación, maquinaria, maniobra y repliegue disponibles. | El acceso no elimina la presión del frente. |
| `defensibility = 50` | Viable | Permite una defensa selectiva y sostenible. | Está justo en el mínimo; no habilita una defensa total. |
| `attackOpportunity = 66` | Viable | Existe una maniobra condicionada desde posición segura. | No es favorable `75..100` y no existe línea profesional evaluada. |

Combinaciones activas:

- C-01 `fuelBehaviorBuffer`;
- C-04 `housingDefenseOperable`;
- C-05 `safeAttackEnvelope`.

Combinaciones ausentes:

- C-02, porque no existe `professional-line-feasible`;
- C-03, porque `crown-fuel-continuity-reduced` está ausente.

## 8. Opciones por escena

Los estados `available`, `selected` y `blocked` son expectativas del guion para #47 y M2. Solo las opciones seleccionadas se almacenan en `GameSession`.

### `intro-briefing-mission`

- disponible y confirmada: comenzar la misión con `vb1-reference-context-v1`;
- bloqueadas: ninguna;
- efecto causal: ninguno.

### `prevention-inspection-territory-fuel`

- disponibles y seleccionadas: `gestionar-restos-poda`, `crear-discontinuidades-vegetales`, `limpiar-margenes-caminos`;
- disponibles y no seleccionadas: `activar-pastoreo-preventivo`, `evaluar-quema-tecnica`;
- bloqueadas: ninguna; el límite de tres elecciones cierra la inspección.

### `prevention-inspection-housing-interface`

- disponibles y seleccionadas: `podar-ramas-y-retirar-seco`, `despejar-accesos`;
- disponible y no seleccionada: `separar-copas`;
- bloqueadas: ninguna; el límite de dos elecciones cierra la inspección.

### `transition-summary-prevention`

- disponible y confirmada: continuar con el estado `45,25,80,50,66`;
- bloqueada: cualquier edición manual del estado o elección de rama;
- efecto: presenta categorías, evidencias favorables y tres condiciones persistentes.

### `crisis-decision-first-alert`

- seleccionada: `movilizar-y-verificar`;
- disponibles y no seleccionadas: `esperar-confirmacion-total`, `comunicar-lo-confirmado`, `evacuar-todos-los-nucleos`;
- bloqueadas por `inheritedState`: ninguna;
- efecto: aprovecha el margen inicial, pero no altera el estado ni causa `prepared`.

### `crisis-router-causal-map`

- salida automática disponible: `crisis-decision-emergency-fuel-break`;
- salida bloqueada por la rama: `crisis-decision-access-blockage`;
- no existe opción manual ni recálculo posterior.

### `crisis-decision-emergency-fuel-break`

- seleccionada: `autorizar-maniobra-condicionada`;
- disponible y no seleccionada: `mantener-evaluacion-sin-maniobra`;
- bloqueada: `usar-linea-profesional-no-evaluada`, porque C-02 está ausente;
- consecuencia: la envolvente C-05 permite trabajar una discontinuidad como maniobra de emergencia, con vigilancia y repliegue, sin presentarla como garantía.

### `crisis-decision-ravine-fire`

- seleccionada: `asegurar-flancos-y-repliegue`;
- disponible mientras se conserve el repliegue: `mantener-ataque-anclado`;
- bloqueada: `ataque-directo-sin-anclaje`;
- consecuencia: el mismo barranco de #46 sigue siendo exigente, pero la intensidad moderada, la continuidad discontinua y el acceso robusto permiten sostener posición y salida.

### `crisis-decision-housing-defense`

- seleccionada: `defender-desde-posicion-segura`;
- disponible y no seleccionada: `defensa-selectiva-con-prioridades`;
- bloqueada: `defensa-total-sin-repliegue`;
- consecuencia: C-04 habilita defensa operable, pero `defensibility = 50` obliga a priorizar y conservar la retirada.

### `ending-result-causal-report`

- variante disponible: `contained`;
- variante bloqueada por la rama: `overwhelmed`;
- no tiene decisiones ni sucesor.

## 9. Secuencia de decisiones para el fixture

```text
1  prevention-inspection-territory-fuel   gestionar-restos-poda
2  prevention-inspection-territory-fuel   crear-discontinuidades-vegetales
3  prevention-inspection-territory-fuel   limpiar-margenes-caminos
4  prevention-inspection-housing-interface podar-ramas-y-retirar-seco
5  prevention-inspection-housing-interface despejar-accesos
6  crisis-decision-first-alert             movilizar-y-verificar
7  crisis-decision-emergency-fuel-break    autorizar-maniobra-condicionada
8  crisis-decision-ravine-fire             asegurar-flancos-y-repliegue
9  crisis-decision-housing-defense         defender-desde-posicion-segura
```

#47 debe convertir esta secuencia en historial contiguo, sin añadir decisiones para briefing, resumen, router o resultado.

## 10. Explicación causal de `contained`

El informe final presenta cinco relaciones, en este orden:

1. **Carga moderada.** `gestionar-restos-poda` produjo `pruning-residues-removed-or-processed`, redujo `fuelLoad` y dejó más margen en el primer aviso y el barranco. El pastoreo omitido explica por qué aún queda combustible fino.
2. **Propagación condicionada.** `crear-discontinuidades-vegetales` y `podar-ramas-y-retirar-seco` redujeron continuidad territorial y vertical; la maniobra de emergencia y el barranco encontraron puntos de anclaje. Separar copas habría completado C-03.
3. **Cadena de acceso completa.** `limpiar-margenes-caminos` y `despejar-accesos` conservaron aproximación, maniobra y repliegue; por eso `asegurar-flancos-y-repliegue` fue utilizable.
4. **Defensa selectiva viable.** La discontinuidad, la poda y el acceso elevaron `defensibility` al mínimo operativo; `defender-desde-posicion-segura` pudo sostenerse sin convertir la escena en defensa total.
5. **Oportunidad conjunta.** C-05 reunió combustible, continuidad, acceso, defensibilidad y oportunidad sin vetos críticos. Las decisiones de crisis aprovecharon ese margen; no lo crearon.

Salida esperada:

```text
crisisBranch = prepared
extinctionCapacityState = within-capacity
result.variant = contained
```

El cierre educativo indica que el resultado pertenece a esta partida ficticia y que las mismas actuaciones no garantizan un desenlace real.

## 11. Evidencia mínima esperada

La sesión y el harness de #47 deben poder reconstruir:

- las cinco evidencias favorables de la sección 4;
- las tres condiciones persistentes por omisión;
- `territorialAccessReady` y `localAccessReady` verdaderos;
- C-01, C-04 y C-05 activas; C-02 y C-03 ausentes;
- ausencia de restricciones críticas;
- selección única de `prepared`;
- recorrido exacto de diez nodos;
- las cuatro decisiones operativas de las secciones 8–9;
- resultado único `contained` y las cinco relaciones del informe.

Las opciones bloqueadas no se añaden a `GameSession.decisions`; se comprueban como expectativas de disponibilidad derivadas del catálogo y el estado.

## 12. Matriz de aceptación de #45

| Criterio | Evidencia | Estado |
|---|---|---|
| Secuencia exacta del catálogo | Tabla de recorrido y secuencia del fixture, secciones 3 y 9 | Cumplido |
| Estado preparado verificable | Cálculo completo y prueba de rama, secciones 5–6 | Cumplido |
| Dificultad y decisiones significativas | Omisiones, límites y opciones bloqueadas, secciones 4, 7 y 8 | Cumplido |
| Ventajas en al menos tres dimensiones | Ventajas observables en las cinco dimensiones, sección 7 | Cumplido |
| Barranco compartido sin duplicación | Único ID, decisión y proyección preparada, sección 8 | Cumplido |
| Informe que explica `contained` | Cinco relaciones trazables, sección 10 | Cumplido |

## 13. Exclusiones

Esta entrega no crea todavía el JSON canónico de #47, no modifica el fixture provisional `completed-contained.json`, no implementa las opciones en el motor y no declara validación científica o experta de los umbrales.

## 14. Entregas siguientes

- #46 utiliza el mismo contexto y contrasta este guion en [`vertical-beta-1-reference-vulnerable.md`](vertical-beta-1-reference-vulnerable.md);
- #47 materializará `reference-contained.json`, validará esta secuencia y comparará ambas sesiones;
- #43 evaluará esta entrega como `EV-11-REFERENCE-PREPARED`.
