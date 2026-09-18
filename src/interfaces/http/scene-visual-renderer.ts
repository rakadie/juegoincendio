import type {
  PresentedSceneVisualModel,
  PresentedVisualElement,
  VisualTemplateId
} from '../../application/vertical-beta/vertical-beta-visual-presenter.js';
import { renderSceneArtDefs, renderSceneSmoke } from './scene-art-kit.js';
import {
  CRISIS_ROAD_PATH,
  renderCrisisFlame,
  renderCrisisRavineBase,
  renderCrisisRavineDefs
} from './crisis-ravine-art.js';
import {
  HOUSING_ACCESS_PATH,
  renderHousingHome,
  renderHousingPin,
  renderHousingPlanBase,
  renderHousingPlanDefs
} from './housing-plan-art.js';
import {
  renderTerritoryBranchPile,
  renderTerritoryMapBase,
  renderTerritoryMapDefs,
  renderTerritoryMapPin,
  renderTerritoryRoadDebris,
  TERRITORY_EVALUATION_PATH,
  TERRITORY_FUEL_PATH,
  TERRITORY_GRAZING_PATH,
  TERRITORY_ROAD_PATH
} from './territory-map-art.js';

const REQUIRED_ELEMENT_IDS: Readonly<Partial<Record<VisualTemplateId, readonly string[]>>> = {
  territory: [
    'territory-residues',
    'territory-continuity',
    'territory-road',
    'territory-grazing',
    'territory-professional-line'
  ],
  housing: [
    'housing-vertical-fuel',
    'housing-canopy',
    'housing-local-access',
    'housing-home'
  ],
  crisis: [
    'crisis-road',
    'crisis-retreat',
    'crisis-position',
    'crisis-pressure',
    'crisis-attack-window',
    'crisis-crown',
    'crisis-capacity'
  ]
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function assertCompleteVisualModel(model: PresentedSceneVisualModel): void {
  const expected = REQUIRED_ELEMENT_IDS[model.templateId];
  if (expected === undefined) return;
  const actual = new Set(model.elements.map(({ id }) => id));
  const missing = expected.filter((id) => !actual.has(id));
  if (missing.length > 0) {
    throw new Error(
      `Incomplete ${model.templateId} visual model for ${model.sceneId}: missing ${missing.join(', ')}.`
    );
  }
}

function byId(model: PresentedSceneVisualModel, id: string): PresentedVisualElement | undefined {
  return model.elements.find((element) => element.id === id);
}

function stateClass(element: PresentedVisualElement | undefined): string {
  return element === undefined ? 'state-neutral' : `state-${element.state}`;
}

function visualCardId(element: PresentedVisualElement): string {
  return `visual-card-${element.id}`;
}

function hotspotAttributes(element: PresentedVisualElement | undefined): string {
  if (element === undefined) return '';
  return ` data-visual-element-id="${escapeHtml(element.id)}" tabindex="0" role="button" aria-label="${escapeHtml(
    `${element.label}: ${element.stateLabel}. ${element.explanation}`
  )}" aria-controls="${escapeHtml(
    visualCardId(element)
  )}" aria-expanded="false"${
    element.actionId === undefined
      ? ''
      : ` data-focus-action-id="${escapeHtml(element.actionId)}"`
  }`;
}

function visualCards(model: PresentedSceneVisualModel): string {
  if (model.elements.length === 0) return '';
  return `<div class="visual-card-layer" aria-label="Detalles interactivos de la escena">${model.elements
    .map(
      (element) =>
        `<article class="visual-hover-card ${stateClass(element)}${
          element.selected === true ? ' selected' : ''
        }" id="${escapeHtml(visualCardId(element))}" data-visual-card-id="${escapeHtml(
          element.id
        )}"${
          element.actionId === undefined
            ? ''
            : ` data-visual-action-card-id="${escapeHtml(element.actionId)}"`
        } hidden><div class="visual-card-state"><span class="visual-status-symbol" aria-hidden="true"></span><span><strong>${escapeHtml(
          element.label
        )}</strong><small>${escapeHtml(element.stateLabel)}${
          element.selected === true ? ' · seleccionada' : ''
        }</small></span></div><p class="visual-explanation">${escapeHtml(
          element.explanation
        )}</p>${
          element.actionId === undefined
            ? ''
            : `<div class="visual-card-action"><strong data-visual-action-label>${escapeHtml(
                element.label
              )}</strong><p data-visual-action-description></p><small data-visual-action-reason hidden></small><button class="secondary action-button" data-action-id="${escapeHtml(
                element.actionId
              )}" type="button">Elegir</button></div>`
        }</article>`
    )
    .join('')}</div>`;
}

function territorySvg(model: PresentedSceneVisualModel): string {
  const residues = byId(model, 'territory-residues');
  const continuity = byId(model, 'territory-continuity');
  const road = byId(model, 'territory-road');
  const grazing = byId(model, 'territory-grazing');
  const line = byId(model, 'territory-professional-line');

  return `<svg class="territory-svg territory-map" viewBox="0 0 900 500" role="group" aria-label="${escapeHtml(
    model.ariaLabel
  )}" data-visual-base="territory-photo-v3">
    ${renderSceneArtDefs()}
    ${renderTerritoryMapDefs()}
    ${renderTerritoryMapBase()}
    <g id="territory-road" class="visual-hotspot ${stateClass(road)}"${hotspotAttributes(road)}>
      <g aria-hidden="true">
        <path class="map-road-context" d="${TERRITORY_ROAD_PATH}" />
        <path class="map-road-risk" d="${TERRITORY_ROAD_PATH}" />
        <path class="visual-road" d="${TERRITORY_ROAD_PATH}" />
        <g class="map-road-obstruction">${renderTerritoryRoadDebris(292, 300, -12)}${renderTerritoryRoadDebris(530, 242, -17)}${renderTerritoryRoadDebris(711, 187, -24)}</g>
      </g>
      ${renderTerritoryMapPin(3, 462, 292, 'Camino rural', 137, road?.selected === true)}
    </g>
    <g id="territory-continuity" class="visual-hotspot ${stateClass(
      continuity
    )}"${hotspotAttributes(continuity)}>
      <g aria-hidden="true">
        <path class="visual-vegetation-band" d="${TERRITORY_FUEL_PATH}" />
        <g class="map-fuel-gap">
          <ellipse class="map-fuel-gap-zone" cx="225" cy="106" rx="31" ry="22" />
          <path class="map-fuel-gap-mark" d="M205 106 h40 M215 96 l-10 10 10 10 M235 96 l10 10 -10 10" />
          <ellipse class="map-fuel-gap-zone" cx="376" cy="103" rx="30" ry="21" />
          <path class="map-fuel-gap-mark" d="M357 103 h38 M366 93 l-9 10 9 10 M386 93 l9 10 -9 10" />
        </g>
      </g>
      ${renderTerritoryMapPin(2, 316, 86, 'Continuidad vegetal', 183, continuity?.selected === true)}
    </g>
    <g id="territory-residues" class="visual-hotspot ${stateClass(residues)}"${hotspotAttributes(
      residues
    )}>
      <g aria-hidden="true">
        <ellipse class="map-treated-ground" cx="209" cy="211" rx="43" ry="27" />
        <path class="map-treated-rake" d="M182 207 q27 -12 54 0 M183 216 q26 -11 52 0" />
        ${renderTerritoryBranchPile(209, 211, .9)}
      </g>
      ${renderTerritoryMapPin(1, 205, 171, 'Restos de poda', 151, residues?.selected === true)}
    </g>
    <g id="territory-grazing" class="visual-hotspot ${stateClass(grazing)}"${hotspotAttributes(
      grazing
    )}>
      <path class="visual-grazing" d="${TERRITORY_GRAZING_PATH}" aria-hidden="true" />
      <g class="map-grazing-flock" aria-hidden="true">${[[690, 346], [774, 318], [815, 404]].map(([x, y]) => `<g transform="translate(${x} ${y}) rotate(-12)" filter="url(#territory-overlay-shadow)"><ellipse cx="2" cy="3" rx="10" ry="4" fill="#182119" opacity=".25" /><ellipse rx="8" ry="5" fill="#ede7d2" stroke="#6f6756" stroke-width="1.2" /><circle cx="8" cy="-2" r="2.8" fill="#665c4e" /><path d="M-4 4 v5 m8 -5 v5 M9 -4 l2 -4" stroke="#665c4e" stroke-width="1.3" /></g>`).join('')}</g>
      ${renderTerritoryMapPin(4, 746, 382, 'Franja de pastoreo', 174, grazing?.selected === true, 'left')}
    </g>
    <g id="territory-professional-line" class="visual-hotspot ${stateClass(line)}"${hotspotAttributes(
      line
    )}>
      <g aria-hidden="true"><path class="visual-professional-line" d="${TERRITORY_EVALUATION_PATH}" /><circle class="map-survey-point" cx="650" cy="206" r="5" /><circle class="map-survey-point" cx="826" cy="142" r="5" /></g>
      ${renderTerritoryMapPin(5, 748, 157, 'Evaluación técnica', 178, line?.selected === true, 'left')}
    </g>
  </svg>`;
}

function territoryMapLegend(model: PresentedSceneVisualModel): string {
  return `<div class="territory-map-key" role="group" aria-label="Puntos del mapa">${model.elements.map((element, index) =>
    `<button class="territory-map-key-item ${stateClass(element)}${element.selected === true ? ' selected' : ''}" type="button"${hotspotAttributes(element)}><span class="territory-key-number" aria-hidden="true">${index + 1}</span><span class="territory-key-copy"><strong>${escapeHtml(element.label)}</strong><small><span class="territory-key-state-dot" aria-hidden="true"></span>${escapeHtml(element.stateLabel)}</small></span></button>`
  ).join('')}</div>`;
}

function housingSvg(model: PresentedSceneVisualModel): string {
  const vertical = byId(model, 'housing-vertical-fuel');
  const canopy = byId(model, 'housing-canopy');
  const access = byId(model, 'housing-local-access');
  const house = byId(model, 'housing-home');

  return `<svg class="territory-svg housing-plan" viewBox="0 0 900 500" role="group" aria-label="${escapeHtml(
    model.ariaLabel
  )}" data-visual-base="housing-photo-v3">
    ${renderSceneArtDefs()}
    ${renderHousingPlanDefs()}
    ${renderHousingPlanBase()}
    <g id="housing-local-access" class="visual-hotspot ${stateClass(access)}"${hotspotAttributes(
      access
    )}>
      <g aria-hidden="true">
        <path class="housing-clear-route" d="${HOUSING_ACCESS_PATH}" />
        <path class="housing-access-risk" d="${HOUSING_ACCESS_PATH}" />
        <path class="housing-access-centre" d="${HOUSING_ACCESS_PATH}" />
        <path class="housing-clear-route-line" d="${HOUSING_ACCESS_PATH}" />
        <g class="housing-access-obstructions">
          <path d="M848 444 l25 -18 m-22 25 l28 -20 M814 385 l21 -16 m-18 22 l24 -18 M786 323 l17 -13 m-14 19 l21 -15" />
          <circle cx="850" cy="440" r="5" fill="#8c572d" /><circle cx="815" cy="383" r="5" fill="#8c572d" /><circle cx="787" cy="321" r="5" fill="#8c572d" />
        </g>
      </g>
      ${renderHousingPin(3, 718, 443, 'Acceso local', 116, access?.selected === true)}
    </g>
    <g id="housing-canopy" class="visual-hotspot ${stateClass(canopy)}"${hotspotAttributes(
      canopy
    )}>
      <g class="housing-canopy-connected" aria-hidden="true">
        <path class="housing-canopy-link" d="M93 139 Q209 127 329 145" />
        <path class="housing-canopy-link-detail" d="M93 139 Q209 127 329 145" />
        <ellipse class="housing-canopy-crown" cx="93" cy="135" rx="70" ry="75" />
        <ellipse class="housing-canopy-crown" cx="209" cy="136" rx="76" ry="80" />
        <ellipse class="housing-canopy-crown" cx="329" cy="145" rx="72" ry="73" />
      </g>
      <g class="housing-canopy-separated" aria-hidden="true">
        <ellipse class="housing-canopy-crown" cx="88" cy="136" rx="64" ry="70" />
        <ellipse class="housing-canopy-crown" cx="213" cy="136" rx="65" ry="70" />
        <ellipse class="housing-canopy-crown" cx="340" cy="146" rx="62" ry="65" />
        <path class="housing-canopy-gap" d="M145 72 Q162 126 150 204 Q169 213 183 195 Q178 125 167 74Z" />
        <path class="housing-canopy-gap" d="M276 79 Q293 134 281 207 Q300 214 313 198 Q309 133 299 81Z" />
        <path class="housing-gap-mark" d="M154 127 l9 9 16 -20 M286 136 l9 9 16 -20" />
      </g>
      ${renderHousingPin(2, 195, 77, 'Continuidad de copas', 177, canopy?.selected === true)}
    </g>
    <g id="housing-vertical-fuel" class="visual-hotspot ${stateClass(
      vertical
    )}"${hotspotAttributes(vertical)}>
      <ellipse class="housing-clearance" cx="210" cy="350" rx="125" ry="104" aria-hidden="true" />
      <ellipse class="housing-risk-zone" cx="210" cy="350" rx="125" ry="104" aria-hidden="true" />
      <g class="housing-dry-fuel" aria-hidden="true">
        <path class="housing-risk-detail" d="M111 383 l14 -25 m-2 29 l23 -20 m78 67 l8 -28 m2 28 l18 -24 m-61 21 l10 -29 m-6 31 l23 -19 m46 -6 l13 -27 m-5 31 l20 -19" />
      </g>
      <g class="housing-cut-marks" aria-hidden="true">
        <path d="M121 387 h24 m42 44 h24 m43 -15 h24 m22 -64 h24" />
        <path d="M130 377 v10 m66 34 v10 m67 -25 v10 m46 -74 v10" />
      </g>
      <path class="housing-low-branches housing-risk-detail" d="M203 329 l-63 -54 m63 54 l-57 -7 m57 7 l57 -58 m-57 58 l69 2" aria-hidden="true" />
      ${renderHousingPin(1, 119, 288, 'Vegetación baja y ramas', 190, vertical?.selected === true)}
    </g>
    <g id="housing-home" class="visual-hotspot ${stateClass(house)}"${hotspotAttributes(house)}>
      ${renderHousingHome()}
      ${renderHousingPin('i', 609, 241, 'Vivienda condicionada', 177, false)}
    </g>
  </svg>`;
}

function housingMapLegend(model: PresentedSceneVisualModel): string {
  return `<div class="housing-map-key" role="group" aria-label="Puntos del entorno de la vivienda">${model.elements.map((element, index) =>
    `<button class="housing-map-key-item ${stateClass(element)}" type="button"${hotspotAttributes(element)}><span class="housing-key-number" aria-hidden="true">${element.actionId === undefined ? 'i' : index + 1}</span><span><strong>${escapeHtml(element.label)}</strong><small>${escapeHtml(element.stateLabel)}</small></span></button>`
  ).join('')}</div>`;
}

function crisisSvg(model: PresentedSceneVisualModel): string {
  const road = byId(model, 'crisis-road');
  const retreat = byId(model, 'crisis-retreat');
  const position = byId(model, 'crisis-position');
  const pressure = byId(model, 'crisis-pressure');
  const attack = byId(model, 'crisis-attack-window');
  const crown = byId(model, 'crisis-crown');
  const capacity = byId(model, 'crisis-capacity');
  const professionalLine = byId(model, 'crisis-professional-line');
  const houseAccess = byId(model, 'crisis-house-access');

  return `<svg class="territory-svg crisis-svg crisis-photo" viewBox="0 0 900 500" role="img" aria-label="${escapeHtml(
    model.ariaLabel
  )}" data-visual-base="shared-ravine-photo-v2">
    ${renderSceneArtDefs()}
    ${renderCrisisRavineDefs()}
    ${renderCrisisRavineBase()}
    ${renderSceneSmoke(570, 265, 0.68)}
    <g id="crisis-road" class="visual-hotspot ${stateClass(road)}"${hotspotAttributes(road)}><path class="visual-road" d="${CRISIS_ROAD_PATH}" /></g>
    <g id="crisis-retreat" class="visual-hotspot ${stateClass(retreat)}"${hotspotAttributes(retreat)}><path class="visual-retreat" d="M452 289 C338 317 225 348 115 375" /><path class="visual-arrow" d="M115 375 l33 -25 m-33 25 l39 14" /></g>
    <g id="crisis-position" class="visual-hotspot ${stateClass(position)}"${hotspotAttributes(position)}><circle class="visual-position" cx="452" cy="288" r="28" /><path d="M430 288 H474 M452 266 V310" /></g>
    <g id="crisis-pressure" class="visual-hotspot ${stateClass(pressure)}"${hotspotAttributes(pressure)}>${renderCrisisFlame()}</g>
    <g id="crisis-attack-window" class="visual-hotspot ${stateClass(attack)}"${hotspotAttributes(attack)}><path class="visual-attack-window" d="M406 244 Q472 216 543 246" /></g>
    <g id="crisis-crown" class="visual-hotspot ${stateClass(crown)}"${hotspotAttributes(crown)}><circle class="visual-canopy" cx="642" cy="112" r="45" /><circle class="visual-canopy" cx="718" cy="106" r="45" /><circle class="visual-canopy" cx="783" cy="129" r="43" /></g>
    <g id="crisis-capacity" class="visual-hotspot visual-capacity ${stateClass(capacity)}"${hotspotAttributes(capacity)}><circle class="crisis-capacity-hit-target" cx="72" cy="91" r="62" /><circle cx="72" cy="91" r="35" /><text x="72" y="97" text-anchor="middle">CAP</text></g>
    ${
      professionalLine === undefined
        ? ''
        : `<g id="crisis-professional-line" class="visual-hotspot ${stateClass(professionalLine)}"${hotspotAttributes(
            professionalLine
          )}><path class="visual-professional-line" d="M330 271 Q430 213 532 241" /><circle class="visual-line-marker" cx="432" cy="229" r="12" /></g>`
    }
    ${
      houseAccess === undefined
        ? ''
        : `<g id="crisis-house-access" class="visual-hotspot ${stateClass(houseAccess)}"${hotspotAttributes(
            houseAccess
          )}><path class="visual-house" d="M735 297 l45 -34 48 34 v73 h-93 z" /><path class="visual-road local" d="M585 352 Q702 324 842 349" /></g>`
    }
    <g class="visual-label-group" aria-hidden="true"><text x="388" y="475">mismo barranco · estado heredado distinto</text></g>
  </svg>`;
}

function dimensionSummary(model: PresentedSceneVisualModel): string {
  if (model.dimensions.length === 0) return '';
  return `<div class="visual-dimension-summary" aria-label="Condiciones heredadas">${model.dimensions
    .map(
      (dimension) =>
        `<article class="visual-dimension state-${dimension.state}"><span class="visual-status-symbol" aria-hidden="true"></span><div><strong>${escapeHtml(
          dimension.label
        )}</strong><span class="visual-dimension-state">${escapeHtml(
          dimension.stateLabel
        )}</span>${
          dimension.causeActionLabels.length === 0
            ? ''
            : `<small>${escapeHtml(dimension.causeActionLabels.join(' · '))}</small>`
        }<details><summary>${escapeHtml(
          `Valor del modelo: ${dimension.label}`
        )}</summary><span>${dimension.value}/100</span></details></div></article>`
    )
    .join('')}</div>`;
}

export function renderSceneVisual(model: PresentedSceneVisualModel): string {
  assertCompleteVisualModel(model);
  const visual =
    model.templateId === 'territory'
      ? territorySvg(model)
      : model.templateId === 'housing'
        ? housingSvg(model)
        : model.templateId === 'crisis'
          ? crisisSvg(model)
          : '';
  const dimensions = dimensionSummary(model);
  if (visual === '' && dimensions === '') return '';
  const legend = model.templateId === 'territory'
    ? territoryMapLegend(model)
    : model.templateId === 'housing'
      ? housingMapLegend(model)
      : '';
  const canvas = visual === '' ? '' : `<div class="visual-canvas">${visual}${legend}${visualCards(model)}</div>`;
  return `<section class="visual-scene" data-visual-template="${model.templateId}" data-visual-scene-id="${escapeHtml(
    model.sceneId
  )}">${canvas}${dimensions}</section>`;
}
