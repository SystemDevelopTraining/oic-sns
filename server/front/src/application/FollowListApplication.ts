import { FollowListRepository }from '../domain/follow_list/FollowListRepository';
import { FollowListDto }from '../domain/follow_list/followList.dto';
import { UserId }from '../domain/user/UserId';

export class FollowListApplication {
  private readonly repository: FollowListRepository;
  public constructor(repository: FollowListRepository) {
    this.repository = repository;
  }

  //フォローリストを取得する
  public async GetFollowList(id: UserId): Promise<FollowListDto> {
    return this.repository.GetFollowList(id);
  }
}
