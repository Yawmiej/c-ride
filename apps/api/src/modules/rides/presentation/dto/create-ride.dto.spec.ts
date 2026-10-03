import { BadRequestException } from '@nestjs/common';
import { createValidationPipe } from '@/common/validation/create-validation-pipe';
import { CreateRideDto } from './create-ride.dto';

describe('CreateRideDto', () => {
  const input = {
    pickupLat: 6.5244,
    pickupLng: 3.3792,
    dropoffLat: 6.6018,
    dropoffLng: 3.3515,
  };
  const validate = (body: unknown): Promise<CreateRideDto> =>
    createValidationPipe().transform(body, {
      type: 'body',
      metatype: CreateRideDto,
    });

  it('accepts finite numeric coordinates within geographic bounds', async () => {
    await expect(validate(input)).resolves.toEqual(input);
  });

  it.each([
    { pickupLat: -90.01 },
    { pickupLat: '6.5244' },
    { pickupLng: -180.01 },
    { pickupLng: Number.NaN },
    { dropoffLat: 90.01 },
    { dropoffLng: 180.01 },
    { dropoffLng: Number.POSITIVE_INFINITY },
    { fare: '1.00' },
    { riderId: 'injected-rider-id' },
    { driverId: 'injected-driver-id' },
    { status: 'ACCEPTED' },
  ])('rejects invalid or client-controlled input %j', async (changes) => {
    await expect(validate({ ...input, ...changes })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
