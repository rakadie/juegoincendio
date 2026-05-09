import type { Scenario } from '../../../domain/types/scenario.js';

export const s018ApagonEnNucleo: Scenario = {
  id: 's-018-apagon-en-nucleo',
  title: 'Apagón en núcleo habitado',
  category: 'operaciones',
  phase: 'crisis',
  block: 'servicios-esenciales',
  difficulty: 'alta',
  estimatedTime: '2 min',
  tags: ['operaciones', 'apagon', 'servicios-esenciales', 'zona-habitada'],
  status: 'available',
  context: 'Un núcleo habitado afectado por el incendio pierde el suministro eléctrico.',
  question: '¿Cómo priorizas seguridad, información y servicios básicos?',
  briefing:
    'El apagón complica la comunicación con la población, el funcionamiento de recursos locales y la atención a personas vulnerables. El operativo debe coordinar alternativas y evitar decisiones desordenadas.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: ['Escenario pendiente de desarrollo a partir del archivo s-18 apagon en nucleo.']
};
