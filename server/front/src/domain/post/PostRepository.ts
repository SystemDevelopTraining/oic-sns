import { CreatePostParamsDto }from './CreatePostParamsDto';
import { CreatePostResult }from './CreatePostResult';
import { PostInfos }from './PostInfos';
import { SearchPostParamsDto }from './SearchPostParamsDto';

export interface PostRepository {
  Save(createPostParams: CreatePostParamsDto): Promise<CreatePostResult>;
  TakeLatest(SearchPostParams:SearchPostParamsDto): Promise<PostInfos[]>;
}
