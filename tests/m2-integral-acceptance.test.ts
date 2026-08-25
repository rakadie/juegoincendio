import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { FastifyInstance } from 'fastify';
import { afterEach, describe, expect, it } from 'vitest';
import type {
  PresentedDecisionScene,
  PresentedResultScene,
  PresentedSummaryScene,
  PresentedVerticalBetaScene
} from '../src/application/vertical-beta/vertical-beta-application-service.js';
import {
  VERTICAL_BETA_REFERENCE_CONTEXT,
  type VerticalBetaRuntimeContext
} from '../src/application/vertical-beta/vertical-beta-runtime-context.js';
import { validateVerticalBetaI18nCatalog } from '../src/content/i18n/vertical-beta-i18n.js';
import { VERTICAL_BETA_PLAYER_CONTENT } from '../src/content/vertical-beta-player-content.js';
import type {
  GameSessionEvent,
  InheritedState
} from '../src/domain/game-session/game-session.js';
import {
  GAME_SCENE_TYPES,
  type CanonicalSceneId,
  type CrisisBranch,
  type ResultVariant
} from '../src/domain/types/game-scene.js';
import { validateGameSceneCatalog } from '../src/domain/validation/game-scene-catalog-validator.js';
import {
  buildApp,
  type VerticalBetaHttpView
} from '../src/interfaces/http/app.js';
import { renderPrototypePage } from '../src/interfaces/http/prototype-page.js';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const FIXTURE_DIRECTORY = fileURLToPath(new URL('./fixtures/game-session/', import.meta.url));
const openApps: FastifyInstance[] = [];

const HISTORICAL_RUNTIME_IDS = [
  's-011-corte-carretera-acceso',
  's-025-cortafuego-emergencia',
  's-026-defensa-operativa-nucleo-viviendas',
  's-027-fuego-en-barranco',
  's-030-fuego-de-copas',
  'p-003-comunidad-preparada',
  'resultado-beta',
  'ruta-comunicacion',
  'invierno_',
  'verano_'
] as const;

const CAUSAL_RELATION_IDS = [
  'fuel-load',
  'fuel-continuity',
  'operational-access',
  'defensibility',
  'attack-opportunity'
] as const;

interface JsonSession {
  schemaVersion: number;
  id: string;
  status: string;
  progress: {
    currentSceneId: CanonicalSceneId;
    completedSceneIds: CanonicalSceneId[];
  };
  decisions: Array<{ sequence: number; sceneId: CanonicalSceneId; actionId: string }>;
  inheritedState: InheritedState;
  crisisBranch: CrisisBranch;
  result: { variant: ResultVariant; evidenceIds: string[] };
  history: GameSessionEvent[];
}

interface ReferencePlan {
  readonly fixture: 'reference-contained.json' | 'reference-overwhelmed.json';
  readonly branch: CrisisBranch;
  readonly result: ResultVariant;
  readonly prevention: readonly [readonly string[], readonly string[]];
  readonly operations: readonly string[];
}

interface AcceptanceRun {
  readonly initial: VerticalBetaHttpView;
  readonly completed: VerticalBetaHttpView;
  readonly resultScene: PresentedResultScene;
  readonly visitedSceneIds: readonly CanonicalSceneId[];
  readonly sceneSnapshots: ReadonlyMap<CanonicalSceneId, PresentedVerticalBetaScene>;
  readonly feedbackByScene: ReadonlyMap<CanonicalSceneId, string>;
}

const PREPARED_PLAN: ReferencePlan = {
  fixture: 'reference-contained.json',
  branch: 'prepared',
  result: 'contained',
  prevention: [
    ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'],
    ['podar-ramas-y-retirar-seco', 'despejar-accesos']
  ],
  operations: [
    'autorizar-maniobra-condicionada',
    'asegurar-flancos-y-repliegue',
    'defender-desde-posicion-segura'
  ]
};

const VULNERABLE_PLAN: ReferencePlan = {
  fixture: 'reference-overwhelmed.json',
  branch: 'vulnerable',
  result: 'overwhelmed',
  prevention: [
    ['gestionar-restos-poda', 'activar-pastoreo-preventivo', 'evaluar-quema-tecnica'],
    ['podar-ramas-y-retirar-seco', 'separar-copas']
  ],
  operations: [
    'despejar-corredor-operativo',
    'asegurar-flancos-y-repliegue',
    'replegar-ante-fuego-de-copas'
  ]
};

afterEach(async () => {
  await Promise.all(openApps.splice(0).map((app) => app.close()));
});

async function readJson<T>(name: string): Promise<T> {
  return JSON.parse(await readFile(`${FIXTURE_DIRECTORY}${name}`, 'utf8')) as T;
}

async function readSource(path: string): Promise<string> {
  return readFile(`${ROOT}${path}`, 'utf8');
}

async function injectView(
  app: FastifyInstance,
  method: 'GET' | 'POST',
  url: string,
  payload?: Record<string, unknown>
): Promise<VerticalBetaHttpView> {
  const response = await app.inject({ method, url, ...(payload === undefined ? {} : { payload }) });
  expect(response.statusCode, response.body).toBe(200);
  return response.json() as VerticalBetaHttpView;
}

function actionById(scene: PresentedDecisionScene, actionId: string) {
  const action = scene.actions.find(({ id }) => id === actionId);
  if (action === undefined) throw new Error(`${scene.id} is missing action ${actionId}.`);
  return action;
}

async function playThroughHttp(
  plan: ReferencePlan,
  context: VerticalBetaRuntimeContext
): Promise<AcceptanceRun> {
  expect(context.randomness).toBe('none');
  const app = buildApp({ context });
  openApps.push(app);

  const snapshots = new Map<CanonicalSceneId, PresentedVerticalBetaScene>();
  const feedbackByScene = new Map<CanonicalSceneId, string>();
  const visitedSceneIds: CanonicalSceneId[] = [];

  const record = (view: VerticalBetaHttpView): void => {
    expect(view.context).toEqual(context);
    expect(view.context.referenceContextId).toBe('vb1-reference-context-v1');
    expect(view.context.randomness).toBe('none');
    if (!snapshots.has(view.scene.id)) snapshots.set(view.scene.id, structuredClone(view.scene));
    if (visitedSceneIds.at(-1) !== view.scene.id) visitedSceneIds.push(view.scene.id);
  };

  const act = async (
    view: VerticalBetaHttpView,
    actionId: string
  ): Promise<VerticalBetaHttpView> => {
    const next = await injectView(
      app,
      'POST',
      `/api/game-sessions/${view.session.id}/actions`,
      { actionId }
    );
    if (next.scene.type === 'decision' && next.scene.feedback !== undefined) {
      feedbackByScene.set(next.scene.id, next.scene.feedback);
    }
    record(next);
    return next;
  };

  const advance = async (view: VerticalBetaHttpView): Promise<VerticalBetaHttpView> => {
    const next = await injectView(
      app,
      'POST',
      `/api/game-sessions/${view.session.id}/advance`,
      {}
    );
    record(next);
    return next;
  };

  let view = await injectView(app, 'POST', '/api/game-sessions', {});
  const initial = structuredClone(view);
  record(view);

  view = await advance(view);
  for (const actionId of plan.prevention[0]) view = await act(view, actionId);
  view = await advance(view);
  for (const actionId of plan.prevention[1]) view = await act(view, actionId);
  view = await advance(view);
  view = await advance(view);
  view = await act(view, 'movilizar-y-verificar');
  view = await advance(view);

  expect(view.session.branch).toBe(plan.branch);
  for (const actionId of plan.operations) {
    expect(view.scene.type).toBe('decision');
    expect(actionById(view.scene as PresentedDecisionScene, actionId).available).toBe(true);
    view = await act(view, actionId);
    expect(view.scene.canAdvance).toBe(true);
    view = await advance(view);
  }

  expect(view.scene.type).toBe('result');
  const resultScene = structuredClone(view.scene as PresentedResultScene);
  expect(resultScene.variant).toBe(plan.result);
  view = await advance(view);

  return {
    initial,
    completed: view,
    resultScene,
    visitedSceneIds,
    sceneSnapshots: snapshots,
    feedbackByScene
  };
}

function materializeCanonicalSession(
  run: AcceptanceRun,
  fixtureId: string
): JsonSession {
  const history: GameSessionEvent[] = run.completed.session.history.map((event) =>
    event.type === 'session-created'
      ? { ...event, sessionId: fixtureId }
      : structuredClone(event)
  );
  const inheritedState = structuredClone(run.completed.session.inheritedState);
  const crisisBranch = run.completed.session.branch;
  const result = structuredClone(run.completed.session.result);
  if (inheritedState === null || crisisBranch === null || result === null) {
    throw new Error('Completed acceptance session is missing state, branch or result.');
  }

  return {
    schemaVersion: 1,
    id: fixtureId,
    status: run.completed.session.status,
    progress: {
      currentSceneId: run.completed.session.currentSceneId,
      completedSceneIds: [...run.completed.session.completedSceneIds]
    },
    decisions: structuredClone(run.completed.session.decisions) as JsonSession['decisions'],
    inheritedState,
    crisisBranch,
    result: { variant: result.variant, evidenceIds: [...result.evidenceIds] },
    history
  };
}

function expectAcceptedRun(
  run: AcceptanceRun,
  fixture: JsonSession,
  context: VerticalBetaRuntimeContext,
  plan: ReferencePlan
): void {
  expect(run.initial.context).toEqual(context);
  expect(run.completed.context).toEqual(context);
  expect(run.initial.context.rulesetId).toBe('m1-reference-rules-v1');
  expect(run.initial.context.weatherProfile.changesDuringSession).toBe(false);
  expect(run.initial.context.randomness).toBe('none');

  expect(materializeCanonicalSession(run, fixture.id)).toEqual(fixture);
  expect(run.initial.session).toMatchObject({
    status: 'active',
    currentSceneId: 'intro-briefing-mission',
    decisions: [],
    inheritedState: null,
    branch: null,
    result: null
  });
  expect(run.initial.session.history).toHaveLength(1);
  expect(run.completed.session.status).toBe('completed');
  expect(run.completed.session.branch).toBe(plan.branch);
  expect(run.completed.session.result?.variant).toBe(plan.result);
  expect(run.completed.session.decisions).toHaveLength(context.expectedDecisionCount);
  expect(run.visitedSceneIds).toHaveLength(context.expectedVisitedNodeCount);
  expect(run.visitedSceneIds).toEqual(fixture.progress.completedSceneIds);
  expect(context.targetDurationMinutes.max).toBeLessThanOrEqual(25);
  expect(context.selectionLimits).toEqual({ territory: 3, housing: 2 });

  expect(run.resultScene.relations.map(({ id }) => id)).toEqual(CAUSAL_RELATION_IDS);
  expect(run.resultScene.relations).toHaveLength(5);
  for (const relation of run.resultScene.relations) {
    expect(relation.title.trim().length).toBeGreaterThan(0);
    expect(relation.effect.trim().length).toBeGreaterThan(0);
    expect(relation.causeActionLabels.length).toBeGreaterThan(0);
    expect(fixture.progress.completedSceneIds).toContain(relation.manifestationSceneId);
  }
}

describe('M2 integral acceptance gate', () => {
  it('validates the official catalog, payload, i18n and immutable reference context', async () => {
    const context = await readJson<VerticalBetaRuntimeContext>('reference-context.json');
    expect(context).toEqual(VERTICAL_BETA_REFERENCE_CONTEXT);
    expect(validateGameSceneCatalog(VERTICAL_BETA_PLAYER_CONTENT.catalog)).toEqual({
      valid: true,
      errors: []
    });
    expect(validateVerticalBetaI18nCatalog(VERTICAL_BETA_PLAYER_CONTENT.i18n)).toEqual({
      valid: true,
      errors: []
    });
    expect(VERTICAL_BETA_PLAYER_CONTENT.catalog.scenes).toHaveLength(12);
    expect(new Set(VERTICAL_BETA_PLAYER_CONTENT.catalog.scenes.map(({ id }) => id)).size).toBe(12);
    expect(new Set(VERTICAL_BETA_PLAYER_CONTENT.catalog.scenes.map(({ type }) => type))).toEqual(
      new Set(GAME_SCENE_TYPES)
    );
    expect(VERTICAL_BETA_PLAYER_CONTENT.scenarios).toHaveLength(5);
    expect(VERTICAL_BETA_PLAYER_CONTENT.inspections).toHaveLength(2);
    expect(Object.keys(VERTICAL_BETA_PLAYER_CONTENT.i18n.scenes)).toHaveLength(12);

    const app = buildApp({ context });
    openApps.push(app);
    const [contentResponse, contextResponse] = await Promise.all([
      app.inject({ method: 'GET', url: '/api/vertical-beta/content' }),
      app.inject({ method: 'GET', url: '/api/vertical-beta/context' })
    ]);
    expect(contentResponse.statusCode).toBe(200);
    expect(contextResponse.statusCode).toBe(200);
    expect(contentResponse.json()).toEqual(VERTICAL_BETA_PLAYER_CONTENT);
    expect(contextResponse.json()).toEqual(context);

    const serialized = contentResponse.body;
    for (const historicalId of HISTORICAL_RUNTIME_IDS) {
      expect(serialized).not.toContain(historicalId);
    }

    const drifted = structuredClone(context) as unknown as Record<string, unknown>;
    drifted.randomness = 'seeded';
    expect(() =>
      buildApp({ context: drifted as unknown as VerticalBetaRuntimeContext })
    ).toThrowError(expect.objectContaining({ code: 'invalid-runtime-context' }));
  });

  it('replays the prepared reference twice through HTTP under the same fixed context', async () => {
    const [context, fixture] = await Promise.all([
      readJson<VerticalBetaRuntimeContext>('reference-context.json'),
      readJson<JsonSession>(PREPARED_PLAN.fixture)
    ]);
    const first = await playThroughHttp(PREPARED_PLAN, context);
    const repeated = await playThroughHttp(PREPARED_PLAN, context);

    expectAcceptedRun(first, fixture, context, PREPARED_PLAN);
    expect(materializeCanonicalSession(repeated, fixture.id)).toEqual(fixture);
    expect(repeated.initial.context).toEqual(first.initial.context);

    const summary = first.sceneSnapshots.get(
      'transition-summary-prevention'
    ) as PresentedSummaryScene;
    expect(Object.fromEntries(summary.dimensions.map(({ id, value }) => [id, value]))).toEqual(
      fixture.inheritedState
    );

    const opening = first.sceneSnapshots.get(
      'crisis-decision-emergency-fuel-break'
    ) as PresentedDecisionScene;
    expect(actionById(opening, 'autorizar-maniobra-condicionada').available).toBe(true);

    const ravine = first.sceneSnapshots.get('crisis-decision-ravine-fire') as PresentedDecisionScene;
    expect(actionById(ravine, 'mantener-ataque-anclado').available).toBe(true);
    expect(first.feedbackByScene.get('crisis-decision-ravine-fire')).toContain('se sostiene');
    expect(fixture.inheritedState.attackOpportunity).toBe(66);
  });

  it('replays the vulnerable reference twice through HTTP under the same fixed context', async () => {
    const [context, fixture] = await Promise.all([
      readJson<VerticalBetaRuntimeContext>('reference-context.json'),
      readJson<JsonSession>(VULNERABLE_PLAN.fixture)
    ]);
    const first = await playThroughHttp(VULNERABLE_PLAN, context);
    const repeated = await playThroughHttp(VULNERABLE_PLAN, context);

    expectAcceptedRun(first, fixture, context, VULNERABLE_PLAN);
    expect(materializeCanonicalSession(repeated, fixture.id)).toEqual(fixture);
    expect(repeated.initial.context).toEqual(first.initial.context);

    const access = first.sceneSnapshots.get(
      'crisis-decision-access-blockage'
    ) as PresentedDecisionScene;
    expect(actionById(access, 'introducir-maquinaria-sin-repliegue')).toMatchObject({
      available: false,
      unavailableReason: expect.stringContaining('ruta segura')
    });

    const ravine = first.sceneSnapshots.get('crisis-decision-ravine-fire') as PresentedDecisionScene;
    expect(actionById(ravine, 'mantener-ataque-anclado').available).toBe(false);
    expect(first.feedbackByScene.get('crisis-decision-ravine-fire')).toContain('no puede sostenerse');

    const crown = first.sceneSnapshots.get('crisis-decision-crown-fire') as PresentedDecisionScene;
    expect(actionById(crown, 'sostener-ataque-directo').available).toBe(false);
    expect(fixture.inheritedState.attackOpportunity).toBe(24);
  });

  it('keeps the browser as a command renderer and rejects parallel runtime models', async () => {
    const html = renderPrototypePage();
    expect(html).toContain("request('/api/game-sessions', { method: 'POST'");
    expect(html).toContain("'/actions'");
    expect(html).toContain("'/advance'");

    const [appSource, playerContentSource, pageSource] = await Promise.all([
      readSource('src/interfaces/http/app.ts'),
      readSource('src/content/vertical-beta-player-content.ts'),
      readSource('src/interfaces/http/prototype-page.ts')
    ]);
    const runtimeBoundary = `${appSource}\n${playerContentSource}\n${pageSource}`;
    const forbiddenRules = [
      'aggregateInspectionMetrics',
      'chooseBalanceOutcome',
      'activeCrisisRoute',
      'preventionPreparednessScore',
      'chooseCrisisOutcome',
      'applySummerFireModel',
      'finalizeCampaignResult',
      'buildInitialState',
      'WINTER_CAMPAIGN_NODES',
      'SUMMER_CAMPAIGN_NODES',
      'winterNodes',
      'summerNodes',
      "from '../../content/campaign",
      "from './campaign",
      'editorial-content',
      '/library/',
      '/archive/'
    ];
    for (const forbidden of forbiddenRules) expect(runtimeBoundary).not.toContain(forbidden);
    for (const historicalId of HISTORICAL_RUNTIME_IDS) expect(runtimeBoundary).not.toContain(historicalId);

    expect(pageSource).toContain('let currentView = null');
    expect(pageSource).not.toContain('let state =');
    expect(pageSource).not.toMatch(/fuelLoad\s*[<>=]|fuelContinuity\s*[<>=]|attackOpportunity\s*[<>=]/);
  });
});
