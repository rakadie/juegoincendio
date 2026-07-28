# Vertical Beta 1 — Catálogo canónico y validación

Fecha: 28 de julio de 2026  
Issue: #23  
Rama: `docs/vertical-beta-1-catalog`  
Estado contrastado: `main`

## 1. Propósito

Este documento publica el catálogo objetivo de la Vertical Beta 1 y lo contrasta con el runtime actual. Es la fuente de verdad para los IDs canónicos, el orden del recorrido, las dos ramas causales, el destino editorial del contenido y la entrada de #14.

No afirma que `main` ya implemente el catálogo. Los incumplimientos detectados se registran para su corrección posterior sin reabrir las decisiones de producto.

## 2. Principio causal

> prevención territorial → comportamiento del fuego → capacidad de extinción → consecuencias

El núcleo del MVP es la gestión de combustible, continuidad vegetal, caminos, accesos, maquinaria, seguridad de equipos y oportunidades de ataque. Comunicación, 112, evacuación y población vulnerable quedan como consecuencias o contenido complementario.

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
- migración atómica, sin aliases ejecutables.

Fases: `intro`, `prevention`, `transition`, `crisis`, `ending`.  
Tipos: `briefing`, `inspection`, `summary`, `decision`, `router`, `result`.

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

## 5. Tabla definitiva

| Posición | Rama | Unidad actual | ID canónico | Tipo | Fuente actual | Salida objetivo |
|---:|---|---|---|---|---|---|
| 1 | Común | Briefing hardcodeado | `intro-briefing-mission` | `briefing` | `src/interfaces/http/prototype-page.ts` | `prevention-inspection-territory-fuel` |
| 2 | Común | `p-002-fincas-vegetacion-combustible` | `prevention-inspection-territory-fuel` | `inspection` | `src/content/prevention-inspections.ts` | `prevention-inspection-housing-interface` |
| 3 | Común | `p-001-viviendas-interfaz` | `prevention-inspection-housing-interface` | `inspection` | `src/content/prevention-inspections.ts` | `transition-summary-prevention` |
| 4 | Común | `balance-prevencion` | `transition-summary-prevention` | `summary` | `src/content/prevention-balance.ts` | `crisis-decision-first-alert` |
| 5 | Común | `s-040-primer-aviso-incendio` | `crisis-decision-first-alert` | `decision` | `src/content/prevention-balance.ts` | `crisis-router-causal-map` |
| 6 | Común | `m-001-apertura-tres-frentes` | `crisis-router-causal-map` | `router` | `src/content/prevention-balance.ts` | Rama preparada o vulnerable |
| 7A | Preparada | `s-025-cortafuego-emergencia` | `crisis-decision-emergency-fuel-break` | `decision` | `src/content/scenarios/operaciones/os-025-cortafuego-emergencia.ts` | `crisis-decision-ravine-fire` |
| 7B | Vulnerable | `s-011-corte-carretera-acceso` | `crisis-decision-access-blockage` | `decision` | `src/content/scenarios/operaciones/os-011-corte-carretera-acceso.ts` | `crisis-decision-ravine-fire` |
| 8 | Ambas | `s-027-fuego-en-barranco` | `crisis-decision-ravine-fire` | `decision` | `src/content/scenarios/operaciones/os-027-fuego-en-barranco.ts` | Defensa o fuego de copas |
| 9A | Preparada | `s-026-defensa-operativa-nucleo-viviendas` | `crisis-decision-housing-defense` | `decision` | `src/content/scenarios/operaciones/os-026-defensa-operativa-nucleo-viviendas.ts` | `ending-result-causal-report` |
| 9B | Vulnerable | `s-030-fuego-de-copas` | `crisis-decision-crown-fire` | `decision` | `src/content/scenarios/operaciones/os-030-fuego-de-copas.ts` | `ending-result-causal-report` |
| 10 | Común | `resultado-beta` y resultado hardcodeado | `ending-result-causal-report` | `result` | `src/interfaces/http/prototype-page.ts` | Terminal |

El catálogo contiene 12 nodos funcionales únicos. Cinco proceden de objetos `Scenario` actuales.

## 6. Inspecciones aprobadas

### `prevention-inspection-territory-fuel`

Cinco candidatas; el jugador selecciona tres:

1. gestionar restos de poda;
2. crear discontinuidades vegetales;
3. limpiar márgenes de caminos rurales;
4. activar pastoreo preventivo;
5. evaluar una quema prescrita o línea preventiva profesional.

Replantación y regulación general de quemas agrícolas no aparecen como decisiones independientes en el MVP.

### `prevention-inspection-housing-interface`

Tres candidatas; el jugador selecciona dos:

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

- `s-011-corte-carretera-acceso`
- `s-025-cortafuego-emergencia`
- `s-026-defensa-operativa-nucleo-viviendas`
- `s-027-fuego-en-barranco`
- `s-030-fuego-de-copas`

### `biblioteca-candidata` — 36

**Comunicación:** `s-008-campana-sector-primario`, `s-013-simulacro-escolar`, `s-016-rumor-evacuacion-noroeste`, `s-018-colapso-llamadas-112`, `s-023-imagen-antigua-viral`, `s-024-presion-mediatica-zona-caliente`.

**Operaciones:** `s-008b-riesgo-extremo-verano`, `s-009-primer-envio-medios`, `s-009b-escalado-incendio`, `s-009c-continuidad-incendio`, `s-010-cambio-viento-evacuacion`, `s-010b2-foco-secundario-por-radio`, `s-010c-ataque-zona-secundaria`, `s-010c2-refuerzo-ume-viviendas`, `s-012-fallo-comunicaciones-radio`, `s-012-rescate-zona-peligrosa`, `s-014-finca-ganadera-atrapada`, `s-019-apagon-plena-emergencia`, `s-020-fuego-amenaza-subestacion-electrica`, `s-021-humo-viento-helicopteros-tierra`, `s-022-evacuacion-con-mascotas`, `s-023-centro-mayores-riesgo`, `s-028-defensa-nocturna-perimetro`, `s-029-relevo-cuadrillas-agotadas`, `s-031-confinamiento-extremo-fuego-copas`, `s-032-casas-diseminadas-monte`, `s-033-senderistas-desorientados-humo`, `s-034-vecinos-sin-medios-para-salir`.

**Prevención:** `s-004-quemas-agricolas`, `s-005-recoleccion-monte`, `s-006-hogueras-monte`, `s-007-evacuacion-ciudadania`, `s-014-red-agua-rural`, `s-036-defensa-pasiva-vivienda`, `s-037-plan-familiar-emergencia`, `s-039-uso-maquinaria-epoca-riesgo`.

### `archivo-historico` — 10

- `s-000-introduccion`
- `s-000b-avatar-emergencias`
- `s-000c-contexto-prevencion-otono`
- `s-000d-quemas-prescritas-otono`
- `s-002b-asesoramiento-terrenos`
- `s-035-limpieza-alrededor-viviendas`
- `s-038-eleccion-vegetacion-finca`
- `s-010b-defensa-nucleo-viviendas`
- `s-010d-zona-barranco`
- `s-024-quema-tecnica`

Total: **5 + 36 + 10 = 51**.

## 9. Unidades adicionales

- `p-003-comunidad-preparada`: `biblioteca-candidata`; no se carga en el MVP.
- `invierno_1..3` y `verano_1..3`: `archivo-historico`; no reciben ID canónico.
- `resultado-beta`: sentinela histórica sustituida por `ending-result-causal-report`.

Regla de carga:

- solo `beta-oficial` entra en el payload y el flujo;
- la biblioteca permanece en el repositorio, fuera del índice ejecutable;
- el archivo no se carga ni recibe compatibilidad de runtime.

## 10. Validación contra `main`

| Comprobación | Resultado actual |
|---|---|
| Los 12 IDs canónicos son únicos en la tabla | Correcto |
| Las cinco escenas oficiales tienen fuente | Correcto |
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
| i18n cubre los IDs canónicos | Incorrecto: usa IDs históricos |
| Falta de traducción produce error | Incorrecto: existe fallback silencioso |
| Existe prueba automática del catálogo | No localizada |

## 11. Desviaciones técnicas registradas

1. `src/content/scenarios/index.ts` importa y carga las 51 escenas.
2. `p-001` y `p-002` no están reducidas y `p-003` sigue cargada.
3. El balance mantiene dimensiones comunitarias e informativas fuera del eje mínimo.
4. El primer aviso conserva referencias a escenas excluidas.
5. El mapa conserva las rutas antiguas y no las dos ramas aprobadas.
6. La interfaz fuerza `ruta-comunicacion` antes de evaluar condiciones.
7. `campaign.ts` y el prototipo conservan el modelo archivado de invierno/verano y recursos.
8. Las cinco escenas oficiales no cumplen el contrato interactivo esperado por el renderer actual.
9. Existen dos mecanismos de resultado que deben converger.
10. La i18n no valida cobertura de forma estricta.

## 12. Validaciones automatizables requeridas

Tras aplicar la migración, una prueba debe verificar:

1. 12 nodos funcionales oficiales;
2. cinco `Scenario` ejecutables;
3. dos inspecciones en el orden aprobado;
4. unicidad global de IDs;
5. existencia de las fuentes declaradas;
6. ausencia de referencias a biblioteca o archivo;
7. ausencia de `invierno_*`, `verano_*` y `resultado-beta` en el payload;
8. cobertura i18n de los cinco `Scenario`;
9. una entrada y un terminal;
10. ambas ramas alcanzables y convergentes;
11. ausencia de nodos huérfanos y ciclos;
12. uso compartido de `crisis-decision-ravine-fire` sin duplicación.

Archivo orientativo: `tests/vertical-beta-catalog.test.ts`.

## 13. Límites

Esta entrega fija catálogo, IDs, fuentes, correspondencias y desviaciones. No implementa `inheritedState`, umbrales, adaptación de escenas, retirada de archivos ni cambios del runtime.

#23 queda documentalmente satisfecha cuando este archivo está publicado, enlazado desde `docs/README.md` y aprobado como entrada de #14. El cumplimiento técnico se verificará después de las correcciones, que no pueden modificar esta selección sin una nueva decisión explícita de producto.
