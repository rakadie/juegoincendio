import {
  assertVerticalBetaI18nCatalog,
  type VerticalBetaI18nCatalog
} from '../vertical-beta-i18n.js';

export const VERTICAL_BETA_I18N_ES = assertVerticalBetaI18nCatalog({
  locale: 'es',
  namespace: 'verticalBeta',
  scenes: {
    'intro-briefing-mission': {
      title: 'Prepara el monte y las casas',
      body:
        'Mira el monte y las casas. Podrás elegir cinco mejoras. Lo que hagas ahora cambiará lo que podrán hacer los bomberos si hay un incendio.',
      advanceLabel: 'Empezar'
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
            description: 'Podar los árboles para que sus copas no se toquen y retirar lo cortado.',
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
      body: 'Se ve humo en el monte. Los equipos deben salir y comprobar qué ocurre.',
      context:
        'Todas las partidas empiezan con este aviso. Después, tus mejoras cambiarán lo que ocurra.',
      actions: {
        'movilizar-y-verificar': {
          label: 'Enviar equipos y comprobar',
          description: 'Enviar a los primeros equipos para que observen el incendio desde un lugar seguro.',
          feedback: 'Los equipos ya están en camino y comprueban la situación.',
          consequences: {
            prepared: 'Los equipos encuentran mejores caminos y más espacio para trabajar.',
            vulnerable: 'Los equipos encuentran problemas que ya no pueden arreglar con el fuego cerca.'
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
        'El fuego avanza hacia una zona donde los equipos podrían intentar frenarlo.',
      context:
        'Solo pueden acercarse si tienen un camino de entrada, un lugar seguro y una salida.',
      advanceLabel: 'Continuar al barranco',
      actions: {
        'autorizar-maniobra-condicionada': {
          label: 'Actuar solo si es seguro',
          description:
            'Dejar que los equipos actúen solo después de comprobar la entrada, el lugar y la salida.',
          feedback: 'Los equipos actuarán únicamente mientras puedan entrar y salir con seguridad.',
          consequences: {
            prepared: 'Los equipos aprovechan la zona preparada y conservan una salida segura.'
          }
        },
        'mantener-evaluacion-sin-maniobra': {
          label: 'Esperar y seguir observando',
          description: 'No acercarse si el peligro es mayor que la ayuda que se podría conseguir.',
          feedback: 'Los equipos esperan en un lugar seguro y siguen observando.',
          consequences: {
            prepared: 'Los equipos conservan sus opciones sin entrar en una zona peligrosa.'
          }
        },
        'usar-linea-profesional-no-evaluada': {
          label: 'Entrar sin revisar la zona',
          description: 'Intentar actuar en un lugar que ninguna persona experta ha revisado.',
          feedback: 'No se puede entrar sin saber si el lugar es seguro.',
          blockedReason: 'Primero hay que revisar el lugar y comprobar una salida segura.'
        }
      }
    },
    'crisis-decision-access-blockage': {
      title: 'Camino bloqueado',
      body:
        'El camino ya no permite entrar, girar y salir con seguridad.',
      context:
        'El humo, las ramas y el fuego en los bordes hacen que el camino sea peligroso.',
      advanceLabel: 'Continuar al barranco',
      actions: {
        'despejar-corredor-operativo': {
          label: 'Abrir un paso temporal',
          description: 'Comprobar y abrir un paso corto para los movimientos más necesarios.',
          feedback: 'Hay un paso temporal, pero el camino sigue siendo difícil.',
          consequences: {
            vulnerable: 'Los equipos usan un paso temporal, pero no pueden arreglar ahora todo el camino.'
          }
        },
        'cerrar-acceso-y-reorganizar-medios': {
          label: 'Cerrar el camino y mover los equipos',
          description: 'Cerrar el camino peligroso y llevar los equipos a lugares seguros.',
          feedback: 'El camino queda cerrado y los equipos buscan otro lugar.',
          consequences: {
            vulnerable: 'Los equipos se quedan fuera del camino peligroso.'
          }
        },
        'introducir-maquinaria-sin-repliegue': {
          label: 'Meter vehículos sin salida segura',
          description: 'Enviar vehículos por un camino del que quizá no puedan salir.',
          feedback: 'Los vehículos no pueden entrar sin una salida segura.',
          blockedReason: 'No hay un camino seguro para entrar, girar y salir.'
        },
        'usar-linea-profesional-sin-acceso': {
          label: 'Usar la zona revisada sin camino',
          description: 'Intentar llegar a la zona revisada sin una entrada y una salida seguras.',
          feedback: 'La zona no se puede usar mientras el camino siga bloqueado.',
          blockedReason: 'Una zona revisada tampoco sirve si los equipos no pueden entrar y salir.'
        }
      }
    },
    'crisis-decision-ravine-fire': {
      title: 'Fuego en el barranco',
      body:
        'El fuego entra en un barranco. La pendiente puede hacer que suba muy rápido.',
      context:
        'Los equipos solo pueden acercarse si ven bien el fuego, tienen un lugar seguro y pueden salir.',
      advanceLabel: 'Continuar',
      actions: {
        'asegurar-flancos-y-repliegue': {
          label: 'Proteger los lados y la salida',
          description: 'Trabajar desde los lados del fuego sin perder el camino de salida.',
          feedback: 'Los equipos protegen primero los lados del fuego y su salida.',
          consequences: {
            prepared: 'Los equipos pueden seguir trabajando y mantienen una salida segura.',
            vulnerable: 'Los equipos protegen su salida, pero no pueden quedarse en el barranco.'
          }
        },
        'mantener-ataque-anclado': {
          label: 'Trabajar desde un lugar seguro',
          description: 'Actuar desde un punto conocido con entrada y salida seguras.',
          feedback: 'Los equipos trabajan sin perder su entrada ni su salida.',
          consequences: {
            prepared: 'Los equipos actúan desde un lugar seguro y conservan la salida.'
          }
        },
        'vigilancia-y-proteccion-indirecta': {
          label: 'Vigilar desde fuera',
          description: 'No entrar en el barranco y trabajar desde lugares alejados del fuego.',
          feedback: 'Los equipos vigilan desde fuera para no quedar atrapados.',
          consequences: {
            prepared: 'Los equipos evitan acercarse de más y siguen vigilando.',
            vulnerable: 'Los equipos se protegen porque dentro del barranco no hay un lugar seguro.'
          }
        },
        'ataque-directo-sin-anclaje': {
          label: 'Acercarse sin una salida',
          description: 'Entrar cerca del fuego sin un lugar seguro ni un camino de salida.',
          feedback: 'No se puede acercar a los equipos sin una salida segura.',
          blockedReason: 'El fuego puede subir por el barranco y cortar la salida muy rápido.'
        }
      }
    },
    'crisis-decision-housing-defense': {
      title: 'Proteger las casas',
      body:
        'El fuego se acerca a las casas. Hay que decidir dónde pueden trabajar los equipos sin quedar atrapados.',
      context:
        'Primero se comprueba qué casas tienen camino, espacio alrededor y una salida segura.',
      advanceLabel: 'Ver resultado',
      actions: {
        'defender-desde-posicion-segura': {
          label: 'Proteger desde un lugar seguro',
          description: 'Ayudar en las casas que tienen una entrada y una salida seguras.',
          feedback: 'Los equipos ayudan donde pueden entrar y salir con seguridad.',
          consequences: {
            prepared: 'Los equipos protegen las casas preparadas y conservan una salida.'
          }
        },
        'defensa-selectiva-con-prioridades': {
          label: 'Ayudar primero donde es más seguro',
          description: 'Llevar los equipos a las casas con espacio alrededor y camino de salida.',
          feedback: 'Los equipos se concentran en los lugares donde pueden ayudar sin quedar atrapados.',
          consequences: {
            prepared: 'Los equipos ayudan primero en las casas mejor preparadas.'
          }
        },
        'defensa-total-sin-repliegue': {
          label: 'Intentar proteger todas las casas',
          description: 'Enviar equipos incluso a casas que no tienen una salida segura.',
          feedback: 'No se puede poner a los equipos en peligro para intentar protegerlo todo.',
          blockedReason: 'Algunas casas no tienen espacio ni una salida segura para los equipos.'
        }
      }
    },
    'crisis-decision-crown-fire': {
      title: 'Fuego en las copas de los árboles',
      body:
        'El fuego llega a la parte alta de los árboles y avanza mucho más rápido.',
      context:
        'El calor y las chispas hacen que acercarse sea demasiado peligroso. Lo primero es proteger vidas.',
      advanceLabel: 'Ver resultado',
      actions: {
        'replegar-ante-fuego-de-copas': {
          label: 'Alejarse y proteger vidas',
          description: 'Retirar a los equipos antes de que el fuego corte sus salidas.',
          feedback: 'Los equipos se alejan antes de quedar atrapados.',
          consequences: {
            vulnerable: 'Alejarse protege a los equipos de un fuego demasiado fuerte.'
          }
        },
        'ataque-indirecto-y-vigilancia': {
          label: 'Vigilar desde lejos',
          description: 'Observar el fuego y trabajar solo desde lugares seguros.',
          feedback: 'Los equipos vigilan sin acercarse al fuego de las copas.',
          consequences: {
            vulnerable: 'Vigilar desde lejos protege vidas y evita exponer a los equipos.'
          }
        },
        'sostener-ataque-directo': {
          label: 'Seguir atacando de cerca',
          description: 'Mantener personas cerca de un fuego muy rápido y fuerte.',
          feedback: 'El fuego es demasiado fuerte para seguir atacando de cerca.',
          blockedReason: 'Acercarse al fuego de las copas pondría en peligro a los equipos.'
        },
        'defender-posicion-sin-salida': {
          label: 'Quedarse en un lugar sin salida',
          description: 'Seguir trabajando donde no hay un camino seguro para salir.',
          feedback: 'Ningún lugar es seguro si los equipos no pueden salir.',
          blockedReason: 'Los equipos necesitan siempre una salida segura.'
        }
      }
    },
    'ending-result-causal-report': {
      title: 'Así cambiaron tus decisiones la partida',
      body: 'Mira qué preparaste, qué ocurrió durante el incendio y qué resultado tuvo.',
      advanceLabel: 'Terminar la partida',
      variants: {
        contained: {
          title: 'Incendio contenido',
          summary:
            'La preparación dejó caminos, salidas y lugares desde los que los equipos pudieron actuar.',
          closing:
            'Prepararse ayuda mucho, pero ningún lugar queda totalmente seguro ante un incendio real.'
        },
        overwhelmed: {
          title: 'Incendio demasiado fuerte',
          summary:
            'Algunas mejoras ayudaron, pero faltaron caminos o lugares seguros para los equipos.',
          closing:
            'Una mejora puede ayudar, pero otras tareas pendientes pueden seguir causando mucho peligro.'
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
