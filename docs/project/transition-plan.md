# Plan de Transición a Implementación

## Objetivo

Convertir esta base documental en entregables de código incremental, con trazabilidad por issue y validación automática.

## Fases

1. **Bootstrap repositorio técnico**
   - Estructura monorepo.
   - Configuración lint/typecheck/test.
2. **Vertical slice 1 (Partida mínima)**
   - Crear partida, tomar decisión, persistir estado.
3. **Vertical slice 2 (Ciclo estacional)**
   - Cierre invierno y transición a verano.
4. **Vertical slice 3 (Mapa y riesgo)**
   - Heatmap y capas principales.
5. **Vertical slice 4 (Calidad y release)**
   - Gates CI, observabilidad y runbook.

## Definition of Ready por issue

La aceptación previa de la especificación M1 se evalúa con las puertas numeradas de [`m1-acceptance-gates.md`](m1-acceptance-gates.md), la matriz de [`m1-acceptance-evidence.md`](m1-acceptance-evidence.md) y la [`Definition of Ready de M2`](m2-definition-of-ready.md). #43 realizará la revisión final y solo `R-ACCEPTANCE` podrá autorizar #67 cuando se cumplan todos los requisitos `DR-01..DR-08`.

- Contexto funcional claro.
- Criterio de aceptación verificable.
- Riesgos conocidos.
- Dependencias listadas.

## Definition of Done por issue

- Implementación completa del alcance.
- Test Vitest asociado en verde.
- Documentación actualizada.
- Evidencia de CI y rollback en PR.

