import { describe, expect, it } from 'vitest';
import { riderSignupSchema } from '@/features/authentication/schemas/rider-signup.schema';
import { vehicleOnboardingSchema } from '@/features/driver-onboarding/schemas/vehicle-onboarding.schema';

describe('authentication form schemas', () => {
  it('accepts a backend-compatible rider registration payload', () => {
    expect(
      riderSignupSchema.safeParse({
        fullName: 'Ada Lovelace',
        email: 'ada@example.com',
        phoneNumber: '+2348012345678',
        password: 'Secure1!',
      }).success,
    ).toBe(true);
  });

  it('rejects a weak password and a local phone number', () => {
    const result = riderSignupSchema.safeParse({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      phoneNumber: '08012345678',
      password: 'password',
    });

    expect(result.success).toBe(false);
  });

  it('requires a supported vehicle and valid details', () => {
    const validVehicle = vehicleOnboardingSchema.safeParse({
      type: 'SUV',
      make: 'Toyota',
      model: 'RAV4',
      licensePlate: 'lag 123 ab',
      color: 'White',
      year: '2024',
    });
    expect(validVehicle.success).toBe(true);
    if (validVehicle.success) {
      expect(validVehicle.data.licensePlate).toBe('LAG-123-AB');
    }
    expect(
      vehicleOnboardingSchema.safeParse({
        type: 'TRUCK',
        make: '',
        model: '',
        licensePlate: '',
        color: '',
        year: '1800',
      }).success,
    ).toBe(false);
  });

  it('explains the required license plate format', () => {
    const result = vehicleOnboardingSchema.safeParse({
      type: 'SUV',
      make: 'Toyota',
      model: 'RAV4',
      licensePlate: 'INVALID',
      color: 'White',
      year: '2024',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Enter a license plate in the format LAG-123-AB.',
      );
    }
  });
});
