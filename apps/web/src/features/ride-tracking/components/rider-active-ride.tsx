import { Link } from 'react-router-dom';
import { useRideQuery } from '@/entities/ride/ride.queries';
import { rideStatusDisplay } from '@/entities/ride/ride-status';
import { RideStatusProgress } from '@/entities/ride/components/ride-status-progress';
import { getErrorMessage } from '@/shared/api';
import { ButtonLoading } from '@/shared/components/button-loading';
import { Button } from '@/shared/components/ui/button';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { useCancelRideMutation } from '../queries/cancel-ride.mutation';
import { useDriverLocation } from '@/features/ride-realtime';
import { ActiveRideMap } from './active-ride-map';
import { DriverSummary } from './driver-summary';
import { ActiveRideError, ActiveRideSkeleton } from './active-ride-feedback';

export function RiderActiveRide({ rideId }: { rideId: string }) {
  const query = useRideQuery(rideId);
  const cancel = useCancelRideMutation(rideId);
  const driverLocation = useDriverLocation(rideId);
  if (query.isPending) return <ActiveRideSkeleton />;
  if (query.isError)
    return (
      <ActiveRideError
        error={query.error}
        retry={() => {
          void query.refetch();
        }}
        pending={query.isFetching}
      />
    );

  const ride = query.data;
  const display = rideStatusDisplay[ride.status];
  const canCancel = ride.status === 'REQUESTED' || ride.status === 'ACCEPTED';
  const isTerminal = ride.status === 'COMPLETED' || ride.status === 'CANCELLED';

  return (
    <article className="mx-auto max-w-2xl space-y-6 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {display.title}
        </h1>
        <p className="text-sm text-muted-foreground">{display.description}</p>
      </header>
      <RideStatusProgress status={ride.status} />
      {(!isTerminal || ride.driver) && <DriverSummary driver={ride.driver} />}
      <section
        aria-label="Ride map"
        className="h-80 overflow-hidden rounded-xl bg-muted sm:h-96"
      >
        <ActiveRideMap driverLocation={driverLocation} ride={ride} />
      </section>
      {cancel.isError && (
        <Alert variant="destructive">
          <AlertDescription>
            {getErrorMessage(
              cancel.error,
              'Unable to cancel your ride. Please try again.',
            )}
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-3">
        {canCancel && (
          <ButtonLoading
            className="w-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
            variant="outline"
            isLoading={cancel.isPending}
            loadingText="Cancelling ride…"
            onClick={() => cancel.mutate()}
          >
            Cancel Ride
          </ButtonLoading>
        )}
        {isTerminal ? (
          <Button asChild className="w-full">
            <Link to="/rider">Request another ride</Link>
          </Button>
        ) : (
          <ButtonLoading
            className="w-full"
            variant="ghost"
            isLoading={query.isFetching}
            loadingText="Refreshing…"
            disabled={cancel.isPending}
            onClick={() => {
              void query.refetch();
            }}
          >
            Refresh ride
          </ButtonLoading>
        )}
      </div>
    </article>
  );
}
