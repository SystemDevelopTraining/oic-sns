<template>
  <div>
    <v-row>
      <v-card
        class="mx-auto"
        width="900"
        outlined
      >
        <v-row>
          <v-col
            cols="auto"
            class="pb-0"
          >
            <v-btn @click="goToUserPage()">
              <v-card-title>{{ name }}</v-card-title>
            </v-btn>
          </v-col>
          <v-col class="pb-0">
            <v-row justify="end">
              <v-list-item-avatar
                size="80"
                color="grey"
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-card-text>{{ postText }}</v-card-text>
          <v-card-text>{{ postDate }}</v-card-text>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop }from 'vue-property-decorator';
import { PostInfos }from '../domain/post/PostInfos';

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