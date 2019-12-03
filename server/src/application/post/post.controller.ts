import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Delete,
  Param,
} from '@nestjs/common';
import { PostService } from '../../domain/post/service/post.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from '../../domain/auth-user/jwt.payload';
import { CreatePostResult } from '../../../front/src/domain/post/CreatePostResult';
import { PostDto } from '../../domain/post/post.dto';
import { CommentService } from '../../domain/post/service/comment.service';
import { CommentDto } from '../../domain/post/comment.dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}
  @Post('v1')
  @UseGuards(AuthGuard('jwt'))
  async post(
    @Body() postDto: PostDto,
    @Req() req: Request,
  ): Promise<CreatePostResult> {
    return await this.postService.create(
      postDto,
      (req.user as JwtPayload).thirdPartyId,
    );
  }

  @Delete('v1/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: number, @Req() req: Request) {
    await this.postService.delete(id, (req.user as JwtPayload).thirdPartyId);
    return { success: true };
  }

  @Post('v1/:id/comment')
  @UseGuards(AuthGuard('jwt'))
  async comment(
    @Body() commentDto: CommentDto,
    @Param('id') id: number,
    @Req() req: Request,
  ) {
    console.log('aaaa');
    await this.commentService.create(
      commentDto,
      id,
      (req.user as JwtPayload).thirdPartyId,
    );
  }
}
