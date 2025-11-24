import type { CanonicalLocale } from '@/constants';
import { MANIFEST_DEFAULT_LOCALE, MANIFEST_SUPPORTED_LOCALES } from '@/constants';

import localeMap from '../../config/locale-map.json';

export interface LocaleMapEntry {
  [languageTag: string]: string;
}

export interface LocaleMap {
  [countryCode: string]: LocaleMapEntry | string;
}

/**
 * Get preferred locale for a country and language combination using locale-map.json
 *
 * @param countryCode - ISO country code (e.g., 'CA', 'BE', 'CH')
 * @param languageTag - Language tag (e.g., 'fr', 'en', 'de')
 * @returns Canonical locale code or null if not found in map
 */
export function getLocaleFromMap(countryCode: string, languageTag?: string): string | null {
  const map = localeMap as LocaleMap;
  const countryEntry = map[countryCode.toUpperCase()];

  if (!countryEntry || typeof countryEntry === 'string') {
    return null;
  }

  // Try exact language match first
  if (languageTag && countryEntry[languageTag.toLowerCase()]) {
    return countryEntry[languageTag.toLowerCase()];
  }

  // Fall back to wildcard "*" for the country
  if (countryEntry['*']) {
    return countryEntry['*'];
  }

  return null;
}

/**
 * Validate if a locale from locale-map is actually available in our app
 * Locale availability comes from manifest only, not from locale-map
 */
export function validateLocaleAvailability(locale: string): CanonicalLocale {
  const available = MANIFEST_SUPPORTED_LOCALES.find((availableLocale) => availableLocale === locale);

  // If locale from map is not available, fall back to default
  return (available as CanonicalLocale) || MANIFEST_DEFAULT_LOCALE;
}

/**
 * Enhanced locale detection using locale-map.json rules
 *
 * @param countryCode - ISO country code from Cloudflare or other source
 * @param languageTag - Language preference from Accept-Language or user settings
 * @returns Best matching available locale
 */
export function detectLocaleFromMap(countryCode?: string, languageTag?: string): CanonicalLocale {
  if (!countryCode) {
    return MANIFEST_DEFAULT_LOCALE;
  }

  // Get locale suggestion from map
  const suggestedLocale = getLocaleFromMap(countryCode, languageTag);

  if (suggestedLocale) {
    // Validate that suggested locale is actually available
    return validateLocaleAvailability(suggestedLocale);
  }

  // No mapping found, use default
  return MANIFEST_DEFAULT_LOCALE;
}
