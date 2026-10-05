import { useContext } from 'react';
import type { Coordinates } from '@/entities/ride';
import { RidesRealtimeContext } from '../rides-realtime.context';

export function useDriverLocation(rideId: string): Coordinates | null {
  return useContext(RidesRealtimeContext).driverLocations[rideId] ?? null;
}
