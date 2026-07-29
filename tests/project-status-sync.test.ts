import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const { closingReferences } = require('../.github/scripts/project-status-sync.cjs') as {
  closingReferences: (body: string, owner: string, repo: string) => number[];
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
