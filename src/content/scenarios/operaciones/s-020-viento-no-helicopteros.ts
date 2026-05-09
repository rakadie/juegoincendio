import type { Scenario } from '../../../domain/types/scenario.js';

export const s020VientoNoHelicopteros: Scenario = {
  id: 's-020-viento-no-helicopteros',
  title: 'Viento impide operar a los helicópteros',
  category: 'operaciones',
  phase: 'crisis',
  block: 'recursos-aereos',
  difficulty: 'alta',
  estimatedTime: '2 min',
  tags: ['operaciones', 'viento', 'helicopteros', 'recursos-aereos'],
  status: 'available',
  context: 'Las condiciones de viento impiden mantener con seguridad el trabajo de helicópteros.',
  question: '¿Cómo reorganizas la estrategia sin apoyo aéreo inmediato?',
  briefing:
    'La pérdida temporal de apoyo aéreo obliga a reajustar prioridades, reforzar medios terrestres y evitar maniobras que dependan de descargas o evacuaciones aéreas.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: ['Escenario pendiente de desarrollo a partir del archivo s-20 viento no helicopteros.']
};
