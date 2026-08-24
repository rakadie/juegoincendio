import type { FastifyInstance } from 'fastify';
import { afterEach, describe, expect, it } from 'vitest';
import type { VerticalBetaApplicationView } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { buildApp } from '../src/interfaces/http/app.js';

const PREPARED_PREVENTION = [
  ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'],
  ['podar-ramas-y-retirar-seco', 'despejar-accesos']
] as const;

const VULNERABLE_PREVENTION = [
  ['gestionar-restos-poda', 'activar-pastoreo-preventivo', 'evaluar-quema-tecnica'],
  ['podar-ramas-y-retirar-seco', 'separar-copas']
] as const;

const OPERATIONS = {
  prepared: [
    'autorizar-maniobra-condicionada',
    'asegurar-flancos-y-repliegue',
    'defender-desde-posicion-segura'
  ],
  vulnerable: [
    'despejar-corredor-operativo',
    'asegurar-flancos-y-repliegue',
    'replegar-ante-fuego-de-copas'
  ]
} as const;

const openApps: FastifyInstance[] = [];

afterEach(async () => {
  await Promise.all(openApps.splice(0).map((app) => app.close()));
});

async function create(app: FastifyInstance): Promise<VerticalBetaApplicationView> {
  const response = await app.inject({ method: 'POST', url: '/api/game-sessions', payload: {} });
  expect(response.statusCode).toBe(200);
  return response.json() as VerticalBetaApplicationView;
}

async function advance(
  app: FastifyInstance,
  view: VerticalBetaApplicationView
): Promise<VerticalBetaApplicationView> {
  const response = await app.inject({
    method: 'POST',
    url: `/api/game-sessions/${view.session.id}/advance`,
    payload: {}
  });
  expect(response.statusCode, response.body).toBe(200);
  return response.json() as VerticalBetaApplicationView;
}

async function act(
  app: FastifyInstance,
  view: VerticalBetaApplicationView,
  actionId: string
): Promise<VerticalBetaApplicationView> {
  const response = await app.inject({
    method: 'POST',
    url: `/api/game-sessions/${view.session.id}/actions`,
    payload: { actionId }
  });
  expect(response.statusCode, response.body).toBe(200);
  return response.json() as VerticalBetaApplicationView;
}

async function play(
  branch: 'prepared' | 'vulnerable',
  prevention: typeof PREPARED_PREVENTION | typeof VULNERABLE_PREVENTION
): Promise<{ view: VerticalBetaApplicationView; visitedTypes: Set<string> }> {
  const app = buildApp();
  openApps.push(app);
  let view = await create(app);
  const visitedTypes = new Set([view.scene.type]);
  view = await advance(app, view);
  visitedTypes.add(view.scene.type);

  for (const actionId of prevention[0]) view = await act(app, view, actionId);
  view = await advance(app, view);
  for (const actionId of prevention[1]) view = await act(app, view, actionId);
  view = await advance(app, view);
  visitedTypes.add(view.scene.type);
  expect(view.scene.type).toBe('summary');

  view = await advance(app, view);
  visitedTypes.add(view.scene.type);
  view = await act(app, view, 'movilizar-y-verificar');
  visitedTypes.add(view.scene.type);
  expect(view.scene.type).toBe('router');
  view = await advance(app, view);
  visitedTypes.add(view.scene.type);
  expect(view.session.branch).toBe(branch);

  for (const actionId of OPERATIONS[branch]) {
    view = await act(app, view, actionId);
    expect(view.scene.type).toBe('decision');
    expect(view.scene.canAdvance).toBe(true);
    view = await advance(app, view);
    visitedTypes.add(view.scene.type);
  }
  expect(view.scene.type).toBe('result');
  expect(view.scene).toMatchObject({ variant: branch === 'prepared' ? 'contained' : 'overwhelmed' });
  expect(view.session.preventionReview).toHaveLength(5);
  return { view, visitedTypes };
}

describe('Vertical Beta application API used by the interface', () => {
  it('plays the prepared route through HTTP and completes contained', async () => {
    const { view: resultView, visitedTypes } = await play('prepared', PREPARED_PREVENTION);
    const app = openApps.at(-1)!;
    const completed = await advance(app, resultView);

    expect(completed.session.status).toBe('completed');
    expect(completed.session.result?.variant).toBe('contained');
    expect(completed.session.completedSceneIds).toContain('crisis-decision-housing-defense');
    expect([...visitedTypes].sort()).toEqual(
      ['briefing', 'inspection', 'summary', 'decision', 'router', 'result'].sort()
    );
  });

  it('plays the vulnerable route through HTTP and completes overwhelmed', async () => {
    const { view: resultView } = await play('vulnerable', VULNERABLE_PREVENTION);
    const app = openApps.at(-1)!;
    const completed = await advance(app, resultView);

    expect(completed.session.status).toBe('completed');
    expect(completed.session.result?.variant).toBe('overwhelmed');
    expect(completed.session.completedSceneIds).toContain('crisis-decision-access-blockage');
    expect(completed.session.completedSceneIds).toContain('crisis-decision-crown-fire');
    expect(completed.scene.type).toBe('result');
  });

  it('restarts through the same API and rejects invalid commands without changing route', async () => {
    const app = buildApp();
    openApps.push(app);
    let view = await create(app);
    view = await advance(app, view);
    view = await act(app, view, 'gestionar-restos-poda');

    const invalid = await app.inject({
      method: 'POST',
      url: `/api/game-sessions/${view.session.id}/advance`,
      payload: {}
    });
    expect(invalid.statusCode).toBe(400);

    const restarted = await app.inject({
      method: 'POST',
      url: `/api/game-sessions/${view.session.id}/restart`,
      payload: {}
    });
    const restartedView = restarted.json() as VerticalBetaApplicationView;
    expect(restartedView.scene.type).toBe('briefing');
    expect(restartedView.session.decisions).toEqual([]);
    expect(restartedView.session.history).toHaveLength(1);
  });
});
