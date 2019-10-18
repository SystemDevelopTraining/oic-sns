<template>
  <div>
    <h1>Topページ</h1>
    <div>
      <v-btn
        v-if="isNotLogin()"
        large
        color="primary"
        href="http://localhost:3000/auth-user/v1"
      >
        Login/Signup
      </v-btn>
    </div>

    <v-card
      max-width="344"
      class="spacing-playground mx-auto my-5 px-5"
    >
      <v-card-title>I'm a title</v-card-title>
      <v-card-text>I'm card text</v-card-text>
    </v-card>
    <v-card
      max-width="344"
      class="spacing-playground mx-auto my-5 px-5"
    >
      <v-card-title>I'm a title</v-card-title>
      <v-card-text>I'm card text</v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';
@Component({})
export default class extends Vue {
  isNotLogin() {
    return !CreateLoginInfoApplication().IsLogin();
  }
}
</script>>