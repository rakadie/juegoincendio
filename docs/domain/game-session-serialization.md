# GameSession — serialización y validación de contrato

Estado: propuesta ejecutable de M1 para #31.  
Entradas: #29 (`GameSession`) y #30 (eventos e invariantes).  
Implementación de motor: fuera de alcance; corresponde a #69.

## Propósito

Esta entrega convierte el contrato documental de `GameSession` en una especificación ejecutable mediante cuatro snapshots JSON, una matriz de cobertura y un validador puro utilizado únicamente por las pruebas.

El objetivo no es simular todavía la partida. El objetivo es demostrar que cualquier implementación posterior puede:

1. guardar el snapshot sin tipos especiales;
2. restaurarlo sin pérdida;
3. validar la coherencia entre snapshot e historial;
4. rechazar estados corruptos con códigos estables;
5. representar los 12 nodos, las dos ramas y los dos resultados aprobados.

## Artefactos

```text
tests/fixtures/game-session/
├── initial.json
├── prevention-completed.json
├── crisis-prepared.json
├── completed-contained.json
└── coverage.json

tests/support/game-session-contract.ts
tests/game-session-contract.test.ts
```

Los valores causales incluidos son ejemplos válidos para comprobar forma y coherencia. No fijan los rangos, impactos o umbrales que deben definir #32–#35, ni sustituyen los fixtures canónicos de #44–#47.

## Snapshots

### `initial.json`

Representa una sesión activa situada en `intro-briefing-mission`, sin decisiones, estado heredado, rama ni resultado. El historial contiene únicamente `session-created`.

### `prevention-completed.json`

Representa las dos inspecciones oficiales completadas, con tres decisiones territoriales, dos decisiones de vivienda y un `InheritedState` calculado. La escena actual es `transition-summary-prevention`.

### `crisis-prepared.json`

Representa una sesión activa después de que el router haya seleccionado `prepared`. La apertura de la rama preparada está completada y la escena actual es `crisis-decision-ravine-fire`.

### `completed-contained.json`

Representa una sesión cerrada sobre la rama preparada, con el nodo terminal completado y resultado `contained`.

La prueba construye además en memoria una variante vulnerable completa y verifica que el mismo contrato admite `vulnerable` y `overwhelmed` sin añadir campos ni crear un segundo modelo de sesión.

## Matriz de cobertura

`coverage.json` enumera exactamente:

- 12 IDs canónicos;
- cinco fases: `intro`, `prevention`, `transition`, `crisis`, `ending`;
- seis tipos de nodo;
- dos ramas;
- dos variantes de resultado;
- campos de sesión requeridos por nodo;
- campos requeridos por las siete operaciones conceptuales de #30.

La matriz no contiene contenido editorial ni reglas. Su función es detectar que una futura modificación del contrato deja un nodo u operación sin los datos necesarios.

## Reglas de serialización

`GameSession` solo admite valores JSON:

- `null`;
- cadenas;
- booleanos;
- números finitos;
- arrays;
- objetos planos.

Se rechazan expresamente:

- `undefined`;
- `NaN` e infinitos;
- funciones y símbolos;
- `Date`, `Map`, `Set` o instancias de clase;
- referencias circulares;
- claves estructurales no declaradas.

Cada fixture debe cumplir:

```text
JSON.parse(JSON.stringify(fixture)) deep-equals fixture
```

## Coherencia snapshot–historial

El validador comprueba:

- un único `session-created` como primer evento;
- secuencias contiguas de eventos y decisiones;
- relación uno a uno entre decisiones y `decision-applied`;
- coincidencia entre `completedSceneIds` y `scene-completed`;
- reproducción del nodo actual mediante las transiciones;
- igualdad entre `InheritedState` y su evento de cálculo;
- igualdad entre rama y `crisis-branch-selected`;
- igualdad entre resultado y `session-completed`;
- ausencia de eventos posteriores al cierre;
- compatibilidad de las escenas recorridas con la rama.

Una discrepancia devuelve un resultado inválido. El validador no corrige silenciosamente el snapshot ni el historial.

## Códigos de error

Los tests utilizan códigos estables agrupados en:

- compatibilidad JSON y claves;
- versión, identidad y estado;
- progreso y decisiones;
- `InheritedState`, rama y resultado;
- eventos y secuencias;
- corrupción entre snapshot e historial;
- incompatibilidad entre rama y recorrido;
- cierre inconsistente.

El texto visible de los errores no forma parte del contrato de dominio y puede cambiar. Los códigos son la interfaz comprobable.

## Límites de M1

Esta entrega no implementa:

- aplicación de decisiones;
- cálculo real de las cinco dimensiones;
- selección causal de la rama;
- avance del flujo;
- resultado final;
- persistencia en navegador o servidor;
- endpoints o renderer.

El helper se mantiene en `tests/support`. Durante #69 podrá promoverse total o parcialmente a dominio si la implementación necesita reutilizar las mismas comprobaciones.

## Ejecución

```bash
npm run test:contract
npm test
npm run typecheck
npm run build
```

`test:contract` ejecuta solo esta especificación. El comando general `test` sigue ejecutando toda la suite.

## Condición de revisión

La issue #31 permanece abierta hasta revisar:

- estructura y suficiencia de los snapshots;
- severidad de las validaciones;
- cobertura de casos negativos;
- frontera entre test de contrato y futura implementación de #69.
