import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostItem, Post } from '../../entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CommentDto } from '../comment.dto';
import { Comment } from '../../entities/comment.entity';
import { CreateCommentResult } from '../../../../front/src/domain/post/CreateCommentResult';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(PostItem)
    private readonly postRepository: Repository<PostItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(
    commentDto: CommentDto,
    parentPostId: number,
    googleProfileId: string,
  ): Promise<CreateCommentResult> {
    try {
      const comment = new Comment();
      comment.commentUser = await this.userRepository.findOne({
        googleProfileId,
      });
      comment.parentPost = await this.postRepository.findOne({
        id: parentPostId,
      });
      comment.text = commentDto.text;
      await this.commentRepository.save(comment);
      return { success: true };
    } catch (e) {
      throw new HttpException(
        'コメント投稿に失敗しました',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async delete(id: number, googleProfileId: string) {
    try {
      const commentUser = await this.userRepository.findOne({
        googleProfileId,
      });
      const result = await this.commentRepository.delete({
        id,
        commentUserId: commentUser.id,
      });
      if (result.affected === 0) throw '';
    } catch (e) {
      throw new HttpException(
        'コメントの削除に失敗しました',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
