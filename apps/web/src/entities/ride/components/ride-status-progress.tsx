import { Check, X } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils';
import { rideStatusDisplay, rideStatusSteps } from '../ride-status';
import type { RideStatus } from '../types';

export function RideStatusProgress({ status }: { status: RideStatus }) {
  if (status === 'CANCELLED')
    return (
      <Badge variant="destructive">
        <X className="size-3" />
        Cancelled
      </Badge>
    );
  const current = rideStatusDisplay[status].step;

  return (
    <ol aria-label="Ride progress" className="grid grid-cols-4">
      {rideStatusSteps.map((label, index) => (
        <li
          key={label}
          aria-current={index === current ? 'step' : undefined}
          className="relative flex flex-col items-center gap-3 text-center"
        >
          {index < rideStatusSteps.length - 1 && (
            <div
              aria-hidden="true"
              className={cn(
                'absolute left-1/2 top-3 h-0.5 w-full',
                index < current ? 'bg-primary' : 'bg-border',
              )}
            />
          )}
          <span
            className={cn(
              'relative z-10 flex size-6 items-center justify-center rounded-full border-4 border-card',
              index <= current
                ? 'bg-primary text-primary-foreground'
                : 'bg-border text-muted-foreground',
            )}
          >
            {index < current ? (
              <Check aria-hidden="true" className="size-3" />
            ) : (
              <span className="size-1 rounded-full bg-current" />
            )}
          </span>
          <span
            className={cn(
              'text-xs',
              index <= current
                ? 'font-medium text-foreground'
                : 'text-muted-foreground',
            )}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}
