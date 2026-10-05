import { Navigate } from 'react-router-dom';
import { useActiveRideQuery } from '@/entities/ride';
import { RideRequestScreen } from '@/features/ride-request';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function RiderHomePage() {
  const activeRide = useActiveRideQuery();

  if (activeRide.isPending) return <Skeleton className="h-52 w-full" />;
  if (activeRide.data)
    return <Navigate replace to={`/rider/rides/${activeRide.data.id}`} />;

  return <RideRequestScreen />;
}
