import { OFFICIAL_PREVENTION_INSPECTIONS } from './official-prevention-inspections.js';
import { os011CorteCarreteraAcceso } from './scenarios/operaciones/os-011-corte-carretera-acceso.js';
import { os025CortafuegoEmergencia } from './scenarios/operaciones/os-025-cortafuego-emergencia.js';
import { os026DefensaOperativaNucleoViviendas } from './scenarios/operaciones/os-026-defensa-operativa-nucleo-viviendas.js';
import { os027FuegoEnBarranco } from './scenarios/operaciones/os-027-fuego-en-barranco.js';
import { os030FuegoDeCopas } from './scenarios/operaciones/os-030-fuego-de-copas.js';
import { VERTICAL_BETA_DECLARATIVE_CONTENT } from './vertical-beta-flow-content.js';

export const OFFICIAL_PLAYER_SCENARIOS = [
  os011CorteCarreteraAcceso,
  os025CortafuegoEmergencia,
  os026DefensaOperativaNucleoViviendas,
  os027FuegoEnBarranco,
  os030FuegoDeCopas
] as const;

export const OFFICIAL_PLAYER_CONTENT = {
  schemaVersion: 1,
  scope: 'beta-oficial',
  scenarios: OFFICIAL_PLAYER_SCENARIOS,
  inspections: OFFICIAL_PREVENTION_INSPECTIONS,
  nodes: VERTICAL_BETA_DECLARATIVE_CONTENT
} as const;
