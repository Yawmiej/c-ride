import { createContext } from 'react';
import type { Coordinates } from '@/entities/ride';

export type RidesRealtimeContextValue = {
  driverLocations: Record<string, Coordinates>;
};

export const RidesRealtimeContext = createContext<RidesRealtimeContextValue>({
  driverLocations: {},
});
