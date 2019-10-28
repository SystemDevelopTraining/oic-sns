<template>
  <v-list>
    <FollowUser
      v-for="follow in followList"
      :key="follow.id.id"
      :name="follow.name"
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
    /*eslint no-console: 0*/
    console.log(this.followList);
  }
}
</script>
