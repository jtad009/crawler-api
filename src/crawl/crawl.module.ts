import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CrawlResolver } from './crawl.resolver';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [RedisModule],
  providers: [CrawlService, CrawlResolver],
})
export class CrawlModule {}
