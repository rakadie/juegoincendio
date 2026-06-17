import type { PreventionInspectionScreen } from '../domain/types/prevention-inspection.js';

export const PREVENTION_INSPECTION_INTERFAZ: PreventionInspectionScreen = {
  id: 'p-001-viviendas-interfaz',
  title: 'Inspeccion de viviendas en interfaz',
  shortTitle: 'Casas y edificios',
  phase: 'prevencion',
  intro: 'No hay humo todavia. Por eso este es el momento de actuar.',
  context:
    'Antes de la campana de alto riesgo, visitas un municipio con viviendas proximas al monte. Hay casas con vegetacion cercana, canalones llenos de hojas, lena junto a fachadas y accesos estrechos. El ayuntamiento tiene margen para intervenir, pero no puede corregirlo todo antes del verano.',
  objective:
    'Detecta vulnerabilidades y elige cuatro actuaciones preventivas para reducir el riesgo antes de la epoca de mayor peligro.',
  maxActions: 4,
  initialState: {
    defensibilidadViviendas: 0,
    continuidadCombustible: 0,
    riesgoPavesas: 0,
    riesgoFuegoCopas: 0,
    seguridadEquipos: 0,
    coordinacionOperativa: 0,
    poblacionProtegida: 0,
    confianzaVecinal: 0,
    danosViviendas: 0,
    riesgoAtrapamiento: 0
  },
  hotspots: [
    {
      id: 'canalones-hojas',
      title: 'Canalones con hojas secas',
      position: { x: 25, y: 42 },
      visualHint: 'Tejado con hojas secas acumuladas',
      description:
        'El tejado y los canalones acumulan hojas secas y agujas de pino. Si llegan pavesas, pueden prender aunque la llama no toque directamente la vivienda.',
      action: {
        id: 'limpiar-canalones',
        label: 'Limpiar tejados y canalones',
        impact: {
          riesgoPavesas: -4,
          defensibilidadViviendas: 2,
          danosViviendas: -2
        },
        flagsOnApply: ['canalonesLimpios'],
        feedback:
          'Buena decision. Las pavesas no necesitan una gran llama para causar problemas: les basta un canalon lleno de hojas secas y un poco de viento.'
      },
      flagIfIgnored: 'canalonesSucios',
      futureConsequence:
        'Las pavesas caen sobre varias cubiertas. En algunas viviendas, los canalones con hojas secas generan focos secundarios.'
    },
    {
      id: 'combustibles-fachada',
      title: 'Lena y muebles junto a la fachada',
      position: { x: 36, y: 64 },
      visualHint: 'Combustible pegado a una vivienda',
      description:
        'Hay lena, sillas de plastico, restos de poda y una sombrilla junto a la pared exterior. Son combustible pegado a la casa.',
      action: {
        id: 'retirar-combustibles-fachada',
        label: 'Retirar materiales inflamables junto a fachadas',
        impact: {
          continuidadCombustible: -3,
          danosViviendas: -3,
          defensibilidadViviendas: 3
        },
        flagsOnApply: ['fachadasDespejadas'],
        feedback:
          'Buena decision. La vivienda no necesita tener el monte encima para arder: a veces basta con haber dejado combustible justo al lado de la pared.'
      },
      flagIfIgnored: 'combustiblePegadoFachada',
      futureConsequence:
        'El calor y las pavesas encuentran combustible junto a una fachada. La vivienda necesita defensa inmediata y complica el trabajo de las brigadas.'
    },
    {
      id: 'ramas-bajas-vegetacion-seca',
      title: 'Arboles con ramas bajas y vegetacion seca',
      position: { x: 54, y: 47 },
      visualHint: 'Escalera vegetal desde el suelo a las copas',
      description:
        'Las ramas bajas conectan la vegetacion seca del suelo con la copa del arbol. Si prende el matorral, el fuego puede trepar con facilidad y ganar intensidad.',
      action: {
        id: 'podar-ramas-y-retirar-seco',
        label: 'Podar ramas bajas y retirar vegetacion seca',
        impact: {
          continuidadCombustible: -5,
          riesgoFuegoCopas: -3,
          defensibilidadViviendas: 2
        },
        flagsOnApply: ['continuidadVerticalReducida'],
        feedback:
          'Buena decision. Cortar esa escalera vertical dificulta que el fuego pase del suelo a las copas.'
      },
      flagIfIgnored: 'continuidadVerticalAlta',
      futureConsequence:
        'El fuego de superficie encuentra ramas bajas y vegetacion seca bajo los arboles. La llama sube hacia las copas y gana intensidad.'
    },
    {
      id: 'copas-tocandose',
      title: 'Copas de arboles tocandose',
      position: { x: 68, y: 30 },
      visualHint: 'Continuidad horizontal en copas',
      description:
        'Las copas de varios arboles se tocan entre si. Si el fuego llega a una de ellas, puede avanzar por las alturas hacia otras zonas.',
      action: {
        id: 'separar-copas',
        label: 'Separar copas de arboles',
        impact: {
          continuidadCombustible: -4,
          riesgoFuegoCopas: -3,
          defensibilidadViviendas: 2
        },
        flagsOnApply: ['copasSeparadas'],
        feedback:
          'Buena decision. Separar copas reduce la continuidad que permitiria al fuego correr por arriba.'
      },
      flagIfIgnored: 'copasConectadas',
      futureConsequence:
        'El incendio alcanza una copa y encuentra continuidad hacia otros arboles. La propagacion se acelera en la zona alta de la vegetacion.'
    },
    {
      id: 'huecos-sin-proteger',
      title: 'Respiraderos y huecos sin proteccion',
      position: { x: 20, y: 68 },
      visualHint: 'Aberturas vulnerables frente a pavesas',
      description:
        'La vivienda tiene respiraderos, huecos bajo el porche y pequenas aberturas sin proteccion. Una pavesa podria entrar o prender material acumulado.',
      action: {
        id: 'mallas-matachispas',
        label: 'Colocar mallas matachispas y proteger huecos',
        impact: {
          riesgoPavesas: -5,
          danosViviendas: -3,
          defensibilidadViviendas: 2
        },
        flagsOnApply: ['huecosProtegidos'],
        feedback:
          'Buena decision. Proteger huecos y ventilaciones reduce mucho las oportunidades de ignicion por pavesas.'
      },
      flagIfIgnored: 'huecosVulnerables',
      futureConsequence:
        'Las pavesas golpean la zona de porches y respiraderos. Algunos huecos sin proteccion se convierten en puntos vulnerables.'
    },
    {
      id: 'acceso-estrecho',
      title: 'Acceso estrecho para autobombas',
      position: { x: 76, y: 71 },
      visualHint: 'Camino con obstaculos y vegetacion',
      description:
        'El camino de entrada esta parcialmente ocupado por vegetacion, vallas, objetos y vehiculos aparcados. Una autobomba tendria dificultades para pasar o maniobrar.',
      action: {
        id: 'despejar-accesos',
        label: 'Despejar accesos para emergencias',
        impact: {
          seguridadEquipos: 3,
          defensibilidadViviendas: 3,
          coordinacionOperativa: 2,
          riesgoAtrapamiento: -2
        },
        flagsOnApply: ['accesosDespejados'],
        feedback:
          'Buena decision. Una casa puede ser defendible sobre el papel, pero si la autobomba no entra o no puede salir, la teoria se queda corta.'
      },
      flagIfIgnored: 'accesosDificiles',
      futureConsequence:
        'Una autobomba tarda mas de lo previsto en acceder a la zona. El camino estrecho complica la maniobra y retrasa la defensa de dos viviendas.'
    },
    {
      id: 'centro-social',
      title: 'Centro social proximo a vegetacion',
      position: { x: 84, y: 46 },
      visualHint: 'Edificio publico junto a una ladera',
      description:
        'El centro social esta cerca de una ladera con vegetacion. Podria funcionar como punto de encuentro o apoyo municipal, pero su entorno no esta preparado.',
      action: {
        id: 'preparar-edificio-publico',
        label: 'Preparar edificio publico como punto de apoyo',
        impact: {
          poblacionProtegida: 3,
          confianzaVecinal: 3,
          coordinacionOperativa: 3,
          defensibilidadViviendas: 1
        },
        flagsOnApply: ['edificioPublicoPreparado'],
        feedback:
          'Buena decision. Preparar un edificio publico crea un punto de referencia para la poblacion cuando la emergencia empieza a hacer ruido.'
      },
      flagIfIgnored: 'edificioPublicoVulnerable',
      futureConsequence:
        'El centro social se plantea como punto de informacion, pero su entorno no esta preparado y no puede usarse con seguridad.'
    }
  ],
  combos: [
    {
      id: 'viviendas-mas-defendibles',
      title: 'Viviendas mas defendibles',
      requires: ['fachadasDespejadas', 'canalonesLimpios', 'huecosProtegidos'],
      text:
        'Varias viviendas reducen de forma importante su vulnerabilidad ante pavesas y calor radiante.',
      bonusImpact: {
        defensibilidadViviendas: 2,
        danosViviendas: -1
      }
    },
    {
      id: 'menos-riesgo-fuego-copas',
      title: 'Menos riesgo de fuego de copas',
      requires: ['continuidadVerticalReducida', 'copasSeparadas'],
      text:
        'La continuidad vertical y horizontal del combustible se reduce. Si el fuego llega al entorno, tendra mas dificil subir y avanzar por las copas.',
      bonusImpact: {
        riesgoFuegoCopas: -2,
        continuidadCombustible: -2
      }
    },
    {
      id: 'mejor-defensa-operativa',
      title: 'Mejor defensa operativa',
      requires: ['accesosDespejados', 'edificioPublicoPreparado'],
      text:
        'El municipio mejora su capacidad de respuesta: hay mejores accesos y un punto publico mas util para coordinar informacion.',
      bonusImpact: {
        coordinacionOperativa: 2,
        seguridadEquipos: 1
      }
    }
  ],
  outcomes: [
    {
      id: 'alto',
      title: 'Viviendas mas defendibles',
      text:
        'Has reducido combustible junto a fachadas, protegido puntos vulnerables frente a pavesas y mejorado accesos para emergencias. Si el fuego llega, las viviendas no seran invulnerables, pero los equipos tendran mejores condiciones para defenderlas.'
    },
    {
      id: 'medio',
      title: 'Proteccion parcial',
      text:
        'Algunas vulnerabilidades importantes han sido corregidas, pero quedan puntos debiles: vegetacion cercana, huecos sin proteger o accesos complicados.'
    },
    {
      id: 'bajo',
      title: 'Entorno vulnerable',
      text:
        'La zona mantiene combustible cerca de viviendas, puntos de entrada para pavesas y accesos dificiles. Si el incendio se aproxima, las casas y los equipos partiran con desventaja.'
    }
  ]
};

export const PREVENTION_INSPECTION_FINCAS: PreventionInspectionScreen = {
  id: 'p-002-fincas-vegetacion-combustible',
  title: 'Fincas, vegetacion y gestion del combustible',
  shortTitle: 'Fincas y combustible',
  phase: 'prevencion',
  intro:
    'El fuego no siempre avanza por donde quiere. A veces avanza por donde le hemos dejado combustible.',
  context:
    'Sigues visitando municipios antes de la epoca de mayor riesgo. Tecnicos municipales, agricultores y ganaderos te muestran fincas proximas al monte con restos de poda, vegetacion densa, caminos estrechos, parcelas abandonadas y zonas donde el matorral conecta con viviendas dispersas.',
  objective:
    'Detecta puntos de riesgo en fincas y zonas rurales proximas al monte. Elige cuatro actuaciones preventivas para reducir el riesgo de ignicion y propagacion.',
  maxActions: 4,
  initialState: {
    defensibilidadViviendas: 0,
    continuidadCombustible: 0,
    riesgoPavesas: 0,
    riesgoFuegoCopas: 0,
    riesgoIgnicion: 0,
    riesgoPropagacion: 0,
    seguridadEquipos: 0,
    coordinacionOperativa: 0,
    cumplimientoPreventivo: 0,
    accesosDespejados: 0,
    controlIncendio: 0,
    poblacionProtegida: 0,
    confianzaVecinal: 0,
    danosViviendas: 0,
    riesgoAtrapamiento: 0,
    confusionPublica: 0
  },
  hotspots: [
    {
      id: 'restos-poda-acumulados',
      title: 'Restos de poda acumulados',
      position: { x: 22, y: 66 },
      visualHint: 'Ramas secas y restos vegetales junto a muros',
      description:
        'Varias fincas acumulan restos de poda, ramas secas y material vegetal junto a muros y caminos. Si se secan mas, pueden convertirse en combustible disponible para el fuego.',
      action: {
        id: 'gestionar-restos-poda',
        label: 'Gestionar restos de poda',
        impact: {
          continuidadCombustible: -4,
          riesgoIgnicion: -2,
          danosViviendas: -2
        },
        flagsOnApply: ['restosPodaGestionados'],
        feedback:
          'Buena decision. Los restos de poda no desaparecen solos: si se acumulan y se secan, el incendio los encuentra demasiado disponibles.'
      },
      flagIfIgnored: 'restosPodaAcumulados',
      futureConsequence:
        'El fuego encuentra restos secos acumulados junto a caminos y fincas. La propagacion gana velocidad.'
    },
    {
      id: 'vegetacion-densa-borde-fincas',
      title: 'Vegetacion densa en borde de fincas',
      position: { x: 42, y: 46 },
      visualHint: 'Matorral continuo conectando parcelas y monte',
      description:
        'En el limite entre las parcelas y el monte hay matorral denso y continuo. Si prende, puede conectar rapidamente la finca con la ladera y acercar el fuego a las viviendas.',
      action: {
        id: 'crear-discontinuidades-vegetales',
        label: 'Crear discontinuidades vegetales',
        impact: {
          continuidadCombustible: -5,
          riesgoPropagacion: -4,
          defensibilidadViviendas: 2
        },
        flagsOnApply: ['discontinuidadesVegetales'],
        feedback:
          'Buena decision. No todo lo verde protege: una masa vegetal continua puede ser una mecha elegante, pero mecha al fin y al cabo.'
      },
      flagIfIgnored: 'continuidadVegetalAlta',
      futureConsequence:
        'El borde entre finca y monte mantiene una continuidad vegetal alta. El fuego podria conectar parcelas y ladera con rapidez.'
    },
    {
      id: 'pastoreo-preventivo',
      title: 'Pastoreo preventivo: ovejas bombero',
      position: { x: 54, y: 70 },
      visualHint: 'Rebano en una franja de pastoreo planificada',
      description:
        'Una asociacion ganadera propone usar rebanos para reducir matorral y pasto seco en franjas concretas antes del verano. Exige acuerdos, calendario, agua y seguimiento tecnico.',
      action: {
        id: 'activar-pastoreo-preventivo',
        label: 'Activar pastoreo preventivo',
        impact: {
          continuidadCombustible: -4,
          riesgoPropagacion: -3,
          confianzaVecinal: 3,
          cumplimientoPreventivo: 3
        },
        flagsOnApply: ['pastoreoPreventivoActivado'],
        feedback:
          'Buena decision. El pastoreo preventivo ayuda a reducir combustible fino, pero funciona si se planifica: no es una solucion magica con lana.'
      },
      flagIfIgnored: 'sinPastoreoPreventivo',
      futureConsequence:
        'No se activa el pastoreo preventivo. Algunas franjas con pasto y matorral seguiran acumulando combustible fino.'
    },
    {
      id: 'replantacion-finca',
      title: 'Replantacion tras limpiar finca',
      position: { x: 30, y: 37 },
      visualHint: 'Parcela donde se decide que vegetacion replantar',
      description:
        'Un vecino ha limpiado parte de su finca y quiere replantar. Duda entre especies suculentas y discontinuas o una pantalla vegetal densa para separar la finca del monte.',
      action: {
        id: 'recomendar-vegetacion-discontinua',
        label: 'Recomendar vegetacion suculenta y discontinua',
        impact: {
          continuidadCombustible: -4,
          defensibilidadViviendas: 3,
          riesgoIgnicion: -2
        },
        flagsOnApply: ['vegetacionDiscontinua'],
        feedback:
          'Buena decision. No se trata de llenar la finca de plantas magicas, sino de disenar un paisaje que no le ponga una pasarela al fuego.'
      },
      flagIfIgnored: 'replantacionRiesgo',
      futureConsequence:
        'La replantacion queda sin orientacion preventiva. Existe riesgo de que se creen pantallas vegetales densas junto a viviendas.'
    },
    {
      id: 'camino-rural-invadido',
      title: 'Camino rural con margenes invadidos',
      position: { x: 73, y: 62 },
      visualHint: 'Camino estrecho con vegetacion seca en los bordes',
      description:
        'Un camino rural comunica varias fincas con el nucleo. Los margenes tienen vegetacion seca y ramas que estrechan el paso.',
      action: {
        id: 'limpiar-margenes-caminos',
        label: 'Limpiar margenes de caminos rurales',
        impact: {
          accesosDespejados: 4,
          seguridadEquipos: 3,
          riesgoAtrapamiento: -2,
          coordinacionOperativa: 2
        },
        flagsOnApply: ['margenesCaminosLimpios'],
        feedback:
          'Buena decision. Un camino rural puede ser acceso, salida o linea de defensa. Si esta invadido por vegetacion, se convierte en decoracion peligrosa.'
      },
      flagIfIgnored: 'caminosRuralesComplicados',
      futureConsequence:
        'Los margenes de caminos rurales siguen invadidos por vegetacion. Esto puede complicar accesos de emergencia y rutas de salida.'
    },
    {
      id: 'quema-agricola-restos',
      title: 'Quema agricola de restos',
      position: { x: 64, y: 36 },
      visualHint: 'Agricultores consultando una quema de restos',
      description:
        'Agricultores de la zona preguntan si podran quemar restos vegetales antes del verano. Algunos prefieren hacerlo como siempre; otros piden alternativas.',
      action: {
        id: 'regular-quemas-agricolas',
        label: 'Regular quemas agricolas autorizadas',
        impact: {
          riesgoIgnicion: -5,
          cumplimientoPreventivo: 4,
          confianzaVecinal: 2,
          confusionPublica: -2
        },
        flagsOnApply: ['quemasAgricolasReguladas'],
        feedback:
          'Buena decision. La quema agricola no puede depender del yo controlo. Debe estar autorizada, condicionada y suspendida si hay alerta, viento o riesgo alto.'
      },
      flagIfIgnored: 'quemasAgricolasSinControl',
      futureConsequence:
        'Las quemas agricolas quedan sin una regulacion clara. Una mala practica podria convertirse en origen de incendio.'
    },
    {
      id: 'quema-tecnica-profesional',
      title: 'Quema tecnica o linea preventiva profesional',
      position: { x: 82, y: 31 },
      visualHint: 'Tecnicos forestales estudiando una linea preventiva',
      description:
        'Tecnicos forestales proponen estudiar una quema prescrita o una linea preventiva en una zona estrategica. No es una actuacion vecinal: requiere planificacion, autorizacion, meteorologia adecuada y medios de control.',
      action: {
        id: 'evaluar-quema-tecnica',
        label: 'Solicitar evaluacion de quema tecnica profesional',
        impact: {
          controlIncendio: 3,
          continuidadCombustible: -4,
          coordinacionOperativa: 4,
          riesgoIgnicion: 1
        },
        flagsOnApply: ['quemaTecnicaEvaluada'],
        feedback:
          'Buena decision si se hace con criterio tecnico. El fuego puede ser herramienta, pero solo con permisos, meteorologia favorable y medios de control.'
      },
      flagIfIgnored: 'sinEvaluacionQuemaTecnica',
      futureConsequence:
        'No se estudia ninguna linea preventiva profesional. Si el fuego llega a esta zona, habra menos margen tactico.'
    }
  ],
  combos: [
    {
      id: 'menos-riesgo-ignicion',
      title: 'Menos riesgo de ignicion',
      requires: ['quemasAgricolasReguladas', 'restosPodaGestionados'],
      text:
        'El municipio reduce significativamente las posibilidades de que una chispa, una quema mal gestionada o restos secos acumulados originen el incendio.',
      bonusImpact: {
        riesgoIgnicion: -3,
        cumplimientoPreventivo: 2
      }
    },
    {
      id: 'paisaje-menos-continuo',
      title: 'Paisaje menos continuo',
      requires: ['discontinuidadesVegetales', 'vegetacionDiscontinua', 'restosPodaGestionados'],
      text:
        'Las fincas ya no funcionan como una alfombra continua de combustible entre el monte y las viviendas.',
      bonusImpact: {
        continuidadCombustible: -3,
        riesgoPropagacion: -2
      }
    },
    {
      id: 'respuesta-rural-segura',
      title: 'Respuesta rural mas segura',
      requires: ['margenesCaminosLimpios', 'quemaTecnicaEvaluada'],
      text:
        'Los equipos cuentan con mejores accesos y posibles lineas de trabajo si el fuego entra en la zona rural.',
      bonusImpact: {
        seguridadEquipos: 2,
        coordinacionOperativa: 2
      }
    },
    {
      id: 'gestion-combustible-local',
      title: 'Gestion del combustible con identidad local',
      requires: ['pastoreoPreventivoActivado', 'discontinuidadesVegetales'],
      text:
        'El pastoreo preventivo y las discontinuidades vegetales reducen combustible fino en zonas estrategicas sin convertir toda la prevencion en desbrozadora y cemento.',
      bonusImpact: {
        continuidadCombustible: -2,
        confianzaVecinal: 2
      }
    }
  ],
  outcomes: [
    {
      id: 'alto',
      title: 'Fincas menos vulnerables',
      text:
        'Has reducido restos combustibles, limitado actividades de riesgo y roto parte de la continuidad vegetal entre fincas y monte. Si se declara un incendio, tendra mas dificil encontrar una autopista de combustible.'
    },
    {
      id: 'medio',
      title: 'Riesgo contenido, pero no eliminado',
      text:
        'Algunas medidas clave se han tomado, pero quedan puntos delicados: restos vegetales, caminos rurales, vegetacion densa o actividades de riesgo.'
    },
    {
      id: 'bajo',
      title: 'Territorio preparado para arder',
      text:
        'Las fincas mantienen combustible acumulado, actividades de riesgo poco controladas y continuidad vegetal hacia el monte. Si aparece una chispa en mal dia, el incendio tendra demasiadas facilidades.'
    }
  ]
};

export const PREVENTION_INSPECTION_COMUNIDAD: PreventionInspectionScreen = {
  id: 'p-003-comunidad-preparada',
  title: 'Comunidad preparada',
  shortTitle: 'Comunidad preparada',
  phase: 'prevencion',
  intro:
    'La prevencion tambien se juega en lo que la gente sabe antes de que suene la sirena.',
  context:
    'Antes de que llegue la epoca de mayor riesgo, continuas las visitas municipales. Tras revisar viviendas, fincas y zonas de combustible, ahora toca hablar con la poblacion: familias, asociaciones vecinales, responsables municipales, alojamientos turisticos y personal de edificios publicos. No hay incendio todavia, pero ya aparecen dudas sobre que llevar, por donde salir, como cerrar la vivienda, como confinarse, donde informarse, que ocurre con mascotas y como identificar a personas que necesitaran apoyo.',
  objective:
    'Prepara a la poblacion para actuar con rapidez, calma y seguridad en caso de incendio forestal. Elige cuatro actuaciones preventivas entre los puntos vulnerables detectados.',
  maxActions: 4,
  initialState: {
    poblacionProtegida: 0,
    preparacionFamiliar: 0,
    confusionPublica: 0,
    riesgoAtrapamiento: 0,
    exposicionHumoCalor: 0,
    coordinacionOperativa: 0,
    confianzaVecinal: 0,
    autonomiaCiudadana: 0,
    canalesOficiales: 0,
    atencionVulnerables: 0,
    inclusionVulnerables: 0,
    saturacion112: 0
  },
  hotspots: [
    {
      id: 'familias-sin-mochila',
      title: 'Familias sin mochila de emergencia',
      position: { x: 29, y: 31 },
      visualHint: 'Hogares sin documentacion, medicacion, linterna ni cargadores preparados',
      description:
        'Varias familias reconocen que no tienen preparada ninguna mochila basica. Si se ordena evacuar, tendrian que buscar documentacion, medicinas, cargadores, linterna o agua en el ultimo momento.',
      action: {
        id: 'preparar-mochila-emergencia',
        label: 'Preparar mochila de emergencia',
        shortLabel: 'Mochila familiar',
        description:
          'Difundir una guia de mochila basica familiar con documentacion, medicacion necesaria, cargadores, linterna, radio con pilas, agua y elementos esenciales para menores, mayores o personas dependientes.',
        impact: {
          preparacionFamiliar: 4,
          poblacionProtegida: 3,
          confusionPublica: -2,
          riesgoAtrapamiento: -2
        },
        flagsOnApply: ['mochilaEmergenciaPreparada'],
        feedback:
          'Buena decision. Una mochila no apaga incendios, pero evita perder minutos valiosos buscando papeles, pastillas o el cargador que siempre se esconde cuando huele la tragedia.'
      },
      flagIfIgnored: 'familiasSinMochila',
      futureConsequence:
        'Cuando se ordena la evacuacion, varias familias pierden tiempo buscando documentacion, medicinas, cargadores o linternas. La salida se retrasa.'
    },
    {
      id: 'hogares-sin-plan-evacuacion-confinamiento',
      title: 'Hogares sin plan de evacuacion, confinamiento ni punto de encuentro',
      position: { x: 39, y: 66 },
      visualHint: 'Familias sin rutas oficiales ni instrucciones claras',
      description:
        'Varias familias no tienen claro que hacer si el fuego se acerca. Algunas no saben por donde salir si se ordena evacuar, otras no han acordado punto de encuentro y muchas dudan sobre como dejar la vivienda antes de marcharse. Tambien hay vecinos que no saben que hacer si la evacuacion ya no es segura y se ordena confinamiento.',
      action: {
        id: 'difundir-plan-evacuacion-confinamiento',
        label: 'Difundir plan de evacuacion y confinamiento',
        shortLabel: 'Plan familiar',
        description:
          'Preparar instrucciones claras sobre rutas oficiales, punto de encuentro, cierre basico de la vivienda si se evacua y medidas de proteccion si se ordena confinamiento.',
        details: {
          buttonLabel: 'Ver detalles',
          sections: [
            {
              title: 'Si se ordena evacuar',
              items: [
                'Seguir rutas oficiales.',
                'Llevar solo lo esencial.',
                'Cerrar puertas y ventanas antes de salir.',
                'Bajar persianas si no retrasa la salida.',
                'Cerrar llaves de gas o combustibles si puede hacerse con seguridad.',
                'Dejar accesos despejados.',
                'No bloquear calles ni caminos.',
                'Acordar un punto de encuentro familiar fuera de la zona de riesgo.',
                'Prever que hacer si la familia esta separada.'
              ]
            },
            {
              title: 'Si se ordena confinarse',
              items: [
                'Permanecer dentro de la vivienda o edificio indicado.',
                'Cerrar puertas, ventanas, persianas y entradas de aire.',
                'Tapar rendijas con panos humedos si entra humo.',
                'Alejarse de ventanas y fachadas expuestas.',
                'Tener agua, medicacion, linterna, radio con pilas y telefono cargado.',
                'No salir al exterior para mojar, mirar o grabar.',
                'Esperar instrucciones oficiales.'
              ]
            }
          ]
        },
        impact: {
          preparacionFamiliar: 5,
          poblacionProtegida: 5,
          confusionPublica: -4,
          riesgoAtrapamiento: -4,
          exposicionHumoCalor: -3,
          coordinacionOperativa: 2
        },
        flagsOnApply: ['planEvacuacionConfinamientoDifundido'],
        feedback:
          'Buena decision. La poblacion necesita saber dos cosas antes de que llegue el humo: como salir si hay evacuacion y como protegerse si toca confinamiento. Improvisar bajo presion es una pesima app de emergencias.'
      },
      flagIfIgnored: 'hogaresSinPlanEvacuacionConfinamiento',
      futureConsequence:
        'Cuando el fuego se aproxima, varias familias dudan si salir, quedarse, cerrar la vivienda o esperar nuevas instrucciones. Aumentan las llamadas al 112 y aparecen salidas improvisadas por rutas poco seguras.'
    },
    {
      id: 'canales-oficiales-poco-claros',
      title: 'Canales oficiales poco conocidos',
      position: { x: 58, y: 42 },
      visualHint: 'Vecinos informandose por mensajes reenviados',
      description:
        'En algunas reuniones, los vecinos preguntan donde deben mirar si hay incendio: redes sociales, ayuntamiento, radio, grupos de WhatsApp, 112 o medios de comunicacion. La falta de un canal claro puede multiplicar rumores y llamadas innecesarias.',
      action: {
        id: 'definir-canales-oficiales',
        label: 'Definir canales oficiales',
        shortLabel: 'Canales oficiales',
        description:
          'Definir y comunicar web municipal, redes institucionales, radio, medios, avisos del ayuntamiento, mensajes de Proteccion Civil y recordar que el 112 debe reservarse para emergencias reales.',
        impact: {
          confianzaVecinal: 4,
          confusionPublica: -5,
          saturacion112: -4,
          coordinacionOperativa: 3
        },
        flagsOnApply: ['canalesOficialesDefinidos'],
        feedback:
          'Buena decision. En una crisis, el silencio no deja calma: deja sitio a capturas de pantalla, audios reenviados y teorias con mucha seguridad y poca gasolina factual.'
      },
      flagIfIgnored: 'canalesOficialesPocoClaros',
      futureConsequence:
        'Al hacerse visible el humo, crecen los mensajes contradictorios y las llamadas de dudas generales. El 112 empieza a saturarse con preguntas que podrian haberse resuelto por canales oficiales claros.'
    },
    {
      id: 'edificio-publico-sin-protocolo',
      title: 'Edificio publico sin protocolo de uso',
      position: { x: 73, y: 55 },
      visualHint: 'Edificio publico previsto como apoyo pero sin organizacion',
      description:
        'El centro social o polideportivo del municipio podria servir como punto de informacion, apoyo o acogida temporal, pero nadie ha definido responsables, accesos, suministros, comunicacion o condiciones de uso.',
      action: {
        id: 'preparar-protocolo-edificio-publico',
        label: 'Preparar protocolo de edificio publico',
        shortLabel: 'Edificio publico',
        description:
          'Preparar uso previsto, responsables, accesos, comunicacion, agua, luz, botiquin, punto informativo, coordinacion con Proteccion Civil y criterios de apertura y cierre.',
        impact: {
          poblacionProtegida: 4,
          coordinacionOperativa: 4,
          confianzaVecinal: 3,
          confusionPublica: -2
        },
        flagsOnApply: ['protocoloEdificioPublicoPreparado'],
        feedback:
          'Buena decision. Un edificio publico no se convierte en punto de apoyo por tener paredes y una llave. Necesita protocolo, responsables y una funcion clara.'
      },
      flagIfIgnored: 'edificioPublicoSinProtocolo',
      futureConsequence:
        'Durante la emergencia, se plantea usar el edificio publico como punto de apoyo, pero no hay responsables definidos ni protocolo claro. La improvisacion retrasa la respuesta.'
    },
    {
      id: 'turistas-senderistas-sin-informacion',
      title: 'Turistas o senderistas sin informacion preventiva',
      position: { x: 83, y: 33 },
      visualHint: 'Sendero y alojamientos rurales sin informacion de riesgo',
      description:
        'El municipio tiene alojamientos rurales, senderos y zonas recreativas. Muchas personas visitantes no conocen el terreno, no siguen canales locales y pueden no entender avisos o restricciones.',
      action: {
        id: 'informar-turistas-senderistas',
        label: 'Informar a turistas y senderistas',
        shortLabel: 'Info visitantes',
        description:
          'Crear informacion preventiva con carteleria en senderos, avisos en alojamientos, codigos QR, rutas cerradas en dias de riesgo, recomendaciones multilingues y coordinacion con turismo municipal.',
        impact: {
          poblacionProtegida: 4,
          riesgoAtrapamiento: -3,
          confusionPublica: -2,
          coordinacionOperativa: 2
        },
        flagsOnApply: ['turistasSenderistasInformados'],
        feedback:
          'Buena decision. Quien esta de paso no tiene por que conocer el monte, los vientos ni las salidas. La prevencion tambien consiste en traducir el riesgo antes de que alguien se pierda entre humo y roaming.'
      },
      flagIfIgnored: 'turistasSenderistasSinInformacion',
      futureConsequence:
        'Cuando cambia el viento, un grupo de senderistas no sabe que ruta tomar ni donde consultar avisos. La localizacion y rescate se complican.'
    },
    {
      id: 'mascotas-sin-prevision',
      title: 'Mascotas sin prevision en la evacuacion',
      position: { x: 49, y: 24 },
      visualHint: 'Familias con animales sin plan de salida',
      description:
        'Varias familias preguntan que ocurriria con sus animales si se ordena evacuar. Algunas personas reconocen que no saldrian de casa si no pueden llevarse a sus mascotas.',
      action: {
        id: 'preparar-evacuacion-mascotas',
        label: 'Preparar evacuacion con mascotas',
        shortLabel: 'Mascotas',
        description:
          'Preparar pautas sobre transportines, correas, identificacion, cartilla, punto de acogida diferenciado, comunicacion clara y coordinacion con albergues o entidades de proteccion animal.',
        impact: {
          poblacionProtegida: 3,
          confianzaVecinal: 4,
          confusionPublica: -2,
          riesgoAtrapamiento: -3
        },
        flagsOnApply: ['evacuacionMascotasPreparada'],
        feedback:
          'Buena decision. Para muchas familias, el perro, el gato o los animales domesticos no son un detalle logistico: son la razon por la que podrian negarse a evacuar.'
      },
      flagIfIgnored: 'mascotasSinPrevision',
      futureConsequence:
        'Al ordenarse la evacuacion, varias personas se resisten a salir porque no saben si podran llevarse a sus mascotas. La evacuacion se ralentiza.'
    },
    {
      id: 'personas-vulnerables-sin-registro',
      title: 'Personas vulnerables o sin apoyo sin identificar',
      position: { x: 22, y: 51 },
      visualHint: 'Personas mayores, sin vehiculo o con movilidad reducida sin identificar',
      description:
        'En la zona hay personas que podrian necesitar ayuda si se ordena evacuar: mayores que viven solas, personas con movilidad reducida, familias sin vehiculo o vecinos sin red cercana. El municipio no tiene claro como localizarlas a tiempo.',
      action: {
        id: 'registrar-personas-apoyo',
        label: 'Registrar personas que necesitan apoyo',
        shortLabel: 'Registro vulnerable',
        description:
          'Crear un registro preventivo y voluntario de personas que pueden necesitar apoyo, coordinado con servicios sociales, Proteccion Civil y ayuntamiento.',
        impact: {
          poblacionProtegida: 5,
          inclusionVulnerables: 5,
          riesgoAtrapamiento: -4,
          coordinacionOperativa: 4,
          confusionPublica: -2
        },
        flagsOnApply: ['personasVulnerablesRegistradas'],
        feedback:
          'Buena decision. Una evacuacion no puede depender solo de tener coche, bateria y familia cerca. Las personas que necesitan apoyo no deberian aparecer en el radar cuando ya hay humo en la calle.'
      },
      flagIfIgnored: 'personasVulnerablesSinRegistro',
      futureConsequence:
        'Durante la evacuacion, el ayuntamiento detecta tarde que varias personas no tienen coche, apoyo familiar o movilidad suficiente para salir por su cuenta.'
    }
  ],
  combos: [
    {
      id: 'familias-preparadas',
      title: 'Familias preparadas',
      requires: ['mochilaEmergenciaPreparada', 'planEvacuacionConfinamientoDifundido'],
      text:
        'Las familias cuentan con lo basico para salir rapido y saben que hacer tanto si se ordena evacuacion como si se ordena confinamiento.',
      bonusImpact: {
        preparacionFamiliar: 2,
        riesgoAtrapamiento: -2,
        confusionPublica: -1
      }
    },
    {
      id: 'informacion-publica-ordenada',
      title: 'Informacion publica ordenada',
      requires: ['canalesOficialesDefinidos', 'protocoloEdificioPublicoPreparado'],
      text:
        'El municipio dispone de canales claros y un edificio publico con funcion definida para apoyar la informacion y la coordinacion.',
      bonusImpact: {
        confianzaVecinal: 2,
        saturacion112: -2,
        coordinacionOperativa: 2
      }
    },
    {
      id: 'evacuacion-mas-inclusiva',
      title: 'Evacuacion mas inclusiva',
      requires: ['personasVulnerablesRegistradas', 'evacuacionMascotasPreparada'],
      text:
        'La planificacion contempla a personas que necesitan apoyo y a familias que no evacuarian sin sus animales. La salida sera menos improvisada.',
      bonusImpact: {
        poblacionProtegida: 2,
        riesgoAtrapamiento: -2,
        confianzaVecinal: 2
      }
    },
    {
      id: 'visitantes-mejor-informados',
      title: 'Visitantes mejor informados',
      requires: ['turistasSenderistasInformados', 'canalesOficialesDefinidos'],
      text:
        'Las personas visitantes tienen mas opciones de recibir avisos fiables y evitar zonas de riesgo durante la emergencia.',
      bonusImpact: {
        poblacionProtegida: 2,
        riesgoAtrapamiento: -2,
        confusionPublica: -1
      }
    }
  ],
  outcomes: [
    {
      id: 'alto',
      title: 'Comunidad preparada',
      text:
        'La poblacion cuenta con instrucciones claras, canales oficiales definidos y medidas basicas para evacuar o confinarse sin improvisar. La comunidad no sera inmune al incendio, pero llegara con mas orden y menos ruido.'
    },
    {
      id: 'medio',
      title: 'Preparacion social desigual',
      text:
        'Algunas acciones preventivas han calado, pero quedan dudas importantes sobre canales oficiales, mascotas, turistas o personas que necesitan apoyo. La comunidad esta mejor que antes, aunque todavia con puntos ciegos.'
    },
    {
      id: 'bajo',
      title: 'Comunidad vulnerable a la improvisacion',
      text:
        'La poblacion llega a la epoca de riesgo sin pautas claras. Hay familias sin mochila, dudas sobre evacuacion y confinamiento, canales poco definidos y personas vulnerables sin identificar. Si el incendio se acerca, la confusion tendra ventaja.'
    }
  ]
};

export const PREVENTION_INSPECTIONS: PreventionInspectionScreen[] = [
  PREVENTION_INSPECTION_INTERFAZ,
  PREVENTION_INSPECTION_FINCAS,
  PREVENTION_INSPECTION_COMUNIDAD
];
