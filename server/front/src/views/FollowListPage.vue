<template>
  <v-card>
    <v-toolbar>
      <v-btn
        class="mr-auto"
        color="orange darken-2"
        dark
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

    <v-list>
      <FollowUser />
      <FollowUSer />
    </v-list>
  </v-card>
</template>

<script>
import { Component, Vue }from 'vue-property-decorator';
import FollowUser from '../components/FollowUser';

@Component({
  components: { FollowUser },
})
export default class extends Vue {}
</script>