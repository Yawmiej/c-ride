import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_SOCKET_URL: z.string().url(),
  VITE_GOOGLE_MAPS_API_KEY: z.string().trim().default(''),
  VITE_GOOGLE_MAPS_MAP_ID: z.string().trim().default(''),
  VITE_FIREBASE_API_KEY: z.string().trim().default(''),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().trim().default(''),
  VITE_FIREBASE_PROJECT_ID: z.string().trim().default(''),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().trim().default(''),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().trim().default(''),
  VITE_FIREBASE_APP_ID: z.string().trim().default(''),
  VITE_FIREBASE_VAPID_KEY: z.string().trim().default(''),
});

export const env = envSchema.parse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
  VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  VITE_GOOGLE_MAPS_MAP_ID: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_VAPID_KEY: import.meta.env.VITE_FIREBASE_VAPID_KEY,
});
