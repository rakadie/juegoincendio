import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const {
  closingReferences,
  closingReasonForProjectStatus,
  projectStatusForClosedReason,
} = require('../.github/scripts/project-status-sync.cjs') as {
  closingReferences: (body: string, owner: string, repo: string) => number[];
  closingReasonForProjectStatus: (status: string) => 'completed' | 'not_planned' | null;
  projectStatusForClosedReason: (reason: string) => 'done' | 'superseded';
};

describe('project status closing references', () => {
  it('extracts only references directly governed by closing keywords', () => {
    expect(closingReferences('Fixes #12; see #13\nResolves #14', 'rakadie', 'juegoincendio')).toEqual([
      12, 14,
    ]);
  });

  it('accepts explicitly qualified references to the current repository', () => {
    expect(
      closingReferences(
        'Closes rakadie/juegoincendio#21\nFixes RAKADIE/JUEGOINCENDIO#22',
        'rakadie',
        'juegoincendio',
      ),
    ).toEqual([21, 22]);
  });

  it('ignores closing references to other repositories', () => {
    expect(
      closingReferences(
        'Fixes other/repo#42\nCloses #7',
        'rakadie',
        'juegoincendio',
      ),
    ).toEqual([7]);
  });

  it('requires a closing keyword for every target', () => {
    expect(closingReferences('Fixes #1, #2 and #3', 'rakadie', 'juegoincendio')).toEqual([1]);
  });
});

describe('terminal status synchronization', () => {
  it('maps completed closures to Done', () => {
    expect(projectStatusForClosedReason('completed')).toBe('done');
  });

  it('maps discarded closures to Superseded', () => {
    expect(projectStatusForClosedReason('not_planned')).toBe('superseded');
    expect(projectStatusForClosedReason('duplicate')).toBe('superseded');
  });

  it('closes Done as completed and Superseded as not planned', () => {
    expect(closingReasonForProjectStatus('done')).toBe('completed');
    expect(closingReasonForProjectStatus('superseded')).toBe('not_planned');
  });

  it('does not close issues in non-terminal statuses', () => {
    expect(closingReasonForProjectStatus('backlog')).toBeNull();
    expect(closingReasonForProjectStatus('ready')).toBeNull();
    expect(closingReasonForProjectStatus('inProgress')).toBeNull();
    expect(closingReasonForProjectStatus('blocked')).toBeNull();
    expect(closingReasonForProjectStatus('review')).toBeNull();
  });
});
