<template>
  <v-list-item class="d-flex flex-row">
    <p>{{ name }}</p>
    <v-btn
      class="ml-auto"
      depressed
      small
      color="blue"
      @click="onClick"
    >
      Follow
    </v-btn>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
@Component({})
export default class extends Vue {
  private name = 'tanaka';
  onClick() {
    this.$emit('click');
  }
}
</script>