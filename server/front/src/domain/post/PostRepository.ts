import { CreatePostParams } from './CreatePostParams';
import { CreatePostResult } from './CreatePostResult';

export interface PostRepository {
  Save(createPostParams: CreatePostParams): Promise<CreatePostResult>;
}
