# Inventario actual del proyecto

Fecha de revisión inicial: 26 de julio de 2026  
Última consolidación: 29 de julio de 2026  
Repositorio: `rakadie/juegoincendio`  
Rama de referencia: `main`

## Propósito

Este inventario distingue dos realidades que no deben confundirse:

1. **Especificación aprobada de M1:** catálogo, IDs, flujo y modelo causal que deben implementarse.
2. **Runtime heredado:** prototipo actual, todavía incompatible con parte de esa especificación.

La fuente normativa para la Vertical Beta 1 es [`docs/product/vertical-beta-1-catalog.md`](../product/vertical-beta-1-catalog.md). La implementación se organiza en #67–#76, milestone **M2 — Motor modular**.

Además, este documento conserva el inventario transversal del proyecto —interfaz, accesibilidad, territorio, assets, licencias, backend, calidad, despliegue y gobernanza—. Esas secciones registran capacidades y gaps, pero no modifican las decisiones normativas de producto.

## Criterios de clasificación

- **Aprobado en especificación:** decisión cerrada y estable de M1.
- **Existe y es reutilizable:** implementación actual aprovechable.
- **Existe, pero debe migrarse:** base funcional incompatible con el contrato aprobado.
- **Existe, pero necesita revisión:** capacidad útil con deuda o validación pendiente.
- **Biblioteca candidata:** contenido conservado fuera del flujo oficial.
- **Archivo histórico:** contenido retirado del producto y del runtime objetivo.
- **Falta implementar:** contrato aprobado o necesidad identificada sin implementación funcional.
- **Fuera del alcance de la beta:** decisión explícita de no incluirlo en la Vertical Beta 1.

## Resumen ejecutivo

El repositorio contiene:

- documentación extensa de producto, arquitectura, dominio, frontend, backend, testing y gobierno;
- 51 objetos `Scenario` estructurados;
- tres inspecciones preventivas heredadas;
- balance, primer aviso y selector de rutas;
- un prototipo Fastify funcional con gran parte del estado y las reglas embebidos en `prototype-page.ts`;
- una especificación M1 cerrada para una Vertical Beta 1 de 12 nodos;
- una épica M2 con nueve tareas de implementación.

El prototipo demuestra el concepto, pero **no es todavía la Vertical Beta 1 aprobada**. Conserva el catálogo completo, tres inspecciones, rutas antiguas, nodos invierno/verano, IDs históricos y resultado hardcodeado.

## 1. Producto aprobado

| Elemento | Estado | Fuente normativa | Observación |
|---|---|---|---|
| Marca `¡Apaga las llamas!` | Aprobado | Decisión de producto | Las referencias a marcas anteriores deben archivarse. |
| Público principal: ciudadanía | Aprobado | #59, #66 | Gestores y estudiantes quedan como públicos secundarios. |
| Eje causal territorial | Aprobado | #50, #66 | Prevención → fuego → capacidad de extinción → consecuencias. |
| Duración 20–25 minutos | Aprobado y validado | #65 | Referencias aproximadas de 20 y 21 minutos. |
| Catálogo de 12 nodos | Aprobado | #23 | Incluye seis tipos de nodo y un único terminal. |
| Dos inspecciones | Aprobado | #54, #59 | Territorio 3/5; vivienda 2/3. |
| Dos ramas | Aprobado | #61–#64 | Preparada y vulnerable. |
| Resultado con dos variantes | Aprobado | #64, #66 | `contained` y `overwhelmed`, calculadas desde la sesión final. |
| Avatar | Opcional | #56 | Fuera del flujo y de los fixtures. |
| Comunicación y evacuación | Secundarias | #50, #66 | Consecuencias o contenido complementario, no eje estructural. |
| Modelo de publicación | Pendiente | #9 | Bloquea despliegue y publicación, no el diseño del motor. |
| Validación experta y ciudadana | Pendiente | #10 | Bloquea aprobación editorial y publicación, no los contratos técnicos. |

## 2. Recorrido oficial

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
→ ending-result-causal-report
```

### Rama vulnerable

```text
crisis-decision-access-blockage
→ crisis-decision-ravine-fire
→ crisis-decision-crown-fire
→ ending-result-causal-report
```

El barranco es un nodo compartido. La variante terminal se calcula desde el estado final y las decisiones realizadas; las partidas de referencia esperan `contained` y `overwhelmed` respectivamente.

## 3. Estado heredado aprobado

`inheritedState` queda limitado a:

- `fuelLoad`;
- `fuelContinuity`;
- `operationalAccess`;
- `defensibility`;
- `attackOpportunity`.

No se incluyen preparación familiar, población vulnerable, confianza ciudadana o canales oficiales como dimensiones estructurales.

## 4. Catálogo editorial

### Objetos `Scenario`

- `beta-oficial`: 5.
- `biblioteca-candidata`: 36.
- `archivo-historico`: 10.
- Total: 51.

### Unidades adicionales

- `p-003-comunidad-preparada`: biblioteca candidata.
- `invierno_1..3` y `verano_1..3`: archivo histórico.
- `resultado-beta`: sentinela histórica que debe sustituirse por el nodo declarativo final.

La clasificación completa y la correspondencia de IDs están en el catálogo canónico.

## 5. Implementación existente

| Componente | Estado actual | Tratamiento objetivo |
|---|---|---|
| `src/content/scenarios/index.ts` | Importa 51 escenarios | Exponer solo los cinco oficiales en el payload de la beta. |
| `prevention-inspections.ts` | Tres inspecciones; p-001 y p-002 con siete opciones y cuota cuatro | Reducir a dos inspecciones, orden territorio→vivienda y cuotas 3/5 y 2/3. |
| `prevention-balance.ts` | Mantiene dimensiones comunitarias y rutas antiguas | Reorientar a cinco dimensiones territoriales y dos ramas. |
| `campaign.ts` | Conserva `invierno_*` y `verano_*` | Retirar el modelo paralelo del runtime oficial. |
| `prototype-page.ts` | Estado, router, balance y resultado embebidos | Conectar la vista al motor y a `GameSession`. |
| Selector de crisis | Fuerza `ruta-comunicacion` | Sustituir por router causal preparado/vulnerable. |
| Cinco escenas oficiales | Formato no uniforme para el renderer | Adaptar al contrato común `GameScene`. |
| Briefing y resultado | Hardcodeados | Convertir en nodos declarativos. |
| i18n | IDs históricos y fallback silencioso | Cobertura estricta de los 12 nodos canónicos. |
| Validación automática | No localizada para el catálogo | Validar IDs, referencias, ramas, terminal, i18n y fixtures. |

## 6. Dominio y arquitectura objetivo

| Elemento | Estado | Próximo destino |
|---|---|---|
| Unión discriminada `GameScene` | Falta implementar | #68 |
| Validador de catálogo y grafo | Falta implementar | #68 |
| `GameSession` serializable | Especificación M1 pendiente de completar | #28–#31 y #69 |
| `inheritedState` territorial | Alcance aprobado; contrato detallado pendiente | #32–#35 y #69 |
| Matriz causal | Alcance aprobado; detalle pendiente | #36–#39 |
| Dos fixtures reproducibles | Secuencias aprobadas; fixtures pendientes | #44–#47 y #76 |
| Motor separado del DOM | Falta implementar | #69, #72, #73 |
| Flujo declarativo | Catálogo aprobado; runtime pendiente | #68 y #72 |
| Retirada de campaña heredada | Aprobada | #74 |
| Migración atómica de IDs e i18n | Aprobada | #75 |
| Aceptación integral | Definida | #76 |
| Simulación física o celular | Fuera de alcance | No implementar en Vertical Beta 1. |

## 7. Interfaz y experiencia de usuario

| Elemento | Estado | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Interfaz jugable del prototipo | Existe y es reutilizable | `prototype-page.ts` | Conservar la experiencia útil, pero retirar de la vista el cálculo de reglas y rutas. |
| Inspecciones mediante hotspots | Existe, pero debe migrarse | Interfaz preventiva actual | Mantener solo las dos inspecciones oficiales y sus cuotas aprobadas. |
| Flujo de briefing, prevención, crisis y resultado | Existe, pero debe migrarse | Pantallas y navegación actuales | Sustituir la navegación hardcodeada por el flujo declarativo. |
| Responsive inicial | Existe, pero necesita revisión | Media queries y estilos actuales | Validar en móvil y escritorio con las pantallas definitivas. |
| Accesibilidad inicial | Existe, pero necesita revisión | Foco, diálogos y reducción de movimiento | Realizar auditoría WCAG y pruebas completas con teclado. |
| Distinción visual de fases | Existe, pero necesita revisión | Etapas actuales | Adaptar la terminología a prevención, transición, crisis y resultado. |
| Componentización | Falta implementar | Archivos de interfaz grandes | Separar renderers y componentes después de extraer el motor; destino principal #73. |
| Sistema de diseño | Es solo documentación o propuesta | Estilos embebidos | Definir tokens y componentes cuando el flujo esté estabilizado. |
| Claridad informativa | Existe, pero necesita revisión | Textos largos y alta densidad | Jerarquizar contexto, decisión, consecuencias y ayuda. |
| Sonido | Falta implementar y no es prioritario | No localizado | Posponer frente al motor, accesibilidad y recorrido. |

## 8. Territorio, mapas y datos

| Elemento | Estado | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Territorio ilustrado y zonas interactivas | Existe, pero necesita revisión | Interfaz y hotspots actuales | Mantener una representación narrativa, no una simulación GIS. |
| Variables territoriales del juego | Existe, pero debe migrarse | Estado actual y balance | Reducirlas al contrato aprobado de `inheritedState`. |
| Incendios activos con coordenadas | Existe como código de ejemplo | `FireIncident`, repositorio y `/fires/active` | Retirar del producto objetivo; no representa la partida narrativa. |
| MapLibre y mapas reales | Fuera de alcance | Decisión de producto | No incorporar en Vertical Beta 1. |
| PostgreSQL/PostGIS | Fuera de alcance | No implementado | No es necesario para una beta local o pública sin cuentas. |
| Persistencia de sesión | Falta implementar | No localizada | Añadir persistencia local sobre `GameSession` serializable cuando el contrato esté estable. |

## 9. Assets, contenido e internacionalización

| Elemento | Estado | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Contenido editorial TypeScript | Existe y es reutilizable | `src/content/**` | Separar beta oficial, biblioteca y archivo sin borrar el material reutilizable. |
| Catálogo i18n español | Existe, pero debe migrarse | Catálogo de traducciones actual | Migrar a IDs canónicos y eliminar fallback silencioso para los 12 nodos oficiales. |
| Cobertura i18n oficial | Falta completar | #23 y #75 | Validar briefing, inspecciones, resumen, decisiones, router y resultado. |
| Imágenes, iconos e ilustraciones | Existe, pero necesita inventario | Assets y estilos del prototipo | Mantener una lista de procedencia, uso y sustitución necesaria. |
| Licencias de assets | Necesita revisión | No existe registro completo localizado | Documentar autoría y licencia antes de publicación pública. |
| Audio | Falta implementar | No localizado | No bloquea el MVP. |
| Biblioteca candidata | Existe | 36 escenarios y `p-003` | Conservar fuera del payload y sin obligación de migrar i18n en M2. |

## 10. Backend y API

| Elemento | Estado | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Servidor Fastify | Existe y es reutilizable | `server.ts`, `app.ts` | Base técnica oficial para una única aplicación. |
| Aplicación Fastify modular | Existe, pero necesita revisión | Estructura TypeScript | Fastify servirá vistas y contenido; las reglas residirán en el motor. |
| Healthcheck | Existe y es reutilizable | `/health` | Mantener y cubrir con prueba de integración. |
| Endpoint de contenido | Existe, pero debe migrarse | `/game-content/data` | Entregar solo catálogo, flujo e inspecciones oficiales. |
| Endpoint de incendios activos | Existe como ejemplo | `/fires/active` | Retirar junto con `FireIncident`. |
| Autenticación y cuentas | Fuera de alcance | No implementado | No necesarias para la primera beta. |
| Redis y bus de eventos | Fuera de alcance | Solo documentación | No necesarios para el motor narrativo. |
| Persistencia de servidor | Fuera de alcance inicial | No implementada | Revaluar únicamente si #9 elige un formato que la necesite. |

## 11. Testing, calidad y CI

| Elemento | Estado | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Vitest | Existe y es reutilizable | `package.json` | Base para pruebas unitarias y de integración. |
| Tests unitarios del motor | Falta implementar o ampliar | No localizados para las reglas objetivo | Cubrir cada regla pura de `GameSession`, estado, router y resultado. |
| Tests de integración HTTP | Falta implementar o ampliar | Cobertura no verificada | Cubrir healthcheck, payload oficial y errores de catálogo. |
| Tests end-to-end | Falta implementar | Sin suite activa verificada | Cubrir las dos partidas de referencia. |
| Typecheck y build | Existe | Scripts del repositorio | Mantener como puertas obligatorias de CI. |
| CI | Existe parcialmente o debe reforzarse | Workflows del repositorio | Verificar que ejecute typecheck, build, tests y validación editorial. |
| Validación del catálogo | Falta implementar | #68, #75 y #76 | Detectar duplicados, referencias inválidas, huérfanos, ciclos e i18n ausente. |
| Validación experta y ciudadana | Pendiente | #10 | Definir revisores, muestra, guion, métricas, accesibilidad y aceptación educativa. |
| Seguridad de dependencias y secretos | Necesita revisión continua | Configuración de repositorio y Actions | No exponer secretos en PR de forks y mantener dependencias revisadas. |

## 12. Despliegue y operación

| Elemento | Estado | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Ejecución local | Existe y es reutilizable | Scripts npm | Base suficiente para desarrollo. |
| Formato de publicación | Pendiente | #9 | Elegir demostrador, producto editorial, piloto o base licenciable. |
| Proveedor de despliegue | Pendiente | #9 | Debe soportar una única aplicación Node.js/Fastify. |
| Separación Railway + Vercel | Fuera de alcance | Decisión técnica | No separar frontend y backend en esta fase. |
| Docker | No prioritario | No localizado como requisito | Incorporar solo si simplifica el proveedor elegido. |
| Publicación automatizada | Falta implementar | CI/CD no validado para despliegue | Añadir después de elegir proveedor y estabilizar la beta. |
| Variables y secretos | Necesita definición | #9 y configuración de Actions | Documentar variables, rotación y permisos mínimos. |
| Registro de errores y uso | Pendiente | #9 | Definir el mínimo necesario para una beta pública. |

## 13. Documentación, gobierno y pendientes

| Elemento | Estado | Evidencia | Observación / siguiente acción |
|---|---|---|---|
| Índice documental | Existe y es reutilizable | `docs/README.md` | Mantener navegación y señalar documentos normativos. |
| Inventario actual | Existe y es reutilizable | Este documento | Mantener vivo sin sustituir inventarios transversales por decisiones de producto. |
| Especificación Vertical Beta 1 | Vigente | `docs/product/vertical-beta-1.md` | Resume el producto aprobado. |
| Catálogo canónico | Normativo | `docs/product/vertical-beta-1-catalog.md` | Fuente de verdad para nodos, IDs, flujo y clasificación. |
| Decisión de dominio | Existe y es reutilizable | `docs/architecture/decision-game-domain.md` | Mantenerla alineada con `GameSession` y el motor ligero. |
| Backlog documental previo | Existe, pero necesita revisión | `docs/project/backlog-pendiente.md` | Distinguir material vigente, absorbido e histórico. |
| Material histórico | Existe | `docs/legacy`, `buzon` | No utilizar como fuente normativa sin validación. |
| Issues como gestión | Existe | GitHub Issues y Projects | Mantener dependencias, milestones y estados coherentes. |
| Criterios de terminado | Necesita consolidación | Issues M1/M2 | Cada entrega debe incluir pruebas, documentación y trazabilidad. |
| Publicación y proveedor | Pendiente | #9 | No bloquear M1/M2 técnico, sí la salida pública. |
| Validación experta y ciudadanía | Pendiente | #10 | No bloquear contratos técnicos, sí aprobación editorial y publicación. |

## 14. Jerarquía de fuentes

Cuando exista contradicción:

1. decisiones cerradas de Product Owner (#59 y #66);
2. catálogo canónico `vertical-beta-1-catalog.md`;
3. especificaciones M1 de grafo, sesión, estado y causalidad;
4. definición resumida `vertical-beta-1.md`;
5. este inventario;
6. documentación anterior y runtime heredado.

La existencia de una función o pantalla en el prototipo no la convierte en parte del producto aprobado. Del mismo modo, los gaps transversales de este inventario no alteran el catálogo causal.

## 15. Próximo trabajo

M1 debe completar únicamente los contratos que desbloquean implementación:

```text
#24 → #25 → #26 → #27 → cerrar #14
#28 → #29–#31
#32 → #33–#35
#36 → #37–#39
#44 → #45–#47
#40 → #41–#43
```

M2 puede comenzar por etapas cuando estén cerradas sus entradas:

```text
#23 + #24–#27 → #68
#28–#35 → #69
#68–#69 → #70 y #71
→ #72 → #73 → #74 → #75 → #76
```

Los pendientes transversales siguen su propio orden:

```text
#9 → decisión de publicación y despliegue
#10 → validación experta y pruebas con ciudadanía
```

## 16. Decisiones retiradas

Quedan expresamente sustituidas y no deben utilizarse como entrada de M2:

- tercera inspección obligatoria de comunidad;
- tres estados preventivos globales;
- ruta principal de comunicación;
- protagonismo estructural de evacuación;
- tres desenlaces globales;
- avatar obligatorio;
- `inheritedState` comunitario;
- compatibilidad runtime con IDs históricos.
