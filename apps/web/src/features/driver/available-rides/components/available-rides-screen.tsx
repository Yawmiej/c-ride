import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '@/shared/api';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useAcceptRideMutation } from '../queries/ride.mutations';
import { useAvailableRides } from '../hooks/use-available-rides';
import { RideRequestCard } from './ride-request-card';

function AvailableRidesSkeleton() {
  return (
    <div
      aria-label="Loading available rides"
      className="space-y-4"
      role="status"
    >
      {[1, 2].map((item) => (
        <Skeleton className="h-52 w-full" key={item} />
      ))}
    </div>
  );
}

export function AvailableRidesScreen() {
  const navigate = useNavigate();
  const { rides, error, isLoading, refresh } = useAvailableRides();
  const acceptRide = useAcceptRideMutation();
  const [acceptanceError, setAcceptanceError] = useState<string>();

  async function accept(rideId: string) {
    setAcceptanceError(undefined);
    try {
      const ride = await acceptRide.mutateAsync(rideId);
      refresh();
      navigate(`/driver/rides/${ride.id}`);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 409) {
        setAcceptanceError('This ride was just accepted by another driver.');
      } else {
        setAcceptanceError('Unable to accept this ride. Please try again.');
      }
      refresh();
    }
  }

  return (
    <section className="mx-auto max-w-xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Incoming ride requests
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a request to start your next ride.
        </p>
      </header>

      {(error || acceptanceError) && (
        <Alert variant="destructive">
          <AlertTitle>Unable to update rides</AlertTitle>
          <AlertDescription>{acceptanceError ?? error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <AvailableRidesSkeleton />
      ) : error ? (
        <Button onClick={refresh} variant="outline">
          Try again
        </Button>
      ) : rides.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <h2 className="font-semibold">No ride requests right now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            New requests will appear here when they are available.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <RideRequestCard
              isAccepting={
                acceptRide.isPending && acceptRide.variables === ride.id
              }
              key={ride.id}
              onAccept={accept}
              ride={ride}
            />
          ))}
        </div>
      )}
    </section>
  );
}
