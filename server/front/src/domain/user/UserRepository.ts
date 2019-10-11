import { MakeUserResult } from './MakeUserResult';
import { MakeUserDto } from './UserDto';

//ユーザに関するデータの扱う
export interface UserRepository {
  //ユーザを作成する
  MakeUser(makeUserDto: MakeUserDto): Promise<MakeUserResult>;
}
