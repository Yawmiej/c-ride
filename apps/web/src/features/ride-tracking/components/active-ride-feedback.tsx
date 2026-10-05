import { Link } from 'react-router-dom';
import { ApiError } from '@/shared/api';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert';
import { Button } from '@/shared/components/ui/button';
import { ButtonLoading } from '@/shared/components/button-loading';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function ActiveRideSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading your ride"
      className="mx-auto max-w-2xl space-y-6 rounded-xl border bg-card p-6 sm:p-8"
    >
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-4 w-64 max-w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export function ActiveRideError({
  error,
  retry,
  pending,
}: {
  error: unknown;
  retry: () => void;
  pending: boolean;
}) {
  let title = 'Unable to load your ride';
  let description = 'Please try again in a moment.';
  let canRetry = true;
  if (
    error instanceof ApiError &&
    (error.status === 400 || error.status === 404)
  ) {
    title = 'Ride not found';
    description = 'This ride does not exist or the link is invalid.';
    canRetry = false;
  } else if (
    error instanceof ApiError &&
    (error.status === 401 || error.status === 403)
  ) {
    title = 'Ride unavailable';
    description =
      'You do not have access to this ride. Check that you are signed in to the correct account.';
    canRetry = false;
  }
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Alert variant="destructive">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      <div className="flex gap-3">
        {canRetry && (
          <ButtonLoading
            isLoading={pending}
            loadingText="Loading…"
            onClick={retry}
          >
            Try again
          </ButtonLoading>
        )}
        <Button asChild variant="outline">
          <Link to="/rider">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
