import { UserId }from '../user/UserId';
import { PostId }from './PostId';

//投稿表示するのに必要な情報
export interface PostInfos {
  id: PostId;
  userId: UserId;
  userName: string;
  postText: string;
  postDate: Date;
}
