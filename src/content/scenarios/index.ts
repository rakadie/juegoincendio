import type { Scenario } from '../../domain/types/scenario.js';

import { cs000Introduccion } from './comunicacion/cs-000-introduccion.js';
import { cs000bAvatarEmergencias } from './comunicacion/cs-000b-avatar-emergencias.js';
import { cs008CampanaSectorPrimario } from './comunicacion/cs-008-campana-sector-primario.js';
import { cs013SimulacroEscolar } from './comunicacion/cs-013-simulacro-escolar.js';
import { cs016RumorEvacuacionNoroeste } from './comunicacion/cs-016-rumor-evacuacion-noroeste.js';
import { cs017ProblemasComunicacion } from './comunicacion/cs-017-problemas-comunicacion.js';
import { cs018ColapsoLlamadas112 } from './comunicacion/cs-018-colapso-llamadas-112.js';
import { cs022RumorImagen } from './comunicacion/cs-022-rumor-imagen.js';
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
import { os011LineasDefensa } from './operaciones/os-011-lineas-defensa.js';
import { os012FalloComunicacionesRadio } from './operaciones/os-012-fallo-comunicaciones-radio.js';
import { os012RescateZonaPeligrosa } from './operaciones/os-012-rescate-zona-peligrosa.js';
import { os014FincaGanaderaAtrapada } from './operaciones/os-014-finca-ganadera-atrapada.js';
import { os015PosibleEvacuacion } from './operaciones/os-015-posible-evacuacion.js';
import { os018ApagonEnNucleo } from './operaciones/os-018-apagon-en-nucleo.js';
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
import { ps001LimpiezaPerimetral } from './prevencion/ps-001-limpieza-perimetral.js';
import { ps002PlantasFinca } from './prevencion/ps-002-plantas-finca.js';
import { ps002bAsesoramientoTerrenos } from './prevencion/ps-002b-asesoramiento-terrenos.js';
import { ps003MaquinariaRiesgo } from './prevencion/ps-003-maquinaria-riesgo.js';
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
import { pcs013CentroMayoresRiesgo } from './proteccion-civil/pcs-013-centro-mayores-riesgo.js';

export const NEW_GAME_SCENARIOS: Scenario[] = [
  cs000Introduccion,
  cs000bAvatarEmergencias,
  cs008CampanaSectorPrimario,
  cs013SimulacroEscolar,
  cs016RumorEvacuacionNoroeste,
  cs017ProblemasComunicacion,
  cs018ColapsoLlamadas112,
  cs022RumorImagen,
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
  os011LineasDefensa,
  os012FalloComunicacionesRadio,
  os012RescateZonaPeligrosa,
  os014FincaGanaderaAtrapada,
  os015PosibleEvacuacion,
  os018ApagonEnNucleo,
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
  ps000cContextoPrevencionOtono,
  ps000dQuemasPrescritasOtono,
  ps001LimpiezaPerimetral,
  ps002PlantasFinca,
  ps002bAsesoramientoTerrenos,
  ps003MaquinariaRiesgo,
  ps004QuemasAgricolas,
  ps005RecoleccionMonte,
  ps006HoguerasMonte,
  ps007EvacuacionCiudadania,
  ps014RedAguaRural,
  ps035LimpiezaAlrededorViviendas,
  ps036DefensaPasivaVivienda,
  ps037PlanFamiliarEmergencia,
  ps038EleccionVegetacionFinca,
  ps039UsoMaquinariaEpocaRiesgo,
  pcs013CentroMayoresRiesgo,
];
