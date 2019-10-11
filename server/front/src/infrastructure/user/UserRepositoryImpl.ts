import { UserRepository }from '../../domain/user/UserRepository';
import { MakeUserResult }from '../../domain/user/MakeUserResult';
import { MakeUserDto }from '../../domain/user/UserDto';

//UserRepositoryの実装
export class UserRepositoryimpl implements UserRepository {
  public async MakeUser(makeUserDto: MakeUserDto): Promise<MakeUserResult> {
    makeUserDto;
    if (Math.random() * 10 > 5)throw '失敗';
    return { userId: { id: 5 } };
  }
}
