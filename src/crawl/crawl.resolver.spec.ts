import { Test, TestingModule } from '@nestjs/testing';
import { RedisModule } from '../redis/redis.module';
import { CrawlResolver } from './crawl.resolver';
import { CrawlService } from './crawl.service';
import { INestApplication } from '@nestjs/common';

describe('CrawlResolver', () => {
  let app: INestApplication;
  let resolver: CrawlResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [CrawlService, CrawlResolver],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    resolver = module.get<CrawlResolver>(CrawlResolver);
  });

  it('it should be defined', async () => {
    expect(resolver).toBeDefined();
  });
});
