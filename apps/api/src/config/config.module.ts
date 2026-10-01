import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import { validateEnvironment } from './env.validation';
import firebaseConfig from './firebase.config';
import redisConfig from './redis.config';
import telemetryConfig from './telemetry.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [
        appConfig,
        authConfig,
        databaseConfig,
        redisConfig,
        firebaseConfig,
        telemetryConfig,
      ],
      validate: validateEnvironment,
    }),
  ],
})
export class ConfigurationModule {}
