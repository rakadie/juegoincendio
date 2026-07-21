# Rediseño jugable — s-018 Colapso de llamadas al 112

## 1. Decisión de diseño

Para mantener la coherencia con las pantallas preventivas, esta escena **no debe funcionar como un cuestionario clásico**.

No queremos:

```txt
Pregunta → Opción A / B / C / D / E → Correcto o incorrecto
```

Queremos:

```txt
Situación de crisis → indicadores de presión → acciones limitadas → impactos acumulados → consecuencia narrativa
```

Es decir: la jugadora no responde a un examen. **Gestiona una crisis con recursos y tiempo limitados**.

---

## 2. Por qué cambiar el enfoque

El formato de cuestionario puede ser útil para ordenar contenido, pero en este juego sería menos interesante por tres razones:

1. Reduce la tensión a “acertar o fallar”.
2. No aprovecha el sistema de variables que ya hemos creado.
3. Rompe la continuidad con las pantallas preventivas, donde la jugadora elige actuaciones con peso.

La crisis debe sentirse diferente a la prevención, pero no cambiar de género.

## Fórmula recomendada

```txt
Prevención = inspección y planificación
Crisis = presión y priorización
```

En prevención:

```txt
Elige 4 actuaciones de 7
```

En crisis:

```txt
Elige 2 actuaciones inmediatas de 6
```

La reducción de acciones disponibles transmite urgencia: hay menos tiempo, menos margen y más presión.

---

## 3. Escena rediseñada

## Título

**Colapso de llamadas al 112**

## Tipo

```js
type: 'action-selection'
```

## Máximo de acciones

```js
maxActions: 2
```

## Frase de entrada

**El humo ya se ve desde varios municipios. El miedo empieza a llamar por teléfono.**

## Contexto narrativo

El humo ya se ve desde varios municipios. En pocos minutos, el 112 empieza a recibir una avalancha de llamadas.

Algunas son emergencias reales: personas que ven llamas cerca de una finca, humo entrando en viviendas o vecinos con movilidad reducida que preguntan si deben prepararse para salir.

Pero muchas otras llamadas son dudas generales: si se debe evacuar, si una carretera está cortada, si el humo viene hacia el núcleo urbano o si es verdad un audio que circula por WhatsApp.

La centralita empieza a tensionarse. Si el 112 se satura, las llamadas críticas pueden tardar más en entrar.

## Objetivo

Reducir la saturación del 112 sin dejar a la población desinformada.

---

## 4. Indicadores de presión

La pantalla debe mostrar indicadores visibles, no solo texto.

```js
pressureIndicators: [
  {
    id: 'saturacion112',
    label: 'Saturación del 112',
    level: 'alta'
  },
  {
    id: 'confusionPublica',
    label: 'Confusión pública',
    level: 'subiendo'
  },
  {
    id: 'confianzaInstitucional',
    label: 'Confianza institucional',
    level: 'inestable'
  }
]
```

## Traducción visual

```txt
Saturación del 112: alta
Confusión pública: subiendo
Confianza institucional: inestable
```

Estos indicadores hacen que la jugadora entienda rápidamente qué está en juego.

---

## 5. Acciones disponibles

La jugadora solo puede elegir **2 actuaciones inmediatas**.

```txt
Actuaciones disponibles: 2
```

---

# Acción 1 — Emitir mensaje oficial breve y claro

## Descripción

Publicar un primer mensaje oficial con información confirmada: zona aproximada afectada, recomendaciones básicas, canales de actualización y recordatorio de que el 112 debe reservarse para emergencias reales.

## Impacto

```js
impact: {
  saturacion112: -3,
  confusionPublica: -3,
  confianzaInstitucional: 2
}
```

## Feedback

> La población recibe una primera referencia fiable. No resuelve todo, pero reduce llamadas de duda y corta parte del ruido inicial.

## Bandera

```js
flagsOnApply: ['mensajeOficialBreveEmitido']
```

---

# Acción 2 — Abrir canal de información no urgente

## Descripción

Habilitar o reforzar canales de información no urgente: web municipal, redes institucionales, línea informativa si existe, mensajes de ayuntamiento y avisos coordinados con medios.

## Impacto

```js
impact: {
  saturacion112: -4,
  coordinacionOperativa: 2,
  confusionPublica: -2
}
```

## Feedback

> Las dudas generales empiezan a desviarse fuera del 112. Las llamadas críticas tienen más opciones de entrar.

## Bandera

```js
flagsOnApply: ['canalInformacionNoUrgenteActivado']
```

---

# Acción 3 — Programar actualizaciones periódicas con medios y ayuntamientos

## Descripción

Convocar actualizaciones periódicas para medios de comunicación y ayuntamientos afectados, con mensajes breves, horarios claros y datos confirmados.

## Impacto

```js
impact: {
  confianzaInstitucional: 4,
  confusionPublica: -3,
  saturacion112: -2,
  coordinacionOperativa: 3
}
```

## Feedback

> Los medios y ayuntamientos ayudan a amplificar información útil. La comunicación deja de ir a golpes.

## Bandera

```js
flagsOnApply: ['actualizacionesPeriodicasActivadas']
```

---

# Acción 4 — Coordinar un mensaje único con los ayuntamientos afectados

## Descripción

Acordar un mensaje único con ayuntamientos, Protección Civil y comunicación institucional para evitar contradicciones sobre zonas afectadas, carreteras, evacuaciones y canales oficiales.

## Impacto

```js
impact: {
  confusionPublica: -4,
  confianzaInstitucional: 3,
  coordinacionOperativa: 4
}
```

## Feedback

> Se reducen contradicciones entre instituciones. La población recibe una instrucción más coherente.

## Bandera

```js
flagsOnApply: ['mensajeUnicoAyuntamientosCoordinado']
```

---

# Acción 5 — Responder caso por caso en redes sociales

## Descripción

Destinar el equipo de comunicación a responder manualmente preguntas en redes sociales y comentarios individuales.

## Impacto

```js
impact: {
  confusionPublica: 2,
  saturacion112: 1,
  coordinacionOperativa: -2
}
```

## Feedback

> Contestar uno a uno consume tiempo y no ordena la información general. La emergencia necesita un canal claro, no una conversación infinita.

## Bandera

```js
flagsOnApply: ['respuestaCasoPorCasoRedes']
```

## Nota de diseño

Esta acción no tiene que parecer absurda. De hecho, puede sonar razonable. Pero en una crisis de alto volumen es débil porque no escala.

---

# Acción 6 — Esperar a tener todos los datos antes de comunicar

## Descripción

Retrasar la comunicación pública hasta tener confirmación completa sobre perímetro, carreteras, riesgo para viviendas y evolución prevista.

## Impacto

```js
impact: {
  confusionPublica: 5,
  saturacion112: 4,
  confianzaInstitucional: -3
}
```

## Feedback

> El silencio deja hueco a rumores. Comunicar lo confirmado y actualizar después es más seguro que esperar a tener el puzzle perfecto.

## Bandera

```js
flagsOnApply: ['comunicacionRetrasada']
```

---

## 6. Combos o sinergias

Los combos premian combinaciones coherentes de acciones.

## Combo 1 — Información pública ordenada

### Requiere

```js
[
  'mensajeOficialBreveEmitido',
  'canalInformacionNoUrgenteActivado'
]
```

### Texto

> La población recibe una referencia inicial y un lugar alternativo para resolver dudas. El 112 empieza a recuperar margen para llamadas críticas.

### Bonus

```js
bonusImpact: {
  saturacion112: -2,
  confusionPublica: -1
}
```

---

## Combo 2 — Comunicación coordinada

### Requiere

```js
[
  'actualizacionesPeriodicasActivadas',
  'mensajeUnicoAyuntamientosCoordinado'
]
```

### Texto

> Medios y ayuntamientos replican una misma línea informativa. La emergencia habla con menos voces, pero más claridad.

### Bonus

```js
bonusImpact: {
  confianzaInstitucional: 2,
  confusionPublica: -2,
  coordinacionOperativa: 1
}
```

---

## Combo 3 — Mala combinación: silencio fragmentado

### Requiere

```js
[
  'respuestaCasoPorCasoRedes',
  'comunicacionRetrasada'
]
```

### Texto

> La información oficial llega tarde y dispersa. Los grupos de mensajería llenan el vacío con versiones contradictorias.

### Penalización

```js
bonusImpact: {
  confusionPublica: 3,
  saturacion112: 2,
  confianzaInstitucional: -2
}
```

---

## 7. Resultados posibles

## Resultado alto — 112 descongestionado parcialmente

### Condición sugerida

```js
condition: {
  saturacion112: '<=0',
  confusionPublica: '<=2'
}
```

### Texto

> La comunicación oficial reduce parte de las llamadas innecesarias. La población empieza a consultar canales alternativos y el 112 recupera margen para atender emergencias reales. El incendio sigue avanzando, pero el ruido informativo baja varios decibelios.

### Impacto hacia la siguiente escena

```js
crisisImpact: {
  confianzaInstitucional: 2,
  confusionPublica: -2
}
```

---

## Resultado medio — Saturación contenida, rumores activos

### Condición sugerida

```js
condition: {
  saturacion112: '<=4'
}
```

### Texto

> La situación mejora, pero no queda resuelta. Parte de la población encuentra información fiable, aunque siguen circulando dudas y mensajes no verificados. El 112 continúa tensionado.

### Impacto hacia la siguiente escena

```js
crisisImpact: {
  confusionPublica: 1
}
```

---

## Resultado bajo — Caos informativo

### Condición sugerida

```js
condition: {
  saturacion112: '>4'
}
```

### Texto

> Las llamadas se acumulan, los canales oficiales llegan tarde o no se entienden y los rumores empiezan a circular más rápido que las aclaraciones. La siguiente desinformación encontrará la puerta abierta.

### Impacto hacia la siguiente escena

```js
crisisImpact: {
  confusionPublica: 3,
  confianzaInstitucional: -2,
  saturacion112: 2
}
```

---

## 8. Transición hacia la siguiente escena

Esta escena debe llevar a:

```txt
s-023 — Una imagen antigua se hace viral
```

Pero con tono variable.

### Si el resultado fue bueno

> Aunque la comunicación oficial ha reducido la saturación del 112, una imagen antigua empieza a circular como si fuera actual. La diferencia es que ahora hay canales activos para desmentirla rápido.

### Si el resultado fue malo

> La comunicación llega tarde y la confusión gana terreno. Una imagen antigua empieza a circular como si mostrara el avance actual del incendio. Cae sobre un terreno perfecto para el pánico.

---

## 9. Código completo propuesto

```js
export const colapsoLlamadas112 = {
  id: 's-018-colapso-llamadas-112',
  title: 'Colapso de llamadas al 112',
  category: 'comunicacion',
  phase: 'crisis',
  block: 'comunicacion-crisis',
  type: 'action-selection',
  difficulty: 'media',
  estimatedTime: '2 min',
  maxActions: 2,
  tags: [
    '112',
    'comunicacion',
    'crisis',
    'rumores',
    'informacion-publica',
    'medios-comunicacion',
    'canales-oficiales',
    'saturacion'
  ],
  status: 'available',
  intro:
    'El humo ya se ve desde varios municipios. El miedo empieza a llamar por teléfono.',
  context:
    'El humo ya se ve desde varios municipios. En pocos minutos, el 112 empieza a recibir una avalancha de llamadas. Algunas son emergencias reales: personas que ven llamas cerca de una finca, humo entrando en viviendas o vecinos con movilidad reducida que preguntan si deben prepararse para salir. Pero muchas otras llamadas son dudas generales: si se debe evacuar, si una carretera está cortada, si el humo viene hacia el núcleo urbano o si es verdad un audio que circula por WhatsApp. La centralita empieza a tensionarse. Si el 112 se satura, las llamadas críticas pueden tardar más en entrar.',
  objective:
    'Reduce la saturación del 112 sin dejar a la población desinformada.',
  pressureIndicators: [
    {
      id: 'saturacion112',
      label: 'Saturación del 112',
      level: 'alta'
    },
    {
      id: 'confusionPublica',
      label: 'Confusión pública',
      level: 'subiendo'
    },
    {
      id: 'confianzaInstitucional',
      label: 'Confianza institucional',
      level: 'inestable'
    }
  ],
  actions: [
    {
      id: 'mensaje-oficial-breve',
      label: 'Emitir mensaje oficial breve y claro',
      description:
        'Publicar un primer mensaje oficial con información confirmada: zona aproximada afectada, recomendaciones básicas, canales de actualización y recordatorio de que el 112 debe reservarse para emergencias reales.',
      impact: {
        saturacion112: -3,
        confusionPublica: -3,
        confianzaInstitucional: 2
      },
      flagsOnApply: ['mensajeOficialBreveEmitido'],
      feedback:
        'La población recibe una primera referencia fiable. No resuelve todo, pero reduce llamadas de duda y corta parte del ruido inicial.'
    },
    {
      id: 'canal-informacion-no-urgente',
      label: 'Abrir canal de información no urgente',
      description:
        'Habilitar o reforzar canales de información no urgente: web municipal, redes institucionales, línea informativa si existe, mensajes de ayuntamiento y avisos coordinados con medios.',
      impact: {
        saturacion112: -4,
        coordinacionOperativa: 2,
        confusionPublica: -2
      },
      flagsOnApply: ['canalInformacionNoUrgenteActivado'],
      feedback:
        'Las dudas generales empiezan a desviarse fuera del 112. Las llamadas críticas tienen más opciones de entrar.'
    },
    {
      id: 'actualizaciones-periodicas-medios',
      label: 'Programar actualizaciones periódicas con medios y ayuntamientos',
      description:
        'Convocar actualizaciones periódicas para medios de comunicación y ayuntamientos afectados, con mensajes breves, horarios claros y datos confirmados.',
      impact: {
        confianzaInstitucional: 4,
        confusionPublica: -3,
        saturacion112: -2,
        coordinacionOperativa: 3
      },
      flagsOnApply: ['actualizacionesPeriodicasActivadas'],
      feedback:
        'Los medios y ayuntamientos ayudan a amplificar información útil. La comunicación deja de ir a golpes.'
    },
    {
      id: 'coordinar-ayuntamientos',
      label: 'Coordinar un mensaje único con los ayuntamientos afectados',
      description:
        'Acordar un mensaje único con ayuntamientos, Protección Civil y comunicación institucional para evitar contradicciones sobre zonas afectadas, carreteras, evacuaciones y canales oficiales.',
      impact: {
        confusionPublica: -4,
        confianzaInstitucional: 3,
        coordinacionOperativa: 4
      },
      flagsOnApply: ['mensajeUnicoAyuntamientosCoordinado'],
      feedback:
        'Se reducen contradicciones entre instituciones. La población recibe una instrucción más coherente.'
    },
    {
      id: 'responder-caso-por-caso-redes',
      label: 'Responder caso por caso en redes sociales',
      description:
        'Destinar el equipo de comunicación a responder manualmente preguntas en redes sociales y comentarios individuales.',
      impact: {
        confusionPublica: 2,
        saturacion112: 1,
        coordinacionOperativa: -2
      },
      flagsOnApply: ['respuestaCasoPorCasoRedes'],
      feedback:
        'Contestar uno a uno consume tiempo y no ordena la información general. La emergencia necesita un canal claro, no una conversación infinita.'
    },
    {
      id: 'esperar-datos-completos',
      label: 'Esperar a tener todos los datos antes de comunicar',
      description:
        'Retrasar la comunicación pública hasta tener confirmación completa sobre perímetro, carreteras, riesgo para viviendas y evolución prevista.',
      impact: {
        confusionPublica: 5,
        saturacion112: 4,
        confianzaInstitucional: -3
      },
      flagsOnApply: ['comunicacionRetrasada'],
      feedback:
        'El silencio deja hueco a rumores. Comunicar lo confirmado y actualizar después es más seguro que esperar a tener el puzzle perfecto.'
    }
  ],
  combos: [
    {
      id: 'informacion-publica-ordenada',
      title: 'Información pública ordenada',
      requires: [
        'mensajeOficialBreveEmitido',
        'canalInformacionNoUrgenteActivado'
      ],
      text:
        'La población recibe una referencia inicial y un lugar alternativo para resolver dudas. El 112 empieza a recuperar margen para llamadas críticas.',
      bonusImpact: {
        saturacion112: -2,
        confusionPublica: -1
      }
    },
    {
      id: 'comunicacion-coordinada',
      title: 'Comunicación coordinada',
      requires: [
        'actualizacionesPeriodicasActivadas',
        'mensajeUnicoAyuntamientosCoordinado'
      ],
      text:
        'Medios y ayuntamientos replican una misma línea informativa. La emergencia habla con menos voces, pero más claridad.',
      bonusImpact: {
        confianzaInstitucional: 2,
        confusionPublica: -2,
        coordinacionOperativa: 1
      }
    },
    {
      id: 'silencio-fragmentado',
      title: 'Silencio fragmentado',
      requires: [
        'respuestaCasoPorCasoRedes',
        'comunicacionRetrasada'
      ],
      text:
        'La información oficial llega tarde y dispersa. Los grupos de mensajería llenan el vacío con versiones contradictorias.',
      bonusImpact: {
        confusionPublica: 3,
        saturacion112: 2,
        confianzaInstitucional: -2
      }
    }
  ],
  outcomes: [
    {
      id: 'alto',
      title: '112 descongestionado parcialmente',
      condition: {
        saturacion112: '<=0',
        confusionPublica: '<=2'
      },
      text:
        'La comunicación oficial reduce parte de las llamadas innecesarias. La población empieza a consultar canales alternativos y el 112 recupera margen para atender emergencias reales. El incendio sigue avanzando, pero el ruido informativo baja varios decibelios.',
      crisisImpact: {
        confianzaInstitucional: 2,
        confusionPublica: -2
      }
    },
    {
      id: 'medio',
      title: 'Saturación contenida, rumores activos',
      condition: {
        saturacion112: '<=4'
      },
      text:
        'La situación mejora, pero no queda resuelta. Parte de la población encuentra información fiable, aunque siguen circulando dudas y mensajes no verificados. El 112 continúa tensionado.',
      crisisImpact: {
        confusionPublica: 1
      }
    },
    {
      id: 'bajo',
      title: 'Caos informativo',
      condition: {
        saturacion112: '>4'
      },
      text:
        'Las llamadas se acumulan, los canales oficiales llegan tarde o no se entienden y los rumores empiezan a circular más rápido que las aclaraciones. La siguiente desinformación encontrará la puerta abierta.',
      crisisImpact: {
        confusionPublica: 3,
        confianzaInstitucional: -2,
        saturacion112: 2
      }
    }
  ],
  nextLogic: [
    {
      id: 'imagen-viral-con-respuesta-ordenada',
      condition: {
        confusionPublica: '<=2',
        confianzaInstitucional: '>=4'
      },
      nextScenario: 's-023-imagen-antigua-viral',
      transition:
        'Aunque la comunicación oficial ha reducido la saturación del 112, una imagen antigua empieza a circular como si fuera actual. La diferencia es que ahora hay canales activos para desmentirla rápido.'
    },
    {
      id: 'imagen-viral-con-caos',
      condition: {
        confusionPublica: '>=6'
      },
      nextScenario: 's-023-imagen-antigua-viral',
      transition:
        'La comunicación llega tarde y la confusión gana terreno. Una imagen antigua empieza a circular como si mostrara el avance actual del incendio. Cae sobre un terreno perfecto para el pánico.'
    },
    {
      id: 'ruta-base-imagen-viral',
      condition: 'default',
      nextScenario: 's-023-imagen-antigua-viral',
      transition:
        'El 112 sigue tensionado y la información se mueve deprisa. Una imagen impactante aparece en redes y amenaza con disparar de nuevo la alarma social.'
    }
  ],
  designNotes: [
    'Esta escena debe ser una pantalla de selección de acciones, no un cuestionario.',
    'La jugadora solo puede elegir dos actuaciones para reforzar la sensación de urgencia.',
    'Las acciones buenas reducen saturación y confusión; las malas o débiles pueden sonar razonables, pero no escalan bien.',
    'La escena debe conectar con s-023: una imagen antigua se hace viral.',
    'Visualmente conviene mostrar centralita, móviles, mapa con humo y panel de indicadores de presión.'
  ]
};
```

---

## 10. Recomendación visual

La pantalla puede dividirse en tres capas:

```txt
[Mapa con humo visible]
[Panel del 112: llamadas entrando]
[Panel de redes: mensajes y audios circulando]
```

En el centro:

```txt
Saturación del 112: alta
Confusión pública: subiendo
Confianza institucional: inestable

Actuaciones disponibles: 2
```

Debajo, tarjetas de acción.

---

## 11. Frase de cierre de diseño

> En esta escena, el fuego está en el monte, pero la propagación también ocurre por teléfono.
