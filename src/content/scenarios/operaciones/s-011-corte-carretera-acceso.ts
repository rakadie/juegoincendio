import type { Scenario } from '../../../domain/types/scenario.js';

export const corteCarreteraAcceso: Scenario = {
  id: 's-011-corte-carretera-acceso',
  title: 'Corte de carretera principal de acceso',
  category: 'operaciones',
  phase: 'crisis',
  block: 'movilidad-y-logistica',
  difficulty: 'media',
  estimatedTime: '2 min',
  tags: ['carretera', 'trafico', 'evacuacion', 'logistica', 'accesos'],
  status: 'available',
  context:
    'El humo y la caída de pavesas obligan a cortar la carretera principal hacia el área afectada.',
  question: '¿Cómo reorganizas los accesos y la evacuación?',
  briefing:
    'La vía más rápida queda inutilizada justo cuando comienzan a salir vecinos de varios barrios. Hay rutas secundarias, pero son estrechas y comparten paso con los vehículos de emergencia.',
  requirements: null,
  options: [],
  unlocks: [],
  sourceNotes: []
};
