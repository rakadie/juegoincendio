LISTADO DE INCIDENCIAS Y TAREAS
SIMULADOR "GUARDIÁN DEL BOSQUE"
Tabla de Contenidos
Estructura de Gestión

Backlog de Incidencias por Prioridad

Backlog de Tareas por Fase

Matriz de Dependencias

Sistema de Seguimiento

1. Estructura de Gestión
1.1 Convención de Nomenclatura
text
[TIPO]-[FASE]-[NÚMERO] : [TÍTULO]

Tipos:
- BUG: Error en funcionalidad existente
- TASK: Tarea de desarrollo nueva
- TECH: Deuda técnica / refactor
- UX: Mejora de experiencia de usuario
- DOC: Documentación
- TEST: Pruebas y validación
- PERF: Optimización de rendimiento
- SEC: Seguridad

Prioridades:
- P0: Bloqueante - Detiene el desarrollo
- P1: Alta - Crítica para siguiente milestone
- P2: Media - Importante pero no bloqueante
- P3: Baja - Mejora deseable
- P4: Trivial - Cosméticas o muy baja prioridad

Estados:
- 📝 Backlog
- 🔍 Análisis
- 🏗 En progreso
- ✅ Completado
- 🚫 Cancelado
- 🔄 Bloqueado
1.2 Sistema de Estimación
Talla	Puntos	Tiempo estimado	Complejidad
XS	1	1-2 horas	Trivial, cambios menores
S	2	3-5 horas	Funcionalidad simple
M	3	1-2 días	Funcionalidad media
L	5	3-5 días	Funcionalidad compleja
XL	8	1-2 semanas	Módulo completo
XXL	13	2-4 semanas	Épica / múltiples módulos
2. Backlog de Incidencias por Prioridad
2.1 Incidencias P0 (Bloqueantes)
ID	Título	Descripción	Impacto	Estado	Asignado
BUG-F0-001	El store de Zustand no persiste entre recargas	Al recargar la página, todo el estado se pierde. Impide testing continuo.	El juego no retiene progreso	📝	-
BUG-F1-003	Los efectos de recursos permiten valores negativos	Usuario puede gastar más de lo que tiene, quedando en deuda. Rompe la economía.	Recursos ilimitados de facto	📝	-
TECH-F0-002	Error de hidratación en Next.js	Los componentes no se renderizan igual en server y cliente.	Interfaz inconsistente	📝	-
BUG-F2-001	Cálculo heurístico produce NaN cuando división por cero	En la fórmula de efectividad de extinción, si accesibilidad = 0, resultado NaN.	Bloquea fase verano	📝	-
2.2 Incidencias P1 (Alta Prioridad)
ID	Título	Descripción	Impacto	Estado	Asignado
BUG-F1-005	Navegación entre nodos no valida requisitos	Usuario puede acceder a nodos que requieren decisiones previas sin haberlas tomado.	Árbol rompe linealidad	📝	-
UX-F1-002	Feedback insuficiente al tomar decisión	Usuario no sabe qué recursos se gastaron ni qué efecto tuvo.	Confusión del jugador	📝	-
BUG-F3-001	Transición invierno-verano no aplica heurística	El escenario de verano se genera con valores base, ignorando decisiones de invierno.	Ciclo roto	📝	-
TASK-F1-008	Implementar validación de recursos antes de permitir opción	Sistema debe checkear si usuario puede pagar la opción.	Prevención de bugs	📝	-
BUG-F4-002	Eventos programados no respetan probabilidad	Eventos con probabilidad 0.3 ocurren siempre o nunca.	Aleatoriedad rota	📝	-
2.3 Incidencias P2 (Media Prioridad)
ID	Título	Descripción	Impacto	Estado	Asignado
UX-F2-003	Usuario no entiende por qué cambia la heurística	Falta tooltip explicativo de las variables de riesgo.	Curva aprendizaje alta	📝	-
BUG-F1-007	Historial de decisiones guarda entradas duplicadas	Al navegar hacia atrás y adelante, se duplican entradas.	Datos inconsistentes	📝	-
TASK-F3-005	Implementar condiciones de fin de invierno	No hay criterio claro de cuándo termina la fase.	Jugador puede quedarse atascado	📝	-
PERF-F2-002	Cálculos heurísticos lentos con muchas zonas	Algoritmo O(n²) causa lag con +10 zonas.	Optimización necesaria	📝	-
UX-F5-001	Colores del mapa de calor no intuitivos	Rojo=bueno, verde=malo en algunas configuraciones.	Confusión visual	📝	-
BUG-F4-005	Efectos en cascada no se aplican en el turno correcto	Los delays no respetan el avance estacional.	Timing incorrecto	📝	-
2.4 Incidencias P3 (Baja Prioridad)
ID	Título	Descripción	Impacto	Estado	Asignado
UX-F0-004	Fuente demasiado pequeña en móvil	Texto de decisiones ilegible en pantallas < 400px.	Accesibilidad	📝	-
BUG-F1-009	Tooltips se solapan en dashboard	Cuando muchos recursos, tooltips tapan otros elementos.	UI/UX	📝	-
DOC-F2-004	Fórmulas heurísticas no documentadas	Desarrolladores nuevos no entienden la lógica.	Mantenibilidad	📝	-
TEST-F0-003	Tests unitarios faltantes para store	Store core sin cobertura de tests.	Riesgo de regresión	📝	-
UX-F6-001	Replay system no muestra tooltips	Al reproducir, no se ven explicaciones de decisiones.	Aprendizaje limitado	📝	-
TASK-F7-004	Implementar analítica de uso	No sabemos qué decisiones eligen más los usuarios.	Data-driven decisions	📝	-
2.5 Incidencias P4 (Triviales)
ID	Título	Descripción	Impacto	Estado	Asignado
UX-F0-005	Típografia inconsistente	Mezcla de fuentes en diferentes componentes.	Cosmético	📝	-
BUG-F1-011	Botón "Atrás" del navegador rompe el estado	Usar back button del navegador causa estado inconsistente.	Edge case	📝	-
UX-F5-003	Animaciones demasiado lentas	Transiciones de 1s ralentizan la experiencia.	Percepción	📝	-
DOC-F0-006	README desactualizado	Instrucciones de setup no funcionan.	Onboarding	📝	-
TASK-F7-009	Añadir Easter eggs	Huevos de pascua para usuarios curiosos.	Diversión	📝	-
3. Backlog de Tareas por Fase
3.1 Fase 0: Fundación (Semanas 1-2)
ID	Tarea	Descripción	Estimación	Dependencias	Estado
TASK-F0-001	Inicializar proyecto Next.js con TypeScript	npx create-next-app@latest --typescript	XS (1)	-	📝
TASK-F0-002	Configurar Tailwind CSS	Instalar y configurar tailwind.config.js	XS (1)	TASK-F0-001	📝
TASK-F0-003	Configurar ESLint y Prettier	Reglas de código consistentes	XS (1)	TASK-F0-001	📝
TASK-F0-004	Instalar Zustand	npm install zustand y crear store básico	XS (1)	TASK-F0-001	📝
TASK-F0-005	Crear estructura de carpetas	/components, /pages, /utils, /data, /hooks	XS (1)	TASK-F0-001	📝
TASK-F0-006	Implementar layout base	Header, footer, contenedor principal	S (2)	TASK-F0-005	📝
TASK-F0-007	Crear sistema de routing	Páginas: inicio, juego, tutorial, settings	S (2)	TASK-F0-006	📝
TASK-F0-008	Implementar Theme Provider	Soporte para modo claro/oscuro	S (2)	TASK-F0-006	📝
TASK-F0-009	Configurar localStorage persistence	Guardar/cargar estado del store	M (3)	TASK-F0-004	📝
TASK-F0-010	Crear loader de JSON	Función para cargar escenarios desde archivos	M (3)	TASK-F0-009	📝
TASK-F0-011	Implementar escenario de prueba	JSON con 5 nodos básicos	S (2)	TASK-F0-010	📝
TASK-F0-012	Configurar entorno de desarrollo	Variables de entorno, scripts npm	XS (1)	TASK-F0-001	📝
3.2 Fase 1: Motor de Decisiones (Semanas 3-5)
ID	Tarea	Descripción	Estimación	Dependencias	Estado
TASK-F1-001	Definir tipos TypeScript para nodos	Interfaces GameNode, GameOption, ResourceDelta	M (3)	TASK-F0-010	📝
TASK-F1-002	Implementar componente NodeRenderer	Renderiza título, descripción, opciones	M (3)	TASK-F1-001	📝
TASK-F1-003	Crear hook useDecision	Lógica para tomar decisiones	M (3)	TASK-F0-004	📝
TASK-F1-004	Implementar ResourceManager	Funciones para actualizar recursos	S (2)	TASK-F1-001	📝
TASK-F1-005	Crear NavigationService	Navegación entre nodos por ID	M (3)	TASK-F1-003	📝
TASK-F1-006	Implementar validación de requisitos	Checkear prerequisites antes de permitir opción	M (3)	TASK-F1-005	📝
TASK-F1-007	Crear HistoryTracker	Guardar historial de decisiones	S (2)	TASK-F1-003	📝
TASK-F1-008	Implementar validación de recursos	No permitir opciones sin recursos suficientes	M (3)	TASK-F1-004	📝
TASK-F1-009	Crear componente ResourceDisplay	Dashboard visual de recursos	M (3)	TASK-F1-004	📝
TASK-F1-010	Implementar feedback de efectos	Toast/notificación al tomar decisión	S (2)	TASK-F1-009	📝
TASK-F1-011	Crear navegación bidireccional	Botones atrás/adelante en árbol	M (3)	TASK-F1-005	📝
TASK-F1-012	Implementar save/load de partida	Guardar estado completo	L (5)	TASK-F0-009	📝
TASK-F1-013	Testing de flujo básico	5 decisiones, verificar cambios	S (2)	TASK-F1-012	📝
3.3 Fase 2: Sistema Heurístico (Semanas 6-8)
ID	Tarea	Descripción	Estimación	Dependencias	Estado
TASK-F2-001	Definir tipos HeuristicDelta	Interfaces para estado heurístico	M (3)	TASK-F1-001	📝
TASK-F2-002	Implementar HeuristicCalculator	Funciones de cálculo de riesgo	L (5)	TASK-F2-001	📝
TASK-F2-003	Crear fórmulas base	Velocidad propagación, efectividad extinción	M (3)	TASK-F2-002	📝
TASK-F2-004	Integrar heurística en store	Añadir heuristicState al estado global	S (2)	TASK-F2-002	📝
TASK-F2-005	Implementar modificadores dinámicos	Opciones cambian según heurística	L (5)	TASK-F2-004	📝
TASK-F2-006	Crear visualización de riesgo	Indicadores visuales de nivel de riesgo	M (3)	TASK-F2-004	📝
TASK-F2-007	Implementar tooltips heurísticos	Explicación de cada variable	S (2)	TASK-F2-006	📝
TASK-F2-008	Optimizar cálculos	Memoización, Web Workers	L (5)	TASK-F2-002	📝
TASK-F2-009	Testing de fórmulas	Validar con datos de prueba	M (3)	TASK-F2-003	📝
TASK-F2-010	Documentar algoritmo	Explicación matemática en docs	S (2)	TASK-F2-009	📝
3.4 Fase 3: Ciclo Estacional (Semanas 9-11)
ID	Tarea	Descripción	Estimación	Dependencias	Estado
TASK-F3-001	Implementar SeasonManager	Control de cambio de estación	M (3)	TASK-F1-012	📝
TASK-F3-002	Definir condiciones fin invierno	Cuándo se considera completada la fase	S (2)	TASK-F3-001	📝
TASK-F3-003	Crear SummerScenarioGenerator	Generar escenario basado en heurística	L (5)	TASK-F2-004	📝
TASK-F3-004	Implementar FirePropagation	Simulación de avance de fuego	L (5)	TASK-F3-003	📝
TASK-F3-005	Crear árbol de crisis	Nodos específicos para verano	M (3)	TASK-F3-003	📝
TASK-F3-006	Implementar sistema de zonas	Múltiples áreas afectadas	L (5)	TASK-F3-004	📝
TASK-F3-007	Crear visualización de incendio	Barra de progreso, mapa de zonas	M (3)	TASK-F3-006	📝
TASK-F3-008	Implementar condiciones victoria/derrota	Criterios de finalización	M (3)	TASK-F3-004	📝
TASK-F3-009	Testing de ciclo completo	Invierno -> Verano -> Resultado	L (5)	TASK-F3-008	📝
TASK-F3-010	Balance inicial	Ajustar valores para dificultad razonable	M (3)	TASK-F3-009	📝
3.5 Fase 4: Eventos y Aleatoriedad (Semanas 12-14)
ID	Tarea	Descripción	Estimación	Dependencias	Estado
TASK-F4-001	Definir tipos ScheduledEvent	Interfaz para eventos programados	M (3)	TASK-F3-001	📝
TASK-F4-002	Implementar EventScheduler	Sistema que gestiona eventos futuros	L (5)	TASK-F4-001	📝
TASK-F4-003	Crear ProbabilityEngine	Cálculo de probabilidades condicionales	M (3)	TASK-F4-002	📝
TASK-F4-004	Implementar 5 eventos climáticos	Sequía, lluvia, viento, etc.	M (3)	TASK-F4-003	📝
TASK-F4-005	Implementar 3 eventos sociales	Protestas, voluntarios, etc.	M (3)	TASK-F4-003	📝
TASK-F4-006	Implementar 2 eventos técnicos	Averías, innovaciones	S (2)	TASK-F4-003	📝
TASK-F4-007	Crear CascadeEffectSystem	Efectos secundarios retardados	L (5)	TASK-F4-002	📝
TASK-F4-008	Implementar UI de eventos	Notificaciones cuando ocurren eventos	S (2)	TASK-F4-004	📝
TASK-F4-009	Testing de probabilidades	Verificar distribución estadística	M (3)	TASK-F4-007	📝
TASK-F4-010	Balance de eventos	Ajustar frecuencias	M (3)	TASK-F4-009	📝
3.6 Fase 5: UI/UX y Visualización (Semanas 15-17)
ID	Tarea	Descripción	Estimación	Dependencias	Estado
TASK-F5-001	Implementar TreeVisualizer	Visualización gráfica del árbol	XL (8)	TASK-F1-002	📝
TASK-F5-002	Crear componente HeatMap	Mapa de riesgo dinámico	L (5)	TASK-F2-006	📝
TASK-F5-003	Implementar D3.js charts	Gráficos de evolución de recursos	L (5)	TASK-F1-009	📝
TASK-F5-004	Añadir Framer Motion	Transiciones y animaciones	M (3)	-	📝
TASK-F5-005	Crear sistema de tutorial	Overlay guiado para nuevos usuarios	L (5)	TASK-F5-004	📝
TASK-F5-006	Implementar modo daltónico	Paletas alternativas	M (3)	TASK-F5-002	📝
TASK-F5-007	Mejorar accesibilidad	Navegación por teclado, ARIA labels	M (3)	TASK-F5-006	📝
TASK-F5-008	Diseño responsive	Adaptación a móvil/tablet	L (5)	TASK-F5-005	📝
TASK-F5-009	Implementar sonidos (opcional)	Feedback auditivo sutil	M (3)	TASK-F5-004	📝
TASK-F5-010	Testing de usabilidad	Con 5 usuarios, iterar	M (3)	TASK-F5-008	📝
3.7 Fase 6: Análisis y Post-Mortem (Semanas 18-19)
ID	Tarea	Descripción	Estimación	Dependencias	Estado
TASK-F6-001	Implementar DecisionLogger	Log detallado con timestamps	M (3)	TASK-F1-007	📝
TASK-F6-002	Crear exportador CSV	Exportar historial a CSV	S (2)	TASK-F6-001	📝
TASK-F6-003	Implementar ReplaySystem	Reproducir partida paso a paso	L (5)	TASK-F6-001	📝
TASK-F6-004	Crear ImpactAnalyzer	Mostrar impacto de cada decisión	L (5)	TASK-F2-004	📝
TASK-F6-005	Implementar gráficos comparativos	Comparar con decisiones óptimas	M (3)	TASK-F6-004	📝
TASK-F6-006	Crear generador de informes	PDF resumen de la partida	M (3)	TASK-F6-002	📝
TASK-F6-007	Implementar share de resultados	Compartir en redes/imagen	S (2)	TASK-F6-006	📝
TASK-F6-008	Testing de herramientas análisis	Validar precisión de métricas	M (3)	TASK-F6-007	📝
3.8 Fase 7: Testing y Optimización (Semanas 20-22)
ID	Tarea	Descripción	Estimación	Dependencias	Estado
TASK-F7-001	Configurar Jest	Setup de testing unitario	S (2)	-	📝
TASK-F7-002	Tests unitarios para store	80% cobertura	M (3)	TASK-F7-001	📝
TASK-F7-003	Tests unitarios para heurística	Validar fórmulas	M (3)	TASK-F2-002	📝
TASK-F7-004	Configurar Cypress	E2E testing	M (3)	TASK-F7-001	📝
TASK-F7-005	Tests E2E flujo completo	3 escenarios críticos	L (5)	TASK-F7-004	📝
TASK-F7-006	Performance profiling	Identificar cuellos de botella	M (3)	TASK-F5-010	📝
TASK-F7-007	Optimización de renders	React.memo, useMemo, useCallback	M (3)	TASK-F7-006	📝
TASK-F7-008	Code splitting	Lazy loading de componentes grandes	M (3)	TASK-F7-007	📝
TASK-F7-009	User testing final	10 usuarios, feedback documentado	M (3)	TASK-F7-005	📝
TASK-F7-010	Bug fixing post-testing	Resolver issues encontrados	L (5)	TASK-F7-009	📝
TASK-F7-011	Preparar documentación final	Manual de usuario, técnico	M (3)	TASK-F7-010	📝
TASK-F7-012	Deploy a producción	Vercel/Netlify	S (2)	TASK-F7-011	📝
4. Matriz de Dependencias
4.1 Diagrama de Dependencias Críticas

    TASK-F0-001[Setup Next.js] --> TASK-F0-004[Zustand]
    TASK-F0-001 --> TASK-F0-005[Estructura]
    
    TASK-F0-004 --> TASK-F0-009[LocalStorage]
    TASK-F0-009 --> TASK-F1-012[Save/Load]
    
    TASK-F0-010[JSON Loader] --> TASK-F1-001[Tipos]
    TASK-F1-001 --> TASK-F1-002[NodeRenderer]
    TASK-F1-002 --> TASK-F5-001[TreeVisualizer]
    
    TASK-F1-003[useDecision] --> TASK-F1-005[Navigation]
    TASK-F1-005 --> TASK-F1-006[Validación]
    
    TASK-F1-004[ResourceManager] --> TASK-F1-009[ResourceDisplay]
    
    TASK-F2-001[Heuristic Types] --> TASK-F2-002[Calculator]
    TASK-F2-002 --> TASK-F2-004[Integración]
    TASK-F2-004 --> TASK-F3-003[SummerGenerator]
    TASK-F2-004 --> TASK-F3-003[SummerGenerator]
    TASK-F3-001[SeasonManager] --> TASK-F3-003
    TASK-F3-001[SeasonManager] --> TASK-F3-003
4.2 Tabla de Dependencias por Tarea
Tarea	Depende de	Bloquea a
TASK-F0-001	-	TASK-F0-004, TASK-F0-005
TASK-F0-004	TASK-F0-001	TASK-F0-009
TASK-F0-009	TASK-F0-004	TASK-F1-012
TASK-F0-010	TASK-F0-001	TASK-F1-001
TASK-F1-001	TASK-F0-010	TASK-F1-002, TASK-F2-001
TASK-F1-002	TASK-F1-001	TASK-F5-001
TASK-F1-003	TASK-F0-004	TASK-F1-005, TASK-F1-007
TASK-F1-004	TASK-F1-001	TASK-F1-009
TASK-F1-005	TASK-F1-003	TASK-F1-006
TASK-F1-012	TASK-F0-009	TASK-F3-001
TASK-F2-001	TASK-F1-001	TASK-F2-002
TASK-F2-002	TASK-F2-001	TASK-F2-004, TASK-F2-003
TASK-F2-004	TASK-F2-002	TASK-F3-003, TASK-F2-006
TASK-F3-001	TASK-F1-012	TASK-F3-003
TASK-F3-003	TASK-F2-004, TASK-F3-001	TASK-F3-004, TASK-F3-005
TASK-F3-004	TASK-F3-003	TASK-F3-006
TASK-F4-001	TASK-F3-001	TASK-F4-002
TASK-F4-002	TASK-F4-001	TASK-F4-007
5. Sistema de Seguimiento
5.1 Tablero de Progreso por Fase
Fase	Total Tareas	Completadas	En Progreso	Pendientes	% Avance
Fase 0	12	0	0	12	0%
Fase 1	13	0	0	13	0%
Fase 2	10	0	0	10	0%
Fase 3	10	0	0	10	0%
Fase 4	10	0	0	10	0%
Fase 5	10	0	0	10	0%
Fase 6	8	0	0	8	0%
Fase 7	12	0	0	12	0%
TOTAL	85	0	0	85	0%
5.2 Incidencias Activas por Prioridad
Prioridad	Total	Críticas	Alta	Media	Baja	Trivial
P0	4	4	0	0	0	0
P1	6	0	6	0	0	0
P2	7	0	0	7	0	0
P3	6	0	0	0	6	0
P4	5	0	0	0	0	5
TOTAL	28	4	6	7	6	5
5.3 Sprint Planning Template
Sprint [NÚMERO]: [FECHA_INICIO] - [FECHA_FIN]

Objetivo del Sprint:
[Descripción breve]

Tareas seleccionadas:

TASK-ID: [Título] (Estimación: X)

TASK-ID: [Título] (Estimación: X)

BUG-ID: [Título] (Prioridad: X)

Capacidad del equipo: [XX] puntos

Riesgos identificados:

[Riesgo 1]

[Riesgo 2]

Criterios de éxito:

[Criterio 1]

[Criterio 2]

5.4 Definición de Hecho (Definition of Done)
Una tarea se considera COMPLETADA cuando:

✅ Código implementado y funcional

✅ Tests unitarios pasan (si aplica)

✅ Code review aprobado

✅ Documentación actualizada

✅ Merge a rama principal

✅ Desplegado en entorno de desarrollo

✅ Validado por QA (si aplica)

Anexo: Glosario de Términos
Término	Definición
Heurística	Conjunto de reglas y cálculos que determinan el comportamiento del fuego basado en decisiones previas
Cascade Effect	Efecto secundario que ocurre varios turnos después de la decisión original
Node	Punto de decisión en el árbol del juego
Resource Delta	Cambio en los recursos (positivo o negativo)
Season Manager	Sistema que controla la transición entre invierno y verano
Fire Propagation	Algoritmo que simula el avance del incendio
Post-Mortem	Análisis detallado después de terminar una partida
Última actualización: [FECHA ACTUAL]
Versión del documento: 2.0
Responsable: Product Owner / Tech Lead

