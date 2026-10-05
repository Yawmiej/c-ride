import {
  APIProvider,
  APILoadingStatus,
  useApiLoadingStatus,
} from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';
import { useMemo } from 'react';
import type { Ride } from '@/entities/ride';
import { RideMap } from '@/entities/ride/components/ride-map';
import { env } from '@/shared/config/env';

export function ActiveRideMap({ ride }: { ride: Ride }) {
  if (!env.VITE_GOOGLE_MAPS_API_KEY)
    return (
      <MapMessage text="Map unavailable. Your ride details are shown above." />
    );
  return (
    <APIProvider apiKey={env.VITE_GOOGLE_MAPS_API_KEY}>
      <LoadedRideMap ride={ride} />
    </APIProvider>
  );
}

function LoadedRideMap({ ride }: { ride: Ride }) {
  const status = useApiLoadingStatus();
  const pickup = useMemo(
    () => ({ lat: ride.pickupLat, lng: ride.pickupLng }),
    [ride.pickupLat, ride.pickupLng],
  );
  const dropoff = useMemo(
    () => ({ lat: ride.dropoffLat, lng: ride.dropoffLng }),
    [ride.dropoffLat, ride.dropoffLng],
  );
  if (status === APILoadingStatus.LOADED)
    return <RideMap pickup={pickup} dropoff={dropoff} />;
  if (
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE
  )
    return (
      <MapMessage text="Unable to load the map. Your ride details are still available." />
    );
  return <MapMessage text="Loading map…" />;
}

function MapMessage({ text }: { text: string }) {
  return (
    <div
      role="status"
      className="flex h-full flex-col items-center justify-center gap-3 bg-muted p-6 text-center text-sm text-muted-foreground"
    >
      <MapPin className="size-7" />
      <p>{text}</p>
    </div>
  );
}
