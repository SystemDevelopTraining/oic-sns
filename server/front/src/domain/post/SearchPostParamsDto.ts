import { PostId }from './PostId';

//投稿を取得するする際のパラメータ
export interface SearchPostParamsDto{
    basePostId?:PostId;
    before?:boolean;
}