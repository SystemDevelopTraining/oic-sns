import { CreatePostParamsDto }from './CreatePostParamsDto';
import { CreatePostResult }from './CreatePostResult';
import { PostInfos }from './PostInfos';
import { SearchPostParamsDto }from './SearchPostParamsDto';
import { PostId }from './PostId';
import { CommentInfosDto }from '../comment/CommentInfosDto';

export interface PostRepository {
  Save(createPostParams: CreatePostParamsDto): Promise<CreatePostResult>;
  TakeLatest(SearchPostParams: SearchPostParamsDto): Promise<PostInfos[]>;
  Delete(id: PostId): Promise<unknown>;
  GetPostComment(id: PostId): Promise<CommentInfosDto[]>;
}
