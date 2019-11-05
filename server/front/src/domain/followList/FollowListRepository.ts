import { FollowListDto }from './followListDto';
import { UserId }from '../user/UserId';

export interface FollowListRepository {
  GetFollowList(id: UserId): Promise<FollowListDto>;
}
