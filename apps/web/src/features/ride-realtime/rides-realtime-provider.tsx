import { type PropsWithChildren, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  type Coordinates,
  rideKeys,
  useActiveRideQuery,
} from '@/entities/ride';
import { connectSocket, disconnectSocket, getSocket } from '@/shared/realtime';
import { RidesRealtimeContext } from './rides-realtime.context';

type RideStatusChanged = {
  rideId: string;
  status: string;
  timestamp: string;
};

type RideJoined = { rideId: string };

type DriverLocationUpdated = {
  rideId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
};

export function RidesRealtimeProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const rideRoute = useMatch('/:role/rides/:rideId');
  const routeRideId = rideRoute?.params.rideId;
  const { data: activeRide, refetch: refetchActiveRide } = useActiveRideQuery();
  const subscribedRideId = routeRideId ?? activeRide?.id;
  const [driverLocations, setDriverLocations] = useState<
    Record<string, Coordinates>
  >({});

  useEffect(() => {
    const socket = getSocket();

    let disposed = false;
    const recoverActiveRide = async () => {
      if (routeRideId) {
        socket.emit('ride:join', { rideId: routeRideId });
        return;
      }
      const { data: ride } = await refetchActiveRide();
      if (!disposed && socket.connected && ride)
        socket.emit('ride:join', { rideId: ride.id });
    };
    const handleRideJoined = ({ rideId }: RideJoined) => {
      void queryClient.invalidateQueries({ queryKey: rideKeys.detail(rideId) });
    };
    const handleStatusChanged = ({ rideId }: RideStatusChanged) => {
      void queryClient.invalidateQueries({ queryKey: rideKeys.detail(rideId) });
      void queryClient.invalidateQueries({ queryKey: rideKeys.active() });
    };
    const handleLocationUpdated = ({
      rideId,
      latitude,
      longitude,
    }: DriverLocationUpdated) => {
      setDriverLocations((locations) => ({
        ...locations,
        [rideId]: { lat: latitude, lng: longitude },
      }));
    };

    socket.on('connect', recoverActiveRide);
    socket.on('ride:joined', handleRideJoined);
    socket.on('ride:status_changed', handleStatusChanged);
    socket.on('ride:location_updated', handleLocationUpdated);

    // Strict Mode cleans up its first effect before this task runs.
    const connectionTimer = setTimeout(() => {
      if (socket.connected) void recoverActiveRide();
      else connectSocket();
    }, 0);

    return () => {
      disposed = true;
      clearTimeout(connectionTimer);
      socket.off('connect', recoverActiveRide);
      socket.off('ride:joined', handleRideJoined);
      socket.off('ride:status_changed', handleStatusChanged);
      socket.off('ride:location_updated', handleLocationUpdated);
      disconnectSocket();
    };
  }, [queryClient, refetchActiveRide, routeRideId]);

  useEffect(() => {
    const activeRideId = subscribedRideId;
    const socket = getSocket();

    if (activeRideId && socket.connected)
      socket.emit('ride:join', { rideId: activeRideId });
  }, [subscribedRideId]);

  return (
    <RidesRealtimeContext.Provider value={{ driverLocations }}>
      {children}
    </RidesRealtimeContext.Provider>
  );
}
