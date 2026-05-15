# Prompt maestro para reorganizar el newsgame “¡Apaga las llamas!”

## Objetivo general

Necesito que me ayudes a rediseñar la arquitectura de contenido y la estructura de plantillas de una página web/newsgame sobre incendios forestales. El proyecto simula la toma de decisiones durante un gran incendio, con escenarios de prevención, comunicación y operaciones. 

Actualmente tenemos un listado lateral de escenarios y, al seleccionar cada uno, aparecen varias opciones de decisión. Cada opción puede ser recomendada o no recomendada y modifica variables internas del juego mediante impactos numéricos.

El problema es que el contenido está creciendo y necesitamos una estructura más escalable, limpia y fácil de mantener. Queremos evitar que el código se convierta en una sucesión inmanejable de escenarios escritos a mano dentro del frontend.

Necesito una propuesta completa para convertir el sistema actual en un modelo modular basado en datos, plantillas reutilizables y componentes dinámicos.

---

## Contexto del proyecto

El juego se llama provisionalmente **“¡Apaga las llamas!”**.

La idea es que el usuario tome decisiones en diferentes fases de un incendio forestal:

- Prevención.
- Comunicación pública.
- Operaciones de emergencia.
- Evacuaciones.
- Gestión de recursos.
- Relación con la población.
- Daños materiales.
- Protección del entorno rural.
- Coordinación institucional.

El juego no debe funcionar como un simple test de respuestas correctas e incorrectas. Queremos que tenga más profundidad narrativa. Algunas decisiones pueden ser claramente correctas, otras aceptables, otras arriesgadas y otras directamente negligentes. 

El objetivo es que el usuario sienta que sus decisiones tienen consecuencias acumuladas, no solo que recibe una etiqueta de “bien” o “mal”.

---

## Ejemplo de estructura actual

Ahora mismo tenemos escenarios con una estructura parecida a esta:

```js
{
  id: 's-010-cambio-viento-evacuacion',
  title: 'Cambio de viento hacia núcleo poblado',
  category: 'operaciones',
  context: 'El frente cambia dirección y amenaza zona habitada.',
  options: [
    {
      id: 'a',
      text: 'Ordenar evacuación y traslado también de animales a centros de acogida',
      recommended: true,
      rationale: 'Protege vidas humanas y reduce pérdidas indirectas en explotaciones.',
      impacts: [
        { variableKey: 'danosPotencialesVivienda', delta: -5 },
        { variableKey: 'confianzaVecinal', delta: 4 }
      ]
    },
    {
      id: 'b',
      text: 'Evacuar solo a personas y dejar animales en fincas',
      recommended: false,
      rationale: 'Aumenta impacto en economía familiar y bienestar animal.',
      impacts: [
        { variableKey: 'continuidadSectorPrimario', delta: -4 }
      ]
    },
    {
      id: 'c',
      text: 'Ordeno una evacuación escalonada y habilito varios puntos de acogida en municipios cercanos',
      recommended: true,
      rationale: 'Reduce cuellos de botella, ordena los traslados y mejora la protección de la población desplazada.',
      impacts: [
        { variableKey: 'danosPotencialesVivienda', delta: -3 },
        { variableKey: 'confianzaVecinal', delta: 5 },
        { variableKey: 'capacidadOperativa', delta: -3 }
      ]
    },
    {
      id: 'd',
      text: 'Doy a los vecinos la opción de decidir si quieren evacuar o no',
      recommended: false,
      rationale: 'Delegar la evacuación en decisión individual en fase crítica aumenta la exposición y descoordinación.',
      impacts: [
        { variableKey: 'danosPotencialesVivienda', delta: 6 },
        { variableKey: 'confianzaVecinal', delta: -5 }
      ]
    }
  ]
}
```

Esta base funciona, pero necesitamos mejorarla para que pueda crecer.

---

## Lo que necesito que propongas

Quiero que desarrolles un plan amplio para reorganizar este sistema. La propuesta debe incluir:

1. Un nuevo modelo de datos para los escenarios.
2. Una nueva estructura para las opciones.
3. Un sistema de evaluación más rico que `recommended: true/false`.
4. Una organización por fases, categorías y bloques temáticos.
5. Componentes reutilizables para pintar la interfaz.
6. Una estrategia para gestionar impactos acumulados.
7. Una propuesta para añadir consecuencias narrativas.
8. Una forma de desbloquear escenarios según decisiones previas.
9. Un sistema de titulares, boletines o mensajes de prensa generados tras las decisiones.
10. Recomendaciones de diseño visual para que el juego sea comprensible aunque crezca.
11. Recomendaciones para separar contenido, lógica y presentación.
12. Ejemplos de código o pseudocódigo en JavaScript.
13. Una propuesta de estructura de carpetas.
14. Una estrategia para validar que todos los escenarios están bien escritos y equilibrados.
15. Una propuesta de evolución futura del juego.

---

# Propuesta esperada

## 1. Principio de arquitectura

El contenido debe estar separado del diseño y de la lógica.

La página no debería tener escenarios escritos directamente en el HTML o en componentes específicos. Lo ideal es que exista una fuente de datos centralizada, por ejemplo:

```txt
/src/data/scenarios.js
/src/data/variables.js
/src/data/categories.js
/src/data/phases.js
```

o, si queremos hacerlo aún más limpio:

```txt
/src/content/scenarios/prevencion.js
/src/content/scenarios/comunicacion.js
/src/content/scenarios/operaciones.js
```

La interfaz debe limitarse a leer esos datos y representarlos mediante componentes reutilizables.

---

## 2. Nuevo modelo de escenario

Propón un modelo más completo que incluya:

```js
{
  id: 's-010-cambio-viento-evacuacion',
  title: 'Cambio de viento hacia núcleo poblado',
  category: 'operaciones',
  phase: 'crisis',
  block: 'evacuacion-y-proteccion-civil',
  difficulty: 'alta',
  estimatedTime: '2 min',
  tags: [
    'evacuacion',
    'proteccion-civil',
    'ganaderia',
    'viento',
    'zona-habitada'
  ],
  context: 'El frente cambia dirección y amenaza una zona habitada.',
  question: '¿Cómo gestionas la evacuación?',
  briefing: 'El cambio de viento obliga a tomar una decisión rápida. Hay viviendas, explotaciones ganaderas y carreteras secundarias en riesgo.',
  options: [],
  unlocks: [],
  sourceNotes: []
}
```

Explica para qué sirve cada campo.

Especialmente:

- `id`: identificador único.
- `title`: título visible del escenario.
- `category`: prevención, comunicación u operaciones.
- `phase`: fase narrativa del incendio.
- `block`: agrupación temática.
- `difficulty`: baja, media, alta o crítica.
- `estimatedTime`: tiempo estimado de lectura/decisión.
- `tags`: etiquetas para filtrar, buscar o desbloquear relaciones.
- `context`: introducción breve.
- `question`: dilema que debe resolver el usuario.
- `briefing`: contexto ampliado.
- `options`: decisiones posibles.
- `unlocks`: escenarios que pueden desbloquearse.
- `sourceNotes`: notas internas de documentación o verificación.

---

## 3. Nuevo modelo de opción

Sustituir `recommended: true/false` por un sistema más expresivo.

Propuesta:

```js
{
  id: 'c',
  text: 'Ordeno una evacuación escalonada y habilito varios puntos de acogida en municipios cercanos',
  evaluation: 'recommended',
  severity: 'medium',
  rationale: 'Reduce cuellos de botella, ordena los traslados y mejora la protección de la población desplazada.',
  shortFeedback: 'La evacuación se desarrolla con menos caos del esperado.',
  longFeedback: 'La decisión mejora la seguridad de la población y evita que todos los desplazamientos se concentren en una única vía. Sin embargo, consume capacidad operativa adicional.',
  newsHeadline: 'Protección Civil activa acogidas coordinadas en varios municipios',
  publicReaction: 'Los vecinos valoran la claridad de las instrucciones, aunque algunos critican la lentitud de los traslados.',
  operationalNote: 'La medida exige coordinación con ayuntamientos, policía local y servicios sociales.',
  impacts: [
    { variableKey: 'danosPotencialesVivienda', delta: -3 },
    { variableKey: 'confianzaVecinal', delta: 5 },
    { variableKey: 'capacidadOperativa', delta: -3 }
  ],
  unlocks: [
    's-011-saturacion-centros-acogida'
  ],
  flags: [
    'evacuacion-escalonada'
  ]
}
```

Explica el sentido de cada campo.

---

## 4. Sistema de evaluación

No usar solo recomendado/no recomendado.

Proponer una escala:

```js
const evaluationTypes = {
  optimal: {
    label: 'Óptima',
    color: 'green',
    description: 'Decisión muy alineada con la gestión segura y eficaz.'
  },
  recommended: {
    label: 'Recomendada',
    color: 'emerald',
    description: 'Buena decisión, aunque puede tener costes o efectos secundarios.'
  },
  acceptable: {
    label: 'Aceptable',
    color: 'blue',
    description: 'No es la mejor opción, pero puede funcionar en determinadas condiciones.'
  },
  risky: {
    label: 'Arriesgada',
    color: 'orange',
    description: 'Puede agravar el problema si el contexto empeora.'
  },
  critical: {
    label: 'Crítica',
    color: 'red',
    description: 'Decisión peligrosa o claramente desaconsejable.'
  }
}
```

La interfaz debe poder mostrar colores, iconos y mensajes distintos según esta evaluación.

---

## 5. Variables del juego

Definir un archivo central para las variables:

```js
export const variables = {
  danosPotencialesVivienda: {
    label: 'Daños potenciales en viviendas',
    icon: 'home',
    min: 0,
    max: 100,
    initial: 40,
    direction: 'lowerIsBetter',
    description: 'Mide el riesgo acumulado de daños sobre casas, fincas y núcleos habitados.'
  },
  confianzaVecinal: {
    label: 'Confianza vecinal',
    icon: 'users',
    min: 0,
    max: 100,
    initial: 50,
    direction: 'higherIsBetter',
    description: 'Refleja el grado de confianza de la población en las decisiones del operativo.'
  },
  capacidadOperativa: {
    label: 'Capacidad operativa',
    icon: 'truck',
    min: 0,
    max: 100,
    initial: 60,
    direction: 'higherIsBetter',
    description: 'Indica la disponibilidad de recursos humanos, técnicos y logísticos.'
  },
  continuidadSectorPrimario: {
    label: 'Continuidad del sector primario',
    icon: 'tractor',
    min: 0,
    max: 100,
    initial: 55,
    direction: 'higherIsBetter',
    description: 'Representa el impacto del incendio en explotaciones agrícolas, ganaderas y economía rural.'
  }
}
```

Explicar que esto permite:

- Pintar medidores.
- Evitar nombres crípticos en pantalla.
- Controlar mínimos y máximos.
- Saber si subir una variable es positivo o negativo.
- Mostrar impactos de forma comprensible.

---

## 6. Componentes reutilizables

Proponer una interfaz basada en componentes.

Componentes mínimos:

```txt
ScenarioLayout
ScenarioSidebar
ScenarioList
ScenarioCard
ScenarioHeader
ScenarioBriefing
OptionCard
ImpactBadge
ImpactSummary
VariableMeter
NarrativeFeedback
NewsTicker
ProgressTracker
FilterBar
SearchScenario
```

Explica qué hace cada componente.

### Ejemplo

`ScenarioLayout` organiza la pantalla general.

`ScenarioSidebar` muestra categorías y bloques.

`ScenarioList` pinta el listado de escenarios.

`ScenarioCard` muestra el escenario activo.

`OptionCard` pinta cada decisión.

`ImpactBadge` convierte `{ variableKey, delta }` en algo legible:

```txt
Confianza vecinal +5
Daños potenciales en viviendas -3
Capacidad operativa -3
```

`VariableMeter` muestra el estado acumulado de una variable.

`NewsTicker` muestra titulares narrativos después de decisiones importantes.

---

## 7. Organización de la navegación

El listado lateral no debería ser una lista plana infinita.

Propuesta:

```txt
Prevención
  - Contexto inicial
  - Gestión del territorio
  - Uso del fuego
  - Maquinaria y trabajos agrícolas
  - Comunicación preventiva

Comunicación
  - Avisos oficiales
  - Ruedas de prensa
  - Rumores y desinformación
  - Relación con medios
  - Mensajes a población vulnerable

Operaciones
  - Ataque inicial
  - Evacuaciones
  - Recursos aéreos
  - Brigadas terrestres
  - Protección de viviendas
  - Coordinación intermunicipal
```

Usar acordeones o secciones plegables.

Añadir:

- Buscador.
- Filtro por categoría.
- Filtro por dificultad.
- Estado del escenario: pendiente, completado, bloqueado.
- Progreso por fase.

---

## 8. Gestión de impactos acumulados

Crear una función genérica:

```js
function applyImpacts(currentState, impacts) {
  const nextState = { ...currentState }

  impacts.forEach(({ variableKey, delta }) => {
    const variable = variables[variableKey]

    if (!variable) {
      console.warn(`Variable desconocida: ${variableKey}`)
      return
    }

    const currentValue = nextState[variableKey] ?? variable.initial
    const nextValue = currentValue + delta

    nextState[variableKey] = Math.max(
      variable.min,
      Math.min(variable.max, nextValue)
    )
  })

  return nextState
}
```

Esto evita repetir lógica y permite controlar los límites de cada variable.

---

## 9. Consecuencias narrativas

Cada decisión debería poder generar no solo números, sino una consecuencia narrativa.

Ejemplo:

```js
narrativeEffects: {
  immediate: 'La población comienza a evacuar de forma ordenada, aunque algunas familias piden ayuda para trasladar animales.',
  delayed: 'Horas después, los centros de acogida reciben más personas de las previstas.',
  radioBulletin: 'Última hora: se habilitan varios puntos de acogida tras el cambio de viento.',
  socialReaction: 'En redes se valora la rapidez del aviso, pero aparecen críticas por la falta de transporte para personas mayores.'
}
```

Esto permite que el juego tenga una capa periodística y sonora.

---

## 10. Sistema de titulares y boletines

Añadir titulares que puedan aparecer después de una decisión.

Ejemplo:

```js
mediaOutputs: [
  {
    type: 'radio',
    tone: 'urgent',
    text: 'Última hora: el cambio de viento obliga a evacuar varios barrios próximos al monte.'
  },
  {
    type: 'press',
    tone: 'analysis',
    text: 'La evacuación escalonada evita el colapso de las carreteras secundarias.'
  },
  {
    type: 'social',
    tone: 'mixed',
    text: 'Vecinos agradecen los avisos, pero reclaman más apoyo para trasladar animales.'
  }
]
```

Estos mensajes podrían mostrarse en un panel lateral o como una pausa narrativa después de seleccionar una opción.

La intención es que el jugador no solo vea “+5 confianza”, sino que entienda qué significa ese impacto en el mundo del juego.

---

## 11. Escenarios encadenados

Permitir que una decisión desbloquee otros escenarios.

Ejemplo:

```js
unlocks: [
  {
    scenarioId: 's-011-saturacion-centros-acogida',
    condition: {
      variableKey: 'capacidadOperativa',
      operator: '<',
      value: 40
    }
  }
]
```

O bien:

```js
flags: ['evacuacion-escalonada']
```

Luego otro escenario puede requerir:

```js
requirements: {
  flagsAny: ['evacuacion-escalonada'],
  variables: [
    { variableKey: 'capacidadOperativa', operator: '<', value: 45 }
  ]
}
```

Esto permite crear rutas distintas según decisiones previas.

---

## 12. Estados de escenario

Cada escenario puede tener estado:

```js
status: 'locked' | 'available' | 'completed'
```

En la interfaz:

- Bloqueado: aparece atenuado.
- Disponible: se puede seleccionar.
- Completado: aparece con marca.
- Crítico: puede aparecer destacado.

---

## 13. Estructura de carpetas recomendada

Proponer algo así:

```txt
/src
  /components
    /layout
      ScenarioLayout.jsx
      Sidebar.jsx
    /scenario
      ScenarioCard.jsx
      ScenarioHeader.jsx
      ScenarioBriefing.jsx
      OptionCard.jsx
      OptionList.jsx
    /feedback
      NarrativeFeedback.jsx
      NewsTicker.jsx
      ImpactSummary.jsx
    /ui
      Badge.jsx
      Meter.jsx
      Accordion.jsx
      SearchInput.jsx

  /data
    scenarios.js
    variables.js
    categories.js
    phases.js
    evaluationTypes.js

  /logic
    applyImpacts.js
    unlockScenarios.js
    evaluateDecision.js
    scenarioFilters.js
    validateScenario.js

  /state
    gameState.js

  /styles
    theme.css
```

Explicar la función de cada carpeta.

---

## 14. Ejemplo completo de escenario mejorado

Generar un ejemplo usando el escenario de cambio de viento:

```js
export const cambioVientoEvacuacion = {
  id: 's-010-cambio-viento-evacuacion',
  title: 'Cambio de viento hacia núcleo poblado',
  category: 'operaciones',
  phase: 'crisis',
  block: 'evacuaciones',
  difficulty: 'alta',
  estimatedTime: '2 min',
  tags: [
    'viento',
    'evacuacion',
    'zona-habitada',
    'proteccion-civil',
    'sector-primario'
  ],
  context: 'El frente cambia dirección y amenaza una zona habitada.',
  briefing:
    'El cambio repentino del viento acerca el frente a varias viviendas y fincas. Hay personas mayores, animales en explotaciones y una carretera secundaria que puede saturarse en pocos minutos.',
  question: '¿Cómo gestionas la evacuación?',
  options: [
    {
      id: 'a',
      text: 'Ordenar evacuación y traslado también de animales a centros de acogida',
      evaluation: 'recommended',
      rationale:
        'Protege vidas humanas y reduce pérdidas indirectas en explotaciones, aunque exige más logística.',
      shortFeedback:
        'La evacuación protege a la población y reduce el impacto sobre las explotaciones.',
      impacts: [
        { variableKey: 'danosPotencialesVivienda', delta: -5 },
        { variableKey: 'confianzaVecinal', delta: 4 },
        { variableKey: 'capacidadOperativa', delta: -2 },
        { variableKey: 'continuidadSectorPrimario', delta: 3 }
      ],
      mediaOutputs: [
        {
          type: 'radio',
          tone: 'urgent',
          text:
            'Protección Civil ordena la evacuación de vecinos y activa recursos para el traslado de animales.'
        }
      ],
      flags: ['evacuacion-con-animales']
    },
    {
      id: 'b',
      text: 'Evacuar solo a personas y dejar animales en fincas',
      evaluation: 'risky',
      rationale:
        'Prioriza vidas humanas, pero aumenta el impacto emocional, económico y social en familias vinculadas al sector primario.',
      shortFeedback:
        'La población evacúa, pero muchas familias se resisten a abandonar sus animales.',
      impacts: [
        { variableKey: 'continuidadSectorPrimario', delta: -4 },
        { variableKey: 'confianzaVecinal', delta: -2 },
        { variableKey: 'capacidadOperativa', delta: 1 }
      ],
      mediaOutputs: [
        {
          type: 'social',
          tone: 'critical',
          text:
            'Vecinos denuncian que se les obliga a abandonar animales en explotaciones amenazadas por el fuego.'
        }
      ],
      flags: ['animales-abandonados']
    },
    {
      id: 'c',
      text:
        'Ordeno una evacuación escalonada y habilito varios puntos de acogida en municipios cercanos',
      evaluation: 'optimal',
      rationale:
        'Reduce cuellos de botella, ordena los traslados y mejora la protección de la población desplazada.',
      shortFeedback:
        'La evacuación escalonada evita el colapso inicial de las carreteras.',
      impacts: [
        { variableKey: 'danosPotencialesVivienda', delta: -3 },
        { variableKey: 'confianzaVecinal', delta: 5 },
        { variableKey: 'capacidadOperativa', delta: -3 }
      ],
      mediaOutputs: [
        {
          type: 'press',
          tone: 'analysis',
          text:
            'La evacuación escalonada permite distribuir mejor a la población desplazada y reduce la presión sobre los accesos.'
        }
      ],
      unlocks: ['s-011-saturacion-centros-acogida'],
      flags: ['evacuacion-escalonada']
    },
    {
      id: 'd',
      text: 'Doy a los vecinos la opción de decidir si quieren evacuar o no',
      evaluation: 'critical',
      rationale:
        'Delegar la evacuación en decisión individual en fase crítica aumenta la exposición, la confusión y la descoordinación.',
      shortFeedback:
        'La falta de una orden clara genera retrasos y decisiones contradictorias.',
      impacts: [
        { variableKey: 'danosPotencialesVivienda', delta: 6 },
        { variableKey: 'confianzaVecinal', delta: -5 },
        { variableKey: 'capacidadOperativa', delta: -2 }
      ],
      mediaOutputs: [
        {
          type: 'radio',
          tone: 'urgent',
          text:
            'Vecinos de la zona afectada denuncian instrucciones contradictorias durante el avance del fuego.'
        }
      ],
      unlocks: ['s-012-vecinos-atrapados'],
      flags: ['evacuacion-descoordinada']
    }
  ]
}
```

---

## 15. Validación de escenarios

Proponer una función que revise automáticamente errores básicos.

Ejemplo:

```js
function validateScenario(scenario) {
  const errors = []

  if (!scenario.id) errors.push('Falta id')
  if (!scenario.title) errors.push(`Falta title en ${scenario.id}`)
  if (!scenario.category) errors.push(`Falta category en ${scenario.id}`)
  if (!scenario.context) errors.push(`Falta context en ${scenario.id}`)
  if (!Array.isArray(scenario.options)) {
    errors.push(`Options debe ser array en ${scenario.id}`)
  }

  scenario.options?.forEach((option) => {
    if (!option.id) errors.push(`Opción sin id en ${scenario.id}`)
    if (!option.text) errors.push(`Opción sin text en ${scenario.id}`)
    if (!option.evaluation) errors.push(`Opción sin evaluation en ${scenario.id}`)
    if (!option.rationale) errors.push(`Opción sin rationale en ${scenario.id}`)

    option.impacts?.forEach((impact) => {
      if (!impact.variableKey) {
        errors.push(`Impacto sin variableKey en ${scenario.id}/${option.id}`)
      }
      if (typeof impact.delta !== 'number') {
        errors.push(`Impacto sin delta numérico en ${scenario.id}/${option.id}`)
      }
    })
  })

  return errors
}
```

Explicar que esto evita errores silenciosos.

---

## 16. Balance del juego

Proponer una tabla de control para revisar que las decisiones están equilibradas.

Por cada escenario:

```txt
Escenario | Opción | Evaluación | Daños vivienda | Confianza | Capacidad operativa | Sector primario
```

Esto permite detectar si:

- Todas las decisiones buenas son demasiado buenas.
- Las decisiones malas castigan demasiado.
- Una variable casi nunca se modifica.
- El jugador puede ganar sin coste.
- Una opción recomendada no tiene ningún precio operativo.

La lógica debe ser: una decisión buena también puede tener coste. Por ejemplo, una evacuación bien hecha puede mejorar confianza y reducir daños, pero consumir capacidad operativa.

---

## 17. Diseño visual recomendado

La interfaz debe ser clara y escalable.

### Columna izquierda

- Categorías plegables.
- Buscador.
- Filtros.
- Estado de escenario.
- Progreso por fase.

### Zona central

- Título del escenario.
- Contexto.
- Briefing.
- Pregunta.
- Opciones en tarjetas.

### Zona derecha o panel inferior

- Variables acumuladas.
- Consecuencias narrativas.
- Titular o boletín tras cada decisión.
- Historial de decisiones tomadas.

---

## 18. Estilo de las opciones

Cada opción debería tener:

- Letra visible: A, B, C, D.
- Texto de decisión.
- Etiqueta de evaluación.
- Explicación desplegable.
- Impactos resumidos.
- Consecuencia narrativa tras seleccionarla.

No mostrar todo de golpe si la tarjeta queda demasiado cargada. Mejor:

Antes de elegir:

```txt
Opción C
Ordeno una evacuación escalonada y habilito varios puntos de acogida...
```

Después de elegir:

```txt
Evaluación: Óptima
La evacuación escalonada evita el colapso inicial de las carreteras.
Impactos:
Confianza vecinal +5
Daños potenciales en viviendas -3
Capacidad operativa -3
```

---

## 19. Modo periodístico

Añadir una capa de “cobertura informativa” del incendio.

Después de cada decisión importante, mostrar uno de estos formatos:

### Boletín de radio

```txt
Última hora. El cambio de viento obliga a evacuar varias zonas próximas al monte. 
Los servicios de emergencia piden a la población que siga solo los canales oficiales.
```

### Titular de prensa

```txt
La evacuación escalonada evita el colapso de los accesos al municipio
```

### Reacción ciudadana

```txt
Vecinos agradecen la claridad de las instrucciones, pero reclaman más transporte para personas mayores.
```

Esto refuerza la identidad del newsgame y lo diferencia de un test escolar.

---

## 20. Recomendación final

La propuesta debe concluir con una hoja de ruta práctica:

### Fase 1: Ordenar datos

- Crear `variables.js`.
- Crear `evaluationTypes.js`.
- Dividir escenarios por categoría.
- Añadir `phase`, `block`, `difficulty`, `tags` y `question`.

### Fase 2: Rehacer componentes

- Crear `ScenarioLayout`.
- Crear `ScenarioSidebar`.
- Crear `ScenarioCard`.
- Crear `OptionCard`.
- Crear `ImpactBadge`.
- Crear `VariableMeter`.
- Crear `NarrativeFeedback`.

### Fase 3: Añadir lógica de juego

- Crear `applyImpacts`.
- Crear `unlockScenarios`.
- Crear `validateScenario`.
- Guardar historial de decisiones.

### Fase 4: Añadir narrativa

- Añadir `mediaOutputs`.
- Añadir boletines de radio.
- Añadir titulares.
- Añadir reacciones vecinales.
- Añadir escenarios encadenados.

### Fase 5: Pulir experiencia

- Añadir filtros.
- Añadir buscador.
- Añadir progreso.
- Añadir resumen final de partida.
- Añadir balance de variables.
- Añadir cierre narrativo según el desempeño del jugador.

---

# Resultado que quiero

Dame una propuesta técnica y narrativa amplia, con ejemplos de código, explicación clara y recomendaciones de diseño. 

El tono debe ser práctico, directo y orientado a implementación. No quiero una explicación genérica. Quiero una guía que pueda servir para rediseñar de verdad la arquitectura del newsgame.

La clave del enfoque es esta:

> El juego debe dejar de ser una colección de tarjetas sueltas y convertirse en un sistema narrativo modular, donde cada decisión tenga impacto mecánico, consecuencia periodística y continuidad en la historia.
