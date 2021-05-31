import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RedisModule } from '../src/redis/redis.module';
import { CrawlService } from '../src/crawl/crawl.service';
import { CrawlResolver } from '../src/crawl/crawl.resolver';

describe('CrawlResolver', () => {
  let app: INestApplication;
  const userQuery = `
  query getMetas ($url: String!) {
    getMetas (url: $url) {
        id
        title
        description
        image {
            width
            height
            url
        }
    }
}
  `;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule,
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
          playground: true,
        }),
      ],
      providers: [CrawlService, CrawlResolver],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  it('e2e test to get meta data', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        variables: {
          url: 'https://graphql.com',
        },
        query: userQuery,
      })
      .expect(({ body }) => {
        expect(body).toMatchObject({
          data: {
            getMetas: {
              id: 1,
              title: 'Explore GraphQL: The API for modern apps.',
              description:
                'Find the best GraphQL tutorials, best practices, and case studies.',
              image: {
                width: null,
                height: null,
                url: 'https://www.graphql.com/twitter-card.png',
              },
              // source: 'fromCache',
            },
          },
        });
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
