export const DATE_PLACE_HOLDER = 'DD/MM/YYYY';
export const DEFAULT_PREFIX = '+381';
export const MIN_AGE = 18;
export const MAX_AGE = 100;
export const MAX_OTP_SLOTS = 6;
export const AUTH_TOKEN = 'auth-token';
export const PREFERRED_LOCALE = 'preferred-locale';
export const SIGNUP_STAGE_COOKIE = 'signup_stage_1';
export const AUTH_TOKEN_EXPIRES = 7; // days
export const COOKIE_LOCALE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds
export const CLOUDFLARE_IP_COUNTRY = 'CF-IPCountry'; // Cloudflare geolocation header
export const REQUIRED_PAGES = ['terms-and-conditions', 'vip', 'bonuses'] as const; // Required pages for content validation

export const LANGUAGE: Record<string, string> = {
  'en-GB': 'English (UK)',
  'en-US': 'English (US)',
  'fr-FR': 'French (FR)',
  'fr-CA': 'French (CA)',
  'nl-BE': 'Dutch (BE)',
  'de-CH': 'German (CH)',
};

// Only authorized user routes access
export const PRIVATE_ROUTES = {
  account: '/account',
  // nested routes
  accountSecurity: '/account/security',
  accountWallet: '/account/wallet',
  accountBonus: '/account/bonus',
  accountHistory: '/account/history',
  accountLimits: '/account/limits',
  accountExclusion: '/account/exclusion',
} as const;

// Non authorized user routes access
export const PUBLIC_ROUTES = {
  home: '/',
  about: '/about',
  sport: '/sport',
  vip: '/vip',
  casino: '/casino',
  promotions: '/promotions',
} as const;

// App Routes
export const ROUTES = [
  ...Object.values(PRIVATE_ROUTES),
  ...Object.values(PUBLIC_ROUTES),
  '/casino/jackpots',
  '/casino/live-casino',
  '/casino/providers',
] as const;

// Dynamic route patterns
export const DYNAMIC_ROUTE_PATTERNS = [
  /^\/[^\/]+\/casino\/[^\/]+$/, // /[locale]/casino/[game]
  /^\/[^\/]+\/casino\/providers\/[^\/]+$/, // /[locale]/casino/providers/[evolution]
] as const;

// Games interface
export interface Games {
  id: string;
  name: string;
  provider: string;
  imageUrl: string;
  isNew?: boolean;
  isLive?: boolean;
  category?: string;
}

// Mock game items for search functionality
export const GAME_ITEMS: Games[] = [
  {
    id: '1',
    name: 'Coin Strike Hold and Win 3x3',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '2',
    name: 'Banquet of Dead',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/5.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '3',
    name: 'Sweet Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
    isNew: true,
    isLive: false,
  },
  {
    id: '4',
    name: 'Big Bass Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/4.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '5',
    name: 'Dragons Playground',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/5.png',
    isNew: true,
    isLive: false,
  },
  {
    id: '6',
    name: 'Dragons Playground',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: true,
    isLive: false,
  },
  {
    id: '7',
    name: 'Dragons Playground',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
    isNew: true,
    isLive: false,
  },
];

export enum WalletType {
  FIAT = 'fiat',
  MAIN = 'main',
  CRYPTO = 'crypto',
}

export enum CurrencyType {
  MAIN = 'main',
  BONUS = 'bonus',
  WAGERED = 'wagered',
  WITHDRAWABLE = 'withdrawable',
}
