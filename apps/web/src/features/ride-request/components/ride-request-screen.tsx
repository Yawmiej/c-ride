import { zodResolver } from '@hookform/resolvers/zod';
import {
  APIProvider,
  useApiIsLoaded,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@/shared/api';
import { env } from '@/shared/config/env';
import { useRequestRideMutation } from '../queries/ride.mutations';
import {
  rideRequestSchema,
  type RideRequestValues,
} from '../schemas/ride-request.schema';
import { RideMap } from '@/entities/ride/components/ride-map';
import { RideRequestForm } from './ride-request-form';

export function RideRequestScreen() {
  if (!env.VITE_GOOGLE_MAPS_API_KEY) return <RideRequestContent />;

  return (
    <APIProvider apiKey={env.VITE_GOOGLE_MAPS_API_KEY}>
      <RideRequestContent />
    </APIProvider>
  );
}

function RideRequestContent() {
  const navigate = useNavigate();
  const loaded = useApiIsLoaded();
  const status = useApiLoadingStatus();
  const requestRide = useRequestRideMutation();
  const form = useForm<RideRequestValues>({
    resolver: zodResolver(rideRequestSchema),
    defaultValues: { pickup: null, dropoff: null },
  });
  const pickup = form.watch('pickup');
  const dropoff = form.watch('dropoff');
  let mapMessage = 'Loading map…';
  if (!env.VITE_GOOGLE_MAPS_API_KEY)
    mapMessage = 'Location search and maps are not available yet.';
  else if (
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE
  )
    mapMessage = 'Unable to load the map. Please try again later.';

  async function onSubmit({ pickup, dropoff }: RideRequestValues) {
    if (!pickup || !dropoff) return;
    try {
      const ride = await requestRide.mutateAsync({ pickup, dropoff });
      navigate(`/rider/rides/${ride.id}`);
    } catch {
      // Render the API error beside the request action.
    }
  }

  return (
    <FormProvider {...form}>
      <div className="grid overflow-hidden rounded-xl border bg-card shadow-sm lg:grid-cols-2">
        <RideRequestForm
          onSubmit={form.handleSubmit(onSubmit)}
          pending={requestRide.isPending}
          disabled={!loaded}
          error={
            requestRide.isError
              ? getErrorMessage(
                  requestRide.error,
                  'Unable to request a ride. Please try again.',
                )
              : undefined
          }
        />
        <section
          aria-label="Pickup and drop-off map"
          className="h-96 bg-muted lg:h-auto lg:min-h-144"
        >
          {loaded ? (
            <RideMap pickup={pickup} dropoff={dropoff} />
          ) : (
            <div
              role="status"
              className="flex h-full min-h-96 flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground"
            >
              <MapPin className="size-8" />
              <p className="text-sm">{mapMessage}</p>
            </div>
          )}
        </section>
      </div>
    </FormProvider>
  );
}
