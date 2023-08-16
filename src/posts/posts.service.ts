import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private authorService: AuthorsService,
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    return post;
  }

  async createPost(post: CreatePostInput): Promise<Post> {
    const newPost = await this.postsRepository.create(post);
    const author = await this.getAuthor(post.authorId);
    newPost.author = author;
    return this.postsRepository.save(newPost);
  }

  async updatePost(id: number, post: UpdatePostInput): Promise<Post> {
    const postToUpdate = await this.postsRepository.findOne({
      where: { id },
    });
    const updatedPost = Object.assign(postToUpdate, post);
    return this.postsRepository.save(updatedPost);
  }

  async getAuthor(id: number): Promise<Author> {
    const author = await this.authorService.findOne(id);
    return author;
  }
}
