# North star visual de la interfaz

Referencia aprobada: [`m3-north-star-ui.jpg`](m3-north-star-ui.jpg).

## Qué es vinculante

La referencia fija dirección de producto para:

- cabecera compacta y progreso `Territorio → Vivienda → Crisis → Resultado`;
- territorio/escena como pieza visual principal;
- contadores de acciones visibles;
- estados operativos legibles junto al territorio;
- crisis centrada en el mismo barranco con estado derivado de la partida;
- resultado separado en estado heredado y cadena causal;
- estética educativa/profesional, no infantil.

## Qué NO es vinculante

La imagen no es una especificación de dominio. No se incorporan por imitación:

- nuevas acciones o métricas;
- comparativa prepared/vulnerable simultánea durante una partida normal;
- nombres, números o resultados no existentes en el motor;
- mapas reales o simulación física;
- mecánicas de menú o progreso que contradigan los 12 nodos canónicos.

## Autoridad

```text
GameSession / dominio
→ presenter de aplicación
→ PresentedSceneVisualModel
→ SVG + HTML accesible
```

El arte guía composición y jerarquía. El motor sigue siendo la única autoridad de estado y reglas.
