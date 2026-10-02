import { AppLayout } from './AppLayout';

export function RiderLayout() {
  return <AppLayout navigation={[{ label: 'Home', to: '/rider' }]} userName="Rider" />;
}
