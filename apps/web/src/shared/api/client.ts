import { getAccessToken } from './auth-token';
import { toApiError } from './errors';
import { env } from '@/shared/config/env';

type ApiClientOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  authenticated?: boolean;
};

export async function apiClient<TResponse>(
  path: string,
  { authenticated = false, body, headers, ...options }: ApiClientOptions = {},
): Promise<TResponse> {
  const token = authenticated ? getAccessToken() : null;
  const response = await fetch(`${env.VITE_API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw toApiError(response.status, payload, response.statusText);
  }

  return payload as TResponse;
}

async function parseResponse(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get('content-type');
  return contentType?.includes('application/json')
    ? response.json()
    : response.text();
}
