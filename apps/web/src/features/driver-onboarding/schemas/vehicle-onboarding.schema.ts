import { z } from 'zod';
import { carBrands, carColors } from '../vehicle-options';

const licensePlatePattern = /^[A-Z0-9]{2,4}-[A-Z0-9]{2,4}-[A-Z0-9]{1,4}$/;

function normalizeLicensePlate(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const vehicleOnboardingSchema = z.object({
  type: z.enum(['SEDAN', 'SUV', 'HATCHBACK'], {
    required_error: 'Choose a vehicle type.',
  }),
  make: z
    .string()
    .refine(
      (value) => carBrands.includes(value as (typeof carBrands)[number]),
      'Choose a vehicle brand.',
    ),
  model: z.string().trim().min(1, 'Enter the vehicle model.'),
  licensePlate: z
    .string()
    .transform(normalizeLicensePlate)
    .refine(
      (value) => licensePlatePattern.test(value),
      'Enter a license plate in the format LAG-123-AB.',
    ),
  color: z
    .string()
    .refine(
      (value) => carColors.includes(value as (typeof carColors)[number]),
      'Choose a vehicle color.',
    ),
  year: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) =>
        !value ||
        (/^\d{4}$/.test(value) &&
          Number(value) >= 1900 &&
          Number(value) <= new Date().getFullYear() + 1),
      'Enter a valid year.',
    ),
});

export type VehicleOnboardingValues = z.infer<typeof vehicleOnboardingSchema>;
