# Automatización de estados del GitHub Project

## Objetivo

Sincronizar las incidencias del repositorio con el campo `Status` del GitHub Project sin cerrar incidencias por error.

Flujo objetivo:

```text
Backlog → Ready → In Progress → Done
```

## Regla de seguridad principal

**Cambiar el estado del Project nunca cierra una incidencia.**

El cierre funciona solo en la dirección segura:

```text
issue cerrada → Status: Done
```

Debe permanecer deshabilitado cualquier workflow integrado del Project del tipo:

```text
Status cambia → cerrar issue
```

## Reglas implementadas

El workflow `.github/workflows/project-status-sync.yml` aplica estas reglas:

| Señal | Estado del Project |
|---|---|
| Issue cerrada | `Done` |
| Etiqueta `status:blocked` | `Backlog` |
| Etiqueta `status:ready` | `Ready` |
| Etiqueta `status:in-progress` | `In Progress` |
| Todas las dependencias explícitas están cerradas | `Ready` |
| Existe alguna dependencia explícita abierta | `Backlog` |
| PR no draft con `Closes #N`, `Fixes #N` o `Resolves #N` | `In Progress` |
| PR fusionada con referencia de cierre | `Done` |

Una issue abierta sin etiqueta de estado ni dependencias explícitas conserva su estado actual. Esto evita mover épicas o trabajo no refinado a `Ready` por accidente.

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

Los rangos aceptan guion normal, semirraya o raya, por ejemplo `#68-#74`, `#68–#74` y `#68—#74`.

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
| `PROJECTS_TOKEN` | PAT o token de GitHub App con acceso de escritura al Project y lectura del repositorio |

Para un repositorio privado, el token necesita también acceso al repositorio. No guardar el token en variables ni en archivos.

El evento estándar `pull_request` recibe secretos únicamente para ramas del propio repositorio. Las PR procedentes de forks no actualizan el Project, lo cual evita exponer el token a código no confiable.

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

Variables opcionales si los nombres del Project son distintos:

| Variable | Valor predeterminado |
|---|---|
| `PROJECT_STATUS_FIELD` | `Status` |
| `PROJECT_STATUS_BACKLOG` | `Backlog` |
| `PROJECT_STATUS_READY` | `Ready` |
| `PROJECT_STATUS_IN_PROGRESS` | `In Progress` |
| `PROJECT_STATUS_DONE` | `Done` |

Por ejemplo, si el Project usa `In progress` o `In process`, establecer ese texto exacto en `PROJECT_STATUS_IN_PROGRESS`.

### 3. Etiquetas

Crear estas etiquetas en el repositorio:

```text
status:blocked
status:ready
status:in-progress
```

Las etiquetas actúan como órdenes explícitas y tienen prioridad sobre las dependencias.

## Workflows integrados recomendados en el Project

En:

```text
Project → menú → Workflows
```

Configurar:

1. `Item added to project → Backlog` o el estado inicial equivalente.
2. `Issue closed → Done` activado.
3. `Pull request merged → Done` activado.
4. Cualquier regla `Status changed → close issue` desactivada.

El workflow del repositorio puede convivir con `Issue closed → Done`; repetir el mismo valor es idempotente.

## Ejecución manual

Desde `Actions → Sync Project status → Run workflow` se puede:

- indicar una issue concreta;
- calcular su estado automáticamente;
- forzar `Backlog`, `Ready`, `In Progress` o `Done`;
- dejar el número vacío para reevaluar todas las issues abiertas con dependencias.

## Uso recomendado

### Refinamiento

Añadir dependencias explícitas:

```text
Depende de #24 y #25.
```

La issue permanecerá en `Backlog` hasta que ambas estén cerradas y entonces pasará a `Ready`.

### Inicio real del trabajo

Usar una de estas dos señales:

- añadir `status:in-progress`;
- abrir o marcar como lista una PR no draft que contenga `Closes #N`.

### Finalización

Cerrar la issue o fusionar una PR que la cierre. El Project pasará a `Done` sin ninguna regla inversa que pueda cerrar trabajo accidentalmente.

## Archivos

- Workflow: `.github/workflows/project-status-sync.yml`
- Lógica: `.github/scripts/project-status-sync.js`
