import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { rideKeys } from '@/entities/ride';
import {
  canUseNotifications,
  getFcmToken,
  subscribeToForegroundMessages,
} from '@/shared/notifications/firebase-messaging';
import { useRegisterDeviceMutation } from '../queries/device.mutations';

export type NotificationRegistrationState =
  | 'checking'
  | 'unsupported'
  | 'default'
  | 'denied'
  | 'registering'
  | 'enabled'
  | 'error';
export function useNotificationRegistration() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: registerDevice } = useRegisterDeviceMutation();
  const startedAutomatically = useRef(false);
  const [state, setState] = useState<NotificationRegistrationState>('checking');

  const register = useCallback(async () => {
    setState('registering');
    try {
      const token = await getFcmToken();
      if (!token) throw new Error('Firebase did not return a device token.');
      await registerDevice(token);
      setState('enabled');
    } catch {
      setState('error');
    }
  }, [registerDevice]);

  useEffect(() => {
    let cancelled = false;
    void canUseNotifications().then((supported) => {
      if (cancelled) return;
      if (!supported) {
        setState('unsupported');
        return;
      }
      if (
        Notification.permission === 'granted' &&
        !startedAutomatically.current
      ) {
        startedAutomatically.current = true;
        void register();
      } else if (Notification.permission !== 'granted') {
        setState(Notification.permission);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [register]);

  useEffect(() => {
    if (state !== 'enabled') return;
    let active = true;
    let unsubscribe: () => void = () => undefined;
    void subscribeToForegroundMessages((payload) => {
      const link = payload.data?.link;
      const rideId = payload.data?.rideId;
      if (rideId) {
        void queryClient.invalidateQueries({
          queryKey: rideKeys.detail(rideId),
        });
      }
      toast(payload.notification?.title ?? 'C-Ride', {
        description: payload.notification?.body,
        action: link
          ? { label: 'View ride', onClick: () => navigate(link) }
          : undefined,
      });
    }).then((cleanup) => {
      if (active) unsubscribe = cleanup;
      else cleanup();
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, [navigate, queryClient, state]);

  async function enable() {
    if (!(await canUseNotifications())) {
      setState('unsupported');
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await register();
    } else {
      setState(permission);
    }
  }

  return { state, enable };
}
