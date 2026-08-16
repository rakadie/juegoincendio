# Vertical Beta 1 — Catálogo canónico y validación documental

Fecha: 28 de julio de 2026  
Issue: #23  
Rama: `docs/vertical-beta-1-catalog`  
Estado contrastado: `main@d08db13fd9330ba297d8b92ca8a77cce7e35aef3`  
Implementación posterior: #67  
Milestone de implementación: **M2 — Motor modular** (`#2`)

## 1. Propósito y alcance formal

Este documento publica y valida el **catálogo objetivo** de la Vertical Beta 1. Es la fuente de verdad de M1 para:

- IDs canónicos;
- orden y fases;
- fuentes actuales;
- dependencias;
- estado editorial;
- destino previsto en campaña y flujo;
- dos ramas causales;
- correspondencia histórica;
- clasificación completa de las 51 escenas;
- desviaciones entre la especificación aprobada y el runtime auditado.

La incidencia #23 se considera una **entrega documental de M1**. No exige que `main` implemente todavía el catálogo. La implementación física de IDs, payload, inspecciones, flujo, renderer, resultado e i18n se traslada a #67 y a sus tareas #68–#76.

La validación de #23 significa:

1. que los nodos objetivo están definidos de forma única;
2. que cada unidad tiene fuente y posición;
3. que las salidas del **grafo objetivo** solo apuntan a IDs canónicos oficiales;
4. que toda desviación del runtime queda registrada y enlazada a implementación;
5. que el documento puede utilizarse como entrada estable de #14 sin esperar a M2.

No significa que el runtime auditado cumpla ya el grafo.

## 2. Principio causal

> prevención territorial → comportamiento del fuego → capacidad de extinción → consecuencias

El núcleo del MVP es la gestión de combustible, continuidad vegetal, caminos, accesos, maquinaria, seguridad de equipos y oportunidades de ataque.

Comunicación, 112, evacuación y población vulnerable pueden aparecer como consecuencias o contenido complementario, pero no desplazan el eje territorial.

## 3. Convención de IDs

Formato:

```text
<phase>-<kind>-<function>[-<qualifier>]
```

Reglas:

- inglés técnico, ASCII, minúsculas y `kebab-case`;
- sin numeración de orden;
- independiente del título y del idioma;
- describe función, no posición temporal;
- un nodo compartido conserva un único ID;
- los resultados calculados son variantes del mismo nodo final;
- no se reutilizan IDs retirados;
- migración atómica y sin alias ejecutables.

Fases:

- `intro`;
- `prevention`;
- `transition`;
- `crisis`;
- `ending`.

Tipos:

- `briefing`;
- `inspection`;
- `summary`;
- `decision`;
- `router`;
- `result`.

## 4. Grafo objetivo

### Tronco común

```text
intro-briefing-mission
→ prevention-inspection-territory-fuel
→ prevention-inspection-housing-interface
→ transition-summary-prevention
→ crisis-decision-first-alert
→ crisis-router-causal-map
```

### Rama preparada

```text
crisis-decision-emergency-fuel-break
→ crisis-decision-ravine-fire
→ crisis-decision-housing-defense
→ ending-result-causal-report [contained]
```

### Rama vulnerable

```text
crisis-decision-access-blockage
→ crisis-decision-ravine-fire
→ crisis-decision-crown-fire
→ ending-result-causal-report [overwhelmed]
```

`contained` y `overwhelmed` son resultados calculados, no IDs independientes.

La especificación detallada del tronco común, sus fases y condiciones mínimas de avance se publica en [`vertical-beta-1-common-trunk.md`](vertical-beta-1-common-trunk.md) como entrega de #24.

Las dos ramas de crisis, el nodo compartido y su convergencia final se especifican en [`vertical-beta-1-crisis-branches.md`](vertical-beta-1-crisis-branches.md) como entrega de #25.

Los predicados deterministas, su prioridad, la conservación de rama y el tratamiento de estados inválidos se especifican en [`vertical-beta-1-graph-transitions.md`](vertical-beta-1-graph-transitions.md) como entrega de #26.

La integridad, alcanzabilidad, ausencia de ciclos y estructura TypeScript de referencia se validan en [`vertical-beta-1-graph-validation.md`](vertical-beta-1-graph-validation.md) como entrega de #27.

## 5. Tabla definitiva

| Posición | Fase | Rama | Unidad actual | ID canónico | Tipo | Fuente actual | Dependencias de entrada | Estado editorial | Destino en `campaign.ts` / flujo | Salidas canónicas |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `intro` | Común | Briefing hardcodeado | `intro-briefing-mission` | `briefing` | `src/interfaces/http/prototype-page.ts` | Inicio de sesión | `beta-oficial`; migrar a nodo declarativo | Añadir como nodo inicial; retirar texto y navegación hardcodeados | `prevention-inspection-territory-fuel` |
| 2 | `prevention` | Común | `p-002-fincas-vegetacion-combustible` | `prevention-inspection-territory-fuel` | `inspection` | `src/content/prevention-inspections.ts` | `intro-briefing-mission` | `beta-oficial`; reducir | Primera entrada de `preventionInspections` | `prevention-inspection-housing-interface` |
| 3 | `prevention` | Común | `p-001-viviendas-interfaz` | `prevention-inspection-housing-interface` | `inspection` | `src/content/prevention-inspections.ts` | `prevention-inspection-territory-fuel` | `beta-oficial`; reducir | Segunda entrada de `preventionInspections` | `transition-summary-prevention` |
| 4 | `transition` | Común | `balance-prevencion` | `transition-summary-prevention` | `summary` | `src/content/prevention-balance.ts` | Dos inspecciones completadas | `beta-oficial`; reorientar | Mantener como `preventionBalance` | `crisis-decision-first-alert` |
| 5 | `crisis` | Común | `s-040-primer-aviso-incendio` | `crisis-decision-first-alert` | `decision` | `src/content/prevention-balance.ts` | `transition-summary-prevention` | `beta-oficial`; conservar función | Mantener como `firstAlert` | `crisis-router-causal-map` |
| 6 | `crisis` | Común | `m-001-apertura-tres-frentes` | `crisis-router-causal-map` | `router` | `src/content/prevention-balance.ts` | Primer aviso resuelto + estado heredado calculado | `beta-oficial`; reescribir | Mantener como `crisisRouteModule`; solo dos rutas automáticas | `crisis-decision-emergency-fuel-break`<br>`crisis-decision-access-blockage` |
| 7A | `crisis` | Preparada | `s-025-cortafuego-emergencia` | `crisis-decision-emergency-fuel-break` | `decision` | `src/content/scenarios/operaciones/os-025-cortafuego-emergencia.ts` | Rama preparada + oportunidad de ataque | `beta-oficial`; conservar | Referenciar desde el flujo oficial; no duplicar contenido en `campaign.ts` | `crisis-decision-ravine-fire` |
| 7B | `crisis` | Vulnerable | `s-011-corte-carretera-acceso` | `crisis-decision-access-blockage` | `decision` | `src/content/scenarios/operaciones/os-011-corte-carretera-acceso.ts` | Rama vulnerable + accesibilidad insuficiente | `beta-oficial`; conservar | Referenciar desde el flujo oficial; no duplicar contenido en `campaign.ts` | `crisis-decision-ravine-fire` |
| 8 | `crisis` | Ambas | `s-027-fuego-en-barranco` | `crisis-decision-ravine-fire` | `decision` | `src/content/scenarios/operaciones/os-027-fuego-en-barranco.ts` | Una de las dos escenas de apertura completada | `beta-oficial`; conservar compartida | Referenciar una sola vez desde el flujo; comportamiento condicionado por estado heredado | `crisis-decision-housing-defense`<br>`crisis-decision-crown-fire` |
| 9A | `crisis` | Preparada | `s-026-defensa-operativa-nucleo-viviendas` | `crisis-decision-housing-defense` | `decision` | `src/content/scenarios/operaciones/os-026-defensa-operativa-nucleo-viviendas.ts` | Barranco + rama preparada | `beta-oficial`; conservar | Referenciar desde la salida preparada del flujo | `ending-result-causal-report` |
| 9B | `crisis` | Vulnerable | `s-030-fuego-de-copas` | `crisis-decision-crown-fire` | `decision` | `src/content/scenarios/operaciones/os-030-fuego-de-copas.ts` | Barranco + rama vulnerable | `beta-oficial`; conservar | Referenciar desde la salida vulnerable del flujo | `ending-result-causal-report` |
| 10 | `ending` | Común | `resultado-beta` y resultado hardcodeado | `ending-result-causal-report` | `result` | `src/interfaces/http/prototype-page.ts` | `crisis-decision-housing-defense` o `crisis-decision-crown-fire` | `beta-oficial`; sustituir sentinela | Añadir como nodo terminal declarativo y retirar mecanismos duplicados | — |

El catálogo contiene **12 nodos funcionales únicos**. Cinco proceden de objetos `Scenario` actuales.

## 6. Inspecciones aprobadas

### `prevention-inspection-territory-fuel`

Cinco actuaciones candidatas; el jugador selecciona tres:

1. gestionar restos de poda;
2. crear discontinuidades vegetales;
3. limpiar márgenes de caminos rurales;
4. activar pastoreo preventivo;
5. evaluar una quema prescrita o línea preventiva profesional.

Replantación y regulación general de quemas agrícolas no aparecen como decisiones independientes en el MVP.

### `prevention-inspection-housing-interface`

Tres actuaciones candidatas; el jugador selecciona dos:

1. podar ramas bajas y retirar vegetación seca;
2. separar copas;
3. despejar accesos para autobombas.

Canalones, materiales junto a fachadas, huecos y edificios públicos quedan fuera de esta versión.

## 7. Correspondencia histórica

| Unidad histórica | Destino | Tratamiento |
|---|---|---|
| `s-000-introduccion` | `intro-briefing-mission` | Reutilizar texto; retirar como `Scenario` |
| `s-000c-contexto-prevencion-otono` | `intro-briefing-mission` | Absorber contexto y archivar pantalla |
| `s-000d-quemas-prescritas-otono` | `prevention-inspection-territory-fuel` | Absorber evaluación profesional |
| `s-002b-asesoramiento-terrenos` | `prevention-inspection-territory-fuel` | Absorber pastoreo y mantenimiento |
| `s-035-limpieza-alrededor-viviendas` | `prevention-inspection-housing-interface` | Absorber poda, copas y acceso |
| `s-038-eleccion-vegetacion-finca` | `prevention-inspection-territory-fuel` | Absorber discontinuidad vegetal |
| `s-010b-defensa-nucleo-viviendas` | `crisis-decision-housing-defense` | Sustituida por `s-026` |
| `s-010d-zona-barranco` | `crisis-decision-ravine-fire` | Sustituida por `s-027` |
| `s-024-quema-tecnica` | `crisis-decision-emergency-fuel-break` | Duplicado histórico de `s-025` |
| `s-000b-avatar-emergencias` | Preferencia opcional | Archivo histórico |
| `resultado-beta` | `ending-result-causal-report` | Sustituir sentinela por nodo real |

## 8. Clasificación de los 51 `Scenario`

### `beta-oficial` — 5

- `s-011-corte-carretera-acceso`;
- `s-025-cortafuego-emergencia`;
- `s-026-defensa-operativa-nucleo-viviendas`;
- `s-027-fuego-en-barranco`;
- `s-030-fuego-de-copas`.

### `biblioteca-candidata` — 36

**Comunicación — 6**

- `s-008-campana-sector-primario`;
- `s-013-simulacro-escolar`;
- `s-016-rumor-evacuacion-noroeste`;
- `s-018-colapso-llamadas-112`;
- `s-023-imagen-antigua-viral`;
- `s-024-presion-mediatica-zona-caliente`.

**Operaciones — 22**

- `s-008b-riesgo-extremo-verano`;
- `s-009-primer-envio-medios`;
- `s-009b-escalado-incendio`;
- `s-009c-continuidad-incendio`;
- `s-010-cambio-viento-evacuacion`;
- `s-010b2-foco-secundario-por-radio`;
- `s-010c-ataque-zona-secundaria`;
- `s-010c2-refuerzo-ume-viviendas`;
- `s-012-fallo-comunicaciones-radio`;
- `s-012-rescate-zona-peligrosa`;
- `s-014-finca-ganadera-atrapada`;
- `s-019-apagon-plena-emergencia`;
- `s-020-fuego-amenaza-subestacion-electrica`;
- `s-021-humo-viento-helicopteros-tierra`;
- `s-022-evacuacion-con-mascotas`;
- `s-023-centro-mayores-riesgo`;
- `s-028-defensa-nocturna-perimetro`;
- `s-029-relevo-cuadrillas-agotadas`;
- `s-031-confinamiento-extremo-fuego-copas`;
- `s-032-casas-diseminadas-monte`;
- `s-033-senderistas-desorientados-humo`;
- `s-034-vecinos-sin-medios-para-salir`.

**Prevención — 8**

- `s-004-quemas-agricolas`;
- `s-005-recoleccion-monte`;
- `s-006-hogueras-monte`;
- `s-007-evacuacion-ciudadania`;
- `s-014-red-agua-rural`;
- `s-036-defensa-pasiva-vivienda`;
- `s-037-plan-familiar-emergencia`;
- `s-039-uso-maquinaria-epoca-riesgo`.

### `archivo-historico` — 10

- `s-000-introduccion`;
- `s-000b-avatar-emergencias`;
- `s-000c-contexto-prevencion-otono`;
- `s-000d-quemas-prescritas-otono`;
- `s-002b-asesoramiento-terrenos`;
- `s-035-limpieza-alrededor-viviendas`;
- `s-038-eleccion-vegetacion-finca`;
- `s-010b-defensa-nucleo-viviendas`;
- `s-010d-zona-barranco`;
- `s-024-quema-tecnica`.

Total: **5 + 36 + 10 = 51**.

## 9. Unidades adicionales

- `p-003-comunidad-preparada`: `biblioteca-candidata`; no se carga en el MVP.
- `invierno_1..3` y `verano_1..3`: `archivo-historico`; no reciben ID canónico.
- `resultado-beta`: sentinela histórica sustituida por `ending-result-causal-report`.

Regla de carga objetivo:

- solo `beta-oficial` entra en el payload y el flujo;
- la biblioteca permanece en el repositorio, fuera del índice ejecutable;
- el archivo no se carga ni recibe compatibilidad de runtime.

## 10. Alcance obligatorio de i18n

La cobertura i18n obligatoria del producto comprende **los 12 nodos oficiales que contienen texto**, no únicamente los cinco objetos `Scenario`.

Se distinguen dos validaciones:

1. **Cobertura de escenas:** los cinco `Scenario` oficiales deben tener traducción completa y estricta en el catálogo de escenas.
2. **Cobertura de flujo:** briefing, dos inspecciones, resumen, primer aviso, router y resultado deben resolverse mediante un catálogo de contenido traducible o mecanismo equivalente.

El sistema final no debe aceptar fallback silencioso para un nodo oficial. La validación debe fallar cuando falte contenido obligatorio de cualquiera de los 12 IDs canónicos.

La biblioteca candidata no necesita migrar ni completar i18n durante esta fase.

## 11. Validación contra el commit auditado

Commit auditado:

```text
main@d08db13fd9330ba297d8b92ca8a77cce7e35aef3
```

| Comprobación | Resultado en el commit auditado |
|---|---|
| Los 12 IDs canónicos son únicos en la tabla | Correcto |
| Las 51 escenas están clasificadas exactamente | Correcto: 5 oficiales, 36 de biblioteca y 10 históricas |
| Las cinco escenas oficiales tienen fuente existente | Correcto |
| Todas las unidades de la tabla tienen posición y dependencia | Correcto en este documento |
| Todas las salidas objetivo enumeran IDs canónicos verificables | Correcto en este documento |
| Los IDs canónicos existen en TypeScript | Pendiente: el código conserva IDs históricos |
| El payload expone solo cinco `Scenario` | Incorrecto: expone los 51 |
| Solo se cargan dos inspecciones | Incorrecto: también se carga `p-003` |
| `p-002` ofrece cinco candidatas y permite tres | Incorrecto: mantiene siete y permite cuatro |
| `p-001` ofrece tres candidatas y permite dos | Incorrecto: mantiene siete y permite cuatro |
| No se cargan nodos `invierno_*`/`verano_*` | Incorrecto: siguen en `CAMPAIGN_CONTENT` |
| El primer aviso referencia solo contenido oficial | Incorrecto: desbloquea escenas excluidas |
| El mapa solo representa las dos ramas aprobadas | Incorrecto: conserva comunicación, senderistas y población |
| La rama se selecciona por estado causal | Incorrecto: `activeCrisisRoute()` fuerza `ruta-comunicacion` |
| Briefing y resultado son declarativos | Incorrecto: siguen hardcodeados |
| Las cinco escenas funcionan con el renderer actual | Incompatible: el renderer inicia solo `action-selection` y las elegidas son preguntas de opciones simples |
| i18n cubre los 12 nodos oficiales | Incorrecto |
| Falta de traducción produce error | Incorrecto: existe fallback silencioso |
| Existe prueba automática del catálogo | No localizada |

## 12. Desviaciones trasladadas a M2

Toda implementación derivada de esta validación se centraliza en la épica:

- #67 — **M2 — Implementar la Vertical Beta 1 ejecutable**.

Tareas de la épica:

- #68 — contrato común `GameScene` y validador del catálogo;
- #69 — `GameSession`, eventos e invariantes;
- #70 — dos inspecciones preventivas oficiales;
- #71 — adaptación de las cinco escenas oficiales;
- #72 — balance, flujo declarativo, router causal y resultado;
- #73 — interfaz conectada al motor y renderers;
- #74 — separación beta/biblioteca/archivo y retirada de campaña heredada;
- #75 — migración atómica de IDs e i18n;
- #76 — aceptación integral automatizada.

Todas están asignadas al milestone GitHub **M2 — Motor modular** (`#2`). Permanecen fuera de `Ready` hasta que M1 complete sus puertas estructurales.

## 13. Validaciones automatizables requeridas en M2

Tras aplicar la migración, una prueba debe verificar:

1. 12 nodos funcionales oficiales;
2. cinco `Scenario` ejecutables;
3. dos inspecciones en el orden aprobado;
4. unicidad global de IDs;
5. existencia de las fuentes declaradas;
6. ausencia de referencias a biblioteca o archivo;
7. ausencia de `invierno_*`, `verano_*` y `resultado-beta` en el payload;
8. cobertura i18n estricta de los 12 nodos oficiales;
9. una entrada y un terminal;
10. ambas ramas alcanzables y convergentes;
11. ausencia de nodos huérfanos y ciclos;
12. uso compartido de `crisis-decision-ravine-fire` sin duplicación.

Archivo orientativo:

```text
tests/vertical-beta-catalog.test.ts
```

## 14. Criterio de cierre de #23

#23 puede cerrarse como `completed` cuando:

- este documento esté revisado;
- la rama se integre en `main`;
- `docs/README.md` lo enlace;
- el cambio de alcance documental esté formalizado en GitHub;
- #67 recoja las desviaciones técnicas;
- el documento quede aprobado como entrada de #14.

No es requisito de cierre de #23 que M2 haya implementado el runtime.

Después del cierre de #23:

- #13 puede cerrarse al quedar fijadas escenas e IDs;
- #14 puede continuar sin esperar a M2;
- #67 permanece fuera de `Ready` hasta que M1 complete sus puertas estructurales.
