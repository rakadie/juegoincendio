import type { Scenario } from '../domain/types/scenario.js';
import { os011CorteCarreteraAcceso } from './scenarios/operaciones/os-011-corte-carretera-acceso.js';
import { os025CortafuegoEmergencia } from './scenarios/operaciones/os-025-cortafuego-emergencia.js';
import { os026DefensaOperativaNucleoViviendas } from './scenarios/operaciones/os-026-defensa-operativa-nucleo-viviendas.js';
import { os027FuegoEnBarranco } from './scenarios/operaciones/os-027-fuego-en-barranco.js';
import { os030FuegoDeCopas } from './scenarios/operaciones/os-030-fuego-de-copas.js';

/**
 * Historical source objects reused by the five canonical operational scenes.
 * This module imports only the official subset; it must never depend on the
 * editorial scenario index.
 */
export const OFFICIAL_SOURCE_SCENARIOS = [
  os011CorteCarreteraAcceso,
  os025CortafuegoEmergencia,
  os026DefensaOperativaNucleoViviendas,
  os027FuegoEnBarranco,
  os030FuegoDeCopas
] as const satisfies readonly Scenario[];
