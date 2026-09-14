import type {
  PresentedSceneVisualModel,
  PresentedVisualElement,
  VisualTemplateId
} from '../../application/vertical-beta/vertical-beta-visual-presenter.js';
import {
  renderSceneArtDefs,
  renderSceneHaze,
  renderSceneRocks,
  renderSceneShrubs,
  renderSceneSmoke,
  renderSceneTree
} from './scene-art-kit.js';
import {
  renderTerritoryBrush,
  renderTerritoryMapBase,
  renderTerritoryMapDefs,
  renderTerritoryMapPin,
  renderTerritoryPine,
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
  )}" data-visual-base="territory-plan-v2">
    ${renderSceneArtDefs()}
    ${renderTerritoryMapDefs()}
    ${renderTerritoryMapBase()}
    ${renderSceneRocks(586, 387, .18)}${renderSceneRocks(547, 137, .16)}
    <g id="territory-road" class="visual-hotspot ${stateClass(road)}"${hotspotAttributes(road)}>
      <g aria-hidden="true">
        <path class="map-road-margin" d="${TERRITORY_ROAD_PATH}" />
        <path class="visual-road" d="${TERRITORY_ROAD_PATH}" />
        <path class="map-road-centre" d="${TERRITORY_ROAD_PATH}" />
        <g class="map-road-obstruction">${renderTerritoryBrush(278, 308, .7)}${renderTerritoryBrush(321, 329, .7)}${renderTerritoryBrush(394, 291, .65)}${renderTerritoryBrush(465, 333, .65)}${renderTerritoryBrush(761, 232, .65)}</g>
        <path d="M593 291 l27 20 M585 304 l26 20" stroke="#8b7c62" stroke-width="4" />
      </g>
      ${renderTerritoryMapPin(3, 340, 350, 'Camino rural', 127, road?.selected === true)}
    </g>
    <g id="territory-continuity" class="visual-hotspot ${stateClass(
      continuity
    )}"${hotspotAttributes(continuity)}>
      <g aria-hidden="true">
        <path class="visual-vegetation-band" d="${TERRITORY_FUEL_PATH}" />
        ${renderTerritoryPine(178, 164, .8)}${renderTerritoryPine(204, 153, .9)}${renderTerritoryPine(303, 163, .8)}${renderTerritoryPine(331, 175, .75)}${renderTerritoryPine(429, 180, .8)}${renderTerritoryPine(454, 166, .75)}${renderTerritoryPine(549, 183, .8)}${renderTerritoryPine(575, 203, .75)}${renderTerritoryPine(617, 224, .7)}
        <g class="map-fuel-gap">${renderTerritoryPine(248, 143, .9)}${renderTerritoryPine(275, 151, .85)}${renderTerritoryPine(380, 185, .8)}${renderTerritoryPine(402, 185, .75)}${renderTerritoryPine(500, 161, .8)}${renderTerritoryPine(525, 168, .75)}</g>
      </g>
      ${renderTerritoryMapPin(2, 359, 127, 'Continuidad vegetal', 174, continuity?.selected === true)}
    </g>
    <g id="territory-residues" class="visual-hotspot ${stateClass(residues)}"${hotspotAttributes(
      residues
    )}>
      <g aria-hidden="true">
        <ellipse class="map-treated-ground" cx="208" cy="264" rx="32" ry="23" />
        <g class="map-residue-pile">
          <ellipse cx="208" cy="263" rx="36" ry="23" fill="#b09568" opacity=".25" />
          <path class="visual-residues" d="M181 261 l41 -18 m-30 31 l38 -21 m-40 -3 l27 29 m-42 -8 l42 -15 m-14 -11 l26 20 m-20 15 l29 -15" />
          <path d="M190 258 l-8 -10 m13 8 l-2 -10 m32 17 l12 0 m-16 6 l10 5" fill="none" stroke="#aa895c" stroke-width="2" />
        </g>
      </g>
      ${renderTerritoryMapPin(1, 212, 222, 'Restos de poda', 143, residues?.selected === true)}
    </g>
    <g id="territory-grazing" class="visual-hotspot ${stateClass(grazing)}"${hotspotAttributes(
      grazing
    )}>
      <path class="visual-grazing" d="${TERRITORY_GRAZING_PATH}" aria-hidden="true" />
      <g class="map-grazing-flock" aria-hidden="true">${[[716, 337], [777, 320], [798, 386]].map(([x, y]) => `<g transform="translate(${x} ${y}) rotate(-15)"><ellipse rx="9" ry="5" fill="#f4efda" stroke="#958b70" /><circle cx="10" cy="-2" r="3" fill="#786c55" /><path d="M-4 4 v4 m8 -4 v4 M10 -4 l2 -4" stroke="#786c55" stroke-width="1.5" /></g>`).join('')}</g>
      ${renderTerritoryMapPin(4, 692, 406, 'Franja de pastoreo', 161, grazing?.selected === true)}
    </g>
    <g id="territory-professional-line" class="visual-hotspot ${stateClass(line)}"${hotspotAttributes(
      line
    )}>
      <path class="visual-professional-line" d="M655 178 Q707 109 786 130" aria-hidden="true" />
      ${renderTerritoryMapPin(5, 693, 171, 'Evaluación técnica', 166, line?.selected === true)}
    </g>
  </svg>`;
}

function territoryMapLegend(model: PresentedSceneVisualModel): string {
  return `<div class="territory-map-key" role="group" aria-label="Puntos del mapa">${model.elements.map((element, index) =>
    `<button class="territory-map-key-item ${stateClass(element)}" type="button"${hotspotAttributes(element)}><span class="territory-key-number" aria-hidden="true">${index + 1}</span><span><strong>${escapeHtml(element.label)}</strong><small>${escapeHtml(element.stateLabel)}</small></span></button>`
  ).join('')}</div>`;
}

function housingSvg(model: PresentedSceneVisualModel): string {
  const vertical = byId(model, 'housing-vertical-fuel');
  const canopy = byId(model, 'housing-canopy');
  const access = byId(model, 'housing-local-access');
  const house = byId(model, 'housing-home');

  return `<svg class="territory-svg" viewBox="0 0 900 500" role="img" aria-label="${escapeHtml(
    model.ariaLabel
  )}">
    ${renderSceneArtDefs()}
    <rect class="visual-sky" x="0" y="0" width="900" height="500" rx="24" />
    ${renderSceneHaze()}
    <path class="visual-hill-front" d="M0 350 Q200 285 410 340 T900 315 V500 H0 Z" />
    ${renderSceneTree(112, 365, 0.76)}
    ${renderSceneShrubs(790, 355, 0.82)}
    ${renderSceneRocks(655, 438, 0.68)}
    <g id="housing-home" class="visual-hotspot ${stateClass(house)}"${hotspotAttributes(house)}>
      <path class="visual-house" d="M345 225 l120 -85 125 85 v180 H345 Z" />
      <rect class="visual-door" x="447" y="317" width="48" height="88" />
      <rect class="visual-window" x="380" y="270" width="48" height="45" /><rect class="visual-window" x="515" y="270" width="48" height="45" />
    </g>
    <g id="housing-vertical-fuel" class="visual-hotspot ${stateClass(
      vertical
    )}"${hotspotAttributes(vertical)}>
      <path class="visual-trunk" d="M263 390 V198 M300 390 V175" />
      <path class="visual-branches" d="M263 320 l-75 -45 m75 0 l-65 -62 m102 95 l72 -66 m-72 16 l62 -82" />
    </g>
    <g id="housing-canopy" class="visual-hotspot ${stateClass(canopy)}"${hotspotAttributes(
      canopy
    )}>
      <circle class="visual-canopy" cx="236" cy="165" r="72" /><circle class="visual-canopy" cx="331" cy="145" r="76" /><circle class="visual-canopy" cx="651" cy="170" r="75" /><circle class="visual-canopy" cx="742" cy="158" r="70" />
    </g>
    <g id="housing-local-access" class="visual-hotspot ${stateClass(access)}"${hotspotAttributes(
      access
    )}><path class="visual-road local" d="M60 455 C210 410 300 430 385 405 C520 365 700 405 860 355" /><rect class="visual-engine" x="140" y="382" width="88" height="44" rx="8" /><circle cx="162" cy="431" r="13" /><circle cx="208" cy="431" r="13" /></g>
    <g class="visual-label-group" aria-hidden="true"><text x="356" y="450">vivienda e interfaz</text><text x="105" y="478">acceso local</text></g>
  </svg>`;
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

  return `<svg class="territory-svg crisis-svg" viewBox="0 0 900 500" role="img" aria-label="${escapeHtml(
    model.ariaLabel
  )}" data-visual-base="shared-ravine-v1">
    ${renderSceneArtDefs()}
    <rect class="visual-sky crisis" x="0" y="0" width="900" height="500" rx="24" />
    ${renderSceneHaze()}
    <path class="visual-hill-back" d="M0 230 Q160 110 330 240 T650 185 T900 240 V500 H0 Z" />
    <path class="visual-hill-front" d="M0 345 Q170 195 350 340 T680 285 T900 345 V500 H0 Z" />
    <path class="visual-ravine crisis" d="M350 208 Q425 290 455 500 L605 500 Q555 300 520 215 Z" />
    ${renderSceneTree(112, 348, 0.78, 'dry')}
    ${renderSceneShrubs(800, 340, 0.82, 'dry')}
    ${renderSceneRocks(395, 452, 0.72)}
    ${renderSceneSmoke(590, 195, 0.9)}
    <g id="crisis-road" class="visual-hotspot ${stateClass(road)}"${hotspotAttributes(road)}><path class="visual-road" d="M30 430 C175 365 315 412 438 345 C565 275 715 318 865 250" /></g>
    <g id="crisis-retreat" class="visual-hotspot ${stateClass(retreat)}"${hotspotAttributes(retreat)}><path class="visual-retreat" d="M455 364 C350 315 240 322 128 360" /><path class="visual-arrow" d="M128 360 l35 -24 m-35 24 l38 18" /></g>
    <g id="crisis-position" class="visual-hotspot ${stateClass(position)}"${hotspotAttributes(position)}><circle class="visual-position" cx="470" cy="330" r="30" /><path d="M445 330 H495 M470 305 V355" /></g>
    <g id="crisis-pressure" class="visual-hotspot ${stateClass(pressure)}"${hotspotAttributes(pressure)}><path class="visual-fire" d="M560 365 C525 315 574 286 553 244 C620 268 636 320 616 369 C599 405 568 402 560 365 Z" /></g>
    <g id="crisis-attack-window" class="visual-hotspot ${stateClass(attack)}"${hotspotAttributes(attack)}><path class="visual-attack-window" d="M395 264 Q465 218 545 252" /></g>
    <g id="crisis-crown" class="visual-hotspot ${stateClass(crown)}"${hotspotAttributes(crown)}><circle class="visual-canopy" cx="630" cy="205" r="62" /><circle class="visual-canopy" cx="710" cy="194" r="62" /><circle class="visual-canopy" cx="782" cy="214" r="58" /></g>
    <g id="crisis-capacity" class="visual-hotspot visual-capacity ${stateClass(capacity)}"${hotspotAttributes(capacity)}><circle cx="78" cy="78" r="35" /><text x="78" y="84" text-anchor="middle">CAP</text></g>
    ${
      professionalLine === undefined
        ? ''
        : `<g id="crisis-professional-line" class="visual-hotspot ${stateClass(professionalLine)}"${hotspotAttributes(
            professionalLine
          )}><path class="visual-professional-line" d="M300 250 Q410 195 520 230" /><circle class="visual-line-marker" cx="410" cy="215" r="12" /></g>`
    }
    ${
      houseAccess === undefined
        ? ''
        : `<g id="crisis-house-access" class="visual-hotspot ${stateClass(houseAccess)}"${hotspotAttributes(
            houseAccess
          )}><path class="visual-house" d="M690 305 l55 -42 58 42 v92 h-113 z" /><path class="visual-road local" d="M615 420 Q710 390 850 405" /></g>`
    }
    <g class="visual-label-group" aria-hidden="true"><text x="385" y="475">mismo barranco · estado heredado distinto</text></g>
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
  const canvas = visual === '' ? '' : `<div class="visual-canvas">${visual}${model.templateId === 'territory' ? territoryMapLegend(model) : ''}${visualCards(model)}</div>`;
  return `<section class="visual-scene" data-visual-template="${model.templateId}" data-visual-scene-id="${escapeHtml(
    model.sceneId
  )}">${canvas}${dimensions}</section>`;
}
