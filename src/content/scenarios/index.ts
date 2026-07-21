import type { Scenario } from '../../domain/types/scenario.js';
import { applyScenarioI18n } from '../i18n/scenario-i18n.js';
import { scenarioI18nEs } from '../i18n/es/scenarios.js';

import { cs000Introduccion } from './comunicacion/cs-000-introduccion.js';
import { cs000bAvatarEmergencias } from './comunicacion/cs-000b-avatar-emergencias.js';
import { cs008CampanaSectorPrimario } from './comunicacion/cs-008-campana-sector-primario.js';
import { cs013SimulacroEscolar } from './comunicacion/cs-013-simulacro-escolar.js';
import { cs016RumorEvacuacionNoroeste } from './comunicacion/cs-016-rumor-evacuacion-noroeste.js';
import { cs018ColapsoLlamadas112 } from './comunicacion/cs-018-colapso-llamadas-112.js';
import { cs023ImagenAntiguaViral } from './comunicacion/cs-023-imagen-antigua-viral.js';
import { cs024PresionMediaticaZonaCaliente } from './comunicacion/cs-024-presion-mediatica-zona-caliente.js';
import { os008bRiesgoExtremoVerano } from './operaciones/os-008b-riesgo-extremo-verano.js';
import { os009PrimerEnvioMedios } from './operaciones/os-009-primer-envio-medios.js';
import { os009bEscaladoIncendio } from './operaciones/os-009b-escalado-incendio.js';
import { os009cContinuidadIncendio } from './operaciones/os-009c-continuidad-incendio.js';
import { os010CambioVientoEvacuacion } from './operaciones/os-010-cambio-viento-evacuacion.js';
import { os010bDefensaNucleoViviendas } from './operaciones/os-010b-defensa-nucleo-viviendas.js';
import { os010b2FocoSecundarioPorRadio } from './operaciones/os-010b2-foco-secundario-por-radio.js';
import { os010cAtaqueZonaSecundaria } from './operaciones/os-010c-ataque-zona-secundaria.js';
import { os010c2RefuerzoUmeViviendas } from './operaciones/os-010c2-refuerzo-ume-viviendas.js';
import { os010dZonaBarranco } from './operaciones/os-010d-zona-barranco.js';
import { os011CorteCarreteraAcceso } from './operaciones/os-011-corte-carretera-acceso.js';
import { os012FalloComunicacionesRadio } from './operaciones/os-012-fallo-comunicaciones-radio.js';
import { os012RescateZonaPeligrosa } from './operaciones/os-012-rescate-zona-peligrosa.js';
import { os014FincaGanaderaAtrapada } from './operaciones/os-014-finca-ganadera-atrapada.js';
import { os019ApagonPlenaEmergencia } from './operaciones/os-019-apagon-plena-emergencia.js';
import { os020FuegoAmenazaSubestacionElectrica } from './operaciones/os-020-fuego-amenaza-subestacion-electrica.js';
import { os021HumoVientoHelicopterosTierra } from './operaciones/os-021-humo-viento-helicopteros-tierra.js';
import { os022EvacuacionConMascotas } from './operaciones/os-022-evacuacion-con-mascotas.js';
import { os023CentroMayoresRiesgo } from './operaciones/os-023-centro-mayores-riesgo.js';
import { os024QuemaTecnica } from './operaciones/os-024-quema-tecnica.js';
import { os025CortafuegoEmergencia } from './operaciones/os-025-cortafuego-emergencia.js';
import { os026DefensaOperativaNucleoViviendas } from './operaciones/os-026-defensa-operativa-nucleo-viviendas.js';
import { os027FuegoEnBarranco } from './operaciones/os-027-fuego-en-barranco.js';
import { os028DefensaNocturnaPerimetro } from './operaciones/os-028-defensa-nocturna-perimetro.js';
import { os029RelevoCuadrillasAgotadas } from './operaciones/os-029-relevo-cuadrillas-agotadas.js';
import { os030FuegoDeCopas } from './operaciones/os-030-fuego-de-copas.js';
import { os031ConfinamientoExtremoFuegoCopas } from './operaciones/os-031-confinamiento-extremo-fuego-copas.js';
import { os032CasasDiseminadasMonte } from './operaciones/os-032-casas-diseminadas-monte.js';
import { os033SenderistasDesorientadosHumo } from './operaciones/os-033-senderistas-desorientados-humo.js';
import { os034VecinosSinMediosParaSalir } from './operaciones/os-034-vecinos-sin-medios-para-salir.js';
import { ps000cContextoPrevencionOtono } from './prevencion/ps-000c-contexto-prevencion-otono.js';
import { ps000dQuemasPrescritasOtono } from './prevencion/ps-000d-quemas-prescritas-otono.js';
import { ps002bAsesoramientoTerrenos } from './prevencion/ps-002b-asesoramiento-terrenos.js';
import { ps004QuemasAgricolas } from './prevencion/ps-004-quemas-agricolas.js';
import { ps005RecoleccionMonte } from './prevencion/ps-005-recoleccion-monte.js';
import { ps006HoguerasMonte } from './prevencion/ps-006-hogueras-monte.js';
import { ps007EvacuacionCiudadania } from './prevencion/ps-007-evacuacion-ciudadania.js';
import { ps014RedAguaRural } from './prevencion/ps-014-red-agua-rural.js';
import { ps035LimpiezaAlrededorViviendas } from './prevencion/ps-035-limpieza-alrededor-viviendas.js';
import { ps036DefensaPasivaVivienda } from './prevencion/ps-036-defensa-pasiva-vivienda.js';
import { ps037PlanFamiliarEmergencia } from './prevencion/ps-037-plan-familiar-emergencia.js';
import { ps038EleccionVegetacionFinca } from './prevencion/ps-038-eleccion-vegetacion-finca.js';
import { ps039UsoMaquinariaEpocaRiesgo } from './prevencion/ps-039-uso-maquinaria-epoca-riesgo.js';

export const BASE_GAME_SCENARIOS: Scenario[] = [
  cs000Introduccion,
  cs000bAvatarEmergencias,
  ps000cContextoPrevencionOtono,
  ps000dQuemasPrescritasOtono,
  cs008CampanaSectorPrimario,
  ps002bAsesoramientoTerrenos,
  cs013SimulacroEscolar,
  ps004QuemasAgricolas,
  ps005RecoleccionMonte,
  ps039UsoMaquinariaEpocaRiesgo,
  ps006HoguerasMonte,
  ps007EvacuacionCiudadania,
  ps014RedAguaRural,
  ps035LimpiezaAlrededorViviendas,
  ps038EleccionVegetacionFinca,
  ps036DefensaPasivaVivienda,
  ps037PlanFamiliarEmergencia,
  cs016RumorEvacuacionNoroeste,
  cs018ColapsoLlamadas112,
  cs023ImagenAntiguaViral,
  cs024PresionMediaticaZonaCaliente,
  os008bRiesgoExtremoVerano,
  os009PrimerEnvioMedios,
  os009bEscaladoIncendio,
  os009cContinuidadIncendio,
  os010CambioVientoEvacuacion,
  os010bDefensaNucleoViviendas,
  os010b2FocoSecundarioPorRadio,
  os010cAtaqueZonaSecundaria,
  os010c2RefuerzoUmeViviendas,
  os010dZonaBarranco,
  os011CorteCarreteraAcceso,
  os012FalloComunicacionesRadio,
  os012RescateZonaPeligrosa,
  os014FincaGanaderaAtrapada,
  os019ApagonPlenaEmergencia,
  os020FuegoAmenazaSubestacionElectrica,
  os021HumoVientoHelicopterosTierra,
  os022EvacuacionConMascotas,
  os023CentroMayoresRiesgo,
  os024QuemaTecnica,
  os025CortafuegoEmergencia,
  os026DefensaOperativaNucleoViviendas,
  os027FuegoEnBarranco,
  os028DefensaNocturnaPerimetro,
  os029RelevoCuadrillasAgotadas,
  os030FuegoDeCopas,
  os031ConfinamientoExtremoFuegoCopas,
  os032CasasDiseminadasMonte,
  os033SenderistasDesorientadosHumo,
  os034VecinosSinMediosParaSalir,
];

export const NEW_GAME_SCENARIOS: Scenario[] = applyScenarioI18n(BASE_GAME_SCENARIOS, scenarioI18nEs);
