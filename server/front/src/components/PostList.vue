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
import { Component, Vue }from 'vue-property-decorator';
import { CreatePostApplication }from '../create/CreatePostApplication';
@Component({ components: { Post } })
export default class extends Vue {
  postInfosList: PostInfos[] = [];
  async created() {
    this.postInfosList = await CreatePostApplication().GetLatestPosts();
  }
}
</script>