# Decisión de publicación y alojamiento inicial

- Issue: #9
- Fecha de contraste: 19 de agosto de 2026
- Estado: decisión aprobable; no autoriza todavía un despliegue
- Alcance: Vertical Beta 1 como una única aplicación Node.js/Fastify

## 1. Decisión

La primera versión publicada será un **piloto controlado para entidades**, accesible desde navegador mediante una URL restringida y orientado a sesiones acompañadas de validación. No se presenta todavía como demostrador público general, producto editorial definitivo ni base contractual de una licencia institucional.

El proveedor recomendado es **Render**, mediante un único **Web Service** que construye y ejecuta el repositorio completo. Frontend, rutas HTTP, recursos estáticos y motor permanecen en el mismo proceso Fastify.

La beta pública solo se habilitará después de completar la validación experta y ciudadana de #10 y las puertas de la sección 9.

## 2. Motivo

Render encaja con el runtime que ya existe:

- admite aplicaciones Fastify como Web Service y despliegue desde un repositorio GitHub;
- permite configurar build, start, variables, secretos y healthcheck;
- espera que el servidor escuche en `0.0.0.0` y en la variable `PORT`, comportamiento ya implementado en `server.ts`;
- ofrece URL `onrender.com`, dominios personalizados, TLS gestionado, logs, métricas, rollbacks y protección DDoS;
- conserva un proceso Node de larga duración y evita transformar Fastify en funciones serverless;
- permite añadir Postgres dentro del mismo proveedor si aparece una necesidad real de persistencia.

Fuentes oficiales consultadas:

- [Render Web Services](https://render.com/docs/web-services)
- [Primer despliegue y conexión con GitHub](https://render.com/docs/your-first-deploy)
- [Instancias gratuitas y sus límites](https://render.com/docs/free)
- [Dominios personalizados](https://render.com/docs/custom-domains)
- [Protección DDoS](https://render.com/docs/ddos-protection)
- [Métricas del servicio](https://render.com/docs/service-metrics)

## 3. Alternativas contrastadas

| Opción | Encaje | Coste inicial contrastado | Decisión |
|---|---|---|---|
| Render Web Service | Servidor Fastify único, GitHub, URL, TLS, secretos, healthcheck y rollback. | Free para pruebas; Starter publicado por Render a `7 USD/mes`. | **Elegida.** Coste predecible y mínima desviación arquitectónica. |
| Railway | Servicio desde GitHub, dominio, variables y auto-deploy; facturación por uso. | Free con crédito limitado; Hobby `5 USD/mes` que incluye `5 USD` de uso, más exceso. | Reserva. Buen encaje, pero el coste final es menos predecible bajo carga y contradice menos la decisión previa solo si se usa sin Vercel. |
| Fly.io | Máquinas, secretos, dominios y despliegue contenedorizado. | Uso prorrateado; requiere tarjeta para la organización. | No inicial. Añade Docker, CLI y operación de máquinas antes de necesitarlos. |
| Vercel | Soporta Fastify como una única Function con Fluid compute. | Depende del plan y consumo de funciones. | No inicial. Cambia el modelo a funciones y no aporta una ventaja para este servidor unificado. |

Precios y condiciones pueden cambiar. Deben revalidarse en las páginas oficiales antes de contratar o pasar a producción:

- [Render pricing](https://render.com/pricing)
- [Railway pricing](https://docs.railway.com/pricing/plans)
- [Fly.io resource pricing](https://fly.io/docs/about/pricing/)
- [Fastify en Vercel](https://vercel.com/docs/frameworks/backend/fastify)

## 4. Coste estimado

### Desarrollo y smoke test

| Concepto | Estimación |
|---|---:|
| Render Web Service Free | `0 USD/mes` |
| URL `onrender.com` y TLS | Incluidos |
| Persistencia | No requerida |
| Dominio propio | No requerido |

El servicio gratuito se suspende tras 15 minutos sin tráfico y puede tardar alrededor de un minuto en reactivarse. Es aceptable para smoke tests y revisión asincrónica, no para una sesión convocada ni para beta pública.

### Piloto controlado

| Concepto | Estimación |
|---|---:|
| Render Web Service Starter, siempre activo | `7 USD/mes` |
| Dominio propio | Coste del registrador; fuera de Render |
| Base de datos | `0 USD` mientras no exista persistencia servidor |
| Total de infraestructura inicial | `7 USD/mes` más dominio opcional |

No se aprueba Postgres por anticipado. Si #10 exige guardar sesiones o consentimiento, se diseñará primero el contrato de datos, retención y privacidad y se presupuestará como recurso separado dentro de Render.

## 5. Arquitectura de despliegue

```text
GitHub main
  → GitHub Actions: typecheck + Vitest + build
  → deploy de Render condicionado a checks correctos
  → build: npm ci && npm run build
  → start: npm start
  → Web Service Node.js/Fastify
       ├── /                interfaz
       ├── /health          healthcheck
       ├── rutas de juego
       └── recursos estáticos
  → URL onrender.com durante piloto
  → dominio propio solo para beta pública
```

Configuración mínima prevista:

```text
NODE_ENV=production
PUBLICATION_STAGE=internal | pilot | public
PUBLICATION_PROFILE_ID=vertical-beta-1
LOG_LEVEL=info
```

`PORT` la proporciona Render. Los secretos nunca se incluyen en Git, `render.yaml`, logs, HTML ni variables públicas. La configuración por cliente usa perfiles versionados y variables; no se crean forks del código.

## 6. Acceso y versiones

### Piloto

- URL restringida y comunicada únicamente a participantes;
- control de acceso en la aplicación antes de invitar usuarios; una URL difícil de adivinar no cuenta como protección;
- sin registro libre ni cuentas personales;
- sin datos personales, analítica publicitaria ni almacenamiento de decisiones en servidor;
- una sola configuración `vertical-beta-1`, sin personalización institucional visible.

### Evolución por cliente

Si una entidad necesita textos, marca o reglas distintas, la variación debe declararse mediante un perfil versionado y revisado. El mismo artefacto se despliega con otra configuración. Una divergencia que cambie causalidad, IDs o contrato de sesión requiere issue de producto; no se resuelve copiando el repositorio.

## 7. Observabilidad, seguridad y coste

Antes del piloto deben existir:

- logs estructurados de arranque, error, latencia y código HTTP sin decisiones personales ni contenido sensible;
- healthcheck `/health` usado por la plataforma;
- identificador de versión o commit en despliegue y rollback documentado;
- límites de tamaño, rate limiting y cabeceras de seguridad en Fastify;
- presupuesto mensual y alertas de consumo del proveedor;
- revisión de rutas de diagnóstico para no publicar datos internos;
- política de conservación de logs y responsable operativo.

Render aporta TLS y mitigación DDoS de plataforma, pero no sustituye autenticación, autorización, validación de entrada ni rate limiting de aplicación.

## 8. Flujo de entornos

| Entorno | Infraestructura | Acceso | Propósito |
|---|---|---|---|
| Development | Local | Equipo | Desarrollo y pruebas rápidas. |
| Staging | Render Free o preview temporal | Revisión restringida | Smoke test del commit candidato. Se acepta cold start. |
| Pilot | Render Starter | Invitación/control de acceso | Sesiones de #10 y entidades colaboradoras. |
| Public | Render Starter o superior | Público | Solo después de superar las puertas de publicación. |

No se mantiene producción en Vercel ni se separa frontend/backend. Si el producto supera la capacidad del servicio inicial, se abre una decisión nueva con métricas reales antes de migrar o dividir.

## 9. Puertas de beta interna a pública

La beta pública requiere simultáneamente:

1. M2 implementada y aceptación integral #76 correcta;
2. validación experta y ciudadana #10 completada, con bloqueantes resueltos;
3. accesibilidad y comprensión verificadas en los perfiles objetivo;
4. revisión editorial, licencias, atribuciones, privacidad y aviso educativo aprobados;
5. control de acceso retirado de forma consciente, no por omisión;
6. rate limiting, cabeceras, validación de entrada y revisión de rutas completados;
7. servicio siempre activo, healthcheck, smoke test, rollback y responsable operativo;
8. dominio y URL definitivos, TLS correcto y política de logs publicada;
9. presupuesto mensual aprobado y alertas configuradas;
10. cero secretos o datos personales expuestos en código, logs o payload público.

Un pase técnico de CI no sustituye #10 ni autoriza publicación.

## 10. Fuera de alcance

Esta decisión no:

- crea la cuenta de Render, conecta GitHub ni despliega servicios;
- compra dominio o activa un plan de pago;
- implementa autenticación, rate limiting, analítica o persistencia;
- aprueba publicación pública antes de #10 y #76;
- adopta Postgres, Redis, Docker, Kubernetes o arquitectura multi-proveedor;
- define una licencia institucional o un modelo comercial.

Las acciones con coste, dominio, datos o exposición pública requieren una issue de despliegue propia y aprobación explícita.

## 11. Criterios de aceptación de #9

| Criterio | Evidencia | Estado |
|---|---|---|
| Formato elegido | Piloto controlado para entidades, sección 1 | Cumplido |
| Proveedor recomendado | Render Web Service único, secciones 1–3 | Cumplido |
| Coste estimado | Free para smoke; Starter `7 USD/mes` para piloto, sección 4 | Cumplido |
| Arquitectura de despliegue | GitHub → CI → un Web Service Fastify, sección 5 | Cumplido |
| Paso de beta interna a pública | Diez puertas verificables, sección 9 | Cumplido |
| Acceso, dominio, secretos, logs, persistencia, abuso y versiones | Secciones 4–8 | Cumplido |
