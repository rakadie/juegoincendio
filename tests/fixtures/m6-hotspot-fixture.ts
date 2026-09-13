import { SCENE_HOTSPOT_CLIENT } from '../../src/interfaces/http/scene-hotspot-client.js';
import {
  renderSceneHotspotAreas,
  SCENE_HOTSPOT_AREA_CSS
} from '../../src/interfaces/http/scene-hotspot-area.js';
import { renderSceneShell } from '../../src/interfaces/http/scene-shell.js';

export function renderM6HotspotFixturePage(): string {
  const hotspots = renderSceneHotspotAreas([
    {
      id: 'fixture-road',
      label: 'Camino rural: acceso limitado',
      controlsId: 'fixture-road-card',
      targetId: 'fixture-road-state',
      actionId: 'fixture-clear-road',
      xPercent: 27,
      yPercent: 67,
      widthPercent: 24,
      heightPercent: 18
    },
    {
      id: 'fixture-vegetation',
      label: 'Vegetación: continuidad alta',
      controlsId: 'fixture-vegetation-card',
      targetId: 'fixture-vegetation-state',
      actionId: 'fixture-break-continuity',
      xPercent: 69,
      yPercent: 37,
      widthPercent: 27,
      heightPercent: 23
    }
  ]);

  const shell = renderSceneShell({
    baseArt:
      '<svg viewBox="0 0 640 360" aria-hidden="true"><rect width="640" height="360" fill="#b9cbbf"/><path d="M0 260 Q170 130 330 250 T640 210 V360 H0Z" fill="#658052"/></svg>',
    stateOverlays:
      '<svg viewBox="0 0 640 360" aria-hidden="true"><g id="fixture-road-state" data-scene-state-object><path d="M15 292 C185 220 370 300 625 210" fill="none" stroke="#e6d8ab" stroke-width="25"/></g><g id="fixture-vegetation-state" data-scene-state-object><path d="M315 150 Q430 75 590 145" fill="none" stroke="#608d43" stroke-width="48"/></g></svg>',
    hotspots,
    cards:
      '<article id="fixture-road-card" data-scene-card hidden><strong>Camino rural</strong><p>Los márgenes reducen el corredor operativo.</p></article><article id="fixture-vegetation-card" data-scene-card hidden><strong>Vegetación</strong><p>La continuidad conecta las parcelas.</p></article>'
  });

  return `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fixture M6 áreas</title><style>
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #eef2ef; font-family: system-ui, sans-serif; }
    .scene-shell { position: relative; width: min(760px, calc(100vw - 32px)); aspect-ratio: 16 / 9; overflow: visible; border-radius: 24px; }
    .scene-layer { position: absolute; inset: 0; }
    .scene-base-art svg, .scene-state-overlays svg { width: 100%; height: 100%; display: block; border-radius: 24px; }
    .scene-state-overlays { pointer-events: none; }
    .scene-hotspots { position: absolute; inset: 0; }
    .scene-cards { pointer-events: none; }
    [data-scene-card] { position: absolute; left: 16px; bottom: 16px; width: min(280px, calc(100% - 32px)); padding: 16px; border-radius: 14px; background: white; color: #10251d; box-shadow: 0 12px 35px rgba(0,0,0,.24); }
    [data-scene-state-object] { transition: filter .12s ease; }
    [data-scene-state-object].is-hotspot-active { filter: brightness(1.18) drop-shadow(0 0 8px #f4b942); }
    ${SCENE_HOTSPOT_AREA_CSS}
  </style><body>${shell}<script>${SCENE_HOTSPOT_CLIENT}</script></body></html>`;
}

