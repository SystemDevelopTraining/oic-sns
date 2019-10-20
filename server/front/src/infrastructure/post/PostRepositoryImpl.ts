import { PostRepository }from '../../domain/post/PostRepository';
import { CreatePostParams }from '../../domain/post/CreatePostParams';
import { CreatePostResult }from '../../domain/post/CreatePostResult';
import { PostInfos }from '../../domain/post/PostInfos';
import { ApiClient }from '../httpAdapters/ApiClient';

export class PostRepositoryImpl implements PostRepository {
  public Save(createPostParams: CreatePostParams): Promise<CreatePostResult> {
    createPostParams;
    return Promise.resolve({ success: true });
  }

  public TakeLatest(): Promise<PostInfos[]> {
    return new ApiClient().TakeLatestPosts();
  }
}
