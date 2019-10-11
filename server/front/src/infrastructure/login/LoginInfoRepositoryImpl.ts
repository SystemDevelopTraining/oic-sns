import { LoginInfoRepository }from '../../domain/login/LoginInfoRepository';
import Cookies from 'js-cookie';

//LoginInfoRepositoryの実装
export class LoginInfoRepositoryImpl implements LoginInfoRepository {
  GetJwt(): string | undefined {
    return Cookies.get('jwt');
  }
  SaveJwt(jwt: string): void {
    Cookies.set('jwt', jwt);
  }
  public IsLogin(): boolean {
    return Cookies.get('jwt') !== undefined;
  }
}
