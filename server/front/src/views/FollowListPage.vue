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
          right
        >
          fa-backspace
        </v-icon>
      </v-btn>
      <v-toolbar-title>Follow List</v-toolbar-title>
    </v-toolbar>
    <FollowList />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import FollowList from '../components/followList/FollowList.vue';
@Component({
  components: { FollowList },
})
export default class extends Vue {
  onClickBackFollowList() {
    this.$router.back();
  }
}
</script>