<template>
  <div>
    <v-row>
      <v-card
        class="mx-auto"
        width="900"
        outlined
      >
        <v-row>
          <v-col
            cols="auto"
            class="pb-0"
          >
            <v-card-title>Steve Jobs</v-card-title>
          </v-col>
          <v-col class="pb-0">
            <v-row justify="end">
              <v-list-item-avatar
                size="80"
                color="grey"
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-card-text>
            Lorem ipsum dolor safa;lfjaiwhfalwgnawbgawgwa
            it amet, churutanibakaunkokasusineonsectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq.
          </v-card-text>
          <v-card-text>2019-1-1</v-card-text>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
@Component({})
export default class extends Vue {}
</script>