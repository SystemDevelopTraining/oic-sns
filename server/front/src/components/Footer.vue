<template>
  <v-app-bar
    v-if="isLogin()"
    app
    bottom
  >
    <v-container>
      <v-row justify="space-between">
        <v-btn
          max-width="90"
          large
          color="primary"
          @click="onProfileClick"
        >
          プロフィール
        </v-btn>
        <v-btn
          max-width="50"
          large
          color="primary"
          href="/.."
        >
          画像(logo)
        </v-btn>
        <v-btn
          max-width="90"
          large
          color="primary"
          href="/timeline"
        >
          タイムライン
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';
import { CreateUserApplication }from '../create/CreateUserApplication';
@Component({})
export default class extends Vue {
  isLogin() {
    return CreateLoginInfoApplication().IsLogin();
    }
    async onProfileClick(){
      const userId = await CreateUserApplication().GetMyUserId();
      this.$router.push({name: "user",params: {id: String(userId.id)}});
  }
}
</script>