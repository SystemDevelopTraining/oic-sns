import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';

//認証エラーをキャッチして、リダイレクトする
export function UnauthorizedErrorHook(e:{response:{status:number}}){
   if (e.response.status === 401){
    CreateLoginInfoApplication().ClearJwt();
    location.href = '/';
  }
   return Promise.reject(e);
}