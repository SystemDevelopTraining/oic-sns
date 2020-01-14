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
              OICityって？
            </v-card-title>

            <v-card-subtitle>
              活動を投稿し、
              それに気になった人が反応することで、
              交流のきっかけとなるOIC生専用のSNS
            </v-card-subtitle>

            <v-card-title class="headline">
              OICityが実現したい目標
            </v-card-title>
            <v-card-subtitle>
              「特定の分野に関するOIC生の個人の活動情報」から
              「その分野が気になる人」との交流のきっかけを作り、
              OIC内のコミュニティの輪の発展を促進する！
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
          class="py-1"
          cols="12"
          lg="6"
          xl="6"
        >
          <v-card
            color="white"
            height="100%"
          >
            <v-row>
              <v-card-title
                class="headline"
                v-text="item.title"
              />
            </v-row>
            <v-row>
              <v-col>
                <v-card-subtitle v-text="item.artist" />
              </v-col>
              <v-col
                cols="6"
                class="mr-2"
              >
                <v-img
                  :src="item.src"
                  max-width="300"
                />
              </v-col>
            </v-row>
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
      src: 'post.png',
      title: '投稿しよう！',
      artist:
        'ログインが完了したら、自分の活動を投稿してみましょう！',
    },
    {
      src: 'timeline.png',
      title: '他人の投稿を見よう！',
      artist: '他の人が投稿したものは見ることができます！',
    },
    {
      src: 'comment.png',
      title: '投稿にコメントしよう！',
      artist:
        '気になった投稿には積極的にコメントしてみましょう！',
    },
    {
      src: 'logo.png',
      title: 'フォローして友達を作ろう！',
      artist:
        '友達100人できるかな？',
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
