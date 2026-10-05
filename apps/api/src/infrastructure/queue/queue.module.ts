import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          url: configService.getOrThrow<string>('redis.url'),
          enableOfflineQueue: false,
          maxRetriesPerRequest: null,
          connectTimeout: 1000,
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
