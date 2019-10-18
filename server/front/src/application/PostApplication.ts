import { CreatePostParams }from '../domain/post/CreatePostParams';
import { PostRepository }from '../domain/post/PostRepository';
import { CreatePostResult }from '../domain/post/CreatePostResult';

//投稿する機能
export class PostApplication {
  private postRepository: PostRepository;

  public constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }
  //タイムラインで投稿を記録する
  public PostOnTimeline(
    createPostParams: CreatePostParams,
  ): Promise<CreatePostResult> {
    return this.postRepository.Save(createPostParams);
  }
}
