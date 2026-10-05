import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma';
import { DriverEligibilityPolicy } from '../../domain/policies/driver-eligibility.policy';
import { DriverProfileMapper } from './driver-profile.mapper';

/** Infrastructure-only coordination for a transaction owned by another context. */
@Injectable()
export class PrismaDriverEligibility {
  async lockAndCheck(
    transaction: Prisma.TransactionClient,
    userId: string,
  ): Promise<boolean> {
    // Hold the account, profile, and vehicle stable until acceptance commits.
    const rows = await transaction.$queryRaw<{ id: string }[]>`
      SELECT u.id
      FROM "User" u
      JOIN "DriverProfile" p ON p."userId" = u.id
      JOIN "Vehicle" v ON v."driverProfileId" = p.id
      WHERE u.id = ${userId}::uuid
      FOR UPDATE OF u, p, v
    `;
    if (rows.length === 0) return false;

    const account = await transaction.user.findUniqueOrThrow({
      where: { id: userId },
      include: { driverProfile: { include: { vehicle: true } } },
    });
    const profile = account.driverProfile
      ? DriverProfileMapper.toDomain(account.driverProfile)
      : null;
    return DriverEligibilityPolicy.isEligible(account, profile);
  }
}
