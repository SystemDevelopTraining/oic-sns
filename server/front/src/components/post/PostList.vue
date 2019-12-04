<template>
  <div>
    <new-post-get-button @click="onLatestPostGetClick" />
    <post
      v-for="postInfos in postInfosListDto"
      :key="postInfos.id.id"
      :post-infos="postInfos"
      @delete="deletePost(postInfos.id)"
      @showDetails="$emit('showDetails',postInfos)"
      @showCommentForm="$emit('showCommentForm')"
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
import { PostId }from '../../domain/post/PostId';
import { CategoryId }from '../../domain/category/CategoryId';
import { TimeLine }from '../../domain/post/TimeLine';

@Component({ components: { Post, NewPostGetButton } })
export default class extends Vue {
  @Prop({ type: Object, required: false }) filterUserId: UserId | undefined;
  @Prop({ required: false }) selectedCategory: CategoryId | null | undefined;
  @Prop({ type: Boolean, required: false }) followUserOnly: boolean | undefined;
  asyncOnce = new AsyncOnce();

  timeLine: TimeLine = CreatePostApplication().GetTimeLine();

  get postInfosListDto() {
    return this.timeLine.PostInfosList.PostInfosListDto;
  }

  created() {
    this.setPostInfosList();
  }

  @Watch('filterUserId')
  onChangeFilterUserId() {
    this.setPostInfosList();
  }

  @Watch('selectedCategory')
  onChangeSelectedCategory() {
    this.timeLine.SelectCategoryId(this.selectedCategory || undefined);
  }

  @Watch('followUserOnly')
  onChangeFollowUserOnly() {
    this.timeLine.SetFollowUserOnly(this.followUserOnly || false);
  }

  async setPostInfosList() {
    this.timeLine = CreatePostApplication().GetTimeLine(this.filterUserId);
    this.timeLine.PostInfosList.GetUpdateLatestPost();
  }

  //現在の一番古い投稿より古い最新の投稿を取得する
  async oldPostGet() {
    await this.timeLine.PostInfosList.GetUpdateOldPost();
  }

  onLatestPostGetClick() {
    this.asyncOnce.Do(this.latestPostGet);
  }

  //現在の一番新しい投稿より最新の投稿を取得する
  async latestPostGet() {
    await this.timeLine.PostInfosList.GetUpdateLatestPost();
  }

  deletePost(id: PostId) {
    this.timeLine.PostInfosList.DeletePost(id);
  }
}
</script>