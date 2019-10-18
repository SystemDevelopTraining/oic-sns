import { UserId } from '../user/UserId';

//投稿するのに必要な情報です。
interface InfosConfig {
  userId: UserId;
  userName: string;
  postText: string;
  postDate: Date;
}
