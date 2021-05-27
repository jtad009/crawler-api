import { Resolver, Query } from '@nestjs/graphql';
import { CrawlService } from './crawl.service';
import { Meta } from './meta.entity';

@Resolver((of) => Meta)
export class CrawlResolver {
  constructor(private readonly metaService: CrawlService) {}

  @Query((returns) => Meta)
  async getMetas(): Promise<Meta> {
    return await this.metaService.getUrlMeta(
        `https://docs.nestjs.com/techniques/caching`
    //   `https://blog.feedspot.com/nigerian_lifestyle_blogs/`,
    );
  }
}
