import { describe, expect, it } from 'vitest';
import { VerticalBetaApplicationService } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { presentSceneVisualModel } from '../src/application/vertical-beta/vertical-beta-visual-presenter.js';
import { renderSceneArtDefs } from '../src/interfaces/http/scene-art-kit.js';
import { renderSceneVisual } from '../src/interfaces/http/scene-visual-renderer.js';

function territory(service: VerticalBetaApplicationService, id: string): string {
  return renderSceneVisual(presentSceneVisualModel(service.view(id).session));
}

describe('M5.2 territory north-star art direction', () => {
  it('anchors the five official treatments to the same territory scene', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'm5-territory-initial';
    service.create(id);
    service.advance(id);

    const markup = territory(service, id);
    for (const semanticId of [
      'territory-residues',
      'territory-continuity',
      'territory-road',
      'territory-grazing',
      'territory-professional-line'
    ]) {
      expect(markup).toContain(`id="${semanticId}"`);
    }
    expect(markup).toContain('id="m5-hotspot-marker"');
    expect(markup).toContain('id="m5-grazed-pattern"');
    expect(markup).toContain('id="m5-dense-fuel-pattern"');
    expect(markup).toContain('state-constrained');
    expect(markup).toContain('state-continuous');
    expect(markup).toContain('state-unevaluated');
  });

  it('changes treated objects through the same presenter-driven state classes', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'm5-territory-treated';
    service.create(id);
    service.advance(id);

    service.applyAction(id, 'gestionar-restos-poda');
    service.applyAction(id, 'crear-discontinuidades-vegetales');
    service.applyAction(id, 'limpiar-margenes-caminos');

    const markup = territory(service, id);
    expect(markup).toContain('id="territory-residues" class="visual-hotspot state-treated"');
    expect(markup).toContain('id="territory-continuity" class="visual-hotspot state-broken"');
    expect(markup).toContain('id="territory-road" class="visual-hotspot state-clear"');
    expect(markup).toContain('data-focus-action-id="gestionar-restos-poda"');
    expect(markup).toContain('data-focus-action-id="crear-discontinuidades-vegetales"');
    expect(markup).toContain('data-focus-action-id="limpiar-margenes-caminos"');
  });

  it('defines structural as well as material differences for every territory treatment family', () => {
    const defs = renderSceneArtDefs();
    expect(defs).toContain('#territory-road.state-clear .visual-road');
    expect(defs).toContain('#territory-road.state-constrained .visual-road');
    expect(defs).toContain('#territory-continuity.state-broken .visual-vegetation-band');
    expect(defs).toContain('#territory-residues.state-treated .visual-residues');
    expect(defs).toContain('#territory-grazing.state-treated .visual-grazing');
    expect(defs).toContain('#territory-professional-line.state-evaluated .visual-professional-line');
  });
});
