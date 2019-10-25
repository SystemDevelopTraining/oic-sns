import { PostRepository }from '../../domain/post/PostRepository';
import { CreatePostParamsDto }from '../../domain/post/CreatePostParamsDto';
import { CreatePostResult }from '../../domain/post/CreatePostResult';
import { PostInfos }from '../../domain/post/PostInfos';
import { ApiClient }from '../httpAdapters/ApiClient';
import { CreateLoginInfoApplication }from '../../create/CreateLoginInfoApplication';

export class PostRepositoryImpl implements PostRepository {
  public Save(createPostParams: CreatePostParamsDto): Promise<CreatePostResult> {
    const jwt = CreateLoginInfoApplication().GetJwt();
    return new ApiClient().CreatePost(jwt || '',createPostParams);
  }

  public TakeLatest(): Promise<PostInfos[]> {
    return new ApiClient().TakeLatestPosts();
  }
}
