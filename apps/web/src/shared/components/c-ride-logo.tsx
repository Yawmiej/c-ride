import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';

type CRideLogoProps = {
  className?: string;
  to?: string;
};

export function CRideLogo({ className, to = '/login' }: CRideLogoProps) {
  return (
    <Link
      aria-label="C-Ride home"
      className={cn(
        'inline-flex items-center gap-1.5 text-lg font-bold tracking-tight text-foreground',
        className,
      )}
      to={to}
    >
      <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
        C
      </span>
      <span>C-Ride</span>
    </Link>
  );
}
