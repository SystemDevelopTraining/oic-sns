<template>
  <v-list-item>
    <v-row>
      <v-col
        cols="7"
        class="pa-2"
      >
        <v-btn
          width="100%"
          small
          @click="onUserClick"
        >
          <p>{{ name }}</p>
        </v-btn>
      </v-col>
      <v-col class="pa-2">
        <v-row justify="center">
          <v-btn
            max-width="100px"
            small
            width="100%"
            color="blue"
            @click="onFollowClick"
          >
            {{ followText }}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
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

  followText: 'フォロー' | 'フォロー中' = this.followUser.isFollow
    ? 'フォロー中'
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
    this.followText = result.isFollow ? 'フォロー中' : 'フォロー';
  }
}
</script>