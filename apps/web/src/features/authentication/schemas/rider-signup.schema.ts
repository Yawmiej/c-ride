import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Use at least 8 characters.')
  .regex(/[a-z]/, 'Include a lowercase letter.')
  .regex(/[A-Z]/, 'Include an uppercase letter.')
  .regex(/\d/, 'Include a number.')
  .regex(/[^a-zA-Z0-9\s]/, 'Include a special character.');

export const riderSignupSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{1,14}$/, 'Use international format, for example +2348012345678.'),
  password: passwordSchema,
});

export type RiderSignupValues = z.infer<typeof riderSignupSchema>;
