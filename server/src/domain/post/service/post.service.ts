import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Post as PostItem } from '../../../domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreatePostResult } from '../../../../front/src/domain/post/CreatePostResult';
import { PostDto } from '../post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostItem)
    private readonly postRepository: Repository<PostItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(
    postDto: PostDto,
    googleProfileId: string,
  ): Promise<CreatePostResult> {
    const post = new PostItem();
    post.postUser = await this.userRepository.findOne({ googleProfileId });
    post.text = postDto.text;
    post.categoryId = 1;
    if (postDto.text === '')
      throw new HttpException('投稿が空です', HttpStatus.BAD_REQUEST);
    try {
      await this.postRepository.save(post);
      return { success: true };
    } catch (e) {
      throw new HttpException('投稿に失敗しました', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number,
    googleProfileId: string, ) {
    try {
      const postUser = await this.userRepository.findOne({ googleProfileId });
      const result = await this.postRepository.delete({ id, postUserId: postUser.id })
      if (result.affected === 0) throw "";
    } catch (e) {
      throw new HttpException('投稿削除に失敗しました', HttpStatus.BAD_REQUEST);
    }
  }
}
