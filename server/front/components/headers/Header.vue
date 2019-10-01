<template>
  <v-app-bar
    app
    bottom
  >
    <v-card
      class="d-flex justify-space-between"
      width="100%"
      tile
      flat
    >
      <div class="pa-2">
        <v-btn max-width="90">
          Profile
        </v-btn>
      </div>
      <div class="pa-2">
        <v-btn max-width="50">
          LOGO
        </v-btn>
      </div>
      <div class="pa-2">
        <v-btn max-width="90">
          タイムライン
        </v-btn>
      </div>
    </v-card>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
@Component({})
export default class extends Vue {}
</script>