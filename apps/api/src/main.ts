import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createValidationPipe } from './common/validation/create-validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3000);

  app.enableCors({
    origin: 'http://localhost:5173',
  });
  app.useGlobalPipes(createValidationPipe());

  await app.listen(port);
}

void bootstrap();
