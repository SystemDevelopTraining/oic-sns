<template>
  <v-card
    width="100%"
    color="primary"
  >
    <v-row class="pb-0">
      <v-card-title class="py-1">
        <v-list-item-avatar
          size="45"
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
      <v-card-text class="py-0">
        <div
          v-for="commentText in commentTexts"
          :key="commentText"
        >
          {{ commentText }}
          <br>
        </div>
      </v-card-text>
      <v-col
        cols="auto"
        class="mr-auto"
      >
        <v-card-text>{{ commentDate }}</v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop }from 'vue-property-decorator';
import { UserId }from '../../domain/user/UserId';
import { PostAndCommentViewData }from '../../infrastructure/viewData/PostAndCommentViewData';

interface CommentInfos {
  text: string;
  commentDate: Date;
  userId: UserId;
  userName: string;
}

@Component
export default class extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  commentInfos!: CommentInfos;

  get viewData() {
    return new PostAndCommentViewData(
      this.commentInfos.text,
      this.commentInfos.commentDate,
      this.commentInfos.userName,
    );
  }

  get name() {
    return this.viewData.ViewName;
  }

  get commentTexts() {
    return this.viewData.ViewLineTexts;
  }

  get commentDate() {
    return this.viewData.ViewDate;
  }

  async goToUserPage() {
    this.$router.push({
      name: 'user',
      params: { id: String(this.commentInfos.userId.id) },
    });
  }
}
</script>
