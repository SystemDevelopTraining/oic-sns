import { PostRepository }from '../../domain/post/PostRepository';
import { CreatePostParamsDto }from '../../domain/post/CreatePostParamsDto';
import { CreatePostResult }from '../../domain/post/CreatePostResult';
import { PostInfos }from '../../domain/post/PostInfos';
import { ApiClient }from '../httpAdapters/ApiClient';
import { CreateLoginApplication }from '../../create/CreateLoginApplication';
import { SearchPostParamsDto }from '../../domain/post/SearchPostParamsDto';
import { UnauthorizedErrorHook }from '../UnauthorizedErrorHook';
import { PostId }from '../../domain/post/PostId';
import { CommentInfosDto }from '../../domain/comment/CommentInfosDto';

export class PostRepositoryImpl implements PostRepository {
  public Save(createPostParams: CreatePostParamsDto): Promise<CreatePostResult> {
    const jwt = CreateLoginApplication().GetJwt();
    return new ApiClient(jwt).CreatePost(createPostParams).catch(UnauthorizedErrorHook);
  }

  public Delete(id: PostId): Promise<unknown> {
    const jwt = CreateLoginApplication().GetJwt();
    return new ApiClient(jwt).DeletePost(id).catch(UnauthorizedErrorHook);
  }

  public TakeLatest(searchPostParams: SearchPostParamsDto): Promise<PostInfos[]> {
    const jwt = CreateLoginApplication().GetJwt();
    return new ApiClient(jwt).TakeLatestPosts(searchPostParams).catch(UnauthorizedErrorHook);
  }

  public GetPostComment(postId: PostId): Promise<CommentInfosDto[]> {
    const jwt = CreateLoginApplication().GetJwt();
    return new ApiClient(jwt).GetPostComments(postId);
  }
}
