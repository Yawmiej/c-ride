import type { RideStatus } from './types';

export const rideStatusSteps = [
  'Requested',
  'Driver assigned',
  'In progress',
  'Completed',
];

export const rideStatusDisplay: Record<
  RideStatus,
  { title: string; description: string; step: number }
> = {
  REQUESTED: {
    title: 'Finding your driver',
    description:
      'Your ride has been requested. Waiting for a driver to accept.',
    step: 0,
  },
  ACCEPTED: {
    title: 'Driver on the way',
    description: 'Your driver has accepted your ride.',
    step: 1,
  },
  IN_PROGRESS: {
    title: 'Ride in progress',
    description: 'You’re on your way. Enjoy your ride.',
    step: 2,
  },
  COMPLETED: {
    title: 'Ride completed',
    description: 'You’ve arrived. Thank you for riding with C-Ride.',
    step: 3,
  },
  CANCELLED: {
    title: 'Ride cancelled',
    description: 'This ride has been cancelled. You can request another ride.',
    step: -1,
  },
};
