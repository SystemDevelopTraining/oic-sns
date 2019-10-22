import { PostId }from './PostId';
import { UserId }from '../user/UserId';

//投稿を取得するする際のパラメータ
export interface SearchPostParamsDto {
  basePostId?: string;
  userId?: string;
  before?: boolean;
}
