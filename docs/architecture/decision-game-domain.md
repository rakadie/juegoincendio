# Decisión arquitectónica: dominio del juego

Fecha de decisión: 26 de julio de 2026  
Estado: Aprobada para la Vertical Beta 1

## Contexto

El repositorio contiene actualmente dos modelos desconectados:

1. Un dominio de ejemplo basado en `FireIncident`, coordenadas, estados de incendio, repositorio en memoria y el endpoint `/fires/active`.
2. El dominio funcional real de la partida, actualmente incrustado en `src/interfaces/http/prototype-page.ts`, donde se gestionan el estado, las decisiones, los impactos, las condiciones, las transiciones y los resultados.

También conviven dos modelos de contenido parcialmente duplicados:

- `CampaignNode`, específico y sencillo para los nodos de invierno y verano.
- `Scenario`, más completo y capaz de representar requisitos, opciones, impactos, flags, acciones, combinaciones, resultados y navegación.

La Vertical Beta 1 necesita una arquitectura mantenible, explicable y comprobable, sin introducir DDD, CQRS o infraestructura innecesaria antes de validar el producto.

## Decisión

Adoptar un **dominio ligero centrado en la partida**, representado por una entidad o agregado `GameSession` —o su equivalente en español, `Partida`—.

El incendio no será el centro del dominio. El centro será la experiencia completa del jugador y la relación causal entre prevención de invierno y actuación de verano.

## Modelo principal

La sesión de juego deberá representar, como mínimo:

```text
GameSession
├── progress
│   ├── season
│   ├── currentSceneId
│   └── completedScenes
├── prevention
│   ├── decisions
│   ├── metrics
│   ├── strengths
│   └── vulnerabilities
├── inheritedState
│   └── condiciones que pasan al verano
├── emergency
│   ├── resources
│   ├── metrics
│   ├── flags
│   └── fireState
├── history
└── result
```

## Operaciones del dominio

Las reglas se implementarán como funciones TypeScript puras y testeables. El diseño deberá cubrir operaciones equivalentes a:

- `createGameSession()`
- `applyDecision()`
- `completeInspection()`
- `calculatePreventionBalance()`
- `transitionToSummer()`
- `resolveScenario()`
- `calculateFinalResult()`

Los nombres definitivos pueden cambiar durante la implementación, pero las responsabilidades deben permanecer separadas de la interfaz.

## Modelo unificado de escenas

Se sustituirá progresivamente la duplicidad entre `CampaignNode` y `Scenario` por una unión tipada de escenas:

```ts
type GameScene =
  | DecisionScene
  | ActionSelectionScene
  | InspectionScene
  | SummaryScene
  | RouteScene;
```

Todas las escenas compartirán una base equivalente a:

```ts
interface BaseScene {
  id: string;
  phase: 'winter' | 'transition' | 'summer' | 'result';
  next?: SceneTransition[];
}
```

Las inspecciones, balances y selectores de ruta pueden conservar estructuras específicas, pero deben participar en un flujo común y utilizar el mismo contrato de estado.

## Función de `campaign.ts`

`campaign.ts` dejará de duplicar textos, opciones e impactos. Su función será declarar el recorrido oficial de la Vertical Beta 1.

Ejemplo orientativo:

```ts
export const VERTICAL_BETA_FLOW = [
  'intro',
  'winter-housing',
  'winter-territory',
  'winter-community',
  'prevention-balance',
  'first-alert',
  'summer-escalation',
  'summer-wind-change',
  'summer-communication',
  'summer-night',
  'final-report'
];
```

Los escenarios TypeScript seguirán siendo la fuente de verdad de las reglas y la estructura. El catálogo i18n seguirá siendo la fuente de verdad de los textos publicados.

## Organización recomendada

```text
src/
├── game/
│   ├── domain/
│   │   ├── game-session.ts
│   │   ├── game-scene.ts
│   │   ├── game-state.ts
│   │   └── game-event.ts
│   ├── rules/
│   │   ├── apply-decision.ts
│   │   ├── evaluate-condition.ts
│   │   ├── calculate-prevention.ts
│   │   ├── transition-to-summer.ts
│   │   └── calculate-result.ts
│   └── flow/
│       └── vertical-beta-flow.ts
├── content/
├── interfaces/http/
└── public/
```

Esta estructura es orientativa. Lo obligatorio es separar estado, reglas y flujo de las vistas HTTP.

## Dominio de incidentes existente

El dominio formado por:

- `FireIncident`;
- `FireIncidentRepository`;
- `GetActiveFiresQueryHandler`;
- `InMemoryFireIncidentRepository`;
- endpoint `/fires/active`;

se considera **código de ejemplo desconectado del producto**.

La decisión es retirarlo de la beta, no integrarlo en el nuevo dominio. Representa incendios georreferenciados reales, mientras que la Vertical Beta 1 utiliza un territorio narrativo ilustrado/SVG.

La retirada se realizará en una tarea de implementación posterior y deberá comprobar que ninguna ruta o prueba necesaria depende de esos elementos.

## Fastify

Fastify se mantiene como base de la aplicación.

Fastify será responsable de:

- servir la interfaz;
- entregar contenido;
- servir recursos estáticos;
- exponer, cuando sea necesario, endpoints estables.

Fastify no contendrá las reglas de la partida. Las rutas y vistas consumirán el dominio del juego.

## Consecuencias positivas

- La herencia invierno–verano queda representada explícitamente.
- Las reglas pueden probarse sin navegador.
- Se reduce la lógica incrustada en `prototype-page.ts`.
- Se elimina la duplicidad entre modelos de campaña.
- El informe final puede construirse desde un historial causal real.
- Se mantiene una arquitectura proporcional al tamaño de la beta.

## Costes y riesgos

- Será necesario migrar gradualmente la lógica actual sin romper la beta.
- Habrá que fijar un contrato único de métricas, flags y recursos.
- Los escenarios actuales deberán adaptarse al modelo común.
- La retirada del dominio de incidentes debe hacerse de forma controlada.
- Durante la transición convivirán temporalmente código antiguo y nuevo.

## Fuera de alcance

Esta decisión no introduce:

- DDD completo;
- CQRS;
- bus de eventos;
- repositorios persistentes;
- PostGIS;
- simulación física o celular;
- mapa geográfico real;
- separación de frontend y backend.

## Criterios de aceptación de la implementación futura

1. El estado de partida tiene un contrato TypeScript único.
2. Las decisiones de invierno producen un estado heredado explícito.
3. Las escenas de verano consumen ese estado heredado.
4. Las reglas principales pueden ejecutarse y probarse sin DOM.
5. La interfaz no calcula directamente los resultados del juego.
6. `campaign.ts` declara el flujo y no duplica contenido completo.
7. Existe un único modelo común de escenas o una compatibilidad tipada claramente delimitada.
8. El dominio de incidentes de ejemplo y `/fires/active` se retiran sin afectar la beta.
9. Dos partidas con prevención distinta generan estados y resultados diferentes de forma reproducible.

## Decisiones pendientes relacionadas

- Fijar los IDs exactos de las escenas de la Vertical Beta 1.
- Definir el contrato completo de métricas, recursos, flags y eventos.
- Dividir la migración en Issues implementables.
- Definir el plan de pruebas unitarias y de integración.
