import { CreatePostParamsDto }from '../domain/post/CreatePostParamsDto';
import { PostRepository }from '../domain/post/PostRepository';
import { CreatePostResult }from '../domain/post/CreatePostResult';
import { PostInfos }from '../domain/post/PostInfos';
import { SearchPostParamsDto }from '../domain/post/SearchPostParamsDto';

//投稿する機能
export class PostApplication {
  private postRepository: PostRepository;

  public constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }
  //タイムラインで投稿を記録する
  public PostOnTimeline(
    createPostParams: CreatePostParamsDto,
  ): Promise<CreatePostResult> {
    return this.postRepository.Save(createPostParams);
  }
  //最新の投稿10件を取得する
  public GetLatestPosts(searchPostParams:SearchPostParamsDto = {}): Promise<PostInfos[]> {
    return this.postRepository.TakeLatest(searchPostParams);
  }
}
