import { Injectable } from '@nestjs/common';
import { GetDriverProfileUseCase } from '../../../drivers/application/use-cases/get-driver-profile.use-case';
import { DriverProfileData } from '../../../drivers/domain/entities/driver-profile.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRole } from '../../domain/enums/user-role.enum';
import { UserRepository } from '../../domain/repositories/user.repository';
import { AuthenticationError } from '../errors/authentication.error';

export interface CurrentUserResult extends UserEntity {
  driverProfile?: DriverProfileData | null;
}

@Injectable()
export class GetCurrentUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly drivers: GetDriverProfileUseCase,
  ) {}

  async execute(userId: string): Promise<CurrentUserResult> {
    const user = await this.users.findById(userId);
    if (!user?.isActive()) throw new AuthenticationError();
    const result = user.toSafeObject();
    const profile: CurrentUserResult = { ...result };

    if (user.role === UserRole.DRIVER) {
      profile.driverProfile = await this.drivers.execute(user.id);
    }
    return profile;
  }
}
