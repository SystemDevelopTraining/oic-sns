<template>
  <v-content>
    <v-spacer />
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="white">
            <v-row justify="center">
              <v-img
                src="/logo.png"
                max-width="200"
              />
            </v-row>

            <v-card-title class="headline">
              What am I?
            </v-card-title>

            <v-card-subtitle>
              I am a place where you can share and meet your own kinds. Just
              post, like and comment . Simple as that!
            </v-card-subtitle>

            <v-card-actions>
              <v-col
                xl="3"
                lg="6"
                md="6"
                sm="6"
                cols="8"
              >
                <v-img
                  v-if="isNotLogin()"
                  src="google_blue_btn.png"
                  max-width="300"
                  @click="onLogin"
                />
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card :color="item.color">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                />

                <v-card-subtitle v-text="item.artist" />
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src" />
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateLoginApplication }from '../create/CreateLoginApplication';
@Component({})
export default class extends Vue {
  items = [
    // the cards wont look nice if you remove the images
    {
      color: 'white',
      src: 'post.png',
      title: 'Post',
      artist:
        'Just begin by posting your own stuffs, like the kadais of the school or even your feelings about today.',
    },
    {
      color: 'white',
      src: 'timeline.png',
      title: 'Watch',
      artist: 'Watch people posting their owns so that you can find your type.',
    },
    {
      color: 'white',
      src: 'comment.png',
      title: 'Comment',
      artist:
        'Finally, just comment if you are interested in the post or even the person. Here you get the chance to make a friend or a project partner.',
    },
    {
      color: 'white',
      src: 'logo.png',
      title: 'Make Friends',
      artist:
        'After talks, you can meet and friends. Target Accomplished. Enjoy your new life with lots of friends',
    },
  ];

  isNotLogin() {
    return !CreateLoginApplication().IsLogin();
  }

  onLogin() {
    return CreateLoginApplication().Login();
  }
}
</script>
<style scoped>
h1 {
  display: inline-block;
}
</style>
