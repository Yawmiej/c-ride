import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { VehicleMapper } from './vehicle.mapper';

@Injectable()
export class PrismaVehicleRepository implements VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }

  async findByDriverProfileId(driverProfileId: string): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { driverProfileId },
    });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }

  async findByLicensePlate(licensePlate: string): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { licensePlate },
    });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }
}
