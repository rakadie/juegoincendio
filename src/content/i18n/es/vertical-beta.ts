import {
  assertVerticalBetaI18nCatalog,
  type VerticalBetaI18nCatalog
} from '../vertical-beta-i18n.js';

export const VERTICAL_BETA_I18N_ES = assertVerticalBetaI18nCatalog({
  locale: 'es',
  namespace: 'verticalBeta',
  scenes: {
    'intro-briefing-mission': {
      title: 'Prepara el territorio antes del incendio',
      body:
        'Inspecciona el territorio y las viviendas. Las cinco actuaciones elegidas cambiarán las condiciones que encontrarán los equipos durante la emergencia.',
      advanceLabel: 'Iniciar inspección'
    },
    'prevention-inspection-territory-fuel': {
      title: 'Fincas, vegetación y gestión del combustible',
      shortTitle: 'Territorio y combustible',
      body:
        'El fuego no siempre avanza por donde quiere. A veces avanza por donde le hemos dejado combustible.',
      context:
        'Técnicos municipales, agricultores y ganaderos muestran fincas próximas al monte con restos de poda, vegetación continua y caminos estrechos.',
      objective:
        'Detecta los riesgos y elige tres actuaciones para reducir combustible, romper continuidad y conservar accesos operativos.',
      advanceLabel: 'Continuar a viviendas',
      hotspots: {
        'restos-poda-acumulados': {
          title: 'Restos de poda acumulados',
          visualHint: 'Ramas secas y restos vegetales junto a muros',
          description:
            'Varias fincas acumulan restos de poda y material vegetal seco junto a muros y caminos.',
          futureConsequence:
            'Los restos acumulados permanecen disponibles para intensificar y sostener la propagación.',
          action: {
            label: 'Gestionar restos de poda',
            description: 'Retirar o procesar los restos vegetales ya acumulados.',
            feedback:
              'Los restos se retiran o procesan y dejan de actuar como combustible acumulado.'
          }
        },
        'vegetacion-densa-borde-fincas': {
          title: 'Continuidad vegetal entre fincas y monte',
          visualHint: 'Matorral continuo conectando parcelas y ladera',
          description:
            'El matorral forma una conexión continua entre parcelas, monte y viviendas dispersas.',
          futureConsequence:
            'La continuidad territorial facilita que el frente enlace sectores sin interrupciones útiles.',
          action: {
            label: 'Crear discontinuidades vegetales',
            description: 'Abrir una discontinuidad estratégica y mantenible.',
            feedback:
              'Se crea una discontinuidad estratégica en el recorrido probable del fuego.'
          }
        },
        'camino-rural-invadido': {
          title: 'Camino rural con márgenes invadidos',
          visualHint: 'Camino estrecho con vegetación seca en los bordes',
          description:
            'Los márgenes reducen el paso y comprometen la aproximación y la retirada de los medios.',
          futureConsequence:
            'La aproximación territorial queda limitada aunque el acceso local esté despejado.',
          action: {
            label: 'Limpiar márgenes de caminos rurales',
            description: 'Recuperar la anchura útil de la vía y sus márgenes.',
            feedback:
              'El camino recupera anchura útil para aproximación, maniobra y repliegue.'
          }
        },
        'pastoreo-preventivo': {
          title: 'Pastoreo preventivo en franjas prioritarias',
          visualHint: 'Rebaño en una franja planificada',
          description:
            'La asociación ganadera puede ejecutar un programa con calendario, agua y seguimiento técnico.',
          futureConsequence:
            'El combustible fino permanece si el programa no llega a ejecutarse antes de la crisis.',
          action: {
            label: 'Ejecutar pastoreo preventivo',
            description: 'Completar el pastoreo en las franjas prioritarias antes de la crisis.',
            feedback:
              'El pastoreo se completa en las franjas prioritarias y reduce combustible fino.'
          }
        },
        'quema-tecnica-profesional': {
          title: 'Evaluación de una línea preventiva profesional',
          visualHint: 'Técnicos forestales estudiando una posición estratégica',
          description:
            'Una posible línea requiere evaluación profesional, autorización y condiciones operativas compatibles.',
          futureConsequence:
            'No se conoce si existe una posición estratégica viable que pueda aprovecharse durante la crisis.',
          action: {
            label: 'Solicitar evaluación profesional',
            description: 'Evaluar técnicamente la viabilidad de una línea preventiva.',
            feedback:
              'La evaluación concluye que existe una línea viable, sin sustituir el acceso ni el repliegue seguros.'
          }
        }
      },
      outcomes: {
        alto: {
          title: 'Territorio con margen operativo',
          text: 'El combustible, la continuidad y los accesos ofrecen mejores condiciones de intervención.'
        },
        medio: {
          title: 'Preparación parcial',
          text: 'Persisten condiciones territoriales que pueden limitar la intervención.'
        },
        bajo: {
          title: 'Territorio vulnerable',
          text: 'El fuego encontrará combustible continuo y una cadena de acceso insuficiente.'
        }
      }
    },
    'prevention-inspection-housing-interface': {
      title: 'Viviendas en interfaz urbano-forestal',
      shortTitle: 'Viviendas e interfaz',
      body: 'No hay humo todavía. Por eso este es el momento de actuar.',
      context:
        'Las viviendas próximas al monte presentan continuidad vertical y horizontal de vegetación y accesos estrechos para autobombas.',
      objective:
        'Elige dos actuaciones para reducir la continuidad junto a viviendas y conservar entrada, maniobra y salida seguras.',
      advanceLabel: 'Ver balance preventivo',
      hotspots: {
        'ramas-bajas-vegetacion-seca': {
          title: 'Ramas bajas y vegetación seca',
          visualHint: 'Escalera vegetal desde el suelo a las copas',
          description:
            'Las ramas bajas conectan la vegetación seca del suelo con las copas junto a las viviendas.',
          futureConsequence:
            'La escalera vertical permite que un fuego de superficie gane altura e intensidad.',
          action: {
            label: 'Podar ramas y gestionar la biomasa',
            description: 'Eliminar la escalera vegetal y retirar la biomasa generada.',
            feedback:
              'La poda se completa con la retirada o gestión de toda la biomasa generada.'
          }
        },
        'copas-tocandose': {
          title: 'Copas conectadas',
          visualHint: 'Continuidad horizontal entre copas',
          description:
            'Las copas se tocan y permiten que el fuego avance por la parte alta de la vegetación.',
          futureConsequence:
            'La continuidad horizontal incrementa el riesgo de propagación y transición a copas.',
          action: {
            label: 'Separar copas y gestionar la biomasa',
            description: 'Romper la continuidad horizontal y gestionar el material cortado.',
            feedback:
              'Las copas quedan separadas estratégicamente y la biomasa generada se gestiona.'
          }
        },
        'acceso-estrecho': {
          title: 'Acceso estrecho para autobombas',
          visualHint: 'Entrada con obstáculos y vegetación',
          description:
            'La entrada local impide que una autobomba pueda acceder, maniobrar y salir con seguridad.',
          futureConsequence:
            'La defensa de viviendas queda limitada aunque el camino territorial esté disponible.',
          action: {
            label: 'Despejar accesos para autobombas',
            description: 'Recuperar entrada, maniobra y salida junto a las viviendas.',
            feedback:
              'La entrada, la maniobra y el repliegue local quedan disponibles para los equipos.'
          }
        }
      },
      outcomes: {
        alto: {
          title: 'Viviendas defendibles',
          text: 'La continuidad próxima se reduce y los medios conservan un acceso local utilizable.'
        },
        medio: {
          title: 'Defensa condicionada',
          text: 'Queda una vulnerabilidad que obliga a priorizar durante la crisis.'
        },
        bajo: {
          title: 'Interfaz vulnerable',
          text: 'La vegetación y los accesos limitan la capacidad de sostener la defensa.'
        }
      }
    },
    'transition-summary-prevention': {
      title: 'Balance preventivo',
      body: 'Estas son las condiciones que heredará la respuesta durante el incendio.',
      advanceLabel: 'Comenzar la emergencia'
    },
    'crisis-decision-first-alert': {
      title: 'Primer aviso de incendio',
      body: 'El primer aviso exige movilizar recursos y verificar las condiciones reales.',
      context:
        'El aviso es común a ambos recorridos. La rama se decidirá después desde la preparación real.',
      actions: {
        'movilizar-y-verificar': {
          label: 'Movilizar y verificar',
          description: 'Movilizar los primeros medios y confirmar sobre el terreno las condiciones reales.',
          feedback: 'La respuesta inicial queda movilizada y verificada.',
          consequences: {
            prepared: 'La movilización aprovecha el margen preventivo disponible.',
            vulnerable: 'La movilización confirma las restricciones heredadas sin poder repararlas.'
          }
        }
      }
    },
    'crisis-router-causal-map': {
      title: 'El territorio condiciona la respuesta',
      body:
        'El recorrido se selecciona automáticamente a partir del balance preventivo. No hay una ruta que elegir.',
      advanceLabel: 'Aplicar condiciones del territorio'
    },
    'crisis-decision-emergency-fuel-break': {
      title: 'Cortafuego de emergencia',
      body:
        'El frente gana velocidad y se aproxima a una zona donde una maniobra técnica podría crear una discontinuidad útil.',
      context:
        'Los equipos valoran una intervención de emergencia, pero solo puede ejecutarse con acceso, posición y repliegue compatibles.',
      advanceLabel: 'Continuar al barranco',
      actions: {
        'autorizar-maniobra-condicionada': {
          label: 'Autorizar una maniobra condicionada',
          description:
            'Autorizar la maniobra solo con evaluación favorable, condiciones compatibles y recursos para controlarla.',
          feedback: 'La autorización queda ligada a condiciones técnicas y de seguridad.',
          consequences: {
            prepared: 'La maniobra aprovecha una envolvente segura y conserva el repliegue.'
          }
        },
        'mantener-evaluacion-sin-maniobra': {
          label: 'Mantener la evaluación sin ejecutar la maniobra',
          description: 'Conservar la línea evaluada sin ejecutarla cuando el beneficio no compensa el riesgo.',
          feedback: 'Se conserva el margen operativo sin abrir una línea adicional.',
          consequences: {
            prepared: 'Se conserva el margen operativo sin abrir una línea adicional.'
          }
        },
        'usar-linea-profesional-no-evaluada': {
          label: 'Usar una línea profesional no evaluada',
          description: 'Intentar la maniobra sin una evaluación técnica válida.',
          feedback: 'La maniobra no puede autorizarse sin evaluación y control.',
          blockedReason: 'La maniobra exige evaluación técnica previa y condiciones compatibles.'
        }
      }
    },
    'crisis-decision-access-blockage': {
      title: 'Bloqueo de accesos',
      body:
        'La carretera de acceso deja de ser segura y la cadena de entrada, maniobra y retirada queda comprometida.',
      context:
        'Humo, ramas y fuego en los márgenes impiden utilizar la vía como si estuviera disponible.',
      advanceLabel: 'Continuar al barranco',
      actions: {
        'despejar-corredor-operativo': {
          label: 'Abrir un corredor operativo limitado',
          description: 'Verificar y habilitar un corredor temporal para movimientos imprescindibles.',
          feedback: 'Se habilita un corredor limitado sin reparar la carencia preventiva.',
          consequences: {
            vulnerable: 'Se habilita un corredor temporal, sin reparar la cadena preventiva de acceso.'
          }
        },
        'cerrar-acceso-y-reorganizar-medios': {
          label: 'Cerrar el acceso y reorganizar los medios',
          description: 'Cerrar la vía insegura y recolocar los medios en posiciones exteriores verificadas.',
          feedback: 'El acceso inseguro queda cerrado y los medios se reorganizan.',
          consequences: {
            vulnerable: 'El acceso inseguro queda cerrado y los medios buscan posiciones exteriores.'
          }
        },
        'introducir-maquinaria-sin-repliegue': {
          label: 'Introducir maquinaria sin repliegue confirmado',
          description: 'Introducir maquinaria por una vía sin salida segura confirmada.',
          feedback: 'La entrada no puede autorizarse sin una retirada segura.',
          blockedReason: 'No existe una ruta segura de entrada, maniobra y retirada.'
        },
        'usar-linea-profesional-sin-acceso': {
          label: 'Usar la línea evaluada sin acceso operativo',
          description: 'Intentar aprovechar una línea técnica sin poder llegar ni replegarse.',
          feedback: 'La línea no es utilizable mientras la cadena de acceso siga bloqueada.',
          blockedReason: 'Una línea evaluada no es utilizable sin acceso y retirada seguros.'
        }
      }
    },
    'crisis-decision-ravine-fire': {
      title: 'Fuego en el barranco',
      body:
        'El incendio entra en un barranco estrecho donde la pendiente, el humo y el efecto chimenea pueden cerrar las rutas de escape.',
      context:
        'Los medios aéreos pueden reducir intensidad, pero las posiciones terrestres solo son válidas con observación, anclaje y repliegue.',
      advanceLabel: 'Continuar',
      actions: {
        'asegurar-flancos-y-repliegue': {
          label: 'Asegurar flancos y repliegue',
          description: 'Consolidar desde posiciones seguras y proteger una salida confirmada.',
          feedback: 'Los flancos y la retirada se priorizan antes de sostener la posición.',
          consequences: {
            prepared: 'La posición se sostiene y conserva una retirada segura.',
            vulnerable: 'Los flancos protegen la retirada, pero la posición no puede sostenerse.'
          }
        },
        'mantener-ataque-anclado': {
          label: 'Mantener un ataque anclado',
          description: 'Mantener el ataque desde una posición con anclaje, acceso y repliegue.',
          feedback: 'El ataque se mantiene dentro de una envolvente operativa segura.',
          consequences: {
            prepared: 'El ataque permanece anclado mientras se conserva una salida segura.'
          }
        },
        'vigilancia-y-proteccion-indirecta': {
          label: 'Vigilar y proteger desde el exterior',
          description: 'Limitar la exposición y trabajar desde posiciones exteriores.',
          feedback: 'La vigilancia exterior evita fingir una posición sostenible.',
          consequences: {
            prepared: 'Se limita la exposición manteniendo vigilancia exterior.',
            vulnerable: 'La respuesta exterior protege equipos sin fingir una posición sostenible.'
          }
        },
        'ataque-directo-sin-anclaje': {
          label: 'Atacar directamente sin anclaje',
          description: 'Entrar al frente sin un punto de anclaje ni retirada confirmada.',
          feedback: 'El ataque directo no es compatible con la seguridad de la posición.',
          blockedReason: 'El efecto chimenea puede cortar la retirada en pocos minutos.'
        }
      }
    },
    'crisis-decision-housing-defense': {
      title: 'Defensa operativa del núcleo de viviendas',
      body:
        'El frente se aproxima a viviendas y obliga a decidir qué posiciones pueden defenderse sin atrapar a los equipos.',
      context:
        'La defensa requiere acceso, triaje de estructuras, control de pavesas y una vía segura de repliegue.',
      advanceLabel: 'Ver resultado',
      actions: {
        'defender-desde-posicion-segura': {
          label: 'Defender desde una posición segura',
          description: 'Defender únicamente estructuras priorizadas con entrada y salida seguras.',
          feedback: 'La defensa se sostiene con prioridades y repliegue confirmado.',
          consequences: {
            prepared: 'La defensa se sostiene con prioridades y una vía segura de retirada.'
          }
        },
        'defensa-selectiva-con-prioridades': {
          label: 'Priorizar las viviendas defendibles',
          description: 'Concentrar recursos en estructuras defendibles y posiciones con retirada.',
          feedback: 'Los medios se concentran donde la defensa puede sostenerse.',
          consequences: {
            prepared: 'Los recursos se concentran en posiciones defendibles y con retirada.'
          }
        },
        'defensa-total-sin-repliegue': {
          label: 'Defender todas las viviendas sin repliegue',
          description: 'Mantener una defensa total aunque no exista una salida segura.',
          feedback: 'La defensa total no puede justificar la exposición de los equipos.',
          blockedReason: 'La defensa total expone a los equipos y elimina la salida segura.'
        }
      }
    },
    'crisis-decision-crown-fire': {
      title: 'Fuego de copas',
      body:
        'El incendio alcanza las copas, aumenta su velocidad y deja de admitir una defensa directa segura.',
      context:
        'El calor radiante, las pavesas y la pérdida de rutas de escape obligan a priorizar vidas y retirada.',
      advanceLabel: 'Ver resultado',
      actions: {
        'replegar-ante-fuego-de-copas': {
          label: 'Replegar y priorizar vidas',
          description: 'Retirar los medios terrestres antes de perder las rutas de escape.',
          feedback: 'El repliegue protege a los equipos ante una propagación fuera de capacidad.',
          consequences: {
            vulnerable: 'El repliegue protege a los equipos ante una propagación fuera de capacidad.'
          }
        },
        'ataque-indirecto-y-vigilancia': {
          label: 'Mantener ataque indirecto y vigilancia',
          description: 'Vigilar desde el exterior y limitar la intervención a posiciones seguras.',
          feedback: 'La vigilancia exterior protege vidas sin exponer medios al frente de copas.',
          consequences: {
            vulnerable: 'La vigilancia exterior protege vidas sin exponer medios al frente de copas.'
          }
        },
        'sostener-ataque-directo': {
          label: 'Sostener el ataque directo',
          description: 'Mantener personal frente a un fuego de copas fuera de capacidad.',
          feedback: 'La intensidad ya no permite sostener un ataque directo.',
          blockedReason: 'El fuego de copas supera la capacidad segura de ataque directo.'
        },
        'defender-posicion-sin-salida': {
          label: 'Defender una posición sin salida',
          description: 'Mantener una posición sin una ruta de retirada confirmada.',
          feedback: 'La posición no puede considerarse defendible sin salida.',
          blockedReason: 'Una posición sin retirada confirmada no es defendible.'
        }
      }
    },
    'ending-result-causal-report': {
      title: 'Informe causal de la partida',
      body: 'El resultado relaciona prevención, condiciones heredadas y respuesta operativa.',
      advanceLabel: 'Cerrar partida',
      variants: {
        contained: {
          title: 'Incendio contenido',
          summary:
            'La preparación mantuvo acceso, repliegue y una ventana de intervención dentro de capacidad.',
          closing:
            'La preparación mejora las opciones, pero no garantiza el control de un incendio real.'
        },
        overwhelmed: {
          title: 'Incendio fuera de capacidad',
          summary:
            'Las mejoras de combustible no compensaron las restricciones críticas de acceso y posición segura.',
          closing:
            'Una mejora real puede no bastar cuando otra condición crítica bloquea la respuesta.'
        }
      }
    }
  },
  dimensions: {
    fuelLoad: 'Carga de combustible',
    fuelContinuity: 'Continuidad del combustible',
    operationalAccess: 'Acceso operativo',
    defensibility: 'Defensibilidad',
    attackOpportunity: 'Oportunidad de ataque'
  },
  causalRelations: {
    'fuel-load': {
      title: 'La carga de combustible condicionó la intensidad',
      effect:
        'La cantidad de combustible disponible se manifestó en la intensidad afrontada por los equipos.'
    },
    'fuel-continuity': {
      title: 'La continuidad cambió la propagación',
      effect:
        'Las discontinuidades realizadas u omitidas determinaron los puntos de anclaje disponibles.'
    },
    'operational-access': {
      title: 'El acceso decidió la capacidad de maniobra',
      effect:
        'La entrada, la maniobra de medios y el repliegue dependieron de la cadena de acceso preparada.'
    },
    defensibility: {
      title: 'La posición tenía límites concretos',
      effect:
        'La vegetación tratada y el acceso convirtieron —o no— el lugar en una posición sostenible.'
    },
    'attack-opportunity': {
      title: 'Las cinco condiciones formaron la oportunidad de ataque',
      effect:
        'Combustible, continuidad, acceso y posición actuaron conjuntamente; una ventaja aislada no ocultó un veto crítico.'
    }
  }
} satisfies VerticalBetaI18nCatalog);
