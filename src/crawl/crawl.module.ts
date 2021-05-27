import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CrawlResolver } from './crawl.resolver';

@Module({
  providers: [CrawlService, CrawlResolver],
})
export class CrawlModule {}
