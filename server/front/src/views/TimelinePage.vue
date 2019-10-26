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
              size="80"
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
import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';
import { CreatePostApplication }from '../create/CreatePostApplication';
import { CreateUserApplication }from '../create/CreateUserApplication';
@Component({ components: { PostList } })
export default class extends Vue {
  showPostFormFlag = false;
  showPosts = true;
  buttonOff = false;
  postBtnColor = 'white';
  postText = '';
  myUserName = '';

  async created() {
    const jwt = this.$route.query['jwt'];
    if (typeof jwt === 'string') CreateLoginInfoApplication().SaveJwt(jwt);
    const userApplication = CreateUserApplication();
    const myUser = await userApplication.GetUser(
      await userApplication.GetMyUserId(),
    );
    this.myUserName = myUser.name;
  }

  onClickShowPostForm() {
    this.showPostFormFlag = true;
    this.showPosts = false;
    this.postBtnColor = 'secondary';
  }

  async onClickPost() {
    const result = await CreatePostApplication().PostOnTimeline({
      text: this.postText,
    });
    if (result.success === false) {
      alert('投稿に失敗しました。');
    }else {
      this.hidePostForm();
    }
  }

  onClickCancel() {
    this.hidePostForm();
  }

  hidePostForm() {
    this.showPostFormFlag = false;
    this.showPosts = true;
    this.buttonOff = false;
    this.postBtnColor = 'white';
  }
}
</script>