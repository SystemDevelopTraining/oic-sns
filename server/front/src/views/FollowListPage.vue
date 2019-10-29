<template>
  <v-card>
    <v-toolbar>
      <v-btn
        class="mr-auto"
        color="orange darken-2"
        dark
        @click="onClickBackFollowList"
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>Back
      </v-btn>
      <v-toolbar-title>Follow List</v-toolbar-title>
    </v-toolbar>
    <FollowList />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import FollowList from '../components/FollowList/FollowList.vue';
@Component({
  components: { FollowList },
})
export default class extends Vue {
  private name: string = '';
  onClickBackFollowList() {
    this.$router.push({ name: 'user' });
  }
}
</script>