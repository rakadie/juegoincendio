# Gaps, Riesgos y Decisiones Arquitectónicas

## Gaps identificados

1. Fórmulas heurísticas inconsistentes entre documentos fuente.
2. Mezcla de frameworks de testing (Jest/Cypress/Vitest) sin estándar único.
3. Criterios de victoria/derrota parcialmente ambiguos.
4. Contratos API y modelo de datos con duplicidad de definiciones.
5. Estrategia de ejecución IA no aterrizada en plantillas reutilizables.

## Riesgos principales

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Deriva de documentación | Alto | Índice único + ownership de docs |
| Incoherencia entre dominio y API | Alto | Contratos versionados y tests contract |
| Complejidad geoespacial temprana | Medio | Entrega por slices incrementales |
| Coste de CI elevado | Medio | Pirámide Vitest y suites afectadas |

## Decisiones tomadas

1. **Testing unificado en Vitest** para todo tipo de pruebas.
2. **Hexagonal + DDD + CQRS** como arquitectura objetivo.
3. **PostGIS** como base geoespacial oficial.
4. **GitHub-first + Markdown-only** como estándar operativo.

## Decisiones pendientes

- Nivel de realismo físico del incendio en MVP.
- Modo offline-first vs online-first en frontend.
- Estrategia final de despliegue (proveedor cloud definitivo).

