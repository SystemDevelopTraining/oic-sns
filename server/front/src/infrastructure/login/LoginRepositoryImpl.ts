import { LoginRepository }from '../../domain/login/LoginRepository';
import Cookies from 'js-cookie';
import { ApiClient }from '../httpAdapters/ApiClient';

//LoginInfoRepositoryの実装
export class LoginRepositoryImpl implements LoginRepository {
  public CheckJwt(): Promise<boolean> {
    return new ApiClient(this.GetJwt()).CheckJwt();
  }
  public GetJwt(): string | undefined {
    return Cookies.get('jwt');
  }
  public SaveJwt(jwt: string): void {
    Cookies.set('jwt', jwt, { expires: 7 });
  }
  public IsLogin(): boolean {
    return Cookies.get('jwt') !== undefined;
  }
  public ClearJwt(): void {
    Cookies.remove('jwt');
  }
}
