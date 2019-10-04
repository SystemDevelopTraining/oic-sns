import *as Axios from 'axios';
import { EnvManager }from '../../utils/EnvManager';
import { User }from './Protocol';

// サーバーにやり取りをするclass
export class ApiClient {
  private axios: Axios.AxiosInstance;

  public constructor() {
    this.axios = Axios.default.create({
      baseURL: EnvManager.ApiServerUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  // サーバーのルートにアクセス
  public async GetRoute(): Promise<string> {
    return (await this.axios.get('', {
      headers: {
        'Content-Type': 'text/plain',
      },
    })).data;
  }

  // ユーザーIDからユーザー情報取得する
  public async GetUser(id: number): Promise<User> {
    return (await this.axios.get('user/v1/' + id)).data;
  }
}
