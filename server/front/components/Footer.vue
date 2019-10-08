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
          href="http://localhost:8080/user"
        >
          Profile
        </v-btn>
        <v-btn max-width="50">
          LOGO
        </v-btn>
        <v-btn
          max-width="90"
          large
          color="primary"
          href="http://localhost:8080/timeline"
        >
          Timeline
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