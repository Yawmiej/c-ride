import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useNotificationRegistration } from '../hooks/use-notification-registration';

const LABELS = {
  checking: 'Checking notifications',
  unsupported: 'Notifications unavailable',
  default: 'Enable notifications',
  denied: 'Notifications blocked',
  registering: 'Enabling notifications',
  enabled: 'Notifications enabled',
  error: 'Retry notifications',
} as const;

export function NotificationPermissionButton() {
  const { state, enable } = useNotificationRegistration();
  const disabled =
    state === 'checking' ||
    state === 'unsupported' ||
    state === 'denied' ||
    state === 'registering' ||
    state === 'enabled';
  const Icon = state === 'denied' || state === 'unsupported' ? BellOff : Bell;

  return (
    <Button
      disabled={disabled}
      onClick={() => void enable()}
      size="sm"
      title={
        state === 'denied'
          ? 'Allow notifications in your browser site settings.'
          : LABELS[state]
      }
      variant="ghost"
    >
      <Icon />
      <span className="hidden md:inline">{LABELS[state]}</span>
    </Button>
  );
}
