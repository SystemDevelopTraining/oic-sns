import { CreateUserParams }from './Protocol';
import { MakeUserResult }from '../../domain/user/MakeUserResult';
import { UserId }from '../../domain/user/UserId';
import { PostInfos }from '../../domain/post/PostInfos';
import { UserDto }from '../../domain/user/UserDto';
import { CreatePostParamsDto }from '../../domain/post/CreatePostParamsDto';
import { CreatePostResult }from '../../domain/post/CreatePostResult';
import { SearchPostParamsDto }from '../../domain/post/SearchPostParamsDto';
import { FollowResult }from '../../domain/follow/FollowResult';
import { CreateAxios, MyAxios }from './CreateAxios';
import { FollowListDto }from '../../domain/followList/followListDto';
import { PostId }from '../../domain/post/PostId';
import { MyGoogleProfileDto }from '../../domain/user/MyGoogleProfileDto';

// サーバーにやり取りをするclass
export class ApiClient {
  private axios: MyAxios;

  public constructor(jwt?: string) {
    this.axios = CreateAxios(jwt);
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
  public async GetUser(id: UserId): Promise<UserDto> {
    return (await this.axios.get('user/v1/' + id.id, {
      useCache: true
    })).data;
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
        schoolYear: createUserParams.schoolYear,
        classYear: createUserParams.classNumber,
        studySubjectId: createUserParams.studySubjectId,
        courseId: createUserParams.courseId,
      }
    );
    return response.data;
  }

  // jwtから自身のユーザIDを取得する
  public async GetMyUserId(): Promise<UserId> {
    const response = await this.axios.get('user/v1/my_user', {
      useCache: true
    });
    return response.data;
  }

  public async GetFollowList(id: UserId): Promise<FollowListDto> {
    return (await this.axios.get('user/v1/' + id.id + '/follows', { useCache: true })).data;
  }
  //最新10件の投稿を返す
  public async TakeLatestPosts(
    params: SearchPostParamsDto,
  ): Promise<PostInfos[]> {
    const response = await this.axios.get('timeline/v1/latest', { params, useCache: true });
    return response.data;
  }

  //投稿を生成する
  public async CreatePost(
    params: CreatePostParamsDto,
  ): Promise<CreatePostResult> {
    const response = await this.axios.post('post/v1', params, {
    });
    return response.data;
  }


  //投稿を削除する
  public async DeletePost(id: PostId): Promise<unknown> {
    const response = await this.axios.delete('post/v1/' + id.id);
    return response.data;
  }

  //jwtが正しいか確認する
  public async CheckJwt(): Promise<boolean> {
    try {
      await this.axios.get('auth-user/v1/jwt_check', { useCache: true });
    }catch (error) {
      return false;
    }
    return true;
  }

  //フォローアンフォローリクエストする
  public async FollowOrUnFollow({ id }: UserId): Promise<FollowResult> {
    return (await this.axios.post("user/v1/follow/" + id)).data;
  }

  //自身のグーグルプロフィールをリクエストする
  public async GetMyGoogleProfile():Promise<MyGoogleProfileDto>{
    return (await this.axios.get("user/v1/my_user_google_profile")).data;
  }
}
