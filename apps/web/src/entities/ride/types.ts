export type RideStatus =
  'REQUESTED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type Coordinates = { lat: number; lng: number };

export type Ride = {
  id: string;
  riderId: string;
  driverId: string | null;
  status: RideStatus;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  fare: string;
  createdAt: string;
  updatedAt: string;
};
