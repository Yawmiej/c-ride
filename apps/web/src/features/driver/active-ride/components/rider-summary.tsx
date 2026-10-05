import { CircleDot, MapPin, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';
import type { RideDetails } from '@/entities/ride';
import { formatCoordinates } from '@/shared/lib';

export function RiderSummary({ ride }: { ride: RideDetails }) {
  return (
    <section aria-label="Ride details" className="space-y-5 border-y py-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <UserRound aria-hidden="true" className="size-5" />
        </div>
        <div>
          <h2 className="font-semibold">Rider</h2>
          <p className="text-sm text-muted-foreground">
            Rider details are unavailable.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <LocationRow
          icon={<CircleDot className="size-4 text-primary" />}
          label="Pickup"
          value={formatCoordinates(ride.pickupLat, ride.pickupLng)}
        />
        <LocationRow
          icon={<MapPin className="size-4 text-destructive" />}
          label="Dropoff"
          value={formatCoordinates(ride.dropoffLat, ride.dropoffLng)}
        />
      </div>
    </section>
  );
}

function LocationRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span aria-hidden="true" className="mt-0.5">
        {icon}
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
