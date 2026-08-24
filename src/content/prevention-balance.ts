import type {
  CrisisRouteModule,
  FirstAlertScenario,
  PreventionBalanceContent
} from '../domain/types/campaign-node.js';

export const PREVENTION_BALANCE: PreventionBalanceContent = {
  id: 'balance-prevencion',
  title: 'Balance preventivo del municipio',
  phase: 'prevencion',
  type: 'summary',
  intro: 'Lo que se hizo antes del fuego empieza a contar ahora.',
  context:
    'Tras las visitas municipales, tienes una fotografia bastante clara del estado del territorio: viviendas mas o menos defendibles, fincas con mayor o menor continuidad vegetal y caminos rurales mejor o peor preparados. La epoca de mayor riesgo se acerca. No existe el riesgo cero, pero las decisiones tomadas durante la fase preventiva pueden cambiar el margen de maniobra si se declara un incendio.',
  objective:
    'Revisar el nivel de preparacion alcanzado antes de entrar en la fase de emergencia.',
  indicators: [
    {
      id: 'defensibilidad-viviendas',
      label: 'Defensibilidad de viviendas',
      variables: ['defensibilidadViviendas', 'riesgoPavesas', 'danosViviendas']
    },
    {
      id: 'gestion-combustible',
      label: 'Gestion del combustible',
      variables: ['continuidadCombustible', 'riesgoPropagacion', 'riesgoIgnicion']
    },
    {
      id: 'riesgo-ignicion',
      label: 'Riesgo de ignicion',
      variables: ['riesgoIgnicion', 'cumplimientoPreventivo']
    }
  ],
  outcomes: [
    {
      id: 'municipio-preparado',
      title: 'Municipio preparado',
      text:
        'Las actuaciones preventivas han reducido vulnerabilidades importantes. Varias viviendas tienen mejores condiciones de defensa y parte del combustible en fincas y caminos se ha gestionado. El municipio no es invulnerable. Ninguno lo es. Pero si el fuego aparece, no encontrara todas las puertas abiertas.',
      crisisImpact: {
        danosViviendas: -3,
        riesgoPropagacion: -2,
        seguridadEquipos: 2
      }
    },
    {
      id: 'preparacion-desigual',
      title: 'Preparacion desigual',
      text:
        'La prevencion ha mejorado algunos puntos, pero quedan debilidades: viviendas con elementos vulnerables, fincas con combustible acumulado o caminos con acceso limitado. El municipio llega mejor que antes, pero no de forma homogenea. Y el fuego suele tener buen ojo para encontrar lo pendiente.',
      crisisImpact: {
        riesgoPropagacion: 1,
        danosViviendas: 1
      }
    },
    {
      id: 'territorio-vulnerable',
      title: 'Territorio vulnerable',
      text:
        'Las medidas preventivas han sido insuficientes o demasiado parciales. Persisten combustible junto a viviendas, continuidad vegetal y caminos complicados. El incendio todavia no ha empezado, pero ya tiene ventaja. No es dramatismo: es combustible esperando una mala tarde.',
      crisisImpact: {
        danosViviendas: 4,
        riesgoPropagacion: 4,
        riesgoAtrapamiento: 2,
        seguridadEquipos: -1
      }
    }
  ],
  nextScreen: 's-040-primer-aviso-incendio'
};

export const FIRST_ALERT_SCENARIO: FirstAlertScenario = {
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
  intro: 'Lo que hasta ahora era prevencion acaba de convertirse en emergencia.',
  context:
    'Son las 13:42. El 112 recibe varias llamadas casi al mismo tiempo. Una columna de humo se levanta en una zona de monte proxima a fincas y viviendas dispersas. Todavia no esta claro el alcance del incendio. Algunos avisos hablan de humo junto a un camino rural. Otros mencionan una posible quema de restos vegetales que se ha descontrolado. Tambien hay quien dice haber visto llamas cerca de una pista forestal. El viento sopla con rachas irregulares, la humedad es baja y la temperatura ha subido durante la manana. Hay que actuar con rapidez, pero sin convertir la incertidumbre en caos.',
  question:
    'Como organizas la primera respuesta ante el inicio del incendio?',
  briefing:
    'El incendio acaba de declararse y la informacion todavia es incompleta. En esta fase puede haber margen para contenerlo, pero los primeros minutos son decisivos. La prioridad es confirmar la localizacion, movilizar medios de primera intervencion, evaluar accesos, viento y combustible disponible, activar una comunicacion publica inicial y avisar preventivamente a los municipios proximos sin ordenar medidas masivas que todavia no estan justificadas.',
  options: [
    {
      id: 'a',
      shortLabel: 'Movilizar y verificar',
      summary:
        'Activa la primera intervención y confirma localización, accesos, viento y combustible.',
      text:
        'Activar de inmediato medios de primera intervencion, confirmar la localizacion exacta, evaluar accesos, viento y combustible disponible, y mantener informados a los municipios cercanos sin ordenar medidas masivas todavia.',
      isCorrect: true,
      impact: {
        controlIncendio: 4,
        coordinacionOperativa: 4,
        seguridadEquipos: 3,
        confusionPublica: -2,
        recursosDisponibles: -1
      },
      feedback:
        'Respuesta adecuada. En un incendio forestal, la primera respuesta debe ser rapida, pero no ciega. Confirmar localizacion, accesos y condiciones permite ganar tiempo sin generar caos.',
      transition:
        'La primera respuesta se activa con rapidez. Los medios llegan antes al foco y se ordenan los accesos. Aun asi, el viento empuja las llamas hacia una zona de monte con continuidad vegetal. El incendio no queda contenido y entra en fase de seguimiento critico.'
    },
    {
      id: 'b',
      shortLabel: 'Esperar confirmación total',
      summary:
        'Retrasa la movilización hasta conocer el alcance exacto del incendio.',
      text:
        'Esperar a tener confirmacion completa sobre el tamano del incendio antes de movilizar recursos, para evitar una activacion innecesaria.',
      isCorrect: false,
      impact: {
        controlIncendio: -4,
        coordinacionOperativa: -3,
        riesgoPropagacion: 4,
        confusionPublica: 2
      },
      feedback:
        'Respuesta incorrecta. En incendios forestales, esperar puede convertir un conato en un problema serio. La confirmacion es importante, pero la primera respuesta debe activarse con rapidez.',
      transition:
        'La espera retrasa la llegada de medios. Cuando se confirma el alcance real, el fuego ya ha ganado intensidad y obliga a movilizar mas recursos en peores condiciones.'
    },
    {
      id: 'c',
      shortLabel: 'Comunicar lo confirmado',
      summary:
        'Publica un aviso prudente, pide evitar la zona y anuncia actualizaciones.',
      text:
        'Abrir una comunicacion publica inicial breve y prudente: informar de que se esta verificando un incendio, pedir que se evite la zona, recordar canales oficiales y anunciar actualizaciones frecuentes.',
      isCorrect: true,
      impact: {
        confianzaPublica: 4,
        confusionPublica: -4,
        saturacion112: -3,
        coordinacionOperativa: 2
      },
      feedback:
        'Respuesta adecuada. Comunicar pronto no significa alarmar. Significa ocupar el espacio informativo antes de que lo ocupen rumores, videos borrosos y el primo de alguien diciendo que evacuan todo.',
      transition:
        'La comunicacion inicial reduce rumores y evita desplazamientos innecesarios. Aun asi, la columna de humo se hace visible desde varios municipios y empiezan a llegar llamadas, imagenes y mensajes contradictorios.'
    },
    {
      id: 'd',
      shortLabel: 'Evacuar todos los núcleos',
      summary:
        'Ordena una evacuación general antes de confirmar qué zonas están amenazadas.',
      text:
        'Ordenar la evacuacion inmediata de todos los nucleos cercanos al humo para evitar riesgos posteriores.',
      isCorrect: false,
      impact: {
        confusionPublica: 5,
        riesgoAtrapamiento: 3,
        coordinacionOperativa: -4,
        saturacionRecursos: 4,
        confianzaPublica: -2
      },
      feedback:
        'Respuesta incorrecta. Una evacuacion masiva sin informacion suficiente puede saturar vias, generar alarma y desorganizar la respuesta inicial. Anticiparse no es disparar todas las alarmas a la vez.',
      transition:
        'La orden genera alarma y movimientos desordenados antes de confirmar que zonas estan realmente amenazadas. Varias carreteras empiezan a cargarse de trafico y los equipos pierden margen de maniobra.'
    },
    {
      id: 'e',
      shortLabel: 'Priorizar las redes sociales',
      summary:
        'Concentra los recursos en informar y espera la confirmación desde el terreno.',
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
        'Respuesta incorrecta. La comunicacion es esencial, pero no sustituye la respuesta operativa. Primero se moviliza y verifica; despues se comunica con datos cada vez mas solidos.',
      transition:
        'La informacion circula, pero la respuesta operativa llega tarde. El fuego no espera a que el hilo este bien redactado.'
    }
  ],
  unlocks: [
    's-018-colapso-llamadas-112',
    's-011-corte-carretera-acceso',
    's-033-senderistas-desorientados-humo',
    's-010-cambio-viento-evacuacion'
  ],
  sourceNotes: [
    'La primera respuesta ante un incendio forestal debe combinar rapidez operativa, verificacion de informacion, evaluacion de accesos y comunicacion publica prudente.',
    'Una buena decision inicial no garantiza la extincion inmediata, pero puede ganar tiempo, reducir confusion y mejorar la coordinacion.',
    'Las ordenes masivas sin informacion suficiente pueden generar saturacion de vias, alarma publica y perdida de margen operativo.'
  ]
};

export const CRISIS_ROUTE_MODULE: CrisisRouteModule = {
  id: 'm-001-apertura-tres-frentes',
  title: 'La emergencia se abre en tres frentes',
  phase: 'inicio-crisis',
  type: 'route-selector',
  intro: 'El fuego avanza. Pero el primer problema no siempre son las llamas.',
  context:
    'La primera respuesta ya esta en marcha. Los medios se dirigen al foco, el humo empieza a verse desde varios municipios y las primeras imagenes circulan por redes. Aun no hay una amenaza directa sobre todas las viviendas, pero la emergencia ya se esta abriendo en varios frentes: llamadas al 112, accesos rurales, personas en zonas recreativas, rumores y vecinos que empiezan a preguntar si deben salir.',
  objective:
    'Identificar que frente se complica primero y responder antes de que el incendio gane mas margen.',
  visualMode: 'crisis-map',
  mapZones: [
    {
      id: 'zona-comunicacion',
      title: 'Comunicacion publica',
      icon: 'phone-alert',
      colorHint: 'alert-blue-red',
      visualCue:
        'Telefonia, redes sociales, radio local, ayuntamiento y burbujas de mensajes.',
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
        'Caminos rurales, fincas, margenes con vegetacion, vehiculos de emergencia y humo al fondo.',
      description:
        'El fuego avanza por una zona rural con caminos estrechos y vegetacion continua.',
      linkedScenarios: [
        's-011-corte-carretera-acceso',
        's-033-senderistas-desorientados-humo',
        's-027-fuego-en-barranco'
      ]
    },
    {
      id: 'zona-poblacion-riesgo',
      title: 'Poblacion en riesgo',
      icon: 'home-warning',
      colorHint: 'amber-warning',
      visualCue:
        'Viviendas dispersas, familias, mascotas, centro social y posible punto de encuentro.',
      description:
        'La poblacion empieza a pedir instrucciones. Algunas personas podrian necesitar apoyo si hay evacuacion.',
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
        headline: 'Frente critico: comunicacion publica',
        body:
          'El humo se ve desde varios municipios. El 112 empieza a recibir llamadas de dudas generales y los primeros mensajes contradictorios circulan por redes.',
        buttonLabel: 'Gestionar llamadas y mensajes'
      },
      transition:
        'El humo ya es visible desde varios municipios. En pocos minutos, el 112 empieza a recibir llamadas de personas que no estan en peligro inmediato pero quieren saber si deben evacuar.'
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
        headline: 'Frente critico: accesos rurales',
        body:
          'El fuego avanza por una zona rural donde los caminos son estrechos y algunos margenes siguen cargados de vegetacion. La llegada de medios y la salida de personas pueden depender de una decision rapida sobre accesos.',
        buttonLabel: 'Ordenar accesos y vias de emergencia'
      },
      transition:
        'El fuego avanza por una zona rural donde los caminos son estrechos y algunos margenes siguen cargados de vegetacion.'
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
        headline: 'Frente critico: senderistas en zona de humo',
        body:
          'La zona recreativa proxima al monte no estaba suficientemente senalizada. Un grupo de senderistas avisa de que el humo empieza a cubrir el sendero y no sabe que ruta seguir.',
        buttonLabel: 'Localizar al grupo'
      },
      transition:
        'La zona recreativa proxima al monte no estaba suficientemente senalizada. Un grupo de senderistas avisa de que el humo empieza a cubrir el sendero.'
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
        headline: 'Frente critico: poblacion expuesta',
        body:
          'Aunque el frente todavia no ha entrado en el nucleo, los primeros cambios de viento empiezan a preocupar. La poblacion necesita instrucciones claras antes de que la amenaza llegue a las viviendas.',
        buttonLabel: 'Preparar instrucciones a la poblacion'
      },
      transition:
        'Aunque el frente todavia no ha entrado en el nucleo, los primeros cambios de viento empiezan a preocupar.'
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
          'La respuesta inicial contiene parte del riesgo, pero el viento cambia de direccion y empuja el frente hacia una zona habitada. La emergencia entra en una nueva fase.',
        buttonLabel: 'Evaluar amenaza al nucleo habitado'
      },
      transition:
        'La respuesta inicial contiene parte del riesgo, pero el viento cambia de direccion y empuja el frente hacia una zona habitada.'
    }
  ],
  designNotes: [
    'Esta pantalla no debe funcionar como un menu de rutas elegido manualmente, sino como un mapa de crisis que reacciona al estado acumulado del juego.',
    'Conviene destacar visualmente la zona que se complica primero: llamadas, accesos, senderistas o poblacion.',
    'La jugadora debe sentir que la prevencion previa influye en el tipo de problema que aparece primero.',
    'El bloque uiState permite convertir la logica en una pantalla visible con titular, texto y boton de accion.'
  ]
};
