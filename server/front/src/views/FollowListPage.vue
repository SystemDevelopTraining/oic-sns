<template>
  <v-card>
    <v-toolbar>
      <back-btn />
      <v-spacer />
      <v-toolbar-title>フォローリスト</v-toolbar-title>
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
export default class extends Vue {}
</script>
