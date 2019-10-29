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
      Follow
    </v-btn>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop }from 'vue-property-decorator';
import { FollowUserDto }from '../../domain/follow_list/followUser.dto';
@Component({})
export default class extends Vue {
  @Prop({ required: true, type: Object }) private follow!: FollowUserDto;

  get name() {
    return this.follow.name;
  }

  onUserClick() {
    this.$router.push({
      name: 'user',
      params: { id: String(this.follow.id.id) },
    });
  }

  onFollowClick() {
    this.$emit('click');
  }
}
</script>