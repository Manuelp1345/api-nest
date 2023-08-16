import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, IsInt } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsNotEmpty()
  @MaxLength(30)
  @Field()
  title: string;

  @MaxLength(255)
  @Field({
    nullable: true,
  })
  content: string;

  @IsNotEmpty()
  @IsInt()
  @Field()
  authorId: number;
}
