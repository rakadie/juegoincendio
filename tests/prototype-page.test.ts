import { describe, expect, it } from 'vitest';
import { FIRST_ALERT_SCENARIO } from '../src/content/prevention-balance.js';
import { renderPrototypePage } from '../src/interfaces/http/prototype-page.js';

function sectionHtml(html: string, sectionId: string): string {
  const start = html.indexOf(`id="${sectionId}"`);
  const end = html.indexOf('</section>', start);

  return html.slice(start, end);
}

describe('product experience shell', () => {
  it('presents one primary start action without internal tooling', () => {
    const html = renderPrototypePage();
    const briefing = sectionHtml(html, 'screen-briefing');

    expect(briefing.match(/class="primary"/g)).toHaveLength(1);
    expect(briefing).toContain('Comenzar la prevención');
    expect(html).not.toContain('Panel de contenido técnico');
    expect(html).not.toContain('JSON de incendios activos');
    expect(html).not.toContain('API: comprobando');
    expect(html).not.toContain('Bitácora operativa');
  });

  it('keeps complete context available through an accessible dialog', () => {
    const html = renderPrototypePage();

    expect(html).toContain('aria-controls="context-dialog"');
    expect(html).toContain('<dialog class="context-dialog" id="context-dialog"');
    expect(html).toContain('aria-label="Cerrar contexto"');
    expect(html).toContain("{ title: 'Situación', text: screen.context }");
    expect(html).toContain("{ title: 'Criterio operativo', text: scenario.briefing }");
  });
});

describe('first alert content layers', () => {
  it('provides concise reviewed summaries while preserving complete option text', () => {
    FIRST_ALERT_SCENARIO.options.forEach((option) => {
      expect(option.shortLabel).toBeTruthy();
      expect(option.shortLabel!.length).toBeLessThanOrEqual(32);
      expect(option.summary).toBeTruthy();
      expect(option.summary!.length).toBeLessThanOrEqual(140);
      expect(option.text.length).toBeGreaterThan(option.summary!.length);
    });
  });
});
