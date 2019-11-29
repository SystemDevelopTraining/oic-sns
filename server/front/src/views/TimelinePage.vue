<template>
  <v-content
    fluid
    class="center"
  >
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
    <post-list
      v-show="showPosts"
      :selected-category="selectedCategory"
      :follow-user-only="followUserOnly"
    />
  </v-content>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import PostList from '../components/post/PostList.vue';
import PostForm from '../components/post/PostForm.vue';
import { CreatePostApplication }from '../create/CreatePostApplication';
import { AsyncOnce }from '../utils/AsyncOnce';
import Scroller from '../components/Scroller.vue';
import { CreatePostParamsDto }from '../domain/post/CreatePostParamsDto';
import { CreateCategoryApplication }from '../create/CreateCategoryApplication';
import { CategoryDto }from '../domain/category/CategoryDto';
import { CategoryId }from '../domain/category/CategoryId';

@Component({ components: { PostList, PostForm, Scroller } })
export default class extends Vue {
  showPostFormFlag = false;
  createPostParamsDto: CreatePostParamsDto = {
    text: '',
    categoryId: { id: 1 },
  };
  asyncOnce = new AsyncOnce();
  selectedCategory: CategoryId | null = null;
  categoryDtoList: CategoryDto[] = [];
  followUserOnly = false;

  async created() {
    this.categoryDtoList = await CreateCategoryApplication().GetCategoryItems();
  }

  get categoryItems() {
    return this.categoryDtoList.map(x => ({ text: x.name, value: x.id }));
  }

  get showPosts() {
    return !this.showPostFormFlag;
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
}
</script>
