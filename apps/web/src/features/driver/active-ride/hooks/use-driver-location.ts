import { useEffect, useState } from 'react';
import type { Coordinates, RideStatus } from '@/entities/ride';
import { getSocket } from '@/shared/realtime';

const locationStatuses = new Set<RideStatus>(['ACCEPTED', 'IN_PROGRESS']);
const simulatedOffsets = [
  { lat: 0, lng: 0 },
  { lat: 0.00012, lng: 0.00008 },
  { lat: 0.00024, lng: 0.00016 },
  { lat: 0.00036, lng: 0.00024 },
  { lat: 0.00048, lng: 0.00032 },
];
const simulatedLocationIntervalMs = 5_000;

export function useDriverLocation(rideId: string, status: RideStatus) {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const isRideActive = locationStatuses.has(status);

  useEffect(() => {
    if (!isRideActive || !navigator.geolocation) return;

    const socket = getSocket();
    let latestLocation: Coordinates | null = null;
    let simulationTimer: ReturnType<typeof setInterval> | undefined;
    let isMounted = true;

    const emitLocation = (coordinates: Coordinates) => {
      latestLocation = coordinates;
      if (!socket.connected) return;
      socket.emit('driver:location', {
        rideId,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      });
    };
    const beginSimulation = (initialLocation: Coordinates) => {
      let offsetIndex = 0;

      const emitSimulatedLocation = () => {
        const offset = simulatedOffsets[offsetIndex] ?? simulatedOffsets[0]!;
        const nextLocation = {
          lat: initialLocation.lat + offset.lat,
          lng: initialLocation.lng + offset.lng,
        };
        offsetIndex = (offsetIndex + 1) % simulatedOffsets.length;
        setLocation(nextLocation);
        emitLocation(nextLocation);
      };

      emitSimulatedLocation();
      simulationTimer = setInterval(
        emitSimulatedLocation,
        simulatedLocationIntervalMs,
      );
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (!isMounted) return;
        beginSimulation({ lat: coords.latitude, lng: coords.longitude });
      },
      undefined,
      { enableHighAccuracy: true, maximumAge: 15_000 },
    );
    const resendLatestLocation = () => {
      if (latestLocation) emitLocation(latestLocation);
    };

    socket.on('connect', resendLatestLocation);

    return () => {
      isMounted = false;
      if (simulationTimer) clearInterval(simulationTimer);
      socket.off('connect', resendLatestLocation);
    };
  }, [isRideActive, rideId]);

  return location;
}
