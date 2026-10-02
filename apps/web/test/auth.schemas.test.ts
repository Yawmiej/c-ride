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
    expect(
      vehicleOnboardingSchema.safeParse({
        type: 'SUV',
        make: 'Toyota',
        model: 'RAV4',
        licensePlate: 'ABC 1234',
        color: 'White',
        year: '2024',
      }).success,
    ).toBe(true);
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
});
