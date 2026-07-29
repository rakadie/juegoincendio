# Vertical Beta 1 — ¡Apaga las llamas!

Fecha de decisión inicial: 26 de julio de 2026  
Última consolidación: 28 de julio de 2026  
Estado: **definición de producto vigente**

## Fuente de verdad

Este documento resume el producto aprobado. El catálogo, los IDs, las fuentes y las transiciones se definen de forma normativa en:

- [`docs/product/vertical-beta-1-catalog.md`](vertical-beta-1-catalog.md);
- #21 — convención canónica de IDs;
- #22 — recorrido y tratamiento editorial;
- #59 — aprobación del catálogo;
- #66 — aprobación del modelo causal.

Las revisiones anteriores de este documento que incluían tres inspecciones, tres estados preventivos, una ruta principal de comunicación o tres desenlaces quedan sustituidas por las decisiones citadas.

## Objetivo de producto

Demostrar que las decisiones preventivas sobre el territorio modifican el comportamiento posterior del fuego, la capacidad de intervención y las consecuencias del incendio.

Eje causal:

> prevención territorial → comportamiento del fuego → capacidad de extinción → consecuencias

La comunicación, el 112, la evacuación y la población vulnerable pueden aparecer como consecuencias o contenido complementario, pero no forman el núcleo causal del MVP.

## Público y duración

- Público principal: ciudadanía.
- Duración objetivo: 20–25 minutos.
- Partidas de referencia validadas: aproximadamente 20 y 21 minutos.

## Flujo obligatorio

### Tronco común

```text
intro-briefing-mission
→ prevention-inspection-territory-fuel
→ prevention-inspection-housing-interface
→ transition-summary-prevention
→ crisis-decision-first-alert
→ crisis-router-causal-map
```

El avatar es una preferencia opcional y no forma parte del flujo, del estado causal ni de los fixtures.

### Rama preparada

```text
crisis-decision-emergency-fuel-break
→ crisis-decision-ravine-fire
→ crisis-decision-housing-defense
→ ending-result-causal-report
```

### Rama vulnerable

```text
crisis-decision-access-blockage
→ crisis-decision-ravine-fire
→ crisis-decision-crown-fire
→ ending-result-causal-report
```

`crisis-decision-ravine-fire` es un único nodo compartido. Su dificultad, opciones y consecuencias dependen del estado heredado.

## Prevención oficial

### Territorio y combustible

`prevention-inspection-territory-fuel` ofrece cinco actuaciones y permite seleccionar tres:

1. gestionar restos de poda;
2. crear discontinuidades vegetales;
3. limpiar márgenes de caminos rurales;
4. activar pastoreo preventivo;
5. evaluar una quema prescrita o línea preventiva profesional.

### Viviendas e interfaz

`prevention-inspection-housing-interface` ofrece tres actuaciones y permite seleccionar dos:

1. podar ramas bajas y retirar vegetación seca;
2. separar copas;
3. despejar accesos para autobombas.

`p-003-comunidad-preparada` queda en la biblioteca candidata. No se carga ni se ejecuta en la Vertical Beta 1.

## Estado heredado

La prevención se resume únicamente en cinco dimensiones causales:

- `fuelLoad` — carga de combustible;
- `fuelContinuity` — continuidad horizontal y vertical;
- `operationalAccess` — accesos, maniobra y repliegue;
- `defensibility` — capacidad de defensa territorial y de viviendas;
- `attackOpportunity` — existencia de una oportunidad segura de ataque.

Preparación familiar, población vulnerable, confianza ciudadana y canales oficiales no son dimensiones estructurales de esta versión.

## Selección de rama

El router evalúa el estado heredado y selecciona una de dos ramas:

- preparada, cuando existe margen operativo y oportunidad segura de ataque;
- vulnerable, cuando una condición crítica de combustible, continuidad, acceso, defensibilidad o seguridad impide mantener el ataque.

No existe una tercera rama intermedia. Los estados mixtos se resuelven mediante reglas explícitas de prioridad y seguridad.

## Resultado final

Existe un único nodo terminal:

```text
ending-result-causal-report
```

El nodo admite dos variantes:

- `contained`;
- `overwhelmed`.

La variante se calcula al finalizar desde `GameSession`, `inheritedState`, las decisiones de crisis y el historial causal. **No queda fijada únicamente por la rama seleccionada por el router.**

Las dos partidas de referencia esperan:

- partida preparada → `contained`;
- partida vulnerable → `overwhelmed`.

Estos son resultados de aceptación reproducibles, no constantes codificadas en la transición. Los daños parciales y las correcciones realizadas durante la crisis se expresan dentro del informe causal; no crean un tercer nodo ni una tercera variante terminal.

## Informe causal

El resultado debe explicar entre tres y cinco relaciones prioritarias:

1. actuación preventiva tomada u omitida;
2. cambio en el estado heredado;
3. momento de la crisis donde se manifestó;
4. efecto sobre el fuego o la capacidad de ataque;
5. alternativa preventiva relevante.

Las consecuencias sociales pueden mostrarse después de explicar combustible, continuidad, accesos, defensibilidad y oportunidad de ataque.

## Criterio de éxito

Dos partidas con el mismo escenario externo y decisiones preventivas distintas deben producir:

- estados heredados distintos;
- ramas, opciones o dificultades visibles distintas;
- comportamiento diferente del barranco compartido;
- explicaciones causales distintas;
- resultados reproducibles `contained` y `overwhelmed` en los fixtures de referencia.

## Base técnica acordada

- aplicación Fastify modular;
- motor TypeScript separado de la vista;
- `GameSession` serializable y trazable;
- flujo declarativo basado en IDs;
- reglas puras e independientes del DOM;
- contenido traducible con cobertura estricta para los 12 nodos;
- validación automática del catálogo y de las dos partidas.

## Fuera de alcance

- una tercera inspección preventiva ejecutable;
- una ruta obligatoria de comunicación o evacuación;
- tres estados o tres desenlaces globales;
- compatibilidad runtime con IDs históricos;
- todos los escenarios existentes;
- mapas geográficos reales;
- simulación física avanzada;
- cuentas de usuario y multijugador;
- separación frontend/backend en esta fase.
