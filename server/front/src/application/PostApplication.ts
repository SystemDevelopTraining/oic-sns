import { CreatePostParamsDto }from '../domain/post/CreatePostParamsDto';
import { PostRepository }from '../domain/post/PostRepository';
import { CreatePostResult }from '../domain/post/CreatePostResult';
import { UserId }from '../domain/user/UserId';
import { TimeLine }from '../domain/post/TimeLine';

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

  //タイムラインを取得する
  public GetTimeLine(filterUserId?: UserId): TimeLine {
    return new TimeLine(this.postRepository,filterUserId);
  }

}
