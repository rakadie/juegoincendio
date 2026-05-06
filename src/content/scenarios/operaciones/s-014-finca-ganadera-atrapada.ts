import type { Scenario } from '../../../domain/types/scenario.js';

export const fincaGanaderaAtrapada: Scenario = {
  id: 's-014-finca-ganadera-atrapada',
  title: 'Finca ganadera sin salida segura',
  category: 'operaciones',
  phase: 'crisis',
  block: 'evacuacion-y-proteccion-civil',
  difficulty: 'media',
  estimatedTime: '2 min',
  tags: [
    'ganaderia',
    'animales',
    'evacuacion',
    'zona-rural',
    'proteccion-civil'
  ],
  status: 'available',
  context:
    'Una explotación ganadera queda cerca del perímetro y sus responsables piden ayuda para mover animales.',
  question: '¿Cómo equilibras la protección de personas, animales y recursos?',
  briefing:
    'El propietario quiere entrar con vehículos para sacar ganado, pero la pista rural es estrecha y puede interferir con el paso de brigadas. La presión emocional es alta y el fuego cambia rápido.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: []
};
