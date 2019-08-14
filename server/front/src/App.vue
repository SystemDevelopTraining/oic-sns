<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link
          to="/"
          tag="span"
        >
          <span>OIC-SNS</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        text
        small
      >
        ログイン・サインアップ
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>
