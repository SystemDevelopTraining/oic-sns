import { UserRepository }from '../../domain/user/UserRepository';
import { MakeUserResult }from '../../domain/user/MakeUserResult';
import { MakeUserDto }from '../../domain/user/MakeUserDto';
import { UserId }from '~/src/domain/user/UserId';
import { ApiClient }from '../httpAdapters/ApiClient';
import { CreateLoginInfoApplication }from '../../create/CreateLoginInfoApplication';
import { UserDto }from '../../domain/user/UserDto';
import { UnauthorizedErrorHook }from '../UnauthorizedErrorHook';

// UserRepositoryの実装
export class UserRepositoryimpl implements UserRepository {
  public GetUser(userId: UserId): Promise<UserDto> {
    const jwt = CreateLoginInfoApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return apiClient.GetUser(userId).catch(UnauthorizedErrorHook);
  }
  public GetMyUserId(): Promise<UserId> {
    const jwt = CreateLoginInfoApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return apiClient.GetMyUserId().catch(UnauthorizedErrorHook);
  }
  public async MakeUser(makeUserDto: MakeUserDto): Promise<MakeUserResult> {
    const jwt = CreateLoginInfoApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return await apiClient.CreateUser({
      name: makeUserDto.name,
      sex: makeUserDto.sex,
    }).catch(UnauthorizedErrorHook);
  }
}
