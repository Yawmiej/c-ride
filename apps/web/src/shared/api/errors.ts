export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type ErrorPayload = {
  message?: string | string[];
  errors?: Record<string, string[]>;
};

export function toApiError(status: number, payload: unknown, fallbackMessage: string) {
  const body = isErrorPayload(payload) ? payload : undefined;
  const message = Array.isArray(body?.message)
    ? body.message.join(', ')
    : body?.message ?? fallbackMessage;

  return new ApiError(message, status, body?.errors);
}

export function getErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.') {
  return error instanceof ApiError ? error.message : fallback;
}

function isErrorPayload(payload: unknown): payload is ErrorPayload {
  return typeof payload === 'object' && payload !== null;
}
