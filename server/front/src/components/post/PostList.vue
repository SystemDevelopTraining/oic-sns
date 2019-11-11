<template>
  <div>
    <new-post-get-button @click="onLatestPostGetClick" />
    <post
      v-for="postInfos in postInfosListDto"
      :key="postInfos.id.id"
      :post-infos="postInfos"
      @delete="deletePost(postInfos.id)"
    />
    <new-post-get-button
      :old="true"
      @click="oldPostGet"
    />
  </div>
</template>

<script lang="ts">
import Post from './Post.vue';
import NewPostGetButton from './NewPostGetButton.vue';
import { Component, Vue, Prop, Watch }from 'vue-property-decorator';
import { CreatePostApplication }from '../../create/CreatePostApplication';
import { UserId }from '../../domain/user/UserId';
import { AsyncOnce }from '../../utils/AsyncOnce';
import { PostInfosList }from '../../domain/post/PostInfosList';
import { PostId }from '../../domain/post/PostId';
@Component({ components: { Post, NewPostGetButton } })
export default class extends Vue {
  @Prop({ type: Object, required: false }) filterUserId: UserId | undefined;
  asyncOnce = new AsyncOnce();

  postInfosList: PostInfosList = CreatePostApplication().GetPostInfosList();

  get postInfosListDto() {
    return this.postInfosList ? this.postInfosList.PostInfosListDto : [];
  }

  created() {
    this.setPostInfosList();
  }

  @Watch('filterUserId')
  onChangeFilterUserId() {
    this.setPostInfosList();
  }

  async setPostInfosList() {
    this.postInfosList = CreatePostApplication().GetPostInfosList(
      this.filterUserId,
    );
    await this.postInfosList.GetUpdateLatestPost();
  }

  //現在の一番古い投稿より古い最新の投稿を取得する
  async oldPostGet() {
    await this.postInfosList.GetUpdateOldPost();
  }

  onLatestPostGetClick() {
    this.asyncOnce.Do(this.latestPostGet);
  }

  //現在の一番新しい投稿より最新の投稿を取得する
  async latestPostGet() {
    await this.postInfosList.GetUpdateLatestPost();
  }

  deletePost(id: PostId) {
    this.postInfosList.DeletePost(id);
  }
}
</script>