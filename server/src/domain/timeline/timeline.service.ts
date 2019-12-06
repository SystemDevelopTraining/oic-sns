import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostItem } from '../entities/post.entity';
import { PostInfos } from '../../../front/src/domain/post/PostInfos';
import { SearchPostParamsDto } from '../../../front/src/domain/post/SearchPostParamsDto';
import { User } from '../entities/user.entity';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(PostItem)
    private readonly postRepository: Repository<PostItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) { }

  async latest(
    params: SearchPostParamsDto,
    googleProfileId: string,
  ): Promise<PostInfos[]> {
    const myUser = await this.userRepository.findOne({ googleProfileId });

    const query = this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.postUser', 'user')
      .innerJoinAndSelect('post.category', 'category')
      .select([
        'post.id as id',
        'post.categoryId as categoryId',
        'post.text as text',
        'post.createdAt as createdAt',
        'user.name as postUserName',
        'user.id as postUserId',
        'category.name as categoryName'
      ])
      .addSelect(
        '(SELECT COUNT(*) FROM comment WHERE post.id = comment.parentPostId)',
        'commentCount',
      )
      .orderBy({ createdAt: 'DESC' })
      .limit(10);

    if (params.basePostId) {
      const basePost = await this.postRepository.findOne(params.basePostId);
      if (params.after && params.after !== 'false')
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
      query.andWhere('post.categoryId= :categoryId', {
        categoryId: params.categoryId,
      });
    }
    if (params.followOnly && params.followOnly !== 'false') {
      query.andWhere(
        'user.id in (select followeeUserId from following where followUserId = :myUserId)',
        { myUserId: myUser.id },
      );
    }

    const posts: PostToTimeline[] = (await query.getRawMany()) as any;
    return Promise.all(
      posts.map<Promise<PostInfos>>(async x => ({
        userId: { id: x.postUserId },
        id: { id: x.id },
        postDate: x.createdAt,
        postText: x.text,
        userName: x.postUserName,
        isMyself: x.postUserId === myUser.id,
        commentCount: x.commentCount,
        categoryName: x.categoryName
      })),
    );
  }
}

export interface PostToTimeline {
  postUserId: number;
  id: number;
  createdAt: Date;
  text: string;
  commentCount: number;
  postUserName: string;
  categoryName: string;
}
