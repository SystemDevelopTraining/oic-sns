import { MakeUserResult }from './MakeUserResult';
import { MakeUserDto }from './UserDto';
import { UserId }from './UserId';

//ユーザに関するデータの扱う
export interface UserRepository {
  //ユーザを作成する
  MakeUser(makeUserDto: MakeUserDto): Promise<MakeUserResult>;
  //ユーザidを取得する
  GetMyUserId():Promise<UserId>;
}
