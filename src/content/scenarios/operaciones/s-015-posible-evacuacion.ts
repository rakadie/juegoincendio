import type { Scenario } from '../../../domain/types/scenario.js';

export const s015PosibleEvacuacion: Scenario = {
  id: 's-015-posible-evacuacion',
  title: 'Posible evacuación preventiva',
  category: 'operaciones',
  phase: 'crisis',
  block: 'evacuacion-y-proteccion-civil',
  difficulty: 'media',
  estimatedTime: '2 min',
  tags: ['operaciones', 'evacuacion', 'prevencion', 'proteccion-civil'],
  status: 'available',
  context: 'El avance del frente obliga a valorar una posible evacuación preventiva.',
  question: '¿Cuándo activas la evacuación y con qué alcance?',
  briefing:
    'La situación aún no exige una evacuación general, pero los cambios de viento y la proximidad a zonas habitadas obligan a preparar una decisión rápida y coordinada.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: ['Escenario pendiente de desarrollo a partir del archivo s-15-posible evacuacion.']
};
