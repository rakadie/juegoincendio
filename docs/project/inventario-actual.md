# Inventario actual del proyecto

Fecha de revisión: 26 de julio de 2026  
Repositorio revisado: `rakadie/juegoincendio`  
Rama base: `main`

## Criterios de clasificación

- **Existe y es aprovechable**: implementado o suficientemente definido para reutilizarse.
- **Existe, pero necesita revisión**: hay una base útil, aunque presenta deuda, inconsistencias o falta de validación.
- **Es solo documentación o propuesta**: está descrito, pero no materializado en el producto.
- **Falta implementar**: no se ha localizado una implementación funcional en la rama revisada.
- **Fuera del alcance de la beta**: decisión explícita de no incluirlo en la Vertical Beta 1.

## Resumen ejecutivo

El repositorio contiene tres capas de avance distintas:

1. **Documentación extensa de producto y arquitectura**, con visión, dominio, frontend, backend, datos, testing, DevOps y gobierno del proyecto.
2. **Contenido editorial estructurado**, con alrededor de cincuenta escenarios, variables, impactos, decisiones, textos revisables e internacionalización inicial.
3. **Un prototipo vertical funcional**, servido por Fastify y construido principalmente dentro de una página HTML/JavaScript, con prevención, primer aviso, crisis, decisiones, variables, resultados y reinicio.

El producto ya supera el estado de maqueta estática. La dirección acordada es consolidar la aplicación Fastify existente mediante una arquitectura modular, sin migrar en esta fase a Next.js ni separar frontend y backend.

La **Vertical Beta 1** queda definida como una partida ciudadana completa en dos momentos conectados:

- **Invierno:** prevención en viviendas, territorio y comunidad.
- **Verano:** actuación ante un incendio condicionada por lo realizado —o no realizado— durante el invierno.

El aprendizaje central es comprobar que la prevención cambia el margen operativo, los daños, la exposición de la población y la dificultad de las decisiones posteriores.

La gobernanza editorial queda dividida en tres responsabilidades: los escenarios TypeScript mandan sobre estructura y reglas; el catálogo i18n español manda sobre los textos publicados; y los documentos Markdown sirven para revisión y aprobación, pero no alimentan directamente el juego.

El dominio técnico oficial será ligero y estará centrado en una **`GameSession` o Partida**. Las reglas se extraerán de la interfaz a funciones TypeScript puras; los tipos de escena se unificarán progresivamente; `campaign.ts` declarará el flujo sin duplicar contenido; y el dominio de incendios activos con coordenadas se retirará por no formar parte de la experiencia narrativa de la beta.

---

## 1. Producto y alcance

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Concepto de serious game sobre incendios | Existe y es aprovechable | `README.md`, documentación y prototipo | La propuesta de valor está formulada. |
| Marca | Existe y es aprovechable | Decisión de producto | La marca oficial es **`¡Apaga las llamas!`**. Las referencias a `Guardián del Bosque` deben migrarse o archivarse. |
| Público principal | Existe y es aprovechable | Decisión de producto | La beta se dirige a ciudadanía. Gestores y estudiantes quedan como públicos secundarios. |
| Objetivo educativo | Existe y es aprovechable | Decisión de producto | Mostrar que la prevención de invierno modifica las condiciones y consecuencias de la emergencia de verano. |
| Estructura temporal | Existe y es aprovechable | `campaign.ts`, inspecciones y escenarios | Invierno y verano no son modos separados, sino dos momentos causales de una misma partida. |
| Vertical Beta 1 | Existe y es aprovechable | `docs/product/vertical-beta-1.md` | Recorrido oficial cerrado para la siguiente fase. |
| Duración objetivo | Existe, pero necesita validación | Definición de la beta | Referencia inicial: 20–25 minutos. Debe comprobarse con usuarios. |
| KPIs | Es solo documentación o propuesta | Documentación de producto | Falta convertirlos en métricas concretas de validación. |
| Modelo de publicación y explotación | Falta implementar | Issue #9 | Debe definirse el formato inicial y el proveedor de despliegue. |

### Recorrido oficial de la Vertical Beta 1

#### Introducción

1. Presentación del municipio, rol y objetivo.
2. Elección de avatar.

#### Fase 1 — Invierno: prevención

3. **Viviendas y edificios:** inspección mediante hotspots y selección limitada de actuaciones.
4. **Fincas, vegetación y combustible:** limpieza, accesos, quemas, pastoreo y continuidad vegetal.
5. **Comunidad preparada:** familias, población vulnerable, canales oficiales, visitantes y puntos de apoyo.
6. **Balance preventivo:** municipio preparado, preparación desigual o territorio vulnerable.

#### Transición invierno–verano

7. Declaración del incendio y presentación del estado heredado:
   - defensibilidad de viviendas;
   - continuidad del combustible;
   - accesibilidad;
   - preparación familiar;
   - población vulnerable identificada;
   - confianza ciudadana;
   - claridad de canales oficiales;
   - recursos disponibles.

#### Fase 2 — Verano: actuación

8. **Primer aviso:** verificación, movilización inicial y comunicación prudente.
9. **Escalada del incendio:** asignación limitada de medios.
10. **Cambio de viento:** amenaza a viviendas, evacuación y defensa operativa.
11. **Crisis de comunicación:** saturación del 112 y desinformación visual.
12. **Noche y agotamiento:** retirada de medios aéreos, defensa nocturna y relevo de equipos.
13. **Informe final causal:** relación entre prevención, actuación y consecuencias.

#### Desenlaces

- Respuesta favorable: la prevención proporciona margen operativo.
- Contención con daños: preparación parcial y decisiones correctivas.
- Emergencia desbordada: vulnerabilidades acumuladas y respuesta insuficiente.

#### Criterio de éxito del producto

Dos partidas con decisiones preventivas diferentes deben producir condiciones, dificultades y resultados claramente distintos durante el verano.

---

## 2. Escenarios y narrativa

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Catálogo de escenarios | Existe y es aprovechable | `src/content/scenarios/index.ts` | Hay aproximadamente 50 escenarios agrupados por prevención, comunicación y operaciones. |
| Tipado común | Existe y es aprovechable | `src/domain/types/scenario.ts` | Incluye opciones, impactos, requisitos, desbloqueos, acciones, combinaciones y resultados. |
| Pantallas preventivas | Existe y es aprovechable | `src/content/prevention-inspections.ts` | Son la base del invierno de la beta. |
| Balance preventivo y primer aviso | Existe y es aprovechable | `src/content/prevention-balance.ts` | Es el puente central entre invierno y verano. |
| Escenarios operativos de verano | Existe y es aprovechable | Escenarios `os-*` | Existe material suficiente para primer envío, escalado, viento, evacuación, noche y relevo. |
| Ruta de comunicación | Existe y es aprovechable | `CRISIS_ROUTE_MODULE`, `cs-018`, `cs-023` | Aporta saturación del 112 y desinformación. |
| Selección exacta de escenarios beta | Existe, pero necesita revisión | Vertical Beta 1 y catálogo | Debe fijarse el ID definitivo de cada escena y retirar duplicados. |
| Modelo unificado de escenas | Es solo documentación o propuesta | `docs/architecture/decision-game-domain.md` | Crear una unión tipada para decisiones, inspecciones, resúmenes, rutas y selección de acciones. |
| Grafo narrativo completo | Falta implementar | `nextLogic`, `routeLogic` parciales | Debe documentarse el flujo oficial y sus bifurcaciones. |
| Coherencia de IDs y categorías | Existe, pero necesita revisión | Historial de renombrados | Hay que localizar duplicados, escenarios huérfanos y saltos de numeración. |
| Validación experta | Falta implementar | Issue #10 | Debe definirse quién revisa el contenido operativo y cómo queda aprobado. |

## 3. Motor de juego y dominio

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Estado de partida actual | Existe y es aprovechable | `buildInitialState()` | Registra fases, recursos, terreno, inspecciones, crisis y resultado. Debe migrarse al contrato `GameSession`. |
| Dominio ligero centrado en `GameSession` | Es solo documentación o propuesta | `docs/architecture/decision-game-domain.md` | Es la arquitectura oficial para la beta y debe implementarse sin DDD/CQRS innecesarios. |
| Aplicación de impactos | Existe y es aprovechable | `applyVector`, impactos de escenarios | Debe extraerse como regla TypeScript pura y testeable. |
| Condiciones y transiciones | Existe y es aprovechable | `parseConditionExpression`, `scenarioNextStep` | Deben extraerse a un evaluador común de condiciones. |
| Herencia invierno–verano | Existe, pero necesita revisión | Balance y métricas agregadas | Debe formalizarse como `inheritedState` dentro de la partida. |
| Resultados dinámicos | Existe y es aprovechable | `finalizeCampaignResult()` | Debe migrarse a una regla de dominio que calcule el resultado desde el estado real. |
| Informe causal | Existe, pero necesita revisión | Resultado y logs actuales | Debe explicar qué decisión preventiva causó o evitó cada consecuencia relevante. |
| Flujo oficial de la beta | Es solo documentación o propuesta | `campaign.ts` y decisión de dominio | `campaign.ts` debe declarar orden y bifurcaciones sin repetir textos, opciones ni impactos. |
| Persistencia de partida | Falta implementar | No localizada | Añadir `localStorage` sobre un estado serializable de `GameSession`. |
| Motor separado de la interfaz | Falta implementar | Lógica embebida en `prototype-page.ts` | Extraer dominio, reglas y flujo a módulos TypeScript antes de rediseñar la interfaz. |
| Dominio de incidentes de ejemplo | Existe, pero necesita revisión | `FireIncident`, repositorio y query handler | La decisión es retirarlo: no representa la partida ni el territorio narrativo de la beta. |
| Motor narrativo y heurístico | Existe, pero necesita revisión | Variables, impactos y condiciones | Es la dirección oficial. Debe documentarse, implementarse como reglas puras y probarse. |
| Simulación física o celular | Fuera del alcance de la beta | Documentación avanzada | No se implementará en Vertical Beta 1. |

### Módulos de dominio acordados

```text
src/game/
├── domain/
│   ├── game-session.ts
│   ├── game-scene.ts
│   ├── game-state.ts
│   └── game-event.ts
├── rules/
│   ├── apply-decision.ts
│   ├── evaluate-condition.ts
│   ├── calculate-prevention.ts
│   ├── transition-to-summer.ts
│   └── calculate-result.ts
└── flow/
    └── vertical-beta-flow.ts
```

Operaciones principales previstas:

- `createGameSession()`
- `applyDecision()`
- `completeInspection()`
- `calculatePreventionBalance()`
- `transitionToSummer()`
- `resolveScenario()`
- `calculateFinalResult()`

## 4. Interfaz y experiencia de usuario

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Prototipo navegable | Existe y es aprovechable | `/`, `/prototype` | Incluye recorrido y resultados. |
| Playtest editorial | Existe y es aprovechable | `/game-content` | Útil para revisar escenarios de forma aislada. |
| Responsive inicial | Existe y es aprovechable | Media queries | Requiere validación real en móvil y escritorio. |
| Accesibilidad inicial | Existe, pero necesita revisión | Foco, diálogo, reducción de movimiento | Falta auditoría WCAG y pruebas completas con teclado. |
| Distinción visual invierno–verano | Existe, pero necesita revisión | Etapas actuales | Debe reforzarse sin romper la continuidad causal. |
| Componentización | Falta implementar | Dos archivos de interfaz muy grandes | Separar vistas, componentes, estado y eventos después de extraer el motor. |
| Sistema de diseño | Es solo documentación o propuesta | Estilos embebidos y referencias visuales | Crear tokens y componentes reutilizables. |
| Claridad informativa | Existe, pero necesita revisión | Textos largos y alta densidad | Jerarquizar contexto, decisión, consecuencias y ayuda. |
| Sonido | Falta implementar en la versión actual | No localizado | Secundario frente al motor y al recorrido. |

## 5. Mapa y territorio

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| SVG de inspección | Existe y es aprovechable | Prototipo preventivo | Buena base para hotspots. |
| Territorio ilustrado/SVG | Falta implementar | Decisión de producto | Solución oficial para la beta. |
| Estados invierno–verano del territorio | Falta implementar | No localizado | El mismo territorio debe mostrar prevención y consecuencias posteriores. |
| Capas narrativas | Falta implementar | No localizado | Zonas, carreteras, infraestructuras, población y recursos. |
| Perímetro de incendio | Falta implementar | No localizado | Resolver con geometrías SVG predefinidas y estados. |
| Movimiento de recursos | Falta implementar | No localizado | Resolver mediante posiciones y rutas narrativas SVG. |
| Datos geográficos reales | Fuera del alcance de la beta | Sin PostGIS ni datasets | No son necesarios para validar el aprendizaje. |
| MapLibre / Turf / PostGIS | Fuera del alcance de la beta | Documentación técnica | Reconsiderar solo en una fase posterior. |

## 6. Contenidos editoriales e internacionalización

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Escenarios TypeScript | Existe y es aprovechable | `src/content/scenarios/` | Son la fuente de verdad de estructura, IDs, opciones, impactos, requisitos, flags, desbloqueos y transiciones. |
| Catálogo i18n español | Existe y es aprovechable | `src/content/i18n/es/scenarios.ts` | Es la fuente de verdad de los textos publicados: títulos, contexto, preguntas, feedback y piezas narrativas. |
| Documentos Markdown de revisión | Existe y es aprovechable | `docs/revision-textos/` | Son el espacio de revisión, comentarios y aprobación editorial; no constituyen una fuente ejecutable del juego. |
| Script de extracción | Existe, pero necesita revisión | `scripts/extract-scenario-i18n.ts` | No debe sobrescribir el catálogo aprobado. Debe generar una base nueva, detectar campos ausentes o validar sincronización. |
| Flujo editorial combinado | Existe y es aprovechable | Decisión de producto | TypeScript gobierna reglas; i18n gobierna textos; Markdown documenta revisión y aprobación. |
| Sincronización y trazabilidad | Falta implementar | No hay automatización completa | Añadir validaciones para detectar IDs o campos desalineados y registrar qué revisión Markdown se ha incorporado al catálogo. |
| Codificación UTF-8 | Existe, pero necesita revisión | Textos sin tildes o dañados | Requiere limpieza y pruebas automáticas. |
| Segundo idioma | Fuera del alcance de la beta | Solo español | No es prioritario para Vertical Beta 1. |

## 7. Recursos gráficos e iconografía

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Imágenes principales | Existe y es aprovechable | `public/images/` | Funcionan como apoyo visual y referencia. |
| Avatares | Existe y es aprovechable | Tres PNG | Ya están integrados. |
| Iconografía funcional | Existe, pero necesita revisión | Emojis y símbolos | No constituye una familia final ni accesible. |
| Sistema de iconos SVG | Falta implementar | No localizado | Debe coordinarse con el territorio ilustrado. |
| Gestión de assets | Existe, pero necesita revisión | Rutas individuales Fastify | Servir `public` de forma estática y documentar origen. |
| Licencias y atribución | Falta implementar | No localizado | Necesario antes de publicación. |

## 8. Backend, API y datos

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Servidor Fastify | Existe y es aprovechable | `server.ts`, `app.ts` | Base técnica oficial. |
| Aplicación Fastify modular | Existe, pero necesita revisión | Estructura TypeScript y decisión de dominio | Fastify servirá vistas y contenido, pero no contendrá las reglas del juego. |
| Healthcheck | Existe y es aprovechable | `/health` | Básico y funcional. |
| Endpoint de contenido | Existe y es aprovechable | `/game-content/data` | Entrega variables, escenarios y campaña. Debe adaptarse al flujo y tipos unificados. |
| Endpoint de incendios activos | Existe, pero necesita revisión | `/fires/active` | Se retirará junto con el dominio `FireIncident`, al ser código de ejemplo desconectado de la beta. |
| Persistencia PostgreSQL/PostGIS | Fuera del alcance de la beta | No implementada | No necesaria para la primera beta. |
| Redis y bus de eventos | Fuera del alcance de la beta | Solo documentación | No necesarios. |
| Autenticación y cuentas | Fuera del alcance de la beta | No implementadas | No necesarias para una beta sin usuarios registrados. |

## 9. Pruebas y calidad

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Vitest configurado | Existe y es aprovechable | `package.json` | Base para pruebas. |
| Tests unitarios del motor | Falta implementar o no localizados | No localizados | Cubrir cada regla pura del nuevo dominio. |
| Tests de integración HTTP | Falta implementar o no localizados | No localizados | Cubrir contenido, inicio y rutas principales. |
| Tests end-to-end | Falta implementar | No Playwright activo | Cubrir al menos dos partidas preventivas diferentes. |
| Typecheck y build | Existe y es aprovechable | Scripts disponibles | Deben ejecutarse en CI. |
| CI | Falta implementar | Sin checks activos verificados | Añadir GitHub Actions para typecheck, build y tests. |
| Validación del objetivo educativo | Falta implementar | Issue #10 | Comprobar que el usuario entiende la relación prevención–impacto. |
| Validación editorial automatizada | Falta implementar | No localizada | Comprobar IDs, claves i18n, textos ausentes y divergencias antes de integrar cambios. |

## 10. Despliegue y operación

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Ejecución local | Existe y es aprovechable | Scripts npm | Base suficiente para desarrollo. |
| Despliegue de una app Fastify | Falta implementar | Issue #9 | Elegir un proveedor compatible con una única aplicación. |
| Separación Railway + Vercel | Fuera del alcance de la beta | Documentación previa | No es necesaria al mantener una sola aplicación. |
| Docker | No prioritario | No localizado | Evaluar solo si facilita el despliegue elegido. |
| Publicación automatizada | Falta implementar | Sin CI/CD activo | Incorporar después de estabilizar la rama. |

## 11. Documentación y gestión

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Índice documental | Existe y es aprovechable | `docs/README.md` | Buena navegación. |
| Inventario actual | Existe y es aprovechable | Este documento | Debe mantenerse vivo tras cada decisión de alcance. |
| Especificación Vertical Beta 1 | Existe y es aprovechable | `docs/product/vertical-beta-1.md` | Define el producto inicial oficial. |
| Decisión de dominio del juego | Existe y es aprovechable | `docs/architecture/decision-game-domain.md` | Define el dominio ligero centrado en partida y el plan de retirada del código de ejemplo. |
| Backlog previo | Existe, pero necesita revisión | `docs/project/backlog-pendiente.md` | Está orientado a una arquitectura más ambiciosa. |
| Material histórico | Existe, pero necesita revisión | `docs/legacy`, `buzon` | Separar vigente, referencia y archivo. |
| Issues como gestión | Existe, pero necesita revisión | Issues #9 y #10 | Ya se registran decisiones diferidas; falta trasladar el roadmap técnico cuando se apruebe. |
| Criterios de terminado | Es solo documentación o propuesta | Plantillas | Aplicarlos a los próximos hitos. |

---

## Decisiones de producto y arquitectura resueltas

1. **Marca:** `¡Apaga las llamas!`.
2. **Público principal:** ciudadanía.
3. **Objetivo educativo:** mostrar el impacto de la prevención sobre la emergencia posterior.
4. **Producto inicial:** Vertical Beta 1 en dos momentos conectados, invierno y verano.
5. **Arquitectura:** mantener y modularizar Fastify.
6. **Mapa:** territorio ilustrado/SVG.
7. **Motor:** reglas narrativas y heurísticas explicables.
8. **Fuente editorial:** TypeScript para estructura y reglas; catálogo i18n para textos publicados; Markdown para revisión y aprobación.
9. **Dominio:** modelo ligero centrado en `GameSession`; reglas TypeScript puras; escenas unificadas; `campaign.ts` como flujo; retirada de `FireIncident` y `/fires/active`.
10. **Simulación física, MapLibre y PostGIS:** fuera del alcance de la beta.

## Decisiones aún pendientes antes del roadmap

1. **Publicación — Issue #9:** formato de explotación y proveedor inicial.
2. **Validación — Issue #10:** quién revisará el rigor operativo y cómo se probará el aprendizaje con ciudadanía.

Estas decisiones están registradas como incidencias y no bloquean la especificación ni la implementación inicial del dominio del juego.

## Vacíos prioritarios

1. Fijar los IDs exactos de las escenas de la Vertical Beta 1.
2. Documentar el grafo narrativo completo invierno–verano.
3. Definir el contrato serializable de `GameSession` y del estado heredado entre fases.
4. Crear los módulos `domain`, `rules` y `flow` acordados.
5. Unificar progresivamente `Scenario`, `CampaignNode`, inspecciones, balances y rutas bajo tipos de escena comunes.
6. Convertir `campaign.ts` en la declaración del flujo oficial sin contenido duplicado.
7. Retirar `FireIncident`, su repositorio, query handler y `/fires/active`.
8. Extraer de `prototype-page.ts` la aplicación de impactos, condiciones, transición estacional y cálculo de resultados.
9. Crear pruebas que comparen partidas con prevención distinta.
10. Adaptar el script y el flujo editorial para proteger el catálogo i18n aprobado.
11. Añadir validaciones de sincronización entre escenarios, i18n y documentos de revisión.
12. Diseñar el territorio ilustrado/SVG con estados estacionales.
13. Añadir persistencia local.
14. Crear un informe final causal completo.
15. Configurar CI básico.

## Recomendación de siguiente hito

El siguiente hito debe convertir la Vertical Beta 1 acordada en una **especificación funcional ejecutable y un dominio mínimo testeable**:

- escena por escena;
- contrato de `GameSession`;
- variables que hereda el verano;
- condiciones y consecuencias;
- tipos comunes de escena;
- flujo oficial de la campaña;
- contenido que se conserva;
- contenido que queda fuera;
- criterios de aceptación y pruebas.

No debe iniciarse una migración de framework, un rediseño integral de interfaz ni una simulación geoespacial avanzada antes de completar y validar ese núcleo.