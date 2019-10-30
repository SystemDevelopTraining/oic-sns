import { LoginInfoRepository }from '../domain/login/LoginInfoRepository';
import { LoginService }from '../domain/login/LoginService';

//ログインに関する機能を提供
export class LoginApplication {
  private readonly repository: LoginInfoRepository;
  private readonly service:LoginService;

  public constructor(repository: LoginInfoRepository,service:LoginService) {
    this.repository = repository;
    this.service = service;
  }

  //ログイン処理をする
  public Login():void{
    this.service.Login();
  }

  //ログイン中かどうかを判定する関数
  public IsLogin(): boolean {
    return this.repository.IsLogin();
  }

  // Jwtのデータをゲットするmethod
  public GetJwt(): string | undefined {
    return this.repository.GetJwt();
  }
  // Jwtのデータを保存するmethod
  public SaveJwt(jwt: string): void {
    this.repository.SaveJwt(jwt);
  }

  //Jwtが正しいか確認する関数
  public CheckJwt():Promise<boolean>{
    return this.repository.CheckJwt();
  }

  //Jwtをクリアする関数
  public ClearJwt():void{
    this.repository.ClearJwt();
  }
}
