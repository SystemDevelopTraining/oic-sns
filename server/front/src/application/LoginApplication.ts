import { LoginInfoRepository } from '../domain/login/LoginInfoRepository';

//ログインに関する機能を提供
export class LoginApplication {
  private readonly repository: LoginInfoRepository;
  constructor(repository: LoginInfoRepository) {
    this.repository = repository;
  }

  //ログイン中かどうかを判定する関数
  IsLogin(): boolean {
    return this.repository.IsLogin();
  }
}
