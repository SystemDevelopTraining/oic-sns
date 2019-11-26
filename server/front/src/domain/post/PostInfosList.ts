import { PostInfos }from './PostInfos';
import { PostRepository }from './PostRepository';
import { UserId }from '../user/UserId';
import { PostId }from './PostId';
import { CategoryId }from '../category/CategoryId';

//投稿一覧を表すクラス
export class PostInfosList {
    private readonly postInfosListDto: PostInfos[];
    private readonly repository: PostRepository;
    private readonly filterUserId?: UserId;
    private readonly selectedCategoryId?: CategoryId;
    private readonly followUserOnly?: boolean;

    public get PostInfosListDto() {
        return this.postInfosListDto;
    }

    public constructor(inintList: PostInfos[], repository: PostRepository, selectedCategoryId?: CategoryId | undefined, filterUserId?: UserId, followUserOnly?: boolean) {
        this.postInfosListDto = inintList;
        this.repository = repository;
        this.filterUserId = filterUserId;
        this.selectedCategoryId = selectedCategoryId;
        this.followUserOnly = followUserOnly;
    }

    //今より過去の投稿を10件取得して更新する
    public async GetUpdateOldPost() {
        if (this.postInfosListDto.length > 0) {
            const lastOldPost = this.postInfosListDto[this.postInfosListDto.length - 1];
            const newPostInfosList = await this.repository.TakeLatest({
                userId: this.filterUserId ? this.filterUserId.id.toString() : undefined,
                basePostId: String(lastOldPost.id.id),
                categoryId: this.selectedCategoryId && String(this.selectedCategoryId.id),
                followOnly: this.followUserOnly !== undefined && String(this.followUserOnly) || undefined
            });
            newPostInfosList.forEach(x => this.postInfosListDto.push(x));
        }
    }

    //最新の投稿を10件取得して更新する
    public async GetUpdateLatestPost(): Promise<void> {
        const lastPost = this.postInfosListDto[0] as (PostInfos | undefined);
        const newPostInfosList = await this.repository.TakeLatest({
            userId: this.filterUserId ? this.filterUserId.id.toString() : undefined,
            basePostId: lastPost ? String(lastPost.id.id) : undefined,
            after: "true",
            categoryId: this.selectedCategoryId && String(this.selectedCategoryId.id),
            followOnly: this.followUserOnly !== undefined && String(this.followUserOnly) || undefined
        });
        newPostInfosList.slice().reverse().forEach(x => this.postInfosListDto.unshift(x));
    }

    //特定の投稿を削除する
    public async DeletePost(id: PostId): Promise<void> {
        await this.repository.Delete(id);
        const deleteIndex = this.postInfosListDto.findIndex(x => x.id.id === id.id);
        this.postInfosListDto.splice(deleteIndex, 1);
    }
}