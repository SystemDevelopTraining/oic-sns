import * as Axios from 'axios';
import { EnvManager } from '../../utils/EnvManager';
import { User, CreateUserParams } from './Protocol';
import { MakeUserResult } from '../../domain/user/MakeUserResult';

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
  //作成したユーザーデータをサーバーとやり取りをする関数
  public async CreateUser(
    createUserParams: CreateUserParams,
  ): Promise<MakeUserResult> {
    const response = await this.axios.post(
      'user/v1',
      {
        name: createUserParams.name,
        sex: createUserParams.sex,
      },
      {
        headers: {
          Authorization: `Bearer ${createUserParams.jwt}`,
        },
      },
    );
    return response.data;
  }
}
