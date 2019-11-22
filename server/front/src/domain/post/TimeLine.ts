import { PostRepository }from './PostRepository';
import { PostInfosList }from './PostInfosList';
import { CategoryId }from '../category/CategoryId';
import { UserId }from '../user/UserId';

//投稿のタイムラインを表す
export class TimeLine {
    private readonly postRepository: PostRepository
    private currentPostInfosList: PostInfosList
    private postInfosListMap = new Map<number, PostInfosList>()
    private filterUserId?: UserId

    public constructor(postRepository: PostRepository,filterUserId?: UserId) {
        this.postRepository = postRepository;
        this.currentPostInfosList = new PostInfosList([], postRepository,undefined,filterUserId);
        this.postInfosListMap.set(0, this.currentPostInfosList);
        this.filterUserId = filterUserId;
    }

    //投稿一覧をカテゴリーで絞り込む
    public SelectCategoryId(categoryId: CategoryId) {
        let nextPostInfosList = this.postInfosListMap.get(categoryId.id);
        if (nextPostInfosList === undefined) {
            nextPostInfosList = new PostInfosList([], this.postRepository, categoryId,this.filterUserId);
            nextPostInfosList.GetUpdateLatestPost();
            this.postInfosListMap.set(categoryId.id,nextPostInfosList);
        }
        this.currentPostInfosList = nextPostInfosList;
    }

    //投稿一覧を返す
    public get PostInfosList() {
        return this.currentPostInfosList;
    }
}