# Vertical Beta 1 — Validación de integridad y formato declarativo

- Fecha: 16 de agosto de 2026
- Issue: #27
- Issue padre: #14
- Entradas normativas: #23, #24, #25 y #26
- Estado contrastado: `main@c2e94aea230be3735066de34ec57bbdfbf829e65`

## 1. Propósito

Este informe valida que el grafo aprobado de la Vertical Beta 1 es completo, alcanzable y acíclico. #68 convirtió el ejemplo TypeScript de M1 en el catálogo productivo `vertical-beta-catalog.ts` y mantuvo las pruebas automáticas como puerta del contrato.

## 2. Artefactos de validación

| Artefacto | Función |
|---|---|
| `src/domain/types/game-scene.ts` | Unión discriminada productiva `GameScene`, IDs y vocabularios cerrados. |
| `src/content/vertical-beta-catalog.ts` | Catálogo declarativo oficial basado exclusivamente en referencias. |
| `src/domain/validation/game-scene-catalog-validator.ts` | Validador puro de catálogo, contenido y grafo. |
| `tests/game-scene-catalog.test.ts` y `tests/vertical-beta-graph-integrity.test.ts` | Validación positiva y negativa de nodos, referencias, alcance, ciclos, ramas y exclusiones. |
| `docs/product/vertical-beta-1-graph-validation.md` | Método, resultados, límites y trazabilidad del estudio. |

El catálogo no contiene textos, impactos ni fórmulas. Cada nodo referencia contenido mediante `contentRef` y cada arista referencia un predicado aprobado en #26. El ejemplo de soporte de M1 fue retirado al convertirse esta estructura en fuente productiva mediante #68.

## 3. Formato declarativo propuesto

La unidad mínima es:

```ts
interface VerticalBetaFlowNode {
  readonly id: CanonicalSceneId;
  readonly type:
    | 'briefing'
    | 'inspection'
    | 'summary'
    | 'decision'
    | 'router'
    | 'result';
  readonly contentRef: string;
  readonly transitions: readonly {
    readonly predicate: VerticalBetaTransitionPredicate;
    readonly target: CanonicalSceneId;
  }[];
  readonly resultVariants?: readonly ResultVariant[];
}
```

Ejemplo de convergencia sin duplicar el barranco:

```ts
{
  id: 'crisis-decision-ravine-fire',
  type: 'decision',
  contentRef: 'scenario:s-027-fuego-en-barranco',
  transitions: [
    {
      predicate: 'scene-completed:branch-prepared',
      target: 'crisis-decision-housing-defense'
    },
    {
      predicate: 'scene-completed:branch-vulnerable',
      target: 'crisis-decision-crown-fire'
    }
  ]
}
```

Los IDs de predicado son referencias. La lógica numérica y su prioridad permanecen definidas una sola vez en [`vertical-beta-1-graph-transitions.md`](vertical-beta-1-graph-transitions.md).

## 4. Inventario validado

| Propiedad | Valor validado |
|---|---:|
| Nodos canónicos únicos | 12 |
| Tipos de nodo | 6 |
| Aristas únicas | 13 |
| Entradas | 1 |
| Terminales | 1 |
| Ramas condicionadas | 2 |
| Nodos de barranco | 1 |
| Variantes terminales | 2 |

Los seis tipos presentes son `briefing`, `inspection`, `summary`, `decision`, `router` y `result`.

## 5. Método de análisis

La prueba ejecuta estas comprobaciones sobre la estructura de referencia:

1. compara el orden y los 12 IDs con `CANONICAL_SCENE_IDS`;
2. detecta IDs y referencias de contenido duplicados;
3. comprueba que cada destino existe;
4. calcula grados de entrada y salida;
5. recorre el grafo desde `intro-briefing-mission`;
6. ejecuta detección de ciclos mediante estados activo/finalizado;
7. comprueba desde cada nodo que el terminal es alcanzable;
8. resuelve las rutas preparada y vulnerable filtrando predicados por rama;
9. verifica la instancia, predecesores y salidas del barranco;
10. busca referencias expresamente excluidas en la representación serializada.

## 6. Resultados

| Riesgo comprobado | Resultado | Evidencia automática |
|---|---|---|
| IDs duplicados | No existen | 12 IDs, cardinalidad 12 |
| Referencias inexistentes | No existen | Cada `target` pertenece al conjunto canónico |
| Nodos huérfanos | No existen | Los 12 nodos son alcanzables desde la entrada |
| Ciclos accidentales | No existen | Recorrido en profundidad sin retorno a nodo activo |
| Rutas muertas | No existen | El terminal es alcanzable desde cada nodo |
| Entradas múltiples | No existen | Solo `intro-briefing-mission` tiene grado de entrada 0 |
| Terminales múltiples | No existen | Solo `ending-result-causal-report` carece de salidas |
| Rama preparada inaccesible | No | Se resuelve una ruta condicionada completa |
| Rama vulnerable inaccesible | No | Se resuelve una ruta condicionada completa |
| Barranco duplicado | No | Existe una instancia con dos entradas y dos salidas condicionadas |
| Resultados modelados como nodos | No | `contained` y `overwhelmed` solo aparecen en `resultVariants` |
| Contenido excluido | No aparece | Escaneo de IDs y referencias en verde |

## 7. Rutas condicionadas verificadas

### Preparada

```text
crisis-router-causal-map
→ crisis-decision-emergency-fuel-break
→ crisis-decision-ravine-fire
→ crisis-decision-housing-defense
→ ending-result-causal-report [contained]
```

### Vulnerable

```text
crisis-router-causal-map
→ crisis-decision-access-blockage
→ crisis-decision-ravine-fire
→ crisis-decision-crown-fire
→ ending-result-causal-report [overwhelmed]
```

La evaluación por rama produce exactamente una transición aplicable en cada paso. Ambas rutas comparten el mismo nodo de barranco y convergen en el mismo resultado.

## 8. Exclusiones verificadas

La estructura no contiene referencias a:

- comunicación o evacuación como rutas;
- `p-003`;
- `invierno_*`;
- `verano_*`;
- `resultado-beta`;
- contenido de biblioteca o archivo.

Los cinco escenarios ejecutables se incorporan únicamente mediante `contentRef`. El briefing, las dos inspecciones, el resumen, el primer aviso, el router y el resultado también se referencian por ID; no se copian sus textos o reglas.

## 9. Frontera con M2

Esta entrega valida la especificación de referencia, no la campaña heredada de `src/content/campaign.ts`. Esa campaña todavía contiene `invierno_*` y `verano_*` y será retirada por #74.

La entrega #68 materializa el contrato y los datos aprobados en producción, valida cada `contentRef` contra un registro clasificado, ejecuta estas invariantes contra el catálogo real y elimina el ejemplo duplicado de soporte. La conexión de predicados con la lógica causal continúa destinada a #72 y la retirada de la campaña heredada a #74.

Esta frontera evita presentar una prueba de referencia como evidencia falsa de que el runtime ya fue migrado.

## 10. Matriz de aceptación de #27

| Criterio | Evidencia | Estado |
|---|---|---|
| Sin nodos huérfanos, ciclos o rutas muertas | Secciones 5–6 y test automático | Cumplido |
| Ambas ramas alcanzables | Sección 7 y resolución condicionada | Cumplido |
| Convergencia en un único resultado | Secciones 6–7 | Cumplido |
| Variantes terminales, no nodos | Modelo `resultVariants` y test | Cumplido |
| Una entrada y un terminal | Cálculo de grados | Cumplido |
| Sin referencias excluidas | Sección 8 y escaneo automático | Cumplido |
| Referencias por ID sin contenido duplicado | `contentRef` y predicados referenciados | Cumplido |

## 11. Conclusión

El grafo normativo de M1 supera las validaciones de integridad y dispone de un formato TypeScript mínimo y compilable. Puede servir como entrada directa de #72 y #76 sin arrastrar la campaña heredada ni duplicar contenido, impactos o reglas causales.
