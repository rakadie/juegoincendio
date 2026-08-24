import { describe, expect, it } from 'vitest';
import type { CanonicalSceneId, CrisisBranch } from '../src/domain/types/game-scene.js';
import {
  transitionAppliesToBranch,
  VERTICAL_BETA_CANONICAL_IDS,
  VERTICAL_BETA_ENTRY_ID,
  VERTICAL_BETA_FLOW,
  VERTICAL_BETA_NODE_TYPES,
  VERTICAL_BETA_TERMINAL_ID,
  type VerticalBetaTransition
} from '../src/content/vertical-beta-catalog.js';

const nodesById = new Map(VERTICAL_BETA_FLOW.map((node) => [node.id, node]));

function outgoing(id: CanonicalSceneId): readonly VerticalBetaTransition[] {
  return nodesById.get(id)?.transitions ?? [];
}

function reachableFrom(start: CanonicalSceneId): Set<CanonicalSceneId> {
  const visited = new Set<CanonicalSceneId>();
  const pending: CanonicalSceneId[] = [start];

  while (pending.length > 0) {
    const current = pending.pop();
    if (current === undefined || visited.has(current)) continue;
    visited.add(current);
    for (const transition of outgoing(current)) pending.push(transition.target);
  }

  return visited;
}

function hasCycle(): boolean {
  const active = new Set<CanonicalSceneId>();
  const finished = new Set<CanonicalSceneId>();

  const visit = (id: CanonicalSceneId): boolean => {
    if (active.has(id)) return true;
    if (finished.has(id)) return false;

    active.add(id);
    for (const transition of outgoing(id)) {
      if (visit(transition.target)) return true;
    }
    active.delete(id);
    finished.add(id);
    return false;
  };

  return VERTICAL_BETA_FLOW.some((node) => visit(node.id));
}

function pathForBranch(branch: CrisisBranch): CanonicalSceneId[] {
  const path: CanonicalSceneId[] = ['crisis-router-causal-map'];
  const visited = new Set(path);

  while (path.at(-1) !== VERTICAL_BETA_TERMINAL_ID) {
    const current = path.at(-1);
    if (current === undefined) throw new Error('Branch path has no current node.');

    const candidates = outgoing(current).filter((transition) =>
      transitionAppliesToBranch(transition.predicate, branch)
    );
    if (candidates.length !== 1) {
      throw new Error(`${current} has ${candidates.length} transitions for ${branch}.`);
    }

    const next = candidates[0].target;
    if (visited.has(next)) throw new Error(`Cycle found while resolving ${branch}.`);
    visited.add(next);
    path.push(next);
  }

  return path;
}

describe('Vertical Beta 1 declarative graph integrity', () => {
  it('contains the exact canonical nodes, types, references and variants', () => {
    const ids = VERTICAL_BETA_FLOW.map((node) => node.id);
    const types = new Set(VERTICAL_BETA_FLOW.map((node) => node.type));
    const contentRefs = VERTICAL_BETA_FLOW.map((node) => node.contentRef);
    const serialized = JSON.stringify(VERTICAL_BETA_FLOW);

    expect(ids).toEqual(VERTICAL_BETA_CANONICAL_IDS);
    expect(new Set(ids).size).toBe(12);
    expect(types).toEqual(new Set(VERTICAL_BETA_NODE_TYPES));
    expect(new Set(contentRefs).size).toBe(12);
    expect(serialized).not.toMatch(/comunicaci[oó]n|evacuaci[oó]n|p-003|invierno_|verano_|resultado-beta/i);

    const resultNodes = VERTICAL_BETA_FLOW.filter((node) => node.type === 'result');
    expect(resultNodes).toHaveLength(1);
    expect(resultNodes[0].id).toBe(VERTICAL_BETA_TERMINAL_ID);
    expect(resultNodes[0].resultVariants).toEqual(['contained', 'overwhelmed']);
    expect(ids).not.toContain('contained');
    expect(ids).not.toContain('overwhelmed');
  });

  it('has valid references, one entry, one terminal and thirteen unique edges', () => {
    const indegree = new Map(VERTICAL_BETA_FLOW.map((node) => [node.id, 0]));
    const edgeKeys: string[] = [];

    for (const node of VERTICAL_BETA_FLOW) {
      for (const transition of node.transitions) {
        expect(nodesById.has(transition.target)).toBe(true);
        indegree.set(transition.target, (indegree.get(transition.target) ?? 0) + 1);
        edgeKeys.push(`${node.id}->${transition.target}`);
      }
    }

    const entries = VERTICAL_BETA_FLOW.filter((node) => indegree.get(node.id) === 0);
    const terminals = VERTICAL_BETA_FLOW.filter((node) => node.transitions.length === 0);

    expect(entries.map((node) => node.id)).toEqual([VERTICAL_BETA_ENTRY_ID]);
    expect(terminals.map((node) => node.id)).toEqual([VERTICAL_BETA_TERMINAL_ID]);
    expect(edgeKeys).toHaveLength(13);
    expect(new Set(edgeKeys).size).toBe(13);
  });

  it('has no orphan nodes, dead routes or cycles', () => {
    const reachable = reachableFrom(VERTICAL_BETA_ENTRY_ID);
    expect(reachable).toEqual(new Set(VERTICAL_BETA_CANONICAL_IDS));
    expect(hasCycle()).toBe(false);

    for (const node of VERTICAL_BETA_FLOW) {
      expect(reachableFrom(node.id).has(VERTICAL_BETA_TERMINAL_ID)).toBe(true);
    }
  });

  it('keeps one shared ravine and resolves exactly one path per branch', () => {
    const ravineNodes = VERTICAL_BETA_FLOW.filter(
      (node) => node.id === 'crisis-decision-ravine-fire'
    );
    const ravinePredecessors = VERTICAL_BETA_FLOW.filter((node) =>
      node.transitions.some((transition) => transition.target === 'crisis-decision-ravine-fire')
    ).map((node) => node.id);

    expect(ravineNodes).toHaveLength(1);
    expect(ravinePredecessors).toEqual([
      'crisis-decision-emergency-fuel-break',
      'crisis-decision-access-blockage'
    ]);

    expect(pathForBranch('prepared')).toEqual([
      'crisis-router-causal-map',
      'crisis-decision-emergency-fuel-break',
      'crisis-decision-ravine-fire',
      'crisis-decision-housing-defense',
      'ending-result-causal-report'
    ]);
    expect(pathForBranch('vulnerable')).toEqual([
      'crisis-router-causal-map',
      'crisis-decision-access-blockage',
      'crisis-decision-ravine-fire',
      'crisis-decision-crown-fire',
      'ending-result-causal-report'
    ]);
  });
});
