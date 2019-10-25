<template>
  <user-info
    v-if="user"
    :user="user"
  />
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { UserDto }from '../domain/user/UserDto';
import UserInfo from '../components/userPage/UserInfo.vue';

@Component({ components: { UserInfo } })
export default class extends Vue {
  user: UserDto | null = null;

  async created() {
    this.user = await CreateUserApplication().GetUser({
      id: Number(this.$route.params.id),
    });
  }
}
</script>
 