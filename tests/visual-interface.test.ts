import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { VerticalBetaApplicationService } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import {
  presentSceneVisualModel,
  type PresentedSceneVisualModel
} from '../src/application/vertical-beta/vertical-beta-visual-presenter.js';
import { buildApp } from '../src/interfaces/http/app.js';
import { renderPrototypePage } from '../src/interfaces/http/prototype-page.js';
import { renderSceneVisual } from '../src/interfaces/http/scene-visual-renderer.js';

const ROOT = fileURLToPath(new URL('../', import.meta.url));

function visual(service: VerticalBetaApplicationService, id: string): PresentedSceneVisualModel {
  return presentSceneVisualModel(service.view(id).session);
}

function applyPrevention(
  service: VerticalBetaApplicationService,
  id: string,
  territory: readonly string[],
  housing: readonly string[]
): void {
  service.create(id);
  service.advance(id);
  territory.forEach((actionId) => service.applyAction(id, actionId));
  service.advance(id);
  housing.forEach((actionId) => service.applyAction(id, actionId));
  service.advance(id);
}

function advanceToRavine(
  service: VerticalBetaApplicationService,
  id: string,
  branch: 'prepared' | 'vulnerable'
): void {
  service.advance(id);
  service.applyAction(id, 'movilizar-y-verificar');
  service.advance(id);
  if (branch === 'prepared') {
    service.applyAction(id, 'autorizar-maniobra-condicionada');
  } else {
    service.applyAction(id, 'despejar-corredor-operativo');
  }
  service.advance(id);
  expect(service.view(id).scene.id).toBe('crisis-decision-ravine-fire');
}

describe('M3 visual presenter', () => {
  it('turns territory actions into deterministic overlays using the same official action IDs', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-territory';
    service.create(id);
    service.advance(id);

    const initial = visual(service, id);
    expect(initial.templateId).toBe('territory');
    expect(initial.elements).toHaveLength(5);
    expect(initial.elements.map(({ actionId }) => actionId)).toEqual([
      'gestionar-restos-poda',
      'crear-discontinuidades-vegetales',
      'limpiar-margenes-caminos',
      'activar-pastoreo-preventivo',
      'evaluar-quema-tecnica'
    ]);
    expect(initial.elements.find(({ id }) => id === 'territory-road')?.state).toBe('constrained');

    service.applyAction(id, 'limpiar-margenes-caminos');
    const changed = visual(service, id);
    expect(changed.elements.find(({ id }) => id === 'territory-road')).toMatchObject({
      state: 'clear',
      selected: true,
      actionId: 'limpiar-margenes-caminos'
    });
    expect(changed.elements.find(({ id }) => id === 'territory-continuity')?.state).toBe(
      'continuous'
    );
  });

  it('keeps housing visual state aligned with the 2/3 official inspection', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-housing';
    service.create(id);
    service.advance(id);
    ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'].forEach(
      (actionId) => service.applyAction(id, actionId)
    );
    service.advance(id);

    const initial = visual(service, id);
    expect(initial.templateId).toBe('housing');
    expect(initial.elements.filter(({ actionId }) => actionId !== undefined)).toHaveLength(3);
    expect(initial.elements.find(({ id }) => id === 'housing-local-access')?.state).toBe('blocked');

    service.applyAction(id, 'despejar-accesos');
    expect(visual(service, id).elements.find(({ id }) => id === 'housing-local-access')).toMatchObject({
      state: 'clear',
      selected: true
    });
  });

  it('presents inherited dimensions with causes before the crisis instead of a global score', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'visual-summary';
    applyPrevention(
      service,
      id,
      ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'],
      ['podar-ramas-y-retirar-seco', 'despejar-accesos']
    );

    const model = visual(service, id);
    expect(model.templateId).toBe('summary');
    expect(model.dimensions).toHaveLength(5);
    expect(model.dimensions.map(({ id }) => id)).toEqual([
      'fuelLoad',
      'fuelContinuity',
      'operationalAccess',
      'defensibility',
      'attackOpportunity'
    ]);
    expect(model.dimensions.find(({ id }) => id === 'operationalAccess')).toMatchObject({
      state: 'favorable',
      causeActionLabels: expect.arrayContaining([
        'Limpiar márgenes de caminos rurales',
        'Despejar accesos para autobombas'
      ])
    });
  });

  it('uses one shared ravine base with different prepared and vulnerable states', () => {
    const prepared = new VerticalBetaApplicationService();
    const vulnerable = new VerticalBetaApplicationService();

    applyPrevention(
      prepared,
      'prepared-ravine',
      ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'],
      ['podar-ramas-y-retirar-seco', 'despejar-accesos']
    );
    advanceToRavine(prepared, 'prepared-ravine', 'prepared');

    applyPrevention(
      vulnerable,
      'vulnerable-ravine',
      ['gestionar-restos-poda', 'activar-pastoreo-preventivo', 'evaluar-quema-tecnica'],
      ['podar-ramas-y-retirar-seco', 'separar-copas']
    );
    advanceToRavine(vulnerable, 'vulnerable-ravine', 'vulnerable');

    const preparedVisual = visual(prepared, 'prepared-ravine');
    const vulnerableVisual = visual(vulnerable, 'vulnerable-ravine');
    expect(preparedVisual.sceneId).toBe(vulnerableVisual.sceneId);
    expect(preparedVisual.templateId).toBe('crisis');
    expect(vulnerableVisual.templateId).toBe('crisis');
    expect(preparedVisual.elements.find(({ id }) => id === 'crisis-position')?.state).toBe(
      'sustainable'
    );
    expect(vulnerableVisual.elements.find(({ id }) => id === 'crisis-position')?.state).toBe(
      'unsustainable'
    );
    expect(preparedVisual.elements.find(({ id }) => id === 'crisis-attack-window')?.state).toBe(
      'viable'
    );
    expect(vulnerableVisual.elements.find(({ id }) => id === 'crisis-attack-window')?.state).toBe(
      'unavailable'
    );

    const preparedMarkup = renderSceneVisual(preparedVisual);
    const vulnerableMarkup = renderSceneVisual(vulnerableVisual);
    expect(preparedMarkup).toContain('data-visual-base="shared-ravine-v1"');
    expect(vulnerableMarkup).toContain('data-visual-base="shared-ravine-v1"');
    expect(preparedMarkup).toContain('state-sustainable');
    expect(vulnerableMarkup).toContain('state-unsustainable');
  });
});

describe('M3 visual HTTP and renderer boundaries', () => {
  it('returns semantic visual markup alongside the normal application view', async () => {
    const app = buildApp();
    const created = await app.inject({ method: 'POST', url: '/api/game-sessions' });
    expect(created.statusCode).toBe(200);
    const id = created.json().session.id as string;
    const territory = await app.inject({
      method: 'POST',
      url: `/api/game-sessions/${id}/advance`,
      payload: {}
    });
    expect(territory.statusCode).toBe(200);
    const payload = territory.json();
    expect(payload.visual).toMatchObject({
      sceneId: 'prevention-inspection-territory-fuel',
      templateId: 'territory'
    });
    expect(payload.visualMarkup).toContain('<svg');
    expect(payload.visualMarkup).toContain('role="img"');
    expect(payload.visualMarkup).toContain('data-focus-action-id="limpiar-margenes-caminos"');
    expect(payload.visualMarkup).toContain('visual-explanation');
    expect(payload.visualMarkup).not.toContain('aria-pressed');
    await app.close();
  });

  it('keeps rules out of the browser renderer and preserves accessible HTML controls', async () => {
    const [pageSource, visualRendererSource] = await Promise.all([
      readFile(`${ROOT}src/interfaces/http/prototype-page.ts`, 'utf8'),
      readFile(`${ROOT}src/interfaces/http/scene-visual-renderer.ts`, 'utf8')
    ]);
    const rendererBoundary = `${pageSource}\n${visualRendererSource}`;
    expect(pageSource).toContain('currentView.visualMarkup');
    expect(pageSource).toContain("document.querySelectorAll('.action-button')");
    expect(pageSource).toContain('prefers-reduced-motion');
    expect(visualRendererSource).toContain('visual-explanation');
    expect(visualRendererSource).toContain('aria-hidden="true"');
    expect(rendererBoundary).not.toContain('selectCrisisBranch');
    expect(rendererBoundary).not.toContain('calculatePreventionBalance');
    expect(rendererBoundary).not.toMatch(/fuelLoad\s*[<>=]|fuelContinuity\s*[<>=]|attackOpportunity\s*[<>=]/);
  });

  it('renders the visual spike with SVG plus an accessible HTML equivalent', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'spike';
    service.create(id);
    service.advance(id);
    const markup = renderSceneVisual(visual(service, id));
    expect(markup).toContain('data-visual-template="territory"');
    expect(markup).toContain('territory-road');
    expect(markup).toContain('territory-continuity');
    expect(markup).toContain('territory-residues');
    expect(markup).toContain('class="visual-card-layer"');
    expect(markup).toContain('class="visual-hover-card');
    expect(markup).toContain('data-visual-action-card-id="limpiar-margenes-caminos"');
    expect(markup).toContain('aria-controls="visual-card-territory-road"');
    expect(markup).not.toContain('visual-status-list');
    expect(renderPrototypePage()).toContain('action-button');
  });
});
