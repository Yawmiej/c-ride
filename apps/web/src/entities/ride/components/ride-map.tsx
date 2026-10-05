import { AdvancedMarker, Map, useMap } from '@vis.gl/react-google-maps';
import { MapPin, Navigation } from 'lucide-react';
import { useEffect } from 'react';
import type { Coordinates } from '../types';
import { env } from '@/shared/config/env';
import { RideRouteLine } from './ride-route-line';

type RideMapProps = {
  pickup: Coordinates | null;
  dropoff: Coordinates | null;
  driverLocation?: Coordinates | null;
};

const initialCenter = { lat: 6.5244, lng: 3.3792 };

export function RideMap({ pickup, dropoff, driverLocation }: RideMapProps) {
  return (
    <Map
      className="h-full w-full"
      defaultCenter={initialCenter}
      defaultZoom={12}
      mapId={env.VITE_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID'}
      mapTypeControl={false}
      streetViewControl={false}
      fullscreenControl={false}
      gestureHandling="cooperative"
      maxZoom={17}
    >
      <MapBounds pickup={pickup} dropoff={dropoff} />
      {pickup && dropoff && <RideRouteLine pickup={pickup} dropoff={dropoff} />}
      {pickup && (
        <AdvancedMarker position={pickup} title="Pickup">
          <div className="rounded-full border bg-card p-2 shadow-md">
            <MapPin className="size-5 text-primary" />
          </div>
        </AdvancedMarker>
      )}
      {dropoff && (
        <AdvancedMarker position={dropoff} title="Drop-off">
          <div className="rounded-full border bg-card p-2 shadow-md">
            <MapPin className="size-5 text-destructive" />
          </div>
        </AdvancedMarker>
      )}
      {driverLocation && (
        <AdvancedMarker position={driverLocation} title="Driver location">
          <div className="rounded-full bg-primary p-3 text-primary-foreground shadow-md">
            <Navigation className="size-5" />
          </div>
        </AdvancedMarker>
      )}
    </Map>
  );
}

function MapBounds({ pickup, dropoff }: RideMapProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (pickup && dropoff) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(pickup);
      bounds.extend(dropoff);
      map.fitBounds(bounds, 80);
    } else {
      const location = pickup ?? dropoff;
      if (location) {
        map.panTo(location);
        map.setZoom(15);
      }
    }
  }, [map, pickup, dropoff]);

  return null;
}
