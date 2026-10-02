import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { VehicleOptionData } from '../types/vehicle.types';

type VehicleOptionProps = {
  option: VehicleOptionData;
  selected: boolean;
  onSelect: (id: VehicleOptionData['id']) => void;
};

export function VehicleOption({ option, selected, onSelect }: VehicleOptionProps) {
  return (
    <button
      aria-pressed={selected}
      className={cn(
        'relative flex min-w-0 flex-1 flex-col items-center rounded-lg border bg-card p-3 text-center transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected && 'border-primary ring-1 ring-primary',
      )}
      onClick={() => onSelect(option.id)}
      type="button"
    >
      {selected && (
        <span className="absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" />
        </span>
      )}
      <img alt="" className="h-16 w-full object-contain" src={option.imageSrc} />
      <span className="mt-2 text-sm font-semibold">{option.label}</span>
      <span className="mt-1 text-xs leading-4 text-muted-foreground">{option.description}</span>
    </button>
  );
}
