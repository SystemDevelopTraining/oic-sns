import { PostApplication }from '../application/PostApplication';
import { PostRepositoryImpl }from '../infrastructure/post/PostRepositoryImpl';
import { CommentRepositoryImpl }from '../infrastructure/comment/CommentRepositoryImpl';

export function CreatePostApplication(): PostApplication {
  return new PostApplication(new PostRepositoryImpl(), new CommentRepositoryImpl);
}
