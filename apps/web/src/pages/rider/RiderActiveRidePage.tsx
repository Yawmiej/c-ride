import { useParams } from 'react-router-dom';
import { RiderActiveRide } from '@/features/ride-tracking/components/rider-active-ride';

export function RiderActiveRidePage() {
  const { rideId = '' } = useParams();
  return <RiderActiveRide key={rideId} rideId={rideId} />;
}
