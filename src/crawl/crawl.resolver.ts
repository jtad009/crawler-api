import { Resolver, Query, Args } from '@nestjs/graphql';
import { RedisService } from 'src/redis/redis.service';
import { CrawlService } from './crawl.service';
import { GetUrlArgs } from './dto/args/get-url-args';
import { Meta } from './meta.entity';

@Resolver(() => Meta)
export class CrawlResolver {
  constructor(
    private readonly metaService: CrawlService,
    private cacheManager: RedisService,
  ) {}

  @Query(() => Meta)
  async getMetas(@Args() urlArgs: GetUrlArgs): Promise<Meta> {
    const cachedData = await this.cacheManager.get(urlArgs.url);
    if (cachedData) {
      return {
        source: 'fromCache',
        ...cachedData,
      };
    }
    const serverResponse = await this.metaService.getUrlMeta(urlArgs.url);
    if (!cachedData) {
      await this.cacheManager.set(urlArgs.url, serverResponse);
    }
    return {
      source: 'fromNetwork',
      ...serverResponse,
    };
  }
}
