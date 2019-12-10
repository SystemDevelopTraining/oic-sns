import { CreatePostParamsDto }from '../domain/post/CreatePostParamsDto';
import { PostRepository }from '../domain/post/PostRepository';
import { CreatePostResult }from '../domain/post/CreatePostResult';
import { UserId }from '../domain/user/UserId';
import { TimeLine }from '../domain/post/TimeLine';
import { CommentRepository }from '../domain/comment/CommentRepository';

//投稿する機能
export class PostApplication {
  private readonly postRepository: PostRepository;
  private readonly commentRepository: CommentRepository;

  public constructor(postRepository: PostRepository, commentRepository: CommentRepository) {
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
  }
  //タイムラインで投稿を記録する
  public PostOnTimeline(
    createPostParams: CreatePostParamsDto,
  ): Promise<CreatePostResult> {
    return this.postRepository.Save(createPostParams);
  }

  //タイムラインを取得する
  public GetTimeLine(filterUserId?: UserId): TimeLine {
    return new TimeLine(this.postRepository, this.commentRepository, filterUserId);
  }

}
