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

  get id() {
    return this.props.id;
  }

  get driverProfileId() {
    return this.props.driverProfileId;
  }

  get licensePlate() {
    return this.props.licensePlate;
  }

  toSafeObject(): VehicleProps {
    return { ...this.props };
  }
}
