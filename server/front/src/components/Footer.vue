<template>
  <v-app-bar
    v-if="isLogin()"
    app
    bottom
    color="black"
  >
    <v-container>
      <v-row justify="space-between">
        <v-btn
          class="mb-2 mt-2"
          :color="iconColorUser"
          small
          fab
          dark
          @click="onProfileClick"
        >
          <v-icon large>
            person_pin
          </v-icon>
        </v-btn>

        <v-btn
          class="mb-2 mt-2"
          :color="iconColorHome"
          small
          fab
          dark
          href="/.."
        >
          <v-icon large>
            home
          </v-icon>
        </v-btn>

        <v-btn
          class="mb-2 mt-2"
          :color="iconColorTimeline"
          small
          fab
          dark
          href="/timeline"
        >
          <v-icon large>
            query_builder
          </v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';
import { CreateUserApplication }from '../create/CreateUserApplication';

@Component({})
export default class extends Vue {
  iconColorUser = 'teal';
  iconColorHome = 'teal';
  iconColorTimeline = 'teal';

  created() {
    const currentPage = this.$route.name;
    switch (currentPage) {
      case 'timeline':
        this.iconColorTimeline = 'red';
        break;
      case 'top':
        this.iconColorHome = 'red';
        break;
      case 'user':
        this.iconColorUser = 'red';
        break;
    }
  }
  isLogin() {
    return CreateLoginInfoApplication().IsLogin();
  }
  async onProfileClick() {
    const userId = await CreateUserApplication().GetMyUserId();
    this.$router.push({ name: 'user', params: { id: String(userId.id) } });
  }
}
</script>