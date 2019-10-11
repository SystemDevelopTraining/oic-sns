<template>
  <v-container
    fluid
    class="center"
  >
    <v-row>
      <v-col>
        <div>
          <v-btn
            block
            color="white"
          >
            投稿
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- 投稿Post レイアウト-->
    <v-card>
      <v-card-title>
        <span class="headline">James Bond</span>
        <v-col class="pb-0">
          <v-row justify="end">
            <v-list-item-avatar
              size="80"
              color="grey"
            />
          </v-row>
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-textarea
              outlined
              auto-grow
              label="投稿を書きましょう！"
              rows="8"
              row-height="30"
              shaped
            />
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn
          outlined
          color="red"
          text
          @click="dialog = false"
        >
          キャンセル
        </v-btn>
        <v-btn
          outlined
          color="blue"
          text
          @click="dialog = false"
        >
          投稿
        </v-btn>
      </v-card-actions>
    </v-card>
    <post />
    <post />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import Post from '../components/Post.vue';
import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';
@Component({ components: { Post } })
export default class extends Vue {
  created() {
    const jwt = this.$route.query['jwt'];
    if (typeof jwt === 'string') CreateLoginInfoApplication().SaveJwt(jwt);
  }
}
</script>