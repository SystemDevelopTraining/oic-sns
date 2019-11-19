<template>
  <div>
    <v-btn
      color="primary"
      dark
      small
      fixed
      top
      app
      fab
      right
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-chevron-triple-up</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';

@Component({ components: {} })
export default class extends Vue {}
</script>




