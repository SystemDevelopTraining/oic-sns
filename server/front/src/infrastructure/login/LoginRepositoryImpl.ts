import { LoginRepository }from '../../domain/login/LoginRepository';
import Cookies from 'js-cookie';
import { PwaChecker }from '../../utils/PwaChecker';
import { ApiClient }from '../httpAdapters/ApiClient';

//LoginInfoRepositoryの実装
export class LoginRepositoryImpl implements LoginRepository {
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
      Cookies.set('jwt', jwt,{expires: 7});
  }
  public IsLogin(): boolean {
    if (PwaChecker.isPwa)
      return localStorage.getItem('jwt') !== null;
    return Cookies.get('jwt') !== undefined;
  }
  public ClearJwt():void{
    if (PwaChecker.isPwa)
      localStorage.removeItem('jwt');
    else
      Cookies.remove('jwt');
  }
}