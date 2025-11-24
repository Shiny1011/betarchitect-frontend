export interface CountryCode {
  name: string;
  code: string; // e.g., RS
  dial_code: string; // e.g., +381
  flag?: string; // optional flag emoji or url
}

// Cache for storing country data
let countryCodesCache: CountryCode[] | null = null;
let fetchPromise: Promise<CountryCode[]> | null = null;

const COUNTRY_CODES_URL = 'https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2';

// Basic fetcher from a public JSON source as placeholder.
export async function fetchCountryCodes(): Promise<CountryCode[]> {
  // If data is already cached, return it
  if (countryCodesCache !== null) {
    return countryCodesCache;
  }

  // If request is already in progress, return the same Promise
  if (fetchPromise !== null) {
    return fetchPromise;
  }

  // Create a new request
  fetchPromise = (async () => {
    try {
      const res = await fetch(COUNTRY_CODES_URL);
      const data = await res.json();

      // Map to simplified structure; many countries have 'idd' info with root and suffixes
      const mapped: CountryCode[] = (data || [])
        .map((c: any) => {
          const root = c.idd?.root ?? '';
          const suffixes: string[] = c.idd?.suffixes ?? [];
          const dial = root && suffixes.length ? `${root}${suffixes[0]}` : root || '';
          return {
            name: c.name?.common ?? '',
            code: c.cca2 ?? '',
            dial_code: dial || '',
            flag: c.flags?.svg ?? undefined,
          } as CountryCode;
        })
        .filter((c: CountryCode) => c.dial_code);
      // Sort by name for UX
      mapped.sort((a, b) => a.name.localeCompare(b.name));

      // Save to cache
      countryCodesCache = mapped;
      return mapped;
    } catch (e) {
      console.error('fetchCountryCodes failed', e);
      return [];
    } finally {
      // Clear fetchPromise after completion
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}
