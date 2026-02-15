# Guía de Contribución

Este proyecto sigue un flujo **GitHub-first** y documentación en Markdown para trabajo humano + IA.

## Flujo de ramas

Formato obligatorio:

`<tipo>/<issue>-<descripcion-corta>`

Ejemplos:

- `feat/123-motor-heuristico`
- `fix/245-validacion-recursos`
- `docs/310-indice-documentacion`

Tipos permitidos:

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`

## Convención de commits

Convención recomendada:

`type(scope): descripción (#issue)`

Ejemplos:

- `feat(core): añade calculadora de riesgo (#123)`
- `test(api): agrega pruebas de contrato con Vitest (#201)`
- `docs(architecture): actualiza diagrama hexagonal (#310)`

## Pull Requests

Todo PR debe incluir:

- Qué cambia (WHAT)
- Por qué (FOR)
- Cómo (HOW)
- Riesgo y mitigación
- Plan de rollback
- Evidencia de validación en GitHub

Plantilla base: [docs/templates/pr-template.md](docs/templates/pr-template.md)

## Estándar de pruebas

La estrategia oficial de pruebas es **Vitest-only**:

- Unitarias: `vitest run`
- Integración: `vitest run --project integration`
- Contratos/API: `vitest run --project contract`
- UI/Browser: `vitest --project browser`

No se debe añadir Jest/Cypress en nuevas entregas.

## Definición de hecho (DoD)

- Código/documentación implementado
- Pruebas Vitest verdes en el alcance afectado
- Documentación actualizada en el mismo PR
- Riesgo y rollback documentados
- Referencias a issue/PR y evidencia en GitHub

