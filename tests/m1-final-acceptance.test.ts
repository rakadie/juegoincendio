import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  CANONICAL_SCENE_IDS,
  CRISIS_BRANCHES,
  INHERITED_STATE_KEYS,
  RESULT_VARIANTS
} from './support/game-session-contract.js';
import {
  VERTICAL_BETA_CANONICAL_IDS,
  VERTICAL_BETA_NODE_TYPES
} from './support/vertical-beta-flow-example.js';

const ROOT = fileURLToPath(new URL('../', import.meta.url));

const NORMATIVE_SOURCES = [
  'docs/product/vertical-beta-1-catalog.md',
  'docs/product/vertical-beta-1-common-trunk.md',
  'docs/product/vertical-beta-1-crisis-branches.md',
  'docs/product/vertical-beta-1-graph-transitions.md',
  'docs/product/vertical-beta-1-graph-validation.md',
  'docs/architecture/decision-game-domain.md',
  'docs/domain/game-session-serialization.md',
  'docs/product/vertical-beta-1-causal-inventory.md',
  'docs/product/vertical-beta-1-causal-matrix.md',
  'docs/product/vertical-beta-1-causal-combinations-validation.md',
  'docs/product/vertical-beta-1-causal-report.md',
  'docs/product/vertical-beta-1-reference-common.md',
  'docs/product/vertical-beta-1-reference-prepared.md',
  'docs/product/vertical-beta-1-reference-vulnerable.md',
  'docs/product/vertical-beta-1-reference-comparison.md'
] as const;

const PREVENTION_ACTION_IDS = [
  'gestionar-restos-poda',
  'crear-discontinuidades-vegetales',
  'limpiar-margenes-caminos',
  'activar-pastoreo-preventivo',
  'evaluar-quema-tecnica',
  'podar-ramas-y-retirar-seco',
  'separar-copas',
  'despejar-accesos'
] as const;

const CRITERION_IDS = Array.from({ length: 7 }, (_, gateIndex) =>
  Array.from(
    { length: 5 },
    (_, criterionIndex) => `G${gateIndex + 1}-${String(criterionIndex + 1).padStart(2, '0')}`
  )
).flat();

const EVIDENCE_IDS = Array.from(
  { length: 15 },
  (_, index) => `EV-${String(index + 1).padStart(2, '0')}`
);

async function read(relativePath: string): Promise<string> {
  return readFile(`${ROOT}${relativePath}`, 'utf8');
}

function uniqueMatches(text: string, pattern: RegExp): string[] {
  return [...new Set([...text.matchAll(pattern)].map((match) => match[1]))];
}

describe('M1 final cross-audit', () => {
  it('has exactly 35 acceptance criteria and maps every one to evidence', async () => {
    const [gates, evidence] = await Promise.all([
      read('docs/project/m1-acceptance-gates.md'),
      read('docs/project/m1-acceptance-evidence.md')
    ]);

    expect(uniqueMatches(gates, /\| `(G[1-7]-0[1-5])` \|/g).sort()).toEqual(
      [...CRITERION_IDS].sort()
    );
    expect(uniqueMatches(evidence, /\| `(G[1-7]-0[1-5])` \|/g).sort()).toEqual(
      [...CRITERION_IDS].sort()
    );
    expect((evidence.match(/\| `m1-blocker` \| `not-evaluated` \|/g) ?? [])).toHaveLength(35);
  });

  it('keeps all 15 evidence packages available as one explicit source set', async () => {
    const evidence = await read('docs/project/m1-acceptance-evidence.md');
    const cataloguedEvidenceIds = uniqueMatches(evidence, /\| `(EV-\d{2})-[A-Z0-9-]+` \|/g);

    expect(cataloguedEvidenceIds.sort()).toEqual([...EVIDENCE_IDS].sort());
    expect(new Set(NORMATIVE_SOURCES).size).toBe(NORMATIVE_SOURCES.length);
    await Promise.all(NORMATIVE_SOURCES.map((source) => access(`${ROOT}${source}`)));
  });

  it('aligns canonical counts, IDs, branches, results and prevention actions', async () => {
    const [catalog, inventory] = await Promise.all([
      read('docs/product/vertical-beta-1-catalog.md'),
      read('docs/product/vertical-beta-1-causal-inventory.md')
    ]);

    expect(VERTICAL_BETA_CANONICAL_IDS).toEqual(CANONICAL_SCENE_IDS);
    expect(CANONICAL_SCENE_IDS).toHaveLength(12);
    expect(VERTICAL_BETA_NODE_TYPES).toHaveLength(6);
    expect(INHERITED_STATE_KEYS).toHaveLength(5);
    expect(CRISIS_BRANCHES).toEqual(['prepared', 'vulnerable']);
    expect(RESULT_VARIANTS).toEqual(['contained', 'overwhelmed']);

    for (const sceneId of CANONICAL_SCENE_IDS) expect(catalog).toContain(`\`${sceneId}\``);
    for (const actionId of PREVENTION_ACTION_IDS) expect(inventory).toContain(`\`${actionId}\``);
    for (const combinationId of ['C-01', 'C-02', 'C-03', 'C-04', 'C-05']) {
      expect(inventory + (await read('docs/product/vertical-beta-1-causal-combinations-validation.md'))).toContain(
        combinationId
      );
    }
  });

  it('defines strict i18n coverage and keeps M1 specification separate from M2 runtime work', async () => {
    const [catalog, report] = await Promise.all([
      read('docs/product/vertical-beta-1-catalog.md'),
      read('docs/product/vertical-beta-1-causal-report.md')
    ]);

    expect(catalog).toContain('los 12 nodos oficiales que contienen texto');
    expect(catalog).toContain('no debe aceptar fallback silencioso');
    expect(catalog).toContain('La validación debe fallar');
    expect(report).toContain('messageKeys');
    expect(report).toContain('summaryKey');
    expect(report).toContain('closingKey');

    for (let issue = 68; issue <= 76; issue += 1) expect(catalog).toContain(`#${issue}`);
    expect(catalog).toContain('fuera de `Ready` hasta que M1 complete sus puertas estructurales');
  });

  it('keeps the reference games on one context and opposite deterministic outcomes', async () => {
    const [context, prepared, vulnerable] = await Promise.all([
      read('tests/fixtures/game-session/reference-context.json'),
      read('tests/fixtures/game-session/reference-contained.json'),
      read('tests/fixtures/game-session/reference-overwhelmed.json')
    ]).then((values) => values.map((value) => JSON.parse(value) as Record<string, any>));

    expect(context.randomness).toBe('none');
    expect(context.referenceContextId).toBe('vb1-reference-context-v1');
    expect(prepared.crisisBranch).toBe('prepared');
    expect(prepared.result.variant).toBe('contained');
    expect(vulnerable.crisisBranch).toBe('vulnerable');
    expect(vulnerable.result.variant).toBe('overwhelmed');

    const changedDimensions = INHERITED_STATE_KEYS.filter(
      (key) => prepared.inheritedState[key] !== vulnerable.inheritedState[key]
    );
    expect(changedDimensions).toHaveLength(5);
    expect(prepared.decisions[5].actionId).toBe(vulnerable.decisions[5].actionId);
    expect(prepared.decisions[7].actionId).toBe(vulnerable.decisions[7].actionId);
  });

  it('records every result against the frozen baseline without issuing M2 authorization', async () => {
    const report = await read('docs/project/m1-final-acceptance.md');
    const passedCriterionIds = uniqueMatches(
      report,
      /\| `(G[1-7]-0[1-5])` \|[^\n]+\| `pass` \|/g
    );
    const manifestEvidenceIds = uniqueMatches(report, /\| `(EV-\d{2})-[A-Z0-9-]+` \|/g);

    expect(passedCriterionIds.sort()).toEqual([...CRITERION_IDS].sort());
    expect(manifestEvidenceIds.sort()).toEqual([...EVIDENCE_IDS].sort());
    expect(report).toContain('8ef0916331f0fb0fac5169d74d68ec30dd41e3ff');
    expect(report).toContain('M1 criteria: PASS');
    expect(report).toContain('M2 readiness: WAITING-EVIDENCE');
    expect(report).toContain('M2 authorization: NOT ISSUED');
  });
});
