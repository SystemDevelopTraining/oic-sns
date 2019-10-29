export interface LoginInfoRepository {
  ClearJwt():void;
  //Jwtが正しいか確認する関数
  CheckJwt(): Promise<boolean>;
  //ログイン中かどうかを判定する関数
  IsLogin(): boolean;
  //Jwtのデータをゲットする関数
  GetJwt(): string | undefined;
  //Jwtのデータを保存する関数
  SaveJwt(jwt: string): void;
}
