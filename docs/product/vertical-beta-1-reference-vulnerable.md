# Vertical Beta 1 — Partida de referencia Territorio vulnerable

- Fecha: 18 de agosto de 2026
- Issue: #46
- Issue padre: #19
- Contexto obligatorio: [`vertical-beta-1-reference-common.md`](vertical-beta-1-reference-common.md), `vb1-reference-context-v1`
- Contraste: [`vertical-beta-1-reference-prepared.md`](vertical-beta-1-reference-prepared.md), #45
- Entradas normativas: #23–#27 y #32–#39
- Estado contrastado: `main@56224b30fdf939bc33bae4f9bc202861eb707d8e`

## 1. Propósito

Este documento fija el guion canónico de la partida vulnerable. Demuestra que mejoras reales de combustible y continuidad no compensan la omisión de ambos tramos de acceso: el estado selecciona `vulnerable`, las decisiones razonables de crisis protegen a los equipos pero no reparan la preparación previa y la partida termina en `overwhelmed` dentro del contexto ficticio común.

`overwhelmed` no significa que toda la prevención haya sido inútil ni predice un incendio real. Expresa una restricción operativa crítica en este modelo de juego.

## 2. Resolución de la expectativa inicial

El texto inicial de #46 enumeraba carga elevada y continuidad acelerada como estado esperado. Las decisiones normativas posteriores #34, #37 y #39 aprobaron el perfil exacto `25,35,20,30,24`: carga y continuidad mejoran, mientras acceso, defensibilidad y oportunidad de ataque siguen siendo insuficientes.

Se adopta el perfil posterior porque:

- preserva la precedencia de las restricciones críticas aprobada en #34;
- demuestra que una dimensión favorable no compensa la ausencia de acceso y repliegue;
- coincide con la matriz causal y el informe final ya aprobados;
- evita inventar deltas o penalizar dos veces las omisiones para forzar carga alta;
- mantiene coherencia transversal para G4, G5, G6 y G7.

La vulnerabilidad de esta partida es operativa, no una afirmación de que todas las dimensiones deban ser desfavorables.

## 3. Invariantes de entrada

La partida consume sin modificaciones:

```text
referenceContextId = vb1-reference-context-v1
rulesetId = m1-reference-rules-v1
gameSessionSchemaVersion = 1
randomness = none
```

Municipio, condiciones observadas, meteorología narrativa, ignición, exposición, capacidad externa, briefing, presupuesto y primer aviso son exactamente los de #44. El avatar no forma parte del guion.

## 4. Recorrido, decisiones y duración

| Orden | Nodo | Decisión almacenada | Duración objetivo |
|---:|---|---|---:|
| 1 | `intro-briefing-mission` | Ninguna; solo confirma el inicio. | 1 min |
| 2 | `prevention-inspection-territory-fuel` | Tres actuaciones. | 4 min |
| 3 | `prevention-inspection-housing-interface` | Dos actuaciones. | 3 min |
| 4 | `transition-summary-prevention` | Ninguna; confirma el balance. | 2 min |
| 5 | `crisis-decision-first-alert` | `movilizar-y-verificar` | 2 min |
| 6 | `crisis-router-causal-map` | Ninguna; selección automática `vulnerable`. | 0 min |
| 7 | `crisis-decision-access-blockage` | `despejar-corredor-operativo` | 2 min |
| 8 | `crisis-decision-ravine-fire` | `asegurar-flancos-y-repliegue` | 3 min |
| 9 | `crisis-decision-crown-fire` | `replegar-ante-fuego-de-copas` | 2 min |
| 10 | `ending-result-causal-report` | Ninguna; presenta `overwhelmed`. | 3 min |

Total: **10 nodos, 9 decisiones registradas y 22 minutos estimados**, igual que la partida preparada. La duración no se guarda en `GameSession` ni modifica el resultado.

## 5. Prevención elegida

Todas las actuaciones seleccionadas tienen resultado `completed`. La evaluación profesional devuelve el resultado explícito `professional-line-feasible`.

| Secuencia | Actuación | Estado | Impacto | Evidencia o condición persistente |
|---:|---|---|---|---|
| 1 | `gestionar-restos-poda` | Seleccionada y completada | `fuelLoad -20` | `pruning-residues-removed-or-processed` |
| — | `crear-discontinuidades-vegetales` | Disponible, no seleccionada | Sin delta | `territorial-vegetation-continuity-present` permanece |
| — | `limpiar-margenes-caminos` | Disponible, no seleccionada | Sin delta | `rural-road-margins-obstructed` permanece |
| 2 | `activar-pastoreo-preventivo` | Seleccionada y completada | `fuelLoad -20`; `fuelContinuity -10` | `preventive-grazing-completed-in-priority-strips` |
| 3 | `evaluar-quema-tecnica` | Seleccionada y completada | Sin delta; modificador estratégico `+10` | `professional-line-assessed`; `professional-line-feasible` |
| 4 | `podar-ramas-y-retirar-seco` | Seleccionada y completada | `fuelContinuity -20`; `fuelLoad -10` | `vertical-fuel-continuity-reduced` |
| 5 | `separar-copas` | Seleccionada y completada | `fuelContinuity -20`; `defensibility +10` | `crown-fuel-continuity-reduced` |
| — | `despejar-accesos` | Disponible, no seleccionada | Sin delta | `fire-engine-access-obstructed` permanece |

La selección trata combustible fino y continuidad local y obtiene una evaluación estratégica, pero omite deliberadamente la discontinuidad territorial y los dos únicos trabajos que recuperan el acceso. Una línea viable sobre el papel no se convierte en una posición utilizable sin aproximación, maniobra y repliegue.

## 6. Cálculo de `inheritedState`

### 6.1 Dimensiones directas

| Dimensión | Estado base | Deltas completados | Resultado |
|---|---:|---|---:|
| `fuelLoad` | `75` | `-20` restos, `-20` pastoreo, `-10` poda | `25` |
| `fuelContinuity` | `85` | `-10` pastoreo, `-20` poda, `-20` copas | `35` |
| `operationalAccess` | `20` | Ninguno | `20` |
| `defensibility` | `20` | `+10` separación de copas | `30` |

Todos los factores son `completed = 1.0`; no hay penalización numérica adicional por omitir accesos.

### 6.2 Oportunidad de ataque antes de límites

```text
fuelControl = 100 - 25 = 75
continuityControl = 100 - 35 = 65
usableDefensibility = min(30, 20) = 20
strategicModifier = 10

rawAttackOpportunity = round(
  75 × 0.20 +
  65 × 0.30 +
  20 × 0.25 +
  20 × 0.25 +
  10
) = round(54.5) = 55
```

La cadena de acceso está completamente ausente:

```text
territorialAccessReady = false // falta rural-road-margins-cleared
localAccessReady = false       // falta fire-engine-access-cleared
```

Se aplica el límite de acceso crítico:

```text
operationalAccess = 20 <= 24
ningún tramo de acceso disponible
attackOpportunity = min(55, 24) = 24
```

El estado final es:

```text
InheritedState = {
  fuelLoad: 25,
  fuelContinuity: 35,
  operationalAccess: 20,
  defensibility: 30,
  attackOpportunity: 24
}
```

## 7. Prueba de selección de rama

Existen restricciones críticas suficientes por sí solas:

- `operationalAccess = 20 <= 24`;
- no está disponible ningún tramo de acceso;
- `attackOpportunity = 24 <= 24` tras aplicar el límite.

El router no evalúa la envolvente preparada después de detectar el veto. Registra una sola vez:

```text
crisisBranch = vulnerable
nextSceneId = crisis-decision-access-blockage
branchReasonIds = operational-access-critical,
                  access-chain-unavailable,
                  attack-opportunity-critical
```

La evidencia `professional-line-feasible` no elimina ninguna de estas restricciones.

## 8. Capacidades y limitaciones observables

| Dimensión | Categoría | Mejora real | Restricción durante la crisis |
|---|---|---|---|
| `fuelLoad = 25` | Moderada | Menos energía disponible que en el estado base. | No crea entrada, maniobra o repliegue. |
| `fuelContinuity = 35` | Discontinua | C-03 amortigua continuidad vertical y de copas. | Falta la discontinuidad territorial y no hay posición anclada accesible. |
| `operationalAccess = 20` | Bloqueado | Ninguna. | Maquinaria, aproximación y repliegue no están disponibles con seguridad. |
| `defensibility = 30` | Débil | Separar copas mejora parcialmente la posición. | `usableDefensibility = 20`; la defensa no puede sostenerse. |
| `attackOpportunity = 24` | Inexistente | La línea evaluada eleva el valor bruto. | El límite de acceso impide convertirla en ataque operable. |

Combinaciones activas:

- C-01 `fuelBehaviorBuffer`;
- C-03 `crownTransitionBuffer`.

Combinaciones ausentes:

- C-02, porque la línea evaluada carece de acceso territorial y local;
- C-04, porque acceso y defensibilidad no alcanzan el mínimo;
- C-05, porque existen restricciones críticas.

## 9. Opciones por escena

Los estados `available`, `selected` y `blocked` son expectativas del guion para #47 y M2. Solo las opciones seleccionadas se almacenan en `GameSession`.

### `intro-briefing-mission`

- disponible y confirmada: comenzar la misión con `vb1-reference-context-v1`;
- bloqueadas: ninguna;
- efecto causal: ninguno.

### `prevention-inspection-territory-fuel`

- disponibles y seleccionadas: `gestionar-restos-poda`, `activar-pastoreo-preventivo`, `evaluar-quema-tecnica`;
- disponibles y no seleccionadas: `crear-discontinuidades-vegetales`, `limpiar-margenes-caminos`;
- bloqueadas: ninguna; el límite de tres elecciones cierra la inspección.

### `prevention-inspection-housing-interface`

- disponibles y seleccionadas: `podar-ramas-y-retirar-seco`, `separar-copas`;
- disponible y no seleccionada: `despejar-accesos`;
- bloqueadas: ninguna; el límite de dos elecciones cierra la inspección.

### `transition-summary-prevention`

- disponible y confirmada: continuar con el estado `25,35,20,30,24`;
- bloqueada: cualquier edición manual del estado o elección de rama;
- efecto: muestra mejoras de combustible junto con los tres vetos de acceso y oportunidad.

### `crisis-decision-first-alert`

- seleccionada: `movilizar-y-verificar`, igual que en #45;
- disponibles y no seleccionadas: `esperar-confirmacion-total`, `comunicar-lo-confirmado`, `evacuar-todos-los-nucleos`;
- bloqueadas por `inheritedState`: ninguna;
- efecto: responde correctamente al aviso, pero no modifica el estado ni repara los accesos.

### `crisis-router-causal-map`

- salida automática disponible: `crisis-decision-access-blockage`;
- salida bloqueada por la rama: `crisis-decision-emergency-fuel-break`;
- no existe opción manual ni recálculo posterior.

### `crisis-decision-access-blockage`

- seleccionada: `despejar-corredor-operativo`;
- disponible y no seleccionada: `cerrar-acceso-y-reorganizar-medios`;
- bloqueadas: `introducir-maquinaria-sin-repliegue` y `usar-linea-profesional-sin-acceso`;
- consecuencia: la respuesta abre o protege un corredor temporal limitado, pero no sustituye el mantenimiento preventivo de ambos tramos y no modifica `inheritedState`.

### `crisis-decision-ravine-fire`

- seleccionada: `asegurar-flancos-y-repliegue`, el mismo `actionId` de #45;
- disponible desde posición exterior: `vigilancia-y-proteccion-indirecta`;
- bloqueadas: `mantener-ataque-anclado` y `ataque-directo-sin-anclaje`;
- consecuencia: la intención razonable protege flancos y retirada, pero sin acceso ni posición sostenible no conserva el ataque. El mismo nodo produce repliegue y progresión hacia copas.

### `crisis-decision-crown-fire`

- seleccionada: `replegar-ante-fuego-de-copas`;
- disponible y no seleccionada: `ataque-indirecto-y-vigilancia`;
- bloqueadas: `sostener-ataque-directo` y `defender-posicion-sin-salida`;
- consecuencia: el repliegue protege a los equipos; la propagación supera la capacidad disponible sin convertir una decisión segura en causa del desenlace.

### `ending-result-causal-report`

- variante disponible: `overwhelmed`;
- variante bloqueada por la rama: `contained`;
- no tiene decisiones ni sucesor.

## 10. Secuencia de decisiones para el fixture

```text
1  prevention-inspection-territory-fuel    gestionar-restos-poda
2  prevention-inspection-territory-fuel    activar-pastoreo-preventivo
3  prevention-inspection-territory-fuel    evaluar-quema-tecnica
4  prevention-inspection-housing-interface podar-ramas-y-retirar-seco
5  prevention-inspection-housing-interface separar-copas
6  crisis-decision-first-alert              movilizar-y-verificar
7  crisis-decision-access-blockage          despejar-corredor-operativo
8  crisis-decision-ravine-fire              asegurar-flancos-y-repliegue
9  crisis-decision-crown-fire               replegar-ante-fuego-de-copas
```

#47 debe convertir esta secuencia en historial contiguo, sin añadir decisiones para briefing, resumen, router o resultado.

## 11. Explicación causal de `overwhelmed`

El informe final presenta cinco relaciones, en este orden:

1. **La reducción de carga sí ayudó.** `gestionar-restos-poda` y `activar-pastoreo-preventivo` redujeron combustible; la intensidad tuvo menos energía que en el estado base. Esta mejora debe conservarse aunque no compense el acceso.
2. **La continuidad local bajó.** `podar-ramas-y-retirar-seco` y `separar-copas` activaron C-03, pero la discontinuidad territorial omitida dejó sin un anclaje accesible suficiente en el barranco.
3. **El acceso fue la restricción crítica.** Omitir `limpiar-margenes-caminos` y `despejar-accesos` conservó ambos obstáculos. Maquinaria, maniobra y repliegue no estuvieron disponibles con seguridad.
4. **La posición no pudo sostenerse.** La mejora parcial de `defensibility` quedó limitada por `usableDefensibility = 20`; `asegurar-flancos-y-repliegue` protegió la retirada, pero no pudo mantener el ataque.
5. **La línea evaluada no fue operable.** `professional-line-feasible` elevó la oportunidad bruta a `55`, pero el veto de acceso la limitó a `24`. El repliegue ante el fuego de copas fue una respuesta segura; no causó `overwhelmed`.

Salida esperada:

```text
crisisBranch = vulnerable
extinctionCapacityState = outside-capacity
result.variant = overwhelmed
```

El cierre educativo indica que el resultado pertenece a esta partida ficticia, reconoce las mejoras reales y prioriza recuperar ambos accesos como alternativa preventiva.

## 12. Contraste mínimo con la partida preparada

Esta tabla verifica coherencia de #46 sin sustituir la comparación exhaustiva de #47:

| Campo | Preparada #45 | Vulnerable #46 |
|---|---:|---:|
| `fuelLoad` | `45` | `25` |
| `fuelContinuity` | `25` | `35` |
| `operationalAccess` | `80` | `20` |
| `defensibility` | `50` | `30` |
| `attackOpportunity` | `66` | `24` |
| Rama | `prepared` | `vulnerable` |
| Resultado | `contained` | `overwhelmed` |

Las cinco dimensiones difieren. Contexto, primer aviso, presupuesto, duración y decisión del barranco permanecen iguales; las diferencias proceden de tres elecciones preventivas distintas y sus condiciones persistentes.

## 13. Evidencia mínima esperada

La sesión y el harness de #47 deben poder reconstruir:

- evidencias favorables de las cinco actuaciones seleccionadas, incluida `professional-line-feasible`;
- las tres condiciones persistentes de la sección 5;
- `territorialAccessReady` y `localAccessReady` falsos;
- C-01 y C-03 activas; C-02, C-04 y C-05 ausentes;
- los tres motivos críticos de la sección 7;
- selección única de `vulnerable`;
- recorrido exacto de diez nodos;
- las cuatro decisiones operativas de las secciones 9–10;
- resultado único `overwhelmed` y las cinco relaciones del informe.

Las opciones bloqueadas no se añaden a `GameSession.decisions`; se comprueban como expectativas de disponibilidad derivadas del catálogo y el estado.

## 14. Matriz de aceptación de #46

| Criterio | Evidencia | Estado |
|---|---|---|
| Secuencia exacta del catálogo | Tabla de recorrido y secuencia del fixture, secciones 4 y 10 | Cumplido |
| Estado vulnerable por decisiones u omisiones | Selección, cálculo y prueba de rama, secciones 5–7 | Cumplido |
| Decisiones razonables no eliminan desventajas | Primer aviso, corredor, barranco y repliegue, secciones 9 y 11 | Cumplido |
| Limitaciones en al menos tres dimensiones | Acceso, defensibilidad y oportunidad críticas, sección 8 | Cumplido |
| Barranco compartido sin duplicación | Mismo ID y `actionId`, distinta proyección, secciones 9 y 12 | Cumplido |
| Informe que explica `overwhelmed` | Cinco relaciones trazables, sección 11 | Cumplido |

## 15. Exclusiones

Esta entrega no crea todavía el JSON canónico de #47, no altera el perfil aprobado para satisfacer la expectativa preliminar de carga alta, no implementa opciones en el motor y no presenta los umbrales como validación científica.

## 16. Entregas siguientes

- #47 materializa `reference-overwhelmed.json` y compara las dos sesiones y su contexto en [`vertical-beta-1-reference-comparison.md`](vertical-beta-1-reference-comparison.md);
- #43 evaluará esta entrega como `EV-12-REFERENCE-VULNERABLE`.
