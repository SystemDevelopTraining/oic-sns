
//投稿を取得する際のパラメータ
export interface SearchPostParamsDto {
  basePostId?: string;
  userId?: string;
  categoryId?: string;
  after?: string;
  followOnly?: string;

}
