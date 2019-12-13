import { LoginRepository }from '../../domain/login/LoginRepository';
import { ApiClient }from '../httpAdapters/ApiClient';

//LoginInfoRepositoryの実装
export class LoginRepositoryForPwaImpl implements LoginRepository {
  public CheckJwt(): Promise<boolean> {
    return new ApiClient(this.GetJwt()).CheckJwt();
  }
  public GetJwt(): string | undefined {
    return localStorage.getItem('jwt') || undefined;
  }
  public SaveJwt(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }
  public IsLogin(): boolean {
    return localStorage.getItem('jwt') !== null;
  }
  public ClearJwt(): void {
    localStorage.removeItem('jwt');
  }
}
