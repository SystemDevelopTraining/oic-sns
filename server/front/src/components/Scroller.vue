<template>
  <v-btn
    v-if="isShow"
    v-scroll-to="'body'"
    color="accent"
    dark
    small
    fixed
    top
    app
    fab
    right
  >
    <v-icon>mdi-chevron-triple-up</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';

@Component
export default class extends Vue {
  scrollValue: number = 0;
  created() {
    window.addEventListener(
      'scroll',
      () => (this.scrollValue = window.scrollY),
    );
  }

  get isShow() {
    return this.scrollValue >= 200;
  }
}
</script>

<style lang="scss" scoped>
.v-btn {
  opacity: 0.7;
}
.v-btn:hover {
  opacity: 1;
}
</style>
