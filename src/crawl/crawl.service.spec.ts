import { Test, TestingModule } from '@nestjs/testing';
import { RedisModule } from '../redis/redis.module';
import { CrawlResolver } from './crawl.resolver';
import { CrawlService } from './crawl.service';

describe('CrawlService', () => {
  let service: CrawlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [CrawlService, CrawlResolver],
    }).compile();

    service = module.get<CrawlService>(CrawlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('It should return the largest image from a list of images', () => {
    const images = [
      {
        width: 120,
        height: 50,
        url: 'https://www.graphql.com/twitter-card.png',
      },
      {
        width: 120,
        height: 70,
        url: 'https://www.graphql.com/twitter-card.png',
      },
      {
        width: 130,
        height: 150,
        url: 'https://www.graphql.com/twitter-card.png',
      },
    ];
    expect(service.sortImageBySize(images)).toMatchObject({
      width: 130,
      height: 150,
      url: 'https://www.graphql.com/twitter-card.png',
    });
  });

  it('it should return atleast on image from a suplied url', async () => {
    const data = await service.getImageFromHtml(
      'https://gabrieltanner.org/blog/nestjs-graphqlserver',
    );
    expect(data).toHaveProperty('height');
    expect(data).toHaveProperty('url');
    expect(data).toHaveProperty('width');
  });
});
