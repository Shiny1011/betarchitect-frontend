import type { NextRequest } from 'next/server';

import {
  CLOUDFLARE_IP_COUNTRY,
  PREFERRED_LOCALE,
  MANIFEST_DEFAULT_LOCALE,
  MANIFEST_SUPPORTED_LOCALES,
  CanonicalLocale,
} from '@/constants';
import { detectLocaleFromMap } from '@/lib/locale-map';
import { normalizeLocale } from '@/lib/locale-registry';

/**
 * Determines user's preferred locale based on:
 * 1. Cookies (validated against supported locales)
 * 2. Cloudflare geolocation + locale-map.json rules
 * 3. Accept-Language browser header
 * 4. Default locale
 *
 * Cookie set to a locale not in supported locales is ignored; next step in order is used.
 */
export function detectUserLocale(request: NextRequest): string {
  // 1. Check cookies (highest priority - manual user selection)
  // Cookie set to a locale not in supported locales is ignored; next step in order is used
  const cookieLocale = request.cookies.get(PREFERRED_LOCALE)?.value;

  if (cookieLocale && MANIFEST_SUPPORTED_LOCALES.includes(cookieLocale as CanonicalLocale)) {
    return cookieLocale;
  }

  // 2. Cloudflare geolocation with locale-map rules
  const cfCountry = request.headers.get(CLOUDFLARE_IP_COUNTRY);

  // In development, we can simulate for testing
  const cfCountryCode = process.env.NEXT_NODE_ENV === 'dev' ? process.env.NEXT_SIMULATE_CF_COUNTRY || null : cfCountry;

  if (cfCountryCode) {
    // Extract language preference from Accept-Language for locale-map lookup
    const acceptLanguage = request.headers.get('Accept-Language');
    const primaryLanguage = acceptLanguage
      ?.split(',')[0] // Take first language preference
      ?.split(';')[0] // Remove q-value
      ?.split('-')[0] // Take just language part (en from en-US)
      ?.trim()
      ?.toLowerCase();

    // Use locale-map.json rules for country + language → locale mapping
    const mappedLocale = detectLocaleFromMap(cfCountryCode, primaryLanguage);

    if (mappedLocale && MANIFEST_SUPPORTED_LOCALES.includes(mappedLocale as CanonicalLocale)) {
      return mappedLocale;
    }

    // Fallback to old normalization logic if locale-map doesn't have the country
    return normalizeLocale(cfCountryCode, [...MANIFEST_SUPPORTED_LOCALES], MANIFEST_DEFAULT_LOCALE);
  }

  // 3. Accept-Language browser header (fallback)
  const acceptLanguage = request.headers.get('Accept-Language');

  if (acceptLanguage) {
    // Parse Accept-Language: "en-US,en;q=0.9,fr;q=0.8"
    const firstLanguage = acceptLanguage
      .split(',')[0] // Take first language "en-US;q=0.9"
      .split(';')[0] // Remove q-value, get "en-US"
      .trim();

    if (firstLanguage) {
      return normalizeLocale(firstLanguage, [...MANIFEST_SUPPORTED_LOCALES], MANIFEST_DEFAULT_LOCALE);
    }
  }

  // 4. Default locale (last fallback)
  return MANIFEST_DEFAULT_LOCALE;
}
