import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from '../../application/post/post.controller';
import { PostService } from '../../domain/post/service/post.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { User } from '../../domain/entities/user.entity';
import { Post as PostItem } from '../../domain/entities/post.entity';
import { Comment } from '../../domain/entities/comment.entity';
import { CommentService } from '../../domain/post/service/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, PostItem, Comment])],
  controllers: [PostController],
  providers: [PostService, CommentService, JwtStrategy],
})
export class PostModule {}
