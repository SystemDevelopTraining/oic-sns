import { FollowListRepository }from '~/src/domain/followList/FollowListRepository';
import { FollowListDto }from '~/src/domain/followList/followListDto';
import { ApiClient }from '../httpAdapters/ApiClient';
import { UserId }from '~/src/domain/user/UserId';
import { CreateLoginApplication }from '../../create/CreateLoginApplication';
import { UnauthorizedErrorHook }from '../UnauthorizedErrorHook';

export class FollowListApplicationImpl implements FollowListRepository {
  public async GetFollowList(id: UserId): Promise<FollowListDto> {
    const jwt = CreateLoginApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return await apiClient.GetFollowList(id).catch(UnauthorizedErrorHook);
  }
}
