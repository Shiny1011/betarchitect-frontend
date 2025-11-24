interface LocationData {
  city?: string;
  country_name?: string;
  country_code?: string;
  region?: string;
  timezone?: string;
  ip?: string;
  [key: string]: any;
}

// Cache for storing location data
let locationCache: LocationData | null = null;
let locationPromise: Promise<LocationData | null> | null = null;

const GEOLOCATION_URL = 'https://ipapi.co/json/';

export async function getLocation(): Promise<LocationData | null> {
  // If data is already cached, return it
  if (locationCache !== null) {
    return locationCache;
  }

  // If request is already in progress, return the same Promise
  if (locationPromise !== null) {
    return locationPromise;
  }

  // Create a new request
  locationPromise = (async () => {
    try {
      const response = await fetch(GEOLOCATION_URL);
      const data = await response.json();

      // Save to cache
      locationCache = data;
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    } finally {
      // Clear locationPromise after completion
      locationPromise = null;
    }
  })();

  return locationPromise;
}
