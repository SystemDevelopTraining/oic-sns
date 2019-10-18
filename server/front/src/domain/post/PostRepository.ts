import { CreatePostParams }from './CreatePostParams';
import { CreatePostResult }from './CreatePostResult';
import { PostInfos }from './PostInfos';

export interface PostRepository {
  Save(createPostParams: CreatePostParams): Promise<CreatePostResult>;
  TakeLatest(): Promise<PostInfos[]>;
}
