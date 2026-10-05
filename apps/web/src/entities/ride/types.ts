export type RideStatus =
  'REQUESTED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type Coordinates = { lat: number; lng: number };

export type RideDriver = {
  id: string;
  firstName: string;
  lastName: string;
  vehicle: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
  } | null;
};

export type RideDetails = Ride & { driver: RideDriver | null };

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
