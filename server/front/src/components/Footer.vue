<template>
  <v-app-bar
    v-if="isLogin"
    id="bar"
    bottom
    app
    color="secondary"
  >
    <v-container>
      <v-row justify="space-between">
        <v-btn
          class="mb-2 mt-2"
          :color="iconColorUser"
          small
          fab
          icon
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
          icon
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
          icon
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
import { CreateLoginApplication }from '../create/CreateLoginApplication';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { AsyncOnce }from '../utils/AsyncOnce';

@Component({})
export default class extends Vue {
  iconColorUser = 'accent';
  iconColorHome = 'accent';
  iconColorTimeline = 'accent';
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
        this.iconColorTimeline = 'warning';
        break;
      case 'top':
        this.iconColorHome = 'warning';
        break;
      case 'user':
        this.iconColorUser = 'warning';
        break;
    }
  }

  resetIconColor() {
    this.iconColorUser = 'accent';
    this.iconColorHome = 'accent';
    this.iconColorTimeline = 'accent';
  }

  isLogin = CreateLoginApplication().IsLogin();

  @Watch('$route')
  onChangeRoute() {
    this.isLogin = CreateLoginApplication().IsLogin();
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