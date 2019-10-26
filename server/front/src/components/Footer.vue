<template>
  <v-app-bar
    v-if="isLogin()"
    app
    bottom
  >
    <v-container>
      <v-row justify="space-between">
        <v-btn
          class="mb-2 mt-2"
          color="grey"
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
          color="grey"
          small
          fab
          dark
          to="/"
        >
          <v-icon large>
            home
          </v-icon>
        </v-btn>

        <v-btn
          class="mb-2 mt-2"
          color="grey"
          small
          fab
          dark
          to="timeline"
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