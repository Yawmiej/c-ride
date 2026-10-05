import { Link } from 'react-router-dom';
import {
  ActiveRideMap,
  rideStatusDisplay,
  RideStatusProgress,
  type RideDetails,
  useRideQuery,
} from '@/entities/ride';
import { getErrorMessage } from '@/shared/api';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useDriverLocation } from '../hooks/use-driver-location';
import { RiderSummary } from './rider-summary';
import { RideStatusAction } from './ride-status-action';

export function DriverActiveRide({ rideId }: { rideId: string }) {
  const query = useRideQuery(rideId);

  if (query.isPending) return <DriverActiveRideSkeleton />;
  if (query.isError)
    return (
      <DriverActiveRideError
        error={query.error}
        retry={() => {
          void query.refetch();
        }}
      />
    );

  return <DriverActiveRideContent ride={query.data} />;
}

function DriverActiveRideContent({ ride }: { ride: RideDetails }) {
  const driverLocation = useDriverLocation(ride.id, ride.status);
  const display = rideStatusDisplay[ride.status];

  return (
    <article className="mx-auto max-w-2xl space-y-6 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {display.title}
        </h1>
        <p className="text-sm text-muted-foreground">{display.description}</p>
      </header>
      <RideStatusProgress status={ride.status} />
      <RiderSummary ride={ride} />
      <section
        aria-label="Ride map"
        className="h-80 overflow-hidden rounded-xl bg-muted sm:h-96"
      >
        <ActiveRideMap driverLocation={driverLocation} ride={ride} />
      </section>
      <RideStatusAction rideId={ride.id} status={ride.status} />
    </article>
  );
}

function DriverActiveRideSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-xl border bg-card p-6 sm:p-8">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-4 w-64 max-w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

function DriverActiveRideError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded-xl border bg-card p-6">
      <div>
        <h1 className="text-lg font-semibold">Unable to load this ride</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {getErrorMessage(error, 'Please try again in a moment.')}
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={retry} variant="outline">
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link to="/driver">Back to available rides</Link>
        </Button>
      </div>
    </div>
  );
}
