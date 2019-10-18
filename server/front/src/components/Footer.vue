<template>
  <v-app-bar
    v-if="isLogin()"
    app
    bottom
  >
    <v-container>
      <v-row justify="space-between">
        <v-btn
          color="grey"
          fab
          dark
          @click="onProfileClick"
        >
          <v-icon large>
            person_pin
          </v-icon>
        </v-btn>

        <v-btn
          large
          dark
          color="grey"
          href="/.."
        >
          <v-icon large>
            home
          </v-icon>
        </v-btn>

        <v-btn
          color="grey"
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
  isLogin() {
    return CreateLoginInfoApplication().IsLogin();
  }
  async onProfileClick() {
    const userId = await CreateUserApplication().GetMyUserId();
    this.$router.push({ name: 'user', params: { id: String(userId.id) } });
  }
}
</script>