<template>
  <v-container>
    <v-row>
      <v-col
        xl="9"
        lg="7"
        md="7"
        sm="7"
        cols="6"
      >
        <h1>OICity</h1>
      </v-col>
      <v-col
        xl="3"
        lg="5"
        md="5"
        sm="5"
        cols="6"
        align-self="center"
        justify-self="end"
      >
        <v-img
          v-if="isNotLogin()"
          src="google_btn.png"
          @click="onLogin"
        />
      </v-col>
    </v-row>
    <v-card class="spacing-playground mx-auto my-5 px-5">
      <v-card-title>どんなSNSなのか？</v-card-title>
      <v-card-text>OIC内のコミュニティの輪の発展を促進するSNS！</v-card-text>
    </v-card>
    <v-card class="spacing-playground mx-auto my-5 px-5">
      <v-card-title>モチベーション</v-card-title>
      <v-card-text>OICを愛する気持ちで出来ています！</v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';
@Component({})
export default class extends Vue {
  isNotLogin() {
    return !CreateLoginInfoApplication().IsLogin();
  }

  onLogin() {
    return CreateLoginInfoApplication().Login();
  }
}
</script>
<style scoped>
h1 {
  display: inline-block;
}
</style>