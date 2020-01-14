import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { PostService } from '../../domain/post/service/post.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from '../../domain/auth-user/jwt.payload';
import { CreatePostResult } from '../../../front/src/domain/post/CreatePostResult';
import { PostDto } from '../../domain/post/post.dto';
import { CommentService } from '../../domain/post/service/comment.service';
import { CommentDto } from '../../domain/post/comment.dto';
import { CommentInfosDto } from '../../../front/src/domain/comment/CommentInfosDto';
import { CreateCommentResult } from '../../../front/src/domain/comment/CreateCommentResult';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) { }
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
  ): Promise<CreateCommentResult> {
    return await this.commentService.create(
      commentDto,
      id,
      (req.user as JwtPayload).thirdPartyId,
    );
  }

  @Get('v1/:id/comment')
  @UseGuards(AuthGuard('jwt'))
  async comments(
    @Param('id') id: number,
  ): Promise<CommentInfosDto[]> {
    return this.commentService.getComments({ id: id })
  }
}
