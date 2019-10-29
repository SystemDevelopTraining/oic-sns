<template>
  <v-app-bar
    v-if="isLogin"
    id="bar"
    bottom
    app
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
          to="/"
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
          to="/timeline"
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
import { Component, Vue, Watch }from 'vue-property-decorator';
import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { AsyncOnce }from '../utils/AsyncOnce';

@Component({})
export default class extends Vue {
  iconColorUser = 'teal';
  iconColorHome = 'teal';
  iconColorTimeline = 'teal';
  asyncOnce = new AsyncOnce();

  created() {
    this.changeIconColor();
  }

  //Footerのアイコンのカラーをrouteによって変えます
  changeIconColor() {
    const currentPage = this.$route.name;
    this.resetIconColor();
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

  resetIconColor() {
    this.iconColorUser = 'teal';
    this.iconColorHome = 'teal';
    this.iconColorTimeline = 'teal';
  }

  isLogin = CreateLoginInfoApplication().IsLogin();

  @Watch('$route')
  onChangeRoute() {
    this.isLogin = CreateLoginInfoApplication().IsLogin();
    this.changeIconColor();
  }

  onProfileClick() {
    this.asyncOnce.Do(this.toProfilePage);
  }

  async toProfilePage() {
    const userId = await CreateUserApplication().GetMyUserId();
    this.$router.push({ name: 'user', params: { id: String(userId.id) } });
  }
}
</script>
<style scoped>
#bar {
  top: auto;
}
</style>