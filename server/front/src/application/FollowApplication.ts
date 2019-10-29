import { UserId }from '../domain/user/UserId';
import { FollowRepository }from '../domain/follow/FollowRepository';
import { FollowResult }from '../domain/follow/FollowResult';

//ユーザーのフォローやアンフォローの処理を担当する
export class FollowApplication{
    private readonly repository:FollowRepository;

    public constructor(repository:FollowRepository){
        this.repository = repository;
    }

    //フォローやアンフォローをする
    public FollowOrUnfollow(id: UserId):Promise<FollowResult>{
        return this.repository.SaveFollowStatus(id);
    }
}