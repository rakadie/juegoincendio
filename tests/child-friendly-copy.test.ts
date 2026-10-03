import { describe, expect, it } from 'vitest';
import { VERTICAL_BETA_I18N_ES } from '../src/content/i18n/es/vertical-beta.js';
import { VERTICAL_BETA_VISUAL_COPY_ES } from '../src/content/i18n/es/vertical-beta-visual.js';
import { renderPrototypePage } from '../src/interfaces/http/prototype-page.js';

function stringsIn(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(stringsIn);
  if (value !== null && typeof value === 'object') {
    return Object.values(value).flatMap(stringsIn);
  }
  return [];
}

const HARD_TO_EXPLAIN_WITHOUT_CONTEXT = [
  /interfaz urbano-forestal/i,
  /repliegue/i,
  /defensibilidad/i,
  /cadena causal/i,
  /puente causal/i,
  /discontinuidad(?:es)?/i,
  /envolvente operativa/i,
  /triaje/i,
  /pavesas/i,
  /anclaje/i,
  /capacidad de extinción/i,
  /valor del modelo/i,
  /combustible fino/i,
  /condiciones heredadas/i,
  /maniobra condicionada/i
] as const;

describe('child-friendly player copy', () => {
  it('uses short sentences and avoids unexplained emergency jargon', () => {
    const visibleCopy = stringsIn({
      scenes: VERTICAL_BETA_I18N_ES.scenes,
      dimensions: VERTICAL_BETA_I18N_ES.dimensions,
      relations: VERTICAL_BETA_I18N_ES.causalRelations,
      visual: VERTICAL_BETA_VISUAL_COPY_ES
    });

    for (const text of visibleCopy) {
      for (const jargon of HARD_TO_EXPLAIN_WITHOUT_CONTEXT) {
        expect(text, `Unexplained jargon in: ${text}`).not.toMatch(jargon);
      }
      for (const sentence of text.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean)) {
        expect(sentence.split(/\s+/).length, `Sentence is too long: ${sentence}`).toBeLessThanOrEqual(28);
      }
    }
  });

  it('explains the controls with words a child can act on', () => {
    const html = renderPrototypePage();
    expect(html).toContain('Toca un punto del mapa para saber qué ocurre allí y qué puedes mejorar');
    expect(html).toContain('Mejoras elegidas');
    expect(html).toContain('Por qué ocurrió');
    expect(html).not.toContain('Pasa sobre un punto de la escena');
    expect(html).not.toContain('Puente causal:');
    expect(html).not.toContain('Resultado · balance causal');
  });
});
