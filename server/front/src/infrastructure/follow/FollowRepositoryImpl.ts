import { UserId }from '../../domain/user/UserId';
import { FollowResult }from '../../domain/follow/FollowResult';
import { FollowRepository }from '../../domain/follow/FollowRepository';
import { ApiClient }from '../httpAdapters/ApiClient';
import { CreateLoginInfoApplication }from '../../create/CreateLoginInfoApplication';
import { UnauthorizedErrorHook }from '../UnauthorizedErrorHook';

//フォローかどうかの状態を保存
export class  FollowRepositoryImpl implements FollowRepository {
    public SaveFollowStatus(id: UserId): Promise<FollowResult>{
        const jwt = CreateLoginInfoApplication().GetJwt();
        return  new ApiClient(jwt).FollowOrUnFollow(id).catch(UnauthorizedErrorHook);
    }
}