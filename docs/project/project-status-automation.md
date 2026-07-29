# Automatización de estados del GitHub Project

## Objetivo

Sincronizar las incidencias del repositorio con el campo `Status` del GitHub Project y mantener coherentes los estados terminales.

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

## Contrato de estados terminales

Una issue está cerrada si y solo si su estado del Project es terminal:

```text
Issue cerrada como completed             ⇄ Done
Issue cerrada como not planned/duplicate ⇄ Superseded
```

Las transiciones son idempotentes: una ejecución posterior comprueba el estado existente y no vuelve a cerrar una issue ya cerrada.

El workflow integrado `Auto-close issue` proporciona el cierre inmediato al mover una issue a `Done`. GitHub Projects solo permite seleccionar un estado en ese workflow integrado, por lo que el Action reconcilia periódicamente `Superseded` y cualquier transición terminal que haya quedado pendiente.

## Reglas implementadas

El workflow `.github/workflows/project-status-sync.yml` aplica estas reglas:

| Señal | Resultado |
|---|---|
| Issue nueva o reabierta sin otra señal | `Backlog` |
| Etiqueta `status:backlog` | `Backlog` |
| Etiqueta `status:ready` | `Ready` |
| Etiqueta `status:in-progress` | `In Progress` |
| Etiqueta `status:blocked` | `Blocked` |
| Etiqueta `status:review` | `Review` |
| Etiqueta `status:superseded` | `Superseded` y cierre |
| Todas las dependencias explícitas están cerradas | `Ready` |
| Existe alguna dependencia explícita abierta | `Blocked` |
| PR draft con referencia de cierre | `In Progress` |
| PR no draft con referencia de cierre | `Review` |
| PR fusionada con referencia de cierre | `Done` y cierre |
| Issue cerrada como completada | `Done` |
| Issue cerrada como no planificada o duplicada | `Superseded` |
| Item abierto en `Done` | cierre como `completed` |
| Item abierto en `Superseded` | cierre como `not planned` |

Una issue abierta ya existente sin etiqueta ni dependencias explícitas conserva su estado actual. Esto evita mover épicas o trabajo sin refinar por accidente.

La reconciliación programada se ejecuta cada 15 minutos para detectar movimientos manuales en el Project, ya que estos cambios no generan un evento de repositorio que pueda iniciar directamente el Action.

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
| `PROJECTS_TOKEN` | PAT clásico con los scopes `project` y `repo` para el Project perteneciente al usuario |

El `GITHUB_TOKEN` efímero del workflow cierra las Issues y queda limitado a este repositorio. El PAT del Project usa `repo` porque el repositorio debe poder tratarse como privado durante toda la vida de la automatización. No guardar el token en variables ni en archivos.

Las PR procedentes de forks omiten el job completo. Mientras `PROJECTS_TOKEN` o `PROJECT_NUMBER` no estén configurados, las PR internas también se omiten de forma explícita; los eventos de issues y las ejecuciones programadas o manuales fallan para hacer visible una configuración incompleta.

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

No se utiliza `status:done`: el estado `Done` se obtiene al completar el trabajo, fusionar la PR vinculada o mediante una ejecución manual.

## Workflows integrados del Project

Configurar en `Project → Workflows`:

1. `Item added to project → Backlog` activado.
2. `Auto-close issue: Status = Done → close issue` activado.
3. `Item closed → Done` desactivado; el Action debe distinguir el motivo del cierre.
4. `Pull request merged → Done` activado.

## Ejecución manual

Desde `Actions → Sync Project status → Run workflow` se puede:

- indicar una issue concreta;
- calcular su estado automáticamente;
- forzar cualquiera de los siete estados;
- dejar el número vacío para reevaluar dependencias y reconciliar estados terminales.

## Uso recomendado

### Refinamiento

Añadir dependencias explícitas:

```text
Depende de #24 y #25.
```

La issue permanecerá en `Blocked` hasta que ambas estén cerradas y entonces pasará a `Ready`.

### Inicio y revisión

- añadir `status:in-progress` o abrir una PR draft con `Closes #N`;
- añadir `status:review` o marcar la PR vinculada como lista para revisión.

### Finalización

- mover a `Done` o cerrar como completada;
- fusionar una PR con una referencia de cierre.

### Sustitución u obsolescencia

- mover a `Superseded`, que cerrará como `not planned`;
- cerrar manualmente como `not planned` o `duplicate`;
- aplicar `status:superseded`.

## Archivos

- Workflow: `.github/workflows/project-status-sync.yml`
- Lógica CommonJS: `.github/scripts/project-status-sync.cjs`
