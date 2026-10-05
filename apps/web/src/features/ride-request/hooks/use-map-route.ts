import { useQuery } from '@tanstack/react-query';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import type { Coordinates } from '@/entities/ride';

export function useMapRoute(pickup: Coordinates, dropoff: Coordinates) {
  const routesLibrary = useMapsLibrary('routes');
  return useQuery({
    queryKey: ['ride-route', pickup.lat, pickup.lng, dropoff.lat, dropoff.lng],
    enabled: Boolean(routesLibrary),
    queryFn: async () => {
      if (!routesLibrary) throw new Error('Routes library is unavailable.');
      const response = await routesLibrary.Route.computeRoutes({
        origin: { lat: pickup.lat, lng: pickup.lng },
        destination: { lat: dropoff.lat, lng: dropoff.lng },
        travelMode: 'DRIVING',
        fields: ['path'],
      });
      const result = response.routes?.[0];
      if (!result?.path?.length) throw new Error('No driving route found.');
      return result;
    },
    retry: false,
    staleTime: 60_000,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });
}
