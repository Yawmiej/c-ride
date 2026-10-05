import { useCallback, useEffect, useState } from 'react';
import { getSocket } from '@/shared/realtime';
import type {
  AvailableRidesResponse,
  RideSocketError,
} from '../types/available-rides.types';

export function useAvailableRides() {
  const [rides, setRides] = useState<AvailableRidesResponse['items']>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    const socket = getSocket();
    setError(undefined);
    setIsLoading(true);

    if (socket.connected) socket.emit('get-rides');
  }, []);

  useEffect(() => {
    const socket = getSocket();

    const requestRides = () => {
      setError(undefined);
      setIsLoading(true);
      socket.emit('get-rides');
    };
    const receiveRides = ({ items }: AvailableRidesResponse) => {
      setRides(items);
      setIsLoading(false);
    };
    const receiveError = ({ event, message }: RideSocketError) => {
      if (event !== 'get-rides') return;
      setError(message);
      setIsLoading(false);
    };
    const handleConnectError = () => {
      setError('Unable to load available rides. Please try again.');
      setIsLoading(false);
    };

    socket.on('connect', requestRides);
    socket.on('rides:list', receiveRides);
    socket.on('ride:error', receiveError);
    socket.on('connect_error', handleConnectError);

    if (socket.connected) requestRides();

    return () => {
      socket.off('connect', requestRides);
      socket.off('rides:list', receiveRides);
      socket.off('ride:error', receiveError);
      socket.off('connect_error', handleConnectError);
    };
  }, []);

  return { rides, error, isLoading, refresh };
}
