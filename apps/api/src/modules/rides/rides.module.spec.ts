import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CreateRideUseCase } from './application/use-cases/create-ride.use-case';
import { GetRideUseCase } from './application/use-cases/get-ride.use-case';
import { ListAvailableRidesUseCase } from './application/use-cases/list-available-rides.use-case';
import { RideRepository } from './domain/repositories/ride.repository';
import { PrismaRideRepository } from './infrastructure/persistence/prisma-ride.repository';
import { RidesController } from './presentation/controllers/rides.controller';
import { RidesModule } from './rides.module';

describe('RidesModule', () => {
  it('binds the abstract repository and context entry points', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          ignoreEnvVars: true,
          load: [
            () => ({
              auth: { jwtSecret: 'rides-test-secret', jwtExpiresIn: '1h' },
            }),
          ],
        }),
        RidesModule,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    expect(module.get(RidesController)).toBeInstanceOf(RidesController);
    expect(module.get(RideRepository)).toBeInstanceOf(PrismaRideRepository);
    expect(module.get(CreateRideUseCase)).toBeInstanceOf(CreateRideUseCase);
    expect(module.get(GetRideUseCase)).toBeInstanceOf(GetRideUseCase);
    expect(module.get(ListAvailableRidesUseCase)).toBeInstanceOf(
      ListAvailableRidesUseCase,
    );

    await module.close();
  });
});
