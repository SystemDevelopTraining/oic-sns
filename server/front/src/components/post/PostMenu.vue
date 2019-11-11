<template>
  <v-col cols="auto">
    <v-speed-dial direction="left">
      <template v-slot:activator>
        <v-btn
          fab
          small
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
        color="red"
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
  fab: boolean = false;
}
</script>
