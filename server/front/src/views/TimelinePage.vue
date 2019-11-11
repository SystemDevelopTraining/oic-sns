<template>
  <v-container
    fluid
    class="center"
  >
    <v-row>
      <v-col>
        <v-btn
          v-show="showPosts"
          block
          :color="postBtnColor"
          :disabled="buttonOff"
          @click="onClickShowPostForm"
        >
          投稿
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-show="showPosts"
          v-model="selectedType"
          :items="types"
          item-value="value"
          item-text="label"
          label="種別"
        />
      </v-col>
    </v-row>
    <post-form
      v-show="showPostFormFlag"
      v-model="postText"
      :my-user-name="myUserName"
      @cancel="onClickCancel"
      @post="onClickPost"
    />
    <post-list v-show="showPosts" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import PostList from '../components/post/PostList.vue';
import PostForm from '../components/post/PostForm.vue';
import { CreatePostApplication }from '../create/CreatePostApplication';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { AsyncOnce }from '../utils/AsyncOnce';
@Component({ components: { PostList, PostForm } })
export default class extends Vue {
  showPostFormFlag = false;
  showPosts = true;
  buttonOff = false;
  postBtnColor = 'primary';
  postText = '';
  myUserName = '';
  asyncOnce = new AsyncOnce();
  selectedType = { label: 'フォロー中', value: 'follow' };
  types = [
    { label: 'フォロー中', value: 'follow' },
    { label: '全て', value: 'all' },
    { label: '開発', value: 'develop' },
  ];

  async created() {
    const userApplication = CreateUserApplication();
    const myUser = await userApplication.GetUser(
      await userApplication.GetMyUserId(),
    );
    this.myUserName = myUser.name;
  }

  //投稿表示のボタンが表示された時の処理
  onClickShowPostForm() {
    this.showPostFormFlag = true;
    this.showPosts = false;
    this.postBtnColor = 'secondary';
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
      await CreatePostApplication().PostOnTimeline({
        text: this.postText,
      });
    }catch (e) {
      alert('投稿に失敗しました。');
      return;
    }
    this.hidePostForm();
  }

  //投稿フォームを非表示にする
  hidePostForm() {
    this.showPostFormFlag = false;
    this.showPosts = true;
    this.buttonOff = false;
    this.postBtnColor = 'primary';
    this.postText = '';
  }
}
</script>