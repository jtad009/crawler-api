/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Image {
  @Field({ nullable: true })
  width: number;

  @Field({ nullable: true })
  height: number;

  @Field({ nullable: true })
  url: string;
}

@ObjectType()
export class Meta {
  // eslint-disable-next-line prettier/prettier
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description?: string;

  // eslint-disable-next-line prettier/prettier
  @Field({ nullable: true })
  image: Image;
}
