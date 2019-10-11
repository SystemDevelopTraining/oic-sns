export interface LoginInfoRepository {
  //ログイン中かどうかを判定する関数
  IsLogin(): boolean;
  //Jwtのデータをゲットする関数
  GetJwt(): string | undefined;
  //Jwtのデータを保存する関数
  SaveJwt(jwt: string): void;
}
