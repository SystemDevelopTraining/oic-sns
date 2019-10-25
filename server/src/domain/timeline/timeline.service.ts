import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostItem } from '../entities/post.entity';
import { PostInfos } from '../../../front/src/domain/post/PostInfos';
import { SearchPostParamsDto } from '../../../front/src/domain/post/SearchPostParamsDto';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(PostItem)
    private readonly postRepository: Repository<PostItem>,
  ) {}

  async latest(params: SearchPostParamsDto): Promise<PostInfos[]> {
    const query = this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.postUser', 'user')
      .select([
        'post.id',
        'post.text',
        'post.createdAt',
        'user.name',
        'user.id',
      ])
      .orderBy({ createdAt: 'DESC' })
      .limit(10);

    if (params.basePostId) {
      const basePost = await this.postRepository.findOne(params.basePostId);
      query.where('post.createdAt < :baseCreatedAt', {
        baseCreatedAt: basePost.createdAt,
      });
    }

    const posts: PostItem[] = (await query.getMany()) as any;

    return posts.map<PostInfos>(x => ({
      userId: { id: x.postUser.id },
      id: { id: x.id },
      postDate: x.createdAt,
      postText: x.text,
      userName: x.postUser.name,
    }));
  }
}
