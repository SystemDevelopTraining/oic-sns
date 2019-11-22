import { CategoryId }from '../category/CategoryId';

//投稿を作成するのに必要なもの
export interface CreatePostParamsDto {
  text: string;
  categoryId:CategoryId;
}
