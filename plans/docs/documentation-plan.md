# Plan de Documentación Integral

## Objetivo

Estructurar la documentación del proyecto para ejecución asistida por IA, con trazabilidad completa en GitHub y artefactos Markdown enlazados desde [README.md](../../README.md).

## Estructura objetivo

```mermaid
mindmap
  root((Documentación))
    Producto
      Visión
      Alcance
      KPIs
    Arquitectura
      Hexagonal
      DDD/CQRS
      Monorepo
    Dominio
      Reglas del juego
      Heurísticas
      Estados
    Datos
      Modelo lógico
      PostGIS
      Esquemas
    API
      Contratos
      Versionado
      Errores
    Calidad
      Vitest unit
      Vitest integration
      Vitest contract/browser
    Operaciones
      CI/CD
      Entornos
      Observabilidad
    Gobierno
      Flujo IA
      Branching/commits
      Evidencia GitHub
```

## Criterios de completitud

- Índice maestro y enlaces relativos funcionales.
- Decisiones técnicas justificadas y actualizadas.
- Pruebas unificadas en Vitest.
- Gaps, riesgos, dudas y backlog pendiente explicitados.
- Plantillas para PR, scripts y clases listas para uso por IA.

## Entregables

- Índice central: [docs/README.md](../../docs/README.md)
- Contribución: [CONTRIBUTING.md](../../CONTRIBUTING.md)
- Especificaciones y gestión: carpeta [docs](../../docs/)

