import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Post as PostItem } from '../../../domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreatePostResult } from '../../../../front/src/domain/post/CreatePostResult';
import { CreatePostParamsDto } from '../../../../front/src/domain/post/CreatePostParamsDto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostItem)
    private readonly postRepository: Repository<PostItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(
    postDto: CreatePostParamsDto,
    googleProfileId: string,
  ): Promise<CreatePostResult> {
    const post = new PostItem();
    post.postUser = await this.userRepository.findOne({ googleProfileId });
    post.text = postDto.text;
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
      await this.postRepository.delete({ id, postUserId: postUser.id })
    } catch (e) {
      throw new HttpException('投稿削除に失敗しました', HttpStatus.BAD_REQUEST);
    }
  }
}
