<template>
  <v-list-item class="d-flex flex-row">
    <v-btn @click="onUserClick">
      <p>{{ name }}</p>
    </v-btn>
    <v-btn
      class="ml-auto"
      depressed
      small
      color="blue"
      @click="onFollowClick"
    >
      {{ followText }}
    </v-btn>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop }from 'vue-property-decorator';
import { FollowUserDto }from '../../domain/follow_list/followUser.dto';
import { AsyncOnce }from '../../utils/AsyncOnce';
import { CreateFollowApplication }from '../../create/CreateFollowApplication';
@Component({})
export default class extends Vue {
  @Prop({ required: true, type: Object }) private followUser!: FollowUserDto;

  asyncOnce = new AsyncOnce();

  followText: 'フォロー' | 'フォロー解除' = this.followUser.isFollow
    ? 'フォロー解除'
    : 'フォロー';

  get name() {
    return this.followUser.name;
  }

  onUserClick() {
    this.$router.push({
      name: 'user',
      params: { id: String(this.followUser.id.id) },
    });
  }

  onFollowClick() {
    this.asyncOnce.Do(this.follow);
  }

  async follow() {
    const result = await CreateFollowApplication().FollowOrUnfollow(
      this.followUser.id,
    );
    this.followText = result.isFollow ? 'フォロー解除' : 'フォロー';
  }
}
</script>