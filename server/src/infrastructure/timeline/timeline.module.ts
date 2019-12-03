import { JwtStrategy } from '../strategy/jwt.strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Post as PostItem } from '../../domain/entities/post.entity';
import { TimelineController } from '../../application/timeline/timeline.controller';
import { TimelineService } from '../../domain/timeline/timeline.service';
import { Comment } from '../../domain/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PostItem, Comment])],
  controllers: [TimelineController],
  providers: [TimelineService, JwtStrategy],
})
export class TimelineModule {}
