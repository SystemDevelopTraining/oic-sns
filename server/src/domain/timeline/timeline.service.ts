import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostItem } from '../entities/post.entity';
import { PostInfos } from '../../../front/src/domain/post/PostInfos';
import { SearchPostParamsDto } from '../../../front/src/domain/post/SearchPostParamsDto';
import { User } from '../entities/user.entity';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(PostItem)
    private readonly postRepository: Repository<PostItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async latest(params: SearchPostParamsDto, googleProfileId: string): Promise<PostInfos[]> {
    const query = this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.postUser', 'user')
      .select([
        'post.id',
        'post.categoryId',
        'post.text',
        'post.createdAt',
        'user.name',
        'user.id',
      ])
      .orderBy({ createdAt: 'DESC' })
      .limit(10);

    if (params.basePostId) {
      const basePost = await this.postRepository.findOne(params.basePostId);
      if (params.after)
        query.where('post.createdAt > :baseCreatedAt', {
          baseCreatedAt: basePost.createdAt,
        });
      else
        query.where('post.createdAt < :baseCreatedAt', {
          baseCreatedAt: basePost.createdAt,
        });
    }

    if (params.userId) {
      query.andWhere('user.id= :userId', { userId: params.userId });
    }

    if (params.categoryId) {
      query.andWhere('post.categoryId= :categoryId', { categoryId: params.categoryId });
    }


    const posts: PostItem[] = (await query.getMany()) as any;
    const myUser = await this.userRepository.findOne({ googleProfileId })
    return posts.map<PostInfos>(x => ({
      userId: { id: x.postUser.id },
      id: { id: x.id },
      postDate: x.createdAt,
      postText: x.text,
      userName: x.postUser.name,
      isMyself: x.postUser.id === myUser.id
    }));
  }
}
