import { Car } from 'lucide-react';
import type { RideDriver } from '@/entities/ride';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';

export function DriverSummary({ driver }: { driver: RideDriver | null }) {
  if (!driver)
    return (
      <div className="flex items-center gap-3 border-y py-5 text-sm text-muted-foreground">
        <Car aria-hidden="true" className="size-6" />
        <p>Driver details will appear once a driver is assigned.</p>
      </div>
    );
  const name = `${driver.firstName} ${driver.lastName}`.trim();
  const initials =
    `${driver.firstName.charAt(0)}${driver.lastName.charAt(0)}`.toUpperCase();

  return (
    <section
      aria-label="Your driver"
      className="flex items-center gap-3 border-y py-5"
    >
      <Avatar className="size-12">
        <AvatarFallback className="bg-accent font-semibold text-accent-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 space-y-1">
        <h2 className="font-semibold">{name}</h2>
        {driver.vehicle ? (
          <p className="text-sm text-muted-foreground">
            {driver.vehicle.make} {driver.vehicle.model} ·{' '}
            {driver.vehicle.color} · {driver.vehicle.licensePlate}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Vehicle details unavailable.
          </p>
        )}
      </div>
    </section>
  );
}
