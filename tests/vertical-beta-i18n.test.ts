import { describe, expect, it } from 'vitest';
import { VERTICAL_BETA_I18N_ES } from '../src/content/i18n/es/vertical-beta.js';
import { getVerticalBetaI18nCatalog } from '../src/content/i18n/vertical-beta-locale.js';
import {
  requireVerticalBetaActionMessages,
  validateVerticalBetaI18nCatalog
} from '../src/content/i18n/vertical-beta-i18n.js';
import { OFFICIAL_SOURCE_SCENARIOS } from '../src/content/official-scenario-sources.js';
import { VERTICAL_BETA_PLAYER_CONTENT } from '../src/content/vertical-beta-player-content.js';
import { CANONICAL_SCENE_IDS } from '../src/domain/types/game-scene.js';

const HISTORICAL_OFFICIAL_IDS = [
  's-011-corte-carretera-acceso',
  's-025-cortafuego-emergencia',
  's-026-defensa-operativa-nucleo-viviendas',
  's-027-fuego-en-barranco',
  's-030-fuego-de-copas'
] as const;

describe('Vertical Beta 1 canonical i18n', () => {
  it('covers exactly the 12 canonical nodes with a valid strict catalog', () => {
    expect(validateVerticalBetaI18nCatalog(VERTICAL_BETA_I18N_ES)).toEqual({
      valid: true,
      errors: []
    });
    expect(Object.keys(VERTICAL_BETA_I18N_ES.scenes)).toEqual(CANONICAL_SCENE_IDS);
    expect(Object.values(VERTICAL_BETA_I18N_ES.scenes).every(({ title, body }) =>
      title.trim().length > 0 && body.trim().length > 0
    )).toBe(true);
  });

  it('fails when an official node or nested translation is missing', () => {
    const missingScene = structuredClone(VERTICAL_BETA_I18N_ES) as unknown as Record<string, any>;
    delete missingScene.scenes['crisis-decision-ravine-fire'];
    const missingSceneResult = validateVerticalBetaI18nCatalog(missingScene);
    expect(missingSceneResult.valid).toBe(false);
    if (!missingSceneResult.valid) {
      expect(missingSceneResult.errors.join(' ')).toContain('12 canonical scene IDs');
    }

    const missingAction = structuredClone(VERTICAL_BETA_I18N_ES) as unknown as Record<string, any>;
    missingAction.scenes['crisis-decision-crown-fire'].actions[
      'replegar-ante-fuego-de-copas'
    ].label = '';
    const missingActionResult = validateVerticalBetaI18nCatalog(missingAction);
    expect(missingActionResult.valid).toBe(false);
    if (!missingActionResult.valid) {
      expect(missingActionResult.errors.join(' ')).toContain('non-empty translated string');
    }
  });

  it('rejects an unsupported locale instead of falling back to Spanish', () => {
    expect(() => getVerticalBetaI18nCatalog('en')).toThrowError(
      expect.objectContaining({ code: 'unsupported-locale' })
    );
  });

  it('rejects missing action translations instead of deriving labels from IDs', () => {
    expect(() =>
      requireVerticalBetaActionMessages(
        VERTICAL_BETA_I18N_ES,
        'crisis-decision-ravine-fire',
        'accion-inexistente'
      )
    ).toThrowError(expect.objectContaining({ code: 'missing-translation' }));
  });

  it('uses canonical IDs in all five official Scenario projections', () => {
    expect(OFFICIAL_SOURCE_SCENARIOS.map(({ id }) => id)).toEqual([
      'crisis-decision-access-blockage',
      'crisis-decision-emergency-fuel-break',
      'crisis-decision-housing-defense',
      'crisis-decision-ravine-fire',
      'crisis-decision-crown-fire'
    ]);

    const serialized = JSON.stringify(VERTICAL_BETA_PLAYER_CONTENT);
    HISTORICAL_OFFICIAL_IDS.forEach((id) => expect(serialized).not.toContain(id));
  });
});
