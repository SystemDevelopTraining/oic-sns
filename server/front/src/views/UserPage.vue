<template>
  <v-content>
    <drawer v-if="isMyUser" />
    <scroller />
    <user-info
      v-if="user"
      :user="user"
    />
    <post-list
      :post-infos-list-dto="postInfosListDto"
      @showDetails="onClickShowPostDetails"
      @showCommentForm="showCommentForm"
      @getLatestPost="getLatestPost"
      @deletePost="deletePost"
      @getOldPost="getOldPost"
    />
  </v-content>
</template>

<script lang="ts">
import { Component, Vue, Watch }from 'vue-property-decorator';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { UserDto }from '../domain/user/UserDto';
import UserInfo from '../components/user/UserInfo.vue';
import PostList from '../components/post/PostList.vue';
import Drawer from '../components/Drawer.vue';
import Scroller from '../components/Scroller.vue';
import { CreatePostApplication }from '../create/CreatePostApplication';
import { TimeLine }from '../domain/post/TimeLine';

@Component({ components: { UserInfo, PostList, Drawer, Scroller } })
export default class extends Vue {
  user: UserDto | null = null;
  timeLine: TimeLine = CreatePostApplication().GetTimeLine();

  created() {
    this.setUser();
    this.timeLine = CreatePostApplication().GetTimeLine();
    this.timeLine.PostInfosList.GetUpdateLatestPost();
  }

  @Watch('$route')
  onChangeRoute() {
    this.setUser();
  }

  get postInfosListDto() {
    return this.timeLine.PostInfosList.PostInfosListDto;
  }

  async setUser() {
    this.user = await CreateUserApplication().GetUser({
      id: Number(this.$route.params.id),
    });
  }

  get isMyUser() {
    return this.user && this.user.isMyself;
  }
}
</script>
