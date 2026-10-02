import { BadRequestException } from '@nestjs/common';
import { createValidationPipe } from '@/common/validation/create-validation-pipe';
import { VehicleType } from '../../domain/enums/vehicle-type.enum';
import { CreateVehicleDto } from './create-vehicle.dto';

describe('CreateVehicleDto', () => {
  const input = {
    type: VehicleType.SEDAN,
    make: ' Toyota ',
    model: ' Corolla ',
    color: ' Silver ',
    year: 2022,
    licensePlate: ' lag 123 ab ',
  };
  const validate = (body: unknown): Promise<CreateVehicleDto> =>
    createValidationPipe().transform(body, {
      type: 'body',
      metatype: CreateVehicleDto,
    });

  it('normalizes the canonical vehicle input', async () => {
    await expect(validate(input)).resolves.toMatchObject({
      ...input,
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      licensePlate: 'LAG-123-AB',
    });
  });

  it.each([
    { type: 'TRUCK' },
    { make: ' ' },
    { model: '' },
    { color: 10 },
    { year: 'true' },
    { year: '2022.5' },
    { year: 1899 },
    { licensePlate: 'invalid' },
    { driverProfileId: 'injected' },
    { userId: 'injected' },
    { status: 'ACTIVE' },
    { isAvailable: true },
  ])('rejects invalid or client-controlled input %j', async (changes) => {
    await expect(validate({ ...input, ...changes })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
