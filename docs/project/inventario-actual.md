# Inventario actual del proyecto

Fecha de revisión: 26 de julio de 2026  
Repositorio revisado: `rakadie/juegoincendio`  
Rama base: `main`

## Criterios de clasificación

- **Existe y es aprovechable**: implementado o suficientemente definido para reutilizarse.
- **Existe, pero necesita revisión**: hay una base útil, aunque presenta deuda, inconsistencias o falta de validación.
- **Es solo documentación o propuesta**: está descrito, pero no materializado en el producto.
- **Falta implementar**: no se ha localizado una implementación funcional en la rama revisada.

## Resumen ejecutivo

El repositorio contiene tres capas de avance distintas:

1. **Documentación extensa de producto y arquitectura**, con visión, dominio, frontend, backend, datos, testing, DevOps y gobierno del proyecto.
2. **Contenido editorial estructurado**, con alrededor de cincuenta escenarios, variables, impactos, decisiones, textos revisables e internacionalización inicial.
3. **Un prototipo vertical funcional**, servido por Fastify y construido dentro de una única página HTML/JavaScript, con prevención, primer aviso, crisis, decisiones, variables, resultados y reinicio.

El producto ya supera el estado de maqueta estática. Sin embargo, la arquitectura objetivo documentada —Next.js, React, Zustand, MapLibre, PostgreSQL/PostGIS, Redis, CQRS completo y despliegue distribuido— no está implementada. El juego funcional actual vive principalmente dentro de `src/interfaces/http/prototype-page.ts`, mientras que el dominio TypeScript separado solo cubre un ejemplo mínimo de incidentes activos.

La prioridad no debería ser añadir más arquitectura ni más pantallas, sino consolidar la beta vertical existente: separar motor, interfaz y contenido; definir el alcance real del MVP; eliminar duplicidades; añadir pruebas; y decidir qué partes de la arquitectura objetivo son necesarias ahora.

---

## 1. Producto y alcance

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Concepto de serious game sobre incendios | Existe y es aprovechable | `README.md`, `docs/product/vision-and-scope.md` | La propuesta de valor está formulada. |
| Bucle prevención → crisis → resultado | Existe y es aprovechable | `src/content/campaign.ts`, `prototype-page.ts` | Ya hay una beta vertical navegable. |
| Público objetivo | Existe, pero necesita revisión | `docs/product/vision-and-scope.md` | Mezcla gestores, estudiantes y ciudadanía. Hay que elegir un público principal para el MVP. |
| Objetivo educativo | Existe, pero necesita revisión | Documentación de producto y escenarios | Conviven formación técnica, sensibilización ciudadana y divulgación. Debe priorizarse uno. |
| Nombre e identidad del producto | Existe, pero necesita revisión | `Guardián del Bosque` en documentación y `¡Apaga las llamas!` en interfaz | Hay dos nombres de producto. Debe decidirse marca principal y posible subtítulo. |
| Alcance del MVP | Es solo documentación o propuesta | Varias especificaciones | Hay propuestas diferentes: ciclo estacional, beta de comunicación, prevención y simulación geoespacial. Falta cerrar un único alcance. |
| KPIs | Es solo documentación o propuesta | `docs/product/vision-and-scope.md` | No hay analítica implementada. |
| Modelo de publicación y explotación | Falta implementar | No localizado | Debe definirse si será demostrador, producto educativo, licencia institucional o publicación editorial. |

## 2. Escenarios y narrativa

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Catálogo de escenarios | Existe y es aprovechable | `src/content/scenarios/index.ts` | Hay aproximadamente 50 escenarios agrupados por prevención, comunicación y operaciones. |
| Tipado común de escenarios | Existe y es aprovechable | `src/domain/types/scenario.ts` | Incluye opciones, impactos, requisitos, desbloqueos, acciones, combinaciones y resultados. |
| Ruta vertical de comunicación | Existe y es aprovechable | `CRISIS_ROUTE_MODULE`, escenarios de comunicación | Tiene selección limitada de acciones, métricas y transición entre escenas. |
| Pantallas preventivas | Existe y es aprovechable | `src/content/prevention-inspections.ts` | Hay hotspots, acciones, límites, flags, combinaciones y consecuencias diferidas. |
| Primer aviso y balance preventivo | Existe y es aprovechable | `src/content/prevention-balance.ts` y documentación asociada | Conecta las decisiones preventivas con la crisis. |
| Árbol narrativo global | Existe, pero necesita revisión | `nextLogic`, `routeLogic`, campaña | Hay ramificación parcial, pero no un grafo único y documentado de toda la experiencia. |
| Coherencia de IDs, nombres y categorías | Existe, pero necesita revisión | Historial de renombrados y archivos eliminados | Conviene validar duplicados, saltos de numeración y escenarios huérfanos. |
| Validación experta | Falta implementar | No localizada como proceso cerrado | Hay notas de fuentes, pero no consta aprobación formal por especialistas. |
| Versionado editorial | Existe, pero necesita revisión | `docs/revision-textos/`, `src/content/i18n/` | Buena base, aunque hay caracteres dañados y duplicidad entre textos fuente y plantilla. |

## 3. Motor de juego y dominio

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Estado de partida | Existe y es aprovechable | `buildInitialState()` en `prototype-page.ts` | Registra fases, recursos, terreno, inspecciones, crisis y resultado. |
| Aplicación de impactos y límites | Existe y es aprovechable | `applyVector`, métricas de inspección y crisis | Ya existen reglas operativas simples. |
| Condiciones y transiciones | Existe y es aprovechable | `parseConditionExpression`, `scenarioNextStep`, `routeConditionMatches` | Hay evaluación de condiciones declarativas. |
| Resultados dinámicos | Existe y es aprovechable | `finalizeCampaignResult()` | Calcula protección, daños, confianza y capacidad operativa. |
| Reinicio de partida | Existe y es aprovechable | `buildInitialState()` y botón de reinicio | Funcional en memoria. |
| Persistencia de partida | Falta implementar | No localizada | No hay `localStorage`, base de datos ni sincronización. |
| Motor desacoplado de la interfaz | Falta implementar | La lógica principal está embebida en `prototype-page.ts` | Debe extraerse a módulos TypeScript testeables. |
| Dominio separado de incidentes | Existe, pero necesita revisión | `FireIncident`, repositorio en memoria, query handler | Es un ejemplo aislado y no gobierna la partida real. Debe integrarse o retirarse. |
| Simulación geoespacial / propagación | Es solo documentación o propuesta | Arquitectura, dominio y backlog | No hay grilla, autómata celular ni cálculo espacial implementado. |
| Eventos de dominio auditables | Es solo documentación o propuesta | `docs/domain/game-design-spec.md` | La interfaz guarda logs, pero no existe un event store o modelo de eventos de dominio. |

## 4. Interfaz y experiencia de usuario

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Prototipo web navegable | Existe y es aprovechable | `/` y `/prototype`, `prototype-page.ts` | Incluye seis etapas, decisiones y resultados. |
| Playtest de escenarios | Existe y es aprovechable | `/game-content`, `game-content-page.ts` | Herramienta útil para revisar contenidos de forma aislada. |
| Diseño responsive inicial | Existe y es aprovechable | Media queries en ambas páginas | Hay adaptación a tablet y móvil. |
| Accesibilidad inicial | Existe, pero necesita revisión | Foco visible, diálogo, reducción de movimiento | Falta auditoría WCAG, semántica completa y pruebas con teclado/lector. |
| Componentización | Falta implementar | HTML, CSS y JS concentrados en dos archivos grandes | Debe dividirse por componentes y responsabilidades. |
| Sistema de diseño reutilizable | Es solo documentación o propuesta | Mockups e iconografía, estilos embebidos | No hay tokens ni componentes compartidos. |
| Claridad de información | Existe, pero necesita revisión | Mucha información y textos largos | Necesita prueba de usabilidad y jerarquía por fase. |
| Estados de carga y error | Existe y es aprovechable | `contentStatus`, `contentError` | Implementación básica. |
| Sonido y narrativa audiovisual | Falta implementar en esta versión | No localizado en la rama revisada | Puede existir en prototipos históricos, pero no en la beta actual. |

## 5. Mapa y territorio

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Representación visual del territorio | Existe, pero necesita revisión | SVG de inspección e imagen de crisis | Sirve para prototipo, no para simulación territorial. |
| Hotspots interactivos | Existe y es aprovechable | `prevention-inspections.ts` y SVG de interfaz | Buena base para decisiones localizadas. |
| Capas cartográficas | Falta implementar | No hay MapLibre ni GeoJSON operativo | Documentado, pero no materializado. |
| Perímetro dinámico del incendio | Falta implementar | No localizado | El fuego cambia como métricas, no como geometría. |
| Movimiento de recursos | Falta implementar | No localizado | No hay rutas, posiciones ni tiempos espaciales. |
| Datos geográficos reales | Falta implementar | No hay PostGIS ni datasets activos | Debe decidirse si el MVP necesita territorio real o ficticio. |
| MapLibre / Turf | Es solo documentación o propuesta | `docs/frontend/frontend-spec.md` | No aparece en dependencias ni código actual. |

## 6. Contenidos editoriales e internacionalización

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Contenidos separados parcialmente | Existe y es aprovechable | `src/content/scenarios/`, `campaign.ts` | Los escenarios están fuera de la interfaz. |
| Plantilla i18n de escenarios | Existe y es aprovechable | `src/content/i18n/es/scenarios.ts` | Permite editar textos sin alterar la estructura del escenario. |
| Script de extracción | Existe y es aprovechable | `scripts/extract-scenario-i18n.ts` | Facilita regenerar catálogo editorial. |
| Guía de revisión de textos | Existe y es aprovechable | `docs/revision-textos/` | Útil para revisión no técnica. |
| Fuente única de verdad editorial | Existe, pero necesita revisión | Escenarios base + catálogo i18n + documentos de revisión | Debe definirse qué archivo manda y cómo se sincroniza. |
| Codificación de caracteres | Existe, pero necesita revisión | Se observan textos con `?` o sin tildes | Requiere limpieza UTF-8 y pruebas. |
| Segundo idioma | Falta implementar | Solo catálogo español | La arquitectura lo permite, pero no hay otra traducción. |

## 7. Recursos gráficos e iconografía

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Imágenes principales | Existe y es aprovechable | `public/images/operational-command-hero.png`, `gameplay-wildfire-scene.png`, `primer-aviso-humo.png` | Funcionan como fondos y apoyo visual. |
| Avatares | Existe y es aprovechable | Tres PNG de perfil forestal | Integrados como rutas HTTP. |
| Iconografía funcional | Existe, pero necesita revisión | Emojis y símbolos embebidos | No constituye una familia visual propia ni accesible. |
| Sistema de iconos SVG | Falta implementar | No localizado | Debe crearse si se mantiene la dirección visual propuesta. |
| Gestión de assets | Existe, pero necesita revisión | Rutas individuales en Fastify | Conviene servir `public` de forma estática y documentar licencias/origen. |
| Licencias y atribución | Falta implementar | No localizado | Debe registrarse para publicación. |

## 8. Backend, API y datos

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Servidor Fastify | Existe y es aprovechable | `src/interfaces/http/server.ts`, `app.ts` | Sirve prototipo, contenido e imágenes. |
| Healthcheck | Existe y es aprovechable | `/health` | Básico y funcional. |
| Endpoint de contenido | Existe y es aprovechable | `/game-content/data` | Entrega variables, escenarios y campaña. |
| Endpoint de incendios activos | Existe, pero necesita revisión | `/fires/active` | Usa datos de ejemplo de Madrid y Sevilla, desconectados del juego. |
| Persistencia en PostgreSQL/PostGIS | Falta implementar | No hay Prisma ni dependencia PostgreSQL | Solo documentación. |
| Redis y bus de eventos | Es solo documentación o propuesta | Especificación backend | No implementados. |
| OpenAPI y contratos | Falta implementar | Backlog pendiente | No se localizaron contratos ejecutables. |
| Autenticación y usuarios | Falta implementar | No localizado | No necesaria para la beta local, sí para cuentas o informes centralizados. |

## 9. Pruebas y calidad

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Vitest configurado | Existe y es aprovechable | `package.json` | Script disponible. |
| Tests unitarios | Falta implementar o no localizados | No se localizaron archivos de prueba en la revisión | Debe verificarse con listado completo local y añadir cobertura del motor. |
| Tests de integración HTTP | Falta implementar o no localizados | No localizados | Prioridad para endpoints y carga de contenido. |
| Tests end-to-end | Falta implementar | No Playwright/Cypress activo | Necesarios para la ruta vertical. |
| Typecheck y build | Existe y es aprovechable | Scripts `typecheck` y `build` | No se ha verificado su ejecución en esta auditoría remota. |
| CI | Falta implementar o no activo | El commit revisado no tiene estados de CI | Debe configurarse GitHub Actions. |
| Cobertura | Es solo documentación o propuesta | Objetivo >80% en docs | No hay informe disponible. |

## 10. Despliegue y operación

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Ejecución local | Existe y es aprovechable | `npm run dev`, `npm run build`, `npm start` | Base suficiente para desarrollo. |
| Railway + Vercel | Es solo documentación o propuesta | `docs/analysis/gaps-and-decisions.md` | La implementación actual es una única app Fastify, no frontend/backend separados. |
| Docker | Falta implementar o no localizado | No localizado | Puede no ser necesario en la siguiente fase. |
| Entornos y secretos | Es solo documentación o propuesta | Documentación DevOps | No hay infraestructura real verificada. |
| Observabilidad | Falta implementar | Fastify usa log básico, sin métricas ni trazas | No prioritaria hasta estabilizar el MVP. |
| Publicación automatizada | Falta implementar | Sin CI/CD activo verificado | Debe añadirse cuando exista una rama estable de producto. |

## 11. Documentación y gestión del proyecto

| Elemento | Clasificación | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Índice documental | Existe y es aprovechable | `docs/README.md` | Buena navegación general. |
| Especificaciones por área | Existe y es aprovechable | `docs/product`, `architecture`, `frontend`, `backend`, etc. | Cobertura amplia. |
| Backlog documental | Existe, pero necesita revisión | `docs/project/backlog-pendiente.md` | Está orientado a una arquitectura más ambiciosa que el prototipo actual. |
| Gaps y riesgos | Existe y es aprovechable | `docs/analysis/gaps-and-decisions.md` | Ya reconoce sobreingeniería y falta de implementación. |
| Documentación histórica | Existe, pero necesita revisión | `docs/legacy`, `buzon`, manuales | Mucho valor editorial, pero mezcla material vigente, propuesta y archivo. |
| Issues y pull requests como gestión | Falta estructurar | No hay PR recientes y el backlog no está trasladado a Issues | Debe hacerse después de aprobar este inventario. |
| Criterios de terminado | Es solo documentación o propuesta | Plantillas y guías | Falta aplicarlos a entregables reales. |

---

## Contradicciones y decisiones que deben resolverse antes del roadmap

1. **Marca:** `Guardián del Bosque` frente a `¡Apaga las llamas!`.
2. **Público principal:** gestores, estudiantes o ciudadanía.
3. **Producto inicial:** ciclo estacional completo, newsgame narrativo o simulador técnico.
4. **Arquitectura:** mantener una aplicación Fastify modular o migrar ya a Next.js + backend separado.
5. **Mapa:** territorio ilustrado/SVG para la beta o MapLibre/PostGIS desde el principio.
6. **Motor:** reglas narrativas y heurísticas explicables o simulación celular geoespacial.
7. **Fuente editorial:** archivos de escenario, catálogo i18n o documentos Markdown.
8. **Dominio:** integrar el prototipo actual en módulos TypeScript o desarrollar el dominio DDD documentado desde cero.

## Elementos que conviene conservar

- Catálogo tipado de escenarios.
- Pantallas preventivas con hotspots, límites y consecuencias diferidas.
- Balance preventivo y primer aviso.
- Ruta de crisis con acciones limitadas.
- Endpoint único de contenido.
- Página de playtest editorial.
- Catálogo i18n y documentos de revisión.
- Variables y fórmula inicial de resultado.
- Imágenes de referencia y avatares.
- Documentación de riesgos y decisiones.

## Elementos que conviene revisar o simplificar

- Arquitectura hexagonal + DDD + CQRS completa para el tamaño actual.
- Next.js, Redis, RabbitMQ, PostGIS y microcapas antes de validar el juego.
- Duplicidad entre campaña estacional y ruta vertical narrativa.
- Dos modelos de dominio desconectados.
- Archivos de interfaz de miles de líneas.
- Textos duplicados y problemas de codificación.
- Uso de emojis como iconografía final.
- Endpoint de incendios de ejemplo sin relación con el producto.

## Vacíos prioritarios

1. Definir el MVP y su público principal.
2. Extraer el motor del archivo de interfaz.
3. Crear pruebas del motor y del recorrido vertical.
4. Documentar el grafo real de escenas y dependencias.
5. Resolver la fuente única de verdad editorial.
6. Añadir persistencia local y reanudación.
7. Crear un informe final causal más completo.
8. Decidir el nivel de mapa necesario para la beta.
9. Convertir el backlog aprobado en GitHub Issues.
10. Configurar CI básico: typecheck, build y tests.

## Recomendación de siguiente hito

No iniciar todavía la migración a Next.js/PostGIS.

El siguiente hito debería ser **consolidar una beta vertical jugable y mantenible** con este alcance:

- Un recorrido completo de prevención, primer aviso, crisis y resultado.
- Motor TypeScript separado de la vista.
- Contenido externo y editable.
- Persistencia local.
- Resultado causal basado en decisiones.
- Pruebas unitarias e integración.
- Interfaz actual refactorizada sin rediseño total.

Solo después de probar esa beta con usuarios y validar la necesidad territorial debería decidirse si se incorpora MapLibre/PostGIS y un backend persistente.
