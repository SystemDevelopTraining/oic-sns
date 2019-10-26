import { PostApplication }from '../application/PostApplication';
import { PostRepositoryImpl }from '../infrastructure/post/PostRepositoryImpl';

export function CreatePostApplication(): PostApplication {
  return new PostApplication(new PostRepositoryImpl());
}
