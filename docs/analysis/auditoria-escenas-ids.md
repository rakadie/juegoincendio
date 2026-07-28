# Auditoría del catálogo de escenas e IDs

Fecha: 26 de julio de 2026  
Issue: #20  
Rama auditada: `main`

## Objetivo

Localizar las fuentes narrativas que alimentan la Vertical Beta 1, registrar sus IDs y archivos, distinguir contenido alcanzable de contenido de biblioteca y señalar duplicidades, referencias especiales y riesgos de trazabilidad.

## Fuentes revisadas

- `src/content/scenarios/index.ts`
- `src/content/i18n/es/scenarios.ts`
- `src/content/i18n/scenario-i18n.ts`
- `src/content/prevention-inspections.ts`
- `src/content/prevention-balance.ts`
- `src/content/campaign.ts`
- `src/interfaces/http/prototype-page.ts`
- Escenarios que forman la cadena activa de crisis.
- Escenarios con solapamientos funcionales evidentes.

## Resumen ejecutivo

- El índice carga **51 escenarios `Scenario`**: 8 de comunicación, 30 de operaciones y 13 de prevención.
- No se ha localizado ningún **ID completo exactamente duplicado** dentro de los 51 escenarios importados.
- Solo **4 de los 51 escenarios** forman parte de la cadena realmente alcanzable de la beta actual.
- Otros **6 escenarios** están declarados como alternativas del selector de rutas, pero no pueden alcanzarse porque el prototipo fuerza siempre `ruta-comunicacion`.
- Los **41 escenarios restantes** funcionan como biblioteca editorial o contenido histórico y no tienen entrada desde el recorrido actual.
- La beta usa además 6 unidades de contenido fuera del catálogo `Scenario`: tres inspecciones `p-*`, el balance, el primer aviso `s-040-*` y el módulo de rutas `m-*`.
- `campaign.ts` mantiene 6 nodos paralelos (`invierno_1..3` y `verano_1..3`) que se cargan, pero las etapas `winter` y `summer` no aparecen en la navegación vigente.
- Existen varios solapamientos funcionales que deben resolverse en #22.
- El catálogo i18n aplica textos por ID, pero si falta una clave, el sistema conserva silenciosamente el texto original; no existe validación automática de cobertura.
- Se observan textos con caracteres dañados en varios escenarios y en el catálogo i18n. Es deuda editorial, aunque no invalida los IDs.

## Recorrido alcanzable actual

| Orden | ID o unidad | Tipo | Fuente | Estado |
|---:|---|---|---|---|
| 1 | `briefing` | Pantalla hardcodeada | `prototype-page.ts` | Activa |
| 2 | `p-001-viviendas-interfaz` | Inspección | `prevention-inspections.ts` | Activa |
| 3 | `p-002-fincas-vegetacion-combustible` | Inspección | `prevention-inspections.ts` | Activa |
| 4 | `p-003-comunidad-preparada` | Inspección | `prevention-inspections.ts` | Activa |
| 5 | `balance-prevencion` | Resumen | `prevention-balance.ts` | Activa |
| 6 | `s-040-primer-aviso-incendio` | Primera decisión de crisis | `prevention-balance.ts` | Activa, fuera de `NEW_GAME_SCENARIOS` |
| 7 | `m-001-apertura-tres-frentes` | Selector de ruta | `prevention-balance.ts` | Activo |
| 8 | `s-018-colapso-llamadas-112` | Acción múltiple | `scenarios/comunicacion/` | Activo |
| 9 | `s-023-imagen-antigua-viral` | Acción múltiple | `scenarios/comunicacion/` | Activo |
| 10 | `s-016-rumor-evacuacion-noroeste` | Acción múltiple | `scenarios/comunicacion/` | Activo |
| 11 | `s-010-cambio-viento-evacuacion` | Acción múltiple | `scenarios/operaciones/` | Activo |
| 12 | `resultado-beta` | Sentinela, no escenario registrado | `prototype-page.ts` | Cierra en resultado hardcodeado |

La cadena de crisis es determinista en la implementación actual:

```text
s-018-colapso-llamadas-112
  → s-023-imagen-antigua-viral
  → s-016-rumor-evacuacion-noroeste
  → s-010-cambio-viento-evacuacion
  → resultado-beta
```

## Escenarios declarados por el selector, pero no alcanzables

El módulo `m-001-apertura-tres-frentes` declara alternativas condicionadas por métricas y flags. Sin embargo, `activeCrisisRoute()` busca primero `ruta-comunicacion` y la devuelve de forma incondicional. Por ello las condiciones posteriores no se evalúan.

| Ruta o zona | Escenario declarado | Situación actual |
|---|---|---|
| Territorio y accesos | `s-011-corte-carretera-acceso` | No alcanzable |
| Territorio y accesos | `s-033-senderistas-desorientados-humo` | No alcanzable |
| Territorio y accesos | `s-027-fuego-en-barranco` | No alcanzable |
| Población en riesgo | `s-034-vecinos-sin-medios-para-salir` | No alcanzable |
| Población en riesgo | `s-022-evacuacion-con-mascotas` | No alcanzable |
| Población en riesgo | `s-031-confinamiento-extremo-fuego-copas` | No alcanzable |

`m-001` también enlaza `s-010-cambio-viento-evacuacion`, pero esta escena sí se alcanza más tarde desde la cadena de comunicación.

## Catálogo importado

| ID | Grupo fuente | Archivo | Estado de alcance |
|---|---|---|---|
| `s-000-introduccion` | comunicacion | `src/content/scenarios/comunicacion/cs-000-introduccion.ts` | Biblioteca / no alcanzable |
| `s-000b-avatar-emergencias` | comunicacion | `src/content/scenarios/comunicacion/cs-000b-avatar-emergencias.ts` | Biblioteca / no alcanzable |
| `s-008-campana-sector-primario` | comunicacion | `src/content/scenarios/comunicacion/cs-008-campana-sector-primario.ts` | Biblioteca / no alcanzable |
| `s-013-simulacro-escolar` | comunicacion | `src/content/scenarios/comunicacion/cs-013-simulacro-escolar.ts` | Biblioteca / no alcanzable |
| `s-016-rumor-evacuacion-noroeste` | comunicacion | `src/content/scenarios/comunicacion/cs-016-rumor-evacuacion-noroeste.ts` | Activo en beta |
| `s-018-colapso-llamadas-112` | comunicacion | `src/content/scenarios/comunicacion/cs-018-colapso-llamadas-112.ts` | Activo en beta |
| `s-023-imagen-antigua-viral` | comunicacion | `src/content/scenarios/comunicacion/cs-023-imagen-antigua-viral.ts` | Activo en beta |
| `s-024-presion-mediatica-zona-caliente` | comunicacion | `src/content/scenarios/comunicacion/cs-024-presion-mediatica-zona-caliente.ts` | Biblioteca / no alcanzable |
| `s-008b-riesgo-extremo-verano` | operaciones | `src/content/scenarios/operaciones/os-008b-riesgo-extremo-verano.ts` | Biblioteca / no alcanzable |
| `s-009-primer-envio-medios` | operaciones | `src/content/scenarios/operaciones/os-009-primer-envio-medios.ts` | Biblioteca / no alcanzable |
| `s-009b-escalado-incendio` | operaciones | `src/content/scenarios/operaciones/os-009b-escalado-incendio.ts` | Biblioteca / no alcanzable |
| `s-009c-continuidad-incendio` | operaciones | `src/content/scenarios/operaciones/os-009c-continuidad-incendio.ts` | Biblioteca / no alcanzable |
| `s-010-cambio-viento-evacuacion` | operaciones | `src/content/scenarios/operaciones/os-010-cambio-viento-evacuacion.ts` | Activo en beta |
| `s-010b-defensa-nucleo-viviendas` | operaciones | `src/content/scenarios/operaciones/os-010b-defensa-nucleo-viviendas.ts` | Biblioteca / no alcanzable |
| `s-010b2-foco-secundario-por-radio` | operaciones | `src/content/scenarios/operaciones/os-010b2-foco-secundario-por-radio.ts` | Biblioteca / no alcanzable |
| `s-010c-ataque-zona-secundaria` | operaciones | `src/content/scenarios/operaciones/os-010c-ataque-zona-secundaria.ts` | Biblioteca / no alcanzable |
| `s-010c2-refuerzo-ume-viviendas` | operaciones | `src/content/scenarios/operaciones/os-010c2-refuerzo-ume-viviendas.ts` | Biblioteca / no alcanzable |
| `s-010d-zona-barranco` | operaciones | `src/content/scenarios/operaciones/os-010d-zona-barranco.ts` | Biblioteca / no alcanzable |
| `s-011-corte-carretera-acceso` | operaciones | `src/content/scenarios/operaciones/os-011-corte-carretera-acceso.ts` | Candidato de ruta no alcanzable |
| `s-012-fallo-comunicaciones-radio` | operaciones | `src/content/scenarios/operaciones/os-012-fallo-comunicaciones-radio.ts` | Biblioteca / no alcanzable |
| `s-012-rescate-zona-peligrosa` | operaciones | `src/content/scenarios/operaciones/os-012-rescate-zona-peligrosa.ts` | Biblioteca / no alcanzable |
| `s-014-finca-ganadera-atrapada` | operaciones | `src/content/scenarios/operaciones/os-014-finca-ganadera-atrapada.ts` | Biblioteca / no alcanzable |
| `s-019-apagon-plena-emergencia` | operaciones | `src/content/scenarios/operaciones/os-019-apagon-plena-emergencia.ts` | Biblioteca / no alcanzable |
| `s-020-fuego-amenaza-subestacion-electrica` | operaciones | `src/content/scenarios/operaciones/os-020-fuego-amenaza-subestacion-electrica.ts` | Biblioteca / no alcanzable |
| `s-021-humo-viento-helicopteros-tierra` | operaciones | `src/content/scenarios/operaciones/os-021-humo-viento-helicopteros-tierra.ts` | Biblioteca / no alcanzable |
| `s-022-evacuacion-con-mascotas` | operaciones | `src/content/scenarios/operaciones/os-022-evacuacion-con-mascotas.ts` | Candidato de ruta no alcanzable |
| `s-023-centro-mayores-riesgo` | operaciones | `src/content/scenarios/operaciones/os-023-centro-mayores-riesgo.ts` | Biblioteca / no alcanzable |
| `s-024-quema-tecnica` | operaciones | `src/content/scenarios/operaciones/os-024-quema-tecnica.ts` | Biblioteca / no alcanzable |
| `s-025-cortafuego-emergencia` | operaciones | `src/content/scenarios/operaciones/os-025-cortafuego-emergencia.ts` | Biblioteca / no alcanzable |
| `s-026-defensa-operativa-nucleo-viviendas` | operaciones | `src/content/scenarios/operaciones/os-026-defensa-operativa-nucleo-viviendas.ts` | Biblioteca / no alcanzable |
| `s-027-fuego-en-barranco` | operaciones | `src/content/scenarios/operaciones/os-027-fuego-en-barranco.ts` | Candidato de ruta no alcanzable |
| `s-028-defensa-nocturna-perimetro` | operaciones | `src/content/scenarios/operaciones/os-028-defensa-nocturna-perimetro.ts` | Biblioteca / no alcanzable |
| `s-029-relevo-cuadrillas-agotadas` | operaciones | `src/content/scenarios/operaciones/os-029-relevo-cuadrillas-agotadas.ts` | Biblioteca / no alcanzable |
| `s-030-fuego-de-copas` | operaciones | `src/content/scenarios/operaciones/os-030-fuego-de-copas.ts` | Biblioteca / no alcanzable |
| `s-031-confinamiento-extremo-fuego-copas` | operaciones | `src/content/scenarios/operaciones/os-031-confinamiento-extremo-fuego-copas.ts` | Candidato de ruta no alcanzable |
| `s-032-casas-diseminadas-monte` | operaciones | `src/content/scenarios/operaciones/os-032-casas-diseminadas-monte.ts` | Biblioteca / no alcanzable |
| `s-033-senderistas-desorientados-humo` | operaciones | `src/content/scenarios/operaciones/os-033-senderistas-desorientados-humo.ts` | Candidato de ruta no alcanzable |
| `s-034-vecinos-sin-medios-para-salir` | operaciones | `src/content/scenarios/operaciones/os-034-vecinos-sin-medios-para-salir.ts` | Candidato de ruta no alcanzable |
| `s-000c-contexto-prevencion-otono` | prevencion | `src/content/scenarios/prevencion/ps-000c-contexto-prevencion-otono.ts` | Biblioteca / no alcanzable |
| `s-000d-quemas-prescritas-otono` | prevencion | `src/content/scenarios/prevencion/ps-000d-quemas-prescritas-otono.ts` | Biblioteca / no alcanzable |
| `s-002b-asesoramiento-terrenos` | prevencion | `src/content/scenarios/prevencion/ps-002b-asesoramiento-terrenos.ts` | Biblioteca / no alcanzable |
| `s-004-quemas-agricolas` | prevencion | `src/content/scenarios/prevencion/ps-004-quemas-agricolas.ts` | Biblioteca / no alcanzable |
| `s-005-recoleccion-monte` | prevencion | `src/content/scenarios/prevencion/ps-005-recoleccion-monte.ts` | Biblioteca / no alcanzable |
| `s-006-hogueras-monte` | prevencion | `src/content/scenarios/prevencion/ps-006-hogueras-monte.ts` | Biblioteca / no alcanzable |
| `s-007-evacuacion-ciudadania` | prevencion | `src/content/scenarios/prevencion/ps-007-evacuacion-ciudadania.ts` | Biblioteca / no alcanzable |
| `s-014-red-agua-rural` | prevencion | `src/content/scenarios/prevencion/ps-014-red-agua-rural.ts` | Biblioteca / no alcanzable |
| `s-035-limpieza-alrededor-viviendas` | prevencion | `src/content/scenarios/prevencion/ps-035-limpieza-alrededor-viviendas.ts` | Biblioteca / no alcanzable |
| `s-036-defensa-pasiva-vivienda` | prevencion | `src/content/scenarios/prevencion/ps-036-defensa-pasiva-vivienda.ts` | Biblioteca / no alcanzable |
| `s-037-plan-familiar-emergencia` | prevencion | `src/content/scenarios/prevencion/ps-037-plan-familiar-emergencia.ts` | Biblioteca / no alcanzable |
| `s-038-eleccion-vegetacion-finca` | prevencion | `src/content/scenarios/prevencion/ps-038-eleccion-vegetacion-finca.ts` | Biblioteca / no alcanzable |
| `s-039-uso-maquinaria-epoca-riesgo` | prevencion | `src/content/scenarios/prevencion/ps-039-uso-maquinaria-epoca-riesgo.ts` | Biblioteca / no alcanzable |

## Colisiones numéricas

No son duplicados completos porque los slugs son distintos, pero el número inicial no identifica una escena de manera unívoca:

| Base | IDs afectados |
|---|---|
| `000` | `s-000-*`, `s-000b-*`, `s-000c-*`, `s-000d-*` |
| `008` | `s-008-*`, `s-008b-*` |
| `009` | `s-009-*`, `s-009b-*`, `s-009c-*` |
| `010` | `s-010-*`, `s-010b-*`, `s-010b2-*`, `s-010c-*`, `s-010c2-*`, `s-010d-*` |
| `012` | `s-012-fallo-comunicaciones-radio`, `s-012-rescate-zona-peligrosa` |
| `014` | `s-014-finca-ganadera-atrapada`, `s-014-red-agua-rural` |
| `023` | `s-023-imagen-antigua-viral`, `s-023-centro-mayores-riesgo` |
| `024` | `s-024-presion-mediatica-zona-caliente`, `s-024-quema-tecnica` |

Conclusión: el ID completo es único, pero la numeración heredada no debe seguir utilizándose como orden del recorrido.

## Solapamientos funcionales prioritarios

| Escenario antiguo o breve | Escenario más completo | Propuesta para #22 |
|---|---|---|
| `s-010b-defensa-nucleo-viviendas` | `s-026-defensa-operativa-nucleo-viviendas` | Conservar el segundo y archivar o fusionar el primero |
| `s-010d-zona-barranco` | `s-027-fuego-en-barranco` | Conservar el segundo y archivar o fusionar el primero |
| `s-024-quema-tecnica` | `s-025-cortafuego-emergencia` | Comparar opción por opción; son prácticamente la misma función narrativa |
| Escenarios preventivos `s-035` a `s-038`, `s-004`, `s-007`, `s-013` | Inspecciones `p-001` a `p-003` | Usarlos como material editorial, no como segunda ruta jugable paralela |
| `invierno_1..3` y `verano_1..3` | Inspecciones + cadena de crisis actual | Retirar del flujo oficial tras confirmar que no queda ninguna dependencia |

## Referencias y trazabilidad

### Referencias válidas dentro de la cadena activa

- `s-018` dirige a `s-023-imagen-antigua-viral`.
- `s-023-imagen-antigua-viral` dirige a `s-016-rumor-evacuacion-noroeste`.
- `s-016-rumor-evacuacion-noroeste` dirige a `s-010-cambio-viento-evacuacion`.
- `s-010-cambio-viento-evacuacion` dirige a `resultado-beta`.
- El prototipo trata `resultado-beta` explícitamente como cierre y no intenta resolverlo como `Scenario`.

### Referencias especiales o inconsistentes

1. `s-040-primer-aviso-incendio` usa prefijo `s-*`, pero no pertenece a `BASE_GAME_SCENARIOS`; vive en `prevention-balance.ts`.
2. `p-*`, `m-*`, `balance-*`, `invierno_*`, `verano_*` y `resultado-beta` utilizan convenciones diferentes.
3. `unlocks` existe en el modelo, pero el prototipo navega principalmente mediante `nextLogic` y búsqueda por ID.
4. El selector de rutas contiene lógica condicionada que ahora queda anulada por una preferencia hardcodeada.
5. El briefing y el resultado se identifican por etapa de interfaz, no como escenas de contenido.
6. El catálogo i18n no falla cuando falta un ID: usa el contenido TypeScript original, por lo que una omisión puede pasar inadvertida.

## Estado editorial

| Estado | Alcance |
|---|---|
| Activo y necesario | Inspecciones, balance, primer aviso, módulo de rutas y cadena `s-018 → s-023 → s-016 → s-010` |
| Candidato para el recorrido | Los seis escenarios enlazados desde rutas actualmente no alcanzables |
| Biblioteca editorial | Resto de los 51 escenarios importados |
| Candidato a fusión o archivo | Pares funcionalmente solapados y seis nodos antiguos de `campaign.ts` |
| Revisión textual necesaria | Fuentes y claves i18n con caracteres dañados |

## Decisiones que debe tomar #21

La convención canónica debería:

- codificar fase y función, no una posición numérica histórica;
- distinguir escenas, inspecciones, resúmenes, selectores y finales;
- mantener el ID independiente del idioma y del título;
- permitir alias temporales durante la migración;
- reservar un ID real para el resultado final o declarar formalmente que es un nodo de flujo, no un escenario.

Ejemplo orientativo:

```text
intro-mission
winter-home-inspection
winter-land-inspection
winter-community-inspection
transition-prevention-balance
summer-first-alert
summer-route-selector
summer-comms-112
summer-comms-viral-image
summer-comms-evacuation-rumor
summer-evacuation-wind-change
ending-causal-report
```

## Decisiones que debe tomar #22

1. Confirmar si la beta mantiene la ruta de comunicación como tronco obligatorio o activa rutas condicionadas.
2. Elegir entre `s-010b` y `s-026`.
3. Elegir entre `s-010d` y `s-027`.
4. Fusionar o diferenciar `s-024` y `s-025`.
5. Decidir el papel de los 13 escenarios preventivos frente a las tres inspecciones.
6. Archivar los seis nodos antiguos de `campaign.ts` o justificar su permanencia.
7. Determinar si introducción, avatar y resultado pasan a ser contenido declarativo.
8. Definir qué escenarios quedan como biblioteca fuera de la Vertical Beta 1.

## Criterios de cierre de #20

- [x] Se han identificado todas las fuentes narrativas principales.
- [x] Se han registrado los 51 escenarios importados y su archivo.
- [x] Se han identificado las unidades de contenido fuera del catálogo.
- [x] Se ha documentado el recorrido realmente alcanzable.
- [x] Se han identificado candidatos no alcanzables, contenido de biblioteca y nodos paralelos.
- [x] Se han señalado colisiones numéricas, referencias especiales y solapamientos funcionales.
- [ ] La validación automática de unicidad, cobertura i18n y referencias se implementará en #23.
