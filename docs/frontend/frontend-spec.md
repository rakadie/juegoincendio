# Especificación Frontend — Vertical Beta 1

## Estado actual

La interfaz del jugador forma parte de la misma aplicación Node.js/Fastify que expone el motor y la API de sesión. No existe un frontend React/Next separado.

```text
Fastify
├── API de GameSession
├── presenter de aplicación
├── modelo visual derivado
└── HTML/CSS/JS de presentación
```

`GameSession` sigue siendo la única autoridad de estado. El navegador recibe vistas presentadas y envía comandos; no calcula balance, rama, resultado ni reglas causales.

## Decisión visual M3

Se adopta **SVG declarativo + HTML/CSS/JS existente** para la interfaz visual causal.

### Contraste de alternativas

| Alternativa | Claridad/estado | Accesibilidad | Responsive | Dependencias | Coste/riesgo | Decisión |
|---|---|---|---|---|---|---|
| Imagen estática + overlays | Buena para una captura, mala para muchas variantes | Media | Media | 0 | Se multiplican assets/estados | No base |
| SVG declarativo + HTML | Alta | Alta si HTML conserva los controles | Alta | 0 | Bajo | **Elegida** |
| Canvas/Konva/Pixi | Alta | Requiere capa accesible adicional | Alta | Nuevas | Excesivo para 2D esquemático | No |
| MapLibre/GIS | Alta para geografía real | Media | Alta | Nuevas | No existe requisito GIS | No |
| React/Next | No mejora por sí solo la semántica | Alta | Alta | Framework completo | Segundo frontend/migración sin necesidad | No |

### Condiciones para reconsiderar

- Canvas: solo si aparece una necesidad de renderizado/animación que SVG no pueda resolver razonablemente.
- GIS/MapLibre: solo si el producto necesita coordenadas reales, proyección o consultas espaciales.
- React/Next: solo si el HTML/JS actual bloquea una necesidad de producto medible; la preferencia por componentes no basta.

## Modelo de presentación visual

La visualización no lee reglas del dominio dentro del renderer.

```text
VerticalBetaApplicationView
        ↓
visual presenter
        ↓
PresentedSceneVisualModel
        ↓
scene-visual-renderer
        ↓
SVG + controles HTML
```

El modelo visual es derivado, no se persiste y solo expresa estados ya interpretables para el usuario: continuidad, acceso, posición, repliegue, presión y capacidad.

## Interacción

- Las acciones ejecutables siguen siendo botones HTML con `actionId` oficial.
- El SVG puede señalar una zona o mover el foco hacia la tarjeta correspondiente.
- Clicar el dibujo no crea estado local ni ejecuta reglas ocultas.
- Tras cada comando, la UI vuelve a renderizar la respuesta completa del servidor.
- El mismo `visualSceneId`/base puede mostrar estados distintos; el barranco preparado y vulnerable reutilizan la misma geometría.

## Vistas principales

### Prevención territorial

Base esquemática de ladera/barranco, vegetación, restos, camino, franja de pastoreo y posición profesional evaluable.

### Vivienda e interfaz

Vivienda, continuidad vertical, copas y acceso local.

### Crisis

Una base común de territorio/barranco representa cambios de movilidad, repliegue, posición, presión del fuego, ventana de ataque y escalada a copas.

### Balance e informe

Las cinco dimensiones se presentan primero mediante estado comprensible y causas reales; el valor `/100` queda como detalle. El resultado usa las relaciones causales producidas por aplicación, sin reconstrucción en el navegador.

## Accesibilidad

- Recorrido completo mediante controles HTML y teclado.
- Ningún significado crítico depende solo del color.
- SVG informativo contiene nombre/estado; el decorativo no duplica texto innecesario.
- Zoom de navegador al 200 % y layout móvil conservan visual, acción y explicación.
- `prefers-reduced-motion` desactiva movimiento no esencial sin ocultar estado.

## Criterios de arquitectura

- No introducir un segundo frontend.
- No almacenar estado de partida en el DOM como autoridad.
- No duplicar umbrales o fórmulas en `prototype-page.ts` ni en el renderer SVG.
- Mantener el runtime oficial fuera de biblioteca/archivo editorial.
- `npm run accept:m2` debe permanecer verde durante M3.

## Fuera de alcance actual

- mapas geográficos reales;
- simulación física del fuego;
- motor de juego;
- persistencia servidor;
- cuentas de usuario;
- CMS visual;
- analítica de comportamiento.
