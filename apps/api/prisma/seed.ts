import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'argon2';
import {
  DriverStatus,
  PrismaClient,
  UserRole,
  UserStatus,
  VehicleType,
} from '../src/generated/prisma';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

const seededPassword = 'Password123!';

async function upsertRider(passwordHash: string) {
  return prisma.user.upsert({
    where: { email: 'rider@example.com' },
    update: {
      firstName: 'John',
      lastName: 'Doe',
      passwordHash,
      phoneNumber: '+234812345678',
      role: UserRole.RIDER,
      status: UserStatus.ACTIVE,
    },
    create: {
      email: 'rider@example.com',
      firstName: 'John',
      lastName: 'Doe',
      passwordHash,
      phoneNumber: '+234812345678',
      role: UserRole.RIDER,
      status: UserStatus.ACTIVE,
    },
  });
}

async function upsertDriverWithVehicle(
  passwordHash: string,
  driver: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    vehicle: {
      type: VehicleType;
      make: string;
      model: string;
      color: string;
      year: number;
      licensePlate: string;
    };
  },
) {
  const user = await prisma.user.upsert({
    where: { email: driver.email },
    update: {
      firstName: driver.firstName,
      lastName: driver.lastName,
      passwordHash,
      phoneNumber: driver.phoneNumber,
      role: UserRole.DRIVER,
      status: UserStatus.ACTIVE,
    },
    create: {
      email: driver.email,
      firstName: driver.firstName,
      lastName: driver.lastName,
      passwordHash,
      phoneNumber: driver.phoneNumber,
      role: UserRole.DRIVER,
      status: UserStatus.ACTIVE,
    },
  });

  const driverProfile = await prisma.driverProfile.upsert({
    where: { userId: user.id },
    update: {
      status: DriverStatus.ACTIVE,
    },
    create: {
      userId: user.id,
      status: DriverStatus.ACTIVE,
    },
  });

  await prisma.vehicle.upsert({
    where: { driverProfileId: driverProfile.id },
    update: driver.vehicle,
    create: {
      driverProfileId: driverProfile.id,
      ...driver.vehicle,
    },
  });
}

async function upsertPendingDriver(passwordHash: string) {
  const user = await prisma.user.upsert({
    where: { email: 'pending.driver@example.com' },
    update: {
      firstName: 'David',
      lastName: 'Adeleke',
      passwordHash,
      phoneNumber: '+234812345679',
      role: UserRole.DRIVER,
      status: UserStatus.ACTIVE,
    },
    create: {
      email: 'pending.driver@example.com',
      firstName: 'David',
      lastName: 'Adeleke',
      passwordHash,
      phoneNumber: '+234812345679',
      role: UserRole.DRIVER,
      status: UserStatus.ACTIVE,
    },
  });

  const driverProfile = await prisma.driverProfile.upsert({
    where: { userId: user.id },
    update: {
      status: DriverStatus.PENDING_ONBOARDING,
    },
    create: {
      userId: user.id,
      status: DriverStatus.PENDING_ONBOARDING,
    },
  });

  await prisma.vehicle.deleteMany({
    where: { driverProfileId: driverProfile.id },
  });
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to seed the database.');
  }

  const passwordHash = await hash(seededPassword);

  await upsertRider(passwordHash);

  await upsertDriverWithVehicle(passwordHash, {
    email: 'driver.one@example.com',
    firstName: 'John',
    lastName: 'Cena',
    phoneNumber: '+234812345680',
    vehicle: {
      type: VehicleType.SEDAN,
      make: 'Toyota',
      model: 'Camry',
      color: 'Silver',
      year: 2022,
      licensePlate: 'CRIDE-101',
    },
  });

  await upsertDriverWithVehicle(passwordHash, {
    email: 'driver.two@example.com',
    firstName: 'John',
    lastName: 'Cena',
    phoneNumber: '+234812345681',
    vehicle: {
      type: VehicleType.SUV,
      make: 'Honda',
      model: 'CR-V',
      color: 'Blue',
      year: 2021,
      licensePlate: 'CRIDE-202',
    },
  });

  await upsertPendingDriver(passwordHash);

  console.info(
    `Seeded C-Ride users. Test password for all seeded accounts: ${seededPassword}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
