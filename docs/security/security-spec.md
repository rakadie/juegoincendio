# Seguridad

## Objetivos

- Proteger integridad de partidas y escenarios.
- Evitar abuso de API y manipulación de estado.
- Asegurar trazabilidad de acciones relevantes.

## Controles mínimos

- Validación de payloads en entrada.
- Rate limiting por IP/usuario.
- CORS restringido por entorno.
- Headers de seguridad HTTP.
- Logs estructurados y auditables.

## Modelo de amenazas (resumen)

| Amenaza | Riesgo | Control |
|---|---|---|
| Manipulación de decisiones por requests maliciosas | Alto | Validación + auth + reglas de dominio |
| Denegación por exceso de peticiones | Medio | Rate limiting |
| Exposición de datos sensibles en logs | Medio | Redacción de datos sensibles |
| Deriva de permisos en endpoints | Alto | Matriz de autorización por recurso |

## Recomendaciones operativas

- Secretos solo por variables de entorno y gestor seguro.
- Rotación periódica de credenciales.
- Revisión de dependencias en CI.

