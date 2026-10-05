import { Navigate } from 'react-router-dom';
import { useActiveRideQuery } from '@/entities/ride';
import { AvailableRidesScreen } from '@/features/driver/available-rides';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function DriverHomePage() {
  const activeRide = useActiveRideQuery();

  if (activeRide.isPending) return <Skeleton className="h-52 w-full" />;
  if (activeRide.data)
    return <Navigate replace to={`/driver/rides/${activeRide.data.id}`} />;

  return <AvailableRidesScreen />;
}
