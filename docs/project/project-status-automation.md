# AutomatizaciÃ³n de estados del GitHub Project

## Objetivo

Sincronizar las incidencias del repositorio con el campo `Status` del GitHub Project y mantener coherentes los estados terminales.

## Estados reales del Project

```text
Backlog â†’ Ready â†’ In Progress â†’ Review â†’ Done
              â†˜ Blocked â†—

Trabajo descartado o sustituido â†’ Superseded
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

Una issue estÃ¡ cerrada si y solo si su estado del Project es terminal:

```text
Issue cerrada como completed             â‡„ Done
Issue cerrada como not planned/duplicate â‡„ Superseded
```

Las transiciones son idempotentes: una ejecuciÃ³n posterior comprueba el estado existente y no vuelve a cerrar una issue ya cerrada.

El workflow integrado `Auto-close issue` proporciona el cierre inmediato al mover una issue a `Done`. GitHub Projects solo permite seleccionar un estado en ese workflow integrado, por lo que el Action reconcilia periÃ³dicamente `Superseded` y cualquier transiciÃ³n terminal que haya quedado pendiente.

## Reglas implementadas

El workflow `.github/workflows/project-status-sync.yml` aplica estas reglas:

| SeÃ±al | Resultado |
|---|---|
| Issue nueva o reabierta sin otra seÃ±al | `Backlog` |
| Etiqueta `status:backlog` | `Backlog` |
| Etiqueta `status:ready` | `Ready` |
| Etiqueta `status:in-progress` | `In Progress` |
| Etiqueta `status:blocked` | `Blocked` |
| Etiqueta `status:review` | `Review` |
| Etiqueta `status:superseded` | `Superseded` y cierre |
| Todas las dependencias explÃ­citas estÃ¡n cerradas | `Ready` |
| Existe alguna dependencia explÃ­cita abierta | `Blocked` |
| PR draft con referencia de cierre | `In Progress` |
| PR no draft con referencia de cierre | `Review` |
| PR fusionada con referencia de cierre | `Done` y cierre |
| Issue cerrada como completada | `Done` |
| Issue cerrada como no planificada o duplicada | `Superseded` |
| Item abierto en `Done` | cierre como `completed` |
| Item abierto en `Superseded` | cierre como `not planned` |

Una issue abierta ya existente sin etiqueta ni dependencias explÃ­citas conserva su estado actual. Esto evita mover Ã©picas o trabajo sin refinar por accidente.

La reconciliaciÃ³n programada se ejecuta cada 15 minutos para detectar movimientos manuales en el Project, ya que estos cambios no generan un evento de repositorio que pueda iniciar directamente el Action.

## Sintaxis de dependencias

El workflow reconoce referencias individuales y rangos escritos en una lÃ­nea como:

```text
Depende de #24 y #25.
Dependencias: #28, #29.
Depende de #68â€“#74.
Bloqueada por #65.
Depends on #68 and #69.
Blocked by #72.
```

Los rangos aceptan guion normal, semirraya o raya: `#68-#74`, `#68â€“#74` y `#68â€”#74`.

Cuando se cierra, reabre o edita una issue, se vuelven a evaluar todas las issues abiertas con dependencias explÃ­citas.

## ConfiguraciÃ³n necesaria

### 1. Secret del repositorio

Crear en:

```text
Settings â†’ Secrets and variables â†’ Actions â†’ Secrets
```

Secret obligatorio:

| Nombre | Valor |
|---|---|
| `PROJECTS_TOKEN` | PAT o token de GitHub App con escritura sobre el Project y lectura y escritura de Issues en el repositorio |

Para un repositorio privado, el token necesita tambiÃ©n acceso al repositorio. No guardar el token en variables ni en archivos.

Las PR procedentes de forks omiten el job completo. Mientras `PROJECTS_TOKEN` o `PROJECT_NUMBER` no estÃ©n configurados, las PR internas tambiÃ©n se omiten de forma explÃ­cita; los eventos de issues y las ejecuciones programadas o manuales fallan para hacer visible una configuraciÃ³n incompleta.

### 2. Variables del repositorio

Crear en:

```text
Settings â†’ Secrets and variables â†’ Actions â†’ Variables
```

Variable obligatoria:

| Nombre | Valor |
|---|---|
| `PROJECT_NUMBER` | NÃºmero visible al final de la URL del Project |

El Project debe pertenecer al mismo usuario u organizaciÃ³n que el repositorio.

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

Las etiquetas actÃºan como Ã³rdenes explÃ­citas y tienen prioridad sobre las dependencias.

No se utiliza `status:done`: el estado `Done` se obtiene al completar el trabajo, fusionar la PR vinculada o mediante una ejecuciÃ³n manual.

## Workflows integrados del Project

Configurar en `Project â†’ Workflows`:

1. `Item added to project â†’ Backlog` activado.
2. `Auto-close issue: Status = Done â†’ close issue` activado.
3. `Item closed â†’ Done` desactivado; el Action debe distinguir el motivo del cierre.
4. `Pull request merged â†’ Done` activado.

## EjecuciÃ³n manual

Desde `Actions â†’ Sync Project status â†’ Run workflow` se puede:

- indicar una issue concreta;
- calcular su estado automÃ¡ticamente;
- forzar cualquiera de los siete estados;
- dejar el nÃºmero vacÃ­o para reevaluar dependencias y reconciliar estados terminales.

## Uso recomendado

### Refinamiento

AÃ±adir dependencias explÃ­citas:

```text
Depende de #24 y #25.
```

La issue permanecerÃ¡ en `Blocked` hasta que ambas estÃ©n cerradas y entonces pasarÃ¡ a `Ready`.

### Inicio y revisiÃ³n

- aÃ±adir `status:in-progress` o abrir una PR draft con `Closes #N`;
- aÃ±adir `status:review` o marcar la PR vinculada como lista para revisiÃ³n.

### FinalizaciÃ³n

- mover a `Done` o cerrar como completada;
- fusionar una PR con una referencia de cierre.

### SustituciÃ³n u obsolescencia

- mover a `Superseded`, que cerrarÃ¡ como `not planned`;
- cerrar manualmente como `not planned` o `duplicate`;
- aplicar `status:superseded`.

## Archivos

- Workflow: `.github/workflows/project-status-sync.yml`
- LÃ³gica CommonJS: `.github/scripts/project-status-sync.cjs`
