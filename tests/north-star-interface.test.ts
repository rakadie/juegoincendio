import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { renderPrototypePage } from '../src/interfaces/http/prototype-page.js';

const ROOT = fileURLToPath(new URL('../', import.meta.url));

function relativeLuminance(hex: string): number {
  const channels = hex
    .replace('#', '')
    .match(/.{2}/g)!
    .map((value) => Number.parseInt(value, 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    );
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (left, right) => right - left
  );
  return (lighter! + 0.05) / (darker! + 0.05);
}

describe('M3.8 north-star interface', () => {
  it('uses the approved four-stage journey instead of the legacy dominant sidebar', () => {
    const html = renderPrototypePage();

    expect(html).toContain('class="northstar-shell"');
    for (const stage of ['territory', 'housing', 'crisis', 'result']) {
      expect(html).toContain(`data-stage-id="${stage}"`);
    }
    expect(html).toContain("stage.setAttribute('aria-current', 'step')");
    expect(html).toContain('class="session-footer"');
    expect(html).not.toContain('<aside>');
  });

  it('keeps inspections visual-first and exposes the official selection quota', () => {
    const html = renderPrototypePage();

    expect(html).toContain('class="selection-counter"');
    expect(html).toContain('Acciones seleccionadas');
    expect(html).toContain('function visualMarkup()');
    expect(html).toContain('function actionCards(scene)');
    expect(html).toContain('data-action-id');
  });

  it('shows only the current crisis branch and gives result state and causality separate hierarchy', () => {
    const html = renderPrototypePage();

    expect(html).toContain("? 'Preparado' : 'Vulnerable'");
    expect(html).toContain('class="result-layout"');
    expect(html).toContain('Cadena causal principal');
    expect(html).toContain('Estado heredado');
    expect(html).not.toContain('prepared-vs-vulnerable');
    expect(html).not.toContain('Estado preparado</');
    expect(html).not.toContain('Estado vulnerable</');
  });

  it('derives journey stages from the visual presenter contract instead of canonical scene IDs', () => {
    const html = renderPrototypePage();

    expect(html).toContain('STAGE_BY_VISUAL_TEMPLATE');
    expect(html).toContain('currentView.visual.templateId');
    expect(html).not.toContain('function stageForScene');
    expect(html).not.toContain("sceneId === 'prevention-inspection-housing-interface'");
  });

  it('uses the route contract for progress instead of a hard-coded node multiplier', () => {
    const html = renderPrototypePage();

    expect(html).toContain('expectedVisitedNodeCount');
    expect(html).toContain("' de ' + total + ' pasos completados'");
    expect(html).toContain("setAttribute('aria-valuenow', String(progress))");
    expect(html).not.toContain('completedSceneIds.length * 10');
  });

  it('preserves the four journey labels on narrow screens', () => {
    const html = renderPrototypePage();
    const mobileSection = html.slice(html.indexOf('@media (max-width: 700px)'));

    expect(mobileSection).toContain('grid-template-columns: 1fr');
    expect(mobileSection).toContain('white-space: normal');
    for (const label of ['Territorio', 'Vivienda', 'Crisis', 'Resultado']) {
      expect(html).toContain(`>${label}</span>`);
    }
  });

  it('meets text contrast for the primary action color', () => {
    const html = renderPrototypePage();
    const primaryAction = html.match(/--primary-action:\s*(#[0-9a-fA-F]{6})/)?.[1];

    expect(primaryAction).toBeDefined();
    expect(contrastRatio('#ffffff', primaryAction!)).toBeGreaterThanOrEqual(4.5);
    expect(html).toContain('background: var(--primary-action)');
  });

  it('uses user-facing Spanish labels instead of leaking internal scene and branch enums', () => {
    const html = renderPrototypePage();

    expect(html).toContain("briefing: 'Misión'");
    expect(html).toContain("inspection: 'Inspección'");
    expect(html).toContain("prepared: 'preparada'");
    expect(html).toContain("vulnerable: 'vulnerable'");
    expect(html).toContain('BRANCH_LABELS[session.branch]');
  });

  it('keeps the implementation minimal and accessible', async () => {
    const [pageSource, packageSource] = await Promise.all([
      readFile(`${ROOT}src/interfaces/http/prototype-page.ts`, 'utf8'),
      readFile(`${ROOT}package.json`, 'utf8')
    ]);
    const packageJson = JSON.parse(packageSource) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const dependencyNames = new Set([
      ...Object.keys(packageJson.dependencies ?? {}),
      ...Object.keys(packageJson.devDependencies ?? {})
    ]);

    expect(pageSource).toContain('prefers-reduced-motion');
    expect(pageSource).toContain("document.querySelectorAll('.action-button')");
    expect(pageSource).toContain("card.setAttribute('tabindex', '-1')");
    expect(pageSource).not.toContain('selectCrisisBranch');
    expect(pageSource).not.toContain('calculatePreventionBalance');

    for (const forbidden of ['react', 'next', 'maplibre', 'pixi', 'konva', 'phaser']) {
      expect(dependencyNames.has(forbidden)).toBe(false);
    }
  });
});
