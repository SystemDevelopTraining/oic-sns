<template>
  <v-row>
    <v-col>
      <v-btn
        width="100%"
        @click="onClick"
      >
        過去の投稿10件を取得
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  onClick() {
    this.$emit('click');
  }
}
</script>