<template>
  <v-content
    fluid
    class="center"
  >
    <post-details
      v-if="showPostDetailsFlag"
      :post-infos="postInfosForPostDetails"
      :comment-infos-dto-list="commentInfosDtoListForPostDetails"
      @back="hidePostDetails"
      @showCommentForm="showCommentForm"
    />
    <scroller />
    <v-row>
      <v-col>
        <v-btn
          v-show="showPosts"
          block
          color="accent"
          :disabled="false"
          @click="onClickShowPostForm"
        >
          投稿
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-show="showPosts">
      <v-col>
        <v-card color="primary">
          <v-select
            v-model="selectedCategory"
            :items="categoryItems"
            label="種別"
            clearable
            color="latestPostBtnColor"
          />
          <v-checkbox
            v-model="followUserOnly"
            label="フォローユーザのみ"
            color="latestPostBtnColor"
          />
        </v-card>
      </v-col>
    </v-row>
    <post-form
      v-if="showPostFormFlag"
      v-model="createPostParamsDto"
      @cancel="onClickCancel"
      @post="onClickPost"
    />
    <comment-form
      v-if="showCommentFormFlag"
      v-model="createCommentParamsDto.text"
      @comment="onClickComment"
      @cancel="onClickCancel"
    />
    <post-list
      v-show="showPosts"
      :post-infos-list-dto="postInfosListDto"
      @showDetails="onClickShowPostDetails"
      @showCommentForm="showCommentForm"
      @getLatestPost="getLatestPost"
      @deletePost="deletePost"
      @getOldPost="getOldPost"
    />
  </v-content>
</template>

<script lang="ts">
import { Component, Vue, Watch }from 'vue-property-decorator';
import PostList from '../components/post/PostList.vue';
import PostForm from '../components/post/PostForm.vue';
import CommentForm from '../components/comment/CommentForm.vue';
import { CreatePostApplication }from '../create/CreatePostApplication';
import { AsyncOnce }from '../utils/AsyncOnce';
import Scroller from '../components/Scroller.vue';
import { CreatePostParamsDto }from '../domain/post/CreatePostParamsDto';
import { CreateCategoryApplication }from '../create/CreateCategoryApplication';
import { CategoryDto }from '../domain/category/CategoryDto';
import { CategoryId }from '../domain/category/CategoryId';
import PostDetails from '../components/post/PostDetails.vue';
import { PostInfos }from '../domain/post/PostInfos';
import { CreateCommentParamsDto }from '../domain/comment/CreateCommentParamsDto';
import { PostId }from '../domain/post/PostId';
import { TimeLine }from '../domain/post/TimeLine';
import { CommentInfosDto }from '../domain/comment/CommentInfosDto';

@Component({
  components: { PostList, PostForm, Scroller, CommentForm, PostDetails },
})
export default class extends Vue {
  timeLine: TimeLine = CreatePostApplication().GetTimeLine();
  showPostFormFlag = false;
  showCommentFormFlag = false;
  createPostParamsDto: CreatePostParamsDto = {
    text: '',
    categoryId: { id: 1 },
  };
  createCommentParamsDto: CreateCommentParamsDto = {
    text: '',
  };
  asyncOnce = new AsyncOnce();
  selectedCategory: CategoryId | null = null;
  categoryDtoList: CategoryDto[] = [];
  followUserOnly = false;
  showPostDetailsFlag = false;
  postInfosForPostDetails: PostInfos | null = null;
  commentInfosDtoListForPostDetails: CommentInfosDto[] = [];
  postIdForComentForm: PostId = { id: 0 };

  async created() {
    this.categoryDtoList = await CreateCategoryApplication().GetCategoryItems();
    this.timeLine = CreatePostApplication().GetTimeLine();
    this.timeLine.PostInfosList.GetUpdateLatestPost();
  }

  get postInfosListDto() {
    return this.timeLine.PostInfosList.PostInfosListDto;
  }

  get categoryItems() {
    return this.categoryDtoList.map(x => ({ text: x.name, value: x.id }));
  }

  get showPosts() {
    return (
      !this.showPostFormFlag &&
      !this.showPostDetailsFlag &&
      !this.showCommentFormFlag
    );
  }

  //投稿表示のボタンが表示された時の処理
  onClickShowPostForm() {
    this.showPostFormFlag = true;
  }

  //投稿ボタンが押された時の処理
  async onClickPost() {
    this.asyncOnce.Do(this.post);
  }

  //投稿ボタンが押された時の処理
  onClickCancel() {
    this.hidePostForm();
    this.hideCommentFrom();
  }

  //コメントフォームの表示処理
  showCommentForm(id: PostId) {
    this.showCommentFormFlag = true;
    this.showPostDetailsFlag = false;
    this.postIdForComentForm = id;
  }

  //投稿をする
  async post() {
    try {
      await CreatePostApplication().PostOnTimeline(this.createPostParamsDto);
    }catch (e) {
      alert('投稿に失敗しました。');
      return;
    }
    this.hidePostForm();
  }

  //投稿フォームを非表示にする
  hidePostForm() {
    this.showPostFormFlag = false;
    this.createPostParamsDto.text = '';
    this.createPostParamsDto.categoryId = { id: 1 };
  }

  //TimeLinepage投稿明細に切り替え
  async onClickShowPostDetails(postInfos: PostInfos) {
    this.showPostDetailsFlag = true;
    this.postInfosForPostDetails = postInfos;
    this.commentInfosDtoListForPostDetails = await this.timeLine.PostInfosList.GetPostComment(
      postInfos.id,
    );
  }

  //投稿明細からTimeLinepageに切り替え
  hidePostDetails() {
    this.showPostDetailsFlag = false;
  }
  //コメントフォームを隠す処理
  hideCommentFrom() {
    this.showCommentFormFlag = false;
    this.createCommentParamsDto.text = '';
  }

  //カテゴリ種別変更の処理
  @Watch('selectedCategory')
  onChangeSelectedCategory() {
    this.timeLine.SelectCategoryId(this.selectedCategory || undefined);
  }

  //フォローユーザオンリーか否かを変更する処理
  @Watch('followUserOnly')
  onChangeFollowUserOnly() {
    this.timeLine.SetFollowUserOnly(this.followUserOnly || false);
  }

  //投稿を削除する
  deletePost(id: PostId) {
    this.timeLine.PostInfosList.DeletePost(id);
  }

  //最新の投稿を取得する
  getLatestPost() {
    this.timeLine.PostInfosList.GetUpdateLatestPost();
  }

  //末尾から古い順の投稿を取得する
  getOldPost() {
    this.timeLine.PostInfosList.GetUpdateOldPost();
  }

  //コメントを投稿する機能
  async onClickComment() {
    await this.timeLine.PostInfosList.CreateComment(
      this.createCommentParamsDto,
      this.postIdForComentForm,
    );

    this.hideCommentFrom();
  }
}
</script>
