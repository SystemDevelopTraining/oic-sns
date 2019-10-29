import { LoginInfoRepository }from '../../domain/login/LoginInfoRepository';
import Cookies from 'js-cookie';
import { PwaChecker }from '../../utils/PwaChecker';
import { ApiClient }from '../httpAdapters/ApiClient';

//LoginInfoRepositoryの実装
export class LoginInfoRepositoryImpl implements LoginInfoRepository {
  public CheckJwt(): Promise<boolean> {
    return new ApiClient(this.GetJwt()).CheckJwt();
    }
  public GetJwt(): string | undefined {
    if (PwaChecker.isPwa)
      return localStorage.getItem('jwt') || undefined;
    return Cookies.get('jwt');
  }
  public SaveJwt(jwt: string): void {
    if (PwaChecker.isPwa)
      localStorage.setItem('jwt',jwt);
    else
      Cookies.set('jwt', jwt,{expires: 15});
  }
  public IsLogin(): boolean {
    if (PwaChecker.isPwa)
      return localStorage.getItem('jwt') !== null;
    return Cookies.get('jwt') !== undefined;
  }
  public ClearJwt():void{
    Cookies.remove('jwt');
  }
}
