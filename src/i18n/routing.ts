import { defineRouting } from 'next-intl/routing';

import { MANIFEST_DEFAULT_LOCALE, MANIFEST_SUPPORTED_LOCALES } from '@/constants';

export const routing = defineRouting({
  locales: MANIFEST_SUPPORTED_LOCALES,
  defaultLocale: MANIFEST_DEFAULT_LOCALE,
});
