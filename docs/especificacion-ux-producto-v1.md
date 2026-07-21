# Especificación UX de producto v1

## Estado

- Producto: `Apaga las llamas`
- Versión: 1.0
- Objetivo: convertir el prototipo en una experiencia jugable clara, inmersiva y accesible.
- Dirección elegida: simulador narrativo inmersivo con interfaz adaptativa por fase.

## 1. Promesa del producto

El usuario asume la responsabilidad de preparar un municipio y gestionar un incendio forestal. Debe entender qué ocurre, saber qué puede decidir y percibir que sus decisiones cambian la emergencia.

El producto no es una biblioteca de escenarios, un cuestionario ni un panel técnico. La ruta `/game-content` se conserva como herramienta editorial y de pruebas, pero no forma parte del recorrido normal del jugador.

## 2. Principios rectores

1. Una pantalla, una tarea principal.
2. Mostrar primero lo necesario para decidir; ofrecer el resto bajo demanda.
3. Expresar consecuencias mediante cambios de estado, no solo con puntuaciones.
4. Utilizar lenguaje de acción: `Prioriza`, `Activa`, `Coordina`, `Continúa`.
5. Evitar `correcto` e `incorrecto` cuando existen decisiones válidas con distintos compromisos.
6. Usar imágenes y puntos calientes solo cuando ayuden a interpretar la situación.
7. Mantener visibles el objetivo, las acciones disponibles y el progreso.
8. Cada indicador debe ayudar a decidir o comprender una consecuencia.
9. La prevención debe sentirse serena; la crisis, urgente; el resultado, reflexivo.
10. Menos interfaz y más respuesta del mundo simulado.

## 3. Primeros treinta segundos

El usuario debe comprender:

- que representa a la persona responsable de emergencias;
- que sus decisiones preventivas afectarán a la crisis;
- cuál es la primera tarea;
- cómo comenzar sin leer instrucciones extensas.

Flujo inicial:

`Introducción breve -> avatar -> contexto preventivo -> primera inspección`

La elección de avatar avanza automáticamente. El avatar debe reaparecer durante la partida; si no se utiliza después, se eliminará en una iteración posterior.

## 4. Bucle principal

`Situación -> interpretación -> decisión -> consecuencia visible -> cambio de estado -> aprendizaje -> siguiente situación`

Antes de decidir se muestra:

- título de la escena;
- una frase de situación;
- objetivo o pregunta;
- acciones disponibles;
- estado estrictamente relevante.

Después de decidir se muestra:

- confirmación inmediata;
- cambio visual o de estado;
- consecuencia breve;
- explicación completa bajo demanda;
- acción clara para continuar.

## 5. Contenido por capas

Los textos originales se conservan como contenido de referencia. La interfaz utiliza capas semánticas, no recortes irreversibles.

| Capa | Función | Longitud orientativa | Visibilidad |
| --- | --- | --- | --- |
| Título | Identificar la situación | 3-8 palabras | Siempre |
| Entrada | Explicar que ocurre | 90-160 caracteres | Siempre |
| Objetivo | Indicar que debe conseguirse | Una frase | Siempre |
| Acción | Nombrar la decisión | 2-7 palabras | Siempre |
| Resumen de acción | Aclarar alcance | Hasta 140 caracteres | Siempre |
| Contexto | Conservar la narración completa | Sin límite editorial artificial | Bajo demanda |
| Consecuencia | Cerrar el bucle inmediato | 1-2 frases | Tras decidir |
| Análisis | Explicar criterio, impactos y fuentes | Sin límite editorial artificial | Bajo demanda |

Uso de los campos actuales:

- `intro`: entrada breve visible.
- `objective` o `question`: tarea principal visible.
- `context`: narración completa en `Contexto completo`.
- `briefing`: criterio técnico dentro del panel de contexto o del análisis posterior.
- `action.label` o un futuro `option.shortLabel`: acción escaneable.
- `description` u `option.text`: resumen de la acción.
- `feedback`: consecuencia inmediata.
- `longFeedback` y `rationale`: análisis posterior.

No se generarán resúmenes automáticamente durante la partida. Cada resumen debe formar parte del contenido revisado para evitar cambios de sentido.

## 6. Patrón de contexto completo

- Escritorio: panel lateral no modal que mantiene visible la escena.
- Móvil: hoja inferior con cierre visible.
- Activador: icono de información y texto `Contexto completo`.
- Puntos calientes: tooltip de una sola línea al pasar o enfocar; panel al pulsar.
- El icono de tres puntos se reserva para menús de acciones secundarias.
- El atributo `alt` describe la imagen; nunca sustituye al contexto narrativo.
- El control debe tener nombre accesible, foco visible y funcionamiento por teclado.

## 7. Decisiones

### Decisiones espaciales

Se utilizan puntos calientes sobre una imagen cuando la posición aporta significado: canalones, accesos, vegetación, rutas o edificios.

Al seleccionar un punto:

- se destaca el elemento;
- aparece una acción breve fuera de la zona que pueda tapar la imagen;
- se mantiene una alternativa equivalente en una lista accesible;
- tras aplicar la acción, la escena refleja el cambio siempre que sea viable.

### Decisiones abstractas

Comunicación, coordinación y asignación de recursos se presentan en una bandeja de decisiones vinculada a la escena. No se fuerzan puntos calientes sin relación espacial.

Se muestran entre dos y cuatro opciones comparables. Cuando una escena requiere priorizar varias actuaciones, el contador indica cuántas quedan.

## 8. Respuesta visual de la escena

La imagen no es decorativa. Debe mostrar al menos uno de estos cambios:

- vulnerabilidad corregida o pendiente;
- ruta activada o bloqueada;
- zona protegida o expuesta;
- presión operativa que aumenta o disminuye;
- nueva información recibida;
- consecuencia diferida procedente de una fase anterior.

Repetir la opción elegida sobre la imagen sirve como confirmación, pero no sustituye al cambio de estado.

## 9. Arquitectura de la experiencia

### Prevención

Imagen panorámica, puntos vulnerables, actuaciones limitadas y diagnóstico final. Indicadores discretos y lenguaje tranquilo.

### Primer aviso

Información incompleta, una decisión clara y transición de ritmo. No debe convertirse en otra inspección.

### Crisis

Escena o mapa funcional, presiones relevantes, decisiones operativas y consecuencias acumuladas. La urgencia se comunica sin temporizadores obligatorios en la primera versión.

### Resultado

Relaciona preparación, decisiones y desenlace. Permite revisar momentos clave y repetir desde una fase comprensible.

## 10. Navegación

- El recorrido principal es lineal con ramificaciones controladas.
- Las fases futuras aparecen bloqueadas sin competir visualmente con la tarea actual.
- `Continuar` es la acción primaria después de una consecuencia.
- `Reiniciar fase`, `Contexto completo` y opciones de accesibilidad son secundarias.
- La búsqueda y el listado completo de escenarios pertenecen a `/game-content`.

## 11. Accesibilidad mínima

- Contraste WCAG 2.2 AA.
- Controles táctiles de al menos 44 por 44 px.
- Navegación completa por teclado.
- Foco visible y orden de foco coherente.
- Ninguna información depende solo del color.
- Texto ampliable al 200 % sin perder acciones.
- Tooltips accesibles mediante foco y no imprescindibles para decidir.
- Movimiento reducido respetado.
- Experiencia completa sin sonido.

## 12. Calidad de implementación

Se aplicará diseño evolutivo inspirado en los criterios de Martin Fowler:

- cambios pequeños y verificables;
- refactorización separada de los cambios de comportamiento cuando sea posible;
- pruebas en las fronteras de comportamiento y en la lógica de estado;
- nombres que expresen intención;
- eliminación de duplicidad real antes de crear abstracciones;
- modelo de contenido independiente de la representación visual;
- sin reescrituras generales mientras una evolución incremental sea suficiente.

## 13. Primera iteración

Objetivo: que la ruta `/` deje de parecer una beta técnica y presente un recorrido de producto claro.

Incluye:

- simplificar cabecera y navegación;
- retirar del recorrido principal datos de API, enlaces técnicos y diagnósticos internos;
- reducir el briefing inicial a rol, promesa y una acción primaria;
- introducir el control accesible `Contexto completo`;
- mantener los textos extensos sin mostrarlos de entrada;
- conservar `/game-content` como herramienta editorial;
- verificar escritorio, móvil, teclado y pruebas automatizadas existentes.

## 14. Fuera de alcance por ahora

- rankings, insignias y perfiles persistentes;
- sonido y música;
- multijugador;
- mapas sin función jugable;
- temporizadores que penalicen la lectura;
- simulación física del fuego;
- paneles de analítica para instituciones;
- personalización visual avanzada;
- reescritura completa de la arquitectura.

## 15. Criterios de aceptación de la primera iteración

1. La pantalla inicial tiene una sola acción primaria.
2. No muestra API, JSON, número de escenarios ni controles de depuración.
3. Se puede comprender el rol y comenzar en menos de treinta segundos.
4. El contexto completo sigue disponible sin bloquear el avance.
5. El activador de contexto funciona con ratón, táctil y teclado.
6. La interfaz no utiliza `alt` ni tooltips para alojar párrafos largos.
7. El recorrido principal funciona a 1440 px y 390 px de ancho.
8. Las pruebas y el chequeo de tipos terminan correctamente.
