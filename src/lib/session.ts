import { decodeJwt, type JWTPayload } from 'jose';

export function decodeJWT(token: string): JWTPayload | null {
  try {
    return decodeJwt(token);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export function getTokenExpirationTime(token: string): number {
  const payload = decodeJWT(token);

  if (!payload || !payload.exp) {
    return 0;
  }

  const expirationTime = payload.exp * 1000;
  const timeUntilExpiration = expirationTime - Date.now();

  return timeUntilExpiration > 0 ? timeUntilExpiration : 0;
}
