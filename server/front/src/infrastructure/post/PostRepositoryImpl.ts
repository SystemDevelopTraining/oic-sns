import { PostRepository }from '../../domain/post/PostRepository';
import { CreatePostParams }from '../../domain/post/CreatePostParams';
import { CreatePostResult }from '../../domain/post/CreatePostResult';

export class PostRepositoryImpl implements PostRepository {
  public Save(createPostParams: CreatePostParams): Promise<CreatePostResult> {
    createPostParams;
    return Promise.resolve({ success: false });
  }
}
