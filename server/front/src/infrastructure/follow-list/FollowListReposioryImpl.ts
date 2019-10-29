import { FollowListRepository }from '~/src/domain/follow_list/FollowListRepository';
import { FollowListDto }from '~/src/domain/follow_list/followList.dto';
import { ApiClient }from '../httpAdapters/ApiClient';
import { UserId }from '~/src/domain/user/UserId';
import { CreateLoginInfoApplication }from '../../create/CreateLoginInfoApplication';

export class FollowListApplicationImpl implements FollowListRepository {
  public async GetFollowList(id: UserId): Promise<FollowListDto> {
    const jwt = CreateLoginInfoApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return await apiClient.GetFollowList(id);
  }
}
