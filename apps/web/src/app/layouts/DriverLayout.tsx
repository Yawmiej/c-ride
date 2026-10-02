import { AppLayout } from './AppLayout';

export function DriverLayout() {
  return <AppLayout navigation={[{ label: 'Available', to: '/driver' }]} userName="Driver" />;
}
