import { FollowListDto }from './followList.dto';
import { UserId }from '../user/UserId';

export interface FollowListRepository {
  GetFollowList(id: UserId): Promise<FollowListDto>;
}
