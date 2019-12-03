<template>
  <v-card
    width="100%"
    color="primary"
  >
    <v-row class="pb-0">
      <v-card-title>
        <v-list-item-avatar
          size="50"
          color="secondary"
        />
        <v-btn
          outlined
          @click="goToUserPage()"
        >
          {{ name }}
        </v-btn>
      </v-card-title>
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
        <v-card-text>
          <v-btn icon>
            <v-icon>mdi-comment</v-icon>
          </v-btn>
        </v-card-text>
      </v-col>
      <post-menu
        :is-myself="isMyself"
        @delete="$emit('delete')"
      />
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop }from 'vue-property-decorator';
import { PostInfos }from '../../domain/post/PostInfos';
import PostMenu from './PostMenu.vue';
import { PostAndCommentViewData }from '../../infrastructure/viewData/PostAndCommentViewData';

@Component({ components: { PostMenu } })
export default class extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  postInfos!: PostInfos;

  get viewData() {
    return new PostAndCommentViewData(
      this.postInfos.postText,
      this.postInfos.postDate,
      this.postInfos.userName,
    );
  }

  get name() {
    return this.viewData.ViewName;
  }

  get postTexts() {
    return this.viewData.ViewLineTexts;
  }

  get postDate() {
    return this.viewData.ViewDate;
  }

  get isMyself() {
    return this.postInfos.isMyself;
  }

  async goToUserPage() {
    this.$router.push({
      name: 'user',
      params: { id: String(this.postInfos.userId.id) },
    });
  }
}
</script>
