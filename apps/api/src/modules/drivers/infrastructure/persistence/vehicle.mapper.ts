import { Vehicle as PrismaVehicle, VehicleType as PrismaVehicleType } from '@/generated/prisma';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleType } from '../../domain/enums/vehicle-type.enum';

export class VehicleMapper {
  static toDomain(raw: PrismaVehicle): Vehicle {
    return new Vehicle({
      id: raw.id,
      driverProfileId: raw.driverProfileId,
      type: raw.type as VehicleType,
      make: raw.make,
      model: raw.model,
      color: raw.color,
      year: raw.year,
      licensePlate: raw.licensePlate,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(vehicle: Vehicle) {
    const data = vehicle.toSafeObject();
    return {
      ...data,
      type: data.type as PrismaVehicleType,
    };
  }
}
