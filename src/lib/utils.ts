import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 *
 * @param inputs - Class names, conditional classes, or objects
 * @returns Merged and deduplicated class string
 *
 * @example
 * cn('p-4', 'p-6') // 'p-6' (removes duplicate)
 * cn('base-class', isActive && 'active-class')
 * cn('fixed', className) // merges with passed className prop
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses an 8-digit string into a Date object
 *
 * @param digits - 8-digit string in DDMMYYYY format
 * @returns Date object if valid, null if invalid
 *
 * @example
 * parseDateDigits('15031990') // Date object for March 15, 1990
 * parseDateDigits('31021990') // null (invalid date)
 * parseDateDigits('1503199') // null (wrong length)
 */
export function parseDateDigits(digits: string): Date | null {
  if (digits.length !== 8) return null;
  const dd = parseInt(digits.slice(0, 2), 10);
  const mm = parseInt(digits.slice(2, 4), 10);
  const yyyy = parseInt(digits.slice(4, 8), 10);

  // Create date (month is 0-indexed in JS)
  const date = new Date(yyyy, mm - 1, dd);

  // Validate that date components match (handles invalid dates like 31/02/2024)
  if (date.getDate() !== dd || date.getMonth() !== mm - 1 || date.getFullYear() !== yyyy) {
    return null;
  }

  return date;
}

/**
 * Converts date string from DDMMYYYY format to YYYY-MM-DD format
 *
 * @param dateStr - Date string in DDMMYYYY format
 * @returns Date string in YYYY-MM-DD format
 *
 * @example
 * convertDate('15031990') // '1990-03-15'
 * convertDate('01012000') // '2000-01-01'
 */
export function convertDate(dateStr: string): string {
  return dateStr.replace(/(\d{2})(\d{2})(\d{4})/, '$3-$2-$1');
}

/**
 * Calculates age in years based on birth date
 *
 * @param birthDate - Date object representing birth date
 * @returns Age in years as a number
 *
 * @example
 * calculateAge(new Date('1990-03-15')) // Current age based on today's date
 * calculateAge(new Date('2000-12-25')) // Age if born on Dec 25, 2000
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 * Debounce function to delay execution until after wait time has elapsed
 * since the last time it was invoked
 *
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * const search = debounce((query: string) => fetchResults(query), 300);
 * search('text'); // will execute after 300ms of no further calls
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Creates localized route paths by prefixing routes with locale
 *
 * @param locale - Language/locale code (e.g., 'en', 'fr', 'de')
 * @param routes - Array of route paths to localize
 * @returns Array of localized route paths
 *
 * @example
 * getLocalizedRoutes('en', ['/about', '/contact']) // ['/en/about', '/en/contact']
 * getLocalizedRoutes('fr', ['/home']) // ['/fr/home']
 */
export const getLocalizedRoutes = (locale: string, routes: string[]) => {
  return routes.map((route) => `/${locale}${route}`);
};

/**
 * Interface for parsed URL structure
 */
type ParsedUrl = {
  /** Array of URL path segments (without empty strings) */
  segments: string[];
  /** First segment of the path (typically locale) */
  firstSegment?: string;
  /** Path without the first segment (typically without locale) */
  pathWithoutLocale: string;
};

/**
 * Parses a URL pathname into structured components
 *
 * @param pathname - URL pathname to parse
 * @returns Parsed URL object with segments and locale-free path
 *
 * @example
 * parseUrl('/en/about/team')
 * // { segments: ['en', 'about', 'team'], firstSegment: 'en', pathWithoutLocale: '/about/team' }
 *
 * parseUrl('/fr/contact')
 * // { segments: ['fr', 'contact'], firstSegment: 'fr', pathWithoutLocale: '/contact' }
 *
 * parseUrl('/')
 * // { segments: [], firstSegment: undefined, pathWithoutLocale: '/' }
 */
export const parseUrl = (pathname: string): ParsedUrl => {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  const pathWithoutLocale = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '/';

  return {
    segments,
    firstSegment,
    pathWithoutLocale,
  };
};

/**
 * Formats seconds into MM:SS time format
 *
 * @param seconds - Number of seconds to format
 * @returns Formatted time string in MM:SS format
 *
 * @example
 * formatTime(65) // '1:05'
 * formatTime(30) // '0:30'
 * formatTime(0) // '0:00'
 * formatTime(3661) // '61:01' (for times over 60 minutes)
 */
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
