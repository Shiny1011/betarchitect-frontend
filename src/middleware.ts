import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  COOKIE_LOCALE_MAX_AGE,
  PREFERRED_LOCALE,
  MANIFEST_SUPPORTED_LOCALES,
  AUTH_TOKEN,
  PRIVATE_ROUTES,
  ROUTES,
  DYNAMIC_ROUTE_PATTERNS,
  CanonicalLocale,
} from '@/constants';
import { detectUserLocale } from '@/lib/locale-detection';
import { ALIASES } from '@/lib/locale-registry';
import { getLocalizedRoutes, parseUrl } from '@/lib/utils';

type MiddlewareResult = NextResponse | null;

function basicAuthGuard(request: NextRequest): MiddlewareResult {
  const username = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASS;

  // If credentials are not set, basic auth is disabled
  if (!username || !password) {
    return null;
  }

  const authHeader = request.headers.get('authorization');
  const challenge = new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected"',
    },
  });

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return challenge;
  }

  const base64Credentials = authHeader.slice('Basic '.length).trim();

  const decodeBase64 = (value: string): string => {
    try {
      const atobFn = (globalThis as unknown as { atob?: (data: string) => string }).atob;
      if (typeof atobFn === 'function') {
        return atobFn(value);
      }
    } catch (_) {
      // ignore
    }
    try {
      return Buffer.from(value, 'base64').toString('utf-8');
    } catch (_) {
      return '';
    }
  };

  const decoded = decodeBase64(base64Credentials);
  const [user, pass] = decoded.split(':');

  if (user !== username || pass !== password) {
    return challenge;
  }

  return null;
}

const isValidLocale = (segment: string | undefined): boolean => {
  if (!segment) return false;
  return MANIFEST_SUPPORTED_LOCALES.includes(segment as CanonicalLocale) || Boolean(ALIASES[segment.toLowerCase()]);
};

const buildPathWithLocale = (locale: string, path: string = ''): string => {
  const cleanPath = path === '/' ? '' : path;
  return `/${locale}${cleanPath}`;
};

const createRedirectResponse = (url: string, request: NextRequest, locale?: string): NextResponse => {
  const response = NextResponse.redirect(new URL(url, request.url));
  if (locale) {
    response.cookies.set(PREFERRED_LOCALE, locale, {
      maxAge: COOKIE_LOCALE_MAX_AGE,
      httpOnly: false,
      path: '/',
    });
  }
  return response;
};

function handleTranslation(request: NextRequest): MiddlewareResult {
  const { pathname } = request.nextUrl;
  const { firstSegment, pathWithoutLocale } = parseUrl(pathname);

  if (!firstSegment) {
    // No locale in URL - redirect to preferred locale
    const preferredLocale = detectUserLocale(request);
    return createRedirectResponse(buildPathWithLocale(preferredLocale), request, preferredLocale);
  }

  const key = firstSegment.toLowerCase();
  const isFullLocale = MANIFEST_SUPPORTED_LOCALES.includes(firstSegment as CanonicalLocale);
  const shortCodeMatch = ALIASES[key];

  if (isFullLocale) {
    return null;
  }

  if (shortCodeMatch) {
    // Short code - redirect to full locale
    const newPath = buildPathWithLocale(shortCodeMatch, pathWithoutLocale);
    return createRedirectResponse(newPath, request, shortCodeMatch);
  }

  // Invalid locale - redirect to preferred locale with clean path
  const preferredLocale = detectUserLocale(request);
  const newPath = buildPathWithLocale(preferredLocale, pathWithoutLocale);
  return createRedirectResponse(newPath, request, preferredLocale);
}

function routeGuard(request: NextRequest): MiddlewareResult {
  const { pathname } = request.nextUrl;
  const { firstSegment, pathWithoutLocale } = parseUrl(pathname);

  // Only process requests with valid locales
  if (!isValidLocale(firstSegment)) {
    return null;
  }

  // Check if route exists
  const isValidRoute =
    ROUTES.includes(pathWithoutLocale as (typeof ROUTES)[number]) ||
    DYNAMIC_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));

  if (isValidRoute) {
    return null; // Valid route, continue
  }

  // Invalid route - redirect to home with locale preserved
  return createRedirectResponse(buildPathWithLocale(firstSegment!), request);
}

function authGuard(request: NextRequest): MiddlewareResult {
  const { pathname } = request.nextUrl;
  const { firstSegment } = parseUrl(pathname);

  if (!firstSegment || !isValidLocale(firstSegment)) {
    return null;
  }

  const localizedPrivateRoutes = getLocalizedRoutes(firstSegment, Object.values(PRIVATE_ROUTES));
  const isProtectedRoute = localizedPrivateRoutes.some((route) => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return null;
  }

  const token = request.cookies.get(AUTH_TOKEN)?.value;

  if (!token) {
    const homeUrl = new URL(buildPathWithLocale(firstSegment), request.url);
    homeUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(homeUrl);
  }

  return null;
}

export function middleware(request: NextRequest): NextResponse {
  const middlewareChain = [basicAuthGuard, handleTranslation, routeGuard, authGuard];

  for (const middlewareHandler of middlewareChain) {
    const result = middlewareHandler(request);

    if (result) {
      return result;
    }
  }

  // All checks passed - handle cookie setting if needed
  const response = NextResponse.next();
  const { firstSegment } = parseUrl(request.nextUrl.pathname);

  if (firstSegment && MANIFEST_SUPPORTED_LOCALES.includes(firstSegment as CanonicalLocale)) {
    const currentCookieLocale = request.cookies.get(PREFERRED_LOCALE)?.value;

    if (firstSegment !== currentCookieLocale) {
      response.cookies.set(PREFERRED_LOCALE, firstSegment, {
        maxAge: COOKIE_LOCALE_MAX_AGE,
        httpOnly: false,
        path: '/',
      });
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
