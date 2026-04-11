DOCUMENTO DE ESPECIFICACIÓN TÉCNICA Y DE DISEÑO
SIMULADOR DE PREVENCIÓN DE INCENDIOS "GUARDIÁN DEL BOSQUE" v2.0
Tabla de Contenidos
Visión General del Producto

Análisis Comparativo de Mercado

Arquitectura del Sistema

Modelo de Datos y Estado

Sistemas Core del Juego

Interfaz de Usuario y Experiencia

Roadmap Técnico y Milestones

Especificaciones Técnicas Detalladas

1. Visión General del Producto
1.1 Concepto Ampliado
"Guardián del Bosque" es un simulador de gestión de riesgos ambientales que combina mecánicas de árbol de decisiones ponderado, gestión de recursos limitados y sistemas heurísticos complejos para modelar el comportamiento de incendios forestales. El juego opera en un ciclo bianual donde las decisiones de inversión y prevención (Invierno) determinan directamente las variables y opciones disponibles durante la crisis (Verano).

1.2 Propuesta de Valor Única
Educación experiencial: Enseña principios de gestión forestal y prevención de riesgos

Complejidad emergente: Cada partida es única gracias al sistema heurístico adaptativo

Tensión estratégica: Equilibrio entre preparación a largo plazo y respuesta inmediata

Rejugabilidad: Múltiples caminos y finales basados en decisiones acumulativas

1.3 Público Objetivo
Gestores ambientales y forestales (formación profesional)

Estudiantes de ciencias ambientales (educación)

Jugadores de simuladores de gestión (entretenimiento)

Organizaciones de prevención de incendios (herramienta de concienciación)

2. Análisis Comparativo de Mercado
2.1 Competidores Directos e Indirectos
Herramienta	Tipo	Fortalezas	Debilidades	Nuestra Ventaja
Fire Simulator (Profesional)	Software GIS	Modelos físicos precisos	Curva aprendizaje alta, caro	Accesibilidad web, gamificación
Incident Commander (Juego)	Simulador táctico	Gestión de recursos en tiempo real	Sin fase preventiva	Ciclo completo prevención-crisis
Forestry Management Sim	Juego de gestión	Económica compleja	Incendios como evento aleatorio	Heurística causal directa
Phoenix RapidFire (Profesional)	Modelado predictivo	Precisión científica	Solo visualización, no interactivo	Interactividad formativa
2.2 Características Diferenciadoras
Sistema de Memoria Heurística: El juego recuerda patrones de decisión y ajusta el comportamiento del fuego en consecuencia

Feedback Visual de Consecuencias: Representación gráfica del estado del bosque que se degrada/mejora en tiempo real

Modo Análisis Post-Mortem: Replay de decisiones con explicaciones de impacto

API de Escenarios: Capacidad de importar escenarios reales (datos GIS simplificados)

3. Arquitectura del Sistema
3.1 Diagrama de Arquitectura de Alto Nivel
graph TB
    subgraph "Frontend (Next.js)"
        UI[UI Components]
        State[Estado Local/Context]
        GameEngine[Game Engine Logic]
        Render[Visualización Canvas/SVG]
    end
    
    subgraph "Core Systems"
        DT[Decision Tree Engine]
        RS[Resource System]
        HS[Heuristic Simulator]
        ES[Event Scheduler]
    end
    
    subgraph "Data Layer"
        Store[Zustand Store]
        Persist[LocalStorage/IndexedDB]
        Scenarios[Escenarios JSON]
    end
    
    UI --> State
    State --> GameEngine
    GameEngine --> DT
    GameEngine --> RS
    GameEngine --> HS
    GameEngine --> ES
    DT --> Store
    RS --> Store
    HS --> Store
    ES --> Store
    Store --> Persist
    Store --> Render
    Scenarios --> DT
3.2 Flujo de Datos del Juego
sequenceDiagram
    participant J as Jugador
    participant UI as Interfaz
    participant DT as Árbol Decisiones
    participant RS as Recursos
    participant HS as Heurística
    participant ES as Eventos
    
    J->>UI: Toma decisión invierno
    UI->>DT: Procesar nodo actual
    DT->>RS: Aplicar costes
    DT->>HS: Modificar variables estado
    HS-->>DT: Nuevo estado heurístico
    DT->>ES: Programar consecuencias
    ES-->>UI: Feedback inmediato
    
    Note over J,ES: Transición a Verano
    
    ES->>HS: Calcular severidad base
    HS->>DT: Generar nodos crisis
    DT->>UI: Presentar opciones
    J->>UI: Decisión crisis
    UI->>DT: Procesar con modificador heurístico
    DT->>RS: Consumir recursos emergencia
    DT-->>UI: Resultado parcial
4. Modelo de Datos y Estado
4.1 Estructura de Datos del Árbol (JSON Schema)
typescript
interface GameNode {
  id: string;
  type: 'prevention' | 'crisis' | 'consequence' | 'event';
  season: 'winter' | 'summer' | 'post-fire';
  title: string;
  description: string;
  
  // Requisitos para acceder al nodo
  requirements?: {
    resources?: ResourceDelta;
    previousDecisions?: string[];
    heuristicThreshold?: HeuristicCondition;
  };
  
  // Opciones disponibles
  options: GameOption[];
  
  // Metadatos
  position?: { x: number; y: number }; // Para visualización de árbol
  tags?: string[]; // 'cortafuegos', 'quema-controlada', etc.
}

interface GameOption {
  id: string;
  text: string;
  
  // Efectos inmediatos
  immediateEffects: ResourceDelta;
  
  // Efectos a largo plazo (modifican heurística)
  heuristicEffects: HeuristicDelta;
  
  // Desbloquea/cierra caminos
  unlocksNodes?: string[];
  blocksNodes?: string[];
  
  // Probabilidad de éxito (modificada por heurística)
  baseSuccessRate: number; // 0-1
  
  // Coste de oportunidad
  opportunityCost?: ResourceDelta;
  
  // Feedback narrativo
  successDescription: string;
  failureDescription: string;
}

interface ResourceDelta {
  money?: number; // Presupuesto
  water?: number; // Agua disponible
  personnel?: number; // Brigadistas
  equipment?: number; // Maquinaria
  communitySupport?: number; // Apoyo vecinal (-100 a 100)
  forestHealth?: number; // Salud del bosque (0-100)
  fuelLoad?: number; // Carga combustible (0-100)
  moisture?: number; // Humedad suelo (0-100)
  accessibility?: number; // Accesibilidad (0-100)
}

interface HeuristicDelta {
  // Modificadores permanentes
  fireSpreadRate?: number; // Multiplicador 0.5-2.0
  fireIntensity?: number; // 0-100
  suppressionDifficulty?: number; // 0-100
  spotFireRisk?: number; // Riesgo de focos secundarios
  windInfluence?: number; // Susceptibilidad al viento
  
  // Modificadores de zona
  zoneModifiers?: Record<string, number>;
}

interface HeuristicCondition {
  parameter: keyof HeuristicDelta;
  operator: 'gt' | 'lt' | 'eq' | 'between';
  value: number | [number, number];
}
4.2 Estado Global del Juego (Zustand Store)
typescript
interface GameState {
  // Recursos actuales
  resources: ResourceDelta;
  
  // Estado heurístico acumulado
  heuristicState: HeuristicDelta;
  
  // Historial de decisiones
  decisionHistory: {
    nodeId: string;
    optionId: string;
    timestamp: number;
    season: string;
    year: number;
  }[];
  
  // Estado del mundo
  worldState: {
    currentYear: number;
    currentSeason: 'winter' | 'summer' | 'post-fire';
    currentNodeId: string;
    availableNodes: string[];
    completedNodes: string[];
    fireActive: boolean;
    fireProgress: number; // 0-100
    fireLocation: string[]; // Zonas afectadas
  };
  
  // Eventos programados
  scheduledEvents: ScheduledEvent[];
  
  // Acciones
  takeDecision: (nodeId: string, optionId: string) => void;
  advanceSeason: () => void;
  calculateHeuristic: () => HeuristicDelta;
  triggerEvent: (eventId: string) => void;
  saveGame: () => void;
  loadGame: (saveId: string) => void;
}

interface ScheduledEvent {
  id: string;
  triggerSeason: 'winter' | 'summer';
  triggerYear: number;
  condition?: () => boolean;
  effect: ResourceDelta | HeuristicDelta;
  probability: number; // 0-1
}
5. Sistemas Core del Juego
5.1 Sistema Heurístico Avanzado
El corazón del juego es un motor heurístico que traduce decisiones preventivas en comportamiento del fuego.

graph LR
    subgraph "Input Layer"
        A[Decisiones Invierno]
        B[Variables Climáticas]
        C[Topografía Base]
    end
    
    subgraph "Heuristic Engine"
        D[Calculadora Riesgo]
        E[Modelo Propagación]
        F[Generador Escenarios]
    end
    
    subgraph "Output Layer"
        G[Velocidad Fuego]
        H[Dificultad Extinción]
        I[Opciones Crisis]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    F --> H
    F --> I
Fórmula Heurística Base:

text
Riesgo_Total = (Combustible * 0.35) + (Pendiente * 0.25) - (Humedad * 0.20) - (Accesibilidad * 0.20) + (Viento * 0.15)

Velocidad_Propagación = Base_Spread * Riesgo_Total * (1 + (0.1 * Años_Sequía))

Efectividad_Extinción = Base_Effectiveness * (Accesibilidad/100) * (1 - (Riesgo_Total/200))
5.2 Sistema de Eventos Dinámicos
Los eventos no son aleatorios puros, sino "semi-aleatorios" basados en el estado heurístico.

Tipo Evento	Probabilidad Base	Modificadores	Ejemplo
Climático	30%	+10% por baja humedad	"Ola de calor extremo"
Social	20%	+15% por bajo apoyo	"Protestas vecinales"
Técnico	15%	+25% por equipos antiguos	"Avería de maquinaria"
Ecológico	25%	+30% por alta carga combustible	"Plaga de escolítidos"
5.3 Sistema de Consecuencias en Cascada
Implementa un sistema donde una decisión puede tener efectos secundarios no obvios:

javascript
class CascadeEffect {
  constructor(primaryEffect, secondaryEffects) {
    this.primary = primaryEffect;
    this.secondary = secondaryEffects; // Array de efectos con delay
  }
  
  apply(gameState) {
    // Aplicar efecto inmediato
    gameState.resources.update(this.primary);
    
    // Programar efectos secundarios
    this.secondary.forEach(effect => {
      gameState.scheduleEvent({
        delay: effect.delay, // en turnos
        condition: effect.condition,
        effect: effect.delta
      });
    });
  }
}

// Ejemplo: Quema controlada
const quemaControlada = new CascadeEffect(
  { fuelLoad: -30, money: -100 }, // Reduce combustible inmediato
  [
    { delay: 2, condition: (state) => state.wind > 50, 
      effect: { communitySupport: -15, spotFireRisk: +20 } }, // Riesgo de escape
    { delay: 4, condition: (state) => state.moisture < 30,
      effect: { forestHealth: +10, biodiversity: +5 } } // Regeneración
  ]
);
6. Interfaz de Usuario y Experiencia
6.1 Diagrama de Navegación UI
graph TD
    subgraph "Pantalla Principal"
        A[Nuevo Juego] --> B[Seleccionar Escenario]
        A --> C[Cargar Partida]
        A --> D[Tutorial]
    end
    
    subgraph "Ciclo Invierno"
        B --> E[Tablero Invierno]
        E --> F[Visualizador Árbol]
        F --> G[Panel Decisión]
        G --> H[Feedback Recursos]
        H --> I{¿Fin Invierno?}
        I -->|No| F
        I -->|Sí| J[Cálculo Heurístico]
    end
    
    subgraph "Ciclo Verano"
        J --> K[Inicio Incendio]
        K --> L[Mapa de Calor]
        L --> M[Decisiones Crisis]
        M --> N[Resultados Parciales]
        N --> O{Incendio Controlado?}
        O -->|No| L
        O -->|Sí| P[Balance Anual]
    end
    
    subgraph "Post-Partida"
        P --> Q[Análisis Post-Mortem]
        Q --> R[Comparativa Decisiones]
        Q --> S[Replay]
        S --> T[Compartir Resultados]
    end
6.2 Especificaciones de UI/UX
Componentes Clave:

Visualizador de Árbol Interactivo

Representación gráfica del árbol de decisiones

Nodos coloreados por tipo (prevención/crisis)

Líneas de conexión con grosor variable (importancia)

Hover para previsualizar efectos

Dashboard de Recursos

Gráficos radiales en tiempo real

Alertas visuales cuando recursos críticos

Proyecciones de agotamiento

Mapa de Riesgo Dinámico

Canvas SVG con zonas coloreadas por riesgo

Heatmap superpuesto basado en heurística

Animación de propagación de incendio

Sistema de Feedback Narrativo

Textos dinámicos que explican por qué ocurre cada evento

"Flashbacks" que recuerdan decisiones pasadas

Citas de expertos reales sobre gestión forestal

6.3 Accesibilidad y Usabilidad
Modo Daltónico: Paletas de color alternativas

Navegación por teclado: Atajos para decisiones frecuentes

Escalado de texto: Ajustable hasta 200%

Tutorial interactivo: Primeros 5 minutos guiados

Tooltips explicativos: Cada recurso tiene definición

7. Roadmap Técnico y Milestones
7.1 Fase 0: Fundación (Semanas 1-2)
Objetivo: Infraestructura base y prototipo navegable

Milestone	Tareas	Criterio Éxito	Tecnología
M0.1: Setup	Crear proyecto Next.js, configurar Tailwind, ESLint	App corre localmente	Next.js 14, Tailwind
M0.2: Store Base	Implementar Zustand con estado inicial	Estado persiste entre renders	Zustand
M0.3: Router	Navegación entre pantallas principales	Flujo completo navegable	Next.js Pages
M0.4: JSON Loader	Cargar árbol de ejemplo desde archivo	Datos visibles en consola	FS, JSON.parse
7.2 Fase 1: Motor de Decisiones (Semanas 3-5)
Objetivo: Sistema funcional de árbol con efectos

Milestone	Tareas	Criterio Éxito	Complejidad
M1.1: Node Renderer	Renderizar nodo actual con opciones	UI muestra texto y botones	Media
M1.2: Resource Updater	Aplicar efectos inmediatos a recursos	Recursos cambian al elegir	Baja
M1.3: Node Navigator	Navegación entre nodos por ID	Árbol recorrible completamente	Media
M1.4: History Tracker	Guardar historial de decisiones	Array con decisiones tomadas	Baja
M1.5: Validation	Validar requisitos antes de permitir opción	Opciones bloqueadas si no cumple	Media
7.3 Fase 2: Sistema Heurístico (Semanas 6-8)
Objetivo: Motor que calcula y aplica heurísticas

Milestone	Tareas	Criterio Éxito	Complejidad
M2.1: Heuristic Calculator	Implementar fórmulas base	Output numérico consistente	Alta
M2.2: State Persistence	Guardar estado heurístico en store	Valores persisten	Media
M2.3: Modifier Application	Aplicar modificadores a opciones	Opciones cambian según heurística	Alta
M2.4: Visual Indicators	Mostrar alertas basadas en heurística	UI refleja riesgo	Media
7.4 Fase 3: Ciclo Estacional (Semanas 9-11)
Objetivo: Transición entre invierno y verano

Milestone	Tareas	Criterio Éxito	Complejidad
M3.1: Season Manager	Control de cambio de estación	Avanza al completar nodos clave	Media
M3.2: Summer Scenario Gen	Generar escenario de incendio basado en heurística	Escenario único cada vez	Alta
M3.3: Fire Propagation	Simulación básica de avance de fuego	Barra de progreso	Media
M3.4: Crisis Decisions	Árbol específico para verano	Decisiones contextuales	Media
7.5 Fase 4: Eventos y Aleatoriedad (Semanas 12-14)
Objetivo: Sistema de eventos dinámicos

Milestone	Tareas	Criterio Éxito	Complejidad
M4.1: Event Scheduler	Programar eventos basados en estado	Eventos ocurren en momento correcto	Alta
M4.2: Probability Engine	Cálculo de probabilidades condicionales	Distribución realista	Alta
M4.3: Random Events	Implementar 10 eventos base	Eventos visibles en UI	Media
M4.4: Cascade Effects	Efectos secundarios retardados	Consecuencias no inmediatas	Alta
7.6 Fase 5: UI/UX y Visualización (Semanas 15-17)
Objetivo: Interfaz pulida y visualmente atractiva

Milestone	Tareas	Criterio Éxito	Complejidad
M5.1: Tree Visualizer	Visualización gráfica del árbol	Nodos y conexiones visibles	Alta
M5.2: Heat Map	Mapa de riesgo dinámico	Colores cambian con estado	Media
M5.3: Animations	Transiciones suaves entre estados	Feedback visual fluido	Media
M5.4: Accessibility	Implementar modos accesibles	Cumple WCAG 2.1 AA	Media
7.7 Fase 6: Análisis y Post-Mortem (Semanas 18-19)
Objetivo: Herramientas de aprendizaje y replay

Milestone	Tareas	Criterio Éxito	Complejidad
M6.1: Decision Logger	Log detallado con timestamps	Exportable a CSV	Media
M6.2: Replay System	Reproducir partida paso a paso	Navegación por histórico	Alta
M6.3: Impact Analysis	Mostrar impacto de cada decisión	Gráficos comparativos	Alta
M6.4: Share Results	Generar imagen resumen	Exportable a PNG	Baja
7.8 Fase 7: Testing y Optimización (Semanas 20-22)
Objetivo: Producto estable y optimizado

Milestone	Tareas	Criterio Éxito	Complejidad
M7.1: Unit Tests	Testing de funciones core	>80% cobertura	Media
M7.2: Integration Tests	Flujos completos de juego	Sin errores críticos	Alta
M7.3: Performance	Optimizar renders y cálculos	<100ms por acción	Media
M7.4: User Testing	Test con 10 usuarios	Feedback documentado	Baja
8. Especificaciones Técnicas Detalladas
8.1 Stack Tecnológico
Capa	Tecnología	Versión	Justificación
Framework	Next.js	14.x	SSR, routing, optimización
UI Library	React	18.x	Componentes reutilizables
Styling	Tailwind CSS	3.x	Desarrollo rápido, consistencia
State Management	Zustand	4.x	Simple, persistencia fácil
Animations	Framer Motion	10.x	Transiciones fluidas
Charts	D3.js / Recharts	7.x / 2.x	Visualizaciones complejas
Testing	Jest + React Testing Library	29.x	Testing unitario
E2E Testing	Cypress	13.x	Flujos completos
Persistence	IndexedDB (via localForage)	1.x	Grandes volúmenes offline
8.2 API de Escenarios
typescript
interface Scenario {
  id: string;
  name: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: number; // años de juego
  
  // Configuración inicial
  initialResources: ResourceDelta;
  initialHeuristic: HeuristicDelta;
  
  // Topografía simplificada
  terrain: {
    zones: Zone[];
    connections: [string, string, number][]; // zona1, zona2, distancia
  };
  
  // Árbol de decisiones
  decisionTree: {
    nodes: GameNode[];
    rootNodeId: string;
  };
  
  // Eventos predefinidos
  events: ScheduledEvent[];
  
  // Metadata
  author?: string;
  dateCreated: string;
  tags: string[];
}

interface Zone {
  id: string;
  name: string;
  area: number; // hectáreas
  slope: 1 | 2 | 3 | 4 | 5; // 1=plano, 5=muy empinado
  aspect: 'N' | 'S' | 'E' | 'W' | 'flat';
  vegetationType: 'forest' | 'shrub' | 'grass' | 'mixed';
  initialFuelLoad: number; // 0-100
  initialMoisture: number; // 0-100
  accessibility: number; // 0-100
}
8.3 REST Endpoints (Backend Ligero - Opcional)
Si se decide añadir backend para multijugador o almacenamiento en nube:

Endpoint	Método	Descripción	Request	Response
/api/saves	GET	Listar partidas guardadas	-	{ saves: Save[] }
/api/saves	POST	Guardar partida	{ gameState: GameState }	{ id: string }
/api/scenarios	GET	Listar escenarios	?tags=educacion	{ scenarios: Scenario[] }
/api/stats	GET	Estadísticas globales	-	{ totalPlays: number, avgScore: number }
8.4 Rendimiento y Optimización
Lazy Loading: Carga diferida de nodos del árbol

Memoización: Componentes puros con React.memo

Web Workers: Cálculos heurísticos pesados en hilo separado

Compresión: Gzip para archivos JSON grandes

Caching: Service Worker para modo offline

8.5 Seguridad y Privacidad
Datos locales: Por defecto, todo guardado en localStorage/IndexedDB

Anonimización: Si se usan estadísticas, datos anonimizados

GDPR Compliance: Consentimiento explícito para cookies/analytics

Conclusión
"Guardián del Bosque" representa una evolución en los simuladores de gestión ambiental al combinar la profundidad estratégica de los juegos de gestión con la precisión heurística de las herramientas profesionales. Este documento proporciona una hoja de ruta completa para su implementación, desde la arquitectura base hasta los detalles de UI, asegurando que cada fase sea construible de manera incremental y testeable.

Próximos pasos:

Configurar repositorio y entorno de desarrollo

Implementar M0.1-M0.4 (Fundación)

Crear primer escenario de prueba con 5-10 nodos

Validar motor heurístico con datos simulados

El juego no solo entretendrá, sino que educará sobre la compleja realidad de la prevención de incendios forestales, mostrando cómo las decisiones de hoy impactan directamente en las crisis del mañana.

