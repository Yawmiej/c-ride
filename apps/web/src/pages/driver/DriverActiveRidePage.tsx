import { useParams } from 'react-router-dom';
import { DriverActiveRide } from '@/features/driver/active-ride';

export function DriverActiveRidePage() {
  const { rideId = '' } = useParams();
  return <DriverActiveRide key={rideId} rideId={rideId} />;
}
