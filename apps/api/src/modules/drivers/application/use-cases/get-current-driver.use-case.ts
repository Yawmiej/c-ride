import { Injectable } from '@nestjs/common';
import { DriverProfileData } from '../../domain/entities/driver-profile.entity';
import { DriverProfileRepository } from '../../domain/repositories/driver-profile.repository';

@Injectable()
export class GetCurrentDriverUseCase {
  constructor(private readonly profiles: DriverProfileRepository) {}

  async execute(userId: string): Promise<DriverProfileData | null> {
    const profile = await this.profiles.findByUserId(userId);
    return profile?.toSafeObject() ?? null;
  }
}
