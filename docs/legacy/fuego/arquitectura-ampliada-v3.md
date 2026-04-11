ESPECIFICACIÓN TÉCNICA AMPLIADA: MAPA REAL + ARQUITECTURA HEXAGONAL + MONOREPO
SIMULADOR "GUARDIÁN DEL BOSQUE" v3.0
Tabla de Contenidos
Nuevo Requisito: Integración de Mapas Reales

Arquitectura Hexagonal (Puertos y Adaptadores)

Estructura Monorepo Basada en Dominios

Backend Node.js con CQRS y DDD

Testing con Vitest

Roadmap Actualizado con Nuevas Tareas

Especificaciones Técnicas Detalladas

Herramientas y Extensiones VS Code Actualizadas

1. Nuevo Requisito: Integración de Mapas Reales
1.1 Visión General
El simulador ahora utilizará datos geoespaciales reales para crear escenarios basados en ubicaciones reales. Esto permite:

Simular incendios en zonas con topografía y vegetación real

Usar datos de SIG (Sistemas de Información Geográfica) para mayor realismo

Permitir a los usuarios elegir ubicaciones reales (ej: Parque Nacional, Sierra, etc.)

1.2 Stack Tecnológico para Mapas
Herramienta	Propósito	Justificación
MapLibre GL JS	Renderizado de mapas interactivos	Open-source, compatible con vector tiles, soporta datos geoespaciales complejos
Turf.js	Análisis geoespacial	Cálculos de áreas, distancias, buffers para propagación de incendios
GDAL	Procesamiento de datos ráster (backend)	Conversión de formatos SIG (GeoTIFF, Shapefile)
PostGIS	Base de datos geoespacial	Almacenamiento de datos geográficos, consultas espaciales
TiDB/Tile38	Datos de tiempo real para seguimiento de fuego	-
Mapbox Tiling Service (opcional)	Generación de tiles personalizados	-
1.3 Fuentes de Datos Reales
Tipo de Dato	Fuente Potencial	Formato	Uso en el juego
Modelos de Elevación (DEM)	Copernicus (ESA), USGS	GeoTIFF	Cálculo de pendiente (afecta velocidad fuego)
Cobertura Vegetal	CORINE Land Cover, SIGPAC	Shapefile, GeoJSON	Carga de combustible, tipo vegetación
Hidrografía	OpenStreetMap	GeoJSON	Barreras naturales, fuentes de agua
Climatología	AEMET, NOAA	CSV, NetCDF	Patrones de viento, humedad
Incendios Históricos	EFFIS, Copernicus EMS	GeoJSON	Validación de escenarios
1.4 Flujo de Procesamiento de Mapas

    A[Fuentes de Datos<br/>RAW: GeoTIFF, Shapefile] --> B[Backend: Procesamiento con GDAL]
    B --> C[Conversión a GeoJSON/Tile Set]
    C --> D[(PostGIS<br/>Base de Datos Geoespacial)]
    D --> E[API REST/GraphQL]
    E --> F[Frontend: MapLibre GL]
    F --> G[Renderizado de Mapa Base]
    
    H[Turf.js] --> I[Cálculos en Tiempo Real]
    G --> I
    I --> J[Superposición de Incendio]
    J --> K[Interacción Usuario]
1.5 Nuevos Componentes de UI
typescript
// Componente de Mapa Interactivo
interface MapViewerProps {
  center: [number, number]; // lat, lon
  zoom: number;
  baseLayer: 'satellite' | 'topo' | 'streets';
  zones: GeoJSON.FeatureCollection; // Zonas del juego
  fireLocation?: GeoJSON.Feature; // Perímetro del incendio
  riskHeatmap?: GeoJSON.FeatureCollection; // Mapa de calor de riesgo
  onZoneClick: (zoneId: string) => void;
  onMapClick: (lngLat: [number, number]) => void;
}

// Modelo de Zona Geoespacial
interface GeoZone extends Zone {
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon;
  properties: {
    area: number; // ha
    perimeter: number; // km
    slope: number; // grados
    aspect: number; // orientación
    vegetationType: string;
    fuelModel: number; // Modelo de combustible (1-13)
    moistureIndex: number;
    windExposure: number;
  };
}

// Capas de Datos
interface MapLayers {
  base: maplibregl.Layer;
  zones: maplibregl.Layer;
  firePerimeter: maplibregl.Layer;
  heatmap: maplibregl.Layer;
  weatherStations: maplibregl.Layer;
  resources: maplibregl.Layer; // Ubicación de brigadas
}
2. Arquitectura Hexagonal (Puertos y Adaptadores)
2.1 Principios de la Arquitectura
La aplicación se estructura siguiendo el patrón de Arquitectura Hexagonal (también conocida como Puertos y Adaptadores), que separa claramente:

Núcleo de dominio (lógica de negocio pura)

Puertos (interfaces que definen cómo se comunica el exterior con el dominio)

Adaptadores (implementaciones concretas de los puertos: bases de datos, APIs, UI)

2.2 Diagrama de Arquitectura Hexagonal
graph TB
    subgraph "Adaptadores de Entrada (Driving)"
        REST[REST API Adapter]
        GraphQL[GraphQL Adapter]
        CLI[CLI Adapter]
        WS[WebSocket Adapter]
    end
    
    subgraph "Puertos de Entrada"
        PI1[Command Bus Port]
        PI2[Query Bus Port]
        PI3[Event Publisher Port]
    end
    
    subgraph "Núcleo de Dominio"
        D[Domain Entities]
        VO[Value Objects]
        A[Aggregates]
        S[Domain Services]
        E[Domain Events]
    end
    
    subgraph "Puertos de Salida"
        PO1[Repository Port]
        PO2[Event Bus Port]
        PO3[Map Service Port]
        PO4[External API Port]
    end
    
    subgraph "Adaptadores de Salida (Driven)"
        PG[PostgreSQL Adapter]
        GIS[PostGIS Adapter]
        REDIS[Redis Adapter]
        MAP[Map Service Adapter]
    end
    
    REST --> PI1
    GraphQL --> PI2
    CLI --> PI1
    WS --> PI3
    
    PI1 --> D
    PI2 --> D
    PI3 --> D
    
    D --> PO1
    D --> PO2
    D --> PO3
    D --> PO4
    
    PO1 --> PG
    PO1 --> GIS
    PO2 --> REDIS
    PO3 --> MAP
2.3 Estructura de Carpetas Hexagonal
text
packages/
├── core/                    # Núcleo de dominio (independiente de frameworks)
│   ├── domain/
│   │   ├── entities/        # Entidades del dominio
│   │   │   ├── forest-entity.ts
│   │   │   ├── fire-entity.ts
│   │   │   └── resource-entity.ts
│   │   ├── value-objects/   # Objetos valor inmutables
│   │   │   ├── coordinates.ts
│   │   │   ├── percentage.ts
│   │   │   └── resource-amount.ts
│   │   ├── aggregates/      # Agregados (transacciones)
│   │   │   └── game-session.ts
│   │   ├── events/          # Eventos de dominio
│   │   │   ├── fire-started.ts
│   │   │   ├── decision-taken.ts
│   │   │   └── season-changed.ts
│   │   └── services/        # Servicios de dominio puros
│   │       ├── fire-propagation.ts
│   │       ├── heuristic-calculator.ts
│   │       └── resource-manager.ts
│   │
│   ├── application/          # Casos de uso (orquestación)
│   │   ├── commands/         # Comandos CQRS
│   │   │   ├── take-decision.command.ts
│   │   │   ├── start-fire.command.ts
│   │   │   └── allocate-resource.command.ts
│   │   ├── queries/          # Consultas CQRS
│   │   │   ├── get-game-state.query.ts
│   │   │   ├── get-available-nodes.query.ts
│   │   │   └── get-heatmap.query.ts
│   │   ├── handlers/         # Manejadores de comandos/queries
│   │   │   ├── decision.handler.ts
│   │   │   └── fire-propagation.handler.ts
│   │   └── dto/              # Data Transfer Objects
│   │       ├── game-state.dto.ts
│   │       └── decision-result.dto.ts
│   │
│   └── ports/                 # Interfaces (puertos)
│       ├── input/             # Puertos de entrada
│       │   ├── command-bus.port.ts
│       │   ├── query-bus.port.ts
│       │   └── event-publisher.port.ts
│       └── output/            # Puertos de salida
│           ├── repositories/
│           │   ├── game-repository.port.ts
│           │   ├── zone-repository.port.ts
│           │   └── decision-repository.port.ts
│           ├── services/
│           │   ├── map-service.port.ts
│           │   ├── weather-service.port.ts
│           │   └── notification-service.port.ts
│           └── event-bus.port.ts

├── infrastructure/            # Adaptadores (implementaciones concretas)
│   ├── adapters/
│   │   ├── input/             # Adaptadores de entrada (driving)
│   │   │   ├── rest/          # API REST
│   │   │   │   ├── controllers/
│   │   │   │   ├── middleware/
│   │   │   │   └── routes/
│   │   │   ├── graphql/       # GraphQL (si se usa)
│   │   │   └── websocket/     # WebSockets para tiempo real
│   │   │
│   │   └── output/            # Adaptadores de salida (driven)
│   │       ├── repositories/  # Implementaciones de repositorios
│   │       │   ├── postgres/
│   │       │   │   ├── game-repository.adapter.ts
│   │       │   │   ├── zone-repository.adapter.ts
│   │       │   │   └── models/        # ORM (Prisma/TypeORM)
│   │       │   └── redis/
│   │       │       └── cache-repository.adapter.ts
│   │       ├── services/      # Implementaciones de servicios externos
│   │       │   ├── mapbox/    # Servicio de mapas
│   │       │   ├── gdal/      # Procesamiento geoespacial
│   │       │   └── weather-api/ # Cliente meteorológico
│   │       └── event-bus/     # Implementación de event bus
│   │           ├── rabbitmq/  # RabbitMQ adapter
│   │           └── in-memory/ # Para desarrollo
│   │
│   └── config/                 # Configuración de infraestructura
│       ├── database.config.ts
│       ├── map.config.ts
│       └── env.config.ts

├── frontend/                   # Aplicación frontend (Next.js)
│   ├── src/
│   │   ├── components/
│   │   │   ├── map/           # Componentes de mapa
│   │   │   ├── game/          # Componentes de juego
│   │   │   └── ui/            # UI genérica
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # Clientes API
│   │   ├── store/              # Estado local (Zustand)
│   │   └── types/              # Tipos compartidos
│   └── public/                 # Assets

├── shared/                      # Código compartido
│   ├── types/                   # Tipos TypeScript globales
│   ├── utils/                   # Utilidades
│   └── constants/               # Constantes

├── tools/                        # Herramientas y scripts
│   ├── data-processing/          # Scripts de procesamiento de mapas
│   │   ├── gdal-converter.ts
│   │   └── tile-generator.ts
│   └── seed/                     # Scripts de inicialización

└── tests/                         # Tests
    ├── unit/                      # Tests unitarios (Vitest)
    ├── integration/                # Tests de integración
    └── e2e/                        # Tests end-to-end (Cypress)
3. Estructura Monorepo Basada en Dominios
3.1 Gestión de Monorepo con Turborepo
Usaremos Turborepo por su excelente soporte para TypeScript, cacheo inteligente y paralelización de tareas.

json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
3.2 Paquetes del Monorepo
Paquete	Ruta	Propósito	Dependencias
@guardian/core	packages/core	Núcleo de dominio (DDD)	-
@guardian/infrastructure	packages/infrastructure	Adaptadores y servicios	@guardian/core
@guardian/frontend	packages/frontend	Aplicación Next.js	@guardian/core (tipos)
@guardian/shared	packages/shared	Utilidades compartidas	-
@guardian/tools	packages/tools	Scripts de procesamiento	@guardian/shared
@guardian/api-contracts	packages/api-contracts	Contratos API (OpenAPI)	-
3.3 Configuración de Turborepo
typescript
// turbo.json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
    },
    "lint": {
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^typecheck"],
      "outputs": []
    }
  }
}
3.4 Scripts de Procesamiento Geoespacial
typescript
// tools/data-processing/process-dem.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs-extra';
import * as path from 'path';

const execAsync = promisify(exec);

/**
 * Procesa un archivo DEM (Digital Elevation Model) para extraer
 * pendientes y orientaciones para el simulador
 */
export async function processDEM(
  inputPath: string,
  outputPath: string
): Promise<void> {
  // 1. Convertir GeoTIFF a formato procesable
  await execAsync(`gdal_translate -of GTiff ${inputPath} temp.tif`);
  
  // 2. Calcular pendientes (usando GDAL)
  await execAsync(`gdaldem slope temp.tif slope.tif`);
  
  // 3. Calcular orientación
  await execAsync(`gdaldem aspect temp.tif aspect.tif`);
  
  // 4. Vectorizar para uso en el juego
  await execAsync(`gdal_polygonize.py slope.tif -f GeoJSON ${outputPath}/slope.json`);
  
  // 5. Limpiar archivos temporales
  await fs.remove('temp.tif');
  await fs.remove('slope.tif');
  await fs.remove('aspect.tif');
}

/**
 * Genera zonas de combustible basadas en cobertura vegetal
 */
export async function generateFuelZones(
  landCoverPath: string,
  demPath: string,
  outputPath: string
): Promise<void> {
  // Lógica para combinar cobertura vegetal con topografía
  // para determinar modelos de combustible (13 modelos estándar)
}
4. Backend Node.js con CQRS y DDD
4.1 Stack Backend
Componente	Tecnología	Justificación
Runtime	Node.js 20+	LTS, excelente para aplicaciones en tiempo real
Framework API	Fastify	Más rápido que Express, soporte nativo para async/await, validación con schemas
CQRS/Event Bus	In-memory + RabbitMQ	Para eventos de dominio y comunicación asíncrona
Base de Datos Principal	PostgreSQL + Prisma ORM	Tipado fuerte, migraciones, relaciones complejas
Base de Datos Geoespacial	PostGIS (extensión PostgreSQL)	Consultas espaciales, índices geo
Cache	Redis	Sesiones, rate limiting, caché de consultas frecuentes
Message Queue	RabbitMQ	Eventos de dominio, procesamiento asíncrono
Validación	Zod	Validación de esquemas en runtime, inferencia de tipos
Testing	Vitest	Tests unitarios y de integración rápidos
Documentación API	Swagger/OpenAPI	Contratos API auto-documentados
4.2 Implementación de CQRS
typescript
// packages/core/application/commands/take-decision.command.ts
import { Command } from '../cqrs/command';

export class TakeDecisionCommand implements Command {
  constructor(
    public readonly gameId: string,
    public readonly nodeId: string,
    public readonly optionId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}

// packages/core/application/handlers/decision.handler.ts
import { CommandHandler, ICommandHandler } from '../cqrs/decorators';
import { GameRepositoryPort } from '../../ports/output/repositories/game-repository.port';
import { EventBusPort } from '../../ports/output/event-bus.port';
import { DecisionTakenEvent } from '../../domain/events/decision-taken';
import { TakeDecisionCommand } from '../commands/take-decision.command';

@CommandHandler(TakeDecisionCommand)
export class TakeDecisionHandler implements ICommandHandler<TakeDecisionCommand> {
  constructor(
    private readonly gameRepository: GameRepositoryPort,
    private readonly eventBus: EventBusPort
  ) {}

  async execute(command: TakeDecisionCommand): Promise<void> {
    // 1. Recuperar agregado del juego
    const game = await this.gameRepository.findById(command.gameId);
    
    // 2. Ejecutar lógica de dominio
    const result = game.takeDecision(
      command.nodeId,
      command.optionId
    );
    
    // 3. Validar reglas de negocio
    if (result.isFailure()) {
      throw new Error(result.error);
    }
    
    // 4. Persistir cambios
    await this.gameRepository.save(game);
    
    // 5. Publicar eventos de dominio
    await this.eventBus.publish(
      new DecisionTakenEvent(
        command.gameId,
        command.nodeId,
        command.optionId,
        game.getCurrentState()
      )
    );
  }
}

// packages/core/application/queries/get-heatmap.query.ts
import { Query } from '../cqrs/query';

export class GetHeatmapQuery implements Query {
  constructor(
    public readonly gameId: string,
    public readonly zoneId?: string,
    public readonly resolution: 'low' | 'medium' | 'high' = 'medium'
  ) {}
}

// packages/core/application/handlers/heatmap.handler.ts
import { QueryHandler, IQueryHandler } from '../cqrs/decorators';
import { ZoneRepositoryPort } from '../../ports/output/repositories/zone-repository.port';
import { HeuristicService } from '../../domain/services/heuristic-calculator';
import { GetHeatmapQuery } from '../queries/get-heatmap.query';

@QueryHandler(GetHeatmapQuery)
export class GetHeatmapHandler implements IQueryHandler<GetHeatmapQuery> {
  constructor(
    private readonly zoneRepository: ZoneRepositoryPort,
    private readonly heuristicService: HeuristicService
  ) {}

  async execute(query: GetHeatmapQuery): Promise<HeatmapDTO> {
    // Las queries NO modifican el estado, solo consultan
    const zones = await this.zoneRepository.findByGameId(
      query.gameId,
      query.zoneId
    );
    
    return this.heuristicService.generateHeatmap(zones, query.resolution);
  }
}
4.3 Entidades de Dominio DDD
typescript
// packages/core/domain/entities/game-session.ts (Aggregate Root)
import { AggregateRoot } from '../ddd/aggregate-root';
import { DecisionTakenEvent } from '../events/decision-taken';
import { FireStartedEvent } from '../events/fire-started';
import { SeasonChangedEvent } from '../events/season-changed';
import { ResourceAllocation } from '../value-objects/resource-allocation';
import { GameState } from '../value-objects/game-state';
import { DecisionNode } from './decision-node';
import { ForestZone } from './forest-zone';

export class GameSession extends AggregateRoot {
  private constructor(
    private readonly id: string,
    private state: GameState,
    private availableResources: ResourceAllocation,
    private decisionTree: DecisionNode[],
    private zones: ForestZone[],
    private currentSeason: 'winter' | 'summer' | 'post-fire',
    private currentYear: number,
    private decisionHistory: DecisionTakenEvent[]
  ) {
    super();
  }

  // Factory method para crear nueva partida
  public static create(
    id: string,
    initialResources: ResourceAllocation,
    decisionTree: DecisionNode[],
    zones: ForestZone[]
  ): GameSession {
    const game = new GameSession(
      id,
      GameState.initial(initialResources),
      initialResources,
      decisionTree,
      zones,
      'winter',
      1,
      []
    );
    
    // Evento de dominio
    game.addDomainEvent(new GameStartedEvent(id, new Date()));
    
    return game;
  }

  // Método de negocio: tomar decisión
  public takeDecision(nodeId: string, optionId: string): Result<GameSession> {
    // Validar que la decisión sea posible
    const node = this.decisionTree.find(n => n.id === nodeId);
    if (!node) {
      return Result.fail('Nodo no encontrado');
    }
    
    const option = node.options.find(o => o.id === optionId);
    if (!option) {
      return Result.fail('Opción no encontrada');
    }
    
    // Validar requisitos de recursos
    if (!this.availableResources.canSpend(option.immediateEffects)) {
      return Result.fail('Recursos insuficientes');
    }
    
    // Aplicar efectos
    this.availableResources = this.availableResources.spend(option.immediateEffects);
    
    // Aplicar efectos heurísticos en las zonas
    this.zones = this.zones.map(zone => 
      zone.applyHeuristicEffects(option.heuristicEffects)
    );
    
    // Registrar en historial
    const event = new DecisionTakenEvent(
      this.id,
      nodeId,
      optionId,
      this.getCurrentState(),
      new Date()
    );
    
    this.decisionHistory.push(event);
    this.addDomainEvent(event);
    
    // Verificar si cambia la temporada
    this.checkSeasonTransition();
    
    return Result.ok(this);
  }

  // Método de negocio: propagación de incendio (verano)
  public propagateFire(weatherConditions: WeatherData): Result<FirePropagationResult> {
    if (this.currentSeason !== 'summer') {
      return Result.fail('No hay incendio activo fuera de verano');
    }
    
    // Lógica compleja de propagación usando las zonas
    const result = this.calculateFirePropagation(weatherConditions);
    
    // Aplicar cambios a zonas afectadas
    result.affectedZones.forEach(zone => {
      const index = this.zones.findIndex(z => z.id === zone.id);
      if (index !== -1) {
        this.zones[index] = zone;
      }
    });
    
    // Evento de dominio
    this.addDomainEvent(new FirePropagatedEvent(this.id, result));
    
    return Result.ok(result);
  }

  // Cambio de temporada
  private checkSeasonTransition(): void {
    // Lógica para determinar si se debe cambiar de temporada
    // Por ejemplo, después de cierto número de decisiones o nodos clave
    
    const shouldTransition = this.determineSeasonTransition();
    
    if (shouldTransition) {
      const oldSeason = this.currentSeason;
      this.currentSeason = this.getNextSeason();
      
      this.addDomainEvent(
        new SeasonChangedEvent(this.id, oldSeason, this.currentSeason)
      );
    }
  }

  // Getters (inmutables)
  public getId(): string { return this.id; }
  public getCurrentState(): GameState { return this.state; }
  public getZones(): ReadonlyArray<ForestZone> { return this.zones; }
  public getAvailableNodes(): ReadonlyArray<DecisionNode> {
    // Filtrar nodos disponibles según estado actual
    return this.decisionTree.filter(node => node.isAvailable(this));
  }
}

// packages/core/domain/value-objects/coordinates.ts
export class Coordinates {
  private constructor(
    private readonly _latitude: number,
    private readonly _longitude: number
  ) {
    // Validaciones en construcción
    if (_latitude < -90 || _latitude > 90) {
      throw new Error('Latitud inválida');
    }
    if (_longitude < -180 || _longitude > 180) {
      throw new Error('Longitud inválida');
    }
  }

  public static create(lat: number, lng: number): Coordinates {
    return new Coordinates(lat, lng);
  }

  public get latitude(): number { return this._latitude; }
  public get longitude(): number { return this._longitude; }

  // Métodos de utilidad
  public distanceTo(other: Coordinates): number {
    // Fórmula de Haversine para distancia en km
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(other.latitude - this.latitude);
    const dLon = this.toRad(other.longitude - this.longitude);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRad(this.latitude)) * Math.cos(this.toRad(other.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI/180);
  }

  // Para mantener inmutabilidad, no hay setters
  public equals(other: Coordinates): boolean {
    return this.latitude === other.latitude && 
           this.longitude === other.longitude;
  }
}

// packages/core/domain/entities/forest-zone.ts
export class ForestZone {
  constructor(
    private readonly id: string,
    private readonly geometry: GeoJSON.Polygon,
    private properties: ZoneProperties,
    private fireStatus: FireStatus = FireStatus.NotAffected
  ) {}

  // Métodos de negocio
  public applyHeuristicEffects(effects: HeuristicDelta): ForestZone {
    // Crear nueva instancia con propiedades actualizadas (inmutabilidad)
    const newProperties = {
      ...this.properties,
      fuelLoad: Math.max(0, Math.min(100, 
        this.properties.fuelLoad + (effects.fuelLoadDelta || 0)
      )),
      moisture: Math.max(0, Math.min(100,
        this.properties.moisture + (effects.moistureDelta || 0)
      )),
      accessibility: Math.max(0, Math.min(100,
        this.properties.accessibility + (effects.accessibilityDelta || 0)
      ))
    };
    
    return new ForestZone(
      this.id,
      this.geometry,
      newProperties,
      this.fireStatus
    );
  }

  public burn(intensity: number): ForestZone {
    // Calcular daño basado en intensidad
    const damage = intensity * (1 - this.properties.moisture/100);
    
    return new ForestZone(
      this.id,
      this.geometry,
      {
        ...this.properties,
        fuelLoad: Math.max(0, this.properties.fuelLoad - damage * 10)
      },
      FireStatus.Burning
    );
  }

  // Métodos geoespaciales
  public contains(point: Coordinates): boolean {
    // Usar turf.js para verificar si punto está dentro del polígono
    return turf.booleanPointInPolygon(
      turf.point([point.longitude, point.latitude]),
      this.geometry
    );
  }

  public getArea(): number {
    // Calcular área en hectáreas usando turf
    return turf.area(this.geometry) / 10000; // m² a ha
  }
}
5. Testing con Vitest
5.1 Configuración de Vitest
typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/test/**',
        '**/*.config.ts'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    testTimeout: 10000,
    isolate: true,
    threads: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './packages/core'),
      '@infrastructure': path.resolve(__dirname, './packages/infrastructure')
    }
  }
});
5.2 Tests de Dominio (DDD)
typescript
// packages/core/domain/__tests__/game-session.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { GameSession } from '../entities/game-session';
import { ResourceAllocation } from '../value-objects/resource-allocation';
import { Coordinates } from '../value-objects/coordinates';
import { DecisionNode, DecisionOption } from '../entities/decision-node';

describe('GameSession - Agregado Raíz', () => {
  let gameSession: GameSession;
  let testZones: ForestZone[];
  let testDecisionTree: DecisionNode[];

  beforeEach(() => {
    // Preparar datos de prueba
    testZones = [
      ForestZone.create({
        id: 'zone-1',
        geometry: createTestPolygon(),
        properties: {
          fuelLoad: 50,
          moisture: 60,
          accessibility: 70,
          vegetationType: 'forest'
        }
      })
    ];

    const testOption = DecisionOption.create({
      id: 'opt-1',
      text: 'Limpiar matorral',
      immediateEffects: { money: -100, fuelLoad: -20 },
      heuristicEffects: { fuelLoadDelta: -10 }
    });

    testDecisionTree = [
      DecisionNode.create({
        id: 'node-1',
        title: 'Decisión de prueba',
        options: [testOption]
      })
    ];

    gameSession = GameSession.create(
      'game-1',
      ResourceAllocation.create({ money: 1000, water: 500 }),
      testDecisionTree,
      testZones
    );
  });

  it('debería crear una partida correctamente', () => {
    expect(gameSession.getId()).toBe('game-1');
    expect(gameSession.getCurrentSeason()).toBe('winter');
    expect(gameSession.getAvailableNodes()).toHaveLength(1);
  });

  it('debería tomar una decisión y actualizar recursos', () => {
    const result = gameSession.takeDecision('node-1', 'opt-1');
    
    expect(result.isSuccess()).toBe(true);
    expect(gameSession.getAvailableResources().money).toBe(900); // 1000 - 100
    expect(gameSession.getDecisionHistory()).toHaveLength(1);
  });

  it('no debería permitir decisiones sin recursos suficientes', () => {
    // Gastar casi todos los recursos
    const poorGame = GameSession.create(
      'game-2',
      ResourceAllocation.create({ money: 50, water: 0 }),
      testDecisionTree,
      testZones
    );
    
    const result = poorGame.takeDecision('node-1', 'opt-1');
    
    expect(result.isFailure()).toBe(true);
    expect(result.error).toContain('Recursos insuficientes');
  });

  it('debería aplicar efectos heurísticos a las zonas', () => {
    const initialFuelLoad = gameSession.getZones()[0].getFuelLoad();
    
    gameSession.takeDecision('node-1', 'opt-1');
    
    const updatedFuelLoad = gameSession.getZones()[0].getFuelLoad();
    expect(updatedFuelLoad).toBeLessThan(initialFuelLoad);
  });

  it('debería emitir eventos de dominio al tomar decisiones', () => {
    gameSession.takeDecision('node-1', 'opt-1');
    
    const events = gameSession.getDomainEvents();
    expect(events).toHaveLength(2); // GameStarted + DecisionTaken
    expect(events[1].constructor.name).toBe('DecisionTakenEvent');
	5.3 Tests de Servicios de Dominio
typescript
// packages/core/domain/__tests__/fire-propagation.test.ts
import { describe, it, expect, vi } from 'vitest';
import { FirePropagationService } from '../services/fire-propagation';
import { ForestZone } from '../entities/forest-zone';
import { WeatherData } from '../value-objects/weather-data';

describe('FirePropagationService', () => {
  const service = new FirePropagationService();

  it('debería calcular correctamente la velocidad de propagación', () => {
    const zone = createTestZone({ fuelLoad: 80, slope: 15, moisture: 20 });
    const weather = WeatherData.create({ windSpeed: 30, windDirection: 180 });
    
    const speed = service.calculateSpreadRate(zone, weather);
    
    // Fórmula esperada: base * fuel * slope * wind / moisture
    expect(speed).toBeCloseTo(12.5, 1);
  });

  it('debería determinar la dirección de propagación', () => {
    const zones = [
      createTestZone({ id: 'center', fuelLoad: 80 }),
      createTestZone({ id: 'north', fuelLoad: 90, position: 'north' }),
      createTestZone({ id: 'south', fuelLoad: 30, position: 'south' })
    ];
    
    const weather = WeatherData.create({ windDirection: 0 }); // Viento norte
    
    const directions = service.determinePropagationDirections(zones[0], zones, weather);
    
    expect(directions).toContain('north'); // El fuego va hacia el sur (dirección del viento)
    expect(directions).not.toContain('south');
  });

  it('debería manejar bordes y zonas no conectadas', () => {
    const isolatedZone = createTestZone({ id: 'isolated' });
    const zones = [createTestZone({ id: 'zone1' }), isolatedZone];
    
    // No hay conexión entre zone1 e isolated
    vi.spyOn(isolatedZone, 'isAdjacentTo').mockReturnValue(false);
    
    const result = service.propagate(zones[0], zones);
    
    expect(result.affectedZones).not.toContain(isolatedZone);
  });
});
5.4 Tests de Integración con Base de Datos
typescript
// packages/infrastructure/__tests__/postgres-zone-repository.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PostgresZoneRepository } from '../adapters/output/repositories/postgres/zone-repository.adapter';
import { ForestZone } from '@core/domain/entities/forest-zone';

describe('PostgresZoneRepository - Integración', () => {
  let prisma: PrismaClient;
  let repository: PostgresZoneRepository;

  beforeAll(async () => {
    prisma = new PrismaClient();
    repository = new PostgresZoneRepository(prisma);
    
    // Configurar base de datos de prueba
    await prisma.$connect();
    await prisma.zone.deleteMany(); // Limpiar datos existentes
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('debería guardar y recuperar una zona', async () => {
    const zone = ForestZone.create({
      id: 'zone-test-1',
      geometry: {
        type: 'Polygon',
        coordinates: [[[0,0], [1,0], [1,1], [0,1], [0,0]]]
      },
      properties: {
        fuelLoad: 50,
        moisture: 60,
        accessibility: 70,
        vegetationType: 'forest'
      }
    });

    await repository.save(zone);
    
    const retrieved = await repository.findById('zone-test-1');
    
    expect(retrieved).toBeDefined();
    expect(retrieved?.getId()).toBe('zone-test-1');
    expect(retrieved?.getFuelLoad()).toBe(50);
  });

  it('debería encontrar zonas por punto geográfico', async () => {
    const point = Coordinates.create(0.5, 0.5); // Centro del polígono
    
    const zones = await repository.findByPoint(point);
    
    expect(zones.length).toBeGreaterThan(0);
    expect(zones[0].contains(point)).toBe(true);
  });

  it('debería actualizar una zona existente', async () => {
    const zone = await repository.findById('zone-test-1');
    const updated = zone!.burn(50);
    
    await repository.update(updated);
    
    const retrieved = await repository.findById('zone-test-1');
    expect(retrieved?.getFireStatus()).toBe('burning');
  });
});
6. Roadmap Actualizado con Nuevas Tareas
6.1 Nuevas Tareas para Integración de Mapas
ID	Tarea	Descripción	Estimación	Dependencias	Fase
TASK-MAP-001	Configurar MapLibre GL en frontend	Instalar y configurar MapLibre con componentes React	M (3)	Fase 0	Fase 5
TASK-MAP-002	Implementar visor de mapa base	Renderizar mapa con capas base (satélite/topo)	L (5)	TASK-MAP-001	Fase 5
TASK-MAP-003	Integrar Turf.js para cálculos geoespaciales	Funciones de análisis en tiempo real	M (3)	-	Fase 2
TASK-MAP-004	Procesar DEM con GDAL	Scripts para convertir elevación a pendientes	L (5)	-	Herramientas
TASK-MAP-005	Generar zonas de combustible	Algoritmo para clasificar vegetación	L (5)	TASK-MAP-004	Herramientas
TASK-MAP-006	Implementar PostGIS en backend	Configurar extensión y modelos Prisma	M (3)	-	Fase 0
TASK-MAP-007	Crear repositorio geoespacial	Adaptador PostGIS para zonas	M (3)	TASK-MAP-006	Infraestructura
TASK-MAP-008	Implementar capa de heatmap	Visualización de riesgo en mapa	L (5)	TASK-MAP-002	Fase 5
TASK-MAP-009	Simular propagación en mapa	Actualizar perímetro de fuego en tiempo real	XL (8)	TASK-MAP-003	Fase 3
TASK-MAP-010	Selector de escenarios reales	UI para elegir ubicaciones reales	M (3)	TASK-MAP-005	Fase 5
6.2 Nuevas Tareas para Arquitectura Hexagonal
ID	Tarea	Descripción	Estimación	Dependencias
TASK-HEX-001	Definir puertos de entrada	Interfaces CommandBus, QueryBus, EventPublisher	M (3)	-
TASK-HEX-002	Definir puertos de salida	Repositorios y servicios externos	M (3)	-
TASK-HEX-003	Implementar Core de dominio	Entidades, VO, servicios puros	XL (8)	TASK-HEX-001
TASK-HEX-004	Implementar Command Bus	Bus síncrono para comandos	M (3)	TASK-HEX-001
TASK-HEX-005	Implementar Query Bus	Bus para consultas	M (3)	TASK-HEX-001
TASK-HEX-006	Implementar Event Bus	Bus asíncrono con RabbitMQ	L (5)	TASK-HEX-001
TASK-HEX-007	Adaptador REST	Controladores Fastify	L (5)	TASK-HEX-004, TASK-HEX-005
TASK-HEX-008	Adaptador PostgreSQL	Repositorios con Prisma	L (5)	TASK-HEX-002
TASK-HEX-009	Adaptador Redis	Caché y sesiones	M (3)	TASK-HEX-002
TASK-HEX-010	Inyección de dependencias	Configurar contenedor DI	M (3)	TASK-HEX-007
6.3 Nuevas Tareas para Monorepo
ID	Tarea	Descripción	Estimación
TASK-MONO-001	Configurar Turborepo	Estructura base del monorepo	S (2)
TASK-MONO-002	Configurar TypeScript project references	Referencias entre paquetes	M (3)
TASK-MONO-003	Crear paquete @guardian/core	Mover dominio a su propio paquete	M (3)
TASK-MONO-004	Crear paquete @guardian/shared	Utilidades comunes	S (2)
TASK-MONO-005	Configurar builds optimizados	Pipeline Turborepo	M (3)
7. Especificaciones Técnicas Detalladas
7.1 Modelo de Datos PostGIS
sql
-- Tabla de zonas forestales con geometría
CREATE TABLE zones (
    id VARCHAR(36) PRIMARY KEY,
    game_id VARCHAR(36) REFERENCES games(id),
    geometry GEOMETRY(POLYGON, 4326) NOT NULL,
    properties JSONB NOT NULL,
    fire_status VARCHAR(20) DEFAULT 'not_affected',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice espacial para búsquedas rápidas
CREATE INDEX idx_zones_geometry ON zones USING GIST(geometry);

-- Tabla de decisiones (historial)
CREATE TABLE decisions (
    id VARCHAR(36) PRIMARY KEY,
    game_id VARCHAR(36) REFERENCES games(id),
    node_id VARCHAR(50) NOT NULL,
    option_id VARCHAR(50) NOT NULL,
    taken_at TIMESTAMP NOT NULL,
    game_state_snapshot JSONB NOT NULL
);

-- Tabla de recursos en el tiempo
CREATE TABLE resources_history (
    id VARCHAR(36) PRIMARY KEY,
    game_id VARCHAR(36) REFERENCES games(id),
    timestamp TIMESTAMP NOT NULL,
    resources JSONB NOT NULL
);

-- Tabla de escenarios (predefinidos o generados)
CREATE TABLE scenarios (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    center_lat FLOAT NOT NULL,
    center_lng FLOAT NOT NULL,
    zoom_level INTEGER DEFAULT 12,
    data_source VARCHAR(100),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
7.2 Configuración de Prisma con PostGIS
prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  extensions = [postgis]
}

model Game {
  id            String    @id @default(cuid())
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  state         Json
  currentSeason String
  currentYear   Int
  zones         Zone[]
  decisions     Decision[]
  resourcesHistory ResourcesHistory[]
}

model Zone {
  id         String   @id @default(cuid())
  gameId     String
  game       Game     @relation(fields: [gameId], references: [id])
  
  // Campo geoespacial (PostGIS)
  geometry   Unsupported("geometry(Polygon,4326)")?
  
  properties Json
  fireStatus String   @default("not_affected")
  
  // Índice espacial (se crea manualmente en SQL)
  @@index([gameId])
}

model Decision {
  id        String   @id @default(cuid())
  gameId    String
  game      Game     @relation(fields: [gameId], references: [id])
  nodeId    String
  optionId  String
  takenAt   DateTime
  snapshot  Json
}

model Scenario {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  centerLat   Float
  centerLng   Float
  zoomLevel   Int      @default(12)
  dataSource  String?
  metadata    Json?
  createdAt   DateTime @default(now())
}
7.3 API Endpoints (Fastify)
typescript
// packages/infrastructure/adapters/input/rest/routes/game.routes.ts
import { FastifyInstance } from 'fastify';
import { GameController } from '../controllers/game.controller';

export async function gameRoutes(fastify: FastifyInstance) {
  const controller = new GameController();
  
  // Comandos (POST - modifican estado)
  fastify.post('/games', controller.createGame);
  fastify.post('/games/:id/decisions', controller.takeDecision);
  fastify.post('/games/:id/start-fire', controller.startFire);
  fastify.post('/games/:id/advance-season', controller.advanceSeason);
  
  // Queries (GET - no modifican estado)
  fastify.get('/games/:id', controller.getGame);
  fastify.get('/games/:id/state', controller.getGameState);
  fastify.get('/games/:id/available-nodes', controller.getAvailableNodes);
  fastify.get('/games/:id/heatmap', controller.getHeatmap);
  fastify.get('/games/:id/history', controller.getDecisionHistory);
  
  // Recursos geoespaciales
  fastify.get('/scenarios', controller.listScenarios);
  fastify.get('/scenarios/:id/zones', controller.getScenarioZones);
  fastify.get('/zones/:id/risk', controller.getZoneRisk);
}

// packages/infrastructure/adapters/input/rest/controllers/game.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CommandBus } from '@core/application/cqrs/command-bus';
import { QueryBus } from '@core/application/cqrs/query-bus';
import { CreateGameCommand } from '@core/application/commands/create-game.command';
import { TakeDecisionCommand } from '@core/application/commands/take-decision.command';
import { GetGameQuery } from '@core/application/queries/get-game.query';

export class GameController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createGame(
    request: FastifyRequest<{ Body: CreateGameDTO }>,
    reply: FastifyReply
  ) {
    const { scenarioId, playerName } = request.body;
    
    const command = new CreateGameCommand(scenarioId, playerName);
    const result = await this.commandBus.dispatch(command);
    
    if (result.isFailure()) {
      return reply.status(400).send({ error: result.error });
    }
    
    return reply.status(201).send(result.value);
  }

  async takeDecision(
    request: FastifyRequest<{ 
      Params: { id: string };
      Body: { nodeId: string; optionId: string }
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { nodeId, optionId } = request.body;
    
    const command = new TakeDecisionCommand(id, nodeId, optionId);
    const result = await this.commandBus.dispatch(command);
    
    if (result.isFailure()) {
      return reply.status(400).send({ error: result.error });
    }
    
    return reply.send(result.value);
  }

  async getHeatmap(
    request: FastifyRequest<{
      Params: { id: string };
      Querystring: { resolution?: 'low' | 'medium' | 'high' }
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { resolution = 'medium' } = request.query;
    
    const query = new GetHeatmapQuery(id, resolution);
    const result = await this.queryBus.dispatch(query);
    
    return reply.send(result);
  }
}
7.4 Configuración de Vitest en Monorepo
json
// packages/core/package.json
{
  "name": "@guardian/core",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "typecheck": "tsc --noEmit"
  }
}

// vitest.workspace.ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*/vitest.config.ts',
  {
    test: {
      name: 'unit',
      include: ['packages/*/src/**/*.test.ts'],
      environment: 'node'
    }
  },
  {
    test: {
      name: 'integration',
      include: ['packages/*/test/integration/**/*.test.ts'],
      environment: 'node',
      setupFiles: ['test/setup.integration.ts']
    }
  }
]);
8. Herramientas y Extensiones VS Code Actualizadas
8.1 Nuevas Extensiones para Geoespacial
Extensión	ID	Propósito
Geo Data Viewer	RandomFractalsInc.geo-data-viewer	Visualizar GeoJSON directamente en VS Code
MapLibre GL Snippets	mapbox.mapbox-gl-js-snippets	Snippets para MapLibre/Mapbox GL
Turf.js Snippets	turfjs.turf-snippets	Snippets para operaciones geoespaciales
PostGIS	postgis.postgis	Sintaxis y snippets para PostGIS
GDAL Tools	gdal.gdal-tools	Integración con comandos GDAL
8.2 Extensiones para DDD/Arquitectura
Extensión	ID	Propósito
Domain Driven Design Viewer	manueltarazi.cursor-driven-design	Visualización de relaciones DDD
CQRS Snippets	k--kato.cqrs-snippets	Snippets para comandos/queries
PlantUML	jebbs.plantuml	Diagramas de arquitectura en código
Draw.io Integration	hediet.vscode-drawio	Diagramas integrados
8.3 Extensiones para Testing (Vitest)
Extensión	ID	Propósito
Vitest	vitest.explorer	Explorador de tests Vitest
Vitest Snippets	ZixuanChen.vitest-snippets	Snippets para Vitest
8.4 Configuración Adicional de VS Code
json
// .vscode/settings.json (adiciones para mapas)
{
  // PostGIS/GeoJSON
  "files.associations": {
    "*.geojson": "json"
  },
  
  // GDAL
  "gdal.path": "/usr/local/bin/gdal",
  
  // Vitest
  "vitest.enable": true,
  "vitest.commandLine": "npm run test",
  
  // PlantUML
  "plantuml.server": "https://www.plantuml.com/plantuml",
  "plantuml.render": "PlantUMLServer",
  
  // DDD
  "ddd-viewer.showValueObjects": true,
  "ddd-viewer.showEntities": true,
  "ddd-viewer.showAggregates": true
}
8.5 Scripts de Desarrollo
json
// package.json (raíz del monorepo)
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "test:unit": "vitest run --project unit",
    "test:integration": "vitest run --project integration",
    "test:coverage": "vitest run --coverage",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean && rm -rf node_modules",
    "db:setup": "prisma migrate dev",
    "db:seed": "tsx tools/seed/seed-scenarios.ts",
    "map:process": "tsx tools/data-processing/process-region.ts --region=sierra",
    "map:generate-tiles": "tsx tools/data-processing/generate-tiles.ts"
  }
}
Resumen de Cambios Respecto a Versión Anterior
Área	Cambio Principal
Mapas Reales	Nueva capa de integración geoespacial con MapLibre, Turf.js, PostGIS
Arquitectura	Migración a Hexagonal con puertos y adaptadores
Backend	Implementación CQRS + DDD con Fastify
Monorepo	Turborepo con paquetes por dominio
Testing	Migración de Jest a Vitest (más rápido, mejor integración TS)
Base de Datos	Añadido PostGIS para datos geoespaciales
Tareas	+30 nuevas tareas específicas para mapas y arquitectura
Última actualización: [FECHA ACTUAL]
Versión del documento: 3.0
Responsable: Arquitecto de Software / Tech Lead

