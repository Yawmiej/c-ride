import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly client: RedisClientType;

  constructor(configService: ConfigService) {
    const url = configService.getOrThrow<string>('redis.url');
    this.client = createClient({
      url,
      disableOfflineQueue: true,
      socket: { connectTimeout: 1000 },
    });
    this.client.on('error', () =>
      this.logger.warn('Redis cache connection failed'),
    );
  }

  onModuleInit() {
    void this.client
      .connect()
      .catch(() => this.logger.warn('Redis cache unavailable'));
  }

  onModuleDestroy() {
    if (this.client.isOpen) this.client.destroy();
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.withTimeout().get(key);
    return value === null ? null : (JSON.parse(value) as T);
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    await this.withTimeout().set(key, JSON.stringify(value), {
      expiration: { type: 'EX', value: ttlSeconds },
    });
  }

  async remove(key: string): Promise<void> {
    await this.withTimeout().del(key);
  }

  private withTimeout(): RedisClientType {
    return this.client.withCommandOptions({
      abortSignal: AbortSignal.timeout(1000),
    });
  }
}
