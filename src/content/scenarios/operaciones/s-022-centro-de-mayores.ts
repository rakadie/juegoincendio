import type { Scenario } from '../../../domain/types/scenario.js';

export const s022CentroDeMayores: Scenario = {
  id: 's-022-centro-de-mayores',
  title: 'Centro de mayores en riesgo operativo',
  category: 'operaciones',
  phase: 'crisis',
  block: 'evacuacion-y-proteccion-civil',
  difficulty: 'alta',
  estimatedTime: '3 min',
  tags: ['operaciones', 'mayores', 'evacuacion', 'vulnerabilidad', 'salud'],
  status: 'available',
  context: 'Un centro de mayores requiere una decisión operativa urgente por la evolución del incendio.',
  question: '¿Cómo organizas la protección de personas vulnerables?',
  briefing:
    'La evacuación de personas mayores requiere más tiempo, transporte adaptado y coordinación sanitaria. El operativo debe decidir si traslada, confina temporalmente o escalona la respuesta.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: ['Escenario pendiente de desarrollo a partir del archivo s-22 centro de mayores.']
};
