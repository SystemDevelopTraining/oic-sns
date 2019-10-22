import { CreatePostParamsDto }from './CreatePostParamsDto';
import { CreatePostResult }from './CreatePostResult';
import { PostInfos }from './PostInfos';

export interface PostRepository {
  Save(createPostParams: CreatePostParamsDto): Promise<CreatePostResult>;
  TakeLatest(): Promise<PostInfos[]>;
}
