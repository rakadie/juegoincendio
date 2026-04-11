DOCUMENTOS ADICIONALES PARA DESARROLLO IA-GUIDED
SIMULADOR "GUARDIÁN DEL BOSQUE" - ESPECIFICACIONES COMPLETAS
Tabla de Contenidos
Visión General de Documentación

Especificación de Frontend (Next.js + MapLibre)

Especificación de Backend (Node.js + Fastify + CQRS)

Especificación de Base de Datos (PostgreSQL + PostGIS)

Especificación de API (Contratos OpenAPI)

Especificación de Modelo de Datos (JSON Schema)

Especificación de Algoritmos y Heurísticas

Especificación de UI/UX y Componentes

Especificación de Testing

Especificación de Despliegue y DevOps

Especificación de Seguridad

Especificación de Rendimiento

Plan de Desarrollo por Sprint

1. Visión General de Documentación
1.1 Documentos Necesarios para IA-Guided
Para que una IA (como Claude, Copilot, Cursor) pueda generar código de manera efectiva y consistente, necesitamos los siguientes documentos:

Documento	Propósito	Formato	Prioridad
Especificación de Frontend	Definir componentes, páginas, estado, integración con mapas	Markdown + TypeScript	🔴 Alta
Especificación de Backend	Definir API, servicios, lógica de negocio	Markdown + TypeScript	🔴 Alta
Especificación de Base de Datos	Modelo de datos, relaciones, índices	Prisma + SQL	🔴 Alta
Especificación de API (Contratos)	Endpoints, request/response, validación	OpenAPI (YAML)	🔴 Alta
Especificación de Modelo de Datos	Tipos compartidos frontend/backend	JSON Schema	🟡 Media
Especificación de Algoritmos	Fórmulas heurísticas, propagación de fuego	Markdown + Pseudocódigo	🔴 Alta
Especificación de UI/UX	Mockups, flujos de usuario, componentes	Markdown + Mermaid	🟡 Media
Especificación de Testing	Casos de prueba, cobertura, estrategia	Markdown	🟢 Baja
Especificación de Despliegue	Infraestructura, CI/CD, variables de entorno	Markdown + YAML	🟢 Baja
Especificación de Seguridad	Autenticación, validación, protección	Markdown	🟡 Media
Especificación de Rendimiento	Métricas, objetivos, optimización	Markdown	🟢 Baja
Plan de Desarrollo	Sprints, tareas, dependencias	Markdown + Mermaid	🟡 Media
2. Especificación de Frontend (Next.js + MapLibre)
2.1 Visión General
text
Aplicación: Guardián del Bosque - Frontend
Framework: Next.js 14 (App Router)
Lenguaje: TypeScript 5.x
Estado: Zustand (global) + React Query (server state)
Mapas: MapLibre GL JS + Turf.js
Estilos: Tailwind CSS + Framer Motion
Testing: Vitest + React Testing Library + Cypress
2.2 Estructura de Carpetas Frontend
text
packages/frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Landing page
│   │   ├── game/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx    # Página de juego
│   │   │   │   └── layout.tsx
│   │   │   └── new/
│   │   │       └── page.tsx    # Crear nueva partida
│   │   ├── scenarios/
│   │   │   └── page.tsx        # Explorar escenarios
│   │   └── profile/
│   │       └── page.tsx        # Perfil de usuario
│   │
│   ├── components/
│   │   ├── map/                 # Componentes de mapa
│   │   │   ├── MapViewer.tsx    # Contenedor principal
│   │   │   ├── ZoneLayer.tsx    # Capa de zonas
│   │   │   ├── FireLayer.tsx    # Capa de incendio
│   │   │   ├── HeatmapLayer.tsx # Capa de riesgo
│   │   │   ├── ResourceLayer.tsx # Recursos en mapa
│   │   │   └── MapControls.tsx  # Zoom, capas, etc.
│   │   │
│   │   ├── game/                 # Componentes de juego
│   │   │   ├── DecisionTree/
│   │   │   │   ├── TreeVisualizer.tsx   # Árbol gráfico
│   │   │   │   ├── NodeCard.tsx         # Tarjeta de decisión
│   │   │   │   └── OptionButton.tsx     # Botón de opción
│   │   │   ├── Resources/
│   │   │   │   ├── ResourceBar.tsx      # Barras de recursos
│   │   │   │   ├── ResourceGauge.tsx    # Medidores circulares
│   │   │   │   └── ResourceHistory.tsx  # Gráfico histórico
│   │   │   ├── Season/
│   │   │   │   ├── SeasonIndicator.tsx  # Invierno/Verano
│   │   │   │   └── YearDisplay.tsx      # Año actual
│   │   │   └── Events/
│   │   │       ├── EventNotification.tsx # Eventos emergentes
│   │   │       └── EventLog.tsx         # Historial de eventos
│   │   │
│   │   ├── ui/                    # Componentes genéricos
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── Progress.tsx
│   │   │
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── Sidebar.tsx
│   │       └── GameLayout.tsx
│   │
│   ├── hooks/                     # Custom hooks
│   │   ├── useGame.ts             # Hook principal del juego
│   │   ├── useMap.ts              # Hook para mapa
│   │   ├── useDecision.ts         # Lógica de decisiones
│   │   ├── useResources.ts        # Gestión de recursos
│   │   ├── useFirePropagation.ts  # Simulación de fuego
│   │   └── useHeatmap.ts          # Generación de heatmap
│   │
│   ├── services/                  # Clientes API
│   │   ├── api-client.ts          # Cliente HTTP (fetch/axios)
│   │   ├── game.service.ts        # Endpoints de juego
│   │   ├── map.service.ts         # Endpoints de mapas
│   │   └── scenario.service.ts    # Endpoints de escenarios
│   │
│   ├── store/                      # Estado global (Zustand)
│   │   ├── gameStore.ts
│   │   ├── uiStore.ts
│   │   └── mapStore.ts
│   │
│   ├── types/                       # Tipos TypeScript
│   │   ├── game.types.ts
│   │   ├── map.types.ts
│   │   ├── api.types.ts
│   │   └── shared.types.ts
│   │
│   ├── utils/                        # Utilidades
│   │   ├── geo.utils.ts              # Funciones geoespaciales
│   │   ├── format.utils.ts           # Formateo
│   │   ├── validation.utils.ts        # Validación
│   │   └── constants.ts               # Constantes
│   │
│   └── config/                        # Configuración
│       ├── map.config.ts              # Configuración de mapas
│       └── game.config.ts             # Configuración del juego
│
├── public/                             # Assets estáticos
│   ├── images/
│   ├── icons/
│   └── tiles/                          # Tiles de mapas (caché)
│
├── styles/                              # Estilos globales
│   └── globals.css
│
└── tests/                               # Tests
    ├── unit/
    ├── integration/
    └── e2e/
2.3 Componentes Detallados
2.3.1 MapViewer.tsx
typescript
// packages/frontend/src/components/map/MapViewer.tsx
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapViewerProps {
  /** Coordenadas centrales [lng, lat] */
  center: [number, number];
  /** Nivel de zoom inicial */
  zoom: number;
  /** Estilo del mapa (URL o estilo inline) */
  mapStyle?: string;
  /** Capas a mostrar */
  layers?: MapLayerConfig[];
  /** Callback al hacer click en una zona */
  onZoneClick?: (zoneId: string, feature: GeoJSON.Feature) => void;
  /** Callback al hacer click en el mapa */
  onMapClick?: (lngLat: [number, number]) => void;
  /** Callback cuando el mapa está listo */
  onMapReady?: (map: maplibregl.Map) => void;
  /** Zonas del juego (GeoJSON) */
  zones?: GeoJSON.FeatureCollection;
  /** Perímetro del incendio */
  firePerimeter?: GeoJSON.Feature;
  /** Datos de heatmap */
  heatmapData?: GeoJSON.FeatureCollection;
  /** Recursos desplegados */
  resources?: GeoJSON.FeatureCollection;
  /** Modo interactivo (selección de zonas) */
  interactive?: boolean;
}

export const MapViewer: React.FC<MapViewerProps> = ({
  center,
  zoom,
  mapStyle = 'https://demotiles.maplibre.org/style.json', // Temporal
  layers = [],
  onZoneClick,
  onMapClick,
  onMapReady,
  zones,
  firePerimeter,
  heatmapData,
  resources,
  interactive = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Inicializar mapa
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: center,
      zoom: zoom,
      pitch: 0,
      bearing: 0,
      antialias: true
    });

    // Añadir controles
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.ScaleControl(), 'bottom-left');

    // Esperar a que cargue el mapa
    map.current.on('load', () => {
      if (!map.current) return;
      
      // Añadir fuentes de datos
      addDataSources(map.current);
      
      // Añadir capas
      addLayers(map.current);
      
      // Configurar interacciones
      setupInteractions(map.current);
      
      onMapReady?.(map.current);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Actualizar cuando cambian las props
  useEffect(() => {
    if (!map.current) return;
    updateLayers();
  }, [zones, firePerimeter, heatmapData, resources]);

  const addDataSources = (map: maplibregl.Map) => {
    // Fuente de zonas
    if (zones) {
      map.addSource('zones', {
        type: 'geojson',
        data: zones
      });
    }

    // Fuente de incendio
    if (firePerimeter) {
      map.addSource('fire', {
        type: 'geojson',
        data: firePerimeter
      });
    }

    // Fuente de heatmap
    if (heatmapData) {
      map.addSource('heatmap', {
        type: 'geojson',
        data: heatmapData
      });
    }
  };

  const addLayers = (map: maplibregl.Map) => {
    // Capa base de zonas (relleno)
    map.addLayer({
      id: 'zones-fill',
      type: 'fill',
      source: 'zones',
      paint: {
        'fill-color': [
          'match',
          ['get', 'riskLevel'],
          'high', '#f00',
          'medium', '#ff0',
          'low', '#0f0',
          '#ccc'
        ],
        'fill-opacity': 0.3
      }
    });

    // Capa de bordes de zonas
    map.addLayer({
      id: 'zones-outline',
      type: 'line',
      source: 'zones',
      paint: {
        'line-color': '#000',
        'line-width': 1
      }
    });

    // Capa de incendio
    map.addLayer({
      id: 'fire-perimeter',
      type: 'fill',
      source: 'fire',
      paint: {
        'fill-color': '#f00',
        'fill-opacity': 0.6
      }
    });

    // Capa de heatmap
    map.addLayer({
      id: 'heatmap',
      type: 'heatmap',
      source: 'heatmap',
      paint: {
        'heatmap-weight': 1,
        'heatmap-intensity': 1,
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(0,255,0,0)',
          0.2, 'rgba(0,255,0,0.5)',
          0.4, 'rgba(255,255,0,0.6)',
          0.6, 'rgba(255,128,0,0.7)',
          0.8, 'rgba(255,0,0,0.8)',
          1, 'rgba(128,0,0,1)'
        ],
        'heatmap-radius': 30
      }
    });
  };

  const setupInteractions = (map: maplibregl.Map) => {
    if (!interactive) return;

    // Click en zonas
    map.on('click', 'zones-fill', (e) => {
      if (!e.features?.length) return;
      const feature = e.features[0];
      const zoneId = feature.properties?.id;
      onZoneClick?.(zoneId, feature);
    });

    // Click en mapa (vacío)
    map.on('click', (e) => {
      if (e.originalEvent.defaultPrevented) return;
      onMapClick?.([e.lngLat.lng, e.lngLat.lat]);
    });

    // Cambiar cursor al pasar sobre zonas
    map.on('mouseenter', 'zones-fill', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'zones-fill', () => {
      map.getCanvas().style.cursor = '';
    });
  };

  const updateLayers = () => {
    if (!map.current) return;

    // Actualizar fuente de zonas
    if (zones) {
      const source = map.current.getSource('zones') as maplibregl.GeoJSONSource;
      source.setData(zones);
    }

    // Actualizar fuente de incendio
    if (firePerimeter) {
      const source = map.current.getSource('fire') as maplibregl.GeoJSONSource;
      source.setData(firePerimeter);
    }
  };

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full min-h-[500px] relative"
      data-testid="map-viewer"
    />
  );
};
2.3.2 DecisionTreeVisualizer.tsx
typescript
// packages/frontend/src/components/game/DecisionTree/TreeVisualizer.tsx
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TreeNode {
  id: string;
  title: string;
  description: string;
  type: 'prevention' | 'crisis' | 'consequence';
  children?: TreeNode[];
  position?: { x: number; y: number };
  isAvailable?: boolean;
  isCompleted?: boolean;
}

interface TreeVisualizerProps {
  /** Nodos del árbol */
  nodes: TreeNode[];
  /** Nodo actual seleccionado */
  currentNodeId?: string;
  /** Callback al seleccionar un nodo */
  onNodeSelect?: (nodeId: string) => void;
  /** Ancho del canvas */
  width?: number;
  /** Alto del canvas */
  height?: number;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({
  nodes,
  currentNodeId,
  onNodeSelect,
  width = 800,
  height = 600
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !nodes.length) return;

    // Limpiar SVG
    d3.select(svgRef.current).selectAll('*').remove();

    // Configurar jerarquía D3
    const root = d3.stratify<TreeNode>()
      .id(d => d.id)
      .parentId(d => {
        // Encontrar padre basado en estructura
        for (const node of nodes) {
          if (node.children?.some(c => c.id === d.id)) {
            return node.id;
          }
        }
        return null;
      })(nodes);

    // Crear layout de árbol
    const treeLayout = d3.tree<TreeNode>()
      .size([height - 100, width - 200])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2));

    const treeData = treeLayout(root);

    // Crear SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(50,50)`);

    // Dibujar líneas (enlaces)
    svg.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', d => {
        // Color según estado
        const sourceCompleted = d.source.data.isCompleted;
        const targetCompleted = d.target.data.isCompleted;
        if (sourceCompleted && targetCompleted) return '#4ade80'; // Verde
        if (sourceCompleted) return '#facc15'; // Amarillo
        return '#94a3b8'; // Gris
      })
      .attr('stroke-width', 2)
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
      );

    // Dibujar nodos
    const nodes_ = svg.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .attr('cursor', 'pointer')
      .on('click', (event, d) => {
        onNodeSelect?.(d.data.id);
      });

    // Círculos de nodos
    nodes_.append('circle')
      .attr('r', d => {
        if (d.data.id === currentNodeId) return 12;
        if (d.data.type === 'crisis') return 10;
        return 8;
      })
      .attr('fill', d => {
        if (d.data.id === currentNodeId) return '#3b82f6'; // Azul (actual)
        if (d.data.isCompleted) return '#4ade80'; // Verde (completado)
        if (!d.data.isAvailable) return '#94a3b8'; // Gris (no disponible)
        
        // Color por tipo
        switch (d.data.type) {
          case 'prevention': return '#f59e0b'; // Naranja
          case 'crisis': return '#ef4444'; // Rojo
          case 'consequence': return '#8b5cf6'; // Púrpura
          default: return '#64748b';
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Títulos de nodos (tooltip)
    nodes_.append('title')
      .text(d => d.data.title);

    // Etiquetas (opcional, para debugging)
    if (process.env.NODE_ENV === 'development') {
      nodes_.append('text')
        .attr('dy', -15)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .text(d => d.data.id);
    }

  }, [nodes, currentNodeId, width, height]);

  return (
    <div className="tree-visualizer bg-white rounded-lg shadow-lg p-4 overflow-auto">
      <svg 
        ref={svgRef} 
        className="w-full"
        style={{ minWidth: width, minHeight: height }}
      />
    </div>
  );
};
2.4 Estado Global (Zustand)
typescript
// packages/frontend/src/store/gameStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, ResourceDelta, Decision } from '../types/game.types';

interface GameStore {
  // Estado actual
  gameId: string | null;
  gameState: GameState | null;
  resources: ResourceDelta;
  currentSeason: 'winter' | 'summer' | 'post-fire';
  currentYear: number;
  currentNodeId: string | null;
  availableNodes: string[];
  decisionHistory: Decision[];
  
  // Estado del mapa
  selectedZoneId: string | null;
  mapCenter: [number, number];
  mapZoom: number;
  
  // UI
  isLoading: boolean;
  error: string | null;
  notifications: Array<{ id: string; message: string; type: 'info' | 'success' | 'warning' | 'error' }>;
  
  // Acciones
  setGameId: (id: string) => void;
  setGameState: (state: GameState) => void;
  updateResources: (delta: ResourceDelta) => void;
  setSeason: (season: 'winter' | 'summer' | 'post-fire') => void;
  setCurrentNode: (nodeId: string) => void;
  addDecision: (decision: Decision) => void;
  selectZone: (zoneId: string | null) => void;
  setMapCenter: (center: [number, number]) => void;
  setMapZoom: (zoom: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;
  reset: () => void;
  
  // Acciones compuestas
  takeDecision: (nodeId: string, optionId: string) => Promise<void>;
  advanceSeason: () => Promise<void>;
  loadGame: (gameId: string) => Promise<void>;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      gameId: null,
      gameState: null,
      resources: {
        money: 1000,
        water: 500,
        personnel: 10,
        equipment: 5,
        communitySupport: 50,
        forestHealth: 80,
        fuelLoad: 50,
        moisture: 60,
        accessibility: 70
      },
      currentSeason: 'winter',
      currentYear: 1,
      currentNodeId: null,
      availableNodes: [],
      decisionHistory: [],
      selectedZoneId: null,
      mapCenter: [-3.7, 40.4], // Centro de España por defecto
      mapZoom: 8,
      isLoading: false,
      error: null,
      notifications: [],

      // Setters básicos
      setGameId: (id) => set({ gameId: id }),
      setGameState: (state) => set({ gameState: state }),
      updateResources: (delta) => set((state) => ({
        resources: {
          ...state.resources,
          money: (state.resources.money || 0) + (delta.money || 0),
          water: (state.resources.water || 0) + (delta.water || 0),
          personnel: (state.resources.personnel || 0) + (delta.personnel || 0),
          equipment: (state.resources.equipment || 0) + (delta.equipment || 0),
          communitySupport: Math.max(0, Math.min(100, 
            (state.resources.communitySupport || 50) + (delta.communitySupport || 0)
          )),
          forestHealth: Math.max(0, Math.min(100,
            (state.resources.forestHealth || 80) + (delta.forestHealth || 0)
          )),
          fuelLoad: Math.max(0, Math.min(100,
            (state.resources.fuelLoad || 50) + (delta.fuelLoad || 0)
          )),
          moisture: Math.max(0, Math.min(100,
            (state.resources.moisture || 60) + (delta.moisture || 0)
          )),
          accessibility: Math.max(0, Math.min(100,
            (state.resources.accessibility || 70) + (delta.accessibility || 0)
          ))
        }
      })),
      setSeason: (season) => set({ currentSeason: season }),
      setCurrentNode: (nodeId) => set({ currentNodeId: nodeId }),
      addDecision: (decision) => set((state) => ({
        decisionHistory: [...state.decisionHistory, decision]
      })),
      selectZone: (zoneId) => set({ selectedZoneId: zoneId }),
      setMapCenter: (center) => set({ mapCenter: center }),
      setMapZoom: (zoom) => set({ mapZoom: zoom }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      addNotification: (message, type) => set((state) => ({
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          message,
          type
        }]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      reset: () => set({
        gameId: null,
        gameState: null,
        resources: {
          money: 1000,
          water: 500,
          personnel: 10,
          equipment: 5,
          communitySupport: 50,
          forestHealth: 80,
          fuelLoad: 50,
          moisture: 60,
          accessibility: 70
        },
        currentSeason: 'winter',
        currentYear: 1,
        currentNodeId: null,
        availableNodes: [],
        decisionHistory: [],
        selectedZoneId: null,
        error: null,
        notifications: []
      }),

      // Acciones compuestas (con llamadas API)
      takeDecision: async (nodeId, optionId) => {
        const { gameId, setLoading, setError, addNotification } = get();
        
        if (!gameId) {
          setError('No hay partida activa');
          return;
        }

        setLoading(true);
        try {
          const response = await fetch(`/api/games/${gameId}/decisions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nodeId, optionId })
          });

          if (!response.ok) {
            throw new Error('Error al tomar decisión');
          }

          const data = await response.json();
          
          // Actualizar estado local
          set({
            resources: data.resources,
            currentSeason: data.season,
            currentNodeId: data.nextNodeId,
            availableNodes: data.availableNodes
          });
          
          get().addDecision({
            nodeId,
            optionId,
            timestamp: new Date().toISOString(),
            effects: data.effects
          });

          addNotification('Decisión registrada', 'success');
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Error desconocido');
          addNotification('Error al tomar decisión', 'error');
        } finally {
          setLoading(false);
        }
      },

      advanceSeason: async () => {
        const { gameId, setLoading, setError, addNotification } = get();
        
        if (!gameId) return;

        setLoading(true);
        try {
          const response = await fetch(`/api/games/${gameId}/advance-season`, {
            method: 'POST'
          });

          if (!response.ok) {
            throw new Error('Error al avanzar temporada');
          }

          const data = await response.json();
          
          set({
            currentSeason: data.season,
            currentYear: data.year,
            resources: data.resources,
            availableNodes: data.availableNodes
          });

          addNotification(`Ha llegado el ${data.season === 'summer' ? 'verano' : 'invierno'}`, 'info');
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
          setLoading(false);
        }
      },

      loadGame: async (gameId) => {
        const { setLoading, setError } = get();
        
        setLoading(true);
        try {
          const response = await fetch(`/api/games/${gameId}`);
          
          if (!response.ok) {
            throw new Error('Error al cargar partida');
          }

          const data = await response.json();
          
          set({
            gameId: data.id,
            resources: data.resources,
            currentSeason: data.season,
            currentYear: data.year,
            currentNodeId: data.currentNodeId,
            availableNodes: data.availableNodes,
            decisionHistory: data.decisionHistory,
            mapCenter: data.mapCenter || [-3.7, 40.4],
            mapZoom: data.mapZoom || 8
          });
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'guardian-game-storage', // nombre en localStorage
      partialize: (state) => ({
        // Solo persistir ciertos campos
        gameId: state.gameId,
        resources: state.resources,
        currentSeason: state.currentSeason,
        currentYear: state.currentYear,
        decisionHistory: state.decisionHistory
      })
    }
  )
);
3. Especificación de Backend (Node.js + Fastify + CQRS)
3.1 Visión General
text
Aplicación: Guardián del Bosque - Backend
Runtime: Node.js 20+
Framework: Fastify 4.x
Lenguaje: TypeScript 5.x
Arquitectura: Hexagonal + CQRS + DDD
Base de Datos: PostgreSQL + PostGIS
Cache: Redis
Message Queue: RabbitMQ (opcional)
Testing: Vitest
3.2 Estructura de Carpetas Backend
text
packages/infrastructure/
├── src/
│   ├── server.ts                 # Punto de entrada
│   ├── app.ts                     # Configuración de Fastify
│   │
│   ├── adapters/
│   │   ├── input/                  # Driving adapters
│   │   │   ├── rest/                # API REST
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── game.controller.ts
│   │   │   │   │   ├── scenario.controller.ts
│   │   │   │   │   └── map.controller.ts
│   │   │   │   ├── routes/
│   │   │   │   │   ├── game.routes.ts
│   │   │   │   │   ├── scenario.routes.ts
│   │   │   │   │   └── map.routes.ts
│   │   │   │   ├── middleware/
│   │   │   │   │   ├── auth.middleware.ts
│   │   │   │   │   ├── validation.middleware.ts
│   │   │   │   │   └── error.middleware.ts
│   │   │   │   └── schemas/         # Validación de requests
│   │   │   │       ├── game.schemas.ts
│   │   │   │       └── scenario.schemas.ts
│   │   │   │
│   │   │   ├── graphql/              # (opcional)
│   │   │   └── websocket/            # Tiempo real
│   │   │       └── fire.ws.ts
│   │   │
│   │   └── output/                 # Driven adapters
│   │       ├── repositories/
│   │       │   ├── postgres/
│   │       │   │   ├── game.repository.adapter.ts
│   │       │   │   ├── zone.repository.adapter.ts
│   │       │   │   ├── decision.repository.adapter.ts
│   │       │   │   └── prisma.client.ts
│   │       │   └── redis/
│   │       │       └── cache.repository.adapter.ts
│   │       │
│   │       ├── services/
│   │       │   ├── map/
│   │       │   │   ├── gdal.service.adapter.ts
│   │       │   │   └── tile.service.adapter.ts
│   │       │   ├── weather/
│   │       │   │   └── weather-api.adapter.ts
│   │       │   └── notification/
│   │       │       └── email.service.adapter.ts
│   │       │
│   │       └── event-bus/
│   │           ├── rabbitmq/
│   │           │   └── rabbitmq.adapter.ts
│   │           └── in-memory/
│   │               └── in-memory.bus.ts
│   │
│   ├── config/                      # Configuración
│   │   ├── env.config.ts
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   └── map.config.ts
│   │
│   └── utils/                        # Utilidades
│       ├── logger.ts
│       ├── metrics.ts
│       └── errors.ts
│
├── prisma/                           # Esquema de base de datos
│   ├── schema.prisma
│   └── migrations/
│
├── tests/                             # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── scripts/                           # Scripts de utilidad
    ├── seed.ts
    └── process-maps.ts
3.3 Server Principal
typescript
// packages/infrastructure/src/server.ts
import 'dotenv/config';
import Fastify from 'fastify';
import { setupApp } from './app';
import { logger } from './utils/logger';

const startServer = async () => {
  const fastify = Fastify({
    logger: true,
    trustProxy: true,
    bodyLimit: 10 * 1024 * 1024 // 10MB
  });

  // Configurar aplicación
  await setupApp(fastify);

  // Health check
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Iniciar servidor
  const port = parseInt(process.env.PORT || '3001', 10);
  const host = process.env.HOST || '0.0.0.0';

  try {
    await fastify.listen({ port, host });
    logger.info(`🚀 Servidor iniciado en http://${host}:${port}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  // Graceful shutdown
  const signals = ['SIGINT', 'SIGTERM'];
  signals.forEach(signal => {
    process.on(signal, async () => {
      logger.info(`Recibida señal ${signal}, cerrando servidor...`);
      await fastify.close();
      process.exit(0);
    });
  });
};

startServer();
3.4 Configuración de Fastify
typescript
// packages/infrastructure/src/app.ts
import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

// Importar adaptadores
import { PostgresGameRepository } from './adapters/output/repositories/postgres/game.repository.adapter';
import { InMemoryEventBus } from './adapters/output/event-bus/in-memory/in-memory.bus';
import { RedisCacheRepository } from './adapters/output/repositories/redis/cache.repository.adapter';

// Importar puertos (desde core)
import { GameRepositoryPort } from '@core/ports/output/repositories/game-repository.port';
import { EventBusPort } from '@core/ports/output/event-bus.port';
import { CachePort } from '@core/ports/output/cache.port';

// Importar casos de uso (desde core)
import { CreateGameCommand } from '@core/application/commands/create-game.command';
import { TakeDecisionCommand } from '@core/application/commands/take-decision.command';
import { GetGameQuery } from '@core/application/queries/get-game.query';

// Importar controladores
import { gameRoutes } from './adapters/input/rest/routes/game.routes';
import { scenarioRoutes } from './adapters/input/rest/routes/scenario.routes';
import { mapRoutes } from './adapters/input/rest/routes/map.routes';

// Importar middleware
import { errorHandler } from './adapters/input/rest/middleware/error.middleware';

export async function setupApp(fastify: FastifyInstance) {
  // Plugins globales
  await fastify.register(fastifyCors, {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true
  });

  await fastify.register(fastifyHelmet, {
    contentSecurityPolicy: false
  });

  await fastify.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute'
  });

  // Swagger/OpenAPI
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Guardián del Bosque API',
        description: 'API para el simulador de prevención de incendios',
        version: '1.0.0'
      },
      servers: [{ url: 'http://localhost:3001' }]
    }
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/documentation'
  });

  // Inicializar adaptadores
  const gameRepository: GameRepositoryPort = new PostgresGameRepository();
  const eventBus: EventBusPort = new InMemoryEventBus();
  const cache: CachePort = new RedisCacheRepository();

  // Inicializar buses CQRS (desde core)
  const commandBus = createCommandBus({ gameRepository, eventBus });
  const queryBus = createQueryBus({ gameRepository, cache });

  // Inyectar dependencias en controladores
  fastify.decorate('commandBus', commandBus);
  fastify.decorate('queryBus', queryBus);

  // Registrar rutas
  await fastify.register(gameRoutes, { prefix: '/api/games' });
  await fastify.register(scenarioRoutes, { prefix: '/api/scenarios' });
  await fastify.register(mapRoutes, { prefix: '/api/maps' });

  // Middleware de errores
  fastify.setErrorHandler(errorHandler);

  return fastify;
}
3.5 Controlador REST
typescript
// packages/infrastructure/src/adapters/input/rest/controllers/game.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateGameCommand } from '@core/application/commands/create-game.command';
import { TakeDecisionCommand } from '@core/application/commands/take-decision.command';
import { AdvanceSeasonCommand } from '@core/application/commands/advance-season.command';
import { GetGameQuery } from '@core/application/queries/get-game.query';
import { GetHeatmapQuery } from '@core/application/queries/get-heatmap.query';
import { GetAvailableNodesQuery } from '@core/application/queries/get-available-nodes.query';

interface CreateGameBody {
  scenarioId: string;
  playerName: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface DecisionParams {
  id: string;
}

interface DecisionBody {
  nodeId: string;
  optionId: string;
}

export class GameController {
  constructor(
    private readonly commandBus: any,
    private readonly queryBus: any
  ) {}

  async createGame(
    request: FastifyRequest<{ Body: CreateGameBody }>,
    reply: FastifyReply
  ) {
    const { scenarioId, playerName, difficulty = 'medium' } = request.body;

    const command = new CreateGameCommand({
      scenarioId,
      playerName,
      difficulty,
      timestamp: new Date()
    });

    const result = await this.commandBus.dispatch(command);

    if (result.isFailure()) {
      return reply.status(400).send({
        error: 'CREATE_GAME_FAILED',
        message: result.error
      });
    }

    return reply.status(201).send({
      id: result.value.id,
      message: 'Partida creada correctamente'
    });
  }

  async getGame(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    const query = new GetGameQuery({ gameId: id });
    const result = await this.queryBus.dispatch(query);

    if (!result) {
      return reply.status(404).send({
        error: 'GAME_NOT_FOUND',
        message: 'No se encontró la partida'
      });
    }

    return reply.send(result);
  }

  async takeDecision(
    request: FastifyRequest<{
      Params: DecisionParams;
      Body: DecisionBody;
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { nodeId, optionId } = request.body;

    const command = new TakeDecisionCommand({
      gameId: id,
      nodeId,
      optionId,
      timestamp: new Date()
    });

    const result = await this.commandBus.dispatch(command);

    if (result.isFailure()) {
      return reply.status(400).send({
        error: 'DECISION_FAILED',
        message: result.error
      });
    }

    return reply.send({
      success: true,
      effects: result.value.effects,
      nextNodeId: result.value.nextNodeId,
      resources: result.value.resources,
      season: result.value.season
    });
  }

  async getHeatmap(
    request: FastifyRequest<{
      Params: { id: string };
      Querystring: { resolution?: 'low' | 'medium' | 'high' };
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { resolution = 'medium' } = request.query;

    const query = new GetHeatmapQuery({
      gameId: id,
      resolution
    });

    const result = await this.queryBus.dispatch(query);

    return reply.send({
      type: 'FeatureCollection',
      features: result.zones.map(zone => ({
        type: 'Feature',
        geometry: zone.geometry,
        properties: {
          id: zone.id,
          riskLevel: zone.riskLevel,
          fuelLoad: zone.fuelLoad,
          moisture: zone.moisture
        }
      }))
    });
  }

  async getAvailableNodes(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    const query = new GetAvailableNodesQuery({ gameId: id });
    const nodes = await this.queryBus.dispatch(query);

    return reply.send({ nodes });
  }
}
4. Especificación de Base de Datos (PostgreSQL + PostGIS)
4.1 Esquema Prisma
prisma
// packages/infrastructure/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [postgis]
}

// Usuarios del sistema
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String?
  provider      String?   @default("local") // local, google, etc.
  providerId    String?   @unique
  role          String    @default("user") // user, admin
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  games         Game[]
  scenarios     Scenario[] // Escenarios creados por el usuario
}

// Partidas guardadas
model Game {
  id            String    @id @default(cuid())
  userId        String?
  user          User?     @relation(fields: [userId], references: [id])
  
  name          String?   // Nombre de la partida
  scenarioId    String    // Escenario base
  scenario      Scenario  @relation(fields: [scenarioId], references: [id])
  
  difficulty    String    @default("medium") // easy, medium, hard
  status        String    @default("active") // active, finished, abandoned
  
  // Estado del juego (serializado)
  state         Json      // Estado actual del juego
  
  // Metadatos
  currentSeason String    @default("winter")
  currentYear   Int       @default(1)
  score         Int?      // Puntuación final
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  completedAt   DateTime?
  
  // Relaciones
  zones         Zone[]
  decisions     Decision[]
  resourcesHistory ResourcesHistory[]
}

// Zonas forestales (con geometría)
model Zone {
  id            String    @id @default(cuid())
  gameId        String
  game          Game      @relation(fields: [gameId], references: [id])
  
  // Geometría PostGIS (se maneja con SQL raw para operaciones espaciales)
  geometry      Unsupported("geometry(Polygon,4326)")?
  
  // Propiedades como JSON
  properties    Json
  
  // Estado actual
  fireStatus    String    @default("not_affected") // not_affected, burning, burned
  fuelLoad      Float     @default(50) // 0-100
  moisture      Float     @default(50) // 0-100
  riskLevel     String    @default("low") // low, medium, high
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([gameId])
  @@index([fireStatus])
}

// Historial de decisiones
model Decision {
  id            String    @id @default(cuid())
  gameId        String
  game          Game      @relation(fields: [gameId], references: [id])
  
  nodeId        String    // ID del nodo en el árbol
  optionId      String    // ID de la opción elegida
  takenAt       DateTime  @default(now())
  
  // Efectos (snapshot)
  effects       Json      // Efectos aplicados
  resources     Json      // Recursos después de la decisión
  season        String    // Temporada en que se tomó
  
  @@index([gameId])
  @@index([takenAt])
}

// Historial de recursos (para gráficos)
model ResourcesHistory {
  id            String    @id @default(cuid())
  gameId        String
  game          Game      @relation(fields: [gameId], references: [id])
  
  timestamp     DateTime  @default(now())
  resources     Json      // Snapshot de recursos
  
  season        String
  year          Int
  
  @@index([gameId, timestamp])
}

// Escenarios predefinidos
model Scenario {
  id            String    @id @default(cuid())
  name          String    @unique
  description   String?
  authorId      String?
  author        User?     @relation(fields: [authorId], references: [id])
  
  // Ubicación
  centerLat     Float
  centerLng     Float
  zoomLevel     Int       @default(12)
  
  // Datos del escenario
  dataSource    String?   // Fuente de los datos (Copernicus, etc.)
  metadata      Json      // Metadatos adicionales
  
  // Archivos asociados
  geojsonPath   String?   // Ruta al archivo GeoJSON
  
  difficulty    String    @default("medium")
  isPublic      Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  games         Game[]
  
  @@index([isPublic])
}

// Eventos del sistema (para auditoría)
model SystemEvent {
  id            String    @id @default(cuid())
  type          String    // game_started, decision_taken, fire_started, etc.
  gameId        String?
  userId        String?
  
  data          Json      // Datos del evento
  timestamp     DateTime  @default(now())
  
  @@index([timestamp])
  @@index([type])
}
4.2 Funciones SQL para PostGIS
sql
-- packages/infrastructure/prisma/migrations/01_postgis_functions.sql

-- Habilitar extensión PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Función para calcular área de zona en hectáreas
CREATE OR REPLACE FUNCTION zone_area_hectares(geometry geometry)
RETURNS float AS $$
BEGIN
  RETURN ST_Area(geometry::geography) / 10000;
END;
$$ LANGUAGE plpgsql;

-- Función para encontrar zonas adyacentes
CREATE OR REPLACE FUNCTION find_adjacent_zones(zone_id varchar)
RETURNS TABLE (
  adjacent_id varchar,
  distance float
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    z2.id,
    ST_Distance(z1.geometry::geography, z2.geometry::geography) as distance
  FROM zone z1
  JOIN zone z2 ON ST_Touches(z1.geometry, z2.geometry)
  WHERE z1.id = zone_id
    AND z2.id != zone_id;
END;
$$ LANGUAGE plpgsql;

-- Función para calcular pendiente media de una zona
CREATE OR REPLACE FUNCTION average_slope(zone_geometry geometry, dem_raster raster)
RETURNS float AS $$
BEGIN
  -- Requiere tener un DEM en la base de datos
  RETURN (
    SELECT AVG(ST_Value(dem_raster, geom))
    FROM ST_DumpPoints(zone_geometry) AS points
    WHERE ST_Within(points.geom, zone_geometry)
  );
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar nivel de riesgo basado en condiciones
CREATE OR REPLACE FUNCTION update_zone_risk()
RETURNS trigger AS $$
BEGIN
  -- Calcular nivel de riesgo basado en fuelLoad y moisture
  NEW.riskLevel := CASE
    WHEN NEW.fuelLoad > 70 AND NEW.moisture < 30 THEN 'high'
    WHEN NEW.fuelLoad > 50 OR NEW.moisture < 50 THEN 'medium'
    ELSE 'low'
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar riesgo automáticamente
CREATE TRIGGER zone_risk_update
  BEFORE INSERT OR UPDATE ON zone
  FOR EACH ROW
  EXECUTE FUNCTION update_zone_risk();

-- Índices espaciales
CREATE INDEX idx_zones_geometry ON zone USING GIST(geometry);
CREATE INDEX idx_zones_game_geometry ON zone USING GIST(game_id, geometry);
4.3 Repositorio con PostGIS
typescript
// packages/infrastructure/src/adapters/output/repositories/postgres/zone.repository.adapter.ts
import { PrismaClient } from '@prisma/client';
import { ZoneRepositoryPort } from '@core/ports/output/repositories/zone-repository.port';
import { ForestZone } from '@core/domain/entities/forest-zone';
import { Coordinates } from '@core/domain/value-objects/coordinates';
import { prisma } from './prisma.client';

export class PostgresZoneRepository implements ZoneRepositoryPort {
  async findById(id: string): Promise<ForestZone | null> {
    const zone = await prisma.zone.findUnique({
      where: { id }
    });

    if (!zone) return null;

    return this.mapToDomain(zone);
  }

  async findByGameId(gameId: string): Promise<ForestZone[]> {
    const zones = await prisma.zone.findMany({
      where: { gameId }
    });

    return zones.map(z => this.mapToDomain(z));
  }

  async findByPoint(point: Coordinates): Promise<ForestZone[]> {
    // Usar SQL raw para consulta espacial
    const zones = await prisma.$queryRaw`
      SELECT *
      FROM zone
      WHERE ST_Contains(
        geometry,
        ST_SetSRID(ST_MakePoint(${point.longitude}, ${point.latitude}), 4326)
      )
    `;

    return (zones as any[]).map(z => this.mapToDomain(z));
  }

  async findAdjacent(zoneId: string): Promise<ForestZone[]> {
    const zones = await prisma.$queryRaw`
      SELECT z2.*
      FROM zone z1
      JOIN zone z2 ON ST_Touches(z1.geometry, z2.geometry)
      WHERE z1.id = ${zoneId}
        AND z2.id != ${zoneId}
    `;

    return (zones as any[]).map(z => this.mapToDomain(z));
  }

  async save(zone: ForestZone): Promise<void> {
    const data = this.mapToPersistence(zone);

    await prisma.zone.upsert({
      where: { id: zone.getId() },
      update: data,
      create: data
    });
  }

  async saveMany(zones: ForestZone[]): Promise<void> {
    await prisma.$transaction(
      zones.map(zone => prisma.zone.upsert({
        where: { id: zone.getId() },
        update: this.mapToPersistence(zone),
        create: this.mapToPersistence(zone)
      }))
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.zone.delete({
      where: { id }
    });
  }

  private mapToDomain(record: any): ForestZone {
    return ForestZone.create({
      id: record.id,
      geometry: record.geometry,
      properties: record.properties,
      fireStatus: record.fireStatus,
      fuelLoad: record.fuelLoad,
      moisture: record.moisture
    });
  }

  private mapToPersistence(zone: ForestZone): any {
    return {
      id: zone.getId(),
      gameId: zone.getGameId(),
      geometry: zone.getGeometry(),
      properties: zone.getProperties(),
      fireStatus: zone.getFireStatus(),
      fuelLoad: zone.getFuelLoad(),
      moisture: zone.getMoisture()
    };
  }
}
5. Especificación de API (Contratos OpenAPI)
5.1 OpenAPI Specification (YAML)
yaml
# packages/api-contracts/openapi.yaml
openapi: 3.0.0
info:
  title: Guardián del Bosque API
  version: 1.0.0
  description: API para el simulador de prevención de incendios forestales
servers:
  - url: http://localhost:3001/api
    description: Desarrollo
  - url: https://api.guardiandelbosque.com
    description: Producción

components:
  schemas:
    # Recursos del juego
    Resources:
      type: object
      properties:
        money:
          type: number
          description: Presupuesto disponible
          example: 1000
        water:
          type: number
          description: Agua disponible
          example: 500
        personnel:
          type: number
          description: Personal disponible
          example: 10
        equipment:
          type: number
          description: Equipamiento disponible
          example: 5
        communitySupport:
          type: number
          description: Apoyo de la comunidad (0-100)
          example: 50
        forestHealth:
          type: number
          description: Salud del bosque (0-100)
          example: 80
        fuelLoad:
          type: number
          description: Carga de combustible (0-100)
          example: 50
        moisture:
          type: number
          description: Humedad del suelo (0-100)
          example: 60
        accessibility:
          type: number
          description: Accesibilidad del terreno (0-100)
          example: 70

    # Zona forestal
    Zone:
      type: object
      properties:
        id:
          type: string
          example: "zone-123"
        geometry:
          type: object
          description: GeoJSON Polygon
        properties:
          type: object
          properties:
            area:
              type: number
              description: Área en hectáreas
            slope:
              type: number
              description: Pendiente media en grados
            vegetationType:
              type: string
              enum: [forest, shrub, grass, mixed]
        fireStatus:
          type: string
          enum: [not_affected, burning, burned]
        fuelLoad:
          type: number
        moisture:
          type: number
        riskLevel:
          type: string
          enum: [low, medium, high]

    # Decisión
    Decision:
      type: object
      properties:
        nodeId:
          type: string
        optionId:
          type: string
        timestamp:
          type: string
          format: date-time
        effects:
          type: object
          additionalProperties: true

    # Partida
    Game:
      type: object
      properties:
        id:
          type: string
        scenarioId:
          type: string
        difficulty:
          type: string
          enum: [easy, medium, hard]
        status:
          type: string
          enum: [active, finished, abandoned]
        resources:
          $ref: '#/components/schemas/Resources'
        currentSeason:
          type: string
          enum: [winter, summer, post-fire]
        currentYear:
          type: integer
        zones:
          type: array
          items:
            $ref: '#/components/schemas/Zone'
        createdAt:
          type: string
          format: date-time

    # Escenario
    Scenario:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        centerLat:
          type: number
        centerLng:
          type: number
        zoomLevel:
          type: integer
        difficulty:
          type: string
        isPublic:
          type: boolean

    # Error
    Error:
      type: object
      properties:
        error:
          type: string
        message:
          type: string
        details:
          type: object

  responses:
    NotFound:
      description: Recurso no encontrado
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    BadRequest:
      description: Petición incorrecta
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

paths:
  # GAMES
  /games:
    post:
      summary: Crear nueva partida
      tags: [Games]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [scenarioId, playerName]
              properties:
                scenarioId:
                  type: string
                playerName:
                  type: string
                difficulty:
                  type: string
                  enum: [easy, medium, hard]
                  default: medium
      responses:
        '201':
          description: Partida creada
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  message:
                    type: string

  /games/{id}:
    get:
      summary: Obtener información de partida
      tags: [Games]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Partida encontrada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Game'
        '404':
          $ref: '#/components/responses/NotFound'

  /games/{id}/decisions:
    post:
      summary: Tomar una decisión
      tags: [Games]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [nodeId, optionId]
              properties:
                nodeId:
                  type: string
                optionId:
                  type: string
      responses:
        '200':
          description: Decisión procesada
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  effects:
                    type: object
                  nextNodeId:
                    type: string
                  resources:
                    $ref: '#/components/schemas/Resources'
                  season:
                    type: string
        '400':
          $ref: '#/components/responses/BadRequest'

  /games/{id}/heatmap:
    get:
      summary: Obtener heatmap de riesgo
      tags: [Games, Maps]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
        - name: resolution
          in: query
          schema:
            type: string
            enum: [low, medium, high]
            default: medium
      responses:
        '200':
          description: Heatmap generado
          content:
            application/geo+json:
              schema:
                type: object
                properties:
                  type:
                    type: string
                    enum: [FeatureCollection]
                  features:
                    type: array
                    items:
                      type: object

  /games/{id}/advance-season:
    post:
      summary: Avanzar a la siguiente temporada
      tags: [Games]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Temporada avanzada
          content:
            application/json:
              schema:
                type: object
                properties:
                  season:
                    type: string
                  year:
                    type: integer
                  resources:
                    $ref: '#/components/schemas/Resources'

  # SCENARIOS
  /scenarios:
    get:
      summary: Listar escenarios disponibles
      tags: [Scenarios]
      parameters:
        - name: difficulty
          in: query
          schema:
            type: string
            enum: [easy, medium, hard]
        - name: search
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Lista de escenarios
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Scenario'

  /scenarios/{id}:
    get:
      summary: Obtener detalles de un escenario
      tags: [Scenarios]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Escenario encontrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Scenario'
        '404':
          $ref: '#/components/responses/NotFound'

  /scenarios/{id}/zones:
    get:
      summary: Obtener zonas de un escenario
      tags: [Scenarios, Maps]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Zonas del escenario
          content:
            application/geo+json:
              schema:
                type: object
                properties:
                  type:
                    type: string
                    enum: [FeatureCollection]
                  features:
                    type: array

  # MAPS
  /maps/tiles/{z}/{x}/{y}:
    get:
      summary: Obtener tile de mapa
      tags: [Maps]
      parameters:
        - name: z
          in: path
          required: true
          schema:
            type: integer
        - name: x
          in: path
          required: true
          schema:
            type: integer
        - name: y
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Tile de mapa
          content:
            image/png:
              schema:
                type: string
                format: binary
6. Especificación de Modelo de Datos (JSON Schema)
json
// packages/shared/schemas/game.schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://guardiandelbosque.com/schemas/game.json",
  "title": "Game",
  "description": "Modelo de datos para una partida del juego",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-f0-9]{24}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
    },
    "scenarioId": {
      "type": "string"
    },
    "playerName": {
      "type": "string",
      "minLength": 3,
      "maxLength": 50
    },
    "difficulty": {
      "type": "string",
      "enum": ["easy", "medium", "hard"],
      "default": "medium"
    },
    "status": {
      "type": "string",
      "enum": ["active", "finished", "abandoned"],
      "default": "active"
    },
    "resources": {
      "$ref": "#/$defs/resources"
    },
    "currentSeason": {
      "type": "string",
      "enum": ["winter", "summer", "post-fire"],
      "default": "winter"
    },
    "currentYear": {
      "type": "integer",
      "minimum": 1,
      "maximum": 10,
      "default": 1
    },
    "zones": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/zone"
      }
    },
    "decisionHistory": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/decision"
      }
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    },
    "completedAt": {
      "type": ["string", "null"],
      "format": "date-time"
    }
  },
  "required": ["id", "scenarioId", "playerName", "resources", "currentSeason", "currentYear"],
  "$defs": {
    "resources": {
      "type": "object",
      "properties": {
        "money": {
          "type": "number",
          "minimum": 0,
          "default": 1000
        },
        "water": {
          "type": "number",
          "minimum": 0,
          "default": 500
        },
        "personnel": {
          "type": "integer",
          "minimum": 0,
          "default": 10
        },
        "equipment": {
          "type": "integer",
          "minimum": 0,
          "default": 5
        },
        "communitySupport": {
          "type": "integer",
          "minimum": 0,
          "maximum": 100,
          "default": 50
        },
        "forestHealth": {
          "type": "integer",
          "minimum": 0,
          "maximum": 100,
          "default": 80
        },
        "fuelLoad": {
          "type": "integer",
          "minimum": 0,
          "maximum": 100,
          "default": 50
        },
        "moisture": {
          "type": "integer",
          "minimum": 0,
          "maximum": 100,
          "default": 60
        },
        "accessibility": {
          "type": "integer",
          "minimum": 0,
          "maximum": 100,
          "default": 70
        }
      },
      "additionalProperties": false
    },
    "zone": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "geometry": {
          "type": "object",
          "description": "GeoJSON geometry object"
        },
        "properties": {
          "type": "object",
          "properties": {
            "area": {
              "type": "number"
            },
            "slope": {
              "type": "number"
            },
            "vegetationType": {
              "type": "string",
              "enum": ["forest", "shrub", "grass", "mixed"]
            }
          }
        },
        "fireStatus": {
          "type": "string",
          "enum": ["not_affected", "burning", "burned"],
          "default": "not_affected"
        },
        "fuelLoad": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "moisture": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "riskLevel": {
          "type": "string",
          "enum": ["low", "medium", "high"]
        }
      },
      "required": ["id", "geometry"]
    },
    "decision": {
      "type": "object",
      "properties": {
        "nodeId": {
          "type": "string"
        },
        "optionId": {
          "type": "string"
        },
        "timestamp": {
          "type": "string",
          "format": "date-time"
        },
        "effects": {
          "type": "object"
        },
        "resources": {
          "$ref": "#/$defs/resources"
        },
        "season": {
          "type": "string"
        }
      },
      "required": ["nodeId", "optionId", "timestamp"]
    }
  }
}
7. Especificación de Algoritmos y Heurísticas
7.1 Algoritmo de Propagación de Incendio
typescript
// packages/core/src/domain/services/fire-propagation.service.ts

export interface PropagationParams {
  /** Velocidad base del viento (km/h) */
  windSpeed: number;
  /** Dirección del viento (grados, 0 = Norte) */
  windDirection: number;
  /** Humedad relativa (%) */
  humidity: number;
  /** Temperatura (°C) */
  temperature: number;
  /** Días desde última lluvia */
  daysSinceRain: number;
}

export interface ZoneFireStatus {
  zoneId: string;
  isBurning: boolean;
  intensity: number; // 0-1
  spreadDirection: number; // grados
  spreadRate: number; // metros/hora
}

export class FirePropagationService {
  /**
   * Calcula la velocidad de propagación usando modelo Rothermel simplificado
   * Basado en: https://www.fs.fed.us/rm/pubs_int/int_gtr224.pdf
   */
  calculateSpreadRate(
    zone: ForestZone,
    params: PropagationParams
  ): number {
    // Factores de combustible (modelo estándar 1-13)
    const fuelFactor = this.getFuelFactor(zone.getVegetationType(), zone.getFuelLoad());
    
    // Factor de pendiente (incremento por cada 10°)
    const slopeFactor = 1 + (zone.getSlope() / 10) * 0.5;
    
    // Factor de viento (exponencial)
    const windFactor = Math.exp(0.0693 * params.windSpeed);
    
    // Factor de humedad (lineal inverso)
    const moistureFactor = 1 - (zone.getMoisture() / 100) * 0.7;
    
    // Factor de temperatura
    const tempFactor = 1 + (params.temperature - 20) * 0.02;
    
    // Velocidad base (m/h)
    const baseRate = 50; // Valor base de referencia
    
    // Velocidad final
    const spreadRate = baseRate * 
      fuelFactor * 
      slopeFactor * 
      windFactor * 
      moistureFactor * 
      tempFactor;
    
    return Math.max(10, Math.min(500, spreadRate)); // Limitar entre 10 y 500 m/h
  }

  /**
   * Determina dirección de propagación (vector resultante)
   */
  calculateSpreadDirection(
    zone: ForestZone,
    params: PropagationParams
  ): number {
    // Dirección predominante: viento + pendiente
    const windDir = params.windDirection;
    const slopeDir = zone.getAspect(); // Orientación de la pendiente
    
    // Vector resultante (media ponderada)
    const windWeight = 0.7;
    const slopeWeight = 0.3;
    
    // Convertir a radianes para calcular vector medio
    const windRad = (windDir * Math.PI) / 180;
    const slopeRad = (slopeDir * Math.PI) / 180;
    
    const avgX = windWeight * Math.cos(windRad) + slopeWeight * Math.cos(slopeRad);
    const avgY = windWeight * Math.sin(windRad) + slopeWeight * Math.sin(slopeRad);
    
    const resultRad = Math.atan2(avgY, avgX);
    const resultDeg = (resultRad * 180) / Math.PI;
    
    return (resultDeg + 360) % 360; // Normalizar a 0-360
  }

  /**
   * Determina qué zonas adyacentes se incendiarán
   */
  determineSpread(
    burningZones: ForestZone[],
    allZones: ForestZone[],
    params: PropagationParams
  ): Map<string, number> {
    const spreadMap = new Map<string, number>();
    
    for (const burningZone of burningZones) {
      // Zonas adyacentes
      const adjacent = this.findAdjacentZones(burningZone, allZones);
      
      for (const adjZone of adjacent) {
        // Probabilidad de ignición basada en distancia y condiciones
        const distance = this.calculateDistance(burningZone, adjZone);
        const spreadRate = this.calculateSpreadRate(burningZone, params);
        
        // Tiempo estimado para alcanzar la zona (horas)
        const timeToReach = distance / spreadRate;
        
        // Probabilidad de ignición (mayor si el tiempo es menor)
        const ignitionProbability = Math.exp(-timeToReach / 3); // Decaimiento exponencial
        
        // Modificar por condiciones de la zona objetivo
        const zoneResistance = this.calculateResistance(adjZone);
        const finalProbability = ignitionProbability * (1 - zoneResistance);
        
        if (finalProbability > 0.3) { // Umbral de ignición
          spreadMap.set(adjZone.getId(), finalProbability);
        }
      }
    }
    
    return spreadMap;
  }

  /**
   * Calcula resistencia de una zona al fuego
   */
  private calculateResistance(zone: ForestZone): number {
    // Factores que aumentan resistencia
    const moistureResistance = zone.getMoisture() / 100 * 0.5;
    const fuelResistance = 1 - (zone.getFuelLoad() / 100) * 0.3;
    const accessibilityResistance = zone.getAccessibility() / 100 * 0.2;
    
    return moistureResistance + fuelResistance + accessibilityResistance;
  }

  /**
   * Factor de combustible según tipo y carga
   */
  private getFuelFactor(vegetationType: string, fuelLoad: number): number {
    const baseFactors: Record<string, number> = {
      'forest': 1.2,
      'shrub': 1.5,
      'grass': 1.8,
      'mixed': 1.3
    };
    
    const baseFactor = baseFactors[vegetationType] || 1.0;
    
    // Ajustar por carga de combustible
    return baseFactor * (0.5 + fuelLoad / 100);
  }

  private findAdjacentZones(zone: ForestZone, allZones: ForestZone[]): ForestZone[] {
    // Implementar búsqueda de zonas adyacentes usando geometría
    return allZones.filter(z => 
      z.getId() !== zone.getId() && 
      this.zonesAreAdjacent(zone, z)
    );
  }

  private zonesAreAdjacent(z1: ForestZone, z2: ForestZone): boolean {
    // Usar Turf.js para verificar adyacencia
    // return turf.booleanTouches(z1.getGeometry(), z2.getGeometry());
    return true; // Simplificado
  }

  private calculateDistance(z1: ForestZone, z2: ForestZone): number {
    // Calcular distancia entre centroides
    // return turf.distance(z1.getCentroid(), z2.getCentroid());
    return 100; // Simplificado (metros)
  }
}
7.2 Algoritmo de Heurística de Riesgo
typescript
// packages/core/src/domain/services/heuristic-calculator.service.ts

export interface RiskFactors {
  /** Riesgo estructural (depende de decisiones pasadas) */
  structural: number;
  /** Riesgo climático (eventos externos) */
  climatic: number;
  /** Riesgo social (apoyo comunitario) */
  social: number;
  /** Riesgo acumulado */
  total: number;
}

export class HeuristicCalculator {
  /**
   * Calcula el nivel de riesgo general del bosque
   */
  calculateOverallRisk(
    zones: ForestZone[],
    resources: Resources,
    weatherForecast: WeatherData
  ): RiskFactors {
    // Riesgo estructural (basado en estado del bosque)
    const structural = this.calculateStructuralRisk(zones);
    
    // Riesgo climático (basado en predicción)
    const climatic = this.calculateClimaticRisk(weatherForecast);
    
    // Riesgo social (basado en apoyo comunitario)
    const social = this.calculateSocialRisk(resources.communitySupport);
    
    // Riesgo total (media ponderada)
    const total = (
      structural * 0.5 +
      climatic * 0.3 +
      social * 0.2
    );
    
    return {
      structural,
      climatic,
      social,
      total: Math.min(1, Math.max(0, total))
    };
  }

  /**
   * Calcula riesgo estructural basado en zonas
   */
  private calculateStructuralRisk(zones: ForestZone[]): number {
    if (zones.length === 0) return 0;
    
    const zoneRisks = zones.map(zone => {
      // Combustible: a mayor carga, mayor riesgo
      const fuelRisk = zone.getFuelLoad() / 100;
      
      // Humedad: a menor humedad, mayor riesgo
      const moistureRisk = 1 - (zone.getMoisture() / 100);
      
      // Pendiente: a mayor pendiente, mayor riesgo
      const slopeRisk = Math.min(1, zone.getSlope() / 45); // 45° es máximo
      
      // Media ponderada
      return fuelRisk * 0.5 + moistureRisk * 0.3 + slopeRisk * 0.2;
    });
    
    // Media de todas las zonas
    return zoneRisks.reduce((a, b) => a + b, 0) / zoneRisks.length;
  }

  /**
   * Calcula riesgo climático
   */
  private calculateClimaticRisk(weather: WeatherData): number {
    // Temperatura: >35°C aumenta riesgo
    const tempRisk = Math.max(0, (weather.temperature - 20) / 30);
    
    // Humedad: <30% aumenta riesgo
    const humidityRisk = Math.max(0, (50 - weather.humidity) / 50);
    
    // Viento: >30km/h aumenta riesgo
    const windRisk = Math.min(1, weather.windSpeed / 60);
    
    // Días sin lluvia
    const droughtRisk = Math.min(1, weather.daysSinceRain / 30);
    
    return (tempRisk + humidityRisk + windRisk + droughtRisk) / 4;
  }

  /**
   * Calcula riesgo social
   */
  private calculateSocialRisk(communitySupport: number): number {
    // A menor apoyo comunitario, mayor riesgo
    return 1 - (communitySupport / 100);
  }

  /**
   * Genera mapa de calor para visualización
   */
  generateHeatmap(
    zones: ForestZone[],
    resolution: 'low' | 'medium' | 'high' = 'medium'
  ): GeoJSON.FeatureCollection {
    const features: GeoJSON.Feature[] = [];
    
    for (const zone of zones) {
      const risk = this.calculateStructuralRisk([zone]);
      
      features.push({
        type: 'Feature',
        geometry: zone.getGeometry(),
        properties: {
          id: zone.getId(),
          riskLevel: this.riskToLevel(risk),
          riskValue: risk,
          fuelLoad: zone.getFuelLoad(),
          moisture: zone.getMoisture()
        }
      });
    }
    
    return {
      type: 'FeatureCollection',
      features
    };
  }

  /**
   * Convierte valor numérico de riesgo a nivel
   */
  private riskToLevel(risk: number): 'low' | 'medium' | 'high' {
    if (risk < 0.3) return 'low';
    if (risk < 0.6) return 'medium';
    return 'high';
  }
}
8. Especificación de UI/UX y Componentes
8.1 Flujo de Usuario Principal
8.2 Mockups de Pantallas Principales
8.2.1 Pantalla de Juego - Invierno
text
┌─────────────────────────────────────────────────────────────┐
│  🏠 Inicio  📊 Estadísticas  👤 Perfil                   [🔔] │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐ ┌─────────────────────────────────┐ │
│ │                     │ │         RECURSOS                 │ │
│ │    MAPA DEL ÁREA    │ │  💰 Dinero:    ████████░░ 800   │ │
│ │                     │ │  💧 Agua:      ████░░░░░░ 200   │ │
│ │    [Mapa interactivo│ │  👥 Personal:  ████████░░ 8/10  │ │
│ │     con zonas       │ │  🚜 Equipo:    ████░░░░░░ 3/5   │ │
│ │     coloreadas por  │ │  ❤️ Comunidad: ████████░ 80%    │ │
│ │     riesgo]         │ │  🌲 Bosque:    ███████░░ 70%    │ │
│ │                     │ │  🔥 Combust:   ████████░░ 75%   │ │
│ │                     │ │  💧 Humedad:   ████░░░░░░ 35%   │ │
│ │                     │ │  🚗 Acceso:    ████████░░ 80%   │ │
│ └─────────────────────┘ └─────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  INVIERNO - AÑO 1 - DECISIÓN 3/8                    │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  📋 ¿Cómo gestionar la limpieza del sotobosque?    │   │
│  │                                                     │   │
│  │  El matorral ha crecido mucho en la zona norte.    │   │
│  │  Tienes varias opciones:                            │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ [A] Limpieza manual (🔴 300€, 👥 5)         │   │   │
│  │  │     Reduce combustible: 🔥 -20%              │   │   │
│  │  │     Efecto: Mejora acceso, bajo impacto      │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ [B] Quema controlada (🔴 200€, 🚜 2)         │   │   │
│  │  │     Reduce combustible: 🔥 -40%              │   │   │
│  │  │     ⚠️ Riesgo: 15% de escape                 │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ [C] No hacer nada (0€)                       │   │   │
│  │  │     Aumenta combustible: 🔥 +10%             │   │   │
│  │  │     Efecto: Comunidad -5%                    │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [🔙 Atrás]                                   [🤖 Asistente]│
└─────────────────────────────────────────────────────────────┘
8.2.2 Pantalla de Juego - Verano (Incendio)
text
┌─────────────────────────────────────────────────────────────┐
│  🏠 Inicio  📊 Estadísticas  👤 Perfil                   [🔔] │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐ ┌─────────────────────────────────┐ │
│ │                     │ │         RECURSOS                 │ │
│ │    INCENDIO ACTIVO  │ │  💰 Dinero:    ████░░░░░░ 400   │ │
│ │                     │ │  💧 Agua:      ██░░░░░░░░ 100   │ │
│ │    [Mapa con zona   │ │  👥 Personal:  ██████░░░░ 6/10  │ │
│ │     en rojo,        │ │  🚜 Equipo:    ██░░░░░░░░ 2/5   │ │
│ │     flechas de      │ │  ❤️ Comunidad: ██████░░░ 60%    │ │
│ │     propagación]    │ │  🌲 Quemado:   ████░░░░░░ 25%   │ │
│ │                     │ │                                 │ │
│ │    🔥 45% QUEMADO   │ │  Viento:  ↑ 25 km/h NE         │ │
│ │                     │ │  Temp:    35°C                  │ │
│ │                     │ │  Humedad:  25%                  │ │
│ └─────────────────────┘ └─────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔥 VERANO - INCENDIO EN PROGRESO - DÍA 2          │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  ⚠️ El fuego avanza hacia el norte a 120 m/h       │   │
│  │                                                     │   │
│  │  📋 ACCIONES DE EMERGENCIA:                         │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ [1] Atacar con brigadas terrestres           │   │   │
│  │  │     💧 Agua: -50  👥 Personal: -3           │   │   │
│  │  │     Efectividad: 70% (accesibilidad)        │   │   │
│  │  │     🔥 Reduce intensidad: -30%              │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ [2] Solicitar medios aéreos                  │   │   │
│  │  │     💰 Dinero: -200  ⏱️ Llegan en 2h        │   │   │
│  │  │     Efectividad: 90% (si viento < 30km/h)   │   │   │
│  │  │     🔥 Reduce intensidad: -50%              │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ [3] Crear cortafuegos urgente                │   │   │
│  │  │     🚜 Equipo: -2  👥 Personal: -4          │   │   │
│  │  │     ⏱️ Tarda 3h                              │   │   │
│  │  │     🔥 Detiene avance en zona seleccionada  │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [⏸️ Pausar]                                   [📊 Análisis]│
└─────────────────────────────────────────────────────────────┘
8.3 Sistema de Notificaciones
typescript
// packages/frontend/src/components/ui/Toast.tsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose: (id: string) => void;
}

const toastStyles = {
  info: 'bg-blue-50 border-blue-500 text-blue-700',
  success: 'bg-green-50 border-green-500 text-green-700',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
  error: 'bg-red-50 border-red-500 text-red-700'
};

const toastIcons = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌'
};

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`fixed bottom-4 right-4 mb-2 p-4 rounded-lg border-l-4 shadow-lg ${toastStyles[type]}`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="text-xl mr-2">{toastIcons[type]}</span>
        <span className="flex-1">{message}</span>
        <button
          onClick={() => onClose(id)}
          className="ml-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

// Contenedor de toasts
export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useGameStore();

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
9. Especificación de Testing
9.1 Estrategia de Testing
Tipo	Herramienta	Cobertura Objetivo	Cuándo ejecutar
Unitarios	Vitest	80% líneas	En cada PR
Integración	Vitest + Supertest	60%	En cada PR
E2E	Cypress	Flujos críticos	Antes de release
Componentes	React Testing Library	70%	En cada PR
Rendimiento	Lighthouse CI	-	En CI
9.2 Tests Unitarios (Dominio)
typescript
// packages/core/src/domain/__tests__/value-objects/coordinates.test.ts
import { describe, it, expect } from 'vitest';
import { Coordinates } from '../../value-objects/coordinates';

describe('Coordinates', () => {
  it('debería crear coordenadas válidas', () => {
    const coords = Coordinates.create(40.4168, -3.7038);
    expect(coords.latitude).toBe(40.4168);
    expect(coords.longitude).toBe(-3.7038);
  });

  it('debería lanzar error con latitud inválida', () => {
    expect(() => Coordinates.create(100, 0)).toThrow('Latitud inválida');
    expect(() => Coordinates.create(-100, 0)).toThrow('Latitud inválida');
  });

  it('debería lanzar error con longitud inválida', () => {
    expect(() => Coordinates.create(0, 200)).toThrow('Longitud inválida');
    expect(() => Coordinates.create(0, -200)).toThrow('Longitud inválida');
  });

  it('debería calcular distancia correctamente (Haversine)', () => {
    const madrid = Coordinates.create(40.4168, -3.7038);
    const barcelona = Coordinates.create(41.3851, 2.1734);
    
    const distance = madrid.distanceTo(barcelona);
    expect(distance).toBeCloseTo(505, 0); // ~505 km
  });

  it('debería comparar igualdad correctamente', () => {
    const c1 = Coordinates.create(40.4168, -3.7038);
    const c2 = Coordinates.create(40.4168, -3.7038);
    const c3 = Coordinates.create(41.3851, 2.1734);
    
    expect(c1.equals(c2)).toBe(true);
    expect(c1.equals(c3)).toBe(false);
  });
});
9.3 Tests de Integración (API)
typescript
// packages/infrastructure/tests/integration/game.routes.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { setupApp } from '../../src/app';
import { prisma } from '../../src/adapters/output/repositories/postgres/prisma.client';

describe('Game Routes', () => {
  const fastify = Fastify();

  beforeAll(async () => {
    await setupApp(fastify);
    await fastify.ready();
    
    // Limpiar base de datos de prueba
    await prisma.decision.deleteMany();
    await prisma.zone.deleteMany();
    await prisma.game.deleteMany();
  });

  afterAll(async () => {
    await fastify.close();
    await prisma.$disconnect();
  });

  it('POST /api/games - debería crear nueva partida', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/games',
      payload: {
        scenarioId: 'scenario-123',
        playerName: 'Test Player',
        difficulty: 'medium'
      }
    });

    expect(response.statusCode).toBe(201);
    
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('id');
    expect(body.message).toBe('Partida creada correctamente');
  });

  it('GET /api/games/:id - debería obtener partida existente', async () => {
    // Primero crear una partida
    const createResponse = await fastify.inject({
      method: 'POST',
      url: '/api/games',
      payload: {
        scenarioId: 'scenario-123',
        playerName: 'Test Player'
      }
    });
    
    const { id } = JSON.parse(createResponse.body);
    
    // Obtener la partida
    const getResponse = await fastify.inject({
      method: 'GET',
      url: `/api/games/${id}`
    });

    expect(getResponse.statusCode).toBe(200);
    
    const game = JSON.parse(getResponse.body);
    expect(game.id).toBe(id);
    expect(game.playerName).toBe('Test Player');
    expect(game.currentSeason).toBe('winter');
  });

  it('POST /api/games/:id/decisions - debería procesar decisión', async () => {
    // Crear partida
    const createResponse = await fastify.inject({
      method: 'POST',
      url: '/api/games',
      payload: {
        scenarioId: 'scenario-123',
        playerName: 'Test Player'
      }
    });
    
    const { id } = JSON.parse(createResponse.body);
    
    // Tomar decisión
    const decisionResponse = await fastify.inject({
      method: 'POST',
      url: `/api/games/${id}/decisions`,
      payload: {
        nodeId: 'node-1',
        optionId: 'option-a'
      }
    });

    expect(decisionResponse.statusCode).toBe(200);
    
    const result = JSON.parse(decisionResponse.body);
    expect(result.success).toBe(true);
    expect(result).toHaveProperty('effects');
    expect(result).toHaveProperty('resources');
  });
});
9.4 Tests E2E (Cypress)
typescript
// packages/frontend/cypress/e2e/game-flow.cy.ts
describe('Flujo completo del juego', () => {
  beforeEach(() => {
    // Interceptar llamadas API
    cy.intercept('POST', '/api/games').as('createGame');
    cy.intercept('GET', '/api/games/*').as('getGame');
    cy.intercept('POST', '/api/games/*/decisions').as('takeDecision');
    
    // Visitar la aplicación
    cy.visit('/');
  });

  it('debería completar una partida desde inicio a fin', () => {
    // Landing page
    cy.contains('Guard
continua
9.4 Tests E2E (Cypress) - Continuación
typescript
// packages/frontend/cypress/e2e/game-flow.cy.ts
describe('Flujo completo del juego', () => {
  beforeEach(() => {
    // Interceptar llamadas API
    cy.intercept('POST', '/api/games').as('createGame');
    cy.intercept('GET', '/api/games/*').as('getGame');
    cy.intercept('POST', '/api/games/*/decisions').as('takeDecision');
    
    // Visitar la aplicación
    cy.visit('/');
  });

  it('debería completar una partida desde inicio a fin', () => {
    // Landing page
    cy.contains('Guardian del Bosque').should('be.visible');
    cy.contains('Nueva Partida').click();
    
    // Seleccionar escenario
    cy.url().should('include', '/scenarios');
    cy.contains('Sierra de Madrid').click();
    cy.contains('Seleccionar').click();
    
    // Configurar dificultad
    cy.contains('Dificultad Media').click();
    cy.contains('Comenzar').click();
    
    // Esperar a que cargue la partida
    cy.wait('@createGame');
    cy.url().should('include', '/game/');
    
    // Verificar elementos de UI
    cy.get('[data-testid="map-viewer"]').should('be.visible');
    cy.contains('INVIERNO').should('be.visible');
    cy.contains('Recursos').should('be.visible');
    
    // Tomar primera decisión
    cy.contains('Limpieza de matorral').click();
    cy.contains('Opción A').click();
    cy.wait('@takeDecision');
    
    // Verificar que se actualizaron recursos
    cy.contains('💰').should('contain', '800'); // 1000 - 200
    
    // Avanzar varias decisiones hasta llegar a verano
    for (let i = 0; i < 5; i++) {
      cy.get('[data-testid="decision-card"]').first().click();
      cy.get('[data-testid="option-button"]').first().click();
      cy.wait('@takeDecision');
    }
    
    // Verificar transición a verano
    cy.contains('VERANO', { timeout: 10000 }).should('be.visible');
    cy.contains('🔥 Incendio Activo').should('be.visible');
    
    // Gestionar incendio
    cy.get('[data-testid="fire-action"]').first().click();
    cy.contains('Atacar con brigadas').click();
    cy.wait('@takeDecision');
    
    // Verificar progreso del incendio
    cy.get('[data-testid="fire-progress"]').should('contain', '%');
    
    // Completar verano
    cy.contains('Avanzar Temporada').click();
    
    // Verificar fin de año
    cy.contains('AÑO 2').should('be.visible');
    cy.contains('INVIERNO').should('be.visible');
  });

  it('debería mostrar heatmap correctamente', () => {
    // Interceptar heatmap
    cy.intercept('GET', '/api/games/*/heatmap*').as('getHeatmap');
    
    // Iniciar partida
    cy.visit('/game/new');
    cy.contains('Comenzar').click();
    
    // Abrir capa de heatmap
    cy.get('[data-testid="map-controls"]').contains('Riesgo').click();
    
    // Verificar que se carga el heatmap
    cy.wait('@getHeatmap');
    
    // Verificar colores en el mapa
    cy.get('[data-testid="map-viewer"] canvas').should('have.css', 'background-image')
      .and('include', 'radial-gradient'); // Heatmap usa gradientes
  });

  it('debería manejar errores de red correctamente', () => {
    // Simular error de red
    cy.intercept('POST', '/api/games/*/decisions', {
      statusCode: 500,
      body: { error: 'Error interno' }
    }).as('failedDecision');
    
    // Iniciar partida
    cy.visit('/game/new');
    cy.contains('Comenzar').click();
    
    // Intentar tomar decisión
    cy.get('[data-testid="decision-card"]').first().click();
    cy.get('[data-testid="option-button"]').first().click();
    
    // Verificar notificación de error
    cy.contains('Error al tomar decisión').should('be.visible');
    
    // Verificar que el juego no se bloquea
    cy.get('[data-testid="decision-card"]').should('be.visible');
  });
});
9.5 Tests de Componentes (React Testing Library)
typescript
// packages/frontend/src/components/map/__tests__/MapViewer.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MapViewer } from '../MapViewer';

// Mock de maplibregl
jest.mock('maplibre-gl', () => ({
  Map: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    addControl: jest.fn(),
    remove: jest.fn(),
    getSource: jest.fn(),
    setData: jest.fn()
  })),
  NavigationControl: jest.fn(),
  ScaleControl: jest.fn()
}));

describe('MapViewer Component', () => {
  const mockZones = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'zone-1',
        geometry: {
          type: 'Polygon',
          coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]
        },
        properties: {
          riskLevel: 'high',
          fuelLoad: 80
        }
      }
    ]
  };

  it('debería renderizar el contenedor del mapa', () => {
    render(
      <MapViewer
        center={[-3.7, 40.4]}
        zoom={8}
      />
    );
    
    expect(screen.getByTestId('map-viewer')).toBeInTheDocument();
  });

  it('debería llamar onZoneClick al hacer click en una zona', async () => {
    const handleZoneClick = jest.fn();
    const user = userEvent.setup();

    render(
      <MapViewer
        center={[-3.7, 40.4]}
        zoom={8}
        zones={mockZones}
        onZoneClick={handleZoneClick}
      />
    );

    // Simular click en zona (requiere mock del evento de mapa)
    const mapInstance = (Map as jest.Mock).mock.results[0].value;
    const clickHandler = mapInstance.on.mock.calls.find(
      call => call[0] === 'click' && call[1] === 'zones-fill'
    )[2];

    // Ejecutar handler con mock del evento
    clickHandler({
      features: [mockZones.features[0]]
    });

    expect(handleZoneClick).toHaveBeenCalledWith(
      'zone-1',
      mockZones.features[0]
    );
  });

  it('debería actualizar capas cuando cambian las props', async () => {
    const { rerender } = render(
      <MapViewer
        center={[-3.7, 40.4]}
        zoom={8}
        zones={mockZones}
      />
    );

    const mapInstance = (Map as jest.Mock).mock.results[0].value;
    const mockSource = { setData: jest.fn() };
    mapInstance.getSource.mockReturnValue(mockSource);

    // Nuevos datos de zonas
    const updatedZones = {
      ...mockZones,
      features: [{
        ...mockZones.features[0],
        properties: { riskLevel: 'medium' }
      }]
    };

    rerender(
      <MapViewer
        center={[-3.7, 40.4]}
        zoom={8}
        zones={updatedZones}
      />
    );

    await waitFor(() => {
      expect(mockSource.setData).toHaveBeenCalledWith(updatedZones);
    });
  });
});
10. Especificación de Despliegue y DevOps
10.1 Infraestructura Objetivo
graph TB
    subgraph "AWS Cloud"
        subgraph "Frontend"
            CF[CloudFront CDN]
            S3[S3 Bucket]
        end
        
        subgraph "Backend"
            ALB[Application Load Balancer]
            ECS[ECS Fargate]
            ECR[ECR Container Registry]
        end
        
        subgraph "Base de Datos"
            RDS[(RDS PostgreSQL<br/>+ PostGIS)]
            Redis[(ElastiCache Redis)]
        end
        
        subgraph "Almacenamiento"
            S3_Geo[S3 - Geo Data]
        end
        
        subgraph "Mensajería"
            MQ[Amazon MQ - RabbitMQ]
        end
    end
    
    subgraph "CI/CD"
        GH[GitHub Actions]
        CodeBuild[AWS CodeBuild]
    end
    
    Usuario --> CF
    CF --> S3
    CF --> ALB
    ALB --> ECS
    ECS --> RDS
    ECS --> Redis
    ECS --> MQ
    ECS --> S3_Geo
    
    GH --> CodeBuild
    CodeBuild --> ECR
    ECR --> ECS
10.2 Configuración de Docker
dockerfile
# Dockerfile.backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY packages/core/package*.json ./packages/core/
COPY packages/infrastructure/package*.json ./packages/infrastructure/
COPY packages/shared/package*.json ./packages/shared/

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Build de TypeScript
RUN npm run build

# Imagen de producción
FROM node:20-alpine

WORKDIR /app

# Copiar desde builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

# Exponer puerto
EXPOSE 3001

# Comando de inicio
CMD ["node", "packages/infrastructure/dist/server.js"]
dockerfile
# Dockerfile.frontend
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
COPY packages/shared/package*.json ./packages/shared/

RUN npm ci

COPY . .

# Build de Next.js
RUN cd packages/frontend && npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/packages/frontend/.next ./.next
COPY --from=builder /app/packages/frontend/public ./public
COPY --from=builder /app/packages/frontend/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
10.3 Configuración de Docker Compose (Desarrollo)
yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgis/postgis:15-3.4
    environment:
      POSTGRES_DB: guardian
      POSTGRES_USER: guardian
      POSTGRES_PASSWORD: guardian123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  rabbitmq:
    image: rabbitmq:3-management-alpine
    environment:
      RABBITMQ_DEFAULT_USER: guardian
      RABBITMQ_DEFAULT_PASS: guardian123
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://guardian:guardian123@postgres:5432/guardian
      REDIS_URL: redis://redis:6379
      RABBITMQ_URL: amqp://guardian:guardian123@rabbitmq:5672
    ports:
      - "3001:3001"
    volumes:
      - ./packages:/app/packages
      - ./node_modules:/app/node_modules
    depends_on:
      - postgres
      - redis
      - rabbitmq
    command: npm run dev:backend

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001/api
    ports:
      - "3000:3000"
    volumes:
      - ./packages/frontend:/app/packages/frontend
      - ./packages/shared:/app/packages/shared
    depends_on:
      - backend
    command: npm run dev:frontend

volumes:
  postgres_data:
  redis_data:
  rabbitmq_data:
10.4 CI/CD con GitHub Actions
yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  AWS_REGION: eu-west-1
  ECR_REPOSITORY: guardian-del-bosque
  ECS_SERVICE: guardian-service
  ECS_CLUSTER: guardian-cluster
  ECS_TASK_DEFINITION: .aws/task-definition.json

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run typecheck
      
      - name: Lint
        run: npm run lint
      
      - name: Unit tests
        run: npm run test:unit
      
      - name: Integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build, tag, and push backend image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: backend-${{ github.sha }}
        run: |
          docker build -f Dockerfile.backend -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
      
      - name: Build, tag, and push frontend image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: frontend-${{ github.sha }}
        run: |
          docker build -f Dockerfile.frontend -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Fill in the new image ID in the Amazon ECS task definition
        id: task-def
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: ${{ env.ECS_TASK_DEFINITION }}
          container-name: guardian-backend
          image: ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:backend-${{ github.sha }}
      
      - name: Deploy Amazon ECS task definition
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: ${{ steps.task-def.outputs.task-definition }}
          service: ${{ env.ECS_SERVICE }}
          cluster: ${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true

  e2e-tests:
    needs: deploy
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          CYPRESS_BASE_URL: https://app.guardiandelbosque.com
10.5 Configuración de Infraestructura como Código (Terraform)
hcl
# terraform/main.tf
provider "aws" {
  region = var.aws_region
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "guardian-vpc"
  }
}

# Subnets
resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name = "guardian-public-${count.index}"
  }
}

resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "guardian-private-${count.index}"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "guardian-igw"
  }
}

# NAT Gateway
resource "aws_eip" "nat" {
  domain = "vpc"
}

resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public[0].id

  tags = {
    Name = "guardian-nat"
  }
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "guardian-public-rt"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main.id
  }

  tags = {
    Name = "guardian-private-rt"
  }
}

# RDS PostgreSQL with PostGIS
resource "aws_db_instance" "postgres" {
  identifier     = "guardian-postgres"
  engine         = "postgres"
  engine_version = "15.3"
  instance_class = "db.t3.medium"

  allocated_storage     = 100
  storage_encrypted     = true
  storage_type         = "gp3"

  db_name  = "guardian"
  username = var.db_username
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  enabled_cloudwatch_logs_exports = ["postgresql"]

  tags = {
    Name = "guardian-postgres"
  }
}

# ElastiCache Redis
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "guardian-redis"
  engine              = "redis"
  node_type           = "cache.t3.micro"
  num_cache_nodes     = 1
  parameter_group_name = "default.redis7"
  port                = 6379

  subnet_group_name = aws_elasticache_subnet_group.main.name
  security_group_ids = [aws_security_group.redis.id]

  tags = {
    Name = "guardian-redis"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "guardian-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "guardian-ecs"
  }
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "guardian-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets           = aws_subnet.public[*].id

  tags = {
    Name = "guardian-alb"
  }
}

# S3 for frontend
resource "aws_s3_bucket" "frontend" {
  bucket = "guardian-del-bosque-frontend"
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

# CloudFront
resource "aws_cloudfront_distribution" "main" {
  enabled = true

  origin {
    domain_name = aws_lb.main.dns_name
    origin_id   = "guardian-backend"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "guardian-frontend"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.frontend.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    target_origin_id       = "guardian-frontend"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  ordered_cache_behavior {
    path_pattern     = "/api/*"
    target_origin_id = "guardian-backend"
    viewer_protocol_policy = "https-only"

    allowed_methods = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
      headers = ["Authorization", "Origin", "Accept"]
    }

    min_ttl     = 0
    default_ttl = 0
    max_ttl     = 0
  }

  price_class = "PriceClass_100"

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Name = "guardian-cloudfront"
  }
}
11. Especificación de Seguridad
11.1 Autenticación y Autorización
typescript
// packages/infrastructure/src/adapters/input/rest/middleware/auth.middleware.ts
import fastifyJwt from '@fastify/jwt';
import fastifyAuth from '@fastify/auth';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export async function setupAuth(fastify: FastifyInstance) {
  // JWT configuration
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
    sign: {
      expiresIn: '7d'
    }
  });

  await fastify.register(fastifyAuth);

  // Decorator para autenticación
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({
        error: 'UNAUTHORIZED',
        message: 'Token inválido o expirado'
      });
    }
  });

  // Rutas públicas
  const publicRoutes = ['/health', '/documentation', '/api/auth/login', '/api/auth/register'];
  
  fastify.addHook('onRequest', async (request, reply) => {
    if (publicRoutes.some(route => request.url.startsWith(route))) {
      return;
    }
    
    try {
      await fastify.authenticate(request, reply);
    } catch (err) {
      // El error ya se maneja en authenticate
    }
  });
}

// packages/infrastructure/src/adapters/input/rest/controllers/auth.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import { prisma } from '../../output/repositories/postgres/prisma.client';

interface RegisterBody {
  email: string;
  password: string;
  name?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export class AuthController {
  async register(
    request: FastifyRequest<{ Body: RegisterBody }>,
    reply: FastifyReply
  ) {
    const { email, password, name } = request.body;

    // Validar email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return reply.status(400).send({
        error: 'EMAIL_EXISTS',
        message: 'El email ya está registrado'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name
      }
    });

    // Generar token
    const token = await reply.jwtSign({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return reply.status(201).send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  }

  async login(
    request: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply
  ) {
    const { email, password } = request.body;

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return reply.status(401).send({
        error: 'INVALID_CREDENTIALS',
        message: 'Email o contraseña incorrectos'
      });
    }

    // Verificar password
    const validPassword = await bcrypt.compare(password, user.passwordHash || '');

    if (!validPassword) {
      return reply.status(401).send({
        error: 'INVALID_CREDENTIALS',
        message: 'Email o contraseña incorrectos'
      });
    }

    // Generar token
    const token = await reply.jwtSign({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });
  }

  async me(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = request.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    return reply.send({ user });
  }
}
11.2 Validación y Sanitización
typescript
// packages/infrastructure/src/adapters/input/rest/middleware/validation.middleware.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// Esquemas de validación con Zod
export const createGameSchema = z.object({
  scenarioId: z.string().uuid(),
  playerName: z.string().min(3).max(50),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional().default('medium')
});

export const decisionSchema = z.object({
  nodeId: z.string(),
  optionId: z.string(),
  timestamp: z.string().datetime().optional()
});

export const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180)
});

// Middleware de validación
export function validate(schema: z.ZodSchema) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const validated = await schema.parseAsync(request.body);
      request.body = validated;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          error: 'VALIDATION_ERROR',
          message: 'Datos inválidos',
          details: error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        });
      }
    }
  };
}

// Rate limiting por usuario
import rateLimit from '@fastify/rate-limit';

export async function setupRateLimit(fastify: FastifyInstance) {
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (request) => {
      return request.user?.id || request.ip;
    },
    errorResponseBuilder: (request, context) => {
      return {
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Demasiadas peticiones. Intenta de nuevo en un minuto.',
        retryAfter: context.after
      };
    }
  });
}

// CORS configuration
import cors from '@fastify/cors';

export async function setupCors(fastify: FastifyInstance) {
  await fastify.register(cors, {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  });
}

// Helmet para seguridad HTTP
import helmet from '@fastify/helmet';

export async function setupHelmet(fastify: FastifyInstance) {
  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'", 'data:', 'https://*.tile.openstreetmap.org'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        connectSrc: ["'self'", 'https://api.guardiandelbosque.com']
      }
    }
  });
}
11.3 Auditoría y Logs
typescript
// packages/infrastructure/src/utils/logger.ts
import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isDevelopment ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  } : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    },
    bindings: (bindings) => {
      return { pid: bindings.pid, host: bindings.hostname };
    }
  },
  timestamp: pino.stdTimeFunctions.isoTime
});

// Middleware de logging
export async function setupLogging(fastify: FastifyInstance) {
  fastify.addHook('onRequest', (request, reply, done) => {
    request.log.info({
      req: {
        method: request.method,
        url: request.url,
        ip: request.ip,
        userAgent: request.headers['user-agent']
      }
    }, 'incoming request');
    done();
  });

  fastify.addHook('onResponse', (request, reply, done) => {
    request.log.info({
      res: {
        statusCode: reply.statusCode,
        duration: reply.getResponseTime()
      }
    }, 'request completed');
    done();
  });

  // Log de errores
  fastify.setErrorHandler((error, request, reply) => {
    request.log.error({
      err: {
        message: error.message,
        stack: error.stack,
        code: error.code
      }
    }, 'request error');

    reply.status(error.statusCode || 500).send({
      error: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'Error interno del servidor' 
        : error.message
    });
  });
}

// Auditoría de acciones sensibles
export async function auditLog(
  action: string,
  userId: string | null,
  gameId: string | null,
  data: any
) {
  await prisma.systemEvent.create({
    data: {
      type: action,
      userId,
      gameId,
      data,
      timestamp: new Date()
    }
  });

  logger.info({
    audit: true,
    action,
    userId,
    gameId,
    data
  }, 'audit log');
}
12. Especificación de Rendimiento
12.1 Objetivos de Rendimiento
Métrica	Objetivo	Herramienta de medición
Tiempo de carga inicial	< 2s	Lighthouse
First Contentful Paint	< 1s	Lighthouse
Time to Interactive	< 3s	Lighthouse
API response time (p95)	< 200ms	Prometheus
Consultas geoespaciales	< 500ms	PostGIS EXPLAIN
Renderizado de mapa	< 100ms	Performance API
Simultaneous users	1000	K6 load testing
Tamaño de bundle	< 250KB	Webpack Bundle Analyzer
12.2 Optimizaciones Frontend
typescript
// packages/frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  
  // Optimización de imágenes
  images: {
    domains: ['api.guardiandelbosque.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Compresión
  compress: true,

  // Optimización de bundles
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          mapLibre: {
            test: /[\\/]node_modules[\\/]maplibre-gl[\\/]/,
            name: 'maplibre',
            priority: 10
          },
          d3: {
            test: /[\\/]node_modules[\\/]d3[\\/]/,
            name: 'd3',
            priority: 5
          },
          turf: {
            test: /[\\/]node_modules[\\/]@turf[\\/]/,
            name: 'turf',
            priority: 5
          }
        }
      };
    }
    return config;
  },

  // Headers de caché
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
12.3 Memoización de Componentes
typescript
// packages/frontend/src/hooks/useMemoizedMap.ts
import { useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import * as turf from '@turf/turf';

export function useMemoizedMap() {
  const { zones, firePerimeter, selectedZoneId } = useGameStore();

  // Memoizar zonas para evitar recálculos innecesarios
  const zoneBounds = useMemo(() => {
    if (!zones?.length) return null;
    
    const bbox = turf.bbox({
      type: 'FeatureCollection',
      features: zones
    });
    
    return bbox;
  }, [zones]);

  // Memoizar zona seleccionada
  const selectedZone = useMemo(() => {
    if (!selectedZoneId || !zones) return null;
    return zones.find(z => z.id === selectedZoneId);
  }, [selectedZoneId, zones]);

  // Memoizar área quemada total
  const burnedArea = useMemo(() => {
    if (!zones) return 0;
    
    return zones
      .filter(z => z.fireStatus === 'burning' || z.fireStatus === 'burned')
      .reduce((total, zone) => {
        const area = turf.area(zone.geometry);
        return total + area;
      }, 0);
  }, [zones]);

  return {
    zoneBounds,
    selectedZone,
    burnedArea
  };
}
12.4 Web Workers para Cálculos Pesados
typescript
// packages/frontend/src/workers/heuristic.worker.ts
import { expose } from 'comlink';
import * as turf from '@turf/turf';

interface HeuristicCalculation {
  zones: any[];
  weather: any;
  resources: any;
}

// Worker para cálculos heurísticos pesados
const heuristicWorker = {
  calculateFirePropagation(data: HeuristicCalculation) {
    const { zones, weather } = data;
    
    const results = zones.map(zone => {
      // Cálculos complejos de propagación
      const slope = this.calculateAverageSlope(zone.geometry);
      const aspect = this.calculateAverageAspect(zone.geometry);
      
      // Velocidad de propagación
      const spreadRate = this.calculateSpreadRate(zone, weather, slope);
      
      // Dirección de propagación
      const direction = this.calculateSpreadDirection(aspect, weather.windDirection);
      
      return {
        zoneId: zone.id,
        spreadRate,
        direction,
        riskLevel: this.calculateRiskLevel(zone, weather)
      };
    });
    
    return results;
  },

  calculateRiskHeatmap(zones: any[], resolution: number) {
    const grid = [];
    const bbox = turf.bbox({
      type: 'FeatureCollection',
      features: zones
    });
    
    const cellSize = (bbox[2] - bbox[0]) / resolution;
    
    for (let x = 0; x < resolution; x++) {
      for (let y = 0; y < resolution; y++) {
        const cell = this.createGridCell(bbox, cellSize, x, y);
        const risk = this.calculateCellRisk(cell, zones);
        
        grid.push({
          type: 'Feature',
          geometry: cell,
          properties: { risk }
        });
      }
    }
    
    return grid;
  },

  private calculateAverageSlope(geometry: any): number {
    // Implementación...
    return 0;
  },

  private calculateAverageAspect(geometry: any): number {
    // Implementación...
    return 0;
  },

  private calculateSpreadRate(zone: any, weather: any, slope: number): number {
    // Implementación...
    return 0;
  },

  private calculateSpreadDirection(aspect: number, windDirection: number): number {
    // Implementación...
    return 0;
  },

  private calculateRiskLevel(zone: any, weather: any): string {
    // Implementación...
    return 'medium';
  },

  private createGridCell(bbox: number[], cellSize: number, x: number, y: number) {
    // Implementación...
    return {};
  },

  private calculateCellRisk(cell: any, zones: any[]): number {
    // Implementación...
    return 0.5;
  }
};

expose(heuristicWorker);
typescript
// packages/frontend/src/hooks/useHeuristicWorker.ts
import { useEffect, useRef, useCallback } from 'react';
import { wrap } from 'comlink';
import type { heuristicWorker } from '../workers/heuristic.worker';

export function useHeuristicWorker() {
  const workerRef = useRef<Worker>();
  const apiRef = useRef<any>();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/heuristic.worker.ts', import.meta.url)
    );
    apiRef.current = wrap(workerRef.current);

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const calculateFirePropagation = useCallback(async (data: any) => {
    if (!apiRef.current) return null;
    return await apiRef.current.calculateFirePropagation(data);
  }, []);

  const calculateRiskHeatmap = useCallback(async (zones: any[], resolution: number) => {
    if (!apiRef.current) return null;
    return await apiRef.current.calculateRiskHeatmap(zones, resolution);
  }, []);

  return {
    calculateFirePropagation,
    calculateRiskHeatmap
  };
}
12.5 Load Testing con K6
javascript
// k6/load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 50 },  // Ramp up a 50 usuarios
    { duration: '3m', target: 100 }, // Ramp up a 100 usuarios
    { duration: '2m', target: 200 }, // Ramp up a 200 usuarios
    { duration: '5m', target: 200 }, // Mantener 200 usuarios
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% de requests < 500ms
    http_req_failed: ['rate<0.01'],    // < 1% de errores
    errors: ['rate<0.05'],              // < 5% de errores personalizados
  },
};

export default function() {
  // 1. Crear partida
  const createRes = http.post('http://localhost:3001/api/games', JSON.stringify({
    scenarioId: 'scenario-123',
    playerName: `Player_${__VU}`,
    difficulty: 'medium'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(createRes, {
    'create game status 201': (r) => r.status === 201,
  }) || errorRate.add(1);

  if (createRes.status !== 201) {
    sleep(1);
    return;
  }

  const gameId = JSON.parse(createRes.body).id;

  // 2. Obtener estado de la partida
  const getRes = http.get(`http://localhost:3001/api/games/${gameId}`);
  
  check(getRes, {
    'get game status 200': (r) => r.status === 200,
  }) || errorRate.add(1);

  // 3. Tomar decisiones (simular flujo)
  for (let i = 0; i < 5; i++) {
    const decisionRes = http.post(`http://localhost:3001/api/games/${gameId}/decisions`, JSON.stringify({
      nodeId: `node-${i}`,
      optionId: `option-${Math.floor(Math.random() * 3)}`
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

    check(decisionRes, {
      'decision status 200': (r) => r.status === 200,
    }) || errorRate.add(1);

    sleep(Math.random() * 2); // Pensar entre 0-2 segundos
  }

  // 4. Obtener heatmap
  const heatmapRes = http.get(`http://localhost:3001/api/games/${gameId}/heatmap?resolution=medium`);
  
  check(heatmapRes, {
    'heatmap status 200': (r) => r.status === 200,
  }) || errorRate.add(1);

  sleep(1);
}
13. Plan de Desarrollo por Sprint
13.1 Sprint 0: Configuración y Fundación (2 semanas)
Tarea	Descripción	Responsable	Dependencias
S0-T1	Configurar monorepo con Turborepo	Tech Lead	-
S0-T2	Configurar TypeScript en todos los paquetes	Tech Lead	S0-T1
S0-T3	Configurar ESLint y Prettier	Tech Lead	S0-T2
S0-T4	Configurar base de datos PostgreSQL + PostGIS	Backend	-
S0-T5	Configurar Prisma y modelos iniciales	Backend	S0-T4
S0-T6	Configurar entorno de desarrollo con Docker	DevOps	-
S0-T7	Configurar CI/CD básico (lint, typecheck)	DevOps	S0-T6
S0-T8	Crear estructura de carpetas frontend	Frontend	-
S0-T9	Configurar Next.js con Tailwind	Frontend	S0-T8
S0-T10	Documentar decisiones técnicas	Tech Lead	S0-T1
13.2 Sprint 1: Core de Dominio (2 semanas)
Tarea	Descripción	Estimación	Dependencias
S1-T1	Implementar Value Objects (Coordinates, ResourceAmount, etc.)	3 días	S0-T2
S1-T2	Implementar entidades de dominio (GameSession, ForestZone)	4 días	S1-T1
S1-T3	Implementar agregados y eventos de dominio	3 días	S1-T2
S1-T4	Implementar servicios de dominio (HeuristicCalculator)	4 días	S1-T3
S1-T5	Tests unitarios de dominio	2 días	S1-T4
S1-T6	Documentar modelo de dominio	1 día	S1-T5
13.3 Sprint 2: Puertos y Adaptadores (2 semanas)
Tarea	Descripción	Estimación	Dependencias
S2-T1	Definir puertos de entrada (CommandBus, QueryBus)	2 días	S1-T5
S2-T2	Definir puertos de salida (Repositories, Services)	2 días	S1-T5
S2-T3	Implementar adaptador REST básico con Fastify	3 días	S2-T1
S2-T4	Implementar adaptador PostgreSQL (repositorios)	4 días	S2-T2, S0-T5
S2-T5	Implementar adaptador Redis para caché	2 días	S2-T2
S2-T6	Implementar inyección de dependencias	2 días	S2-T3
S2-T7	Tests de integración de adaptadores	3 días	S2-T6
13.4 Sprint 3: CQRS y Casos de Uso (2 semanas)
Tarea	Descripción	Estimación	Dependencias
S3-T1	Implementar Command Bus	2 días	S2-T1
S3-T2	Implementar Query Bus	2 días	S2-T1
S3-T3	Crear comandos (CreateGame, TakeDecision, AdvanceSeason)	3 días	S3-T1
S3-T4	Crear queries (GetGame, GetHeatmap, GetAvailableNodes)	3 días	S3-T2
S3-T5	Implementar handlers para comandos	4 días	S3-T3
S3-T6	Implementar handlers para queries	3 días	S3-T4
S3-T7	Tests de integración de CQRS	3 días	S3-T6
13.5 Sprint 4: Frontend Base (2 semanas)
Tarea	Descripción	Estimación	Dependencias
S4-T1	Implementar store global con Zustand	2 días	S0-T8
S4-T2	Crear layout principal y navegación	2 días	S4-T1
S4-T3	Implementar página de inicio	1 día	S4-T2
S4-T4	Implementar página de selección de escenarios	2 días	S4-T3
S4-T5	Crear componentes UI básicos (Button, Card, Modal)	3 días	S4-T2
S4-T6	Implementar cliente API	2 días	S3-T6
S4-T7	Conectar frontend con backend	2 días	S4-T6
S4-T8	Tests de componentes	2 días	S4-T7
13.6 Sprint 5: Mapa y Visualización Geoespacial (3 semanas)
Tarea	Descripción	Estimación	Dependencias
S5-T1	Integrar MapLibre GL en frontend	3 días	S4-T5
S5-T2	Crear componente MapViewer	4 días	S5-T1
S5-T3	Implementar capas de zonas	2 días	S5-T2
S5-T4	Implementar capa de incendio	2 días	S5-T3
S5-T5	Implementar capa de heatmap	3 días	S5-T4
S5-T6	Integrar Turf.js para cálculos	3 días	S5-T5
S5-T7	Procesar datos geoespaciales reales con GDAL	4 días	-
S5-T8	Implementar selector de escenarios reales	2 días	S5-T7
S5-T9	Tests de componentes de mapa	2 días	S5-T8
13.7 Sprint 6: Árbol de Decisiones UI (2 semanas)
Tarea	Descripción	Estimación	Dependencias
S6-T1	Implementar visualizador de árbol con D3	4 días	S4-T5
S6-T2	Crear componente NodeCard	2 días	S6-T1
S6-T3	Implementar navegación del árbol	2 días	S6-T2
S6-T4	Mostrar recursos y efectos	2 días	S6-T3, S4-T1
S6-T5	Implementar historial de decisiones	2 días	S6-T4
S6-T6	Añadir tooltips y ayuda	2 días	S6-T5
S6-T7	Tests de componentes de árbol	2 días	S6-T6
13.8 Sprint 7: Ciclo Estacional y Eventos (2 semanas)
Tarea	Descripción	Estimación	Dependencias
S7-T1	Implementar transición invierno/verano	3 días	S3-T5
S7-T2	Crear sistema de eventos climáticos	4 días	S7-T1
S7-T3	Implementar propagación de incendio	4 días	S7-T2, S5-T6
S7-T4	Añadir condiciones de victoria/derrota	2 días	S7-T3
S7-T5	Implementar notificaciones de eventos	2 días	S7-T4
S7-T6	Tests de integración del ciclo	3 días	S7-T5
13.9 Sprint 8: Autenticación y Usuarios (1 semana)
Tarea	Descripción	Estimación	Dependencias
S8-T1	Implementar registro y login	3 días	S2-T3
S8-T2	Añadir middleware de autenticación	2 días	S8-T1
S8-T3	Implementar perfiles de usuario	2 días	S8-T2
S8-T4	Guardar partidas por usuario	2 días	S8-T3
S8-T5	Tests de autenticación	2 días	S8-T4
13.10 Sprint 9: Análisis Post-Mortem (1 semana)
Tarea	Descripción	Estimación	Dependencias
S9-T1	Implementar logger de decisiones	2 días	S6-T5
S9-T2	Crear gráficos de análisis con Recharts	3 días	S9-T1
S9-T3	Implementar replay de partida	3 días	S9-T2
S9-T4	Exportar resultados a PDF	2 días	S9-T3
S9-T5	Tests de herramientas de análisis	2 días	S9-T4
13.11 Sprint 10: Pulido y Optimización (2 semanas)
Tarea	Descripción	Estimación	Dependencias
S10-T1	Optimizar rendimiento del mapa	3 días	S5-T5
S10-T2	Implementar Web Workers para cálculos	3 días	S10-T1
S10-T3	Optimizar bundle con code splitting	2 días	S10-T2
S10-T4	Mejorar accesibilidad (WCAG 2.1)	3 días	-
S10-T5	Añadir modo oscuro	2 días	S10-T4
S10-T6	Tests de rendimiento con Lighthouse	2 días	S10-T5
S10-T7	Documentación de usuario	3 días	S10-T6
13.12 Sprint 11: Testing y QA (2 semanas)
Tarea	Descripción	Estimación	Dependencias
S11-T1	Tests E2E con Cypress	4 días	S10-T6
S11-T2	Load testing con K6	3 días	S11-T1
S11-T3	Security audit	2 días	S11-T2
S11-T4	User acceptance testing	4 días	S11-T3
S11-T5	Bug fixing	3 días	S11-T4
S11-T6	Documentación técnica final	2 días	S11-T5
13.13 Sprint 12: Despliegue y Lanzamiento (1 semana)
Tarea	Descripción	Estimación	Dependencias
S12-T1	Configurar entorno de producción	2 días	S11-T5
S12-T2	Desplegar infraestructura en AWS	3 días	S12-T1
S12-T3	Configurar monitoreo y alertas	2 días	S12-T2
S12-T4	Migración de datos inicial	2 días	S12-T3
S12-T5	Lanzamiento beta	1 día	S12-T4
S12-T6	Documentación de lanzamiento	2 días	S12-T5
Resumen de Documentos Completados
Documento	Propósito	Estado
Especificación de Frontend	Componentes, hooks, store, mapas	✅ Completado
Especificación de Backend	Arquitectura hexagonal, CQRS, DDD	✅ Completado
Especificación de Base de Datos	Modelo PostGIS, Prisma, consultas espaciales	✅ Completado
Especificación de API	Contratos OpenAPI, endpoints	✅ Completado
Especificación de Modelo de Datos	JSON Schema para tipos compartidos	✅ Completado
Especificación de Algoritmos	Propagación de incendio, heurísticas	✅ Completado
Especificación de UI/UX	Mockups, flujos, componentes	✅ Completado
Especificación de Testing	Unitarios, integración, E2E	✅ Completado
Especificación de Despliegue	Docker, CI/CD, infraestructura AWS	✅ Completado
Especificación de Seguridad	Autenticación, validación, auditoría	✅ Completado
Especificación de Rendimiento	Objetivos, optimizaciones, load testing	✅ Completado
Plan de Desarrollo	Sprints, tareas, dependencias	✅ Completado
Última actualización: [FECHA ACTUAL]
Versión del documento: 3.0
Responsable: Arquitecto de Software / Tech Lead