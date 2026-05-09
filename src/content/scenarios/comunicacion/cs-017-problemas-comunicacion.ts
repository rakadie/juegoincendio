import type { Scenario } from '../../../domain/types/scenario.js';

export const cs017ProblemasComunicacion: Scenario = {
  id: 's-017-problemas-comunicacion',
  title: 'Problemas de comunicación',
  category: 'comunicacion',
  phase: 'crisis',
  block: 'informacion-publica-y-rumores',
  difficulty: 'media',
  estimatedTime: '2 min',
  tags: ['comunicacion', 'crisis', 'coordinacion'],
  status: 'available',
  context: 'Surgen problemas de comunicación durante la gestión del incendio.',
  question: '¿Cómo reorganizas la comunicación para evitar confusión?',
  briefing:
    'La información no está llegando con claridad a todos los actores implicados. Es necesario decidir cómo ordenar los mensajes, los canales y la coordinación institucional.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: ['Escenario pendiente de desarrollo a partir del archivo s-17 problemas comunicacion.']
};
