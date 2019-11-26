import { CreateLoginApplication }from '../create/CreateLoginApplication';

//認証エラーをキャッチして、リダイレクトする
export function UnauthorizedErrorHook(e:{response:{status:number}}){
   if (e.response.status === 401){
      const loginApp = CreateLoginApplication();
      loginApp.ClearJwt();
      loginApp.Login();
  }
   return Promise.reject(e);
}