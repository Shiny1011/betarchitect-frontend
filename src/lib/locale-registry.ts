import { CanonicalLocale, MANIFEST_SUPPORTED_LOCALES } from '@/constants';

export const ALIASES: Record<string, CanonicalLocale> = {
  en: 'en-GB',
  fr: 'fr-FR',
  'fr-ca': 'fr-CA',
  nl: 'nl-BE',
};

export function normalizeLocale(input: string, allowed: string[], fallback: string): string {
  const key = (input || '').toLowerCase();
  const canonical = ALIASES[key] || MANIFEST_SUPPORTED_LOCALES.find((l) => l.toLowerCase() === key);
  return allowed.includes(canonical as any) ? (canonical as string) : fallback;
}
