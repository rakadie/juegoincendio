# Vertical Beta 1 — Migración atómica de IDs e i18n

- Issue: #75
- Milestone: M2 — Motor modular
- Estado: integrado en `main` mediante PR #132
- Commit de integración: `fafa55eb42d41653a02431397afb9db66a094b4b`

## Objetivo

Completar el corte definitivo del runtime oficial hacia los 12 IDs canónicos y un catálogo i18n estricto, sin aliases ejecutables, modo dual ni fallback silencioso.

La biblioteca y el archivo conservan sus IDs históricos como patrimonio editorial. Esos IDs no se resuelven ni se traducen como nodos oficiales del jugador.

## IDs oficiales

El runtime contiene exactamente estos 12 nodos:

```text
intro-briefing-mission
prevention-inspection-territory-fuel
prevention-inspection-housing-interface
transition-summary-prevention
crisis-decision-first-alert
crisis-router-causal-map
crisis-decision-emergency-fuel-break
crisis-decision-access-blockage
crisis-decision-ravine-fire
crisis-decision-housing-defense
crisis-decision-crown-fire
ending-result-causal-report
```

Las cinco proyecciones `Scenario` del payload utilizan directamente sus IDs canónicos. No existe un mapa de aliases ni una función que acepte los IDs anteriores.

## Correspondencia histórica

Esta tabla actualiza el estado de ejecución de la correspondencia publicada en `vertical-beta-1-catalog.md`.

| Fuente histórica conservada | Nodo oficial canónico | Estado tras #75 |
|---|---|---|
| `s-000-introduccion` | `intro-briefing-mission` | Fuente archivada; el nodo oficial usa contenido canónico i18n. |
| `p-002-fincas-vegetacion-combustible` | `prevention-inspection-territory-fuel` | Inspección histórica archivada; contrato oficial independiente. |
| `p-001-viviendas-interfaz` | `prevention-inspection-housing-interface` | Inspección histórica archivada; contrato oficial independiente. |
| `balance-prevencion` | `transition-summary-prevention` | Sustituido en runtime por contenido declarativo canónico. |
| `s-040-primer-aviso-incendio` | `crisis-decision-first-alert` | El nodo oficial y su acción usan ID y traducción canónicos. |
| `m-001-apertura-tres-frentes` | `crisis-router-causal-map` | El router oficial solo resuelve `prepared` o `vulnerable`. |
| `s-025-cortafuego-emergencia` | `crisis-decision-emergency-fuel-break` | Fuente histórica archivada; no se importa desde runtime. |
| `s-011-corte-carretera-acceso` | `crisis-decision-access-blockage` | Fuente histórica archivada; no se importa desde runtime. |
| `s-027-fuego-en-barranco` | `crisis-decision-ravine-fire` | Fuente histórica archivada; existe un único nodo compartido. |
| `s-026-defensa-operativa-nucleo-viviendas` | `crisis-decision-housing-defense` | Fuente histórica archivada; no se importa desde runtime. |
| `s-030-fuego-de-copas` | `crisis-decision-crown-fire` | Fuente histórica archivada; no se importa desde runtime. |
| `resultado-beta` | `ending-result-causal-report` | Sentinela archivada; el resultado oficial tiene variantes `contained` y `overwhelmed`. |

Los cinco objetos históricos que antes alimentaban las escenas operativas se conservan en el archivo editorial. Las cinco proyecciones oficiales son nuevas unidades canónicas y no exponen los IDs anteriores.

## Contrato i18n

El catálogo oficial está en:

```text
src/content/i18n/es/vertical-beta.ts
```

Su contrato y validador están en:

```text
src/content/i18n/vertical-beta-i18n.ts
src/content/i18n/vertical-beta-locale.ts
```

Reglas:

1. `scenes` contiene exactamente los 12 IDs canónicos.
2. Cada nodo tiene `title` y `body` no vacíos.
3. Las dos inspecciones cubren exactamente sus ocho hotspots y actuaciones.
4. Las seis escenas de decisión cubren exactamente sus actuaciones oficiales.
5. El nodo final cubre `contained` y `overwhelmed`.
6. Las cinco dimensiones y las cinco relaciones causales tienen traducción.
7. Una traducción ausente o vacía falla en validación.
8. Un idioma no soportado produce `unsupported-locale`; no se usa español como fallback.
9. El runtime no deriva etiquetas desde IDs ni carga el catálogo histórico de escenarios.

## Fronteras finales

```text
runtime del jugador
→ IDs canónicos + catálogo i18n oficial

herramienta editorial
→ biblioteca candidata + archivo histórico + catálogos históricos
```

La migración no cambia decisiones preventivas, fórmulas, rutas, fixtures ni resultados. Solo elimina la convivencia activa entre identidad histórica e identidad canónica y hace obligatoria la cobertura editorial de la Vertical Beta 1.

## Evidencia integrada

- `npm audit`: 0 vulnerabilidades.
- `npm run test:contract`: 97/97.
- `npm test`: 106/106.
- `npm run typecheck`: correcto.
- `npm run build`: correcto.
- Revisión independiente Codex: tres P2 corregidos y resueltos antes de la fusión.
- Las dos partidas de referencia continúan terminando `contained` y `overwhelmed`.
