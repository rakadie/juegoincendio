import type { Scenario } from '../../../domain/types/scenario.js';

export const s019RiesgoSubestacion: Scenario = {
  id: 's-019-riesgo-subestacion',
  title: 'Riesgo sobre subestación eléctrica',
  category: 'operaciones',
  phase: 'crisis',
  block: 'servicios-esenciales',
  difficulty: 'alta',
  estimatedTime: '2 min',
  tags: ['operaciones', 'subestacion', 'electricidad', 'infraestructura-critica'],
  status: 'available',
  context: 'El incendio se aproxima a una subestación eléctrica estratégica.',
  question: '¿Cómo proteges la infraestructura sin exponer al operativo?',
  briefing:
    'La subestación abastece a varios núcleos y su afección puede multiplicar las consecuencias del incendio. La decisión exige coordinación técnica, seguridad perimetral y priorización operativa.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: ['Escenario pendiente de desarrollo a partir del archivo s-19 riesgo subestacion.']
};
