import { Module, CacheModule } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { url } from 'inspector';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore.create(configService.get('REDIS_URL')),
        // host: configService
        //   .get('REDIS_URL')
        //   .split('@')[1]
        //   .split('@')[0]
        //   .trim()
        //   .split(':')[0],
        // port: configService.get('REDIS_URL').split('@')[1].split(':')[1].trim(),

        // ttl: configService.get('CACHE_TTL'),
        // max: configService.get('MAX_ITEM_IN_CACHE'),
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
