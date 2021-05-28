import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CrawlResolver } from './crawl.resolver';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [CrawlService, CrawlResolver],
})
export class CrawlModule {}
