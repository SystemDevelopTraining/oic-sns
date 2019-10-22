<template>
  <div>
    <post
      v-for="(postInfos,index) in postInfosList"
      :key="index"
      :post-infos="postInfos"
    />
    <old-post-get-button @click="OldPostGet" />
  </div>
</template>

<script lang="ts">
import Post from '../components/Post.vue';
import OldPostGetButton from '../components/post/OldPostGetButton.vue';
import { PostInfos }from '../domain/post/PostInfos';
import { Component, Vue, Prop }from 'vue-property-decorator';
import { CreatePostApplication }from '../create/CreatePostApplication';
import { UserId }from '../domain/user/UserId';
@Component({ components: { Post, OldPostGetButton } })
export default class extends Vue {
  @Prop({ type: Object, required: false }) filterUserId: UserId | undefined;

  postInfosList: PostInfos[] = [];
  async created() {
    this.postInfosList = await CreatePostApplication().GetLatestPosts({
      userId: this.filterUserId ? this.filterUserId.id.toString() : undefined,
    });
  }

  async OldPostGet() {
    if (this.postInfosList.length > 0) {
      const lastPost = this.postInfosList[this.postInfosList.length - 1];
      const newPostInfosList = await CreatePostApplication().GetLatestPosts({
        userId: this.filterUserId ? this.filterUserId.id.toString() : undefined,
        basePostId: String(lastPost.id.id),
      });
      newPostInfosList.forEach(x => this.postInfosList.push(x));
    }
  }
}
</script>