import { MakeUserResult }from './MakeUserResult';
import { MakeUserDto }from './MakeUserDto';
import { UserId }from './UserId';
import { UserDto }from './UserDto';
import { MyGoogleProfileDto }from './MyGoogleProfileDto';

//ユーザに関するデータの扱う
export interface UserRepository {
  //ユーザを作成する
  MakeUser(makeUserDto: MakeUserDto): Promise<MakeUserResult>;
  //自分のユーザidを取得する
  GetMyUserId():Promise<UserId>;
  //ユーザidに対応するユーザを検索して返す
  GetUser(userId:UserId):Promise<UserDto>;
  //自分のグーグルプロフィールを取得する
  GetMyUserGoogleProfile():Promise<MyGoogleProfileDto>;
}
