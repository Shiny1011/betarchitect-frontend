'use client';

import { useState, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { CanonicalLocale, MANIFEST_DEFAULT_LOCALE, LANGUAGE, PREFERRED_LOCALE } from '@/constants';
import { useRouter, usePathname } from '@/i18n/navigation';
import { api } from '@/lib/api';
import { setLocaleCookie } from '@/lib/cookies';
import { useUserCache } from '@/lib/hooks';
import { IUser } from '@/lib/schema';

interface UpdateLanguagePayload {
  locale: string;
}

interface UpdateLanguageResponse {
  user: IUser;
}

export const useSwitchLanguage = () => {
  const [locale, setLocale] = useState<CanonicalLocale>(MANIFEST_DEFAULT_LOCALE);
  const { user } = useUserCache();

  const router = useRouter();
  const pathname = usePathname();

  const { mutate } = useMutation<UpdateLanguageResponse, Error, UpdateLanguagePayload>({
    mutationFn: async (payload) => {
      return await api<UpdateLanguageResponse>(`/users/settings/${user?.id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({ preference: { language: payload.locale } }),
      });
    },
  });

  useEffect(() => {
    const cookieLocale = (Cookies.get(PREFERRED_LOCALE) as CanonicalLocale) || MANIFEST_DEFAULT_LOCALE;
    setLocale(cookieLocale);
  }, []);

  const selectedLanguage = LANGUAGE[locale];

  const onLanguageChange = (newLocale: string) => {
    setLocaleCookie(newLocale);
    setLocale(newLocale as CanonicalLocale);
    router.replace(pathname, { locale: newLocale });

    if (user?.id) {
      mutate({ locale: newLocale });
    }
  };

  return {
    selectedLanguage,
    onLanguageChange,
  };
};
