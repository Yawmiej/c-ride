import { env } from '@/shared/config/env';

type HttpClientOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly response: unknown,
  ) {
    super(message);
  }
}

export async function httpClient<TResponse>(
  path: string,
  options: HttpClientOptions = {},
): Promise<TResponse> {
  const response = await fetch(`${env.VITE_API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await readResponse(response);

  if (!response.ok) {
    throw new HttpError(response.statusText, response.status, data);
  }

  return data as TResponse;
}

async function readResponse(response: Response) {
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  return response.text();
}
