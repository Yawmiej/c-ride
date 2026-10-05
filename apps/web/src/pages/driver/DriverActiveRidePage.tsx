import { Navigate, useParams } from 'react-router-dom';
import { useActiveRideQuery } from '@/entities/ride';
import { DriverActiveRide } from '@/features/driver/active-ride';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function DriverActiveRidePage() {
  const { rideId = '' } = useParams();
  if (!rideId) return <DriverActiveRideRedirect />;
  return <DriverActiveRide key={rideId} rideId={rideId} />;
}

function DriverActiveRideRedirect() {
  const activeRide = useActiveRideQuery();

  if (activeRide.isPending) return <Skeleton className="h-52 w-full" />;
  if (activeRide.data)
    return <Navigate replace to={`/driver/rides/${activeRide.data.id}`} />;

  return <Navigate replace to="/driver" />;
}
