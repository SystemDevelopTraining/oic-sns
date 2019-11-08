<template>
  <v-container>
    <user-info
      v-if="user"
      :user="user"
    />
    <post-list
      v-if="user"
      :filter-user-id="user.id"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch }from 'vue-property-decorator';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { UserDto }from '../domain/user/UserDto';
import UserInfo from '../components/user/UserInfo.vue';
import PostList from '../components/post/PostList.vue';

@Component({ components: { UserInfo, PostList } })
export default class extends Vue {
  user: UserDto | null = null;

  created() {
    this.setUser();
  }

  @Watch('$route')
  onChangeRoute() {
    this.setUser();
  }

  async setUser() {
    this.user = await CreateUserApplication().GetUser({
      id: Number(this.$route.params.id),
    });
  }
}
</script>