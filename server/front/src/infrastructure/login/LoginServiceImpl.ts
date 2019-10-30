import { LoginService }from '../../domain/login/LoginService';
import { PwaChecker }from '../../utils/PwaChecker';
import { EnvManager }from '../../utils/EnvManager';
import router from '../../router';

export class LoginServiceImpl implements LoginService{
    public Login():void{
        if (PwaChecker.isPwa) {
            window.open(
              EnvManager.ApiServerUrl + '/auth-user/v1',
              'about:blank',
              '_self',
            );
            window.addEventListener('message', e => {
              router.push({ name: e.data });
            });
          }else {
            location.href = EnvManager.ApiServerUrl + '/auth-user/v1';
          }
    }
}