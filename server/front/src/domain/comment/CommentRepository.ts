import { CreateCommentParamsDto } from './CreateCommentParamsDto';
import { CreateCommentResult } from './CreateCommentResult';
import { PostId } from '../post/PostId';
import { CommentInfosDto } from '../comment/CommentInfosDto';

export interface CommentRepository {
    Save(createCommentParams: CreateCommentParamsDto, postId: PostId): Promise<CreateCommentResult>;
    GetPostComment(id: PostId): Promise<CommentInfosDto[]>;
}