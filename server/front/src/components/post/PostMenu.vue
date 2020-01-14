<template>
  <v-col
    cols="auto"
    @click.stop
  >
    <v-speed-dial
      direction="left"
      @click.stop
    >
      <template v-slot:activator>
        <v-btn
          fab
          small
          icon
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>

      <v-btn
        v-if="isMyself"
        fab
        dark
        color="warning"
        small
        @click="$emit('delete')"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop }from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  @Prop({ type: Boolean, required: true }) isMyself!: boolean;
  fab = false;
}
</script>
