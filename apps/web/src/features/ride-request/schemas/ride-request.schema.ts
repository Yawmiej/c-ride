import { z } from 'zod';

const locationSchema = z.object({
  label: z.string().min(1),
  lat: z.number().finite().min(-90).max(90),
  lng: z.number().finite().min(-180).max(180),
});

const selectedLocationSchema = locationSchema
  .nullable()
  .refine((location): boolean => location !== null, {
    message: 'Select a location from the suggestions.',
  });

export const rideRequestSchema = z.object({
  pickup: selectedLocationSchema,
  dropoff: selectedLocationSchema,
});

export type SelectedLocation = z.infer<typeof locationSchema>;
export type RideRequestValues = z.input<typeof rideRequestSchema>;
export type RideRequestSubmission = {
  pickup: SelectedLocation;
  dropoff: SelectedLocation;
};
