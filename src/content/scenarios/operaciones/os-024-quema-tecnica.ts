import type { Scenario } from '../../../domain/types/scenario.js';

export const os024QuemaTecnica: Scenario = {
  id: 's-024-quema-tecnica',
  title: 'Quema tecnica como maniobra de control',
  category: 'operaciones',
  phase: 'crisis',
  block: 'estrategia-extincion',
  difficulty: 'alta',
  estimatedTime: '2 min',
  tags: [
    'cortafuego',
    'quema-tecnica',
    'maquinaria',
    'zona-agricola',
    'zona-forestal',
    'direccion-extincion',
    'riesgo'
  ],
  status: 'available',
  context:
    'El incendio avanza hacia una zona agricola y forestal con continuidad de combustible. Los tecnicos proponen una maniobra agresiva para frenar el avance.',
  question:
    '¿Autorizas una maniobra de cortafuego o quema tecnica para frenar el avance del incendio?',
  briefing:
    'El frente del incendio gana velocidad y se dirige hacia una zona donde la vegetacion seca conecta directamente con terrenos agricolas, pistas forestales y viviendas dispersas. Los tecnicos plantean una intervencion de emergencia: crear una discontinuidad en el combustible mediante maquinaria, quemas tecnicas controladas o una combinacion de ambas. La maniobra podria frenar el avance y ganar tiempo para proteger zonas habitadas. Sin embargo, la decision tiene costes. La actuacion puede afectar cultivos, suelo forestal, infraestructuras rurales y generar rechazo entre propietarios que no entienden por que se autoriza provocar mas fuego o destruir parte del terreno. Tenemos que decidir como actuar: valorar el criterio tecnico, medir el riesgo para la poblacion, explicar la medida, coordinar recursos y evitar que una maniobra necesaria se convierta en otro foco de conflicto.',
  requirements: null,
  options: [
    {
      id: 'a',
      text: 'Autorizar la maniobra solo si cuenta con evaluacion tecnica favorable, condiciones meteorologicas compatibles, recursos suficientes para controlarla y una justificacion clara vinculada a la proteccion de personas o bienes esenciales.',
      evaluation: 'recommended',
      severity: 'medium',
      rationale:
        'Una quema tecnica o cortafuego de emergencia no se improvisa. Puede ser util, pero solo con criterio tecnico, control operativo y una finalidad clara.',
      shortFeedback:
        'Respuesta adecuada. La autorizacion queda ligada a condiciones tecnicas y de seguridad.',
      impacts: [],
      mediaOutputs: [],
      flags: ['quema-tecnica-condicionada']
    },
    {
      id: 'b',
      text: 'Rechazar cualquier quema tecnica o cortafuego porque provocar danos controlados nunca debe formar parte de la respuesta a un incendio.',
      evaluation: 'risky',
      severity: 'high',
      rationale:
        'En algunas situaciones, crear discontinuidades o usar fuego tecnico puede evitar un dano mayor. Negarlo por principio puede dejar que el incendio elija el terreno de juego.',
      shortFeedback:
        'Respuesta incorrecta. El rechazo absoluto puede cerrar una herramienta util de contencion.',
      impacts: [],
      mediaOutputs: [],
      flags: ['rechazo-quema-tecnica']
    },
    {
      id: 'c',
      text: 'Coordinar la actuacion con direccion de extincion, tecnicos forestales, maquinaria, seguridad y comunicacion publica, informando a propietarios y poblacion afectada de por que se realiza y que zonas quedaran protegidas.',
      evaluation: 'optimal',
      severity: 'medium',
      rationale:
        'La maniobra necesita control tecnico y tambien explicacion publica. Si no se comunica bien, la poblacion puede interpretar una decision estrategica como una agresion gratuita al territorio.',
      shortFeedback:
        'Respuesta adecuada. La coordinacion tecnica y publica reduce el riesgo operativo y social.',
      impacts: [],
      mediaOutputs: [],
      flags: ['quema-tecnica-coordinada']
    },
    {
      id: 'd',
      text: 'Autorizar la quema tecnica de inmediato aunque el viento sea inestable, para adelantarse al frente antes de que llegue a la zona agricola.',
      evaluation: 'critical',
      severity: 'critical',
      rationale:
        'Con viento inestable, una quema tecnica puede escapar al control y convertirse en otro problema.',
      shortFeedback:
        'Respuesta incorrecta. No se combate un incendio anadiendo un nuevo foco descontrolado.',
      impacts: [],
      mediaOutputs: [],
      flags: ['quema-tecnica-viento-inestable']
    },
    {
      id: 'e',
      text: 'Esperar a que el fuego llegue a la zona agricola y decidir entonces, para evitar danos innecesarios si finalmente cambia de direccion.',
      evaluation: 'risky',
      severity: 'high',
      rationale:
        'Algunas maniobras necesitan anticipacion. Esperar demasiado puede hacer que ya no haya tiempo, recursos ni condiciones seguras para ejecutarlas.',
      shortFeedback:
        'Respuesta incorrecta. En incendios, el ya veremos suele llegar tarde.',
      impacts: [],
      mediaOutputs: [],
      flags: ['quema-tecnica-decision-tardia']
    }
  ],
  unlocks: [],
  sourceNotes: [
    'Los cortafuegos de emergencia y las quemas tecnicas deben basarse en evaluacion tecnica, condiciones meteorologicas adecuadas y capacidad real de control.',
    'Las maniobras que implican danos controlados requieren coordinacion operativa y comunicacion clara con poblacion y propietarios afectados.',
    'Actualizado desde el contenido aportado en os-024-quema-tecnica y mantenido como escenario propio para no pisar s-025-cortafuego-emergencia.'
  ]
};
