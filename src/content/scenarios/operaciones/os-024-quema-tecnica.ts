import type { Scenario } from '../../../domain/types/scenario.js';

export const os024QuemaTecnica: Scenario = {
  id: 's-024-quema-tecnica',
  title: 'Quema técnica como maniobra de control',
  category: 'operaciones',
  phase: 'crisis',
  block: 'estrategia-de-contencion',
  difficulty: 'critica',
  estimatedTime: '3 min',
  tags: ['operaciones', 'quema-tecnica', 'contrafuego', 'contencion', 'seguridad'],
  status: 'available',
  context: 'El equipo técnico plantea una quema controlada para reducir combustible antes de la llegada del frente.',
  question: '¿Autorizas la maniobra y bajo qué condiciones?',
  briefing:
    'La quema técnica puede ayudar a contener el incendio, pero exige ventana meteorológica, personal experto, comunicación clara y control estricto para evitar escapes o alarma social.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: ['Escenario pendiente de desarrollo a partir del archivo s-24 quema tecnica.']
};
