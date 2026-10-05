import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
  type MessagePayload,
} from 'firebase/messaging';
import { env } from '@/shared/config';

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

export function hasNotificationConfiguration() {
  return (
    Object.values(firebaseConfig).every(Boolean) &&
    Boolean(env.VITE_FIREBASE_VAPID_KEY)
  );
}

export async function canUseNotifications() {
  return (
    hasNotificationConfiguration() &&
    window.isSecureContext &&
    'Notification' in window &&
    'serviceWorker' in navigator &&
    (await isSupported())
  );
}

export async function getFcmToken() {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const registration = await navigator.serviceWorker.register(
    '/firebase-messaging-sw.js',
  );
  return getToken(getMessaging(app), {
    vapidKey: env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });
}

export async function subscribeToForegroundMessages(
  listener: (payload: MessagePayload) => void,
) {
  if (!(await canUseNotifications()) || Notification.permission !== 'granted') {
    return () => undefined;
  }
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return onMessage(getMessaging(app), listener);
}
