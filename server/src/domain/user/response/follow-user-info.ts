import { UserId } from '../../UserId';

//フォローした、フォローされているユーザの情報
export interface FollowUserInfo {
  name: string;
  id: UserId;
}
