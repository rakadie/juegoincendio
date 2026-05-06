import type { Scenario } from '../../domain/types/scenario.js';
import { s000Introduccion } from './comunicacion/s-000-introduccion.js';
import { s000bAvatarEmergencias } from './comunicacion/s-000b-avatar-emergencias.js';
import { s008CampanaSectorPrimario } from './comunicacion/s-008-campana-sector-primario.js';
import { s013SimulacroEscolar } from './comunicacion/s-013-simulacro-escolar.js';
import { rumorRedesEvacuacion } from './comunicacion/s-015-rumor-redes-evacuacion.js';
import { s008bRiesgoExtremoVerano } from './operaciones/s-008b-riesgo-extremo-verano.js';
import { s009PrimerEnvioMedios } from './operaciones/s-009-primer-envio-medios.js';
import { s009bEscaladoIncendio } from './operaciones/s-009b-escalado-incendio.js';
import { s009cContinuidadIncendio } from './operaciones/s-009c-continuidad-incendio.js';
import { s010CambioVientoEvacuacion } from './operaciones/s-010-cambio-viento-evacuacion.js';
import { s010bDefensaNucleoViviendas } from './operaciones/s-010b-defensa-nucleo-viviendas.js';
import { s010b2FocoSecundarioPorRadio } from './operaciones/s-010b2-foco-secundario-por-radio.js';
import { s010cAtaqueZonaSecundaria } from './operaciones/s-010c-ataque-zona-secundaria.js';
import { s010c2RefuerzoUmeViviendas } from './operaciones/s-010c2-refuerzo-ume-viviendas.js';
import { s010dZonaBarranco } from './operaciones/s-010d-zona-barranco.js';
import { corteCarreteraAcceso } from './operaciones/s-011-corte-carretera-acceso.js';
import { s011LineasDefensa } from './operaciones/s-011-lineas-defensa.js';
import { falloComunicacionesRadio } from './operaciones/s-012-fallo-comunicaciones-radio.js';
import { s012RescateZonaPeligrosa } from './operaciones/s-012-rescate-zona-peligrosa.js';
import { fincaGanaderaAtrapada } from './operaciones/s-014-finca-ganadera-atrapada.js';
import { s000cContextoPrevencionOtono } from './prevencion/s-000c-contexto-prevencion-otono.js';
import { s000dQuemasPrescritasOtono } from './prevencion/s-000d-quemas-prescritas-otono.js';
import { s001LimpiezaPerimetral } from './prevencion/s-001-limpieza-perimetral.js';
import { s002PlantasFinca } from './prevencion/s-002-plantas-finca.js';
import { s002bAsesoramientoTerrenos } from './prevencion/s-002b-asesoramiento-terrenos.js';
import { s003MaquinariaRiesgo } from './prevencion/s-003-maquinaria-riesgo.js';
import { s004QuemasAgricolas } from './prevencion/s-004-quemas-agricolas.js';
import { s005RecoleccionMonte } from './prevencion/s-005-recoleccion-monte.js';
import { s006HoguerasMonte } from './prevencion/s-006-hogueras-monte.js';
import { s007EvacuacionCiudadania } from './prevencion/s-007-evacuacion-ciudadania.js';
import { s014RedAguaRural } from './prevencion/s-014-red-agua-rural.js';
import { centroMayoresRiesgo } from './proteccion-civil/s-013-centro-mayores-riesgo.js';

export {
  s000Introduccion,
  s000bAvatarEmergencias,
  s008CampanaSectorPrimario,
  s013SimulacroEscolar,
  rumorRedesEvacuacion,
  s008bRiesgoExtremoVerano,
  s009PrimerEnvioMedios,
  s009bEscaladoIncendio,
  s009cContinuidadIncendio,
  s010CambioVientoEvacuacion,
  s010bDefensaNucleoViviendas,
  s010b2FocoSecundarioPorRadio,
  s010cAtaqueZonaSecundaria,
  s010c2RefuerzoUmeViviendas,
  s010dZonaBarranco,
  corteCarreteraAcceso,
  s011LineasDefensa,
  falloComunicacionesRadio,
  s012RescateZonaPeligrosa,
  fincaGanaderaAtrapada,
  s000cContextoPrevencionOtono,
  s000dQuemasPrescritasOtono,
  s001LimpiezaPerimetral,
  s002PlantasFinca,
  s002bAsesoramientoTerrenos,
  s003MaquinariaRiesgo,
  s004QuemasAgricolas,
  s005RecoleccionMonte,
  s006HoguerasMonte,
  s007EvacuacionCiudadania,
  s014RedAguaRural,
  centroMayoresRiesgo
};

export const NEW_GAME_SCENARIOS: Scenario[] = [
  s000Introduccion,
  s000bAvatarEmergencias,
  s008CampanaSectorPrimario,
  s013SimulacroEscolar,
  rumorRedesEvacuacion,
  s008bRiesgoExtremoVerano,
  s009PrimerEnvioMedios,
  s009bEscaladoIncendio,
  s009cContinuidadIncendio,
  s010CambioVientoEvacuacion,
  s010bDefensaNucleoViviendas,
  s010b2FocoSecundarioPorRadio,
  s010cAtaqueZonaSecundaria,
  s010c2RefuerzoUmeViviendas,
  s010dZonaBarranco,
  corteCarreteraAcceso,
  s011LineasDefensa,
  falloComunicacionesRadio,
  s012RescateZonaPeligrosa,
  fincaGanaderaAtrapada,
  s000cContextoPrevencionOtono,
  s000dQuemasPrescritasOtono,
  s001LimpiezaPerimetral,
  s002PlantasFinca,
  s002bAsesoramientoTerrenos,
  s003MaquinariaRiesgo,
  s004QuemasAgricolas,
  s005RecoleccionMonte,
  s006HoguerasMonte,
  s007EvacuacionCiudadania,
  s014RedAguaRural,
  centroMayoresRiesgo
];
