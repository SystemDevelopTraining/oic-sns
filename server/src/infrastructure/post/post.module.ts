import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Following } from '../../domain/entities/following.entity';
import { PostController } from '../../application/post/post.controller';
import { PostService } from '../../domain/post/service/post.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { User } from '../../domain/entities/user.entity';
import { Post as PostItem } from '../../domain/entities/post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, PostItem])],
    controllers: [PostController],
    providers: [PostService, JwtStrategy],
})
export class PostModule { }
