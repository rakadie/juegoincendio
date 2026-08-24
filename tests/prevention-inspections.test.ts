import { describe, expect, it } from 'vitest';
import { CAMPAIGN_CONTENT } from '../src/content/campaign.js';
import {
  OFFICIAL_PREVENTION_INSPECTIONS,
  PREVENTION_INSPECTION_HOUSING_INTERFACE,
  PREVENTION_INSPECTION_TERRITORY_FUEL,
  type PreventionInheritedStateImpact
} from '../src/content/official-prevention-inspections.js';
import { VERTICAL_BETA_FLOW } from '../src/content/vertical-beta-catalog.js';
import {
  createGameSession,
  executeGameSessionCommand
} from '../src/domain/game-session/game-session-engine.js';
import type { GameSession } from '../src/domain/game-session/game-session.js';
import {
  applyPreventionInspectionAction,
  completePreventionInspection
} from '../src/domain/prevention/prevention-inspection-engine.js';

const TERRITORY_ACTION_IDS = [
  'gestionar-restos-poda',
  'crear-discontinuidades-vegetales',
  'limpiar-margenes-caminos',
  'activar-pastoreo-preventivo',
  'evaluar-quema-tecnica'
];

const HOUSING_ACTION_IDS = [
  'podar-ramas-y-retirar-seco',
  'separar-copas',
  'despejar-accesos'
];

function startTerritoryInspection(id: string): GameSession {
  const initial = createGameSession(id);
  const briefingCompleted = executeGameSessionCommand(initial, {
    type: 'complete-scene',
    sceneId: 'intro-briefing-mission',
    evidenceIds: []
  });
  return executeGameSessionCommand(briefingCompleted, {
    type: 'transition-scene',
    toSceneId: 'prevention-inspection-territory-fuel'
  });
}

function applyActions(session: GameSession, actionIds: readonly string[]): GameSession {
  return actionIds.reduce(applyPreventionInspectionAction, session);
}

function addImpacts(
  first: PreventionInheritedStateImpact,
  second: PreventionInheritedStateImpact
): PreventionInheritedStateImpact {
  const result: Record<string, number> = {};
  for (const [key, value] of [...Object.entries(first), ...Object.entries(second)]) {
    result[key] = (result[key] ?? 0) + value;
  }
  return result as PreventionInheritedStateImpact;
}

describe('official prevention inspection catalog', () => {
  it('publishes exactly the two canonical inspections with quotas 3/5 and 2/3', () => {
    expect(OFFICIAL_PREVENTION_INSPECTIONS.map(({ id }) => id)).toEqual([
      'prevention-inspection-territory-fuel',
      'prevention-inspection-housing-interface'
    ]);
    expect(PREVENTION_INSPECTION_TERRITORY_FUEL.maxActions).toBe(3);
    expect(PREVENTION_INSPECTION_TERRITORY_FUEL.hotspots.map(({ action }) => action.id)).toEqual(
      TERRITORY_ACTION_IDS
    );
    expect(PREVENTION_INSPECTION_HOUSING_INTERFACE.maxActions).toBe(2);
    expect(PREVENTION_INSPECTION_HOUSING_INTERFACE.hotspots.map(({ action }) => action.id)).toEqual(
      HOUSING_ACTION_IDS
    );
  });

  it('gives every action an inherited impact or explicit strategic evidence', () => {
    for (const inspection of OFFICIAL_PREVENTION_INSPECTIONS) {
      expect(inspection.combos).toEqual([]);
      for (const { action, flagIfIgnored } of inspection.hotspots) {
        expect(
          Object.keys(action.inheritedStateImpact).length > 0 || action.evidenceIds.length > 0
        ).toBe(true);
        expect(action.evidenceIds.length).toBeGreaterThan(0);
        expect(flagIfIgnored).toMatch(/^[a-z][a-z-]+$/);
      }
    }
  });

  it('keeps p-003 and excluded actions outside the executable payload', () => {
    const payload = JSON.stringify(CAMPAIGN_CONTENT);
    expect(CAMPAIGN_CONTENT.preventionInspections).toHaveLength(2);
    expect(CAMPAIGN_CONTENT.preventionBalance.indicators.map(({ id }) => id)).toEqual([
      'defensibilidad-viviendas',
      'gestion-combustible',
      'riesgo-ignicion'
    ]);
    expect(payload).not.toMatch(
      /p-003|limpiar-canalones|mallas-matachispas|preparar-edificio-publico|recomendar-vegetacion-discontinua|regular-quemas-agricolas/
    );
  });

  it('uses the canonical inspection IDs as GameScene content references', () => {
    const refs = VERTICAL_BETA_FLOW
      .filter(({ type }) => type === 'inspection')
      .map(({ contentRef }) => contentRef);
    expect(refs).toEqual([
      'inspection:prevention-inspection-territory-fuel',
      'inspection:prevention-inspection-housing-interface'
    ]);
  });
});

describe('prevention inspection GameSession service', () => {
  it('records the prepared choices, impacts, evidence and omitted conditions', () => {
    let session = startTerritoryInspection('prepared-minimal');
    session = applyActions(session, TERRITORY_ACTION_IDS.slice(0, 3));

    expect(() => applyPreventionInspectionAction(session, 'activar-pastoreo-preventivo')).toThrowError(
      expect.objectContaining({ code: 'inspection-quota-reached' })
    );

    const territory = completePreventionInspection(session);
    expect(territory.inheritedStateImpact).toEqual({
      fuelLoad: -20,
      fuelContinuity: -40,
      defensibility: 10,
      operationalAccess: 30
    });
    expect(territory.omittedConditionIds).toEqual([
      'fine-fuel-accumulated-in-priority-strips',
      'strategic-area-without-assessed-line'
    ]);

    session = executeGameSessionCommand(territory.session, {
      type: 'transition-scene',
      toSceneId: 'prevention-inspection-housing-interface'
    });
    session = applyActions(session, [
      'podar-ramas-y-retirar-seco',
      'despejar-accesos'
    ]);
    const housing = completePreventionInspection(session);

    expect(addImpacts(territory.inheritedStateImpact, housing.inheritedStateImpact)).toEqual({
      fuelLoad: -30,
      fuelContinuity: -60,
      defensibility: 30,
      operationalAccess: 60
    });
    expect(housing.omittedConditionIds).toEqual(['crown-fuel-continuity-present']);
    expect(housing.session.decisions).toHaveLength(5);
    expect(housing.session.history.at(-1)).toEqual(
      expect.objectContaining({
        type: 'scene-completed',
        sceneId: 'prevention-inspection-housing-interface',
        evidenceIds: expect.arrayContaining([
          'vertical-fuel-continuity-reduced',
          'fire-engine-access-cleared',
          'crown-fuel-continuity-present'
        ])
      })
    );
  });

  it('reproduces the vulnerable direct impacts and strategic evidence', () => {
    let session = startTerritoryInspection('vulnerable-minimal');
    session = applyActions(session, [
      'gestionar-restos-poda',
      'activar-pastoreo-preventivo',
      'evaluar-quema-tecnica'
    ]);
    const territory = completePreventionInspection(session);
    expect(territory.evidenceIds).toContain('professional-line-assessed');

    session = executeGameSessionCommand(territory.session, {
      type: 'transition-scene',
      toSceneId: 'prevention-inspection-housing-interface'
    });
    session = applyActions(session, ['podar-ramas-y-retirar-seco', 'separar-copas']);
    const housing = completePreventionInspection(session);

    expect(addImpacts(territory.inheritedStateImpact, housing.inheritedStateImpact)).toEqual({
      fuelLoad: -50,
      fuelContinuity: -50,
      defensibility: 10
    });
    expect([...territory.omittedConditionIds, ...housing.omittedConditionIds]).toEqual([
      'territorial-vegetation-continuity-present',
      'rural-road-margins-obstructed',
      'fire-engine-access-obstructed'
    ]);
  });

  it('rejects excluded actions and incomplete inspections', () => {
    const session = startTerritoryInspection('invalid-minimal');
    expect(() => applyPreventionInspectionAction(session, 'regular-quemas-agricolas')).toThrowError(
      expect.objectContaining({ code: 'invalid-inspection-action' })
    );
    expect(() => completePreventionInspection(session)).toThrowError(
      expect.objectContaining({ code: 'inspection-quota-incomplete' })
    );
  });
});
