<template>
  <div>
    <h1>Topページ</h1>
    <div>
      <v-btn
        v-if="isNotLogin()"
        large
        color="primary"
        :href="loginUrl"
      >
        Login/Signup
      </v-btn>
    </div>

    <v-card class="spacing-playground mx-auto my-5 px-5">
      <v-card-title>I'm a title</v-card-title>
      <v-card-text>I'm card text</v-card-text>
    </v-card>
    <v-card class="spacing-playground mx-auto my-5 px-5">
      <v-card-title>I'm a title</v-card-title>
      <v-card-text>I'm card text</v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';
import { EnvManager }from '../utils/EnvManager';
@Component({})
export default class extends Vue {
  isNotLogin() {
    return !CreateLoginInfoApplication().IsLogin();
  }

  get loginUrl() {
    return EnvManager.ApiServerUrl + '/auth-user/v1';
  }
}
</script>>