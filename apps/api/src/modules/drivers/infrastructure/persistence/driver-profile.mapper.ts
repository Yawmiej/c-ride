import { Prisma } from '@/generated/prisma';
import { DriverProfile } from '../../domain/entities/driver-profile.entity';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { DriverStatus } from '../../domain/enums/driver-status.enum';
import { VehicleType } from '../../domain/enums/vehicle-type.enum';

type ProfileWithVehicle = Prisma.DriverProfileGetPayload<{
  include: { vehicle: true };
}>;

export class DriverProfileMapper {
  static toDomain(raw: ProfileWithVehicle): DriverProfile {
    return new DriverProfile({
      id: raw.id,
      userId: raw.userId,
      status: raw.status as DriverStatus,
      isAvailable: raw.isAvailable,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      vehicle: raw.vehicle
        ? new Vehicle({
            id: raw.vehicle.id,
            driverProfileId: raw.vehicle.driverProfileId,
            type: raw.vehicle.type as VehicleType,
            make: raw.vehicle.make,
            model: raw.vehicle.model,
            color: raw.vehicle.color,
            year: raw.vehicle.year,
            licensePlate: raw.vehicle.licensePlate,
            createdAt: raw.vehicle.createdAt,
            updatedAt: raw.vehicle.updatedAt,
          })
        : null,
    });
  }
}
