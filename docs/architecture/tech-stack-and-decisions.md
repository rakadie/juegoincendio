# Stack Tecnológico y Decisiones

## Resumen de stack objetivo

- Frontend: Next.js + React + TypeScript + Tailwind + MapLibre
- Backend: Fastify + TypeScript + Prisma
- Datos: PostgreSQL + PostGIS + Redis
- Integración geoespacial: Turf.js + GDAL (pipeline de datos)
- Testing: **Vitest** (unit, integration, contract, browser)

## Correcciones de tecnología respecto a documentación previa

1. E2E en Cypress/Jest → **migrado a Vitest** para mantener una sola plataforma de test.
2. Referencias ambiguas de runtime → estandarización en Node.js LTS.
3. Contratos API dispersos → OpenAPI centralizado y versionado.

## Justificación de decisiones

- Unificar testing en Vitest reduce fricción de mantenimiento y tiempos de CI.
- Hexagonal + DDD permite encapsular reglas de incendio sin acoplarse al framework.
- PostGIS habilita consultas espaciales reales para escenarios de riesgo.
- Monorepo mejora trazabilidad entre dominio, API y UI.

## Compatibilidad y evolución

- Se prioriza backward compatibility en contratos.
- Cambios breaking deben versionarse y anunciarse en changelog.

