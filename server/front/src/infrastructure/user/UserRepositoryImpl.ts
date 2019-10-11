import { UserRepository }from '../../domain/user/UserRepository';
import { MakeUserResult }from '../../domain/user/MakeUserResult';
import { MakeUserDto }from '../../domain/user/UserDto';
import { UserId }from '~/src/domain/user/UserId';

//UserRepositoryの実装
export class UserRepositoryimpl implements UserRepository {
  public GetMyUserId(): Promise<UserId> {
    return Promise.resolve({id: 1});
  }
  public async MakeUser(makeUserDto: MakeUserDto): Promise<MakeUserResult> {
    makeUserDto;
    if (Math.random() * 10 > 5)throw '失敗';
    return { userId: { id: 5 } };
  }
}
