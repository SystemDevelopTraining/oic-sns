import { LoginInfoRepository } from '../../domain/login/LoginInfoRepository';
import Cookies from 'js-cookie';

//LoginInfoRepositoryの実装
export class LoginInfoRepositoryImpl implements LoginInfoRepository {
  IsLogin(): boolean {
    return Cookies.get('jwt') !== undefined;
  }
}
