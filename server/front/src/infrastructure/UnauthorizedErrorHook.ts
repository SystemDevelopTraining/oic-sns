import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';

//認証エラーをキャッチして、リダイレクトする
export function UnauthorizedErrorHook(e:{response:{status:number}}){
   if (e.response.status === 401){
      const loginApp = CreateLoginInfoApplication();
      loginApp.ClearJwt();
      loginApp.Login();
  }
   return Promise.reject(e);
}