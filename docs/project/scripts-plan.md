# Plan de Scripts de Ejecución (Plantillas)

## Objetivo

Definir scripts esperados del proyecto sin implementar código ejecutable todavía.

## Scripts raíz propuestos

| Script | Propósito |
|---|---|
| `dev` | Arranque de entorno local (frontend + backend) |
| `build` | Compilación de paquetes |
| `lint` | Verificación estática |
| `typecheck` | Validación de tipos |
| `test` | Suite Vitest global |
| `test:unit` | Unit tests Vitest |
| `test:integration` | Integration tests Vitest |
| `test:contract` | Contract tests Vitest |
| `test:browser` | Browser tests Vitest |
| `test:coverage` | Cobertura Vitest |
| `db:migrate` | Migraciones de base de datos |
| `db:seed` | Carga de datos iniciales |
| `map:process` | Pipeline geoespacial (GDAL/Turf) |

## Reglas

- Todo script nuevo debe documentar entradas/salidas.
- Todo script crítico debe tener prueba o validación asociada.
- Nombres consistentes y orientados a CI.

