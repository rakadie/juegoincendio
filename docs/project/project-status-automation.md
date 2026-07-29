# Automatización de estados del GitHub Project

## Objetivo

Sincronizar las incidencias del repositorio con el campo `Status` del GitHub Project sin cerrar incidencias por error.

## Estados reales del Project

```text
Backlog → Ready → In Progress → Review → Done
              ↘ Blocked ↗

Trabajo descartado o sustituido → Superseded
```

Estados configurados:

- `Backlog`;
- `Ready`;
- `In Progress`;
- `Blocked`;
- `Review`;
- `Done`;
- `Superseded`.

## Regla de seguridad principal

**Cambiar el estado del Project nunca cierra una incidencia.**

El cierre funciona únicamente desde GitHub Issues hacia el Project:

```text
issue cerrada como completed → Done
issue cerrada como not planned/duplicate → Superseded
```

Debe permanecer deshabilitado cualquier workflow integrado del Project del tipo:

```text
Status cambia → cerrar issue
```

## Reglas implementadas

El workflow `.github/workflows/project-status-sync.yml` aplica estas reglas:

| Señal | Estado del Project |
|---|---|
| Issue nueva o reabierta sin otra señal | `Backlog` |
| Etiqueta `status:backlog` | `Backlog` |
| Etiqueta `status:ready` | `Ready` |
| Etiqueta `status:in-progress` | `In Progress` |
| Etiqueta `status:blocked` | `Blocked` |
| Etiqueta `status:review` | `Review` |
| Etiqueta `status:superseded` | `Superseded` |
| Todas las dependencias explícitas están cerradas | `Ready` |
| Existe alguna dependencia explícita abierta | `Blocked` |
| PR draft con `Closes #N`, `Fixes #N` o `Resolves #N` | `In Progress` |
| PR no draft con referencia de cierre | `Review` |
| PR fusionada con referencia de cierre | `Done` |
| Issue cerrada como completada | `Done` |
| Issue cerrada como no planificada o duplicada | `Superseded` |

Una issue abierta ya existente sin etiqueta ni dependencias explícitas conserva su estado actual. Esto evita mover épicas o trabajo sin refinar por accidente.

## Sintaxis de dependencias

El workflow reconoce referencias individuales y rangos escritos en una línea como:

```text
Depende de #24 y #25.
Dependencias: #28, #29.
Depende de #68–#74.
Bloqueada por #65.
Depends on #68 and #69.
Blocked by #72.
```

Los rangos aceptan guion normal, semirraya o raya: `#68-#74`, `#68–#74` y `#68—#74`.

Cuando se cierra, reabre o edita una issue, se vuelven a evaluar todas las issues abiertas con dependencias explícitas.

## Configuración necesaria

### 1. Secret del repositorio

Crear en:

```text
Settings → Secrets and variables → Actions → Secrets
```

Secret obligatorio:

| Nombre | Valor |
|---|---|
| `PROJECTS_TOKEN` | PAT o token de GitHub App con escritura sobre el Project y lectura del repositorio |

Para un repositorio privado, el token necesita también acceso al repositorio. No guardar el token en variables ni en archivos.

El evento estándar `pull_request` recibe secretos únicamente para ramas del propio repositorio. Las PR procedentes de forks omiten el job completo y no actualizan el Project.

Mientras `PROJECTS_TOKEN` o `PROJECT_NUMBER` no estén configurados, las ejecuciones provocadas por una PR interna terminan correctamente como una omisión explícita. Los eventos de issues y las ejecuciones manuales siguen fallando para hacer visible una configuración incompleta.

### 2. Variables del repositorio

Crear en:

```text
Settings → Secrets and variables → Actions → Variables
```

Variable obligatoria:

| Nombre | Valor |
|---|---|
| `PROJECT_NUMBER` | Número visible al final de la URL del Project |

El Project debe pertenecer al mismo usuario u organización que el repositorio.

Variables opcionales si los nombres no coinciden exactamente:

| Variable | Valor predeterminado |
|---|---|
| `PROJECT_STATUS_FIELD` | `Status` |
| `PROJECT_STATUS_BACKLOG` | `Backlog` |
| `PROJECT_STATUS_READY` | `Ready` |
| `PROJECT_STATUS_IN_PROGRESS` | `In Progress` |
| `PROJECT_STATUS_BLOCKED` | `Blocked` |
| `PROJECT_STATUS_REVIEW` | `Review` |
| `PROJECT_STATUS_DONE` | `Done` |
| `PROJECT_STATUS_SUPERSEDED` | `Superseded` |

### 3. Etiquetas

Crear estas etiquetas en el repositorio:

```text
status:backlog
status:ready
status:in-progress
status:blocked
status:review
status:superseded
```

Las etiquetas actúan como órdenes explícitas y tienen prioridad sobre las dependencias.

No se utiliza `status:done`: el estado `Done` exige cerrar la issue como completada.

## Workflows integrados recomendados en el Project

En:

```text
Project → Workflows
```

Configurar:

1. `Item added to project → Backlog` activado.
2. `Issue closed → Done` puede permanecer activado para cierres completados.
3. `Pull request merged → Done` puede permanecer activado.
4. Cualquier regla `Status changed → close issue` desactivada.

Para distinguir `Done` de `Superseded`, el Action del repositorio es la fuente más precisa porque examina `state_reason`.

## Ejecución manual

Desde `Actions → Sync Project status → Run workflow` se puede:

- indicar una issue concreta;
- calcular su estado automáticamente;
- forzar cualquiera de los siete estados;
- dejar el número vacío para reevaluar todas las issues abiertas con dependencias.

## Uso recomendado

### Refinamiento

Añadir dependencias explícitas:

```text
Depende de #24 y #25.
```

La issue permanecerá en `Blocked` hasta que ambas estén cerradas y entonces pasará a `Ready`.

### Inicio del trabajo

Usar una de estas señales:

- añadir `status:in-progress`;
- abrir una PR draft con `Closes #N`.

### Revisión

- añadir `status:review`;
- marcar la PR vinculada como lista para revisión.

### Finalización

Cerrar la issue como completada o fusionar la PR que la cierra. El Project pasará a `Done`.

### Sustitución u obsolescencia

Cerrar la issue como `not planned` o `duplicate`, o aplicar `status:superseded`. El Project pasará a `Superseded`.

## Archivos

- Workflow: `.github/workflows/project-status-sync.yml`
- Lógica CommonJS: `.github/scripts/project-status-sync.cjs`
