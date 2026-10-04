import { Injectable } from '@nestjs/common';
import { GetAccountUseCase } from '../../../identity/application/use-cases/get-account.use-case';
import { DriverEligibility } from '../contracts/driver-eligibility';
import { DriverEligibilityPolicy } from '../../domain/policies/driver-eligibility.policy';
import { DriverProfileRepository } from '../../domain/repositories/driver-profile.repository';

@Injectable()
export class CheckDriverEligibilityUseCase extends DriverEligibility {
  constructor(
    private readonly profiles: DriverProfileRepository,
    private readonly getAccount: GetAccountUseCase,
  ) {
    super();
  }

  async execute(userId: string): Promise<boolean> {
    const account = await this.getAccount.execute(userId);
    if (!account) return false;
    const profile = await this.profiles.findByUserId(userId);
    return DriverEligibilityPolicy.isEligible(account, profile);
  }
}
