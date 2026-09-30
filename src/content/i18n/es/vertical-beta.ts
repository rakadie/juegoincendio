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
        'Analiza el monte y la vivienda. Dispones de cinco actuaciones preventivas. Tus decisiones cambiarán los accesos, las zonas de trabajo y las opciones de respuesta.',
      advanceLabel: 'Iniciar preparación'
    },
    'prevention-inspection-territory-fuel': {
      title: 'Cuida las fincas y el monte',
      shortTitle: 'Fincas y monte',
      body:
        'Antes de que haya fuego, puedes quitar ramas secas, separar plantas y mejorar los caminos.',
      context:
        'En la foto hay ramas secas, plantas unidas, un camino estrecho, una zona de pastoreo y un lugar que puede revisar una persona experta.',
      objective:
        'Encuentra los cinco puntos y elige tres mejoras. Mira cómo cambia el paisaje.',
      advanceLabel: 'Ir a las casas',
      hotspots: {
        'restos-poda-acumulados': {
          title: 'Ramas secas amontonadas',
          visualHint: 'Ramas secas junto a los muros',
          description:
            'Hay ramas y hojas secas junto a los muros y el camino.',
          futureConsequence:
            'Si se quedan ahí, pueden arder y hacer que el fuego crezca.',
          action: {
            label: 'Retirar las ramas secas',
            description: 'Quitar o triturar las ramas y hojas secas.',
            feedback:
              'Ramas retiradas. Ahora hay menos material que pueda arder.'
          }
        },
        'vegetacion-densa-borde-fincas': {
          title: 'Vegetación unida',
          visualHint: 'Plantas que unen las fincas con el monte',
          description:
            'Los arbustos y árboles forman un camino seguido desde las fincas hasta el monte.',
          futureConsequence:
            'El fuego puede usar ese camino para pasar de una zona a otra.',
          action: {
            label: 'Separar la vegetación',
            description: 'Crear espacios sin plantas que ayuden a frenar el fuego.',
            feedback:
              'Vegetación separada. Ahora el fuego encuentra espacios sin plantas.'
          }
        },
        'camino-rural-invadido': {
          title: 'Camino estrecho',
          visualHint: 'Plantas secas en los bordes del camino',
          description:
            'Las plantas de los bordes dejan poco espacio para que pase un camión de bomberos.',
          futureConsequence:
            'Los bomberos podrían tardar más en entrar o tener problemas para salir.',
          action: {
            label: 'Limpiar los bordes del camino',
            description: 'Quitar plantas y ramas para dejar más espacio.',
            feedback:
              'Camino despejado. Los bomberos pueden entrar, girar y salir mejor.'
          }
        },
        'pastoreo-preventivo': {
          title: 'Zona de pastoreo',
          visualHint: 'Una zona donde puede comer el ganado',
          description:
            'Cabras u ovejas pueden comer parte de la hierba antes del verano.',
          futureConsequence:
            'Si no pasan por aquí, queda más hierba seca que puede arder.',
          action: {
            label: 'Llevar el ganado a la zona',
            description: 'Dejar que el ganado coma la hierba de esta zona.',
            feedback:
              'Pastoreo realizado. Queda menos hierba seca que pueda arder.'
          }
        },
        'quema-tecnica-profesional': {
          title: 'Zona para revisar',
          visualHint: 'Lugar que debe revisar una persona experta',
          description:
            'Una persona experta puede comprobar si este lugar serviría para trabajar durante un incendio.',
          futureConsequence:
            'Sin esa revisión, los equipos no sabrán si el lugar es seguro y útil.',
          action: {
            label: 'Pedir una revisión experta',
            description: 'Pedir que una persona experta revise la zona.',
            feedback:
              'Zona revisada. Esto no significa que se haya hecho una quema.'
          }
        }
      },
      outcomes: {
        alto: {
          title: 'Monte mejor preparado',
          text: 'Hay menos material seco, más espacios entre plantas y mejores caminos.'
        },
        medio: {
          title: 'Quedan cosas por mejorar',
          text: 'Algunas zonas todavía pueden ayudar al fuego o dificultar el paso.'
        },
        bajo: {
          title: 'Monte poco preparado',
          text: 'El fuego encuentra vegetación unida y caminos difíciles.'
        }
      }
    },
    'prevention-inspection-housing-interface': {
      title: 'Cuida una casa junto al monte',
      shortTitle: 'Casa y jardín',
      body: 'Todavía no hay fuego. Este es el mejor momento para preparar la casa.',
      context:
        'En la foto hay hierba seca, ramas bajas, copas unidas y una entrada estrecha.',
      objective:
        'Elige dos mejoras. Observa qué cambia alrededor de la casa.',
      advanceLabel: 'Ver lo que has preparado',
      hotspots: {
        'ramas-bajas-vegetacion-seca': {
          title: 'Ramas bajas y hierba seca',
          visualHint: 'Hierba y ramas que forman una escalera',
          description:
            'El fuego puede subir desde la hierba seca hasta las ramas y las copas.',
          futureConsequence:
            'Si no se limpia, el fuego puede crecer junto a la casa.',
          action: {
            label: 'Podar y retirar lo seco',
            description: 'Cortar las ramas bajas y retirar la hierba y las ramas secas.',
            feedback:
              'Ramas podadas y suelo limpio. Al fuego le cuesta más subir a las copas.'
          }
        },
        'copas-tocandose': {
          title: 'Copas de árboles unidas',
          visualHint: 'Copas que se tocan entre sí',
          description:
            'Las copas se tocan y el fuego podría saltar de un árbol a otro.',
          futureConsequence:
            'El fuego puede acercarse a la casa por la parte alta de los árboles.',
          action: {
            label: 'Separar las copas',
            description: 'Separa las copas y retira las ramas cortadas.',
            feedback:
              'Copas separadas. Al fuego le cuesta más pasar de un árbol a otro.'
          }
        },
        'acceso-estrecho': {
          title: 'Entrada estrecha',
          visualHint: 'Camino con plantas y obstáculos',
          description:
            'El camión de bomberos no tiene bastante espacio para entrar, girar y salir.',
          futureConsequence:
            'Los bomberos pueden tener problemas para llegar hasta la casa.',
          action: {
            label: 'Despejar la entrada',
            description: 'Quitar obstáculos para dejar espacio al camión de bomberos.',
            feedback:
              'Entrada despejada. El camión de bomberos puede entrar, girar y salir mejor.'
          }
        }
      },
      outcomes: {
        alto: {
          title: 'Casa mejor preparada',
          text: 'Hay menos plantas cerca y los bomberos pueden usar la entrada.'
        },
        medio: {
          title: 'Queda algo por mejorar',
          text: 'Una parte del entorno todavía puede dificultar la ayuda.'
        },
        bajo: {
          title: 'Casa poco preparada',
          text: 'La vegetación y la entrada hacen más difícil ayudar a proteger la casa.'
        }
      }
    },
    'transition-summary-prevention': {
      title: 'Lo que has preparado',
      body: 'Aquí puedes ver lo que hiciste y lo que quedó pendiente.',
      advanceLabel: 'Empezar la emergencia'
    },
    'crisis-decision-first-alert': {
      title: 'Primer aviso de incendio',
      body: 'Se detecta humo en el monte. El primer equipo debe localizar el foco y comprobar los accesos.',
      context:
        'La salida inicial es igual en todas las partidas. La preparación previa determina qué opciones habrá al llegar.',
      actions: {
        'movilizar-y-verificar': {
          label: 'Movilizar y comprobar',
          description: 'Enviar el primer equipo para localizar el incendio y valorar los accesos desde una posición segura.',
          feedback: 'El primer equipo está en marcha y evalúa el incendio desde una posición segura.',
          consequences: {
            prepared: 'Los equipos encuentran accesos preparados y más espacio para intervenir.',
            vulnerable: 'Los equipos encuentran límites que ya no pueden corregir con el fuego cerca.'
          }
        }
      }
    },
    'crisis-router-causal-map': {
      title: 'Tus decisiones cambian la emergencia',
      body:
        'El juego usa lo que preparaste para decidir qué ocurre ahora. En esta pantalla no tienes que elegir.',
      advanceLabel: 'Ver qué ocurre'
    },
    'crisis-decision-emergency-fuel-break': {
      title: 'Frenar el avance del fuego',
      body:
        'El fuego avanza hacia una zona desde la que podría frenarse su recorrido.',
      context:
        'Antes de actuar deben comprobarse el acceso, la zona de trabajo y una salida segura.',
      advanceLabel: 'Continuar al barranco',
      actions: {
        'autorizar-maniobra-condicionada': {
          label: 'Intervenir con condiciones seguras',
          description:
            'Intervenir tras confirmar el acceso, la posición de trabajo y la salida.',
          feedback: 'La intervención se mantiene mientras la entrada y la salida sigan disponibles.',
          consequences: {
            prepared: 'Los equipos aprovechan la zona preparada y conservan una salida segura.'
          }
        },
        'mantener-evaluacion-sin-maniobra': {
          label: 'Mantener la observación',
          description: 'Observar desde una posición segura y conservar la opción de actuar después.',
          feedback: 'Los equipos conservan una posición segura y siguen evaluando el avance.',
          consequences: {
            prepared: 'Los equipos conservan sus opciones sin entrar en una zona peligrosa.'
          }
        },
        'usar-linea-profesional-no-evaluada': {
          label: 'Entrar sin comprobar la zona',
          description: 'Intervenir sin confirmar la posición ni la ruta de salida.',
          feedback: 'La intervención se detiene porque la zona todavía no está comprobada.',
          blockedReason: 'Falta comprobar la posición y una salida segura.'
        }
      }
    },
    'crisis-decision-access-blockage': {
      title: 'Camino bloqueado',
      body:
        'El camino ya no permite entrar, maniobrar y salir con seguridad.',
      context:
        'El humo, la vegetación de los márgenes y el fuego próximo comprometen el acceso.',
      advanceLabel: 'Continuar al barranco',
      actions: {
        'despejar-corredor-operativo': {
          label: 'Habilitar un paso temporal',
          description: 'Abrir el espacio mínimo para los movimientos prioritarios.',
          feedback: 'El paso temporal permite movimientos limitados; el acceso sigue siendo difícil.',
          consequences: {
            vulnerable: 'Los equipos usan un paso temporal, pero no pueden arreglar ahora todo el camino.'
          }
        },
        'cerrar-acceso-y-reorganizar-medios': {
          label: 'Cerrar el acceso y reubicar equipos',
          description: 'Cerrar el camino y trasladar los equipos a posiciones seguras.',
          feedback: 'El acceso queda cerrado y los equipos se reubican fuera de la zona expuesta.',
          consequences: {
            vulnerable: 'Los equipos se quedan fuera del camino peligroso.'
          }
        },
        'introducir-maquinaria-sin-repliegue': {
          label: 'Introducir vehículos sin salida',
          description: 'Enviar vehículos por un camino que el fuego puede cerrar.',
          feedback: 'La entrada se cancela porque los vehículos no tendrían una salida segura.',
          blockedReason: 'No hay un camino seguro para entrar, girar y salir.'
        },
        'usar-linea-profesional-sin-acceso': {
          label: 'Usar la zona revisada sin acceso',
          description: 'Intentar llegar a la zona revisada sin entrada ni salida seguras.',
          feedback: 'La zona revisada no puede utilizarse mientras el acceso siga bloqueado.',
          blockedReason: 'La zona no sirve si los equipos no pueden entrar y salir.'
        }
      }
    },
    'crisis-decision-ravine-fire': {
      title: 'Fuego en el barranco',
      body:
        'El fuego entra en el barranco y acelera al subir por la pendiente.',
      context:
        'Antes de intervenir, el equipo necesita visibilidad, una posición segura y una salida disponible.',
      advanceLabel: 'Continuar',
      actions: {
        'asegurar-flancos-y-repliegue': {
          label: 'Asegurar los lados y la salida',
          description: 'Trabajar desde los lados del incendio y mantener libre el camino de salida.',
          feedback: 'Los equipos estabilizan los lados del incendio sin perder su salida.',
          consequences: {
            prepared: 'Los equipos pueden seguir trabajando y mantienen una salida segura.',
            vulnerable: 'Los equipos protegen su salida, pero no pueden quedarse en el barranco.'
          }
        },
        'mantener-ataque-anclado': {
          label: 'Intervenir desde un punto seguro',
          description: 'Actuar desde una posición comprobada con entrada y salida disponibles.',
          feedback: 'Los equipos intervienen desde una posición estable y conservan la salida.',
          consequences: {
            prepared: 'Los equipos actúan desde un lugar seguro y conservan la salida.'
          }
        },
        'vigilancia-y-proteccion-indirecta': {
          label: 'Mantener vigilancia exterior',
          description: 'Observar el avance desde fuera del barranco y proteger las zonas próximas.',
          feedback: 'Los equipos vigilan desde el exterior y evitan una posición sin salida.',
          consequences: {
            prepared: 'Los equipos evitan acercarse de más y siguen vigilando.',
            vulnerable: 'Los equipos se protegen porque dentro del barranco no hay un lugar seguro.'
          }
        },
        'ataque-directo-sin-anclaje': {
          label: 'Entrar sin una salida segura',
          description: 'Acercarse al frente sin una posición estable ni un camino de salida.',
          feedback: 'La entrada se detiene porque el equipo podría quedar sin salida.',
          blockedReason: 'El fuego puede subir por el barranco y cortar la salida muy rápido.'
        }
      }
    },
    'crisis-decision-housing-defense': {
      title: 'Defensa de las viviendas',
      body:
        'El fuego se aproxima a las viviendas. Hay que priorizar posiciones que puedan defenderse sin exponer a los equipos.',
      context:
        'Antes de asignar recursos se comprueban el acceso, el espacio de trabajo y una salida segura.',
      advanceLabel: 'Ver resultado',
      actions: {
        'defender-desde-posicion-segura': {
          label: 'Defender desde una posición segura',
          description: 'Proteger las viviendas que permiten entrar, trabajar y salir con seguridad.',
          feedback: 'Los equipos se sitúan donde pueden actuar sin perder la salida.',
          consequences: {
            prepared: 'Los equipos protegen las casas preparadas y conservan una salida.'
          }
        },
        'defensa-selectiva-con-prioridades': {
          label: 'Priorizar viviendas defendibles',
          description: 'Concentrar los recursos en viviendas con espacio de trabajo y salida disponible.',
          feedback: 'Los recursos se concentran donde pueden actuar sin quedar expuestos.',
          consequences: {
            prepared: 'Los equipos ayudan primero en las casas mejor preparadas.'
          }
        },
        'defensa-total-sin-repliegue': {
          label: 'Intentar una defensa total',
          description: 'Distribuir equipos también en viviendas sin espacio o salida suficientes.',
          feedback: 'La defensa total se descarta porque dejaría equipos en posiciones inseguras.',
          blockedReason: 'Algunas casas no tienen espacio ni una salida segura para los equipos.'
        }
      }
    },
    'crisis-decision-crown-fire': {
      title: 'Fuego en las copas',
      body:
        'El fuego alcanza las copas de los árboles y aumenta con rapidez su intensidad y velocidad.',
      context:
        'El ataque cercano deja de ser seguro. La prioridad pasa a proteger vidas y mantener las salidas.',
      advanceLabel: 'Ver resultado',
      actions: {
        'replegar-ante-fuego-de-copas': {
          label: 'Retirar equipos y proteger vidas',
          description: 'Retirar a los equipos antes de que el fuego corte sus salidas.',
          feedback: 'Los equipos se retiran a tiempo y mantienen abiertas sus salidas.',
          consequences: {
            vulnerable: 'Alejarse protege a los equipos de un fuego demasiado fuerte.'
          }
        },
        'ataque-indirecto-y-vigilancia': {
          label: 'Vigilar y actuar a distancia',
          description: 'Observar el frente y trabajar únicamente desde posiciones seguras.',
          feedback: 'Los equipos mantienen la vigilancia sin entrar en la zona de mayor intensidad.',
          consequences: {
            vulnerable: 'Vigilar desde lejos protege vidas y evita exponer a los equipos.'
          }
        },
        'sostener-ataque-directo': {
          label: 'Mantener el ataque cercano',
          description: 'Mantener personal cerca de un frente que ya supera las condiciones seguras.',
          feedback: 'El ataque cercano se cancela porque el frente supera el margen seguro.',
          blockedReason: 'Acercarse al fuego de las copas pondría en peligro a los equipos.'
        },
        'defender-posicion-sin-salida': {
          label: 'Mantener una posición sin salida',
          description: 'Seguir trabajando donde el fuego puede cerrar el camino de salida.',
          feedback: 'La posición se abandona porque el equipo podría quedar aislado.',
          blockedReason: 'Los equipos necesitan siempre una salida segura.'
        }
      }
    },
    'ending-result-causal-report': {
      title: 'Así cambiaron tus decisiones la partida',
      body: 'Revisa la preparación, las decisiones durante el incendio y su efecto en el resultado.',
      advanceLabel: 'Terminar la partida',
      variants: {
        contained: {
          title: 'Incendio contenido',
          summary:
            'La preparación mantuvo accesos, salidas y posiciones desde las que los equipos pudieron intervenir.',
          closing:
            'Las medidas redujeron el riesgo y ampliaron las opciones, pero ningún entorno queda completamente seguro.'
        },
        overwhelmed: {
          title: 'Incendio fuera de capacidad',
          summary:
            'Algunas medidas fueron útiles, pero los accesos o las posiciones seguras no bastaron para sostener la intervención.',
          closing:
            'Las mejoras reducen parte del riesgo; las condiciones pendientes pueden limitar la respuesta durante la emergencia.'
        }
      }
    }
  },
  dimensions: {
    fuelLoad: 'Ramas y hierba seca',
    fuelContinuity: 'Plantas y árboles unidos',
    operationalAccess: 'Paso para bomberos',
    defensibility: 'Protección de las casas',
    attackOpportunity: 'Formas de apagar el fuego'
  },
  causalRelations: {
    'fuel-load': {
      title: 'La vegetación seca hizo crecer el fuego',
      effect:
        'Cuantas más ramas y hierba seca quedaron, más fuerza pudo ganar el fuego.'
    },
    'fuel-continuity': {
      title: 'La vegetación unida ayudó al fuego a avanzar',
      effect:
        'Los espacios sin plantas frenaron el fuego; las zonas unidas le dejaron seguir.'
    },
    'operational-access': {
      title: 'Los caminos cambiaron lo que pudieron hacer los bomberos',
      effect:
        'Los equipos necesitaron espacio para entrar, girar y salir con seguridad.'
    },
    defensibility: {
      title: 'Las casas preparadas fueron más fáciles de proteger',
      effect:
        'Quitar vegetación y despejar la entrada dio a los equipos lugares más seguros.'
    },
    'attack-opportunity': {
      title: 'Todas las mejoras trabajaron juntas',
      effect:
        'No bastó con una sola mejora: los equipos necesitaron menos vegetación, buenos caminos y una salida segura.'
    }
  }
} satisfies VerticalBetaI18nCatalog);
