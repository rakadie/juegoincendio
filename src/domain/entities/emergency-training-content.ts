export type VariableType = 'number' | 'boolean' | 'enum';

export interface GameVariableDefinition {
  key: string;
  label: string;
  type: VariableType;
  description: string;
  min?: number;
  max?: number;
  initialValue: number | boolean | string;
}

export interface VariableImpact {
  variableKey: string;
  delta?: number;
  setTo?: number | boolean | string;
}

export interface TrainingOption {
  id: string;
  text: string;
  recommended: boolean;
  rationale: string;
  impacts: VariableImpact[];
}

export interface TrainingScenario {
  id: string;
  title: string;
  category:
    | 'prevencion'
    | 'operaciones'
    | 'evacuacion'
    | 'comunicacion'
    | 'postincendio';
  context: string;
  options: TrainingOption[];
}

export const EMERGENCY_GAME_VARIABLES: GameVariableDefinition[] = [
  {
    key: 'alertaTemperatura',
    label: 'Nivel de alerta por temperatura',
    type: 'enum',
    description: 'Indica el nivel oficial de aviso meteorológico.',
    initialValue: 'amarillo'
  },
  {
    key: 'vientoKmh',
    label: 'Intensidad del viento (km/h)',
    type: 'number',
    description: 'El viento condiciona la velocidad de propagación del incendio.',
    min: 0,
    max: 120,
    initialValue: 22
  },
  {
    key: 'humedadRelativa',
    label: 'Humedad relativa (%)',
    type: 'number',
    description: 'A menor humedad, más probabilidad de ignición y propagación.',
    min: 0,
    max: 100,
    initialValue: 25
  },
  {
    key: 'confianzaVecinal',
    label: 'Confianza vecinal',
    type: 'number',
    description: 'Mide el nivel de confianza de la población en las autoridades.',
    min: 0,
    max: 100,
    initialValue: 60
  },
  {
    key: 'cumplimientoPreventivo',
    label: 'Cumplimiento de medidas preventivas',
    type: 'number',
    description: 'Porcentaje de vecinos que aplican medidas de autoprotección.',
    min: 0,
    max: 100,
    initialValue: 45
  },
  {
    key: 'capacidadOperativa',
    label: 'Capacidad operativa de emergencias',
    type: 'number',
    description: 'Disponibilidad de recursos humanos y medios de intervención.',
    min: 0,
    max: 100,
    initialValue: 70
  },
  {
    key: 'danosPotencialesVivienda',
    label: 'Daños potenciales en viviendas',
    type: 'number',
    description: 'Estimación de exposición de viviendas a daños por incendio.',
    min: 0,
    max: 100,
    initialValue: 30
  },
  {
    key: 'continuidadSectorPrimario',
    label: 'Continuidad del sector primario',
    type: 'number',
    description: 'Impacto acumulado en actividad agrícola, ganadera y forestal.',
    min: 0,
    max: 100,
    initialValue: 65
  }
];

export const EMERGENCY_TRAINING_SCENARIOS: TrainingScenario[] = [
  {
    id: 's-001-limpieza-perimetral',
    title: 'Limpieza alrededor de viviendas',
    category: 'prevencion',
    context:
      'Como responsable de Emergencias, debes recomendar la distancia de limpieza mínima alrededor de viviendas.',
    options: [
      {
        id: 'a',
        text: '5 metros',
        recommended: false,
        rationale: 'Insuficiente para reducir continuidad del combustible.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: -3 }]
      },
      {
        id: 'b',
        text: '8 metros',
        recommended: false,
        rationale: 'Mejora parcial, pero sigue siendo limitada.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: -1 }]
      },
      {
        id: 'c',
        text: '12 metros',
        recommended: true,
        rationale: 'Mejor equilibrio para reducir riesgo en interfaz urbano-forestal.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: 6 }]
      },
      {
        id: 'd',
        text: '15 metros',
        recommended: false,
        rationale: 'Puede ser adecuada en contextos concretos, pero no siempre exigible.',
        impacts: [{ variableKey: 'confianzaVecinal', delta: -1 }]
      },
      {
        id: 'e',
        text: '20 metros',
        recommended: false,
        rationale: 'Puede percibirse desproporcionada y bajar adherencia social.',
        impacts: [{ variableKey: 'confianzaVecinal', delta: -3 }]
      }
    ]
  },
  {
    id: 's-002-plantas-finca',
    title: 'Elección de vegetación tras limpiar finca',
    category: 'prevencion',
    context: 'Los vecinos quieren replantar una finca limpia sin aumentar el riesgo de incendio.',
    options: [
      {
        id: 'a',
        text: 'Cactus y lentiscos, evitando setos densos continuos',
        recommended: true,
        rationale: 'Suelen requerir menos agua y pueden planificarse con discontinuidad vegetal.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: 4 }]
      },
      {
        id: 'b',
        text: 'Bambú y palmeras de forma masiva',
        recommended: false,
        rationale: 'Puede generar continuidad y acumulación de material vegetal seco.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 5 }]
      },
      {
        id: 'c',
        text: 'Pitas y buganvillas sin distancias de seguridad',
        recommended: false,
        rationale: 'Sin diseño preventivo puede aumentar exposición en interfaz.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 3 }]
      }
    ]
  },
  {
    id: 's-003-maquinaria-riesgo',
    title: 'Uso de maquinaria en horas de riesgo',
    category: 'prevencion',
    context: 'Un vecino usa maquinaria por la tarde con calor intenso.',
    options: [
      {
        id: 'a',
        text: 'Desbrozando con una manguera preparada y vigilancia activa',
        recommended: true,
        rationale: 'Reduce riesgo al añadir medios inmediatos de primera respuesta.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: 5 }]
      },
      {
        id: 'b',
        text: 'Cortando con radial en jardín',
        recommended: false,
        rationale: 'Actividad de alto riesgo por posibles chispas.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 6 }]
      },
      {
        id: 'c',
        text: 'Cortando con radial en patio',
        recommended: false,
        rationale: 'Sigue siendo de riesgo si no hay medidas estrictas.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 4 }]
      }
    ]
  },
  {
    id: 's-004-quemas-agricolas',
    title: 'Gestión de quemas agrícolas',
    category: 'prevencion',
    context:
      'Un vecino pregunta cómo gestionar una quema agrícola de forma legal y segura.',
    options: [
      {
        id: 'a',
        text: 'Solicitar autorización y confirmar que no existe prohibición activa por riesgo meteorológico',
        recommended: false,
        rationale: 'Es necesario, pero insuficiente sin planificación operativa completa.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: 2 }]
      },
      {
        id: 'b',
        text: 'Realizarla solo en horario autorizado, con perímetro limpio y medios de extinción preparados',
        recommended: false,
        rationale:
          'Mejora el control, pero falta incluir vigilancia completa y criterio de suspensión.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: 3 },
          { variableKey: 'danosPotencialesVivienda', delta: -1 }
        ]
      },
      {
        id: 'c',
        text: 'Comunicar inicio y fin a la autoridad competente cuando proceda y mantener vigilancia hasta extinción total',
        recommended: false,
        rationale: 'Aporta trazabilidad y seguridad, pero no cubre por sí sola todo el protocolo.',
        impacts: [{ variableKey: 'confianzaVecinal', delta: 2 }]
      },
      {
        id: 'd',
        text: 'Aplicar protocolo completo: autorización previa, revisión meteorológica, horario permitido, perímetro limpio, medios de extinción, vigilancia continua y suspensión inmediata si cambian las condiciones',
        recommended: true,
        rationale:
          'Integra requisitos administrativos y operativos para minimizar ignición y propagación.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: 8 },
          { variableKey: 'danosPotencialesVivienda', delta: -4 },
          { variableKey: 'confianzaVecinal', delta: 2 }
        ]
      },
      {
        id: 'e',
        text: 'Hacerla al atardecer sin autorización si el terreno está húmedo',
        recommended: false,
        rationale:
          'Aunque haya humedad puntual, incumple normativa y mantiene riesgo de escape.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: -7 }]
      },
      {
        id: 'f',
        text: 'Quemar restos en cualquier época si hay una manguera cerca',
        recommended: false,
        rationale: 'Normaliza prácticas inseguras y fuera de protocolo.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: -8 },
          { variableKey: 'danosPotencialesVivienda', delta: 5 }
        ]
      }
    ]
  },
  {
    id: 's-005-recoleccion-monte',
    title: 'Recogida de pinocha, leña, caña y forraje',
    category: 'prevencion',
    context: 'La población consulta sobre recolección de material vegetal y aprovechamientos.',
    options: [
      {
        id: 'a',
        text: 'Pueden recoger pinocha en cualquier lugar para limpiar el monte',
        recommended: false,
        rationale:
          'Recoger sin autorización y sin zonificación puede generar riesgo y conflictos normativos.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: -5 }]
      },
      {
        id: 'b',
        text: 'Pueden recoger pinocha en los márgenes de las carreteras',
        recommended: false,
        rationale:
          'Los márgenes viarios tienen condicionantes de seguridad y titularidad que requieren permiso.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: -4 }]
      },
      {
        id: 'c',
        text: 'Puede coger leña en cualquier lugar, así evitan que haya material combustible',
        recommended: false,
        rationale:
          'La retirada indiscriminada no sustituye la gestión autorizada y puede afectar al ecosistema.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: -4 },
          { variableKey: 'confianzaVecinal', delta: -1 }
        ]
      },
      {
        id: 'd',
        text: 'Puede recoger leña con autorización',
        recommended: true,
        rationale: 'La autorización permite control técnico, trazabilidad y condiciones de seguridad.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: 6 },
          { variableKey: 'confianzaVecinal', delta: 2 }
        ]
      },
      {
        id: 'e',
        text: 'Puede recoger caña en cualquier lugar para evitar la propagación de las llamas',
        recommended: false,
        rationale:
          'Aunque la caña influye en la continuidad del combustible, su retirada exige criterios y autorización.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: -4 }]
      },
      {
        id: 'f',
        text: 'Puede recoger caña en los cauces de barranco',
        recommended: false,
        rationale:
          'Los cauces tienen regulación específica y riesgo hidrológico, por lo que no procede sin permiso.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: -5 },
          { variableKey: 'danosPotencialesVivienda', delta: 1 }
        ]
      },
      {
        id: 'g',
        text: 'Puede recoger forraje en cualquier sitio, así ayuda a la limpieza de los terrenos',
        recommended: false,
        rationale: 'La recogida sin autorización puede incumplir normativa de uso y conservación.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: -4 }]
      },
      {
        id: 'h',
        text: 'Pueden recoger forraje con autorización',
        recommended: true,
        rationale:
          'La autorización ordena el aprovechamiento y mejora la seguridad en labores de recolección.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: 6 },
          { variableKey: 'continuidadSectorPrimario', delta: 2 }
        ]
      }
    ]
  },
  {
    id: 's-006-hogueras-monte',
    title: 'Hogueras en entorno forestal',
    category: 'prevencion',
    context: 'Surge la duda de si es posible hacer hogueras durante actividades en el monte.',
    options: [
      {
        id: 'a',
        text: 'Solo en zonas autorizadas y bajo condiciones permitidas',
        recommended: true,
        rationale: 'Minimiza igniciones y mantiene trazabilidad de control.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: 4 }]
      },
      {
        id: 'b',
        text: 'Sí, si la zona está limpia aunque sea verano',
        recommended: false,
        rationale: 'Contradice medidas preventivas en periodos críticos.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 4 }]
      }
    ]
  },
  {
    id: 's-007-evacuacion-ciudadania',
    title: '¿Qué hacer si se declara un incendio?',
    category: 'evacuacion',
    context: 'Última ronda de preguntas vecinales sobre autoprotección inmediata.',
    options: [
      {
        id: 'a',
        text: 'Regar mi terreno antes de que lleguen las llamas',
        recommended: false,
        rationale:
          'Puede exponer a la persona en un momento crítico y generar una falsa sensación de control.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: 2 },
          { variableKey: 'confianzaVecinal', delta: -2 }
        ]
      },
      {
        id: 'b',
        text: 'Cerrar la llave del gas y de la electricidad',
        recommended: true,
        rationale:
          'Si se puede hacer con seguridad y sin demoras, reduce riesgos adicionales durante la emergencia.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: -2 },
          { variableKey: 'cumplimientoPreventivo', delta: 2 }
        ]
      },
      {
        id: 'c',
        text: 'Salir de mi vivienda y acudir a una zona alta para saber por dónde va el fuego',
        recommended: false,
        rationale:
          'Buscar visibilidad del incendio desde zonas expuestas aumenta el riesgo personal.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: 1 },
          { variableKey: 'capacidadOperativa', delta: -1 }
        ]
      },
      {
        id: 'd',
        text: 'Salir lo antes posible de mi vivienda, tal y como leo en una cadena de Wassap',
        recommended: false,
        rationale: 'Aumenta caos y exposición por desinformación.',
        impacts: [{ variableKey: 'confianzaVecinal', delta: -6 }]
      },
      {
        id: 'e',
        text: 'Esperar indicaciones de las autoridades antes de evacuar',
        recommended: true,
        rationale: 'Evita movimientos descoordinados y mejora seguridad colectiva.',
        impacts: [{ variableKey: 'confianzaVecinal', delta: 5 }]
      }
    ]
  },
  {
    id: 's-008-campana-sector-primario',
    title: 'Campaña de comunicación sector primario',
    category: 'comunicacion',
    context:
      'Debes activar mensajes de campaña sobre consumo local y sostenibilidad territorial.',
    options: [
      {
        id: 'a',
        text: 'Promover consumo local para reforzar economía y paisaje gestionado',
        recommended: true,
        rationale: 'Favorece resiliencia territorial y continuidad de actividades rurales.',
        impacts: [{ variableKey: 'continuidadSectorPrimario', delta: 8 }]
      },
      {
        id: 'b',
        text: 'Priorizar siempre producto exterior si es más barato',
        recommended: false,
        rationale: 'Debilita la cadena de valor local en el medio rural.',
        impacts: [{ variableKey: 'continuidadSectorPrimario', delta: -7 }]
      }
    ]
  },
  {
    id: 's-009-primer-envio-medios',
    title: 'Activación inicial de medios',
    category: 'operaciones',
    context:
      'Con aviso naranja por calor y primer humo detectado en cumbre, debes decidir el primer despliegue.',
    options: [
      {
        id: 'a',
        text: 'Dos brigadas, dos medios aéreos y dos unidades policiales',
        recommended: true,
        rationale: 'Permite respuesta inicial robusta ante condiciones extremas.',
        impacts: [{ variableKey: 'capacidadOperativa', delta: -8 }]
      },
      {
        id: 'b',
        text: 'Una brigada, un medio aéreo y unidades policiales',
        recommended: false,
        rationale: 'Puede quedarse corto para estabilización temprana.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 5 }]
      }
    ]
  },
  {
    id: 's-010-cambio-viento-evacuacion',
    title: 'Cambio de viento hacia núcleo poblado',
    category: 'evacuacion',
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
        impacts: [{ variableKey: 'continuidadSectorPrimario', delta: -4 }]
      }
    ]
  },
  {
    id: 's-011-lineas-defensa',
    title: 'Defensa nocturna del perímetro',
    category: 'operaciones',
    context: 'Con la caída de la noche, el objetivo es evitar más daños en viviendas.',
    options: [
      {
        id: 'a',
        text: 'Relevos terrestres + líneas de defensa coordinadas',
        recommended: true,
        rationale: 'Mejora sostenibilidad táctica y contención progresiva.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: -4 }]
      },
      {
        id: 'b',
        text: 'Forzar ataque directo continuo sin relevo',
        recommended: false,
        rationale: 'Fatiga operativa y mayor exposición de personal.',
        impacts: [{ variableKey: 'capacidadOperativa', delta: -10 }]
      }
    ]
  },
  {
    id: 's-012-rescate-zona-peligrosa',
    title: 'Vecino que se niega a evacuar',
    category: 'operaciones',
    context:
      'En condiciones críticas, una persona permanece en vivienda de alto riesgo.',
    options: [
      {
        id: 'a',
        text: 'No exponer brigada si la zona es inviable y mantener comunicación segura',
        recommended: true,
        rationale: 'Prioriza seguridad de intervinientes y aplica criterio de riesgo operativo.',
        impacts: [{ variableKey: 'capacidadOperativa', delta: 2 }]
      },
      {
        id: 'b',
        text: 'Enviar brigada para extracción forzosa en máxima peligrosidad',
        recommended: false,
        rationale: 'Puede comprometer vidas de intervinientes sin garantías de retorno.',
        impacts: [{ variableKey: 'capacidadOperativa', delta: -7 }]
      }
    ]
  },
  {
    id: 's-013-simulacro-escolar',
    title: 'Nueva variable: simulacros en centros educativos',
    category: 'comunicacion',
    context:
      'Se propone realizar simulacros escolares trimestrales para mejorar cultura preventiva.',
    options: [
      {
        id: 'a',
        text: 'Implantar simulacro con guion de autoprotección y coordinación municipal',
        recommended: true,
        rationale: 'Aumenta preparación comunitaria intergeneracional.',
        impacts: [
          { variableKey: 'confianzaVecinal', delta: 3 },
          { variableKey: 'cumplimientoPreventivo', delta: 4 }
        ]
      },
      {
        id: 'b',
        text: 'Posponer indefinidamente por carga administrativa',
        recommended: false,
        rationale: 'Se pierde oportunidad de entrenamiento en calma.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: -3 }]
      }
    ]
  },
  {
    id: 's-014-red-agua-rural',
    title: 'Nueva variable: puntos de agua rurales',
    category: 'postincendio',
    context:
      'Tras campaña de evaluación, se detectan carencias de hidrantes y balsas para primera intervención.',
    options: [
      {
        id: 'a',
        text: 'Plan municipal para señalizar y mantener puntos de agua estratégicos',
        recommended: true,
        rationale: 'Refuerza respuesta temprana y logística en zonas dispersas.',
        impacts: [{ variableKey: 'capacidadOperativa', delta: 5 }]
      },
      {
        id: 'b',
        text: 'Dejar el mantenimiento para actuaciones puntuales',
        recommended: false,
        rationale: 'Mantiene vulnerabilidad estructural del territorio.',
        impacts: [{ variableKey: 'capacidadOperativa', delta: -4 }]
      }
    ]
  }
];

