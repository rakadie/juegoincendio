import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { renderPrototypePage } from '../src/interfaces/http/prototype-page.js';

const ROOT = fileURLToPath(new URL('../', import.meta.url));

describe('M3.8 north-star interface', () => {
  it('uses the approved four-stage journey instead of the legacy dominant sidebar', () => {
    const html = renderPrototypePage();

    expect(html).toContain('class="northstar-shell"');
    expect(html).toContain('data-stage-id="territory"');
    expect(html).toContain('data-stage-id="housing"');
    expect(html).toContain('data-stage-id="crisis"');
    expect(html).toContain('data-stage-id="result"');
    expect(html).toContain("stage.setAttribute('aria-current', 'step')");
    expect(html).toContain('class="session-footer"');
    expect(html).not.toContain('<aside>');
  });

  it('keeps inspections visual-first and exposes the official selection quota', () => {
    const html = renderPrototypePage();

    expect(html).toContain('class="selection-counter"');
    expect(html).toContain('Acciones seleccionadas');
    expect(html).toContain('visualMarkup() + actionCards(scene)');
    expect(html).toContain('data-action-id');
  });

  it('shows only the current crisis branch and gives result state and causality separate hierarchy', () => {
    const html = renderPrototypePage();

    expect(html).toContain("branch === 'prepared' ? 'Preparado' : 'Vulnerable'");
    expect(html).toContain('class="result-layout"');
    expect(html).toContain('Cadena causal principal');
    expect(html).toContain('Estado heredado');
    expect(html).not.toContain('prepared-vs-vulnerable');
    expect(html).not.toContain('Estado preparado</');
    expect(html).not.toContain('Estado vulnerable</');
  });

  it('uses user-facing Spanish labels instead of leaking internal scene and branch enums', () => {
    const html = renderPrototypePage();

    expect(html).toContain("briefing: 'Misión'");
    expect(html).toContain("inspection: 'Inspección'");
    expect(html).toContain("prepared: 'preparada'");
    expect(html).toContain("vulnerable: 'vulnerable'");
    expect(html).toContain("'Ruta ' + (BRANCH_LABELS[session.branch] || session.branch)");
  });

  it('keeps the implementation minimal and accessible', async () => {
    const [pageSource, packageJson] = await Promise.all([
      readFile(`${ROOT}src/interfaces/http/prototype-page.ts`, 'utf8'),
      readFile(`${ROOT}package.json`, 'utf8')
    ]);

    expect(pageSource).toContain('prefers-reduced-motion');
    expect(pageSource).toContain("document.querySelectorAll('.action-button')");
    expect(pageSource).toContain("card.setAttribute('tabindex', '-1')");
    expect(pageSource).not.toContain('selectCrisisBranch');
    expect(pageSource).not.toContain('calculatePreventionBalance');
    expect(packageJson).not.toMatch(/react|next|maplibre|pixi|konva|phaser/i);
  });
});
