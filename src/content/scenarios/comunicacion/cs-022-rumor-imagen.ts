import type { Scenario } from '../../../domain/types/scenario.js';

export const cs022RumorImagen: Scenario = {
  id: 's-022-rumor-imagen',
  title: 'Rumor por imagen fuera de contexto',
  category: 'comunicacion',
  phase: 'crisis',
  block: 'informacion-publica-y-rumores',
  difficulty: 'media',
  estimatedTime: '2 min',
  tags: ['comunicacion', 'rumor', 'imagen', 'redes-sociales'],
  status: 'available',
  context: 'Una imagen compartida en redes se interpreta como prueba de un riesgo inmediato.',
  question: '¿Cómo respondes a una imagen viral que puede estar fuera de contexto?',
  briefing:
    'La imagen circula con rapidez y está generando alarma. Antes de responder, el operativo debe verificar su origen, aclarar el contexto y evitar que la desinformación condicione decisiones de emergencia.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: ['Escenario pendiente de desarrollo a partir del archivo s-22 rumor imagen.']
};
