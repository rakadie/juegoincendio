import type { ScenarioI18nCatalog } from '../scenario-i18n.js';

export const scenarioI18nEs = {
  "locale": "es",
  "namespace": "scenarios",
  "scenarios": {
    "s-000-introduccion": {
      "title": "Introducción: Apaga las llamas",
      "estimatedTime": "2 min",
      "tags": [
        "comunicacion"
      ],
      "context": "Los medios de extinción son cada vez más efectivos. Son capaces de frenar los conatos que se declaran cada año en nuestras áreas forestales. Sin embargo, cuando esto no se produce, cuando las llamas avanzan y no se frenan, el fuego se convierte en un incendio voraz. El abandono del campo, el cambio climático y la falta de prevención convierten nuestros montes en un auténtico polvorín.\n\nEste juego quiere contribuir a la concienciación y comprensión del trabajo que debe realizarse para disminuir las consecuencias de los incendios.\n\nSi quieres descubrir más, entra y ¡Apaga las llamas!",
      "briefing": "Los medios de extinción son cada vez más efectivos. Son capaces de frenar los conatos que se declaran cada año en nuestras áreas forestales. Sin embargo, cuando esto no se produce, cuando las llamas avanzan y no se frenan, el fuego se convierte en un incendio voraz. El abandono del campo, el cambio climático y la falta de prevención convierten nuestros montes en un auténtico polvorín.\n\nEste juego quiere contribuir a la concienciación y comprensión del trabajo que debe realizarse para disminuir las consecuencias de los incendios.\n\nSi quieres descubrir más, entra y ¡Apaga las llamas!",
      "options": {
        "a": {
          "text": "Entrar al simulador y comenzar",
          "rationale": "Permite iniciar el recorrido de aprendizaje y toma de decisiones sobre prevención y respuesta.",
          "shortFeedback": "Permite iniciar el recorrido de aprendizaje y toma de decisiones sobre prevención y respuesta."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-000b-avatar-emergencias": {
      "title": "Avatar de responsable de emergencias",
      "estimatedTime": "2 min",
      "tags": [
        "comunicacion"
      ],
      "context": "Eres la persona responsable del Servicio de Emergencias. Ponte cara.",
      "briefing": "Eres la persona responsable del Servicio de Emergencias. Ponte cara.",
      "options": {
        "a": {
          "text": "Bombero forestal",
          "rationale": "Personaliza tu perfil para iniciar la experiencia de juego.",
          "shortFeedback": "Personaliza tu perfil para iniciar la experiencia de juego."
        },
        "b": {
          "text": "Bombera forestal",
          "rationale": "Personaliza tu perfil para iniciar la experiencia de juego.",
          "shortFeedback": "Personaliza tu perfil para iniciar la experiencia de juego."
        },
        "c": {
          "text": "Perfil forestal neutro",
          "rationale": "Personaliza tu perfil para iniciar la experiencia de juego.",
          "shortFeedback": "Personaliza tu perfil para iniciar la experiencia de juego."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-000c-contexto-prevencion-otono": {
      "title": "Contexto inicial de prevención",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion"
      ],
      "context": "Los inviernos están siendo secos. Ya no son lo que eran. Los montes y zonas rurales han perdido el verdor de otras épocas por la falta de lluvias. Esto significa que aumenta el riesgo de un gran incendio. Tus Servicios de Emergencias están preparados para actuar, y lo hacen cada vez mejor. Están evitando muchas catástrofes, pero cuando las hay, sin unos terrenos en buen estado, se desencadena una tragedia. Este otoño, decides comenzar tu plan de prevención. Por tu experiencia, debes preparar un plan de acción.",
      "options": {
        "a": {
          "text": "Continuar",
          "rationale": "Permite avanzar al siguiente cuadro del escenario.",
          "shortFeedback": "Permite avanzar al siguiente cuadro del escenario."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-000d-quemas-prescritas-otono": {
      "title": "Planificación de quemas prescritas",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion"
      ],
      "context": "Este otoño estás pensando en realizar algunas quemas prescritas. Sabes que hay zonas que pueden tener acumulación de combustible vegetal que alimentarán la intensidad de las llamas en caso de incendio. ¿Qué decisión tomas?",
      "question": "¿Qué decisión tomas?",
      "briefing": "Este otoño estás pensando en realizar algunas quemas prescritas. Sabes que hay zonas que pueden tener acumulación de combustible vegetal que alimentarán la intensidad de las llamas en caso de incendio. ¿Qué decisión tomas?",
      "options": {
        "a": {
          "text": "Planificar algunas quemas controladas en invierno que realizará el equipo de Emergencias",
          "rationale": "Prioriza la ventana estacional más segura y la ejecución por personal preparado, reduciendo el riesgo de escape.",
          "shortFeedback": "Prioriza la ventana estacional más segura y la ejecución por personal preparado, reduciendo el riesgo de escape."
        },
        "b": {
          "text": "Permitir solo pequeñas quemas realizadas por vecinos para limpiar sus parcelas",
          "rationale": "Aunque sean pequeñas, sin un dispositivo técnico completo aumentan la variabilidad del riesgo y la probabilidad de incidentes.",
          "shortFeedback": "Aunque sean pequeñas, sin un dispositivo técnico completo aumentan la variabilidad del riesgo y la probabilidad de incidentes."
        },
        "c": {
          "text": "El año pasado ya hiciste quemas. Decides finalmente que la vegetación acumulada sirva de alimento a los animales.",
          "rationale": "Es una alternativa v?lida si se organiza como pastoreo o aprovechamiento controlado del combustible vegetal, aunque requiere seguimiento para no dejar zonas sin tratar.",
          "shortFeedback": "Es una alternativa v?lida si se organiza como pastoreo o aprovechamiento controlado del combustible vegetal, aunque requiere seguimiento para no dejar zonas sin tratar."
        },
        "d": {
          "text": "Realizar quemas durante la temporada seca para eliminar rápidamente el combustible.",
          "rationale": "Es la opción de mayor exposición al riesgo: condiciones secas y mayor probabilidad de propagación rápida.",
          "shortFeedback": "Es la opción de mayor exposición al riesgo: condiciones secas y mayor probabilidad de propagación rápida."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-008-campana-sector-primario": {
      "title": "Campaña de comunicación sector primario",
      "estimatedTime": "2 min",
      "tags": [
        "comunicacion"
      ],
      "context": "Debes activar mensajes de campaña sobre consumo local y sostenibilidad territorial.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Debes activar mensajes de campaña sobre consumo local y sostenibilidad territorial.",
      "options": {
        "a": {
          "text": "Promover consumo local para reforzar economía y paisaje gestionado",
          "rationale": "Favorece resiliencia territorial y continuidad de actividades rurales.",
          "shortFeedback": "Favorece resiliencia territorial y continuidad de actividades rurales."
        },
        "b": {
          "text": "Priorizar siempre producto exterior si es más barato",
          "rationale": "Debilita la cadena de valor local en el medio rural.",
          "shortFeedback": "Debilita la cadena de valor local en el medio rural."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-002b-asesoramiento-terrenos": {
      "title": "Asesoramiento sobre terrenos colindantes",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion"
      ],
      "context": "En la finca de al lado te encuentras a otro vecino. Tiene varios terrenos y no sabe qué hacer con ellos. ¿Qué le aconsejas?",
      "question": "¿Qué decisión tomas?",
      "briefing": "En la finca de al lado te encuentras a otro vecino. Tiene varios terrenos y no sabe qué hacer con ellos. ¿Qué le aconsejas?",
      "options": {
        "a": {
          "text": "Que plante la vegetación que le guste alrededor de las zonas urbanas",
          "rationale": "Plantar sin diseño preventivo en interfaz urbano-forestal puede aumentar la continuidad del combustible.",
          "shortFeedback": "Plantar sin diseño preventivo en interfaz urbano-forestal puede aumentar la continuidad del combustible."
        },
        "b": {
          "text": "Que hable con los ganaderos del municipio para que sus animales limpien el terreno de malas hierbas cuando lo necesite",
          "rationale": "El pastoreo controlado ayuda a reducir la carga de combustible y mejora el mantenimiento periódico.",
          "shortFeedback": "El pastoreo controlado ayuda a reducir la carga de combustible y mejora el mantenimiento periódico."
        },
        "c": {
          "text": "Que si no quiere plantar, que deje crecer las plantas para que el terreno esté bonito",
          "rationale": "El crecimiento sin gestión preventiva puede elevar el riesgo de propagación del incendio.",
          "shortFeedback": "El crecimiento sin gestión preventiva puede elevar el riesgo de propagación del incendio."
        },
        "d": {
          "text": "Que arriende los terrenos para uso agrícola",
          "rationale": "Un uso agrícola planificado evita el abandono del terreno y favorece su gestión continuada.",
          "shortFeedback": "Un uso agrícola planificado evita el abandono del terreno y favorece su gestión continuada."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-013-simulacro-escolar": {
      "title": "Nueva variable: simulacros en centros educativos",
      "estimatedTime": "2 min",
      "tags": [
        "comunicacion"
      ],
      "context": "Se propone realizar simulacros escolares trimestrales para mejorar cultura preventiva.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Se propone realizar simulacros escolares trimestrales para mejorar cultura preventiva.",
      "options": {
        "a": {
          "text": "Implantar simulacro con guion de autoprotección y coordinación municipal",
          "rationale": "Aumenta preparación comunitaria intergeneracional.",
          "shortFeedback": "Aumenta preparación comunitaria intergeneracional."
        },
        "b": {
          "text": "Posponer indefinidamente por carga administrativa",
          "rationale": "Se pierde oportunidad de entrenamiento en calma.",
          "shortFeedback": "Se pierde oportunidad de entrenamiento en calma."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-004-quemas-agricolas": {
      "title": "Gestión de quemas agrícolas",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion"
      ],
      "context": "En tu visita al municipio un vecino te pregunta cómo gestionar una quema agrícola de forma legal y segura. ¿Qué consejo le darías?",
      "question": "¿Qué decisión tomas?",
      "briefing": "En tu visita al municipio un vecino te pregunta cómo gestionar una quema agrícola de forma legal y segura. ¿Qué consejo le darías?",
      "options": {
        "a": {
          "text": "Solicitar autorización y confirmar que no existe prohibición activa por riesgo meteorológico",
          "rationale": "Es un paso v?lido y necesario, aunque debe completarse con medidas operativas antes de encender la quema.",
          "shortFeedback": "Es un paso v?lido y necesario, aunque debe completarse con medidas operativas antes de encender la quema."
        },
        "b": {
          "text": "Realizarla solo en horario autorizado, con perímetro limpio y medios de extinción preparados",
          "rationale": "Es una opci?n v?lida como parte del protocolo, pero necesita vigilancia hasta la extinci?n total y suspensi?n si cambian las condiciones.",
          "shortFeedback": "Es una opci?n v?lida como parte del protocolo, pero necesita vigilancia hasta la extinci?n total y suspensi?n si cambian las condiciones."
        },
        "c": {
          "text": "Comunicar inicio y fin a la autoridad competente cuando proceda y mantener vigilancia hasta extinción total",
          "rationale": "Aporta trazabilidad y seguridad. Es v?lida, aunque debe ir acompa?ada de autorizaci?n, revisi?n meteorol?gica y preparaci?n del per?metro.",
          "shortFeedback": "Aporta trazabilidad y seguridad. Es v?lida, aunque debe ir acompa?ada de autorizaci?n, revisi?n meteorol?gica y preparaci?n del per?metro."
        },
        "d": {
          "text": "Aplicar protocolo completo: autorización previa, revisión meteorológica, horario permitido, perímetro limpio, medios de extinción, vigilancia continua y suspensión inmediata si cambian las condiciones",
          "rationale": "Integra requisitos administrativos y operativos para minimizar ignición y propagación.",
          "shortFeedback": "Integra requisitos administrativos y operativos para minimizar ignición y propagación."
        },
        "e": {
          "text": "Hacerla al atardecer, aunque no tengas autorización, si el terreno está húmedo",
          "rationale": "Aunque haya humedad puntual, incumple normativa y mantiene riesgo de escape.",
          "shortFeedback": "Aunque haya humedad puntual, incumple normativa y mantiene riesgo de escape."
        },
        "f": {
          "text": "Quemar restos en cualquier época si hay una manguera cerca",
          "rationale": "Normaliza prácticas inseguras y fuera de protocolo.",
          "shortFeedback": "Normaliza prácticas inseguras y fuera de protocolo."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-005-recoleccion-monte": {
      "title": "Recogida de pinocha, leña, caña y forraje",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion"
      ],
      "context": "Te llega otra consulta sobre la recolección de material vegetal y aprovechamientos. Se dice por ahí que no es posible cogerla.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Te llega otra consulta sobre la recolección de material vegetal y aprovechamientos. Se dice por ahí que no es posible cogerla.",
      "options": {
        "a": {
          "text": "Pueden recoger pinocha en cualquier lugar para limpiar el monte",
          "rationale": "Recoger sin autorización y sin zonificación puede generar riesgo y conflictos normativos.",
          "shortFeedback": "Recoger sin autorización y sin zonificación puede generar riesgo y conflictos normativos."
        },
        "b": {
          "text": "Pueden recoger pinocha en los márgenes de las carreteras",
          "rationale": "Los márgenes viarios tienen condicionantes de seguridad y titularidad que requieren permiso.",
          "shortFeedback": "Los márgenes viarios tienen condicionantes de seguridad y titularidad que requieren permiso."
        },
        "c": {
          "text": "Puede coger leña en cualquier lugar, así evitan que haya material combustible",
          "rationale": "La retirada indiscriminada no sustituye la gestión autorizada y puede afectar al ecosistema.",
          "shortFeedback": "La retirada indiscriminada no sustituye la gestión autorizada y puede afectar al ecosistema."
        },
        "d": {
          "text": "Puede recoger leña con autorización",
          "rationale": "La autorización permite control técnico, trazabilidad y condiciones de seguridad.",
          "shortFeedback": "La autorización permite control técnico, trazabilidad y condiciones de seguridad."
        },
        "e": {
          "text": "Puede recoger caña en cualquier lugar para evitar la propagación de las llamas",
          "rationale": "Aunque la caña influye en la continuidad del combustible, su retirada exige criterios y autorización.",
          "shortFeedback": "Aunque la caña influye en la continuidad del combustible, su retirada exige criterios y autorización."
        },
        "f": {
          "text": "Puede recoger caña en los cauces de barranco",
          "rationale": "Los cauces tienen regulación específica y riesgo hidrológico, por lo que no procede sin permiso.",
          "shortFeedback": "Los cauces tienen regulación específica y riesgo hidrológico, por lo que no procede sin permiso."
        },
        "g": {
          "text": "Puede recoger forraje en cualquier sitio, así ayuda a la limpieza de los terrenos",
          "rationale": "La recogida sin autorización puede incumplir normativa de uso y conservación.",
          "shortFeedback": "La recogida sin autorización puede incumplir normativa de uso y conservación."
        },
        "h": {
          "text": "Pueden recoger forraje con autorización",
          "rationale": "La autorización ordena el aprovechamiento y mejora la seguridad en labores de recolección.",
          "shortFeedback": "La autorización ordena el aprovechamiento y mejora la seguridad en labores de recolección."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-039-uso-maquinaria-epoca-riesgo": {
      "title": "Uso de maquinaria en época de riesgo",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion",
        "maquinaria",
        "desbroce",
        "radial",
        "chispas",
        "alerta-oficial",
        "calor",
        "viento",
        "autoproteccion"
      ],
      "context": "Antes de la época de mayor riesgo de incendios, estás visitando varios municipios para hablar con vecinos y responsables municipales sobre prevención. Durante una charla, un vecino comenta que necesita usar maquinaria en su terreno cuando le haga falta, aunque haga calor intenso. Dice que siempre tiene cuidado y que, si pasa algo, tiene una manguera cerca.",
      "question": "¿Qué le indicas sobre el uso de maquinaria en terrenos próximos al monte?",
      "briefing": "El uso de maquinaria puede provocar igniciones, especialmente en días de calor, viento, baja humedad o presencia de vegetación seca. Herramientas como radiales, desbrozadoras, motosierras o maquinaria agrícola pueden generar chispas, contacto caliente o fricción suficiente para iniciar un fuego. La recomendación debe ser clara: evitar trabajos de riesgo en horas de calor, no usar maquinaria si hay alerta oficial o restricciones activas, preparar previamente la zona, humedecer el entorno si procede y contar con medios de primera intervención, como agua o extintor. Tener cuidado es importante, pero no basta. En prevención de incendios, el “yo controlo” es una frase muy peligrosa cuando hay viento, rastrojo seco y una radial con complejo de dragón.",
      "options": {
        "a": {
          "text": "Puede cortar con una radial en el jardín cuando lo necesite, siempre que esté atento.",
          "rationale": "Respuesta incorrecta. La radial puede generar chispas capaces de prender vegetación seca o restos combustibles. Estar atento ayuda, pero no elimina el riesgo si se trabaja con calor, viento o material seco cerca.",
          "shortFeedback": "Respuesta incorrecta. La radial puede generar chispas capaces de prender vegetación seca o restos combustibles. Estar atento ayuda, pero no elimina el riesgo si se trabaja con calor, viento o material seco cerca."
        },
        "b": {
          "text": "Puede cortar con una radial en un patio solo si evita las horas de calor, despeja el entorno, humedece la zona si procede y tiene agua o extintor preparado.",
          "rationale": "Respuesta aceptable con matices. Un patio puede reducir parte del riesgo si no hay vegetaci?n ni materiales combustibles cerca, pero no autoriza el trabajo si hay alerta, viento o restricciones activas.",
          "shortFeedback": "Respuesta aceptable con matices. Un patio puede reducir parte del riesgo si no hay vegetaci?n ni materiales combustibles cerca, pero no autoriza el trabajo si hay alerta, viento o restricciones activas."
        },
        "c": {
          "text": "Puede desbrozar lo que quiera mientras sea en su terreno.",
          "rationale": "Respuesta incorrecta. Que el terreno sea suyo no cambia las condiciones de riesgo. Una desbrozadora puede provocar igniciones por contacto con piedras, metal, material seco o por calentamiento de la maquinaria.",
          "shortFeedback": "Respuesta incorrecta. Que el terreno sea suyo no cambia las condiciones de riesgo. Una desbrozadora puede provocar igniciones por contacto con piedras, metal, material seco o por calentamiento de la maquinaria."
        },
        "d": {
          "text": "Puede realizar trabajos de desbroce solo con medidas preventivas estrictas: evitar horas de calor, trabajar preferentemente de madrugada o primera hora, humedecer previamente la zona si es posible, tener agua o extintor a mano y no hacerlo nunca si existe alerta oficial, prohibición o condiciones meteorológicas desfavorables.",
          "rationale": "Respuesta adecuada. La manguera ayuda, pero no es suficiente por sí sola. La prevención real combina horario seguro, reducción de material seco, humedad previa, medios de primera respuesta y respeto absoluto a alertas o restricciones oficiales.",
          "shortFeedback": "Respuesta adecuada. La manguera ayuda, pero no es suficiente por sí sola. La prevención real combina horario seguro, reducción de material seco, humedad previa, medios de primera respuesta y respeto absoluto a alertas o restricciones oficiales."
        },
        "e": {
          "text": "Puede usar maquinaria en cualquier momento si ya ha limpiado la finca anteriormente.",
          "rationale": "Respuesta incorrecta. Haber limpiado la finca reduce combustible, pero no autoriza trabajos de riesgo en cualquier condición. Con calor, viento o alerta activa, una chispa puede encontrar combustible incluso en zonas aparentemente controladas.",
          "shortFeedback": "Respuesta incorrecta. Haber limpiado la finca reduce combustible, pero no autoriza trabajos de riesgo en cualquier condición. Con calor, viento o alerta activa, una chispa puede encontrar combustible incluso en zonas aparentemente controladas."
        }
      },
      "sourceNotes": {
        "note-001": "El uso de maquinaria en zonas próximas al monte puede generar chispas, fricción o calor suficiente para iniciar un incendio si hay vegetación seca.",
        "note-002": "Las medidas preventivas deben combinar horario de menor riesgo, humedecimiento previo si procede, medios de primera intervención y respeto a alertas o restricciones oficiales.",
        "note-003": "Tener una manguera cerca reduce el riesgo, pero no sustituye la planificación ni autoriza trabajos peligrosos en condiciones meteorológicas desfavorables."
      }
    },
    "s-006-hogueras-monte": {
      "title": "Hogueras o barbacoas en entorno forestal",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion"
      ],
      "context": "Otra de las dudas que circulan es si es posible hacer hogueras o barbacoas en el monte.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Otra de las dudas que circulan es si es posible hacer hogueras o barbacoas en el monte.",
      "options": {
        "a": {
          "text": "Sí, si la zona está limpia aunque haga calor o sea verano",
          "rationale": "La limpieza del entorno no sustituye la restricción por riesgo alto en periodos críticos.",
          "shortFeedback": "La limpieza del entorno no sustituye la restricción por riesgo alto en periodos críticos."
        },
        "b": {
          "text": "Si estamos de acampada, en una zona limpia de matorral",
          "rationale": "La acampada no habilita por sí sola el uso de fuego en entorno forestal.",
          "shortFeedback": "La acampada no habilita por sí sola el uso de fuego en entorno forestal."
        },
        "c": {
          "text": "Solo en las zonas autorizadas",
          "rationale": "Es condición necesaria, pero también deben cumplirse las condiciones meteorológicas y normativas vigentes.",
          "shortFeedback": "Es condición necesaria, pero también deben cumplirse las condiciones meteorológicas y normativas vigentes."
        },
        "d": {
          "text": "Solo es posible en otoño e invierno",
          "rationale": "La autorización no depende únicamente de la estación, sino del riesgo y de la regulación activa.",
          "shortFeedback": "La autorización no depende únicamente de la estación, sino del riesgo y de la regulación activa."
        },
        "e": {
          "text": "Solo en zonas autorizadas y si las condiciones meteorológicas lo permiten",
          "rationale": "Es la opción más segura y alineada con prevención y control de igniciones.",
          "shortFeedback": "Es la opción más segura y alineada con prevención y control de igniciones."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-007-evacuacion-ciudadania": {
      "title": "¿Qué hacer si se declara un incendio?",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion"
      ],
      "context": "Durante esta visita surge otra duda. Muchos vecinos no saben qué deben hacer si se declara un incendio cerca de su municipio.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Durante esta visita surge otra duda. Muchos vecinos no saben qué deben hacer si se declara un incendio cerca de su municipio.",
      "options": {
        "a": {
          "text": "Regar mi terreno antes de que lleguen las llamas",
          "rationale": "Puede exponer a la persona en un momento crítico y generar una falsa sensación de control.",
          "shortFeedback": "Puede exponer a la persona en un momento crítico y generar una falsa sensación de control."
        },
        "c": {
          "text": "Salir de mi vivienda y acudir a una zona alta para saber por dónde va el fuego",
          "rationale": "Buscar visibilidad del incendio desde zonas expuestas aumenta el riesgo personal.",
          "shortFeedback": "Buscar visibilidad del incendio desde zonas expuestas aumenta el riesgo personal."
        },
        "d": {
          "text": "Salir lo antes posible de mi vivienda, tal y como leo en una cadena de Wassap",
          "rationale": "Aumenta caos y exposición por desinformación.",
          "shortFeedback": "Aumenta caos y exposición por desinformación."
        },
        "e": {
          "text": "Esperar indicaciones de las autoridades antes de evacuar",
          "rationale": "Evita movimientos descoordinados y mejora seguridad colectiva.",
          "shortFeedback": "Evita movimientos descoordinados y mejora seguridad colectiva."
        },
        "b": {
          "text": "Retirar enseres que estén cerca de puertas y ventanas, y cerrar contraventanas.",
          "rationale": "Reduce la exposición de elementos vulnerables y mejora la autoprotección básica de la vivienda.",
          "shortFeedback": "Reduce la exposición de elementos vulnerables y mejora la autoprotección básica de la vivienda."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-014-red-agua-rural": {
      "title": "Puntos de agua rurales",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion"
      ],
      "context": "Tras campaña de evaluación, se detectan carencias de hidrantes y balsas para primera intervención.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Tras campaña de evaluación, se detectan carencias de hidrantes y balsas para primera intervención.",
      "options": {
        "a": {
          "text": "Plan municipal para señalizar y mantener puntos de agua estratégicos",
          "rationale": "Refuerza respuesta temprana y logística en zonas dispersas.",
          "shortFeedback": "Refuerza respuesta temprana y logística en zonas dispersas."
        },
        "b": {
          "text": "Dejar el mantenimiento para actuaciones puntuales",
          "rationale": "Mantiene vulnerabilidad estructural del territorio.",
          "shortFeedback": "Mantiene vulnerabilidad estructural del territorio."
        },
        "c": {
          "text": "Crear nuevas balsas de agua y mejorar los accesos para vehículos de emergencia",
          "rationale": "Aumenta disponibilidad hídrica y reduce tiempos de acceso en primera respuesta.",
          "shortFeedback": "Aumenta disponibilidad hídrica y reduce tiempos de acceso en primera respuesta."
        },
        "d": {
          "text": "Llegado el momento las brigadas pueden encontrar agua en charcos o estanques cercanos",
          "rationale": "Depender de puntos no garantizados ni preparados puede fallar en momentos críticos.",
          "shortFeedback": "Depender de puntos no garantizados ni preparados puede fallar en momentos críticos."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-035-limpieza-alrededor-viviendas": {
      "title": "Limpieza alrededor de viviendas",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion",
        "autoproteccion",
        "interfaz-urbano-forestal",
        "viviendas",
        "edificios-publicos",
        "franja-seguridad",
        "limpieza-vegetacion",
        "poda",
        "aclareo"
      ],
      "context": "Antes de que llegue la época de mayor riesgo de incendios, estás visitando varios municipios para hablar con vecinos y responsables municipales sobre medidas preventivas. En las reuniones se detecta una preocupación común: muchas viviendas, edificios públicos y parcelas próximas al monte tienen vegetación seca, restos de poda, leña, muebles exteriores o materiales inflamables demasiado cerca de fachadas, ventanas, tejados y accesos. También hay zonas con árboles sin aclarar, copas que se tocan entre sí y ramas bajas que pueden facilitar que el fuego suba desde el suelo hasta las copas. Como responsable de Emergencias, debes dar una recomendación clara, sencilla y aplicable antes de que empiece la fase de mayor riesgo.",
      "question": "¿Qué instrucciones das sobre la limpieza mínima alrededor de viviendas y edificios públicos?",
      "briefing": "La prevención empieza antes de que haya humo en el horizonte. En las zonas de interfaz urbano-forestal, la limpieza del entorno de viviendas y edificios públicos puede reducir el riesgo de ignición, facilitar el trabajo de los equipos de emergencia y mejorar las posibilidades de defensa si se produce un incendio. Durante las visitas municipales, explicas que el peligro no viene solo del frente de llamas. Las pavesas, el calor radiante y la continuidad de la vegetación pueden hacer que una vivienda arda aunque la llama no llegue directamente a tocarla. La recomendación debe ser concreta: establecer una franja mínima de seguridad, retirar materiales inflamables próximos a la edificación, mantener accesos despejados y reducir la continuidad del combustible tanto en el suelo como en la vegetación alta. También es importante dejar claro que estas tareas deben hacerse antes de la época de mayor riesgo. Cuando el incendio ya está cerca, la prioridad no es limpiar, podar ni improvisar defensas, sino seguir las instrucciones de evacuación o confinamiento de los servicios de emergencia.",
      "options": {
        "a": {
          "text": "Recomendar una franja mínima de limpieza de al menos 15 metros y, siempre que sea posible, ampliarla hasta 30 metros alrededor de viviendas y edificios públicos, retirando matorral seco, restos vegetales, leña, muebles exteriores y otros materiales inflamables próximos a fachadas, ventanas, tejados y accesos.",
          "rationale": "Respuesta adecuada. Una franja de seguridad de al menos 15 metros, ampliable hasta 30 cuando el terreno lo permita, reduce la carga de combustible cerca de la edificación y facilita la defensa si se produce un incendio. No hace milagros, pero evita ponerle una alfombra roja al fuego.",
          "shortFeedback": "Respuesta adecuada. Una franja de seguridad de al menos 15 metros, ampliable hasta 30 cuando el terreno lo permita, reduce la carga de combustible cerca de la edificación y facilita la defensa si se produce un incendio. No hace milagros, pero evita ponerle una alfombra roja al fuego."
        },
        "b": {
          "text": "Limitar la limpieza a los dos o tres metros más próximos a la fachada, porque es la única zona que realmente puede afectar a la vivienda.",
          "rationale": "Respuesta incorrecta. Limpiar solo el borde inmediato de la casa es insuficiente en zona de interfaz urbano-forestal. El fuego, las pavesas y el calor radiante no se detienen en la jardinera.",
          "shortFeedback": "Respuesta incorrecta. Limpiar solo el borde inmediato de la casa es insuficiente en zona de interfaz urbano-forestal. El fuego, las pavesas y el calor radiante no se detienen en la jardinera."
        },
        "c": {
          "text": "Además de limpiar el entorno, recomendar el aclareo y poda de árboles: separar las copas unos tres metros entre sí y cortar las ramas bajas hasta unos tres metros de altura para reducir la continuidad del fuego entre el suelo y las copas.",
          "rationale": "Respuesta adecuada. No basta con retirar combustible del suelo. Si las copas se tocan o las ramas bajas conectan con el matorral, el fuego puede subir y avanzar por las alturas con mucha más intensidad.",
          "shortFeedback": "Respuesta adecuada. No basta con retirar combustible del suelo. Si las copas se tocan o las ramas bajas conectan con el matorral, el fuego puede subir y avanzar por las alturas con mucha más intensidad."
        },
        "d": {
          "text": "Recomendar que la limpieza se haga solo cuando haya aviso de incendio cercano, para evitar trabajos innecesarios durante el resto del año.",
          "rationale": "Respuesta incorrecta. La limpieza debe hacerse antes de la emergencia. Cuando el frente está cerca, ponerse a podar o retirar leña no es prevención: es tentar a la estadística con una desbrozadora.",
          "shortFeedback": "Respuesta incorrecta. La limpieza debe hacerse antes de la emergencia. Cuando el frente está cerca, ponerse a podar o retirar leña no es prevención: es tentar a la estadística con una desbrozadora."
        },
        "e": {
          "text": "Centrar la recomendación únicamente en mojar la vegetación cercana a las viviendas cuando se vea humo en la zona.",
          "rationale": "Respuesta incorrecta. Mojar puede ayudar puntualmente si hay tiempo y agua, pero no sustituye la gestión del combustible. La defensa empieza mucho antes: limpiar, separar, podar y retirar materiales inflamables.",
          "shortFeedback": "Respuesta incorrecta. Mojar puede ayudar puntualmente si hay tiempo y agua, pero no sustituye la gestión del combustible. La defensa empieza mucho antes: limpiar, separar, podar y retirar materiales inflamables."
        }
      },
      "sourceNotes": {
        "note-001": "La limpieza preventiva alrededor de viviendas y edificios públicos reduce la carga de combustible y facilita la defensa en zonas de interfaz urbano-forestal.",
        "note-002": "La recomendación operativa combina una franja mínima de limpieza de al menos 15 metros, ampliable hasta 30 metros cuando sea posible, con retirada de materiales inflamables próximos a la edificación.",
        "note-003": "La separación entre copas y la poda de ramas bajas ayudan a reducir la continuidad del combustible y dificultan que el fuego pase del suelo a las copas.",
        "note-004": "Estas tareas deben realizarse antes de la época de mayor riesgo; durante una emergencia la prioridad es seguir las instrucciones oficiales de evacuación o confinamiento."
      }
    },
    "s-038-eleccion-vegetacion-finca": {
      "title": "Elección de vegetación tras limpiar la finca",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion",
        "autoproteccion",
        "vegetacion",
        "finca",
        "monte",
        "verodes",
        "tabaibas",
        "bejeques",
        "cactus",
        "discontinuidad-combustible"
      ],
      "context": "Antes de la época de mayor riesgo de incendios, estás visitando varios municipios para hablar con vecinos y responsables municipales sobre medidas preventivas. En una de esas reuniones, un vecino explica que ya ha limpiado parte de su finca, situada cerca del monte, y pregunta qué plantas serían más adecuadas para replantar sin aumentar el riesgo de incendio. La cuestión no es solo estética. La vegetación que se elija puede reducir o aumentar la continuidad del combustible alrededor de la vivienda.",
      "question": "¿Qué vegetación recomiendas para replantar una finca en zona de riesgo?",
      "briefing": "Después de limpiar la finca, el vecino quiere replantar parte del terreno. Como responsable de Emergencias, debes dar una recomendación clara: evitar especies que generen mucha continuidad vegetal, acumulen material seco o formen masas densas cerca de la vivienda. Conviene priorizar vegetación de bajo porte, bien separada, mantenida y con menor carga de combustible. En Canarias, especies suculentas como verodes, tabaibas, bejeques o algunos cactus pueden ser una opción interesante si se plantan con diseño preventivo, porque no suelen generar la misma continuidad de combustible que setos densos, cañaverales o trepadoras sin control. Pero la clave no es llenar la finca de plantas “resistentes al fuego” y olvidarse. Hay que mantener separación entre ejemplares, evitar que la vegetación toque fachadas, retirar hojas secas y podas, y no crear continuidad entre el suelo, los arbustos y las copas.",
      "options": {
        "a": {
          "text": "Recomendar especies suculentas y de bajo porte propias o bien adaptadas al entorno, como verodes, tabaibas, bejeques o cactus, plantadas con separación, sin formar masas continuas y retirando siempre restos secos.",
          "rationale": "Respuesta adecuada. No se trata de buscar plantas mágicas, sino vegetación con menor carga de combustible y bien diseñada. Separación, mantenimiento y discontinuidad son tan importantes como la especie elegida.",
          "shortFeedback": "Respuesta adecuada. No se trata de buscar plantas mágicas, sino vegetación con menor carga de combustible y bien diseñada. Separación, mantenimiento y discontinuidad son tan importantes como la especie elegida."
        },
        "b": {
          "text": "Replantar con bambú para crear una barrera verde densa alrededor de la finca.",
          "rationale": "Respuesta incorrecta. El bambú puede formar masas densas, generar continuidad vegetal y acumular material seco. Como pantalla verde queda estupendo; como estrategia contra incendios, bastante menos.",
          "shortFeedback": "Respuesta incorrecta. El bambú puede formar masas densas, generar continuidad vegetal y acumular material seco. Como pantalla verde queda estupendo; como estrategia contra incendios, bastante menos."
        },
        "c": {
          "text": "Combinar vegetación de bajo combustible con diseño preventivo: plantas separadas, sin tocar fachadas, sin continuidad entre matorral y copas, y con mantenimiento regular de podas y hojas secas.",
          "rationale": "Respuesta adecuada. La prevención depende del diseño completo de la finca. Una planta razonable, mal colocada y sin mantenimiento, puede acabar comportándose como combustible.",
          "shortFeedback": "Respuesta adecuada. La prevención depende del diseño completo de la finca. Una planta razonable, mal colocada y sin mantenimiento, puede acabar comportándose como combustible."
        },
        "d": {
          "text": "Colocar palmeras, buganvillas o trepadoras densas junto a muros, porches y fachadas para dar sombra y proteger la vivienda.",
          "rationale": "Respuesta incorrecta. Las trepadoras y vegetación densa pegada a la casa pueden conectar el fuego con muros, porches, cubiertas y ventanas. Dar sombra está bien; darle una escalera al fuego, no tanto.",
          "shortFeedback": "Respuesta incorrecta. Las trepadoras y vegetación densa pegada a la casa pueden conectar el fuego con muros, porches, cubiertas y ventanas. Dar sombra está bien; darle una escalera al fuego, no tanto."
        },
        "e": {
          "text": "Replantar helechos, hibiscos o matorral ornamental en masa, dejando que cubran rápido el suelo para que la finca se vea verde cuanto antes.",
          "rationale": "Respuesta incorrecta. La vegetación densa y continua puede convertirse en combustible fino si se seca o no se mantiene. Una finca verde no siempre es una finca segura.",
          "shortFeedback": "Respuesta incorrecta. La vegetación densa y continua puede convertirse en combustible fino si se seca o no se mantiene. Una finca verde no siempre es una finca segura."
        }
      },
      "sourceNotes": {
        "note-001": "La elección de vegetación en zonas próximas al monte debe reducir la continuidad del combustible y evitar masas densas junto a viviendas.",
        "note-002": "Las especies suculentas y de bajo porte pueden ser útiles si se plantan con separación, mantenimiento y retirada periódica de restos secos.",
        "note-003": "El diseño preventivo de la finca debe evitar que la vegetación toque fachadas, porches, cubiertas o ventanas, y debe romper la continuidad entre suelo, arbustos y copas.",
        "note-004": "No existen plantas mágicas frente al fuego: la especie, la ubicación, la separación y el mantenimiento determinan el riesgo real."
      }
    },
    "s-036-defensa-pasiva-vivienda": {
      "title": "Defensa pasiva de la vivienda",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion",
        "autoproteccion",
        "vivienda",
        "defensa-pasiva",
        "pavesas",
        "tejados",
        "canalones",
        "mallas-matachispas",
        "ventilacion",
        "porches"
      ],
      "context": "Antes de la época de mayor riesgo de incendios, estás realizando sesiones informativas con vecinos de municipios próximos al monte. Tras hablar de limpieza exterior y franjas de seguridad, surge una cuestión importante: muchas viviendas tienen tejados, canalones, chimeneas, respiraderos, porches o huecos donde pueden entrar pavesas o acumularse hojas secas.",
      "question": "¿Qué medidas recomiendas para preparar la vivienda frente a la entrada de pavesas?",
      "briefing": "En un incendio forestal, una vivienda no solo puede verse amenazada por el frente de llamas. Las pavesas pueden viajar con el viento y caer sobre tejados, canalones, terrazas, porches o conductos de ventilación. Si encuentran hojas secas, agujas de pino, restos vegetales o huecos por los que entrar, pueden iniciar un foco pequeño que acabe afectando a toda la casa. Por eso, la defensa pasiva de la vivienda es una parte clave de la prevención. La recomendación debe centrarse en reducir puntos vulnerables: limpiar tejados y canalones, colocar mallas matachispas en chimeneas y rejillas metálicas de trama fina en conductos de ventilación, y sellar huecos bajo porches, terrazas o tejados donde pueda acumularse material inflamable o entrar aire caliente. Estas medidas deben realizarse antes de la emergencia. Cuando el incendio ya está cerca, la prioridad es seguir las instrucciones oficiales de evacuación o confinamiento, no subirse al tejado a pelearse con un canalón.",
      "options": {
        "a": {
          "text": "Recomendar la limpieza periódica de tejados, canalones, terrazas y rincones donde puedan acumularse hojas secas, agujas de pino o restos vegetales que puedan prender con una pavesa.",
          "rationale": "Respuesta adecuada. Las pavesas pueden iniciar focos pequeños en materiales muy secos. Un canalón lleno de hojas no es decoración otoñal: es combustible esperando turno.",
          "shortFeedback": "Respuesta adecuada. Las pavesas pueden iniciar focos pequeños en materiales muy secos. Un canalón lleno de hojas no es decoración otoñal: es combustible esperando turno."
        },
        "b": {
          "text": "Centrar la prevención únicamente en regar el tejado cuando se vea humo cerca de la vivienda.",
          "rationale": "Respuesta incorrecta. Mojar puede ayudar en circunstancias muy concretas, pero no sustituye la limpieza previa ni elimina los puntos vulnerables. La prevención no debería empezar cuando el humo ya está llamando al timbre.",
          "shortFeedback": "Respuesta incorrecta. Mojar puede ayudar en circunstancias muy concretas, pero no sustituye la limpieza previa ni elimina los puntos vulnerables. La prevención no debería empezar cuando el humo ya está llamando al timbre."
        },
        "c": {
          "text": "Instalar mallas matachispas o rejillas metálicas de trama fina en chimeneas, respiraderos y conductos de ventilación, además de sellar huecos bajo porches, terrazas o tejados donde puedan entrar pavesas o acumularse materiales inflamables.",
          "rationale": "Respuesta adecuada. La defensa pasiva busca impedir que una pavesa encuentre entrada o combustible. Proteger huecos y ventilaciones reduce el riesgo de ignición dentro o junto a la vivienda.",
          "shortFeedback": "Respuesta adecuada. La defensa pasiva busca impedir que una pavesa encuentre entrada o combustible. Proteger huecos y ventilaciones reduce el riesgo de ignición dentro o junto a la vivienda."
        },
        "d": {
          "text": "Dejar abiertos respiraderos, huecos y accesos bajo porches para que circule mejor el aire y se reduzca el calor acumulado.",
          "rationale": "Respuesta incorrecta. En un incendio, esos huecos pueden permitir la entrada de pavesas, humo o aire caliente. La ventilación sin protección puede convertirse en una puerta de entrada al problema.",
          "shortFeedback": "Respuesta incorrecta. En un incendio, esos huecos pueden permitir la entrada de pavesas, humo o aire caliente. La ventilación sin protección puede convertirse en una puerta de entrada al problema."
        },
        "e": {
          "text": "Guardar leña, cartones o herramientas bajo porches y terrazas para que no estén expuestos al viento durante la época de riesgo.",
          "rationale": "Respuesta incorrecta. Bajo porches y terrazas no deben acumularse materiales inflamables. Protegerlos del viento no sirve de mucho si se convierten en el combustible perfecto pegado a la casa.",
          "shortFeedback": "Respuesta incorrecta. Bajo porches y terrazas no deben acumularse materiales inflamables. Protegerlos del viento no sirve de mucho si se convierten en el combustible perfecto pegado a la casa."
        }
      },
      "sourceNotes": {
        "note-001": "La defensa pasiva de la vivienda busca reducir puntos vulnerables frente a pavesas, calor y entrada de aire caliente.",
        "note-002": "La limpieza de tejados, canalones y terrazas reduce la posibilidad de ignición por acumulación de hojas secas, agujas de pino o restos vegetales.",
        "note-003": "Las mallas matachispas, rejillas metálicas de trama fina y el sellado de huecos ayudan a impedir que las pavesas entren en chimeneas, respiraderos, porches o cubiertas.",
        "note-004": "Estas medidas deben aplicarse antes de la época de mayor riesgo; durante una emergencia la prioridad es seguir las instrucciones oficiales de evacuación o confinamiento."
      }
    },
    "s-037-plan-familiar-emergencia": {
      "title": "Plan familiar de emergencia",
      "estimatedTime": "2 min",
      "tags": [
        "prevencion",
        "autoproteccion",
        "plan-familiar",
        "mochila-emergencia",
        "evacuacion",
        "punto-encuentro",
        "rutas-salida",
        "plan-autoproteccion"
      ],
      "context": "Antes de la época de mayor riesgo de incendios, estás realizando sesiones informativas con vecinos de zonas próximas al monte. Después de hablar de limpieza exterior y defensa pasiva de la vivienda, surge una duda práctica: muchas familias no tienen preparada una mochila de emergencia, no han pensado por dónde salir si se ordena la evacuación y desconocen si su comunidad o urbanización cuenta con un plan de autoprotección.",
      "question": "¿Qué medidas recomiendas para que las familias estén preparadas antes de un incendio?",
      "briefing": "La preparación familiar puede marcar la diferencia cuando una evacuación debe hacerse con poco margen. En una emergencia, perder tiempo buscando documentación, medicinas, cargadores o pensando a qué familiar avisar puede retrasar la salida y aumentar el riesgo. Por eso, cada familia debería tener preparada una mochila básica de emergencia con documentación, medicación necesaria, cargadores, linterna, radio con pilas, agua y otros elementos esenciales. También debe conocer las rutas de salida, acordar un punto de encuentro y saber cómo actuar si algún miembro de la familia no está en casa cuando se da la orden. Además, en zonas de riesgo es importante conocer el plan de autoprotección de la comunidad, urbanización o municipio: qué puntos de encuentro existen, qué rutas están previstas, cómo se avisará a la población y qué instrucciones deben seguirse. La prioridad es que la respuesta familiar no dependa de la improvisación. En un incendio, la mochila no debería hacerse mientras la televisión ya dice “última hora”.",
      "options": {
        "a": {
          "text": "Recomendar que cada familia prepare una mochila de emergencia con documentación, medicación necesaria, cargadores, linterna, radio con pilas, agua y elementos básicos, y que la revise antes de la época de mayor riesgo.",
          "rationale": "Respuesta adecuada. Tener lo esencial preparado evita retrasos en una evacuación. La mochila no apaga incendios, pero evita que la familia pierda minutos valiosos buscando papeles, pastillas, una linterna o una radio para seguir instrucciones si fallan las comunicaciones habituales.",
          "shortFeedback": "Respuesta adecuada. Tener lo esencial preparado evita retrasos en una evacuación. La mochila no apaga incendios, pero evita que la familia pierda minutos valiosos buscando papeles, pastillas, una linterna o una radio para seguir instrucciones si fallan las comunicaciones habituales."
        },
        "b": {
          "text": "Indicar que no hace falta preparar nada con antelación, porque en caso de evacuación siempre habrá tiempo para recoger lo necesario.",
          "rationale": "Respuesta incorrecta. Una evacuación puede activarse con muy poco margen. Confiar en que habrá tiempo para buscar todo en casa puede retrasar la salida y aumentar el riesgo.",
          "shortFeedback": "Respuesta incorrecta. Una evacuación puede activarse con muy poco margen. Confiar en que habrá tiempo para buscar todo en casa puede retrasar la salida y aumentar el riesgo."
        },
        "c": {
          "text": "Aconsejar a las familias que acuerden rutas de salida, un punto de encuentro y un sistema de aviso entre sus miembros, además de conocer el plan de autoprotección de su comunidad, urbanización o municipio.",
          "rationale": "Respuesta adecuada. Un plan familiar sencillo reduce la confusión. Saber por dónde salir, dónde reunirse y qué instrucciones oficiales seguir ayuda a evitar decisiones improvisadas.",
          "shortFeedback": "Respuesta adecuada. Un plan familiar sencillo reduce la confusión. Saber por dónde salir, dónde reunirse y qué instrucciones oficiales seguir ayuda a evitar decisiones improvisadas."
        },
        "d": {
          "text": "Recomendar que cada familia decida su ruta de evacuación en el momento, según vea el humo o lo que comenten los vecinos.",
          "rationale": "Respuesta incorrecta. Decidir bajo presión, con humo y mensajes contradictorios, es una receta estupenda para equivocarse. Las rutas deben conocerse antes y ajustarse después a las órdenes oficiales.",
          "shortFeedback": "Respuesta incorrecta. Decidir bajo presión, con humo y mensajes contradictorios, es una receta estupenda para equivocarse. Las rutas deben conocerse antes y ajustarse después a las órdenes oficiales."
        },
        "e": {
          "text": "Sugerir que la mochila de emergencia incluya todos los objetos de valor posibles, aunque eso retrase la salida.",
          "rationale": "Respuesta incorrecta. La mochila debe contener lo esencial, no media mudanza sentimental. En una evacuación, cargar demasiado puede retrasar la salida y complicar el traslado.",
          "shortFeedback": "Respuesta incorrecta. La mochila debe contener lo esencial, no media mudanza sentimental. En una evacuación, cargar demasiado puede retrasar la salida y complicar el traslado."
        }
      },
      "sourceNotes": {
        "note-001": "La planificación familiar previa reduce retrasos y decisiones improvisadas durante una evacuación por incendio.",
        "note-002": "Una mochila de emergencia debe contener elementos esenciales como documentación, medicación, cargadores, linterna, radio con pilas, agua y otros básicos.",
        "note-003": "Las familias deben conocer rutas de salida, puntos de encuentro y el plan de autoprotección de su comunidad, urbanización o municipio.",
        "note-004": "La preparación debe hacerse antes de la época de mayor riesgo; durante una emergencia la prioridad es seguir instrucciones oficiales."
      }
    },
    "s-016-rumor-evacuacion-noroeste": {
      "title": "Rumor de evacuacion en municipios del noroeste",
      "estimatedTime": "2 min",
      "tags": [
        "evacuacion",
        "redes-sociales",
        "rumor",
        "proteccion-civil",
        "municipios-noroeste",
        "comunicacion-crisis"
      ],
      "intro": "Un audio asegura que todos los municipios del noroeste deben evacuar de inmediato.",
      "objective": "Cortar una falsa orden de evacuacion sin crear mas alarma ni debilitar la autoridad de los canales oficiales.",
      "context": "La direccion de la emergencia no ha ordenado una evacuacion general en esa zona. Aun asi, el mensaje se mueve rapido por grupos vecinales y perfiles locales. Algunas familias empiezan a cargar el coche, otras llaman al 112 y varios ayuntamientos piden una aclaracion urgente. Si el rumor empuja salidas espontaneas, puede bloquear carreteras secundarias antes de que la amenaza real llegue.",
      "question": "Que dos actuaciones priorizas para frenar el rumor y mantener preparada a la poblacion?",
      "briefing": "La respuesta debe ser inmediata, institucional y util: aclarar que no hay orden general, explicar que zonas si estan afectadas y recordar como se comunicaria una evacuacion real.",
      "pressureIndicators": {
        "confusionPublica": {
          "label": "Rumor de evacuacion",
          "level": "activo"
        },
        "riesgoAtrapamiento": {
          "label": "Riesgo de salidas espontaneas",
          "level": "subiendo"
        },
        "coordinacionOperativa": {
          "label": "Coordinacion institucional",
          "level": "bajo presion"
        }
      },
      "actions": {
        "comunicado-inmediato": {
          "label": "Emitir comunicado oficial inmediato",
          "description": "Aclarar que no existe una orden de evacuacion general, indicar zonas afectadas y pedir seguimiento exclusivo de canales oficiales.",
          "feedback": "El rumor encuentra una respuesta clara. La poblacion tiene una frase concreta a la que agarrarse."
        },
        "mensaje-conjunto-instituciones": {
          "label": "Coordinar mensaje conjunto con ayuntamientos y Proteccion Civil",
          "description": "Publicar una aclaracion coordinada con ayuntamientos, Proteccion Civil y cuerpos de seguridad para evitar contradicciones.",
          "feedback": "Las instituciones no compiten entre si. La aclaracion llega con una sola voz."
        },
        "actualizar-zonas-rutas": {
          "label": "Actualizar zonas afectadas y rutas oficiales",
          "description": "Publicar una referencia breve con zonas vigiladas, zonas sin orden de salida, rutas reservadas y punto de informacion.",
          "feedback": "La aclaracion se convierte en instruccion practica. Menos gente improvisa."
        },
        "silencio-no-amplificar": {
          "label": "Guardar silencio para no amplificar el rumor",
          "description": "No responder de momento y esperar a que el mensaje pierda fuerza por si solo.",
          "feedback": "El hueco lo ocupa el miedo. El rumor empieza a comportarse como si fuera una orden."
        },
        "evacuacion-masiva-preventiva": {
          "label": "Ordenar evacuacion masiva preventiva sin base operativa",
          "description": "Evacuar todos los municipios mencionados en el rumor para evitar criticas si el viento cambia.",
          "feedback": "La decision convierte un rumor en trafico real. Las carreteras secundarias pierden margen."
        },
        "respuesta-personal-redes": {
          "label": "Responder desde una cuenta personal",
          "description": "Criticar publicamente a quienes difundieron el rumor y pedir que dejen de alarmar.",
          "feedback": "La respuesta se convierte en disputa. La poblacion necesitaba instrucciones, no una bronca."
        }
      },
      "combos": {
        "voz-unica": {
          "title": "Una sola voz institucional",
          "text": "El rumor queda contradicho por un mensaje rapido y coordinado. La poblacion sabe donde mirar antes de actuar."
        },
        "aclaracion-operativa": {
          "title": "Aclaracion con instrucciones",
          "text": "La aclaracion no solo desmiente: explica que hacer y que no hacer. Baja el riesgo de salidas espontaneas."
        },
        "caos-por-exceso": {
          "title": "Caos por exceso de reaccion",
          "text": "La institucion transmite nerviosismo y contradiccion. El rumor ya no solo circula: mueve coches."
        }
      },
      "outcomes": {
        "alto": {
          "title": "Rumor frenado antes de mover a la poblacion",
          "text": "La aclaracion llega a tiempo y con una sola voz. Algunas dudas siguen abiertas, pero la falsa evacuacion no llega a convertirse en salida desordenada."
        },
        "medio": {
          "title": "Rumor contenido con tension vecinal",
          "text": "La respuesta reduce el dano, pero parte de la poblacion sigue inquieta. El siguiente cambio de viento llegara con nervios acumulados."
        },
        "bajo": {
          "title": "Salidas espontaneas y carreteras tensionadas",
          "text": "El rumor gana velocidad. Algunas familias salen sin instrucciones claras y los equipos empiezan a perder margen en las vias secundarias."
        }
      },
      "nextLogic": {
        "viento-con-poblacion-preparada": {
          "transition": "El rumor queda bajo control, pero el incendio no negocia con la informacion. El viento cambia hacia un nucleo poblado."
        },
        "viento-con-carreteras-tensas": {
          "transition": "El rumor deja carreteras mas cargadas justo cuando el viento empuja el frente hacia una zona habitada."
        },
        "ruta-base-cambio-viento": {
          "transition": "La comunicacion estabiliza parte de la situacion, pero el incendio abre una amenaza nueva: el viento gira hacia viviendas."
        }
      },
      "sourceNotes": {
        "note-001": "La gestion de rumores en emergencias requiere comunicacion rapida, oficial, coordinada y verificable.",
        "note-002": "Ante una falsa orden de evacuacion, el objetivo es evitar panico, movimientos innecesarios de poblacion y saturacion de vias.",
        "note-003": "Esta version forma parte de la beta vertical de la ruta comunicacion."
      }
    },
    "s-018-colapso-llamadas-112": {
      "title": "Colapso de llamadas al 112",
      "estimatedTime": "2 min",
      "tags": [
        "112",
        "comunicacion",
        "crisis",
        "rumores",
        "informacion-publica",
        "medios-comunicacion",
        "canales-oficiales",
        "saturacion"
      ],
      "intro": "El humo ya se ve desde varios municipios. El miedo empieza a llamar por telefono.",
      "objective": "Reducir la saturacion del 112 sin dejar a la poblacion desinformada.",
      "context": "El humo ya es visible desde varios municipios. Y con ?l llega el miedo. En pocos minutos, el Centro Coordinador de Emergencias y Seguridad (112) empieza a recibir una avalancha de llamadas.\n\nAlgunas alertan de situaciones reales: llamas acerc?ndose a una finca, humo entrando en viviendas o personas con movilidad reducida que necesitan saber si deben prepararse para evacuar. Pero muchas otras son consultas que no requieren una llamada al servicio de emergencias: vecinos que preguntan si deben salir de casa, conductores que quieren saber si una carretera est? cortada o personas preocupadas por un audio que circula por WhatsApp y cuya veracidad desconocen.\n\nLa centralita est? al l?mite. Ahora debes decidir c?mo actuar. Lo que hagas puede ayudar a mantener libre una l?nea de emergencia? o contribuir a bloquearla.",
      "question": "Que dos actuaciones inmediatas priorizas para reducir la saturacion del 112 sin dejar a la poblacion desinformada?",
      "briefing": "La crisis debe gestionarse con presion y priorizacion. No hay tiempo para hacerlo todo: elige dos actuaciones inmediatas entre seis opciones posibles.",
      "pressureIndicators": {
        "saturacion112": {
          "label": "Saturacion del 112",
          "level": "alta"
        },
        "confusionPublica": {
          "label": "Confusion publica",
          "level": "subiendo"
        },
        "confianzaInstitucional": {
          "label": "Confianza institucional",
          "level": "inestable"
        }
      },
      "actions": {
        "mensaje-oficial-breve": {
          "label": "Emitir mensaje oficial breve y claro",
          "description": "Publicar un primer mensaje oficial con informacion confirmada: zona aproximada afectada, recomendaciones basicas, canales de actualizacion y recordatorio de que el 112 debe reservarse para emergencias reales.",
          "feedback": "La poblacion recibe una primera referencia fiable. No resuelve todo, pero reduce llamadas de duda y corta parte del ruido inicial."
        },
        "canal-informacion-no-urgente": {
          "label": "Abrir canal de informacion no urgente",
          "description": "Habilitar o reforzar canales de informacion no urgente: web municipal, redes institucionales, linea informativa si existe, mensajes de ayuntamiento y avisos coordinados con medios.",
          "feedback": "Las dudas generales empiezan a desviarse fuera del 112. Las llamadas criticas tienen mas opciones de entrar."
        },
        "actualizaciones-periodicas-medios": {
          "label": "Programar actualizaciones periodicas con medios y ayuntamientos",
          "description": "Convocar actualizaciones periodicas para medios de comunicacion y ayuntamientos afectados, con mensajes breves, horarios claros y datos confirmados.",
          "feedback": "Los medios y ayuntamientos ayudan a amplificar informacion util. La comunicacion deja de ir a golpes."
        },
        "coordinar-ayuntamientos": {
          "label": "Coordinar un mensaje unico con los ayuntamientos afectados",
          "description": "Acordar un mensaje unico con ayuntamientos, Proteccion Civil y comunicacion institucional para evitar contradicciones sobre zonas afectadas, carreteras, evacuaciones y canales oficiales.",
          "feedback": "Se reducen contradicciones entre instituciones. La poblacion recibe una instruccion mas coherente."
        },
        "responder-caso-por-caso-redes": {
          "label": "Responder caso por caso en redes sociales",
          "description": "Destinar el equipo de comunicacion a responder manualmente preguntas en redes sociales y comentarios individuales.",
          "feedback": "Contestar uno a uno consume tiempo y no ordena la informacion general. La emergencia necesita un canal claro, no una conversacion infinita."
        },
        "esperar-datos-completos": {
          "label": "Esperar a tener todos los datos antes de comunicar",
          "description": "Retrasar la comunicaci?n p?blica hasta tener confirmaci?n completa sobre el per?metro, las carreteras, el riesgo para las viviendas y la evoluci?n prevista.",
          "feedback": "El silencio deja hueco a rumores. Comunicar lo confirmado y actualizar despu?s es m?s seguro que esperar a tener el puzzle perfecto."
        }
      },
      "combos": {
        "informacion-publica-ordenada": {
          "title": "Informacion publica ordenada",
          "text": "La poblacion recibe una referencia inicial y un lugar alternativo para resolver dudas. El 112 empieza a recuperar margen para llamadas criticas."
        },
        "comunicacion-coordinada": {
          "title": "Comunicaci?n coordinada",
          "text": "Medios y ayuntamientos replican una misma l?nea informativa. La emergencia est? lanzando un mensaje ?nico."
        },
        "silencio-fragmentado": {
          "title": "Silencio fragmentado",
          "text": "La informacion oficial llega tarde y dispersa. Los grupos de mensajeria llenan el vacio con versiones contradictorias."
        }
      },
      "outcomes": {
        "alto": {
          "title": "112 descongestionado parcialmente",
          "text": "La comunicacion oficial reduce parte de las llamadas innecesarias. La poblacion empieza a consultar canales alternativos y el 112 recupera margen para atender emergencias reales. El incendio sigue avanzando, pero el ruido informativo baja varios decibelios."
        },
        "medio": {
          "title": "Saturacion contenida, rumores activos",
          "text": "La situacion mejora, pero no queda resuelta. Parte de la poblacion encuentra informacion fiable, aunque siguen circulando dudas y mensajes no verificados. El 112 continua tensionado."
        },
        "bajo": {
          "title": "Caos informativo",
          "text": "Las llamadas se acumulan, los canales oficiales llegan tarde o no se entienden y los rumores empiezan a circular mas rapido que las aclaraciones. La siguiente desinformacion encontrara la puerta abierta."
        }
      },
      "nextLogic": {
        "imagen-viral-con-respuesta-ordenada": {
          "transition": "Aunque la comunicacion oficial ha reducido la saturacion del 112, una imagen antigua empieza a circular como si fuera actual. La diferencia es que ahora hay canales activos para desmentirla rapido."
        },
        "imagen-viral-con-caos": {
          "transition": "La comunicacion llega tarde y la confusion gana terreno. Una imagen antigua empieza a circular como si mostrara el avance actual del incendio. Cae sobre un terreno perfecto para el panico."
        },
        "ruta-base-imagen-viral": {
          "transition": "El 112 sigue tensionado y la informacion se mueve deprisa. Una imagen impactante aparece en redes y amenaza con disparar de nuevo la alarma social."
        }
      },
      "sourceNotes": {
        "note-001": "Esta escena debe ser una pantalla de seleccion de acciones, no un cuestionario.",
        "note-002": "La jugadora solo puede elegir dos actuaciones para reforzar la sensacion de urgencia.",
        "note-003": "En esta escena, el fuego esta en el monte, pero la propagacion tambien ocurre por telefono."
      }
    },
    "s-023-imagen-antigua-viral": {
      "title": "Una imagen antigua se hace viral",
      "estimatedTime": "2 min",
      "tags": [
        "desinformacion",
        "imagen-viral",
        "redes-sociales",
        "rumores",
        "mapa-actualizado",
        "medios-comunicacion",
        "canales-oficiales"
      ],
      "intro": "Una imagen impactante empieza a circular como si mostrara el avance actual del incendio.",
      "objective": "Frenar la desinformacion visual sin amplificar el panico ni dejar a la poblacion sin contexto.",
      "context": "Una imagen impactante empieza a circular como si mostrara el avance actual del incendio. La fotograf?a no corresponde a la emergencia en curso, pero se comparte con rapidez: llamas cerca de viviendas, humo intenso y vecinos huyendo. En una zona que no est? afectada empiezan las llamadas al 112 y algunos grupos vecinales preparan salidas por su cuenta. El problema no es solo desmentir la imagen: hay que sustituir el miedo por una informaci?n real.",
      "question": "Que dos actuaciones priorizas para neutralizar la imagen antigua y recuperar claridad publica?",
      "briefing": "No basta con decir que algo es falso. En emergencia, un desmentido util debe ir acompanado de informacion actual, canales oficiales y coordinacion con quienes amplifican el mensaje correcto.",
      "pressureIndicators": {
        "confusionPublica": {
          "label": "Confusion publica",
          "level": "alta"
        },
        "saturacion112": {
          "label": "Llamadas por dudas",
          "level": "subiendo"
        },
        "confianzaInstitucional": {
          "label": "Confianza institucional",
          "level": "fragil"
        }
      },
      "actions": {
        "desmentido-oficial-claro": {
          "label": "Publicar desmentido oficial claro",
          "description": "Explicar que la imagen no corresponde al incendio actual y acompanarlo de informacion confirmada sobre zonas afectadas.",
          "feedback": "La poblacion recibe una correccion visible. El rumor pierde fuerza porque el desmentido no llega solo: llega con contexto."
        },
        "mapa-actualizado-zonas": {
          "label": "Difundir mapa actualizado de zonas afectadas",
          "description": "Publicar un mapa sencillo con zona afectada, zonas no afectadas y canales oficiales de actualizacion.",
          "feedback": "El mapa da una referencia concreta. Varias dudas dejan de convertirse en llamadas al 112."
        },
        "coordinar-medios-ayuntamientos": {
          "label": "Coordinar correccion con medios y ayuntamientos",
          "description": "Enviar una correccion comun a radios locales, ayuntamientos y perfiles institucionales para que repliquen la misma informacion.",
          "feedback": "La misma version circula por varios canales fiables. La emergencia habla con menos ruido."
        },
        "responder-comentarios": {
          "label": "Responder solo en comentarios",
          "description": "Contestar manualmente a quienes comparten la imagen, caso por caso, sin comunicado ni referencia central.",
          "feedback": "La respuesta se fragmenta. Algunas personas ven la correccion, muchas otras solo ven la imagen."
        },
        "ignorar-imagen": {
          "label": "Ignorar la imagen para no amplificarla",
          "description": "Esperar a que deje de circular por si misma y evitar que la institucion le de mas visibilidad.",
          "feedback": "El silencio no apaga la imagen. La deja correr sin una referencia oficial que la contradiga."
        },
        "publicar-sin-marca": {
          "label": "Publicar la imagen sin marca visual",
          "description": "Reproducir la imagen en canales oficiales junto al texto de desmentido, pero sin sello claro de antigua o falsa.",
          "feedback": "La imagen gana una segunda vida. Quien lea deprisa puede quedarse con el impacto visual y no con el desmentido."
        }
      },
      "combos": {
        "desmentido-con-mapa": {
          "title": "Desmentido con referencia verificable",
          "text": "La correccion no se queda en un no: ofrece una imagen clara de lo que si esta ocurriendo. Baja el panico y baja el ruido."
        },
        "correccion-amplificada": {
          "title": "Correccion amplificada",
          "text": "Medios y ayuntamientos repiten una misma correccion. La informacion fiable alcanza a gente que no sigue el canal principal."
        },
        "rumor-sin-freno": {
          "title": "Rumor sin freno",
          "text": "La respuesta llega tarde y dispersa. La imagen antigua ya ha hecho el trabajo emocional."
        }
      },
      "outcomes": {
        "alto": {
          "title": "Imagen desactivada con rapidez",
          "text": "El desmentido llega con contexto y circula por canales fiables. La imagen no desaparece del todo, pero deja de marcar la respuesta de la poblacion."
        },
        "medio": {
          "title": "Rumor contenido, dudas persistentes",
          "text": "La correccion reduce parte del dano, aunque la imagen sigue apareciendo en conversaciones y grupos locales."
        },
        "bajo": {
          "title": "La imagen alimenta el panico",
          "text": "La respuesta oficial no logra ocupar el espacio informativo. La imagen antigua se mezcla con rumores de evacuacion y dispara nuevas dudas."
        }
      },
      "nextLogic": {
        "rumor-evacuacion-con-claridad": {
          "transition": "La imagen queda bastante acotada, pero un nuevo mensaje empieza a circular: alguien asegura que varios municipios deben evacuar."
        },
        "rumor-evacuacion-con-panico": {
          "transition": "La imagen antigua deja terreno abonado para el siguiente rumor: una supuesta orden de evacuacion empieza a moverse por grupos locales."
        },
        "ruta-base-rumor": {
          "transition": "La desinformacion no se detiene del todo. El siguiente mensaje ya no habla de llamas: habla de evacuar."
        }
      },
      "sourceNotes": {
        "note-001": "La desinformacion visual durante una emergencia puede generar miedo, saturacion de llamadas y movimientos innecesarios de poblacion.",
        "note-002": "Los desmentidos deben acompanarse de informacion actualizada, canales oficiales y materiales verificables como mapas o comunicados claros.",
        "note-003": "Esta version forma parte de la beta vertical de la ruta comunicacion."
      }
    },
    "s-024-presion-mediatica-zona-caliente": {
      "title": "Presión mediática en zona caliente",
      "estimatedTime": "2 min",
      "tags": [
        "prensa",
        "medios-comunicacion",
        "curiosos",
        "accesos",
        "perimetro-seguridad",
        "proteccion-civil",
        "trafico"
      ],
      "context": "El incendio se vuelve visible desde una carretera cercana y empiezan a llegar equipos de prensa, curiosos y vecinos que quieren grabar imágenes.",
      "question": "¿Cómo gestionas la presencia de periodistas, curiosos y vecinos en una zona próxima al incendio?",
      "briefing": "La emergencia atrae cada vez más atención. Varios equipos de prensa se desplazan a la zona para cubrir el incendio, mientras curiosos y vecinos se acercan con móviles para grabar desde los márgenes de la carretera. El problema crece rápido: algunos vehículos ocupan arcenes, otros reducen la velocidad para grabar y los accesos que necesitan los medios de emergencia empiezan a congestionarse. Al mismo tiempo, impedir toda presencia informativa puede generar tensión con los medios y alimentar la sensación de opacidad. La clave está en ordenar el perímetro: garantizar la seguridad, despejar accesos, permitir el trabajo periodístico en condiciones controladas y sancionar conductas que pongan en riesgo el operativo. Tenemos que decidir cómo actuar sin convertir la carretera en un plató improvisado ni tratar la información como un estorbo.",
      "options": {
        "a": {
          "text": "Establecer un perímetro de seguridad, despejar los accesos para emergencias y habilitar una zona segura para medios acreditados, con información periódica y normas claras de permanencia.",
          "rationale": "Respuesta adecuada. Ordena la situación sin bloquear el derecho a informar. La prensa puede trabajar, pero no desde el carril por donde tiene que pasar una autobomba.",
          "shortFeedback": "Respuesta adecuada. Ordena la situación sin bloquear el derecho a informar. La prensa puede trabajar, pero no desde el carril por donde tiene que pasar una autobomba."
        },
        "b": {
          "text": "Expulsar a todos los periodistas de la zona y prohibir cualquier grabación para evitar interferencias.",
          "rationale": "Respuesta incorrecta. Una prohibición total puede generar conflicto, opacidad y más presión informativa. Lo adecuado es ordenar el acceso, no apagar las cámaras como si eso apagara el fuego.",
          "shortFeedback": "Respuesta incorrecta. Una prohibición total puede generar conflicto, opacidad y más presión informativa. Lo adecuado es ordenar el acceso, no apagar las cámaras como si eso apagara el fuego."
        },
        "c": {
          "text": "Coordinar con seguridad y comunicación un punto informativo para prensa, actualizar la situación con frecuencia y sancionar o retirar a curiosos que bloqueen vías o incumplan el perímetro.",
          "rationale": "Respuesta adecuada. Combina comunicación, control de accesos y seguridad. Si los medios reciben información fiable, hay menos necesidad de perseguir humo por carreteras peligrosas.",
          "shortFeedback": "Respuesta adecuada. Combina comunicación, control de accesos y seguridad. Si los medios reciben información fiable, hay menos necesidad de perseguir humo por carreteras peligrosas."
        },
        "d": {
          "text": "Permitir que prensa y vecinos se coloquen donde quieran mientras no entren directamente en la zona quemada.",
          "rationale": "Respuesta incorrecta. El riesgo no empieza solo donde hay llamas. Humo, viento, vehículos de emergencia y cambios bruscos pueden convertir una zona aparentemente segura en un problema operativo.",
          "shortFeedback": "Respuesta incorrecta. El riesgo no empieza solo donde hay llamas. Humo, viento, vehículos de emergencia y cambios bruscos pueden convertir una zona aparentemente segura en un problema operativo."
        },
        "e": {
          "text": "Atender primero a los medios de comunicación para controlar el relato, aunque eso retrase el despeje de accesos.",
          "rationale": "Respuesta incorrecta. Comunicar es importante, pero la prioridad inmediata es mantener libres las vías de emergencia y proteger a las personas. El relato no sirve de mucho si la autobomba está atrapada en un atasco de directos.",
          "shortFeedback": "Respuesta incorrecta. Comunicar es importante, pero la prioridad inmediata es mantener libres las vías de emergencia y proteger a las personas. El relato no sirve de mucho si la autobomba está atrapada en un atasco de directos."
        }
      },
      "sourceNotes": {
        "note-001": "La gestión de medios durante una emergencia debe compatibilizar el derecho a informar con la seguridad del operativo y de las personas.",
        "note-002": "Ordenar el perímetro, habilitar zonas seguras para prensa y mantener información oficial periódica ayuda a reducir interferencias y conductas de riesgo.",
        "note-003": "Mantener libres los accesos para emergencias es prioritario cuando hay presencia de curiosos, prensa o vecinos cerca de zonas afectadas."
      }
    },
    "s-008b-riesgo-extremo-verano": {
      "title": "Medidas ante riesgo extremo en verano",
      "estimatedTime": "2 min",
      "tags": [
        "operaciones"
      ],
      "context": "Es pleno verano. El termómetro supera los 38 °C, la humedad es muy baja y el viento puede cambiar en cualquier momento. Los técnicos advierten que el riesgo de incendio es extremo y que cualquier chispa podría provocar un gran fuego.\n\n¿Qué medidas decides tomar para reducir el riesgo en el monte?",
      "question": "¿Qué decisión tomas?",
      "briefing": "Es pleno verano. El termómetro supera los 38 °C, la humedad es muy baja y el viento puede cambiar en cualquier momento. Los técnicos advierten que el riesgo de incendio es extremo y que cualquier chispa podría provocar un gran fuego.\n\n¿Qué medidas decides tomar para reducir el riesgo en el monte?",
      "options": {
        "a": {
          "text": "Activar el nivel máximo de alerta: prohibir barbacoas y quemas, cerrar algunas pistas forestales y aumentar la vigilancia con patrullas y torres de observación.",
          "rationale": "Combina restricciones, control de accesos y refuerzo de vigilancia para reducir igniciones y mejorar detección temprana.",
          "shortFeedback": "Combina restricciones, control de accesos y refuerzo de vigilancia para reducir igniciones y mejorar detección temprana."
        },
        "b": {
          "text": "Recomendar a la población que tenga precaución en el monte, pero mantener todas las actividades recreativas abiertas.",
          "rationale": "La recomendación genérica sin medidas adicionales suele ser insuficiente en condiciones extremas.",
          "shortFeedback": "La recomendación genérica sin medidas adicionales suele ser insuficiente en condiciones extremas."
        },
        "c": {
          "text": "Permitir el uso de barbacoas solo en zonas habilitadas porque están preparadas para el fuego.",
          "rationale": "Incluso en áreas habilitadas, mantener focos de ignición con riesgo extremo eleva la probabilidad de incidente.",
          "shortFeedback": "Incluso en áreas habilitadas, mantener focos de ignición con riesgo extremo eleva la probabilidad de incidente."
        },
        "d": {
          "text": "No tomar medidas especiales porque todavía no se ha declarado ningún incendio.",
          "rationale": "Esperar a la declaración de incendio en riesgo extremo reduce la capacidad de prevención y reacción temprana.",
          "shortFeedback": "Esperar a la declaración de incendio en riesgo extremo reduce la capacidad de prevención y reacción temprana."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-009-primer-envio-medios": {
      "title": "Activación inicial de medios",
      "estimatedTime": "2 min",
      "tags": [
        "operaciones"
      ],
      "context": "Con aviso naranja por calor y primer humo detectado en cumbre, debes decidir el primer despliegue.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Con aviso naranja por calor y primer humo detectado en cumbre, debes decidir el primer despliegue.",
      "options": {
        "a": {
          "text": "Dos brigadas, dos medios aéreos y dos unidades policiales",
          "rationale": "Permite respuesta inicial robusta ante condiciones extremas.",
          "shortFeedback": "Permite respuesta inicial robusta ante condiciones extremas."
        },
        "b": {
          "text": "Una brigada, un medio aéreo y unidades policiales",
          "rationale": "Puede quedarse corto para estabilización temprana.",
          "shortFeedback": "Puede quedarse corto para estabilización temprana."
        },
        "c": {
          "text": "Enviar una unidad policial y un helicóptero de reconocimiento para evaluar el incendio antes de desplegar brigadas",
          "rationale": "Aporta información, pero puede retrasar el ataque inicial en condiciones de riesgo alto.",
          "shortFeedback": "Aporta información, pero puede retrasar el ataque inicial en condiciones de riesgo alto."
        },
        "d": {
          "text": "No movilizar recursos y observar la evolución del incendio desde el centro de coordinación",
          "rationale": "Retrasa la respuesta operativa y aumenta la probabilidad de propagación del incendio.",
          "shortFeedback": "Retrasa la respuesta operativa y aumenta la probabilidad de propagación del incendio."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-009b-escalado-incendio": {
      "title": "Escalado de medios por empeoramiento del incendio",
      "estimatedTime": "2 min",
      "tags": [
        "operaciones"
      ],
      "context": "Las temperaturas y la falta de humedad no ayudan. El incendio ocupa más masa forestal.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Las temperaturas y la falta de humedad no ayudan. El incendio ocupa más masa forestal.",
      "options": {
        "a": {
          "text": "Envío medios aéreos más grandes (hidroaviones, helicópteros Kamov)",
          "rationale": "Ante intensificación del fuego, aumentar capacidad de descarga y alcance mejora la contención inicial.",
          "shortFeedback": "Ante intensificación del fuego, aumentar capacidad de descarga y alcance mejora la contención inicial."
        },
        "b": {
          "text": "Solo mando más medios terrestres",
          "rationale": "Refuerza el frente, pero puede resultar insuficiente sin apoyo aéreo en condiciones extremas.",
          "shortFeedback": "Refuerza el frente, pero puede resultar insuficiente sin apoyo aéreo en condiciones extremas."
        },
        "c": {
          "text": "Enviar un medio aéreo adicional y reforzar ligeramente las brigadas terrestres",
          "rationale": "Es una escalada parcial que puede ayudar, aunque puede quedarse corta si el frente sigue creciendo.",
          "shortFeedback": "Es una escalada parcial que puede ayudar, aunque puede quedarse corta si el frente sigue creciendo."
        },
        "d": {
          "text": "No enviar más recursos y confiar en que el viento reduzca la intensidad del incendio",
          "rationale": "La inacción en un escenario adverso aumenta el riesgo de propagación y de daños a población y viviendas.",
          "shortFeedback": "La inacción en un escenario adverso aumenta el riesgo de propagación y de daños a población y viviendas."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-009c-continuidad-incendio": {
      "title": "Seguimiento tras inicio del incendio",
      "estimatedTime": "2 min",
      "tags": [
        "operaciones"
      ],
      "context": "Están actuando los medios que has enviado aunque te avisan de que el incendio continúa.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Están actuando los medios que has enviado aunque te avisan de que el incendio continúa.",
      "options": {
        "a": {
          "text": "Reorganizo la estrategia: priorizo proteger viviendas y crear líneas cortafuegos",
          "rationale": "Permite concentrar esfuerzos en protección de personas y contención del frente con criterio táctico.",
          "shortFeedback": "Permite concentrar esfuerzos en protección de personas y contención del frente con criterio táctico."
        },
        "b": {
          "text": "Aumento los medios enviados",
          "rationale": "Mejora parcialmente la respuesta, aunque suele ser menos eficaz que reorganizar la estrategia por prioridades.",
          "shortFeedback": "Mejora parcialmente la respuesta, aunque suele ser menos eficaz que reorganizar la estrategia por prioridades."
        },
        "c": {
          "text": "Espero. Todavía están actuando y pueden apagarlo",
          "rationale": "Demorar decisiones de ajuste puede facilitar la propagación en condiciones adversas.",
          "shortFeedback": "Demorar decisiones de ajuste puede facilitar la propagación en condiciones adversas."
        },
        "d": {
          "text": "Retiro algunos medios para ahorrar recursos por si es necesario más tarde",
          "rationale": "Retirar medios en fase activa reduce capacidad de control y puede empeorar el escenario.",
          "shortFeedback": "Retirar medios en fase activa reduce capacidad de control y puede empeorar el escenario."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-010-cambio-viento-evacuacion": {
      "title": "Cambio de viento hacia nucleo poblado",
      "estimatedTime": "2 min",
      "tags": [
        "evacuacion",
        "proteccion-civil",
        "ganaderia",
        "viento",
        "zona-habitada"
      ],
      "intro": "El viento cambia y empuja el frente hacia un nucleo poblado.",
      "objective": "Ordenar evacuacion, confinamiento y rutas con margen suficiente para evitar atrapamientos.",
      "context": "El incendio gana velocidad en una ladera con viviendas dispersas, explotaciones ganaderas y carreteras secundarias con capacidad limitada. El humo puede reducir la visibilidad en pocos minutos. Parte de la poblacion llega inquieta por los rumores previos y algunos vecinos ya se plantean salir por su cuenta. Ahora la prioridad es proteger a la poblacion sin bloquear el trabajo de los equipos.",
      "question": "Que dos actuaciones inmediatas priorizas ante el cambio de viento?",
      "briefing": "Esta es la convergencia de la beta vertical: lo que se preparo antes y lo que se comunico durante la crisis condiciona el margen disponible para proteger a la poblacion.",
      "pressureIndicators": {
        "riesgoAtrapamiento": {
          "label": "Riesgo de atrapamiento",
          "level": "critico"
        },
        "poblacionProtegida": {
          "label": "Poblacion protegida",
          "level": "en disputa"
        },
        "coordinacionOperativa": {
          "label": "Coordinacion operativa",
          "level": "decisiva"
        }
      },
      "actions": {
        "evacuacion-escalonada": {
          "label": "Activar evacuacion preventiva escalonada",
          "description": "Ordenar la salida de las viviendas mas expuestas, priorizando personas vulnerables y zonas con peor acceso, con rutas confirmadas.",
          "feedback": "La salida empieza por donde el margen es menor. La evacuacion gana orden antes de que el humo complique las rutas."
        },
        "mensaje-rutas-puntos": {
          "label": "Comunicar rutas y puntos de encuentro",
          "description": "Emitir una instruccion unica con zonas afectadas, rutas habilitadas, puntos de encuentro y objetos esenciales.",
          "feedback": "La poblacion sabe quien debe salir, por donde y hacia donde. Menos decisiones se toman desde el miedo."
        },
        "transporte-vulnerables": {
          "label": "Activar transporte para personas sin vehiculo",
          "description": "Movilizar apoyo municipal y Proteccion Civil para personas registradas sin vehiculo o con movilidad reducida.",
          "feedback": "La evacuacion deja de depender de tener coche, familia cerca o buena suerte."
        },
        "confinamiento-si-rutas-no-seguras": {
          "label": "Preparar confinamiento si las rutas se cierran",
          "description": "Definir instrucciones de confinamiento para viviendas o edificios donde salir pueda ser mas peligroso que permanecer dentro.",
          "feedback": "No todas las salidas son seguras. Tener plan de confinamiento evita improvisar cuando una ruta deja de ser viable."
        },
        "esperar-fuego-cerca": {
          "label": "Esperar a que el fuego este mas cerca",
          "description": "Retrasar la decision para no alarmar a la poblacion antes de confirmar que el nucleo esta directamente amenazado.",
          "feedback": "El margen se estrecha. En incendios con viento cambiante, esperar puede convertir una salida ordenada en una carrera."
        },
        "evacuacion-general-sin-rutas": {
          "label": "Ordenar evacuacion general sin rutas confirmadas",
          "description": "Pedir la salida de toda la comarca de inmediato, aunque no esten confirmadas rutas, transporte ni capacidad de acogida.",
          "feedback": "La orden mueve mucha gente sin estructura. Las carreteras se cargan justo cuando los equipos necesitan paso."
        }
      },
      "combos": {
        "evacuacion-con-instrucciones": {
          "title": "Evacuacion con instrucciones claras",
          "text": "La orden llega con ruta, prioridad y destino. La poblacion se mueve con menos confusion y los equipos conservan margen."
        },
        "proteccion-inclusiva": {
          "title": "Proteccion de quienes necesitan apoyo",
          "text": "La respuesta no presupone que todo el mundo puede salir igual. Las personas vulnerables entran en el plan."
        },
        "salida-caotica": {
          "title": "Salida caotica",
          "text": "Primero se pierde margen y despues se ordena todo a la vez. La emergencia acumula humo, trafico y confusion."
        }
      },
      "outcomes": {
        "alto": {
          "title": "Poblacion protegida con margen",
          "text": "La evacuacion se ordena antes de perder visibilidad y las instrucciones reducen salidas improvisadas. El fuego sigue avanzando, pero no encuentra a la poblacion desordenada."
        },
        "medio": {
          "title": "Evacuacion posible, margen justo",
          "text": "La poblacion recibe instrucciones suficientes para actuar, aunque algunas dudas y retrasos mantienen la situacion tensionada."
        },
        "bajo": {
          "title": "Evacuacion desordenada",
          "text": "La salida llega tarde o sin estructura. El humo, el trafico y los mensajes contradictorios reducen el margen operativo."
        }
      },
      "nextLogic": {
        "final-beta": {
          "transition": "La fase mas critica queda resuelta para esta beta. Ahora toca leer que decisiones dieron margen y cuales abrieron la puerta al caos."
        }
      },
      "sourceNotes": {
        "note-001": "La evacuacion preventiva debe activarse con rutas confirmadas, control de trafico y prioridad para personas vulnerables o zonas mas expuestas.",
        "note-002": "La comunicacion de una evacuacion debe ser clara, coordinada y unica para evitar rumores, salidas improvisadas y colapsos en las vias.",
        "note-003": "Esta version funciona como convergencia minima de la beta vertical."
      }
    },
    "s-010b-defensa-nucleo-viviendas": {
      "title": "Defensa del núcleo de viviendas con incendio fuera de control",
      "estimatedTime": "2 min",
      "tags": [
        "operaciones"
      ],
      "context": "El incendio sigue avanzando sin control. Las llamas superan los dos metros y medio. Vas a mandar a los bomberos al núcleo de viviendas…",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "El incendio sigue avanzando sin control. Las llamas superan los dos metros y medio. Vas a mandar a los bomberos al núcleo de viviendas…",
      "options": {
        "a": {
          "text": "Refuerzas la defensa con maquinaria pesada para abrir líneas cortafuegos alrededor del barrio",
          "rationale": "Prioriza la defensa de la interfaz urbana con una estrategia de contención más robusta.",
          "shortFeedback": "Prioriza la defensa de la interfaz urbana con una estrategia de contención más robusta."
        },
        "b": {
          "text": "Van a hacer una defensa activa del barrio para que no se quemen las viviendas",
          "rationale": "Puede ayudar, pero sin reforzar la contención perimetral puede ser insuficiente ante un frente tan intenso.",
          "shortFeedback": "Puede ayudar, pero sin reforzar la contención perimetral puede ser insuficiente ante un frente tan intenso."
        },
        "c": {
          "text": "Les pides que dejen pasar el frente de llamas y luego que entren para apagar lo que quede activo, para minimizar daños",
          "rationale": "Reduce exposición directa inicial, pero puede permitir más afección en viviendas antes del control.",
          "shortFeedback": "Reduce exposición directa inicial, pero puede permitir más afección en viviendas antes del control."
        },
        "d": {
          "text": "Intentas apagar las llamas con camiones cisterna de agua del ayuntamiento",
          "rationale": "Como estrategia principal frente a llama muy intensa suele ser insuficiente y poco segura.",
          "shortFeedback": "Como estrategia principal frente a llama muy intensa suele ser insuficiente y poco segura."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-010b2-foco-secundario-por-radio": {
      "title": "Foco secundario detectado por radio",
      "estimatedTime": "2 min",
      "tags": [
        "operaciones"
      ],
      "context": "El incendio principal sigue activo, pero llega una nueva información por radio: ha aparecido un foco secundario a varios kilómetros. Los técnicos advierten que, si el viento cambia, ambos frentes podrían unirse.\n\n¿Qué decisión tomas?",
      "question": "¿Qué decisión tomas?",
      "briefing": "El incendio principal sigue activo, pero llega una nueva información por radio: ha aparecido un foco secundario a varios kilómetros. Los técnicos advierten que, si el viento cambia, ambos frentes podrían unirse.\n\n¿Qué decisión tomas?",
      "options": {
        "a": {
          "text": "Dividir los recursos: mantener equipos en el incendio principal y enviar una brigada rápida al foco secundario para intentar apagarlo antes de que crezca.",
          "rationale": "Permite sostener la defensa del frente principal y atacar de forma temprana el foco secundario para evitar su consolidación.",
          "shortFeedback": "Permite sostener la defensa del frente principal y atacar de forma temprana el foco secundario para evitar su consolidación."
        },
        "b": {
          "text": "Concentrar todos los medios en el incendio principal para evitar que avance hacia zonas habitadas.",
          "rationale": "Puede proteger el frente principal a corto plazo, pero deja el foco secundario con margen para crecer y complicar la maniobra.",
          "shortFeedback": "Puede proteger el frente principal a corto plazo, pero deja el foco secundario con margen para crecer y complicar la maniobra."
        },
        "c": {
          "text": "Esperar a confirmar si el foco secundario crece antes de enviar recursos.",
          "rationale": "Retrasar la intervención reduce las opciones de control temprano y aumenta el riesgo de que ambos frentes se aproximen.",
          "shortFeedback": "Retrasar la intervención reduce las opciones de control temprano y aumenta el riesgo de que ambos frentes se aproximen."
        },
        "d": {
          "text": "Priorizar la vigilancia aérea del foco secundario sin enviar equipos terrestres todavía.",
          "rationale": "Mejora la información situacional, pero sin ataque inicial el foco puede intensificarse con rapidez en condiciones adversas.",
          "shortFeedback": "Mejora la información situacional, pero sin ataque inicial el foco puede intensificarse con rapidez en condiciones adversas."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-010c-ataque-zona-secundaria": {
      "title": "Actuación en otra zona del monte antes de la noche",
      "estimatedTime": "2 min",
      "tags": [
        "operaciones"
      ],
      "context": "Mientras tanto, en otra zona del monte los medios aéreos continúan trabajando sin descanso antes de que llegue la noche.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Mientras tanto, en otra zona del monte los medios aéreos continúan trabajando sin descanso antes de que llegue la noche.",
      "options": {
        "a": {
          "text": "Ordenas parar las descargas aéreas para ahorrar agua y utilizarla más tarde",
          "rationale": "Interrumpir descargas en fase activa suele favorecer la continuidad del frente de incendio.",
          "shortFeedback": "Interrumpir descargas en fase activa suele favorecer la continuidad del frente de incendio."
        },
        "b": {
          "text": "Mandas a las brigadas terrestres que sigan atacando desde la cola",
          "rationale": "Puede aportar control local, pero puede ser insuficiente si no se actúa también sobre zonas críticas.",
          "shortFeedback": "Puede aportar control local, pero puede ser insuficiente si no se actúa también sobre zonas críticas."
        },
        "c": {
          "text": "Pides a los medios terrestres que realicen líneas de defensa",
          "rationale": "Consolida la contención y mejora la capacidad de frenar propagación antes del periodo nocturno.",
          "shortFeedback": "Consolida la contención y mejora la capacidad de frenar propagación antes del periodo nocturno."
        },
        "d": {
          "text": "Rediriges parte de las brigadas para atacar los flancos del incendio",
          "rationale": "Atacar flancos puede reducir la expansión lateral y reforzar el cierre táctico del perímetro.",
          "shortFeedback": "Atacar flancos puede reducir la expansión lateral y reforzar el cierre táctico del perímetro."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-010c2-refuerzo-ume-viviendas": {
      "title": "Refuerzo con UME para proteger viviendas",
      "estimatedTime": "2 min",
      "tags": [
        "operaciones"
      ],
      "context": "No quieres que se quemen más viviendas… Continúan los relevos de los medios terrestres. La Unidad Militar de Emergencias se ha unido a ellos.",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "No quieres que se quemen más viviendas… Continúan los relevos de los medios terrestres. La Unidad Militar de Emergencias se ha unido a ellos.",
      "options": {
        "a": {
          "text": "Continúan los relevos de los medios terrestres. La Unidad Militar de Emergencias se ha unido a ellos",
          "rationale": "Mantiene la presión operativa, pero puede quedarse corta si no se refuerza la protección del núcleo urbano.",
          "shortFeedback": "Mantiene la presión operativa, pero puede quedarse corta si no se refuerza la protección del núcleo urbano."
        },
        "b": {
          "text": "La Unidad Militar de Emergencias se ha unido y los medios aéreos deben continuar",
          "rationale": "Combina continuidad aérea y refuerzo terrestre para sostener la contención en una fase crítica.",
          "shortFeedback": "Combina continuidad aérea y refuerzo terrestre para sostener la contención en una fase crítica."
        },
        "c": {
          "text": "Creas un perímetro de protección alrededor del núcleo de viviendas con maquinaria y brigadas",
          "rationale": "Prioriza la defensa de viviendas y mejora la capacidad de frenar la llegada del frente al casco habitado.",
          "shortFeedback": "Prioriza la defensa de viviendas y mejora la capacidad de frenar la llegada del frente al casco habitado."
        },
        "d": {
          "text": "Ordenas apagar primero los jardines y piscinas de las casas para evitar que el fuego llegue",
          "rationale": "No centra recursos en los puntos de mayor propagación y puede resultar insuficiente como estrategia principal.",
          "shortFeedback": "No centra recursos en los puntos de mayor propagación y puede resultar insuficiente como estrategia principal."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-010d-zona-barranco": {
      "title": "Intervención en zona de barranco",
      "estimatedTime": "2 min",
      "tags": [
        "operaciones"
      ],
      "context": "Las llamas llegan a una zona de barranco…",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Las llamas llegan a una zona de barranco…",
      "options": {
        "a": {
          "text": "Das las órdenes para que lleguen allí los hidroaviones",
          "rationale": "Aporta alta capacidad de descarga en un terreno complejo donde el acceso terrestre puede estar limitado.",
          "shortFeedback": "Aporta alta capacidad de descarga en un terreno complejo donde el acceso terrestre puede estar limitado."
        },
        "b": {
          "text": "Ordenas desviar un camión de bomberos para que baje al fondo del barranco",
          "rationale": "Puede comprometer la seguridad y la maniobrabilidad del vehículo en una zona de difícil acceso.",
          "shortFeedback": "Puede comprometer la seguridad y la maniobrabilidad del vehículo en una zona de difícil acceso."
        },
        "c": {
          "text": "Pides a los helicópteros que acudan a la zona de barranco",
          "rationale": "Los helicópteros ofrecen flexibilidad táctica y precisión de descarga en relieve abrupto.",
          "shortFeedback": "Los helicópteros ofrecen flexibilidad táctica y precisión de descarga en relieve abrupto."
        },
        "d": {
          "text": "Ordenas a las brigadas terrestres que ataquen el flanco del incendio desde la parte alta del barranco",
          "rationale": "Puede ser útil en combinación con medios aéreos, pero aislado incrementa exposición del personal.",
          "shortFeedback": "Puede ser útil en combinación con medios aéreos, pero aislado incrementa exposición del personal."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-011-corte-carretera-acceso": {
      "title": "Corte de carretera de acceso",
      "estimatedTime": "2 min",
      "tags": [
        "carretera",
        "accesos",
        "evacuacion",
        "proteccion-civil",
        "trafico",
        "humo",
        "rutas-alternativas"
      ],
      "context": "Una carretera secundaria que servía como vía principal de acceso a la zona afectada queda cortada por humo denso, caída de ramas y avance del fuego en los márgenes.",
      "question": "¿Cómo gestionas el corte de la carretera de acceso?",
      "briefing": "La situación se acelera. La carretera que hasta ahora permitía el acceso de medios terrestres y la salida controlada de vecinos deja de ser segura. El humo reduce la visibilidad, el viento empuja el fuego hacia los márgenes de la vía y hay riesgo de que algunos vehículos queden atrapados si intentan pasar por su cuenta. Los equipos sobre el terreno solicitan una decisión rápida: mantener el corte, buscar una ruta alternativa o intentar abrir paso de forma controlada. La prioridad es evitar atrapamientos, garantizar la seguridad de los equipos y dar instrucciones claras a la población afectada.",
      "options": {
        "a": {
          "text": "Mantener el corte de la carretera, señalizarlo con apoyo de seguridad, informar a la población de que no intente pasar y coordinar de inmediato rutas alternativas verificadas para equipos y vecinos.",
          "rationale": "Respuesta adecuada. Si la vía no es segura, mantener el corte evita atrapamientos. La clave no es solo cerrar: es explicar, señalizar y activar alternativas reales.",
          "shortFeedback": "Respuesta adecuada. Si la vía no es segura, mantener el corte evita atrapamientos. La clave no es solo cerrar: es explicar, señalizar y activar alternativas reales."
        },
        "b": {
          "text": "Permitir el paso de vecinos durante unos minutos para que puedan salir antes de que el fuego avance más.",
          "rationale": "Respuesta incorrecta. Abrir una vía insegura “solo un momento” puede acabar en vehículos atrapados, humo, pánico y una emergencia dentro de la emergencia. El incendio no respeta turnos de cortesía.",
          "shortFeedback": "Respuesta incorrecta. Abrir una vía insegura “solo un momento” puede acabar en vehículos atrapados, humo, pánico y una emergencia dentro de la emergencia. El incendio no respeta turnos de cortesía."
        },
        "c": {
          "text": "Enviar una unidad de reconocimiento para evaluar rutas secundarias, confirmar su estado antes de usarlas y comunicar al puesto de mando qué accesos son seguros, cuáles quedan descartados y dónde se necesita control de tráfico.",
          "rationale": "Respuesta adecuada. Las rutas alternativas no se improvisan sobre un mapa bonito. Hay que verificarlas sobre el terreno antes de mover población o medios.",
          "shortFeedback": "Respuesta adecuada. Las rutas alternativas no se improvisan sobre un mapa bonito. Hay que verificarlas sobre el terreno antes de mover población o medios."
        },
        "d": {
          "text": "Desviar a todos los vehículos por cualquier camino rural disponible para descongestionar la carretera cortada.",
          "rationale": "Respuesta incorrecta. Un camino rural no comprobado puede ser estrecho, sin salida, estar afectado por humo o no permitir el paso de vehículos de emergencia. Eso no es una alternativa: es una trampa con polvo.",
          "shortFeedback": "Respuesta incorrecta. Un camino rural no comprobado puede ser estrecho, sin salida, estar afectado por humo o no permitir el paso de vehículos de emergencia. Eso no es una alternativa: es una trampa con polvo."
        },
        "e": {
          "text": "Retirar a los agentes del corte para reforzar otras zonas y dejar que cada conductor decida si puede pasar o no.",
          "rationale": "Respuesta incorrecta. Sin control, una carretera cortada se convierte en una invitación al caos. En una emergencia, la señal más peligrosa es la ausencia de señal.",
          "shortFeedback": "Respuesta incorrecta. Sin control, una carretera cortada se convierte en una invitación al caos. En una emergencia, la señal más peligrosa es la ausencia de señal."
        }
      },
      "sourceNotes": {
        "note-001": "El corte de una vía insegura debe ir acompañado de señalización, control de tráfico e información clara a la población.",
        "note-002": "Las rutas alternativas deben verificarse antes de utilizarlas para evacuación o entrada de medios de emergencia."
      }
    },
    "s-012-fallo-comunicaciones-radio": {
      "title": "Fallo de comunicaciones por radio",
      "estimatedTime": "2 min",
      "tags": [
        "comunicaciones",
        "radio",
        "coordinacion",
        "puesto-mando",
        "brigadas",
        "evacuacion",
        "emergencia"
      ],
      "context": "Durante la fase crítica del incendio, varias unidades desplegadas sobre el terreno informan de fallos intermitentes en las comunicaciones por radio.",
      "question": "¿Cómo gestionas el fallo de comunicaciones por radio durante la emergencia?",
      "briefing": "El incendio avanza por varios frentes y la situación exige coordinación constante entre el puesto de mando avanzado, las brigadas, los cuerpos de seguridad y los equipos de evacuación. Sin embargo, las comunicaciones por radio empiezan a fallar en algunas zonas. Hay mensajes entrecortados, unidades que no confirman recepción y dudas sobre la ubicación exacta de varios equipos. Si el problema no se gestiona rápido, pueden producirse órdenes contradictorias, duplicidad de esfuerzos, retrasos en evacuaciones y riesgo para los equipos que trabajan cerca del fuego. La prioridad es mantener la cadena de mando, asegurar canales alternativos y confirmar que las unidades críticas reciben instrucciones claras.",
      "options": {
        "a": {
          "text": "Activar un protocolo de comunicaciones alternativas, establecer canales secundarios o enlaces por telefonía/satélite si están disponibles, y priorizar los mensajes críticos: ubicación de equipos, cambios de viento, evacuaciones y órdenes de repliegue.",
          "rationale": "Respuesta adecuada. Ante un fallo de radio, no basta con “seguir intentando”. Hay que ordenar la comunicación, priorizar lo urgente y usar canales alternativos sin romper la cadena de mando.",
          "shortFeedback": "Respuesta adecuada. Ante un fallo de radio, no basta con “seguir intentando”. Hay que ordenar la comunicación, priorizar lo urgente y usar canales alternativos sin romper la cadena de mando."
        },
        "b": {
          "text": "Mantener todas las operaciones igual y esperar a que la señal se recupere por sí sola.",
          "rationale": "Respuesta incorrecta. En una emergencia dinámica, esperar sin adaptar la coordinación puede dejar a equipos sin instrucciones, duplicar esfuerzos o retrasar decisiones críticas.",
          "shortFeedback": "Respuesta incorrecta. En una emergencia dinámica, esperar sin adaptar la coordinación puede dejar a equipos sin instrucciones, duplicar esfuerzos o retrasar decisiones críticas."
        },
        "c": {
          "text": "Designar puntos de enlace y responsables de comunicación en zonas clave para confirmar órdenes, recopilar posiciones y trasladar información al puesto de mando de forma periódica.",
          "rationale": "Respuesta adecuada. Los enlaces ayudan a reconstruir la coordinación cuando la radio falla. Ponen orden donde el ruido empieza a mandar más que la emergencia, que ya es decir.",
          "shortFeedback": "Respuesta adecuada. Los enlaces ayudan a reconstruir la coordinación cuando la radio falla. Ponen orden donde el ruido empieza a mandar más que la emergencia, que ya es decir."
        },
        "d": {
          "text": "Permitir que cada unidad tome decisiones de forma autónoma hasta que vuelvan las comunicaciones.",
          "rationale": "Respuesta incorrecta. La autonomía total puede romper la estrategia común y provocar decisiones incompatibles entre sí. En un incendio con varios frentes, la improvisación se contagia más rápido que un mal audio de WhatsApp.",
          "shortFeedback": "Respuesta incorrecta. La autonomía total puede romper la estrategia común y provocar decisiones incompatibles entre sí. En un incendio con varios frentes, la improvisación se contagia más rápido que un mal audio de WhatsApp."
        },
        "e": {
          "text": "Saturar todos los canales disponibles repitiendo continuamente los mismos mensajes para asegurarse de que alguien los escuche.",
          "rationale": "Respuesta incorrecta. Saturar los canales puede impedir que entren mensajes realmente urgentes. En crisis, comunicar más no siempre es comunicar mejor: a veces es atascar la autopista con sirenas.",
          "shortFeedback": "Respuesta incorrecta. Saturar los canales puede impedir que entren mensajes realmente urgentes. En crisis, comunicar más no siempre es comunicar mejor: a veces es atascar la autopista con sirenas."
        }
      },
      "sourceNotes": {
        "note-001": "Ante fallos de comunicación en una emergencia, la prioridad es mantener la cadena de mando y asegurar canales alternativos.",
        "note-002": "La comunicación operativa debe priorizar mensajes críticos, evitar saturación y confirmar recepción de órdenes esenciales."
      }
    },
    "s-012-rescate-zona-peligrosa": {
      "title": "Vecino que se niega a evacuar",
      "estimatedTime": "2 min",
      "tags": [
        "operaciones"
      ],
      "context": "Han continuado las evacuaciones, sin embargo, a primera hora llega una alarma al Puesto de Mando Avanzado: un vecino no ha querido abandonar su vivienda y donde se encuentra las llamas avanzan sin control. Hablas con el resto del equipo…",
      "question": "¿Cómo respondes ante este escenario?",
      "briefing": "Han continuado las evacuaciones, sin embargo, a primera hora llega una alarma al Puesto de Mando Avanzado: un vecino no ha querido abandonar su vivienda y donde se encuentra las llamas avanzan sin control. Hablas con el resto del equipo…",
      "options": {
        "a": {
          "text": "Decidís mandar una brigada para que obligue al vecino a abandonar su vivienda, si no podría morir.",
          "rationale": "La intención es protectora, pero una entrada forzosa en zona de llama fuera de control puede poner en grave riesgo a la brigada.",
          "shortFeedback": "La intención es protectora, pero una entrada forzosa en zona de llama fuera de control puede poner en grave riesgo a la brigada."
        },
        "b": {
          "text": "La zona es demasiado peligrosa, tomáis la decisión de no mandar ningún equipo ante el riesgo de no poder salir de la zona.",
          "rationale": "Aplica criterio de seguridad operativa cuando la extracción no es viable sin comprometer más vidas.",
          "shortFeedback": "Aplica criterio de seguridad operativa cuando la extracción no es viable sin comprometer más vidas."
        },
        "c": {
          "text": "Intentáis evacuar al vecino con un helicóptero si las condiciones lo permiten",
          "rationale": "Es una alternativa de extracción más segura en escenarios concretos, siempre sujeta a viabilidad aérea.",
          "shortFeedback": "Es una alternativa de extracción más segura en escenarios concretos, siempre sujeta a viabilidad aérea."
        },
        "d": {
          "text": "Le pedís al vecino que moje su casa con una manguera hasta que pase el incendio",
          "rationale": "No es una medida de autoprotección suficiente en un frente sin control y puede aumentar el riesgo para la persona aislada.",
          "shortFeedback": "No es una medida de autoprotección suficiente en un frente sin control y puede aumentar el riesgo para la persona aislada."
        }
      },
      "sourceNotes": {
        "note-001": "Migrado desde EMERGENCY_TRAINING_SCENARIOS."
      }
    },
    "s-014-finca-ganadera-atrapada": {
      "title": "Finca ganadera atrapada por el avance del fuego",
      "estimatedTime": "2 min",
      "tags": [
        "ganaderia",
        "evacuacion",
        "proteccion-civil",
        "zona-rural",
        "animales",
        "accesos",
        "riesgo"
      ],
      "context": "Una finca ganadera queda en una zona amenazada por el avance del fuego. Los accesos son complicados y varios ganaderos piden entrar para sacar a los animales.",
      "question": "¿Cómo gestionas la situación de una finca ganadera atrapada por el incendio?",
      "briefing": "El avance del fuego amenaza una finca con ganado en su interior. Los caminos de acceso son estrechos y están expuestos al humo, a la caída de material vegetal y a posibles cambios bruscos del viento. Varios ganaderos solicitan permiso para entrar por su cuenta y evacuar a los animales. Los equipos de emergencia advierten de que la intervención puede ser peligrosa si no se coordina bien. Debes tomar una decisión que proteja a las personas, tenga en cuenta el bienestar animal y evite que una acción improvisada genere nuevos rescates.",
      "options": {
        "a": {
          "text": "Priorizar la seguridad de las personas, ordenar la evacuación de los vecinos y trabajadores expuestos, y coordinar con los servicios de emergencia una valoración rápida para rescatar o proteger al ganado solo si las condiciones lo permiten.",
          "rationale": "Respuesta adecuada. En una emergencia, la vida humana es la prioridad. El ganado puede requerir apoyo específico, pero no debe ponerse en riesgo a personas sin una ruta ni una intervención segura.",
          "shortFeedback": "Respuesta adecuada. En una emergencia, la vida humana es la prioridad. El ganado puede requerir apoyo específico, pero no debe ponerse en riesgo a personas sin una ruta ni una intervención segura."
        },
        "b": {
          "text": "Permitir que los ganaderos entren por su cuenta a la finca para sacar a los animales antes de que llegue el fuego.",
          "rationale": "Respuesta incorrecta. Aunque la intención sea comprensible, dejar que personas entren sin control en una zona amenazada puede generar atrapamientos y obligar a desviar recursos para rescatarlas.",
          "shortFeedback": "Respuesta incorrecta. Aunque la intención sea comprensible, dejar que personas entren sin control en una zona amenazada puede generar atrapamientos y obligar a desviar recursos para rescatarlas."
        },
        "c": {
          "text": "Activar un dispositivo coordinado con Protección Civil, agentes de medio ambiente y responsables ganaderos para identificar accesos seguros, posibles zonas de resguardo animal y necesidades urgentes de traslado.",
          "rationale": "Respuesta adecuada. La respuesta debe ser coordinada y realista: evaluar accesos, tiempos, medios disponibles y zonas seguras antes de mover animales o personas.",
          "shortFeedback": "Respuesta adecuada. La respuesta debe ser coordinada y realista: evaluar accesos, tiempos, medios disponibles y zonas seguras antes de mover animales o personas."
        },
        "d": {
          "text": "Ordenar que todos los recursos disponibles se destinen al rescate del ganado, aunque eso retrase la evacuación de la población cercana.",
          "rationale": "Respuesta incorrecta. El ganado importa, y mucho, pero no puede desplazar la protección de las personas. Cambiar la prioridad puede agravar la emergencia y dejar a vecinos en riesgo.",
          "shortFeedback": "Respuesta incorrecta. El ganado importa, y mucho, pero no puede desplazar la protección de las personas. Cambiar la prioridad puede agravar la emergencia y dejar a vecinos en riesgo."
        },
        "e": {
          "text": "Ignorar la situación de la finca porque los animales no forman parte de la emergencia principal.",
          "rationale": "Respuesta incorrecta. La ganadería sí forma parte del impacto del incendio: puede afectar a medios de vida, generar presión social y provocar decisiones peligrosas si no se gestiona. No atenderlo es dejar una mecha encendida, literalmente y en sentido figurado.",
          "shortFeedback": "Respuesta incorrecta. La ganadería sí forma parte del impacto del incendio: puede afectar a medios de vida, generar presión social y provocar decisiones peligrosas si no se gestiona. No atenderlo es dejar una mecha encendida, literalmente y en sentido figurado."
        }
      },
      "sourceNotes": {
        "note-001": "La seguridad de las personas debe ser prioritaria en cualquier operación de evacuación o rescate.",
        "note-002": "La gestión de explotaciones ganaderas en incendios requiere coordinación operativa, evaluación de accesos y comunicación clara con los propietarios."
      }
    },
    "s-019-apagon-plena-emergencia": {
      "title": "Apagón en plena emergencia",
      "estimatedTime": "2 min",
      "tags": [
        "apagon",
        "linea-electrica",
        "infraestructuras-criticas",
        "comunicaciones",
        "agua",
        "personas-vulnerables",
        "generadores",
        "evacuacion-parcial"
      ],
      "context": "El avance del fuego afecta una línea eléctrica y deja sin suministro a un núcleo poblado cercano a la zona de riesgo.",
      "question": "¿Cómo gestionas el apagón en un núcleo afectado por la emergencia?",
      "briefing": "El incendio ha dañado una línea eléctrica y el núcleo queda sin luz en plena evolución de la emergencia. La situación genera varios problemas a la vez: las comunicaciones móviles son inestables, algunas viviendas pierden acceso al agua porque dependen de bombas eléctricas y parte de la población tiene dificultades para recibir instrucciones oficiales. Además, el ayuntamiento informa de que hay personas mayores, vecinos con movilidad reducida y familias que no saben si deben quedarse, prepararse para evacuar o acudir a otro punto. Tenemos que decidir cómo actuar: garantizar información directa, proteger a las personas vulnerables, asegurar recursos básicos y valorar si conviene activar generadores, puntos de apoyo o una evacuación parcial antes de que el apagón complique todavía más la respuesta.",
      "options": {
        "a": {
          "text": "Activar equipos municipales y de Protección Civil para hacer información puerta a puerta en las zonas más vulnerables, identificar personas mayores o dependientes y comprobar quién necesita apoyo inmediato.",
          "rationale": "Respuesta adecuada. Si falla la luz y la telefonía es inestable, no basta con publicar avisos. Hay que llevar la información hasta la población que puede quedarse fuera del radar.",
          "shortFeedback": "Respuesta adecuada. Si falla la luz y la telefonía es inestable, no basta con publicar avisos. Hay que llevar la información hasta la población que puede quedarse fuera del radar."
        },
        "b": {
          "text": "Esperar a que la compañía eléctrica restablezca el suministro antes de tomar nuevas decisiones operativas.",
          "rationale": "Respuesta incorrecta. El apagón afecta a la seguridad, la comunicación y el acceso a recursos básicos. Esperar sin medidas de apoyo puede dejar aisladas a personas vulnerables.",
          "shortFeedback": "Respuesta incorrecta. El apagón afecta a la seguridad, la comunicación y el acceso a recursos básicos. Esperar sin medidas de apoyo puede dejar aisladas a personas vulnerables."
        },
        "c": {
          "text": "Priorizar generadores y recursos de apoyo para puntos críticos, como centro social, consultorio, sistemas de bombeo de agua o zonas de acogida, mientras se prepara una posible evacuación parcial si el riesgo aumenta.",
          "rationale": "Respuesta adecuada. Los generadores deben asignarse donde sostienen funciones esenciales. No se trata de iluminar el pueblo como en fiestas, sino de mantener servicios vitales.",
          "shortFeedback": "Respuesta adecuada. Los generadores deben asignarse donde sostienen funciones esenciales. No se trata de iluminar el pueblo como en fiestas, sino de mantener servicios vitales."
        },
        "d": {
          "text": "Pedir a la población que acuda por su cuenta al punto más cercano con luz para informarse y cargar teléfonos.",
          "rationale": "Respuesta incorrecta. Puede generar desplazamientos innecesarios, saturar vías y reunir a personas en lugares que quizá no son seguros. En una emergencia, “vayan donde haya enchufe” no es un plan; es una romería eléctrica.",
          "shortFeedback": "Respuesta incorrecta. Puede generar desplazamientos innecesarios, saturar vías y reunir a personas en lugares que quizá no son seguros. En una emergencia, “vayan donde haya enchufe” no es un plan; es una romería eléctrica."
        },
        "e": {
          "text": "Centrar todos los recursos en reparar la línea eléctrica, aunque eso retrase la atención a vecinos vulnerables y la gestión del agua.",
          "rationale": "Respuesta incorrecta. Recuperar la electricidad es importante, pero no puede desplazar la protección inmediata de la población. La emergencia no espera a que vuelva el fluorescente.",
          "shortFeedback": "Respuesta incorrecta. Recuperar la electricidad es importante, pero no puede desplazar la protección inmediata de la población. La emergencia no espera a que vuelva el fluorescente."
        }
      },
      "sourceNotes": {
        "note-001": "Un apagón durante una emergencia puede afectar a comunicaciones, abastecimiento de agua, atención a personas vulnerables y capacidad de recibir instrucciones oficiales.",
        "note-002": "La respuesta debe combinar información directa, apoyo a puntos críticos, priorización de recursos básicos y valoración de evacuación parcial si el riesgo aumenta."
      }
    },
    "s-020-fuego-amenaza-subestacion-electrica": {
      "title": "El fuego amenaza una subestación eléctrica",
      "estimatedTime": "2 min",
      "tags": [
        "subestacion-electrica",
        "infraestructuras-criticas",
        "apagones",
        "proteccion-civil",
        "servicios-esenciales",
        "evacuacion",
        "coordinacion"
      ],
      "context": "El incendio se aproxima a una subestación eléctrica que abastece a varios núcleos de población y servicios esenciales.",
      "question": "¿Cómo gestionas la amenaza sobre una infraestructura crítica sin descuidar la protección de la población?",
      "briefing": "El frente avanza hacia una subestación eléctrica situada cerca de una zona forestal. La instalación abastece a varios núcleos, un centro de salud, sistemas de bombeo de agua y comunicaciones municipales. Los técnicos de la compañía eléctrica solicitan apoyo para proteger el perímetro y facilitar una intervención preventiva. Sin embargo, los medios de extinción también están siendo necesarios en otro flanco, donde hay viviendas dispersas y varias personas pendientes de una posible evacuación. La decisión es delicada: proteger la subestación puede evitar un apagón que agrave toda la emergencia, pero desviar demasiados recursos podría debilitar la defensa de zonas habitadas. La prioridad es equilibrar la protección de la población con la defensa de servicios esenciales, sin perder de vista que las personas siguen siendo el criterio principal de decisión.",
      "options": {
        "a": {
          "text": "Mantener como prioridad la protección de la población y destinar recursos proporcionados a la subestación solo si no comprometen la defensa de viviendas, evacuaciones o zonas con personas en riesgo.",
          "rationale": "Respuesta adecuada. La infraestructura es importante porque sostiene servicios esenciales, pero no puede desplazar la protección directa de la población. La clave está en equilibrar, no en elegir a ciegas.",
          "shortFeedback": "Respuesta adecuada. La infraestructura es importante porque sostiene servicios esenciales, pero no puede desplazar la protección directa de la población. La clave está en equilibrar, no en elegir a ciegas."
        },
        "b": {
          "text": "Retirar medios del flanco con viviendas para concentrarlos en la defensa de la subestación, ya que un apagón afectaría a más personas.",
          "rationale": "Respuesta incorrecta. Aunque la subestación sea crítica, abandonar un flanco con población expuesta puede generar un riesgo inmediato mayor. No se protege a la gente dejando a la gente desprotegida.",
          "shortFeedback": "Respuesta incorrecta. Aunque la subestación sea crítica, abandonar un flanco con población expuesta puede generar un riesgo inmediato mayor. No se protege a la gente dejando a la gente desprotegida."
        },
        "c": {
          "text": "Coordinar con la compañía eléctrica, Protección Civil y el puesto de mando una defensa técnica de la instalación, evaluando accesos, riesgos eléctricos, cortes preventivos y recursos mínimos necesarios para reducir el impacto sin desatender otros frentes.",
          "rationale": "Respuesta adecuada. Las infraestructuras críticas requieren coordinación especializada. No basta con mandar medios: hay que saber qué riesgos hay, qué se puede cortar, qué se puede proteger y qué impacto tendría cada decisión.",
          "shortFeedback": "Respuesta adecuada. Las infraestructuras críticas requieren coordinación especializada. No basta con mandar medios: hay que saber qué riesgos hay, qué se puede cortar, qué se puede proteger y qué impacto tendría cada decisión."
        },
        "d": {
          "text": "Ignorar la amenaza sobre la subestación porque las infraestructuras materiales siempre pueden repararse después del incendio.",
          "rationale": "Respuesta incorrecta. Algunas infraestructuras sostienen servicios básicos. Si fallan, pueden agravar la emergencia: menos comunicaciones, menos agua, más personas vulnerables en riesgo y más caos operativo.",
          "shortFeedback": "Respuesta incorrecta. Algunas infraestructuras sostienen servicios básicos. Si fallan, pueden agravar la emergencia: menos comunicaciones, menos agua, más personas vulnerables en riesgo y más caos operativo."
        },
        "e": {
          "text": "Permitir que los técnicos de la compañía entren solos en la zona para proteger la instalación mientras los medios de emergencia siguen en otros frentes.",
          "rationale": "Respuesta incorrecta. Los técnicos conocen la instalación, pero no deben operar solos en una zona amenazada por fuego, humo o cambios de viento. La especialización no convierte a nadie en ignífugo, por mucho casco que lleve.",
          "shortFeedback": "Respuesta incorrecta. Los técnicos conocen la instalación, pero no deben operar solos en una zona amenazada por fuego, humo o cambios de viento. La especialización no convierte a nadie en ignífugo, por mucho casco que lleve."
        }
      },
      "sourceNotes": {
        "note-001": "Las infraestructuras críticas deben protegerse cuando su fallo pueda agravar la emergencia o afectar a servicios esenciales.",
        "note-002": "La protección de infraestructuras no debe comprometer la prioridad principal: la seguridad de la población y de los equipos de intervención."
      }
    },
    "s-021-humo-viento-helicopteros-tierra": {
      "title": "Humo y viento dejan en tierra a los helicópteros",
      "estimatedTime": "2 min",
      "tags": [
        "medios-aereos",
        "helicopteros",
        "humo",
        "viento",
        "brigadas",
        "repliegue",
        "estrategia-terrestre"
      ],
      "context": "La baja visibilidad por humo y las rachas de viento impiden operar a los medios aéreos con seguridad.",
      "question": "¿Cómo reorganizas la estrategia cuando los medios aéreos no pueden operar?",
      "briefing": "El incendio avanza por una zona de pendiente complicada y vegetación densa. Hasta ahora, los medios aéreos estaban ayudando a contener el frente, pero el aumento del humo y las rachas de viento hacen inseguras las descargas. La coordinación aérea comunica que los helicópteros no podrán operar hasta que mejore la visibilidad y se reduzca el riesgo para las tripulaciones. Sobre el terreno, varias brigadas trabajan en una zona expuesta y esperaban apoyo aéreo para frenar el avance. Si se mantiene la misma estrategia sin ese respaldo, los equipos podrían quedar en una posición vulnerable. La prioridad es reorganizar la intervención terrestre, proteger a las brigadas, valorar repliegues tácticos y preparar una nueva ventana de trabajo para cuando los medios aéreos puedan volver a operar.",
      "options": {
        "a": {
          "text": "Reorganizar la estrategia terrestre, revisar la seguridad de las brigadas desplegadas, reforzar puntos defendibles y ordenar repliegues tácticos si alguna unidad queda expuesta sin apoyo aéreo.",
          "rationale": "Respuesta adecuada. Si desaparece el apoyo aéreo, la estrategia debe cambiar. Mantener a equipos en posiciones pensadas para otra situación puede convertir una operación difícil en una trampa.",
          "shortFeedback": "Respuesta adecuada. Si desaparece el apoyo aéreo, la estrategia debe cambiar. Mantener a equipos en posiciones pensadas para otra situación puede convertir una operación difícil en una trampa."
        },
        "b": {
          "text": "Mantener a las brigadas en las mismas posiciones y esperar a que los helicópteros puedan volver a volar.",
          "rationale": "Respuesta incorrecta. Esperar sin adaptar la estrategia puede dejar a los equipos expuestos a cambios de viento, humo y avance rápido del fuego. El cielo no siempre vuelve a abrirse cuando uno lo necesita.",
          "shortFeedback": "Respuesta incorrecta. Esperar sin adaptar la estrategia puede dejar a los equipos expuestos a cambios de viento, humo y avance rápido del fuego. El cielo no siempre vuelve a abrirse cuando uno lo necesita."
        },
        "c": {
          "text": "Coordinar con meteorología, dirección de extinción y mandos terrestres una reevaluación continua de viento, visibilidad y comportamiento del fuego, preparando prioridades claras para una posible reactivación de medios aéreos.",
          "rationale": "Respuesta adecuada. No basta con dejar los helicópteros en tierra. Hay que anticipar cuándo podrán volver, dónde serán más útiles y cómo encajar su regreso en la estrategia general.",
          "shortFeedback": "Respuesta adecuada. No basta con dejar los helicópteros en tierra. Hay que anticipar cuándo podrán volver, dónde serán más útiles y cómo encajar su regreso en la estrategia general."
        },
        "d": {
          "text": "Ordenar a los pilotos que realicen descargas puntuales aunque la visibilidad sea mala, porque el frente está avanzando demasiado rápido.",
          "rationale": "Respuesta incorrecta. Forzar operaciones aéreas en condiciones inseguras pone en riesgo a las tripulaciones y puede provocar accidentes graves. Un helicóptero no es una moneda para lanzar al humo.",
          "shortFeedback": "Respuesta incorrecta. Forzar operaciones aéreas en condiciones inseguras pone en riesgo a las tripulaciones y puede provocar accidentes graves. Un helicóptero no es una moneda para lanzar al humo."
        },
        "e": {
          "text": "Suspender toda la intervención hasta que los medios aéreos puedan operar de nuevo.",
          "rationale": "Respuesta incorrecta. Que no vuelen los helicópteros no significa que la emergencia se congele. Hay que adaptar la estrategia terrestre, proteger zonas prioritarias y mantener acciones seguras mientras cambia la situación.",
          "shortFeedback": "Respuesta incorrecta. Que no vuelen los helicópteros no significa que la emergencia se congele. Hay que adaptar la estrategia terrestre, proteger zonas prioritarias y mantener acciones seguras mientras cambia la situación."
        }
      },
      "sourceNotes": {
        "note-001": "Los medios aéreos deben operar solo cuando las condiciones de visibilidad, viento y seguridad lo permiten.",
        "note-002": "La pérdida temporal del apoyo aéreo obliga a revisar la estrategia terrestre, proteger a los equipos desplegados y valorar repliegues tácticos."
      }
    },
    "s-022-evacuacion-con-mascotas": {
      "title": "Evacuación con mascotas",
      "estimatedTime": "2 min",
      "tags": [
        "mascotas",
        "animales-domesticos",
        "evacuacion",
        "proteccion-civil",
        "albergues",
        "transporte",
        "poblacion"
      ],
      "context": "Se ordena la evacuación preventiva de varios barrios próximos al frente del incendio, pero numerosos vecinos se niegan a salir si no pueden llevarse a sus mascotas.",
      "question": "¿Cómo gestionas una evacuación en la que muchas personas se niegan a salir sin sus mascotas?",
      "briefing": "La evacuación avanza más despacio de lo previsto. En varios puntos, los equipos informan de que algunas familias se resisten a abandonar sus viviendas porque no quieren dejar atrás a sus animales domésticos. La situación genera tensión: cada minuto cuenta, pero separar a las personas de sus mascotas puede aumentar la resistencia, provocar decisiones improvisadas y retrasar la salida de zonas en riesgo. Además, no todos los recursos están preparados para transportar animales y los albergues iniciales no cuentan con espacios diferenciados para mascotas. Tenemos que decidir cómo actuar: facilitar la evacuación sin perder seguridad, evitar retrasos peligrosos, ordenar los flujos de personas y animales, y habilitar soluciones realistas para que la población coopere.",
      "options": {
        "a": {
          "text": "Habilitar un punto de acogida o zona diferenciada para mascotas, coordinar transporte cuando sea necesario y comunicar claramente que las personas pueden evacuar con sus animales siguiendo las instrucciones de los equipos.",
          "rationale": "Permitir una salida organizada con mascotas reduce la resistencia a evacuar y evita que la población tome decisiones peligrosas por su cuenta.",
          "shortFeedback": "Respuesta adecuada. El vínculo con los animales también cuenta en la emergencia."
        },
        "b": {
          "text": "Prohibir que las personas evacúen con mascotas para agilizar el operativo y evitar complicaciones en los albergues.",
          "rationale": "Una prohibición rígida puede provocar que muchas personas se nieguen a salir, vuelvan a zonas peligrosas o intenten esconder animales en vehículos sin control.",
          "shortFeedback": "Respuesta incorrecta. Lo que parece orden puede acabar en bloqueo."
        },
        "c": {
          "text": "Separar y ordenar los flujos de evacuación: personas vulnerables primero, familias con mascotas en vehículos o transporte habilitado, registro básico de animales y derivación a espacios seguros preparados para acogerlos.",
          "rationale": "Un flujo claro evita retrasos, reduce estrés y permite saber quién sale, con qué animal y hacia dónde.",
          "shortFeedback": "Respuesta adecuada. Organizar no significa improvisar jaulas en una esquina."
        },
        "d": {
          "text": "Indicar a los vecinos que suelten a los animales para que puedan escapar por sí solos y centrarse solo en la evacuación humana.",
          "rationale": "Soltar mascotas puede causar accidentes, animales perdidos, riesgos sanitarios y más angustia para las familias.",
          "shortFeedback": "Respuesta incorrecta. Además, puede hacer que algunas personas regresen a buscarlas."
        },
        "e": {
          "text": "Permitir que cada familia resuelva el traslado de sus mascotas como pueda, sin instrucciones específicas, para no complicar el dispositivo oficial.",
          "rationale": "La falta de instrucciones genera improvisación, retrasos y conflictos en los puntos de evacuación.",
          "shortFeedback": "Respuesta incorrecta. En una emergencia, “arréglense como puedan” es casi siempre el principio de otro problema."
        }
      },
      "sourceNotes": {
        "note-001": "Incluir a las mascotas en la planificación de evacuaciones puede reducir la resistencia de la población a abandonar zonas de riesgo.",
        "note-002": "La evacuación con animales domésticos requiere comunicación clara, espacios diferenciados, registro básico y coordinación de transporte cuando sea necesario."
      }
    },
    "s-023-centro-mayores-riesgo": {
      "title": "Centro de mayores en zona de riesgo",
      "estimatedTime": "2 min",
      "tags": [
        "centro-mayores",
        "evacuacion",
        "proteccion-civil",
        "personas-vulnerables",
        "movilidad-reducida",
        "humo",
        "transporte-sanitario"
      ],
      "context": "El incendio avanza hacia una zona donde se encuentra un centro de mayores. El humo empieza a afectar al entorno y las carreteras de acceso podrían quedar comprometidas si el viento cambia.",
      "question": "¿Cómo gestionas la protección y posible evacuación del centro de mayores?",
      "briefing": "La situación es delicada. El centro de mayores no está todavía directamente alcanzado por el fuego, pero el humo empieza a ser visible y las rutas de salida podrían empeorar en poco tiempo. La dirección del centro solicita instrucciones claras. Algunos familiares están llamando con insistencia y varias personas quieren acudir por su cuenta a recoger a los residentes. Los equipos de emergencia advierten de que una evacuación mal coordinada puede generar retrasos, bloqueos en los accesos y riesgos añadidos para personas frágiles. La prioridad es proteger a los residentes, coordinar el traslado con recursos sanitarios y sociales adecuados, evitar movimientos improvisados y mantener informadas a las familias por canales oficiales.",
      "options": {
        "a": {
          "text": "Activar una evacuación coordinada del centro con transporte sanitario y adaptado, priorizando a residentes dependientes, personas con oxígeno, movilidad reducida o deterioro cognitivo, y definiendo un destino seguro antes de iniciar los traslados.",
          "rationale": "Un centro de mayores requiere una evacuación planificada, con recursos adecuados y destino confirmado.",
          "shortFeedback": "Respuesta adecuada. No basta con sacar a la gente: hay que asegurar cómo, en qué orden y a dónde."
        },
        "b": {
          "text": "Pedir a los familiares que acudan al centro cuanto antes para recoger a cada residente y aliviar la carga de los servicios de emergencia.",
          "rationale": "Puede parecer práctico, pero suele generar más caos: tráfico, accesos bloqueados, familias expuestas al riesgo y residentes saliendo sin control sanitario ni registro claro.",
          "shortFeedback": "Respuesta incorrecta. La llegada desordenada de familiares puede agravar la emergencia."
        },
        "c": {
          "text": "Coordinar con la dirección del centro un censo urgente de residentes, necesidades médicas, movilidad, medicación y personal disponible, mientras se prepara una posible evacuación o confinamiento seguro según evolucione el incendio.",
          "rationale": "El censo operativo permite decidir con más precisión y evitar olvidos graves antes de mover a personas vulnerables.",
          "shortFeedback": "Respuesta adecuada. Antes de mover a personas vulnerables, hay que saber quién necesita qué."
        },
        "d": {
          "text": "Esperar hasta que el fuego esté más cerca para no alarmar a los residentes ni movilizar recursos antes de tiempo.",
          "rationale": "En población vulnerable, esperar demasiado reduce el margen de maniobra.",
          "shortFeedback": "Respuesta incorrecta. La calma no se consigue mirando el reloj: se consigue preparando bien la respuesta."
        },
        "e": {
          "text": "Trasladar primero al personal del centro y dejar que los residentes esperen dentro hasta que lleguen más medios.",
          "rationale": "El personal es clave para mantener la atención, la medicación, la información clínica y la tranquilidad de los residentes.",
          "shortFeedback": "Respuesta incorrecta. Retirar al personal sin plan deja al centro en una situación crítica."
        }
      },
      "sourceNotes": {
        "note-001": "La evacuación de personas vulnerables requiere planificación previa, recursos adecuados, priorización sanitaria y destino seguro.",
        "note-002": "En centros sociosanitarios, debe evitarse la llegada desordenada de familiares y mantenerse una comunicación clara por canales oficiales.",
        "note-003": "Renumerado desde id provisional s-013-centro-mayores-riesgo para evitar duplicidad con proteccion-civil/s-013-centro-mayores-riesgo."
      }
    },
    "s-024-quema-tecnica": {
      "title": "Quema tecnica como maniobra de control",
      "estimatedTime": "2 min",
      "tags": [
        "cortafuego",
        "quema-tecnica",
        "maquinaria",
        "zona-agricola",
        "zona-forestal",
        "direccion-extincion",
        "riesgo"
      ],
      "context": "El incendio avanza hacia una zona agricola y forestal con continuidad de combustible. Los tecnicos proponen una maniobra agresiva para frenar el avance.",
      "question": "¿Autorizas una maniobra de cortafuego o quema tecnica para frenar el avance del incendio?",
      "briefing": "El frente del incendio gana velocidad y se dirige hacia una zona donde la vegetacion seca conecta directamente con terrenos agricolas, pistas forestales y viviendas dispersas. Los tecnicos plantean una intervencion de emergencia: crear una discontinuidad en el combustible mediante maquinaria, quemas tecnicas controladas o una combinacion de ambas. La maniobra podria frenar el avance y ganar tiempo para proteger zonas habitadas. Sin embargo, la decision tiene costes. La actuacion puede afectar cultivos, suelo forestal, infraestructuras rurales y generar rechazo entre propietarios que no entienden por que se autoriza provocar mas fuego o destruir parte del terreno. Tenemos que decidir como actuar: valorar el criterio tecnico, medir el riesgo para la poblacion, explicar la medida, coordinar recursos y evitar que una maniobra necesaria se convierta en otro foco de conflicto.",
      "options": {
        "a": {
          "text": "Autorizar la maniobra solo si cuenta con evaluacion tecnica favorable, condiciones meteorologicas compatibles, recursos suficientes para controlarla y una justificacion clara vinculada a la proteccion de personas o bienes esenciales.",
          "rationale": "Una quema tecnica o cortafuego de emergencia no se improvisa. Puede ser util, pero solo con criterio tecnico, control operativo y una finalidad clara.",
          "shortFeedback": "Respuesta adecuada. La autorizacion queda ligada a condiciones tecnicas y de seguridad."
        },
        "b": {
          "text": "Rechazar cualquier quema tecnica o cortafuego porque provocar danos controlados nunca debe formar parte de la respuesta a un incendio.",
          "rationale": "En algunas situaciones, crear discontinuidades o usar fuego tecnico puede evitar un dano mayor. Negarlo por principio puede dejar que el incendio elija el terreno de juego.",
          "shortFeedback": "Respuesta incorrecta. El rechazo absoluto puede cerrar una herramienta util de contencion."
        },
        "c": {
          "text": "Coordinar la actuacion con direccion de extincion, tecnicos forestales, maquinaria, seguridad y comunicacion publica, informando a propietarios y poblacion afectada de por que se realiza y que zonas quedaran protegidas.",
          "rationale": "La maniobra necesita control tecnico y tambien explicacion publica. Si no se comunica bien, la poblacion puede interpretar una decision estrategica como una agresion gratuita al territorio.",
          "shortFeedback": "Respuesta adecuada. La coordinacion tecnica y publica reduce el riesgo operativo y social."
        },
        "d": {
          "text": "Autorizar la quema tecnica de inmediato aunque el viento sea inestable, para adelantarse al frente antes de que llegue a la zona agricola.",
          "rationale": "Con viento inestable, una quema tecnica puede escapar al control y convertirse en otro problema.",
          "shortFeedback": "Respuesta incorrecta. No se combate un incendio anadiendo un nuevo foco descontrolado."
        },
        "e": {
          "text": "Esperar a que el fuego llegue a la zona agricola y decidir entonces, para evitar danos innecesarios si finalmente cambia de direccion.",
          "rationale": "Algunas maniobras necesitan anticipacion. Esperar demasiado puede hacer que ya no haya tiempo, recursos ni condiciones seguras para ejecutarlas.",
          "shortFeedback": "Respuesta incorrecta. En incendios, el ya veremos suele llegar tarde."
        }
      },
      "sourceNotes": {
        "note-001": "Los cortafuegos de emergencia y las quemas tecnicas deben basarse en evaluacion tecnica, condiciones meteorologicas adecuadas y capacidad real de control.",
        "note-002": "Las maniobras que implican danos controlados requieren coordinacion operativa y comunicacion clara con poblacion y propietarios afectados.",
        "note-003": "Actualizado desde el contenido aportado en os-024-quema-tecnica y mantenido como escenario propio para no pisar s-025-cortafuego-emergencia."
      }
    },
    "s-025-cortafuego-emergencia": {
      "title": "Cortafuego de emergencia",
      "estimatedTime": "2 min",
      "tags": [
        "cortafuego",
        "quema-tecnica",
        "maquinaria",
        "zona-agricola",
        "zona-forestal",
        "direccion-extincion",
        "riesgo"
      ],
      "context": "El incendio avanza hacia una zona agrícola y forestal con continuidad de combustible. Los técnicos proponen una maniobra agresiva para frenar el avance.",
      "question": "¿Autorizas una maniobra de cortafuego o quema técnica para frenar el avance del incendio?",
      "briefing": "El frente del incendio gana velocidad y se dirige hacia una zona donde la vegetación seca conecta directamente con terrenos agrícolas, pistas forestales y viviendas dispersas. Los técnicos plantean una intervención de emergencia: crear una discontinuidad en el combustible mediante maquinaria, quemas técnicas controladas o una combinación de ambas. La maniobra podría frenar el avance y ganar tiempo para proteger zonas habitadas. Sin embargo, la decisión tiene costes. La actuación puede afectar cultivos, suelo forestal, infraestructuras rurales y generar rechazo entre propietarios que no entienden por qué se autoriza provocar más fuego o destruir parte del terreno. Tenemos que decidir cómo actuar: valorar el criterio técnico, medir el riesgo para la población, explicar la medida, coordinar recursos y evitar que una maniobra necesaria se convierta en otro foco de conflicto.",
      "options": {
        "a": {
          "text": "Autorizar la maniobra solo si cuenta con evaluación técnica favorable, condiciones meteorológicas compatibles, recursos suficientes para controlarla y una justificación clara vinculada a la protección de personas o bienes esenciales.",
          "rationale": "Una quema técnica o cortafuego de emergencia no se improvisa. Puede ser útil, pero solo con criterio técnico, control operativo y una finalidad clara.",
          "shortFeedback": "Respuesta adecuada. La autorización queda ligada a condiciones técnicas y de seguridad."
        },
        "b": {
          "text": "Rechazar cualquier quema técnica o cortafuego porque provocar daños controlados nunca debe formar parte de la respuesta a un incendio.",
          "rationale": "En algunas situaciones, crear discontinuidades o usar fuego técnico puede evitar un daño mayor. Negarlo por principio puede dejar que el incendio elija el terreno de juego.",
          "shortFeedback": "Respuesta incorrecta. El rechazo absoluto puede cerrar una herramienta útil de contención."
        },
        "c": {
          "text": "Coordinar la actuación con dirección de extinción, técnicos forestales, maquinaria, seguridad y comunicación pública, informando a propietarios y población afectada de por qué se realiza y qué zonas quedarán protegidas.",
          "rationale": "La maniobra necesita control técnico y también explicación pública. Si no se comunica bien, la población puede interpretar una decisión estratégica como una agresión gratuita al territorio.",
          "shortFeedback": "Respuesta adecuada. La coordinación técnica y pública reduce el riesgo operativo y social."
        },
        "d": {
          "text": "Autorizar la quema técnica de inmediato aunque el viento sea inestable, para adelantarse al frente antes de que llegue a la zona agrícola.",
          "rationale": "Con viento inestable, una quema técnica puede escapar al control y convertirse en otro problema.",
          "shortFeedback": "Respuesta incorrecta. No se combate un incendio añadiendo un nuevo foco descontrolado."
        },
        "e": {
          "text": "Esperar a que el fuego llegue a la zona agrícola y decidir entonces, para evitar daños innecesarios si finalmente cambia de dirección.",
          "rationale": "Algunas maniobras necesitan anticipación. Esperar demasiado puede hacer que ya no haya tiempo, recursos ni condiciones seguras para ejecutarlas.",
          "shortFeedback": "Respuesta incorrecta. En incendios, el “ya veremos” suele llegar tarde."
        }
      },
      "sourceNotes": {
        "note-001": "Los cortafuegos de emergencia y las quemas técnicas deben basarse en evaluación técnica, condiciones meteorológicas adecuadas y capacidad real de control.",
        "note-002": "Las maniobras que implican daños controlados requieren coordinación operativa y comunicación clara con población y propietarios afectados.",
        "note-003": "Renombrado desde s-024-quema-tecnica porque el contenido define el escenario s-025-cortafuego-emergencia."
      }
    },
    "s-026-defensa-operativa-nucleo-viviendas": {
      "title": "Defensa operativa del núcleo de viviendas",
      "estimatedTime": "2 min",
      "tags": [
        "defensa-operativa",
        "viviendas",
        "interfaz-urbano-forestal",
        "bomberos",
        "brigadas",
        "pavesas",
        "ataque-indirecto",
        "rutas-escape"
      ],
      "context": "El incendio sigue avanzando sin control. El frente se aproxima a un núcleo de viviendas y se plantea enviar bomberos y brigadas forestales para intentar defender la zona habitada.",
      "question": "¿Cómo organizas la defensa del núcleo de viviendas ante un incendio de alta intensidad?",
      "briefing": "El incendio ha ganado intensidad y avanza hacia una zona de interfaz urbano-forestal. Las llamas superan los dos metros y medio, el humo reduce la visibilidad y el viento puede lanzar pavesas que provoquen focos secundarios en jardines, tejados, cunetas o zonas con vegetación seca. Los servicios de extinción valoran entrar en el núcleo de viviendas para proteger las casas más expuestas, pero la operación tiene un riesgo elevado. No todas las viviendas son defendibles: algunas tienen vegetación muy próxima, accesos estrechos o carecen de zonas seguras para el trabajo de las autobombas. Antes de enviar equipos, es necesario decidir una estrategia: priorizar vidas humanas, confirmar rutas de entrada y salida, identificar viviendas defendibles, controlar pavesas y focos secundarios, y combinar la defensa directa de estructuras con maniobras indirectas si las condiciones lo permiten. La prioridad absoluta es proteger a la población y a los equipos de emergencia. Ninguna vivienda justifica dejar a bomberos atrapados sin vía de escape.",
      "options": {
        "a": {
          "text": "Enviar a los bomberos al núcleo de viviendas solo con una estrategia de defensa operativa clara: priorizar vidas humanas, comprobar rutas de entrada y salida, evaluar qué viviendas son defendibles y posicionar las autobombas siempre de cara a una vía segura de repliegue.",
          "rationale": "Respuesta adecuada. Con llamas de más de dos metros y medio, no se puede improvisar. La defensa de viviendas debe hacerse con triaje estructural, rutas de escape y protección del personal. Defender casas sí; meter bomberos en una ratonera, no.",
          "shortFeedback": "Respuesta adecuada. Con llamas de más de dos metros y medio, no se puede improvisar. La defensa de viviendas debe hacerse con triaje estructural, rutas de escape y protección del personal. Defender casas sí; meter bomberos en una ratonera, no."
        },
        "b": {
          "text": "Ordenar a los bomberos que ataquen directamente el frente de llama desde el núcleo de viviendas para frenar el incendio antes de que alcance las casas.",
          "rationale": "Respuesta incorrecta. Con esa intensidad de llama, el ataque directo puede ser demasiado peligroso si no hay condiciones favorables. El calor radiante, el humo y los cambios de viento pueden poner en riesgo a los equipos. No todo fuego se apaga de frente; a veces hay que ganarle por los lados.",
          "shortFeedback": "Respuesta incorrecta. Con esa intensidad de llama, el ataque directo puede ser demasiado peligroso si no hay condiciones favorables. El calor radiante, el humo y los cambios de viento pueden poner en riesgo a los equipos. No todo fuego se apaga de frente; a veces hay que ganarle por los lados."
        },
        "c": {
          "text": "Combinar la defensa de viviendas con maniobras indirectas: crear líneas de defensa, retirar combustible próximo a las casas si hay tiempo, controlar pavesas y focos secundarios, y valorar quemas de ensanche o contrafuegos solo si la dirección técnica confirma que son seguros.",
          "rationale": "Respuesta adecuada. En incendios de alta intensidad, la defensa no depende solo de echar agua al frente. Hay que reducir combustible, proteger estructuras defendibles, vigilar pavesas y usar maniobras técnicas únicamente cuando las condiciones lo permiten.",
          "shortFeedback": "Respuesta adecuada. En incendios de alta intensidad, la defensa no depende solo de echar agua al frente. Hay que reducir combustible, proteger estructuras defendibles, vigilar pavesas y usar maniobras técnicas únicamente cuando las condiciones lo permiten."
        },
        "d": {
          "text": "Pedir a los vecinos que permanezcan en el exterior mojando tejados, retirando muebles y ayudando a los bomberos mientras llega el frente de llama.",
          "rationale": "Respuesta incorrecta. La autoprotección de la vivienda solo tiene sentido si hay tiempo y condiciones seguras. Con el frente próximo y llamas altas, la prioridad es evacuar o confinar según orden oficial. Convertir a los vecinos en brigada improvisada es mala idea con casco invisible.",
          "shortFeedback": "Respuesta incorrecta. La autoprotección de la vivienda solo tiene sentido si hay tiempo y condiciones seguras. Con el frente próximo y llamas altas, la prioridad es evacuar o confinar según orden oficial. Convertir a los vecinos en brigada improvisada es mala idea con casco invisible."
        },
        "e": {
          "text": "Mandar todos los medios disponibles al núcleo de viviendas, aunque no haya rutas de escape confirmadas ni se haya evaluado qué casas pueden defenderse.",
          "rationale": "Respuesta incorrecta. Concentrar medios sin evaluación previa puede dejar a los equipos atrapados, bloquear accesos y debilitar otros frentes. En una emergencia, “todos para allá” suena contundente, pero puede ser exactamente lo contrario de una estrategia.",
          "shortFeedback": "Respuesta incorrecta. Concentrar medios sin evaluación previa puede dejar a los equipos atrapados, bloquear accesos y debilitar otros frentes. En una emergencia, “todos para allá” suena contundente, pero puede ser exactamente lo contrario de una estrategia."
        }
      },
      "sourceNotes": {
        "note-001": "La defensa operativa de viviendas en interfaz urbano-forestal requiere priorizar vidas humanas, confirmar rutas de escape y evaluar qué estructuras son defendibles.",
        "note-002": "En incendios de alta intensidad, el ataque directo puede ser inseguro; deben valorarse maniobras indirectas, control de pavesas y protección de los equipos.",
        "note-003": "La seguridad de los equipos debe prevalecer sobre la defensa de estructuras cuando no existen rutas de escape ni condiciones operativas seguras."
      }
    },
    "s-027-fuego-en-barranco": {
      "title": "Fuego en el barranco",
      "estimatedTime": "2 min",
      "tags": [
        "barranco",
        "helicopteros",
        "medios-aereos",
        "medios-terrestres",
        "efecto-chimenea",
        "pavesas",
        "rutas-escape",
        "ataque-indirecto"
      ],
      "context": "Las llamas alcanzan una zona de barranco estrecho y profundo. El fuego empieza a ganar velocidad por la pendiente y el viento canalizado.",
      "question": "¿Cómo organizas la intervención en una zona de barranco?",
      "briefing": "El incendio entra en una zona de barranco estrecho, con fuerte pendiente, vegetación acumulada y accesos limitados. La orografía complica la intervención: el fuego puede acelerar ladera arriba por el efecto chimenea, lanzar pavesas a distancia y cerrar rutas de escape en pocos minutos. Los medios aéreos disponibles no tienen la misma utilidad en este terreno. Los helicópteros pueden maniobrar con más precisión, realizar descargas sobre puntos calientes y cargar agua en balsas o depósitos cercanos. En cambio, los hidroaviones necesitan trayectorias más amplias y no pueden operar con seguridad dentro de un barranco estrecho, aunque sí podrían apoyar en zonas abiertas, crestas o laderas superiores. Los medios terrestres siguen siendo esenciales, pero deben actuar con mucha prudencia. Las brigadas pueden consolidar el trabajo aéreo con tendidos de manguera, herramientas manuales y líneas de defensa, siempre que existan observación, comunicación, rutas de escape y zonas seguras. Tenemos que decidir cómo intervenir: aprovechar la precisión de los helicópteros, evitar maniobras aéreas inseguras, proteger a los equipos terrestres y valorar fuego técnico o líneas indirectas solo desde posiciones seguras.",
      "options": {
        "a": {
          "text": "Priorizar el uso de helicópteros para descargas precisas en puntos calientes del barranco, coordinando su actuación con brigadas terrestres solo en zonas con rutas de escape, comunicación y lugares seguros confirmados.",
          "rationale": "Respuesta adecuada. En un barranco estrecho, el helicóptero ofrece mayor maniobrabilidad y precisión. Pero el apoyo aéreo no sustituye la seguridad terrestre: si las brigadas entran, deben hacerlo con observación, comunicación, escape y zona segura.",
          "shortFeedback": "Respuesta adecuada. En un barranco estrecho, el helicóptero ofrece mayor maniobrabilidad y precisión. Pero el apoyo aéreo no sustituye la seguridad terrestre: si las brigadas entran, deben hacerlo con observación, comunicación, escape y zona segura."
        },
        "b": {
          "text": "Enviar hidroaviones directamente al interior del barranco para aprovechar su mayor capacidad de descarga.",
          "rationale": "Respuesta incorrecta. Un hidroavión puede cargar más agua, pero necesita espacio, trayectoria y margen de seguridad. En un barranco estrecho, su tamaño no es una ventaja: es un problema con alas.",
          "shortFeedback": "Respuesta incorrecta. Un hidroavión puede cargar más agua, pero necesita espacio, trayectoria y margen de seguridad. En un barranco estrecho, su tamaño no es una ventaja: es un problema con alas."
        },
        "c": {
          "text": "Usar los medios terrestres para consolidar la extinción desde posiciones seguras: tendidos de manguera, líneas manuales hasta suelo mineral y control de rescoldos, evitando entrar en zonas donde el efecto chimenea pueda cortar la salida.",
          "rationale": "Respuesta adecuada. Los medios aéreos enfrían y reducen intensidad, pero el trabajo terrestre consolida. Eso sí: en barranco, entrar sin escape claro puede convertir una maniobra útil en una encerrona.",
          "shortFeedback": "Respuesta adecuada. Los medios aéreos enfrían y reducen intensidad, pero el trabajo terrestre consolida. Eso sí: en barranco, entrar sin escape claro puede convertir una maniobra útil en una encerrona."
        },
        "d": {
          "text": "Ordenar a las brigadas que bajen al fondo del barranco para atacar directamente la llama antes de que suba por la ladera.",
          "rationale": "Respuesta incorrecta. El fondo del barranco puede ser una zona especialmente peligrosa por humo, calor, caída de material, pavesas y aceleración súbita del fuego. No se manda personal a donde el fuego puede cerrar la puerta.",
          "shortFeedback": "Respuesta incorrecta. El fondo del barranco puede ser una zona especialmente peligrosa por humo, calor, caída de material, pavesas y aceleración súbita del fuego. No se manda personal a donde el fuego puede cerrar la puerta."
        },
        "e": {
          "text": "Mantener todos los medios esperando hasta que el fuego salga del barranco a una zona más abierta.",
          "rationale": "Respuesta incorrecta. Esperar sin actuar puede permitir que el incendio gane intensidad y alcance crestas, viviendas o zonas forestales más extensas. La alternativa no es mirar el barranco como quien mira una lavadora: hay que actuar desde posiciones seguras y con táctica indirecta si es necesario.",
          "shortFeedback": "Respuesta incorrecta. Esperar sin actuar puede permitir que el incendio gane intensidad y alcance crestas, viviendas o zonas forestales más extensas. La alternativa no es mirar el barranco como quien mira una lavadora: hay que actuar desde posiciones seguras y con táctica indirecta si es necesario."
        }
      },
      "sourceNotes": {
        "note-001": "En zonas de barranco, la orografía puede acelerar el comportamiento del fuego por efecto chimenea y dificultar las rutas de escape.",
        "note-002": "Los helicópteros ofrecen mayor maniobrabilidad y precisión en barrancos estrechos, mientras que los hidroaviones requieren trayectorias amplias y zonas de operación seguras.",
        "note-003": "Los medios terrestres son esenciales para consolidar la extinción, pero solo deben intervenir con observación, comunicación, rutas de escape y zonas seguras confirmadas."
      }
    },
    "s-028-defensa-nocturna-perimetro": {
      "title": "Defensa nocturna del perímetro",
      "estimatedTime": "2 min",
      "tags": [
        "defensa-nocturna",
        "perimetro",
        "barranco",
        "pavesas",
        "camaras-termicas",
        "drones",
        "hidrantes",
        "quemas-ensanche",
        "efecto-chimenea"
      ],
      "context": "Cae la noche sobre el incendio. Los medios aéreos se retiran por falta de visibilidad y el frente sigue activo en una zona de barranco próxima a viviendas.",
      "question": "¿Cómo organizas la defensa nocturna del perímetro antes de que el incendio se reactive al amanecer?",
      "briefing": "La llegada de la noche cambia drásticamente el escenario. Los helicópteros y otros medios aéreos dejan de operar por falta de visibilidad, y los equipos terrestres quedan como principal recurso para contener el avance del fuego. El incendio sigue activo en una zona de barranco, donde el acceso es difícil y las rutas de escape pueden complicarse rápidamente. Durante la noche, la bajada de temperatura y el aumento de humedad pueden reducir la intensidad del fuego, pero las brisas de montaña pueden cambiar la dirección del viento y desplazar pavesas hacia viviendas, tejados, jardines o zonas con vegetación seca. La estrategia debe pasar de intentar apagar todo el frente a defender puntos críticos donde haya opciones reales de éxito: carreteras, franjas limpias, perímetros de urbanizaciones e hidrantes clave. También es el momento de reforzar la vigilancia con cámaras térmicas o drones si están autorizados, llenar depósitos y cisternas, asegurar agua para las autobombas y preparar quemas de ensanche solo desde líneas seguras y con control técnico. La prioridad es cerrar el perímetro antes del amanecer. Cuando el sol caliente las laderas del barranco, el efecto chimenea puede reactivar el incendio con fuerza y dejar a los retenes en una posición peligrosa.",
      "options": {
        "a": {
          "text": "Establecer un límite de defensa en zonas seguras y defendibles, como carreteras, franjas limpias o perímetros de viviendas, retirando a los equipos de áreas de difícil escape y concentrando recursos donde el éxito sea probable.",
          "rationale": "Respuesta adecuada. De noche no se trata de perseguir el fuego por el barranco. La defensa eficaz consiste en elegir una línea segura, preparar el terreno y esperar al incendio donde las brigadas puedan trabajar y replegarse.",
          "shortFeedback": "Respuesta adecuada. De noche no se trata de perseguir el fuego por el barranco. La defensa eficaz consiste en elegir una línea segura, preparar el terreno y esperar al incendio donde las brigadas puedan trabajar y replegarse."
        },
        "b": {
          "text": "Mantener el ataque directo en el interior del barranco durante toda la noche para aprovechar que el fuego parece avanzar más despacio.",
          "rationale": "Respuesta incorrecta. Aunque la intensidad pueda bajar, el barranco sigue siendo peligroso: humo, pavesas, visibilidad reducida y rutas de escape frágiles. La noche no convierte una ratonera en un salón con vistas.",
          "shortFeedback": "Respuesta incorrecta. Aunque la intensidad pueda bajar, el barranco sigue siendo peligroso: humo, pavesas, visibilidad reducida y rutas de escape frágiles. La noche no convierte una ratonera en un salón con vistas."
        },
        "c": {
          "text": "Desplegar patrullas ligeras con cámaras térmicas y drones si están autorizados para vigilar pavesas, detectar puntos calientes y apagar focos secundarios en tejados, jardines o zonas próximas al perímetro.",
          "rationale": "Respuesta adecuada. La noche permite identificar mejor puntos calientes. Detectar una pavesa a tiempo puede evitar que un foco pequeño se convierta en una vivienda ardiendo o en un nuevo frente.",
          "shortFeedback": "Respuesta adecuada. La noche permite identificar mejor puntos calientes. Detectar una pavesa a tiempo puede evitar que un foco pequeño se convierta en una vivienda ardiendo o en un nuevo frente."
        },
        "d": {
          "text": "Esperar a que amanezca para reorganizar los retenes, porque con luz será más fácil decidir dónde colocar los equipos.",
          "rationale": "Respuesta incorrecta. Al amanecer puede activarse el efecto chimenea en las laderas del barranco. Si los retenes siguen mal ubicados cuando el sol calienta, la ventana de seguridad puede cerrarse muy rápido.",
          "shortFeedback": "Respuesta incorrecta. Al amanecer puede activarse el efecto chimenea en las laderas del barranco. Si los retenes siguen mal ubicados cuando el sol calienta, la ventana de seguridad puede cerrarse muy rápido."
        },
        "e": {
          "text": "Concentrar todos los recursos en iluminar la zona de trabajo y mantener presencia visible, aunque no se hayan asegurado hidrantes, depósitos ni rutas de agua para las autobombas.",
          "rationale": "Respuesta incorrecta. La visibilidad ayuda, pero sin agua asegurada la defensa se queda en decorado. Durante la noche hay que llenar depósitos, movilizar cisternas y garantizar suministro en las calles más expuestas.",
          "shortFeedback": "Respuesta incorrecta. La visibilidad ayuda, pero sin agua asegurada la defensa se queda en decorado. Durante la noche hay que llenar depósitos, movilizar cisternas y garantizar suministro en las calles más expuestas."
        }
      },
      "sourceNotes": {
        "note-001": "Durante la noche, la retirada de medios aéreos obliga a reforzar la defensa terrestre del perímetro desde posiciones seguras y defendibles.",
        "note-002": "La vigilancia de pavesas y puntos calientes con cámaras térmicas o drones autorizados puede evitar focos secundarios en viviendas y jardines.",
        "note-003": "Antes del amanecer conviene reubicar retenes y cerrar líneas de defensa, porque el calentamiento de laderas puede reactivar el incendio por efecto chimenea."
      }
    },
    "s-029-relevo-cuadrillas-agotadas": {
      "title": "Relevo de cuadrillas agotadas",
      "estimatedTime": "2 min",
      "tags": [
        "relevo-cuadrillas",
        "agotamiento",
        "bomberos",
        "brigadas",
        "logistica",
        "seguridad-operativa",
        "base-descanso",
        "reten-intervencion-rapida"
      ],
      "context": "La defensa del nucleo de viviendas se prolonga durante horas. Las cuadrillas llevan mucho tiempo trabajando entre humo, calor y tension constante. Los mandos advierten de que el cansancio puede empezar a afectar a la toma de decisiones, al manejo de vehiculos y a la seguridad de los equipos.",
      "question": "?Como organizas el relevo de cuadrillas para que la defensa del nucleo no colapse por agotamiento?",
      "briefing": "La defensa del nucleo de viviendas entra en una fase larga y exigente. Los equipos han trabajado durante horas protegiendo estructuras, apagando focos secundarios y manteniendo lineas de defensa en condiciones duras. El agotamiento empieza a ser un riesgo operativo. Un bombero cansado puede calcular peor una ruta de escape, reaccionar mas tarde ante un cambio de viento o cometer errores al conducir una autobomba por accesos estrechos. Ademas, los vehiculos y el material tambien necesitan revision: filtros saturados de ceniza, mangueras danadas, herramientas perdidas o depositos bajos pueden comprometer el siguiente turno. La prioridad es organizar un relevo escalonado, con solape entre mandos salientes y entrantes, traspaso de informacion critica, descanso real para el personal, reabastecimiento de agua, comida y material, y mantenimiento de un reten de intervencion rapida por si el fuego salta el perimetro durante la noche.",
      "options": {
        "a": {
          "text": "Organizar un relevo escalonado por turnos, con solape entre jefes de cuadrilla salientes y entrantes para transmitir puntos calientes, viviendas de riesgo, hidrantes con poca presión, rutas de escape y cambios recientes del perímetro.",
          "rationale": "Respuesta adecuada. El relevo no es solo cambiar personas: es transferir memoria operativa. Sin ese solape, el turno entrante llega fresco, sí, pero ciego. Y en un incendio eso no es una virtud.",
          "shortFeedback": "Respuesta adecuada. El relevo no es solo cambiar personas: es transferir memoria operativa. Sin ese solape, el turno entrante llega fresco, sí, pero ciego. Y en un incendio eso no es una virtud."
        },
        "b": {
          "text": "Mantener a las mismas cuadrillas en primera línea mientras el núcleo siga amenazado, porque ya conocen el terreno y sustituirlas puede hacer perder tiempo.",
          "rationale": "Respuesta incorrecta. Conocer el terreno ayuda, pero el agotamiento deteriora la atención, la conducción, la comunicación y la toma de decisiones. Un equipo exhausto puede convertirse en parte del problema.",
          "shortFeedback": "Respuesta incorrecta. Conocer el terreno ayuda, pero el agotamiento deteriora la atención, la conducción, la comunicación y la toma de decisiones. Un equipo exhausto puede convertirse en parte del problema."
        },
        "c": {
          "text": "Crear una base segura de descanso y logística fuera del humo, donde el personal relevado pueda hidratarse, comer, ducharse, dormir y donde los vehículos sean revisados, repostados y reabastecidos antes de volver al servicio.",
          "rationale": "Respuesta adecuada. La recuperación del personal y el mantenimiento del material sostienen la operación. No sirve de mucho tener bomberos con épica si la autobomba vuelve sin agua, con filtros saturados y la tripulación al borde del fundido.",
          "shortFeedback": "Respuesta adecuada. La recuperación del personal y el mantenimiento del material sostienen la operación. No sirve de mucho tener bomberos con épica si la autobomba vuelve sin agua, con filtros saturados y la tripulación al borde del fundido."
        },
        "d": {
          "text": "Hacer el relevo completo de todas las unidades a la vez para que el nuevo turno empiece desde cero con una organización limpia.",
          "rationale": "Respuesta incorrecta. Un relevo total y simultáneo puede dejar huecos de cobertura, perder información crítica y desproteger el perímetro. En una emergencia, “empezar desde cero” suele ser una forma elegante de decir “hemos olvidado lo importante”.",
          "shortFeedback": "Respuesta incorrecta. Un relevo total y simultáneo puede dejar huecos de cobertura, perder información crítica y desproteger el perímetro. En una emergencia, “empezar desde cero” suele ser una forma elegante de decir “hemos olvidado lo importante”."
        },
        "e": {
          "text": "Enviar a descansar a todas las cuadrillas agotadas sin dejar retén de intervención rápida, confiando en que el perímetro aguantará hasta el siguiente turno.",
          "rationale": "Respuesta incorrecta. Aunque haya descanso, debe mantenerse capacidad de respuesta inmediata. Las pavesas, los focos secundarios y los cambios de viento no respetan horarios laborales ni fichan salida.",
          "shortFeedback": "Respuesta incorrecta. Aunque haya descanso, debe mantenerse capacidad de respuesta inmediata. Las pavesas, los focos secundarios y los cambios de viento no respetan horarios laborales ni fichan salida."
        }
      },
      "sourceNotes": {
        "note-001": "El relevo de cuadrillas debe organizarse de forma escalonada para evitar huecos de cobertura y perdida de informacion operativa.",
        "note-002": "El agotamiento del personal puede afectar a la seguridad, la conduccion, la comunicacion y la toma de decisiones durante una emergencia.",
        "note-003": "La logistica de descanso, hidratacion, alimentacion, revision de vehiculos y mantenimiento de un reten de intervencion rapida es clave para sostener la defensa del perimetro.",
        "note-004": "Reconstruido desde el fragmento sincronizado de opciones para conservar la actualizacion sin perder el escenario."
      }
    },
    "s-030-fuego-de-copas": {
      "title": "Fuego de copas",
      "estimatedTime": "2 min",
      "tags": [
        "fuego-de-copas",
        "crown-fire",
        "barranco",
        "calor-radiante",
        "repliegue",
        "confinamiento",
        "evacuacion",
        "pavesas",
        "interfaz-urbano-forestal"
      ],
      "context": "El incendio en el barranco gana energía y alcanza las copas de los árboles. Las llamas crecen de forma súbita y el calor radiante amenaza viviendas próximas incluso antes de que el frente llegue directamente a ellas.",
      "question": "¿Cómo actúas cuando el incendio evoluciona a fuego de copas cerca de una zona habitada?",
      "briefing": "El incendio ha cambiado de comportamiento. Tras ganar intensidad en el barranco, el fuego asciende a las copas de los árboles y avanza con mucha más velocidad. Las llamas pueden alcanzar alturas extremas y el calor radiante se vuelve peligroso incluso a distancia. Los equipos sobre el terreno advierten de que la defensa directa de viviendas ya no es segura. El agua puede perder eficacia por la intensidad térmica, las pavesas se multiplican y las rutas de escape pueden quedar comprometidas en cuestión de minutos. En este escenario, mantener medios terrestres en primera línea puede provocar atrapamientos. La prioridad pasa a ser retirar equipos a zonas seguras, confirmar si la evacuación ya se realizó y, si no es posible evacuar con seguridad, ordenar confinamiento extremo en espacios interiores protegidos siguiendo instrucciones oficiales. La decisión es crítica: aceptar que el frente no es defendible, proteger vidas y evitar que la emergencia se cobre también a quienes intentan contenerla.",
      "options": {
        "a": {
          "text": "Ordenar el retroceso inmediato de los medios terrestres a zonas seguras, suspender la defensa directa de viviendas expuestas y concentrar la actuación en proteger vidas, rutas de escape y puntos defendibles alejados del frente.",
          "rationale": "Respuesta adecuada. Cuando el fuego entra en copas y gana esa intensidad, insistir en la defensa directa puede ser letal. La prioridad es retirar equipos antes de que el incendio cierre las salidas.",
          "shortFeedback": "Respuesta adecuada. Cuando el fuego entra en copas y gana esa intensidad, insistir en la defensa directa puede ser letal. La prioridad es retirar equipos antes de que el incendio cierre las salidas."
        },
        "b": {
          "text": "Mantener a los bomberos junto a las viviendas usando mangueras para enfriar fachadas hasta que pase el frente principal.",
          "rationale": "Respuesta incorrecta. Con fuego de copas y calor radiante extremo, el agua puede no ser suficiente y los equipos pueden quedar expuestos a condiciones incompatibles con una defensa segura. La épica no baja la temperatura.",
          "shortFeedback": "Respuesta incorrecta. Con fuego de copas y calor radiante extremo, el agua puede no ser suficiente y los equipos pueden quedar expuestos a condiciones incompatibles con una defensa segura. La épica no baja la temperatura."
        },
        "c": {
          "text": "Confirmar de inmediato el estado de la población: si hay tiempo y rutas seguras, ejecutar evacuación urgente; si la evacuación ya no es segura, ordenar confinamiento extremo en habitaciones interiores, alejadas de ventanas y con entradas de aire cerradas.",
          "rationale": "Respuesta adecuada. La decisión depende del margen real. Evacuar tarde puede ser más peligroso que confinar, pero confinar sin instrucciones claras también lo es. Hay que elegir según rutas, tiempo y exposición.",
          "shortFeedback": "Respuesta adecuada. La decisión depende del margen real. Evacuar tarde puede ser más peligroso que confinar, pero confinar sin instrucciones claras también lo es. Hay que elegir según rutas, tiempo y exposición."
        },
        "d": {
          "text": "Enviar más medios terrestres al barranco para reforzar la línea y evitar que el fuego llegue a las viviendas.",
          "rationale": "Respuesta incorrecta. En un fuego de copas, el barranco puede convertirse en una trampa por calor, humo, pavesas y efecto chimenea. Mandar más personal a una zona no defendible multiplica el riesgo.",
          "shortFeedback": "Respuesta incorrecta. En un fuego de copas, el barranco puede convertirse en una trampa por calor, humo, pavesas y efecto chimenea. Mandar más personal a una zona no defendible multiplica el riesgo."
        },
        "e": {
          "text": "Esperar a comprobar si el fuego baja de intensidad antes de ordenar el repliegue, para no abandonar viviendas que aún podrían salvarse.",
          "rationale": "Respuesta incorrecta. En un cambio a fuego de copas, esperar puede dejar sin salida a los equipos y a la población. A veces la decisión más dura es retirarse a tiempo; quedarse por orgullo sale carísimo.",
          "shortFeedback": "Respuesta incorrecta. En un cambio a fuego de copas, esperar puede dejar sin salida a los equipos y a la población. A veces la decisión más dura es retirarse a tiempo; quedarse por orgullo sale carísimo."
        }
      },
      "sourceNotes": {
        "note-001": "El fuego de copas implica un cambio extremo de comportamiento del incendio, con mayor velocidad, intensidad térmica y riesgo de pavesas.",
        "note-002": "Cuando la defensa directa deja de ser segura, la prioridad es el repliegue de equipos, la protección de vidas y la toma de decisiones entre evacuación urgente o confinamiento extremo según las rutas disponibles.",
        "note-003": "La exposición al calor radiante y la pérdida de rutas de escape pueden hacer inviable la defensa terrestre de viviendas en primera línea."
      }
    },
    "s-031-confinamiento-extremo-fuego-copas": {
      "title": "Confinamiento extremo por fuego de copas",
      "estimatedTime": "2 min",
      "tags": [
        "confinamiento",
        "fuego-de-copas",
        "crown-fire",
        "evacuacion",
        "calor-radiante",
        "humo",
        "pavesas",
        "proteccion-civil"
      ],
      "context": "El incendio ha evolucionado a fuego de copas cerca de una zona habitada. Las llamas avanzan con gran intensidad y el calor radiante hace peligrosa cualquier salida improvisada.",
      "question": "¿Qué instrucciones das a la población cuando el fuego de copas impide una evacuación segura?",
      "briefing": "El incendio ha cambiado de comportamiento y ha pasado a fuego de copas. Las llamas avanzan por la parte alta de los árboles, generan calor radiante extremo y lanzan pavesas que pueden provocar focos secundarios en tejados, jardines y zonas próximas a las viviendas. Los equipos de emergencia advierten de que varias rutas de salida están comprometidas por humo, calor, baja visibilidad y riesgo de atrapamiento. En algunos sectores, ordenar una evacuación en ese momento puede exponer a la población a un peligro mayor que permanecer dentro de edificios protegidos. La decisión es crítica: hay que ordenar un confinamiento extremo, dar instrucciones muy concretas y evitar que la población salga por su cuenta. La prioridad es reducir la exposición al humo y al calor, mantener a las personas alejadas de ventanas y fachadas expuestas, cerrar entradas de aire, preparar agua y teléfono, y esperar nuevas instrucciones oficiales.",
      "options": {
        "a": {
          "text": "Ordenar confinamiento extremo en viviendas o edificios seguros: permanecer en habitaciones interiores, alejadas de ventanas y fachadas expuestas, cerrar puertas, ventanas, persianas y entradas de aire, y seguir solo instrucciones oficiales.",
          "rationale": "Respuesta adecuada. Si las rutas ya no son seguras, salir puede ser más peligroso que quedarse. El confinamiento extremo busca reducir exposición al calor, humo y pavesas hasta que el frente pase o se recupere una salida segura.",
          "shortFeedback": "Respuesta adecuada. Si las rutas ya no son seguras, salir puede ser más peligroso que quedarse. El confinamiento extremo busca reducir exposición al calor, humo y pavesas hasta que el frente pase o se recupere una salida segura."
        },
        "b": {
          "text": "Ordenar a toda la población que salga inmediatamente por sus propios medios antes de que el fuego llegue al núcleo.",
          "rationale": "Respuesta incorrecta. Con fuego de copas y rutas comprometidas, una salida desordenada puede provocar atrapamientos en carretera, accidentes y exposición directa al humo y al calor radiante.",
          "shortFeedback": "Respuesta incorrecta. Con fuego de copas y rutas comprometidas, una salida desordenada puede provocar atrapamientos en carretera, accidentes y exposición directa al humo y al calor radiante."
        },
        "c": {
          "text": "Indicar a la población que cierre llaves de gas o combustible si puede hacerlo sin salir al exterior, prepare agua, medicación, documentación y teléfono cargado, y no abandone el edificio salvo orden expresa de los servicios de emergencia.",
          "rationale": "Respuesta adecuada. Son medidas concretas y realistas para ganar seguridad sin empujar a la población a una evacuación peligrosa. La instrucción clave es no salir salvo indicación oficial.",
          "shortFeedback": "Respuesta adecuada. Son medidas concretas y realistas para ganar seguridad sin empujar a la población a una evacuación peligrosa. La instrucción clave es no salir salvo indicación oficial."
        },
        "d": {
          "text": "Recomendar que los vecinos salgan a mojar tejados, jardines y fachadas para evitar que las pavesas prendan cerca de las viviendas.",
          "rationale": "Respuesta incorrecta. Esa medida solo tendría sentido antes de la llegada del frente y con condiciones seguras. Con fuego de copas próximo, exponer a la población al exterior aumenta el riesgo por calor, humo y pavesas.",
          "shortFeedback": "Respuesta incorrecta. Esa medida solo tendría sentido antes de la llegada del frente y con condiciones seguras. Con fuego de copas próximo, exponer a la población al exterior aumenta el riesgo por calor, humo y pavesas."
        },
        "e": {
          "text": "Pedir a la población que espere en balcones, azoteas o entradas de las viviendas para facilitar su localización por los equipos de emergencia.",
          "rationale": "Respuesta incorrecta. Balcones, azoteas y entradas son zonas expuestas a humo, calor radiante y pavesas. En confinamiento extremo, la población debe protegerse en el interior, no asomarse al incendio como si fuera una procesión infernal.",
          "shortFeedback": "Respuesta incorrecta. Balcones, azoteas y entradas son zonas expuestas a humo, calor radiante y pavesas. En confinamiento extremo, la población debe protegerse en el interior, no asomarse al incendio como si fuera una procesión infernal."
        }
      },
      "sourceNotes": {
        "note-001": "El confinamiento puede ser más seguro que la evacuación cuando las rutas están comprometidas por humo, calor, baja visibilidad o riesgo de atrapamiento.",
        "note-002": "Ante fuego de copas próximo a zonas habitadas, la prioridad es reducir la exposición al calor radiante, humo y pavesas, y evitar salidas improvisadas.",
        "note-003": "Las instrucciones a la población deben ser concretas, oficiales y orientadas a permanecer en espacios interiores protegidos hasta nueva orden."
      }
    },
    "s-032-casas-diseminadas-monte": {
      "title": "Casas diseminadas en zona de monte",
      "estimatedTime": "2 min",
      "tags": [
        "casas-diseminadas",
        "interfaz-urbano-forestal",
        "monte",
        "triaje-estructural",
        "viviendas",
        "espacio-defendible",
        "brigadas",
        "rutas-escape"
      ],
      "context": "En otra zona afectada por el incendio, las brigadas continúan trabajando casi sin descanso. El fuego entra en un área de casas diseminadas dentro del monte. No hay una urbanización compacta, sino viviendas separadas entre sí, con parcelas grandes y vegetación entre ellas.",
      "question": "¿Cómo organizas la defensa de viviendas diseminadas dentro de una zona de monte?",
      "briefing": "El incendio avanza por una zona de interfaz dispersa, donde las casas están salpicadas dentro del monte. A diferencia de una urbanización compacta, no existe un único frente claro ni una línea continua de defensa. Cada vivienda puede quedar amenazada de forma independiente por llamas, humo o pavesas. Los equipos sobre el terreno advierten de que no hay recursos suficientes para proteger todas las casas al mismo tiempo. Algunas viviendas cuentan con espacio defendible: vegetación retirada, accesos despejados, zonas de maniobra y cierta distancia entre la casa y el combustible vegetal. Otras, en cambio, tienen árboles, matorral, leña, depósitos o materiales inflamables demasiado cerca. La decisión es difícil: aplicar un triaje estructural estricto. Las brigadas deben priorizar las viviendas defendibles y abandonar la defensa de aquellas donde el riesgo para los equipos sea demasiado alto o las posibilidades de éxito sean mínimas. La prioridad es proteger vidas humanas, evitar que los equipos queden aislados entre casas separadas y concentrar los recursos donde realmente puedan salvar estructuras sin comprometer la seguridad.",
      "options": {
        "a": {
          "text": "Aplicar un triaje estructural estricto: priorizar la defensa de viviendas con espacio defendible, accesos seguros, rutas de escape y posibilidades reales de protección, sin exponer a las brigadas en casas rodeadas de combustible.",
          "rationale": "Respuesta adecuada. En una zona de casas diseminadas, intentar defenderlo todo puede dejar a los equipos atrapados y sin capacidad de respuesta. El triaje permite concentrar esfuerzos donde hay opciones reales.",
          "shortFeedback": "Respuesta adecuada. En una zona de casas diseminadas, intentar defenderlo todo puede dejar a los equipos atrapados y sin capacidad de respuesta. El triaje permite concentrar esfuerzos donde hay opciones reales."
        },
        "b": {
          "text": "Dividir a las brigadas en pequeños grupos para intentar cubrir todas las viviendas al mismo tiempo, aunque estén muy separadas entre sí.",
          "rationale": "Respuesta incorrecta. Dispersar los equipos reduce la seguridad, dificulta la comunicación y puede dejar a las brigadas aisladas si el fuego cambia de dirección. En intermix, estar en todas partes puede significar no estar protegido en ninguna.",
          "shortFeedback": "Respuesta incorrecta. Dispersar los equipos reduce la seguridad, dificulta la comunicación y puede dejar a las brigadas aisladas si el fuego cambia de dirección. En intermix, estar en todas partes puede significar no estar protegido en ninguna."
        },
        "c": {
          "text": "Confirmar que no quedan personas en las viviendas más expuestas, comunicar qué zonas no son defendibles y desplazar recursos hacia casas con accesos viables, perímetros limpios y capacidad de maniobra para autobombas.",
          "rationale": "Respuesta adecuada. La prioridad sigue siendo la vida humana. Una vivienda puede darse por no defendible, pero nunca se debe asumir que está vacía sin confirmarlo. Primero personas; después estructuras.",
          "shortFeedback": "Respuesta adecuada. La prioridad sigue siendo la vida humana. Una vivienda puede darse por no defendible, pero nunca se debe asumir que está vacía sin confirmarlo. Primero personas; después estructuras."
        },
        "d": {
          "text": "Mantener a los bomberos defendiendo una casa aunque esté rodeada de vegetación densa, porque abandonarla enviaría un mensaje negativo a la población.",
          "rationale": "Respuesta incorrecta. La percepción pública importa, pero no puede pesar más que la seguridad de los equipos. Una casa sin espacio defendible puede convertirse en una trampa. La épica queda muy bien en los discursos, fatal en los partes de accidente.",
          "shortFeedback": "Respuesta incorrecta. La percepción pública importa, pero no puede pesar más que la seguridad de los equipos. Una casa sin espacio defendible puede convertirse en una trampa. La épica queda muy bien en los discursos, fatal en los partes de accidente."
        },
        "e": {
          "text": "Ordenar a los propietarios que se queden en sus parcelas limpiando vegetación y mojando el entorno mientras llegan las brigadas.",
          "rationale": "Respuesta incorrecta. La autoprotección de viviendas debe hacerse antes de la emergencia, no con el fuego encima. Pedir a vecinos que trabajen en parcelas expuestas puede retrasar evacuaciones y poner vidas en peligro.",
          "shortFeedback": "Respuesta incorrecta. La autoprotección de viviendas debe hacerse antes de la emergencia, no con el fuego encima. Pedir a vecinos que trabajen en parcelas expuestas puede retrasar evacuaciones y poner vidas en peligro."
        }
      },
      "sourceNotes": {
        "note-001": "En zonas de casas diseminadas dentro del monte, la defensa estructural requiere priorizar viviendas defendibles y evitar dispersar a los equipos.",
        "note-002": "El triaje estructural permite concentrar recursos donde existen accesos seguros, espacio defendible, rutas de escape y posibilidades reales de éxito.",
        "note-003": "La prioridad debe ser confirmar que no quedan personas expuestas y proteger la seguridad de brigadas y bomberos antes que intentar defender todas las estructuras."
      }
    },
    "s-033-senderistas-desorientados-humo": {
      "title": "Senderistas desorientados por el humo",
      "estimatedTime": "2 min",
      "tags": [
        "senderistas",
        "turistas",
        "humo",
        "geolocalizacion",
        "rescate",
        "zona-recreativa",
        "senderos",
        "cambio-viento"
      ],
      "context": "Un grupo de turistas se encuentra en una zona recreativa y de senderos cuando cambia el viento y el humo empieza a cubrir el área. No conocen bien el terreno, tienen poca batería en los móviles y han enviado un aviso confuso indicando que no saben hacia dónde salir.",
      "question": "¿Cómo organizas la localización y rescate de senderistas desorientados durante el incendio?",
      "briefing": "El cambio de viento desplaza el humo hacia una zona recreativa con varios senderos. Un grupo de turistas contacta con emergencias, pero la llamada se corta antes de poder confirmar su ubicación exacta. Los senderistas no conocen el terreno, tienen poca batería y podrían intentar moverse por su cuenta buscando una salida. La visibilidad empeora y algunas pistas forestales pueden quedar expuestas al humo o al avance irregular del fuego. Los equipos de emergencia deben decidir cómo actuar: intentar geolocalizarlos, cerrar accesos para que no entren más personas, enviar recursos de búsqueda desde puntos seguros y coordinar la operación sin dejar desprotegidos otros frentes activos. La prioridad es localizar al grupo con precisión, evitar que se desplacen hacia zonas de riesgo y no comprometer a los equipos de rescate en una búsqueda improvisada.",
      "options": {
        "a": {
          "text": "Activar la localización del grupo mediante llamada, mensajería o geolocalización si está disponible, pedirles que no se muevan salvo indicación expresa y enviar recursos de rescate desde accesos seguros confirmados.",
          "rationale": "Respuesta adecuada. Antes de mandar equipos al monte a ciegas, hay que fijar la posición del grupo. Si se mueven sin instrucciones, pueden alejarse de zonas seguras o meterse de lleno en el humo.",
          "shortFeedback": "Respuesta adecuada. Antes de mandar equipos al monte a ciegas, hay que fijar la posición del grupo. Si se mueven sin instrucciones, pueden alejarse de zonas seguras o meterse de lleno en el humo."
        },
        "b": {
          "text": "Enviar inmediatamente varias unidades por todos los senderos posibles para cubrir más terreno cuanto antes.",
          "rationale": "Respuesta incorrecta. Buscar “a lo ancho” sin ubicación clara puede dispersar recursos, exponer a los equipos y dejar otros frentes sin cobertura. El monte no es un tablero de hundir la flota.",
          "shortFeedback": "Respuesta incorrecta. Buscar “a lo ancho” sin ubicación clara puede dispersar recursos, exponer a los equipos y dejar otros frentes sin cobertura. El monte no es un tablero de hundir la flota."
        },
        "c": {
          "text": "Cerrar temporalmente accesos a la zona recreativa, avisar a alojamientos, guías y ayuntamientos cercanos, y coordinar la búsqueda con personal que conozca el terreno, priorizando rutas seguras y puntos de encuentro.",
          "rationale": "Respuesta adecuada. No basta con rescatar al grupo: hay que evitar que entren más personas y aprovechar conocimiento local. En senderos, un mal cruce puede ser media hora perdida y mucho humo ganado.",
          "shortFeedback": "Respuesta adecuada. No basta con rescatar al grupo: hay que evitar que entren más personas y aprovechar conocimiento local. En senderos, un mal cruce puede ser media hora perdida y mucho humo ganado."
        },
        "d": {
          "text": "Indicar al grupo que camine cuesta abajo hasta encontrar una carretera o una zona habitada.",
          "rationale": "Respuesta incorrecta. En un incendio, “cuesta abajo” puede llevar a un barranco, una zona con humo acumulado o una pista comprometida. Sin información precisa, moverse por intuición puede empeorar la situación.",
          "shortFeedback": "Respuesta incorrecta. En un incendio, “cuesta abajo” puede llevar a un barranco, una zona con humo acumulado o una pista comprometida. Sin información precisa, moverse por intuición puede empeorar la situación."
        },
        "e": {
          "text": "Priorizar otros frentes y esperar a que el grupo vuelva a llamar cuando tenga mejor cobertura o más información.",
          "rationale": "Respuesta incorrecta. Con poca batería, humo y desorientación, esperar puede hacer que se pierda la única ventana de localización. La emergencia no tiene botón de “llamar más tarde”.",
          "shortFeedback": "Respuesta incorrecta. Con poca batería, humo y desorientación, esperar puede hacer que se pierda la única ventana de localización. La emergencia no tiene botón de “llamar más tarde”."
        }
      },
      "sourceNotes": {
        "note-001": "En rescates durante incendios forestales, la localización precisa reduce riesgos para la población afectada y para los equipos de intervención.",
        "note-002": "Ante senderistas desorientados, debe evitarse que se desplacen sin instrucciones y priorizar rutas de acceso seguras para los equipos.",
        "note-003": "Cerrar accesos a zonas recreativas evita que nuevas personas entren en áreas comprometidas por humo, viento o avance del fuego."
      }
    },
    "s-034-vecinos-sin-medios-para-salir": {
      "title": "Vecinos sin medios para salir",
      "estimatedTime": "2 min",
      "tags": [
        "evacuacion",
        "personas-vulnerables",
        "sin-vehiculo",
        "transporte-adaptado",
        "puntos-recogida",
        "aviso-puerta-a-puerta",
        "servicios-sociales"
      ],
      "context": "Se activa la evacuación preventiva de un núcleo afectado por el avance del incendio. Durante el operativo, el ayuntamiento informa de que varias personas mayores, vecinos con movilidad reducida y algunas familias no tienen vehículo propio ni red familiar cercana para abandonar la zona.",
      "question": "¿Cómo organizas la evacuación de personas que no tienen medios para salir por su cuenta?",
      "briefing": "La orden de evacuación ya está en marcha, pero empiezan a detectarse casos de vecinos que no pueden abandonar la zona por sus propios medios. Algunas personas mayores viven solas, hay vecinos con movilidad reducida y varias familias no disponen de coche ni de apoyo cercano. La situación exige una respuesta específica. Si se da por hecho que todo el mundo puede salir en vehículo privado, parte de la población puede quedar atrapada o retrasar la evacuación general. La prioridad es identificar rápidamente a las personas que necesitan ayuda, organizar transporte adaptado o colectivo, establecer puntos de recogida seguros, activar aviso puerta a puerta si la comunicación telefónica falla y coordinar el traslado hacia zonas de acogida.",
      "options": {
        "a": {
          "text": "Activar un dispositivo específico para personas sin vehículo, con transporte adaptado o colectivo, puntos de recogida seguros, registro de personas trasladadas y prioridad para mayores, dependientes y familias con menores.",
          "rationale": "Respuesta adecuada. Una evacuación real no puede depender solo del coche privado. Identificar, recoger, registrar y trasladar a quienes no tienen medios evita que la orden deje a gente atrás.",
          "shortFeedback": "Respuesta adecuada. Una evacuación real no puede depender solo del coche privado. Identificar, recoger, registrar y trasladar a quienes no tienen medios evita que la orden deje a gente atrás."
        },
        "b": {
          "text": "Pedir a los vecinos con coche que lleven a quienes no tengan vehículo, sin organizar puntos de recogida ni registro oficial.",
          "rationale": "Respuesta incorrecta. La solidaridad ayuda, pero sin coordinación puede generar confusión, personas sin localizar y traslados inseguros. En una evacuación, “que alguien los lleve” no es un plan: es una apuesta.",
          "shortFeedback": "Respuesta incorrecta. La solidaridad ayuda, pero sin coordinación puede generar confusión, personas sin localizar y traslados inseguros. En una evacuación, “que alguien los lleve” no es un plan: es una apuesta."
        },
        "c": {
          "text": "Coordinar con ayuntamiento, Protección Civil, servicios sociales y fuerzas de seguridad un aviso puerta a puerta en las zonas más vulnerables para localizar a quienes no pueden salir solos y trasladarlos por rutas confirmadas.",
          "rationale": "Respuesta adecuada. Algunas personas no verán redes, no recibirán llamadas o no podrán moverse. El puerta a puerta permite detectar casos invisibles y evitar que la evacuación sea solo para quienes tienen batería, coche y familia cerca.",
          "shortFeedback": "Respuesta adecuada. Algunas personas no verán redes, no recibirán llamadas o no podrán moverse. El puerta a puerta permite detectar casos invisibles y evitar que la evacuación sea solo para quienes tienen batería, coche y familia cerca."
        },
        "d": {
          "text": "Retrasar toda la evacuación hasta conseguir transporte para todas las personas sin vehículo.",
          "rationale": "Respuesta incorrecta. Hay que ayudar a quienes lo necesitan sin paralizar el resto del operativo. Retrasar toda la evacuación puede aumentar el riesgo para la población que sí puede salir ya por rutas seguras.",
          "shortFeedback": "Respuesta incorrecta. Hay que ayudar a quienes lo necesitan sin paralizar el resto del operativo. Retrasar toda la evacuación puede aumentar el riesgo para la población que sí puede salir ya por rutas seguras."
        },
        "e": {
          "text": "Indicar a las personas sin vehículo que caminen hasta el punto de encuentro más cercano aunque haya humo o poca visibilidad.",
          "rationale": "Respuesta incorrecta. Caminar en una zona con humo, calor, mala visibilidad o carreteras con tráfico de emergencia puede ser muy peligroso, especialmente para mayores, menores o personas con movilidad reducida.",
          "shortFeedback": "Respuesta incorrecta. Caminar en una zona con humo, calor, mala visibilidad o carreteras con tráfico de emergencia puede ser muy peligroso, especialmente para mayores, menores o personas con movilidad reducida."
        }
      },
      "sourceNotes": {
        "note-001": "Una orden de evacuación debe contemplar a personas sin vehículo, mayores, dependientes, familias sin apoyo cercano y vecinos con movilidad reducida.",
        "note-002": "Los puntos de recogida, el transporte adaptado o colectivo y el registro de personas trasladadas ayudan a evitar que alguien quede atrás.",
        "note-003": "El aviso puerta a puerta puede ser necesario cuando la comunicación telefónica o digital no garantiza que la información llegue a toda la población."
      }
    }
  }
} satisfies ScenarioI18nCatalog;
