<template>
  <v-content>
    <drawer v-if="isMyUser" />
    <scroller />
    <user-info
      v-if="user && showPosts"
      :user="user"
    />
    <comment-form
      v-if="showCommentFormFlag"
      v-model="createCommentParamsDto.text"
      @comment="onClickComment"
      @cancel="hide"
    />
    <post-details
      v-if="showPostDetailsFlag"
      :post-infos="postInfosForPostDetails"
      @showCommentForm="showCommentForm"
      @back="hide"
    />
    <post-list
      v-if="showPosts"
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
import { CreateUserApplication }from '../create/CreateUserApplication';
import { UserDto }from '../domain/user/UserDto';
import UserInfo from '../components/user/UserInfo.vue';
import PostList from '../components/post/PostList.vue';
import Drawer from '../components/Drawer.vue';
import Scroller from '../components/Scroller.vue';
import { CreatePostApplication }from '../create/CreatePostApplication';
import { TimeLine }from '../domain/post/TimeLine';
import CommentForm from '../components/comment/CommentForm.vue';
import { PostId }from '../domain/post/PostId';
import { PostInfos }from '../domain/post/PostInfos';
import { CreateCommentParamsDto }from '../domain/comment/CreateCommentParamsDto';
import PostDetails from '../components/post/PostDetails.vue';

@Component({
  components: {
    UserInfo,
    PostList,
    Drawer,
    Scroller,
    CommentForm,
    PostDetails,
  },
})
export default class extends Vue {
  user: UserDto | null = null;
  timeLine: TimeLine = CreatePostApplication().GetTimeLine();
  showCommentFormFlag = false;
  showPostDetailsFlag = false;
  postInfosForPostDetails: PostInfos | null = null;
  postIdForComentForm: PostId = { id: 0 };
  createCommentParamsDto: CreateCommentParamsDto = {
    text: '',
  };

  async created() {
    const user = await this.setUser();
    this.timeLine = CreatePostApplication().GetTimeLine(user.id);
    this.timeLine.PostInfosList.GetUpdateLatestPost();
  }

  @Watch('$route')
  onChangeRoute() {
    this.setUser();
  }

  get showPosts() {
    return !this.showPostDetailsFlag && !this.showCommentFormFlag;
  }

  get postInfosListDto() {
    return this.timeLine.PostInfosList.PostInfosListDto;
  }

  async setUser() {
    this.user = await CreateUserApplication().GetUser({
      id: Number(this.$route.params.id),
    });
    return this.user;
  }

  get isMyUser() {
    return this.user && this.user.isMyself;
  }

  //コメントフォームの表示処理
  showCommentForm(id: PostId) {
    this.showCommentFormFlag = true;
    this.showPostDetailsFlag = false;
    this.postIdForComentForm = id;
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

  //投稿明細に切り替え
  onClickShowPostDetails(postInfos: PostInfos) {
    this.showPostDetailsFlag = true;
    this.showCommentFormFlag = false;
    this.postInfosForPostDetails = postInfos;
  }

  hide() {
    this.createCommentParamsDto.text = '';
    this.showCommentFormFlag = false;
    this.showPostDetailsFlag = false;
  }

  //コメントを投稿する機能
  async onClickComment() {
    await this.timeLine.PostInfosList.CreateComment(
      this.createCommentParamsDto,
      this.postIdForComentForm,
    );
    this.hide();
  }
}
</script>
