# Especificación Backend

## Stack actualizado

- Node.js LTS
- Fastify
- TypeScript
- Prisma + PostgreSQL/PostGIS
- Redis (cache)
- Event bus (in-memory/RabbitMQ según entorno)

## Capas

- Entrada: REST/WebSocket
- Aplicación: comandos/queries (CQRS)
- Dominio: entidades/agregados/servicios
- Infraestructura: repositorios/adaptadores

## Flujo de comando

```mermaid
flowchart LR
    A[HTTP Request] --> B[Controller]
    B --> C[CommandBus]
    C --> D[CommandHandler]
    D --> E[Aggregate]
    E --> F[RepositoryPort]
    F --> G[(PostgreSQL/PostGIS)]
    E --> H[DomainEvents]
    H --> I[EventBus]
```

## Requisitos no funcionales

- Validación de entrada estricta.
- Manejo de errores con códigos estables.
- Logging estructurado por request.
- Endpoint de healthcheck.

