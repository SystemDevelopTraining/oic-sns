<template>
  <div>
    <post
      v-for="(postInfos,index) in postInfosList"
      :key="index"
      :post-infos="postInfos"
    />
  </div>
</template>

<script lang="ts">
import Post from '../components/Post.vue';
import { PostInfos }from '../domain/post/PostInfos';
import { Component, Vue, Prop }from 'vue-property-decorator';
import { CreatePostApplication }from '../create/CreatePostApplication';
import { UserId }from '../domain/user/UserId';
@Component({ components: { Post } })
export default class extends Vue {
  @Prop({ type: Object, required: false }) filterUserId: UserId | undefined;

  postInfosList: PostInfos[] = [];
  async created() {
    this.postInfosList = await CreatePostApplication().GetLatestPosts({
      userId: this.filterUserId ? this.filterUserId.id.toString() : undefined,
    });
  }
}
</script>