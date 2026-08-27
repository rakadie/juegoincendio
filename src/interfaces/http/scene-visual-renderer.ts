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

function hotspotAttributes(element: PresentedVisualElement | undefined): string {
  if (element?.actionId === undefined) return '';
  return ` data-focus-action-id="${escapeHtml(element.actionId)}" aria-hidden="true"`;
}

function titleFor(element: PresentedVisualElement | undefined): string {
  if (element === undefined) return '';
  return `<title>${escapeHtml(element.label)}: ${escapeHtml(element.stateLabel)}. ${escapeHtml(element.explanation)}</title>`;
}

function statusLegend(model: PresentedSceneVisualModel): string {
  if (model.elements.length === 0) return '';
  return `<div class="visual-status-list" aria-label="Estado visible de la escena">${model.elements
    .map(
      (element) =>
        `<button class="visual-status ${stateClass(element)}" type="button"${
          element.actionId === undefined
            ? ' disabled'
            : ` data-focus-action-id="${escapeHtml(element.actionId)}"`
        }><span class="visual-status-symbol" aria-hidden="true"></span><span><strong>${escapeHtml(
          element.label
        )}</strong><small>${escapeHtml(element.stateLabel)}${
          element.selected === true ? ' · Seleccionada' : ''
        }</small><span class="visual-explanation">${escapeHtml(
          element.explanation
        )}</span></span></button>`
    )
    .join('')}</div>`;
}

function territorySvg(model: PresentedSceneVisualModel): string {
  const residues = byId(model, 'territory-residues');
  const continuity = byId(model, 'territory-continuity');
  const road = byId(model, 'territory-road');
  const grazing = byId(model, 'territory-grazing');
  const line = byId(model, 'territory-professional-line');

  return `<svg class="territory-svg" viewBox="0 0 900 500" role="img" aria-label="${escapeHtml(
    model.ariaLabel
  )}">
    ${renderSceneArtDefs()}
    <rect class="visual-sky" x="0" y="0" width="900" height="500" rx="24" />
    ${renderSceneHaze()}
    <path class="visual-hill-back" d="M0 250 Q160 110 320 230 T650 180 T900 235 V500 H0 Z" />
    <path class="visual-hill-front" d="M0 330 Q170 190 350 320 T680 275 T900 335 V500 H0 Z" />
    <path class="visual-ravine" d="M390 220 Q440 285 455 500 L585 500 Q548 325 520 235 Z" />
    ${renderSceneTree(105, 345, 0.82)}
    ${renderSceneShrubs(770, 335, 0.9)}
    ${renderSceneRocks(505, 455, 0.75)}
    <g id="territory-road" class="visual-hotspot ${stateClass(road)}"${hotspotAttributes(road)}>${titleFor(
      road
    )}<path class="visual-road" d="M40 410 C210 360 335 390 455 330 C585 265 720 290 865 245" /></g>
    <g id="territory-continuity" class="visual-hotspot ${stateClass(
      continuity
    )}"${hotspotAttributes(continuity)}>${titleFor(continuity)}
      <path class="visual-vegetation-band" d="M70 275 Q190 205 315 275 T560 250 T815 285" />
      <path class="visual-vegetation-band secondary" d="M110 310 Q240 245 360 305 T620 290 T835 315" />
    </g>
    <g id="territory-residues" class="visual-hotspot ${stateClass(residues)}"${hotspotAttributes(
      residues
    )}>${titleFor(residues)}
      <path class="visual-residues" d="M175 382 l36 -25 m-21 39 l48 -30 m-14 45 l35 -28 m-67 3 l-31 -18" />
    </g>
    <g id="territory-grazing" class="visual-hotspot ${stateClass(grazing)}"${hotspotAttributes(
      grazing
    )}>${titleFor(grazing)}<path class="visual-grazing" d="M610 360 q80 -58 166 -18 l-15 77 q-88 -20 -167 18 z" /></g>
    <g id="territory-professional-line" class="visual-hotspot ${stateClass(line)}"${hotspotAttributes(
      line
    )}>${titleFor(line)}<path class="visual-professional-line" d="M615 245 C690 205 770 205 835 220" /><circle class="visual-line-marker" cx="742" cy="213" r="12" /></g>
    <g class="visual-label-group" aria-hidden="true">
      <text x="82" y="455">camino rural</text><text x="605" y="458">franja prioritaria</text><text x="612" y="192">posición evaluable</text>
    </g>
  </svg>`;
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
    <g id="housing-home" class="${stateClass(house)}">${titleFor(house)}
      <path class="visual-house" d="M345 225 l120 -85 125 85 v180 H345 Z" />
      <rect class="visual-door" x="447" y="317" width="48" height="88" />
      <rect class="visual-window" x="380" y="270" width="48" height="45" /><rect class="visual-window" x="515" y="270" width="48" height="45" />
    </g>
    <g id="housing-vertical-fuel" class="visual-hotspot ${stateClass(
      vertical
    )}"${hotspotAttributes(vertical)}>${titleFor(vertical)}
      <path class="visual-trunk" d="M263 390 V198 M300 390 V175" />
      <path class="visual-branches" d="M263 320 l-75 -45 m75 0 l-65 -62 m102 95 l72 -66 m-72 16 l62 -82" />
    </g>
    <g id="housing-canopy" class="visual-hotspot ${stateClass(canopy)}"${hotspotAttributes(
      canopy
    )}>${titleFor(canopy)}
      <circle class="visual-canopy" cx="236" cy="165" r="72" /><circle class="visual-canopy" cx="331" cy="145" r="76" /><circle class="visual-canopy" cx="651" cy="170" r="75" /><circle class="visual-canopy" cx="742" cy="158" r="70" />
    </g>
    <g id="housing-local-access" class="visual-hotspot ${stateClass(access)}"${hotspotAttributes(
      access
    )}>${titleFor(access)}<path class="visual-road local" d="M60 455 C210 410 300 430 385 405 C520 365 700 405 860 355" /><rect class="visual-engine" x="140" y="382" width="88" height="44" rx="8" /><circle cx="162" cy="431" r="13" /><circle cx="208" cy="431" r="13" /></g>
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
    <g id="crisis-road" class="${stateClass(road)}">${titleFor(road)}<path class="visual-road" d="M30 430 C175 365 315 412 438 345 C565 275 715 318 865 250" /></g>
    <g id="crisis-retreat" class="${stateClass(retreat)}">${titleFor(retreat)}<path class="visual-retreat" d="M455 364 C350 315 240 322 128 360" /><path class="visual-arrow" d="M128 360 l35 -24 m-35 24 l38 18" /></g>
    <g id="crisis-position" class="${stateClass(position)}">${titleFor(position)}<circle class="visual-position" cx="470" cy="330" r="30" /><path d="M445 330 H495 M470 305 V355" /></g>
    <g id="crisis-pressure" class="${stateClass(pressure)}">${titleFor(pressure)}<path class="visual-fire" d="M560 365 C525 315 574 286 553 244 C620 268 636 320 616 369 C599 405 568 402 560 365 Z" /></g>
    <g id="crisis-attack-window" class="${stateClass(attack)}">${titleFor(attack)}<path class="visual-attack-window" d="M395 264 Q465 218 545 252" /></g>
    <g id="crisis-crown" class="${stateClass(crown)}">${titleFor(crown)}<circle class="visual-canopy" cx="630" cy="205" r="62" /><circle class="visual-canopy" cx="710" cy="194" r="62" /><circle class="visual-canopy" cx="782" cy="214" r="58" /></g>
    ${
      professionalLine === undefined
        ? ''
        : `<g id="crisis-professional-line" class="${stateClass(professionalLine)}">${titleFor(
            professionalLine
          )}<path class="visual-professional-line" d="M300 250 Q410 195 520 230" /><circle class="visual-line-marker" cx="410" cy="215" r="12" /></g>`
    }
    ${
      houseAccess === undefined
        ? ''
        : `<g id="crisis-house-access" class="${stateClass(houseAccess)}">${titleFor(
            houseAccess
          )}<path class="visual-house" d="M690 305 l55 -42 58 42 v92 h-113 z" /><path class="visual-road local" d="M615 420 Q710 390 850 405" /></g>`
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
  const canvas = visual === '' ? '' : `<div class="visual-canvas">${visual}</div>`;
  return `<section class="visual-scene" data-visual-template="${model.templateId}" data-visual-scene-id="${escapeHtml(
    model.sceneId
  )}">${canvas}${statusLegend(model)}${dimensions}</section>`;
}
