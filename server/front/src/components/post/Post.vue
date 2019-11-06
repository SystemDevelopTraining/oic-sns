<template>
  <v-row>
    <v-card
      width="100%"
      outlined
    >
      <v-row>
        <v-col
          cols="auto"
          class="pb-0"
        >
          <v-card-title>
            <v-list-item-avatar
              size="60"
              color="grey"
            />
            <v-btn
              outlined
              @click="goToUserPage()"
            >
              {{ name }}
            </v-btn>
          </v-card-title>
        </v-col>
      </v-row>
      <v-row class="justify-end">
        <v-card-text class="headline">
          <div
            v-for="postText in postTexts"
            :key="postText"
          >
            {{ postText }}
            <br>
          </div>
        </v-card-text>
        <v-col
          cols="auto"
          class="mr-auto"
        >
          <v-card-text>{{ postDate }}</v-card-text>
        </v-col>
        <post-menu @delete="$emit('delete')" />
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop }from 'vue-property-decorator';
import { PostInfos }from '../../domain/post/PostInfos';
import PostMenu from './PostMenu.vue';
import Moment from 'moment';

@Component({ components: { PostMenu } })
export default class extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  postInfos!: PostInfos;

  get name() {
    const limitNum = 12;
    let shortName = this.postInfos.userName;
    if (shortName.length > limitNum) {
      shortName = shortName.substr(0, limitNum) + '...';
      return shortName;
    }
    return this.postInfos.userName;
  }
  get postTexts() {
    return this.postInfos.postText.split('\n');
  }
  get postDate() {
    Moment.locale('ja');
    const date = Moment(this.postInfos.postDate).format('LLL');
    return date;
  }

  async goToUserPage() {
    this.$router.push({
      name: 'user',
      params: { id: String(this.postInfos.userId.id) },
    });
  }
}
</script>
