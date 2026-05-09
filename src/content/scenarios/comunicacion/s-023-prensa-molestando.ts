import type { Scenario } from '../../../domain/types/scenario.js';

export const s023PrensaMolestando: Scenario = {
  id: 's-023-prensa-molestando',
  title: 'Presión de la prensa en zona de emergencia',
  category: 'comunicacion',
  phase: 'crisis',
  block: 'relacion-con-medios',
  difficulty: 'media',
  estimatedTime: '2 min',
  tags: ['comunicacion', 'prensa', 'medios', 'zona-emergencia'],
  status: 'available',
  context: 'Varios equipos de prensa se aproximan a una zona donde interfieren con el operativo.',
  question: '¿Cómo gestionas la cobertura informativa sin comprometer la seguridad?',
  briefing:
    'Los medios necesitan información, pero su presencia cerca del perímetro puede dificultar movimientos de emergencia, exponer a periodistas y generar imágenes sin contexto operativo.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: ['Escenario pendiente de desarrollo a partir del archivo s-23 prensa molestando.']
};
