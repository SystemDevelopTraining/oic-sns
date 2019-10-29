<template>
  <v-list>
    <FollowUser
      v-for="follow in followList.followers"
      :key="follow.id.id"
      :follow-user="follow"
    />
  </v-list>
</template>

<script lang='ts'>
import { Component, Vue }from 'vue-property-decorator';
import FollowUser from './FollowUser.vue';
import { FollowListDto }from '../../domain/follow_list/followList.dto';
import { CreateFollowListApplication }from '../../create/CreateFollowListApplication';

@Component({
  components: { FollowUser },
})
export default class extends Vue {
  followList: FollowListDto = { followers: [] };
  async created() {
    this.followList = await CreateFollowListApplication().GetFollowList({
      id: Number(this.$route.params.id),
    });
  }
}
</script>
