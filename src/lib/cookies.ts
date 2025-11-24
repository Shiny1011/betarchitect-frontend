import Cookies from 'js-cookie';

import { AUTH_TOKEN, AUTH_TOKEN_EXPIRES, COOKIE_LOCALE_MAX_AGE, PREFERRED_LOCALE } from '@/constants';

export function setAuthToken(token: string) {
  Cookies.set(AUTH_TOKEN, token, {
    expires: AUTH_TOKEN_EXPIRES,
    secure: true,
    sameSite: 'lax',
  });
}

export function getAuthToken(): string | null | undefined {
  const token = Cookies.get(AUTH_TOKEN);

  return token === 'undefined' ? null : token;
}

export function clearAuthToken() {
  Cookies.remove(AUTH_TOKEN);
}

export function setLocaleCookie(value: string) {
  Cookies.set(PREFERRED_LOCALE, value, {
    expires: COOKIE_LOCALE_MAX_AGE / 86400, // Convert seconds to days
    secure: true,
    sameSite: 'lax',
  });
}
