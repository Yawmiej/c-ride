import type { RideStatus } from '@/entities/ride';
import { getErrorMessage } from '@/shared/api';
import { ButtonLoading } from '@/shared/components/button-loading';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { useChangeRideStatusMutation } from '../queries/ride.mutations';

export function RideStatusAction({
  rideId,
  status,
}: {
  rideId: string;
  status: RideStatus;
}) {
  const mutation = useChangeRideStatusMutation(rideId);

  let nextStatus: 'IN_PROGRESS' | 'COMPLETED' | null = null;
  let label = '';
  if (status === 'ACCEPTED') {
    nextStatus = 'IN_PROGRESS';
    label = 'Start Ride';
  } else if (status === 'IN_PROGRESS') {
    nextStatus = 'COMPLETED';
    label = 'Complete Ride';
  }

  return (
    <div className="space-y-3">
      {mutation.isError && (
        <Alert variant="destructive">
          <AlertDescription>
            {getErrorMessage(
              mutation.error,
              'Unable to update this ride. Please try again.',
            )}
          </AlertDescription>
        </Alert>
      )}
      {nextStatus && (
        <ButtonLoading
          className="w-full"
          isLoading={mutation.isPending}
          loadingText={
            nextStatus === 'IN_PROGRESS' ? 'Starting…' : 'Completing…'
          }
          onClick={() => mutation.mutate(nextStatus)}
        >
          {label}
        </ButtonLoading>
      )}
    </div>
  );
}
