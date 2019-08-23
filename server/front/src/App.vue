<template>
  <v-app>
    <LoginSignupHeader />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue }from "vue-property-decorator";
import LoginSignupHeader from "../components/headers/LoginSignupHeader.vue";
import DefaultHeader from "../components/headers/DefaultHeader.vue";

@Component({
  components: {LoginSignupHeader,DefaultHeader}
})
export default class extends Vue {}
</script>
