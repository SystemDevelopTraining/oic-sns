import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { PostService } from '../../domain/post/service/post.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from '../../domain/auth-user/jwt.payload';
import { CreatePostParamsDto } from '../../../front/src/domain/post/CreatePostParamsDto';
import { CreatePostResult } from '../../../front/src/domain/post/CreatePostResult';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('v1')
  @UseGuards(AuthGuard('jwt'))
  async post(
    @Body() postDto: CreatePostParamsDto,
    @Req() req: Request,
  ): Promise<CreatePostResult> {
    return await this.postService.create(
      postDto,
      (req.user as JwtPayload).thirdPartyId,
    );
  }
}
