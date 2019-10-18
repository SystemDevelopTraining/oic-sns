import { UserId } from '../user/UserId';

//投稿表示するのに必要な情報
interface InfosConfig {
  userId: UserId;
  userName: string;
  postText: string;
  postDate: Date;
}
