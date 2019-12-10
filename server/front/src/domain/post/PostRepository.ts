import { CreatePostParamsDto }from './CreatePostParamsDto';
import { CreatePostResult }from './CreatePostResult';
import { PostInfos }from './PostInfos';
import { SearchPostParamsDto }from './SearchPostParamsDto';
import { PostId }from './PostId';

export interface PostRepository {
  Save(createPostParams: CreatePostParamsDto): Promise<CreatePostResult>;
  TakeLatest(SearchPostParams: SearchPostParamsDto): Promise<PostInfos[]>;
  Delete(id: PostId): Promise<unknown>;
}
