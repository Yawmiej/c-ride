import { CircleDot, MapPin } from 'lucide-react';
import type { Ride } from '@/entities/ride';
import { ButtonLoading } from '@/shared/components/button-loading';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/components/ui/card';
import { formatCoordinates, formatFare } from '@/shared/lib';

type RideRequestCardProps = {
  ride: Ride;
  isAccepting: boolean;
  onAccept: (rideId: string) => void;
};

export function RideRequestCard({
  ride,
  isAccepting,
  onAccept,
}: RideRequestCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium">Incoming ride request</p>
        <p className="text-lg font-semibold tabular-nums">
          {formatFare(ride.fare)}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <CircleDot
            aria-hidden="true"
            className="mt-0.5 size-4 text-primary"
          />
          <div>
            <p className="text-xs text-muted-foreground">Pickup</p>
            <p className="text-sm font-medium">
              {formatCoordinates(ride.pickupLat, ride.pickupLng)}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <MapPin
            aria-hidden="true"
            className="mt-0.5 size-4 text-destructive"
          />
          <div>
            <p className="text-xs text-muted-foreground">Dropoff</p>
            <p className="text-sm font-medium">
              {formatCoordinates(ride.dropoffLat, ride.dropoffLng)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <ButtonLoading
          isLoading={isAccepting}
          loadingText="Accepting…"
          onClick={() => onAccept(ride.id)}
        >
          Accept
        </ButtonLoading>
      </CardFooter>
    </Card>
  );
}
