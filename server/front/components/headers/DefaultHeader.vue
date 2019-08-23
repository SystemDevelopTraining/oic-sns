<template>
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
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue }from "vue-property-decorator";
@Component({})
export default class extends Vue {}
</script>