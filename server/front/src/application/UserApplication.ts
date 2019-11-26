import { MakeUserDto }from '../domain/user/MakeUserDto';
import { MakeUserResult }from '../domain/user/MakeUserResult';
import { UserRepository }from '../domain/user/UserRepository';
import {UserId}from '../domain/user/UserId';
import { UserDto }from '../domain/user/UserDto';
import { MyGoogleProfileDto }from '../domain/user/MyGoogleProfileDto';
import { UpdateUserDto }from '../domain/user/UpdateUserDto';

//ユーザに関する機能を提供
export class UserApplication {
  private readonly repository: UserRepository;
  public constructor(repository: UserRepository) {
    this.repository = repository;
  }

  //ユーザを新規作成する
  public MakeUser(makeUserDto: MakeUserDto): Promise<MakeUserResult> {
    return this.repository.MakeUser(makeUserDto);
  }

  //自身のユーザidを取得する
  public GetMyUserId():Promise<UserId>{
    return this.repository.GetMyUserId();
  }

  //ユーザidからユーザを取得する
  public GetUser(userId:UserId):Promise<UserDto>{
    return this.repository.GetUser(userId);
  }

  //自身のユーザを取得する
  public async GetMyUser():Promise<UserDto>{
    return this.repository.GetUser(await this.repository.GetMyUserId());
  }

  //自身のグーグルプロフィールを取得する
  public GetMyUserGoogleProfile():Promise<MyGoogleProfileDto>{
    return this.repository.GetMyUserGoogleProfile();
  }

  //自身のユーザ情報更新する
  public UpdateMyUser(updateUserDto:UpdateUserDto):Promise<unknown>{
    return this.repository.UpdateMyUser(updateUserDto);
  }
  
  //ユーザーを削除する
  public DeleteAccount(): Promise<unknown>{
    return this.repository.DeleteAccount();
  }
}
