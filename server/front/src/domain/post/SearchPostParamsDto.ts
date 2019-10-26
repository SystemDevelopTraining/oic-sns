//投稿を取得するする際のパラメータ
export interface SearchPostParamsDto {
  basePostId?: string;
  userId?: string;
  after?: boolean;
}
