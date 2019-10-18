import *as Axios from 'axios';
import { EnvManager }from '../../utils/EnvManager';
import { User, CreateUserParams }from './Protocol';
import { MakeUserResult }from '../../domain/user/MakeUserResult';
import { UserId }from '../../domain/user/UserId';
import { PostInfos }from '../../domain/post/PostInfos';

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
  // 作成したユーザーデータをサーバーとやり取りをする関数
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

  // jwtから自身のユーザIDを取得する
  public async GetMyUserId(jwt: string): Promise<UserId> {
    const response = await this.axios.get('user/v1/my_user', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  }

  //最新10件の投稿を返す
  public async TakeLatestPosts(): Promise<PostInfos[]> {
    const response = await this.axios.get('timeline/v1/latest');
    return response.data;
  }
}
