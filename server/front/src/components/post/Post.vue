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
      <v-row class="justify-center">
        <v-card-text class="headline">
          {{ postText }}
        </v-card-text>
        <v-card-text>{{ postDate }}</v-card-text>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop }from 'vue-property-decorator';
import { PostInfos }from '../../domain/post/PostInfos';

@Component({})
export default class extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  postInfos!: PostInfos;

  get name() {
    return this.postInfos.userName;
  }
  get postText() {
    return this.postInfos.postText;
  }
  get postDate() {
    return this.postInfos.postDate;
  }

  async goToUserPage() {
    this.$router.push({
      name: 'user',
      params: { id: String(this.postInfos.userId.id) },
    });
  }
}
</script>