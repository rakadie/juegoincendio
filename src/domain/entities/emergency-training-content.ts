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
        text: 'Bambú',
        recommended: false,
        rationale: 'Puede generar continuidad vegetal y acumulación de material seco.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 4 }]
      },
      {
        id: 'b',
        text: 'Cactus',
        recommended: true,
        rationale: 'Puede integrarse con menor continuidad de combustible si se diseña con distancias.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: 3 },
          { variableKey: 'danosPotencialesVivienda', delta: -1 }
        ]
      },
      {
        id: 'c',
        text: 'Lentiscos',
        recommended: true,
        rationale: 'Bien gestionado y con discontinuidad vegetal, mejora el equilibrio de la finca.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: 2 }]
      },
      {
        id: 'd',
        text: 'Pitas',
        recommended: false,
        rationale: 'Sin planificación de seguridad pueden aumentar exposición en la interfaz.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 2 }]
      },
      {
        id: 'e',
        text: 'Palmeras',
        recommended: false,
        rationale: 'Puede generar continuidad y acumulación de material vegetal seco.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 4 }]
      },
      {
        id: 'f',
        text: 'Buganvillas',
        recommended: false,
        rationale: 'Si se colocan de forma densa y sin separación, aumentan el riesgo en perímetros.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 3 }]
      },
      {
        id: 'g',
        text: 'Helecho',
        recommended: false,
        rationale:
          'En condiciones secas puede comportarse como combustible fino y favorecer propagación.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 4 }]
      },
      {
        id: 'h',
        text: 'Hibisco',
        recommended: false,
        rationale:
          'Requiere diseño preventivo específico; en masa y sin distancias puede elevar exposición.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 2 }]
      }
    ]
  },
  {
    id: 's-002b-asesoramiento-terrenos',
    title: 'Asesoramiento sobre terrenos colindantes',
    category: 'prevencion',
    context:
      'En la finca de al lado te encuentras a otro vecino. Tiene varios terrenos y no sabe qué hacer con ellos. ¿Qué le aconsejas?',
    options: [
      {
        id: 'a',
        text: 'Que plante vegetación alrededor de las zonas urbanas',
        recommended: false,
        rationale:
          'Plantar sin diseño preventivo en interfaz urbano-forestal puede aumentar la continuidad del combustible.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 3 }]
      },
      {
        id: 'b',
        text: 'Que hable con los ganaderos del municipio para que sus animales limpien el terreno de malas hierbas cuando lo necesite',
        recommended: true,
        rationale:
          'El pastoreo controlado ayuda a reducir la carga de combustible y mejora el mantenimiento periódico.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: 5 },
          { variableKey: 'continuidadSectorPrimario', delta: 3 }
        ]
      },
      {
        id: 'c',
        text: 'Que si no quiere plantar, que deje crecer las plantas para que el terreno esté bonito',
        recommended: false,
        rationale:
          'El crecimiento sin gestión preventiva puede elevar el riesgo de propagación del incendio.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: -4 },
          { variableKey: 'danosPotencialesVivienda', delta: 5 }
        ]
      },
      {
        id: 'd',
        text: 'Que arriende los terrenos para uso agrícola',
        recommended: true,
        rationale:
          'Un uso agrícola planificado evita el abandono del terreno y favorece su gestión continuada.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: 4 },
          { variableKey: 'continuidadSectorPrimario', delta: 4 }
        ]
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
        text: 'Cortando con una radial en el jardín',
        recommended: false,
        rationale: 'Actividad de alto riesgo por posibles chispas.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 6 }]
      },
      {
        id: 'b',
        text: 'Cortando con una radial en un patio',
        recommended: false,
        rationale: 'Sigue siendo de riesgo si no hay medidas estrictas.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 4 }]
      },
      {
        id: 'c',
        text: 'Desbrozando',
        recommended: false,
        rationale:
          'Sin medidas adicionales, puede provocar igniciones por contacto con material seco.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 3 }]
      },
      {
        id: 'd',
        text: 'Desbrozando con una manguera al lado',
        recommended: true,
        rationale: 'Reduce riesgo al añadir medios inmediatos de primera respuesta.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: 5 }]
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
    title: 'Hogueras o barbacoas en entorno forestal',
    category: 'prevencion',
    context:
      'Surge la duda de si es posible hacer hogueras o barbacoas durante actividades en el monte.',
    options: [
      {
        id: 'a',
        text: 'Sí, si la zona está limpia aunque haga calor o sea verano',
        recommended: false,
        rationale:
          'La limpieza del entorno no sustituye la restricción por riesgo alto en periodos críticos.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 4 }]
      },
      {
        id: 'b',
        text: 'Si estamos de acampada, en una zona limpia de matorral',
        recommended: false,
        rationale: 'La acampada no habilita por sí sola el uso de fuego en entorno forestal.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: -3 }]
      },
      {
        id: 'c',
        text: 'Solo en las zonas autorizadas',
        recommended: false,
        rationale:
          'Es condición necesaria, pero también deben cumplirse las condiciones meteorológicas y normativas vigentes.',
        impacts: [{ variableKey: 'cumplimientoPreventivo', delta: 1 }]
      },
      {
        id: 'd',
        text: 'Solo es posible invierno',
        recommended: false,
        rationale:
          'La autorización no depende únicamente de la estación, sino del riesgo y de la regulación activa.',
        impacts: [{ variableKey: 'confianzaVecinal', delta: -1 }]
      },
      {
        id: 'e',
        text: 'Solo en zonas autorizadas y si las condiciones meteorológicas lo permiten',
        recommended: true,
        rationale: 'Es la opción más segura y alineada con prevención y control de igniciones.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: 5 },
          { variableKey: 'danosPotencialesVivienda', delta: -2 }
        ]
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
      },
      {
        id: 'c',
        text: 'Crear nuevas balsas de agua y mejorar los accesos para vehículos de emergencia',
        recommended: true,
        rationale:
          'Aumenta disponibilidad hídrica y reduce tiempos de acceso en primera respuesta.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: 6 },
          { variableKey: 'danosPotencialesVivienda', delta: -2 }
        ]
      },
      {
        id: 'd',
        text: 'Llegado el momento las brigadas pueden encontrar agua en charcos o estanques cercanos',
        recommended: false,
        rationale:
          'Depender de puntos no garantizados ni preparados puede fallar en momentos críticos.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -3 },
          { variableKey: 'danosPotencialesVivienda', delta: 2 }
        ]
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
      },
      {
        id: 'c',
        text: 'Enviar una unidad policial y un helicóptero de reconocimiento para evaluar el incendio antes de desplegar brigadas',
        recommended: false,
        rationale:
          'Aporta información, pero puede retrasar el ataque inicial en condiciones de riesgo alto.',
        impacts: [{ variableKey: 'danosPotencialesVivienda', delta: 3 }]
      },
      {
        id: 'd',
        text: 'No movilizar recursos y observar la evolución del incendio desde el centro de coordinación',
        recommended: false,
        rationale:
          'Retrasa la respuesta operativa y aumenta la probabilidad de propagación del incendio.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: 2 },
          { variableKey: 'danosPotencialesVivienda', delta: 8 },
          { variableKey: 'confianzaVecinal', delta: -4 }
        ]
      }
    ]
  },
  {
    id: 's-009c-continuidad-incendio',
    title: 'Seguimiento tras inicio del incendio',
    category: 'operaciones',
    context:
      'Están actuando los medios que has enviado aunque te avisan de que el incendio continúa.',
    options: [
      {
        id: 'a',
        text: 'Reorganizo la estrategia: priorizo proteger viviendas y crear líneas cortafuegos',
        recommended: true,
        rationale:
          'Permite concentrar esfuerzos en protección de personas y contención del frente con criterio táctico.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: -4 },
          { variableKey: 'capacidadOperativa', delta: -4 },
          { variableKey: 'confianzaVecinal', delta: 2 }
        ]
      },
      {
        id: 'b',
        text: 'Aumento los medios enviados',
        recommended: false,
        rationale:
          'Mejora parcialmente la respuesta, aunque suele ser menos eficaz que reorganizar la estrategia por prioridades.',
        impacts: [
          { variableKey: 'cumplimientoPreventivo', delta: 2 },
          { variableKey: 'confianzaVecinal', delta: 1 }
        ]
      },
      {
        id: 'c',
        text: 'Espero. Todavía están actuando y pueden apagarlo',
        recommended: false,
        rationale: 'Demorar decisiones de ajuste puede facilitar la propagación en condiciones adversas.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: 4 },
          { variableKey: 'confianzaVecinal', delta: -2 }
        ]
      },
      {
        id: 'd',
        text: 'Retiro algunos medios para ahorrar recursos por si es necesario más tarde',
        recommended: false,
        rationale:
          'Retirar medios en fase activa reduce capacidad de control y puede empeorar el escenario.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: 3 },
          { variableKey: 'danosPotencialesVivienda', delta: 6 },
          { variableKey: 'confianzaVecinal', delta: -3 }
        ]
      }
    ]
  },
  {
    id: 's-009b-escalado-incendio',
    title: 'Escalado de medios por empeoramiento del incendio',
    category: 'operaciones',
    context:
      'Las temperaturas y la falta de humedad no ayudan. El incendio ocupa más masa forestal.',
    options: [
      {
        id: 'a',
        text: 'Envío medios aéreos más grandes (hidroaviones, helicópteros Kamov)',
        recommended: true,
        rationale:
          'Ante intensificación del fuego, aumentar capacidad de descarga y alcance mejora la contención inicial.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -10 },
          { variableKey: 'danosPotencialesVivienda', delta: -5 }
        ]
      },
      {
        id: 'b',
        text: 'Solo mando más medios terrestres',
        recommended: false,
        rationale:
          'Refuerza el frente, pero puede resultar insuficiente sin apoyo aéreo en condiciones extremas.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -6 },
          { variableKey: 'danosPotencialesVivienda', delta: 2 }
        ]
      },
      {
        id: 'c',
        text: 'Enviar un medio aéreo adicional y reforzar ligeramente las brigadas terrestres',
        recommended: false,
        rationale:
          'Es una escalada parcial que puede ayudar, aunque puede quedarse corta si el frente sigue creciendo.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -7 },
          { variableKey: 'danosPotencialesVivienda', delta: 1 }
        ]
      },
      {
        id: 'd',
        text: 'No enviar más recursos y confiar en que el viento reduzca la intensidad del incendio',
        recommended: false,
        rationale:
          'La inacción en un escenario adverso aumenta el riesgo de propagación y de daños a población y viviendas.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: 8 },
          { variableKey: 'confianzaVecinal', delta: -5 }
        ]
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
      },
      {
        id: 'c',
        text: 'Ordeno una evacuación escalonada y habilito varios puntos de acogida en municipios cercanos',
        recommended: true,
        rationale:
          'Reduce cuellos de botella, ordena los traslados y mejora la protección de la población desplazada.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: -3 },
          { variableKey: 'confianzaVecinal', delta: 5 },
          { variableKey: 'capacidadOperativa', delta: -3 }
        ]
      },
      {
        id: 'd',
        text: 'Doy a los vecinos la opción de decidir si quieren evacuar o no',
        recommended: false,
        rationale:
          'Delegar la evacuación en decisión individual en fase crítica aumenta la exposición y descoordinación.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: 6 },
          { variableKey: 'confianzaVecinal', delta: -5 }
        ]
      }
    ]
  },
  {
    id: 's-010b-defensa-nucleo-viviendas',
    title: 'Defensa del núcleo de viviendas con incendio fuera de control',
    category: 'operaciones',
    context:
      'El incendio sigue avanzando sin control. Las llamas superan los dos metros y medio. Vas a mandar a los bomberos al núcleo de viviendas…',
    options: [
      {
        id: 'a',
        text: 'Refuerzas la defensa con maquinaria pesada para abrir líneas cortafuegos alrededor del barrio',
        recommended: true,
        rationale:
          'Prioriza la defensa de la interfaz urbana con una estrategia de contención más robusta.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: -5 },
          { variableKey: 'capacidadOperativa', delta: -6 },
          { variableKey: 'confianzaVecinal', delta: 3 }
        ]
      },
      {
        id: 'b',
        text: 'Van a hacer una defensa activa del barrio para que no se quemen las viviendas',
        recommended: false,
        rationale:
          'Puede ayudar, pero sin reforzar la contención perimetral puede ser insuficiente ante un frente tan intenso.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: -1 },
          { variableKey: 'capacidadOperativa', delta: -5 }
        ]
      },
      {
        id: 'c',
        text: 'Les pides que dejen pasar el frente de llamas y luego que entren para apagar lo que quede activo, para minimizar daños',
        recommended: false,
        rationale:
          'Reduce exposición directa inicial, pero puede permitir más afección en viviendas antes del control.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: 1 },
          { variableKey: 'danosPotencialesVivienda', delta: 4 },
          { variableKey: 'confianzaVecinal', delta: -2 }
        ]
      },
      {
        id: 'd',
        text: 'Intentas apagar las llamas con camiones cisterna de agua del ayuntamiento',
        recommended: false,
        rationale:
          'Como estrategia principal frente a llama muy intensa suele ser insuficiente y poco segura.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -2 },
          { variableKey: 'danosPotencialesVivienda', delta: 5 }
        ]
      }
    ]
  },
  {
    id: 's-010c-ataque-zona-secundaria',
    title: 'Actuación en otra zona del monte antes de la noche',
    category: 'operaciones',
    context:
      'Mientras tanto, en otra zona del monte los medios aéreos continúan trabajando sin descanso antes de que llegue la noche.',
    options: [
      {
        id: 'a',
        text: 'Ordenas parar las descargas aéreas para ahorrar agua y utilizarla más tarde',
        recommended: false,
        rationale:
          'Interrumpir descargas en fase activa suele favorecer la continuidad del frente de incendio.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: 4 },
          { variableKey: 'confianzaVecinal', delta: -2 }
        ]
      },
      {
        id: 'b',
        text: 'Mandas a las brigadas terrestres que sigan atacando desde la cola',
        recommended: false,
        rationale:
          'Puede aportar control local, pero puede ser insuficiente si no se actúa también sobre zonas críticas.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -4 },
          { variableKey: 'danosPotencialesVivienda', delta: 1 }
        ]
      },
      {
        id: 'c',
        text: 'Pides a los medios terrestres que realicen líneas de defensa',
        recommended: true,
        rationale:
          'Consolida la contención y mejora la capacidad de frenar propagación antes del periodo nocturno.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: -4 },
          { variableKey: 'capacidadOperativa', delta: -5 },
          { variableKey: 'cumplimientoPreventivo', delta: 2 }
        ]
      },
      {
        id: 'd',
        text: 'Rediriges parte de las brigadas para atacar los flancos del incendio',
        recommended: true,
        rationale:
          'Atacar flancos puede reducir la expansión lateral y reforzar el cierre táctico del perímetro.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: -3 },
          { variableKey: 'capacidadOperativa', delta: -4 }
        ]
      }
    ]
  },
  {
    id: 's-010c2-refuerzo-ume-viviendas',
    title: 'Refuerzo con UME para proteger viviendas',
    category: 'operaciones',
    context:
      'No quieres que se quemen más viviendas… Continúan los relevos de los medios terrestres. La Unidad Militar de Emergencias se ha unido a ellos.',
    options: [
      {
        id: 'a',
        text: 'Continúan los relevos de los medios terrestres. La Unidad Militar de Emergencias se ha unido a ellos',
        recommended: false,
        rationale:
          'Mantiene la presión operativa, pero puede quedarse corta si no se refuerza la protección del núcleo urbano.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -4 },
          { variableKey: 'danosPotencialesVivienda', delta: -1 }
        ]
      },
      {
        id: 'b',
        text: 'La Unidad Militar de Emergencias se ha unido y los medios aéreos deben continuar',
        recommended: true,
        rationale:
          'Combina continuidad aérea y refuerzo terrestre para sostener la contención en una fase crítica.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -8 },
          { variableKey: 'danosPotencialesVivienda', delta: -4 },
          { variableKey: 'confianzaVecinal', delta: 2 }
        ]
      },
      {
        id: 'c',
        text: 'Creas un perímetro de protección alrededor del núcleo de viviendas con maquinaria y brigadas',
        recommended: true,
        rationale:
          'Prioriza la defensa de viviendas y mejora la capacidad de frenar la llegada del frente al casco habitado.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: -5 },
          { variableKey: 'capacidadOperativa', delta: -6 },
          { variableKey: 'confianzaVecinal', delta: 3 }
        ]
      },
      {
        id: 'd',
        text: 'Ordenas apagar primero los jardines y piscinas de las casas para evitar que el fuego llegue',
        recommended: false,
        rationale:
          'No centra recursos en los puntos de mayor propagación y puede resultar insuficiente como estrategia principal.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: 3 },
          { variableKey: 'capacidadOperativa', delta: -2 }
        ]
      }
    ]
  },
  {
    id: 's-010d-zona-barranco',
    title: 'Intervención en zona de barranco',
    category: 'operaciones',
    context: 'Las llamas llegan a una zona de barranco…',
    options: [
      {
        id: 'a',
        text: 'Das las órdenes para que lleguen allí los hidroaviones',
        recommended: true,
        rationale:
          'Aporta alta capacidad de descarga en un terreno complejo donde el acceso terrestre puede estar limitado.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -7 },
          { variableKey: 'danosPotencialesVivienda', delta: -3 }
        ]
      },
      {
        id: 'b',
        text: 'Ordenas desviar un camión de bomberos para que baje al fondo del barranco',
        recommended: false,
        rationale:
          'Puede comprometer la seguridad y la maniobrabilidad del vehículo en una zona de difícil acceso.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -3 },
          { variableKey: 'danosPotencialesVivienda', delta: 2 }
        ]
      },
      {
        id: 'c',
        text: 'Pides a los helicópteros que acudan a la zona de barranco',
        recommended: true,
        rationale:
          'Los helicópteros ofrecen flexibilidad táctica y precisión de descarga en relieve abrupto.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -6 },
          { variableKey: 'danosPotencialesVivienda', delta: -2 }
        ]
      },
      {
        id: 'd',
        text: 'Ordenas a las brigadas terrestres que ataquen el flanco del incendio desde la parte alta del barranco',
        recommended: false,
        rationale:
          'Puede ser útil en combinación con medios aéreos, pero aislado incrementa exposición del personal.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -5 },
          { variableKey: 'danosPotencialesVivienda', delta: 1 }
        ]
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
      },
      {
        id: 'c',
        text: 'Priorizar la protección del núcleo urbano y retirar equipos de zonas menos críticas',
        recommended: true,
        rationale:
          'Concentra recursos en la zona con mayor riesgo para viviendas y mejora la eficacia de la defensa.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: -3 },
          { variableKey: 'confianzaVecinal', delta: 2 },
          { variableKey: 'capacidadOperativa', delta: -3 }
        ]
      },
      {
        id: 'd',
        text: 'Suspender las operaciones hasta el amanecer cuando haya más luz',
        recommended: false,
        rationale:
          'Detener la respuesta en fase activa puede permitir propagación nocturna y aumentar daños acumulados.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: 6 },
          { variableKey: 'confianzaVecinal', delta: -4 }
        ]
      }
    ]
  },
  {
    id: 's-012-rescate-zona-peligrosa',
    title: 'Vecino que se niega a evacuar',
    category: 'operaciones',
    context:
      'Han continuado las evacuaciones, sin embargo, a primera hora llega una alarma al Puesto de Mando Avanzado: un vecino no ha querido abandonar su vivienda y donde está las llamas avanzan sin control. Hablas con el resto del equipo…',
    options: [
      {
        id: 'a',
        text: 'Decidís mandar una brigada para que obligue al vecino a abandonar su vivienda, si no podría morir.',
        recommended: false,
        rationale:
          'La intención es protectora, pero una entrada forzosa en zona de llama fuera de control puede poner en grave riesgo a la brigada.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -7 },
          { variableKey: 'confianzaVecinal', delta: 1 }
        ]
      },
      {
        id: 'b',
        text: 'La zona es demasiado peligrosa, tomáis la decisión de no mandar ningún equipo ante el riesgo de no poder salir de la zona.',
        recommended: true,
        rationale:
          'Aplica criterio de seguridad operativa cuando la extracción no es viable sin comprometer más vidas.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: 2 },
          { variableKey: 'confianzaVecinal', delta: -1 }
        ]
      },
      {
        id: 'c',
        text: 'Intentáis evacuar al vecino con un helicóptero si las condiciones lo permiten',
        recommended: true,
        rationale:
          'Es una alternativa de extracción más segura en escenarios concretos, siempre sujeta a viabilidad aérea.',
        impacts: [
          { variableKey: 'capacidadOperativa', delta: -5 },
          { variableKey: 'danosPotencialesVivienda', delta: -2 },
          { variableKey: 'confianzaVecinal', delta: 3 }
        ]
      },
      {
        id: 'd',
        text: 'Le pedís al vecino que moje su casa con una manguera hasta que pase el incendio',
        recommended: false,
        rationale:
          'No es una medida de autoprotección suficiente en un frente sin control y puede aumentar el riesgo para la persona aislada.',
        impacts: [
          { variableKey: 'danosPotencialesVivienda', delta: 5 },
          { variableKey: 'confianzaVecinal', delta: -4 }
        ]
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
  }
];

