import { LoginInfoRepository }from '../domain/login/LoginInfoRepository';

//ログインに関する機能を提供
export class LoginApplication {
  private readonly repository: LoginInfoRepository;
  public constructor(repository: LoginInfoRepository) {
    this.repository = repository;
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
}
