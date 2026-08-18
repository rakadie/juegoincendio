# Comparación y fixtures de las partidas de referencia

Estado: especificación ejecutable de M1 para #47.

Entradas: escenario común #44, partida preparada #45, partida vulnerable #46 y contrato `GameSession` #29–#31.

Consumidor siguiente: aceptación integral del flujo en #76.

## 1. Resultado

Las dos partidas canónicas usan un único contexto externo versionado y el mismo contrato `GameSession`, pero conservan decisiones preventivas distintas. Los fixtures reproducen dos historiales deterministas de 32 eventos, 10 nodos y 9 decisiones:

- `reference-contained.json`: rama `prepared`, resultado `contained`;
- `reference-overwhelmed.json`: rama `vulnerable`, resultado `overwhelmed`.

El contexto vive en `reference-context.json`; no se añade a `GameSession`. Esta separación mantiene sus nueve claves exactas y permite que el harness de #76 inyecte una sola referencia en ambas ejecuciones.

## 2. Artefactos canónicos

| Artefacto | Responsabilidad |
|---|---|
| `tests/fixtures/game-session/reference-context.json` | Contexto, reglas, ausencia de azar, límites y presupuesto de aceptación compartidos. |
| `tests/fixtures/game-session/reference-contained.json` | Snapshot e historial completos de Municipio preparado. |
| `tests/fixtures/game-session/reference-overwhelmed.json` | Snapshot e historial completos de Territorio vulnerable. |
| `tests/reference-game-sessions.test.ts` | Contrato, round-trip, contexto, IDs, recorridos, decisiones, dimensiones y resultados. |

`initial.json`, `prevention-completed.json`, `crisis-prepared.json` y `completed-contained.json` continúan como snapshots provisionales de forma y corrupción. No son parámetros causales normativos y no deben sustituir los dos fixtures de referencia.

## 3. Invariantes compartidas

| Campo | Valor único para ambas partidas |
|---|---|
| Contexto | `vb1-reference-context-v1` |
| Municipio | `fictional-ravine-interface-municipality-v1` |
| Meteorología | `dry-windy-daylight-v1`; 13:42, luz diurna, sin precipitación, cálido, humedad baja y rachas irregulares del barranco a la interfaz |
| Ignición | `lower-ravine-rural-track-v1`; borde de pista rural, causa sin confirmar |
| Capacidad externa | `standard-response-capacity-v1` |
| Exposición | `same-homes-and-positions-v1` |
| Reglas | `m1-reference-rules-v1`, `GameSession.schemaVersion = 1` |
| Azar | `none` |
| Límites preventivos | 3 elecciones territoriales y 2 de vivienda |
| Primer aviso | `movilizar-y-verificar` |
| Barranco | `asegurar-flancos-y-repliegue` |
| Presupuesto | 10 nodos, 9 decisiones, 22 minutos estimados; objetivo 20–25 |

No se incluyen avatar, rasgos sociales, variación de capacidad, comunicación ni evacuación como causas primarias. Comunicación y evacuación solo pueden aparecer después como consecuencias derivadas del estado y de las decisiones.

## 4. Comparación campo a campo

| Aspecto | Municipio preparado | Territorio vulnerable | Diferencia atribuible |
|---|---|---|---|
| Prevención territorial | restos, discontinuidades y márgenes | restos, pastoreo y evaluación técnica | Tres selecciones distintas; la segunda conserva continuidad territorial y obstáculos de acceso. |
| Prevención de vivienda | poda y accesos | poda y separación de copas | Una selección distinta; la segunda mejora copas, pero no el acceso local. |
| `fuelLoad` | `45`, moderada | `25`, moderada | Pastoreo reduce más la carga vulnerable; esa mejora se conserva en el informe. |
| `fuelContinuity` | `25`, discontinua | `35`, discontinua | Discontinuidad territorial frente a separación de copas. |
| `operationalAccess` | `80`, robusto | `20`, bloqueado | Márgenes y acceso local realizados frente a ambos omitidos. |
| `defensibility` | `50`, viable | `30`, débil; utilizable `20` | La mejora local vulnerable queda limitada por acceso. |
| `attackOpportunity` | `66`, viable | `24`, inexistente | La línea evaluada vulnerable no es operable sin cadena de acceso. |
| Combinaciones activas | C-01, C-04, C-05 | C-01, C-03 | Cambian tres de cinco combinaciones. |
| Rama | `prepared` | `vulnerable` | Vetos de acceso y oportunidad fuerzan la segunda. |
| Apertura de crisis | maniobra condicionada | corredor temporal limitado | Capacidad preventiva disponible frente a recuperación reactiva incompleta. |
| Barranco | posición sostenida con repliegue | posición no sostenible; repliegue | Mismo nodo y acción, efecto distinto por estado heredado. |
| Última escena de decisión | defensa selectiva de viviendas | repliegue ante fuego de copas | La capacidad preparada se mantiene; la vulnerable queda superada. |
| Resultado | `contained` | `overwhelmed` | Informes opuestos sin cambiar el contexto externo. |

Las cinco dimensiones difieren, por encima del mínimo de tres exigido por #47. Que `fuelLoad` sea menor en la partida vulnerable no contradice el resultado: muestra que una mejora aislada no reemplaza la cadena de acceso, la defensibilidad ni una oportunidad de ataque utilizable.

## 5. Opciones disponibles y bloqueadas

Los fixtures guardan solo decisiones seleccionadas. Las expectativas derivadas que deberá comprobar el motor de #76 son:

| Escena | Preparada | Vulnerable |
|---|---|---|
| Router | disponible `emergency-fuel-break`; bloqueada `access-blockage` | disponible `access-blockage`; bloqueada `emergency-fuel-break` |
| Apertura | seleccionada `autorizar-maniobra-condicionada`; bloqueada `usar-linea-profesional-no-evaluada` | seleccionada `despejar-corredor-operativo`; bloqueadas maquinaria sin repliegue y línea sin acceso |
| Barranco | disponible `mantener-ataque-anclado`; bloqueado ataque directo sin anclaje | disponible vigilancia indirecta; bloqueados ataque anclado y directo sin anclaje |
| Cierre de crisis | defensa selectiva disponible; defensa total sin repliegue bloqueada | ataque indirecto disponible; ataque directo y defensa sin salida bloqueados |
| Resultado | disponible `contained`; bloqueado `overwhelmed` | disponible `overwhelmed`; bloqueado `contained` |

Estas opciones no se serializan como estado paralelo. Se derivan del `inheritedState`, evidencias, rama y escena actual definidos por los fixtures.

## 6. Recorridos e IDs exactos

Tronco compartido:

```text
intro-briefing-mission
prevention-inspection-territory-fuel
prevention-inspection-housing-interface
transition-summary-prevention
crisis-decision-first-alert
crisis-router-causal-map
```

Final preparado:

```text
crisis-decision-emergency-fuel-break
crisis-decision-ravine-fire
crisis-decision-housing-defense
ending-result-causal-report
```

Final vulnerable:

```text
crisis-decision-access-blockage
crisis-decision-ravine-fire
crisis-decision-crown-fire
ending-result-causal-report
```

Cada historial contiene secuencias de evento `1..32` y de decisión `1..9`, sin huecos. Briefing, resumen, router y resultado no crean decisiones. El cálculo de estado se registra inmediatamente después de cerrar la segunda inspección y referencia exactamente las decisiones `1..5`.

## 7. Informe causal esperado

El resultado preparado conserva cinco relaciones: amortiguación del comportamiento, accesos territorial y local, envolvente segura de ataque, posición sostenible en el barranco y defensa selectiva de viviendas.

El resultado vulnerable conserva también las mejoras reales de carga y copas, y explica el desenlace mediante la cadena de acceso ausente, la posición no sostenible del barranco y el repliegue seguro ante fuego de copas. Una decisión segura de repliegue nunca se presenta como causa de `overwhelmed`.

Los `evidenceIds` finales de cada fixture son distintos, aparecen tanto en `scene-completed` del resultado como en `session-completed`, y permiten reconstruir el informe sin puntuaciones visibles ni causalidad social.

## 8. Uso directo por #76

El test de aceptación integral debe:

1. cargar una vez `reference-context.json`;
2. ejecutar cada lista de `decisions` con azar desactivado;
3. comparar el snapshot producido con el fixture correspondiente;
4. exigir igualdad exacta de `completedSceneIds`, historia, rama, resultado y evidencias;
5. comprobar las opciones derivadas de la sección 5 sin persistirlas dentro de `GameSession`;
6. fallar ante alias, IDs desconocidos, dimensiones distintas de las aprobadas o cualquier dependencia del orden de ejecución.

Los JSON no dependen de HTTP, DOM, Fastify, texto traducido ni reloj real. Por ello son deterministas y directamente consumibles desde pruebas de dominio o integración.

## 9. Matriz de aceptación de #47

| Criterio | Evidencia | Estado |
|---|---|---|
| Diferencias nacen de decisiones preventivas identificables | Secciones 3–4 y secuencias exactas en ambos JSON | Cumplido |
| Al menos tres dimensiones cambian | Las cinco dimensiones cambian y el test las compara | Cumplido |
| IDs exactos y recorrido completo | Sección 6, fixtures y validador de contrato | Cumplido |
| Mismo barranco con efectos diferentes | Mismo `actionId`, dos evidencias explícitas y test dedicado | Cumplido |
| Resultados `contained` / `overwhelmed` | Snapshots, eventos finales y prueba automática | Cumplido |
| Contexto idéntico | Manifest único fuera de `GameSession` y prueba de forma exacta | Cumplido |
| Fixtures deterministas para #76 | Sección 8, round-trip y ausencia de azar | Cumplido |

## 10. Exclusiones

Esta entrega no implementa el motor #69, el renderer, las opciones de interfaz ni la aceptación integral #76. Tampoco convierte valores de diseño en garantías científicas o de respuesta real; mantiene las puertas de validación experta de #10.
