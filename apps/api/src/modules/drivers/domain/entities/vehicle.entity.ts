import { VehicleType } from '../enums/vehicle-type.enum';

export interface VehicleProps {
  id: string;
  driverProfileId: string;
  type: VehicleType;
  make: string;
  model: string;
  color: string;
  year: number | null;
  licensePlate: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Vehicle {
  constructor(private readonly props: VehicleProps) {}

  toSafeObject(): VehicleProps {
    return { ...this.props };
  }
}
