import { PostRepository }from './PostRepository';
import { PostInfosList }from './PostInfosList';
import { CategoryId }from '../category/CategoryId';
import { UserId }from '../user/UserId';

//投稿のタイムラインを表す
export class TimeLine {
    private readonly postRepository: PostRepository
    private currentPostInfosList: PostInfosList
    private postInfosListMap = new Map<string, PostInfosList>()
    private filterUserId?: UserId
    private categoryId:CategoryId|undefined;
    private followUserOnly=false;

    public constructor(postRepository: PostRepository,filterUserId?: UserId) {
        this.postRepository = postRepository;
        this.currentPostInfosList = new PostInfosList([], postRepository,undefined,filterUserId);
        this.postInfosListMap.set("0", this.currentPostInfosList);
        this.filterUserId = filterUserId;
    }

    //投稿一覧をカテゴリーで絞り込む
    public SelectCategoryId(categoryId: CategoryId|undefined) {
        this.categoryId = categoryId;
        this.UpdateCurrentPostInfosList();
    }


    //投稿一覧をフォローユーザで絞り込む
    public SetFollowUserOnly(followUserOnly:boolean){
        this.followUserOnly = followUserOnly;
        this.UpdateCurrentPostInfosList();
    }

    //投稿一覧を返す
    public get PostInfosList() {
        return this.currentPostInfosList;
    }

    private UpdateCurrentPostInfosList(){
        const key = String((this.categoryId || {id: 0}).id) + (this.followUserOnly ? "f" : "");
        let nextPostInfosList = this.postInfosListMap.get(key);
        if (nextPostInfosList === undefined) {
            nextPostInfosList = new PostInfosList([], this.postRepository, this.categoryId,this.filterUserId,this.followUserOnly);
            nextPostInfosList.GetUpdateLatestPost();
            this.postInfosListMap.set(key,nextPostInfosList);
        }
        this.currentPostInfosList = nextPostInfosList;

    }


}