import { LoginInfoRepository }from '../../domain/login/LoginInfoRepository';
import Cookies from 'js-cookie';
import { PwaChecker }from '../../utils/PwaChecker';

//LoginInfoRepositoryの実装
export class LoginInfoRepositoryImpl implements LoginInfoRepository {
  public GetJwt(): string | undefined {
    if (PwaChecker.isPwa)
      return localStorage.getItem('jwt') || undefined;
    return Cookies.get('jwt');
  }
  public SaveJwt(jwt: string): void {
    if (PwaChecker.isPwa)
      localStorage.setItem('jwt',jwt);    
    else
      Cookies.set('jwt', jwt);
  }
  public IsLogin(): boolean {
    if (PwaChecker.isPwa)
      return localStorage.getItem('jwt') !== null;
    return Cookies.get('jwt') !== undefined;
  }
}
