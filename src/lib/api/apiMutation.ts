const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

/**
 * Specialized function for performing mutations (POST, PUT, DELETE, PATCH).
 * Flexible handling of headers, especially Content-Type for JSON and FormData.
 **/

export async function apiMutation<T>(endpoint: string, options: RequestInit): Promise<T> {
  const finalOptions = { ...options };
  const defaultHeaders: Record<string, string> = {};

  // set Content-Type: application/json, only if it is not FormData
  if (!(finalOptions.body instanceof FormData)) defaultHeaders['Content-Type'] = 'application/json';

  finalOptions.headers = {
    ...defaultHeaders,
    ...(finalOptions.headers as HeadersInit),
  };

  // If the body is missing, remove the Content-Type header if it was accidentally set
  if (!finalOptions.body) delete (finalOptions.headers as Record<string, string>)['Content-Type'];

  const response = await fetch(`${API_BASE_URL}${endpoint}`, finalOptions);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP ${response.status}`);
  }

  // Handling 204 "No Content" (return null for mutations with no response content)
  if (response.status === 204) return null as T;

  return response.json();
}
