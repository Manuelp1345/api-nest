import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @IsNotEmpty()
  @MaxLength(30)
  @Field({
    nullable: true,
  })
  title?: string;

  @IsNotEmpty()
  @MaxLength(255)
  @Field({
    nullable: true,
  })
  content?: string;
}
