<template>
  <div>
    <new-post-get-button @click="onClickGetLatestPost" />
    <post
      v-for="postInfos in postInfosListDto"
      :key="postInfos.id.id"
      :post-infos="postInfos"
      @delete="deletePost(postInfos.id)"
      @showDetails="$emit('showDetails',postInfos)"
      @showCommentForm="showCommentForm(postInfos.id)"
    />
    <new-post-get-button
      :old="true"
      @click="getOldPost"
    />
  </div>
</template>

<script lang="ts">
import Post from './Post.vue';
import NewPostGetButton from './NewPostGetButton.vue';
import { Component, Vue, Prop }from 'vue-property-decorator';
import { PostId }from '../../domain/post/PostId';
import { PostInfos }from '../../domain/post/PostInfos';

@Component({ components: { Post, NewPostGetButton } })
export default class extends Vue {
  @Prop({ type: Array, required: true }) postInfosListDto!: PostInfos[];

  async showCommentForm(id: PostId) {
    this.$emit('showCommentForm', id);
  }

  //現在の一番古い投稿より古い最新の投稿を取得する
  async getOldPost() {
    await this.$emit('getOldPost');
  }

  onClickGetLatestPost() {
    this.$emit('getLatestPost');
  }

  deletePost(id: PostId) {
    this.$emit('deletePost', id);
  }
}
</script>