<template>
  <div>
    <user-info
      v-if="user"
      :user="user"
    />
    <post-list
      v-if="user"
      :filter-user-id="user.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { UserDto }from '../domain/user/UserDto';
import UserInfo from '../components/userPage/UserInfo.vue';
import PostList from '../components/PostList.vue';

@Component({ components: { UserInfo, PostList } })
export default class extends Vue {
  user: UserDto | null = null;

  async created() {
    this.user = await CreateUserApplication().GetUser({
      id: Number(this.$route.params.id),
    });
  }
}
</script>