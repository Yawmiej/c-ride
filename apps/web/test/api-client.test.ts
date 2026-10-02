import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiClient, clearAccessToken, setAccessToken } from '@/shared/api';

describe('apiClient', () => {
  afterEach(() => {
    clearAccessToken();
    vi.unstubAllGlobals();
  });

  it('sends JSON and a bearer token for authenticated requests', async () => {
    setAccessToken('test-token');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 'user-1' }), {
        headers: { 'content-type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(apiClient('/auth/me', { authenticated: true })).resolves.toEqual({ id: 'user-1' });
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/auth/me',
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer test-token' }) }),
    );
  });

  it('normalizes API errors for form display', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: ['Email is already in use.'] }), {
          status: 409,
          statusText: 'Conflict',
          headers: { 'content-type': 'application/json' },
        }),
      ),
    );

    await expect(apiClient('/auth/register')).rejects.toMatchObject({
      name: 'ApiError',
      status: 409,
      message: 'Email is already in use.',
    });
  });
});
