import { describe, expect, it } from 'vitest';
import { renderPrototypePage } from '../src/interfaces/http/prototype-page.js';

describe('motor-backed product experience shell', () => {
  it('starts one session through the application API and keeps one primary mission action', () => {
    const html = renderPrototypePage();

    expect(html).toContain("request('/api/game-sessions', { method: 'POST'");
    expect(html).toContain('data-action-id');
    expect(html).toContain('id="advance-button"');
    expect(html).toContain('Misión municipal');
    expect(html).not.toContain('Panel de contenido técnico');
    expect(html).not.toContain('Bitácora operativa');
  });

  it('has an exhaustive renderer for the six official scene types', () => {
    const html = renderPrototypePage();

    expect(html).toContain('briefing: renderBriefing');
    expect(html).toContain('inspection: renderInspection');
    expect(html).toContain('summary: renderSummary');
    expect(html).toContain('decision: renderDecision');
    expect(html).toContain('router: renderRouter');
    expect(html).toContain('result: renderResult');
  });

  it('does not retain causal calculations or the parallel campaign state in the view', () => {
    const html = renderPrototypePage();
    const forbidden = [
      'aggregateInspectionMetrics',
      'chooseBalanceOutcome',
      'crisisRouteState',
      'activeCrisisRoute',
      'preventionPreparednessScore',
      'chooseCrisisOutcome',
      'applySummerFireModel',
      'finalizeCampaignResult',
      'resultado-beta',
      'ruta-comunicacion',
      'buildInitialState'
    ];

    forbidden.forEach((term) => expect(html).not.toContain(term));
    expect(html).toContain('let currentView = null');
    expect(html).not.toContain('let state =');
  });
});
