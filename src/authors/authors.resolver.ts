import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => Author)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorsService.create(createAuthorInput);
  }

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOne(id);
  }
}