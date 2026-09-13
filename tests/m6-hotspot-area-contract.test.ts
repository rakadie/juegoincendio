import { describe, expect, it } from 'vitest';
import { SCENE_HOTSPOT_CLIENT } from '../src/interfaces/http/scene-hotspot-client.js';
import {
  MINIMUM_HOTSPOT_SIZE_PX,
  renderSceneHotspotAreas,
  SCENE_HOTSPOT_AREA_CSS
} from '../src/interfaces/http/scene-hotspot-area.js';
import { renderM6HotspotFixturePage } from './fixtures/m6-hotspot-fixture.js';

const fixtureAreas = [
  {
    id: 'road',
    label: 'Camino rural',
    controlsId: 'road-card',
    targetId: 'road-state',
    actionId: 'clear-road',
    xPercent: 25,
    yPercent: 70,
    widthPercent: 20,
    heightPercent: 16
  }
] as const;

interface FakeEvent {
  readonly type: string;
  readonly key?: string;
  preventDefault?(): void;
}

class FakeElement {
  readonly dataset: Record<string, string> = {};
  readonly classNames = new Set<string>();
  readonly listeners = new Map<string, Array<(event: FakeEvent) => void>>();
  readonly attributes = new Map<string, string>();
  hidden = false;

  constructor(readonly id: string) {}

  readonly classList = {
    add: (name: string) => this.classNames.add(name),
    remove: (name: string) => this.classNames.delete(name)
  };

  addEventListener(type: string, listener: (event: FakeEvent) => void): void {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  dispatchEvent(event: FakeEvent): boolean {
    for (const listener of this.listeners.get(event.type) ?? []) listener(event);
    return true;
  }

  getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null;
  }

  setAttribute(name: string, value: string): void {
    this.attributes.set(name, value);
  }
}

describe('M6.1b transparent hotspot areas', () => {
  it('renders an independent accessible area without visible button markup', () => {
    const markup = renderSceneHotspotAreas(fixtureAreas);

    expect(markup).toContain('class="scene-hotspot-area"');
    expect(markup).toContain('role="button" tabindex="0"');
    expect(markup).toContain('aria-label="Camino rural"');
    expect(markup).toContain('aria-controls="road-card"');
    expect(markup).toContain('data-scene-target-id="road-state"');
    expect(markup).toContain('data-focus-action-id="clear-road"');
    expect(markup).not.toContain('<button');
    expect(markup).not.toContain('<circle');
    expect(markup).not.toContain('<svg');
  });

  it('guarantees a 44 by 44 CSS pixel floor while remaining transparent', () => {
    expect(MINIMUM_HOTSPOT_SIZE_PX).toBe(44);
    expect(SCENE_HOTSPOT_AREA_CSS).toContain('width: max(var(--hotspot-width), 44px)');
    expect(SCENE_HOTSPOT_AREA_CSS).toContain('height: max(var(--hotspot-height), 44px)');
    expect(SCENE_HOTSPOT_AREA_CSS).toContain('background: transparent');
    expect(SCENE_HOTSPOT_AREA_CSS).toContain('border: 0');
  });

  it('opens the same card from pointer, focus, click, Enter and Space without duplicate wiring', () => {
    const hotspot = new FakeElement('hotspot-road');
    const card = new FakeElement('road-card');
    const target = new FakeElement('road-state');
    hotspot.dataset.visualElementId = 'road';
    hotspot.attributes.set('aria-controls', card.id);
    hotspot.attributes.set('data-scene-target-id', target.id);
    card.hidden = true;

    const document = {
      querySelectorAll(selector: string): FakeElement[] {
        if (selector === '[data-scene-hotspot]') return [hotspot];
        if (selector === '[data-scene-card]') return [card];
        if (selector === '[data-scene-state-object].is-hotspot-active') {
          return target.classNames.has('is-hotspot-active') ? [target] : [];
        }
        return [];
      },
      getElementById(id: string): FakeElement | null {
        return [hotspot, card, target].find((element) => element.id === id) ?? null;
      }
    };
    class FakeCustomEvent implements FakeEvent {
      constructor(
        readonly type: string,
        readonly options: { readonly bubbles: boolean; readonly detail: unknown }
      ) {}
    }
    const browserWindow: Record<string, unknown> = {};

    new Function('window', 'document', 'CustomEvent', SCENE_HOTSPOT_CLIENT)(
      browserWindow,
      document,
      FakeCustomEvent
    );

    expect(hotspot.listeners.get('pointerenter')).toHaveLength(1);
    expect(hotspot.listeners.get('focus')).toHaveLength(1);
    expect(hotspot.listeners.get('click')).toHaveLength(1);
    expect(hotspot.listeners.get('keydown')).toHaveLength(1);

    const assertOpened = (): void => {
      expect(card.hidden).toBe(false);
      expect(hotspot.getAttribute('aria-expanded')).toBe('true');
      expect(target.classNames.has('is-hotspot-active')).toBe(true);
      card.hidden = true;
      hotspot.setAttribute('aria-expanded', 'false');
      target.classNames.delete('is-hotspot-active');
    };

    for (const type of ['pointerenter', 'focus', 'click']) {
      hotspot.dispatchEvent({ type });
      assertOpened();
    }
    for (const key of ['Enter', ' ']) {
      hotspot.dispatchEvent({ type: 'keydown', key, preventDefault() {} });
      assertOpened();
    }

    const sceneHotspots = browserWindow.SceneHotspots as { wire(root: typeof document): void };
    sceneHotspots.wire(document);
    expect(hotspot.listeners.get('click')).toHaveLength(1);
  });

  it('keeps art, state, areas and cards separate in a browser-ready fixture', () => {
    const page = renderM6HotspotFixturePage();
    const base = page.indexOf('data-scene-layer="base-art"');
    const state = page.indexOf('data-scene-layer="state-overlays"');
    const areas = page.indexOf('data-scene-layer="hotspots"');
    const cards = page.indexOf('data-scene-layer="cards"');

    expect(base).toBeLessThan(state);
    expect(state).toBeLessThan(areas);
    expect(areas).toBeLessThan(cards);
    expect(page).toContain('data-scene-state-object');
    expect(page).toContain('data-scene-hotspot');
    expect(page).toContain('data-scene-card');
    expect(page).not.toContain('<button');
  });

  it('rejects duplicate identities and invalid presentation coordinates', () => {
    expect(() => renderSceneHotspotAreas([...fixtureAreas, ...fixtureAreas])).toThrow(
      'Duplicate scene hotspot id: road'
    );
    expect(() =>
      renderSceneHotspotAreas([{ ...fixtureAreas[0], widthPercent: 0 }])
    ).toThrow('road.widthPercent must be greater than 0 and at most 100');
  });
});
