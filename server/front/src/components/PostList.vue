<template>
  <div>
    <new-post-get-button @click="latestPostGet" />
    <post
      v-for="(postInfos,index) in postInfosList"
      :key="index"
      :post-infos="postInfos"
    />
    <new-post-get-button
      :old="true"
      @click="oldPostGet"
    />
  </div>
</template>

<script lang="ts">
import Post from '../components/Post.vue';
import NewPostGetButton from '../components/post/NewPostGetButton.vue';
import { PostInfos }from '../domain/post/PostInfos';
import { Component, Vue, Prop }from 'vue-property-decorator';
import { CreatePostApplication }from '../create/CreatePostApplication';
import { UserId }from '../domain/user/UserId';
@Component({ components: { Post, NewPostGetButton } })
export default class extends Vue {
  @Prop({ type: Object, required: false }) filterUserId: UserId | undefined;

  postInfosList: PostInfos[] = [];
  async created() {
    this.postInfosList = await CreatePostApplication().GetLatestPosts({
      userId: this.filterUserId ? this.filterUserId.id.toString() : undefined,
    });
  }

  //現在の一番古い投稿より古い最新の投稿を取得する
  async oldPostGet() {
    if (this.postInfosList.length > 0) {
      const lastOldPost = this.postInfosList[this.postInfosList.length - 1];
      const newPostInfosList = await CreatePostApplication().GetLatestPosts({
        userId: this.filterUserId ? this.filterUserId.id.toString() : undefined,
        basePostId: String(lastOldPost.id.id),
      });
      newPostInfosList.forEach(x => this.postInfosList.push(x));
    }
  }

  //現在の一番新しい投稿より最新の投稿を取得する
  async latestPostGet() {
    if (this.postInfosList.length > 0) {
      const lastPost = this.postInfosList[0];
      const newPostInfosList = await CreatePostApplication().GetLatestPosts({
        userId: this.filterUserId ? this.filterUserId.id.toString() : undefined,
        basePostId: String(lastPost.id.id),
        after: true,
      });
      newPostInfosList.forEach(x => this.postInfosList.unshift(x));
    }
  }
}
</script>