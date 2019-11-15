<template>
  <v-card>
    <v-toolbar>
      <back-btn />
      <v-toolbar-title>Follow List</v-toolbar-title>
    </v-toolbar>
    <FollowList />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import FollowList from '../components/followList/FollowList.vue';
import BackBtn from '../components/BackBtn.vue';
@Component({
  components: { FollowList, BackBtn },
})
export default class extends Vue {
  onClickBackFollowList() {
    this.$router.push({ name: 'user' });
  }
}
</script>