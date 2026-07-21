# Plantillas i18n de escenarios

Ruta editable principal:

- `src/content/i18n/es/scenarios.ts`

Esta plantilla contiene los textos extraidos de `src/content/scenarios`. El juego exporta
`NEW_GAME_SCENARIOS` con estos textos aplicados, asi que cambiar una cadena en la plantilla
afecta a `/game-content/data`, `/game-content` y el prototipo que consuma esos escenarios.

## Nomenclatura

- La clave de cada escenario es su `scenario.id`, por ejemplo `s-023-imagen-antigua-viral`.
- Dentro de cada escenario se mantienen los nombres de campo existentes: `title`,
  `context`, `question`, `briefing`, `actions`, `options`, `combos`, `outcomes`, etc.
- Cuando una seccion ya tiene IDs propios se usan esos IDs: `actions.desmentido-oficial-claro`,
  `options.a`, `combos.desmentido-con-mapa`, `outcomes.alto`.
- Cuando una seccion no tenia ID se usa una clave numerada estable: `note-001`,
  `note-002`, `mediaOutput-001`.

## Regenerar

Si se anaden escenarios nuevos o cambian textos en `src/content/scenarios`, regenera la
plantilla con:

```bash
npm run i18n:extract-scenarios
```

En PowerShell, si `npm.ps1` esta bloqueado por la politica de ejecucion local, usa:

```powershell
npm.cmd run i18n:extract-scenarios
```

Ten cuidado: regenerar sobrescribe `src/content/i18n/es/scenarios.ts`.
