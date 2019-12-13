import { CommentRepository }from '../../domain/comment/CommentRepository';
import { CreateCommentParamsDto }from '../../domain/comment/CreateCommentParamsDto';
import { PostId }from '../../domain/post/PostId';
import { CreateCommentResult }from '../../domain/comment/CreateCommentResult';
import { CreateLoginApplication }from '../../create/CreateLoginApplication';
import { ApiClient }from '../httpAdapters/ApiClient';
import { UnauthorizedErrorHook }from '../UnauthorizedErrorHook';
import { CommentInfosDto }from '../../domain/comment/CommentInfosDto';

export class CommentRepositoryImpl implements CommentRepository{
    public  Save(createCommentParams: CreateCommentParamsDto, id: PostId): Promise<CreateCommentResult>{
        const jwt = CreateLoginApplication().GetJwt();
        return new ApiClient(jwt).CreateComment(id, createCommentParams).catch(UnauthorizedErrorHook);
    }
    public GetPostComment(postId: PostId): Promise<CommentInfosDto[]> {
        const jwt = CreateLoginApplication().GetJwt();
        return new ApiClient(jwt).GetPostComments(postId);
      }
}