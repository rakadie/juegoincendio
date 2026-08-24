# Dudas Abiertas

## Producto

1. ¿Nivel de realismo físico esperado para el MVP?
2. ¿Qué perfil de usuario es prioritario en fase 1 (educación vs profesional)?

## Técnica

3. ¿Se requiere modo offline completo en frontend?
4. ¿Qué volumen de datos geoespaciales se espera por escenario?

## Operación

5. ¿Cuál será la política formal de versionado de API?
6. ¿Quién aprueba decisiones arquitectónicas críticas?
7. ¿Qué métricas de negocio son obligatorias en release inicial?

## Testing

8. ¿Se exige cobertura por paquete además de global?
9. ¿Qué tests Vitest serán obligatorios para merge a `main`?

## Resueltas

- Despliegue cloud: proveedor único Render y una sola aplicación Fastify; decisión y criterios en [`publication-and-hosting-decision.md`](../devops/publication-and-hosting-decision.md), #9.

