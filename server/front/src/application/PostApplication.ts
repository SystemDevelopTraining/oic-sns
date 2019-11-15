import { CreatePostParamsDto }from '../domain/post/CreatePostParamsDto';
import { PostRepository }from '../domain/post/PostRepository';
import { CreatePostResult }from '../domain/post/CreatePostResult';
import { UserId }from '../domain/user/UserId';
import { PostInfosList }from '../domain/post/PostInfosList';

//投稿する機能
export class PostApplication {
  private readonly postRepository: PostRepository;

  public constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }
  //タイムラインで投稿を記録する
  public PostOnTimeline(
    createPostParams: CreatePostParamsDto,
  ): Promise<CreatePostResult> {
    return this.postRepository.Save(createPostParams);
  }

  //投稿一覧を取得する
  public GetPostInfosList(filterUserId?:UserId) :PostInfosList {
    return new PostInfosList([],this.postRepository,filterUserId);
  }
}
