import { Test, TestingModule } from '@nestjs/testing';
import { CrawlResolver } from './crawl.resolver';

describe('CrawlResolver', () => {
  let resolver: CrawlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlResolver],
    }).compile();

    resolver = module.get<CrawlResolver>(CrawlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
