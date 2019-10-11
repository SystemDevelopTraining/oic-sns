import { Controller, Post, Param, UseGuards, Body, Req } from '@nestjs/common';
import { PostService } from '../../domain/post/service/post.service';
import { Post as PostItem } from '../../domain/entities/post.entity';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from '../../domain/post/post.dto';
import { Request } from 'express';
import { JwtPayload } from '../../domain/auth-user/jwt.payload';
import { PostResult } from '../../domain/post/responce/post.result';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }
    @Post('v1')
    @UseGuards(AuthGuard('jwt'))
    async post(@Body() postDto: PostDto, @Req() req: Request): Promise<PostResult> {
        return await this.postService.create(postDto, (req.user as JwtPayload).thirdPartyId);
    }
}
