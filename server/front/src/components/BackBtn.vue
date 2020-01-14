<template>
  <div>
    <v-btn
      class="mr-auto"
      color="latestPostBtnColor"
      dark
      @click="goToPreviousPage"
    >
      <v-icon dark>
        fa-backspace
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
@Component({})
export default class extends Vue {
  goToPreviousPage() {
    this.$router.back();
  }
}
</script>