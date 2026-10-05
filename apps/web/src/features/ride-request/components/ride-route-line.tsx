import { ControlPosition, MapControl, useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';
import type { Coordinates } from '@/entities/ride';
import { useMapRoute } from '../hooks/use-map-route';

type RideRouteLineProps = { pickup: Coordinates; dropoff: Coordinates };

export function RideRouteLine({ pickup, dropoff }: RideRouteLineProps) {
  const map = useMap();
  const route = useMapRoute(pickup, dropoff);

  useEffect(() => {
    if (!map || !route.data) return;
    const polylines = route.data.createPolylines({
      polylineOptions: { strokeWeight: 5, clickable: false },
    });
    polylines.forEach((line) => line.setMap(map));
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(pickup);
    bounds.extend(dropoff);
    route.data.path?.forEach((point) => bounds.extend(point));
    map.fitBounds(bounds, 80);

    return () => polylines.forEach((line) => line.setMap(null));
  }, [map, route.data, pickup, dropoff]);

  if (!route.isPending && !route.isError) return null;

  return (
    <MapControl position={ControlPosition.TOP_CENTER}>
      <p
        role="status"
        className="m-3 rounded-lg border bg-card px-4 py-2 text-sm text-card-foreground shadow-sm"
      >
        {route.isError
          ? 'Route unavailable. You can still request your ride.'
          : 'Finding a driving route…'}
      </p>
    </MapControl>
  );
}
