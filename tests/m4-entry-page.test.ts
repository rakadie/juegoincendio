import { describe, expect, it } from 'vitest';
import { renderPrototypePage } from '../src/interfaces/http/prototype-page.js';

describe('M4.1 explicit product entry', () => {
  it('shows a product landing before any game session exists', () => {
    const html = renderPrototypePage();

    expect(html).toContain('id="entry-title"');
    expect(html).toContain('id="start-session-button"');
    expect(html).toContain('Comenzar partida');
    expect(html).toContain('id="entry-duration"');
    expect(html).toContain('id="restart-button" type="button" disabled');
    expect(html).toContain('id="session-footer"');
    expect(html).toContain('hidden aria-label="Resumen de la partida"');
    expect(html).not.toContain('<div class="loading">Creando sesión…</div>');
  });

  it('keeps landing copy in player language rather than implementation language', () => {
    const html = renderPrototypePage();
    const entryStart = html.indexOf('<section class="entry"');
    const entryEnd = html.indexOf('</section>', entryStart);
    const entryMarkup = html.slice(entryStart, entryEnd);

    expect(entryMarkup).toContain(
      'Cuando comiences, conocerás la misión antes de tomar tu primera decisión.'
    );
    expect(entryMarkup.toLowerCase()).not.toContain('briefing');
  });

  it('creates a session only from the explicit start handler', () => {
    const html = renderPrototypePage();
    const startFunction = html.indexOf('async function startSession()');
    const createCall = html.indexOf("request('/api/game-sessions', { method: 'POST', body: '{}' })");
    const startListener = html.indexOf("startButton.addEventListener('click', startSession)");

    expect(startFunction).toBeGreaterThan(-1);
    expect(createCall).toBeGreaterThan(startFunction);
    expect(startListener).toBeGreaterThan(createCall);
    expect(html).not.toContain("request('/api/game-sessions', { method: 'POST', body: '{}' });\n    </script>");
  });

  it('guards the start command against duplicate activation', () => {
    const html = renderPrototypePage();

    expect(html).toContain('if (busy || sessionId !== null) return;');
    expect(html).toContain('startButton.disabled = true;');
    expect(html).toContain("startButton.textContent = 'Preparando partida…'");
    expect(html).toContain('if (!created && sessionId === null)');
  });

  it('keeps product context separate from session creation', () => {
    const html = renderPrototypePage();

    expect(html).toContain("fetch('/api/vertical-beta/context')");
    expect(html).toContain('const target = context.targetDurationMinutes;');
    expect(html).toContain('Number.isInteger(target.min)');
    expect(html).toContain('Number.isInteger(target.max)');
    expect(html).toContain("setSessionChrome(true)");
    expect(html).toContain("restartButton.disabled = !active");
    expect(html).toContain("sessionFooter.hidden = !active");
  });

  it('moves focus into the canonical briefing after an explicit start', () => {
    const html = renderPrototypePage();

    expect(html).toContain('function focusCurrentSceneHeading()');
    expect(html).toContain("game.querySelector('h1, h2')");
    expect(html).toContain("heading.setAttribute('tabindex', '-1')");
    expect(html).toContain('heading.focus()');
  });
});
