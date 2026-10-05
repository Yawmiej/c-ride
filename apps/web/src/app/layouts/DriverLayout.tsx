import { AppLayout } from './AppLayout';

export function DriverLayout() {
  return (
    <AppLayout
      navigation={[
        { label: 'Available', to: '/driver' },
        {
          label: 'Active',
          to: '/driver/active',
          activePathPrefix: '/driver/rides/',
        },
      ]}
      userName="Driver"
    />
  );
}
