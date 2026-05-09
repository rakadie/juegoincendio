import type { Scenario } from '../../../domain/types/scenario.js';

export const s021Animales: Scenario = {
  id: 's-021-animales',
  title: 'Animales en zona amenazada',
  category: 'operaciones',
  phase: 'crisis',
  block: 'evacuacion-y-proteccion-civil',
  difficulty: 'media',
  estimatedTime: '2 min',
  tags: ['operaciones', 'animales', 'ganaderia', 'evacuacion', 'zona-rural'],
  status: 'available',
  context: 'Vecinos y responsables de explotaciones piden ayuda para mover animales fuera de la zona amenazada.',
  question: '¿Cómo equilibras seguridad humana, bienestar animal y capacidad operativa?',
  briefing:
    'La presencia de animales aumenta la complejidad de la evacuación y puede hacer que algunas personas retrasen su salida. La respuesta debe evitar entradas inseguras y proteger también la economía rural.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: ['Escenario pendiente de desarrollo a partir del archivo s-21 animales.']
};
