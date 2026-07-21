# Mejora del módulo — La emergencia se abre en tres frentes

## 1. Objetivo de esta mejora

Este documento añade una capa de interfaz al módulo:

```js
m-001-apertura-tres-frentes
```

El objetivo es que la pantalla no sea solo una lógica interna de rutas, sino una escena jugable y visualmente clara.

La idea es que, tras el **Primer aviso de incendio**, el juego muestre un **mapa de crisis** con tres frentes posibles:

```txt
1. Comunicación pública
2. Territorio y accesos
3. Población en riesgo
```

La jugadora no elige manualmente la ruta. El sistema activa una de ellas según el estado acumulado del juego.

---

## 2. Crítica constructiva

El planteamiento anterior ya tenía buena lógica:

```js
type: 'route-selector',
visualMode: 'crisis-map',
routeLogic: [...]
```

Eso funciona como estructura interna.

Pero faltaba una parte importante: **qué ve la jugadora cuando una ruta se activa**.

Si el juego solo calcula el siguiente escenario y salta, se pierde una oportunidad narrativa y visual.

La mejora consiste en añadir a cada ruta un bloque:

```js
uiState: {
  headline: '',
  body: '',
  buttonLabel: ''
}
```

Así la pantalla puede mostrar:

- qué frente se ha complicado;
- por qué se activa esa ruta;
- qué botón aparece para continuar;
- qué zona del mapa debe iluminarse.

Esto convierte la lógica en experiencia.

---

## 3. Cómo debería verse en pantalla

La pantalla muestra un mapa del municipio con humo al fondo.

Hay tres zonas visuales:

```txt
A. Comunicación pública
B. Territorio y accesos
C. Población en riesgo
```

Una de ellas se ilumina según el estado del juego.

Ejemplo si se activa comunicación:

```txt
Frente crítico: comunicación pública

El humo se ve desde varios municipios. El 112 empieza a recibir llamadas de dudas generales y los primeros mensajes contradictorios circulan por redes.

[Gestionar llamadas y mensajes]
```

Ejemplo si se activa territorio:

```txt
Frente crítico: accesos rurales

El fuego avanza por una zona rural donde los caminos son estrechos y algunos márgenes siguen cargados de vegetación.

[Ordenar accesos y vías de emergencia]
```

Ejemplo si se activa población:

```txt
Frente crítico: población expuesta

Aunque el frente todavía no ha entrado en el núcleo, los primeros cambios de viento empiezan a preocupar.

[Preparar instrucciones a la población]
```

---

## 4. Módulo completo mejorado

```js
export const aperturaTresFrentes = {
  id: 'm-001-apertura-tres-frentes',
  title: 'La emergencia se abre en tres frentes',
  phase: 'inicio-crisis',
  type: 'route-selector',
  intro:
    'El fuego avanza. Pero el primer problema no siempre son las llamas.',
  context:
    'La primera respuesta ya está en marcha. Los medios se dirigen al foco, el humo empieza a verse desde varios municipios y las primeras imágenes circulan por redes. Aún no hay una amenaza directa sobre todas las viviendas, pero la emergencia ya se está abriendo en varios frentes: llamadas al 112, accesos rurales, personas en zonas recreativas, rumores y vecinos que empiezan a preguntar si deben salir.',
  objective:
    'Identificar qué frente se complica primero y responder antes de que el incendio gane más margen.',
  visualMode: 'crisis-map',

  mapZones: [
    {
      id: 'zona-comunicacion',
      title: 'Comunicación pública',
      icon: 'phone-alert',
      colorHint: 'alert-blue-red',
      visualCue:
        'Telefonía, redes sociales, radio local, ayuntamiento y burbujas de mensajes.',
      description:
        'El humo se ve desde varios municipios. Aumentan las llamadas, los audios reenviados y las dudas.',
      linkedScenarios: [
        's-018-colapso-llamadas-112',
        's-023-imagen-antigua-viral',
        's-016-rumor-evacuacion-noroeste'
      ]
    },
    {
      id: 'zona-territorio-accesos',
      title: 'Territorio y accesos',
      icon: 'road-fire',
      colorHint: 'earth-orange',
      visualCue:
        'Caminos rurales, fincas, márgenes con vegetación, vehículos de emergencia y humo al fondo.',
      description:
        'El fuego avanza por una zona rural con caminos estrechos y vegetación continua.',
      linkedScenarios: [
        's-011-corte-carretera-acceso',
        's-033-senderistas-desorientados-humo',
        's-027-fuego-en-barranco'
      ]
    },
    {
      id: 'zona-poblacion-riesgo',
      title: 'Población en riesgo',
      icon: 'home-warning',
      colorHint: 'amber-warning',
      visualCue:
        'Viviendas dispersas, familias, mascotas, centro social y posible punto de encuentro.',
      description:
        'La población empieza a pedir instrucciones. Algunas personas podrían necesitar apoyo si hay evacuación.',
      linkedScenarios: [
        's-010-cambio-viento-evacuacion',
        's-034-vecinos-sin-medios-para-salir',
        's-022-evacuacion-con-mascotas',
        's-031-confinamiento-extremo-fuego-copas'
      ]
    }
  ],

  routeLogic: [
    {
      id: 'ruta-comunicacion',
      priority: 1,
      condition: {
        any: [
          { variable: 'confusionPublica', operator: '>=', value: 5 },
          { variable: 'saturacion112', operator: '>=', value: 4 }
        ]
      },
      highlightedZone: 'zona-comunicacion',
      nextScenario: 's-018-colapso-llamadas-112',
      uiState: {
        headline: 'Frente crítico: comunicación pública',
        body:
          'El humo se ve desde varios municipios. El 112 empieza a recibir llamadas de dudas generales y los primeros mensajes contradictorios circulan por redes.',
        buttonLabel: 'Gestionar llamadas y mensajes'
      },
      transition:
        'El humo ya es visible desde varios municipios. En pocos minutos, el 112 empieza a recibir llamadas de personas que no están en peligro inmediato pero quieren saber si deben evacuar. La emergencia también se libra por los canales de información.'
    },
    {
      id: 'ruta-territorio-accesos',
      priority: 2,
      condition: {
        any: [
          { variable: 'riesgoPropagacion', operator: '>=', value: 5 },
          { variable: 'accesosDespejados', operator: '<=', value: -2 }
        ]
      },
      highlightedZone: 'zona-territorio-accesos',
      nextScenario: 's-011-corte-carretera-acceso',
      uiState: {
        headline: 'Frente crítico: accesos rurales',
        body:
          'El fuego avanza por una zona rural donde los caminos son estrechos y algunos márgenes siguen cargados de vegetación. La llegada de medios y la salida de personas pueden depender de una decisión rápida sobre accesos.',
        buttonLabel: 'Ordenar accesos y vías de emergencia'
      },
      transition:
        'El fuego avanza por una zona rural donde los caminos son estrechos y algunos márgenes siguen cargados de vegetación. La llegada de medios y la salida de personas pueden depender de una decisión rápida sobre accesos.'
    },
    {
      id: 'ruta-senderistas',
      priority: 3,
      condition: {
        flag: 'turistasSenderistasSinInformacion'
      },
      highlightedZone: 'zona-territorio-accesos',
      nextScenario: 's-033-senderistas-desorientados-humo',
      uiState: {
        headline: 'Frente crítico: senderistas en zona de humo',
        body:
          'La zona recreativa próxima al monte no estaba suficientemente señalizada. Un grupo de senderistas avisa de que el humo empieza a cubrir el sendero y no sabe qué ruta seguir.',
        buttonLabel: 'Localizar al grupo'
      },
      transition:
        'La zona recreativa próxima al monte no estaba suficientemente señalizada. Un grupo de senderistas avisa de que el humo empieza a cubrir el sendero y no sabe qué ruta seguir.'
    },
    {
      id: 'ruta-poblacion-riesgo',
      priority: 4,
      condition: {
        any: [
          { variable: 'preparacionFamiliar', operator: '<', value: 4 },
          { variable: 'poblacionProtegida', operator: '<', value: 0 }
        ]
      },
      highlightedZone: 'zona-poblacion-riesgo',
      nextScenario: 's-010-cambio-viento-evacuacion',
      uiState: {
        headline: 'Frente crítico: población expuesta',
        body:
          'Aunque el frente todavía no ha entrado en el núcleo, los primeros cambios de viento empiezan a preocupar. La población necesita instrucciones claras antes de que la amenaza llegue a las viviendas.',
        buttonLabel: 'Preparar instrucciones a la población'
      },
      transition:
        'Aunque el frente todavía no ha entrado en el núcleo, los primeros cambios de viento empiezan a preocupar. La población necesita instrucciones claras antes de que la amenaza llegue a las viviendas.'
    },
    {
      id: 'ruta-base',
      priority: 99,
      condition: 'default',
      highlightedZone: 'zona-poblacion-riesgo',
      nextScenario: 's-010-cambio-viento-evacuacion',
      uiState: {
        headline: 'El viento cambia la escala de la emergencia',
        body:
          'La respuesta inicial contiene parte del riesgo, pero el viento cambia de dirección y empuja el frente hacia una zona habitada. La emergencia entra en una nueva fase.',
        buttonLabel: 'Evaluar amenaza al núcleo habitado'
      },
      transition:
        'La respuesta inicial contiene parte del riesgo, pero el viento cambia de dirección y empuja el frente hacia una zona habitada. La emergencia entra en una nueva fase.'
    }
  ],

  designNotes: [
    'Esta pantalla no debe funcionar como un menú de rutas elegido manualmente, sino como un mapa de crisis que reacciona al estado acumulado del juego.',
    'Conviene destacar visualmente la zona que se complica primero: llamadas, accesos, senderistas o población.',
    'La jugadora debe sentir que la prevención previa influye en el tipo de problema que aparece primero.',
    'El bloque uiState permite convertir la lógica en una pantalla visible con titular, texto y botón de acción.',
    'Aunque la ruta cambie, todas las ramas deberían converger más adelante en el gran nudo narrativo: el cambio de viento hacia un núcleo poblado.'
  ]
};
```

---

## 5. Qué aporta `uiState`

El bloque `uiState` permite separar la lógica interna de la experiencia visual.

Sin `uiState`, el sistema sabe qué ruta activar, pero la jugadora no ve claramente por qué.

Con `uiState`, la pantalla puede mostrar:

```txt
Frente crítico: comunicación pública
El humo se ve desde varios municipios...
[Gestionar llamadas y mensajes]
```

Esto da:

- claridad;
- ritmo;
- sensación de consecuencia;
- mejor jugabilidad;
- mejor transición narrativa.

---

## 6. Recomendación visual

La pantalla debería tener:

- un mapa panorámico del municipio;
- humo al fondo, todavía sin grandes llamas;
- tres zonas activas visibles;
- una zona iluminada según la ruta;
- contador o etiqueta de estado;
- texto breve de frente crítico;
- botón de avance.

Ejemplo de composición:

```txt
┌─────────────────────────────────────────┐
│ La emergencia se abre en tres frentes    │
├─────────────────────────────────────────┤
│                                         │
│      [MAPA DEL MUNICIPIO CON HUMO]       │
│                                         │
│  ☎ Comunicación     🛣 Accesos     🏠 Población │
│                                         │
├─────────────────────────────────────────┤
│ Frente crítico: comunicación pública     │
│ El 112 empieza a saturarse...            │
│ [Gestionar llamadas y mensajes]          │
└─────────────────────────────────────────┘
```

---

## 7. Crítica constructiva

Esta pantalla puede quedar muy bien si se mantiene breve. Su función es marcar un cambio de ritmo, no añadir otra decisión larga.

La pantalla debe sentirse como:

> La crisis acaba de elegir por dónde entrar.

No como:

> Elige una pestaña del menú de emergencias.

El sistema ya eligió la ruta según las consecuencias acumuladas. La jugadora solo ve el resultado y actúa.

---

## 8. Frase clave

> No decides qué problema aparece. Decides con cuánto margen lo enfrentas.
