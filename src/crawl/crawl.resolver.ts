import { Resolver, Query, Args } from '@nestjs/graphql';
import { RedisService } from 'src/redis/redis.service';
import { CrawlService } from './crawl.service';
import { GetUrlArgs } from './dto/args/get-url-args';
import { Meta } from './meta.entity';

@Resolver((of) => Meta)
export class CrawlResolver {
  constructor(
    private readonly metaService: CrawlService,
    private cacheManager: RedisService,
  ) {}

  @Query(() => Meta)
  async getMetas(@Args() urlArgs: GetUrlArgs): Promise<Meta> {
    return await this.metaService.getUrlMeta(urlArgs.url);
  }
}
