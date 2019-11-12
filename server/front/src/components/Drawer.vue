
<template>
  <div>
    <template v-if="isLogin">
      <v-btn
        color="red"
        dark
        small
        fixed
        top
        app
        fab
        left
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-view-list</v-icon>
      </v-btn>

      <v-navigation-drawer
        v-model="drawer"
        app
        temporary
        dark
      >
        <v-list-item class="color : primary">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ userName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="doAction(item.action)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <logout-btn />
          </div>
        </template>
      </v-navigation-drawer>
    </template>
  </div>
</template>

<script lang="ts">
import LogoutBtn from '../components/LogoutBtn.vue';
import { Component, Vue }from 'vue-property-decorator';
import { CreateLoginApplication }from '../create/CreateLoginApplication';

import { CreateUserApplication }from '../create/CreateUserApplication';

@Component({ components: { LogoutBtn } })
export default class extends Vue {
  drawer = null;
  userName = '';
  items = [
    { title: 'プロファイル編集', icon: 'fa-user-edit', action: 'profileEdit' },
    { title: 'フォローリスト', icon: 'fa-users', action: 'followList' },
    { title: '退会', icon: 'fa-user-slash', action: 'profileDelete' },
  ];

  isLogin = CreateLoginApplication().IsLogin();
  async created() {
    const userApp = CreateUserApplication();
    const userId = await userApp.GetMyUserId();

    const userInfo = await userApp.GetUser(userId);

    const userName = userInfo.name;
    this.userName = userName;
  }

  doAction(params: string) {
    switch (params) {
      case 'profileEdit':
        this.$router.push({ name: 'editProfile' });
        break;
      case 'followList':
        this.$router.push({ name: 'followList' });
        break;

      case 'profileDelete':
        this.$router.push({ name: 'deleteAccount' });
        break;
    }
  }
}
</script>




