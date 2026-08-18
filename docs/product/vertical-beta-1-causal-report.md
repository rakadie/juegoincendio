# Vertical Beta 1 — Informe causal final

- Fecha: 16 de agosto de 2026
- Issue: #39
- Issue padre: #17
- Entradas normativas: #23, #25, #29–#38
- Estado contrastado: `main@dc7c646087c402c10ad3c260556a3034a1c4056e`

## 1. Propósito

Este documento define cómo el único nodo terminal `ending-result-causal-report` explica las variantes `contained` y `overwhelmed` a partir de decisiones y evidencias reales de `GameSession`.

El informe no recalcula el resultado, no concede puntos y no convierte la variante en una explicación circular. Construye entre tres y cinco relaciones completas con esta forma:

```text
actuación preventiva tomada, parcial, fallida u omitida
→ cambio interpretado en inheritedState
→ manifestación en una escena de crisis
→ efecto sobre fuego o capacidad operativa
→ alternativa preventiva relevante
```

Las decisiones tomadas durante el incendio se muestran aparte como respuesta operativa. No se presentan como causa del estado heredado.

## 2. Invariantes del nodo final

1. Existe un solo `ending-result-causal-report` para ambas ramas.
2. `prepared` solo admite `contained`; `vulnerable` solo admite `overwhelmed`.
3. El informe consume una sesión terminal válida y nunca modifica `GameSession`.
4. Cada afirmación visible conserva referencias a decisiones, evidencias y escenas de esa sesión.
5. Una variante decide el encabezado, no las relaciones causales.
6. Se muestran de tres a cinco relaciones preventivas prioritarias.
7. Los valores internos se traducen a efectos observables; no se muestran como puntuaciones desnudas.
8. Las mejoras parciales se conservan también en `overwhelmed`.
9. Comunicación, evacuación, daños y población solo pueden aparecer al final como consecuencias derivadas.
10. Ningún texto editorial se almacena en la sesión ni se construye concatenando etiquetas traducidas.

## 3. Jerarquía visible del informe

| Orden | Bloque | Contenido | Límite |
|---:|---|---|---:|
| 1 | Resultado | Encabezado `contained` u `overwhelmed` y resumen interpretado. | Uno |
| 2 | Cadenas causales | Prevención → estado → escena → consecuencia → alternativa. | 3–5 |
| 3 | Respuesta durante el incendio | Decisiones de crisis realmente tomadas y lo que pudieron o no pudieron aprovechar. | 1–4 |
| 4 | Consecuencia secundaria | Comunicación, evacuación, daños o población, solo si existe evidencia derivada. | 0–2 |
| 5 | Cierre educativo | Diferencia entre preparación y garantía; acción preventiva prioritaria para otra partida. | Uno |

Los bloques 2 y 3 deben llevar títulos distintos. La interfaz no mezcla “lo que preparaste antes” con “lo que decidiste durante el incendio”.

## 4. Trazabilidad mínima por relación

Cada relación debe contener los cinco pasos editoriales y estas referencias técnicas:

| Paso | Referencias obligatorias | Regla de evidencia |
|---|---|---|
| Prevención | `inspectionSceneId`, uno o más `actionId`, estado de ejecución, `evidenceIds` | Una acción tomada referencia su `decisionSequence`; el resultado favorable exige evidencia de ejecución. |
| Estado heredado | `dimension`, banda interpretada y evidencias del cálculo | El valor puede usarse para seleccionar la banda, pero la vista no lo imprime por defecto. |
| Manifestación | `sceneId` de crisis y `evidenceIds` producidas allí | La escena debe pertenecer al recorrido real de la sesión. |
| Efecto | `consequenceId` de #36 y, cuando proceda, `combinationId` de #38 | No se salta directamente de una puntuación a una frase final. |
| Alternativa | `actionId` preventivo canónico y clave editorial | Recomienda completar, mantener o combinar una actuación real del catálogo; nunca una acción de biblioteca. |

### Acciones omitidas

Una omisión solo es elegible cuando concurren:

```text
la inspección correspondiente fue completada
AND actionId pertenece al catálogo versionado de esa inspección
AND actionId no aparece como decisión de esa inspección
AND existe evidenceId de la condición observada conservada
```

La ausencia aislada de un `actionId` no demuestra una omisión. Si falta la evidencia de condición, el informe descarta esa candidata en lugar de inventar una causa.

### Ejecución parcial o fallida

Seleccionar una acción no equivale a completarla. El informe usa uno de estos estados:

```text
completed | partial | failed | omitted
```

`completed` exige evidencia favorable; `partial` y `failed` exigen su resultado explícito. La alternativa será respectivamente mantener/combinar, completar o corregir la actuación.

## 5. Modelo derivado

El informe es una proyección descartable, no un nuevo campo de `GameSession` en M1:

```ts
type PreventionExecution = 'completed' | 'partial' | 'failed' | 'omitted';
type ReportDimension =
  | 'fuelLoad'
  | 'fuelContinuity'
  | 'operationalAccess'
  | 'defensibility'
  | 'attackOpportunity';

interface CausalReportRelation {
  id: string;
  dimension: ReportDimension;
  branchDecisive: boolean;
  cause: {
    inspectionSceneId: CanonicalSceneId;
    actionIds: readonly string[];
    execution: PreventionExecution;
    decisionSequences: readonly number[];
    evidenceIds: readonly string[];
  };
  stateEffect: {
    bandKey: string;
    evidenceIds: readonly string[];
  };
  manifestation: {
    sceneId: CanonicalSceneId;
    consequenceId: CrisisConsequenceKey;
    evidenceIds: readonly string[];
  };
  combinationId?: 'C-01' | 'C-02' | 'C-03' | 'C-04' | 'C-05';
  alternativeActionIds: readonly string[];
  validationClaimIds: readonly string[];
  messageKeys: {
    cause: string;
    state: string;
    manifestation: string;
    effect: string;
    alternative: string;
  };
}

interface OperationalResponseEntry {
  sceneId: CanonicalSceneId;
  actionId: string;
  decisionSequence: number;
  evidenceIds: readonly string[];
  messageKey: string;
}

interface CausalReportModel {
  nodeId: 'ending-result-causal-report';
  variant: 'contained' | 'overwhelmed';
  summaryKey: string;
  relations: readonly CausalReportRelation[];
  operationalResponse: readonly OperationalResponseEntry[];
  secondaryConsequenceKeys: readonly string[];
  closingKey: string;
}
```

`validationClaimIds` conserva el estado de revisión de #38, pero no se muestra al jugador salvo en una vista editorial o de auditoría.

## 6. Construcción y selección determinista

```text
buildCausalReport(session, causalCatalog):
  require valid terminal GameSession
  require branch/result correspondence
  candidates = derive complete causal chains from history and evidence
  eligible = discard every candidate with a missing trace link
  selected = select 3..5 relations using the rules below
  operations = collect real post-router decisions separately
  return immutable CausalReportModel
```

### Selección

1. Incluir primero la relación que contiene cada restricción crítica que decidió `vulnerable`, hasta un máximo de dos.
2. En `contained`, incluir C-05 y las relaciones que demuestran acceso/repliegue y comportamiento del combustible.
3. En `overwhelmed`, reservar al menos una relación para una mejora preventiva real que no bastó; el informe no borra lo que sí funcionó.
4. Preferir cadenas completas que cubran dimensiones distintas.
5. Añadir relaciones directas hasta alcanzar entre tres y cinco.
6. Desempatar por el orden estable de `relation.id`; nunca por orden de propiedades, azar o texto traducido.

### Orden de presentación

Una vez seleccionadas, las relaciones se presentan por este orden territorial:

```text
fuelLoad
fuelContinuity
operationalAccess
defensibility
attackOpportunity
```

Una relación de combinación ocupa la posición de su dimensión explicativa principal y puede mencionar las demás como condiciones. Las consecuencias sociales nunca interrumpen esta secuencia.

### Fallo de trazabilidad

Si no pueden construirse al menos tres cadenas completas, `buildCausalReport` devuelve `causal-report-insufficient-evidence`. La aplicación no rellena huecos con textos genéricos ni completa la sesión con un informe no trazable.

## 7. Contrato i18n

Las reglas producen IDs y claves; el presentador resuelve el idioma después:

```text
buildCausalReport(session, causalCatalog)
→ CausalReportModel

presentCausalReport(model, messageCatalog, locale)
→ CausalReportView
```

Familias de claves:

```text
verticalBeta.result.title.contained
verticalBeta.result.title.overwhelmed
verticalBeta.result.summary.contained
verticalBeta.result.summary.overwhelmed
verticalBeta.report.section.prevention
verticalBeta.report.section.operationalResponse
verticalBeta.report.relation.<relationId>.cause
verticalBeta.report.relation.<relationId>.state
verticalBeta.report.relation.<relationId>.manifestation
verticalBeta.report.relation.<relationId>.effect
verticalBeta.report.relation.<relationId>.alternative
verticalBeta.report.operation.<sceneId>.<actionId>
verticalBeta.report.secondary.<consequenceId>
verticalBeta.report.closing.contained
verticalBeta.report.closing.overwhelmed
```

Cada mensaje es una frase completa traducible. Los parámetros solo insertan datos seguros como nombres resueltos de actuaciones o escenas; no se concatenan fragmentos para formar gramática. Una clave ausente en un nodo oficial es un error de cobertura i18n, no un fallback al español.

## 8. Ejemplo completo — `contained`

Este ejemplo reutiliza el perfil preparado aprobado en #37. La partida canónica completa se fija en [`vertical-beta-1-reference-prepared.md`](vertical-beta-1-reference-prepared.md), entrega de #45.

### Estado y recorrido de entrada

```text
Actuaciones completadas:
  gestionar-restos-poda
  crear-discontinuidades-vegetales
  limpiar-margenes-caminos
  podar-ramas-y-retirar-seco
  despejar-accesos

InheritedState: 45, 25, 80, 50, 66
CrisisBranch: prepared
Result: contained
```

El orden del estado es `fuelLoad`, `fuelContinuity`, `operationalAccess`, `defensibility`, `attackOpportunity`. Los números se conservan para auditoría; la vista usa las interpretaciones siguientes.

### Vista para el jugador

**Incendio contenido — la preparación mantuvo una ventana de intervención.** El fuego conservó riesgo, pero el combustible tratado, la cadena de acceso y una posición utilizable permitieron sostener la respuesta dentro de capacidad.

1. **Había menos combustible disponible.** Gestionaste los restos de poda y la carga quedó en una banda favorable. En el primer aviso y el barranco, la intensidad fue más manejable y dejó margen para intervenir. Mantener la retirada de restos —y combinarla con reducción de combustible fino cuando proceda— conserva ese beneficio.
2. **La propagación encontró discontinuidades.** Creaste una discontinuidad territorial y redujiste la continuidad vertical junto a viviendas. En el cortafuego de emergencia y el barranco aparecieron puntos de anclaje y menor conexión del frente. Separar copas sería el complemento preventivo relevante para reforzar el amortiguador de transición.
3. **La entrada y el repliegue siguieron disponibles.** Limpiaste los márgenes rurales y despejaste el acceso de autobombas. La maquinaria pudo aproximarse, maniobrar y conservar salida en el barranco. Mantener ambos tramos es necesario: actuar solo sobre uno deja la cadena incompleta.
4. **La defensa de viviendas fue utilizable.** La discontinuidad, la poda baja y el acceso local convirtieron la defensibilidad física en una posición operable. En la escena de viviendas pudo sostenerse una defensa selectiva. Mantener la vegetación tratada y el acceso despejado evita perder esa capacidad.
5. **Las condiciones coincidieron en una oportunidad de ataque.** Carga, continuidad, acceso, defensibilidad y oportunidad superaron conjuntamente los mínimos de C-05 sin un veto crítico. La línea de emergencia y el barranco pudieron trabajarse con límites, por lo que la capacidad final permaneció dentro de margen. Una evaluación profesional de línea puede reforzar esta preparación, pero no sustituye el acceso ni el repliegue.

### Respuesta operativa, separada

- `movilizar-y-verificar` aprovechó el margen inicial; no creó la reducción de combustible.
- `autorizar-maniobra-condicionada` utilizó la oportunidad ya preparada.
- `asegurar-flancos-y-repliegue` conservó la posición en el barranco.
- `defender-desde-posicion-segura` aprovechó la defensa y el acceso disponibles.

**Cierre educativo:** `contained` describe esta partida y este contexto. No promete que las mismas actuaciones garanticen el control de un incendio real.

## 9. Ejemplo completo — `overwhelmed`

Este ejemplo reutiliza el perfil vulnerable aprobado en #37. #46 fijará después la partida canónica completa.

### Estado y recorrido de entrada

```text
Actuaciones completadas:
  gestionar-restos-poda
  activar-pastoreo-preventivo
  evaluar-quema-tecnica [professional-line-feasible]
  podar-ramas-y-retirar-seco
  separar-copas

Actuaciones omitidas con condición conservada:
  crear-discontinuidades-vegetales
  limpiar-margenes-caminos
  despejar-accesos

InheritedState: 25, 35, 20, 30, 24
CrisisBranch: vulnerable
Result: overwhelmed
```

### Vista para el jugador

**Incendio fuera de capacidad — las mejoras de combustible no compensaron el bloqueo operativo.** Parte de la prevención redujo la presión del fuego, pero la falta de acceso y posición segura impidió aprovecharla.

1. **La reducción de carga sí produjo una mejora.** Gestionaste los restos y completaste el pastoreo en franjas prioritarias. La intensidad dispuso de menos combustible y el efecto fue visible durante el avance. Mantener estas actuaciones es correcto, aunque no sustituye las condiciones de seguridad que faltaron.
2. **La continuidad local bajó, pero faltó una discontinuidad territorial.** La poda baja y la separación de copas amortiguaron la conexión vertical y aérea; sin embargo, omitiste crear la discontinuidad territorial observada. En el barranco hubo menos conexión local, pero no suficientes puntos de anclaje. Crear esa discontinuidad es la alternativa que completa el tratamiento a escala territorial.
3. **El acceso fue la restricción crítica.** Los márgenes rurales y el acceso de autobombas conservaron sus obstrucciones. En el bloqueo de accesos y el barranco, maquinaria, maniobra y repliegue no estuvieron disponibles con seguridad. Limpiar los márgenes y despejar el acceso local deben completarse como una cadena, no como medidas intercambiables.
4. **La posición no pudo sostenerse.** Sin discontinuidad territorial ni acceso utilizable, la defensibilidad quedó limitada aunque existían mejoras de vegetación. En el barranco fue necesario abandonar o restringir posiciones. Combinar discontinuidad, acceso y tratamiento próximo a viviendas es la alternativa preventiva relevante.
5. **La línea evaluada no se convirtió en ataque operable.** La evaluación profesional encontró una línea viable, pero el acceso crítico redujo la oportunidad de ataque y no permitió usarla con seguridad. La crisis progresó hacia el fuego de copas y la capacidad final quedó superada. Recuperar la cadena de acceso antes de la emergencia es prioritario; una línea evaluada por sí sola no anula un veto.

### Respuesta operativa, separada

- `movilizar-y-verificar` respondió al primer aviso, pero no podía reparar la preparación territorial omitida.
- `despejar-corredor-operativo` fue una respuesta de emergencia al bloqueo; no equivale a haber mantenido ambos accesos antes del incendio.
- `asegurar-flancos-y-repliegue` quedó limitado por la posición heredada.
- `replegar-ante-fuego-de-copas` protegió a los equipos ante la escalada; es una respuesta de seguridad, no la causa del resultado.

La presión sobre evacuación o daños podría mostrarse después si el historial contiene evidencia derivada de `machineryAccess`, `safeRetreat` o `crownTransitionRisk`. Nunca reemplaza las cinco relaciones territoriales anteriores.

**Cierre educativo:** `overwhelmed` no significa que toda la prevención fallara. Explica que las mejoras reales no compensaron una restricción crítica de acceso y oportunidad en esta partida.

## 10. Comprobaciones automatizables para M2

1. La entrada debe ser una `GameSession` terminal válida.
2. La variante, rama, recorrido y último evento deben coincidir.
3. El resultado contiene de tres a cinco relaciones únicas.
4. Cada relación referencia acciones canónicas, evidencias existentes y una escena recorrida.
5. Una acción tomada referencia decisiones reales de la sesión.
6. Una omisión tiene evidencia explícita de condición conservada.
7. Toda relación contiene los cinco pasos y una clave para cada mensaje.
8. Las decisiones posteriores al router solo aparecen en `operationalResponse`.
9. `overwhelmed` conserva al menos una mejora preventiva si el historial la demuestra.
10. La presentación sigue el orden fijo de las cinco dimensiones.
11. Las claves i18n existen en todos los idiomas obligatorios sin fallback.
12. La misma sesión y catálogo producen el mismo modelo, independientemente del idioma.
13. Ningún valor `0..100` aparece en la vista estándar.
14. Una consecuencia social carece de prioridad sobre una cadena territorial.
15. Menos de tres cadenas trazables produce `causal-report-insufficient-evidence`.

## 11. Exclusiones

Esta entrega no:

- crea finales adicionales “favorable”, “parcial” o “derrota”;
- redacta una explicación distinta para cada combinación posible;
- convierte las decisiones de crisis en prevención retroactiva;
- muestra fórmulas, puntuaciones o estados de validación al jugador;
- introduce comunicación o evacuación como dimensión, rama o selector;
- modifica el contrato persistido de `GameSession`;
- implementa UI, catálogos i18n ni reglas de producción;
- sustituye la validación experta de #10;
- fija las partidas canónicas completas, alcance de #44–#47.

## 12. Matriz de aceptación de #39

| Criterio | Evidencia | Estado |
|---|---|---|
| Tres a cinco relaciones prioritarias | Jerarquía y selección, secciones 3 y 6 | Cumplido |
| Cada explicación usa decisiones reales | Trazabilidad y omisiones, sección 4 | Cumplido |
| Causa preventiva separada de respuesta | Modelo y ejemplos, secciones 5, 8 y 9 | Cumplido |
| Diferencia comprensible sin puntuación | Dos vistas completas, secciones 8 y 9 | Cumplido |
| Solo dos variantes del mismo nodo | Invariantes y exclusiones, secciones 2 y 11 | Cumplido |
| Compatible con i18n e IDs | Contrato de claves, sección 7 | Cumplido |
| Consecuencias sociales subordinadas | Jerarquía y ejemplo vulnerable | Cumplido |
| Implementable como función pura | Modelo, algoritmo y comprobaciones | Cumplido |

## 13. Entregas siguientes

- #17 podrá cerrarse cuando #39 se integre, al quedar completas sus cuatro tareas #36–#39;
- #44 fijará el escenario común de las partidas de referencia;
- #45 fija la partida preparada en [`vertical-beta-1-reference-prepared.md`](vertical-beta-1-reference-prepared.md) y #46 completará la vulnerable;
- #47 comparará ambas sesiones y preparará fixtures de aceptación;
- #72 implementará el generador del informe y #75 su cobertura i18n estricta.
