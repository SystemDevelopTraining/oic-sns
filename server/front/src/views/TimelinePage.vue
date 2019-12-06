<template>
  <v-content
    fluid
    class="center"
  >
    <post-details
      v-if="showPostDetails"
      :post-infos="postInfosForPostDetails"
      @backToPostList="GoBackToPostList"
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
      v-model="commentText"
      @cancel="onClickCancel"
    />
    <post-list
      v-show="showPosts"
      :selected-category="selectedCategory"
      :follow-user-only="followUserOnly"
      @showDetails="onClickShowPostDetails"
      @showCommentForm="showCommentForm"
    />
  </v-content>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
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

@Component({
  components: { PostList, PostForm, Scroller, CommentForm, PostDetails },
})
export default class extends Vue {
  showPostFormFlag = false;
  showCommentFormFlag = false;
  createPostParamsDto: CreatePostParamsDto = {
    text: '',
    categoryId: { id: 1 },
  };
  commentText = '';
  asyncOnce = new AsyncOnce();
  selectedCategory: CategoryId | null = null;
  categoryDtoList: CategoryDto[] = [];
  followUserOnly = false;
  showPostDetailsFlag = false;
  postInfosForPostDetails: PostInfos | null = null;

  async created() {
    this.categoryDtoList = await CreateCategoryApplication().GetCategoryItems();
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

  showCommentForm() {
    this.showCommentFormFlag = true;
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

  //投稿詳細を表示のflag
  get showPostDetails() {
    return this.showPostDetailsFlag;
  }

  //go to 投稿明細
  onClickShowPostDetails(postInfos: PostInfos) {
    this.showPostDetailsFlag = true;
    this.postInfosForPostDetails = postInfos;
  }

  hideCommentFrom() {
    this.showCommentFormFlag = false;
  }
  //投稿明細からもどる
  GoBackToPostList() {
    this.showPostDetailsFlag = false;
  }
}
</script>
