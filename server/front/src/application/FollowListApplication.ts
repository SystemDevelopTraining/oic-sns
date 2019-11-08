import { FollowListRepository }from '../domain/followList/FollowListRepository';
import { FollowListDto }from '../domain/followList/followListDto';
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
