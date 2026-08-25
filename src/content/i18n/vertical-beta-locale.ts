import { VERTICAL_BETA_I18N_ES } from './es/vertical-beta.js';
import {
  assertVerticalBetaI18nCatalog,
  VerticalBetaI18nError,
  type VerticalBetaI18nCatalog
} from './vertical-beta-i18n.js';

export type SupportedVerticalBetaLocale = 'es';

export function getVerticalBetaI18nCatalog(locale: string): VerticalBetaI18nCatalog {
  if (locale !== 'es') {
    throw new VerticalBetaI18nError(
      'unsupported-locale',
      `Vertical Beta 1 has no official translation for locale ${locale}; fallback is disabled.`
    );
  }
  return assertVerticalBetaI18nCatalog(VERTICAL_BETA_I18N_ES);
}
