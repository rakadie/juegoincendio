# M3 — Aceptación visual y user hardening

- Épica: #134
- Issues: #135–#141
- Candidata: PR #142
- Arquitectura: SVG declarativo + HTML/CSS/JS existente

## Objetivo

Comprobar que la nueva capa visual hace perceptible la causalidad de la Vertical Beta 1 sin crear un segundo motor, un segundo frontend ni una superficie inaccesible de interacción.

## Evidencia automática

La suite M3 verifica:

- las cinco zonas/acciones oficiales de territorio;
- las tres zonas/acciones oficiales de vivienda;
- cambios visuales deterministas después de cada decisión;
- cinco dimensiones heredadas con causas reales de la sesión;
- una única base `shared-ravine-v1` para el barranco preparado y vulnerable;
- diferencias de posición y ventana de ataque entre ambos estados;
- ausencia de rama visual anticipada en el primer aviso común;
- capacidad de extinción `limited` antes de la escalada y `exceeded` únicamente al llegar a fuego de copas;
- API HTTP entregando modelo y markup visual derivado;
- SVG con `role="img"` y controles HTML equivalentes;
- ausencia de `selectCrisisBranch`, `calculatePreventionBalance` y umbrales causales dentro del renderer/navegador;
- conservación íntegra de la aceptación M2.

La puerta sigue siendo:

```bash
npm run accept:m2
```

M3 no crea una puerta alternativa: amplía la suite incluida en esa regresión.

## Checklist de revisión de interfaz

### Desktop

- [x] La composición mantiene escena, visual, acciones, explicación y avance en una sola vista desplazable.
- [x] Los SVG usan `viewBox` y ancho fluido; no dependen de resolución raster concreta.
- [x] Las acciones oficiales permanecen como botones HTML.

### Móvil

- [x] A `max-width: 800px` el shell pasa a una columna y las listas visuales se apilan.
- [x] El SVG conserva `viewBox` y una altura mínima útil.
- [x] No existe interacción que dependa de hover para ejecutar una acción.

### Teclado

- [x] Todas las decisiones y avances son botones HTML nativos.
- [x] Existe estilo `:focus-visible` explícito.
- [x] Los hotspots del dibujo no son necesarios para completar la partida; las listas visuales solo trasladan foco a la tarjeta oficial.

### Zoom 200 %

- [x] No hay anchuras fijas del layout principal que impidan reflow.
- [x] Grids usan `auto-fit` o se convierten en una columna en viewport estrecho.
- [x] La información causal está también expresada como texto estructurado y no solo dentro del SVG.

### Movimiento reducido

- [x] `prefers-reduced-motion: reduce` elimina transiciones/animaciones CSS no esenciales.
- [x] Ninguna información aparece exclusivamente mediante animación.

### Significado sin color

- [x] Cada estado incluye texto (`operativo`, `limitado`, `bloqueado`, etc.).
- [x] Los marcadores usan también formas/bordes/patrones distintos.
- [x] El resultado y las restricciones permanecen descritos textualmente.

## Recorrido preparado

Antes del resultado deben quedar visibles:

- territorio con discontinuidad y camino tratado según las decisiones seleccionadas;
- acceso operativo favorable;
- barranco con ruta de repliegue identificable;
- posición sostenible;
- ventana de ataque viable;
- defensa de viviendas con acceso local cuando se seleccionó `despejar-accesos`.

La suite de referencia M2 continúa terminando:

```text
prepared → contained
```

## Recorrido vulnerable

Antes del resultado deben quedar visibles:

- condiciones preventivas no tratadas que permanecen en las dos inspecciones;
- acceso bloqueado/limitado al entrar en crisis;
- barranco con posición no sostenible;
- ventana de ataque no disponible;
- capacidad condicionada sin revelar prematuramente el desenlace;
- fuego de copas y capacidad superada solo en `crisis-decision-crown-fire`.

La suite de referencia M2 continúa terminando:

```text
vulnerable → overwhelmed
```

## Límites de esta aceptación

Esta es una aceptación de ingeniería y producto sobre contratos, markup y los recorridos reproducibles. No afirma que ciudadanos reales entiendan la interfaz ni que un especialista valide las simplificaciones operativas. Esas evidencias siguen perteneciendo respectivamente a #100 y #99.

## Criterio de cierre

M3 puede cerrarse cuando:

1. CI de la candidata final es verde;
2. revisión técnica cruzada no deja bloqueantes;
3. revisión de Product Owner comprueba el valor visible de #134 y no detecta una regresión o alcance incumplido;
4. si el PO devuelve la entrega, los hallazgos se corrigen y se repite la revisión antes de integrar.
