export const RIDE_SOCKET_EVENTS = {
  GET_RIDES: 'get-rides',
  RIDES_LIST: 'rides:list',
  JOIN: 'ride:join',
  JOINED: 'ride:joined',
  ERROR: 'ride:error',
  STATUS_CHANGED: 'ride:status_changed',
} as const;

export const rideRoom = (rideId: string): string => `ride:${rideId}`;
