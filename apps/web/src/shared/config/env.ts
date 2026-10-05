import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_SOCKET_URL: z.string().url(),
  VITE_GOOGLE_MAPS_API_KEY: z.string().trim().default(''),
  VITE_GOOGLE_MAPS_MAP_ID: z.string().trim().default(''),
});

export const env = envSchema.parse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
  VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  VITE_GOOGLE_MAPS_MAP_ID: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
});
