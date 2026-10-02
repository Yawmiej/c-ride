import { vehicleOptions } from '../vehicle-options';
import type { VehicleOptionData } from '../types/vehicle.types';
import { VehicleOption } from './vehicle-option';

type VehicleSelectorProps = {
  value?: VehicleOptionData['id'];
  onValueChange: (value: VehicleOptionData['id']) => void;
};

export function VehicleSelector({ value, onValueChange }: VehicleSelectorProps) {
  return (
    <div aria-label="Vehicle type" className="grid grid-cols-3 gap-3" role="group">
      {vehicleOptions.map((option) => (
        <VehicleOption
          key={option.id}
          onSelect={onValueChange}
          option={option}
          selected={value === option.id}
        />
      ))}
    </div>
  );
}
