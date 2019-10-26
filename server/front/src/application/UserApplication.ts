import { MakeUserDto }from '../domain/user/MakeUserDto';
import { MakeUserResult }from '../domain/user/MakeUserResult';
import { UserRepository }from '../domain/user/UserRepository';
import {UserId}from '../domain/user/UserId';
import { UserDto }from '../domain/user/UserDto';

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

  //ユーザidを取得する
  public GetMyUserId():Promise<UserId>{
    return this.repository.GetMyUserId();
  }

  //ユーザidからユーザを取得する
  public GetUser(userId:UserId):Promise<UserDto>{
    return this.repository.GetUser(userId);
  }
}
