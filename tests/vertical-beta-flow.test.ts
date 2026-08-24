import { describe, expect, it } from 'vitest';
import { VERTICAL_BETA_FLOW } from '../src/content/vertical-beta-catalog.js';
import {
  VERTICAL_BETA_DECLARATIVE_CONTENT,
  VERTICAL_BETA_RESULT_VARIANTS
} from '../src/content/vertical-beta-flow-content.js';
import {
  createGameSession,
  executeGameSessionCommand
} from '../src/domain/game-session/game-session-engine.js';
import type { GameSession } from '../src/domain/game-session/game-session.js';
import { resolveOperationalDecision } from '../src/domain/operations/operational-scene-engine.js';
import {
  applyPreventionInspectionAction,
  completePreventionInspection
} from '../src/domain/prevention/prevention-inspection-engine.js';
import {
  advanceAfterOperationalScene,
  completeBriefing,
  completePreventionSummary,
  completeVerticalBetaResult,
  recordPreventionBalance,
  resolveCausalRouter,
  resolveFirstAlert,
  selectCrisisBranch,
  type CausalReportModel,
  type PreventionBalance
} from '../src/domain/vertical-beta/vertical-beta-flow-engine.js';
import { buildApp } from '../src/interfaces/http/app.js';

const PREPARED_PREVENTION = [
  ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'],
  ['podar-ramas-y-retirar-seco', 'despejar-accesos']
] as const;

const VULNERABLE_PREVENTION = [
  ['gestionar-restos-poda', 'activar-pastoreo-preventivo', 'evaluar-quema-tecnica'],
  ['podar-ramas-y-retirar-seco', 'separar-copas']
] as const;

const OPERATIONAL_ACTIONS = {
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

interface PlayedGame {
  readonly session: GameSession;
  readonly balance: PreventionBalance;
  readonly report: CausalReportModel;
}

function playReference(
  id: string,
  prevention: typeof PREPARED_PREVENTION | typeof VULNERABLE_PREVENTION,
  branch: 'prepared' | 'vulnerable'
): PlayedGame {
  let session = completeBriefing(createGameSession(id));
  for (const actionId of prevention[0]) {
    session = applyPreventionInspectionAction(session, actionId);
  }
  session = completePreventionInspection(session).session;
  session = executeGameSessionCommand(session, {
    type: 'transition-scene',
    toSceneId: 'prevention-inspection-housing-interface'
  });
  for (const actionId of prevention[1]) {
    session = applyPreventionInspectionAction(session, actionId);
  }
  session = completePreventionInspection(session).session;
  const balanced = recordPreventionBalance(session);
  session = completePreventionSummary(balanced.session);
  session = resolveFirstAlert(session, 'movilizar-y-verificar');
  const routed = resolveCausalRouter(session);
  expect(routed.selection.branch).toBe(branch);
  session = routed.session;

  for (const actionId of OPERATIONAL_ACTIONS[branch]) {
    session = resolveOperationalDecision(session, actionId).session;
    session = advanceAfterOperationalScene(session);
  }
  const completed = completeVerticalBetaResult(session);
  return { session: completed.session, balance: balanced.balance, report: completed.report };
}

describe('Vertical Beta 1 complete domain flow', () => {
  it('reproduces the prepared route and explains contained from real history', () => {
    const { session, balance, report } = playReference(
      'flow-contained',
      PREPARED_PREVENTION,
      'prepared'
    );

    expect(balance.state).toEqual({
      fuelLoad: 45,
      fuelContinuity: 25,
      operationalAccess: 80,
      defensibility: 50,
      attackOpportunity: 66
    });
    expect(balance.calculation).toMatchObject({
      strategicModifier: 0,
      rawAttackOpportunity: 66,
      accessCriticalCapApplied: false
    });
    expect(session.status).toBe('completed');
    expect(session.crisisBranch).toBe('prepared');
    expect(session.result?.variant).toBe('contained');
    expect(session.progress.completedSceneIds).toEqual([
      'intro-briefing-mission',
      'prevention-inspection-territory-fuel',
      'prevention-inspection-housing-interface',
      'transition-summary-prevention',
      'crisis-decision-first-alert',
      'crisis-router-causal-map',
      'crisis-decision-emergency-fuel-break',
      'crisis-decision-ravine-fire',
      'crisis-decision-housing-defense',
      'ending-result-causal-report'
    ]);
    expect(report.variant).toBe('contained');
    expect(report.relations).toHaveLength(5);
    expect(report.relations.map(({ dimension }) => dimension)).toEqual([
      'fuelLoad',
      'fuelContinuity',
      'operationalAccess',
      'defensibility',
      'attackOpportunity'
    ]);
    expect(report.operationalResponse.map(({ actionId }) => actionId)).toEqual([
      'movilizar-y-verificar',
      ...OPERATIONAL_ACTIONS.prepared
    ]);
  });

  it('reproduces the vulnerable route, keeps its real improvements and explains overwhelmed', () => {
    const { session, balance, report } = playReference(
      'flow-overwhelmed',
      VULNERABLE_PREVENTION,
      'vulnerable'
    );

    expect(balance.state).toEqual({
      fuelLoad: 25,
      fuelContinuity: 35,
      operationalAccess: 20,
      defensibility: 30,
      attackOpportunity: 24
    });
    expect(balance.calculation).toMatchObject({
      strategicModifier: 10,
      rawAttackOpportunity: 55,
      accessCriticalCapApplied: true
    });
    expect(session.status).toBe('completed');
    expect(session.crisisBranch).toBe('vulnerable');
    expect(session.result?.variant).toBe('overwhelmed');
    expect(session.progress.completedSceneIds).toContain('crisis-decision-access-blockage');
    expect(session.progress.completedSceneIds).toContain('crisis-decision-crown-fire');
    expect(session.progress.completedSceneIds).not.toContain(
      'crisis-decision-emergency-fuel-break'
    );
    expect(report.variant).toBe('overwhelmed');
    expect(report.relations).toHaveLength(5);
    expect(report.relations[0].cause.execution).toBe('completed');
    expect(report.relations.find(({ id }) => id === 'operational-access')).toMatchObject({
      branchDecisive: true,
      cause: { execution: 'omitted' },
      manifestation: { sceneId: 'crisis-decision-access-blockage' }
    });
  });

  it('covers exactly the 12 official nodes across both converging routes', () => {
    const prepared = playReference('coverage-prepared', PREPARED_PREVENTION, 'prepared');
    const vulnerable = playReference('coverage-vulnerable', VULNERABLE_PREVENTION, 'vulnerable');
    const reached = new Set([
      ...prepared.session.progress.completedSceneIds,
      ...vulnerable.session.progress.completedSceneIds
    ]);

    expect([...reached].sort()).toEqual(VERTICAL_BETA_FLOW.map(({ id }) => id).sort());
    expect(prepared.session.progress.currentSceneId).toBe('ending-result-causal-report');
    expect(vulnerable.session.progress.currentSceneId).toBe('ending-result-causal-report');
  });

  it('routes automatically with separate dimensions and rejects inconsistent states', () => {
    expect(
      selectCrisisBranch({
        fuelLoad: 45,
        fuelContinuity: 25,
        operationalAccess: 80,
        defensibility: 50,
        attackOpportunity: 66
      }).branch
    ).toBe('prepared');
    expect(
      selectCrisisBranch({
        fuelLoad: 25,
        fuelContinuity: 35,
        operationalAccess: 20,
        defensibility: 30,
        attackOpportunity: 24
      }).branch
    ).toBe('vulnerable');
    expect(
      selectCrisisBranch({
        fuelLoad: 60,
        fuelContinuity: 50,
        operationalAccess: 49,
        defensibility: 49,
        attackOpportunity: 49
      }).branch
    ).toBe('vulnerable');
    expect(() =>
      selectCrisisBranch({
        fuelLoad: 45,
        fuelContinuity: 25,
        operationalAccess: 80,
        defensibility: 50
      })
    ).toThrowError(expect.objectContaining({ code: 'invalid-inherited-state' }));
    expect(() =>
      selectCrisisBranch({
        fuelLoad: 45,
        fuelContinuity: 25,
        operationalAccess: 80,
        defensibility: 50,
        attackOpportunity: 66,
        hiddenScore: 100
      })
    ).toThrowError(expect.objectContaining({ code: 'invalid-inherited-state' }));
  });

  it('exposes the briefing, balance, automatic router and both result variants declaratively', async () => {
    expect(VERTICAL_BETA_DECLARATIVE_CONTENT.map(({ id }) => id)).toEqual([
      'intro-briefing-mission',
      'transition-summary-prevention',
      'crisis-decision-first-alert',
      'crisis-router-causal-map',
      'ending-result-causal-report'
    ]);
    expect(Object.keys(VERTICAL_BETA_RESULT_VARIANTS)).toEqual(['contained', 'overwhelmed']);

    const app = buildApp();
    const response = await app.inject({ method: 'GET', url: '/game-content/data' });
    expect(response.statusCode).toBe(200);
    expect(response.json().verticalBetaFlowContent).toEqual(VERTICAL_BETA_DECLARATIVE_CONTENT);
    await app.close();
  });
});
