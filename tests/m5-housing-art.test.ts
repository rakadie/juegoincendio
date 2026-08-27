import { describe, expect, it } from 'vitest';
import { VerticalBetaApplicationService } from '../src/application/vertical-beta/vertical-beta-application-service.js';
import { presentSceneVisualModel } from '../src/application/vertical-beta/vertical-beta-visual-presenter.js';
import { renderSceneArtDefs } from '../src/interfaces/http/scene-art-kit.js';
import { renderSceneVisual } from '../src/interfaces/http/scene-visual-renderer.js';

function reachHousing(service: VerticalBetaApplicationService, id: string): void {
  service.create(id);
  service.advance(id);
  ['gestionar-restos-poda', 'crear-discontinuidades-vegetales', 'limpiar-margenes-caminos'].forEach(
    (actionId) => service.applyAction(id, actionId)
  );
  service.advance(id);
}

function markup(service: VerticalBetaApplicationService, id: string): string {
  return renderSceneVisual(presentSceneVisualModel(service.view(id).session));
}

describe('M5.3 housing and interface art direction', () => {
  it('keeps one conditioned house with three official treatment zones', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'm5-housing-initial';
    reachHousing(service, id);

    const html = markup(service, id);
    expect(html).toContain('id="housing-home" class="state-conditioned"');
    expect(html).toContain('id="housing-vertical-fuel" class="visual-hotspot state-continuous"');
    expect(html).toContain('id="housing-canopy" class="visual-hotspot state-continuous"');
    expect(html).toContain('id="housing-local-access" class="visual-hotspot state-blocked"');
    expect(html).toContain('data-focus-action-id="podar-ramas-y-retirar-seco"');
    expect(html).toContain('data-focus-action-id="separar-copas"');
    expect(html).toContain('data-focus-action-id="despejar-accesos"');
  });

  it('changes the physical treatment state while the house remains conditioned', () => {
    const service = new VerticalBetaApplicationService();
    const id = 'm5-housing-treated';
    reachHousing(service, id);

    service.applyAction(id, 'separar-copas');
    service.applyAction(id, 'despejar-accesos');

    const html = markup(service, id);
    expect(html).toContain('id="housing-home" class="state-conditioned"');
    expect(html).toContain('id="housing-canopy" class="visual-hotspot state-broken"');
    expect(html).toContain('id="housing-local-access" class="visual-hotspot state-clear"');
  });

  it('defines geometric and material differences for vertical fuel, canopy and access', () => {
    const defs = renderSceneArtDefs();
    expect(defs).toContain('#housing-vertical-fuel.state-continuous .visual-branches');
    expect(defs).toContain('#housing-vertical-fuel.state-reduced .visual-branches');
    expect(defs).toContain('#housing-canopy.state-continuous .visual-canopy');
    expect(defs).toContain('#housing-canopy.state-broken .visual-canopy');
    expect(defs).toContain('#housing-local-access.state-clear .visual-road');
    expect(defs).toContain('#housing-local-access.state-blocked .visual-road');
    expect(defs).toContain('#housing-home.state-conditioned .visual-house');
  });
});
