import { PostRepository }from '../../domain/post/PostRepository';
import { CreatePostParamsDto }from '../../domain/post/CreatePostParamsDto';
import { CreatePostResult }from '../../domain/post/CreatePostResult';
import { PostInfos }from '../../domain/post/PostInfos';
import { ApiClient }from '../httpAdapters/ApiClient';
import { CreateLoginInfoApplication }from '../../create/CreateLoginInfoApplication';
import { SearchPostParamsDto }from '../../domain/post/SearchPostParamsDto';

export class PostRepositoryImpl implements PostRepository {
  public Save(createPostParams: CreatePostParamsDto): Promise<CreatePostResult> {
    const jwt = CreateLoginInfoApplication().GetJwt();
    return new ApiClient(jwt).CreatePost(createPostParams);
  }

  public TakeLatest(searchPostParams:SearchPostParamsDto): Promise<PostInfos[]> {
    const jwt = CreateLoginInfoApplication().GetJwt();
    return new ApiClient(jwt).TakeLatestPosts(searchPostParams);
  }
}
