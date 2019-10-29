<template>
  <v-container
    fluid
    class="center"
  >
    <v-row>
      <v-col>
        <div>
          <v-btn
            block
            :color="postBtnColor"
            :disabled="buttonOff"
            @click="onClickShowPostForm"
          >
            投稿
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- 投稿Post レイアウト-->
    <v-card v-if="showPostFormFlag">
      <v-card-title>
        <span class="headline">{{ myUserName }}</span>
        <v-col class="pb-0">
          <v-row justify="end">
            <v-list-item-avatar
              size="60"
              color="grey"
            />
          </v-row>
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-textarea
              v-model="postText"
              outlined
              auto-grow
              label="投稿を書きましょう！"
              rows="8"
              row-height="30"
              shaped
            />
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn
          outlined
          color="red"
          text
          @click="onClickCancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          outlined
          color="blue"
          text
          @click="onClickPost"
        >
          投稿
        </v-btn>
      </v-card-actions>
    </v-card>

    <post-list v-if="showPosts" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import PostList from '../components/PostList.vue';
import { CreatePostApplication }from '../create/CreatePostApplication';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { AsyncOnce }from '../utils/AsyncOnce';
@Component({ components: { PostList } })
export default class extends Vue {
  showPostFormFlag = false;
  showPosts = true;
  buttonOff = false;
  postBtnColor = 'primary';
  postText = '';
  myUserName = '';
  asyncOnce = new AsyncOnce();

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
  }
}
</script>