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
            <v-card-title>{{ name }}</v-card-title>
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
import { Component, Vue }from 'vue-property-decorator';
import { PostInfos }from '../domain/post/PostInfos';

@Component({})
export default class extends Vue {
  postInfos: PostInfos = {
    userId: {
      id: 23,
    },
    userName: 'James Bond',
    postText:
      'I am loving to program for this project. I am not so good at it YET! though, i feel like i can do this job. I love the PROGRAMMER name in my life. I am loving to program for this project. I am not so good at it YET! though, i feel like i can do this job. I love the PROGRAMMER name in my life. ',
    postDate: new Date(),
  };

  get name() {
    return this.postInfos.userName;
  }
  get postText() {
    return this.postInfos.postText;
  }
  get postDate() {
    return this.postInfos.postDate;
  }
}
</script>