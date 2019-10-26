import { UserRepository }from '../../domain/user/UserRepository';
import { MakeUserResult }from '../../domain/user/MakeUserResult';
import { MakeUserDto }from '../../domain/user/MakeUserDto';
import { UserId }from '~/src/domain/user/UserId';
import { ApiClient }from '../httpAdapters/ApiClient';
import { CreateLoginInfoApplication }from '../../create/CreateLoginInfoApplication';
import { UserDto }from '../../domain/user/UserDto';

// UserRepositoryの実装
export class UserRepositoryimpl implements UserRepository {
  public GetUser(userId: UserId): Promise<UserDto> {
    const apiClient = new ApiClient();
    const jwt = CreateLoginInfoApplication().GetJwt();
    return apiClient.GetUser(userId,jwt || '');
  }
  public GetMyUserId(): Promise<UserId> {
    const apiClient = new ApiClient();
    const jwt = CreateLoginInfoApplication().GetJwt();
    return apiClient.GetMyUserId(jwt || '');
  }
  public async MakeUser(makeUserDto: MakeUserDto): Promise<MakeUserResult> {
    const apiClient = new ApiClient();
    const jwt = CreateLoginInfoApplication().GetJwt();
    return await apiClient.CreateUser({
      name: makeUserDto.name,
      sex: makeUserDto.sex,
      jwt: jwt || '',
    });
  }
}
