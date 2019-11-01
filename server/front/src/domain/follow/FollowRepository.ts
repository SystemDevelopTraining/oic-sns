import { UserId }from '../user/UserId';
import { FollowResult }from './FollowResult';

//フォローかどうかの状態を保存
export interface FollowRepository {
    SaveFollowStatus(id: UserId): Promise<FollowResult>;
  }