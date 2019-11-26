<template>
  <v-row>
    <v-col>
      <v-btn
        width="100%"
        color="accent2"
        rounded
        class="primary--text"
        @click="onClick"
      >
        {{ timeText }}の投稿10件を取得
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop }from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  @Prop({ type: Boolean, required: false }) old: boolean | undefined;

  get timeText() {
    return this.old ? '過去' : '最新';
  }

  onClick() {
    this.$emit('click');
  }
}
</script>