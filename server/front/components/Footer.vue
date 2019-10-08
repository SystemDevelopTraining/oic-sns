<template>
  <v-app-bar
    app
    bottom
  >
    <v-container>
      <v-row justify="space-between">
        <v-btn
          max-width="90"
          large
          color="primary"
          href="/user"
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
@Component({})
export default class extends Vue {}
</script>