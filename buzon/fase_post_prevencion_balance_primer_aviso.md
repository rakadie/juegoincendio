# Fase posterior a la prevención — Balance preventivo y primer aviso de incendio

## 1. Estructura general

Una vez completadas las tres pantallas preventivas, no conviene saltar directamente a la crisis sin mostrar consecuencias.

La secuencia recomendada es:

```txt
Pantalla 1 — Viviendas y edificios en interfaz
Pantalla 2 — Fincas, vegetación y gestión del combustible
Pantalla 3 — Comunidad preparada
        ↓
Balance preventivo
        ↓
s-040 Primer aviso de incendio
```

La idea es que la jugadora entienda que sus decisiones anteriores no han sido decorativas. Lo que preparó —o dejó sin preparar— empieza a pesar cuando aparece el humo.

---

## 2. Pantalla puente — Balance preventivo

### Título

**Balance preventivo del municipio**

### Frase de entrada

**Lo que se hizo antes del fuego empieza a contar ahora.**

### Contexto

Tras las visitas municipales, tienes una fotografía bastante clara del estado del territorio: viviendas más o menos defendibles, fincas con mayor o menor continuidad vegetal, caminos rurales mejor o peor preparados y una comunidad con distinto nivel de información.

La época de mayor riesgo se acerca. No existe el riesgo cero, pero las decisiones tomadas durante la fase preventiva pueden cambiar el margen de maniobra si se declara un incendio.

### Objetivo

Revisar el nivel de preparación alcanzado antes de entrar en la fase de emergencia.

---

## 3. Indicadores recomendados

No conviene mostrar demasiadas variables. Cinco indicadores son suficientes:

```txt
1. Defensibilidad de viviendas
2. Gestión del combustible
3. Preparación comunitaria
4. Claridad informativa
5. Riesgo de ignición
```

Estos indicadores pueden aparecer como barras, tarjetas o etiquetas de diagnóstico.

---

## 4. Resultados posibles del balance

### Resultado alto — Municipio preparado

Las actuaciones preventivas han reducido vulnerabilidades importantes. Varias viviendas tienen mejores condiciones de defensa, parte del combustible en fincas y caminos se ha gestionado, y la población cuenta con instrucciones más claras.

El municipio no es invulnerable. Ninguno lo es. Pero si el fuego aparece, no encontrará todas las puertas abiertas.

```js
crisisImpact: {
  danosViviendas: -3,
  confusionPublica: -3,
  riesgoPropagacion: -2,
  seguridadEquipos: 2,
  poblacionProtegida: 2
}
```

### Resultado medio — Preparación desigual

La prevención ha mejorado algunos puntos, pero quedan debilidades: viviendas con elementos vulnerables, fincas con combustible acumulado, dudas vecinales o canales de información que no todo el mundo conoce.

El municipio llega mejor que antes, pero no de forma homogénea. Y el fuego suele tener buen ojo para encontrar lo pendiente.

```js
crisisImpact: {
  confusionPublica: 1,
  riesgoPropagacion: 1,
  danosViviendas: 1
}
```

### Resultado bajo — Territorio vulnerable

Las medidas preventivas han sido insuficientes o demasiado parciales. Persisten combustible junto a viviendas, caminos complicados, dudas sobre evacuación y confinamiento, y actividades de riesgo poco controladas.

El incendio todavía no ha empezado, pero ya tiene ventaja. No es dramatismo: es combustible esperando una mala tarde.

```js
crisisImpact: {
  danosViviendas: 4,
  confusionPublica: 4,
  riesgoPropagacion: 4,
  riesgoAtrapamiento: 2,
  seguridadEquipos: -1
}
```

---

## 5. Código — Balance preventivo

```js
export const balancePrevencion = {
  id: 'balance-prevencion',
  title: 'Balance preventivo del municipio',
  phase: 'prevencion',
  type: 'summary',
  intro:
    'Lo que se hizo antes del fuego empieza a contar ahora.',
  context:
    'Tras las visitas municipales, tienes una fotografía bastante clara del estado del territorio: viviendas más o menos defendibles, fincas con mayor o menor continuidad vegetal, caminos rurales mejor o peor preparados y una comunidad con distinto nivel de información. La época de mayor riesgo se acerca. No existe el riesgo cero, pero las decisiones tomadas durante la fase preventiva pueden cambiar el margen de maniobra si se declara un incendio.',
  objective:
    'Revisar el nivel de preparación alcanzado antes de entrar en la fase de emergencia.',
  indicators: [
    {
      id: 'defensibilidad-viviendas',
      label: 'Defensibilidad de viviendas',
      variables: [
        'defensibilidadViviendas',
        'riesgoPavesas',
        'danosViviendas'
      ]
    },
    {
      id: 'gestion-combustible',
      label: 'Gestión del combustible',
      variables: [
        'continuidadCombustible',
        'riesgoPropagacion',
        'riesgoIgnicion'
      ]
    },
    {
      id: 'preparacion-comunitaria',
      label: 'Preparación comunitaria',
      variables: [
        'preparacionFamiliar',
        'poblacionProtegida',
        'inclusionVulnerables'
      ]
    },
    {
      id: 'claridad-informativa',
      label: 'Claridad informativa',
      variables: [
        'confusionPublica',
        'saturacion112',
        'confianzaVecinal'
      ]
    },
    {
      id: 'riesgo-ignicion',
      label: 'Riesgo de ignición',
      variables: [
        'riesgoIgnicion',
        'cumplimientoPreventivo'
      ]
    }
  ],
  outcomes: [
    {
      id: 'municipio-preparado',
      title: 'Municipio preparado',
      condition: {
        cumplimientoPreventivo: '>=14',
        confusionPublica: '<=0',
        continuidadCombustible: '<=0'
      },
      text:
        'Las actuaciones preventivas han reducido vulnerabilidades importantes. Varias viviendas tienen mejores condiciones de defensa, parte del combustible en fincas y caminos se ha gestionado, y la población cuenta con instrucciones más claras. El municipio no es invulnerable. Ninguno lo es. Pero si el fuego aparece, no encontrará todas las puertas abiertas.',
      crisisImpact: {
        danosViviendas: -3,
        confusionPublica: -3,
        riesgoPropagacion: -2,
        seguridadEquipos: 2,
        poblacionProtegida: 2
      }
    },
    {
      id: 'preparacion-desigual',
      title: 'Preparación desigual',
      condition: {
        cumplimientoPreventivo: '>=6'
      },
      text:
        'La prevención ha mejorado algunos puntos, pero quedan debilidades: viviendas con elementos vulnerables, fincas con combustible acumulado, dudas vecinales o canales de información que no todo el mundo conoce. El municipio llega mejor que antes, pero no de forma homogénea. Y el fuego suele tener buen ojo para encontrar lo pendiente.',
      crisisImpact: {
        confusionPublica: 1,
        riesgoPropagacion: 1,
        danosViviendas: 1
      }
    },
    {
      id: 'territorio-vulnerable',
      title: 'Territorio vulnerable',
      condition: {
        cumplimientoPreventivo: '<6'
      },
      text:
        'Las medidas preventivas han sido insuficientes o demasiado parciales. Persisten combustible junto a viviendas, caminos complicados, dudas sobre evacuación y confinamiento, y actividades de riesgo poco controladas. El incendio todavía no ha empezado, pero ya tiene ventaja. No es dramatismo: es combustible esperando una mala tarde.',
      crisisImpact: {
        danosViviendas: 4,
        confusionPublica: 4,
        riesgoPropagacion: 4,
        riesgoAtrapamiento: 2,
        seguridadEquipos: -1
      }
    }
  ],
  nextScreen: 's-040-primer-aviso-incendio'
};
```

---

# 6. Siguiente escena — Primer aviso de incendio

## Título

**Primer aviso de incendio**

## Frase de entrada

**Lo que hasta ahora era prevención acaba de convertirse en emergencia.**

## Contexto

Son las 13:42. El 112 recibe varias llamadas casi al mismo tiempo. Una columna de humo se levanta en una zona de monte próxima a fincas y viviendas dispersas.

Todavía no está claro el alcance del incendio. Algunos avisos hablan de humo junto a un camino rural. Otros mencionan una posible quema de restos vegetales que se ha descontrolado. También hay quien dice haber visto llamas cerca de una pista forestal.

El viento sopla con rachas irregulares, la humedad es baja y la temperatura ha subido durante la mañana.

Hay que actuar con rapidez, pero sin convertir la incertidumbre en caos.

## Pregunta

**¿Cómo organizas la primera respuesta ante el inicio del incendio?**

## Briefing

El incendio acaba de declararse y la información todavía es incompleta. En esta fase puede haber margen para contenerlo, pero los primeros minutos son decisivos.

La prioridad es confirmar la localización, movilizar medios de primera intervención, evaluar accesos, viento y combustible disponible, activar una comunicación pública inicial y avisar preventivamente a los municipios próximos sin ordenar medidas masivas que todavía no están justificadas.

Responder bien no garantiza que el fuego se apague. El viento, la pendiente y la vegetación seca también juegan. Pero una buena primera respuesta puede ganar tiempo, reducir confusión y evitar que la emergencia empiece con desorden.

---

## 7. Opciones del primer aviso

### Opción A — Válida

Activar de inmediato medios de primera intervención, confirmar la localización exacta, evaluar accesos, viento y combustible disponible, y mantener informados a los municipios cercanos sin ordenar medidas masivas todavía.

**Feedback:** Respuesta adecuada. En un incendio forestal, la primera respuesta debe ser rápida, pero no ciega. Confirmar localización, accesos y condiciones permite ganar tiempo sin generar caos.

**Transición:** La primera respuesta se activa con rapidez. Los medios llegan antes al foco y se ordenan los accesos. Aun así, el viento empuja las llamas hacia una zona de monte con continuidad vegetal. El incendio no queda contenido y entra en fase de seguimiento crítico.

### Opción B — No válida

Esperar a tener confirmación completa sobre el tamaño del incendio antes de movilizar recursos, para evitar una activación innecesaria.

**Feedback:** Respuesta incorrecta. En incendios forestales, esperar puede convertir un conato en un problema serio. La confirmación es importante, pero la primera respuesta debe activarse con rapidez.

**Transición:** La espera retrasa la llegada de medios. Cuando se confirma el alcance real, el fuego ya ha ganado intensidad y obliga a movilizar más recursos en peores condiciones.

### Opción C — Válida

Abrir una comunicación pública inicial breve y prudente: informar de que se está verificando un incendio, pedir que se evite la zona, recordar canales oficiales y anunciar actualizaciones frecuentes.

**Feedback:** Respuesta adecuada. Comunicar pronto no significa alarmar. Significa ocupar el espacio informativo antes de que lo ocupen rumores, vídeos borrosos y el primo de alguien diciendo “me han dicho que evacúan todo”.

**Transición:** La comunicación inicial reduce rumores y evita desplazamientos innecesarios. Aun así, la columna de humo se hace visible desde varios municipios y empiezan a llegar llamadas, imágenes y mensajes contradictorios.

### Opción D — No válida

Ordenar la evacuación inmediata de todos los núcleos cercanos al humo para evitar riesgos posteriores.

**Feedback:** Respuesta incorrecta. Una evacuación masiva sin información suficiente puede saturar vías, generar alarma y desorganizar la respuesta inicial. Anticiparse no es disparar todas las alarmas a la vez.

**Transición:** La orden genera alarma y movimientos desordenados antes de confirmar qué zonas están realmente amenazadas. Varias carreteras empiezan a cargarse de tráfico y los equipos pierden margen de maniobra.

### Opción E — No válida

Centrar todos los recursos en informar por redes sociales y esperar a que los equipos sobre el terreno confirmen si realmente hace falta intervenir.

**Feedback:** Respuesta incorrecta. La comunicación es esencial, pero no sustituye la respuesta operativa. Primero se moviliza y verifica; después se comunica con datos cada vez más sólidos.

**Transición:** La información circula, pero la respuesta operativa llega tarde. El fuego no espera a que el hilo esté bien redactado.

---

## 8. Código — s-040 Primer aviso de incendio

```js
export const primerAvisoIncendio = {
  id: 's-040-primer-aviso-incendio',
  title: 'Primer aviso de incendio',
  category: 'operaciones',
  phase: 'inicio-crisis',
  block: 'respuesta-inicial',
  difficulty: 'media',
  estimatedTime: '2 min',
  tags: [
    'inicio-incendio',
    'primera-respuesta',
    '112',
    'movilizacion',
    'comunicacion-inicial',
    'viento',
    'accesos',
    'monte',
    'fincas'
  ],
  status: 'available',
  intro:
    'Lo que hasta ahora era prevención acaba de convertirse en emergencia.',
  context:
    'Son las 13:42. El 112 recibe varias llamadas casi al mismo tiempo. Una columna de humo se levanta en una zona de monte próxima a fincas y viviendas dispersas. Todavía no está claro el alcance del incendio. Algunos avisos hablan de humo junto a un camino rural. Otros mencionan una posible quema de restos vegetales que se ha descontrolado. También hay quien dice haber visto llamas cerca de una pista forestal. El viento sopla con rachas irregulares, la humedad es baja y la temperatura ha subido durante la mañana. Hay que actuar con rapidez, pero sin convertir la incertidumbre en caos.',
  question:
    '¿Cómo organizas la primera respuesta ante el inicio del incendio?',
  briefing:
    'El incendio acaba de declararse y la información todavía es incompleta. En esta fase puede haber margen para contenerlo, pero los primeros minutos son decisivos. La prioridad es confirmar la localización, movilizar medios de primera intervención, evaluar accesos, viento y combustible disponible, activar una comunicación pública inicial y avisar preventivamente a los municipios próximos sin ordenar medidas masivas que todavía no están justificadas. Responder bien no garantiza que el fuego se apague. El viento, la pendiente y la vegetación seca también juegan. Pero una buena primera respuesta puede ganar tiempo, reducir confusión y evitar que la emergencia empiece con desorden.',
  requirements: null,
  options: [
    {
      id: 'a',
      text:
        'Activar de inmediato medios de primera intervención, confirmar la localización exacta, evaluar accesos, viento y combustible disponible, y mantener informados a los municipios cercanos sin ordenar medidas masivas todavía.',
      isCorrect: true,
      impact: {
        controlIncendio: 4,
        coordinacionOperativa: 4,
        seguridadEquipos: 3,
        confusionPublica: -2,
        recursosDisponibles: -1
      },
      feedback:
        'Respuesta adecuada. En un incendio forestal, la primera respuesta debe ser rápida, pero no ciega. Confirmar localización, accesos y condiciones permite ganar tiempo sin generar caos.',
      transition:
        'La primera respuesta se activa con rapidez. Los medios llegan antes al foco y se ordenan los accesos. Aun así, el viento empuja las llamas hacia una zona de monte con continuidad vegetal. El incendio no queda contenido y entra en fase de seguimiento crítico.'
    },
    {
      id: 'b',
      text:
        'Esperar a tener confirmación completa sobre el tamaño del incendio antes de movilizar recursos, para evitar una activación innecesaria.',
      isCorrect: false,
      impact: {
        controlIncendio: -4,
        coordinacionOperativa: -3,
        riesgoPropagacion: 4,
        confusionPublica: 2
      },
      feedback:
        'Respuesta incorrecta. En incendios forestales, esperar puede convertir un conato en un problema serio. La confirmación es importante, pero la primera respuesta debe activarse con rapidez.',
      transition:
        'La espera retrasa la llegada de medios. Cuando se confirma el alcance real, el fuego ya ha ganado intensidad y obliga a movilizar más recursos en peores condiciones.'
    },
    {
      id: 'c',
      text:
        'Abrir una comunicación pública inicial breve y prudente: informar de que se está verificando un incendio, pedir que se evite la zona, recordar canales oficiales y anunciar actualizaciones frecuentes.',
      isCorrect: true,
      impact: {
        confianzaPublica: 4,
        confusionPublica: -4,
        saturacion112: -3,
        coordinacionOperativa: 2
      },
      feedback:
        'Respuesta adecuada. Comunicar pronto no significa alarmar. Significa ocupar el espacio informativo antes de que lo ocupen rumores, vídeos borrosos y el primo de alguien diciendo “me han dicho que evacúan todo”.',
      transition:
        'La comunicación inicial reduce rumores y evita desplazamientos innecesarios. Aun así, la columna de humo se hace visible desde varios municipios y empiezan a llegar llamadas, imágenes y mensajes contradictorios.'
    },
    {
      id: 'd',
      text:
        'Ordenar la evacuación inmediata de todos los núcleos cercanos al humo para evitar riesgos posteriores.',
      isCorrect: false,
      impact: {
        confusionPublica: 5,
        riesgoAtrapamiento: 3,
        coordinacionOperativa: -4,
        saturacionRecursos: 4,
        confianzaPublica: -2
      },
      feedback:
        'Respuesta incorrecta. Una evacuación masiva sin información suficiente puede saturar vías, generar alarma y desorganizar la respuesta inicial. Anticiparse no es disparar todas las alarmas a la vez.',
      transition:
        'La orden genera alarma y movimientos desordenados antes de confirmar qué zonas están realmente amenazadas. Varias carreteras empiezan a cargarse de tráfico y los equipos pierden margen de maniobra.'
    },
    {
      id: 'e',
      text:
        'Centrar todos los recursos en informar por redes sociales y esperar a que los equipos sobre el terreno confirmen si realmente hace falta intervenir.',
      isCorrect: false,
      impact: {
        controlIncendio: -4,
        coordinacionOperativa: -3,
        confianzaPublica: 1,
        riesgoPropagacion: 4
      },
      feedback:
        'Respuesta incorrecta. La comunicación es esencial, pero no sustituye la respuesta operativa. Primero se moviliza y verifica; después se comunica con datos cada vez más sólidos.',
      transition:
        'La información circula, pero la respuesta operativa llega tarde. El fuego no espera a que el hilo esté bien redactado.'
    }
  ],
  unlocks: [
    's-018-colapso-llamadas-112',
    's-011-corte-carretera-acceso',
    's-033-senderistas-desorientados-humo',
    's-010-cambio-viento-evacuacion'
  ],
  nextLogic: [
    {
      id: 'ruta-comunicacion',
      condition: {
        confusionPublica: '>=5'
      },
      nextScenario: 's-018-colapso-llamadas-112',
      transition:
        'El humo ya es visible desde varios municipios y la información empieza a desordenarse. La siguiente prioridad es evitar que el 112 se convierta en una centralita de rumores.'
    },
    {
      id: 'ruta-territorio-accesos',
      condition: {
        riesgoPropagacion: '>=5'
      },
      nextScenario: 's-011-corte-carretera-acceso',
      transition:
        'El fuego avanza por zonas con continuidad vegetal y accesos complicados. La siguiente decisión afecta a carreteras, caminos rurales y entrada de medios.'
    },
    {
      id: 'ruta-senderistas',
      condition: {
        turistasSenderistasSinInformacion: true
      },
      nextScenario: 's-033-senderistas-desorientados-humo',
      transition:
        'La zona recreativa próxima al monte no estaba suficientemente señalizada. Un grupo de senderistas puede quedar en el área de humo.'
    },
    {
      id: 'ruta-base',
      condition: 'default',
      nextScenario: 's-010-cambio-viento-evacuacion',
      transition:
        'Aunque la respuesta inicial contiene parte del riesgo, el viento cambia de dirección y empuja el frente hacia una zona habitada.'
    }
  ],
  sourceNotes: [
    'La primera respuesta ante un incendio forestal debe combinar rapidez operativa, verificación de información, evaluación de accesos y comunicación pública prudente.',
    'Una buena decisión inicial no garantiza la extinción inmediata, pero puede ganar tiempo, reducir confusión y mejorar la coordinación.',
    'Las órdenes masivas sin información suficiente pueden generar saturación de vías, alarma pública y pérdida de margen operativo.'
  ]
};
```

---

## 9. Crítica constructiva

Este bloque es importante porque cambia el ritmo del juego. Hasta aquí, la jugadora ha preparado. A partir de aquí, debe reaccionar.

La escena no debe transmitir:

> Has acertado, así que el incendio se apaga.

Debe transmitir:

> Has ganado margen, pero el fuego sigue jugando.

Esa lógica es mucho más realista y más interesante.

## 10. Frase clave de diseño

> No decides si hay incendio. Decides con cuánto caos llega la siguiente escena.
