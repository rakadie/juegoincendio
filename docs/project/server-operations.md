# Operación del servidor (arranque y parada)

## Requisitos

- Node.js 20 o superior
- Dependencias instaladas (`npm install`)

## Arranque en desarrollo

```bash
npm run dev
```

Este comando usa `tsx watch` y levanta el servidor HTTP del prototipo.

### Nota para PowerShell en Windows

Si aparece el error de políticas de ejecución con `npm.ps1` (PSSecurityException), puedes usar cualquiera de estas opciones:

```powershell
npm.cmd run dev
```

o habilitar scripts solo para la sesión actual:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm run dev
```

## Arranque en producción (build + start)

```bash
npm run build
npm run start
```

## Parada del servidor

En la terminal donde está ejecutándose el proceso:

- Windows / Linux / macOS: `Ctrl + C`

Si queda un proceso colgado en Windows, se puede cerrar por puerto (ejemplo 3000):

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Comprobación rápida

- Salud API: `http://localhost:3000/health`
- Prototipo: `http://localhost:3000/`
- Contenido juego: `http://localhost:3000/game-content`

