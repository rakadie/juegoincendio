import type { Scenario } from '../../../domain/types/scenario.js';

export const falloComunicacionesRadio: Scenario = {
  id: 's-012-fallo-comunicaciones-radio',
  title: 'Fallo parcial de comunicaciones por radio',
  category: 'operaciones',
  phase: 'crisis',
  block: 'coordinacion-emergencias',
  difficulty: 'alta',
  estimatedTime: '2 min',
  tags: ['comunicaciones', 'radio', 'coordinacion', 'emergencias', 'mando'],
  status: 'available',
  context:
    'Varias unidades dejan de recibir instrucciones con claridad por interferencias y saturación de canales.',
  question: '¿Cómo mantienes la coordinación del operativo?',
  briefing:
    'El incendio avanza en dos frentes y los equipos en terreno informan con retraso. La sala de coordinación necesita priorizar mensajes, evitar duplicidades y sostener una imagen realista de la situación.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: []
};
