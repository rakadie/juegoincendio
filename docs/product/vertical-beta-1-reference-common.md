# Vertical Beta 1 — Escenario base común de referencia

- Fecha: 17 de agosto de 2026
- Issue: #44
- Issue padre: #19
- Entradas normativas: #23–#27, #29–#39 y [`m2-definition-of-ready.md`](../project/m2-definition-of-ready.md)
- Estado contrastado: `main@6d85017b5234bbe9e54dddf0c84bd0a32147faa2`

## 1. Propósito

Este documento fija la envolvente común de las partidas preparada y vulnerable. Su función es controlar todas las variables externas para que la diferencia entre ambas proceda exclusivamente de actuaciones preventivas registradas y del `inheritedState` resultante.

El escenario es ficticio y no representa un municipio, incendio o umbral operativo real. Los valores y categorías son parámetros reproducibles del juego.

## 2. Identidad y versionado

| Campo | Valor común | Regla |
|---|---|---|
| `referenceContextId` | `vb1-reference-context-v1` | Ambas partidas deben referenciar exactamente este ID. |
| `municipalityProfileId` | `fictional-ravine-interface-municipality-v1` | No se sustituye por un municipio o mapa real. |
| `weatherProfileId` | `dry-windy-daylight-v1` | Permanece inmutable durante las dos partidas. |
| `ignitionProfileId` | `lower-ravine-rural-track-v1` | Mismo punto, hora y observación inicial. |
| `rulesetId` | `m1-reference-rules-v1` | Reglas aprobadas en #24–#27 y #32–#39. |
| `gameSessionSchemaVersion` | `1` | Contrato exacto de #29–#31. |
| Aleatoriedad | Ninguna | No hay semilla, tiradas ni eventos dinámicos. |

Una modificación de cualquiera de estos valores crea una nueva versión del contexto y obliga a revalidar ambas partidas. No se actualiza silenciosamente `v1`.

## 3. Municipio y territorio controlados

El municipio ficticio tiene exactamente los elementos necesarios para el recorrido oficial:

- interfaz urbano-forestal con viviendas dispersas y un pequeño núcleo defendible;
- un barranco que conecta el punto de ignición con la interfaz;
- una pista y caminos rurales que forman el tramo territorial de acceso;
- accesos locales que permiten o impiden entrada, maniobra y repliegue de autobombas;
- franjas de combustible fino, vegetación continua y copas próximas;
- una zona estratégica donde una línea solo es utilizable si ha sido evaluada y la cadena de acceso es operable.

No hay coordenadas, cartografía ni topónimos reales. La topografía no cambia entre partidas y no se calcula como una sexta dimensión causal.

## 4. Condiciones observadas al comenzar

Las ocho condiciones de #33 están presentes en las dos inspecciones antes de decidir. Son el origen común de los valores base; una omisión conserva la condición y no añade una segunda penalización.

| Inspección | Condición observada | Actuación disponible |
|---|---|---|
| Territorio | `pruning-residues-accumulated` | `gestionar-restos-poda` |
| Territorio | `territorial-vegetation-continuity-present` | `crear-discontinuidades-vegetales` |
| Territorio | `rural-road-margins-obstructed` | `limpiar-margenes-caminos` |
| Territorio | `fine-fuel-accumulated-in-priority-strips` | `activar-pastoreo-preventivo` |
| Territorio | `strategic-area-without-assessed-line` | `evaluar-quema-tecnica` |
| Viviendas | `vertical-fuel-ladder-present` | `podar-ramas-y-retirar-seco` |
| Viviendas | `crown-fuel-continuity-present` | `separar-copas` |
| Viviendas | `fire-engine-access-obstructed` | `despejar-accesos` |

Las cinco opciones territoriales y las tres de vivienda están disponibles en ambas partidas. Cada guion debe elegir exactamente tres y dos, respectivamente.

## 5. Estado preventivo inicial

Antes de aplicar actuaciones efectivas, ambas partidas parten de los valores aprobados en #34:

```text
fuelLoad: 75
fuelContinuity: 85
operationalAccess: 20
defensibility: 20
attackOpportunity: derivada después de las inspecciones
```

`attackOpportunity` no recibe un valor inicial ni un delta directo. Se calcula con la fórmula, las evidencias y las restricciones críticas de #34 después de agregar las cuatro dimensiones directas.

La igualdad exigida en #47 se aplica al estado base, no al `inheritedState` final: este último debe diferir porque conserva los efectos de la prevención elegida.

## 6. Contexto externo fijo

| Variable | Valor común | Tratamiento |
|---|---|---|
| Momento del aviso | `13:42`, horario narrativo local | No se usa como temporizador ni cambia durante la sesión. |
| Luz | Diurna | No existe transición a noche. |
| Precipitación | Ausente | No se genera lluvia durante ninguna partida. |
| Temperatura narrativa | Cálida | No se traduce a puntos ni umbrales físicos. |
| Humedad narrativa | Baja | No modifica por separado el router. |
| Viento | Rachas irregulares desde la parte baja del barranco hacia la interfaz | Dirección y patrón iguales; no hay cambio de viento aleatorio. |
| Punto de ignición | Borde de una pista rural en la parte baja del barranco | Mismo foco y distancia narrativa a viviendas. |
| Causa | Sin confirmar | No se convierte en decisión ni variable causal. |
| Observación inicial | Columna de humo y llamas incipientes próximas a combustible vegetal | Es el mismo primer aviso. |
| Capacidad externa | Respuesta estándar disponible, sin refuerzos o averías diferenciales | La dotación externa no compensa ni agrava una partida. |
| Exposición | Mismas viviendas y posiciones amenazadas | No cambia población, daños previos ni objetivos. |

Estas variables describen el incidente compartido. No forman parte de `inheritedState`, no seleccionan la rama y no crean eventos adicionales en `GameSession`.

## 7. Briefing y objetivo comunes

En `intro-briefing-mission`, la persona jugadora asume el mismo rol: responsable municipal de emergencias de un territorio ficticio con interfaz urbano-forestal.

El objetivo común es priorizar prevención limitada, observar el balance resultante y gestionar el mismo incendio sin perder la relación causal entre decisiones previas, restricciones durante la crisis y resultado final.

El briefing debe comunicar las mismas reglas en ambas partidas:

1. seleccionar tres actuaciones territoriales entre cinco;
2. seleccionar dos actuaciones de vivienda entre tres;
3. completar el trabajo para obtener el efecto; seleccionar no equivale a ejecutar;
4. conservar las cinco dimensiones separadas;
5. responder a la crisis con las opciones que permita el estado heredado.

El avatar es una preferencia opcional externa al grafo. No aparece en el contexto de referencia, `GameSession`, los fixtures ni la comparación.

## 8. Tronco común y decisiones compartidas

Las dos partidas recorren, en este orden, los seis nodos comunes:

```text
intro-briefing-mission
→ prevention-inspection-territory-fuel
→ prevention-inspection-housing-interface
→ transition-summary-prevention
→ crisis-decision-first-alert
→ crisis-router-causal-map
```

Reglas de comparación:

- briefing, orden de inspecciones y reglas de cálculo son idénticos;
- `transition-summary-prevention` muestra valores distintos, pero usa el mismo formato y la misma operación;
- ambas partidas eligen `movilizar-y-verificar` en `crisis-decision-first-alert`;
- el primer aviso no modifica `inheritedState` ni vuelve a clasificar la prevención;
- `crisis-router-causal-map` no contiene una decisión del jugador y usa el mismo selector puro;
- en `crisis-decision-ravine-fire`, #46 reutiliza el mismo `actionId` elegido por #45 cuando esa opción sea segura y esté disponible;
- si la rama vulnerable bloquea esa opción, #46 debe registrar el `actionId` bloqueado y la evidencia de la restricción que lo hace inseguro antes de seleccionar la alternativa razonable más próxima; no puede inventar una decisión irracional para forzar `overwhelmed`.

## 9. Presupuesto temporal y conteos

El presupuesto se expresa mediante decisiones y nodos, no mediante una cuenta atrás:

| Concepto | Valor por partida |
|---|---:|
| Decisiones territoriales | `3` |
| Decisiones de vivienda | `2` |
| Decisión de primer aviso | `1` |
| Decisiones de crisis después del router | `3` |
| Total de decisiones registradas | `9` |
| Nodos visitados, incluido resultado | `10` |
| Duración objetivo de producto | `20–25 min` |

La duración es una estimación de experiencia y queda fuera del fixture. No se admiten diferencias de turnos, tiempo disponible, retrasos artificiales o límites de selección entre las dos partidas.

## 10. Reproducción determinista

Una reproducción válida debe fijar como entradas:

```text
referenceContextId = vb1-reference-context-v1
rulesetId = m1-reference-rules-v1
gameSessionSchemaVersion = 1
randomness = none
territorySelectionLimit = 3
housingSelectionLimit = 2
firstAlertActionId = movilizar-y-verificar
```

Y debe cumplir:

1. las ocho condiciones iniciales y los cuatro valores base coinciden;
2. contexto externo, briefing, orden, catálogo, fórmula y umbrales coinciden;
3. solo cambian las cinco actuaciones preventivas elegidas, sus resultados/evidencias y las consecuencias derivadas;
4. las diferencias de escena después del router proceden de `crisisBranch` y no de otra entrada;
5. la misma entrada produce siempre el mismo historial, ruta y resultado;
6. no se consulta reloj, locale, avatar, red, DOM, azar o estado heredado de otra campaña.

`GameSession` conserva su forma exacta de #29. El contexto no se añade como clave nueva al snapshot. #47 debe almacenarlo como manifest de fixture o configuración del harness y comprobar que ambas sesiones consumen la misma referencia.

## 11. Variables excluidas de la comparación

- avatar, preferencias visuales y locale;
- municipio, coordenadas o datos meteorológicos reales;
- preparación familiar, confianza, canales y recursos económicos;
- comunicación y evacuación como causas de rama;
- cambios de viento, refuerzos, averías, fatiga o eventos aleatorios;
- tiempo real empleado por la persona jugadora;
- contenido de biblioteca, archivo o campaña heredada.

Comunicación, evacuación y daños solo pueden aparecer después como consecuencias narrativas derivadas y deben ser coherentes con el mismo contexto externo.

## 12. Matriz de aceptación de #44

| Criterio | Evidencia | Estado |
|---|---|---|
| Ambas partidas parten del mismo estado externo | Identidad, territorio y contexto, secciones 2–6 | Cumplido |
| Las condiciones de crisis son equivalentes | Perfil meteorológico, ignición, exposición y capacidad fijos, sección 6 | Cumplido |
| El avatar no aparece como variable | Exclusión explícita, secciones 7 y 11 | Cumplido |
| Se identifican todas las variables controladas | Tablas y contrato de reproducción, secciones 2–10 | Cumplido |
| Solo cambian decisiones preventivas documentadas | Reglas comparativas, secciones 8 y 10 | Cumplido |
| El escenario es reproducible | IDs versionados, ausencia de azar y seis invariantes, secciones 2 y 10 | Cumplido |

## 13. Entregas siguientes

- #45 fija las cinco actuaciones y el guion preparado en [`vertical-beta-1-reference-prepared.md`](vertical-beta-1-reference-prepared.md);
- #46 fija la partida vulnerable sin modificar ninguna variable común en [`vertical-beta-1-reference-vulnerable.md`](vertical-beta-1-reference-vulnerable.md);
- #47 almacena el manifest, las dos sesiones y la comparación campo a campo en [`vertical-beta-1-reference-comparison.md`](vertical-beta-1-reference-comparison.md);
- #43 evaluará esta entrega como `EV-10-REFERENCE-BASE` junto con `EV-11..EV-15`.
